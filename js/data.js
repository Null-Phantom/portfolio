/**
 * Yug Mittal Portfolio Data Store
 * Easily edit projects, journal fragments, tools, and status updates here.
 */

const PORTFOLIO_DATA = {
  personal: {
    name: "Yug Mittal",
    role: "AIML Student · Developer · Builder",
    location: "Gwalior, Madhya Pradesh, India",
    coordinates: "23.3° N, 78.2° E",
    tagline: "I make sense eventually.",
    heroSubtitle: "I build things, break them, learn, and somehow end up with something better.",
    email: "yugmittal.dev@gmail.com",
    github: "https://github.com/yugmittal",
    linkedin: "https://linkedin.com/in/yugmittal",
    instagram: "https://instagram.com/yugmittal",
    twitter: "https://x.com/yugmittal",
    bio: [
      "I'm Yug Mittal, a second-year AIML student from Gwalior, Madhya Pradesh. I like technology, programming, AI/ML, drums, Japanese culture, and the idea of building things that actually matter (or at least feel cool).",
      "Most days you'll find me coding, exploring random ideas, tweaking neural network pipelines, or overthinking life over a cup of black coffee.",
      "I believe the best way to understand something is to dismantle it down to first principles and rebuild it from scratch."
    ],
    motto: "Same Person, Different Dreams. — Yug",
    closingQuote: "It'll make sense eventually."
  },

  checklist: [
    { text: "Build meaningful software", checked: true },
    { text: "Master AI / ML pipelines", checked: true },
    { text: "Learn Japanese (勉強中)", checked: false },
    { text: "Visit Kyoto & Tokyo", checked: false },
    { text: "Play Drums & Polyrhythms", checked: true },
    { text: "Stay curious everyday", checked: true }
  ],

  projects: [
    {
      id: "axiovital",
      number: "01",
      title: "AxioVital",
      subtitle: "Healthcare & Clinical Management Platform",
      category: "Fullstack / Systems",
      year: "2025 – Present",
      status: "Active Development",
      description: "A comprehensive hospital management ecosystem built to modernize clinical workflows, electronic health records (EHR), automated patient scheduling, and real-time medical telemetry with encrypted access control.",
      longDescription: "AxioVital addresses the operational friction in contemporary healthcare facilities. It features instantaneous doctor-patient dispatching, end-to-end encrypted medical history archives, real-time bed & ICU allocation tracking, and automated pharmacy inventory reconciliation. Designed with low-latency WebSockets and robust role-based access control.",
      highlights: [
        "Real-time patient telemetry & vital monitoring over secure WebSockets",
        "Role-Based Access Control (RBAC) ensuring HIPAA-compliant clinical data isolation",
        "Automated appointment dispatching & queue management engine",
        "Comprehensive analytics dashboard for bed occupancy and surgical schedules"
      ],
      tags: ["React", "Node.js", "PostgreSQL", "WebSockets", "Docker", "TailwindCSS"],
      liveUrl: "#",
      githubUrl: "https://github.com/yugmittal/axiovital",
      featured: true,
      accentColor: "#d4a373",
      previewType: "dashboard"
    },
    {
      id: "face-attendance",
      number: "02",
      title: "Face Attendance System",
      subtitle: "Biometric Computer Vision & Automated Logging",
      category: "AI & Computer Vision",
      year: "2024",
      status: "Completed",
      description: "An automated, contactless attendance pipeline powered by deep facial feature embeddings, anti-spoofing liveness checks, and instant institutional record generation.",
      longDescription: "Built to eliminate proxy attendance and manual roll-calls in universities and workspaces. Leveraging OpenCV for high-fps multi-camera frame extraction and MediaPipe / DeepFace 128-d embedding extraction, the system identifies individuals in under 80ms while filtering photo/screen spoof attempts.",
      highlights: [
        "Sub-100ms multi-face detection and 128-d vector embedding classification",
        "Anti-spoofing liveness detection using texture & blink analysis",
        "Automated attendance export with analytics & absentee alerts",
        "Lightweight edge deployment support with SQLite and local camera feeds"
      ],
      tags: ["Python", "OpenCV", "MediaPipe", "DeepFace", "Flask", "SQLite"],
      liveUrl: "#",
      githubUrl: "https://github.com/yugmittal/face-attendance-system",
      featured: true,
      accentColor: "#e59866",
      previewType: "vision"
    },
    {
      id: "neural-canvas",
      number: "03",
      title: "NeuralCanvas Studio",
      subtitle: "Interactive Generative Vision & Edge Synthesis",
      category: "AI & Computer Vision",
      year: "2024",
      status: "Experiment",
      description: "A browser-based creative sandbox experimenting with real-time neural style transfer, semantic edge extraction, and latent space image synthesis.",
      longDescription: "NeuralCanvas is an experimental playground where users draw basic strokes or upload images to see real-time neural transformations applied in the browser. Powered by PyTorch models distilled for client-side WebGL acceleration.",
      highlights: [
        "Client-side neural style transfer running at 30+ FPS with WebGL shaders",
        "Interactive brush tool that guides generative diffusion latents",
        "Custom lightweight ONNX runtime integration for offline execution"
      ],
      tags: ["PyTorch", "ONNX", "JavaScript", "WebGL", "FastAPI"],
      liveUrl: "#",
      githubUrl: "https://github.com/yugmittal/neural-canvas",
      featured: false,
      accentColor: "#a3b18a",
      previewType: "generative"
    },
    {
      id: "rhythmsync",
      number: "04",
      title: "RhythmSync DSP",
      subtitle: "Percussion Poly-meter Analyzer & Drum Trainer",
      category: "Audio & Web DSP",
      year: "2024",
      status: "Personal Project",
      description: "A rhythmic audio synthesis and timing precision trainer designed for drummers to dissect polyrhythms, syncopation, and micro-timing offsets.",
      longDescription: "As a drummer, timing and groove are everything. RhythmSync captures microphone input or MIDI triggers to analyze strike micro-delays against a steady pulse, visually highlighting rush/drag tendencies and helping master 3:4, 5:4, and nested tuplets.",
      highlights: [
        "Real-time audio input peak detection with Web Audio API",
        "Sub-millisecond latency timing deviation graphs",
        "Polyrhythmic synthesizer generating complex time signatures"
      ],
      tags: ["Web Audio API", "TypeScript", "Canvas 2D", "DSP"],
      liveUrl: "#",
      githubUrl: "https://github.com/yugmittal/rhythmsync-dsp",
      featured: false,
      accentColor: "#b5838d",
      previewType: "audio"
    }
  ],

  tools: [
    { name: "Python", category: "AI / ML & Core", icon: "python", experience: "Daily Driver", note: "PyTorch, OpenCV, NumPy, FastAPI" },
    { name: "JavaScript", category: "Core & Web", icon: "javascript", experience: "Fluent", note: "ES6+, TypeScript, Node.js" },
    { name: "React", category: "Frontend", icon: "react", experience: "Primary UI", note: "Hooks, Context, State machines" },
    { name: "Node.js", category: "Backend", icon: "nodejs", experience: "APIs & Services", note: "Express, WebSockets, REST" },
    { name: "PostgreSQL", category: "Databases", icon: "postgresql", experience: "Relational", note: "Schemas, Indexing, Prisma" },
    { name: "OpenCV", category: "Computer Vision", icon: "opencv", experience: "Vision Pipelines", note: "Image filtering, contouring, tracking" },
    { name: "MediaPipe", category: "AI / ML", icon: "mediapipe", experience: "Pose & Face", note: "Facial landmarks, hand tracking" },
    { name: "Git & GitHub", category: "Workflow", icon: "github", experience: "Version Control", note: "Branching, CI/CD, Actions" },
    { name: "Docker", category: "DevOps", icon: "docker", experience: "Containers", note: "Images, Compose, isolation" },
    { name: "VS Code", category: "Editor", icon: "vscode", experience: "Daily IDE", note: "Custom keybindings & dark theme" },
    { name: "Linux", category: "Environment", icon: "linux", experience: "OS of choice", note: "Ubuntu, Bash scripting, servers" },
    { name: "Figma", category: "Design", icon: "figma", experience: "Wireframing", note: "Typography, UI composition" }
  ],

  currently: [
    {
      icon: "⚡",
      text: "Exploring Multimodal Vision Models & Agentic AI workflows",
      detail: "Investigating how small vision models can reason over real-time video streams."
    },
    {
      icon: "🇯🇵",
      text: "Learning Japanese (日本語 勉強中 — JLPT N5 / N4)",
      detail: "Practicing Kanji stroke orders, daily vocabulary, and sentence structures."
    },
    {
      icon: "🥁",
      text: "Dialing in drum rudiments & syncopated polyrhythms",
      detail: "Working on paradiddles, ghost notes, and tight hi-hat control at 120+ BPM."
    },
    {
      icon: "🛠️",
      text: "Iterating on AxioVital & computer vision pipelines",
      detail: "Refactoring database indexes and optimizing OpenCV inference throughput."
    },
    {
      icon: "☕",
      text: "Chasing that quiet 2 AM feeling when code finally runs",
      detail: "Trying to be a slightly better thinker and craftsman every single day."
    }
  ],

  beyondCode: [
    {
      title: "Anime & Visual Culture",
      tag: "ANIMATION",
      note: "From atmospheric cyberpunk to introspective slice-of-life. Deeply inspired by visual storytelling, frame composition, and soundtrack direction in Japanese animation.",
      quote: "「美しさは細部に宿る」 — Beauty lives in the details.",
      color: "#e59866"
    },
    {
      title: "Japan & Nihongo",
      tag: "LANGUAGE & CULTURE",
      note: "Fascinated by Japanese craftsmanship (Kodawari), minimalist architecture, rain-soaked alleyways, and the expressive nuance of the Japanese language.",
      quote: "「一期一会」 — Treasure every unrepeatable encounter.",
      color: "#d4a373"
    },
    {
      title: "Drums & Percussion",
      tag: "MUSIC & RHYTHM",
      note: "Playing drums taught me that complexity is just simple patterns executed with absolute precision and consistent timing. Rhythm is code made audible.",
      quote: "Pocket > speed. Always.",
      color: "#b5838d"
    },
    {
      title: "Analog & 35mm Aesthetic",
      tag: "PHOTOGRAPHY",
      note: "Dusk skylines, moody rainy windows, warm desk lamps, and quiet corners. Finding beauty in imperfections, film grain, and fleeting light.",
      quote: "35mm grain, imperfect and warm.",
      color: "#6b705c"
    }
  ],

  journal: [
    {
      id: "j1",
      date: "Sep 2026",
      tag: "Philosophy",
      title: "Things I'm figuring out.",
      snippet: "You don't need to know the entire destination before taking the first step. You just need enough clarity to write the next function.",
      content: "When I started coding, I thought senior engineers had everything mapped out in their heads before typing a single line. Now I know the truth: engineering is mostly an iterative conversation with failure. You build a crude prototype, watch it break in unexpected ways, fix the edge cases, and slowly sculpt something robust out of chaos. The key isn't perfection; it's the willingness to make sense eventually."
    },
    {
      id: "j2",
      date: "Aug 2026",
      tag: "Language",
      title: "Learning Japanese, slowly.",
      snippet: "A new language gives you a second soul to view the world with. Kanji isn't just symbols; it's visual philosophy.",
      content: "Studying Japanese has been humbling. Unlike Python where syntax errors give you immediate tracebacks, language acquisition is an ocean of ambiguous context. But there is a profound rhythm in writing Kanji strokes. Words like 森林浴 (shinrin-yoku, forest bathing) or 改善 (kaizen, continuous improvement) reveal a culture obsessed with mindful precision. 毎日少しずつ (little by little every day)."
    },
    {
      id: "j3",
      date: "Jul 2026",
      tag: "Engineering",
      title: "Why I keep rebuilding things from scratch.",
      snippet: "The first version is for the computer to execute. The second version is for your future self to understand.",
      content: "Every developer knows the itch: looking at code written three months ago and feeling a strong urge to incinerate it and start over. While premature rewrites can be a trap, intentional rebuilds are where deep mastery happens. When you rebuild something you already understand conceptually, you stop fighting the syntax and start thinking about memory layout, latency, architecture, and developer ergonomics."
    },
    {
      id: "j4",
      date: "Jun 2026",
      tag: "Perspective",
      title: "Some ideas are better left unfinished.",
      snippet: "Not every sketch needs to become an oil painting. The graveyard of half-baked side projects is really a playground.",
      content: "I used to feel guilty about having twenty unfinished folders in my repositories. Now I view them as research notebooks. A scratch script testing an OpenCV edge detector might never become a full SaaS, but six months later that exact snippet becomes the core of an attendance engine. Creativity thrives when there is zero pressure for every experiment to succeed."
    },
    {
      id: "j5",
      date: "May 2026",
      tag: "Atmosphere",
      title: "The beauty of a quiet 3 AM commit.",
      snippet: "When the city goes silent, the noise floor drops, and the editor cursor becomes the center of the universe.",
      content: "There's a specific kind of mental focus that only happens after midnight. The notification pings stop, the room is dimly lit by an amber desk lamp, and you enter a flow state where complex algorithmic abstractions become almost physical. It's not about burning out; it's about claiming a pocket of uninterrupted time to create."
    }
  ]
};

if (typeof window !== "undefined") {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
