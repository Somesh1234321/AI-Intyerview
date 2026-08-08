import { NextRequest, NextResponse } from "next/server";
import { finalizeInterviewSession, getInterviewSession } from "@/lib/interview-store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const interviewId = body.interview_id || body.interviewId;

    if (!interviewId) {
      return NextResponse.json({ error: "interview_id is required" }, { status: 400 });
    }

    const session = await finalizeInterviewSession(interviewId);

    return NextResponse.json({
      interview_id: session.interviewId,
      candidate_id: session.candidate.id,
      candidate_name: session.candidate.name,
      status: session.status,
      overall_score: session.overallScore,
      communication_score: session.commScore,
      readiness_level: session.readinessLevel,
      turns_count: session.turns.length,
      days_covered_count: session.coveredDays.length,
      covered_days: session.coveredDays,
      feedback_report: session.feedbackReport,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to generate interview feedback" },
      { status: 500 }
    );
  }
}
