const state = {
  activeLayer: "profile",
  analysis: null,
};

const autoIdentityState = {
  lastValue: "",
};

const lexicons = {
  openness: [
    "ai",
    "analytics",
    "innovation",
    "modernization",
    "transformation",
    "cloud-native",
    "startup",
    "genai",
    "data science",
    "platform",
    "digital",
    "patent",
    "future",
  ],
  conscientiousness: [
    "governance",
    "compliance",
    "audit",
    "risk",
    "security",
    "resilience",
    "controls",
    "process",
    "finance",
    "reliability",
    "operational",
    "standards",
  ],
  extraversion: [
    "cio",
    "cto",
    "ciso",
    "cfo",
    "vp",
    "head",
    "chief",
    "board",
    "strategy",
    "mandate",
    "budget",
    "decision",
    "lead",
  ],
  agreeableness: [
    "mentor",
    "university",
    "community",
    "council",
    "partnership",
    "collaboration",
    "stakeholder",
    "customer",
    "sustainability",
    "team",
    "ecosystem",
  ],
  emotionalStability: [
    "architecture",
    "standards",
    "governance",
    "controls",
    "resilience",
    "continuity",
    "reliability",
    "stable",
    "pragmatic",
    "measured",
    "assurance",
    "confidence",
    "low-disruption",
  ],
  oracle: [
    "oracle",
    "database",
    "exadata",
    "e-business",
    "ebs",
    "peoplesoft",
    "jd edwards",
    "weblogic",
    "fusion",
    "autonomous",
    "rac",
  ],
  cloud: ["aws", "azure", "gcp", "google cloud", "multicloud", "cloud", "vmware", "data center", "migration"],
};

const personaMap = {
  cio: {
    label: "CIO / IT strategy",
    motive: "business continuity, governance, and measurable transformation outcomes",
    wedge: "board-level risk reduction with visible modernization progress",
    relate: "be seen as the leader who modernizes the core without putting the business at risk",
    question: "Where is cloud expected to create measurable business leverage, not just infrastructure movement?",
  },
  cto: {
    label: "CTO / Engineering",
    motive: "architecture optionality, performance, and developer velocity",
    wedge: "high-performance landing zones for data-heavy and mission-critical workloads",
    relate: "keep architectural freedom while proving the platform can handle serious workloads",
    question: "Which workloads are constrained by latency, database throughput, or platform complexity today?",
  },
  ciso: {
    label: "CISO / Risk",
    motive: "control, auditability, segmentation, and predictable exposure reduction",
    wedge: "secure-by-design isolation and governed cloud adoption",
    relate: "move cloud ambition through a control lens the risk committee can trust",
    question: "Which controls must be provable before a workload can move?",
  },
  cfo: {
    label: "CFO / Finance",
    motive: "cost predictability, lower migration risk, and stronger ROI proof",
    wedge: "unit economics, license leverage, and lower operating variance",
    relate: "turn cloud from a variable spend story into a business-case discipline",
    question: "Where are cloud costs drifting away from the original business case?",
  },
  data: {
    label: "Data / AI leader",
    motive: "trusted data access, model readiness, and faster insight cycles",
    wedge: "database gravity plus governed AI and analytics pathways",
    relate: "make operational data usable for AI without losing trust, lineage, or control",
    question: "Which data domains are hardest to activate for AI because they sit close to core systems?",
  },
  infra: {
    label: "Infrastructure leader",
    motive: "migration certainty, operational control, and platform resilience",
    wedge: "data center exit without rewriting the hardest workloads first",
    relate: "reduce data center pressure without making the hardest systems fragile",
    question: "Which platforms would cause the most disruption if a migration went sideways?",
  },
  apps: {
    label: "Applications leader",
    motive: "application uptime, release confidence, and integration simplicity",
    wedge: "modernization around core Oracle and enterprise application estates",
    relate: "protect business-critical applications while creating room to modernize around them",
    question: "Which application dependencies make cloud migration more complex than the roadmap suggests?",
  },
};

const stanceMap = {
  unknown: "position OCI as the control point for the workloads where architecture, data, and economics matter most",
  aws: "avoid cloud-war framing and position OCI as a specialist landing zone for Oracle, data-heavy, and regulated workloads alongside AWS",
  azure: "connect to Microsoft adjacency, enterprise identity, and multicloud operating models while making OCI the Oracle-performance plane",
  gcp: "respect the analytics narrative and pivot toward governed operational data, database proximity, and enterprise workload resilience",
  multicloud: "make OCI the rational third plane for database gravity, sovereign control, and predictable economics",
  onprem: "lead with migration assurance, familiar enterprise controls, and low-disruption paths for core systems",
};

const stanceLabels = {
  unknown: "Unknown",
  aws: "AWS leaning",
  azure: "Azure leaning",
  gcp: "GCP leaning",
  multicloud: "Multicloud",
  onprem: "On-prem heavy",
};

const riskLabels = {
  1: "Guarded",
  2: "Cautious",
  3: "Balanced",
  4: "Progressive",
  5: "Bold",
};

const contentIntentLabels = {
  educate: "Educate without pitching",
  challenge: "Challenge status quo",
  peer: "Peer-learning angle",
  invite: "Invite discovery",
};

const signalLabels = {
  ai: "AI and data",
  security: "Security and compliance",
  cost: "Cost control",
  oracle: "Oracle estate",
  performance: "Performance",
  sovereignty: "Sovereignty",
};

const frameworkMap = {
  ocean: {
    label: "Big Five / OCEAN",
    method:
      "Trait-based professional-signal interpretation across openness, conscientiousness, extraversion, agreeableness, and emotional stability.",
  },
  regulatory: {
    label: "Regulatory Focus Theory",
    method:
      "Motivation-based interpretation of whether the buyer is likely to respond more to prevention, control, assurance, promotion, or growth framing.",
  },
  schwartz: {
    label: "Schwartz Values Theory",
    method:
      "Values-based interpretation of likely resonance around security, achievement, self-direction, stimulation, and universalism.",
  },
  adoption: {
    label: "Technology Adoption Lifecycle",
    method:
      "Adoption-behavior interpretation of whether cloud change should be framed through innovation, pragmatism, proof, risk control, or peer validation.",
  },
};

