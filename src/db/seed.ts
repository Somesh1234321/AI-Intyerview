import { db } from "./index";
import { candidates } from "./schema";
import { SEED_CANDIDATES } from "../lib/candidate-data";

export async function seedDatabase() {
  try {
    const existing = await db.select().from(candidates);
    if (existing.length === 0) {
      console.log("Seeding database with initial candidate profiles...");
      for (const cand of SEED_CANDIDATES) {
        await db.insert(candidates).values({
          id: cand.id,
          name: cand.name,
          title: cand.title,
          avatarUrl: cand.avatarUrl,
          bio: cand.bio,
          completedMissions: cand.completedMissions,
          skippedTopics: cand.skippedTopics,
          learningSignals: cand.learningSignals,
          preferredStyle: cand.preferredStyle,
        });
      }
      console.log("Database seeded successfully.");
    }
  } catch (err) {
    console.error("Database seed notice:", err);
  }
}
