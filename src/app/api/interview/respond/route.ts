import { NextRequest, NextResponse } from "next/server";
import { processCandidateAnswer } from "@/lib/interview-store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const interviewId = body.interview_id || body.interviewId;
    const responseText = body.response_text || body.responseText || body.answer;

    if (!interviewId) {
      return NextResponse.json({ error: "interview_id is required" }, { status: 400 });
    }

    if (!responseText || typeof responseText !== "string") {
      return NextResponse.json({ error: "response_text is required" }, { status: 400 });
    }

    const { lastTurnEvaluated, nextQuestion, session } = await processCandidateAnswer(
      interviewId,
      responseText
    );

    return NextResponse.json({
      interview_id: session.interviewId,
      status: session.status,
      last_turn_evaluated: {
        turn_number: lastTurnEvaluated.turnNumber,
        score: lastTurnEvaluated.turnScore,
        eval_notes: lastTurnEvaluated.evalNotes,
      },
      next_question: nextQuestion
        ? {
            question_id: `${session.interviewId}-t${nextQuestion.turnNumber}`,
            turn_number: nextQuestion.turnNumber,
            question_text: nextQuestion.questionText,
            curriculum_day: nextQuestion.curriculumDay,
            topic: nextQuestion.topic,
            question_type: nextQuestion.questionType,
            ai_reasoning: nextQuestion.aiReasoning,
          }
        : null,
      progress: {
        total_questions_asked: session.turns.length,
        min_questions_required: 8,
        unique_days_covered: session.coveredDays.length,
        min_days_required: 4,
        covered_days: session.coveredDays,
        meets_minimum_requirements:
          session.turns.length >= 8 && session.coveredDays.length >= 4,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Error processing candidate response" },
      { status: 500 }
    );
  }
}