const els = {
  linkedinUrlInput: document.querySelector("#linkedinUrlInput"),
  identityInput: document.querySelector("#identityInput"),
  profileInput: document.querySelector("#profileInput"),
  frameworkSelect: document.querySelector("#frameworkSelect"),
  personaSelect: document.querySelector("#personaSelect"),
  stanceSelect: document.querySelector("#stanceSelect"),
  triggerInput: document.querySelector("#triggerInput"),
  contentIntentSelect: document.querySelector("#contentIntentSelect"),
  riskSlider: document.querySelector("#riskSlider"),
  riskOutput: document.querySelector("#riskOutput"),
  resetBtn: document.querySelector("#resetBtn"),
  copyBtn: document.querySelector("#copyBtn"),
  exportBtn: document.querySelector("#exportBtn"),
  activeLayer: document.querySelector("#activeLayer"),
  modelBanner: document.querySelector("#modelBanner"),
  toast: document.querySelector("#toast"),
  layerTabs: Array.from(document.querySelectorAll(".layer-tab")),
};

function normalize(text) {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

function countHits(text, words) {
  return words.reduce((total, word) => {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`\\b${escaped}\\b`, "gi");
    const matches = text.match(regex);
    return total + (matches ? matches.length : 0);
  }, 0);
}

function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function averageScore(...values) {
  return clamp(Math.round(values.reduce((total, value) => total + value, 0) / values.length));
}

function getSignals() {
  return Array.from(document.querySelectorAll('input[name="signal"]:checked')).map((input) => input.value);
}

