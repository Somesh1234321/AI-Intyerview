"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { CandidateSelector } from "@/components/interview/CandidateSelector";
import { CurriculumExplorer } from "@/components/interview/CurriculumExplorer";
import { ApiSpecViewer } from "@/components/interview/ApiSpecViewer";
import { InterviewWorkspace } from "@/components/interview/InterviewWorkspace";
import { FeedbackReportView } from "@/components/interview/FeedbackReportView";
import { SessionsHistory } from "@/components/interview/SessionsHistory";
import { CandidateProfile, SEED_CANDIDATES } from "@/lib/candidate-data";
import { TurnData } from "@/lib/interview-agent";
import { useTextToSpeech } from "@/hooks/use-speech";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"interview" | "candidates" | "curriculum" | "history" | "api">("interview");
  const [candidates, setCandidates] = useState<CandidateProfile[]>(SEED_CANDIDATES);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateProfile>(SEED_CANDIDATES[0]);
  
  // View mode in Interview tab: "workspace" or "feedback"
  const [interviewView, setInterviewView] = useState<"workspace" | "feedback">("workspace");

  // Completed interview feedback state
  const [completedReport, setCompletedReport] = useState<{
    interviewId: string;
    turns: TurnData[];
    overallScore: number;
    commScore: number;
    readinessLevel: string;
    feedbackReport: any;
  } | null>(null);

  const { enabled: ttsEnabled, toggleEnabled: toggleTts } = useTextToSpeech();

  // Load initial candidate list from API if available
  useEffect(() => {
    fetch("/api/candidates")
      .then((res) => res.json())
      .then((data) => {
        if (data.candidates && Array.isArray(data.candidates) && data.candidates.length > 0) {
          setCandidates(data.candidates);
          setSelectedCandidate(data.candidates[0]);
        }
      })
      .catch((err) => console.warn("Candidates API fetch fallback to seeds:", err));
  }, []);

  const handleStartInterview = (candidateId: string) => {
    const cand = candidates.find((c) => c.id === candidateId) || selectedCandidate;
    setSelectedCandidate(cand);
    setInterviewView("workspace");
    setActiveTab("interview");
  };

  const handleAddNewCandidate = (newCand: CandidateProfile) => {
    setCandidates((prev) => [newCand, ...prev]);
  };

  const handleInterviewComplete = (
    interviewId: string,
    turns: TurnData[],
    overallScore: number,
    commScore: number,
    readinessLevel: string,
    feedbackReport: any
  ) => {
    setCompletedReport({
      interviewId,
      turns,
      overallScore,
      commScore,
      readinessLevel,
      feedbackReport,
    });
    setInterviewView("feedback");
  };

  const handleRestartInterview = () => {
    setCompletedReport(null);
    setInterviewView("workspace");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white antialiased">
      {/* Top Sticky Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        ttsEnabled={ttsEnabled}
        toggleTts={toggleTts}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "interview" && (
          <div>
            {interviewView === "workspace" ? (
              <InterviewWorkspace
                key={selectedCandidate.id}
                candidate={selectedCandidate}
                ttsEnabled={ttsEnabled}
                onInterviewComplete={handleInterviewComplete}
                onSwitchCandidate={() => setActiveTab("candidates")}
              />
            ) : completedReport ? (
              <FeedbackReportView
                candidate={selectedCandidate}
                overallScore={completedReport.overallScore}
                commScore={completedReport.commScore}
                readinessLevel={completedReport.readinessLevel}
                feedbackReport={completedReport.feedbackReport}
                turns={completedReport.turns}
                onRestartInterview={handleRestartInterview}
              />
            ) : null}
          </div>
        )}

        {activeTab === "candidates" && (
          <CandidateSelector
            candidates={candidates}
            selectedCandidate={selectedCandidate}
            onSelectCandidate={setSelectedCandidate}
            onStartInterview={handleStartInterview}
            onAddNewCandidate={handleAddNewCandidate}
          />
        )}

        {activeTab === "curriculum" && <CurriculumExplorer />}

        {activeTab === "history" && <SessionsHistory />}

        {activeTab === "api" && <ApiSpecViewer />}
      </main>
    </div>
  );
}
