// ─── Level 3: The Small Portfolio ───────────────────────────────────────────
// Full content — Nexus-Product deep dive, tool discovery, artifact creation
//
// NOTE: These exercises require Claude Desktop with the nexus-product MCP
// configured. Users run queries in Claude Desktop and paste results back here.
// NexusYou then provides AI Coach feedback on their outputs.

import { NEXUS_TOOL_CATEGORIES, ROLE_TOOL_RECOMMENDATIONS, TOOL_COMBOS } from './beyondContext.js'

export const LEVEL3 = {
  id: 3,
  title: 'The Small Portfolio',
  theme: 'Multiple properties, multiple tools',
  focus: 'Nexus-Product deep dive, tool discovery, and building useful artifacts from live data',
  duration: '~2.5 hours',
  icon: '🏘️',
  propertyStage: 'portfolio',
  color: '#3bc1cc',
  locked: false,
  comingSoon: false,
  description:
    'Go deep on Nexus-Product. Learn to discover tools, pull real Beyond data, and build artifacts your team will actually use.',

  exercises: [
    // ── Exercise 3.1 ─────────────────────────────────────────────────────────
    {
      id: '3.1',
      title: 'Meet Your Toolkit',
      duration: '20 min',
      type: 'nexus_walkthrough',
      skill: 'Discovering and cataloguing Nexus-Product MCP tools and their capabilities',
      intro:
        "Nexus-Product is an MCP server that gives Claude direct access to Beyond's production systems — customer data, listing performance, PostHog analytics, Gong call transcripts, Kustomer support tickets, and more. Most people who have it configured have no idea what it can actually do.\n\nThe full catalog includes 9 categories and 70+ tools. Your job today is to find out exactly which ones you have access to and which matter most for your specific role.",
      learningObjective:
        "You'll produce a personal 'Nexus Toolkit' reference — mapped to the real tool categories — so you know exactly what to reach for when you have a product question.",
      content: {
        type: 'nexus_walkthrough',
        prerequisite: {
          title: 'Before you start',
          items: [
            'Open Claude Desktop (not Claude.ai — the desktop app)',
            'Confirm Nexus-Product is configured: Settings → Developer → MCP Servers',
            'Start a fresh conversation in your work Project folder',
            'Have the tool category list handy (below) — use it to verify you found everything',
          ],
        },
        prompts: [
          {
            label: 'Step 1 — Discover all your Nexus tools by category:',
            prompt: `List all the tools available to you from Nexus-Product, organized by these categories:
1. Customer & Account Research (compass_get_customer_info, compass_get_user_lamen_daily_evolution, etc.)
2. Performance & Revenue Analysis (compass_get_user_btm_detail, compass_get_listing_metrics, etc.)
3. Market & Geographic Data (compass_get_market_info, compass_get_market_events, etc.)
4. Product Analytics / PostHog (posthog__query-run, posthog__experiment-results-get, etc.)
5. Support & Feedback / Kustomer (kustomer_get_conversations, etc.)
6. Sales Intelligence / Gong (gong_get_calls, gong_get_call_transcript, etc.)
7. Salesforce / CRM (compass_get_salesforce_accounts, etc.)
8. Data Infrastructure (pg_execute_sql, dbt_get_model_descriptions, tettra_search, etc.)
9. Sharing (core_publish_artifacts, etc.)

For each tool you find: list its name and one sentence on what questions it can answer.`,
            tip: "If nexus-product isn't showing tools, it may not be configured. Ask Claude: 'What MCP servers are you connected to?'",
          },
          {
            label: 'Step 2 — Understand the key data objects:',
            prompt: `Using the nexus-product tools I have, describe the core data objects available:
- What customer/host data is accessible (and through which tools)?
- What performance metrics can I query (BtM, RevPAN, LAMEN, reservations)?
- What behavioral data is available (logins, ABR interactions, price overrides)?
- What analytics events and experiments can I access via PostHog?
- What qualitative signals can I access (Kustomer support, Gong calls)?

This is my mental model for what questions I can answer with Nexus.`,
            tip: 'This data model understanding is what separates people who use one tool vs. people who chain the right tools together.',
          },
          {
            label: 'Step 3 — Get your role-specific starting kit:',
            prompt: `I'm a [YOUR ROLE — PM / Product Designer / etc.] at Beyond. Based on the tools available to me:

1. Which 5 tools should I use most often? For each: the tool name + the specific type of question it answers best for my role
2. Which tool combination would I use for a customer health check? (Hint: try compass_get_customer_info + compass_get_user_btm_detail + compass_get_user_lamen_daily_evolution + compass_get_user_logins)
3. What's one question I probably have every week that I can now answer with Nexus that I couldn't easily answer before?`,
            tip: 'Customize [YOUR ROLE] before running this. Be specific — "Senior PM focused on host activation" is better than just "PM".',
          },
        ],
      },
      task: {
        instructions:
          "Run all three prompts above in Claude Desktop with Nexus-Product configured. Then come back here and fill in the fields below.\n\nThis becomes your personal Nexus Toolkit reference — you'll use it throughout Level 3 and beyond.",
        fields: [
          {
            id: 'tools_by_category',
            label: "Tools you found, organized by category (paste Claude's organized list):",
            placeholder: 'Customer & Account Research:\n- compass_get_customer_info: ...\n- ...\n\nProduct Analytics (PostHog):\n- posthog__query-run: ...\n\n[etc. for each category you have access to]',
            rows: 12,
            required: true,
          },
          {
            id: 'role_relevant',
            label: 'Your 5-tool starting kit for your role:',
            placeholder:
              "Tool 1: [exact tool name] — I'll use this when [specific situation]\nTool 2: ...\nTool 3: ...\nTool 4: ...\nTool 5: ...",
            rows: 8,
            required: true,
          },
          {
            id: 'weekly_question',
            label: 'One question you have every week that Nexus can now answer:',
            placeholder: "The question: [specific question]\nThe tool(s) I'd use: [specific tool name(s)]\nHow this would have taken longer without Nexus: [...]",
            rows: 4,
            required: true,
          },
          {
            id: 'surprise',
            label: "What surprised you about what's available? Any tools you didn't expect?",
            placeholder: "What capabilities did you discover that you hadn't anticipated?",
            rows: 3,
            required: false,
          },
        ],
      },
      coachContext: `Evaluate the user's Nexus toolkit discovery. The real tool catalog has 9 categories and 70+ tools. Check:
(1) Did they find tools from at least 4-5 categories? If they only found compass_* tools and missed PostHog, Gong, or Kustomer, flag this.
(2) Are their 5 role-specific tools genuinely role-appropriate? PMs should have customer health tools (compass_get_customer_info, compass_get_user_btm_detail) and analytics tools (posthog__query-run). Designers should have usage/UX tools (posthog__insights-get-all, posthog__survey-stats, kustomer_get_conversations).
(3) Is the weekly question specific and real — does it name a real type of question a person in their role would actually have?
(4) Most importantly: look for actual tool names with correct spellings (compass_get_*, posthog__*, kustomer_*, gong_*). Generic descriptions without specific tool names mean they probably didn't actually run the prompts. Reference specific tool names from the catalog in your feedback.`,
      evaluationCriteria: [
        'Tools found from at least 4-5 different categories (Customer, PostHog, Kustomer, Gong, etc.)',
        'Exact tool names used — not generic descriptions',
        'Role-specific kit is genuinely relevant to their role (PM vs. Designer choices differ)',
        'Weekly question names a specific, realistic question for their role',
      ],
    },

    // ── Exercise 3.2 ─────────────────────────────────────────────────────────
    {
      id: '3.2',
      title: 'Your First Nexus Queries',
      duration: '25 min',
      type: 'nexus_walkthrough',
      skill: 'Running targeted Nexus-Product queries to pull real Beyond data',
      intro:
        "Knowing the tools is one thing. Using them to answer real questions is where the value shows up.\n\nThe mistake most people make is asking questions that are too broad. 'Show me all our customers' will give you 10,000 rows that tell you nothing. The power is in targeted queries: 'Show me hosts who signed up in the last 30 days who haven't completed setup — sorted by their ARR potential.'",
      learningObjective:
        "You'll run 3 different targeted Nexus queries, evaluate what the data tells you, and practice the habit of always knowing why you're pulling a specific dataset.",
      content: {
        type: 'nexus_walkthrough',
        patterns: [
          {
            name: 'The Diagnostic Query',
            description: 'Pull data to understand a problem — use compass_get_user_lamen_daily_evolution + compass_get_user_logins for engagement diagnosis, or kustomer_get_conversations for support-pattern diagnosis',
            example: "Use compass_get_user_lamen_daily_evolution to show me hosts who were actively enabled 90 days ago but whose LAMEN has dropped to zero in the last 30 days. Then use compass_get_user_logins to check if they've logged in recently. What pattern do you see?",
          },
          {
            name: 'The Validation Query',
            description: 'Pull data to test a hypothesis — use compass_get_user_btm_detail for performance hypotheses, posthog__query-run for behavioral hypotheses',
            example: "I believe hosts with 3+ listings achieve BtM significantly more often than single-listing hosts. Use compass_get_user_btm_detail to pull BtM data, grouped by number of listings. Does the data support this?",
          },
          {
            name: 'The Cohort Query',
            description: 'Pull a specific segment — use posthog__cohorts-list + posthog__query-run for behavior cohorts, compass_get_salesforce_accounts for enterprise cohorts',
            example: "Use compass_get_customer_info to pull hosts who signed up in Q1 2025, grouped by signup source. Then use compass_get_user_lamen_daily_evolution to show what % of each group are still active today. Any source-specific patterns?",
          },
          {
            name: 'The Anomaly Query',
            description: 'Find outliers — use compass_get_user_base_price_changes for override anomalies, posthog__query-run for usage anomalies',
            example: "Use compass_get_user_base_price_changes to identify hosts with unusually high manual override rates (top 10% by number of changes). Then use compass_get_user_btm_detail to compare their BtM performance to the average. What pattern emerges?",
          },
        ],
        tip: "Always choose the right tool before writing the prompt. Customer health → compass_get_customer_info first. BtM performance → compass_get_user_btm_detail. Engagement → compass_get_user_logins. Product behavior → posthog__query-run. Support patterns → kustomer_get_conversations.",
      },
      task: {
        instructions:
          "Run 3 different Nexus-Product queries in Claude Desktop — one for each of these categories. For each query, name the specific Nexus tool(s) you used.\n\n1. A **diagnostic** query using customer/account data (compass_get_* tools) to understand a real problem\n2. A **validation** query using performance or analytics data (compass_get_user_btm_detail or posthog__query-run) to test a hypothesis\n3. A **cohort or anomaly** query using any combination of tools to segment users in a way relevant to your work\n\nFor each: the exact prompt, the tools used, and 2-3 sentences on what the data showed.",
        fields: [
          {
            id: 'query1',
            label: 'Query 1 (Diagnostic): The prompt + tools used + what the data showed:',
            placeholder:
              "Prompt: [What you asked Claude]\nTools used: [e.g., compass_get_customer_info, compass_get_user_logins]\n\nWhat the data showed: [2-3 sentences with specific numbers or patterns]",
            rows: 7,
            required: true,
          },
          {
            id: 'query2',
            label: 'Query 2 (Validation): The prompt + tools + what the data confirmed or challenged:',
            placeholder:
              "Prompt: [What you asked Claude]\nTools used: [e.g., compass_get_user_btm_detail or posthog__query-run]\n\nHypothesis: [What you believed]\nWhat the data showed: [Was the hypothesis supported?]",
            rows: 7,
            required: true,
          },
          {
            id: 'query3',
            label: 'Query 3 (Cohort/Anomaly): The prompt + tools + most interesting finding:',
            placeholder:
              "Prompt: [What you asked Claude]\nTools used: [list them]\n\nMost interesting finding: [What stood out, with specific data if possible]",
            rows: 7,
            required: true,
          },
          {
            id: 'tool_choice_rationale',
            label: 'For one of your queries: why did you choose that specific tool vs. another option?',
            placeholder:
              "For Query [1/2/3], I chose [tool name] instead of [other option] because [reasoning about which data source was most appropriate for this question].",
            rows: 3,
            required: false,
          },
        ],
      },
      coachContext: `Evaluate the user's Nexus queries. Key checks:
(1) Did they name specific tool names for each query (compass_get_user_btm_detail, posthog__query-run, etc.)? If they just say "I asked Nexus", they didn't demonstrate tool awareness.
(2) Are the tool choices appropriate for the question type? Using compass_get_user_btm_detail for a BtM validation = correct. Using it for a behavioral product question = wrong tool. Using posthog__query-run for a performance cohort = appropriate.
(3) Are the three queries genuinely different types? Diagnostic = understanding a problem. Validation = testing a hypothesis. Cohort/Anomaly = segmentation.
(4) Do their summaries include specific numbers, trends, or comparisons — not vague 'the data showed some things'?
Reference specific tools by name in your feedback (e.g., "Your choice of compass_get_user_lamen_daily_evolution for the engagement diagnostic was exactly right — it gives you the timeline view you need").`,
      evaluationCriteria: [
        'Specific Nexus tool names listed for each query (not just "I asked Claude")',
        'Tool choices are appropriate for the question type',
        'Three genuinely different query types (diagnostic, validation, cohort)',
        'Summaries include specific numbers or patterns from the actual data',
      ],
    },

    // ── Exercise 3.3 ─────────────────────────────────────────────────────────
    {
      id: '3.3',
      title: 'From Data to Insight',
      duration: '25 min',
      type: 'nexus_walkthrough',
      skill: 'Chaining data queries with analytical follow-ups to surface non-obvious insights',
      intro:
        "Data is not insight. A spreadsheet of numbers is not insight. Insight is the 'so what' — the conclusion that changes how you think or act.\n\nThe pattern that separates data-literate PMs and Designers from everyone else is the relentless 'so what?' question. You pull data. Then you ask 'so what does this mean?' Then you ask 'so what should we do about it?' Then you ask 'so what are we assuming here?' Each follow-up unpacks a layer the first query didn't reach.",
      learningObjective:
        "You'll pull data with Nexus, then use a chain of 'so what?' follow-ups to surface an insight you didn't expect at the start.",
      content: {
        type: 'patterns',
        patterns: [
          {
            name: 'The First So What',
            prompt: "Here's what the data shows: [paste your data]. What does this tell us about our customers/business/product?",
            when: 'Right after pulling your data — get Claude\'s initial read',
          },
          {
            name: 'The Deeper So What',
            prompt: "You said [X]. So what? Why does that matter? What would have to be true for that to be significant vs. just noise?",
            when: 'After Claude gives its initial analysis — push past the surface',
          },
          {
            name: 'The Surprising So What',
            prompt: "What's the most counterintuitive conclusion you could draw from this data? What would someone who believed the opposite of our conventional wisdom say?",
            when: 'When you want to challenge assumptions the data might be hiding',
          },
          {
            name: 'The Action So What',
            prompt: "If this data is right, what should we do differently? Give me 3 concrete actions this insight suggests — ranked by how much impact they'd have.",
            when: 'When you want to translate analysis into decisions',
          },
          {
            name: 'The Assumption So What',
            prompt: "What assumptions are embedded in this analysis? If those assumptions are wrong, how does the conclusion change?",
            when: 'Before sharing findings with stakeholders — catch your blind spots',
          },
        ],
      },
      task: {
        instructions:
          "Pick one of your queries from Exercise 3.2 — the one with the most interesting data. Then run a chain of at least 3 'so what?' follow-ups in Claude Desktop until you arrive at an insight that genuinely surprised you or changed how you're thinking about something.\n\nPaste the chain here and reflect on what made this different from just looking at the raw data.",
        fields: [
          {
            id: 'starting_data',
            label: 'The starting data (brief summary of what you pulled from Exercise 3.2):',
            placeholder:
              "Brief description of the dataset: [what you queried, what it showed in 2-3 sentences]",
            rows: 4,
            required: true,
          },
          {
            id: 'so_what_chain',
            label: "Your 'so what?' chain (at least 3 follow-up prompts and their key responses):",
            placeholder:
              "Follow-up 1: '[Your question]'\nClaude's response: [Key point from response]\n\nFollow-up 2: '[Your question]'\nClaude's response: [Key point]\n\nFollow-up 3: '[Your question]'\nClaude's response: [Key point]\n\n(Add more if you got deeper)",
            rows: 12,
            required: true,
          },
          {
            id: 'unexpected_insight',
            label: "The insight you didn't expect at the start:",
            placeholder:
              "What did you arrive at that you didn't have when you started? What changed about how you're thinking about this?",
            rows: 4,
            required: true,
          },
        ],
      },
      coachContext: `Evaluate the 'from data to insight' exercise. Checks:
(1) Did they actually chain 3+ follow-up questions, or just ask one and stop?
(2) Do the follow-ups genuinely deepen the analysis — moving from 'what' to 'so what' to 'now what'?
(3) Is the unexpected insight genuinely surprising, or is it a restatement of the original data?
(4) If they used compass_get_user_btm_detail or posthog__query-run, the follow-ups should push past raw metrics into behavioral or strategic conclusions (e.g., from "hosts with 3+ listings have higher BtM" to "maybe it's not the number of listings but the engagement pattern — hosts who use the platform more actively have higher BtM regardless of portfolio size").
The 'unexpected insight' should feel like a real discovery. If it just restates the data, push them to keep asking 'so what?' until they arrive somewhere genuinely new.`,
      evaluationCriteria: [
        'At least 3 follow-up questions forming a genuine chain',
        'Each follow-up goes deeper than the previous (not lateral)',
        'The unexpected insight is genuinely different from the starting data',
        'Shows evidence of thinking, not just data reporting',
      ],
    },

    // ── Exercise 3.4 ─────────────────────────────────────────────────────────
    {
      id: '3.4',
      title: 'Build an Artifact',
      duration: '30 min',
      type: 'nexus_walkthrough',
      skill: 'Creating Claude Artifacts from Nexus data — self-contained, shareable outputs',
      intro:
        "Claude Artifacts are self-contained outputs — React components, HTML pages, Markdown docs — that exist as standalone things you can share, embed, or build on. They're not chat responses. They're deliverables.\n\nThe combination of Nexus-Product data + Claude Artifacts is one of the most powerful things you can do without writing a single line of code yourself. You pull real data, tell Claude what to build with it, and you get a shareable dashboard, report, or analysis doc in minutes.",
      learningObjective:
        "You'll build a real, useful Claude Artifact using Nexus-Product data — something your team could actually use, not a demo.",
      content: {
        type: 'nexus_walkthrough',
        artifactTypes: [
          {
            type: 'React Component',
            useWhen: 'Interactive dashboards, filterable tables, visual summaries',
            prompt: "Create a React artifact that displays this data as an interactive dashboard with [specific features]...",
            bestFor: 'Data-heavy outputs where filtering/sorting matters',
          },
          {
            type: 'HTML Page',
            useWhen: 'Standalone reports, formatted summaries, visual presentations',
            prompt: "Create an HTML artifact that formats this analysis as a clean, shareable report with [specific sections]...",
            bestFor: 'Executive summaries, stakeholder-facing outputs',
          },
          {
            type: 'Markdown Document',
            useWhen: 'Research synthesis, structured documents, wiki-ready content',
            prompt: "Create a Markdown artifact that synthesizes this data into a structured research document with [specific sections]...",
            bestFor: 'Notion/Confluence docs, user research reports',
          },
        ],
        prompts: [
          {
            label: 'Step 1 — Pull the data with the right Nexus tools:',
            prompt: `For a customer health / performance artifact (PM):
Use compass_get_customer_info to get account details, then compass_get_user_btm_detail for BtM performance, then compass_get_user_lamen_daily_evolution for the trend over the last 90 days. Give me the results and a brief summary of what the data shows for this customer.

For a product analytics / usage artifact (Design or PM):
Use posthog__query-run to pull [specific event or metric] for the past 30 days, segmented by [user type / feature / date]. Then use posthog__insights-get-all to see if there's already a saved insight for this. Summarize what the data shows.

For a support patterns artifact:
Use kustomer_get_conversations with a filter for [product area or date range]. Categorize the issues and identify the top 3 recurring problems. Use kustomer_get_beyond_tree to see how these map to the official support taxonomy.`,
            tip: 'Choose the tool combination based on what your artifact needs to show. Customer-facing = compass_get_*. Product usage = posthog__*. User pain = kustomer_*.',
          },
          {
            label: 'Step 2 — Build the artifact (PM track):',
            prompt: "Using the data above, create a React artifact that serves as a [type of dashboard] for [specific audience]. It should: (1) show [key metric — e.g., BtM score, LAMEN trend, or activation rate] prominently, (2) allow filtering by [dimension], (3) highlight [specific insight] visually. Make it clean enough to share with [stakeholder — e.g., your Head of Product, an Account Manager].",
            tip: 'Name the specific audience and the decision this dashboard should inform before building.',
          },
          {
            label: 'Step 2 — Build the artifact (Design track):',
            prompt: "Using the data above (support tickets from kustomer_get_conversations or usage data from posthog__*), create a Markdown artifact that serves as a user research synthesis. Structure it with: executive summary (3 bullets), key user segments, behavioral patterns per segment, top 3 friction points, and open questions for further research. Write it for a design critique or sprint planning session.",
            tip: 'Frame through user behavior, not business metrics. What does this data tell us about what users are trying to do?',
          },
          {
            label: 'Step 3 — Iterate with the "would you use it?" test:',
            prompt: `Acting as a skeptical [your stakeholder role — Account Manager / Head of Product / Product Designer], review this artifact. Would you actually open it in a meeting or send it to someone?
- What's missing that would make it more immediately useful?
- What's confusing that would make someone need to ask for context?
- Make these changes: [list 2-3 specific improvements based on the feedback]`,
            tip: "Artifacts are editable. One round of feedback usually gets you 80% of the way to perfect. Don't skip this step.",
          },
        ],
      },
      task: {
        instructions:
          "Build a Claude Artifact using real Nexus-Product data. It must:\n\n✓ Be based on actual Nexus data you pulled (not made-up numbers)\n✓ Be genuinely useful to your team — not a demo artifact nobody would actually use\n✓ Be shareable (via Claude's artifact sharing or as a copy-paste)\n\nPM roles: build a data summary dashboard or analysis report for a real product decision your team is facing.\nDesign roles: build a user research synthesis doc or user segment summary that would be useful in a design review.",
        fields: [
          {
            id: 'problem_solved',
            label: 'What real problem or question does this artifact answer?',
            placeholder:
              "Be specific: 'This answers [question] for [audience] who currently have to [painful alternative] to get this information.'",
            rows: 3,
            required: true,
          },
          {
            id: 'data_source',
            label: 'What Nexus data did you pull and what did it show? (brief summary)',
            placeholder: 'Summarize the data: what you queried, key numbers/patterns you found...',
            rows: 4,
            required: true,
          },
          {
            id: 'artifact_content',
            label: 'Paste the artifact content or code here:',
            placeholder:
              "Paste the React component code, HTML, or Markdown content of your artifact.\n\nIf it's very long, paste the key sections and describe what the rest contains.",
            rows: 14,
            required: true,
          },
          {
            id: 'how_used',
            label: "Who would use this and when? How would you share it with your team?",
            placeholder:
              "Who's the audience? What decision or meeting would this inform? How would you share it (Slack, Notion, Claude sharing, print)?",
            rows: 3,
            required: true,
          },
        ],
      },
      coachContext:
        "Evaluate the user's Nexus artifact. Check: (1) Is the problem statement specific and real — does it name a real audience and a real question? (2) Is there evidence of actual Nexus data (specific numbers, real metrics) vs. made-up data? (3) Is the artifact genuinely useful — would a team member actually use this in their work, or is it a demo? (4) Is the artifact complete and functional, or is it a sketch? (5) PM artifacts: does it give actionable insight, not just raw data displayed? Design artifacts: does it synthesize patterns, not just list facts? The key test: could someone receive this artifact without any additional context and immediately understand what it's telling them?",
      evaluationCriteria: [
        'Problem statement is specific and connects to real team work',
        'Data is from actual Nexus queries (not illustrative/made up)',
        'Artifact is genuinely useful (passes the "team would actually use this" test)',
        'Artifact is complete and self-explanatory without extra context',
      ],
    },

    // ── Exercise 3.5 ─────────────────────────────────────────────────────────
    {
      id: '3.5',
      title: 'The Sharing Game',
      duration: '20 min',
      type: 'reflection',
      skill: 'Using CRIT-structured feedback to iterate on AI artifacts collaboratively',
      intro:
        "The fastest way to improve an AI artifact is to get someone else to break it. Collaboration patterns with AI are still being invented — most teams haven't figured out how to use shared AI outputs as starting points for group refinement.\n\nToday you're going to practice a specific pattern: share your artifact with your learning buddy, give them a CRIT-structured feedback prompt to use, and use their response to improve the artifact.",
      learningObjective:
        "You'll practice the artifact feedback loop: share → structured feedback → iterate → document what changed and why.",
      content: {
        type: 'patterns',
        patterns: [
          {
            name: 'The Feedback Request Prompt',
            prompt: "I built a Claude Artifact using Beyond data: [paste artifact or describe it]. I'm using it for [specific purpose] with [specific audience].\n\nAs my feedback partner: (1) What's most useful about this? (2) What's missing that would make it more actionable? (3) What would you need to see differently to actually use it in your work? Be specific — I'm going to use this to revise it.",
            when: 'Use this when sharing with your buddy',
          },
          {
            name: 'The Iteration Prompt',
            prompt: "Based on this feedback: [paste feedback]\nMake these changes to the artifact: [list changes]. Keep everything else the same. Then tell me what you changed and why.",
            when: "After you've received feedback from your buddy",
          },
          {
            name: 'The "Would You Use It?" Test',
            prompt: "Honest question: would you actually use this artifact in your day-to-day work? If not, what would need to change for you to open it in a meeting or send it to a stakeholder?",
            when: 'The ultimate quality check — if the answer is no, it needs work',
          },
        ],
      },
      task: {
        instructions:
          "Share your artifact from Exercise 3.4 with your learning buddy (or a colleague) using the feedback pattern above.\n\nIf you don't have a buddy, use the AI Coach to simulate feedback — ask: 'Acting as a skeptical product designer reviewing this dashboard, give me CRIT-structured feedback. What would you need changed to actually use this in your work?'\n\nAfter getting feedback: make at least 2 meaningful changes to your artifact based on what you learned.",
        fields: [
          {
            id: 'how_shared',
            label: 'How did you share the artifact and who did you share it with?',
            placeholder:
              "Claude sharing link, screenshot, Slack, etc. Who reviewed it — buddy, colleague, or AI?",
            rows: 2,
            required: true,
          },
          {
            id: 'feedback_received',
            label: 'The feedback you received (paste or summarize):',
            placeholder:
              "What did they say was most useful? What was missing? What would need to change for them to use it?",
            rows: 5,
            required: true,
          },
          {
            id: 'changes_made',
            label: 'The 2+ changes you made to the artifact based on feedback:',
            placeholder:
              "Change 1: [What you changed] — because [the feedback said...]\nChange 2: [What you changed] — because...",
            rows: 5,
            required: true,
          },
          {
            id: 'collaboration_learning',
            label: "What did you learn about the difference between 'useful to me' vs. 'useful to someone else'?",
            placeholder:
              "What assumptions had you made in the artifact that your reviewer didn't share? What made the gap visible?",
            rows: 3,
            required: true,
          },
        ],
      },
      coachContext:
        "Evaluate the sharing and feedback exercise. Check: (1) Did they actually share the artifact (vs. just imagining feedback)? Look for specific feedback content that would only come from a real review. (2) Are the changes meaningful — do they reflect genuine response to the feedback, or are they cosmetic? (3) Is the collaboration learning genuinely insightful — do they identify a specific assumption gap between their perspective and the reviewer's? The best responses will show that the review changed something real about the artifact, not just tweaked labels.",
      evaluationCriteria: [
        'Evidence of actual sharing (specific feedback content)',
        'Changes are meaningful, not cosmetic',
        'Iteration prompt is used correctly to revise the artifact',
        'Collaboration learning identifies a real assumption gap',
      ],
    },

    // ── Exercise 3.6 ─────────────────────────────────────────────────────────
    {
      id: '3.6',
      title: 'Capstone: The Team-Useful Artifact',
      duration: '35 min',
      type: 'capstone',
      skill: 'Building and shipping a genuinely useful Nexus-powered artifact for your real team',
      intro:
        "This capstone has one test: would your team actually use this?\n\nNot 'it's a good demo.' Not 'it shows what's possible.' Would someone on your team open this artifact in a meeting, send it to a stakeholder, or reference it when making a decision? That's the bar.\n\nYou're going to build something real, for a real need, using real Nexus data. Then you're going to share it with your actual team.",
      learningObjective:
        "Deliver a Nexus-powered artifact that solves a real problem your team has — and actually share it with them.",
      content: {
        type: 'walkthrough',
        steps: [
          {
            number: 1,
            title: 'Identify the real need',
            description:
              "What does your team currently not know that they should? What question comes up repeatedly in stand-ups, planning sessions, or 1:1s that nobody has a good answer to? That's your artifact's job.",
            tip: "The best artifacts answer a question people keep having to look up or estimate. If it exists already in a dashboard, don't rebuild it — answer the question that isn't answered yet.",
          },
          {
            number: 2,
            title: 'Choose and pull the right Nexus data',
            description:
              "Match the tool to the question. Customer health → compass_get_customer_info + compass_get_user_btm_detail + compass_get_user_lamen_daily_evolution. Product behavior → posthog__query-run. User pain → kustomer_get_conversations. Sales context → compass_get_salesforce_accounts. Churn investigation → all of the above combined.",
            tip: "Write this sentence first: 'This artifact will tell [audience] [specific thing] so they can [specific action] — and I'll get the data from [specific tool(s)].' Then execute that plan.",
          },
          {
            number: 3,
            title: 'Build the artifact with iteration',
            description:
              "Build a first version, then critique it yourself with the 'would you use it?' test. Make at least one round of self-directed improvements before submitting.",
            tip: 'Ask Claude: "Acting as a skeptical [role], what would make you actually use this artifact vs. ignore it?"',
          },
          {
            number: 4,
            title: 'Share with your actual team',
            description:
              "Share the artifact — in Slack, at a meeting, in a Notion doc. You don't need permission. Share it as 'I built this quick AI-assisted analysis — curious if it's useful?' Lower the stakes, see if it lands.",
            tip: "The act of sharing is part of the exercise. An unshared artifact helped nobody.",
          },
        ],
      },
      task: {
        instructions:
          "Build and share a Nexus-powered artifact that solves a real problem your team has. The AI Coach will evaluate it against the 'team-useful' bar: would your team actually use this?\n\nSubmit: the problem it solves, the data you pulled, the artifact itself, and evidence that you shared it (even just a screenshot of the Slack message).",
        fields: [
          {
            id: 'real_problem',
            label: 'The real problem this solves for your team (be specific):',
            placeholder:
              "'We always have to [painful thing] to find out [specific information]. This artifact answers that question directly.' Be specific about the audience and the pain.",
            rows: 4,
            required: true,
          },
          {
            id: 'query_intent',
            label: 'Your query intent statement and the Nexus data you pulled:',
            placeholder:
              "'This artifact will tell [audience] [specific thing] so they can [specific action].'\n\nData pulled: [describe the Nexus query and what it returned]",
            rows: 5,
            required: true,
          },
          {
            id: 'artifact',
            label: 'The artifact (paste code, Markdown, or full content):',
            placeholder: 'Paste the complete artifact here...',
            rows: 16,
            required: true,
          },
          {
            id: 'shared_evidence',
            label: 'How you shared it and how the team responded:',
            placeholder:
              "Where you shared it, how you framed it, and any response/feedback you got from the team.",
            rows: 4,
            required: true,
          },
        ],
      },
      coachContext:
        "This is the Level 3 capstone — evaluate it against the 'team-useful' bar. (1) Is the problem statement specific enough that you could verify whether the artifact answers it? Generic problems ('understand customers better') fail this test; specific ones ('know which enterprise hosts are at churn risk this month') pass. (2) Is the query intent statement filled with specific nouns — a real audience, a specific piece of information, a specific action? (3) Is the artifact complete, visually clean, and self-explanatory to someone who wasn't in the room? (4) Is there evidence of actual sharing — even informal ('posted in Slack, got 2 replies')? Unshared artifacts get penalized. (5) Overall: is this genuinely team-useful, or is it a well-made demo? Give a clear verdict and specific improvements if needed.",
      evaluationCriteria: [
        'Problem statement names a specific pain point with specific audience',
        'Query intent statement is specific (specific audience, information, action)',
        'Artifact is complete and self-explanatory without extra context',
        'Evidence of actual sharing with the team',
        'Passes the "team-useful" test overall',
      ],
    },
  ],

  assessment: {
    title: 'Level 3 Assessment',
    questions: [
      {
        id: 'q3_1',
        text: 'What is the key difference between a data query and an insight?',
        options: [
          'A) A query pulls more data; an insight pulls less',
          "B) An insight is the 'so what' — a conclusion that changes how you think or act, derived by following up data with analytical questions",
          'C) Insights come from bigger datasets than queries',
          'D) A query is done by a tool; an insight is done by a person',
        ],
        correct: 'B',
        explanation:
          "Data is not insight. The 'so what?' chain transforms raw data into conclusions that change decisions.",
      },
      {
        id: 'q3_2',
        text: "What is the best test for whether a Claude Artifact is worth sharing with your team?",
        options: [
          "A) It looks visually impressive",
          "B) It took a long time to build",
          "C) Someone would open it in a meeting, send it to a stakeholder, or reference it when making a decision — without additional context",
          "D) It contains a lot of data",
        ],
        correct: 'C',
        explanation:
          "The team-useful test: would someone actually use it without hand-holding? If yes, it's worth sharing. If no, it's a demo.",
      },
      {
        id: 'q3_3',
        text: "Why is 'Show me all our customers' a bad Nexus query?",
        options: [
          'A) Nexus cannot handle large queries',
          "B) It violates data privacy rules",
          "C) It returns data too broad to be actionable — you need a specific question to pull data that tells you something",
          "D) It's too simple for Claude to understand",
        ],
        correct: 'C',
        explanation:
          "Broad queries return noise. The power of Nexus is in targeted queries that answer specific questions with specific constraints.",
      },
    ],
    selfReflection: {
      id: 'sr3',
      question:
        "What's the most valuable insight you discovered using Nexus-Product this level? How would you have found this without AI-assisted querying?",
      placeholder:
        "Name the specific insight and how long it would have taken to find it the traditional way (data team request, manual spreadsheet, etc.).",
    },
  },

  milestone: {
    title: 'Small Portfolio Status!',
    emoji: '🏘️',
    message:
      "You pulled real data, built real artifacts, and shipped something your team can actually use. That's not a training exercise — that's a workflow. You're not just prompting anymore; you're building with AI.",
    gerardJokeId: 'beyond_1',
    nextLevelTeaser:
      "Level 4 is where the craft gets sophisticated. Multi-step chains, LLM-as-judge, model selection, and building a prompt library your future self will thank you for.",
  },
}
