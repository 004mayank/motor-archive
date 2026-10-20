import { env } from "cloudflare:workers";
import { startRun, advanceRun } from "@/lib/workflow";
import { getDb } from "@/db";
import { runs } from "@/db/schema";
import { sql } from "drizzle-orm";
import { apiError } from "@/lib/security";
export async function POST(req: Request) {
  if (
    !env.CRON_SECRET ||
    req.headers.get("authorization") !== `Bearer ${env.CRON_SECRET}`
  )
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  try {
    const body = (await req.json()) as { key?: string };
    if (!body.key || !/^[a-zA-Z0-9:_-]{8,120}$/.test(body.key))
      return Response.json(
        { message: "An explicit weekly idempotency key is required." },
        { status: 400 },
      );
    const run = await startRun(body.key, false);
    const result = await advanceRun(run.id);
    return Response.json({ runId: run.id, result });
  } catch (e) {
    return apiError(e);
  }
}
