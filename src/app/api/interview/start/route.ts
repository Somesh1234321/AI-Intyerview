import { NextRequest, NextResponse } from "next/server";
import { createInterviewSession } from "@/lib/interview-store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const candidateId = body.candidate_id || body.candidateId || "cand-alex-chen";

    const session = await createInterviewSession(candidateId);
    const firstQuestion = session.turns[0];

    return NextResponse.json({
      interview_id: session.interviewId,
      status: session.status,
      candidate: session.candidate,
      current_question: {
        question_id: `${session.interviewId}-t1`,
        turn_number: firstQuestion.turnNumber,
        question_text: firstQuestion.questionText,
        curriculum_day: firstQuestion.curriculumDay,
        topic: firstQuestion.topic,
        question_type: firstQuestion.questionType,
        ai_reasoning: firstQuestion.aiReasoning,
      },
      progress: {
        total_questions_asked: 1,
        min_questions_required: 8,
        unique_days_covered: session.coveredDays.length,
        min_days_required: 4,
        covered_days: session.coveredDays,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to start interview session" },
      { status: 500 }
    );
  }
}
