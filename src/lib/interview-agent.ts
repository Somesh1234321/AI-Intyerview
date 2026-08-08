import { CURRICULUM_DAYS, CurriculumDay } from "./curriculum-data";
import { CandidateProfile, SEED_CANDIDATES } from "./candidate-data";

export interface TurnData {
  turnNumber: number;
  questionText: string;
  curriculumDay: number;
  topic: string;
  questionType: "initial" | "follow_up" | "challenge" | "pivot";
  aiReasoning: string;
  candidateResponse?: string;
  turnScore?: number;
  evalNotes?: string;
}

export interface InterviewState {
  interviewId: string;
  candidate: CandidateProfile;
  status: "in_progress" | "completed";
  turns: TurnData[];
  coveredDays: number[];
  currentQuestion?: TurnData;
}

export interface EvaluationResult {
  score: number; // 1 - 10
  communicationScore: number; // 1 - 10
  evalNotes: string;
  keyConceptsIdentified: string[];
  missingConcepts: string[];
}

export function initializeInterviewSession(candidateId: string): {
  candidate: CandidateProfile;
  firstQuestion: TurnData;
} {
  const candidate = SEED_CANDIDATES.find((c) => c.id === candidateId) || SEED_CANDIDATES[0];
  
  // Pick initial day from completed missions
  const primaryDayNum = candidate.completedMissions[0] || 6;
  const currDay = CURRICULUM_DAYS.find((d) => d.day === primaryDayNum) || CURRICULUM_DAYS[5];

  const questionText = `Hello ${candidate.name.split(" ")[0]}! Welcome to your technical interview for the AI Cohort. Let's dive right in. You completed Day ${currDay.day}: ${currDay.title}. Could you explain your approach when designing this system, and how you balanced performance versus complexity in your implementation?`;

  const reasoning = `Selected Day ${currDay.day} (${currDay.title}) based on Candidate's mission history to assess baseline architecture concepts.`;

  const firstTurn: TurnData = {
    turnNumber: 1,
    questionText,
    curriculumDay: currDay.day,
    topic: currDay.title,
    questionType: "initial",
    aiReasoning: reasoning
  };

  return {
    candidate,
    firstQuestion: firstTurn
  };
}

export function evaluateResponse(
  curriculumDay: number,
  questionText: string,
  candidateResponse: string
): EvaluationResult {
  const dayInfo = CURRICULUM_DAYS.find((d) => d.day === curriculumDay);
  const text = candidateResponse.trim().toLowerCase();
  
  if (text.length < 15) {
    return {
      score: 4,
      communicationScore: 4,
      evalNotes: "Response was brief or lacked technical depth. Provided minimal architectural detail.",
      keyConceptsIdentified: [],
      missingConcepts: dayInfo ? dayInfo.keyConcepts.slice(0, 2) : []
    };
  }

  // Count key terms mentioned
  const concepts = dayInfo ? dayInfo.keyConcepts : [];
  const found: string[] = [];
  const missing: string[] = [];

  concepts.forEach((c) => {
    const term = c.toLowerCase();
    if (text.includes(term) || text.includes(term.split(" ")[0])) {
      found.push(c);
    } else {
      missing.push(c);
    }
  });

  const wordCount = text.split(/\s+/).length;
  let score = 6;
  if (found.length >= 2) score += 2;
  if (found.length >= 3) score += 1;
  if (wordCount > 60) score += 1;
  score = Math.min(10, score);

  let commScore = 7;
  if (wordCount > 40 && wordCount < 200) commScore = 9;
  if (wordCount >= 200) commScore = 8;
  if (wordCount < 25) commScore = 5;

  let notes = `Candidate demonstrated good understanding of ${dayInfo?.title || "topic"}.`;
  if (found.length > 0) {
    notes += ` Mentioned key concepts: ${found.join(", ")}.`;
  }
  if (missing.length > 0) {
    notes += ` Could elaborate more on: ${missing.join(", ")}.`;
  }

  return {
    score,
    communicationScore: commScore,
    evalNotes: notes,
    keyConceptsIdentified: found,
    missingConcepts: missing
  };
}

