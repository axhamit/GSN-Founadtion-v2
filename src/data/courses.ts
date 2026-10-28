export type CategorySlug = "artificial-intelligence" | "exam-coaching" | "career-programs";
export type Theme = "genai" | "ml" | "engineering" | "rag" | "prompt" | "exam" | "career";
export type Level = "Beginner" | "Intermediate" | "Advanced" | "All levels";

export interface Module { title: string; lessons: string[]; optional?: boolean }
export interface Course {
  slug: string;
  title: string;
  short: string;
  category: CategorySlug;
  level: Level;
  theme: Theme;
  /** "available" = existing programme. "proposed" = new content awaiting GSN approval. */
  status: "available" | "proposed";
  /** Only approved courses are indexed/sitemapped (unless INDEX_PROPOSED_COURSES=true). */
  approved: boolean;
  /** True when the detail content is a placeholder GSN must supply. */
  placeholder?: boolean;
  comingSoon?: boolean;
  featured?: boolean;
  isNew?: boolean;
  skills: string[];
  overview: string;
  audience: string[];
  prerequisites: string[];
  outcomes: string[];
  modules: Module[];
  tools: string[];
  projects: { title: string; text: string }[];
  capstone?: string;
  roles: string[];
  faq: { q: string; a: string }[];
  related: string[];
}

export const CATEGORIES: { slug: CategorySlug; name: string; blurb: string }[] = [
  { slug: "artificial-intelligence", name: "Artificial Intelligence", blurb: "Project-based programs for building AI applications and machine-learning systems." },
  { slug: "exam-coaching", name: "Exam Coaching", blurb: "PCMB, JEE, NEET, KCET and 10th Board preparation, online and offline." },
  { slug: "career-programs", name: "Career Programs", blurb: "Integrated programs that combine school subjects with competitive exam preparation." },
];

const m = (title: string, lessons: string[], optional = false): Module => ({ title, lessons, optional });

const faq = (title: string, extra: { q: string; a: string }[] = []) => [
  { q: `Is ${title} open for enrollment?`, a: "GSN Foundation confirms batch availability. Send an inquiry and the team will share current batch and fee details." },
  { q: "What are the duration and delivery mode?", a: "Duration, schedule and online or offline options are confirmed per batch and are not published here until GSN Foundation approves them." },
  ...extra,
];

const examCourse = (c: Pick<Course, "slug" | "title" | "short" | "category" | "level" | "skills" | "related"> & { featured?: boolean }): Course => ({
  ...c,
  theme: c.category === "career-programs" ? "career" : "exam",
  status: "available",
  approved: true,
  placeholder: true,
  overview: `${c.short}. GSN Foundation offers online and offline classes with personalized study plans, regular mock tests, doubt solving with mentors, and study materials.`,
  audience: [],
  prerequisites: [],
  outcomes: [],
  modules: [],
  tools: [],
  projects: [],
  roles: [],
  faq: faq(c.title),
});

