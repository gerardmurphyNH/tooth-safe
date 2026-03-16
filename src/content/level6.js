// ─── Level 6: The Destination Definer ────────────────────────────────────────
// Full content — BMAD method, Claude Code, agentic workflows, meta-learning
//
// Focus: Zooming out to the meta-level — how do you architect your AI working
// environment so that tools, workflows, and habits compound over time?

export const LEVEL6 = {
  id: 6,
  title: 'The Destination Definer',
  theme: "You're not just using AI — you're building your AI operating system",
  focus: 'BMAD method, Claude Code, agentic workflows, and personal AI architecture',
  duration: '~2.5 hours',
  icon: '🗺️',
  propertyStage: 'destination',
  color: '#02556c',
  locked: false,
  comingSoon: false,
  description:
    "Graduate from AI user to AI architect. Learn Claude Code, install the BMAD method, generate a full PRD, design agentic workflows, and document your personal AI Operating System.",

  exercises: [
    // ── Exercise 6.1 ──────────────────────────────────────────────────────────
    {
      id: '6.1',
      title: 'Code Camp',
      duration: '20 min',
      type: 'walkthrough',
      skill: "Demystifying Claude Code and the terminal for non-engineers",
      intro:
        "Here's a secret: Claude Code isn't really about code. It's about giving Claude direct access to your file system so it can read, write, and run things without you copy-pasting between windows.\n\nFor PMs and designers, that means generating full documents, restructuring folders, running scripts, and creating artifacts — all through conversation. You don't need to know how to code. You need to know what you want.",
      learningObjective:
        "You'll install and configure Claude Code, run your first 3 commands, and understand why this is different from claude.ai.",
      content: {
        type: 'walkthrough',
        steps: [
          {
            step: 1,
            title: 'Install Claude Code',
            description:
              "Open your Terminal (Mac: Cmd+Space → 'Terminal') and run the install command. This is the only time you'll need to trust a command you didn't write.",
            prompt: `npm install -g @anthropic-ai/claude-code`,
            callout:
              "If you see a permissions error, prefix with sudo. If npm isn't installed, install Node.js first from nodejs.org.",
          },
          {
            step: 2,
            title: 'Configure your API key',
            description:
              "Claude Code needs your Anthropic API key to work. You'll set this as an environment variable — a persistent setting that programs can read.",
            prompt: `export ANTHROPIC_API_KEY="your-key-here"\n# Add this line to ~/.zshrc so it persists across sessions`,
            callout:
              "Get your API key from console.anthropic.com. The key starts with sk-ant-...",
          },
          {
            step: 3,
            title: 'Your first Claude Code session',
            description:
              "Navigate to a folder with some files — maybe your Documents or a project folder — and start Claude Code.",
            prompt: `cd ~/Documents\nclaude`,
            callout:
              "You should see the Claude Code welcome screen. Type 'hello' and press Enter. Claude can now see everything in ~/Documents.",
          },
          {
            step: 4,
            title: 'Ask Claude about your folder',
            description:
              "Now try something real. Ask Claude to describe what's in your current folder and suggest how you might organize it better.",
            prompt: `"Look at the files in this folder and give me a brief description of what each one is, then suggest 3 ways I could organize this folder better for my role as a PM/designer."`,
            callout:
              "Notice how Claude reads actual file names and contents — it's not guessing. This is the superpower.",
          },
          {
            step: 5,
            title: 'Generate your first document',
            description:
              "Ask Claude to create something real — a meeting notes template, a project brief, anything you actually need.",
            prompt: `"Create a meeting notes template for my 1:1s with my manager. Save it as meeting-notes-template.md in this folder. Include sections for wins, blockers, questions, and next week's focus."`,
            callout:
              "Claude will write the file directly to your filesystem. Go check — it's actually there.",
          },
        ],
        reflection:
          "The biggest mindset shift: Claude Code turns Claude from a chat interface into a collaborator that can take action in your environment. What's one workflow you do weekly that involves creating or organizing files?",
      },
      taskFields: [
        {
          id: 'install_status',
          label: 'Did you successfully install Claude Code? Paste the version output.',
          placeholder: 'e.g., Claude Code v1.x.x installed successfully',
          type: 'text',
        },
        {
          id: 'first_output',
          label: 'What did Claude say when you asked about your folder? Copy the response.',
          placeholder: 'Paste the response here...',
          type: 'textarea',
        },
        {
          id: 'generated_file',
          label: 'What file did Claude generate for you? What was in it?',
          placeholder: 'Describe or paste the content...',
          type: 'textarea',
        },
        {
          id: 'aha_moment',
          label: 'What was your "aha moment" with Claude Code vs. claude.ai?',
          placeholder: 'The key difference I noticed was...',
          type: 'textarea',
        },
      ],
      coachContext:
        "This is the user's first hands-on experience with Claude Code. Focus on demystifying the terminal, validating that the install worked, and highlighting the file-system superpower. Celebrate any successful install. Help troubleshoot common issues (permissions, npm not found, API key). Emphasize: this is about workflows, not about learning to code.",
      evaluationCriteria: [
        'Claude Code is installed and running',
        'User ran at least 3 commands',
        'User articulates the difference between Claude Code and claude.ai',
        'User identifies a real workflow to apply this to',
      ],
    },

    // ── Exercise 6.2 ──────────────────────────────────────────────────────────
    {
      id: '6.2',
      title: 'The BMAD Installation',
      duration: '25 min',
      type: 'walkthrough',
      skill: "Installing and configuring the BMAD method for structured AI-assisted product work",
      intro:
        "BMAD (Break My Agile Dogma) is a structured method for using AI to generate high-quality product and engineering documents — PRDs, architecture docs, user stories, test plans — all from a single conversation.\n\nIt uses a set of AI agents (Analyst, PM, Architect, Developer) that each have specific roles and prompting strategies. The whole system lives in your Claude Code environment.",
      learningObjective:
        "You'll install the BMAD method via Claude Code, understand the agent architecture, and configure it for your role.",
      content: {
        type: 'walkthrough',
        steps: [
          {
            step: 1,
            title: 'Clone the BMAD repository',
            description:
              "In Claude Code (or Terminal), clone the BMAD method repository to your local machine.",
            prompt: `cd ~/Documents\ngit clone https://github.com/bmad-code-org/BMAD-METHOD.git\ncd BMAD-METHOD`,
            callout:
              "If you don't have git, install it via: xcode-select --install (Mac). Or download the repo as a ZIP from the GitHub page.",
          },
          {
            step: 2,
            title: 'Explore the structure',
            description:
              "Ask Claude Code to explain what you just downloaded. Understanding the structure is more important than memorizing every file.",
            prompt: `"I just cloned the BMAD method. Can you explore this folder structure and give me a plain-English explanation of what each major folder and file does? Focus on what a PM or designer would actually use day-to-day."`,
            callout:
              "BMAD typically includes: agent definitions (analyst, pm, architect), templates, and an orchestrator that coordinates them.",
          },
          {
            step: 3,
            title: 'Review the PM agent',
            description:
              "Find and read the PM agent definition. This is the AI persona that will help you write PRDs and strategy documents.",
            prompt: `"Find the PM agent definition in this repo and summarize: (1) what role it plays, (2) what inputs it needs, (3) what outputs it produces, and (4) how I would use it in a real project."`,
            callout:
              "Pay attention to any 'system prompt' or 'persona' sections — these are the instructions that shape how Claude behaves in the PM role.",
          },
          {
            step: 4,
            title: 'Configure for your context',
            description:
              "BMAD works best when you add company-specific context. Create a configuration file that tells the agents about Beyond.",
            prompt: `"Create a file called beyond-context.md in this folder. It should include: (1) company overview, (2) product overview (STR dynamic pricing), (3) key metrics we care about (ARR, activation rate, churn), (4) our main customer segment (STR hosts), and (5) the PM/Design team structure. I'll use this as shared context in every BMAD session."`,
            callout:
              "You can edit the beyond-context.md file Claude creates to add accurate details. This becomes your AI's 'company briefing'.",
          },
          {
            step: 5,
            title: 'Run your first BMAD command',
            description:
              "Test the installation by asking the PM agent to help you think through a real product problem.",
            prompt: `"Act as the BMAD PM agent. Use the beyond-context.md file I just created. I want to explore the problem of low host activation (currently 5%). Run me through the problem definition step of the BMAD process."`,
            callout:
              "A successful BMAD session feels different from normal chat — it's more structured, follows a defined process, and produces artifacts you can reuse.",
          },
        ],
        reflection:
          "BMAD's power is in the structure, not the magic. By defining roles and processes upfront, you get consistent, reusable outputs instead of one-off answers. What's one document type you create repeatedly that BMAD could systematize?",
      },
      taskFields: [
        {
          id: 'install_confirmation',
          label: 'Confirm BMAD is installed. What files are in the root of the BMAD-METHOD folder?',
          placeholder: 'List the main files/folders you see...',
          type: 'textarea',
        },
        {
          id: 'pm_agent_summary',
          label: "What does the PM agent do? Summarize in 3 bullets.",
          placeholder: '1. \n2. \n3. ',
          type: 'textarea',
        },
        {
          id: 'beyond_context',
          label: 'Paste the beyond-context.md file Claude created (or your edited version).',
          placeholder: 'Paste the file contents here...',
          type: 'textarea',
        },
        {
          id: 'first_bmad_output',
          label: "What did the PM agent produce when you asked about host activation?",
          placeholder: 'Paste or summarize the output...',
          type: 'textarea',
        },
      ],
      coachContext:
        "The user is installing and configuring the BMAD method. Focus on: (1) validating the installation worked, (2) ensuring they understand the agent architecture (not just blindly following steps), (3) helping them personalize the beyond-context.md with accurate company details, (4) celebrating that they're now set up for the PRD exercise. If they're stuck on git/install, offer the manual ZIP download as an alternative.",
      evaluationCriteria: [
        'BMAD is cloned and accessible in Claude Code',
        'User can explain the PM agent\'s role',
        'beyond-context.md is created with meaningful Beyond-specific content',
        'User ran at least one BMAD agent command successfully',
      ],
    },

    // ── Exercise 6.3 ──────────────────────────────────────────────────────────
    {
      id: '6.3',
      title: 'PRD From Scratch',
      duration: '35 min',
      type: 'framework',
      skill: "Using BMAD to generate a complete, stakeholder-ready PRD for a real project",
      intro:
        "A PRD (Product Requirements Document) is where strategy meets engineering. A bad PRD wastes sprints. A great PRD creates alignment, surfaces hidden assumptions, and gives engineers exactly what they need to start building.\n\nBMAD can generate a solid PRD v1 in minutes — but the skill is in the iteration. AI-generated PRDs are optimistic. Your job is to make them realistic.",
      learningObjective:
        "You'll use BMAD to generate a full PRD for a real project you're working on (or the host activation problem), then stress-test it through 3 rounds of adversarial critique.",
      content: {
        type: 'framework',
        framework: {
          name: "BMAD PRD Generation Process",
          description:
            "A structured 4-phase process for using AI to generate PRDs that are actually useful in engineering planning.",
          elements: [
            {
              letter: '1',
              name: 'Problem Framing',
              description: 'Define the problem before generating solutions. BMAD\'s Analyst agent helps surface the right questions.',
              example: "Run the BMAD Analyst on your problem. Output: validated problem statement + key assumptions to test.",
              color: '#3bc1cc',
            },
            {
              letter: '2',
              name: 'Requirements Generation',
              description: 'Ask the PM agent to generate user stories, acceptance criteria, and non-functional requirements.',
              example: "BMAD PM generates 3 user epics, 15+ stories, and explicit out-of-scope items.",
              color: '#ee3968',
            },
            {
              letter: '3',
              name: 'Adversarial Review',
              description: 'Switch to adversarial mode and stress-test the PRD. Find the gaps before engineering does.',
              example: "\"Act as a skeptical senior engineer. What are the 5 most problematic assumptions in this PRD?\"",
              color: '#02556c',
            },
            {
              letter: '4',
              name: 'Stakeholder Polish',
              description: 'Refine for your specific audience. Engineering needs different detail than execs.',
              example: "\"Rewrite the executive summary section for our Head of Product who will read this in 3 minutes.\"",
              color: '#252f38',
            },
          ],
        },
        prompts: [
          {
            phase: 'Phase 1: Problem Framing',
            prompt: `Act as the BMAD Analyst. Use the beyond-context.md file for company context.\n\nI want to generate a PRD for [your project — or: improving Beyond's host activation rate from 5% to 15% within 2 quarters].\n\nBefore we jump to solutions, run me through your problem framing process:\n1. Help me articulate the problem statement in user terms\n2. Identify what we know vs. what we're assuming\n3. Clarify the success metrics and how we'd measure them\n4. Flag any risks or constraints I should be thinking about`,
          },
          {
            phase: 'Phase 2: Requirements Generation',
            prompt: `Now act as the BMAD PM agent. Based on the problem framing we just did:\n\n1. Generate 3 user epics (each with a "As a [user], I want [goal], so that [outcome]" structure)\n2. For the highest-priority epic, generate 5-8 user stories with acceptance criteria\n3. List 5 explicit out-of-scope items for this v1\n4. Define what "done" looks like for the entire initiative`,
          },
          {
            phase: 'Phase 3: Adversarial Review',
            prompt: `Now switch personas: you are a skeptical senior engineer who has been burned by vague PRDs before.\n\nReview the PRD we just generated and give me:\n1. Top 5 assumptions that could kill this project if they're wrong\n2. Any user stories that are underspecified (where you'd ask "but what exactly happens when X?")\n3. Missing edge cases that will become bugs\n4. One question you'd ask in sprint planning that I haven't answered yet`,
          },
          {
            phase: 'Phase 4: Stakeholder Polish',
            prompt: `Now act as a skilled product writer. Take the full PRD we've built and:\n\n1. Write a 3-sentence executive summary for our Head of Product (reads in 90 seconds, decision-maker)\n2. Write a 2-paragraph engineering brief for our tech lead (needs enough detail to estimate story points)\n3. Flag any sections that should be removed from the version we share externally`,
          },
        ],
      },
      taskFields: [
        {
          id: 'project_choice',
          label: 'What project did you choose for your PRD?',
          placeholder: 'e.g., Host activation improvement / [your real project]',
          type: 'text',
        },
        {
          id: 'problem_statement',
          label: 'Paste the problem statement the BMAD Analyst generated.',
          placeholder: 'Paste from your Claude Code session...',
          type: 'textarea',
        },
        {
          id: 'top_epic',
          label: 'Paste your highest-priority epic + its user stories.',
          placeholder: 'Epic: ...\nUser stories:\n1. ...',
          type: 'textarea',
        },
        {
          id: 'adversarial_findings',
          label: 'What were the top 3 adversarial findings? Did any surprise you?',
          placeholder: '1. \n2. \n3. \nSurprising: ...',
          type: 'textarea',
        },
        {
          id: 'exec_summary',
          label: 'Paste the executive summary the AI generated (then note: did you edit it?).',
          placeholder: 'Executive summary: ...\nEdits I made: ...',
          type: 'textarea',
        },
      ],
      coachContext:
        "The user is using BMAD to generate a real PRD. Evaluate: (1) Did they choose a real project or the example? Real is better. (2) Does the problem statement clearly separate the problem from solutions? (3) Are the user stories specific enough that an engineer could estimate them? (4) Did the adversarial review reveal anything genuinely surprising? (5) Is the exec summary actually concise and decision-oriented? Push them to iterate if the PRD feels generic — the goal is a document they'd actually use.",
      evaluationCriteria: [
        'Problem statement is user-centric and separates problem from solution',
        'User stories have clear acceptance criteria',
        'At least 3 adversarial findings identified',
        'Executive summary is under 100 words and decision-oriented',
        'User iterated based on adversarial feedback',
      ],
    },

    // ── Exercise 6.4 ──────────────────────────────────────────────────────────
    {
      id: '6.4',
      title: 'The Agentic Workflow',
      duration: '25 min',
      type: 'patterns',
      skill: "Designing multi-step AI workflows for recurring weekly tasks",
      intro:
        "Most people use AI for one-shot tasks: write this, summarize that. But the real leverage is in workflows — sequences of AI steps that automate something you do repeatedly.\n\nAn agentic workflow has three characteristics: it runs multiple steps, each step builds on the previous one, and it produces a usable artifact at the end. Once you design one, you can run it in minutes instead of hours.",
      learningObjective:
        "You'll identify a recurring weekly task, design a 3-5 step AI workflow for it, run it once in Claude Code, and document it so you can reuse it.",
      content: {
        type: 'patterns',
        patterns: [
          {
            name: 'The Weekly Digest',
            description: 'Synthesize notes, Slack threads, or meeting recordings into a structured weekly summary.',
            steps: [
              'Collect: Paste raw notes/threads into Claude Code',
              'Extract: "Pull out all decisions made and open questions"',
              'Structure: "Format as weekly digest: wins, decisions, blockers, next week"',
              'Distribute: "Draft a Slack message for #product summarizing this week"',
            ],
            useCase: 'PMs who write weekly updates',
          },
          {
            name: 'The Brief Builder',
            description: 'Turn a Slack conversation or email thread into a structured project brief.',
            steps: [
              'Input: Paste Slack thread or email chain',
              'Clarify: "What is the actual ask here? Summarize in 2 sentences"',
              'Structure: "Turn this into a project brief with: background, objective, constraints, success metrics"',
              'Review: "What\'s missing from this brief that would trip us up in execution?"',
            ],
            useCase: 'Anyone who gets ad-hoc requests via Slack',
          },
          {
            name: 'The Design Review Prep',
            description: 'Prepare structured critique prompts for an upcoming design review.',
            steps: [
              'Input: Paste design brief or Figma link description',
              'Context: "Here\'s what we\'re reviewing. What are the top design questions to answer in this review?"',
              'Generate: "Create a structured review agenda with time-boxed sections"',
              'Criteria: "What Nielsen heuristics are most relevant to evaluate?"',
            ],
            useCase: 'Designers prepping for crits',
          },
          {
            name: 'The Metrics Narrative',
            description: 'Turn a data dashboard screenshot or number dump into a leadership-ready narrative.',
            steps: [
              'Input: Paste numbers or describe what you\'re seeing in the dashboard',
              'Interpret: "What story do these numbers tell? What\'s trending up/down?"',
              'Contextualize: "Compare to our targets and explain the delta"',
              'Narrate: "Write a 3-sentence business narrative suitable for a leadership weekly"',
            ],
            useCase: 'Anyone who presents metrics in leadership reviews',
          },
        ],
      },
      taskFields: [
        {
          id: 'chosen_workflow',
          label: 'Which weekly task did you choose to turn into a workflow?',
          placeholder: 'e.g., I chose the Weekly Digest / I designed my own for [task]',
          type: 'text',
        },
        {
          id: 'workflow_steps',
          label: 'Document your workflow: list each step with the exact prompt you use.',
          placeholder: 'Step 1: [prompt]\nStep 2: [prompt]\nStep 3: [prompt]',
          type: 'textarea',
        },
        {
          id: 'workflow_output',
          label: 'Paste the final output from running the workflow once.',
          placeholder: 'Paste the artifact Claude produced...',
          type: 'textarea',
        },
        {
          id: 'time_comparison',
          label: 'How long did the workflow take vs. doing it manually?',
          placeholder: 'Manually: ~X minutes. With AI workflow: ~Y minutes.',
          type: 'text',
        },
        {
          id: 'reuse_plan',
          label: 'How will you save this workflow so you can reuse it? (e.g., a prompt file, Claude Project, template)',
          placeholder: 'I\'ll save it as...',
          type: 'textarea',
        },
      ],
      coachContext:
        "The user is designing a reusable AI workflow. Key coaching points: (1) Did they pick a task they actually do weekly — or a hypothetical? Real is better. (2) Are the steps sequential and each building on the last? (3) Does the output artifact look usable — would they send it to a stakeholder as-is, or does it need major editing? (4) Did they save the workflow somewhere reusable? If they designed a custom workflow (not one of the examples), that's worth celebrating.",
      evaluationCriteria: [
        'Workflow is for a real recurring task',
        'Steps are sequential and each builds on the previous',
        'Final output is a usable artifact (not just a conversation)',
        'Time savings are meaningful (>50% reduction)',
        'Workflow is documented in a reusable format',
      ],
    },

    // ── Exercise 6.5 ──────────────────────────────────────────────────────────
    {
      id: '6.5',
      title: 'Your AI Operating System',
      duration: '25 min',
      type: 'reflection',
      skill: "Documenting and systematizing your personal AI stack for compounding returns",
      intro:
        "Elite AI users don't just have good prompts — they have systems. A personal AI Operating System (AI OS) is the documented set of tools, workflows, habits, and principles that govern how you use AI at work.\n\nThe difference between someone who gets 2x leverage from AI and someone who gets 10x is almost never intelligence or creativity. It's system design. The 10x person has documented what works, built habits around it, and set up their environment to make the right thing the easy thing.",
      learningObjective:
        "You'll document your complete personal AI OS: tools, workflows, prompt library, habits, and principles. This becomes your reference document and your onboarding guide if you ever bring someone new onto your team.",
      content: {
        type: 'reflection',
        sections: [
          {
            title: 'Stack Audit',
            description:
              "Before you can document your AI OS, you need to know what you\'re actually using. Don\'t document aspirationally — document what you actually do.",
            prompts: [
              "List every AI tool you used in the last 7 days. Include: tool name, what you used it for, and how often.",
              "For each tool: when does it shine? When does it disappoint you?",
              "Which tool do you default to when you're under time pressure? Why?",
            ],
          },
          {
            title: 'Workflow Inventory',
            description:
              "A workflow is any sequence of AI steps you run more than once. These are your highest-value assets because they compound.",
            prompts: [
              "What AI-assisted workflows have you built during this course? List them.",
              "Which workflows are you running consistently vs. which ones did you try once and forget?",
              "What recurring task in your week still doesn't have an AI workflow? Why not?",
            ],
          },
          {
            title: 'Prompt Library',
            description:
              "Your personal prompt library is a collection of prompts that reliably produce great outputs for your specific role and context. A good library has 10-20 prompts you can run immediately.",
            prompts: [
              "List your top 5 prompts from this course. For each: the situation where you'd use it and why it works.",
              "What's one prompt you've refined more than 3 times to get right? Document the evolution.",
              "Add 3 prompts from your real work that aren't in the course material.",
            ],
          },
          {
            title: 'Habits and Principles',
            description:
              "The best AI users have principles — not just tools. Principles govern how you decide what to use AI for, when to trust AI output, and how to iterate when the output is wrong.",
            prompts: [
              "What's your #1 rule for when NOT to use AI? (Be specific — not 'confidential things' but exactly what and why.)",
              "How do you currently verify AI output before using it with stakeholders?",
              "What habit would make you a meaningfully better AI user in 30 days if you built it now?",
            ],
          },
        ],
        buildPrompt:
          "Now use Claude Code to generate your AI OS document:\n\n\"Based on everything I've documented in the NexusYou course, create my personal AI Operating System document. It should include: (1) my current AI stack with ratings and use cases, (2) my top 5 reusable workflows with step-by-step instructions, (3) my prompt library with 10+ entries organized by category, (4) my principles for when to use/not use AI, and (5) my 30-day improvement plan. Format it as a well-structured Markdown file called ai-operating-system.md.\"",
      },
      taskFields: [
        {
          id: 'stack_list',
          label: 'List your current AI stack (tools you actually use).',
          placeholder: 'Tool | Use Case | Frequency\n------|-----------|----------\nClaude | ... | daily',
          type: 'textarea',
        },
        {
          id: 'top_workflows',
          label: 'List your top 3 AI workflows from this course.',
          placeholder: '1. [workflow name]: [what it does]\n2. ...\n3. ...',
          type: 'textarea',
        },
        {
          id: 'prompt_library',
          label: 'Paste your prompt library (at least 8 entries).',
          placeholder: 'Category | Prompt | When to use\n---------|--------|------------',
          type: 'textarea',
        },
        {
          id: 'top_principle',
          label: 'What is your #1 principle for using AI at work?',
          placeholder: 'My most important principle is...',
          type: 'textarea',
        },
        {
          id: 'ai_os_doc',
          label: 'Paste the ai-operating-system.md file Claude Code generated.',
          placeholder: 'Paste the full document here...',
          type: 'textarea',
        },
      ],
      coachContext:
        "This is a meta-reflection exercise on the user's entire AI journey. The AI OS document is the deliverable. Evaluate: (1) Is the stack audit honest — do they list what they actually use, not what sounds impressive? (2) Are the workflows documented specifically enough to rerun? (3) Is the prompt library genuinely useful — prompts that work for their actual role? (4) Are the principles specific and personal (not generic 'don't use AI for sensitive things')? (5) Does the 30-day plan have clear, measurable actions? Encourage specificity over comprehensiveness — a specific principle they'll actually follow beats five vague ones.",
      evaluationCriteria: [
        'Stack audit reflects actual usage (not aspirational)',
        'At least 3 workflows documented with steps',
        'Prompt library has 8+ entries specific to their role',
        'Principles are specific and personal',
        'ai-operating-system.md is generated and usable',
      ],
    },

    // ── Exercise 6.6 ──────────────────────────────────────────────────────────
    {
      id: '6.6',
      title: 'Capstone: The Final Destination',
      duration: '30 min',
      type: 'capstone',
      skill: "Integrating everything from the course into a complete, stakeholder-ready deliverable",
      intro:
        "You've come through six levels. You've gone from writing basic prompts to running agentic workflows, generating PRDs with BMAD, designing your AI Operating System, and analyzing risk across an entire product initiative.\n\nThe final capstone has two parts: (1) submit your BMAD-generated PRD from Exercise 6.3 as a polished, stakeholder-ready document, and (2) teach back the most important thing you learned in this course to a colleague who hasn't taken it.",
      learningObjective:
        "You'll produce a polished PRD and a teach-back summary that demonstrates mastery — both of the technical skills and the mindset shift.",
      content: {
        type: 'capstone',
        deliverables: [
          {
            title: 'Polished PRD',
            description:
              "Take the PRD from Exercise 6.3 and make it genuinely stakeholder-ready. Run it through one final polish pass: remove AI artifacts, add your voice, ensure every section could be defended in a room.",
            prompt:
              "\"Review my PRD from Exercise 6.3. For each section, tell me: (1) Is this specific enough for engineering to act on? (2) Does this sound like me, or does it sound like AI-generated content? (3) What would a skeptical stakeholder ask that isn't answered here? Revise accordingly.\"",
          },
          {
            title: 'Teach-Back',
            description:
              "Write a 5-10 minute teach-back for a colleague who is where you were at Level 1. Cover: the one mindset shift that matters most, your top 3 most useful prompts, and one workflow they should steal immediately.",
            prompt:
              "\"I need to teach a Beyond colleague the most important things I learned in the NexusYou AI course. They're skeptical that AI is worth the learning curve. Write a compelling 5-minute teach-back that covers: (1) the one mindset shift that changes everything, (2) three prompts they can use tomorrow, (3) one workflow that will save them time this week. Tone: enthusiastic but practical — not hyped.\"",
          },
        ],
        finalReflection: [
          "What's the single biggest change in how you work since starting this course?",
          "Which level felt hardest? Which felt most immediately useful?",
          "What's the first thing you'll do differently on Monday morning?",
          "If you were redesigning this course, what would you add or remove?",
        ],
      },
      taskFields: [
        {
          id: 'polished_prd',
          label: 'Paste your polished, stakeholder-ready PRD.',
          placeholder: 'Paste the final PRD...',
          type: 'textarea',
        },
        {
          id: 'teach_back',
          label: 'Paste your 5-minute teach-back.',
          placeholder: 'Paste the teach-back content...',
          type: 'textarea',
        },
        {
          id: 'biggest_change',
          label: "What's the single biggest change in how you work since starting NexusYou?",
          placeholder: 'The biggest change is...',
          type: 'textarea',
        },
        {
          id: 'monday_action',
          label: "What's the first thing you'll do differently on Monday morning?",
          placeholder: 'On Monday I will...',
          type: 'textarea',
        },
        {
          id: 'course_feedback',
          label: 'If you were redesigning this course, what would you add or remove?',
          placeholder: 'I would add... / I would remove...',
          type: 'textarea',
        },
      ],
      coachContext:
        "This is the final capstone — evaluate holistically across the whole course. For the PRD: does it read like something a PM would actually send to engineering, or does it still have AI tell-signs (excessive hedging, generic language, missing specifics)? For the teach-back: is it compelling? Would a skeptical colleague actually try the prompts they're recommending? The final reflection is qualitative — look for genuine insight, not just 'I learned a lot.' The most valuable feedback: what specific behavior change are they committing to? Hold them to something concrete.",
      evaluationCriteria: [
        'PRD is polished and free of AI artifacts',
        'PRD is specific enough for engineering to estimate',
        'Teach-back includes 3 concrete, reusable prompts',
        'Teach-back tone is practical, not hype',
        'Final reflection identifies a specific Monday action',
      ],
    },
  ],

  assessment: {
    title: 'Level 6 Assessment',
    questions: [
      {
        id: 'q1',
        text: "What is the primary advantage of Claude Code over claude.ai for a PM or designer?",
        options: [
          "A. It uses a more powerful AI model",
          "B. It can read, write, and act on your filesystem directly",
          "C. It has a better interface for long conversations",
          "D. It supports more languages",
        ],
        correct: 'B',
        explanation:
          "Claude Code's superpower for non-engineers is filesystem access — it can read your existing files, create new documents, and take actions in your environment without you copy-pasting between windows.",
      },
      {
        id: 'q2',
        text: "In the BMAD PRD process, what is the purpose of the Adversarial Review phase?",
        options: [
          "A. To make the PRD longer and more comprehensive",
          "B. To get engineering sign-off early",
          "C. To surface hidden assumptions and gaps before engineering finds them",
          "D. To generate user stories automatically",
        ],
        correct: 'C',
        explanation:
          "The adversarial review phase deliberately stress-tests the PRD by asking Claude to play the role of a skeptical engineer — finding the assumptions that could kill the project if they're wrong.",
      },
      {
        id: 'q3',
        text: "What distinguishes an 'agentic workflow' from a regular AI prompt?",
        options: [
          "A. It uses a more powerful model",
          "B. It runs multiple sequential steps where each step builds on the previous one",
          "C. It doesn't require any human input",
          "D. It can access the internet",
        ],
        correct: 'B',
        explanation:
          "An agentic workflow is defined by its multi-step, sequential nature — each step transforms or builds on the output of the previous step, ultimately producing a reusable artifact. This is what separates it from a one-shot prompt.",
      },
    ],
    selfReflection: {
      question:
        "You've completed all six levels of NexusYou. Describe the one thing that most changed your mental model of how to use AI at work. Be specific — not 'I learned to write better prompts' but what specific shift happened and how you'll know when you're doing it.",
      placeholder:
        "The specific mental model shift was...\nI'll know I'm doing it when...",
    },
  },

  milestone: {
    title: "🗺️ Destination Reached — You're an AI Architect",
    message:
      "Six levels. Twelve weeks of exercises. One complete AI Operating System.\n\nYou didn't just learn to use AI — you learned to architect your AI environment. BMAD, Claude Code, agentic workflows, four-risks evaluation, OSTs, design critiques, Nexus data queries... you've built a toolkit that compounds.\n\nThe hosts who thrive aren't the ones with the best properties. They're the ones who built systems. You just built yours.",
    gerardJokeId: 'destination_1',
  },
}
