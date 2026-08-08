"use client";

import React, { useState } from "react";
import { CandidateProfile, SEED_CANDIDATES } from "@/lib/candidate-data";
import {
  User,
  CheckCircle2,
  XCircle,
  Brain,
  Target,
  Plus,
  Play,
  Award,
  Sparkles,
  Search,
  BookOpen
} from "lucide-react";

interface CandidateSelectorProps {
  candidates: CandidateProfile[];
  selectedCandidate: CandidateProfile;
  onSelectCandidate: (candidate: CandidateProfile) => void;
  onStartInterview: (candidateId: string) => void;
  onAddNewCandidate?: (candidate: CandidateProfile) => void;
}

export function CandidateSelector({
  candidates,
  selectedCandidate,
  onSelectCandidate,
  onStartInterview,
  onAddNewCandidate,
}: CandidateSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  // New Candidate Form State
  const [newName, setNewName] = useState("");
  const [newTitle, setNewNameTitle] = useState("Software Engineer");
  const [newTargetRole, setNewTargetRole] = useState("AI Systems Architect");
  const [newBio, setNewBio] = useState("");
  const [newSignals, setNewSignals] = useState("Mastered RAG, Needs practice in vector indexing");

  const filteredCandidates = candidates.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.targetRole.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateCandidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newCand: CandidateProfile = {
      id: `cand-${Date.now()}`,
      name: newName,
      title: newTitle,
      targetRole: newTargetRole,
      bio: newBio || "AI Cohort participant preparing for enterprise technical interview.",
      completedMissions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 16, 17, 21, 26, 27],
      skippedTopics: [23, 24],
      learningSignals: newSignals.split(",").map((s) => s.trim()).filter(Boolean),
      preferredStyle: "Conversational Technical",
      avatarUrl: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80`,
    };

    if (onAddNewCandidate) {
      onAddNewCandidate(newCand);
    }
    onSelectCandidate(newCand);
    setShowAddModal(false);
    setNewName("");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Brain className="w-4 h-4" /> Cohort Participant Intelligence
            </div>
            <h2 className="text-2xl font-bold text-white">Select Candidate Profile</h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Each profile contains learning signals, completed mission days, skipped topics, and strengths tracked during the 31-day program. The AI Interview Agent adapts question selection accordingly.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition-all"
            >
              <Plus className="w-4 h-4 text-indigo-400" />
              Add Custom Profile
            </button>
            <button
              onClick={() => onStartInterview(selectedCandidate.id)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:opacity-90 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all transform hover:scale-[1.02]"
            >
              <Play className="w-4 h-4 fill-white" />
              Launch Interview with {selectedCandidate.name.split(" ")[0]}
            </button>
          </div>
        </div>
      </div>

      {/* Search & Profile Grid */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search candidates by name, role, or background..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
        <div className="text-xs text-slate-400">
          Showing <span className="font-semibold text-slate-200">{filteredCandidates.length}</span> candidates
        </div>
      </div>

      {/* Candidates List Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCandidates.map((cand) => {
          const isSelected = selectedCandidate.id === cand.id;
          return (
            <div
              key={cand.id}
              onClick={() => onSelectCandidate(cand)}
              className={`cursor-pointer rounded-2xl p-5 border transition-all duration-200 relative flex flex-col justify-between ${
                isSelected
                  ? "bg-slate-900/90 border-indigo-500 shadow-lg shadow-indigo-500/10 ring-2 ring-indigo-500/30"
                  : "bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/80 hover:border-slate-700"
              }`}
            >
              <div>
                {/* Header info */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={cand.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"}
                      alt={cand.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-700 shadow"
                    />
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        {cand.name}
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                        )}
                      </h3>
                      <p className="text-xs text-slate-400">{cand.title}</p>
                    </div>
                  </div>
                  {isSelected && (
                    <span className="px-2 py-1 text-[10px] font-bold rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      SELECTED
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-xs text-cyan-300 font-medium">
                    Target: {cand.targetRole}
                  </span>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                  {cand.bio}
                </p>

                {/* Progress Stats */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-slate-950/60 rounded-xl p-2.5 border border-slate-800/60">
                    <div className="text-[10px] text-slate-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Completed
                    </div>
                    <div className="text-sm font-bold text-emerald-300 mt-0.5">
                      {cand.completedMissions.length} / 31 Days
                    </div>
                  </div>

                  <div className="bg-slate-950/60 rounded-xl p-2.5 border border-slate-800/60">
                    <div className="text-[10px] text-slate-400 flex items-center gap-1">
                      <XCircle className="w-3 h-3 text-amber-400" /> Skipped
                    </div>
                    <div className="text-sm font-bold text-amber-300 mt-0.5">
                      {cand.skippedTopics.length} Days
                    </div>
                  </div>
                </div>

                {/* Learning Signals Badges */}
                <div className="space-y-1.5 mb-4">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1">
                    <Brain className="w-3 h-3 text-purple-400" /> Key Learning Signals:
                  </div>
                  <div className="space-y-1">
                    {cand.learningSignals.slice(0, 3).map((sig, idx) => (
                      <div
                        key={idx}
                        className="text-[11px] text-slate-300 bg-slate-950/40 px-2.5 py-1 rounded-lg border border-slate-800/50 flex items-center gap-1.5 truncate"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                        <span className="truncate">{sig}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Style: <span className="text-slate-200">{cand.preferredStyle}</span>
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCandidate(cand);
                    onStartInterview(cand.id);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white text-xs font-semibold border border-indigo-500/30 transition-all flex items-center gap-1.5"
                >
                  <Play className="w-3 h-3" /> Interview
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Custom Profile Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-indigo-400" /> Create Custom Candidate Profile
            </h3>
            <form onSubmit={handleCreateCandidate} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Candidate Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jordan Miller"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Current Title</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewNameTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Target AI Role</label>
                  <input
                    type="text"
                    value={newTargetRole}
                    onChange={(e) => setNewTargetRole(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Background Bio</label>
                <textarea
                  rows={2}
                  value={newBio}
                  onChange={(e) => setNewBio(e.target.value)}
                  placeholder="Brief description of experience and cohort progress..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Learning Signals (comma separated)</label>
                <input
                  type="text"
                  value={newSignals}
                  onChange={(e) => setNewSignals(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-medium hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 shadow-md shadow-indigo-600/30"
                >
                  Create & Select
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
