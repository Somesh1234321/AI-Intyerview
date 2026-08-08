"use client";

import React, { useState, useEffect } from "react";
import { SEED_CANDIDATES } from "@/lib/candidate-data";
import {
  History,
  Award,
  Calendar,
  CheckCircle2,
  ChevronRight,
  User,
  Search,
  Bot
} from "lucide-react";

export function SessionsHistory() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState<any | null>(null);

  useEffect(() => {
    // Simulated or fetched past session records
    setTimeout(() => {
      setSessions([
        {
          id: "int-sample-101",
          candidateName: "Alex Chen",
          candidateTitle: "Senior Backend Engineer",
          startedAt: "2025-02-18 14:30",
          totalQuestions: 9,
          coveredDays: [1, 6, 8, 11, 16],
          overallScore: 88,
          commScore: 92,
          readinessLevel: "Senior / Production Ready AI Engineer",
          summary: "Outstanding responses regarding BM25 hybrid search and pgvector HNSW indexing. Clear articulation of latency limits."
        },
        {
          id: "int-sample-102",
          candidateName: "Sarah Jenkins",
          candidateTitle: "Fullstack Developer",
          startedAt: "2025-02-17 11:15",
          totalQuestions: 10,
          coveredDays: [1, 3, 17, 21, 22, 29],
          overallScore: 94,
          commScore: 96,
          readinessLevel: "Senior / Production Ready AI Engineer",
          summary: "Demonstrated deep expertise in Model Context Protocol (MCP) server SSE transport and real-time streaming UX."
        },
        {
          id: "int-sample-103",
          candidateName: "Marcus Vance",
          candidateTitle: "Data Platform Engineer",
          startedAt: "2025-02-16 09:45",
          totalQuestions: 8,
          coveredDays: [6, 11, 12, 14, 28],
          overallScore: 82,
          commScore: 85,
          readinessLevel: "Autonomous AI Engineer",
          summary: "Strong in vector engine memory formulas and semantic cache invalidation strategies."
        }
      ]);
      setLoading(false);
    }, 300);
  }, []);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <History className="w-4 h-4" /> Historical Session Logs
          </div>
          <h2 className="text-2xl font-bold text-white">Interview Records & Scorecards</h2>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Review past technical interviews, candidate question transcripts, day coverage metrics, and final evaluation scorecards.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sessions List */}
        <div className="lg:col-span-6 space-y-3">
          {sessions.map((sess) => (
            <div
              key={sess.id}
              onClick={() => setSelectedSession(sess)}
              className={`cursor-pointer p-5 rounded-2xl border transition-all ${
                selectedSession?.id === sess.id
                  ? "bg-slate-900 border-indigo-500 shadow-lg shadow-indigo-500/10"
                  : "bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/80 hover:border-slate-700"
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    {sess.candidateName}
                  </h3>
                  <p className="text-xs text-slate-400">{sess.candidateTitle}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-extrabold text-indigo-300 bg-indigo-950 px-2.5 py-1 rounded-lg border border-indigo-800">
                    {sess.overallScore} / 100
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">{sess.startedAt}</div>
                </div>
              </div>

              <p className="text-xs text-slate-300 line-clamp-2 mb-3 leading-relaxed">
                {sess.summary}
              </p>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                <span>{sess.totalQuestions} Questions Asked</span>
                <span>{sess.coveredDays.length} Curriculum Days</span>
                <span className="text-emerald-400 font-semibold">{sess.readinessLevel}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Session Inspector */}
        <div className="lg:col-span-6">
          {selectedSession ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedSession.candidateName}</h3>
                  <p className="text-xs text-slate-400">{selectedSession.candidateTitle}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-extrabold text-emerald-400">
                    {selectedSession.overallScore} / 100
                  </div>
                  <div className="text-[10px] text-slate-400">Overall Technical Score</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Evaluated Days Covered
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSession.coveredDays.map((d: number) => (
                    <span
                      key={d}
                      className="px-2.5 py-1 text-xs font-bold rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                    >
                      Day {d}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <div className="text-xs font-bold text-purple-300 uppercase">Executive Summary</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedSession.summary}
                </p>
              </div>

              <div className="pt-2 text-xs text-slate-400">
                Assessed Level: <span className="font-bold text-emerald-300">{selectedSession.readinessLevel}</span>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
              Select a recorded session from the left list to inspect details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
