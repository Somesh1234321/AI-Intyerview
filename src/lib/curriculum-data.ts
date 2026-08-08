export interface CurriculumDay {
  day: number;
  title: string;
  module: string;
  learningObjectives: string[];
  keyConcepts: string[];
  toolsUsed: string[];
  interviewFocus: string;
  sampleQuestions: string[];
}

export interface CurriculumModule {
  id: string;
  title: string;
  description: string;
  days: number[];
}

export const CURRICULUM_MODULES: CurriculumModule[] = [
  {
    id: "module-1",
    title: "Prompt Engineering & Guardrails",
    description: "Foundational LLM interactions, structured outputs, prompt security, and prompt orchestration.",
    days: [1, 2, 3, 4, 5]
  },
  {
    id: "module-2",
    title: "Retrieval-Augmented Generation (RAG)",
    description: "Chunking, embedding models, dense & sparse retrieval, hybrid search, and context reranking.",
    days: [6, 7, 8, 9, 10]
  },
  {
    id: "module-3",
    title: "Vector Databases & Knowledge Indexing",
    description: "Vector indexing (HNSW, IVF), distance metrics, metadata filtering, and database scaling.",
    days: [11, 12, 13, 14, 15]
  },
  {
    id: "module-4",
    title: "Agentic AI & Tool Integration",
    description: "ReAct loops, function calling, state management, memory, and multi-agent systems.",
    days: [16, 17, 18, 19, 20]
  },
  {
    id: "module-5",
    title: "Model Context Protocol (MCP) & Fine-Tuning",
    description: "MCP protocol specification, transport layers, LoRA/QLoRA parameter-efficient fine-tuning.",
    days: [21, 22, 23, 24, 25]
  },
  {
    id: "module-6",
    title: "Production AI, Guardrails & Deployment",
    description: "LLM evaluation metrics, observability, latency/cost caching, safety filters, and production serving.",
    days: [26, 27, 28, 29, 30, 31]
  }
];