export function generateNextTurn(
  candidate: CandidateProfile,
  previousTurns: TurnData[],
  lastResponse: string
): TurnData {
  const turnNum = previousTurns.length + 1;
  const coveredDays = Array.from(new Set(previousTurns.map((t) => t.curriculumDay)));
  const lastTurn = previousTurns[previousTurns.length - 1];

  // We need at least 8 questions covering at least 4 unique days.
  // Strategy:
  // If we have fewer than 4 unique days and turn is getting closer to 8, force a pivot to an uncovered day.
  // Otherwise, decide dynamically between follow-up, challenge, or pivot.

  const daysNeededToReach4 = 4 - coveredDays.length;
  const turnsRemainingTo8 = 8 - previousTurns.length;

  let nextType: "follow_up" | "challenge" | "pivot" = "follow_up";

  // Check how many questions asked on the last curriculum day
  const turnsOnLastDay = previousTurns.filter((t) => t.curriculumDay === lastTurn.curriculumDay).length;

  if (turnsRemainingTo8 <= daysNeededToReach4 || turnsOnLastDay >= 2 || Math.random() > 0.5) {
    // Pivot to new day if available
    const unusedDays = candidate.completedMissions.filter((d) => !coveredDays.includes(d));
    if (unusedDays.length > 0) {
      nextType = "pivot";
    } else {
      nextType = Math.random() > 0.5 ? "follow_up" : "challenge";
    }
  } else {
    // Check quality of last response
    const wordCount = lastResponse.split(/\s+/).length;
    if (wordCount > 50) {
      nextType = "challenge";
    } else {
      nextType = "follow_up";
    }
  }

  if (nextType === "pivot") {
    const unusedDays = candidate.completedMissions.filter((d) => !coveredDays.includes(d));
    const nextDayNum = unusedDays.length > 0 ? unusedDays[0] : (lastTurn.curriculumDay % 31) + 1;
    const currDay = CURRICULUM_DAYS.find((d) => d.day === nextDayNum) || CURRICULUM_DAYS[0];

    const questionTemplates = [
      `Shifting focus to Day ${currDay.day} (${currDay.title}): How do you handle ${currDay.keyConcepts[0] || "core tradeoffs"} in production systems?`,
      `Let's pivot to Day ${currDay.day} regarding ${currDay.title}. In your mission work, what key engineering decision did you make around ${currDay.keyConcepts[1] || currDay.keyConcepts[0] || "system design"}?`,
      `Moving on to Day ${currDay.day} on ${currDay.title}: ${currDay.sampleQuestions[0] || `What are the primary considerations when implementing ${currDay.keyConcepts[0]}?`}`
    ];

    const qText = questionTemplates[(turnNum + nextDayNum) % questionTemplates.length];
    const reasoning = `Pivoting to Day ${currDay.day} (${currDay.title}) to broaden curriculum day coverage (currently ${coveredDays.length} days covered out of target >= 4).`;

    return {
      turnNumber: turnNum,
      questionText: qText,
      curriculumDay: currDay.day,
      topic: currDay.title,
      questionType: "pivot",
      aiReasoning: reasoning
    };
  } else if (nextType === "challenge") {
    const currDay = CURRICULUM_DAYS.find((d) => d.day === lastTurn.curriculumDay) || CURRICULUM_DAYS[0];
    
    // Pick an extract from candidate's response
    const snippet = lastResponse.split(".")[0].slice(0, 60);
    const qText = `That's a great point regarding "${snippet}...". Let's push this further into production edge cases: Suppose your traffic scales 10x overnight and latency spikes above 500ms. What bottleneck would hit ${currDay.title} first, and how would you redesign the component?`;

    const reasoning = `Candidate provided solid context on Day ${currDay.day}. Asking a high-scale production challenge question to test depth under stress.`;

    return {
      turnNumber: turnNum,
      questionText: qText,
      curriculumDay: currDay.day,
      topic: currDay.title,
      questionType: "challenge",
      aiReasoning: reasoning
    };
  } else {
    // Follow-up
    const currDay = CURRICULUM_DAYS.find((d) => d.day === lastTurn.curriculumDay) || CURRICULUM_DAYS[0];
    const secondQuestion = currDay.sampleQuestions[1] || currDay.sampleQuestions[0] || `How do you measure success for ${currDay.title}?`;

    const qText = `Following up on your answer: ${secondQuestion}`;
    const reasoning = `Deepening probe on Day ${currDay.day} (${currDay.title}) to evaluate granular domain knowledge and error recovery.`;

    return {
      turnNumber: turnNum,
      questionText: qText,
      curriculumDay: currDay.day,
      topic: currDay.title,
      questionType: "follow_up",
      aiReasoning: reasoning
    };
  }
}

