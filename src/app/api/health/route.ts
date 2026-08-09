import { db } from "@/db";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  // The app runs in-memory by default. If DATABASE_URL is not configured, we
  // still report a healthy status (database simply isn't in use).
  if (!process.env.DATABASE_URL) {
    return Response.json({
      ok: true,
      database: "not_configured",
      message: "App is running in-memory; DATABASE_URL not set.",
    });
  }

  try {
    await db.execute(sql`select 1`);
    return Response.json({ ok: true, database: "connected" });
  } catch {
    return Response.json(
      { ok: false, database: "error" },
      { status: 500 }
    );
  }
}

