import { NextRequest, NextResponse } from "next/server";
import { getInterviewSession } from "@/lib/interview-store";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getInterviewSession(id);

    if (!session) {
      return NextResponse.json({ error: `Interview not found for ID: ${id}` }, { status: 404 });
    }

    return NextResponse.json({
      interview_id: session.interviewId,
      status: session.status,
      candidate: session.candidate,
      total_questions: session.turns.length,
      covered_days: session.coveredDays,
      turns: session.turns,
      overall_score: session.overallScore,
      comm_score: session.commScore,
      readiness_level: session.readinessLevel,
      feedback_report: session.feedbackReport,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to retrieve interview session" }, { status: 500 });
  }
}