export function generateFinalFeedbackReport(
  candidate: CandidateProfile,
  turns: TurnData[]
): {
  overallScore: number;
  commScore: number;
  readinessLevel: string;
  feedbackReport: {
    overallSummary: string;
    engineeringCommunication: string;
    strengths: string[];
    growthAreas: string[];
    recommendedFocus: string[];
    topicScores: Array<{
      topic: string;
      module: string;
      score: number;
      feedback: string;
    }>;
    daysEvaluated: number[];
  };
} {
  const coveredDays = Array.from(new Set(turns.map((t) => t.curriculumDay)));
  const answeredTurns = turns.filter((t) => t.candidateResponse && t.candidateResponse.trim().length > 0);

  const totalScoreSum = answeredTurns.reduce((acc, t) => acc + (t.turnScore || 7), 0);
  const avgScore = answeredTurns.length > 0 ? Math.round(totalScoreSum / answeredTurns.length) * 10 : 75;

  let readinessLevel = "Mid-Level AI Engineer";
  if (avgScore >= 85 && coveredDays.length >= 4) readinessLevel = "Senior / Production Ready AI Engineer";
  else if (avgScore >= 70 && coveredDays.length >= 3) readinessLevel = "Autonomous AI Engineer";
  else readinessLevel = "Junior / Needs Guided Practice";

  const commScore = Math.min(95, avgScore + 5);

  const daysEvaluated = coveredDays;

  // Compute topic scores
  const topicMap: Record<number, { day: CurriculumDay; turns: TurnData[] }> = {};
  turns.forEach((t) => {
    if (!topicMap[t.curriculumDay]) {
      const d = CURRICULUM_DAYS.find((c) => c.day === t.curriculumDay) || CURRICULUM_DAYS[0];
      topicMap[t.curriculumDay] = { day: d, turns: [] };
    }
    topicMap[t.curriculumDay].turns.push(t);
  });

  const topicScores = Object.values(topicMap).map(({ day, turns }) => {
    const scores = turns.map((t) => t.turnScore || 7);
    const avg = Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10);
    return {
      topic: `Day ${day.day}: ${day.title}`,
      module: day.module,
      score: avg,
      feedback: avg >= 80 ? `Strong performance in ${day.title}. Clearly articulated system constraints and trade-offs.` : `Satisfactory baseline knowledge in ${day.title}. Consider diving deeper into edge case recovery and latency metrics.`
    };
  });

  const strengths = [
    `Demonstrated structured technical reasoning across ${coveredDays.length} different curriculum modules.`,
    candidate.learningSignals[0] || "Articulate explanation of production tradeoffs and system boundaries.",
    "Proactive in describing implementation details rather than abstract high-level concepts."
  ];

  const growthAreas = [
    candidate.skippedTopics.length > 0 ? `Complete skipped cohort topics: Day ${candidate.skippedTopics.join(", ")}.` : "Deepen operational failure-mode analysis for high-throughput distributed vector systems.",
    "Practice quantitative analysis during response delivery (e.g., token latency, QPS memory footprints)."
  ];

  const recommendedFocus = [
    "Build a production-grade benchmark suite using Ragas or TruLens.",
    "Practice Model Context Protocol (MCP) server implementation over SSE.",
    "Review HNSW graph quantization parameters (ef_construction and M) under high write concurrency."
  ];

  const overallSummary = `${candidate.name} completed a multi-turn AI interview answering ${answeredTurns.length} questions across ${coveredDays.length} curriculum days (${coveredDays.map(d => `Day ${d}`).join(", ")}). Demonstrated ${avgScore >= 80 ? "strong technical fluency and solid engineering intuition" : "good technical grounding with opportunities for deeper edge-case analysis"}. Target Role alignment: ${candidate.targetRole}.`;

  const engineeringCommunication = `Scored ${commScore}/100. Communicated architecture concepts with clear terminology, logical structuring, and responsiveness to interviewer follow-ups.`;

  return {
    overallScore: avgScore,
    commScore,
    readinessLevel,
    feedbackReport: {
      overallSummary,
      engineeringCommunication,
      strengths,
      growthAreas,
      recommendedFocus,
      topicScores,
      daysEvaluated
    }
  };
}