function identityFromLinkedInUrl(url) {
  if (!url) return "";

  try {
    const parsed = new URL(url);
    const segments = parsed.pathname.split("/").filter(Boolean);
    const lowerSegments = segments.map((segment) => segment.toLowerCase());
    const profileIndex = lowerSegments.indexOf("in");
    const leadIndex = lowerSegments.findIndex((segment, index) => segment === "lead" && lowerSegments[index - 1] === "sales");
    const slug =
      (profileIndex >= 0 && segments[profileIndex + 1]) ||
      (leadIndex >= 0 && segments[leadIndex + 1]) ||
      segments[segments.length - 1] ||
      "";
    return slugToIdentity(slug);
  } catch {
    const match = url.match(/linkedin\.com\/(?:in|sales\/lead)\/([^/?#]+)/i);
    return match ? slugToIdentity(match[1]) : "";
  }
}

function slugToIdentity(slug) {
  return decodeURIComponent(slug)
    .replace(/\d{3,}$/g, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace(/\b(Cio|Cto|Ciso|Cfo|Vp|Ai|Ml|It|Erp|Aws|Gcp|Oci)\b/g, (match) => match.toUpperCase());
}

function deriveProspectIdentity(url, manualIdentity) {
  return manualIdentity.trim() || identityFromLinkedInUrl(url) || "this prospect";
}

function syncIdentityFromLinkedInUrl() {
  const autoIdentity = identityFromLinkedInUrl(els.linkedinUrlInput.value.trim());
  const currentIdentity = els.identityInput.value.trim();
  const shouldAutoFill = !currentIdentity || currentIdentity === autoIdentityState.lastValue;

  if (shouldAutoFill) {
    els.identityInput.value = autoIdentity;
  }

  autoIdentityState.lastValue = autoIdentity;
}

function scoreProfile(text, persona, risk) {
  const normalized = normalize(text);
  const words = normalized.split(" ").filter(Boolean).length;
  const density = Math.min(words / 120, 1);
  const base = 42 + Math.round(density * 10);

  const scores = {
    openness: base + countHits(normalized, lexicons.openness) * 6 + (risk - 3) * 4,
    conscientiousness: base + countHits(normalized, lexicons.conscientiousness) * 5 + (3 - risk) * 3,
    extraversion: base + countHits(normalized, lexicons.extraversion) * 5,
    agreeableness: base + countHits(normalized, lexicons.agreeableness) * 5,
    emotionalStability: base + countHits(normalized, lexicons.emotionalStability) * 5 + (risk - 3) * 3,
    oracle: countHits(normalized, lexicons.oracle),
    cloud: countHits(normalized, lexicons.cloud),
  };

  if (persona === "ciso") {
    scores.conscientiousness += 8;
    scores.emotionalStability += 5;
  }

  if (persona === "cto" || persona === "data") {
    scores.openness += 8;
  }

  if (persona === "cfo") {
    scores.conscientiousness += 7;
    scores.emotionalStability += 4;
  }

  Object.keys(scores).forEach((key) => {
    if (!["oracle", "cloud"].includes(key)) {
      scores[key] = clamp(Math.round(scores[key]));
    }
  });

  return scores;
}

function deriveDecisionStyle(scores, risk) {
  if (scores.conscientiousness >= 74 && scores.emotionalStability >= 68) return "Proof-first operator";
  if (scores.openness >= 72 && scores.extraversion >= 62) return "Transformation sponsor";
  if (scores.extraversion >= 70) return "Outcome-led executive";
  if (risk <= 2) return "Risk-aware steward";
  if (scores.agreeableness >= 68) return "Consensus builder";
  return "Evidence-led architect";
}

function deriveOceanProfile(scores) {
  const ranked = [
    ["O", scores.openness, "future-oriented, responsive to modernization, AI, and new architecture patterns"],
    ["C", scores.conscientiousness, "proof-led, careful about governance, reliability, and execution discipline"],
    ["E", scores.extraversion, "externally engaged, responsive to executive framing and peer signals"],
    ["A", scores.agreeableness, "stakeholder-aware, responsive to consensus, partnership, and shared outcomes"],
    ["N-", scores.emotionalStability, "measured under uncertainty, responsive to risk reduction and controlled change"],
  ].sort((a, b) => b[1] - a[1]);

  return {
    code: ranked
      .slice(0, 2)
      .map((item) => item[0])
      .join(""),
    explanation: ranked
      .slice(0, 2)
      .map((item) => item[2])
      .join("; "),
  };
}

function makeDimension(label, value, short = label) {
  return {
    label,
    short,
    value: clamp(Math.round(value)),
  };
}

function deriveFrameworkProfile(frameworkKey, scores, risk, oceanProfile) {
  const selectedKey = frameworkMap[frameworkKey] ? frameworkKey : "ocean";
  const framework = frameworkMap[selectedKey];
  const riskBoldness = clamp(28 + risk * 13);
  const riskControl = clamp(102 - risk * 12);

  const profiles = {
    ocean: [
      makeDimension("Openness", scores.openness, "O"),
      makeDimension("Conscientiousness", scores.conscientiousness, "C"),
      makeDimension("Extraversion", scores.extraversion, "E"),
      makeDimension("Agreeableness", scores.agreeableness, "A"),
      makeDimension("Emotional Stability", scores.emotionalStability, "N-"),
    ],
    regulatory: [
      makeDimension("Prevention Focus", averageScore(scores.conscientiousness, scores.emotionalStability, riskControl), "Prevention"),
      makeDimension("Promotion Focus", averageScore(scores.openness, scores.extraversion, riskBoldness), "Promotion"),
      makeDimension("Control Need", averageScore(scores.conscientiousness, scores.emotionalStability), "Control"),
      makeDimension("Proof Orientation", scores.conscientiousness, "Proof"),
      makeDimension("Peer Resonance", averageScore(scores.agreeableness, scores.extraversion), "Peer"),
    ],
    schwartz: [
      makeDimension("Security", averageScore(scores.conscientiousness, scores.emotionalStability, riskControl), "Security"),
      makeDimension("Achievement", averageScore(scores.conscientiousness, scores.extraversion), "Achievement"),
      makeDimension("Self-Direction", scores.openness, "Self-direction"),
      makeDimension("Stimulation", averageScore(scores.openness, riskBoldness), "Stimulation"),
      makeDimension("Universalism", scores.agreeableness, "Universalism"),
    ],
    adoption: [
      makeDimension("Innovation Pull", averageScore(scores.openness, riskBoldness), "Innovation"),
      makeDimension("Pragmatism", averageScore(scores.conscientiousness, scores.emotionalStability), "Pragmatism"),
      makeDimension("Peer Proof", averageScore(scores.agreeableness, scores.extraversion), "Peer proof"),
      makeDimension("Risk Control", averageScore(scores.conscientiousness, scores.emotionalStability, riskControl), "Risk control"),
      makeDimension("Workload Urgency", averageScore(scores.openness, clamp(44 + scores.cloud * 10)), "Urgency"),
    ],
  };

  const dimensions = profiles[selectedKey] || profiles.ocean;
  const ranked = [...dimensions].sort((a, b) => b.value - a.value);
  const code =
    selectedKey === "ocean"
      ? oceanProfile.code
      : ranked
          .slice(0, 2)
          .map((item) => item.short)
          .join(" + ");
  const explanation =
    selectedKey === "ocean"
      ? oceanProfile.explanation
      : `${ranked[0].label} and ${ranked[1].label} are the strongest model signals from the available professional evidence`;

  return {
    key: selectedKey,
    label: framework.label,
    method: framework.method,
    code,
    explanation,
    dimensions,
  };
}

function deriveHooks(text, signals, persona, trigger) {
  const normalized = normalize(text);
  const hooks = [];

  if (signals.includes("ai") || normalized.includes("ai") || normalized.includes("analytics")) {
    hooks.push("Open around trusted operational data for AI, then ask where data gravity slows model adoption.");
  }

  if (signals.includes("security") || normalized.includes("security") || normalized.includes("risk")) {
    hooks.push("Use resilience and control as the first thread: segmentation, audit proof, and low-disruption migration.");
  }

  if (signals.includes("cost") || normalized.includes("cost") || persona === "cfo") {
    hooks.push("Bring cloud economics into the conversation early: predictable pricing, license leverage, and avoided refactoring.");
  }

  if (signals.includes("oracle") || countHits(normalized, lexicons.oracle) > 0) {
    hooks.push("Anchor on Oracle workload gravity: databases, enterprise apps, and the business risk of moving them generically.");
  }

  if (signals.includes("performance") || normalized.includes("latency") || normalized.includes("performance")) {
    hooks.push("Test for pain around throughput, latency, and batch windows where general-purpose cloud designs struggle.");
  }

  if (signals.includes("sovereignty") || normalized.includes("sovereignty") || normalized.includes("regulated")) {
    hooks.push("Use sovereignty, data residency, and deployment choice as a board-level control conversation.");
  }

  if (normalized.includes("mentor") || normalized.includes("university") || normalized.includes("council")) {
    hooks.push("Reference peer learning: executive forums, technical councils, and pragmatic transformation lessons.");
  }

  if (trigger) {
    hooks.unshift(`Connect the first question to the current trigger: ${trigger}.`);
  }

  return ensureThree(hooks, [
    "Ask what has made prior cloud programs harder than expected: data, cost, skills, compliance, or executive confidence.",
    "Use a customer-story frame rather than a product pitch: core systems moved safely, economics improved, options preserved.",
    "Explore where the prospect wants optionality without adding another operational burden.",
  ]);
}

function deriveResonance(text, signals, personaData, scores, stance, trigger, ociWedge) {
  const normalized = normalize(text);
  const candidates = [
    {
      key: "oracle",
      weight: (signals.includes("oracle") ? 18 : 0) + scores.oracle * 8,
      idea: "core-system confidence",
      bridge: `He may relate to OCI through the need to modernize around systems that cannot be treated like ordinary infrastructure.`,
      question: "Which systems are too central to the business to move with a generic cloud migration playbook?",
      ociMoment: "When he names core-system risk, introduce OCI as a workload-specific path for Oracle databases, enterprise apps, and adjacent modernization.",
    },
    {
      key: "ai",
      weight: (signals.includes("ai") ? 16 : 0) + (normalized.includes("ai") ? 8 : 0) + (normalized.includes("analytics") ? 8 : 0),
      idea: "trusted data becoming useful intelligence",
      bridge: "He may relate to OCI as a way to make practical AI possible without separating AI ambition from governed operational data.",
      question: "Where does the AI agenda slow down because the most valuable data is still close to core operational systems?",
      ociMoment: "When he connects AI to operational data, introduce OCI as the place where database gravity, analytics, and governed AI can be discussed together.",
    },
    {
      key: "security",
      weight: (signals.includes("security") ? 16 : 0) + (scores.emotionalStability > 68 ? 10 : 0) + (scores.conscientiousness > 70 ? 6 : 0),
      idea: "speed with control",
      bridge: "He may relate to OCI through the tension between public cloud progress and the controls needed to keep risk owners comfortable.",
      question: "What proof would make a cloud move feel controlled enough for the risk, security, and audit stakeholders?",
      ociMoment: "When he frames cloud as a control problem, introduce OCI through isolation, network design, compliance posture, and migration assurance.",
    },
    {
      key: "cost",
      weight: (signals.includes("cost") ? 16 : 0) + (normalized.includes("cost") ? 8 : 0) + (normalized.includes("margin") ? 6 : 0),
      idea: "cloud economics that behave",
      bridge: "He may relate to OCI through the desire to make cloud spend predictable enough to defend in business terms.",
      question: "Where has cloud delivered technical progress but made the financial model harder to explain?",
      ociMoment: "When he talks about cost drift, introduce OCI through price-performance, license leverage, and a narrow workload business case.",
    },
    {
      key: "performance",
      weight: (signals.includes("performance") ? 16 : 0) + (normalized.includes("latency") ? 8 : 0) + (normalized.includes("throughput") ? 8 : 0),
      idea: "critical workload performance",
      bridge: "He may relate to OCI through workloads where performance is not a benchmark vanity metric but a business operating constraint.",
      question: "Which batch windows, latency points, or database workloads create real business pressure when performance slips?",
      ociMoment: "When he identifies a performance constraint, introduce OCI through a proof path around that one workload and its success metric.",
    },
    {
      key: "sovereignty",
      weight: (signals.includes("sovereignty") ? 16 : 0) + (normalized.includes("regulated") ? 8 : 0) + (normalized.includes("sovereignty") ? 8 : 0),
      idea: "growth with data control",
      bridge: "He may relate to OCI through the need to keep cloud strategy aligned with data residency, deployment choice, and regulatory expectations.",
      question: "Where do data residency or regulatory expectations constrain what public cloud can look like?",
      ociMoment: "When he names residency or regulatory boundaries, introduce OCI through deployment choice and governed workload placement.",
    },
  ];

  const topCandidate = candidates.sort((a, b) => b.weight - a.weight)[0];
  const winner =
    topCandidate.weight > 0
      ? topCandidate
      : {
          idea: personaData.relate,
          bridge: `He may relate to OCI through the ambition to ${personaData.relate}.`,
          question: "What has to remain stable while the cloud strategy evolves?",
          ociMoment: "When he names the business pressure, introduce OCI as a narrow workload-specific option to test rather than a platform switch.",
        };
  const triggerLine = trigger
    ? `Connect it to the live pressure: ${trigger}.`
    : "Connect it to a current business pressure before naming any platform.";

  return {
    idea: winner.idea,
    bridge: winner.bridge,
    questions: ensureThree(
      [
        triggerLine,
        winner.question,
        personaData.question,
        "If this worked well, what would the business notice first: lower risk, faster insight, better economics, or fewer operational surprises?",
      ],
      [
        "What has to remain stable while the cloud strategy evolves?",
        "Which workload would be worth reassessing if the risk and economics were clearer?",
        "What would make another cloud conversation worth your time?",
      ],
    ),
    noPitchPath: [
      "Use his language first; do not introduce OCI until he has named the pressure in his own words.",
      `Frame the issue as ${winner.idea}, not as a public-cloud bakeoff.`,
      "Ask for the workload or decision where this pressure is most visible.",
      winner.ociMoment,
      `Then connect OCI to ${ociWedge.toLowerCase()} with proof, not enthusiasm.`,
    ],
    ociMoment: winner.ociMoment,
  };
}

function deriveOCI(text, signals, stance, personaData, scores) {
  const normalized = normalize(text);
  const oci = [];

  if (signals.includes("oracle") || scores.oracle > 0) {
    oci.push("Let OCI enter through Oracle databases and enterprise applications where performance, support alignment, and migration risk are already part of his reality.");
  }

  if (signals.includes("cost")) {
    oci.push("Translate OCI into commercial predictability: data movement, licensing, and steady-state run costs he can defend.");
  }

  if (signals.includes("security") || scores.conscientiousness > 66 || scores.emotionalStability > 66) {
    oci.push("Make OCI feel like a control pattern: isolation, identity, encryption, network design, compliance posture, and audit-ready operations.");
  }

  if (signals.includes("ai") || normalized.includes("analytics")) {
    oci.push("Tie OCI to governed data modernization: keep operational data close, expose it safely, and accelerate analytics or AI without uncontrolled copies.");
  }

  if (signals.includes("performance")) {
    oci.push("Use a workload-specific proof path for database throughput, latency, and batch completion windows.");
  }

  if (signals.includes("sovereignty")) {
    oci.push("Connect OCI to deployment choice and data residency if public cloud ambition is constrained by regulation or geography.");
  }

  oci.push(`Against the current cloud stance, ${stanceMap[stance]}.`);
  oci.push(`For this buyer lens, make the wedge ${personaData.wedge}.`);

  return ensureThree(oci, [
    "Offer a narrow proof around one business-critical workload instead of asking for a broad cloud re-platforming commitment.",
    "Frame OCI as complementary to existing hyperscaler investments where the economics or architecture are workload-specific.",
    "Quantify the cost of doing nothing: risk exposure, migration delay, lost analytics speed, or infrastructure renewal spend.",
  ]);
}

function deriveObjections(stance, scores, risk) {
  const objections = [];

  if (stance === "aws") {
    objections.push("If they say AWS is the standard, respond with a workload-fit argument: keep AWS where it works, evaluate OCI where Oracle/data gravity changes the equation.");
  } else if (stance === "azure") {
    objections.push("If they are Azure-first, do not challenge the enterprise platform choice; position OCI as the specialist Oracle and data plane beside it.");
  } else if (stance === "gcp") {
    objections.push("If they prefer GCP for analytics, focus on operational database proximity, governance, and performance for systems of record.");
  } else if (stance === "onprem") {
    objections.push("If they distrust public cloud, offer a phased migration path with proof, control mapping, and rollback clarity.");
  } else {
    objections.push("If they ask why another cloud, answer with workload specificity: economics, Oracle performance, data gravity, and operational risk.");
  }

  if (scores.conscientiousness >= 68 || scores.emotionalStability >= 68 || risk <= 2) {
    objections.push("If risk comes up, ask what evidence would make the move acceptable: reference architecture, controls, SLA, migration plan, or executive proof.");
  }

  if (scores.openness >= 70) {
    objections.push("If they want innovation, avoid a database-only pitch; connect core data to AI, automation, and faster business experimentation.");
  } else {
    objections.push("If innovation feels too abstract, keep the pitch concrete: one workload, one risk, one economic model, one success metric.");
  }

  return objections;
}

function deriveContentPosture(scores, oceanProfile, risk) {
  if (scores.conscientiousness >= 72 || risk <= 2) return "proof-led, specific, and careful with claims";
  if (scores.openness >= 74) return "future-facing, but tied to practical business constraints";
  if (scores.extraversion >= 72) return "outcome-led, concise, and framed around executive choices";
  if (scores.agreeableness >= 70) return "peer-oriented, conversational, and anchored in shared lessons";
  if (oceanProfile.code.includes("C")) return "architecture-led with clear evidence and tradeoffs";
  return "balanced, consultative, and grounded in the prospect's operating reality";
}

function deriveIntentFrame(intent, resonanceIdea) {
  const frames = {
    educate: `Educate around ${resonanceIdea} without naming a product first.`,
    challenge: `Challenge the assumption that all public cloud choices should be treated as equivalent.`,
    peer: `Use peer learning to make ${resonanceIdea} feel like a shared executive problem.`,
    invite: `Invite a low-pressure exploration of where ${resonanceIdea} is showing up in their roadmap.`,
  };

  return frames[intent] || frames.educate;
}

function deriveResearchPlan(identity, linkedinUrl, trigger) {
  const quotedIdentity = identity === "this prospect" ? "prospect name" : `"${identity}"`;
  const triggerQuery = trigger ? ` "${trigger}"` : "";
  const urlLine = linkedinUrl
    ? `Anchor identity on ${linkedinUrl}. Verify role, company, and recent activity before relying on any inference.`
    : "Add the LinkedIn profile URL to anchor the identity before researching.";

  return [
    urlLine,
    `Search ${quotedIdentity} cloud strategy OCI AWS Azure GCP`,
    `Search ${quotedIdentity} Oracle database ERP data center migration`,
    `Search ${quotedIdentity} keynote podcast interview CIO CTO CISO`,
    `Search ${quotedIdentity} AI analytics data governance security${triggerQuery}`,
    `Search ${quotedIdentity} site:linkedin.com/posts OR site:linkedin.com/pulse`,
    "Look for public talks, articles, hiring signals, technology partnerships, cloud job postings, analyst quotes, and company transformation announcements.",
  ];
}

function deriveContentFeed(analysis) {
  const posture = deriveContentPosture(analysis.scores, analysis.oceanProfile, analysis.risk);
  const intentFrame = deriveIntentFrame(analysis.contentIntent, analysis.resonance.idea);
  const triggerPhrase = analysis.trigger || "the current cloud roadmap";
  const businessLens = analysis.personaData.motive;
  const question = analysis.resonance.questions[1] || analysis.personaData.question;

  const challengeLine =
    analysis.contentIntent === "challenge"
      ? "The uncomfortable question is whether the easiest cloud migration path is also the safest one for the systems that run the business."
      : "The useful question is not which cloud is generally better, but which architecture reduces risk for the specific workload in front of the team.";

  return [
    {
      label: "Model used",
      text: `${analysis.frameworkProfile.label}: ${analysis.frameworkProfile.method} Working readout: ${analysis.frameworkProfile.code} - ${analysis.frameworkProfile.explanation}. Keep every inference tied to public professional signals, and avoid covert manipulation, sensitive-trait inference, or fear-based targeting.`,
    },
    {
      label: "Content posture",
      text: `${contentIntentLabels[analysis.contentIntent]}: ${intentFrame} Keep the tone ${posture}. Buyer lens: ${analysis.personaData.label}. Cloud stance: ${stanceLabels[analysis.stance]}.`,
    },
    {
      label: "LinkedIn comment",
      text: `${analysis.identity === "this prospect" ? "This is where" : `${analysis.identity}, this is where`} cloud strategy gets interesting: the hard part is not moving infrastructure, it is preserving confidence in the systems that carry the business. For ${triggerPhrase}, I would be curious which workloads need a more deliberate path than a standard migration factory.`,
    },
    {
      label: "Short POV post",
      text: `${challengeLine} For leaders focused on ${businessLens}, the real test is whether cloud helps protect the core while creating room for data, AI, and modernization. The teams that get this right usually start with one business-critical workload, one risk model, and one measurable proof point.`,
    },
    {
      label: "DM or email opener",
      text: `${analysis.openingMessage} I can share a simple workload-fit lens we use for this conversation; it is not a pitch deck, just a way to separate generic cloud movement from architecture decisions that matter.`,
    },
    {
      label: "Meeting prompt",
      text: `${question} If the answer points to database gravity, core applications, governed data, or migration risk, that is the moment to discuss whether OCI deserves a narrow proof path.`,
    },
    {
      label: "Three-touch nurture",
      text: `1. Share a neutral post on ${analysis.resonance.idea}. 2. Follow with a peer-learning question about ${triggerPhrase}. 3. Offer a workload-fit discussion only after they engage with the problem framing.`,
    },
  ];
}

function signalSummary(signals) {
  return signals.map((signal) => signalLabels[signal] || signal).join(", ") || "No signals selected";
}

function deriveInputContext(analysis) {
  const notesState = analysis.profileText
    ? "Public notes are included in the inference."
    : "No additional public notes provided; output relies on URL identity, selected controls, and defaults.";
  const triggerState = analysis.trigger ? analysis.trigger : "No trigger event specified";
  const urlState = analysis.linkedinUrl ? "LinkedIn URL supplied" : "LinkedIn URL not supplied";
  const signals = signalSummary(analysis.signals);

  return {
    summary: `Inputs applied: ${analysis.personaData.label}; ${stanceLabels[analysis.stance]}; ${contentIntentLabels[analysis.contentIntent]}; ${riskLabels[analysis.risk]} risk appetite; signals: ${signals}.`,
    lines: [
      `Prospect identity: ${analysis.identity}. ${urlState}.`,
      `Buyer lens: ${analysis.personaData.label}; primary motive: ${analysis.personaData.motive}.`,
      `Cloud stance: ${stanceLabels[analysis.stance]}; positioning: ${stanceMap[analysis.stance]}.`,
      `Content intent: ${contentIntentLabels[analysis.contentIntent]}; outreach frame: ${deriveIntentFrame(analysis.contentIntent, analysis.resonance.idea)}.`,
      `Risk appetite: ${riskLabels[analysis.risk]}; calibrate proof depth, pace, and risk language accordingly.`,
      `Signals emphasized: ${signals}.`,
      `Trigger event: ${triggerState}.`,
      notesState,
    ],
  };
}

function ensureThree(items, fallbacks) {
  const clean = Array.from(new Set(items.filter(Boolean)));
  fallbacks.forEach((item) => {
    if (clean.length < 3) clean.push(item);
  });
  return clean.slice(0, 5);
}

function buildAnalysis() {
  const linkedinUrl = els.linkedinUrlInput.value.trim();
  const manualIdentity = els.identityInput.value.trim();
  const identity = deriveProspectIdentity(linkedinUrl, manualIdentity);
  const profileText = els.profileInput.value.trim();
  const framework = els.frameworkSelect.value;
  const persona = els.personaSelect.value;
  const stance = els.stanceSelect.value;
  const contentIntent = els.contentIntentSelect.value;
  const risk = Number(els.riskSlider.value);
  const signals = getSignals();
  const trigger = els.triggerInput.value.trim();
  const personaData = personaMap[persona];
  const textForScoring = [identity, profileText, trigger, signals.join(" "), personaData.label].join(" ");
  const scores = scoreProfile(textForScoring, persona, risk);
  const oceanProfile = deriveOceanProfile(scores);
  const frameworkProfile = deriveFrameworkProfile(framework, scores, risk, oceanProfile);
  const decisionStyle = deriveDecisionStyle(scores, risk);
  const hooks = deriveHooks(profileText, signals, persona, trigger);
  const oci = deriveOCI(profileText, signals, stance, personaData, scores);
  const objections = deriveObjections(stance, scores, risk);
  const ociWedge = scores.oracle > 0 || signals.includes("oracle") ? "Database gravity" : personaData.wedge;
  const resonance = deriveResonance(profileText, signals, personaData, scores, stance, trigger, ociWedge);
  const bestWedge = resonance.idea;
  const openingMessage = makeOpeningMessage({ trigger, resonance });
  const researchPlan = deriveResearchPlan(identity, linkedinUrl, trigger);

  const analysis = {
    linkedinUrl,
    identity,
    profileText,
    framework,
    frameworkProfile,
    persona,
    personaData,
    stance,
    contentIntent,
    risk,
    signals,
    trigger,
    scores,
    oceanProfile,
    decisionStyle,
    hooks,
    oci,
    objections,
    resonance,
    ociWedge,
    bestWedge,
    openingMessage,
    researchPlan,
  };

  analysis.inputContext = deriveInputContext(analysis);
  analysis.contentFeed = deriveContentFeed(analysis);
  return analysis;
}

function makeOpeningMessage(analysis) {
  const triggerLine = analysis.trigger
    ? `I noticed the current focus around ${analysis.trigger}.`
    : "I noticed your focus seems to sit at the intersection of cloud change, operational risk, and business value.";

  return `${triggerLine} Rather than compare clouds at a brochure level, I would be curious where ${analysis.resonance.idea} is becoming a real operating question for you. Which workload or decision would be worth exploring if the risk, economics, and control model were clearer?`;
}

function frameworkDimensionLines(dimensions) {
  return [
    `${dimensions[0].label}: ${dimensions[0].value}; ${dimensions[1].label}: ${dimensions[1].value}.`,
    `${dimensions[2].label}: ${dimensions[2].value}; ${dimensions[3].label}: ${dimensions[3].value}.`,
    `${dimensions[4].label}: ${dimensions[4].value}.`,
  ];
}

function renderLayer() {
  const analysis = state.analysis;
  if (!analysis) return;

  const layers = {
    profile: {
      title: "Professional signal profile",
      body: `Model used: ${analysis.frameworkProfile.label}. Likely ${analysis.decisionStyle.toLowerCase()} with a ${analysis.frameworkProfile.code} readout: ${analysis.frameworkProfile.explanation}. ${analysis.inputContext.summary} Treat this as a working hypothesis, not a personality label.`,
      left: [
        `Model used: ${analysis.frameworkProfile.label}.`,
        ...frameworkDimensionLines(analysis.frameworkProfile.dimensions),
        `Risk posture: ${riskLabels[analysis.risk]}.`,
      ],
      right: analysis.inputContext.lines,
    },
    motives: {
      title: "Motive profile",
      body: `For ${analysis.identity}, viewed through a ${analysis.personaData.label} buyer lens, the strongest professional lever is ${analysis.personaData.motive}. Cloud stance is ${stanceLabels[analysis.stance]}, and content intent is ${contentIntentLabels[analysis.contentIntent]}.`,
      left: analysis.hooks.slice(0, 4),
      right: [
        analysis.personaData.question,
        `Cloud stance applied: ${stanceMap[analysis.stance]}.`,
        `Risk appetite applied: ${riskLabels[analysis.risk]}; tune the conversation pace and proof burden accordingly.`,
        "What would make the board comfortable that this move reduces risk instead of relocating it?",
        "Which cloud workloads have disappointed on cost, control, or migration effort?",
      ],
    },
    relate: {
      title: "The relatability bridge",
      body: `${analysis.resonance.bridge} This is the idea to make familiar before OCI is named. Signals emphasized: ${signalSummary(analysis.signals)}.`,
      left: analysis.resonance.questions.slice(0, 4),
      right: [
        `Trigger applied: ${analysis.trigger || "No trigger event specified"}.`,
        `Buyer lens applied: ${analysis.personaData.label}.`,
        ...analysis.resonance.noPitchPath.slice(0, 5),
      ],
    },
    oci: {
      title: "Where OCI enters",
      body: `OCI should enter only after the prospect has recognized the pressure. Cloud stance applied: ${stanceLabels[analysis.stance]}; ${stanceMap[analysis.stance]}.`,
      left: analysis.oci.slice(0, 4),
      right: [
        analysis.resonance.ociMoment,
        `Buyer lens: ${analysis.personaData.label}; wedge: ${analysis.personaData.wedge}.`,
        `Selected signals: ${signalSummary(analysis.signals)}.`,
        "Offer a proof path with success metrics before asking for platform commitment.",
        "Bring an architect or workload specialist into the second conversation.",
        "Use commercial modeling only after the technical and business pressure has been made explicit.",
      ],
    },
    message: {
      title: "The no-pitch opener",
      body: `Use a short, credible opener that creates recognition. Content intent applied: ${contentIntentLabels[analysis.contentIntent]}; risk appetite applied: ${riskLabels[analysis.risk]}.`,
      left: [analysis.openingMessage],
      right: [
        `Buyer lens: ${analysis.personaData.label}.`,
        `Cloud stance: ${stanceLabels[analysis.stance]}.`,
        `Signals: ${signalSummary(analysis.signals)}.`,
        "Do not lead with a deck.",
        "Do not attack AWS, Azure, or GCP.",
        "Do not name OCI before the prospect confirms the pressure.",
        "Do ask which workload would be most valuable to assess if the risk and economics were clearer.",
      ],
    },
    content: {
      title: "Proactive content feed",
      body: `Use these pieces to create professional familiarity with the idea before OCI is discussed. Content intent: ${contentIntentLabels[analysis.contentIntent]}; buyer lens: ${analysis.personaData.label}; cloud stance: ${stanceLabels[analysis.stance]}.`,
      left: analysis.contentFeed.slice(0, 4).map((item) => `${item.label}: ${item.text}`),
      right: analysis.contentFeed.slice(4).map((item) => `${item.label}: ${item.text}`),
    },
  };

  const layer = layers[state.activeLayer];
  els.activeLayer.innerHTML = `
    <div class="layer-content">
      <div class="layer-hero">
        <h3>${escapeHtml(layer.title)}</h3>
        <p>${escapeHtml(layer.body)}</p>
      </div>
      <div class="layer-lists">
        <ul class="evidence-list">${layer.left.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        <ul class="strategy-list">${layer.right.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </div>
    </div>
  `;
}

function renderPlaybook() {
  const analysis = state.analysis;
  if (!analysis) return;

  els.modelBanner.querySelector("strong").textContent = analysis.frameworkProfile.label;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function refresh() {
  state.analysis = buildAnalysis();
  renderLayer();
  renderPlaybook();
}

function setLayer(layer) {
  state.activeLayer = layer;
  els.layerTabs.forEach((tab) => {
    const isActive = tab.dataset.layer === layer;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });
  renderLayer();
}

function buildExportText() {
  const analysis = state.analysis || buildAnalysis();
  const lines = [
    "Oracle Analytica",
    "Targeted Psychological Plays to Augment OCI Sales Plays",
    "",
    `Prospect identity: ${analysis.identity}`,
    `LinkedIn URL: ${analysis.linkedinUrl || "Not provided"}`,
    `Profiling model framework: ${analysis.frameworkProfile.label}`,
    `Framework readout: ${analysis.frameworkProfile.code} - ${analysis.frameworkProfile.explanation}`,
    `Model method: ${analysis.frameworkProfile.method}`,
    `Buyer lens: ${analysis.personaData.label}`,
    `Cloud stance: ${stanceLabels[analysis.stance]}`,
    `Content intent: ${contentIntentLabels[analysis.contentIntent]}`,
    `Risk appetite: ${riskLabels[analysis.risk]}`,
    `Signals emphasised: ${signalSummary(analysis.signals)}`,
    `Trigger event: ${analysis.trigger || "Not provided"}`,
    `Decision style: ${analysis.decisionStyle}`,
    `Risk posture: ${riskLabels[analysis.risk]}`,
    `Relatable idea: ${analysis.bestWedge}`,
    "",
    "Applied input context:",
    ...analysis.inputContext.lines.map((item) => `- ${item}`),
    "",
    "Framework scores:",
    ...analysis.frameworkProfile.dimensions.map((item) => `- ${item.label}: ${item.value}`),
    "",
    "Relatability bridge:",
    `- ${analysis.resonance.bridge}`,
    ...analysis.resonance.questions.map((item) => `- ${item}`),
    "",
    "No-pitch path:",
    ...analysis.resonance.noPitchPath.map((item) => `- ${item}`),
    "",
    "Public research plan:",
    ...analysis.researchPlan.map((item) => `- ${item}`),
    "",
    "Proactive content feed:",
    ...analysis.contentFeed.flatMap((item) => [`${item.label}:`, item.text, ""]),
    "",
    "Conversation hooks:",
    ...analysis.hooks.map((item) => `- ${item}`),
    "",
    "OCI angle:",
    ...analysis.oci.map((item) => `- ${item}`),
    "",
    "Objection map:",
    ...analysis.objections.map((item) => `- ${item}`),
    "",
    "Opening message:",
    analysis.openingMessage,
    "",
    "Discovery question:",
    analysis.personaData.question,
    "",
    "Where OCI enters:",
    analysis.resonance.ociMoment,
    "",
    "Note: This is non-clinical inference from professional signals. Validate in discovery.",
  ];
  return lines.join("\n");
}

async function copyPlaybook() {
  const text = buildExportText();
  try {
    await navigator.clipboard.writeText(text);
    showToast("Playbook copied.");
  } catch {
    const temp = document.createElement("textarea");
    temp.value = text;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    temp.remove();
    showToast("Playbook copied.");
  }
}

function exportPlaybook() {
  const reportWindow = window.open("", "_blank");
  const html = buildPdfReportHtml();

  if (!reportWindow) {
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "oracle-analytica-pdf-export.html";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showToast("PDF export downloaded. Open it and save as PDF.");
    return;
  }

  reportWindow.document.open();
  reportWindow.document.write(html);
  reportWindow.document.close();
  showToast("PDF export opened. Choose Save as PDF.");
}

function buildPdfReportHtml() {
  const report = escapeHtml(buildExportText());

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Oracle Analytica PDF Export</title>
    <style>
      @page { margin: 18mm; }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        color: #121212;
        background: #fff;
        font-family: Inter, Arial, sans-serif;
        line-height: 1.45;
      }
      h1 {
        margin: 0 0 4px;
        font-size: 26px;
      }
      p {
        margin: 0 0 18px;
        color: #555;
        font-weight: 700;
      }
      pre {
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        font: 12px/1.5 Inter, Arial, sans-serif;
      }
    </style>
  </head>
  <body>
    <h1>Oracle Analytica</h1>
    <p>Targeted Psychological Plays to Augment OCI Sales Plays</p>
    <pre>${report}</pre>
    <script>
      window.addEventListener("load", () => window.print());
    </script>
  </body>
</html>`;
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    els.toast.classList.remove("show");
  }, 2400);
}

function resetForm() {
  els.linkedinUrlInput.value = "";
  els.identityInput.value = "";
  autoIdentityState.lastValue = "";
  els.profileInput.value = "";
  els.frameworkSelect.value = "ocean";
  els.personaSelect.value = "cio";
  els.stanceSelect.value = "unknown";
  els.contentIntentSelect.value = "educate";
  els.triggerInput.value = "";
  els.riskSlider.value = "3";
  document.querySelectorAll('input[name="signal"]').forEach((input) => {
    input.checked = ["ai", "security", "cost", "oracle"].includes(input.value);
  });
  updateRiskOutput();
  refresh();
  showToast("Workspace reset.");
}

function updateRiskOutput() {
  els.riskOutput.value = riskLabels[els.riskSlider.value];
  els.riskOutput.textContent = riskLabels[els.riskSlider.value];
}

function wireEvents() {
  els.resetBtn.addEventListener("click", resetForm);
  els.copyBtn.addEventListener("click", copyPlaybook);
  els.exportBtn.addEventListener("click", exportPlaybook);
  els.riskSlider.addEventListener("input", () => {
    updateRiskOutput();
    refresh();
  });

  els.linkedinUrlInput.addEventListener("input", () => {
    syncIdentityFromLinkedInUrl();
    refresh();
  });
  els.linkedinUrlInput.addEventListener("change", () => {
    syncIdentityFromLinkedInUrl();
    refresh();
  });

  [
    els.identityInput,
    els.profileInput,
    els.frameworkSelect,
    els.personaSelect,
    els.stanceSelect,
    els.contentIntentSelect,
    els.triggerInput,
  ].forEach((input) => {
    input.addEventListener("input", refresh);
    input.addEventListener("change", refresh);
  });

  document.querySelectorAll('input[name="signal"]').forEach((input) => {
    input.addEventListener("input", refresh);
    input.addEventListener("change", refresh);
  });

  els.layerTabs.forEach((tab) => {
    tab.addEventListener("click", () => setLayer(tab.dataset.layer));
  });
}

wireEvents();
updateRiskOutput();
syncIdentityFromLinkedInUrl();
refresh();
