// ─── Level 4: The Large Portfolio ───────────────────────────────────────────
// Full content — Advanced prompting, multi-step chains, model selection, LLM-as-judge

export const LEVEL4 = {
  id: 4,
  title: 'The Large Portfolio',
  theme: 'Scale demands sophistication',
  focus: 'Advanced prompting, multi-step chains, model selection, LLM-as-judge, prompt libraries',
  duration: '~2.5 hours',
  icon: '🏗️',
  propertyStage: 'large_portfolio',
  color: '#02556c',
  locked: false,
  comingSoon: false,
  description:
    'Level up with multi-step prompt chains, LLM-as-judge evaluation, model selection, and building a personal prompt library that scales with your work.',

  exercises: [
    // ── Exercise 4.1 ─────────────────────────────────────────────────────────
    {
      id: '4.1',
      title: 'The Chain Gang',
      duration: '25 min',
      type: 'framework',
      skill: 'Building multi-step prompt chains where each output becomes the next input',
      intro:
        "Single prompts have a ceiling. You can get a good analysis, a decent document, a useful list — but the output is limited by what a single prompt can hold in focus at once.\n\nMulti-step chains remove that ceiling. Step 1 generates raw material. Step 2 refines and analyzes it. Step 3 transforms it into the final deliverable. Each step does one thing well, and the chain does something none of the steps could do alone.",
      learningObjective:
        "You'll build and run a 3-step prompt chain for a real workflow in your role, and document the chain so you can reuse it.",
      content: {
        type: 'framework',
        framework: {
          name: 'The 3-Step Chain',
          description:
            "A reliable pattern for complex outputs: Generate → Refine → Deliver. Each step takes the previous step's output as its primary input.",
          elements: [
            {
              letter: '1',
              name: 'Generate',
              description: 'Produce raw material — broad, exploratory, no editing yet',
              example: "Give me 15 potential explanations for why host activation rates dropped in Q1. Include conventional and unconventional theories. Don't evaluate them yet.",
              color: '#3bc1cc',
            },
            {
              letter: '2',
              name: 'Refine',
              description: 'Evaluate, filter, and analyze the raw material',
              example: "Using the 15 theories above, evaluate each against: (a) what the data supports, (b) what we could test in 2 weeks, (c) what would have the highest impact if true. Rate each 1-10 and explain.",
              color: '#02556c',
            },
            {
              letter: '3',
              name: 'Deliver',
              description: 'Transform the refined analysis into the final, shareable output',
              example: "Using the top 3 theories from your analysis, write a 1-page hypothesis document I can share with the team. Include: hypothesis, supporting evidence, how to test it, and expected impact if validated.",
              color: '#ee3968',
            },
          ],
        },
        examples: [
          {
            name: 'PM: Feature Prioritization Chain',
            steps: [
              "Step 1: Generate — 'List 12 potential improvements to our host onboarding flow. Don't prioritize yet — just generate options ranging from obvious to creative.'",
              "Step 2: Refine — 'Evaluate each of the 12 ideas against: activation impact, engineering effort (low/med/high), and alignment with our current sprint capacity. Score each 1-10 across all three.'",
              "Step 3: Deliver — 'Take the top 3 ideas from the evaluation and write a prioritization brief I can present at sprint planning. Include the rationale for why these 3 over the others.'",
            ],
          },
          {
            name: 'Design: User Research Synthesis Chain',
            steps: [
              "Step 1: Generate — 'Here are 8 user interview quotes: [paste quotes]. List all the themes you see — behavioral patterns, emotional responses, and unmet needs. Don't analyze quality yet.'",
              "Step 2: Refine — 'Group these themes by frequency and importance. Which appear in 3+ quotes? Which represent unmet needs vs. preferences vs. pain points? Rate the signal strength of each.'",
              "Step 3: Deliver — 'Write a research synthesis document with: 3 key findings (each with supporting quotes), the most important unmet need we should design for, and 2 open questions for follow-up research.'",
            ],
          },
        ],
      },
      task: {
        instructions:
          "Design and run a 3-step chain for a real workflow you do regularly — something you've done with single prompts before but haven't gotten quite the output quality you wanted.\n\nRun all 3 steps in Claude (your Project folder is ideal). Paste each step's prompt and the key output from each step.",
        fields: [
          {
            id: 'chain_intent',
            label: 'What workflow does this chain serve? What single-prompt limitation does it solve?',
            placeholder:
              "Describe the workflow (e.g., 'generating competitive positioning for a new feature') and what always felt insufficient about the single-prompt version.",
            rows: 4,
            required: true,
          },
          {
            id: 'step1',
            label: 'Step 1 — Generate: Your prompt + key output:',
            placeholder:
              "Prompt: [Your generate prompt]\n\nKey output: [What Claude generated — a brief summary is fine, paste key items]",
            rows: 6,
            required: true,
          },
          {
            id: 'step2',
            label: 'Step 2 — Refine: Your prompt + key output:',
            placeholder:
              "Prompt: [Your refine prompt — explicitly reference Step 1's output]\n\nKey output: [How Claude refined/evaluated the material]",
            rows: 6,
            required: true,
          },
          {
            id: 'step3',
            label: 'Step 3 — Deliver: Your prompt + the final output:',
            placeholder:
              "Prompt: [Your deliver prompt — building on Step 2's analysis]\n\nFinal output: [The deliverable — paste the actual document, brief, or summary]",
            rows: 8,
            required: true,
          },
          {
            id: 'chain_value',
            label: 'What did the chain produce that the single-prompt version couldn\'t?',
            placeholder:
              "Be specific: what was qualitatively different about the Step 3 output vs. what you'd get by just asking for the final output in one prompt?",
            rows: 3,
            required: true,
          },
        ],
      },
      coachContext:
        "Evaluate the multi-step chain exercise. Check: (1) Does each step have a distinct purpose — Generate (broad, exploratory), Refine (evaluate/filter), Deliver (transform to final format)? If all three steps feel like the same type of prompt, the chain isn't working. (2) Does Step 2 explicitly reference Step 1's output, and does Step 3 explicitly reference Step 2's? Chains break when steps don't hand off properly. (3) Is the chain value reflection specific — does it name what's qualitatively different vs. the single-prompt alternative? 'It was more thorough' isn't enough; 'It identified 3 alternatives I hadn't considered because the Generate step forced breadth before quality filtering' is strong.",
      evaluationCriteria: [
        'Three steps have genuinely distinct purposes (Generate/Refine/Deliver)',
        'Each step explicitly builds on the previous step\'s output',
        'The workflow choice is practical and role-relevant',
        'Chain value is specific (names what the chain produced that one prompt couldn\'t)',
      ],
    },

    // ── Exercise 4.2 ─────────────────────────────────────────────────────────
    {
      id: '4.2',
      title: 'Judge, Jury, and LLM',
      duration: '25 min',
      type: 'framework',
      skill: 'Using LLM-as-judge to evaluate outputs against explicit criteria',
      intro:
        "One of the hardest things about AI-generated outputs is knowing if they're actually good. 'It sounds right' is not a quality bar. LLM-as-judge gives you a structured, repeatable way to evaluate outputs against criteria you define.\n\nThe pattern: you write explicit evaluation criteria before generating the output. Then you ask Claude (in a new conversation) to evaluate the output against those criteria — as if it's a judge with no stake in the outcome.\n\nThis is how you get beyond 'it seems fine' to 'here's specifically why this works and where it falls short.'",
      learningObjective:
        "You'll write a judge prompt with explicit evaluation rubric, run it on a real output, and get specific, actionable feedback you can use to improve.",
      content: {
        type: 'framework',
        framework: {
          name: 'The Judge Prompt Structure',
          description:
            "Four elements that make a judge prompt genuinely useful rather than just returning vague feedback.",
          elements: [
            {
              letter: 'R',
              name: 'Role',
              description: 'Specify the evaluator persona — who is doing the judging',
              example: "You are a senior PM who has shipped 10+ features in a competitive SaaS market. You're known for cutting through vague requirements to ask the question everyone's avoiding.",
              color: '#3bc1cc',
            },
            {
              letter: 'C',
              name: 'Criteria',
              description: 'Explicit, specific evaluation rubric — 3-6 criteria, each defined',
              example: "Evaluate against: (1) Is the problem clearly defined? (2) Are success metrics specific and measurable? (3) Are the top 3 risks identified? (4) Is engineering scope clearly bounded?",
              color: '#02556c',
            },
            {
              letter: 'S',
              name: 'Scale',
              description: 'How to score each criterion',
              example: "Rate each criterion 1-5: 1=missing, 2=vague, 3=adequate, 4=strong, 5=exemplary. Explain your score.",
              color: '#ee3968',
            },
            {
              letter: 'A',
              name: 'Action',
              description: 'What specific improvements to recommend',
              example: "For each criterion scoring below 4, give me one specific sentence I should add or change to fix it.",
              color: '#3bc1cc',
            },
          ],
        },
        example: {
          label: 'Full judge prompt example:',
          prompt: "You are a senior product manager known for rigorous, specific requirements — not vague feature descriptions.\n\nEvaluate the following product brief against these criteria:\n1. Problem definition: Is the user problem specific and validated?\n2. Success metrics: Are they measurable, and do they connect to business outcomes?\n3. Risk identification: Are the top 3 risks to success named?\n4. Scope clarity: Does engineering know what's in and out?\n5. Stakeholder alignment: Is it clear who needs to approve this?\n\nFor each criterion, score 1-5 (1=missing, 5=exemplary) and explain in 1-2 sentences. Then list the 3 changes that would have the highest impact on overall quality.\n\n[Product brief to evaluate follows]\n---\n[paste the document]",
        },
      },
      task: {
        instructions:
          "Pick a real output from your work — a product brief, design spec, OKR, strategic memo, or even a prompt library entry from a previous exercise.\n\nStep 1: Write your evaluation criteria BEFORE judging (3-6 specific criteria for your output type).\nStep 2: Write the full judge prompt.\nStep 3: Run the judge in a fresh Claude conversation (important — fresh context prevents the judge from being biased toward the original).\nStep 4: Apply at least 2 of the judge's recommendations to improve the output.",
        fields: [
          {
            id: 'output_to_judge',
            label: 'What output are you evaluating? (Paste or summarize it):',
            placeholder:
              "The product brief / design spec / OKR / memo you're evaluating. Paste the full text or a detailed summary.",
            rows: 8,
            required: true,
          },
          {
            id: 'evaluation_criteria',
            label: 'Your evaluation criteria (3-6 specific criteria defined before running the judge):',
            placeholder:
              "1. [Criterion]: [What makes a score of 5 vs 1?]\n2. [Criterion]: ...\n3. [Criterion]: ...",
            rows: 6,
            required: true,
          },
          {
            id: 'judge_prompt',
            label: 'Your full judge prompt (paste it):',
            placeholder: 'The complete prompt you gave Claude to act as judge...',
            rows: 8,
            required: true,
          },
          {
            id: 'judge_verdict',
            label: "The judge's verdict (paste or summarize the scores and top recommendations):",
            placeholder:
              "Criterion scores: [e.g., Problem definition: 3/5 — ...]\nTop 3 recommendations: ...",
            rows: 6,
            required: false,
          },
          {
            id: 'improvements',
            label: 'The 2+ improvements you made based on the verdict:',
            placeholder:
              "Improvement 1: [What changed] — based on the judge's feedback about [criterion]\nImprovement 2: ...",
            rows: 4,
            required: true,
          },
        ],
      },
      coachContext:
        "Evaluate the LLM-as-judge exercise. Check: (1) Are the evaluation criteria specific and pre-defined — do they describe what a 5/5 score looks like vs. 1/5, not just 'is it good'? (2) Does the judge prompt include a role, criteria, scoring scale, AND action items? Missing elements make the judge less useful. (3) Did they run the judge in a FRESH conversation (critical for objectivity)? (4) Are the improvements genuinely substantive — do they respond to specific judge feedback? The key lesson: LLM-as-judge only works if your criteria are specific enough to tell Claude what 'good' actually means. Vague criteria produce vague verdicts.",
      evaluationCriteria: [
        'Evaluation criteria are specific (describe what 5/5 vs 1/5 looks like)',
        'Judge prompt includes all four elements (Role, Criteria, Scale, Action)',
        'Fresh conversation used for judging (noted in submission)',
        'Improvements are substantive and tied to specific judge feedback',
      ],
    },

    // ── Exercise 4.3 ─────────────────────────────────────────────────────────
    {
      id: '4.3',
      title: 'Model Matchmaker',
      duration: '20 min',
      type: 'playground',
      skill: 'Understanding when to use Opus vs. Sonnet vs. Haiku based on cost, speed, and quality needs',
      intro:
        "Most people use one model for everything. That's like using a Swiss Army knife when you need a scalpel — it works, but it's not the right tool.\n\nAnthropic's model lineup has a genuine performance ladder with significant cost differences. The skill is knowing when each model earns its cost, and when a faster, cheaper model does the job just as well.",
      learningObjective:
        "You'll run the same prompt on multiple models, observe the quality and speed differences, and build a personal decision framework for which model to use when.",
      content: {
        type: 'model_comparison',
        models: [
          {
            id: 'claude-opus-4-6',
            name: 'Claude Opus 4.6',
            emoji: '🏰',
            tagline: 'The most capable — for when quality is non-negotiable',
            strengths: ['Complex reasoning and analysis', 'Nuanced writing', 'Multi-step logic chains', 'Tasks where being wrong is expensive'],
            weaknesses: ['Slowest', 'Most expensive', 'Overkill for simple tasks'],
            bestFor: 'Strategy docs, complex analysis, final drafts of high-stakes documents',
          },
          {
            id: 'claude-sonnet-4-6',
            name: 'Claude Sonnet 4.6',
            emoji: '🏡',
            tagline: 'The workhorse — excellent quality at a reasonable cost',
            strengths: ['Fast and capable', 'Great for most everyday tasks', 'Consistent quality', 'Good reasoning'],
            weaknesses: ['Less depth than Opus on genuinely complex reasoning', 'Less creative on edge cases'],
            bestFor: 'Most PM/Design work, drafts, analysis, feedback, brainstorming — the default choice',
          },
          {
            id: 'claude-haiku-4-5-20251001',
            name: 'Claude Haiku 4.5',
            emoji: '🏠',
            tagline: 'The sprinter — fastest and cheapest, for volume tasks',
            strengths: ['Fastest response time', 'Lowest cost', 'Good for simple, structured tasks'],
            weaknesses: ['Less reasoning depth', 'Shorter effective context', 'Less nuanced writing'],
            bestFor: 'Classification, short summaries, simple Q&A, high-volume tasks where speed matters',
          },
        ],
        decisionFramework: [
          {
            question: 'Is being wrong expensive (stakeholder-facing, important decision)?',
            answer: 'Use Opus — the quality difference is worth it',
          },
          {
            question: 'Is this a long reasoning task with multiple steps or trade-offs?',
            answer: 'Use Opus or Sonnet — Haiku struggles with depth',
          },
          {
            question: "Is this a draft I'll revise anyway?",
            answer: 'Use Sonnet — fast enough to iterate, quality enough to be useful',
          },
          {
            question: 'Is this a simple, structured task I need fast? (classify, summarize, extract)',
            answer: 'Use Haiku — save the bigger models for bigger jobs',
          },
          {
            question: "Am I running this prompt 100+ times (pipeline, batch)?",
            answer: 'Use Haiku unless quality is critical — the cost savings compound',
          },
        ],
      },
      task: {
        instructions:
          "Use the Prompt Playground (with the model selector) to run the same prompt on at least 2 different models.\n\nChoose a prompt from your work — something you've run before and gotten a good result on. Observe:\n• Response quality differences\n• Response length and depth differences\n• Any reasoning differences\n\nThen build your personal model decision framework.",
        fields: [
          {
            id: 'test_prompt',
            label: 'The prompt you tested across models (paste it):',
            placeholder: 'The prompt you used for comparison — should be a real work prompt, not a trivial test.',
            rows: 5,
            required: true,
          },
          {
            id: 'model_comparison',
            label: 'What you observed when running the same prompt on different models:',
            placeholder:
              "Opus: [What was notable — quality, depth, reasoning?]\nSonnet: [How did it compare?]\nHaiku: [How much did quality drop?]\n\nKey difference: [The most meaningful quality gap you observed]",
            rows: 8,
            required: true,
          },
          {
            id: 'personal_framework',
            label: "Your personal model decision framework (when will YOU use each model):",
            placeholder:
              "Opus: I'll use this when... [specific situations in your role]\nSonnet: I'll use this when... [your default use cases]\nHaiku: I'll use this when... [tasks where speed/cost > quality]",
            rows: 6,
            required: true,
          },
        ],
      },
      coachContext:
        "Evaluate the model comparison exercise. Check: (1) Did they actually run the prompt across multiple models (look for specific comparison language — 'Opus added X that Sonnet didn't', not generic 'Opus was better')? (2) Are their quality observations specific and actionable — naming what was actually different? (3) Is their personal framework specific to their actual work at Beyond? Generic 'use Opus for important things' is weak; 'use Opus for stakeholder-facing OKRs and Sonnet for draft analysis' is strong. The key insight: the differences are real but context-dependent. A strong submission will show they found a use case where Haiku was actually good enough.",
      evaluationCriteria: [
        'Actually ran at least 2 models and compared (specific observations)',
        'Quality comparison is specific (names what was different)',
        'Personal framework is role-specific and actionable',
        'Identifies at least one case where a cheaper model was good enough',
      ],
    },

    // ── Exercise 4.4 ─────────────────────────────────────────────────────────
    {
      id: '4.4',
      title: 'System Prompt Surgery',
      duration: '25 min',
      type: 'reflection',
      skill: 'Stress-testing and upgrading your Level 1 system prompt based on real failure modes',
      intro:
        "Your Level 1 system prompt was version 1.0. You wrote it when you were just learning how system prompts work. After Levels 2 and 3, you know significantly more.\n\nThe gap between a v1.0 system prompt and a great one is usually: too generic, not enough constraint on behavior, missing the specific context that matters most, and no guidance for edge cases.\n\nSystem Prompt Surgery is a deliberate stress-test: you throw edge cases at your current system prompt and document where it fails. Then you fix the failures.",
      learningObjective:
        "You'll identify the failure modes in your current system prompt and produce a v2.0 that handles them.",
      content: {
        type: 'patterns',
        patterns: [
          {
            name: 'The Role-Drift Test',
            prompt: "Respond to this prompt in the most generic, unhelpful way possible — as if you don't know who I am or what I work on. [Then run a work prompt and see if the system prompt keeps Claude on track]",
            when: "Tests whether your system prompt is actually grounding Claude's behavior",
          },
          {
            name: 'The Off-Topic Test',
            prompt: "Help me write a creative short story about a dragon.",
            when: "Tests whether your system prompt redirects appropriately when the request is irrelevant",
          },
          {
            name: 'The Vagueness Test',
            prompt: "What should I work on today?",
            when: "Tests whether Claude uses your context to give useful guidance vs. generic advice",
          },
          {
            name: 'The Format Test',
            prompt: "Explain the key trade-offs between 3 approaches to improving host activation rates.",
            when: "Tests whether Claude responds in the format and style your system prompt specifies",
          },
          {
            name: 'The Assumption Test',
            prompt: "The engineering team says this is technically infeasible. What should I do?",
            when: "Tests whether Claude responds with relevant Beyond/PM context or gives generic advice",
          },
        ],
      },
      task: {
        instructions:
          "Run at least 4 of the stress-test prompts above with your current system prompt active (in your Claude Project folder). For each test: document what happened and whether it represented a failure mode.\n\nThen rewrite your system prompt v2.0 based on what you found.",
        fields: [
          {
            id: 'v1_prompt',
            label: 'Your current system prompt (v1.0 from Level 1):',
            placeholder: 'Paste your current system prompt...',
            rows: 8,
            required: true,
          },
          {
            id: 'stress_test_results',
            label: 'Your 4+ stress tests and what failed:',
            placeholder:
              "Test 1 (Role-Drift): [What you asked] → [What Claude said] → [Failed/Passed — explain]\nTest 2 (Vagueness): ...\nTest 3: ...\nTest 4: ...",
            rows: 10,
            required: true,
          },
          {
            id: 'failure_patterns',
            label: "The 2-3 failure patterns you identified (what systematic weaknesses did the tests reveal?):",
            placeholder:
              "Pattern 1: [Recurring weakness — e.g., 'Claude gives generic advice when it should reference Beyond's specific context']\nPattern 2: ...",
            rows: 4,
            required: true,
          },
          {
            id: 'v2_prompt',
            label: 'Your rewritten system prompt (v2.0) — highlight what changed:',
            placeholder:
              "Paste your improved system prompt. Add a comment next to each major change: [Changed this because: stress test revealed...]",
            rows: 12,
            required: true,
          },
        ],
      },
      coachContext:
        "Evaluate the system prompt surgery exercise. Check: (1) Did they run 4+ genuine stress tests, or just describe what they'd test? Look for actual test prompts and Claude's actual responses. (2) Are the failure patterns specific — do they name actual behaviors Claude exhibited, not just 'it wasn't specific enough'? (3) Does the v2.0 prompt actually address the identified failures? There should be a clear line between 'test revealed X' → 'v2.0 changes Y'. (4) Most importantly: is v2.0 genuinely better than v1.0? Compare them — does it add specificity where v1.0 was vague? Does it add behavioral constraints where v1.0 left gaps? The best improvements are surgical: they fix exactly what the tests revealed without bloating the prompt.",
      evaluationCriteria: [
        'At least 4 genuine stress tests with actual responses documented',
        'Failure patterns are specific behaviors, not generic observations',
        'v2.0 changes directly address the identified failures',
        'v2.0 is genuinely stronger (not just longer) than v1.0',
      ],
    },

    // ── Exercise 4.5 ─────────────────────────────────────────────────────────
    {
      id: '4.5',
      title: 'The Prompt Library',
      duration: '30 min',
      type: 'capstone',
      skill: 'Building a personal prompt library of reusable, tested, role-specific prompts',
      intro:
        "Prompt libraries are like code libraries — reusable, tested assets that save you from reinventing the wheel every time. The best ones are personal: they're built for your specific role, your specific work, your specific way of thinking.\n\nThe difference between someone with a prompt library and someone without one compounds over time. In 6 months, the person with a library is getting consistently excellent outputs in seconds on their recurring tasks. The person without is still writing mediocre single prompts for the same things they wrote mediocre prompts for last month.",
      learningObjective:
        "You'll build a personal prompt library of 8 prompts covering your most common tasks at Beyond — with each prompt documented, tested, and ready to use.",
      content: {
        type: 'walkthrough',
        steps: [
          {
            number: 1,
            title: 'List your top 8 recurring tasks',
            description:
              "Think about what you do repeatedly that involves writing, analysis, or decision-making. These are your highest-value prompt library candidates. Common PM tasks: OKR drafts, product briefs, stakeholder updates, user interview synthesis, competitive analysis, hypothesis formation. Common Design tasks: design critiques, user journey analysis, copy review, handoff documentation, research synthesis, accessibility audits.",
            tip: "Pick tasks where you currently get inconsistent results from Claude — those are the ones where a well-crafted prompt will have the most impact.",
          },
          {
            number: 2,
            title: 'Write each prompt using Level 1-4 principles',
            description:
              "Every prompt in your library should use what you've learned: COSTAR structure, the right model, the right level of context, hallucination prevention where needed, and output format specification.",
            tip: "Use your chain technique for complex tasks: split into Generate → Refine → Deliver rather than trying to do it all in one prompt.",
          },
          {
            number: 3,
            title: 'Test each prompt',
            description:
              "Don't add a prompt to the library until you've run it on a real task and verified it produces a useful output. A prompt library of untested prompts is wishful thinking.",
            tip: "Run the LLM-as-judge pattern on your library prompts — ask Claude to evaluate them against your evaluation criteria.",
          },
          {
            number: 4,
            title: 'Document each prompt',
            description:
              "Use the library format below. The documentation is what makes the library reusable — future-you will need to know when to use it and what quality to expect.",
            tip: "Store your library in your Claude Project folder, Notion, or anywhere you'll actually open it. A library you can't find is useless.",
          },
        ],
        playbookTemplate: {
          label: 'Prompt Library Entry Format (use this for each of your 8 prompts):',
          sections: [
            { title: 'Title', description: 'Short, descriptive name (e.g., "User Story Generator")' },
            { title: 'Purpose', description: 'What problem this prompt solves (1 sentence)' },
            { title: 'When to use', description: 'Specific situations when you reach for this prompt' },
            { title: 'Model', description: 'Which model works best (Opus / Sonnet / Haiku) and why' },
            { title: 'The prompt', description: 'The full, ready-to-use prompt text' },
            { title: 'How to customize', description: 'The variables to swap for different use cases' },
            { title: 'Expected output quality', description: 'What a good result looks like, and what to watch for' },
          ],
        },
      },
      task: {
        instructions:
          "Build your prompt library — 8 prompts, fully documented, tested on real tasks.\n\nFor each prompt, use the library entry format: Title, Purpose, When to use, Model, The prompt, How to customize, Expected output.\n\nPaste your complete library below. The AI Coach will evaluate each entry for quality, role-relevance, and Beyond product philosophy alignment.",
        fields: [
          {
            id: 'prompt_library',
            label: 'Your Prompt Library (8 entries, fully documented):',
            placeholder:
              "--- PROMPT 1 ---\nTitle: [Name]\nPurpose: [What it solves]\nWhen to use: [Specific situations]\nModel: [Opus/Sonnet/Haiku + why]\nPrompt: [Full prompt text]\nHow to customize: [Variables to swap]\nExpected output: [What good looks like]\n\n--- PROMPT 2 ---\n[etc.]",
            rows: 36,
            required: true,
          },
          {
            id: 'how_built',
            label: 'Which prompt in your library will have the highest daily impact, and why?',
            placeholder:
              "Name the prompt and explain: how often do you do this task, how much time does the prompt save, and what's the quality difference vs. your previous approach?",
            rows: 4,
            required: true,
          },
        ],
      },
      coachContext:
        "Evaluate the prompt library exercise. For each of the 8 prompts, check: (1) Is the purpose specific (not 'to help me write' but 'to generate a structured product brief for PM team review')? (2) Does the prompt itself use COSTAR/CRIT principles or show evidence of Level 1-4 learning? (3) Is the model choice justified (not just 'Sonnet because it's default')? (4) Are the customization variables actually identified and actionable? (5) Is the expected output quality description specific enough to evaluate against? Overall: is this a library you'd actually use vs. a homework assignment? The highest-impact reflection should name specific numbers (time saved, frequency of task).",
      evaluationCriteria: [
        '8 prompts covering distinct, real tasks (not variations of the same thing)',
        'Each prompt shows Level 1-4 principles (not vague requests)',
        'Model choices are justified with reasoning',
        'Customization variables are clearly identified',
        'Expected output quality is described specifically',
        'Highest-impact reflection is specific with numbers',
      ],
    },

    // ── Exercise 4.6 ─────────────────────────────────────────────────────────
    {
      id: '4.6',
      title: 'Capstone: Four Risks Evaluation',
      duration: '30 min',
      type: 'capstone',
      skill: "Applying Cagan's Four Risks framework via AI to systematically evaluate a real product idea",
      intro:
        "Marty Cagan's Four Risks framework is one of the most useful tools in product discovery: every product idea faces four types of risk that need to be evaluated before you commit to building.\n\nThe traditional way to evaluate these risks involves weeks of user research, technical spikes, and business case analysis. With AI, you can do a first pass in an hour — not as a replacement for real validation, but as a way to surface the riskiest assumptions before you invest weeks in the wrong direction.",
      learningObjective:
        "You'll use Claude to systematically evaluate a real product idea through all four risk lenses, and identify which risk requires the most immediate validation work.",
      content: {
        type: 'framework',
        framework: {
          name: "Cagan's Four Risks",
          description:
            "Every product idea faces four types of risk. Evaluate all four before committing resources. The goal isn't to eliminate risk — it's to know which risk is the most dangerous and validate it first.",
          elements: [
            {
              letter: 'V',
              name: 'Value Risk',
              description: 'Will customers actually pay for (or use) this?',
              example: "Prompt: 'Act as a skeptical customer who has heard a lot of SaaS pitches. Here's our proposed feature: [X]. Tell me why you wouldn't use it, even if it worked perfectly.'",
              color: '#3bc1cc',
            },
            {
              letter: 'U',
              name: 'Usability Risk',
              description: 'Can customers figure out how to use it?',
              example: "Prompt: 'Describe the 3 most likely points of confusion for a non-technical STR host trying to use this feature for the first time. What would they misunderstand?'",
              color: '#02556c',
            },
            {
              letter: 'F',
              name: 'Feasibility Risk',
              description: 'Can we actually build this with our current capabilities?',
              example: "Prompt: 'Identify the top technical assumptions embedded in this feature concept. Which assumption, if wrong, would require the most significant rework?'",
              color: '#ee3968',
            },
            {
              letter: 'B',
              name: 'Business Viability Risk',
              description: 'Even if it works, does it make business sense for us?',
              example: "Prompt: 'Evaluate whether this feature supports or undermines Beyond's core business model. Does it strengthen our 3-5x premium vs PriceLabs, or does it erode differentiation?'",
              color: '#252f38',
            },
          ],
        },
      },
      task: {
        instructions:
          "Pick a real product idea you're working on, have worked on recently, or find interesting — ideally something that hasn't been fully decided yet.\n\nRun a Four Risks evaluation using Claude. For each risk: (1) write the specific adversarial prompt you used, (2) summarize Claude's key concerns, (3) note whether you agreed with the assessment.\n\nThen write a 'risk verdict': which risk is highest, and what's the smallest experiment you could run to validate that specific risk in the next 2 weeks?",
        fields: [
          {
            id: 'product_idea',
            label: 'The product idea you\'re evaluating (describe it clearly):',
            placeholder:
              "Name the idea and provide enough context for Claude to evaluate it: what it does, who it\'s for, and how it fits into Beyond\'s product.",
            rows: 4,
            required: true,
          },
          {
            id: 'value_risk',
            label: 'Value Risk — Prompt used + Claude\'s key concerns + your agreement:',
            placeholder:
              "Prompt: [What you asked]\nClaude's concerns: [Key points]\nDo you agree? [Yes/No/Partially — and why]",
            rows: 6,
            required: true,
          },
          {
            id: 'usability_risk',
            label: 'Usability Risk — Prompt used + Claude\'s key concerns + your agreement:',
            placeholder: "Prompt: ...\nClaude's concerns: ...\nDo you agree? ...",
            rows: 6,
            required: true,
          },
          {
            id: 'feasibility_risk',
            label: 'Feasibility Risk — Prompt used + Claude\'s key concerns + your agreement:',
            placeholder: "Prompt: ...\nClaude's concerns: ...\nDo you agree? ...",
            rows: 6,
            required: true,
          },
          {
            id: 'viability_risk',
            label: 'Business Viability Risk — Prompt used + Claude\'s key concerns + your agreement:',
            placeholder: "Prompt: ...\nClaude's concerns: ...\nDo you agree? ...",
            rows: 6,
            required: true,
          },
          {
            id: 'risk_verdict',
            label: 'Risk Verdict: which risk is highest, and what\'s the smallest experiment to validate it?',
            placeholder:
              "Highest risk: [Value/Usability/Feasibility/Viability] — because [specific reason]\n\nSmallest experiment: [Specific, time-boxed test you could run in 2 weeks to validate or invalidate this risk]",
            rows: 5,
            required: true,
          },
        ],
      },
      coachContext:
        "Evaluate the Four Risks capstone. Check: (1) Did they pick a real, specific product idea — not a hypothetical? Generic ideas produce generic risk analysis. (2) Are the adversarial prompts they used genuinely adversarial — do they challenge the idea, not validate it? (3) Did they engage critically with Claude's concerns — do they agree/disagree with reasoning, or just accept everything? The best submissions will disagree with Claude on at least one point and explain why. (4) Is the 'smallest experiment' genuinely minimal and testable — specific enough that someone could run it in 2 weeks without additional planning? 'Do user research' is not an experiment. 'Show 5 enterprise hosts a mockup of X and see if they ask to sign up for beta' is an experiment.",
      evaluationCriteria: [
        'Real, specific product idea (not hypothetical or generic)',
        'Adversarial prompts are genuinely challenging (not leading)',
        'Critical engagement with Claude\'s concerns (not passive acceptance)',
        'Risk verdict identifies a specific risk with clear reasoning',
        'Smallest experiment is concrete, time-boxed, and executable',
      ],
    },
  ],

  assessment: {
    title: 'Level 4 Assessment',
    questions: [
      {
        id: 'q4_1',
        text: 'What is the key benefit of a multi-step prompt chain vs. a single prompt?',
        options: [
          'A) It gets longer responses',
          "B) Each step can do one thing well — generating breadth before filtering for quality, producing outputs no single prompt could hold in focus at once",
          'C) It saves time',
          "D) It avoids Claude's context window limits",
        ],
        correct: 'B',
        explanation:
          'The chain works because Generate (broad), Refine (evaluate), and Deliver (format) are fundamentally different types of cognitive tasks that produce better results when separated.',
      },
      {
        id: 'q4_2',
        text: 'When should you run an LLM-as-judge in a FRESH conversation rather than continuing the original?',
        options: [
          'A) Always — fresh conversations are always better',
          'B) When the conversation is more than 10 messages old',
          'C) When judging outputs from the same conversation — to prevent the judge from being biased toward the original context',
          'D) Only when evaluating competitor products',
        ],
        correct: 'C',
        explanation:
          'If you ask Claude to judge something it just created in the same conversation, it will bias toward defending the original. Fresh context = more objective evaluation.',
      },
      {
        id: 'q4_3',
        text: "When is Claude Haiku the RIGHT model to use?",
        options: [
          'A) Never — Sonnet is always better',
          'B) For the most important, stakeholder-facing documents',
          'C) For high-volume, structured tasks where speed and cost matter more than reasoning depth (classification, simple summaries, quick Q&A)',
          'D) Only when you\'re testing prompts',
        ],
        correct: 'C',
        explanation:
          'Haiku wins on speed and cost for simple, structured tasks. The savings compound dramatically on high-volume use cases. Save Sonnet/Opus for tasks that need reasoning depth.',
      },
    ],
    selfReflection: {
      id: 'sr4',
      question:
        "Which technique from Level 4 will change your day-to-day AI use the most — chains, LLM-as-judge, model selection, system prompt surgery, or the prompt library? Be specific about why.",
      placeholder:
        "Name the technique and describe a specific recurring task where you'll apply it and what the result will look like.",
    },
  },

  milestone: {
    title: 'Large Portfolio Unlocked!',
    emoji: '🏗️',
    message:
      "You're operating at a different level now. Chains, judges, model selection, a tested system prompt, and a prompt library that'll compound in value over time. You're not just using AI — you're engineering your AI workflows.",
    gerardJokeId: 'prompt_2',
    nextLevelTeaser:
      "Level 5 is where your PM or Design craft gets seriously amplified. OKRs, Opportunity Solution Trees, design critiques, behavioral design — all supercharged by what you've built in Levels 1-4.",
  },
}
