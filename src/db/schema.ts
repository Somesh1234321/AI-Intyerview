import { pgTable, text, timestamp, integer, jsonb, boolean, varchar } from "drizzle-orm/pg-core";

export const candidates = pgTable("candidates", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  avatarUrl: text("avatar_url"),
  bio: text("bio").notNull(),
  completedMissions: jsonb("completed_missions").$type<number[]>().notNull(),
  skippedTopics: jsonb("skipped_topics").$type<number[]>().notNull(),
  learningSignals: jsonb("learning_signals").$type<string[]>().notNull(),
  preferredStyle: text("preferred_style").default("conversational"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const interviews = pgTable("interviews", {
  id: text("id").primaryKey(),
  candidateId: text("candidate_id").notNull(),
  status: text("status").notNull().default("in_progress"), // in_progress | completed
  startedAt: timestamp("started_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
  totalQuestions: integer("total_questions").default(0).notNull(),
  coveredDays: jsonb("covered_days").$type<number[]>().default([]).notNull(),
  overallScore: integer("overall_score"),
  commScore: integer("comm_score"),
  readinessLevel: text("readiness_level"),
  feedbackReport: jsonb("feedback_report").$type<{
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
  }>(),
});

export const interviewTurns = pgTable("interview_turns", {
  id: text("id").primaryKey(),
  interviewId: text("interview_id").notNull(),
  turnNumber: integer("turn_number").notNull(),
  questionText: text("question_text").notNull(),
  curriculumDay: integer("curriculum_day").notNull(),
  topic: text("topic").notNull(),
  questionType: text("question_type").notNull(), // initial | follow_up | challenge | pivot
  aiReasoning: text("ai_reasoning"),
  candidateResponse: text("candidate_response"),
  responseAudioDuration: integer("response_audio_duration"),
  turnScore: integer("turn_score"),
  evalNotes: text("eval_notes"),
  askedAt: timestamp("asked_at").defaultNow().notNull(),
  answeredAt: timestamp("answered_at"),
});
