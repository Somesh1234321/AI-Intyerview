"use client";

import React from "react";
import { CandidateProfile } from "@/lib/candidate-data";
import { TurnData } from "@/lib/interview-agent";
import {
  Award,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Brain,
  MessageSquare,
  Sparkles,
  Download,
  RotateCcw,
  BookOpen,
  ArrowRight,
  TrendingUp
} from "lucide-react";

interface FeedbackReportViewProps {
  candidate: CandidateProfile;
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
  turns: TurnData[];
  onRestartInterview: () => void;
}

export function FeedbackReportView({
  candidate,
  overallScore,
  commScore,
  readinessLevel,
  feedbackReport,
  turns,
  onRestartInterview,
}: FeedbackReportViewProps) {
  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={candidate.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"}
              alt={candidate.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500/50 shadow-xl"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Interview Concluded
                </span>
                <span className="text-xs text-slate-400">Target Role: {candidate.targetRole}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                {candidate.name} Evaluation Scorecard
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Evaluated across {feedbackReport.daysEvaluated.length} curriculum days with {turns.length} technical turns.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-indigo-400" /> Print Report
            </button>
            <button
              onClick={onRestartInterview}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Start New Session
            </button>
          </div>
        </div>
      </div>

      {/* Key Metric Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Technical Score */}
        <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-indigo-400" /> Overall Technical Score
            </span>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-indigo-500/20 text-indigo-300">
              AI Cohort Scale
            </span>
          </div>
          <div className="my-3 flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-white">{overallScore}</span>
            <span className="text-slate-400 text-sm font-semibold">/ 100</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full rounded-full transition-all duration-1000"
              style={{ width: `${overallScore}%` }}
            />
          </div>
        </div>

        {/* Communication Rating */}
        <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-purple-400" /> Engineering Comm
            </span>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-purple-500/20 text-purple-300">
              Clarity & Structure
            </span>
          </div>
          <div className="my-3 flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-white">{commScore}</span>
            <span className="text-slate-400 text-sm font-semibold">/ 100</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-1000"
              style={{ width: `${commScore}%` }}
            />
          </div>
        </div>

        {/* Readiness Level Badge */}
        <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-400" /> Enterprise Readiness
            </span>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-500/20 text-emerald-300">
              Assessed Level
            </span>
          </div>
          <div className="my-3">
            <div className="text-lg font-bold text-emerald-300 leading-tight">
              {readinessLevel}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Based on response depth and problem-solving
            </div>
          </div>
          <div className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">
            Ready for live engineering deployment
          </div>
        </div>
      </div>

      {/* Summary Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Brain className="w-4 h-4 text-indigo-400" /> Executive Interview Summary
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {feedbackReport.overallSummary}
        </p>
        <p className="text-xs text-slate-400 bg-slate-950 p-3 rounded-xl border border-slate-800 italic">
          "{feedbackReport.engineeringCommunication}"
        </p>
      </div>

      {/* Strengths & Growth Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-3">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Highlighted Technical Strengths
          </h3>
          <div className="space-y-2">
            {feedbackReport.strengths.map((str, idx) => (
              <div
                key={idx}
                className="text-xs text-slate-200 bg-emerald-950/20 border border-emerald-500/20 p-3 rounded-xl flex items-start gap-2.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                <span>{str}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Growth Areas */}
        <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-3">
          <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400" /> Key Growth & Practice Areas
          </h3>
          <div className="space-y-2">
            {feedbackReport.growthAreas.map((gro, idx) => (
              <div
                key={idx}
                className="text-xs text-slate-200 bg-amber-950/20 border border-amber-500/20 p-3 rounded-xl flex items-start gap-2.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                <span>{gro}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Topic Score Bars */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-cyan-400" /> Topic Breakdown & Score Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {feedbackReport.topicScores.map((t, idx) => (
            <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-200">{t.topic}</span>
                <span className="font-extrabold text-cyan-300">{t.score} / 100</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-cyan-500 h-full rounded-full"
                  style={{ width: `${t.score}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400">{t.feedback}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Actionable Next Steps */}
      <div className="bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/40 border border-purple-500/30 rounded-2xl p-6 shadow-xl space-y-3">
        <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" /> Recommended Action Steps
        </h3>
        <div className="space-y-2">
          {feedbackReport.recommendedFocus.map((rec, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
              <ArrowRight className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
              <span>{rec}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Transcript Review */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-indigo-400" /> Turn-by-Turn Question Analysis
        </h3>
        <div className="space-y-4">
          {turns.map((turn) => (
            <div key={turn.turnNumber} className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-indigo-600 text-white">
                    Turn {turn.turnNumber}
                  </span>
                  <span className="text-xs font-semibold text-slate-300">
                    Day {turn.curriculumDay}: {turn.topic}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800">
                    {turn.questionType}
                  </span>
                </div>
                {turn.turnScore && (
                  <span className="text-xs font-extrabold text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-800">
                    Score: {turn.turnScore * 10} / 100
                  </span>
                )}
              </div>

              {/* Question */}
              <div className="text-xs text-indigo-200 font-medium bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                Q: {turn.questionText}
              </div>

              {/* Reasoning */}
              {turn.aiReasoning && (
                <div className="text-[11px] text-slate-400 italic bg-slate-900/40 p-2 rounded border border-slate-800/60">
                  <span className="font-semibold text-purple-400">AI Agent Reasoning:</span> {turn.aiReasoning}
                </div>
              )}

              {/* Candidate Response */}
              <div className="text-xs text-slate-300 bg-slate-900 p-3 rounded-lg border border-slate-800">
                <span className="font-bold text-slate-400">Candidate Answer: </span>
                {turn.candidateResponse || "(No response captured)"}
              </div>

              {/* Evaluation Notes */}
              {turn.evalNotes && (
                <div className="text-[11px] text-slate-400 bg-slate-900/60 p-2.5 rounded border border-slate-800">
                  <span className="font-semibold text-emerald-400">Evaluation: </span> {turn.evalNotes}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
