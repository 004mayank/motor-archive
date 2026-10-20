import { getDb } from "@/db";
import { subscribers } from "@/db/schema";
import { eq } from "drizzle-orm";
export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("token");
  if (!token)
    return new Response("Missing confirmation token", { status: 400 });
  return new Response(
    `<!doctype html><html><head><meta name="viewport" content="width=device-width"><title>Confirm subscription</title></head><body style="background:#f2f0e9;color:#282d27;font-family:Georgia;padding:10%;line-height:1.8"><h1>A story worth keeping.</h1><p>Confirm that you would like to receive the Sunday letter.</p><form method="POST"><input type="hidden" name="token" value="${token.replace(/[^a-zA-Z0-9-]/g, "")}"><button style="padding:16px;background:#282d27;color:#f2f0e9;border:0">Confirm my subscription</button></form></body></html>`,
    { headers: { "Content-Type": "text/html", "Cache-Control": "no-store" } },
  );
}
export async function POST(req: Request) {
  const token = (await req.formData()).get("token");
  if (typeof token !== "string")
    return new Response("Invalid confirmation", { status: 400 });
  const changed = await getDb()
    .update(subscribers)
    .set({ status: "active" })
    .where(eq(subscribers.token, token))
    .returning({ id: subscribers.id });
  return new Response(
    changed.length
      ? "You’re on the list. Welcome to the Sunday letter."
      : "This confirmation link is invalid.",
    { status: changed.length ? 200 : 400 },
  );
}
