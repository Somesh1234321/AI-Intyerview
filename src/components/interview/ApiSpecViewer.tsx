"use client";

import React, { useState } from "react";
import {
  Code2,
  Play,
  Send,
  CheckCircle2,
  Copy,
  Layers,
  Terminal,
  ExternalLink,
  Bot
} from "lucide-react";

export function ApiSpecViewer() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<"start" | "respond" | "feedback" | "candidates" | "curriculum">("start");
  const [requestPayload, setRequestPayload] = useState<string>('{\n  "candidate_id": "cand-alex-chen"\n}');
  const [responseOutput, setResponseOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const endpoints = [
    {
      id: "start",
      method: "POST",
      path: "/api/interview/start",
      desc: "Initialize a new personalized technical interview session for a candidate.",
      sampleBody: '{\n  "candidate_id": "cand-alex-chen"\n}'
    },
    {
      id: "respond",
      method: "POST",
      path: "/api/interview/respond",
      desc: "Submit candidate answer and receive AI follow-up/pivot question with progress metrics.",
      sampleBody: '{\n  "interview_id": "REPLACE_WITH_ID",\n  "response_text": "We implemented recursive chunking with 500 token windows and BM25 hybrid search..."\n}'
    },
    {
      id: "feedback",
      method: "POST",
      path: "/api/interview/feedback",
      desc: "Finalize the interview session and receive the structured scorecard evaluation report.",
      sampleBody: '{\n  "interview_id": "REPLACE_WITH_ID"\n}'
    },
    {
      id: "candidates",
      method: "GET",
      path: "/api/candidates",
      desc: "Retrieve all candidate profiles with completed missions and learning signals.",
      sampleBody: ""
    },
    {
      id: "curriculum",
      method: "GET",
      path: "/api/curriculum",
      desc: "Retrieve complete 31-day AI Cohort curriculum with key concepts and tools.",
      sampleBody: ""
    }
  ];

  const currentEp = endpoints.find((e) => e.id === selectedEndpoint)!;

  const handleSelectEndpoint = (ep: typeof currentEp) => {
    setSelectedEndpoint(ep.id as any);
    setRequestPayload(ep.sampleBody);
    setResponseOutput(null);
  };

  const handleRunRequest = async () => {
    setLoading(true);
    try {
      let options: RequestInit = { method: currentEp.method };
      if (currentEp.method === "POST") {
        options.headers = { "Content-Type": "application/json" };
        options.body = requestPayload;
      }

      const res = await fetch(currentEp.path, options);
      const data = await res.json();
      setResponseOutput(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setResponseOutput(JSON.stringify({ error: err.message }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (responseOutput) {
      navigator.clipboard.writeText(responseOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-cyan-950/60 to-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Code2 className="w-4 h-4" /> Technical Specification HTTP Endpoints
          </div>
          <h2 className="text-2xl font-bold text-white">API Explorer & Interactive Playground</h2>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Test the required REST API endpoints for candidate evaluation, turn generation, and feedback report generation.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Endpoints Sidebar */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">
            Available Endpoints
          </div>
          {endpoints.map((ep) => {
            const isSelected = selectedEndpoint === ep.id;
            return (
              <div
                key={ep.id}
                onClick={() => handleSelectEndpoint(ep as any)}
                className={`cursor-pointer p-3.5 rounded-xl border transition-all ${
                  isSelected
                    ? "bg-slate-900 border-indigo-500 shadow-md shadow-indigo-500/10 ring-1 ring-indigo-500/30"
                    : "bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/80 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                      ep.method === "POST"
                        ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                        : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    }`}
                  >
                    {ep.method}
                  </span>
                  <span className="text-xs font-bold font-mono text-slate-200">{ep.path}</span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2">{ep.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Request / Response Workbench */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <span
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg ${
                    currentEp.method === "POST"
                      ? "bg-indigo-600 text-white"
                      : "bg-emerald-600 text-white"
                  }`}
                >
                  {currentEp.method}
                </span>
                <span className="text-sm font-bold font-mono text-white">{currentEp.path}</span>
              </div>
              <button
                onClick={handleRunRequest}
                disabled={loading}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:opacity-90 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all flex items-center gap-1.5 disabled:opacity-50"
              >
                {loading ? (
                  <Terminal className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                Execute Request
              </button>
            </div>

            <p className="text-xs text-slate-300">{currentEp.desc}</p>

            {/* Request Body Input if POST */}
            {currentEp.method === "POST" && (
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase text-slate-400">
                  Request JSON Body
                </label>
                <textarea
                  rows={5}
                  value={requestPayload}
                  onChange={(e) => setRequestPayload(e.target.value)}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-cyan-300 focus:outline-none focus:border-indigo-500"
                />
              </div>
            )}

            {/* Response Area */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase text-slate-400">
                  Response Output
                </label>
                {responseOutput && (
                  <button
                    onClick={handleCopy}
                    className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    {copied ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    {copied ? "Copied" : "Copy JSON"}
                  </button>
                )}
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 min-h-[180px] max-h-[350px] overflow-auto">
                {responseOutput ? (
                  <pre>{responseOutput}</pre>
                ) : (
                  <span className="text-slate-600 italic">
                    Click "Execute Request" above to test the API endpoint.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
