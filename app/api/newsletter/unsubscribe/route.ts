import { getDb } from "@/db";
import { subscribers } from "@/db/schema";
import { eq } from "drizzle-orm";
export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("token") || "";
  if (!/^[a-zA-Z0-9-]{30,50}$/.test(token))
    return new Response("Invalid unsubscribe link", { status: 400 });
  return new Response(
    `<!doctype html><html><body style="font-family:Georgia;padding:10%;background:#f2f0e9"><h1>Take a different road.</h1><form method="POST"><input type="hidden" name="token" value="${token}"><button>Unsubscribe from the Sunday letter</button></form></body></html>`,
    { headers: { "Content-Type": "text/html", "Cache-Control": "no-store" } },
  );
}
export async function POST(req: Request) {
  const token = (await req.formData()).get("token");
  if (typeof token !== "string")
    return new Response("Invalid token", { status: 400 });
  await getDb()
    .update(subscribers)
    .set({ status: "unsubscribed" })
    .where(eq(subscribers.token, token));
  return new Response("You have been unsubscribed.");
}
