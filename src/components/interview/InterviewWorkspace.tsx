"use client";

import React, { useState, useEffect, useRef } from "react";
import { CandidateProfile } from "@/lib/candidate-data";
import { TurnData } from "@/lib/interview-agent";
import { useSpeechRecognition, useTextToSpeech } from "@/hooks/use-speech";
import {
  Mic,
  MicOff,
  Send,
  Sparkles,
  Bot,
  Brain,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Volume2,
  VolumeX,
  Award,
  Layers,
  HelpCircle,
  RefreshCw,
  Play,
  FileText
} from "lucide-react";

interface InterviewWorkspaceProps {
  candidate: CandidateProfile;
  ttsEnabled: boolean;
  onInterviewComplete: (
    interviewId: string,
    turns: TurnData[],
    overallScore: number,
    commScore: number,
    readinessLevel: string,
    feedbackReport: any
  ) => void;
  onSwitchCandidate: () => void;
}

export function InterviewWorkspace({
  candidate,
  ttsEnabled,
  onInterviewComplete,
  onSwitchCandidate,
}: InterviewWorkspaceProps) {
  const [interviewId, setInterviewId] = useState<string | null>(null);
  const [turns, setTurns] = useState<TurnData[]>([]);
  const [coveredDays, setCoveredDays] = useState<number[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const {
    isSupported: sttSupported,
    isListening,
    transcript,
    interimTranscript,
    startListening,
    stopListening,
    resetTranscript,
    setTranscript,
    audioLevels,
  } = useSpeechRecognition();

  const { speak, stop: stopTts, isSpeaking } = useTextToSpeech();

  // Initialize Interview Session
  const initSession = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/interview/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ candidate_id: candidate.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to start interview session");

      setInterviewId(data.interview_id);
      const firstTurn: TurnData = {
        turnNumber: data.current_question.turn_number,
        questionText: data.current_question.question_text,
        curriculumDay: data.current_question.curriculum_day,
        topic: data.current_question.topic,
        questionType: data.current_question.question_type,
        aiReasoning: data.current_question.ai_reasoning,
      };
      setTurns([firstTurn]);
      setCoveredDays(data.progress.covered_days);

      if (ttsEnabled) {
        speak(firstTurn.questionText);
      }
    } catch (err: any) {
      setError(err.message || "Failed to connect to interview agent server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initSession();
    return () => {
      stopTts();
      stopListening();
    };
  }, [candidate.id]);

  // Sync Speech Transcript to Input Area
  useEffect(() => {
    if (transcript) {
      setInputText(transcript);
    }
  }, [transcript]);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [turns, isListening, loading]);

  // Submit Answer
  const handleSubmitAnswer = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanText = inputText.trim();
    if (!cleanText || !interviewId || loading) return;

    if (isListening) {
      stopListening();
    }

    setLoading(true);
    setError(null);

    // Update locally with response text first for immediate feedback
    const updatedTurns = [...turns];
    const currentTurn = updatedTurns[updatedTurns.length - 1];
    currentTurn.candidateResponse = cleanText;
    setTurns(updatedTurns);
    setInputText("");
    resetTranscript();

    try {
      const res = await fetch("/api/interview/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          interview_id: interviewId,
          response_text: cleanText,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit answer");

      // Update current turn score & notes from server
      currentTurn.turnScore = data.last_turn_evaluated.score;
      currentTurn.evalNotes = data.last_turn_evaluated.eval_notes;

      if (data.next_question) {
        const nextTurn: TurnData = {
          turnNumber: data.next_question.turn_number,
          questionText: data.next_question.question_text,
          curriculumDay: data.next_question.curriculum_day,
          topic: data.next_question.topic,
          questionType: data.next_question.question_type,
          aiReasoning: data.next_question.ai_reasoning,
        };
        setTurns([...updatedTurns, nextTurn]);
        setCoveredDays(data.progress.covered_days);

        if (ttsEnabled) {
          speak(nextTurn.questionText);
        }
      } else {
        // No next question, ready to conclude
        setCoveredDays(data.progress.covered_days);
      }
    } catch (err: any) {
      setError(err.message || "Failed to submit response to interviewer.");
    } finally {
      setLoading(false);
    }
  };

  // Generate Final Feedback Report
  const handleFinalizeInterview = async () => {
    if (!interviewId) return;
    setLoading(true);
    try {
      const res = await fetch("/api/interview/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interview_id: interviewId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to finalize feedback");

      onInterviewComplete(
        data.interview_id,
        turns,
        data.overall_score,
        data.communication_score,
        data.readiness_level,
        data.feedback_report
      );
    } catch (err: any) {
      setError(err.message || "Failed to finalize interview scorecard.");
    } finally {
      setLoading(false);
    }
  };

  // Pre-made Sample Response Generator for quick speech testing
  const handleInsertSampleAnswer = () => {
    const currentTurn = turns[turns.length - 1];
    const samples: Record<number, string> = {
      1: "For few-shot prompting, we engineered structured exemplar templates with strict token budgets. We set temperature to 0.2 to maintain deterministic JSON responses while reducing context pollution.",
      6: "We evaluated recursive character chunking with 500 token windows and 50 token overlap. This preserved section headers and reduced loss of context across vector chunks.",
      8: "We combined BM25 lexical keyword retrieval with dense cosine similarity vectors using Reciprocal Rank Fusion with an alpha parameter of 0.6 to capture both domain jargon and semantic intent.",
      11: "In pgvector and Qdrant, we tuned HNSW parameters setting ef_construction to 128 and M to 16. This achieved 96% recall at 15ms latency under peak concurrent write load.",
      16: "In our ReAct agent loops, we enforced a strict 10-step limit with exception handlers. When tool calls failed, error outputs were fed back as observations to prompt self-correction.",
      21: "Model Context Protocol provides a clean standard separating Resources, Prompts, and Tools over STDIO or SSE transports, eliminating custom point-to-point glue code.",
      24: "We applied QLoRA 4-bit NF4 quantization with LoRA rank 16 and alpha 32 targeting attention projection matrices, reducing fine-tuning memory from 80GB to 14GB VRAM.",
    };

    const text = samples[currentTurn?.curriculumDay] || "In our production architecture, we optimized context window management, handled tool execution exceptions gracefully, and implemented Ragas automated metrics to continuously evaluate response faithfulness.";
    
    setInputText(text);
    setTranscript(text);
  };

  const currentTurn = turns[turns.length - 1];
  const totalQuestions = turns.length;
  const uniqueDaysCount = coveredDays.length;
  const meetsMinRequirement = totalQuestions >= 8 && uniqueDaysCount >= 4;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column: AI Agent Dashboard & Candidate Info */}
      <div className="lg:col-span-4 space-y-5">
        {/* Candidate Summary Box */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-3">
              <img
                src={candidate.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"}
                alt={candidate.name}
                className="w-10 h-10 rounded-xl object-cover border border-slate-700 shadow"
              />
              <div>
                <h3 className="text-sm font-bold text-white">{candidate.name}</h3>
                <p className="text-[11px] text-slate-400">{candidate.title}</p>
              </div>
            </div>
            <button
              onClick={onSwitchCandidate}
              className="text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold bg-indigo-950/50 px-2.5 py-1 rounded-lg border border-indigo-500/30"
            >
              Change
            </button>
          </div>

          {/* Requirements Tracker */}
          <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-slate-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> Challenge Progress
              </span>
              {meetsMinRequirement ? (
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  Ready to Conclude
                </span>
              ) : (
                <span className="text-[10px] font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                  In Progress
                </span>
              )}
            </div>

            {/* Metric 1: Min 8 Questions */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Questions Asked:</span>
                <span className="font-bold text-white">
                  {totalQuestions} / 8+ min
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (totalQuestions / 8) * 100)}%` }}
                />
              </div>
            </div>

            {/* Metric 2: Min 4 Curriculum Days */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Curriculum Days Covered:</span>
                <span className="font-bold text-white">
                  {uniqueDaysCount} / 4+ min
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-cyan-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (uniqueDaysCount / 4) * 100)}%` }}
                />
              </div>
            </div>

            {/* Covered Days Badges */}
            <div className="pt-2 border-t border-slate-800/80">
              <div className="text-[10px] text-slate-400 uppercase font-semibold mb-1.5">
                Evaluated Curriculum Days:
              </div>
              <div className="flex flex-wrap gap-1">
                {coveredDays.map((dayNum) => (
                  <span
                    key={dayNum}
                    className="px-2 py-0.5 text-[10px] font-bold rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                  >
                    Day {dayNum}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Conclude & Generate Feedback Button */}
          <button
            onClick={handleFinalizeInterview}
            disabled={loading}
            className={`w-full py-3 rounded-xl text-xs font-bold shadow-lg transition-all flex items-center justify-center gap-2 ${
              meetsMinRequirement
                ? "bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:opacity-90 text-white shadow-emerald-600/20"
                : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
            }`}
          >
            <Award className="w-4 h-4" />
            {meetsMinRequirement
              ? "Generate Final Scorecard & Feedback"
              : `Finish & Produce Feedback (${8 - totalQuestions > 0 ? `${8 - totalQuestions} questions remain` : "add more days"})`}
          </button>
        </div>

        {/* AI Interviewer Avatar & Voice Status */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center relative ${
              isSpeaking ? "bg-purple-600 text-white animate-pulse" : "bg-indigo-600/30 text-indigo-400 border border-indigo-500/40"
            }`}>
              <Bot className="w-6 h-6" />
              {isSpeaking && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full animate-ping" />
              )}
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                AI Interviewer Agent
                {isSpeaking && (
                  <span className="px-2 py-0.5 text-[9px] font-bold uppercase rounded bg-purple-500/20 text-purple-300">
                    Speaking
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400">
                Persona: Senior AI Engineering Lead
              </p>
            </div>
          </div>

          {/* Reasoning Inspector */}
          {currentTurn?.aiReasoning && (
            <div className="bg-slate-950 p-3.5 rounded-xl border border-indigo-500/30 space-y-1.5">
              <div className="text-[10px] uppercase font-bold text-indigo-400 flex items-center gap-1">
                <Brain className="w-3.5 h-3.5" /> Agent Decision Logic
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                {currentTurn.aiReasoning}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Conversational Transcript & Speech Control */}
      <div className="lg:col-span-8 flex flex-col h-[700px] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Chat Transcript Area */}
        <div className="flex-1 p-5 overflow-y-auto space-y-5 bg-slate-950/40">
          {turns.map((turn, idx) => (
            <div key={turn.turnNumber} className="space-y-3">
              {/* AI Question Message */}
              <div className="flex items-start gap-3 max-w-2xl">
                <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-indigo-300">
                      AI Interviewer
                    </span>
                    <span className="px-2 py-0.5 text-[9px] font-bold uppercase rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      Day {turn.curriculumDay} • {turn.topic}
                    </span>
                    <span className="text-[9px] uppercase font-semibold text-slate-400">
                      {turn.questionType}
                    </span>
                  </div>
                  <div className="bg-slate-900 border border-slate-800/90 text-slate-100 text-xs sm:text-sm p-4 rounded-2xl rounded-tl-none shadow-md leading-relaxed">
                    {turn.questionText}
                  </div>
                </div>
              </div>

              {/* Candidate Response Message */}
              {turn.candidateResponse && (
                <div className="flex items-start justify-end gap-3 max-w-2xl ml-auto">
                  <div className="space-y-1.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {turn.turnScore && (
                        <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          Score: {turn.turnScore * 10}/100
                        </span>
                      )}
                      <span className="text-[11px] font-bold text-slate-300">
                        {candidate.name}
                      </span>
                    </div>
                    <div className="bg-indigo-600/90 border border-indigo-500/50 text-white text-xs sm:text-sm p-4 rounded-2xl rounded-tr-none shadow-md leading-relaxed text-left">
                      {turn.candidateResponse}
                    </div>
                    {turn.evalNotes && (
                      <div className="text-[10px] text-slate-400 bg-slate-900/80 p-2 rounded-lg border border-slate-800 text-left italic">
                        <span className="text-emerald-400 font-semibold">Evaluation:</span> {turn.evalNotes}
                      </div>
                    )}
                  </div>
                  <img
                    src={candidate.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"}
                    alt={candidate.name}
                    className="w-8 h-8 rounded-xl object-cover border border-slate-700 shadow flex-shrink-0 mt-0.5"
                  />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3 text-xs text-indigo-400 bg-slate-900/80 p-3 rounded-xl border border-slate-800 w-fit">
              <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" />
              <span>AI Agent is evaluating candidate response and crafting follow-up question...</span>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Bar with Speech Recognition & Mic Controls */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 space-y-3">
          {/* Audio Wave Meter when Mic is active */}
          {isListening && (
            <div className="bg-indigo-950/60 p-3 rounded-xl border border-indigo-500/40 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                Listening to Microphone... Speak your answer now
              </div>
              <div className="flex items-end gap-1 h-5">
                {audioLevels.map((lvl, i) => (
                  <div
                    key={i}
                    className="w-1.5 bg-gradient-to-t from-indigo-500 to-cyan-400 rounded-full transition-all duration-75"
                    style={{ height: `${lvl}%` }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Speech Interim transcript preview */}
          {interimTranscript && (
            <div className="text-xs text-cyan-300 font-mono bg-slate-950 p-2 rounded-lg border border-cyan-500/30 italic">
              Live Speech Preview: "{interimTranscript}"
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmitAnswer} className="flex flex-col gap-2">
            <div className="relative flex items-center">
              <textarea
                rows={2}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  isListening
                    ? "Speak into your microphone or type your technical answer..."
                    : "Type or use speech recognition to answer technical interviewer..."
                }
                className="w-full pl-4 pr-24 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all resize-none"
              />

              <div className="absolute right-3 flex items-center gap-2">
                {/* Speech Mic Button */}
                <button
                  type="button"
                  onClick={isListening ? stopListening : startListening}
                  className={`p-2.5 rounded-xl text-xs font-bold transition-all ${
                    isListening
                      ? "bg-red-600 text-white animate-pulse shadow-lg shadow-red-600/30"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                  }`}
                  title={isListening ? "Stop Microphone" : "Start Speech Recognition"}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-indigo-400" />}
                </button>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!inputText.trim() || loading}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 disabled:opacity-40 text-white shadow-md shadow-indigo-600/30 transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Action Toolbar */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleInsertSampleAnswer}
                  className="hover:text-indigo-300 flex items-center gap-1 underline decoration-dashed"
                >
                  <FileText className="w-3 h-3 text-indigo-400" /> Insert Sample Speech Answer
                </button>
                {inputText && (
                  <button
                    type="button"
                    onClick={() => {
                      setInputText("");
                      resetTranscript();
                    }}
                    className="hover:text-slate-200"
                  >
                    Clear Text
                  </button>
                )}
              </div>
              <span>
                Press <kbd className="px-1 py-0.5 bg-slate-800 rounded text-[10px] text-slate-300">Enter</kbd> to submit
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
