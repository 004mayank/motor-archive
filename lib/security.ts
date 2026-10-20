import { getChatGPTUser } from "@/app/chatgpt-auth";
import { env } from "cloudflare:workers";
import { getDb } from "@/db";
import { audit, rateLimits } from "@/db/schema";
import { sql } from "drizzle-orm";
export async function adminIdentity() {
  const user = await getChatGPTUser();
  if (!user) throw new Error("UNAUTHORIZED");
  const allowed = (env.ADMIN_EMAILS || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  if (!allowed.includes(user.email.toLowerCase()))
    throw new Error(
      "FORBIDDEN: Configure ADMIN_EMAILS before using editorial write controls.",
    );
  return user;
}
export function sameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (origin !== new URL(req.url).origin)
    throw new Error("FORBIDDEN: Cross-origin mutation rejected.");
}
export async function logAction(
  actor: string,
  action: string,
  detail: unknown,
) {
  await getDb()
    .insert(audit)
    .values({
      id: crypto.randomUUID(),
      actor,
      action,
      detail: JSON.stringify(detail),
      createdAt: new Date().toISOString(),
    });
}
export async function rateLimit(key: string, limit = 10, windowSeconds = 3600) {
  const now = Math.floor(Date.now() / 1000);
  const result = await getDb()
    .insert(rateLimits)
    .values({ key, count: 1, expiresAt: now + windowSeconds })
    .onConflictDoUpdate({
      target: rateLimits.key,
      set: {
        count: sql`CASE WHEN expires_at < ${now} THEN 1 ELSE count + 1 END`,
        expiresAt: sql`CASE WHEN expires_at < ${now} THEN ${now + windowSeconds} ELSE expires_at END`,
      },
    })
    .returning();
  if (result[0].count > limit) throw new Error("RATE_LIMIT");
}
export function apiError(e: unknown) {
  const m = e instanceof Error ? e.message : "Unexpected error";
  const status = m.startsWith("UNAUTHORIZED")
    ? 401
    : m.startsWith("FORBIDDEN")
      ? 403
      : m === "RATE_LIMIT"
        ? 429
        : m.startsWith("VALIDATION")
          ? 400
          : 503;
  console.error(
    JSON.stringify({
      level: "error",
      message: m,
      time: new Date().toISOString(),
    }),
  );
  return Response.json(
    {
      message:
        status === 503
          ? "The service could not complete this request. Please try again or check configuration."
          : m,
    },
    { status },
  );
}
