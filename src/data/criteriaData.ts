import { Category, ScoringBand } from "@/types/assessment";

export const TOTAL_POSSIBLE_MARKS = 495;
export const TOTAL_CRITERIA_COUNT = 38;

export const SCORING_LEVELS: ScoringBand[] = [
  { min: 86, max: 100, label: "Exceptional/Lead", badgeBg: "bg-emerald-50 text-emerald-800", badgeText: "text-emerald-700", border: "border-emerald-200" },
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
    name: "Category 1: Technical Capability",
    shortName: "Technical Capability",
    maxMarks: 95,
    icon: "Code2",
    criteria: [
      {
        id: "c1_1",
        name: "Project Execution",
        maxMarks: 25,
        monitor: "Ability to take requirements and deliver a functioning feature/project from start to finish; architecture planning, component modularity, state management, and edge-case handling.",
        guidance: "• 22–25 (86–100%): Flawless end-to-end delivery; robust modular architecture, zero regressions, anticipates edge cases proactively.\n• 19–21 (76–85%): Delivers fully functioning project with minimal supervisor intervention; clean structure, minor polish needed.\n• 15–18 (61–75%): Meets standard acceptance criteria; core features work, requires occasional guidance on architectural structuring.\n• 10–14 (41–60%): Basic execution; partial feature delivery with some functional bugs or unhandled edge cases.\n• 5–9 (21–40%): Struggles to connect components or complete workflow without step-by-step guidance.\n• 0–4 (0–20%): Unable to deliver runnable project or fundamental features broken.",
        fallback: "Assign a timed 2-hour mini-project: Build an end-to-end interactive data table with search, pagination, and persistent state from a mock API response."
      },
      {
        id: "c1_2",
        name: "Code Quality",
        maxMarks: 15,
        monitor: "Adherence to clean code principles, DRY (Don't Repeat Yourself), single responsibility principle, naming conventions, linting/formatting rules, and semantic code organization.",
        guidance: "• 13–15 (86–100%): Exemplary readability, modular functions, strict TypeScript/typing or standard lint compliance, comprehensive self-documenting code.\n• 11–12 (76–85%): High code standards, consistent indentation and naming, sensible modularity with very few redundant patterns.\n• 9–10 (61–75%): Acceptable code quality; readable and follows conventions, but minor instances of repetitive logic or overly large functions.\n• 6–8 (41–60%): Inconsistent naming, occasional duplicate code, functions doing too many things.\n• 3–5 (21–40%): Messy structure, poor formatting, heavily coupled code requiring significant refactoring.\n• 0–2 (0–20%): Spaghetti code, unreadable variable names, syntax/linting ignored completely.",
        fallback: "Code review and refactoring assignment: Provide a 150-line messy spaghetti function; candidate must refactor it into clean, modular, typed subroutines with proper naming within 45 minutes."
      },
      {
        id: "c1_3",
        name: "Technology Knowledge",
        maxMarks: 15,
        monitor: "Understanding of the chosen tech stack, framework lifecycle, core language nuances (e.g. JavaScript closures, async/await, DOM, CSS box model, React/Vue lifecycle hooks), and library APIs.",
        guidance: "• 13–15 (86–100%): Deep foundational grasp; accurately explains underlying mechanics (event loop, rendering pipeline, memory management) and best practices.\n• 11–12 (76–85%): Strong working knowledge; effectively leverages ecosystem libraries and explains technical choices rationally.\n• 9–10 (61–75%): Competent usage of standard framework patterns, but relies on boilerplate for complex mechanisms.\n• 6–8 (41–60%): Surface-level familiarity; copies solutions without full comprehension of how the underlying APIs function.\n• 3–5 (21–40%): Weak foundational understanding; confused about async behavior, state flow, or fundamental syntax.\n• 0–2 (0–20%): Lacks basic comprehension of core language features and framework primitives.",
        fallback: "Technical oral defense & concept questionnaire: 10 targeted concept questions covering async/await, closures, virtual DOM vs real DOM, CSS specificity, and browser rendering lifecycle."
      },
      {
        id: "c1_4",
        name: "Git/GitHub",
        maxMarks: 10,
        monitor: "Version control hygiene, branch naming, atomic and descriptive commit messages, creating clean PRs, resolving merge conflicts, and maintaining clean git history.",
        guidance: "• 9–10 (86–100%): Flawless Git habits; conventional commit messages, clean rebase/merge practices, detailed pull request descriptions with context.\n• 8 (76–85%): Consistent commits, clear branch workflow, handles conflicts independently with ease.\n• 6–7 (61–75%): Uses standard branch and commit workflow, commits are reasonably descriptive, occasional squash or conflict help needed.\n• 4–5 (41–60%): Large infrequent commits (\"fixes\", \"updates\"), occasional accidental commits to main branch.\n• 2–3 (21–40%): Needs constant supervision with branching, regularly loses work or mishandles merge conflicts.\n• 0–1 (0–20%): Unable to perform basic clone, branch, commit, push operations without failure.",
        fallback: "Git simulation drill: Initialize repo, branch from feature, rebase onto updated main, resolve a deliberate merge conflict, and submit a formatted PR."
      },
      {
        id: "c1_5",
        name: "Responsive UI",
        maxMarks: 10,
        monitor: "Fluid layout execution across mobile, tablet, and desktop breakpoints; flexible grids/flexbox, touch target accessibility, avoiding horizontal overflow, and typography scaling.",
        guidance: "• 9–10 (86–100%): Pixel-perfect across all viewport widths (320px to 4K); zero layout shifts or overflow bugs; touch-first mobile UX.\n• 8 (76–85%): Well-adapted mobile and desktop experience; minor spacing adjustments needed on intermediate tablet sizes.\n• 6–7 (61–75%): Functional responsive design; works on standard mobile and desktop, but minor horizontal scroll or awkward line wrapping on small screens.\n• 4–5 (41–60%): Desktop-first mindset; mobile layouts appear squished, truncated, or break on small viewports.\n• 2–3 (21–40%): Severe layout breakage on mobile devices; overlapping text, unclickable elements.\n• 0–1 (0–20%): Non-responsive fixed-width design; unusable on mobile screens.",
        fallback: "Responsive audit & repair: Take a broken fixed-width multi-column card layout and convert it to fluid responsive grid with mobile drawer navigation in 40 minutes."
      },
      {
        id: "c1_6",
        name: "Debugging/Execution",
        maxMarks: 10,
        monitor: "Efficiency in finding and resolving runtime errors, console exceptions, UI rendering bugs, and logical glitches; effective use of devtools, breakpoints, and logs.",
        guidance: "• 9–10 (86–100%): Swift, systematic debugging using browser DevTools, network tab, and source breakpoints; isolates root cause in minutes.\n• 8 (76–85%): Methodical troubleshooting; identifies bugs accurately with minimal trial and error.\n• 6–7 (61–75%): Capable of resolving typical bugs, but occasionally relies on haphazard console.logs instead of structured diagnosis.\n• 4–5 (41–60%): Takes excessive time to locate simple syntax or state errors; gets overwhelmed by stack traces.\n• 2–3 (21–40%): Unable to diagnose bugs independently; introduces secondary errors while attempting fixes.\n• 0–1 (0–20%): Paralyzed by errors; cannot read error traces or find bug origins.",
        fallback: "Bug hunt test: Provide a project with 3 intentional bugs (async race condition, undefined state access, CSS z-index stacking context issue) to identify and fix within 30 minutes."
      },
      {
        id: "c1_7",
        name: "Deployment",
        maxMarks: 5,
        monitor: "Building production assets, environment variable configuration, deploying to hosting platforms (Vercel, Netlify, GitHub Pages, Cloudflare), and verifying live builds.",
        guidance: "• 5 (86–100%): Flawless zero-downtime deployment; configures build settings, env variables, custom domain/SSL, and tests production URL thoroughly.\n• 4 (76–85%): Successfully deploys project independently; resolves minor build warnings or base-path asset issues.\n• 3 (61–75%): Deploys with guidance on environment variables or routing fallbacks (e.g. SPA 404 rewrite).\n• 2 (41–60%): Requires assistance resolving build script failures or missing build output directories.\n• 1 (21–40%): Struggles with basic deployment concepts; exposes secrets or repeatedly fails build.\n• 0 (0–20%): Unable to produce a deployable production build.",
        fallback: "Live deployment challenge: Configure and deploy a static SPA with routing to GitHub Pages or Vercel, ensuring asset paths and 404 redirects work correctly."
      },
      {
        id: "c1_8",
        name: "Learning New Tech",
        maxMarks: 5,
        monitor: "Speed of picking up unfamiliar tools, libraries, or APIs; reading official documentation and applying new patterns without requiring extensive handholding.",
        guidance: "• 5 (86–100%): Rapid assimilation; studies documentation, builds proof-of-concept, and adopts idiomatic patterns within hours.\n• 4 (76–85%): Learns quickly from documentation and tutorials with minimal clarification needed.\n• 3 (61–75%): Adopts new tools at an average pace, requiring occasional guidance on best practices.\n• 2 (41–60%): Slow to adapt; resists changing familiar patterns or struggles to interpret API docs.\n• 1 (21–40%): High resistance to new tools; requires line-by-line tutorials to implement unfamiliar APIs.\n• 0 (0–20%): Unable to learn or apply new technical tools independently.",
        fallback: "Rapid API adoption test: Provide documentation for an unfamiliar third-party SDK/API; candidate must implement a basic integration in 45 minutes."
      }
    ]
  },
  {
    id: "prob",
    categoryNumber: 2,
    name: "Category 2: Problem Solving",
    shortName: "Problem Solving",
    maxMarks: 100,
    icon: "Cpu",
    criteria: [
      {
        id: "c2_1",
        name: "Debugging Root Cause",
        maxMarks: 25,
        monitor: "Ability to dig beyond superficial symptoms to find the true underlying architectural or logical defect; distinguishes cause from effect.",
        guidance: "• 22–25 (86–100%): Pinpoints true root cause systematically; fixes core issue rather than applying band-aid patches.\n• 19–21 (76–85%): Investigates thoroughly; finds root cause with minimal prompting, prevents recurrence.\n• 15–18 (61–75%): Solves the problem, but initial attempt may address symptom before finding underlying cause.\n• 10–14 (41–60%): Tends to apply quick superficial fixes without investigating why the failure occurred.\n• 5–9 (21–40%): Repeatedly applies trial-and-error hacks without understanding why code broke.\n• 0–4 (0–20%): Fails to locate failure origin; completely misdiagnoses issues.",
        fallback: "Root cause RCA exercise: Present a scenario where a memory leak or stale state occurs in a dashboard; require written analysis of root cause and preventive patch."
      },
      {
        id: "c2_2",
        name: "Requirement Understanding",
        maxMarks: 15,
        monitor: "Accurately decomposing project specifications, user stories, and acceptance criteria; catching unstated assumptions before coding.",
        guidance: "• 13–15 (86–100%): Grasps intricate requirements instantly; identifies ambiguities and edge conditions upfront before writing a single line.\n• 11–12 (76–85%): Thorough comprehension of requirements; delivers matching feature set with very few scope misalignments.\n• 9–10 (61–75%): Satisfactory understanding of core requirements; misses minor edge requirements that need subsequent alignment.\n• 6–8 (41–60%): Often misinterprets requirements; builds features that deviate from user specs.\n• 3–5 (21–40%): Consistently builds wrong functionality due to skipping or skimming specs.\n• 0–2 (0–20%): Completely disregards specifications; incapable of following requirements.",
        fallback: "Spec breakdown exercise: Provide a 1-page client project brief; candidate must extract and write a structured list of functional requirements, non-functional requirements, and edge cases."
      },
      {
        id: "c2_3",
        name: "Independent Problem Solving",
        maxMarks: 20,
        monitor: "Self-reliance when confronted with technical roadblocks; exhaustive exploration of solutions before escalating to senior engineers.",
        guidance: "• 18–20 (86–100%): Highly autonomous; evaluates multiple approaches, implements optimal solution, and explains tradeoffs clearly.\n• 15–17 (76–85%): Solves complex problems independently; asks for help only when organizational blockers arise.\n• 12–14 (61–75%): Autonomous on routine tasks; seeks direction when facing novel or ambiguous challenges.\n• 8–11 (41–60%): Gives up quickly when code fails; relies on mentors to provide answers rather than thinking through steps.\n• 4–7 (21–40%): Highly dependent on senior staff for basic problem solving steps.\n• 0–3 (0–20%): Cannot make progress without constant step-by-step instruction.",
        fallback: "Isolated coding kata: Complete an algorithmic/business logic feature (e.g. custom date-range grouping and filtering) without asking questions or external assistance within 60 minutes."
      },
      {
        id: "c2_4",
        name: "Research & Investigation",
        maxMarks: 10,
        monitor: "Skill in finding authoritative documentation, GitHub issues, RFCs, and technical articles; cross-referencing information rather than copy-pasting outdated snippets.",
        guidance: "• 9–10 (86–100%): Expert research ability; finds verified solutions in official specs/issues; filters out deprecated patterns.\n• 8 (76–85%): Solid research discipline; finds working solutions efficiently and validates their reliability.\n• 6–7 (61–75%): Capable of finding answers on Stack Overflow/LLMs, but occasionally incorporates obsolete or sub-optimal patterns.\n• 4–5 (41–60%): Surface-level searching; copies answers blindly without testing or understanding limitations.\n• 2–3 (21–40%): Struggles to formulate effective search queries; gets lost in irrelevant forum threads.\n• 0–1 (0–20%): Unable to conduct technical research independently.",
        fallback: "Research brief: Research and write a 1-page comparison of two competing libraries for a specific requirement (e.g. charting libraries) comparing bundle size, license, and API ergonomics."
      },
      {
        id: "c2_5",
        name: "Solution Quality",
        maxMarks: 15,
        monitor: "Elegance, performance, maintainability, and scalability of implemented solutions; avoids brittle workarounds.",
        guidance: "• 13–15 (86–100%): Robust, production-grade solutions; optimized time/space complexity, modular, extensible, and well-tested.\n• 11–12 (76–85%): High-quality solutions; stable under normal and heavy loads with clean structure.\n• 9–10 (61–75%): Workable solutions; functions correctly but has minor performance bottlenecks or slightly rigid design.\n• 6–8 (41–60%): Brittle solutions; prone to breaking when unexpected data is passed.\n• 3–5 (21–40%): Poor quality; hacks and shortcuts that compromise overall application stability.\n• 0–2 (0–20%): Defective or non-functional solutions.",
        fallback: "Code critique & optimization: Review a provided functional but inefficient solution (O(n²) lookups, excessive re-renders) and deliver an optimized production-grade version."
      },
      {
        id: "c2_6",
        name: "Handling Unexpected Problems",
        maxMarks: 10,
        monitor: "Emotional composure, adaptability, and logical reasoning when specs change abruptly, dependencies fail, or unforeseen errors emerge.",
        guidance: "• 9–10 (86–100%): Stays calm, analytical, and pivots gracefully; formulates contingency plans immediately without panic.\n• 8 (76–85%): Adapts smoothly to sudden changes; recalibrates priorities with minimal friction.\n• 6–7 (61–75%): Manages unexpected hurdles reasonably, but shows brief hesitation or mild frustration before adjusting.\n• 4–5 (41–60%): Becomes visibly stressed or defensive when plans change; struggles to replan.\n• 2–3 (21–40%): Paralyzed by unexpected blockers; refuses to pivot without extensive reassurance.\n• 0–1 (0–20%): Complete breakdown of productivity upon encountering unexpected problems.",
        fallback: "Curveball scenario test: Midway through a mock feature build, introduce a major breaking requirement change (e.g. data format inverted); assess reaction, replanning, and execution."
      },
      {
        id: "c2_7",
        name: "Learning From Mistakes",
        maxMarks: 5,
        monitor: "Incorporating feedback from past failures; ensuring the same bug or anti-pattern is never repeated in subsequent tasks.",
        guidance: "• 5 (86–100%): Never repeats a mistake; maintains personal notes or checklists and applies corrective measures across all subsequent work.\n• 4 (76–85%): Learns quickly from mistakes; readily accepts accountability and prevents repetition.\n• 3 (61–75%): Usually avoids repeat errors, though occasional oversight occurs under tight deadlines.\n• 2 (41–60%): Repeatedly makes the same mistake 2–3 times despite prior correction.\n• 1 (21–40%): Chronically repeats the same errors; ignores historical corrections.\n• 0 (0–20%): Hostile to admitting errors; zero learning demonstrated.",
        fallback: "Post-incident review: Have the student document what went wrong in a recent coding bug, why it occurred, and demonstrate a test case to prevent regression."
      }
    ]
  },
  {
    id: "collab",
    categoryNumber: 3,
    name: "Category 3: Professional Collaboration",
    shortName: "Professional Collaboration",
    maxMarks: 100,
    icon: "Users",
    criteria: [
      {
        id: "c3_1",
        name: "Teamwork",
        maxMarks: 20,
        monitor: "Active participation in group goals, supportive attitude, putting team delivery ahead of individual ego, collaborative problem solving.",
        guidance: "• 18–20 (86–100%): Exceptional team player; uplifts peers, fosters psychological safety, unblocks teammates spontaneously.\n• 15–17 (76–85%): Strong collaborator; contributes actively to team discussions, reliably steps in to support others.\n• 12–14 (61–75%): Good team citizen; works well with others, fulfills team commitments without friction.\n• 8–11 (41–60%): Works mostly in an isolated silo; reluctant to engage in team discussions or share progress.\n• 4–7 (21–40%): Disruptive or uncooperative team behavior; creates friction with peers.\n• 0–3 (0–20%): Actively hostile or toxic to team dynamics.",
        fallback: "Peer pairing simulation: 45-minute collaborative pair-programming session with an evaluator acting as peer, observing collaboration and communication balance."
      },
      {
        id: "c3_2",
        name: "Git/Team Workflow",
        maxMarks: 15,
        monitor: "Compliance with branch protection, PR review protocols, semantic tagging, squash-merge rules, and avoiding blocking teammates with unreviewed code.",
        guidance: "• 13–15 (86–100%): Model team Git workflow; small reviewable PRs, prompt peer reviews, respects release branches and staging flows.\n• 11–12 (76–85%): Follows team Git guidelines diligently; communicates before merging shared branches.\n• 9–10 (61–75%): Standard workflow compliance; occasionally forgets to pull before pushing or creates slightly oversized PRs.\n• 6–8 (41–60%): Skips PR templates, merges without proper approvals, or pushes broken code to development branch.\n• 3–5 (21–40%): Regularly breaks team builds, overrides branch protections, or bypasses code review.\n• 0–2 (0–20%): Complete disregard for shared team version control etiquette.",
        fallback: "Mock PR review exercise: Conduct a code review on a teammate's pull request, providing at least 3 constructive, polite, and actionable comments."
      },
      {
        id: "c3_3",
        name: "Responsibility",
        maxMarks: 15,
        monitor: "Taking ownership of assigned tasks, honoring commitments, proactively flagging roadblocks early, and following tasks to full completion.",
        guidance: "• 13–15 (86–100%): Absolute accountability; delivers on promises, flags obstacles proactively, never leaves loose ends.\n• 11–12 (76–85%): Highly reliable; takes ownership of duties, follows up diligently.\n• 9–10 (61–75%): Responsible for assigned work; occasionally needs a reminder on secondary deliverables.\n• 6–8 (41–60%): Inconsistent follow-through; sometimes drops tasks when difficulty increases.\n• 3–5 (21–40%): Defers blame to others; frequently fails to complete assigned responsibilities.\n• 0–2 (0–20%): Total absence of accountability.",
        fallback: "Accountability simulation: Candidate is given ownership of a deliverable with ambiguous dependencies; evaluate how they map, schedule, and report status."
      },
      {
        id: "c3_4",
        name: "Working With Designers",
        maxMarks: 10,
        monitor: "Respect for design systems, Figma specs, typography, spacing tokens, visual fidelity, and constructive dialogue regarding technical feasibility.",
        guidance: "• 9–10 (86–100%): Impeccable design fidelity; interprets Figma specs precisely (padding, typography, colors), proposes elegant technical solutions for complex UI.\n• 8 (76–85%): Strong attention to design detail; clarifies ambiguities with designer professionally.\n• 6–7 (61–75%): Implements designs well; occasional slight discrepancies in margins, fonts, or hover states.\n• 4–5 (41–60%): 'Eyeballs' designs carelessly; ignores design system tokens, producing inconsistent visuals.\n• 2–3 (21–40%): Disregards design mockups; delivers UI that deviates significantly from approved designs.\n• 0–1 (0–20%): Dismissive of designers and design specifications.",
        fallback: "Figma-to-code implementation audit: Match a provided Figma frame into HTML/CSS; evaluate accuracy of font sizes, padding, hex colors, and spacing."
      },
      {
        id: "c3_5",
        name: "Working With Developers",
        maxMarks: 10,
        monitor: "API contract negotiation, code review interactions, shared utility development, and mutual respect among backend/frontend/peer developers.",
        guidance: "• 9–10 (86–100%): Collaborative technical partner; coordinates API schemas, writes reusable shared modules, offers supportive code reviews.\n• 8 (76–85%): Integrates smoothly with peer developers; communicates interfaces and payloads clearly.\n• 6–7 (61–75%): Works well with fellow devs, minor friction when API contracts differ from expectations.\n• 4–5 (41–60%): Struggles to coordinate data contracts; blames other developers for integration friction.\n• 2–3 (21–40%): Combative in code reviews or refuses to adopt shared architecture decisions.\n• 0–1 (0–20%): Unable to cooperate with other engineers.",
        fallback: "API contract alignment exercise: Write a JSON schema / TypeScript interface contract for a feature and negotiate payload endpoints with an evaluator playing backend engineer."
      },
      {
        id: "c3_6",
        name: "Receiving Feedback",
        maxMarks: 10,
        monitor: "Openness to criticism, avoiding defensiveness, actively seeking clarifying feedback, and prompt implementation of suggested changes.",
        guidance: "• 9–10 (86–100%): Welcomes constructive critique enthusiastically; treats feedback as a growth opportunity, implements improvements immediately.\n• 8 (76–85%): Accepts feedback professionally; implements changes without resentment or pushback.\n• 6–7 (61–75%): Listens to feedback, may initially justify old code, but ultimately carries out requested adjustments.\n• 4–5 (41–60%): Defensive when critiqued; takes technical comments personally, reluctant to change code.\n• 2–3 (21–40%): Argumentative and resistant during code reviews; ignores reviewer requests.\n• 0–1 (0–20%): Rejects feedback outright or reacts with hostility.",
        fallback: "Live code review feedback test: Provide 3 critical critiques on their code; observe verbal and behavioral response and watch them apply the requested changes."
      },
      {
        id: "c3_7",
        name: "Helping Team Members",
        maxMarks: 10,
        monitor: "Willingness to mentor peers, answer questions in team channels, assist blocked colleagues, and contribute to shared documentation.",
        guidance: "• 9–10 (86–100%): Proactively mentors and unblocks colleagues; writes shared wikis/guides that benefit the entire team.\n• 8 (76–85%): Readily offers help when asked; patient and clear when explaining concepts to peers.\n• 6–7 (61–75%): Helps teammates when requested, provided personal workload permits.\n• 4–5 (41–60%): Rarely helps others; views assisting peers as an unwelcome distraction.\n• 2–3 (21–40%): Hoards knowledge; impatient or condescending when teammates seek assistance.\n• 0–1 (0–20%): Completely unwilling to support or assist teammates.",
        fallback: "Knowledge sharing exercise: Write a concise 1-page onboarding troubleshooting guide for common local environment setup errors."
      },
      {
        id: "c3_8",
        name: "Conflict Handling",
        maxMarks: 10,
        monitor: "Navigating disagreements professionally, de-escalating tension, focusing on evidence and user outcomes rather than personal opinions.",
        guidance: "• 9–10 (86–100%): Masterful de-escalation; finds consensus through data, user needs, and objective evaluation of tradeoffs.\n• 8 (76–85%): Handles disagreements calmly and constructively; separates personal feelings from technical decisions.\n• 6–7 (61–75%): Manages routine differences maturely; occasionally needs a senior lead to mediate deadlocks.\n• 4–5 (41–60%): Becomes passive-aggressive or stubborn during disagreements; holds grudges.\n• 2–3 (21–40%): Escalates minor differences into interpersonal conflicts.\n• 0–1 (0–20%): Highly combative, creating a toxic team atmosphere during disagreements.",
        fallback: "Conflict resolution scenario: Present a simulated disagreement over library selection (e.g. Tailwind vs CSS Modules); candidate must write a balanced tradeoff analysis and consensus proposal."
      }
    ]
  },
  {
    id: "comm",
    categoryNumber: 4,
    name: "Category 4: Communication & Client Readiness",
    shortName: "Communication & Client Readiness",
    maxMarks: 100,
    icon: "MessageSquare",
    criteria: [
      {
        id: "c4_1",
        name: "Requirement Clarification",
        maxMarks: 20,
        monitor: "Asking precise, thoughtful questions early; uncovering edge cases and business rules before committing to assumptions.",
        guidance: "• 18–20 (86–100%): Asks laser-focused questions that eliminate ambiguity; uncovers hidden client needs and documents clarifications.\n• 15–17 (76–85%): Clarifies requirements effectively before starting; asks thoughtful questions in structured batches.\n• 12–14 (61–75%): Asks reasonable clarification questions, but occasionally forgets a secondary business edge case.\n• 8–11 (41–60%): Rarely asks questions; makes assumptions that turn out to be incorrect during final demo.\n• 4–7 (21–40%): Asks disorganized, repetitive questions without reviewing previous answers or documentation.\n• 0–3 (0–20%): Blindly starts work with zero clarification, leading to total project misalignment.",
        fallback: "Ambiguous brief interview: Provide an intentionally vague user story; candidate must conduct a 10-minute clarification interview with the evaluator acting as client."
      },
      {
        id: "c4_2",
        name: "Client Communication",
        maxMarks: 20,
        monitor: "Professional, empathetic, polished interaction with external or internal stakeholders; adapting tone and avoiding tech jargon when speaking to non-technical users.",
        guidance: "• 18–20 (86–100%): Polished, articulate client communication; builds trust, explains status clearly, manages expectations flawlessly.\n• 15–17 (76–85%): Professional and courteous; conveys progress and delays respectfully and clearly.\n• 12–14 (61–75%): Good communication; generally clear, though occasionally slips into overly technical jargon with non-technical clients.\n• 8–11 (41–60%): Lacks polish; communication is blunt, informal, or fails to address client concerns directly.\n• 4–7 (21–40%): Poor client etiquette; argumentative, defensive, or unprofessional tone in emails/calls.\n• 0–3 (0–20%): Damaging to client relationships; inappropriate or unprofessional conduct.",
        fallback: "Client email simulation: Draft an email to a non-technical client explaining why a feature release is delayed by 2 days due to a third-party security patch, maintaining positive rapport."
      },
      {
        id: "c4_3",
        name: "Professional Messaging",
        maxMarks: 15,
        monitor: "Written communications across Slack, email, and tickets; concise, well-structured messages with appropriate context, bullet points, and actionable next steps.",
        guidance: "• 13–15 (86–100%): Crystal-clear, executive-level written messages; structured formatting, actionable requests, perfect grammar and tone.\n• 11–12 (76–85%): Well-written, professional messages; organized with clear calls to action.\n• 9–10 (61–75%): Adequate written clarity; gets message across, though sometimes verbose or missing immediate context.\n• 6–8 (41–60%): Sloppy messages; poor grammar, fragmented thoughts, vague statements like 'it is not working'.\n• 3–5 (21–40%): Incoherent or overly casual messages ('idk', 'plz fix'); confusing to recipients.\n• 0–2 (0–20%): Unprofessional, illegible, or disrespectful messaging.",
        fallback: "Slack announcement draft: Write a concise Slack update to the company announcements channel regarding a scheduled database migration window."
      },
      {
        id: "c4_4",
        name: "Technical Explanation",
        maxMarks: 15,
        monitor: "Ability to explain complex architectural or code concepts simply to both engineers and non-technical stakeholders using analogies and diagrams.",
        guidance: "• 13–15 (86–100%): Master communicator; explains complex technical tradeoffs with clear mental models, diagrams, and business-value mapping.\n• 11–12 (76–85%): Explains technical concepts clearly; tailors depth to the listener's background.\n• 9–10 (61–75%): Sound technical explanation, but struggles slightly when translating deep tech concepts into layman terms.\n• 6–8 (41–60%): Relies heavily on buzzwords and convoluted explanations; confuses listeners.\n• 3–5 (21–40%): Unable to articulate why an architecture decision was made or how code operates.\n• 0–2 (0–20%): Completely unable to explain their own technical work.",
        fallback: "Whiteboard explanation test: Spend 5 minutes explaining how JWT authentication works to a non-technical product manager."
      },
      {
        id: "c4_5",
        name: "Project Updates",
        maxMarks: 10,
        monitor: "Timely, proactive status reporting; highlighting completed milestones, blockers, and ETA changes without needing to be chased.",
        guidance: "• 9–10 (86–100%): Exemplary proactive updates; posts daily standup summaries, flags blockers hours before they become critical, updates tickets in real-time.\n• 8 (76–85%): Reliable updates; keeps team informed of progress and milestones consistently.\n• 6–7 (61–75%): Provides updates when asked or during standard standups; occasionally forgets to post async updates.\n• 4–5 (41–60%): Must be prompted repeatedly for status; team is left guessing about progress.\n• 2–3 (21–40%): Goes silent for days; conceals blockers until deadline day.\n• 0–1 (0–20%): Zero communication regarding project status.",
        fallback: "Standup summary exercise: Write a formatted daily standup post (Yesterday / Today / Blockers / ETA) for a multi-day sprint."
      },
      {
        id: "c4_6",
        name: "Presentation/Demo",
        maxMarks: 10,
        monitor: "Structuring a live walkthrough of working software; setting context, guiding audience through user journeys, and highlighting value delivered.",
        guidance: "• 9–10 (86–100%): Compelling, engaging presentation; smooth demo flow, connects features to business value, well-rehearsed.\n• 8 (76–85%): Clear, confident demonstration of completed work; logical progression through features.\n• 6–7 (61–75%): Functional demo; shows features working, but presentation feels slightly rushed or technical.\n• 4–5 (41–60%): Disorganized demo; gets lost in code editor instead of demonstrating live application flow.\n• 2–3 (21–40%): Unprepared demo; application crashes immediately, lacks context or narrative.\n• 0–1 (0–20%): Refuses or fails completely to demonstrate work.",
        fallback: "5-minute live feature demo: Present the working web application to evaluators as if they were prospective clients."
      },
      {
        id: "c4_7",
        name: "Handling Questions",
        maxMarks: 10,
        monitor: "Poise, active listening, honesty when an answer is unknown ('I will verify and follow up'), and concise factual answers during Q&A.",
        guidance: "• 9–10 (86–100%): Listens attentively, answers directly with poise; gracefully handles tough questions and commits to precise follow-ups.\n• 8 (76–85%): Responds confidently and accurately; addresses questions thoroughly.\n• 6–7 (61–75%): Answers adequately, though occasionally wanders off-topic before getting to the point.\n• 4–5 (41–60%): Becomes defensive when questioned; gives evasive or vague answers.\n• 2–3 (21–40%): Guesses or fabricates facts instead of admitting uncertainty; visibly flustered.\n• 0–1 (0–20%): Hostile or unable to respond to basic questions about their work.",
        fallback: "Cross-examination Q&A drill: Evaluator asks 3 challenging questions about edge cases, scalability limits, and security of their project."
      }
    ]
  },
  {
    id: "rel",
    categoryNumber: 5,
    name: "Category 5: Professional Reliability",
    shortName: "Professional Reliability",
    maxMarks: 100,
    icon: "ShieldCheck",
    criteria: [
      {
        id: "c5_1",
        name: "Deadline Performance",
        maxMarks: 25,
        monitor: "Delivering milestones on or before target dates; realistic estimation and prompt early warnings if deadlines are at risk.",
        guidance: "• 22–25 (86–100%): Consistently beats or meets deadlines; accurate estimation; zero last-minute surprises.\n• 19–21 (76–85%): Reliably delivers on time; gives ample notice (24h+) if an unexpected blocker threatens a target.\n• 15–18 (61–75%): Meets most deadlines; occasional minor delays on complex features, but manages overall schedule.\n• 10–14 (41–60%): Frequently misses deadlines by 1–2 days due to poor time management or late starts.\n• 5–9 (21–40%): Chronic missed deadlines; delivers late work with significant deficits.\n• 0–4 (0–20%): Complete disregard for project deadlines and delivery schedules.",
        fallback: "Sprint estimation drill: Break down a 3-feature module into hour-by-hour estimates, set a strict 4-hour delivery deadline, and track variance."
      },
      {
        id: "c5_2",
        name: "Responsiveness",
        maxMarks: 15,
        monitor: "Replying to urgent messages, emails, pull request comments, and meeting requests within reasonable business hours (e.g. under 30–60 minutes during work hours).",
        guidance: "• 13–15 (86–100%): Highly responsive; acknowledges messages promptly, sets clear expectations if busy ('In deep work until 2pm, will review then').\n• 11–12 (76–85%): Consistently replies within normal working timeframes; dependable.\n• 9–10 (61–75%): Generally responsive; occasionally takes several hours to acknowledge non-urgent requests.\n• 6–8 (41–60%): Slow to respond; often requires second ping or reminder on direct messages.\n• 3–5 (21–40%): Unresponsive for extended stretches during work hours without explanation.\n• 0–2 (0–20%): Completely unresponsive; unreachable when needed.",
        fallback: "Availability and ping audit: Review logged response times to asynchronous team pings over the evaluation cycle."
      },
      {
        id: "c5_3",
        name: "Consistent Updates",
        maxMarks: 15,
        monitor: "Regular, steady rhythm of commits, notes, and task progress; avoids 'black hole' periods where no activity is visible.",
        guidance: "• 13–15 (86–100%): Continuous visibility; commits daily, moves Kanban cards in real-time, steady predictable velocity.\n• 11–12 (76–85%): Regular updates; maintains steady progress without long periods of silence.\n• 9–10 (61–75%): Updates regularly on standard days, but velocity fluctuates occasionally.\n• 6–8 (41–60%): Spurt-and-stall work pattern; 3 days of silence followed by midnight rush.\n• 3–5 (21–40%): Disappears for days at a time with zero logged activity or commits.\n• 0–2 (0–20%): Completely erratic; no predictable work rhythm.",
        fallback: "3-day work cadence challenge: Monitor commit timestamps and ticket state transitions across 3 consecutive working days."
      },
      {
        id: "c5_4",
        name: "Ownership & Follow-through",
        maxMarks: 15,
        monitor: "Seeing things through to the very end; verifying features work in production, testing with real data, not leaving tasks at 90% done.",
        guidance: "• 13–15 (86–100%): Tenacious follow-through; tests in production, monitors errors after deploy, verifies with end user that issue is truly resolved.\n• 11–12 (76–85%): Strong ownership; ensures tasks are fully tested and deployed before closing tickets.\n• 9–10 (61–75%): Good follow-through; occasionally forgets to close tickets or verify secondary edge cases after deploy.\n• 6–8 (41–60%): Leaves tasks half-finished; marks tickets 'done' when code is only tested locally.\n• 3–5 (21–40%): Abandons tasks as soon as difficult bugs arise; requires constant handholding to finish.\n• 0–2 (0–20%): Zero follow-through; starts many tasks, finishes none.",
        fallback: "Verification checklist test: Provide a 'completed' feature; candidate must perform production verification, cross-browser sanity check, and write closure confirmation."
      },
      {
        id: "c5_5",
        name: "Process Compliance",
        maxMarks: 10,
        monitor: "Following established engineering standards, branching policies, ticket transitions, documentation rules, and company workflows.",
        guidance: "• 9–10 (86–100%): Flawless process adherence; models standard procedures, suggests process optimizations through proper channels.\n• 8 (76–85%): Respects all company and engineering processes consistently.\n• 6–7 (61–75%): Follows major processes; occasionally skips minor documentation or ticket tagging steps.\n• 4–5 (41–60%): Cuts corners regularly; bypasses approval gates, forgets ticket tracking.\n• 2–3 (21–40%): Resistant to process guidelines; frequently violates team protocols.\n• 0–1 (0–20%): Total disregard for organizational and engineering workflows.",
        fallback: "Process compliance audit: Review a completed sprint's tickets, branch names, PR templates, and release notes against the team standard checklist."
      },
      {
        id: "c5_6",
        name: "QC/Correction Discipline",
        maxMarks: 10,
        monitor: "Self-testing, attention to quality control, thoroughness before submitting for review, avoiding careless typos or syntax errors.",
        guidance: "• 9–10 (86–100%): Rigorous self-QA; tests happy and unhappy paths, cross-browser checks, zero careless errors reach review.\n• 8 (76–85%): Diligent testing; catches most defects prior to pull request submission.\n• 6–7 (61–75%): Performs basic testing; occasional obvious UI glitch or console error slips through.\n• 4–5 (41–60%): Treats reviewers as their personal QA; submits untested code with obvious breakages.\n• 2–3 (21–40%): Submits broken builds repeatedly without testing at all.\n• 0–1 (0–20%): Complete absence of quality control.",
        fallback: "Pre-PR self-inspection challenge: Candidate must run through a comprehensive 10-point QA checklist on their own work and document test evidence."
      },
      {
        id: "c5_7",
        name: "Commitment & Attendance",
        maxMarks: 5,
        monitor: "Punctuality for standups, meetings, client syncs, honoring work hours, and communicating planned absences well in advance.",
        guidance: "• 5 (86–100%): Punctual, dependable attendance; 100% meeting presence, communicates PTO weeks in advance.\n• 4 (76–85%): Reliable attendance; rarely late, communicates schedule changes promptly.\n• 3 (61–75%): Generally punctual; occasional minor tardiness with reasonable excuse.\n• 2 (41–60%): Frequent unexplained tardiness to morning standups and syncs.\n• 1 (21–40%): Chronic absenteeism; misses important team and client meetings without warning.\n• 0 (0–20%): Unacceptable attendance; completely unreliable.",
        fallback: "Attendance and punctuality audit over the assessment sprint period."
      },
      {
        id: "c5_8",
        name: "Professional Behavior",
        maxMarks: 5,
        monitor: "Maturity, respectful conduct towards colleagues and clients, integrity, handling pressure gracefully, adhering to workplace code of conduct.",
        guidance: "• 5 (86–100%): Exemplary professionalism, integrity, and emotional intelligence in all workplace interactions.\n• 4 (76–85%): Courteous, respectful, and mature at all times.\n• 3 (61–75%): Demonstrates standard acceptable workplace demeanor.\n• 2 (41–60%): Immature behavior, occasional inappropriate comments or emotional outbursts under pressure.\n• 1 (21–40%): Unprofessional, disrespectful conduct causing discomfort among peers.\n• 0 (0–20%): Egregious violation of professional workplace standards.",
        fallback: "Professional conduct review and 360-degree peer feedback assessment."
      }
    ]
  }
];

