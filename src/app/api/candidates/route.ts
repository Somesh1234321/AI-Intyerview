import { NextResponse } from "next/server";
import { SEED_CANDIDATES } from "@/lib/candidate-data";
import { db } from "@/db";
import { candidates } from "@/db/schema";
import { seedDatabase } from "@/db/seed";

export async function GET() {
  try {
    await seedDatabase();
    const dbCandidates = await db.select().from(candidates);
    if (dbCandidates && dbCandidates.length > 0) {
      return NextResponse.json({
        count: dbCandidates.length,
        candidates: dbCandidates,
      });
    }
  } catch (error) {
    console.error("DB fetch error in candidates API, using seed data:", error);
  }

  return NextResponse.json({
    count: SEED_CANDIDATES.length,
    candidates: SEED_CANDIDATES,
  });
}
