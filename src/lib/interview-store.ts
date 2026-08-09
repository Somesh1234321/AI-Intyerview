// import { db } from "@/db";
// import { interviews, interviewTurns } from "@/db/schema";
// import { eq, asc } from "drizzle-orm";
// import { CandidateProfile, SEED_CANDIDATES } from "./candidate-data";
// import {
//   TurnData,
//   initializeInterviewSession,
//   evaluateResponse,
//   generateNextTurn,
//   generateFinalFeedbackReport,
// } from "./interview-agent";

// export interface ActiveInterview {
//   interviewId: string;
//   candidate: CandidateProfile;
//   status: "in_progress" | "completed";
//   turns: TurnData[];
//   coveredDays: number[];
//   overallScore?: number;
//   commScore?: number;
//   readinessLevel?: string;
//   feedbackReport?: any;
// }

// const memoryStore = new Map<string, ActiveInterview>();

// export async function createInterviewSession(candidateId: string): Promise<ActiveInterview> {
//   const candidate = SEED_CANDIDATES.find((c) => c.id === candidateId) || SEED_CANDIDATES[0];
//   const interviewId = `int-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  
//   const { firstQuestion } = initializeInterviewSession(candidateId);

//   const session: ActiveInterview = {
//     interviewId,
//     candidate,
//     status: "in_progress",
//     turns: [firstQuestion],
//     coveredDays: [firstQuestion.curriculumDay],
//   };

//   memoryStore.set(interviewId, session);

//   try {
//     await db.insert(interviews).values({
//       id: interviewId,
//       candidateId: candidate.id,
//       status: "in_progress",
//       totalQuestions: 1,
//       coveredDays: [firstQuestion.curriculumDay],
//     });

//     await db.insert(interviewTurns).values({
//       id: `${interviewId}-t1`,
//       interviewId,
//       turnNumber: 1,
//       questionText: firstQuestion.questionText,
//       curriculumDay: firstQuestion.curriculumDay,
//       topic: firstQuestion.topic,
//       questionType: firstQuestion.questionType,
//       aiReasoning: firstQuestion.aiReasoning,
//     });
//   } catch (err) {
//     console.error("Error persisting interview to DB:", err);
//   }

//   return session;
// }

// export async function getInterviewSession(interviewId: string): Promise<ActiveInterview | null> {
//   if (memoryStore.has(interviewId)) {
//     return memoryStore.get(interviewId)!;
//   }

//   try {
//     const [row] = await db.select().from(interviews).where(eq(interviews.id, interviewId));
//     if (!row) return null;

//     const cand = SEED_CANDIDATES.find((c) => c.id === row.candidateId) || SEED_CANDIDATES[0];
//     const turnsRows = await db
//       .select()
//       .from(interviewTurns)
//       .where(eq(interviewTurns.interviewId, interviewId))
//       .orderBy(asc(interviewTurns.turnNumber));

//     const turns: TurnData[] = turnsRows.map((t) => ({
//       turnNumber: t.turnNumber,
//       questionText: t.questionText,
//       curriculumDay: t.curriculumDay,
//       topic: t.topic,
//       questionType: t.questionType as any,
//       aiReasoning: t.aiReasoning || "",
//       candidateResponse: t.candidateResponse || undefined,
//       turnScore: t.turnScore || undefined,
//       evalNotes: t.evalNotes || undefined,
//     }));

//     const session: ActiveInterview = {
//       interviewId: row.id,
//       candidate: cand,
//       status: row.status as any,
//       turns,
//       coveredDays: (row.coveredDays as number[]) || [],
//       overallScore: row.overallScore || undefined,
//       commScore: row.commScore || undefined,
//       readinessLevel: row.readinessLevel || undefined,
//       feedbackReport: row.feedbackReport || undefined,
//     };

//     memoryStore.set(interviewId, session);
//     return session;
//   } catch (err) {
//     console.error("Error retrieving interview from DB:", err);
//     return null;
//   }
// }

// export async function processCandidateAnswer(
//   interviewId: string,
//   responseText: string
// ): Promise<{
//   lastTurnEvaluated: TurnData;
//   nextQuestion?: TurnData;
//   session: ActiveInterview;
// }> {
//   const session = await getInterviewSession(interviewId);
//   if (!session) {
//     throw new Error(`Interview session not found: ${interviewId}`);
//   }

//   const currentTurnIndex = session.turns.length - 1;
//   const currentTurn = session.turns[currentTurnIndex];

//   // Evaluate candidate response
//   const evalResult = evaluateResponse(
//     currentTurn.curriculumDay,
//     currentTurn.questionText,
//     responseText
//   );

//   currentTurn.candidateResponse = responseText;
//   currentTurn.turnScore = evalResult.score;
//   currentTurn.evalNotes = evalResult.evalNotes;

//   // Persist current turn evaluation in DB
//   try {
//     await db
//       .update(interviewTurns)
//       .set({
//         candidateResponse: responseText,
//         turnScore: evalResult.score,
//         evalNotes: evalResult.evalNotes,
//         answeredAt: new Date(),
//       })
//       .where(eq(interviewTurns.id, `${interviewId}-t${currentTurn.turnNumber}`));
//   } catch (err) {
//     console.error("Error updating turn in DB:", err);
//   }

//   let nextQuestion: TurnData | undefined = undefined;

//   // Generate next turn if not reached max limit and interview in_progress
//   if (session.status === "in_progress") {
//     nextQuestion = generateNextTurn(session.candidate, session.turns, responseText);
//     session.turns.push(nextQuestion);

