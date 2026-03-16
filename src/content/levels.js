// ─── NexusYou Course Content ─────────────────────────────────────────────────
// Full content for Levels 1-2. Levels 3-6 imported from separate files.
//
// Exercise types:
//   'comparison'       - Show bad/good examples, user rewrites
//   'framework'        - Teach a framework, user applies it
//   'playground'       - Integration with the Prompt Playground
//   'reflection'       - Written reflection exercise
//   'capstone'         - Multi-step deliverable exercise
//   'walkthrough'      - Step-by-step guided exercise
//   'nexus_walkthrough'- Nexus-Product tool walkthrough with Claude Desktop
//   'model_comparison' - Compare responses across different models
//   'chain'            - Multi-step prompt chain exercise
//   'patterns'         - Pattern-based learning exercise

import { LEVEL3 } from './level3.js'
import { LEVEL4 } from './level4.js'
import { LEVEL5 } from './level5.js'
import { LEVEL6 } from './level6.js'

export const LEVELS = [
  // ─────────────────────────────────────────────────────────────────────────
  // LEVEL 1: The Part-Time Hustle
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 1,
    title: 'The Part-Time Hustle',
    theme: "You've got one listing and a dream",
    focus: 'Prompting fundamentals, mental models, and setting up your AI environment',
    duration: '~2.5 hours',
    icon: '🏠',
    propertyStage: 'starter',
    color: '#3bc1cc',
    locked: false,
    description:
      'Start here. Learn the mental models that separate AI power users from everyone else — how to talk to Claude as a thought partner, not a search engine.',
    exercises: [
      // ── Exercise 1.1 ────────────────────────────────────────────────────
      {
        id: '1.1',
        title: 'Search Query vs. Thought Partner',
        duration: '20 min',
        type: 'comparison',
        skill: 'Transforming vague prompts into rich, contextual thought-partner prompts',
        intro:
          "Most people use AI the same way they use Google — type a quick question, get an answer, move on. This works for facts. It completely misses the point for complex thinking work.\n\nThe real power of Claude isn't information retrieval. It's having a knowledgeable colleague who can think alongside you, challenge your assumptions, and help you see problems from angles you missed. But that only happens when you give it enough to work with.",
        learningObjective:
          "You'll transform a search-query style prompt into a rich thought-partner prompt, and understand exactly why the second version produces dramatically better results.",
        content: {
          type: 'comparison',
          badExample: {
            label: 'Search Query Style ❌',
            prompt: 'What is dynamic pricing?',
            why:
              "This is basically a Google search. You'll get a Wikipedia-style definition — accurate, but useless for your actual work. No context about your role, your problem, or what you actually need to do.",
          },
          goodExample: {
            label: 'Thought Partner Style ✅',
            prompt:
              "I'm a product manager at a dynamic pricing company for short-term rentals. Our customers often don't trust our algorithm's recommendations and override prices manually — sometimes significantly lower, sometimes significantly higher. Help me think through why this might be happening and what product changes could increase trust in automated pricing recommendations without removing customer control.",
            why:
              "This prompt: (1) gives Claude your role and company context, (2) describes a real, specific problem — not just a topic, (3) names a concrete behavior (manual overrides) with nuance (both directions), (4) asks for analysis and ideas rather than just information, (5) includes a key constraint (don't remove control). Every additional piece of context makes the response exponentially more useful.",
          },
          breakdown: [
            {
              label: 'Role + Context',
              icon: '🏠',
              description:
                "Tell Claude who you are and where you work. 'Product manager at a dynamic pricing company' changes everything about what's relevant.",
            },
            {
              label: 'Specific Problem',
              icon: '🔍',
              description:
                "Name the actual thing happening — not 'trust issues' but 'customers override prices manually.' Real behavior, not abstract concept.",
            },
            {
              label: 'What You Need',
              icon: '🎯',
              description:
                "Ask for analysis and ideas, not facts. 'Help me think through why this happens and what to do about it' invites dialogue.",
            },
            {
              label: 'Constraints',
              icon: '⚖️',
              description:
                "Tell Claude what's off the table: 'without removing customer control.' This steers the response toward actually usable solutions.",
            },
          ],
        },
        task: {
          instructions:
            "Below is a search-query style prompt. Your job is to transform it into a thought-partner prompt using what you just learned.\n\nAdd your role at Beyond, describe a real challenge you're facing (or a realistic one), and invite analytical dialogue rather than just a factual answer. Try to hit all four elements from the breakdown above.",
          prompts: {
            pm: "How do I write a good product requirements document?",
            design: "What makes a good user interface?",
            default: "How do I write a good product requirements document?",
          },
          fields: [
            {
              id: 'rewrite',
              label: 'Your thought-partner rewrite:',
              placeholder:
                "Write your upgraded prompt here. Remember: add your role/context at Beyond, describe a specific challenge you're facing, and invite analysis rather than just facts.",
              rows: 7,
              required: true,
            },
          ],
        },
        coachContext:
          "Evaluate whether the user successfully transformed a search query into a thought partner prompt. Look for four key elements: (1) role/context at Beyond explicitly stated, (2) a specific, real challenge or problem (not just a topic), (3) language that invites analysis/dialogue rather than requesting a static fact answer, (4) at least one constraint or nuance that would steer the response. The original prompt was about PRDs (for PM roles) or UI design (for design roles). Penalize if it's still vague or doesn't include their Beyond context. Give specific examples of what to add if anything is missing.",
        evaluationCriteria: [
          'States role and Beyond context explicitly',
          'Describes a specific challenge, not just a topic',
          'Invites analysis/dialogue rather than just information',
          'Includes at least one constraint or nuance',
        ],
      },

      // ── Exercise 1.2 ────────────────────────────────────────────────────
      {
        id: '1.2',
        title: 'The COSTAR Framework',
        duration: '25 min',
        type: 'framework',
        skill: 'Using the COSTAR framework to write structured, high-quality prompts',
        intro:
          "Good prompts aren't just detailed — they're structured. The COSTAR framework gives you six dimensions to fill in, and hitting all six transforms a good prompt into a great one.\n\nCOSTAR is especially useful when you need a specific kind of output: a document, an analysis, a presentation — anything where format and style matter as much as content.",
        learningObjective:
          "You'll learn and apply the COSTAR framework to write a prompt for a real task in your role.",
        content: {
          type: 'framework',
          framework: {
            name: 'COSTAR',
            description:
              "Six dimensions that, when all filled in, produce consistently excellent outputs. Think of it as a briefing document for your AI collaborator.",
            elements: [
              {
                letter: 'C',
                name: 'Context',
                description: 'Background information Claude needs to understand your situation',
                example: "I'm a PM at Beyond, a dynamic pricing platform for STR hosts. We're currently...",
                color: '#3bc1cc',
              },
              {
                letter: 'O',
                name: 'Objective',
                description: 'What you want to achieve — the goal, not just the task',
                example: "I need to build internal alignment on why this feature is worth building now vs. later",
                color: '#02556c',
              },
              {
                letter: 'S',
                name: 'Style',
                description: 'The writing style or approach you want Claude to use',
                example: 'Strategic and analytical, like a senior PM would write',
                color: '#ee3968',
              },
              {
                letter: 'T',
                name: 'Tone',
                description: 'The emotional quality — confident, cautious, enthusiastic, neutral...',
                example: 'Confident but not overselling — this is a hypothesis, not a certainty',
                color: '#3bc1cc',
              },
              {
                letter: 'A',
                name: 'Audience',
                description: 'Who will read or use this output',
                example: 'Engineering lead and design lead who are skeptical of adding scope',
                color: '#02556c',
              },
              {
                letter: 'R',
                name: 'Response Format',
                description: 'How you want the output structured',
                example: '1-page document with: problem statement, proposed solution, success metrics, open questions',
                color: '#ee3968',
              },
            ],
          },
          example: {
            label: 'COSTAR prompt example:',
            prompt:
              "Context: I'm a PM at Beyond, a dynamic pricing platform for STR hosts. We have a 5% conversion rate on 6,000 monthly signups, and our data suggests that hosts who complete setup in the first 48 hours are 3x more likely to stay past 90 days.\n\nObjective: I need to write a concise problem statement for our onboarding improvement initiative that builds internal alignment on why this is the #1 priority.\n\nStyle: Strategic and evidence-driven, like a PM who's done the discovery work and is making a confident recommendation.\n\nTone: Confident but open — presenting a hypothesis we're ready to test, not a certainty.\n\nAudience: Our Head of Product and Head of Engineering, who need to agree to prioritize this over three other competing initiatives.\n\nResponse Format: A 3-paragraph problem statement: (1) what's happening, (2) why it matters, (3) what we believe the solution space is.",
          },
        },
        task: {
          instructions:
            "Write a COSTAR prompt for a real task you're working on. Pick something from your actual work — a document you need to write, an analysis you need to do, or a decision you're wrestling with.\n\nFor PM roles: Write a problem statement for a feature idea your team is considering.\nFor Design roles: Write a design critique request for a flow you're currently working on.\n\nLabel each section (C: O: S: T: A: R:) so the AI Coach can evaluate each dimension.",
          prompts: {
            pm: "Write a COSTAR prompt for a problem statement about a feature idea your team is considering.",
            design: "Write a COSTAR prompt asking for a design critique of a flow you're currently working on.",
            default: "Write a COSTAR prompt for a task you're currently working on at Beyond.",
          },
          fields: [
            {
              id: 'costar_prompt',
              label: 'Your COSTAR prompt (label each section C: O: S: T: A: R:):',
              placeholder:
                "C: [Context — your role, company, background]\nO: [Objective — what you're trying to achieve]\nS: [Style — how Claude should write]\nT: [Tone — emotional quality]\nA: [Audience — who will read this]\nR: [Response Format — how you want the output structured]",
              rows: 10,
              required: true,
            },
          ],
        },
        coachContext:
          "Evaluate the user's COSTAR prompt. Check each of the six elements: C (Context — does it include role, company, relevant background?), O (Objective — does it state the goal, not just the task?), S (Style — specific writing style requested?), T (Tone — emotional quality specified?), A (Audience — specific audience named, with relevant characteristics?), R (Response Format — specific structure or format requested?). Note which elements are strong and which are weak or missing. Give a score like '4/6 COSTAR elements strong' and explain specifically what each weak element needs.",
        evaluationCriteria: [
          'Context includes role, company, and relevant background',
          'Objective states the goal, not just the task',
          'Style is specifically described',
          'Tone is specified with meaningful detail',
          'Audience is named with relevant characteristics',
          'Response format is concrete and specific',
        ],
      },

      // ── Exercise 1.3 ────────────────────────────────────────────────────
      {
        id: '1.3',
        title: 'The CRIT Framework',
        duration: '20 min',
        type: 'framework',
        skill: 'Using the CRIT framework to get high-quality, actionable criticism',
        intro:
          "Getting criticism from AI is usually disappointing. You ask 'What do you think of this?' and you get: 'This is well-structured! A few areas to consider improving...' — vague, safe, almost useless.\n\nThe CRIT framework gets you the sharp, specific feedback you actually want. It tells Claude exactly what role to play, what to look at, and how honest to be.",
        learningObjective:
          "You'll learn to use CRIT to get feedback that's actually useful — specific, role-aware, and calibrated to how much honesty you want.",
        content: {
          type: 'framework',
          framework: {
            name: 'CRIT',
            description:
              "Four elements that turn a vague 'what do you think?' into a focused critique that tells you something you didn't already know.",
            elements: [
              {
                letter: 'C',
                name: 'Context',
                description: 'What you\'re working on and where it\'s at in the process',
                example: "This is a first draft of a product brief I'm about to share with engineering. It's not polished.",
                color: '#3bc1cc',
              },
              {
                letter: 'R',
                name: 'Role',
                description: 'What perspective you want the feedback from',
                example: "Act as a skeptical senior engineer who's been burned by vague requirements before",
                color: '#02556c',
              },
              {
                letter: 'I',
                name: 'Instructions',
                description: 'Specific aspects to focus the critique on',
                example: "Focus on: (1) are the acceptance criteria actually testable?, (2) what's left ambiguous that will cause scope creep?",
                color: '#ee3968',
              },
              {
                letter: 'T',
                name: 'Tone',
                description: "How direct you want the feedback — don't let Claude be polite if you want truth",
                example: "Be direct. Don't soften it. I want to know what's actually wrong, not just areas to consider.",
                color: '#3bc1cc',
              },
            ],
          },
          comparison: {
            label: 'Without vs. with CRIT:',
            without: "What do you think of my product brief?",
            withCRIT:
              "Context: This is a first draft of a product brief for our onboarding improvement initiative. I'm about to share it with the engineering lead.\n\nRole: You are a skeptical senior engineer who's been burned by poorly-specified requirements before and takes pride in catching ambiguity before it becomes technical debt.\n\nInstructions: Review this for: (1) Are the acceptance criteria actually testable, or are they subjective? (2) What's left ambiguous that will cause questions or scope creep? (3) What assumptions am I making that engineering will push back on?\n\nTone: Be direct and specific. Name the specific lines or sections that have problems. Don't soften it — I'd rather be embarrassed now than in front of engineering.\n\n[paste brief here]",
          },
        },
        task: {
          instructions:
            "Write a CRIT prompt for something you're actually working on — a document, a design, a spec, a strategy, a decision. Paste the thing you want critiqued at the end.\n\nIf you don't have something handy, use a recent email, a Slack message you wrote, or a quick paragraph describing a product decision you made recently. Label each CRIT section.",
          prompts: {
            pm: "Write a CRIT prompt asking for critique on a product document, spec, or decision you're working on.",
            design: "Write a CRIT prompt asking for critique on a design decision, flow, or document you're working on.",
            default: "Write a CRIT prompt for something you're currently working on at Beyond.",
          },
          fields: [
            {
              id: 'crit_prompt',
              label: 'Your CRIT prompt (label each section C: R: I: T:) + the work you want critiqued:',
              placeholder:
                "C: [Context — what this is and where it's at in the process]\nR: [Role — what perspective you want the feedback from]\nI: [Instructions — specific things to focus the critique on]\nT: [Tone — how direct you want it]\n\n---\n[Paste what you want critiqued here]",
              rows: 12,
              required: true,
            },
            {
              id: 'reflection',
              label:
                'After running this in Claude (or imagining the response): How is this different from just asking "what do you think?"',
              placeholder: 'What did specifying Role and Instructions change about the type of feedback you got?',
              rows: 3,
              required: false,
            },
          ],
        },
        coachContext:
          "Evaluate the user's CRIT prompt. Check each of the four elements: C (Context — does it describe what the work is and where it's at in the process?), R (Role — is a specific, meaningful role specified that will meaningfully change the perspective of the critique?), I (Instructions — are specific aspects named, not just 'what do you think'?), T (Tone — does it specify the level of directness clearly?). Also check if they included actual work to critique (they should have pasted something). Give specific feedback on what each element should say if it's weak.",
        evaluationCriteria: [
          'Context describes the work and its current stage',
          'Role specifies a meaningful perspective that will change the feedback',
          'Instructions name specific aspects to critique (not just general feedback)',
          'Tone specifies the level of directness desired',
          'Actual work is included to critique',
        ],
      },

      // ── Exercise 1.4 ────────────────────────────────────────────────────
      {
        id: '1.4',
        title: 'Make It Argue With You',
        duration: '25 min',
        type: 'playground',
        skill: 'Adversarial prompting — using AI to pressure-test your ideas and thinking',
        intro:
          "The most dangerous bias in product and design work is confirmation bias — we love our ideas, so we look for reasons they're right and unconsciously avoid reasons they're wrong.\n\nAdversarial prompting is the antidote. You're not asking Claude to agree with you. You're asking it to attack your ideas, find the holes, steelman the opposition, and help you discover what you're missing before you find out the hard way.",
        learningObjective:
          "You'll build a toolkit of adversarial prompt patterns and use at least one on a real idea you're working on.",
        content: {
          type: 'patterns',
          patterns: [
            {
              name: 'The Pre-Mortem',
              prompt: "What are the top 5 ways this feature could fail, even if we build it well?",
              when: "Before committing to a direction — makes risks explicit early",
            },
            {
              name: 'The Competitor Mind',
              prompt: "If I were PriceLabs, how would I respond to this feature announcement? What would I say to our mutual customers?",
              when: "When evaluating strategic decisions or new features",
            },
            {
              name: 'The Logic Audit',
              prompt: "Where is my logic weak in this argument? What am I assuming that I shouldn't be?",
              when: "When you've made a recommendation and want to stress-test it",
            },
            {
              name: 'The Sophistication Check',
              prompt: "Rewrite this feature description as if I'm significantly overestimating the technical sophistication of our target user.",
              when: "When designing features or writing copy",
            },
            {
              name: 'The Steelman',
              prompt: "Steelman the case against this approach. Give me the strongest possible argument for not doing this.",
              when: "When you're pretty sure you're right and want to challenge that certainty",
            },
            {
              name: 'The Devil\'s Advocate',
              prompt: "You are a skeptic who thinks this is a bad idea. Make your best case against it.",
              when: "Quick, strong pushback on any direction",
            },
          ],
        },
        task: {
          instructions:
            "Think of a real product idea, feature, decision, or strategy you're currently working on or have worked on recently at Beyond.\n\nStep 1: Write 3 adversarial prompts for that idea using the patterns above (or your own variants).\n\nStep 2: Run at least one of them in the Prompt Playground on this page (or in Claude directly) and paste the response.\n\nStep 3: Write a brief reflection on what the adversarial response surfaced that you hadn't considered.",
          fields: [
            {
              id: 'idea',
              label: 'The idea, feature, or decision you\'re pressure-testing:',
              placeholder: 'Briefly describe what you\'re working on. 2-4 sentences is enough.',
              rows: 4,
              required: true,
            },
            {
              id: 'adversarial_prompts',
              label: 'Your 3 adversarial prompts:',
              placeholder:
                "Prompt 1: [Type + the prompt]\nPrompt 2: [Type + the prompt]\nPrompt 3: [Type + the prompt]",
              rows: 8,
              required: true,
            },
            {
              id: 'ai_response',
              label: 'Paste the response from one of your adversarial prompts:',
              placeholder: 'Copy/paste the Claude response here...',
              rows: 6,
              required: false,
            },
            {
              id: 'reflection',
              label: 'What did the adversarial response surface that you hadn\'t considered?',
              placeholder:
                "What was surprising? What did it catch that you'd glossed over? Did any of it change how you're thinking about the idea?",
              rows: 4,
              required: true,
            },
          ],
        },
        coachContext:
          "Evaluate the user's adversarial prompting exercise. Check: (1) Did they write 3 distinct adversarial prompts that use genuinely different angles or patterns? (2) Are the prompts specific to their actual idea, or generic? Specific is better. (3) Did they paste an actual adversarial response? (4) Is their reflection thoughtful — do they actually engage with what the adversarial response surfaced? The best sign of success is if the reflection shows they learned something surprising or challenging about their own idea. Penalize if all 3 prompts are basically the same pattern with different words.",
        evaluationCriteria: [
          '3 distinct adversarial prompts using different angles',
          'Prompts are specific to their actual idea (not generic)',
          'At least one adversarial response is included',
          'Reflection shows genuine engagement with what was surfaced',
        ],
      },

      // ── Exercise 1.5 ────────────────────────────────────────────────────
      {
        id: '1.5',
        title: 'The Retrospective Prompt',
        duration: '20 min',
        type: 'reflection',
        skill: "Meta-prompting — using AI to analyze and improve your own prompting patterns",
        intro:
          "Most people never ask Claude to critique their prompts. They judge the output and move on. This is a massive missed opportunity.\n\nThe Retrospective Prompt turns every Claude interaction into a prompting lesson. After you get a response, you ask Claude to analyze how you could have gotten there faster, with less effort, or with a better result. Over time, this builds meta-awareness of your own prompting patterns — the strengths and the blind spots.",
        learningObjective:
          "You'll use meta-prompting to get Claude to critique one of your earlier prompts and document what you learned about your prompting style.",
        content: {
          type: 'patterns',
          patterns: [
            {
              name: 'The Efficiency Check',
              prompt: "Looking at my original prompt and your response: how could I have gotten to this answer faster or with a shorter prompt?",
              when: "When you got what you wanted but feel like you over-explained",
            },
            {
              name: 'The Prompt Rewrite',
              prompt: "If you were to rewrite my original prompt from scratch, what would you write? What would you change and why?",
              when: "When the response was okay but not quite right",
            },
            {
              name: 'The Missing Context',
              prompt: "What context was I missing in my original prompt that would have made your response more accurate or more useful?",
              when: "When Claude's response went in a slightly wrong direction",
            },
            {
              name: 'The Level-Up',
              prompt: "Here's how I typically use AI: [describe your patterns]. What am I missing that would move me from good to elite? What habit would have the biggest impact?",
              when: "Periodic self-assessment of your overall AI usage patterns",
            },
          ],
        },
        task: {
          instructions:
            "Pick the best prompt you wrote in exercises 1.1-1.4. Run it in Claude (if you haven't already), then run one or more of the Retrospective Prompt patterns above to ask Claude to analyze your prompt.\n\nDocument what you learned. This is about building self-awareness about your own prompting patterns — the things you do well and the habits you haven't built yet.",
          fields: [
            {
              id: 'original_prompt',
              label: 'Your best prompt from Exercises 1.1-1.4 (paste it here):',
              placeholder: 'Copy/paste your best prompt from this level...',
              rows: 6,
              required: true,
            },
            {
              id: 'retrospective_prompt',
              label: 'Your retrospective prompt (what you asked Claude about your prompt):',
              placeholder: "Example: 'If you were to rewrite my original prompt from scratch, what would you write? What would you change and why?'",
              rows: 3,
              required: true,
            },
            {
              id: 'claude_feedback',
              label: "Claude's feedback on your prompt (paste the response):",
              placeholder: 'Copy/paste what Claude said about your prompt...',
              rows: 6,
              required: false,
            },
            {
              id: 'insights',
              label: 'What did you learn about your own prompting patterns?',
              placeholder:
                "What do you tend to do well? What are you consistently missing? What's the single most impactful habit to build?",
              rows: 4,
              required: true,
            },
          ],
        },
        coachContext:
          "Evaluate the user's retrospective prompting exercise. Check: (1) Did they use a genuine retrospective pattern that asks Claude to analyze their prompt (not just the response)? (2) Is the original prompt they picked actually one of their better ones — a fair test? (3) Most importantly, is their 'what I learned' section genuinely insightful? Look for specific, concrete patterns they've noticed (e.g., 'I always forget to specify the audience' or 'I over-explain context but under-specify format'). Vague insights like 'I need to be more specific' should get pushed back — ask them to be specific about HOW they'll be more specific.",
        evaluationCriteria: [
          'Used a genuine retrospective prompt (analyzing the prompt, not just the response)',
          'Picked a quality prompt worth analyzing',
          'Included Claude\'s feedback on the prompt',
          'Insights are specific and actionable (not just "I need to be more specific")',
        ],
      },

      // ── Exercise 1.6 ────────────────────────────────────────────────────
      {
        id: '1.6',
        title: 'Set Up Your AI Environment',
        duration: '30 min',
        type: 'capstone',
        skill: "Configuring a Claude Project folder and writing a personalized system prompt",
        intro:
          "Everything you've learned in Level 1 has been about how to think and write prompts. This capstone is about infrastructure — setting up your Claude environment so your best prompting patterns are baked in by default.\n\nA Claude Project folder with a well-written system prompt means you never have to re-explain your role, your context, or your preferences. Your AI starts every conversation already knowing who you are and what you need.",
        learningObjective:
          "You'll configure a Claude Project for your primary workstream and write a personalized system prompt that applies COSTAR principles to define your AI environment.",
        content: {
          type: 'walkthrough',
          steps: [
            {
              number: 1,
              title: 'Create a Claude Project folder',
              description:
                "In Claude.ai, click 'Projects' in the left sidebar → 'New Project'. Name it something like '[Your Name] - PM Work' or '[Your Name] - Design'. This is where all your work sessions will live.",
              tip: "You can have multiple project folders for different workstreams. Start with one for your primary focus.",
            },
            {
              number: 2,
              title: 'Write your system prompt',
              description:
                "In your Project settings, you'll find a 'Project Instructions' section. This is your system prompt — it runs before every conversation in this project. Use COSTAR principles to write it (see the guide below).",
              tip: "Think of this as onboarding your AI colleague. What does it need to know to be immediately useful?",
            },
            {
              number: 3,
              title: 'Add reference documents',
              description:
                "Upload any documents Claude should always have access to. For PMs: your team's product principles, the Beyond strategy doc, your current roadmap context. For Designers: design principles, component library context, current design brief.",
              tip: "Only add docs that are consistently relevant. Too many docs dilutes Claude's attention.",
            },
            {
              number: 4,
              title: 'Test and iterate',
              description:
                "Start a conversation in your project with a real work question. See if the response feels right — like it knows who you are and what you need. Adjust the system prompt based on what's missing.",
              tip: "Your first system prompt won't be perfect. That's fine. Expect to revise it 2-3 times over your first week.",
            },
          ],
          systemPromptGuide: {
            label: "Writing your system prompt (COSTAR for system prompts):",
            elements: [
              {
                label: "Who I am",
                example: "I'm [Name], a [Role] at Beyond — a dynamic pricing and revenue management platform for short-term rental hosts.",
              },
              {
                label: "My primary work context",
                example:
                  "I work on [area]. My most common tasks are: [task 1], [task 2], [task 3]. The teams I collaborate with most are [team].",
              },
              {
                label: "How I like to work with AI",
                example:
                  "I prefer responses that: are direct and opinionated, use bullet points for lists but prose for analysis, challenge my assumptions when they seem weak, ask clarifying questions if my prompt is underspecified.",
              },
              {
                label: "My product/design philosophy",
                example:
                  "I value: outcomes over output, simplicity as a feature, connecting work to user problems before solutions. I'm skeptical of feature additions that don't clearly solve a specific user problem.",
              },
              {
                label: "Key context about Beyond",
                example:
                  "Beyond's key challenge: a 5% conversion rate on 6,000 monthly signups. Key metric: Beat the Market (BtM) — +20% RevPAN vs competitive set. Main competitor: PriceLabs. Our advantage: we work without requiring user expertise.",
              },
            ],
          },
        },
        task: {
          instructions:
            "Write your personalized system prompt using the guide above. It should be detailed enough that any Claude conversation in your project immediately feels like talking to a well-briefed colleague who knows your work.\n\nTarget length: 200-400 words. Not so short it's generic, not so long it dilutes focus.\n\nPaste your complete system prompt below for AI Coach review.",
          fields: [
            {
              id: 'system_prompt',
              label: 'Your system prompt (paste the full text):',
              placeholder:
                "Paste your complete system prompt here. Should be 200-400 words covering: who you are, your work context, how you like to work with AI, your philosophy, and key Beyond context.",
              rows: 14,
              required: true,
            },
            {
              id: 'what_you_added',
              label: 'What documents did you add to your Project (or plan to add)?',
              placeholder:
                "List any documents you uploaded or plan to upload to your Claude Project folder.",
              rows: 3,
              required: false,
            },
          ],
        },
        coachContext:
          "Evaluate the user's system prompt for their Claude Project. This is the Level 1 capstone — the most important submission. Check: (1) Does it include their actual role and relevant Beyond context? (2) Does it describe their specific work focus (not just 'PM at Beyond' but what area they work in and what their common tasks are)? (3) Does it specify how they want Claude to behave/respond? (4) Is it personalized — does it feel like it was written for this specific person, or could it be anyone's system prompt? (5) Is it the right length (200-400 words — not too short to be generic, not too long to be diluted)? Give a score out of 5 and be specific about what would make it stronger.",
        evaluationCriteria: [
          'Includes specific role and Beyond context (not generic)',
          'Describes their primary work focus and common tasks',
          'Specifies how they want Claude to behave and respond',
          'Feels personal and specific to this individual',
          'Appropriate length (200-400 words)',
        ],
      },
    ],
    assessment: {
      title: 'Level 1 Assessment',
      questions: [
        {
          id: 'q1_1',
          text: "What primarily distinguishes a 'thought partner' prompt from a search query?",
          options: [
            'A) It is longer and more detailed',
            'B) It includes your role/context, describes a real problem, and invites analysis rather than just information',
            'C) It uses more technical vocabulary',
            'D) It asks multiple questions at once',
          ],
          correct: 'B',
          explanation:
            "Length alone doesn't make a prompt better. The key is context + specific problem + invitation to analyze — not just retrieve information.",
        },
        {
          id: 'q1_2',
          text: "When should you use the CRIT framework vs. the COSTAR framework?",
          options: [
            'A) COSTAR for getting feedback on your work; CRIT for requesting structured outputs',
            'B) They are interchangeable — both serve the same purpose',
            'C) COSTAR for creating structured outputs (documents, analysis); CRIT for getting useful critique of existing work',
            'D) COSTAR for short prompts; CRIT for long ones',
          ],
          correct: 'C',
          explanation:
            "COSTAR structures a request for new output (Style, Tone, Response Format all matter). CRIT structures a request for critique (Role and Instructions define how to evaluate, not what to create).",
        },
        {
          id: 'q1_3',
          text: "What is 'adversarial prompting' and when is it most valuable?",
          options: [
            "A) Writing prompts that confuse the AI — useful for testing model robustness",
            "B) Asking Claude to argue against your ideas or surface failure modes — most valuable for pressure-testing decisions before committing",
            "C) Using AI to write critical reviews of competitors' products",
            "D) Getting Claude to disagree with its previous responses",
          ],
          correct: 'B',
          explanation:
            "Adversarial prompting is a tool for overcoming confirmation bias. You ask Claude to attack your ideas, not to be difficult — the goal is finding weaknesses before they become expensive.",
        },
      ],
      selfReflection: {
        id: 'sr1',
        question:
          "On a scale of 1-5, how confident do you feel using Claude as a thought partner vs. a search engine? What's the biggest shift in how you're thinking about AI after Level 1?",
        placeholder:
          "1 = I still mostly use it like Google | 5 = I'm naturally writing rich, contextual prompts. What changed most in how you're thinking about this?",
      },
    },
    milestone: {
      title: "Part-Time Hustler!",
      emoji: "🏠",
      message:
        "You just checked into your first property! From Part-Time Hustle to... well, still Part-Time Hustle, but now with a killer AI setup. Your prompts have context. You know the frameworks. Claude is starting to feel like a colleague instead of a search engine.",
      gerardJokeId: 'ai_3',
      nextLevelTeaser:
        "Level 2 is about running a real AI operation — conversation hygiene, context calibration, and making sure Claude is always giving you its best work.",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LEVEL 2: The Host
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 2,
    title: 'The Host',
    theme: "You're running a real operation now",
    focus: 'Context management, conversation hygiene, and getting more from every interaction',
    duration: '~2.5 hours',
    icon: '🏡',
    propertyStage: 'host',
    color: '#02556c',
    locked: false, // Unlocked after Level 1
    description:
      "You've got the fundamentals. Now it's time to optimize. Learn how to manage AI conversations like a pro — when to continue, when to start fresh, and how to stop getting mediocre outputs.",
    exercises: [
      // ── Exercise 2.1 ────────────────────────────────────────────────────
      {
        id: '2.1',
        title: 'The Goldilocks Zone: Context That\'s Just Right',
        duration: '25 min',
        type: 'comparison',
        skill: 'Calibrating context — not too little, not too much, but just right',
        intro:
          "More context is always better, right? Not quite. There's a sweet spot — the Goldilocks Zone — where you've given Claude exactly enough to be genuinely helpful without burying it in information that dilutes its focus.\n\nToo little context: generic responses. Too much context: Claude loses the thread, over-hedges, and gives you a scattered response. Just right: specific, actionable, directly applicable to your actual situation.",
        learningObjective:
          "You'll learn to calibrate context by comparing three versions of the same prompt and identifying which produces the best result.",
        content: {
          type: 'comparison_three',
          example_topic: "Prioritizing three competing features for a roadmap",
          examples: [
            {
              label: '❌ Too Little Context',
              prompt: "How should I prioritize these three features?",
              why: "Claude doesn't know your company, your users, your constraints, or even what the three features are. The response will be a generic prioritization framework — useful for anyone, not useful for you.",
            },
            {
              label: '✅ Goldilocks Zone',
              prompt:
                "I'm a PM at Beyond, a dynamic pricing platform for STR hosts. I need to prioritize three features for Q2: (1) bulk pricing rules for multi-property hosts, (2) a new onboarding checklist for first-time hosts, and (3) a competitive benchmarking dashboard. Our biggest current problem is that only 5% of signups convert, and our research suggests setup complexity is the main barrier. Budget and engineering capacity are fixed at 6 engineer-weeks for the quarter. Help me think through which to prioritize and what trade-offs I'm making.",
              why: "This gives Claude: your role + company, the specific options with enough description to evaluate them, the current problem that should drive the decision, and a concrete constraint (6 engineer-weeks). Everything relevant, nothing irrelevant.",
            },
            {
              label: '❌ Too Much Context',
              prompt:
                "I'm a PM at Beyond, a dynamic pricing platform for STR hosts. We were founded in 2014 by David Lerch in San Francisco. We currently have 400+ employees. Our platform integrates with Airbnb, VRBO, Booking.com, and 15+ other channels. We have enterprise clients, mid-market clients, and SMB clients across 70+ countries. Our engineering team uses a squad model with 3 squads currently... [continues for 5 more paragraphs of company history, technical stack, team org chart, and quarterly business review data]... Given all that, how should I prioritize these three features?",
              why: "95% of this context is irrelevant to the prioritization question. Claude now has to figure out what matters and what doesn't — and it'll often average everything rather than focus on what's actually relevant. Longer ≠ better.",
            },
          ],
          rule: "Only include context that would change Claude's answer. If removing a sentence wouldn't affect the response, cut it.",
        },
        task: {
          instructions:
            "Pick a real question or task you're working on right now. Write three versions of the prompt:\n\n1. Too little context (the search-query version)\n2. Your best guess at the Goldilocks Zone\n3. Too much context (throw everything in)\n\nIf you can, run all three in the Prompt Playground and note which produces the best result. If not, just write the three versions.",
          fields: [
            {
              id: 'too_little',
              label: 'Version 1: Too little context (the search-query version):',
              placeholder: 'The bare minimum version...',
              rows: 3,
              required: true,
            },
            {
              id: 'goldilocks',
              label: 'Version 2: The Goldilocks Zone (your best calibrated version):',
              placeholder: 'Just the right amount of context — everything relevant, nothing irrelevant...',
              rows: 6,
              required: true,
            },
            {
              id: 'too_much',
              label: 'Version 3: Too much context (the kitchen sink version):',
              placeholder: 'Everything and the kitchen sink...',
              rows: 8,
              required: true,
            },
            {
              id: 'reflection',
              label: 'What did you cut to get from "too much" to the Goldilocks Zone? What was the deciding factor?',
              placeholder: 'What made certain context "relevant" vs. "interesting but not relevant"?',
              rows: 3,
              required: true,
            },
          ],
        },
        coachContext:
          "Evaluate the user's three prompt versions. Check: (1) Is the 'too little' version actually too vague to get a good response? (2) Is the Goldilocks version genuinely well-calibrated — does it include everything that would change Claude's answer, and nothing that wouldn't? This is the key test: would removing any sentence affect the response? (3) Is the 'too much' version actually overwrought — does it include things that are interesting but irrelevant? (4) Most importantly: is their reflection insightful? Did they identify a clear principle for what makes context 'relevant'? The best answer is something like 'context is relevant if it changes what Claude would recommend' rather than 'I cut things that seemed less important.'",
        evaluationCriteria: [
          '"Too little" version is genuinely vague/under-specified',
          'Goldilocks version includes only context that affects the answer',
          '"Too much" version includes genuinely irrelevant material',
          'Reflection identifies a clear principle for relevance, not just "I cut stuff"',
        ],
      },

      // ── Exercise 2.2 ────────────────────────────────────────────────────
      {
        id: '2.2',
        title: 'Ask Me First: Teaching Claude to Clarify',
        duration: '20 min',
        type: 'framework',
        skill: 'Using the "Ask Me First" technique to get better answers on complex questions',
        intro:
          "Here's a counterintuitive technique: instead of trying to write the perfect prompt upfront, ask Claude to interview you.\n\nThis works especially well for complex, multi-faceted problems where you're not sure you've even framed the question right. Claude asks you the 3-4 questions that will actually determine the quality of its answer — and you often discover that you hadn't thought about those dimensions yet.\n\nIt's also a good shortcut when you're in a hurry and don't want to spend 10 minutes crafting a perfect COSTAR prompt.",
        learningObjective:
          "You'll practice the 'Ask Me First' technique on a complex problem and document how the clarifying questions changed your thinking.",
        content: {
          type: 'patterns',
          patterns: [
            {
              name: 'The Standard Ask',
              prompt: "Before answering, ask me 3 clarifying questions that would help you give a significantly better response.",
              when: "When your question is complex and you're not sure you've framed it right",
            },
            {
              name: 'The Deep Interview',
              prompt: "Don't answer yet. First, interview me about this problem. Ask me everything you'd need to know to give your best possible answer.",
              when: "When you want Claude to drive the conversation toward the right answer",
            },
            {
              name: 'The Context Gap Check',
              prompt: "Tell me what additional context would make your answer significantly better. Then I'll provide it before you answer.",
              when: "When you suspect you're missing something important but don't know what",
            },
            {
              name: 'The Assumption Surface',
              prompt: "Before answering: (1) tell me what assumptions you're making about my situation, (2) ask whether they're correct. Then answer based on my corrections.",
              when: "When you want to catch Claude making wrong assumptions before it builds an answer on them",
            },
          ],
        },
        task: {
          instructions:
            "Pick a complex question or problem from your actual work — something where there are multiple valid answers depending on context, constraints, or goals.\n\nPM roles: a prioritization decision, a trade-off between two approaches, or a 'should we build this?' question.\nDesign roles: a UX problem with multiple valid approaches, a design decision with trade-offs, or a question about what to prioritize in a redesign.\n\nStep 1: Write your question and one 'Ask Me First' prompt.\nStep 2: Write what clarifying questions you'd expect Claude to ask.\nStep 3: Write what questions actually surprised you — the ones you hadn't considered.",
          fields: [
            {
              id: 'question',
              label: 'The complex question you\'re working on:',
              placeholder: 'Describe the problem or decision you\'re wrestling with...',
              rows: 4,
              required: true,
            },
            {
              id: 'ask_me_first',
              label: 'Your "Ask Me First" prompt:',
              placeholder: "Example: 'Before answering, ask me 3 clarifying questions that would help you give a significantly better response.'",
              rows: 3,
              required: true,
            },
            {
              id: 'expected_questions',
              label: 'What clarifying questions did you expect Claude to ask?',
              placeholder: 'Before you ran it, what did you think the obvious questions would be?',
              rows: 4,
              required: true,
            },
            {
              id: 'actual_questions',
              label: 'What questions did Claude actually ask? Which ones surprised you?',
              placeholder: 'Paste the clarifying questions Claude asked, and note which ones you hadn\'t anticipated...',
              rows: 5,
              required: false,
            },
            {
              id: 'reflection',
              label: 'How did the clarifying questions change the direction of your thinking?',
              placeholder: 'Did they surface assumptions you hadn\'t examined? Add constraints you\'d overlooked? Reframe the question entirely?',
              rows: 3,
              required: true,
            },
          ],
        },
        coachContext:
          "Evaluate the user's 'Ask Me First' exercise. Check: (1) Did they pick a genuinely complex question where clarifying questions would meaningfully change the answer? Simple questions don't qualify. (2) Is their 'Ask Me First' prompt asking Claude to clarify before answering — not just asking Claude to answer a complex question? (3) Is their reflection genuine — do they show self-awareness about what they hadn't considered? The best responses show that the clarifying questions surfaced something real: an assumption they'd made, a dimension they'd missed, or a way to reframe the question. Penalize if their reflection is 'the questions were what I expected' — that means they didn't push into genuinely complex territory.",
        evaluationCriteria: [
          'Question is genuinely complex (multiple valid answers depending on context)',
          '"Ask Me First" prompt correctly instructs Claude to clarify before answering',
          'Expected questions show their initial assumptions',
          'Reflection shows genuine learning from the unexpected questions',
        ],
      },

      // ── Exercise 2.3 ────────────────────────────────────────────────────
      {
        id: '2.3',
        title: 'Conversation Hygiene: When to Continue, Branch, or Start Fresh',
        duration: '20 min',
        type: 'reflection',
        skill: 'Managing conversation state — knowing when to continue, branch, or start a new chat',
        intro:
          "AI conversations are stateful — everything in the thread affects everything that comes after. This is powerful when the context is relevant. It becomes a liability when you're dragging stale, irrelevant, or conflicting context into a new direction.\n\nMost people never think about this. They either have one mega-conversation that goes on for weeks (context decay is real) or they start fresh every time and lose the useful context they've built. The skill is knowing when each approach is right.",
        learningObjective:
          "You'll build a personal decision tree for when to continue vs. branch vs. start fresh, and apply it to your recent Claude conversations.",
        content: {
          type: 'decision_tree',
          title: 'When to Continue, Branch, or Start Fresh',
          options: [
            {
              choice: '▶ Continue the conversation',
              color: '#3bc1cc',
              when: [
                "You're building on the same thread of thinking — iterating on a document, exploring branches of the same problem",
                "The prior context is still actively relevant (not just vaguely related)",
                'You\'re inside a 15-20 message window where quality is still high',
                "The conversation has momentum you want to preserve",
              ],
              signal: "The AI's last response still feels 'in sync' with what you need",
            },
            {
              choice: '↗ Branch (start a new chat from a reference point)',
              color: '#ee3968',
              when: [
                'You want to take the same context in a different direction without corrupting the original thread',
                "You're about to try something speculative and might want to 'undo' if it doesn't work",
                'You want to have two parallel explorations from the same starting point',
              ],
              signal: "You're thinking 'what if I tried this instead?' while mid-conversation",
            },
            {
              choice: '🔄 Start Fresh',
              color: '#02556c',
              when: [
                "The topic has fundamentally changed — you're done with the original topic",
                "The conversation has become circular or confused — quality is degrading",
                "You're past ~20 exchanges and responses feel less sharp",
                "You have context from a finished conversation that belongs in your Project folder now",
              ],
              signal: "You catch yourself saying 'ignore everything above and...' in your prompt",
            },
            {
              choice: '📁 Use a Project Folder',
              color: '#252f38',
              when: [
                "You'll return to this topic repeatedly across many sessions",
                'You want consistent behavior and context across all conversations about this topic',
                'You have reference documents that should always be available',
                "You're building something incrementally (a strategy doc, an OKR, a design brief)",
              ],
              signal: "You've started fresh 3+ times and always had to re-explain the same background",
            },
          ],
        },
        task: {
          instructions:
            "Look at your last 5 Claude conversations (or your most recent sessions). For each one, apply the decision framework above:\n\n- Was this handled correctly (continue / branch / start fresh / project) for what it was?\n- If not, which approach would have been better?\n- What would you do differently?\n\nThen write your personal 'Conversation Hygiene Rules' — 3-5 personal guidelines you'll follow going forward.",
          fields: [
            {
              id: 'conversation_audit',
              label: 'Your conversation audit (briefly describe each of your last 5 conversations and classify them):',
              placeholder:
                "Conversation 1: [What it was] → Should have: [continued / branched / started fresh / used Project] because...\nConversation 2: ...\n(etc.)",
              rows: 10,
              required: true,
            },
            {
              id: 'personal_rules',
              label: 'Your personal Conversation Hygiene Rules (3-5 rules you\'ll actually follow):',
              placeholder:
                "Rule 1: I'll start fresh whenever...\nRule 2: I'll use a Project folder for...\nRule 3: The signal for me that I need to branch is...",
              rows: 6,
              required: true,
            },
          ],
        },
        coachContext:
          "Evaluate the user's conversation hygiene exercise. Check: (1) Did they actually audit 5 real conversations, or did they make something up? Look for specificity — real conversations have real topics. (2) Are their classifications thoughtful? Do they understand the distinction between 'continue' and 'use a project folder'? Many people confuse these. (3) Most importantly, are their personal rules specific and actionable — things they could actually follow? 'I'll start fresh when the conversation gets confused' is weak. 'I'll start fresh after 15+ exchanges on the same topic, or when I catch myself starting a prompt with ignore everything above' is strong. Push for specificity.",
        evaluationCriteria: [
          'Audited 5 real conversations with specific descriptions',
          'Classifications show understanding of the distinctions (esp. continue vs. Project)',
          'Personal rules are specific and actionable',
          'Shows genuine self-awareness about their current conversation habits',
        ],
      },

      // ── Exercise 2.4 ────────────────────────────────────────────────────
      {
        id: '2.4',
        title: 'Hallucination Hunting: Demand Accuracy',
        duration: '25 min',
        type: 'playground',
        skill: 'Strategies for minimizing hallucinations and demanding accurate, well-reasoned outputs',
        intro:
          "Claude is very confident and very occasionally wrong. The dangerous combination: it doesn't always flag its uncertainty. It will state a made-up statistic with the same confident tone as a solid fact.\n\nThe good news: you can significantly reduce hallucinations with the right prompting techniques. And you can teach yourself to catch the rest. This exercise builds both skills.",
        learningObjective:
          "You'll practice multiple hallucination-prevention techniques and test Claude's accuracy on a topic you know well.",
        content: {
          type: 'patterns',
          patterns: [
            {
              name: 'The Uncertainty Declaration',
              prompt: "Only include information you're confident about. If you're uncertain about something, say so explicitly rather than stating it as fact.",
              when: "Add this to any factual prompt where accuracy matters",
            },
            {
              name: 'The Confidence Rating',
              prompt: "After your response, rate your confidence in each major claim from 1-10 and explain why.",
              when: "When you need to identify which parts of a response to verify",
            },
            {
              name: 'The Reasoning Chain',
              prompt: "For each claim you make, briefly explain why you believe it's true and what you're basing it on.",
              when: "When you need to audit the reasoning, not just the conclusions",
            },
            {
              name: 'The Echo Test',
              prompt: "Before answering: repeat back my constraints and key requirements to confirm you understood them correctly. Then answer.",
              when: "When a misunderstood constraint would lead to a useless response",
            },
            {
              name: 'The Push-Back Test (Advanced)',
              prompt: "I believe [wrong fact]. Given that, please help me think through [question].",
              when: "To test whether Claude will accept bad inputs or push back — it often won't push back, which is the lesson",
            },
          ],
        },
        task: {
          instructions:
            "Step 1: Ask Claude a question about Beyond's market, a competitor, or a product domain where you know the correct answer. Apply at least one hallucination-prevention technique.\n\nStep 2: Evaluate the response for accuracy. Where did Claude get it right? Where did it make claims you know are wrong or uncertain?\n\nStep 3 (Bonus, highly recommended): Give Claude a wrong fact and see if it pushes back or accepts it uncritically. This is the most powerful lesson — Claude is often a very agreeable yes-person about bad inputs.",
          fields: [
            {
              id: 'factual_question',
              label: 'Your factual question and the hallucination-prevention technique(s) you used:',
              placeholder:
                "Question: [Your question about something you know well]\nTechnique used: [Which technique and why you picked it]",
              rows: 5,
              required: true,
            },
            {
              id: 'accuracy_evaluation',
              label: "Your evaluation of Claude's accuracy (what it got right, what it got wrong/uncertain):",
              placeholder:
                "Got right: ...\nGot wrong or stated with false confidence: ...\nSaid it was uncertain about: ...",
              rows: 6,
              required: true,
            },
            {
              id: 'wrong_input_test',
              label: '(Bonus) What happened when you gave Claude wrong information — did it push back or accept it?',
              placeholder:
                "What wrong fact did you give it? Did it accept it, push back, or hedge? What does this tell you about how to use Claude for factual work?",
              rows: 4,
              required: false,
            },
            {
              id: 'technique_going_forward',
              label: 'Which hallucination-prevention technique will you use most going forward, and why?',
              placeholder: 'Be specific about the types of work where you\'ll apply it...',
              rows: 3,
              required: true,
            },
          ],
        },
        coachContext:
          "Evaluate the hallucination hunting exercise. Check: (1) Did they pick a topic where they actually know the correct answer — this is crucial, otherwise they can't evaluate accuracy. (2) Did they apply at least one technique genuinely (not just mention it)? (3) Is their accuracy evaluation specific — do they name actual claims Claude made and evaluate them? Vague 'it seemed mostly right' is insufficient. (4) If they did the bonus test, did they notice the key insight — that Claude often accepts wrong inputs without pushback, which means you can't rely on Claude to catch your mistakes. (5) Is their 'technique going forward' specific to their actual work, not generic?",
        evaluationCriteria: [
          'Chose a topic where they know the correct answer',
          'Applied at least one technique explicitly',
          'Accuracy evaluation is specific (names actual claims)',
          'Identifies at least one thing Claude got wrong or stated with false confidence',
          'Draws a practical conclusion about their future use of Claude',
        ],
      },

      // ── Exercise 2.5 ────────────────────────────────────────────────────
      {
        id: '2.5',
        title: 'Word Choice is Everything',
        duration: '20 min',
        type: 'playground',
        skill: 'Understanding how single word changes dramatically alter output quality and direction',
        intro:
          "The difference between a mediocre prompt and a great one is sometimes just one word. 'List' and 'Brainstorm' look similar — they both ask Claude to generate multiple items. But they produce fundamentally different outputs.\n\nThis exercise trains you to see prompts as precision instruments, not casual requests. Every word you choose signals something about what you want.",
        learningObjective:
          "You'll discover through experimentation how individual word choices change output quality, and build a personal vocabulary of high-signal words for your most common tasks.",
        content: {
          type: 'word_comparison',
          categories: [
            {
              name: 'Generation words',
              words: [
                { word: 'List', effect: 'Structured, flat enumeration' },
                { word: 'Brainstorm', effect: 'Exploratory, associative, more creative' },
                { word: 'Generate', effect: 'Methodical, comprehensive' },
                { word: 'Surface', effect: 'Implies finding hidden or non-obvious things' },
                { word: 'Propose', effect: 'Implies recommendations with reasoning' },
              ],
            },
            {
              name: 'Analysis words',
              words: [
                { word: 'Explain', effect: 'Educational, definitions-forward' },
                { word: 'Analyze', effect: 'Structured breakdown with logic' },
                { word: 'Unpack', effect: 'Casual, exploratory, layer-by-layer' },
                { word: 'Critique', effect: 'Critical eye, surfaces weaknesses' },
                { word: 'Evaluate', effect: 'Balanced assessment against criteria' },
              ],
            },
            {
              name: 'Quality words',
              words: [
                { word: 'Good', effect: 'Sets a low bar — average results' },
                { word: 'Excellent', effect: 'Raises the bar slightly' },
                { word: 'Exceptional', effect: 'Sets a high bar — noticeably better outputs' },
                { word: 'World-class', effect: 'Signals you want the absolute ceiling' },
                { word: 'Concise', effect: 'Short AND high quality (vs. just short)' },
              ],
            },
            {
              name: 'Communication style',
              words: [
                { word: 'Convince', effect: 'Persuasive, one-sided argument' },
                { word: 'Teach', effect: 'Pedagogical, built for understanding' },
                { word: 'Debate', effect: 'Both sides, structured argument' },
                { word: 'Distill', effect: 'Essence-extraction, removes noise' },
                { word: 'Reframe', effect: 'New perspective on same content' },
              ],
            },
          ],
        },
        task: {
          instructions:
            "Take one of your prompts from Level 1 or Level 2. Identify 3 key words in that prompt. For each word, test 2-3 alternatives in the Prompt Playground and observe how the output changes.\n\nDocument:\n1. The original word and its prompt context\n2. The alternatives you tested\n3. The most impactful word swap you found\n4. Why that swap mattered\n\nUse the Prompt Playground on this page to run your tests side-by-side if possible.",
          fields: [
            {
              id: 'original_prompt',
              label: 'The prompt you\'re using as your test base:',
              placeholder: 'Paste the prompt you\'re testing word variations on...',
              rows: 5,
              required: true,
            },
            {
              id: 'word_experiments',
              label: 'Your word swap experiments (for each word: original → alternatives tested → what changed):',
              placeholder:
                "Word 1: 'list' → tried 'brainstorm', 'surface' → Brainstorm gave me 15 more creative options vs. list's structured 7\nWord 2: 'good' → tried 'exceptional', 'world-class' → World-class added specific examples and higher standards\nWord 3: ...",
              rows: 8,
              required: true,
            },
            {
              id: 'most_impactful',
              label: 'The single most impactful word swap you found and why:',
              placeholder:
                "Which one change produced the biggest improvement in output quality? Why do you think that word carries so much signal?",
              rows: 4,
              required: true,
            },
          ],
        },
        coachContext:
          "Evaluate the word choice exercise. Check: (1) Did they actually run experiments, or just theorize? Look for specific descriptions of what changed in the output — generic claims like 'it was better' don't count. (2) Did they test at least 3 different words? (3) Is their 'most impactful' word actually meaningful — do they articulate WHY that word carries more signal? The best answers show genuine curiosity about language: they found a swap that surprised them, or discovered that a word they'd been using is significantly lower-signal than an alternative. Push for specificity about what changed in the actual output.",
        evaluationCriteria: [
          'Used a real prompt from Level 1 or 2 (not a made-up one)',
          'Tested at least 3 different word swaps',
          'Describes specific changes in output quality (not just "it was better")',
          'Most impactful swap is explained with real reasoning',
        ],
      },

      // ── Exercise 2.6 ────────────────────────────────────────────────────
      {
        id: '2.6',
        title: 'Your Conversation Playbook',
        duration: '30 min',
        type: 'capstone',
        skill: 'Synthesizing Level 2 learnings into a personal, reusable Conversation Playbook',
        intro:
          "This is your Level 2 capstone. You're going to build something genuinely useful — a personal Conversation Playbook that captures everything you've learned and makes it easy to apply consistently.\n\nHere's the meta-exercise: build this document in Claude. Use everything you've learned — the right context, the right format, your Project folder. Let Claude help you synthesize your own learnings into a reusable asset.",
        learningObjective:
          "You'll create a personal Conversation Playbook capturing your go-to patterns, personal rules, and hard-won insights from Levels 1-2.",
        content: {
          type: 'walkthrough',
          steps: [
            {
              number: 1,
              title: 'Open your Claude Project from Level 1',
              description:
                "Start a new conversation in the Claude Project folder you set up in Exercise 1.6. Your system prompt will give Claude the context it needs.",
              tip: "This is the first real test of your Project folder setup.",
            },
            {
              number: 2,
              title: 'Prompt Claude to help you build the Playbook',
              description:
                "Ask Claude to help you synthesize your learnings into a structured playbook. Give it the template below, describe what you learned, and let it help you write it.",
              tip: "This is a COSTAR-worthy prompt. Take the time to write it well.",
            },
            {
              number: 3,
              title: 'Review and personalize',
              description:
                "Claude will give you a draft. Edit it until it sounds like you and reflects your actual experience from the exercises — not just generic advice.",
              tip: "The Playbook should feel personal, not like it was copied from a template.",
            },
            {
              number: 4,
              title: 'Save and share',
              description:
                "Save your Playbook somewhere you'll actually use it — a Notion doc, your Project folder, a shared doc. Consider sharing it with your team.",
              tip: "A Playbook you can't find is a Playbook that doesn't help you.",
            },
          ],
          playbookTemplate: {
            label: 'Your Conversation Playbook should include:',
            sections: [
              {
                title: 'My Top 5 Go-To Prompt Patterns',
                description: 'The patterns from Levels 1-2 you\'ll use most often, with example prompts for your actual work',
              },
              {
                title: 'My Conversation Hygiene Rules',
                description: 'When I continue / branch / start fresh / use a Project — with specific signals from Exercise 2.3',
              },
              {
                title: '3 Hallucination Prevention Habits',
                description: 'The specific techniques I\'ll use when accuracy matters, and when I\'ll use each',
              },
              {
                title: 'My High-Signal Word Vocabulary',
                description: 'The word swaps from Exercise 2.5 that made the biggest difference for my work',
              },
              {
                title: 'What I\'ve Learned About My Prompting Patterns',
                description: 'My strengths, my blind spots, and the one habit that\'ll have the biggest impact',
              },
            ],
          },
        },
        task: {
          instructions:
            "Build your Conversation Playbook in Claude using your Project folder, then paste the final version here.\n\nTarget length: 400-700 words. Long enough to be genuinely useful, short enough to actually use it.\n\nThe AI Coach will evaluate it for completeness, specificity, and how well it reflects genuine learning from Levels 1-2.",
          fields: [
            {
              id: 'playbook',
              label: 'Your Conversation Playbook (paste the complete version):',
              placeholder:
                "Paste your full Conversation Playbook here. Should cover: go-to prompt patterns, conversation hygiene rules, hallucination prevention habits, high-signal word vocabulary, and your self-assessment of your prompting patterns.",
              rows: 18,
              required: true,
            },
            {
              id: 'prompt_used',
              label: 'The prompt you used to ask Claude to help build this:',
              placeholder: 'Show your work — what prompt did you use to get Claude to help you create this playbook?',
              rows: 5,
              required: false,
            },
          ],
        },
        coachContext:
          "Evaluate the user's Conversation Playbook — this is the Level 2 capstone and the most important submission for this level. Check all five sections: (1) Go-to prompt patterns — are they specific to their role and work at Beyond, or generic? (2) Conversation hygiene rules — do they have clear, specific signals (not just 'when it gets confusing')? (3) Hallucination prevention — do they name specific techniques, not just 'I'll check the facts'? (4) High-signal words — do they name actual words and explain why they're high-signal for their work? (5) Self-assessment — is it genuinely self-aware, naming specific strengths and specific blind spots? The whole playbook should feel like it was written by this specific person for their specific work — not a generic AI writing course summary. Give a score out of 5 and be specific about what would make each section stronger.",
        evaluationCriteria: [
          'Go-to patterns are specific to their role and Beyond context',
          'Conversation hygiene rules have clear, specific signals',
          'Hallucination prevention habits are technique-specific',
          'High-signal vocabulary is drawn from actual experiments',
          'Self-assessment names specific strengths and blind spots',
          'Overall feels personal and specific, not generic',
        ],
      },
    ],
    assessment: {
      title: 'Level 2 Assessment',
      questions: [
        {
          id: 'q2_1',
          text: "You're writing a prompt about a prioritization decision. Which of the following context is LEAST likely to improve Claude's response?",
          options: [
            "A) Your company's current biggest challenge (5% conversion rate)",
            "B) The specific trade-offs between the three options you're weighing",
            "C) The name of your company's founder and when it was founded",
            "D) The engineering capacity constraint for this quarter",
          ],
          correct: 'C',
          explanation:
            "The founder's name and founding date are interesting but won't change Claude's prioritization recommendation. Context is only valuable if it would change the answer.",
        },
        {
          id: 'q2_2',
          text: "When is the BEST time to start a fresh conversation instead of continuing your current one?",
          options: [
            'A) Every time you ask a new question',
            "B) When you've been talking for more than 5 minutes",
            "C) When the topic has fundamentally changed, the conversation has become circular, or you catch yourself writing 'ignore everything above'",
            "D) Only when Claude explicitly tells you its context window is full",
          ],
          correct: 'C',
          explanation:
            "The signals that it's time to start fresh are: topic change, quality degradation, or finding yourself working around the existing context rather than with it.",
        },
        {
          id: 'q2_3',
          text: "You ask Claude about a competitor's market share and it gives you a confident, specific number. What should you do?",
          options: [
            "A) Trust it — Claude has access to current data",
            "B) Treat it as a starting point, verify it through a reliable source before using it in any important context",
            "C) Ask Claude where it got the number and then trust whatever it says",
            "D) Reject it — Claude always makes up statistics",
          ],
          correct: 'B',
          explanation:
            "Claude is often confidently wrong about specific numbers, market share, and other data that changes frequently or varies by source. Always verify before using in important decisions.",
        },
      ],
      selfReflection: {
        id: 'sr2',
        question:
          "What's the single biggest change you've made to how you use Claude since starting NexusYou? Be specific — not 'I write better prompts' but exactly what you do differently and why it matters.",
        placeholder:
          "The more specific, the better. Name a habit, technique, or mindset shift that's actually changed your day-to-day use of AI.",
      },
    },
    milestone: {
      title: 'Welcome to Host Status!',
      emoji: '🏡',
      message:
        "You're no longer just dabbling — you're running a real AI operation. Your conversation game is tight, your context is calibrated, you know when to start fresh, and you've built a Playbook you'll actually use. The fundamentals are locked in.",
      gerardJokeId: 'ai_3',
      nextLevelTeaser:
        "Level 3 is where the tools come out. You're going to go deep on Nexus-Product, pull real data, and build artifacts that your team will actually use.",
    },
  },

  // Levels 3-6 are imported from separate content files
  LEVEL3,
  LEVEL4,
  LEVEL5,
  LEVEL6,
]

