"use client";

import React, { useState } from "react";
import { CURRICULUM_DAYS, CURRICULUM_MODULES, CurriculumDay } from "@/lib/curriculum-data";
import {
  BookOpen,
  Layers,
  CheckCircle2,
  Code2,
  HelpCircle,
  Search,
  ChevronRight,
  Sparkles,
  Database,
  Cpu,
  ShieldAlert,
  Sliders
} from "lucide-react";

export function CurriculumExplorer() {
  const [selectedModule, setSelectedModule] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDay, setSelectedDay] = useState<CurriculumDay | null>(CURRICULUM_DAYS[5]);

  const filteredDays = CURRICULUM_DAYS.filter((d) => {
    const matchesModule =
      selectedModule === "all" ||
      CURRICULUM_MODULES.find((m) => m.id === selectedModule)?.title === d.module;

    const matchesSearch =
      d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.keyConcepts.some((c) => c.toLowerCase().includes(searchTerm.toLowerCase())) ||
      d.toolsUsed.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesModule && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950/60 to-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <BookOpen className="w-4 h-4" /> Enterprise AI Engineering Syllabus
            </div>
            <h2 className="text-2xl font-bold text-white">31-Day Cohort Curriculum</h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Covers Prompt Engineering, Guardrails, RAG, Vector Databases, Agentic AI, Model Context Protocol (MCP), Fine-tuning, and Production AI Deployment.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-950/80 px-4 py-3 rounded-xl border border-slate-800">
            <Layers className="w-5 h-5 text-indigo-400" />
            <div>
              <div className="text-xs text-slate-400">Total Program Scope</div>
              <div className="text-sm font-bold text-white">6 Modules • 31 Days</div>
            </div>
          </div>
        </div>
      </div>

      {/* Module Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedModule("all")}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 ${
            selectedModule === "all"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
              : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
          }`}
        >
          All Modules (31 Days)
        </button>
        {CURRICULUM_MODULES.map((mod) => (
          <button
            key={mod.id}
            onClick={() => setSelectedModule(mod.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 ${
              selectedModule === mod.id
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
            }`}
          >
            {mod.title}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
        <input
          type="text"
          placeholder="Search by topic, concept (e.g. HNSW, MCP, LoRA), or tool..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>

      {/* Syllabus Grid & Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Days List */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
          {filteredDays.map((d) => {
            const isSelected = selectedDay?.day === d.day;
            return (
              <div
                key={d.day}
                onClick={() => setSelectedDay(d)}
                className={`cursor-pointer p-4 rounded-xl border transition-all ${
                  isSelected
                    ? "bg-slate-900 border-indigo-500 shadow-md shadow-indigo-500/10 ring-1 ring-indigo-500/30"
                    : "bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/80 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Day {d.day}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium truncate max-w-[180px]">
                    {d.module}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white mb-2 leading-snug">{d.title}</h4>
                <div className="flex flex-wrap gap-1">
                  {d.keyConcepts.slice(0, 3).map((c, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-slate-950 text-slate-400 px-2 py-0.5 rounded border border-slate-800"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Day Inspector */}
        <div className="lg:col-span-7">
          {selectedDay ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-indigo-600 text-white shadow">
                      Day {selectedDay.day}
                    </span>
                    <span className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">
                      {selectedDay.module}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-2">{selectedDay.title}</h3>
                </div>
              </div>

              {/* Interview Focus */}
              <div className="bg-gradient-to-r from-indigo-950/40 to-slate-950 p-4 rounded-xl border border-indigo-500/30">
                <div className="text-xs font-bold text-indigo-300 flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-4 h-4 text-indigo-400" /> AI Interviewer Evaluation Focus
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedDay.interviewFocus}
                </p>
              </div>

              {/* Learning Objectives */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Learning Objectives
                </h4>
                <div className="space-y-1.5">
                  {selectedDay.learningObjectives.map((obj, i) => (
                    <div
                      key={i}
                      className="text-xs text-slate-200 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools Used */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-cyan-400" /> Core Tools & Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedDay.toolsUsed.map((tool, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-xl bg-cyan-950/40 text-cyan-300 text-xs font-medium border border-cyan-500/30"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sample Interview Questions */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-purple-400" /> Sample Interview Questions
                </h4>
                <div className="space-y-2">
                  {selectedDay.sampleQuestions.map((q, i) => (
                    <div
                      key={i}
                      className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 italic"
                    >
                      "{q}"
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
              Select a day from the left list to view curriculum details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