//     if (!session.coveredDays.includes(nextQuestion.curriculumDay)) {
//       session.coveredDays.push(nextQuestion.curriculumDay);
//     }

//     try {
//       await db
//         .update(interviews)
//         .set({
//           totalQuestions: session.turns.length,
//           coveredDays: session.coveredDays,
//         })
//         .where(eq(interviews.id, interviewId));

//       await db.insert(interviewTurns).values({
//         id: `${interviewId}-t${nextQuestion.turnNumber}`,
//         interviewId,
//         turnNumber: nextQuestion.turnNumber,
//         questionText: nextQuestion.questionText,
//         curriculumDay: nextQuestion.curriculumDay,
//         topic: nextQuestion.topic,
//         questionType: nextQuestion.questionType,
//         aiReasoning: nextQuestion.aiReasoning,
//       });
//     } catch (err) {
//       console.error("Error persisting next turn to DB:", err);
//     }
//   }

//   memoryStore.set(interviewId, session);

//   return {
//     lastTurnEvaluated: currentTurn,
//     nextQuestion,
//     session,
//   };
// }

// export async function finalizeInterviewSession(interviewId: string): Promise<ActiveInterview> {
//   const session = await getInterviewSession(interviewId);
//   if (!session) {
//     throw new Error(`Interview session not found: ${interviewId}`);
//   }

//   const result = generateFinalFeedbackReport(session.candidate, session.turns);

//   session.status = "completed";
//   session.overallScore = result.overallScore;
//   session.commScore = result.commScore;
//   session.readinessLevel = result.readinessLevel;
//   session.feedbackReport = result.feedbackReport;

//   memoryStore.set(interviewId, session);

//   try {
//     await db
//       .update(interviews)
//       .set({
//         status: "completed",
//         completedAt: new Date(),
//         overallScore: result.overallScore,
//         commScore: result.commScore,
//         readinessLevel: result.readinessLevel,
//         feedbackReport: result.feedbackReport,
//       })
//       .where(eq(interviews.id, interviewId));
//   } catch (err) {
//     console.error("Error finalizing interview in DB:", err);
//   }

//   return session;
// }


import { CandidateProfile, SEED_CANDIDATES } from "./candidate-data";

import {
  TurnData,
  initializeInterviewSession,
  evaluateResponse,
  generateNextTurn,
  generateFinalFeedbackReport,
} from "./interview-agent";

export interface ActiveInterview {
  interviewId: string;
  candidate: CandidateProfile;
  status: "in_progress" | "completed";
  turns: TurnData[];
  coveredDays: number[];
  overallScore?: number;
  commScore?: number;
  readinessLevel?: string;
  feedbackReport?: any;
}

// In-memory interview storage
const memoryStore = new Map<string, ActiveInterview>();


export async function createInterviewSession(
  candidateId: string
): Promise<ActiveInterview> {

  const candidate =
    SEED_CANDIDATES.find((c) => c.id === candidateId) ||
    SEED_CANDIDATES[0];

  const interviewId = `int-${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 7)}`;

  const { firstQuestion } = initializeInterviewSession(candidate.id);

  const session: ActiveInterview = {
    interviewId,
    candidate,
    status: "in_progress",
    turns: [firstQuestion],
    coveredDays: [firstQuestion.curriculumDay],
  };

  memoryStore.set(interviewId, session);

  return session;
}


export async function getInterviewSession(
  interviewId: string
): Promise<ActiveInterview | null> {

  const session = memoryStore.get(interviewId);

  if (!session) {
    return null;
  }

  return session;
}


export async function processCandidateAnswer(
  interviewId: string,
  responseText: string
): Promise<{
  lastTurnEvaluated: TurnData;
  nextQuestion?: TurnData;
  session: ActiveInterview;
}> {

  const session = await getInterviewSession(interviewId);

  if (!session) {
    throw new Error(`Interview session not found: ${interviewId}`);
  }

  const currentTurnIndex = session.turns.length - 1;
  const currentTurn = session.turns[currentTurnIndex];

  // Evaluate candidate response
  const evalResult = evaluateResponse(
    currentTurn.curriculumDay,
    currentTurn.questionText,
    responseText
  );

  currentTurn.candidateResponse = responseText;
  currentTurn.turnScore = evalResult.score;
  currentTurn.evalNotes = evalResult.evalNotes;

  let nextQuestion: TurnData | undefined;

  // Generate next interview question
  if (session.status === "in_progress") {

    nextQuestion = generateNextTurn(
      session.candidate,
      session.turns,
      responseText
    );

    session.turns.push(nextQuestion);

    if (!session.coveredDays.includes(nextQuestion.curriculumDay)) {
      session.coveredDays.push(nextQuestion.curriculumDay);
    }
  }

  memoryStore.set(interviewId, session);

  return {
    lastTurnEvaluated: currentTurn,
    nextQuestion,
    session,
  };
}


export async function finalizeInterviewSession(
  interviewId: string
): Promise<ActiveInterview> {

  const session = await getInterviewSession(interviewId);

  if (!session) {
    throw new Error(`Interview session not found: ${interviewId}`);
  }

  const result = generateFinalFeedbackReport(
    session.candidate,
    session.turns
  );

  session.status = "completed";
  session.overallScore = result.overallScore;
  session.commScore = result.commScore;
  session.readinessLevel = result.readinessLevel;
  session.feedbackReport = result.feedbackReport;

  memoryStore.set(interviewId, session);

  return session;
}