import { env } from "cloudflare:workers";
import { getDb } from "@/db";
import { subscribers } from "@/db/schema";
import { sameOrigin, apiError, rateLimit } from "@/lib/security";
import { eq } from "drizzle-orm";
export async function POST(req: Request) {
  try {
    sameOrigin(req);
    const { email, consent } = (await req.json()) as {
      email: string;
      consent: boolean;
    };
    if (
      typeof email !== "string" ||
      email.length > 254 ||
      !/^\S+@\S+\.\S+$/.test(email) ||
      consent !== true
    )
      return Response.json(
        { message: "Enter a valid email and agree to receive the letter." },
        { status: 400 },
      );
    if (!env.RESEND_API_KEY || !env.EMAIL_FROM)
      return Response.json(
        {
          message:
            "The Sunday letter is coming soon. Signups open once our email service is connected.",
        },
        { status: 503 },
      );
    const normalized = email.trim().toLowerCase();
    const digest = Array.from(
      new Uint8Array(
        await crypto.subtle.digest(
          "SHA-256",
          new TextEncoder().encode(normalized),
        ),
      ),
    )
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    await rateLimit("newsletter:" + digest, 3);
    await rateLimit("newsletter:global", 100);
    const db = getDb();
    const existing = await db
      .select()
      .from(subscribers)
      .where(eq(subscribers.email, normalized));
    const token = existing[0]?.token || crypto.randomUUID();
    if (!existing.length)
      await db
        .insert(subscribers)
        .values({
          id: crypto.randomUUID(),
          email: normalized,
          token,
          status: "pending",
          createdAt: new Date().toISOString(),
        })
        .onConflictDoNothing();
    const origin = env.APP_ORIGIN || new URL(req.url).origin;
    const result = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
        "Idempotency-Key": "confirm-" + token,
      },
      body: JSON.stringify({
        from: env.EMAIL_FROM,
        to: normalized,
        subject: "One more turn - confirm your Sunday letter",
        text: `Confirm your subscription: ${origin}/api/newsletter/confirm?token=${token}\n\nIf you did not ask for this, ignore this email.`,
      }),
      signal: AbortSignal.timeout(15000),
    });
    if (!result.ok) throw Error("Confirmation email provider failed");
    return Response.json({
      message: "Check your inbox to confirm your subscription.",
    });
  } catch (e) {
    return apiError(e);
  }
}