// ─── Helper: Get all exercise IDs (for progress calculation) ─────────────────
// Level 5 has PM+Design tracks; count each unique exercise once per track
export function getAllExerciseIds() {
  return LEVELS.flatMap(level => level.exercises.map(ex => ex.id))
}

// ─── Helper: Get exercise IDs for a specific level ───────────────────────────
// For Level 5, optionally filter by track ('pm' | 'design')
export function getLevelExerciseIds(levelId, track) {
  const level = LEVELS.find(l => l.id === levelId)
  if (!level) return []
  if (level.hasTracks && track) {
    return level.exercises.filter(ex => ex.track === track || ex.track === 'all').map(ex => ex.id)
  }
  return level.exercises.map(ex => ex.id)
}

// ─── Helper: Get a specific exercise by ID ───────────────────────────────────
export function getExerciseById(exerciseId) {
  for (const level of LEVELS) {
    const exercise = level.exercises.find(ex => ex.id === exerciseId)
    if (exercise) return { exercise, level }
  }
  return null
}

// ─── Role-specific prompt getter ──────────────────────────────────────────────
export function getTaskPrompt(exercise, userRole) {
  if (!exercise.task?.prompts) return null
  const role = userRole?.toLowerCase() || ''
  if (role.includes('design')) return exercise.task.prompts.design || exercise.task.prompts.default
  if (role.includes('pm') || role.includes('product manager')) return exercise.task.prompts.pm || exercise.task.prompts.default
  return exercise.task.prompts.default || exercise.task.prompts.pm
}

export const ROLE_OPTIONS = [
  'Senior Product Manager',
  'Product Manager',
  'Associate Product Manager',
  'Design Manager',
  'Senior Product Designer',
  'Product Designer',
]
