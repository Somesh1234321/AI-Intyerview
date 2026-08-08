export interface CandidateProfile {
  id: string;
  name: string;
  title: string;
  bio: string;
  completedMissions: number[];
  skippedTopics: number[];
  learningSignals: string[];
  preferredStyle: string;
  avatarUrl?: string;
  targetRole: string;
}

export const SEED_CANDIDATES: CandidateProfile[] = [
  {
    id: "cand-alex-chen",
    name: "Alex Chen",
    title: "Senior Backend Engineer",
    targetRole: "Senior AI Systems Architect",
    bio: "Ex-Fintech backend developer with 6 years experience in Java & Go. Transitioning into AI Engineering through the AI Cohort.",
    completedMissions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    skippedTopics: [21, 22],
    learningSignals: [
      "Mastered RAG & Hybrid Search (Day 8)",
      "Strong background in HNSW vector database indexing (Day 11, 14)",
      "Struggled with Agent Memory state management during Day 18 mission",
      "Skipped MCP Transport protocols (Day 21, 22)",
      "Tends to provide highly detailed systems-level answers with precise metrics"
    ],
    preferredStyle: "Technical & Systems Deep-dive",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "cand-sarah-jenkins",
    name: "Sarah Jenkins",
    title: "Fullstack Developer",
    targetRole: "AI Product Engineer",
    bio: "Fullstack React & Node.js specialist who completed all 31 days of the cohort. Passionate about user-facing AI agents and streaming interfaces.",
    completedMissions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
    skippedTopics: [],
    learningSignals: [
      "Completed all 31 cohort missions with top evaluation marks",
      "Excellence in Prompt Engineering, Guardrails, and Dynamic Tool Calling (Days 1-4, 17)",
      "Built custom Model Context Protocol (MCP) server over SSE on Day 22",
      "Minor weakness in mathematical intuition for QLoRA double quantization (Day 24)",
      "Highly articulate in explaining streaming UX (Day 29) and observability (Day 27)"
    ],
    preferredStyle: "Balanced Technical & Pragmatic UX",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "cand-marcus-vance",
    name: "Marcus Vance",
    title: "Data Platform Engineer",
    targetRole: "AI Infrastructure / Vector DB Specialist",
    bio: "Data engineer specialized in distributed systems, Spark, and PostgreSQL. Focused on vector storage engines and high-throughput retrieval pipelines.",
    completedMissions: [1, 3, 6, 7, 8, 9, 11, 12, 13, 14, 15, 26, 27, 28, 31],
    skippedTopics: [19, 20, 23, 24, 25],
    learningSignals: [
      "Deep expertise in Vector Storage, pgvector, and HNSW graph parameters (Days 11-15)",
      "Strong grasping of Semantic Caching and cost optimization (Day 28)",
      "Skipped Agentic AI Plan-and-Execute loops (Day 19) and Fine-tuning DPO (Day 24, 25)",
      "Loves discussing memory footprints, QPS throughput, and cache invalidation strategies"
    ],
    preferredStyle: "Infrastructure & Low-level Performance",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "cand-priya-sharma",
    name: "Priya Sharma",
    title: "Machine Learning Engineer",
    targetRole: "Lead AI Researcher & Engineer",
    bio: "M.S. in Computer Vision & NLP. Extensive experience in PyTorch fine-tuning and LLM evaluation benchmarks.",
    completedMissions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
    skippedTopics: [],
    learningSignals: [
      "Exceptional grasp of LoRA/QLoRA parameter-efficient fine-tuning (Day 24)",
      "Deep understanding of DPO preference optimization vs RLHF (Day 25)",
      "Designed Ragas automated evaluation pipelines for enterprise search (Day 26)",
      "Strong candidate for complex agentic tool synthesis and edge-case challenge questions"
    ],
    preferredStyle: "Academic & Mathematical Precision",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "cand-david-kim",
    name: "David Kim",
    title: "Frontend & Fullstack Engineer",
    targetRole: "AI Application Developer",
    bio: "Software developer with 3 years experience building Next.js apps. Exploring LLM application layer engineering.",
    completedMissions: [1, 2, 3, 4, 5, 6, 7, 8, 16, 17, 21, 29],
    skippedTopics: [9, 10, 11, 12, 13, 14, 15, 23, 24, 25],
    learningSignals: [
      "Solid understanding of basic RAG (Day 6, 7) and Prompting (Days 1-3)",
      "Skipped deep vector database indexing internals (Days 11-15)",
      "Attempted ReAct loops (Day 16) but had questions about tool error recovery",
      "Very keen on learning and open to constructive feedback during the interview"
    ],
    preferredStyle: "Interactive & Direct Feedback",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
  }
];
