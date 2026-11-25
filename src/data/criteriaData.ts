import { Category, ScoringBand } from "@/types/assessment";

export const TOTAL_POSSIBLE_MARKS = 495;
export const TOTAL_CRITERIA_COUNT = 38;

export const SCORING_LEVELS: ScoringBand[] = [
  { min: 86, max: 100, label: "Exceptional / Lead", badgeBg: "bg-emerald-50 text-emerald-800", badgeText: "text-emerald-700", border: "border-emerald-200" },
  { min: 76, max: 85, label: "Strong Independent", badgeBg: "bg-blue-50 text-blue-800", badgeText: "text-blue-700", border: "border-blue-200" },
  { min: 61, max: 75, label: "Autonomous Standard", badgeBg: "bg-teal-50 text-teal-800", badgeText: "text-teal-700", border: "border-teal-200" },
  { min: 41, max: 60, label: "Basic Ability", badgeBg: "bg-amber-50 text-amber-800", badgeText: "text-amber-700", border: "border-amber-200" },
  { min: 21, max: 40, label: "Heavy Guidance", badgeBg: "bg-orange-50 text-orange-800", badgeText: "text-orange-700", border: "border-orange-200" },
  { min: 0, max: 20, label: "Unsatisfactory", badgeBg: "bg-rose-50 text-rose-800", badgeText: "text-rose-700", border: "border-rose-200" }
];

