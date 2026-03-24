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

  // ──────────────────────────────────────────────────────────
  // EXERCISE 4.1 - Prompt Chaining
  // ──────────────────────────────────────────────────────────
  {
    id: '4.1',
    title: 'Prompt Chaining',
    subtitle: 'Multi-step workflows that build on themselves',
    duration: '30 min',
    description: `Until now, your prompts have been one-shot: ask a question, get an answer. Prompt chaining is the leap to multi-step workflows where the output of one prompt becomes the input to the next, with each step refining, transforming, or building on what came before.

This is how you go from "Claude wrote me a draft" to "Claude ran a 4-step analytical workflow and produced a final deliverable I'd be embarrassed to improve on."

The key insight: each step in a chain should do ONE thing well. A 4-step chain of focused prompts almost always outperforms a single mega-prompt trying to do everything at once.`,

    workedExample: {
      title: 'Churn Analysis Chain',
      description: 'A real 4-step chain for investigating host churn in a specific market.',
      steps: [
        {
          step: 1,
          name: 'Data Pull',
          prompt: 'Pull the LAMEN daily evolution for our top 20 customers in the [market] market over the last 6 months. Identify any customers whose enabled listing count declined by more than 10%.',
          output: 'A list of customers with declining LAMEN and the magnitude of decline.',
          why: 'Step 1 is pure data retrieval. Keep it simple and factual.'
        },
        {
          step: 2,
          name: 'Pattern Analysis',
          prompt: 'For the customers with declining LAMEN from the previous analysis, check their login frequency, BtM performance, and support ticket history. Do you see common patterns across the customers who are declining?',
          output: 'Clustered patterns: e.g., "3 of 5 declining customers had BtM below 10% and support tickets about price override confusion."',
          why: 'Step 2 adds multi-source data and asks for pattern recognition. It builds on step 1\'s output.'
        },
        {
          step: 3,
          name: 'Root Cause Hypothesis',
          prompt: 'Based on the patterns you identified, generate 3 hypotheses for why these customers are declining. For each hypothesis: state the hypothesis, the evidence supporting it, the evidence against it, and how we could validate it in the next 2 weeks.',
          output: 'Structured hypotheses with evidence mapping and validation plans.',
          why: 'Step 3 transforms data patterns into testable hypotheses. This is analytical work, not data retrieval.'
        },
        {
          step: 4,
          name: 'Action Plan',
          prompt: 'Pick the hypothesis with the strongest evidence and draft a one-page action plan for our team. Include: the problem statement, the intervention we should test, the success metric, and the timeline. Format this as a document I can share with my product trio.',
          output: 'A shareable one-page action plan ready for team review.',
          why: 'Step 4 produces the final deliverable. It\'s a different kind of work (communication + planning) than the analysis in steps 1-3.'
        }
      ],
      keyInsight: 'Notice that each step does a fundamentally different type of work: data retrieval, pattern recognition, hypothesis generation, and communication/planning. If you tried to do all four in one prompt, the output would be mediocre at every step. The chain lets Claude excel at each one.'
    },

    chainPatterns: [
      {
        name: 'Research > Analyze > Recommend',
        steps: ['Pull relevant data or information', 'Identify patterns and insights', 'Generate prioritized recommendations'],
        bestFor: 'Decision-making workflows, customer research, competitive analysis'
      },
      {
        name: 'Draft > Critique > Revise > Polish',
        steps: ['Generate a first draft', 'Critique the draft from a specific perspective', 'Revise based on the critique', 'Polish for final audience'],
        bestFor: 'Document creation, PRDs, strategy memos, presentations'
      },
      {
        name: 'Diverge > Evaluate > Converge',
        steps: ['Brainstorm many options', 'Evaluate each against criteria', 'Select and detail the best option'],
        bestFor: 'Solution design, ideation, feature exploration'
      },
      {
        name: 'Observe > Hypothesize > Test > Conclude',
        steps: ['Pull data and describe what you see', 'Generate hypotheses for the patterns', 'Design tests for each hypothesis', 'Synthesize into conclusions'],
        bestFor: 'Investigation workflows, churn analysis, experiment design'
      }
    ],

    task: {
      instruction: `Design and execute a 3-4 step prompt chain for a real task in your work. Don't just plan it - actually run all the steps in Claude Desktop (with Nexus-Product if data is involved).

Document:
1. Each step's prompt (what you asked)
2. A brief summary of each step's output
3. Why you structured the chain this way
4. How the final output compares to what you'd get from a single mega-prompt`,
      prompts: {
        pm_ic: `Design a chain for a real PM workflow. Good candidates:
- **Customer investigation:** Data pull > Pattern analysis > Hypothesis generation > Intervention plan
- **PRD creation:** Problem research > Solution brainstorm > Draft PRD > Self-critique and revision
- **Experiment design:** Hypothesis formation > Assumption mapping > Test design > Success criteria

Pick one that maps to something you actually need to deliver this sprint. The chain should produce a real deliverable, not a practice exercise.

Pro tip: after running the chain, add a 5th step: "Look at the chain I just ran. Where were the steps too broad? Where should I have split a step into two?"`,

        pm_director: `Design a chain for a strategic workflow:
- **Quarterly planning:** Pull team metrics > Identify biggest gaps vs. targets > Generate OKR candidates > Pressure-test each OKR against Cagan's four risks
- **Board prep:** Pull key business metrics > Identify the narrative > Draft the memo section > Critique from a board member's perspective
- **Prioritization:** List all candidate initiatives > Score each on RICE > Challenge the top-ranked items adversarially > Produce the final prioritized list with rationale

Director-level chains often need a "stakeholder calibration" step: "Rewrite this for [specific audience]" as a final step.`,

        design_ic: `Design a chain for a design workflow:
- **Design exploration:** Pull user data > Identify pain points > Brainstorm 5 design approaches > Evaluate each against Nielsen heuristics + Beyond's "feel in control" principle
- **Research synthesis:** Pull support tickets + Gong themes > Cluster into themes > Map themes to opportunity areas > Draft a research findings report
- **Design critique:** Describe your current design > Critique from 3 different user perspectives > Identify the top 3 issues > Propose revised approaches

The "Diverge > Evaluate > Converge" pattern is especially powerful for design work.`,

        design_lead: `Design a chain for a design leadership workflow:
- **Design strategy:** Pull product metrics + support data > Identify where design has highest leverage > Draft a design investment proposal > Critique from VP of Engineering perspective
- **Team process improvement:** Document current design process > Identify bottlenecks and pain points > Brainstorm process changes > Evaluate each against team capacity and PM partnership needs
- **Design quality audit:** Pull UX metrics across product areas > Rank areas by friction/quality > Draft improvement plan > Pressure-test against resource constraints

Add a "communication calibration" step: "Rewrite this for my cross-functional partners who need to approve design investment."`,

        eng_manager: `Design a chain for a real engineering management workflow:
- **Post-mortem creation:** Pull incident data > Analyze timeline and contributing factors > Generate root cause hypotheses > Draft post-mortem document with action items
- **Engineering investment proposal:** Pull support/performance data > Identify highest-impact technical debt > Estimate effort and business impact > Draft investment proposal for PM/leadership
- **Sprint retrospective synthesis:** Pull sprint data from Jira > Analyze patterns in what shipped vs. slipped > Cross-reference with deployment data > Produce a structured retro document with themes and action items
- **Capacity planning:** Pull team velocity history > Analyze by project type (feature vs. infrastructure vs. bug) > Model next quarter's capacity > Produce a capacity allocation proposal

Engineering management chains often need a "translation step" at the end: "Rewrite the technical findings for a non-technical audience."`
      }
    },

    coachContext: {
      evaluationCriteria: [
        'Did they actually execute the full chain (not just plan it)?',
        'Does each step do one focused thing (not trying to do everything)?',
        'Does each step build meaningfully on the previous step\'s output?',
        'Is the final output significantly better than what a single prompt would produce?',
        'Did they reflect on the chain structure and identify improvements?'
      ],
      seniorityNote: `Director-level chains should involve strategic synthesis and stakeholder communication steps. IC-level chains should involve craft-specific analysis and deliverable creation steps.`,
      exampleFeedback: {
        strong: `This chain is well-structured - each step does distinct work and the handoffs between steps are clean. Your observation that step 2 produced better analysis than a single mega-prompt is the key insight: by giving Claude the step 1 data first, it can focus entirely on pattern recognition without also trying to retrieve data. The meta-reflection at the end (splitting step 3 into two separate steps) shows you're internalizing how to design chains. Next level: try running steps 2 and 3 with different Claude models (Haiku for quick analysis, Opus for deep reasoning) to see how model selection changes chain quality.`,
        needsWork: `Your chain has 4 steps but steps 2 and 3 are doing essentially the same kind of work (both are analysis). A good chain has distinct step types: data retrieval, then analysis, then synthesis, then communication. Try restructuring so each step is a different cognitive task. Also, you jumped straight to the action plan without a critique step. Insert a "now poke holes in this analysis" step before the final deliverable - it consistently improves quality.`
      }
    }
  },

  // ──────────────────────────────────────────────────────────
  // EXERCISE 4.2 - LLM-as-Judge
  // ──────────────────────────────────────────────────────────
  {
    id: '4.2',
    title: 'LLM-as-Judge',
    subtitle: 'Using Claude to evaluate Claude',
    duration: '25 min',
    description: `One of the most powerful advanced techniques is using Claude to evaluate its own outputs - or to evaluate multiple options against explicit criteria. This is called LLM-as-Judge, and it's how you go from "this looks good to me" to systematic, criteria-based evaluation.

The technique works because Claude is surprisingly good at evaluating quality when you give it clear criteria - often better than it is at generating the best option on the first try. It's easier to judge than to create, and that's as true for LLMs as it is for people.

This is especially powerful for product and design work where you're comparing multiple options and need to justify your choice.`,

    technique: {
      steps: [
        { step: 1, action: 'Generate options', description: 'Ask Claude to produce 3-5 alternatives (feature ideas, design approaches, experiment designs, etc.)' },
        { step: 2, action: 'Define criteria', description: 'Establish 4-6 evaluation criteria specific to your context. Each criterion should be specific and measurable.' },
        { step: 3, action: 'Judge', description: 'Ask Claude to evaluate each option against each criterion on a 1-5 scale with written justification.' },
        { step: 4, action: 'Challenge the judgment', description: 'Push back on the ratings: "Why did option B score higher than option C on feasibility? What would change your assessment?"' },
      ],
      keyInsight: 'The written justification in step 3 is non-negotiable. Without it, Claude will default to giving everything 3s and 4s. When it has to explain its ratings, it produces much more differentiated and useful evaluations.'
    },

    workedExamples: {
      pm: {
        label: 'PM Example: Evaluating Feature Bets',
        setup: `I have 3 candidate features for Q2. Evaluate each against these criteria:
1. **Activation impact** (1-5): How likely is this to improve our 5% host activation rate?
2. **Premium justification** (1-5): Does this make Beyond worth 3-5x more than PriceLabs?
3. **Time to validate** (1-5): How quickly can we test the core assumption? (5 = within 2 weeks, 1 = requires a full quarter)
4. **Revenue potential** (1-5): What's the estimated impact on GBV or NRR?
5. **Team readiness** (1-5): Does our team have the skills and data to execute this well?

For each feature and each criterion, give a score AND a 2-sentence justification. Then rank the features overall and explain your ranking.

The features:
A) Guided 48-hour onboarding experience for new hosts
B) Portfolio health dashboard for property managers
C) AI-powered pricing explanation ("why is my price what it is?")`,
        whyItWorks: 'The explicit criteria prevent Claude from defaulting to "they\'re all good." The justification requirement produces real analytical thinking. And the final ranking forces a clear recommendation.'
      },
      design: {
        label: 'Design Example: Evaluating Design Directions',
        setup: `I have 3 design approaches for the pricing calendar redesign. Evaluate each against these criteria:
1. **First-time user clarity** (1-5): Can a new host understand this within 30 seconds?
2. **Power user efficiency** (1-5): Can a PM with 200 listings operate quickly?
3. **Information density** (1-5): Does this show enough data without feeling overwhelming?
4. **Consistency with "feel in control"** (1-5): Does this embody Beyond's principle of smarter defaults over more settings?
5. **Implementation complexity** (1-5): How feasible is this given our current design system and frontend architecture? (5 = straightforward, 1 = major rebuild)

For each approach and criterion, score 1-5 with 2-sentence justification. Then recommend one approach and explain the trade-off you're making.

The approaches:
A) Compact calendar with inline price editing and color-coded demand signals
B) Dashboard-first view with calendar as a secondary tab, emphasizing portfolio metrics
C) Split view - calendar on the left, contextual insights panel on the right`,
        whyItWorks: 'Design decisions are often subjective. The LLM-as-Judge technique forces structured evaluation that can be shared with PMs and engineers as evidence for a design recommendation.'
      }
    },

    task: {
      instruction: `Run a full LLM-as-Judge evaluation on a real decision you're facing. This works best when you have 3-5 options and need to choose one.

Steps:
1. Generate or list your options (Claude can help brainstorm if you don't have them yet)
2. Define 4-6 evaluation criteria specific to your situation
3. Ask Claude to score each option against each criterion (1-5 with justification)
4. Challenge at least 2 ratings you disagree with
5. Document the final ranking and your decision

Paste the evaluation matrix and your reasoning here.`,
      prompts: {
        pm_ic: `Pick a real prioritization decision. Good candidates:
- 3 features competing for your team's next sprint
- 3 different experiment designs for the same hypothesis
- 3 approaches to solving a customer pain point

Your criteria should include at least one Beyond-specific dimension: activation impact, premium justification, BtM improvement potential, or time to validate. Don't use generic criteria like "user value" - be specific about which users and what kind of value.

After the evaluation, add step 5: "Now argue against your top-ranked option. What's the strongest case for the #2 option instead?"`,

        pm_director: `Pick a strategic decision with real stakes:
- 3 OKR candidates competing for team focus next quarter
- 3 different investment allocations across your product areas
- 3 strategic bets for how to expand Beyond's platform

Your criteria should include business-level dimensions: NRR impact, competitive differentiation, platform strategy alignment, and resource efficiency. At the director level, also add a "what breaks if we're wrong?" criterion for each option.

After the evaluation, ask: "Rewrite the recommendation memo as if I need to present this to the board. Which criteria would the board weight differently than I did?"`,

        design_ic: `Pick a real design decision:
- 3 design approaches for a current feature
- 3 solutions to a UX problem you've identified
- 3 ways to improve a flow that has high drop-off

Your criteria should include UX-specific dimensions: first-time user clarity, power user efficiency, cognitive load, accessibility, and consistency with Beyond's design principles. Don't forget implementation complexity - it's a real constraint.

After the evaluation, ask: "Which approach would a user who is skeptical of algorithmic pricing prefer? Does that change the ranking?"`,

        design_lead: `Pick a design strategy or team decision:
- 3 approaches to structuring your team's design review process
- 3 ways to allocate design resources across product areas
- 3 design system investment strategies

Your criteria should include organizational dimensions: team growth impact, cross-functional alignment, design quality consistency, and scalability. Design leaders often need to optimize for the team's capability development, not just the output quality.

After the evaluation, ask: "Which approach builds the most design capability on my team over 12 months, even if it's not the fastest to show results?"`,

        eng_manager: `Pick a real engineering decision with multiple options. Good candidates:
- 3 approaches to addressing a technical debt problem (refactor, replace, or work around)
- 3 ways to allocate next quarter's engineering capacity across feature work, infrastructure, and hiring/ramp-up
- 3 candidates for your team's next infrastructure investment

Your criteria should include both technical AND business dimensions: implementation risk, maintenance burden, team growth impact, time-to-value for customers, and opportunity cost. The best engineering decisions optimize for business outcomes, not just technical elegance.

After the evaluation, ask: "Now evaluate these options from my PM partner's perspective. Would they rank them the same way? Where would they disagree, and why?"`
      }
    },

    coachContext: {
      evaluationCriteria: [
        'Did they define specific, measurable criteria (not generic ones)?',
        'Did the evaluation include written justification for each score (not just numbers)?',
        'Did they challenge at least 2 ratings they disagreed with?',
        'Is the final decision clearly connected to the evaluation (not just gut feel after the exercise)?',
        'Did they include at least one Beyond-specific criterion?'
      ],
      seniorityNote: `Director-level evaluations should include business-level criteria (NRR, competitive positioning, platform strategy) and a stakeholder communication step. IC-level evaluations should include craft-specific criteria (user clarity, implementation feasibility, design consistency).`,
      exampleFeedback: {
        strong: `Excellent evaluation structure. Your criteria are specific and measurable - "activation impact" with the definition "how likely is this to improve our 5% host activation rate" is much better than generic "user value." The justifications are doing real analytical work, not just restating the score. And your challenge of the feasibility rating was smart - Claude adjusted its assessment when you provided context about your team's current architecture. This technique is reusable: any time you're presenting a recommendation to stakeholders, include the evaluation matrix. It shows your reasoning, not just your conclusion.`,
        needsWork: `The evaluation has criteria but they're too vague. "Impact" and "ease" are the kind of generic criteria that produce generic evaluations. Be specific: impact on which metric? Ease for whom? Try: "Impact on host activation rate in the first 48 hours" and "Engineering effort given our current Compass architecture." Specificity in criteria produces specificity in evaluation. Also, you didn't challenge any ratings - that's where the technique gets really powerful. Find a score you disagree with and push back.`
      }
    }
  },

  // ──────────────────────────────────────────────────────────
  // EXERCISE 4.3 - Model Selection
  // ──────────────────────────────────────────────────────────
  {
    id: '4.3',
    title: 'Model Matchmaker',
    subtitle: 'The right model for the right job',
    duration: '20 min',
    description: `Not every task needs the most powerful (and expensive) model. Understanding when to use Claude Opus vs. Sonnet vs. Haiku is like knowing when to use a chainsaw vs. a handsaw vs. a pocket knife - the best tool depends on the job.

This isn't just about cost optimization (though that matters at scale). Different models genuinely produce different quality outputs for different types of tasks. A quick data formatting task might actually be WORSE with Opus because it overthinks it, while a nuanced strategic analysis genuinely needs the deeper reasoning.`,

    modelGuide: {
      models: [
        {
          name: 'Claude Opus (4)',
          strengths: 'Deep reasoning, nuanced analysis, complex multi-step tasks, creative writing, strategy work',
          bestFor: [
            'Strategic analysis with ambiguity ("evaluate this market opportunity")',
            'Complex prompt chains where reasoning quality compounds across steps',
            'Board memos and executive communications where nuance matters',
            'Adversarial analysis ("steelman the case against our strategy")',
            'PRDs and design specs where you need to anticipate edge cases'
          ],
          notWorthItFor: 'Simple data formatting, quick lookups, template filling, short emails',
          beyondExample: 'Use Opus when drafting the "Business Hypothesis" section of an OKR one-pager or when running a Cagan four-risks analysis on a product bet.'
        },
        {
          name: 'Claude Sonnet (4)',
          strengths: 'Strong balance of quality and speed, reliable for most professional tasks, good at following instructions',
          bestFor: [
            'Most daily PM/Design work: drafting, analysis, critique, brainstorming',
            'Nexus-Product data analysis and artifact creation',
            'COSTAR and CRIT framework prompts',
            'Document editing and refinement',
            'Structured evaluations (LLM-as-Judge with clear criteria)'
          ],
          notWorthItFor: 'Tasks where you need either maximum quality or maximum speed',
          beyondExample: 'Your daily driver. Use Sonnet for support ticket analysis, experiment result interpretation, meeting prep, and most artifact creation.'
        },
        {
          name: 'Claude Haiku (4.5)',
          strengths: 'Very fast, cost-efficient, good for structured and well-defined tasks',
          bestFor: [
            'Reformatting and restructuring text you\'ve already written',
            'Quick classification tasks ("categorize these 50 support tickets")',
            'Simple data extraction and summarization',
            'Generating boilerplate or template-based content',
            'Fast iteration cycles where you need many quick outputs'
          ],
          notWorthItFor: 'Tasks requiring nuanced judgment, creative problem-solving, or complex reasoning',
          beyondExample: 'Use Haiku when you need to quickly categorize a batch of Kustomer tickets by product area, or when reformatting a document from one template to another.'
        }
      ],
      decisionRule: 'When in doubt: start with Sonnet. If the output quality isn\'t sufficient for the stakes involved, escalate to Opus. If the task is simple and speed matters, drop to Haiku. Over time you\'ll develop intuition for which tasks benefit from which model.'
    },

    task: {
      instruction: `Run the same prompt on two different models and compare the outputs. Pick a task where you think model selection might matter, then test your hypothesis.

In the Prompt Playground (which uses Sonnet by default), write a prompt and run it. Then open a new Claude.ai conversation, switch to a different model (Opus for more complex reasoning, Haiku for speed), and run the same prompt. Compare:
1. Quality differences (nuance, depth, accuracy)
2. Speed differences
3. Which model was better for THIS specific task and why

Document your comparison here.`,
      prompts: {
        pm_ic: `Try a comparison that reveals real differences:
- **Sonnet vs. Opus:** Ask both to "evaluate the riskiest assumption in [your current feature spec] using Cagan's four risks framework." Opus will typically produce deeper reasoning about second-order effects.
- **Sonnet vs. Haiku:** Ask both to "reformat this meeting notes document into a structured action items list." Haiku will be faster and often equally good for structured tasks.

The goal isn't to always use the "best" model - it's to know when the quality difference matters enough to justify the speed/cost trade-off.`,

        pm_director: `At the director level, the Sonnet vs. Opus comparison matters most for strategic artifacts:
- Ask both to "draft a board memo section explaining why Beyond should invest in Owner Suite over expanding the pricing algorithm." Opus will typically produce more nuanced stakeholder-aware reasoning.
- Ask both to "summarize the top 5 risks in our Q2 plan." For this structured task, Sonnet is often sufficient.

Director-level insight: use Opus for artifacts that go to the board, investors, or executive team. Use Sonnet for internal team work. Use Haiku for data wrangling and formatting.`,

        design_ic: `Compare on design-relevant tasks:
- **Sonnet vs. Opus:** Ask both to "critique this onboarding flow from the perspective of a first-time host who is nervous about algorithmic pricing." Opus often produces more psychologically nuanced user perspectives.
- **Sonnet vs. Haiku:** Ask both to "generate 10 alternative labels for this button." For pure brainstorming with clear constraints, Haiku is fast and effective.

Designers should generally default to Sonnet for critique and analysis, and use Haiku for rapid iteration tasks like copy variants or layout options.`,

        design_lead: `Compare on design leadership tasks:
- **Sonnet vs. Opus:** Ask both to "evaluate whether our design team should invest in a component library or focus on shipping product work for the next quarter. Consider team development, cross-functional impact, and long-term design quality." Strategic organizational decisions genuinely benefit from Opus-level reasoning.
- **Sonnet vs. Haiku:** Ask both to "organize these 15 design feedback items into themes." Haiku handles structured categorization well.

The pattern for design leaders: Opus for strategy and organizational decisions, Sonnet for design critique and analysis, Haiku for information processing and formatting.`,

        eng_manager: `Compare on engineering management tasks:
- **Sonnet vs. Opus:** Ask both to "evaluate whether my team should invest 3 sprints in refactoring our pricing service, considering the trade-off against the PM's feature roadmap. Include the second-order effects on team velocity, incident rate, and developer experience." Opus handles multi-factor trade-off reasoning better.
- **Sonnet vs. Haiku:** Ask both to "reformat these sprint retro notes into a structured action items list grouped by theme." Haiku is fast and effective for structured reorganization.

For EMs: use Opus for engineering investment arguments (where the reasoning quality directly affects whether you get the investment), Sonnet for daily analysis and communication, Haiku for data processing and reformatting.`
      }
    },

    coachContext: {
      evaluationCriteria: [
        'Did they run the same prompt on two different models (not just theorize about differences)?',
        'Did they identify specific quality differences in the outputs?',
        'Is their conclusion about which model is better for the task well-reasoned?',
        'Did they consider the speed/cost/quality trade-off, not just quality alone?',
        'Can they articulate a personal model selection rule for their work?'
      ],
      seniorityNote: `Director-level users should focus on the Opus vs. Sonnet distinction for strategic artifacts. IC-level users should focus on the Sonnet vs. Haiku distinction for daily workflow efficiency.`,
      exampleFeedback: {
        strong: `Sharp comparison. Your observation that Opus produced a more nuanced stakeholder analysis while Sonnet produced a more structured one is exactly right - for strategy work, that nuance is worth the slower speed. Your personal rule ("Opus for anything going outside my team, Sonnet for everything else, Haiku for batch processing") is practical and actionable. One thing to experiment with: try using Haiku as step 1 in a prompt chain (data formatting/extraction) and Opus as the final step (synthesis/recommendation). Mixing models in a chain can give you both speed and quality.`,
        needsWork: `You tested both models but the task you chose (writing a short Slack message) isn't one where model quality differences show up much. Try a task with more analytical depth - a strategy evaluation, a complex critique, or a multi-factor trade-off analysis. The quality gap between models widens as task complexity increases. For simple tasks, all models are roughly equivalent, which is why Haiku is the smart choice for those.`
      }
    }
  },

  // ──────────────────────────────────────────────────────────
  // EXERCISE 4.4 - System Prompt Surgery
  // ──────────────────────────────────────────────────────────
  {
    id: '4.4',
    title: 'System Prompt Surgery',
    subtitle: 'Stress-test and sharpen your AI environment',
    duration: '25 min',
    description: `You created a system prompt in Level 1. You've been using it for a few levels now. Time to perform surgery on it - stress-testing it with edge cases, identifying where it falls short, and refining it based on real usage.

Great system prompts aren't written once - they evolve through deliberate testing and refinement. This exercise teaches you the skill of iterating on your AI environment the same way you'd iterate on a product: observe what's not working, hypothesize why, change one thing, and test again.`,

    surgerySteps: [
      {
        name: 'The Stress Test',
        description: 'Run 5 different types of prompts in your Project folder and note where the system prompt helps vs. where it falls short.',
        testPrompts: [
          'A quick question: "What\'s our activation rate?" (Does Claude use your context correctly?)',
          'A strategic question: "Should we prioritize activation or retention?" (Does it reason with your product philosophy?)',
          'A role-specific question: "Draft a one-pager for this idea" (Does the output match your role\'s needs?)',
          'An adversarial question: "Argue against our current product strategy" (Does it know enough to argue persuasively?)',
          'A communication task: "Write a Slack update on this project" (Does it match your tone and audience awareness?)'
        ]
      },
      {
        name: 'The Gap Analysis',
        description: 'After the stress test, identify the top 3 gaps: where did Claude give generic or wrong answers because your system prompt didn\'t cover something important?',
        commonGaps: [
          'Missing specific metrics (Claude invents numbers instead of saying "I don\'t know")',
          'Missing stakeholder context (Claude writes for the wrong audience)',
          'Missing "what not to do" instructions (Claude uses a communication style you don\'t want)',
          'Missing current priorities (Claude can\'t connect suggestions to what matters right now)',
          'Too much context (Claude gets confused about which instructions to prioritize)'
        ]
      },
      {
        name: 'The Revision',
        description: 'Revise your system prompt to address the top 3 gaps. Change ONE section at a time and re-test.',
      },
      {
        name: 'The Before/After',
        description: 'Run the same prompt against your old and new system prompt. Document the quality improvement.',
      }
    ],

    task: {
      instruction: `Perform surgery on your Level 1 system prompt:

1. Run the 5 stress test prompts (or create your own) in your Project folder
2. Identify the top 3 gaps
3. Revise the system prompt to address each gap
4. Run a before/after comparison on at least 1 prompt

Paste your revised system prompt and the before/after comparison here.`,
      prompts: {
        pm_ic: `Focus your stress test on the tasks you actually do most often:
- Drafting specs or experiment plans (does Claude use the right format and level of detail?)
- Customer research (does Claude know your product area and customer segment well enough?)
- Meeting prep (does Claude produce useful pre-reads or agendas?)

Common PM IC system prompt gaps: missing your team's current OKR, missing your specific product area focus, and missing instructions about when to push back vs. execute. If your system prompt just says "I'm a PM at Beyond," it needs to say which product area, which metrics, and what kind of PM work you do most.`,

        pm_director: `Focus your stress test on strategic and cross-functional tasks:
- Strategy documents (does Claude reason at the right altitude - portfolio level, not feature level?)
- Stakeholder communications (does Claude calibrate differently for engineering vs. executive vs. board?)
- Prioritization (does Claude know your team's constraints and capacity?)

Common Director system prompt gaps: missing stakeholder context (who you report to, who reports to you), missing instructions about strategic vs. tactical questions, and missing your decision-making framework. Directors should add: "Default to portfolio-level thinking. If I ask about a specific feature, help me connect it to the broader strategy."`,

        design_ic: `Focus your stress test on design-specific tasks:
- Design critique (does Claude use the right heuristics and know your design system?)
- UX copy (does Claude match Beyond's voice and your product area's terminology?)
- Research synthesis (does Claude know what kind of research evidence you value?)

Common Design IC system prompt gaps: missing your design system constraints, missing your preferred critique frameworks (Nielsen heuristics, cognitive walkthrough, etc.), and missing instructions about progressive disclosure and Beyond's "feel in control" principle. If Claude's design critique is generic, it's because your system prompt doesn't specify the design principles to evaluate against.`,

        design_lead: `Focus your stress test on leadership and organizational tasks:
- Team coaching (does Claude calibrate feedback for junior vs. senior designers?)
- Design strategy (does Claude reason about team capability and organizational dynamics?)
- Cross-functional communication (does Claude translate design rationale into PM/engineering language?)

Common Design Leader system prompt gaps: missing team composition and skill levels, missing the cross-functional dynamics you navigate, and missing your design quality standards. Add: "When I'm working on team-level decisions, consider the design team's development needs alongside output quality."`,

        eng_manager: `Focus your stress test on the tasks that define your EM role:
- Technical investment proposals (does Claude translate technical value into business language?)
- 1:1 and feedback preparation (does Claude know enough about your team dynamics to be useful?)
- Sprint planning analysis (does Claude understand your team's velocity patterns and capacity?)
- Cross-functional communication (does Claude calibrate technical depth for PM vs. VP audiences?)

Common EM system prompt gaps: missing your team's tech stack and architecture context, missing your relationship with your PM partner (who they are, what they prioritize), and missing instructions about defaulting to business-impact framing rather than technical detail.`
      }
    },

    coachContext: {
      evaluationCriteria: [
        'Did they run the full stress test (not just 1-2 prompts)?',
        'Did they identify specific gaps (not just "it could be better")?',
        'Are the revisions targeted at the gaps they identified (cause and effect)?',
        'Does the before/after comparison show a meaningful improvement?',
        'Is the revised system prompt still focused (not bloated with everything)?'
      ],
      seniorityNote: `Director-level system prompts should include strategic context and stakeholder awareness instructions. IC-level system prompts should include specific product area context and craft-level preferences.`,
      exampleFeedback: {
        strong: `Smart surgery. You identified that Claude was defaulting to feature-level thinking when you asked strategic questions, and your revision ("Default to portfolio-level thinking unless I specify a specific feature") directly fixes that. The before/after comparison is compelling - the revised system prompt produces a response that connects the feature question to your team's OKR, while the old prompt just answered the feature question in isolation. One more thing to try: add a "what not to do" section. Telling Claude "Don't use bullet points for strategy documents; use connected prose" or "Don't start with generic advice - start with the Beyond-specific angle" can eliminate recurring annoyances.`,
        needsWork: `You identified gaps but the revisions are additive (you added 3 paragraphs) rather than surgical (you changed specific sentences). System prompt surgery should be precise: change the minimum needed to fix the gap. Adding too much risks the "too much context" problem from Level 2. Also, your before/after comparison uses a different prompt than your stress test, so it's hard to tell if the revision actually fixed the gap you identified. Use the exact same prompt for a clean comparison.`
      }
    }
  },

  // ──────────────────────────────────────────────────────────
  // EXERCISE 4.5 - The Prompt Library
  // ──────────────────────────────────────────────────────────
  {
    id: '4.5',
    title: 'The Prompt Library',
    subtitle: 'Your reusable toolkit',
    duration: '30 min',
    description: `By now you've written dozens of prompts across 4 levels. Some of them were one-offs; others are patterns you'll use again and again. A Prompt Library is a curated collection of your best reusable prompts - templates you can grab, customize in 30 seconds, and run.

Think of it like a code library: instead of rewriting the same function every time, you have a well-tested version you can call with different parameters. The best PMs and Designers have these libraries (even if they don't call them that) - the prompts they've honed over time that consistently produce great output.`,

    starterLibraries: {
      pm_ic: {
        label: 'PM IC Starter Library',
        prompts: [
          {
            name: 'Customer Health Check',
            when: 'Before any customer meeting or account review',
            template: `Run a complete health check for [CUSTOMER]. Pull their account info, BtM performance, LAMEN trend over the last 6 months, and recent support tickets. Then give me a 3-paragraph assessment: what's going well, what's concerning, and what I should bring up in our meeting.`,
          },
          {
            name: 'Hypothesis Stress Test',
            when: 'Before committing to an experiment or feature direction',
            template: `Here's my hypothesis: [HYPOTHESIS]. List every assumption embedded in this hypothesis. For each, rate it: (a) validated with data, (b) reasonable but unvalidated, (c) risky. Then tell me: what's the cheapest test we could run in 2 weeks to validate the riskiest assumption?`,
          },
          {
            name: 'PRD Section Draft',
            when: 'When you need a strong first draft of a spec section',
            template: `[COSTAR STRUCTURE] Context: [your product area and the problem]. Objective: Draft the [SECTION] section of a PRD for [FEATURE]. Style: Evidence-based, connect every design decision to a user need or data point. Tone: Confident but honest about assumptions. Audience: My product trio + engineering team. Response: structured PRD section with problem, solution, success metrics, and open questions.`,
          },
          {
            name: 'Competitive Counter-Position',
            when: 'When evaluating a feature against competitive alternatives',
            template: `I'm building [FEATURE] at Beyond. You're PriceLabs' VP of Product. Draft your response: why should your customers NOT switch to Beyond for this capability? Be genuinely persuasive. Then switch back to my perspective and tell me: where is the PriceLabs argument strongest, and how should we design our feature to make that argument weaker?`,
          },
          {
            name: 'Experiment Design',
            when: 'When scoping an experiment or validation test',
            template: `I want to test: [WHAT]. The riskiest assumption is: [ASSUMPTION]. Design a minimum viable experiment that validates this assumption in [TIMEFRAME]. Include: hypothesis statement, test design, success metric with threshold, sample size consideration, and what we'll do with each possible result.`,
          },
          {
            name: 'Sprint Retro Data Pull',
            when: 'Before sprint retro or team standup',
            template: `Pull data on what we shipped last sprint: check PostHog for feature adoption metrics on [FEATURES], pull any experiment results, and check Kustomer for support tickets mentioning [FEATURE AREA] in the last 2 weeks. Summarize: what's working, what's not, and what should we investigate further?`,
          },
          {
            name: 'One-Pager Draft',
            when: 'When proposing a new initiative for OKR consideration',
            template: `Draft a one-pager for [PROJECT] using this structure: Project Overview (name, sponsor, owner), Quick Description (2-3 sentences), Business Hypothesis (what problem, expected impact, payback timeline), Engineering Effort (T-shirt size with rationale), MVP Definition, Not In Scope, Key Dependencies, Expected Impact, Risks & Open Questions. Be specific about metrics and assumptions. Flag where you're uncertain.`,
          }
        ]
      },
      pm_director: {
        label: 'PM Director Starter Library',
        prompts: [
          {
            name: 'OKR Quality Review',
            when: 'Reviewing team OKR proposals',
            template: `Review this OKR proposal against these criteria: (1) Is the objective outcome-based, not output-based? (2) Are the key results measurable with current instrumentation? (3) Is the scope right for one quarter? (4) Does it connect to our company-level strategy? (5) Using Cagan's four risks, which risk is this OKR primarily addressing? Give specific feedback on each criterion and suggest a revised version if needed.\n\n[OKR PROPOSAL]`,
          },
          {
            name: 'Portfolio Risk Scan',
            when: 'Weekly leadership prep or quarterly planning',
            template: `Pull health metrics for our top [N] enterprise customers by GBV. For each, check BtM, LAMEN trend, and login activity. Flag any customer showing 2+ warning signals (declining BtM, declining LAMEN, declining logins, increasing support tickets). Give me a 1-paragraph risk assessment for each flagged customer.`,
          },
          {
            name: 'Strategy Pressure Test',
            when: 'Before presenting strategy to leadership or board',
            template: `Here's our strategy for [AREA]: [STRATEGY]. Pressure-test it: (1) What's the riskiest assumption? (2) If PriceLabs copies this in 6 months, does our advantage hold? (3) Using Gibson Biddle's DHM model, is this delightful, hard-to-copy, and margin-enhancing? (4) What would Marty Cagan say is missing from this strategy? Be direct.`,
          },
          {
            name: 'Stakeholder Message Calibration',
            when: 'When the same update needs to reach different audiences',
            template: `I need to communicate [UPDATE/DECISION] to three audiences: (1) my engineering team, (2) my VP/executive stakeholder, (3) the sales team. Write a version for each that's calibrated to what they care about. Engineering cares about scope and technical implications. Exec cares about business impact and timeline. Sales cares about customer impact and competitive positioning.`,
          },
          {
            name: 'Prioritization Challenge',
            when: 'When the team or stakeholders disagree on priorities',
            template: `We're debating between [OPTION A] and [OPTION B]. Argue the strongest case for each side. Then identify the 1-2 key assumptions where the sides actually disagree (not everything - just the crux). Finally, propose the cheapest way to resolve the disagreement with evidence rather than opinion.`,
          }
        ]
      },
      design_ic: {
        label: 'Design IC Starter Library',
        prompts: [
          {
            name: 'Design Critique (Heuristic)',
            when: 'Before a design review or when self-reviewing',
            template: `[CRIT STRUCTURE] Context: I'm designing [FLOW/SCREEN] for [USER TYPE] at Beyond. Role: You're a UX expert evaluating against Nielsen's 10 usability heuristics, with special attention to Beyond's "feel in control without needing to control" principle. Instructions: For each heuristic, rate this design pass/concern/fail and explain why. Focus on the top 3 issues. Tone: Direct and specific.\n\n[DESIGN DESCRIPTION]`,
          },
          {
            name: 'User Perspective Simulator',
            when: 'When you need to stress-test a design for a specific persona',
            template: `Walk through [FLOW] as a [PERSONA: e.g., "first-time Airbnb host with one listing who is nervous about letting an algorithm set their prices"]. At each step, describe: what they see, what they think, what they feel, and what they do. Where do they hesitate? Where might they abandon? Where do they feel a sense of progress or control?`,
          },
          {
            name: 'Copy Variants',
            when: 'When writing UI copy, error messages, or onboarding text',
            template: `Write 5 variants of [COPY NEED] for [CONTEXT]. Each variant should take a different approach: (1) minimal/functional, (2) encouraging/warm, (3) specific/data-driven, (4) action-oriented, (5) empathetic/addressing concern. The user is [PERSONA]. Beyond's voice is confident but not salesy, helpful but not hand-holdy.`,
          },
          {
            name: 'Research Question Generator',
            when: 'Planning user research or interview sessions',
            template: `I'm researching [TOPIC] for [PRODUCT AREA]. Generate: (1) 5 open-ended interview questions that surface real behavior (not hypothetical preferences), (2) 3 tasks I could ask users to complete in a usability test, (3) 2 things I should observe but not ask about directly. Avoid leading questions and hypothetical framing ("would you...").`,
          },
          {
            name: 'Accessibility Audit Prompt',
            when: 'Reviewing a design for accessibility',
            template: `Audit this [FLOW/COMPONENT] for WCAG 2.1 AA compliance. Check: color contrast, keyboard navigation, screen reader compatibility, focus management, error handling, and form labeling. For each issue found, rate severity (critical/major/minor) and suggest a specific fix. Also flag: does this design work at 200% zoom?`,
          }
        ]
      },
      design_lead: {
        label: 'Design Lead Starter Library',
        prompts: [
          {
            name: 'Design Review Prep',
            when: 'Preparing to run a design critique session with your team',
            template: `I'm running a design review for [DESIGNER]'s work on [FEATURE]. Help me prepare: (1) What are the 3 most important questions to ask based on this design's context (activation, retention, power user, new user)? (2) What's the "feel in control without needing to control" test for this design? (3) What should I be looking for that a junior designer might miss?`,
          },
          {
            name: 'Design Investment Case',
            when: 'Making the case for design resources or design system work',
            template: `Build a data-informed case for [DESIGN INVESTMENT]. Pull: (1) support ticket volume for UX-related issues in the affected area, (2) any available experiment data showing design impact on metrics, (3) time estimates for how this investment reduces future design/dev effort. Frame the argument for [AUDIENCE: VP of Product / VP of Engineering / CEO] - they care about [THEIR PRIORITIES].`,
          },
          {
            name: 'Team Capability Assessment',
            when: 'Planning team development or hiring',
            template: `Evaluate our design team's capability against these dimensions: (1) user research skills, (2) interaction design craft, (3) visual design quality, (4) systems thinking, (5) cross-functional influence. For each dimension, I'll give you evidence of our current level. Then assess: where are the biggest gaps, and what's the most efficient way to close them - hiring, training, or process changes?`,
          },
          {
            name: 'Cross-Functional Translator',
            when: 'Explaining design decisions to non-design stakeholders',
            template: `I need to explain [DESIGN DECISION] to [AUDIENCE: engineering / PM leadership / executives]. They'll push back on [LIKELY OBJECTION]. Help me: (1) reframe the design rationale in terms they care about (engineering = technical feasibility and maintenance; PM = business impact and metrics; executives = revenue and competitive positioning), (2) anticipate their top 3 questions, (3) prepare concise answers for each.`,
          }
        ]
      }
    },

    task: {
      instruction: `Build your personal prompt library with at least 8 prompts. You can start with the role-specific starter library above, but you must customize at least 5 of them for your specific work AND add at least 3 of your own that aren't in the starter library.

For each prompt, include:
- **Name:** What you'll call it
- **When to use:** The trigger that tells you to reach for this prompt
- **Template:** The actual prompt with [VARIABLES] you'll fill in each time

Save this library in your Claude Project folder so it's always accessible.`,
      prompts: {
        pm_ic: `Start with the PM IC starter library but make it yours. Customize the templates for your specific product area, your specific customer segment, and your team's current priorities. Then add 3+ prompts for tasks unique to your role that aren't in the starter library.

Think about your last 2 weeks: what did you write, analyze, or create more than once? Each of those is a candidate for a prompt library entry. The best prompts are the ones you'll actually grab and use, not the most impressive-looking ones.`,

        pm_director: `Start with the PM Director starter library but customize for your specific teams, stakeholders, and strategic context. Then add 3+ prompts that address your unique challenges.

Director-level prompt libraries should include prompts for: coaching team members, preparing for executive reviews, and making cross-team trade-off decisions. These are the tasks that are uniquely yours and can't be delegated.`,

        design_ic: `Start with the Design IC starter library but customize for your specific product area and design system. Then add 3+ prompts that reflect your personal design practice.

Good candidates for your custom prompts: prompts for specific types of design work you do often (component design, flow optimization, onboarding UX), prompts for design tools you use (generating Figma frame descriptions, writing component documentation), and prompts for collaboration (presenting design rationale, responding to PM feedback).`,

        design_lead: `Start with the Design Lead starter library but customize for your team's specific challenges and your organizational context. Then add 3+ prompts for leadership tasks unique to your role.

Design leaders should include prompts for: 1:1 prep with direct reports, design quality calibration across the team, and communicating design impact to non-design stakeholders. These are high-leverage activities that AI can meaningfully accelerate.`,

        eng_manager: `Build your prompt library around the core EM workflows. Your starter set:

1. **Tech Debt Business Case** - "Translate this technical debt item into a business impact argument: [ITEM]. Include: customer impact, velocity impact, risk if unaddressed, estimated effort, and recommended priority vs. feature work."

2. **1:1 Prep** - "I have a 1:1 with [ENGINEER] tomorrow. Their recent work includes [CONTEXT]. Generate 3 discussion topics: one about their growth, one about a current challenge, and one about team dynamics. Frame each as an open question, not a directive."

3. **Sprint Retro Synthesis** - "Here are the themes from our last 3 sprint retros: [THEMES]. Identify: which themes are recurring (we keep talking about them but don't fix them), which are improving, and which are new. For the recurring ones, suggest a concrete intervention we haven't tried."

4. **Post-Mortem Draft** - "Draft a post-mortem for this incident: [INCIDENT DETAILS]. Include: timeline, contributing factors, root causes (use 5 Whys), customer impact, immediate remediation, and long-term prevention actions. Tone: blameless, learning-focused."

5. **Estimation Challenge** - "My team estimated this project at [ESTIMATE]. Challenge the estimate: what are we likely underestimating? What hidden complexity, integration points, or dependency risks aren't reflected? What would a more realistic range look like?"

6. **Stakeholder Translation** - "I need to explain [TECHNICAL DECISION] to [AUDIENCE: PM / VP / CEO]. Rewrite the explanation focusing on business impact, customer value, and timeline rather than technical detail. They care about [THEIR PRIORITIES]."

7. **Capacity Planning** - "We have [N] engineers for Q[X]. Current commitments: [LIST]. Historically we lose ~20% of capacity to support, incidents, and meetings. Model the realistic capacity and flag where we're over-committed."

8. **Hiring Case** - "Build the case for adding [ROLE] to my team. Include: what work isn't getting done without this role, the business impact of that gap, and what changes if we hire. Frame this for a VP-level audience approving headcount."

Customize these with your team's specific context and add 3+ more for tasks unique to your role.`
      }
    },

    coachContext: {
      evaluationCriteria: [
        'Does the library have at least 8 prompts?',
        'Are at least 5 customized for their specific work (not just copied from the starter)?',
        'Are at least 3 original prompts they created themselves?',
        'Does each prompt have a clear "when to use" trigger?',
        'Are the templates specific enough to be useful but flexible enough to reuse?',
        'Would they actually use this library in their daily work?'
      ],
      seniorityNote: `Director-level libraries should include strategic communication and team leadership prompts. IC-level libraries should include craft-specific and execution prompts.`,
      exampleFeedback: {
        strong: `This is a library you'll actually use - I can tell because every prompt maps to something you do regularly. The customization is strong: your "Customer Health Check" template includes your specific product area's key metrics, not just the generic ones. And your 3 original prompts are genuinely novel - the "stakeholder alignment pre-read" prompt is something I'd recommend other PMs adopt. Save this in your Project folder and commit to using at least 2 prompts from it per day for the next week. You'll refine them naturally through use.`,
        needsWork: `The library has 8 prompts but most are lightly modified versions of the starter library. The power of a prompt library is that it reflects YOUR specific workflow. For example, your "Customer Health Check" is identical to the starter - but your product area probably has specific metrics or data sources that matter most. Customize the template with your actual customer segments, your specific KPIs, and your meeting prep format. Also, your 3 original prompts are quite broad ("help me brainstorm"). Make them specific enough to produce consistently useful output every time you use them.`
      }
    }
  },

  // ──────────────────────────────────────────────────────────
  // EXERCISE 4.6 - Capstone: The Full Workflow
  // ──────────────────────────────────────────────────────────
  {
    id: '4.6',
    title: 'The Full Workflow',
    subtitle: 'Everything together on a real project',
    duration: '35 min',
    isCapstone: true,
    description: `The Level 4 capstone brings together every technique from this level: prompt chaining, LLM-as-Judge, model selection, and your prompt library. You'll use them all on a single real project to produce a deliverable that demonstrates mastery.

This is the level where you stop being someone who "uses AI" and start being someone whose AI workflow is a genuine competitive advantage.`,

    task: {
      instruction: `Pick a real project or initiative you're working on. Use the following workflow:

1. **Prompt Chain** (at least 3 steps): Research > Analyze > Produce a deliverable
2. **LLM-as-Judge**: If your chain produces options, evaluate them systematically
3. **Model Selection**: Use the right model for at least 2 different steps
4. **Prompt Library**: Use at least 2 prompts from your library (Exercise 4.5)

The final deliverable should be something you'll actually use - not a practice exercise.

Document:
- The chain you ran (each step's prompt and summary of output)
- Any LLM-as-Judge evaluation you performed
- Which models you used for which steps and why
- Which prompt library entries you used
- The final deliverable (paste or link)`,
      prompts: {
        pm_ic: `Produce a real PM deliverable using the full workflow:
- **Option A:** A complete experiment plan for a hypothesis you're testing (chain: research pain point > generate hypotheses > design experiment > evaluate experiment designs with LLM-as-Judge > produce final plan)
- **Option B:** A competitive analysis artifact (chain: pull market data > analyze competitive positioning > evaluate strategic responses with LLM-as-Judge > produce shareable brief)
- **Option C:** A customer retention intervention (chain: pull at-risk customer data via Nexus > analyze churn patterns > generate intervention options > evaluate with LLM-as-Judge > produce action plan)

Whichever you choose, the deliverable should be ready to share with your team.`,

        pm_director: `Produce a strategic deliverable using the full workflow:
- **Option A:** A Q3 OKR proposal for one of your teams (chain: pull team metrics > identify gaps > generate OKR candidates > evaluate with LLM-as-Judge against strategic priorities > produce polished proposal using Opus for final draft)
- **Option B:** A board memo section on your area (chain: pull business metrics > synthesize narrative > draft memo > pressure-test from board perspective > revise using Opus)
- **Option C:** A prioritization framework for a cross-team trade-off (chain: enumerate options > evaluate each on strategic criteria > LLM-as-Judge evaluation > produce recommendation with dissenting view)

Use Opus for the final communication step - board-quality thinking requires it.`,

        design_ic: `Produce a real design deliverable using the full workflow:
- **Option A:** A design spec for a feature you're working on (chain: research user needs via Nexus data > brainstorm 3 design approaches > evaluate with LLM-as-Judge against usability criteria > produce detailed spec for winning approach)
- **Option B:** A research synthesis report (chain: pull support data + Gong themes > cluster into insights > generate design implications > evaluate priority of each implication > produce shareable research report)
- **Option C:** A UX improvement plan for a high-friction flow (chain: pull PostHog data on current flow performance > identify drop-off points > generate redesign options > evaluate with LLM-as-Judge > produce improvement plan)

Use your Design Critique prompt from your library on the final deliverable.`,

        design_lead: `Produce a design leadership deliverable using the full workflow:
- **Option A:** A design strategy document for your team (chain: pull product metrics across your areas > identify highest-leverage design opportunities > evaluate investment options with LLM-as-Judge > produce strategy doc using Opus)
- **Option B:** A design impact report for stakeholders (chain: pull experiment results + support data + adoption metrics > synthesize design's measurable impact > LLM-as-Judge evaluation of narrative strength > produce polished report)
- **Option C:** A design quality improvement plan (chain: audit current design patterns against heuristics > identify systemic quality issues > generate process/system improvements > evaluate with LLM-as-Judge > produce plan with timeline)

This should be something you'd present at a leadership review or include in a quarterly planning document.`,

        eng_manager: `Produce a real engineering leadership deliverable using the full workflow:
- **Option A:** An engineering investment proposal (chain: pull support/performance data > analyze technical debt impact > generate investment options > evaluate with LLM-as-Judge on business impact criteria > produce proposal)
- **Option B:** A team capacity plan for next quarter (chain: pull sprint velocity history > analyze capacity by work type > model next quarter's allocation > evaluate allocation options against PM roadmap > produce capacity plan using Opus for strategic framing)
- **Option C:** A cross-functional alignment document (chain: pull team metrics + PM roadmap + support trends > identify misalignment between engineering investment and business priorities > draft alignment proposal > pressure-test from PM perspective > produce final document)

The deliverable should be something you'd present at your next planning meeting or share with your VP.`
      }
    },

    assessment: {
      questions: [
        {
          question: 'What\'s the main advantage of a 4-step prompt chain over a single detailed prompt?',
          options: [
            'Prompt chains are faster',
            'Each step can focus on one type of cognitive work, producing higher quality at each stage',
            'Prompt chains use less context window',
            'Claude prefers receiving shorter prompts'
          ],
          correct: 1,
          explanation: 'A chain breaks complex work into focused steps - data retrieval, analysis, synthesis, communication. Claude can excel at each step when it\'s not trying to do everything at once. The quality compounds across steps.'
        },
        {
          question: 'When using LLM-as-Judge, what makes the evaluation most useful?',
          options: [
            'Using the most expensive model for judging',
            'Having Claude score on a 1-10 scale',
            'Requiring written justification for each rating against specific criteria',
            'Running the evaluation 3 times and averaging'
          ],
          correct: 2,
          explanation: 'Written justifications force differentiated analysis. Without them, Claude defaults to giving everything middling scores. Specific criteria prevent generic evaluation. The justification is often more valuable than the score itself.'
        },
        {
          question: 'When should you escalate from Sonnet to Opus?',
          options: [
            'Always use Opus for the best quality',
            'When the task involves nuanced reasoning, strategic ambiguity, or high-stakes communication',
            'When the prompt is longer than 500 words',
            'When you\'re using prompt chaining'
          ],
          correct: 1,
          explanation: 'Opus shines on tasks with nuance and ambiguity - strategy, board communications, complex trade-off analysis. For structured tasks with clear criteria, Sonnet is equally good and faster. Model selection is about matching capability to task type, not defaulting to the "best" model.'
        }
      ],
      selfReflection: `How has your approach to using Claude changed since Level 1? What technique from Level 4 do you think will have the biggest impact on your daily work?`
    },

    coachContext: {
      evaluationCriteria: [
        'Did they use all 4 techniques (chaining, LLM-as-Judge, model selection, prompt library)?',
        'Is the prompt chain well-structured (each step does distinct work)?',
        'Did they use LLM-as-Judge with specific criteria and written justification?',
        'Did they make a deliberate model selection choice (not just defaulting to one model)?',
        'Is the final deliverable genuinely useful (not a practice exercise)?',
        'Is the quality level appropriate for sharing with their team?'
      ],
      seniorityNote: `Director-level capstones should demonstrate strategic synthesis and stakeholder-ready deliverables. IC-level capstones should demonstrate craft excellence and practical utility.`,
      exampleFeedback: {
        strong: `This is the work of someone who genuinely knows how to leverage AI. Your 4-step chain is well-designed - the handoffs between steps are clean and each step adds distinct value. Using Haiku for the data extraction step and Opus for the final synthesis was a smart model selection call that saved time without sacrificing quality where it matters. The LLM-as-Judge evaluation on the 3 strategic options includes genuinely differentiated scores with reasoning I'd be willing to present to leadership. And you pulled 2 prompts from your library and adapted them for this context - that's the library working as designed. This deliverable is ready to share.`,
        needsWork: `You used all 4 techniques but they feel bolted on rather than integrated. The LLM-as-Judge evaluation happens after you've already made your decision, which makes it a rubber stamp rather than a decision tool. Try running the evaluation BEFORE you commit to an option. Also, your model selection was "I used Sonnet for everything" which isn't wrong but misses the opportunity to use Haiku for data extraction (faster) or Opus for the final deliverable (higher quality). The prompt library entries you used are generic rather than customized - that's a sign to revisit Exercise 4.5.`
      }
    },

    milestone: {
      message: `You're managing a Large Portfolio now. Prompt chaining, LLM-as-Judge, model selection, and a personal prompt library - you've got a complete advanced toolkit. You're not just using AI anymore; you're orchestrating it.`,
      dadJoke: `Why did the prompt library go to therapy? It had too many unresolved templates. Gerard says this is the kind of joke that only lands if you've actually built a prompt library, which you have, so congratulations and condolences.`,
      nextLevel: `Level 5: The Property Manager - where AI meets world-class product management and design craft. This is where OKR one-pagers, Teresa Torres opportunity trees, and Cagan's four risks get the AI treatment. Your deliverables from this level go directly into your team's OKRs.`
    }
  }
],

  assessment: {
      questions: [
        {
          question: 'What\'s the main advantage of a 4-step prompt chain over a single detailed prompt?',
          options: [
            'Prompt chains are faster',
            'Each step can focus on one type of cognitive work, producing higher quality at each stage',
            'Prompt chains use less context window',
            'Claude prefers receiving shorter prompts'
          ],
          correct: 1,
          explanation: 'A chain breaks complex work into focused steps - data retrieval, analysis, synthesis, communication. Claude can excel at each step when it\'s not trying to do everything at once. The quality compounds across steps.'
        },
        {
          question: 'When using LLM-as-Judge, what makes the evaluation most useful?',
          options: [
            'Using the most expensive model for judging',
            'Having Claude score on a 1-10 scale',
            'Requiring written justification for each rating against specific criteria',
            'Running the evaluation 3 times and averaging'
          ],
          correct: 2,
          explanation: 'Written justifications force differentiated analysis. Without them, Claude defaults to giving everything middling scores. Specific criteria prevent generic evaluation. The justification is often more valuable than the score itself.'
        },
        {
          question: 'When should you escalate from Sonnet to Opus?',
          options: [
            'Always use Opus for the best quality',
            'When the task involves nuanced reasoning, strategic ambiguity, or high-stakes communication',
            'When the prompt is longer than 500 words',
            'When you\'re using prompt chaining'
          ],
          correct: 1,
          explanation: 'Opus shines on tasks with nuance and ambiguity - strategy, board communications, complex trade-off analysis. For structured tasks with clear criteria, Sonnet is equally good and faster. Model selection is about matching capability to task type, not defaulting to the "best" model.'
        }
      ],
      selfReflection: `How has your approach to using Claude changed since Level 1? What technique from Level 4 do you think will have the biggest impact on your daily work?`
    },

  milestone: {
      message: `You're managing a Large Portfolio now. Prompt chaining, LLM-as-Judge, model selection, and a personal prompt library - you've got a complete advanced toolkit. You're not just using AI anymore; you're orchestrating it.`,
      dadJoke: `Why did the prompt library go to therapy? It had too many unresolved templates. Gerard says this is the kind of joke that only lands if you've actually built a prompt library, which you have, so congratulations and condolences.`,
      nextLevel: `Level 5: The Property Manager - where AI meets world-class product management and design craft. This is where OKR one-pagers, Teresa Torres opportunity trees, and Cagan's four risks get the AI treatment. Your deliverables from this level go directly into your team's OKRs.`
    },
}
