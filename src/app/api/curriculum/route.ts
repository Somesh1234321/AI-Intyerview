import { NextResponse } from "next/server";
import { CURRICULUM_DAYS, CURRICULUM_MODULES } from "@/lib/curriculum-data";

export async function GET() {
  return NextResponse.json({
    title: "AI Cohort 31-Day Enterprise AI Engineering Curriculum",
    modules_count: CURRICULUM_MODULES.length,
    total_days: CURRICULUM_DAYS.length,
    modules: CURRICULUM_MODULES,
    days: CURRICULUM_DAYS,
  });
}