export const CRITERIA_CATEGORIES: Category[] = [
  {
    id: "tech",
    categoryNumber: 1,
    name: "CATEGORY 1: TECHNICAL CAPABILITY (100 POINTS TOTAL)",
    shortName: "Technical Capability",
    maxMarks: 95,
    icon: "Code2",
    criteria: [
      {
        id: "c1_1",
        name: "Project Execution",
        maxMarks: 25,
        monitor: "Converts requirements/design into working project; completes features correctly.",
        guidance: "• 22–25 (86–100%): Exceptional / Lead — Mastery level; guides others and improves standards.\n• 19–21 (76–85%): Strong Independent — Delivers clean work autonomously; highly reliable.\n• 16–18 (61–75%): Autonomous Standard — Performs routine tasks independently; occasional check ins.\n• 11–15 (41–60%): Basic Ability — Handles basic tasks; needs help on minor complexities.\n• 6–10 (21–40%): Heavy Guidance — Requires constant step-by-step supervision.\n• 0–5 (0–20%): Unsatisfactory — Cannot perform task; lacks baseline understanding.",
        fallback: "2–4 hr mini project: “Build landing page from design (desktop + mobile).” Evaluate completion, correctness, independence."
      },
      {
        id: "c1_2",
        name: "Code Quality",
        maxMarks: 15,
        monitor: "Clean structure, proper naming, reusable components, readable code, avoids bloat.",
        guidance: "• 13–15 (86–100%): Exceptional / Lead — Mastery level; guides others and improves standards.\n• 12 (76–85%): Strong Independent — Delivers clean work autonomously; highly reliable.\n• 10–11 (61–75%): Autonomous Standard — Performs routine tasks independently; occasional check ins.\n• 7–9 (41–60%): Basic Ability — Handles basic tasks; needs help on minor complexities.\n• 4–6 (21–40%): Heavy Guidance — Requires constant step-by-step supervision.\n• 0–3 (0–20%): Unsatisfactory — Cannot perform task; lacks baseline understanding.",
        fallback: "Provide messy React repo: “Refactor code and explain what you changed and why.”"
      },
      {
        id: "c1_3",
        name: "Technology Knowledge",
        maxMarks: 15,
        monitor: "Uses claimed tech proficiently rather than just listing buzzwords.",
        guidance: "• 13–15 (86–100%): Exceptional / Lead — Mastery level; guides others and improves standards.\n• 12 (76–85%): Strong Independent — Delivers clean work autonomously; highly reliable.\n• 10–11 (61–75%): Autonomous Standard — Performs routine tasks independently; occasional check ins.\n• 7–9 (41–60%): Basic Ability — Handles basic tasks; needs help on minor complexities.\n• 4–6 (21–40%): Heavy Guidance — Requires constant step-by-step supervision.\n• 0–3 (0–20%): Unsatisfactory — Cannot perform task; lacks baseline understanding.",
        fallback: "10–15 min task: “Create React component fetching data with loading/error states.” Explain live."
      },
      {
        id: "c1_4",
        name: "Git / GitHub",
        maxMarks: 10,
        monitor: "Meaningful commits, branch workflow, PR/push, repo organization, README quality.",
        guidance: "• 9–10 (86–100%): Exceptional / Lead — Mastery level; guides others and improves standards.\n• 8 (76–85%): Strong Independent — Delivers clean work autonomously; highly reliable.\n• 6–7 (61–75%): Autonomous Standard — Performs routine tasks independently; occasional check ins.\n• 5–6 (41–60%): Basic Ability — Handles basic tasks; needs help on minor complexities.\n• 3–4 (21–40%): Heavy Guidance — Requires constant step-by-step supervision.\n• 0–2 (0–20%): Unsatisfactory — Cannot perform task; lacks baseline understanding.",
        fallback: "Git exercise: Clone ➔ create branch ➔ implement change ➔ commit ➔ push ➔ explain workflow."
      },
      {
        id: "c1_5",
        name: "Responsive UI",
        maxMarks: 10,
        monitor: "Desktop/tablet/mobile layout accuracy, spacing, typography, handling overflow.",
        guidance: "• 9–10 (86–100%): Exceptional / Lead — Mastery level; guides others and improves standards.\n• 8 (76–85%): Strong Independent — Delivers clean work autonomously; highly reliable.\n• 6–7 (61–75%): Autonomous Standard — Performs routine tasks independently; occasional check ins.\n• 5–6 (41–60%): Basic Ability — Handles basic tasks; needs help on minor complexities.\n• 3–4 (21–40%): Heavy Guidance — Requires constant step-by-step supervision.\n• 0–2 (0–20%): Unsatisfactory — Cannot perform task; lacks baseline understanding.",
        fallback: "Recreate provided screenshot at desktop and mobile widths. Test across viewports."
      },
      {
        id: "c1_6",
        name: "Debugging / Execution",
        maxMarks: 10,
        monitor: "Identifies technical errors proactively rather than waiting for external assistance.",
        guidance: "• 9–10 (86–100%): Exceptional / Lead — Mastery level; guides others and improves standards.\n• 8 (76–85%): Strong Independent — Delivers clean work autonomously; highly reliable.\n• 6–7 (61–75%): Autonomous Standard — Performs routine tasks independently; occasional check ins.\n• 5–6 (41–60%): Basic Ability — Handles basic tasks; needs help on minor complexities.\n• 3–4 (21–40%): Heavy Guidance — Requires constant step-by-step supervision.\n• 0–2 (0–20%): Unsatisfactory — Cannot perform task; lacks baseline understanding.",
        fallback: "Provide deliberately broken website with 5–7 active bugs: “Find and fix all problems.”"
      },
      {
        id: "c1_7",
        name: "Deployment",
        maxMarks: 5,
        monitor: "Deploys app, configures environment variables, connects hosting/domain, verifies production.",
        guidance: "• 5 (86–100%): Exceptional / Lead — Mastery level; guides others and improves standards.\n• 4 (76–85%): Strong Independent — Delivers clean work autonomously; highly reliable.\n• 3 (61–75%): Autonomous Standard — Performs routine tasks independently; occasional check ins.\n• 2 (41–60%): Basic Ability — Handles basic tasks; needs help on minor complexities.\n• 1 (21–40%): Heavy Guidance — Requires constant step-by-step supervision.\n• 0 (0–20%): Unsatisfactory — Cannot perform task; lacks baseline understanding.",
        fallback: "Simple app: “Deploy to target platform, configure env variables, deliver live URL.”"
      },
      {
        id: "c1_8",
        name: "Learning New Tech",
        maxMarks: 5,
        monitor: "Quickly grasps unfamiliar tools/frameworks and applies them effectively.",
        guidance: "• 5 (86–100%): Exceptional / Lead — Mastery level; guides others and improves standards.\n• 4 (76–85%): Strong Independent — Delivers clean work autonomously; highly reliable.\n• 3 (61–75%): Autonomous Standard — Performs routine tasks independently; occasional check ins.\n• 2 (41–60%): Basic Ability — Handles basic tasks; needs help on minor complexities.\n• 1 (21–40%): Heavy Guidance — Requires constant step-by-step supervision.\n• 0 (0–20%): Unsatisfactory — Cannot perform task; lacks baseline understanding.",
        fallback: "Give unfamiliar tool: “You have 60–90 min. Learn enough to build this feature.”"
      }
    ]
  },
  {
    id: "prob",
    categoryNumber: 2,
    name: "CATEGORY 2: PROBLEM SOLVING (100 POINTS TOTAL)",
    shortName: "Problem Solving",
    maxMarks: 100,
    icon: "Cpu",
    criteria: [
      {
        id: "c2_1",
        name: "Debugging Root Cause",
        maxMarks: 25,
        monitor: "Identifies systemic root cause instead of making random code edits.",
        guidance: "• 22–25 (86–100%): Exceptional / Lead — Mastery level; guides others and improves standards.\n• 19–21 (76–85%): Strong Independent — Delivers clean work autonomously; highly reliable.\n• 16–18 (61–75%): Autonomous Standard — Performs routine tasks independently; occasional check ins.\n• 11–15 (41–60%): Basic Ability — Handles basic tasks; needs help on minor complexities.\n• 6–10 (21–40%): Heavy Guidance — Requires constant step-by-step supervision.\n• 0–5 (0–20%): Unsatisfactory — Cannot perform task; lacks baseline understanding.",
        fallback: "Provide broken auth: “The login system is failing. Identify root cause and fix it.”"
      },
      {
        id: "c2_2",
        name: "Requirement Understanding",
        maxMarks: 15,
        monitor: "Grasps true client needs; proactively flags missing or contradictory information.",
        guidance: "• 13–15 (86–100%): Exceptional / Lead — Mastery level; guides others and improves standards.\n• 12 (76–85%): Strong Independent — Delivers clean work autonomously; highly reliable.\n• 10–11 (61–75%): Autonomous Standard — Performs routine tasks independently; occasional check ins.\n• 7–9 (41–60%): Basic Ability — Handles basic tasks; needs help on minor complexities.\n• 4–6 (21–40%): Heavy Guidance — Requires constant step-by-step supervision.\n• 0–3 (0–20%): Unsatisfactory — Cannot perform task; lacks baseline understanding.",
        fallback: "Provide brief with intentional ambiguity: “List all clarification questions for client.”"
      },
      {
        id: "c2_3",
        name: "Independent Problem Solving",
        maxMarks: 20,
        monitor: "Researches and investigates independently before escalating issues to senior staff.",
        guidance: "• 18–20 (86–100%): Exceptional / Lead — Mastery level; guides others and improves standards.\n• 16–17 (76–85%): Strong Independent — Delivers clean work autonomously; highly reliable.\n• 13–15 (61–75%): Autonomous Standard — Performs routine tasks independently; occasional check ins.\n• 9–12 (41–60%): Basic Ability — Handles basic tasks; needs help on minor complexities.\n• 5–8 (21–40%): Heavy Guidance — Requires constant step-by-step supervision.\n• 0–4 (0–20%): Unsatisfactory — Cannot perform task; lacks baseline understanding.",
        fallback: "Unfamiliar technical bug with docs available: “Solve without direct human assistance.”"
      },
      {
        id: "c2_4",
        name: "Research & Investigation",
        maxMarks: 10,
        monitor: "Finds reliable sources and compares technical trade-offs across solutions.",
        guidance: "• 9–10 (86–100%): Exceptional / Lead — Mastery level; guides others and improves standards.\n• 8 (76–85%): Strong Independent — Delivers clean work autonomously; highly reliable.\n• 6–7 (61–75%): Autonomous Standard — Performs routine tasks independently; occasional check ins.\n• 5–6 (41–60%): Basic Ability — Handles basic tasks; needs help on minor complexities.\n• 3–4 (21–40%): Heavy Guidance — Requires constant step-by-step supervision.\n• 0–2 (0–20%): Unsatisfactory — Cannot perform task; lacks baseline understanding.",
        fallback: "“Research 3 approaches to implement feature X. Recommend one and justify choice.”"
      },
      {
        id: "c2_5",
        name: "Solution Quality",
        maxMarks: 15,
        monitor: "Delivers functional, maintainable code without creating technical debt.",
        guidance: "• 13–15 (86–100%): Exceptional / Lead — Mastery level; guides others and improves standards.\n• 12 (76–85%): Strong Independent — Delivers clean work autonomously; highly reliable.\n• 10–11 (61–75%): Autonomous Standard — Performs routine tasks independently; occasional check ins.\n• 7–9 (41–60%): Basic Ability — Handles basic tasks; needs help on minor complexities.\n• 4–6 (21–40%): Heavy Guidance — Requires constant step-by-step supervision.\n• 0–3 (0–20%): Unsatisfactory — Cannot perform task; lacks baseline understanding.",
        fallback: "Present 2–3 architectural options: “Choose best approach, justify, and implement.”"
      },
      {
        id: "c2_6",
        name: "Handling Unexpected Problems",
        maxMarks: 10,
        monitor: "Maintains composure and adapts when scope, tools, or environments shift.",
        guidance: "• 9–10 (86–100%): Exceptional / Lead — Mastery level; guides others and improves standards.\n• 8 (76–85%): Strong Independent — Delivers clean work autonomously; highly reliable.\n• 6–7 (61–75%): Autonomous Standard — Performs routine tasks independently; occasional check ins.\n• 5–6 (41–60%): Basic Ability — Handles basic tasks; needs help on minor complexities.\n• 3–4 (21–40%): Heavy Guidance — Requires constant step-by-step supervision.\n• 0–2 (0–20%): Unsatisfactory — Cannot perform task; lacks baseline understanding.",
        fallback: "Introduce live mid-test change: “Client now requires mobile support. Adapt solution.”"
      },
      {
        id: "c2_7",
        name: "Learning From Mistakes",
        maxMarks: 5,
        monitor: "Recognizes mistakes, understands underlying reasons, prevents recurrence.",
        guidance: "• 5 (86–100%): Exceptional / Lead — Mastery level; guides others and improves standards.\n• 4 (76–85%): Strong Independent — Delivers clean work autonomously; highly reliable.\n• 3 (61–75%): Autonomous Standard — Performs routine tasks independently; occasional check ins.\n• 2 (41–60%): Basic Ability — Handles basic tasks; needs help on minor complexities.\n• 1 (21–40%): Heavy Guidance — Requires constant step-by-step supervision.\n• 0 (0–20%): Unsatisfactory — Cannot perform task; lacks baseline understanding.",
        fallback: "Review past error: “Explain what caused this defect and how you will prevent it next time.”"
      }
    ]
  },
  {
    id: "collab",
    categoryNumber: 3,
    name: "CATEGORY 3: PROFESSIONAL COLLABORATION (100 POINTS TOTAL)",
    shortName: "Professional Collaboration",
    maxMarks: 100,
    icon: "Users",
    criteria: [
      {
        id: "c3_1",
        name: "Teamwork",
        maxMarks: 20,
        monitor: "Aligns with team goals, shares knowledge, avoids creating interpersonal friction.",
        guidance: "• 18–20 (86–100%): Exceptional / Lead — Mastery level; guides others and improves standards.\n• 16–17 (76–85%): Strong Independent — Delivers clean work autonomously; highly reliable.\n• 13–15 (61–75%): Autonomous Standard — Performs routine tasks independently; occasional check ins.\n• 9–12 (41–60%): Basic Ability — Handles basic tasks; needs help on minor complexities.\n• 5–8 (21–40%): Heavy Guidance — Requires constant step-by-step supervision.\n• 0–4 (0–20%): Unsatisfactory — Cannot perform task; lacks baseline understanding.",
        fallback: "Place candidate in a 2–3 person mini project with shared tight deadline; observe dynamics."
      },
      {
        id: "c3_2",
        name: "Git / Team Workflow",
        maxMarks: 15,
        monitor: "Collaborates smoothly in shared repos, resolves merge conflicts, follows PR rules.",
        guidance: "• 13–15 (86–100%): Exceptional / Lead — Mastery level; guides others and improves standards.\n• 12 (76–85%): Strong Independent — Delivers clean work autonomously; highly reliable.\n• 10–11 (61–75%): Autonomous Standard — Performs routine tasks independently; occasional check ins.\n• 7–9 (41–60%): Basic Ability — Handles basic tasks; needs help on minor complexities.\n• 4–6 (21–40%): Heavy Guidance — Requires constant step-by-step supervision.\n• 0–3 (0–20%): Unsatisfactory — Cannot perform task; lacks baseline understanding.",
        fallback: "Assign 2–3 developers to single repo: complete distinct features using branches/PRs."
      },
      {
        id: "c3_3",
        name: "Responsibility",
        maxMarks: 15,
        monitor: "Takes full ownership of assigned tasks without shifting blame for failures.",
        guidance: "• 13–15 (86–100%): Exceptional / Lead — Mastery level; guides others and improves standards.\n• 12 (76–85%): Strong Independent — Delivers clean work autonomously; highly reliable.\n• 10–11 (61–75%): Autonomous Standard — Performs routine tasks independently; occasional check ins.\n• 7–9 (41–60%): Basic Ability — Handles basic tasks; needs help on minor complexities.\n• 4–6 (21–40%): Heavy Guidance — Requires constant step-by-step supervision.\n• 0–3 (0–20%): Unsatisfactory — Cannot perform task; lacks baseline understanding.",
        fallback: "Assign task with strict deadline: observe execution, proactive blocker updates, ownership."
      },
      {
        id: "c3_4",
        name: "Working With Designers",
        maxMarks: 10,
        monitor: "Translates design files accurately and communicates technical constraints professionally.",
        guidance: "• 9–10 (86–100%): Exceptional / Lead — Mastery level; guides others and improves standards.\n• 8 (76–85%): Strong Independent — Delivers clean work autonomously; highly reliable.\n• 6–7 (61–75%): Autonomous Standard — Performs routine tasks independently; occasional check ins.\n• 5–6 (41–60%): Basic Ability — Handles basic tasks; needs help on minor complexities.\n• 3–4 (21–40%): Heavy Guidance — Requires constant step-by-step supervision.\n• 0–2 (0–20%): Unsatisfactory — Cannot perform task; lacks baseline understanding.",
        fallback: "Provide Figma file: “Review pre development. List technical concerns and design questions.”"
      },
      {
        id: "c3_5",
        name: "Working With Developers",
        maxMarks: 10,
        monitor: "Coordinates API contracts and dependencies clearly with peer engineers.",
        guidance: "• 9–10 (86–100%): Exceptional / Lead — Mastery level; guides others and improves standards.\n• 8 (76–85%): Strong Independent — Delivers clean work autonomously; highly reliable.\n• 6–7 (61–75%): Autonomous Standard — Performs routine tasks independently; occasional check ins.\n• 5–6 (41–60%): Basic Ability — Handles basic tasks; needs help on minor complexities.\n• 3–4 (21–40%): Heavy Guidance — Requires constant step-by-step supervision.\n• 0–2 (0–20%): Unsatisfactory — Cannot perform task; lacks baseline understanding.",
        fallback: "Assign feature dependent on peer API: observe contract negotiation and coordination."
      },
      {
        id: "c3_6",
        name: "Receiving Feedback",
        maxMarks: 10,
        monitor: "Accepts code reviews constructively without defensiveness and applies fixes.",
        guidance: "• 9–10 (86–100%): Exceptional / Lead — Mastery level; guides others and improves standards.\n• 8 (76–85%): Strong Independent — Delivers clean work autonomously; highly reliable.\n• 6–7 (61–75%): Autonomous Standard — Performs routine tasks independently; occasional check ins.\n• 5–6 (41–60%): Basic Ability — Handles basic tasks; needs help on minor complexities.\n• 3–4 (21–40%): Heavy Guidance — Requires constant step-by-step supervision.\n• 0–2 (0–20%): Unsatisfactory — Cannot perform task; lacks baseline understanding.",
        fallback: "Perform code review with 5 required corrections; monitor attitude and implementation."
      },
      {
        id: "c3_7",
        name: "Helping Team Members",
        maxMarks: 10,
        monitor: "Guides peers effectively by explaining concepts rather than doing work for them.",
        guidance: "• 9–10 (86–100%): Exceptional / Lead — Mastery level; guides others and improves standards.\n• 8 (76–85%): Strong Independent — Delivers clean work autonomously; highly reliable.\n• 6–7 (61–75%): Autonomous Standard — Performs routine tasks independently; occasional check ins.\n• 5–6 (41–60%): Basic Ability — Handles basic tasks; needs help on minor complexities.\n• 3–4 (21–40%): Heavy Guidance — Requires constant step-by-step supervision.\n• 0–2 (0–20%): Unsatisfactory — Cannot perform task; lacks baseline understanding.",
        fallback: "Allow candidate to assist struggling peer: evaluate if they mentor or over-write code."
      },
      {
        id: "c3_8",
        name: "Conflict Handling",
        maxMarks: 10,
        monitor: "Resolves technical or priority disagreements constructively and professionally.",
        guidance: "• 9–10 (86–100%): Exceptional / Lead — Mastery level; guides others and improves standards.\n• 8 (76–85%): Strong Independent — Delivers clean work autonomously; highly reliable.\n• 6–7 (61–75%): Autonomous Standard — Performs routine tasks independently; occasional check ins.\n• 5–6 (41–60%): Basic Ability — Handles basic tasks; needs help on minor complexities.\n• 3–4 (21–40%): Heavy Guidance — Requires constant step-by-step supervision.\n• 0–2 (0–20%): Unsatisfactory — Cannot perform task; lacks baseline understanding.",
        fallback: "Scenario: “Designer demands X, engineer claims X impossible, deadline tomorrow. Resolve.”"
      }
    ]
  },
  {
    id: "comm",
    categoryNumber: 4,
    name: "CATEGORY 4: COMMUNICATION & CLIENT READINESS (100 POINTS TOTAL)",
    shortName: "Communication & Client Readiness",
    maxMarks: 100,
    icon: "MessageSquare",
    criteria: [
      {
        id: "c4_1",
        name: "Requirement Clarification",
        maxMarks: 20,
        monitor: "Listens actively, asks targeted questions, confirms requirements before building.",
        guidance: "• 18–20 (86–100%): Exceptional / Lead — Mastery level; guides others and improves standards.\n• 16–17 (76–85%): Strong Independent — Delivers clean work autonomously; highly reliable.\n• 13–15 (61–75%): Autonomous Standard — Performs routine tasks independently; occasional check ins.\n• 9–12 (41–60%): Basic Ability — Handles basic tasks; needs help on minor complexities.\n• 5–8 (21–40%): Heavy Guidance — Requires constant step-by-step supervision.\n• 0–4 (0–20%): Unsatisfactory — Cannot perform task; lacks baseline understanding.",
        fallback: "Mock client brief call: ask candidate to compile comprehensive technical discovery list."
      },
      {
        id: "c4_2",
        name: "Client Communication",
        maxMarks: 20,
        monitor: "Demonstrates confidence, clarity, poise, and professional decorum on client calls.",
        guidance: "• 18–20 (86–100%): Exceptional / Lead — Mastery level; guides others and improves standards.\n• 16–17 (76–85%): Strong Independent — Delivers clean work autonomously; highly reliable.\n• 13–15 (61–75%): Autonomous Standard — Performs routine tasks independently; occasional check ins.\n• 9–12 (41–60%): Basic Ability — Handles basic tasks; needs help on minor complexities.\n• 5–8 (21–40%): Heavy Guidance — Requires constant step-by-step supervision.\n• 0–4 (0–20%): Unsatisfactory — Cannot perform task; lacks baseline understanding.",
        fallback: "10-min mock call: Assessor acts as challenging client introducing scope creep and questions."
      },
      {
        id: "c4_3",
        name: "Professional Messaging",
        maxMarks: 15,
        monitor: "Writes clear, structured, respectful, and actionable text updates (Slack/Email).",
        guidance: "• 13–15 (86–100%): Exceptional / Lead — Mastery level; guides others and improves standards.\n• 12 (76–85%): Strong Independent — Delivers clean work autonomously; highly reliable.\n• 10–11 (61–75%): Autonomous Standard — Performs routine tasks independently; occasional check ins.\n• 7–9 (41–60%): Basic Ability — Handles basic tasks; needs help on minor complexities.\n• 4–6 (21–40%): Heavy Guidance — Requires constant step-by-step supervision.\n• 0–3 (0–20%): Unsatisfactory — Cannot perform task; lacks baseline understanding.",
        fallback: "Provide scenarios: draft updates for delay, requirement check, completion, and blocker."
      },
      {
        id: "c4_4",
        name: "Technical Explanation",
        maxMarks: 15,
        monitor: "Translates complex technical concepts into accessible business language.",
        guidance: "• 13–15 (86–100%): Exceptional / Lead — Mastery level; guides others and improves standards.\n• 12 (76–85%): Strong Independent — Delivers clean work autonomously; highly reliable.\n• 10–11 (61–75%): Autonomous Standard — Performs routine tasks independently; occasional check ins.\n• 7–9 (41–60%): Basic Ability — Handles basic tasks; needs help on minor complexities.\n• 4–6 (21–40%): Heavy Guidance — Requires constant step-by-step supervision.\n• 0–3 (0–20%): Unsatisfactory — Cannot perform task; lacks baseline understanding.",
        fallback: "Task: “Explain Firebase Authentication and security rules to a non-technical client.”"
      },
      {
        id: "c4_5",
        name: "Project Updates",
        maxMarks: 10,
        monitor: "Delivers informative, structured progress reports instead of vague assurances.",
        guidance: "• 9–10 (86–100%): Exceptional / Lead — Mastery level; guides others and improves standards.\n• 8 (76–85%): Strong Independent — Delivers clean work autonomously; highly reliable.\n• 6–7 (61–75%): Autonomous Standard — Performs routine tasks independently; occasional check ins.\n• 5–6 (41–60%): Basic Ability — Handles basic tasks; needs help on minor complexities.\n• 3–4 (21–40%): Heavy Guidance — Requires constant step-by-step supervision.\n• 0–2 (0–20%): Unsatisfactory — Cannot perform task; lacks baseline understanding.",
        fallback: "Simulated 3-day project: submit end-of-day progress logs for Day 1, Day 2, and Day 3."
      },
      {
        id: "c4_6",
        name: "Presentation / Demo",
        maxMarks: 10,
        monitor: "Presents finished features clearly, walking through logic and user impact.",
        guidance: "• 9–10 (86–100%): Exceptional / Lead — Mastery level; guides others and improves standards.\n• 8 (76–85%): Strong Independent — Delivers clean work autonomously; highly reliable.\n• 6–7 (61–75%): Autonomous Standard — Performs routine tasks independently; occasional check ins.\n• 5–6 (41–60%): Basic Ability — Handles basic tasks; needs help on minor complexities.\n• 3–4 (21–40%): Heavy Guidance — Requires constant step-by-step supervision.\n• 0–2 (0–20%): Unsatisfactory — Cannot perform task; lacks baseline understanding.",
        fallback: "Deliver 5-minute client-style demonstration of a completed mini project."
      },
      {
        id: "c4_7",
        name: "Handling Questions",
        maxMarks: 10,
        monitor: "Responds to unexpected client inquiries calmly, accurately, and without defensiveness.",
        guidance: "• 9–10 (86–100%): Exceptional / Lead — Mastery level; guides others and improves standards.\n• 8 (76–85%): Strong Independent — Delivers clean work autonomously; highly reliable.\n• 6–7 (61–75%): Autonomous Standard — Performs routine tasks independently; occasional check ins.\n• 5–6 (41–60%): Basic Ability — Handles basic tasks; needs help on minor complexities.\n• 3–4 (21–40%): Heavy Guidance — Requires constant step-by-step supervision.\n• 0–2 (0–20%): Unsatisfactory — Cannot perform task; lacks baseline understanding.",
        fallback: "Post-demo Q&A: fire 5 unexpected technical/business questions and evaluate poise."
      }
    ]
  },
  {
    id: "rel",
    categoryNumber: 5,
    name: "CATEGORY 5: PROFESSIONAL RELIABILITY (100 POINTS TOTAL)",
    shortName: "Professional Reliability",
    maxMarks: 100,
    icon: "ShieldCheck",
    criteria: [
      {
        id: "c5_1",
        name: "Deadline Performance",
        maxMarks: 25,
        monitor: "Consistently delivers assigned tasks on or before agreed deadlines.",
        guidance: "• 22–25 (86–100%): Exceptional / Lead — Mastery level; guides others and improves standards.\n• 19–21 (76–85%): Strong Independent — Delivers clean work autonomously; highly reliable.\n• 16–18 (61–75%): Autonomous Standard — Performs routine tasks independently; occasional check ins.\n• 11–15 (41–60%): Basic Ability — Handles basic tasks; needs help on minor complexities.\n• 6–10 (21–40%): Heavy Guidance — Requires constant step-by-step supervision.\n• 0–5 (0–20%): Unsatisfactory — Cannot perform task; lacks baseline understanding.",
        fallback: "Assign timed task with hard submission deadline. Track exact delivery timestamps."
      },
      {
        id: "c5_2",
        name: "Responsiveness",
        maxMarks: 15,
        monitor: "Acknowledges critical communications promptly; remains reachable during hours.",
        guidance: "• 13–15 (86–100%): Exceptional / Lead — Mastery level; guides others and improves standards.\n• 12 (76–85%): Strong Independent — Delivers clean work autonomously; highly reliable.\n• 10–11 (61–75%): Autonomous Standard — Performs routine tasks independently; occasional check ins.\n• 7–9 (41–60%): Basic Ability — Handles basic tasks; needs help on minor complexities.\n• 4–6 (21–40%): Heavy Guidance — Requires constant step-by-step supervision.\n• 0–3 (0–20%): Unsatisfactory — Cannot perform task; lacks baseline understanding.",
        fallback: "Issue async communication prompts across test window; log response latencies."
      },
      {
        id: "c5_3",
        name: "Consistent Updates",
        maxMarks: 15,
        monitor: "Provides regular progress reports automatically without management chasing.",
        guidance: "• 13–15 (86–100%): Exceptional / Lead — Mastery level; guides others and improves standards.\n• 12 (76–85%): Strong Independent — Delivers clean work autonomously; highly reliable.\n• 10–11 (61–75%): Autonomous Standard — Performs routine tasks independently; occasional check ins.\n• 7–9 (41–60%): Basic Ability — Handles basic tasks; needs help on minor complexities.\n• 4–6 (21–40%): Heavy Guidance — Requires constant step-by-step supervision.\n• 0–3 (0–20%): Unsatisfactory — Cannot perform task; lacks baseline understanding.",
        fallback: "3-day mini project: verify whether daily status logs arrive automatically."
      },
      {
        id: "c5_4",
        name: "Ownership & Follow through",
        maxMarks: 15,
        monitor: "Takes full responsibility for execution; resolves open issues proactively.",
        guidance: "• 13–15 (86–100%): Exceptional / Lead — Mastery level; guides others and improves standards.\n• 12 (76–85%): Strong Independent — Delivers clean work autonomously; highly reliable.\n• 10–11 (61–75%): Autonomous Standard — Performs routine tasks independently; occasional check ins.\n• 7–9 (41–60%): Basic Ability — Handles basic tasks; needs help on minor complexities.\n• 4–6 (21–40%): Heavy Guidance — Requires constant step-by-step supervision.\n• 0–3 (0–20%): Unsatisfactory — Cannot perform task; lacks baseline understanding.",
        fallback: "Provide incomplete task description; evaluate if student clarifies and closes independently."
      },
      {
        id: "c5_5",
        name: "Process Compliance",
        maxMarks: 10,
        monitor: "Follows Git conventions, QC checklists, naming formats, and submission steps.",
        guidance: "• 9–10 (86–100%): Exceptional / Lead — Mastery level; guides others and improves standards.\n• 8 (76–85%): Strong Independent — Delivers clean work autonomously; highly reliable.\n• 6–7 (61–75%): Autonomous Standard — Performs routine tasks independently; occasional check ins.\n• 5–6 (41–60%): Basic Ability — Handles basic tasks; needs help on minor complexities.\n• 3–4 (21–40%): Heavy Guidance — Requires constant step-by-step supervision.\n• 0–2 (0–20%): Unsatisfactory — Cannot perform task; lacks baseline understanding.",
        fallback: "Audit submission against Intellex Workflow Standards across 10 compliance points."
      },
      {
        id: "c5_6",
        name: "QC / Correction Discipline",
        maxMarks: 10,
        monitor: "Eliminates sloppy errors; addresses QC feedback thoroughly in second submission.",
        guidance: "• 9–10 (86–100%): Exceptional / Lead — Mastery level; guides others and improves standards.\n• 8 (76–85%): Strong Independent — Delivers clean work autonomously; highly reliable.\n• 6–7 (61–75%): Autonomous Standard — Performs routine tasks independently; occasional check ins.\n• 5–6 (41–60%): Basic Ability — Handles basic tasks; needs help on minor complexities.\n• 3–4 (21–40%): Heavy Guidance — Requires constant step-by-step supervision.\n• 0–2 (0–20%): Unsatisfactory — Cannot perform task; lacks baseline understanding.",
        fallback: "Track number and recurrence rate of defects across initial QC and resubmission cycles."
      },
      {
        id: "c5_7",
        name: "Commitment & Attendance",
        maxMarks: 5,
        monitor: "Attends scheduled sessions reliably; provides advance notice if absent.",
        guidance: "• 5 (86–100%): Exceptional / Lead — Mastery level; guides others and improves standards.\n• 4 (76–85%): Strong Independent — Delivers clean work autonomously; highly reliable.\n• 3 (61–75%): Autonomous Standard — Performs routine tasks independently; occasional check ins.\n• 2 (41–60%): Basic Ability — Handles basic tasks; needs help on minor complexities.\n• 1 (21–40%): Heavy Guidance — Requires constant step-by-step supervision.\n• 0 (0–20%): Unsatisfactory — Cannot perform task; lacks baseline understanding.",
        fallback: "Track punctuality and attendance across 5 mandatory operational checkpoints."
      },
      {
        id: "c5_8",
        name: "Professional Behavior",
        maxMarks: 5,
        monitor: "Exhibits honesty, accountability, respect, and ethical conduct under pressure.",
        guidance: "• 5 (86–100%): Exceptional / Lead — Mastery level; guides others and improves standards.\n• 4 (76–85%): Strong Independent — Delivers clean work autonomously; highly reliable.\n• 3 (61–75%): Autonomous Standard — Performs routine tasks independently; occasional check ins.\n• 2 (41–60%): Basic Ability — Handles basic tasks; needs help on minor complexities.\n• 1 (21–40%): Heavy Guidance — Requires constant step-by-step supervision.\n• 0 (0–20%): Unsatisfactory — Cannot perform task; lacks baseline understanding.",
        fallback: "Scenario: “A mistake on your end caused client outage. How do you communicate this?”"
      }
    ]
  }
];