export const CURRICULUM_DAYS: CurriculumDay[] = [
  {
    day: 1,
    title: "Prompt Design & Few-Shot In-Context Learning",
    module: "Prompt Engineering & Guardrails",
    learningObjectives: [
      "Master system vs user prompts",
      "Formulate zero-shot and few-shot exemplars",
      "Understand token context limits and temperature trade-offs"
    ],
    keyConcepts: ["In-Context Learning", "System Prompt Architecture", "Temperature & Top_P", "Token Economy"],
    toolsUsed: ["OpenAI API", "Anthropic Claude SDK", "PromptLab"],
    interviewFocus: "How to craft robust prompts that yield consistent deterministic outputs without context window pollution.",
    sampleQuestions: [
      "What engineering strategies do you use when few-shot examples consume too many tokens in long conversations?",
      "How does temperature affect token probability distribution during sampling in production prompts?"
    ]
  },
  {
    day: 2,
    title: "Chain-of-Thought (CoT) & Step-by-Step Reasoning",
    module: "Prompt Engineering & Guardrails",
    learningObjectives: [
      "Implement zero-shot CoT and manual CoT prompting",
      "Decompose complex reasoning into sub-tasks",
      "Measure impact of reasoning tokens on latency"
    ],
    keyConcepts: ["CoT Reasoning", "Self-Consistency", "Tree-of-Thought", "Latency Trade-offs"],
    toolsUsed: ["LangChain Prompts", "LlamaIndex"],
    interviewFocus: "Evaluating complex reasoning pipelines and balancing reasoning quality against inferencing latency.",
    sampleQuestions: [
      "When would you use Self-Consistency sampling over standard Chain-of-Thought, and what is the cost implications?",
      "How do you inspect intermediate reasoning steps in production without exposing sensitive logic to end users?"
    ]
  },
  {
    day: 3,
    title: "Structured Outputs & JSON Schema Guarantees",
    module: "Prompt Engineering & Guardrails",
    learningObjectives: [
      "Enforce JSON Schema compliance using Instructor / Pydantic",
      "Handle JSON repair and schema validation retries",
      "Implement Function Calling output formats"
    ],
    keyConcepts: ["Pydantic Validation", "Instructor SDK", "JSON Repair", "Grammar-based Decoding"],
    toolsUsed: ["Pydantic", "Instructor", "Zod"],
    interviewFocus: "Guaranteeing typed schema outputs from non-deterministic LLM responses in core backend pipelines.",
    sampleQuestions: [
      "How do you handle schema validation errors when an LLM produces truncated or invalid JSON under high load?",
      "What is the difference between constrained grammar decoding at model runtime versus application-layer Pydantic retries?"
    ]
  },
  {
    day: 4,
    title: "Prompt Injection & Safety Guardrails",
    module: "Prompt Engineering & Guardrails",
    learningObjectives: [
      "Identify direct and indirect prompt injection vectors",
      "Implement input sanitization and output moderation layers",
      "Build defensive system prompts against jailbreaks"
    ],
    keyConcepts: ["Prompt Injection", "Jailbreaking", "Input Sanitization", "Dual-LLM Guardrail"],
    toolsUsed: ["Guardrails AI", "NeMo Guardrails", "Llama Guard"],
    interviewFocus: "Protecting AI systems from malicious user inputs and preventing prompt leaking in enterprise tools.",
    sampleQuestions: [
      "How do you mitigate indirect prompt injection when ingesting untrusted third-party web content into RAG?",
      "What design pattern would you implement to detect jailbreak attempts with under 50ms latency overhead?"
    ]
  },
  {
    day: 5,
    title: "Prompt Versioning & Prompt Management Systems",
    module: "Prompt Engineering & Guardrails",
    learningObjectives: [
      "Treat prompts as code with versioning and CI/CD testing",
      "Implement prompt registries with dynamic templating",
      "Perform regression testing on prompt updates"
    ],
    keyConcepts: ["Prompt CI/CD", "Semantic Versioning", "Evaluation Test Suites", "Prompt Registry"],
    toolsUsed: ["LangSmith", "Agenta", "PromptLayer"],
    interviewFocus: "Managing prompt lifecycle, schema migrations, and preventing regression when upgrading underlying base LLMs.",
    sampleQuestions: [
      "How do you manage versioning and fallback when upgrading base models (e.g. gpt-4o to gpt-4.5) across 50 production prompts?",
      "What automated CI checks do you run before merging a prompt update to main?"
    ]
  },
  {
    day: 6,
    title: "Document Loading & Chunking Strategies",
    module: "Retrieval-Augmented Generation (RAG)",
    learningObjectives: [
      "Implement fixed-size, recursive character, and semantic chunking",
      "Preserve document metadata and headers during segmentation",
      "Understand chunk size vs context window trade-offs"
    ],
    keyConcepts: ["Recursive Character Text Splitter", "Semantic Chunking", "Overlap Window", "Header Preservation"],
    toolsUsed: ["Unstructured", "PyPDF", "LangChain TextSplitters"],
    interviewFocus: "Optimizing text chunk boundaries and overlap to ensure complete contextual information for retrieval.",
    sampleQuestions: [
      "How do you decide between fixed-size chunking and semantic boundary chunking for unstructured PDF tech manuals?",
      "What happens if chunk overlap is set too low versus too high during vector ingestion?"
    ]
  },
  {
    day: 7,
    title: "Dense Vector Embeddings & Representation",
    module: "Retrieval-Augmented Generation (RAG)",
    learningObjectives: [
      "Compare embedding models (OpenAI text-embedding-3, BGE-M3, Voyage)",
      "Understand embedding dimensionality and vector quantization",
      "Handle multilingual and code embedding tasks"
    ],
    keyConcepts: ["Embedding Space", "Cosine Distance", "Dimension Reduction", "Matryoshka Embeddings"],
    toolsUsed: ["OpenAI Embeddings", "FastEmbed", "Sentence-Transformers"],
    interviewFocus: "Selecting appropriate embedding models and understanding vector representation quality.",
    sampleQuestions: [
      "How do Matryoshka representations allow truncating vector dimensions without sacrificing retrieval precision?",
      "Why might standard dense embeddings fail when querying specific technical keywords or product SKUs?"
    ]
  },
  {
    day: 8,
    title: "Hybrid Search: Combining Sparse (BM25) & Dense Retrieval",
    module: "Retrieval-Augmented Generation (RAG)",
    learningObjectives: [
      "Implement BM25 lexical keyword search alongside dense vectors",
      "Combine scores using Reciprocal Rank Fusion (RRF)",
      "Tune hybrid search alpha parameters"
    ],
    keyConcepts: ["BM25 Lexical Search", "Reciprocal Rank Fusion (RRF)", "Alpha Tuning", "Hybrid Ingestion"],
    toolsUsed: ["Elasticsearch", "Qdrant Hybrid Search", "Pinecone Hybrid"],
    interviewFocus: "Combining lexical precision with semantic understanding for production RAG search engines.",
    sampleQuestions: [
      "Explain Reciprocal Rank Fusion (RRF) and why simple score normalization is often insufficient when merging BM25 and vector scores.",
      "How do you tune the weight parameter alpha between dense and sparse results based on user query intent?"
    ]
  },
  {
    day: 9,
    title: "Reranking Models & Context Compression",
    module: "Retrieval-Augmented Generation (RAG)",
    learningObjectives: [
      "Integrate cross-encoder rerankers (Cohere Rerank, BGE-Reranker)",
      "Compress context payloads to minimize model token load",
      "Eliminate 'Lost in the Middle' attention anomalies"
    ],
    keyConcepts: ["Cross-Encoders", "Cohere Rerank", "Context Compression", "Lost in the Middle Effect"],
    toolsUsed: ["Cohere API", "FlagEmbedding", "LLMLingua"],
    interviewFocus: "Pruning noisy retrieved context and using cross-encoders to reorder documents by relevance.",
    sampleQuestions: [
      "Why are Cross-Encoder rerankers significantly more accurate than bi-encoder embeddings, and what is the latency penalty?",
      "What is the 'Lost in the Middle' phenomenon and how does reranking mitigate it?"
    ]
  },
  {
    day: 10,
    title: "Advanced RAG: Query Transformation & Graph RAG",
    module: "Retrieval-Augmented Generation (RAG)",
    learningObjectives: [
      "Implement Query Rewriting, HyDE (Hypothetical Document Embeddings)",
      "Build Multi-Query Expansion strategies",
      "Explore Knowledge Graphs combined with Vector RAG"
    ],
    keyConcepts: ["HyDE Strategy", "Query Decomposition", "Multi-Query RAG", "Knowledge Graph RAG"],
    toolsUsed: ["LlamaIndex Graph", "Neo4j", "LangChain RAG"],
    interviewFocus: "Transforming ambiguous user queries into optimal retrieval queries and navigating complex domain knowledge.",
    sampleQuestions: [
      "How does Hypothetical Document Embedding (HyDE) generate synthetic documents to improve vector lookup accuracy?",
      "Under what scenario would Knowledge Graph RAG outperform traditional document chunk RAG?"
    ]
  },
  {
    day: 11,
    title: "Vector Indexing Fundamentals: HNSW vs IVF",
    module: "Vector Databases & Storage",
    learningObjectives: [
      "Understand Hierarchical Navigable Small World (HNSW) graphs",
      "Understand Inverted File Indexing (IVF) and quantization",
      "Evaluate Recall vs Latency trade-offs in approximate nearest neighbors (ANN)"
    ],
    keyConcepts: ["HNSW Graphs", "IVF Indexing", "ef_construction & M parameters", "ANN Precision vs Recall"],
    toolsUsed: ["Faiss", "HNSWlib", "pgvector"],
    interviewFocus: "Configuring indexing algorithms for low latency vector search at scale.",
    sampleQuestions: [
      "What are the key parameters 'efConstruction' and 'M' in HNSW, and how do they impact index build time vs query QPS?",
      "How does IVF-PQ (Product Quantization) compress 1536-dim vectors and what trade-off does it impose on retrieval recall?"
    ]
  },
  {
    day: 12,
    title: "Distance Metrics & Embedding Space Geometry",
    module: "Vector Databases & Storage",
    learningObjectives: [
      "Analyze Cosine Similarity, Dot Product, and Euclidean Distance (L2)",
      "Determine when normalized vectors allow substituting Dot Product for Cosine",
      "Handle high-dimensional vector spaces"
    ],
    keyConcepts: ["Cosine Distance", "Dot Product Speed", "Euclidean (L2) Norm", "Vector Normalization"],
    toolsUsed: ["NumPy", "pgvector", "Qdrant"],
    interviewFocus: "Understanding mathematical similarity metrics and hardware acceleration for vector math.",
    sampleQuestions: [
      "Why is Dot Product computationally faster than Cosine similarity, and what step must be done during ingestion to enable it?",
      "How does curse of dimensionality affect distance distribution in 1536+ dimension vector spaces?"
    ]
  },
  {
    day: 13,
    title: "Metadata Filtering & Payload Indexing",
    module: "Vector Databases & Storage",
    learningObjectives: [
      "Compare Pre-filtering, Post-filtering, and In-stage Single-pass filtering",
      "Index metadata fields (tenant_id, timestamps, tags) efficiently",
      "Solve payload sparsity issues"
    ],
    keyConcepts: ["Pre-filtering vs Post-filtering", "Payload Indexing", "Multi-tenancy Isolation", "Index Bloat"],
    toolsUsed: ["Qdrant Filters", "Pinecone Namespaces", "Weaviate Metadata"],
    interviewFocus: "Multi-tenant isolation and filtered vector queries without destroying graph recall.",
    sampleQuestions: [
      "Why does standard post-filtering lead to empty query returns when payload filters are overly restrictive?",
      "How do modern vector engines perform single-pass filtered HNSW graph traversals?"
    ]
  },
  {
    day: 14,
    title: "Vector Storage Engine Scaling & Sharding",
    module: "Vector Databases & Storage",
    learningObjectives: [
      "Build distributed vector database cluster architectures",
      "Implement sharding strategies by document ID or tenant ID",
      "Scale read replicas for high QPS search workloads"
    ],
    keyConcepts: ["Horizontal Sharding", "Read Replicas", "WAL Log & Disk Persistence", "RAM Memory Footprint"],
    toolsUsed: ["Qdrant Cluster", "Milvus", "Pinecone Pods/Serverless"],
    interviewFocus: "Architecting enterprise vector infrastructure for millions of documents and high concurrency.",
    sampleQuestions: [
      "How do you estimate memory requirements (RAM) for storing 50 million 1536-dimensional float32 vectors with HNSW indexes?",
      "What sharding scheme would you pick to prevent hot-spotting in a multi-tenant SaaS application?"
    ]
  },
  {
    day: 15,
    title: "pgvector & Relational Storage Integration",
    module: "Vector Databases & Storage",
    learningObjectives: [
      "Deploy vector search directly inside PostgreSQL using pgvector",
      "Compare HNSW and IVFFlat index types in pgvector",
      "Write SQL joins combining transactional data with vector similarity"
    ],
    keyConcepts: ["pgvector Extension", "SQL Vector Joins", "IVFFlat vs HNSW in Postgres", "ACID Vector Storage"],
    toolsUsed: ["PostgreSQL", "pgvector", "Drizzle ORM"],
    interviewFocus: "Evaluating dedicated vector databases vs adding pgvector to existing relational systems.",
    sampleQuestions: [
      "When is pgvector sufficient for an enterprise app, and when should you migrate to a dedicated vector DB like Qdrant or Pinecone?",
      "How do you handle pgvector index builds during zero-downtime database migrations?"
    ]
  },
  {
    day: 16,
    title: "ReAct Pattern & Autonomous Agent Loops",
    module: "Agentic AI & Tool Integration",
    learningObjectives: [
      "Implement Reason-Act (ReAct) prompting loops",
      "Parse model tool call responses and feed observation execution back",
      "Prevent infinite agent loops with step limits and guards"
    ],
    keyConcepts: ["ReAct Framework", "Thought-Action-Observation Loop", "Recursion Limits", "Execution Stopping Criteria"],
    toolsUsed: ["LangChain Agents", "AutoGPT Architecture", "Custom Agent Loop"],
    interviewFocus: "Building core agentic loops, exception handling, and controlling non-deterministic tool calling.",
    sampleQuestions: [
      "Walk me through the exact step-by-step execution loop of a ReAct agent when a tool call returns an exception.",
      "How do you implement deterministic termination safeguards to prevent runaway LLM loop billing?"
    ]
  },
  {
    day: 17,
    title: "Tool Calling Schemas & Dynamic Tool Definitions",
    module: "Agentic AI & Tool Integration",
    learningObjectives: [
      "Define JSON schemas for tool definitions with strict types",
      "Implement parallel function calling",
      "Handle tool execution error responses and format recovery"
    ],
    keyConcepts: ["Tool Schema Definition", "Parallel Tool Execution", "Tool Error Formatting", "Dynamic Tool Selection"],
    toolsUsed: ["OpenAI Tools API", "Anthropic Tool Use", "FastAPI Tool Endpoints"],
    interviewFocus: "Schema design, type enforcement, and parallel tool calling execution in mission-critical environments.",
    sampleQuestions: [
      "What happens when an LLM attempts to pass an invalid parameter type to a tool function, and how should your agent handler respond?",
      "How does parallel tool execution improve multi-step query latency?"
    ]
  },
  {
    day: 18,
    title: "State Management & Conversation Memory",
    module: "Agentic AI & Tool Integration",
    learningObjectives: [
      "Manage short-term context windows vs long-term memory",
      "Implement Summary Buffer Memory and Vector-backed Memory",
      "Design persistent agent state schemas"
    ],
    keyConcepts: ["Conversation Buffer Memory", "Summary Memory", "Long-term Vector Memory", "Agent Checkpoints"],
    toolsUsed: ["LangGraph State", "Redis Session Store", "Mem0"],
    interviewFocus: "Maintaining state across multi-turn interactions without saturating token context windows.",
    sampleQuestions: [
      "How do you design an agent memory system that retains user preferences over months without loading entire histories into context?",
      "What is the role of state checkpointing when an agent workflow fails mid-execution?"
    ]
  },
  {
    day: 19,
    title: "Plan-and-Execute Architectures & Task Graphs",
    module: "Agentic AI & Tool Integration",
    learningObjectives: [
      "Build Plan-and-Execute agents that split planning from execution",
      "Implement Directed Acyclic Graph (DAG) task execution",
      "Dynamic plan revision based on intermediate outcomes"
    ],
    keyConcepts: ["Planner / Executor Split", "DAG Execution", "Dynamic Replanning", "Sub-task Isolation"],
    toolsUsed: ["LangGraph", "CrewAI", "Temporal.io"],
    interviewFocus: "Architecting complex multi-step workflows with modular task graphs and failure replanning.",
    sampleQuestions: [
      "Why is a Plan-and-Execute pattern often superior to a raw ReAct loop for multi-step software development tasks?",
      "How do you handle replanning when task 3 in a 5-step graph encounters a fatal dependency error?"
    ]
  },
  {
    day: 20,
    title: "Multi-Agent Systems & Agent Collaboration",
    module: "Agentic AI & Tool Integration",
    learningObjectives: [
      "Design multi-agent architectures (Hierarchical, Supervisor, Peer-to-Peer)",
      "Establish inter-agent communication protocols and message formats",
      "Manage tool delegation between specialized sub-agents"
    ],
    keyConcepts: ["Supervisor Agent", "Specialized Sub-Agents", "Inter-Agent Protocol", "Handoff State"],
    toolsUsed: ["AutoGen", "CrewAI", "LangGraph Multi-Agent"],
    interviewFocus: "Orchestrating teams of specialized agents with distinct roles, system prompts, and tool access.",
    sampleQuestions: [
      "In a supervisor multi-agent setup, how do you prevent agent-to-agent feedback loops from getting trapped in endless debate?",
      "What are the network overhead and token cost considerations when operating 5 collaborating agents?"
    ]
  },
  {
    day: 21,
    title: "Model Context Protocol (MCP) Core Architecture",
    module: "Model Context Protocol (MCP) & Fine-Tuning",
    learningObjectives: [
      "Understand MCP specification (Resources, Prompts, Tools)",
      "Client-Server architecture of Model Context Protocol",
      "Expose context features standardizing AI tool integration"
    ],
    keyConcepts: ["MCP Resources", "MCP Tools", "MCP Prompts", "Client-Server Spec"],
    toolsUsed: ["MCP TypeScript SDK", "MCP Python SDK", "Claude Desktop MCP Integration"],
    interviewFocus: "Understanding how MCP standardizes model connection to context sources and client tool execution.",
    sampleQuestions: [
      "Explain the fundamental distinction between MCP Resources, MCP Prompts, and MCP Tools.",
      "How does Model Context Protocol eliminate custom point-to-point glue code for enterprise tools?"
    ]
  },
  {
    day: 22,
    title: "MCP Transports & Server Implementation",
    module: "Model Context Protocol (MCP) & Fine-Tuning",
    learningObjectives: [
      "Implement MCP Servers over STDIO and Server-Sent Events (SSE)",
      "Handle JSON-RPC protocol requests and responses",
      "Implement security and authorization for MCP endpoints"
    ],
    keyConcepts: ["STDIO Transport", "SSE Transport", "JSON-RPC 2.0 Spec", "MCP Authentication"],
    toolsUsed: ["@modelcontextprotocol/sdk", "FastAPI SSE", "Node.js Child Process"],
    interviewFocus: "Building production-grade MCP servers, managing lifecycle connections, and transport protocols.",
    sampleQuestions: [
      "When would you choose STDIO transport over SSE transport in an enterprise MCP deployment?",
      "How does JSON-RPC 2.0 handle asynchronous request-response correlation in MCP client-server streaming?"
    ]
  },
  {
    day: 23,
    title: "Dataset Curation & Fine-Tuning Data Preparation",
    module: "Model Context Protocol (MCP) & Fine-Tuning",
    learningObjectives: [
      "Curate instruction datasets (JSONL format with system/user/assistant)",
      "Perform synthetic data generation and filtering using LLM-as-a-Judge",
      "De-duplicate and format dataset tokens for supervised fine-tuning (SFT)"
    ],
    keyConcepts: ["JSONL Instruction Tuning", "Synthetic Data Curation", "Dataset Deduplication", "Tokenization Alignment"],
    toolsUsed: ["HuggingFace Datasets", "Argilla", "Unsloth Data Processing"],
    interviewFocus: "Preparing pristine high-quality datasets for model alignment and fine-tuning.",
    sampleQuestions: [
      "What strategies do you use to filter out low-quality synthetic training examples before fine-tuning?",
      "Why is context formatting and loss masking on instruction prompt tokens crucial during SFT dataset prep?"
    ]
  },
  {
    day: 24,
    title: "Parameter-Efficient Fine-Tuning: LoRA & QLoRA",
    module: "Model Context Protocol (MCP) & Fine-Tuning",
    learningObjectives: [
      "Understand Low-Rank Adaptation (LoRA) linear matrix rank decomposition",
      "Implement QLoRA 4-bit NormalFloat (NF4) quantization and double quantization",
      "Select rank (r) and alpha hyper-parameters for specific task adaptation"
    ],
    keyConcepts: ["Low-Rank Adapters (LoRA)", "QLoRA 4-bit NF4", "Target Modules (q_proj, v_proj)", "Rank r and Alpha"],
    toolsUsed: ["PEFT", "TRL", "Unsloth", "BitsAndBytes"],
    interviewFocus: "Fine-tuning open-weights models efficiently on limited GPU memory while minimizing catastrophic forgetting.",
    sampleQuestions: [
      "Explain the mathematical intuition of LoRA low-rank decomposition $W + \\Delta W = W + B \\times A$. Why does this save GPU VRAM?",
      "How does QLoRA achieve fine-tuning of 70B models on a single 48GB GPU using 4-bit NormalFloat and Paged Optimizers?"
    ]
  },
  {
    day: 25,
    title: "Model Evaluation, Alignment & DPO / RLHF",
    module: "Model Context Protocol (MCP) & Fine-Tuning",
    learningObjectives: [
      "Compare Direct Preference Optimization (DPO) vs RLHF with PPO",
      "Format pairwise preference datasets (chosen vs rejected responses)",
      "Evaluate domain-specific performance post fine-tuning"
    ],
    keyConcepts: ["Direct Preference Optimization (DPO)", "Pairwise Preferences", "Catastrophic Forgetting", "Perplexity vs Accuracy"],
    toolsUsed: ["TRL DPO Trainer", "WandB", "LM Evaluation Harness"],
    interviewFocus: "Aligning models to domain preferences and evaluating fine-tuned models against base models.",
    sampleQuestions: [
      "Why has Direct Preference Optimization (DPO) largely replaced PPO-based RLHF in practical open-source fine-tuning workflows?",
      "How do you test a fine-tuned domain model to ensure core base reasoning capabilities haven't degraded?"
    ]
  },
  {
    day: 26,
    title: "LLM Evaluation Frameworks & Ragas / TruLens",
    module: "Production AI, Guardrails & Deployment",
    learningObjectives: [
      "Measure RAG metrics: Faithfulness, Answer Relevance, Context Recall, Context Precision",
      "Implement LLM-as-a-Judge test suites",
      "Automate regression evaluation in deployment pipelines"
    ],
    keyConcepts: ["Faithfulness", "Answer Relevance", "Context Recall", "LLM-as-a-Judge"],
    toolsUsed: ["Ragas", "TruLens", "DeepEval", "Promptfoo"],
    interviewFocus: "Quantifying RAG system quality using structured automated evaluation frameworks.",
    sampleQuestions: [
      "Define Faithfulness vs Context Precision in RAG evaluation and explain how Ragas measures each automatically.",
      "What are the primary biases to watch out for when using GPT-4 as an LLM-as-a-Judge evaluator?"
    ]
  },
  {
    day: 27,
    title: "Observability, Tracing & Latency Profiling",
    module: "Production AI, Guardrails & Deployment",
    learningObjectives: [
      "Implement end-to-end span tracing for agent execution trees",
      "Track Time-To-First-Token (TTFT) and Tokens-Per-Second (TPS)",
      "Monitor token costs per session and enterprise tenant"
    ],
    keyConcepts: ["Distributed Tracing", "TTFT & TPS Metrics", "Span Hierarchy", "Cost Allocation Tagging"],
    toolsUsed: ["LangSmith", "Phoenix (Arize)", "OpenTelemetry"],
    interviewFocus: "Debugging production AI failure points, bottleneck analysis, and monitoring real-time performance.",
    sampleQuestions: [
      "How do you trace latency bottlenecks across a 4-node agent call graph with streaming response output?",
      "What key telemetry metrics do you alarm on for a customer-facing AI search engine?"
    ]
  },
  {
    day: 28,
    title: "Semantic Caching & Cost Optimization",
    module: "Production AI, Guardrails & Deployment",
    learningObjectives: [
      "Implement semantic caching based on query embedding distance thresholds",
      "Design cache invalidation strategies for dynamic RAG vector stores",
      "Balance prompt cache hit rate vs response staleness"
    ],
    keyConcepts: ["Semantic Cache", "Distance Threshold Tuning", "Exact vs Fuzzy Cache", "Cache Invalidation"],
    toolsUsed: ["GPTCache", "Redis Vector Similarity Search"],
    interviewFocus: "Reducing operational LLM costs and achieving sub-10ms response times for repeated queries.",
    sampleQuestions: [
      "How do you establish the similarity threshold parameter in a semantic cache to avoid returning inaccurate cached answers?",
      "How do you invalidate semantic cache items when underlying document chunks in the vector database get updated?"
    ]
  },
  {
    day: 29,
    title: "Streaming Responses & Real-Time UX Architecture",
    module: "Production AI, Guardrails & Deployment",
    learningObjectives: [
      "Implement Server-Sent Events (SSE) and WebSockets for token streaming",
      "Format chunked SSE streams with structured JSON events",
      "Handle front-end rendering of partial Markdown and code blocks"
    ],
    keyConcepts: ["Server-Sent Events (SSE)", "Token Streaming", "Chunk Parsing", "Backpressure Management"],
    toolsUsed: ["Vercel AI SDK", "FastAPI StreamingResponse", "EventSource"],
    interviewFocus: "Creating low-latency responsive AI user interfaces with real-time token streaming.",
    sampleQuestions: [
      "Why is SSE generally preferred over WebSockets for one-way LLM text token streaming?",
      "How do you stream dynamic JSON schema fields while enabling front-end rendering before the JSON string completes?"
    ]
  },
  {
    day: 30,
    title: "Production Safety Filters & Input/Output Guardrails",
    module: "Production AI, Guardrails & Deployment",
    learningObjectives: [
      "Integrate real-time content moderation and PII (Personally Identifiable Information) masking",
      "Implement hallucinatory output detection prior to user response delivery",
      "Build dynamic fallback mechanisms when output guardrails trigger"
    ],
    keyConcepts: ["PII Redaction", "Hallucination Check", "Input/Output Guardrail Pipeline", "Graceful Fallback"],
    toolsUsed: ["Presidio (PII)", "Guardrails AI", "OpenAI Moderation API"],
    interviewFocus: "Protecting sensitive customer data and ensuring brand safety in high-compliance industries.",
    sampleQuestions: [
      "How do you implement non-blocking PII redaction on streaming output without introducing human-perceptible latency?",
      "What is your fallback strategy when a production response fails the output hallucination guardrail check?"
    ]
  },
  {
    day: 31,
    title: "Production Deployment, Containerization & Model Serving",
    module: "Production AI, Guardrails & Deployment",
    learningObjectives: [
      "Deploy open models with vLLM, TGI (Text Generation Inference), or Ollama",
      "Implement PagedAttention and continuous batching for maximum throughput",
      "Containerize fullstack AI applications for Kubernetes / Docker deployment"
    ],
    keyConcepts: ["vLLM & PagedAttention", "Continuous Batching", "Dockerization", "High Throughput Inference"],
    toolsUsed: ["vLLM", "Docker", "Kubernetes", "Ray Serve"],
    interviewFocus: "Serving self-hosted models at scale with optimal GPU utilization and low per-token cost.",
    sampleQuestions: [
      "How does PagedAttention in vLLM prevent memory fragmentation in GPU KV caches during concurrent inference?",
      "What architecture would you propose to serve 1,000 concurrent user sessions on self-hosted Llama-3 70B?"
    ]
  }
];