export const COURSES: Course[] = [
  // ---------------- Existing programs ----------------
  examCourse({ slug: "career-launch-academy", title: "Career Launch Academy", short: "Complete PCMB 11th & 12th plus competitive exam preparation", category: "career-programs", level: "All levels", skills: ["PCMB", "JEE", "NEET", "KCET"], related: ["pcmb-11th", "pcmb-12th", "jee"], featured: true }),
  examCourse({ slug: "pcmb-11th", title: "11th Standard PCMB", short: "Physics, Chemistry, Maths and Biology for 11th standard", category: "exam-coaching", level: "Beginner", skills: ["Physics", "Chemistry", "Maths", "Biology"], related: ["pcmb-12th", "career-launch-academy", "jee"] }),
  examCourse({ slug: "pcmb-12th", title: "12th Standard PCMB", short: "Advanced PCMB preparation for 12th standard", category: "exam-coaching", level: "Intermediate", skills: ["Physics", "Chemistry", "Maths", "Biology"], related: ["pcmb-11th", "kcet", "neet-ug"] }),
  examCourse({ slug: "jee", title: "JEE Mains & Advanced", short: "Engineering entrance exam preparation", category: "exam-coaching", level: "Advanced", skills: ["Physics", "Chemistry", "Maths", "Mock tests"], related: ["kcet", "pcmb-12th", "career-launch-academy"] }),
  examCourse({ slug: "neet-ug", title: "NEET UG", short: "Medical entrance exam preparation", category: "exam-coaching", level: "Advanced", skills: ["Physics", "Chemistry", "Biology", "Mock tests"], related: ["pcmb-12th", "kcet", "career-launch-academy"] }),
  examCourse({ slug: "kcet", title: "KCET", short: "Karnataka CET preparation", category: "exam-coaching", level: "Intermediate", skills: ["Physics", "Chemistry", "Maths", "Biology"], related: ["jee", "neet-ug", "pcmb-12th"] }),
  examCourse({ slug: "10th-board", title: "10th Standard Board", short: "Board exam preparation for 10th standard", category: "exam-coaching", level: "Beginner", skills: ["Board syllabus", "Practice papers"], related: ["pcmb-11th", "career-launch-academy"] }),

  // ---------------- New AI programs (proposed) ----------------
  {
    slug: "generative-ai",
    title: "Generative AI",
    short: "Learn to build generative AI applications with LLMs, RAG, agents and multimodal models.",
    category: "artificial-intelligence", level: "Intermediate", theme: "genai", status: "proposed", approved: false, featured: true, isNew: true,
    skills: ["Python", "LLM APIs", "RAG", "AI agents", "Multimodal AI"],
    overview: "The flagship program for creating with generative AI. You move from machine-learning foundations to prompt design, retrieval-augmented generation, tool-using agents, multimodal applications, responsible AI and deployment, and you build working applications along the way.",
    audience: ["Students and graduates moving into AI development", "Software developers adding generative AI to their skill set", "Analysts and professionals who want to build AI tools, not just use them"],
    prerequisites: ["Basic computer literacy and logical thinking", "Prior programming helps but the program starts Python from fundamentals"],
    outcomes: ["Explain how transformers and large language models work at a practical level", "Design prompts and structured outputs for reliable results", "Build a RAG application with embeddings and a vector database", "Integrate model APIs, function calling and tools into an application", "Evaluate AI outputs and apply responsible-AI and security practices", "Deploy an AI application and reason about its latency and cost"],
    modules: [
      m("Foundations of Artificial Intelligence", ["AI, machine learning and deep learning fundamentals", "Traditional AI versus generative AI", "Modern AI applications", "Introduction to foundation models"]),
      m("Python for Generative AI", ["Python fundamentals and functions", "Data structures and object-oriented programming", "NumPy and Pandas essentials", "APIs, JSON and asynchronous requests", "Virtual environments and dependencies"]),
      m("Machine Learning and Deep Learning Essentials", ["Supervised and unsupervised learning", "Neural network fundamentals", "Training, validation and evaluation", "Introduction to PyTorch", "Embeddings and representation learning"]),
      m("Large Language Models", ["Transformer architecture fundamentals", "Tokens, context windows and embeddings", "Pretraining and instruction tuning", "Inference and generation parameters", "Hosted versus open-weight models"]),
      m("Prompt Engineering", ["Instruction design and prompt structure", "Few-shot prompting", "Structured outputs and JSON responses", "Tool use and function calling", "Prompt evaluation and reliability"]),
      m("Retrieval-Augmented Generation", ["Document ingestion and preprocessing", "Chunking and embedding generation", "Vector databases and similarity search", "Retrieval strategies and reranking", "Grounded responses and evaluation"]),
      m("AI Application Development", ["Integrating model APIs", "Conversational interfaces", "Backend APIs and streaming responses", "Authentication, rate limits and error handling", "Connecting applications to external tools"]),
      m("Fine-Tuning and Model Adaptation", ["Choosing between prompting, RAG and fine-tuning", "Preparing and cleaning datasets", "Supervised fine-tuning concepts", "Parameter-efficient fine-tuning and LoRA", "Evaluation and deployment considerations"], true),
      m("AI Agents and Tool Use", ["Agent architectures and planning", "Tool calling and state management", "Workflow orchestration", "Human approval and guardrails", "Agent evaluation and failure handling"], true),
      m("Multimodal Generative AI", ["Image generation fundamentals", "Vision-language models", "Speech and audio applications", "Document understanding"], true),
      m("Responsible and Secure AI", ["Hallucinations and verification", "Privacy and sensitive data", "Prompt injection and unsafe tool execution", "Bias, monitoring and governance"]),
      m("Production Deployment and Capstone", ["Deploying an AI application with Docker", "Logging and observability", "Latency and cost optimization", "Testing and evaluation pipelines", "Capstone build and review"]),
    ],
    tools: ["Python", "PyTorch", "Hugging Face", "Vector databases", "FastAPI", "Docker", "LLM provider APIs"],
    projects: [
      { title: "AI document assistant", text: "Answer questions over uploaded files with cited sources." },
      { title: "RAG knowledge chatbot", text: "A grounded chatbot over a curated knowledge base." },
      { title: "AI content generation platform", text: "Structured, reviewable content generation workflows." },
      { title: "Tool-using AI agent", text: "An assistant that calls tools and asks for approval on risky actions." },
      { title: "Multimodal assistant", text: "Combine text, image and audio inputs in one application." },
    ],
    capstone: "Build a production-style AI assistant that combines RAG, tool use and an LLM, with evaluation and deployment.",
    roles: ["Generative AI developer", "AI application developer", "Prompt and workflow engineer"],
    faq: faq("Generative AI", [{ q: "Will I master every tool listed?", a: "No course can promise that. You will practise the core techniques on real projects and build a base for continued learning." }]),
    related: ["llm-rag", "prompt-engineering", "ai-engineering"],
  },
  {
    slug: "applied-ai-ml-engineering",
    title: "Applied AI/ML Engineering",
    short: "Build, evaluate, deploy and maintain practical machine-learning systems end to end.",
    category: "artificial-intelligence", level: "Intermediate", theme: "ml", status: "proposed", approved: false, featured: true, isNew: true,
    skills: ["Python", "scikit-learn", "PyTorch", "MLOps", "Model serving"],
    overview: "This program covers the machine-learning lifecycle: data preparation, classical and deep-learning models, evaluation, serving through APIs, and the MLOps practices that keep models reliable in production. It focuses on predictive ML systems, which is what separates it from the Generative AI program.",
    audience: ["Students and graduates aiming for machine-learning roles", "Data and software professionals moving into ML engineering", "Analysts who want to deploy models, not just train them"],
    prerequisites: ["Comfort with basic mathematics", "Programming experience is helpful; Python is taught from the basics"],
    outcomes: ["Prepare, explore and clean real datasets", "Train and compare regression, classification and clustering models", "Evaluate models with cross-validation and error analysis", "Build deep-learning models with PyTorch", "Serve a model through an API and containerize it", "Monitor models for drift and plan retraining"],
    modules: [
      m("Mathematics and Statistics for ML", ["Linear algebra fundamentals", "Probability and distributions", "Descriptive and inferential statistics", "Gradients and optimization intuition"]),
      m("Python for Machine Learning", ["Python programming", "NumPy and Pandas", "Data visualization", "Data cleaning and preprocessing"]),
      m("Exploratory Data Analysis", ["Understanding datasets", "Missing values and outliers", "Feature distributions", "Data quality and leakage prevention"]),
      m("Supervised Machine Learning", ["Linear and logistic regression", "Decision trees and random forests", "Gradient boosting", "Model selection and evaluation"]),
      m("Unsupervised Learning", ["Clustering", "Dimensionality reduction", "Anomaly detection", "Feature representation"]),
      m("Feature Engineering and Evaluation", ["Scaling and encoding", "Feature selection", "Cross-validation and class imbalance", "Hyperparameter optimization", "Error analysis"]),
      m("Deep Learning", ["Neural network fundamentals", "Backpropagation concepts", "PyTorch fundamentals", "CNNs and sequence models", "Training and regularization"]),
      m("Specialized Machine Learning", ["Natural language processing basics", "Computer vision fundamentals", "Recommendation systems", "Time-series forecasting"], true),
      m("Model Serving and APIs", ["Building inference APIs with FastAPI", "Model serialization and versioning", "Input validation and error handling"]),
      m("MLOps Fundamentals", ["Experiment tracking", "Data and model versioning", "Reproducible training", "Monitoring performance and drift", "Retraining strategies"]),
      m("Cloud and Production ML", ["Containerization with Docker", "Cloud deployment concepts", "CI/CD fundamentals", "Scaling, latency, security and observability"]),
      m("Capstone Projects", ["Customer churn prediction", "Fraud detection model", "Recommendation engine", "Deployable end-to-end ML service"]),
    ],
    tools: ["Python", "NumPy", "Pandas", "scikit-learn", "PyTorch", "FastAPI", "MLflow", "Docker"],
    projects: [
      { title: "Customer churn prediction", text: "Feature engineering and model comparison on tabular data." },
      { title: "Fraud detection model", text: "Handle class imbalance and evaluate with the right metrics." },
      { title: "Recommendation engine", text: "Build and evaluate a ranking-based recommender." },
      { title: "Forecasting service", text: "Time-series model exposed through an API." },
    ],
    capstone: "Deliver a deployable end-to-end ML service with tracking, versioning, monitoring and a retraining plan.",
    roles: ["Machine learning engineer", "Applied data scientist", "MLOps engineer (entry level)"],
    faq: faq("Applied AI/ML Engineering", [{ q: "How is this different from Generative AI?", a: "This program centers on predictive machine-learning systems and their lifecycle. Generative AI centers on building applications with large language models and related generative models." }]),
    related: ["ai-engineering", "generative-ai", "llm-rag"],
  },
  // {
  //   slug: "ai-engineering",
  //   title: "AI Engineering",
  //   short: "Engineer reliable, secure and scalable AI-powered software, from architecture to production.",
  //   category: "artificial-intelligence", level: "Advanced", theme: "engineering", status: "proposed", approved: false, isNew: true,
  //   skills: ["Backend", "LLM integration", "Security", "Observability", "Deployment"],
  //   overview: "For developers who already build software and want to ship AI features that hold up in production. The program treats AI components as parts of a system: architecture, orchestration, state, security, testing, observability, cost and incident handling.",
  //   audience: ["Software engineers adding AI features to products", "Backend developers responsible for AI services", "Teams moving prototypes into production"],
  //   prerequisites: ["Working knowledge of Python or a comparable language", "Familiarity with APIs and databases"],
  //   outcomes: ["Design the architecture of an AI-powered application", "Integrate model APIs with structured outputs and tool calling", "Secure and validate AI endpoints", "Add caching, queues, retries and rate limits", "Test, trace and monitor AI behavior in production", "Reduce latency and cost without breaking quality"],
  //   modules: [
  //     m("Python and Backend Foundations", ["Python for services", "REST API design", "Data modeling and databases"]),
  //     m("AI Application Architecture", ["Components of an AI system", "Synchronous versus asynchronous flows", "Choosing models and providers"]),
  //     m("Model API Integration", ["LLM API patterns", "Structured outputs and tool calling", "Streaming responses"]),
  //     m("Orchestration, RAG and Agents", ["Orchestrating multi-step workflows", "Integrating a RAG pipeline", "Agent design and execution limits"]),
  //     m("State, Data and Security", ["Database integration and state management", "Authentication and authorization", "API security and input validation"]),
  //     m("Reliability Engineering", ["Caching and queues", "Retries and rate limits", "Fallbacks and graceful degradation"]),
  //     m("Evaluation, Testing and Observability", ["Automated evaluation suites", "Tracing and logging", "Monitoring quality over time"]),
  //     m("Deployment and Operations", ["Docker and cloud platforms", "CI/CD and environment management", "Cost, latency and performance optimization", "Production monitoring and incident handling"]),
  //     m("Final Project", ["Design review", "Build and test", "Deploy and present a production-style AI application"]),
  //   ],
  //   tools: ["Python", "FastAPI", "PostgreSQL", "Redis", "Docker", "CI/CD", "Tracing tools"],
  //   projects: [
  //     { title: "AI service with guardrails", text: "Validated inputs, structured outputs and safe tool calls." },
  //     { title: "Resilient LLM gateway", text: "Caching, retries, rate limits and provider fallback." },
  //     { title: "Evaluation harness", text: "Automated regression tests for AI behavior." },
  //   ],
  //   capstone: "Ship a production-style AI application with authentication, observability, evaluation and deployment.",
  //   roles: ["AI engineer", "Backend engineer (AI products)", "Platform engineer for AI workloads"],
  //   faq: faq("AI Engineering"),
  //   related: ["generative-ai", "applied-ai-ml-engineering", "llm-rag"],
  // },
  {
    slug: "llm-rag",
    title: "LLMs and RAG",
    short: "Build grounded, document-aware applications with large language models and retrieval.",
    category: "artificial-intelligence", level: "Intermediate", theme: "rag", status: "proposed", approved: false, isNew: true,
    comingSoon: true,
    skills: ["Embeddings", "Vector search", "Reranking", "Evaluation", "Prompt-injection defense"],
    overview: "A deep dive into retrieval-augmented generation: how to ingest documents, chunk and embed them, retrieve the right context, produce cited answers, and measure whether the system is actually accurate.",
    audience: ["Developers building knowledge assistants", "Data professionals working with document collections", "Teams reducing hallucinations in LLM applications"],
    prerequisites: ["Basic Python", "Familiarity with APIs is helpful"],
    outcomes: ["Explain tokens, context windows and embeddings", "Build an ingestion pipeline for PDFs, documents and web content", "Choose chunking and embedding strategies", "Implement dense and hybrid retrieval with reranking", "Produce grounded answers with source citations", "Evaluate RAG quality and analyze hallucinations"],
    modules: [
      m("LLM and Transformer Fundamentals", ["Transformer architecture", "Tokens and context windows", "Embeddings and semantic representations"]),
      m("Document Ingestion", ["PDF, document and web-content processing", "Cleaning and preprocessing", "Chunking strategies"]),
      m("Embeddings and Vector Databases", ["Embedding model selection", "Vector databases and similarity search", "Metadata filtering"]),
      m("Retrieval Strategies", ["Dense and hybrid retrieval", "Reranking", "Query transformation"]),
      m("Building RAG Pipelines", ["Context construction", "Grounded answers and source citations", "Handling missing evidence"]),
      m("Evaluation and Hallucination Analysis", ["Benchmarking retrieval and generation", "Failure analysis", "Advanced retrieval strategies"]),
      m("Security, Privacy and Deployment", ["Data privacy", "Prompt-injection defense", "Deployment and monitoring", "Multimodal RAG fundamentals"]),
      m("Final Project", ["Design the knowledge base", "Build and evaluate", "Present an enterprise knowledge assistant"]),
    ],
    tools: ["Python", "Embedding models", "Vector databases", "Rerankers", "LLM provider APIs"],
    projects: [
      { title: "PDF question answering", text: "Cited answers over a document set." },
      { title: "Hybrid search service", text: "Combine keyword and semantic retrieval." },
      { title: "RAG evaluation report", text: "Measure retrieval and answer quality on a test set." },
    ],
    capstone: "Build an enterprise knowledge assistant with citations, access-aware retrieval and an evaluation report.",
    roles: ["RAG engineer", "LLM application developer", "Knowledge-systems developer"],
    faq: faq("LLMs and RAG"),
    related: ["generative-ai", "ai-engineering", "prompt-engineering"],
  },
  {
    slug: "prompt-engineering",
    title: "Prompt Engineering",
    short: "Design, test and evaluate prompts and workflows that work reliably in real tasks.",
    category: "artificial-intelligence", level: "Beginner", theme: "prompt", status: "proposed", approved: false, isNew: true,
    comingSoon: true,
    skills: ["Prompt design", "Structured outputs", "Evaluation", "Workflow automation"],
    overview: "A practical program for anyone who wants dependable results from AI models. You learn how to write instructions, supply context, request structured output, test prompts systematically and keep them safe and maintainable.",
    audience: ["Students and professionals new to AI tools", "Content, research and operations teams", "Developers who want a solid prompting foundation"],
    prerequisites: ["No programming required for the core modules", "Basic Python is useful for the developer track"],
    outcomes: ["Explain what language models can and cannot do", "Write clear, structured instructions with context and constraints", "Use zero-shot and few-shot techniques appropriately", "Produce JSON and other structured outputs", "Test prompts and reduce hallucinations", "Maintain a versioned prompt library"],
    modules: [
      m("LLM Fundamentals and Limits", ["How models generate text", "Strengths and failure modes", "Choosing the right tool for a task"]),
      m("Instruction Design", ["Instructions, context and role", "Constraints and tone", "Decomposing complex tasks"]),
      m("Prompting Techniques", ["Zero-shot and few-shot prompting", "Structured reasoning approaches", "Iterating on weak outputs"]),
      m("Structured Outputs and Templates", ["Output schemas and JSON", "Reusable templates", "Prompt chaining"]),
      m("Prompting for Real Work", ["Text and research", "Code assistance", "Data analysis", "Multimodal prompts"]),
      m("Testing and Reliability", ["Building test sets", "Prompt evaluation", "Hallucination reduction and verification"]),
      m("Security and Automation", ["Prompt injection awareness", "Tool calling and function integration", "Workflow automation", "Versioning prompt libraries"]),
      m("Projects", ["Business workflow project", "Developer workflow project"]),
    ],
    tools: ["Major LLM chat interfaces", "LLM provider APIs", "Spreadsheet and notebook tools"],
    projects: [
      { title: "Research assistant workflow", text: "A repeatable prompt chain for summarizing sources." },
      { title: "Structured data extractor", text: "Turn messy text into validated JSON." },
      { title: "Prompt library", text: "Versioned, tested prompts for a team." },
    ],
    capstone: "Deliver a tested prompt workflow for a real business or developer task, with documentation.",
    roles: ["AI-enabled professional", "Prompt and workflow designer", "Content and operations specialist"],
    faq: faq("Prompt Engineering"),
    related: ["generative-ai", "llm-rag"],
  },
];

export const getCourse = (slug: string) => COURSES.find((c) => c.slug === slug);
export const coursesIn = (cat: CategorySlug) => COURSES.filter((c) => c.category === cat);
export const isIndexable = (c: Course) => c.approved || process.env.INDEX_PROPOSED_COURSES === "true";
