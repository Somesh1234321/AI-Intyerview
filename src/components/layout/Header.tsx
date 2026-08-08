"use client";

import React from "react";
import {
  Bot,
  Users,
  BookOpen,
  Volume2,
  VolumeX,
  Code2,
  Sparkles,
  CheckCircle2,
  ListOrdered
} from "lucide-react";

interface HeaderProps {
  activeTab: "interview" | "candidates" | "curriculum" | "history" | "api";
  setActiveTab: (tab: "interview" | "candidates" | "curriculum" | "history" | "api") => void;
  ttsEnabled: boolean;
  toggleTts: () => void;
}

export function Header({ activeTab, setActiveTab, ttsEnabled, toggleTts }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Bot className="w-5 h-5 text-indigo-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                  AI Interview Agent
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  AI Cohort
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Conducting technical interviews on the 31-day Enterprise AI curriculum
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab("interview")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === "interview"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Interview Workspace
            </button>

            <button
              onClick={() => setActiveTab("candidates")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === "candidates"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              Candidate Profiles
            </button>

            <button
              onClick={() => setActiveTab("curriculum")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === "curriculum"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              31-Day Syllabus
            </button>

            <button
              onClick={() => setActiveTab("api")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === "api"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              API Specs
            </button>
          </nav>

          {/* Audio TTS toggle & Quick Specs */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTts}
              title={ttsEnabled ? "Disable Text-To-Speech interviewer voice" : "Enable Text-To-Speech interviewer voice"}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                ttsEnabled
                  ? "bg-purple-950/40 border-purple-500/40 text-purple-300 hover:bg-purple-900/50"
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800"
              }`}
            >
              {ttsEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 text-purple-400 animate-bounce" />
                  <span className="hidden sm:inline">Voice Agent ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-slate-500" />
                  <span className="hidden sm:inline">Voice Agent OFF</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
