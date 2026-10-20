import { getDb } from "@/db";
import { sql } from "drizzle-orm";
export async function GET() {
  try {
    await getDb().run(sql`select 1`);
    return Response.json({
      status: "ok",
      database: "connected",
      integrations: "configure-and-verify-before-live-use",
    });
  } catch {
    return Response.json({ status: "unavailable" }, { status: 503 });
  }
}
