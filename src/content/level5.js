// ─── Level 5: The Property Manager ──────────────────────────────────────────
// Full content — PM/Design craft amplified by AI (heavy role branching)
//
// Each exercise has a `track` property: 'pm', 'design', or 'all'
// LevelView filters exercises based on user role.
// Users can also manually switch tracks.

import { BEYOND_OKR_TEMPLATE, BEYOND_STRATEGIC_CONTEXT } from './beyondContext.js'

export const LEVEL5 = {
  id: 5,
  title: 'The Property Manager',
  theme: "You're running the business, not just listings",
  focus: 'PM and Design craft amplified by AI — major role branching',
  duration: '~2.5 hours',
  icon: '🏢',
  propertyStage: 'manager',
  color: '#ee3968',
  locked: false,
  comingSoon: false,
  hasTracks: true,
  description:
    "PM Track: OKRs, Opportunity Solution Trees, competitive analysis, strategy. Design Track: design critiques, journey mapping, behavioral design, accessibility. Both supercharged by AI.",

  exercises: [

  // ──────────────────────────────────────────────────────────
  // EXERCISE 5P.1 - The One-Pager
  // ──────────────────────────────────────────────────────────
  {
    id: '5P.1',
    title: 'The One-Pager',
    subtitle: 'AI-assisted business cases that survive scrutiny',
    duration: '30 min',
    track: 'pm',
    description: `The one-pager is Beyond's format for proposing new initiatives. It forces clarity: if you can't explain the problem, hypothesis, MVP, and expected impact in one page, you haven't thought it through.

Most one-pagers fail for the same reasons: vague problem statements, unmeasurable hypotheses, MVPs that aren't actually minimal, and impact estimates pulled from thin air. Claude can help you avoid all of these - but only if you use it as a thinking partner, not a ghostwriter.

This exercise teaches you to use Claude to draft, then adversarially critique, then refine a one-pager until it would survive a tough product review.`,

    template: {
      sections: [
        { name: 'Project Overview', fields: ['Project Name', 'Business Sponsor(s)', 'Project Owner', 'Date Created'] },
        { name: 'Quick Description', guidance: 'A brief, 2-3 sentence summary of what this project is and why it matters.' },
        { name: 'Business Hypothesis / Goals', guidance: 'What business problem does this solve? What is the expected impact? How long is expected payback?' },
        { name: 'Engineering Effort', guidance: 'T-shirt size: Small (1-2 weeks) / Medium (3-6 weeks) / Large (6+ weeks)' },
        { name: 'MVP Definition', guidance: 'What is the minimum viable product or first iteration we can release to test this hypothesis?' },
        { name: 'Not In Scope', guidance: 'What is explicitly not included in this phase?' },
        { name: 'Key Dependencies', guidance: 'What other teams, systems, or business requirements are required for success?' },
        { name: 'Expected Impact', guidance: 'Anticipated business or customer outcomes (revenue, engagement, cost savings, efficiency, etc.)' },
        { name: 'Risks & Open Questions', guidance: 'Biggest risks, concerns, or unanswered questions.' }
      ]
    },

    workflow: {
      steps: [
        {
          step: 1,
          name: 'Draft with Claude',
          prompt: `I need to write a one-pager for [PROJECT]. Here's what I know so far: [ROUGH NOTES].

Draft a one-pager using Beyond's template. For sections where I haven't given you enough information, don't make things up - flag them as "[NEEDS INPUT: specific question]" so I know what to fill in.

Be specific about the Business Hypothesis - it should be testable, not just "this will help users." Frame the MVP as the smallest thing we can build to learn whether the hypothesis is true.`,
        },
        {
          step: 2,
          name: 'Adversarial Critique',
          prompt: `Now critique this one-pager as if you're a skeptical group PM who's seen 100 one-pagers, most of them bad. Specifically:

1. Is the problem statement strong enough that engineering would be excited to solve it?
2. Is the hypothesis actually testable with the proposed MVP?
3. Could we make the MVP even smaller and still learn what we need to learn?
4. Are the impact estimates grounded in evidence, or are they aspirational?
5. What's the biggest assumption that could invalidate this entire project?
6. Using Beyond's evaluation framework: does this justify our premium? Does it address activation, retention, or expansion?`,
        },
        {
          step: 3,
          name: 'Revise',
          prompt: `Based on the critique, revise the one-pager. Address each weakness directly. If you can't fix a weakness because we don't have the data, move it to "Risks & Open Questions" with a plan to resolve it.`,
        },
        {
          step: 4,
          name: 'Final Polish (use Opus)',
          prompt: `Final pass. Ensure: (1) every section is specific and evidence-based, (2) the MVP is genuinely minimal, (3) the hypothesis could be validated or invalidated within one quarter, (4) the impact section connects to a business metric that leadership cares about (NRR, activation rate, BtM, GBV). Make it crisp enough that someone could read it in 3 minutes and make a go/no-go decision.`,
        }
      ]
    },

    task: {
      instruction: `Write a real one-pager for a project you're working on (or considering proposing). Use the 4-step workflow above: Draft > Critique > Revise > Polish.

The deliverable should be ready to submit for OKR consideration. Not a practice exercise - a real business case.

Paste the final one-pager here.`,
      prompts: {
        pm_ic: `Pick a feature or initiative you genuinely believe your team should pursue. It could be something already in your backlog, something from a customer conversation, or a new idea.

The one-pager should be scoped to something your product trio could ship. The MVP should be achievable in one sprint or less. The hypothesis should be testable with real data.

After the 4-step workflow, add a 5th step: "Ask Claude to evaluate this one-pager using Beyond's 7-question product idea evaluation framework." This connects the one-pager to your product culture.`,

        pm_director: `Pick an initiative at the team or portfolio level - something that would be an OKR for one of your teams, or a strategic bet you're considering proposing to leadership.

Director-level one-pagers need to address: why this over other options (opportunity cost), how it connects to company strategy, and what success looks like at 6 and 12 months. The business hypothesis should be framed in terms leadership cares about: NRR impact, competitive positioning, or platform strategy.

After the 4-step workflow, add: "Rewrite the Quick Description as if it's the opening line of a board presentation. It needs to land in 15 seconds."`
      }
    },

    coachContext: {
      evaluationCriteria: [
        'Is the problem statement specific and evidence-based (not "users need X")?',
        'Is the hypothesis testable and falsifiable?',
        'Is the MVP genuinely minimal (could it be smaller and still test the hypothesis)?',
        'Are impact estimates connected to real business metrics, not vanity metrics?',
        'Did they use the adversarial critique step and actually address the weaknesses?',
        'Is this specific enough that someone could make a go/no-go decision from reading it?'
      ],
      seniorityNote: `PM Director one-pagers should address portfolio-level trade-offs, strategic alignment, and stakeholder considerations. PM IC one-pagers should focus on specific user problems, testable hypotheses, and execution clarity.`,
      exampleFeedback: {
        strong: `This one-pager would survive a tough product review. The problem statement is grounded in real data (you cited the specific churn cohort and percentage), the hypothesis is testable ("if we reduce onboarding from 14 steps to 6, hosts who complete setup within 48 hours will increase by X%"), and the MVP is genuinely minimal. I especially like that the adversarial critique caught the gap in your impact estimates and you moved it to Risks rather than pretending you had data you don't. That's the mark of a credible one-pager - honest about uncertainty.`,
        needsWork: `The one-pager has the right structure but several sections are too vague to be actionable. "Improve user experience" is not a hypothesis - it's a goal. Reframe it as: "We believe [specific change] will cause [specific metric] to improve by [amount] because [evidence/reasoning]." Also, your MVP includes 4 features - that's not a minimum viable anything. What's the ONE thing you could build to test the core hypothesis? Strip everything else to "Not In Scope."`
      }
    }
  },

  // ──────────────────────────────────────────────────────────
  // EXERCISE 5P.2 - Opportunity Mapping
  // ──────────────────────────────────────────────────────────
  {
    id: '5P.2',
    title: 'Opportunity Mapping',
    subtitle: 'Teresa Torres meets Claude',
    duration: '30 min',
    track: 'pm',
    description: `Opportunity Solution Trees (Teresa Torres) are one of the most powerful frameworks for connecting outcomes to discovery. The tree maps: Desired Outcome > Opportunities (customer needs/pain points) > Solutions > Experiments.

Most teams skip the Opportunity layer - they jump from "we need to improve activation" straight to "let's build a setup wizard." Claude can help you slow down and map the full opportunity space before committing to a solution. This is discovery work accelerated by AI.`,

    workedExample: {
      outcome: 'Improve host activation rate from 5% to 8%',
      opportunities: [
        {
          opportunity: 'Hosts don\'t understand the value proposition before committing to setup',
          evidence: 'Gong calls show hosts asking "why should I trust an algorithm?" in first conversations',
          solutions: ['Show BtM results from similar hosts during onboarding', 'Free 30-day trial with price recommendations visible but not pushed to channels'],
        },
        {
          opportunity: 'Setup process requires too many decisions before showing any value',
          evidence: 'PostHog funnel shows 60% drop-off between step 3 (connect PMS) and step 5 (configure preferences)',
          solutions: ['Skip-ahead option: enable pricing with smart defaults, configure later', 'Progressive onboarding: basic setup in 3 steps, advanced setup as optional follow-up'],
        },
        {
          opportunity: 'Hosts with one listing don\'t see Beyond as worth the effort vs. manual pricing',
          evidence: 'Single-listing hosts churn at 2x the rate of 3+ listing hosts within 90 days',
          solutions: ['Simplified "one listing" mode with zero-config pricing', 'Market comparison showing what they\'re leaving on the table vs. manual pricing'],
        }
      ],
      keyInsight: 'Notice that each opportunity is grounded in evidence - not assumptions. And each has multiple possible solutions. The tree prevents premature commitment to a single solution before exploring the full opportunity space.'
    },

    task: {
      instruction: `Build an Opportunity Solution Tree for a real outcome your team is pursuing. Use Claude to:

1. Start with the desired outcome (from your team's OKRs or a key metric you're trying to move)
2. Generate 4-6 opportunities (customer needs/pain points that, if addressed, would drive the outcome)
3. For each opportunity, ask Claude to find supporting evidence using Nexus-Product tools (support tickets, Gong calls, PostHog data)
4. For each opportunity, brainstorm 2-3 possible solutions
5. Adversarially critique: "Which of these opportunities have the strongest evidence? Which am I assuming without data?"

Paste the complete tree here.`,
      prompts: {
        pm_ic: `Pick an outcome from your team's current OKRs. Build the full tree.

The most valuable part of this exercise is step 3 - using Nexus data to validate your opportunities. Ask Claude to pull support tickets, Gong call themes, or PostHog data that either supports or contradicts each opportunity. An opportunity with no data behind it isn't wrong - it's unvalidated. Move it to "needs research" rather than treating it as proven.

After building the tree, ask: "If I could only pursue one opportunity this quarter, which one has the best ratio of evidence strength to potential impact?"`,

        pm_director: `Pick an outcome that spans multiple teams or product areas. Build the tree at a strategic level.

Director-level opportunity mapping should consider: which opportunities are unique to Beyond (vs. table stakes), which create competitive defensibility, and which have compounding effects across customer segments. Ask Claude: "Which of these opportunities, if solved well, would make PriceLabs' response hardest?"

After building the tree, ask: "Map these opportunities to my teams. Which team is best positioned to pursue each one? Are there opportunities that fall between teams?"`
      }
    },

    coachContext: {
      evaluationCriteria: [
        'Does the tree start with a specific, measurable outcome?',
        'Are opportunities framed as customer needs/pain points (not solutions)?',
        'Is each opportunity supported by evidence (data, not assumption)?',
        'Do the solutions map clearly to the opportunities (not the outcome directly)?',
        'Did they use Nexus tools to find supporting evidence?',
        'Did they adversarially critique which opportunities have the weakest evidence?'
      ],
      seniorityNote: `Director-level trees should address strategic opportunities (competitive positioning, platform evolution) while IC-level trees should address tactical opportunities (user behavior, feature-level improvements).`,
    }
  },

  // ──────────────────────────────────────────────────────────
  // EXERCISE 5P.3 - The Premium Test
  // ──────────────────────────────────────────────────────────
  {
    id: '5P.3',
    title: 'The Premium Test',
    subtitle: 'Arguing both sides of the price gap',
    duration: '25 min',
    track: 'pm',
    description: `Beyond charges 3-5x more than PriceLabs. Every product decision either justifies or undermines that premium. This exercise teaches you to use Claude to systematically evaluate whether a feature, initiative, or strategy strengthens your premium positioning.

The technique: argue both sides. First, make the strongest case that your work justifies the premium. Then, play PriceLabs and make the strongest case that it doesn't. The gap between these arguments reveals the real strategic question.`,

    task: {
      instruction: `Pick a feature you've recently shipped, are currently building, or are proposing. Use Claude to:

1. **Make the premium case:** "Here's why this feature makes Beyond worth 3-5x more than PriceLabs. Be genuinely persuasive."
2. **Make the counter-case:** "Now you're PriceLabs' VP of Product. Write a memo to your sales team explaining why this Beyond feature doesn't matter. Be genuinely persuasive - don't strawman."
3. **Identify the crux:** "Based on both arguments, what's the single most important thing that determines whether this feature actually justifies our premium?"
4. **Design the test:** "How could we validate whether customers perceive this as premium-worthy within 30 days?"

Paste the full argument, counter-argument, crux, and test design here.`,
      prompts: {
        pm_ic: `Pick a specific feature in your domain. The exercise works best when you genuinely believe the feature is valuable but haven't stress-tested that belief.

The PriceLabs counter-argument is the most important step. Give Claude enough context about PriceLabs' positioning (configurability, transparency, low cost) to generate a genuinely strong counter. A weak counter-argument means a weak exercise.

Ask Claude to pull any relevant data via Nexus that could strengthen either argument: BtM data, adoption rates, support ticket themes about the feature, or Gong calls where customers discuss it.`,

        pm_director: `Pick a strategic initiative or roadmap theme, not just a single feature. At the director level, the premium test applies to the narrative, not just individual features.

For example: "Our Q2 roadmap theme is 'AI-powered revenue intelligence.' Does this theme justify our premium, or could PriceLabs replicate the value with manual configuration at 1/3 the price?"

The crux question is especially valuable for directors: it cuts through feature-level debate to identify the strategic assumption that matters most.`
      }
    },

    coachContext: {
      evaluationCriteria: [
        'Is the premium case specific about WHY this justifies the price gap (not just "it\'s better")?',
        'Is the PriceLabs counter genuinely persuasive (not a strawman)?',
        'Does the crux identification cut to the real strategic question?',
        'Is the test design feasible within 30 days?',
        'Did they use Nexus data to ground either argument?'
      ],
      seniorityNote: `Director-level premium tests should evaluate strategic themes and narratives. IC-level tests should evaluate specific features.`,
    }
  },

  // ──────────────────────────────────────────────────────────
  // EXERCISE 5P.4 - Strategy Stress Test
  // ──────────────────────────────────────────────────────────
  {
    id: '5P.4',
    title: 'Strategy Stress Test',
    subtitle: 'Multiple lenses on one strategy',
    duration: '30 min',
    track: 'pm',
    description: `The best product strategies survive examination from multiple angles. This exercise teaches you to systematically pressure-test a strategy using frameworks from the thinkers who shape Beyond's product culture.

You'll run the same strategy through 4 different lenses. Each lens surfaces different weaknesses. Together, they produce a comprehensive stress test that makes your strategy genuinely robust.`,

    lenses: [
      {
        name: 'Cagan\'s Four Risks',
        prompt: 'Evaluate this strategy against value risk (will customers want this?), usability risk (can they figure it out?), feasibility risk (can we build it?), and viability risk (does it work for the business?). Which risk is highest and what would reduce it?',
      },
      {
        name: 'Gibson Biddle DHM',
        prompt: 'Evaluate this strategy: Is it Delightful (does it create genuine customer delight, not just satisfaction)? Is it Hard-to-copy (would a competitor struggle to replicate it)? Is it Margin-enhancing (does it improve our economics, not just our product)?',
      },
      {
        name: 'Teresa Torres Assumptions',
        prompt: 'List every assumption embedded in this strategy. For each, rate: validated with evidence, reasonable but unvalidated, or risky. Which unvalidated assumptions could kill this strategy if they\'re wrong?',
      },
      {
        name: 'Melissa Perri Build Trap',
        prompt: 'Is this strategy actually a strategy, or is it a feature roadmap in disguise? Does it describe the change we want to see in the world, or just the things we want to build? If I removed all feature names, would the strategy still make sense?',
      }
    ],

    task: {
      instruction: `Pick a real strategy document, roadmap narrative, or OKR set. Run it through all 4 lenses above. Then synthesize:

1. Which lens surfaced the most significant weakness?
2. What's the one change you'd make to the strategy based on this stress test?
3. Which assumption should you validate first?

Paste the 4-lens analysis and your synthesis here.`,
      prompts: {
        pm_ic: `Use your team's current OKR or a strategy document from your product area. The four-lens analysis works best on something you've already committed to - finding weaknesses in existing plans is more actionable than finding them in hypotheticals.

The Melissa Perri "Build Trap" lens is often the most uncomfortable: it forces you to ask whether your roadmap is actually outcome-driven or secretly a feature list.`,

        pm_director: `Use a strategy document that you own - a quarterly roadmap narrative, a product area strategy, or a board-level positioning document. Run it through all 4 lenses with Opus for maximum analytical depth.

Director-level insight: the DHM lens is especially powerful for strategic narratives. If your strategy isn't hard-to-copy, you're building features that PriceLabs can match at 1/3 the price. That's the premium test applied at the strategy level.`
      }
    },

    coachContext: {
      evaluationCriteria: [
        'Did they run all 4 lenses (not just 1-2)?',
        'Does each lens produce genuinely different feedback (not repetitive)?',
        'Is the synthesis specific about which weakness matters most?',
        'Is the proposed change actionable (not just "we should think more about this")?',
        'Did they identify a specific assumption to validate first?'
      ],
    }
  },

  // ──────────────────────────────────────────────────────────
  // EXERCISE 5P.5 - The Experiment Designer
  // ──────────────────────────────────────────────────────────
  {
    id: '5P.5',
    title: 'The Experiment Designer',
    subtitle: 'Small tests for big assumptions',
    duration: '25 min',
    track: 'pm',
    description: `"Big bets without small tests" is one of Beyond's anti-patterns. This exercise uses Claude to design rapid experiments that validate your riskiest assumptions before you commit engineering resources.

The best experiments are cheap, fast, and decisive. Claude can help you find the minimum viable test for any assumption - but you need to push it. Claude's first suggestion is usually too big. Ask "what's smaller?" at least twice.`,

    task: {
      instruction: `Pick the riskiest assumption from your one-pager (5P.1), opportunity tree (5P.2), or strategy stress test (5P.4). Use Claude to:

1. State the assumption clearly
2. Ask: "What's the cheapest experiment to validate or invalidate this in 2 weeks?"
3. Push back: "That's still too big. What's the smallest test that would give us a signal?"
4. Define: hypothesis, success criteria, sample size consideration, timeline, and "what we'll do with each result"

The experiment design should be ready to pitch to your team.`,
      prompts: {
        pm_ic: `Your experiment should be something your product trio could run without any engineering changes if possible. Think: fake door tests, concierge MVPs, customer interviews, data analysis, or prototype tests.

The "what we'll do with each result" section is the most important and most often skipped. If the experiment succeeds, what do you build? If it fails, do you pivot or abandon? If it's inconclusive, what do you test next?`,

        pm_director: `Director-level experiment design is about teaching your teams to think experimentally. Pick an assumption from one of your team's proposals and design the experiment, then share it as an example of how you want your teams to approach validation.

Consider: "What would I need to see to kill this initiative?" That's the strongest form of an experiment - it's designed to invalidate, not confirm.`
      }
    },

    coachContext: {
      evaluationCriteria: [
        'Is the assumption clearly stated and specific?',
        'Is the experiment genuinely small (could run in 2 weeks or less)?',
        'Are success criteria defined with specific thresholds?',
        'Does "what we\'ll do with each result" cover success, failure, AND inconclusive?',
        'Did they push Claude to make the experiment smaller at least once?'
      ],
    }
  },

  // ──────────────────────────────────────────────────────────
  // EXERCISE 5P.6 - PM Capstone
  // ──────────────────────────────────────────────────────────
  {
    id: '5P.6',
    title: 'The Portfolio Manager\'s Toolkit',
    subtitle: 'A complete project proposal for your team\'s OKRs',
    duration: '35 min',
    track: 'pm',
    isCapstone: true,
    description: `The PM capstone integrates everything from Level 5 into a single, complete project proposal. This should be a real initiative ready for OKR consideration - not a course exercise.

You'll produce: a polished one-pager backed by an opportunity tree, stress-tested through multiple frameworks, with an experiment plan for the riskiest assumption. This is a complete product proposal package.`,

    task: {
      instruction: `Produce a complete project proposal that includes:

1. **One-Pager** (from 5P.1 or revised): The business case
2. **Opportunity Tree excerpt** (from 5P.2): The discovery evidence supporting this project
3. **Premium Test summary** (from 5P.3): Why this justifies Beyond's positioning
4. **Top risk + experiment plan** (from 5P.5): How you'll validate before committing

Package these into a single shareable artifact and publish it to Beyond Share.

This deliverable should be ready to present in your next product review or OKR planning session.`,
      prompts: {
        pm_ic: `Your proposal should be scoped to your product area and actionable within the next quarter. The one-pager drives the overall narrative, the opportunity tree shows your discovery evidence, the premium test shows strategic fit, and the experiment plan shows how you'll validate quickly.

Use Claude to connect the pieces: "Review all four components together. Does the experiment plan actually test the riskiest assumption from the one-pager? Does the opportunity tree support the problem statement? Flag any disconnects."`,

        pm_director: `Your proposal can be at the team or portfolio level - an OKR proposal, a strategic initiative, or a resource allocation recommendation. The premium test and strategy stress test components are especially important at the director level.

Use Opus for the final synthesis. Ask: "If I have 5 minutes to present this to our VP, what's the narrative arc? What do I lead with, what do I skip, and what's my answer to the hardest question they'll ask?"`
      }
    },

    assessment: {
      questions: [
        {
          question: 'What makes a one-pager\'s Business Hypothesis section strong?',
          options: [
            'It describes the feature in detail',
            'It states a testable hypothesis connecting a specific change to a measurable outcome with a timeline',
            'It includes competitive analysis',
            'It has approval from stakeholders'
          ],
          correct: 1,
          explanation: 'A strong hypothesis is testable and falsifiable: "We believe [change] will cause [metric] to improve by [amount] because [evidence]." If you can\'t imagine a result that would disprove it, it\'s not a hypothesis.'
        },
        {
          question: 'In an Opportunity Solution Tree, what\'s the difference between an opportunity and a solution?',
          options: [
            'Opportunities are bigger than solutions',
            'Opportunities are customer needs or pain points; solutions are specific product changes that might address those needs',
            'Opportunities come from customers; solutions come from the team',
            'There is no meaningful difference'
          ],
          correct: 1,
          explanation: 'This distinction is the core of Teresa Torres\' framework. Opportunities are in the problem space (customer needs). Solutions are in the solution space (product changes). Multiple solutions can address one opportunity, and the best solution is rarely the first one you think of.'
        },
        {
          question: 'When stress-testing a strategy with Gibson Biddle\'s DHM model, what does "Hard-to-copy" evaluate?',
          options: [
            'How difficult the engineering implementation is',
            'Whether competitors can replicate the strategic advantage within a reasonable timeframe',
            'How hard it is for users to understand',
            'How expensive it is to build'
          ],
          correct: 1,
          explanation: 'Hard-to-copy is about defensibility. At Beyond, our data moat (forward-looking demand signals from search data) is hard to copy. A new settings page is not. Every strategic bet should include something that gets harder for competitors to replicate over time.'
        }
      ],
      selfReflection: `How has using AI changed the quality of your product proposals? What would you do differently in your next OKR planning cycle based on what you learned in Level 5?`
    },

    milestone: {
      message: `You're a Property Manager now - managing not just features, but strategy, evidence, and competitive positioning. That project proposal isn't a course deliverable; it's real work that's ready for your next planning cycle.`,
      dadJoke: `Why did the Product Manager bring an Opportunity Solution Tree to the holiday party? Because they couldn't stop branching out. Gerard says he workshopped this one for 20 minutes and it still isn't great.`,
      nextLevel: `Level 6: The Destination Definer - Claude Code, the BMAD method, and building your personal AI Operating System. You're about to go agentic.`
    },

    coachContext: {
      evaluationCriteria: [
        'Does the proposal include all four components (one-pager, opportunity tree, premium test, experiment)?',
        'Are the components connected (does the experiment test the one-pager\'s riskiest assumption)?',
        'Is the one-pager strong enough for OKR consideration?',
        'Is the premium test genuinely adversarial (not just self-congratulatory)?',
        'Is the experiment small enough to run in 2 weeks?',
        'Did they publish and share the artifact?'
      ],
    }
  },


  // ── Design Track Exercises ─────────────────────────────────────────────

  // ──────────────────────────────────────────────────────────
  // EXERCISE 5D.1 - The Design Critic
  // ──────────────────────────────────────────────────────────
  {
    id: '5D.1',
    title: 'The Design Critic',
    subtitle: 'Structured UX critique with AI',
    duration: '30 min',
    track: 'design',
    description: `Design critique is a skill - and Claude can be an incredibly sharp critic if you set it up correctly. The key is giving Claude a specific evaluative framework rather than asking "what do you think?"

This exercise teaches you to get critique from multiple expert perspectives on the same design, producing feedback that's more thorough than most in-person design reviews.`,

    critiqueFrameworks: [
      {
        name: 'Nielsen\'s 10 Heuristics',
        prompt: 'Evaluate this design against each of Nielsen\'s 10 usability heuristics. For each heuristic: pass, concern, or fail - with specific evidence from the design.',
        bestFor: 'General usability evaluation, catching broad UX issues'
      },
      {
        name: 'Cognitive Walkthrough',
        prompt: 'Walk through this flow as [specific user persona]. At each step, answer: Will the user know what to do? Will the user notice the right action? Will the user understand the feedback? Where will they get stuck or confused?',
        bestFor: 'Evaluating task flows, onboarding, and multi-step processes'
      },
      {
        name: 'Beyond\'s "Feel in Control" Test',
        prompt: 'Evaluate this design against Beyond\'s core UX principle: "make users feel in control without needing to control." Where does the design give users unnecessary work? Where are the defaults not smart enough? Where does automation feel like a black box instead of a superpower?',
        bestFor: 'Beyond-specific design quality evaluation'
      },
      {
        name: 'Behavioral Design Audit',
        prompt: 'Evaluate the behavioral design elements: What defaults are set, and are they the right ones? Where does friction help (preventing errors) vs. hurt (blocking desired actions)? Is progressive disclosure applied effectively? Are there commitment devices or loss aversion elements that could improve completion?',
        bestFor: 'Evaluating motivation, engagement, and behavior change'
      }
    ],

    task: {
      instruction: `Pick a real design you're working on (or recently completed). Describe it to Claude in enough detail for meaningful critique - the user persona, the flow steps, the key interactions, and any constraints.

Run it through at least 2 of the critique frameworks above. Then synthesize:
1. What's the #1 issue across both frameworks?
2. What's one thing the critique missed because Claude doesn't have visual context?
3. How would you revise the design based on this feedback?`,
      prompts: {
        design_ic: `Pick a specific flow or screen you're designing. Describe it step by step - what the user sees, what they can interact with, what happens when they take actions. The more specific your description, the more specific the critique.

Run it through Nielsen's heuristics AND the "Feel in Control" test. The combination catches both universal usability issues and Beyond-specific design quality issues.

After the critique, ask: "If I could only fix one thing before shipping, what would have the highest impact on user success?"`,

        design_lead: `Pick a design from one of your team members' recent work (with their permission). Run it through the same critique process you'd want your team to adopt.

This serves a dual purpose: you get actionable feedback on the design, and you develop a critique process you can teach to your team. After running the critique, ask Claude: "Turn this critique process into a template my design team can use for self-review before bringing designs to design review."`
      }
    },

    coachContext: {
      evaluationCriteria: [
        'Did they describe the design in enough detail for meaningful critique?',
        'Did they use at least 2 different critique frameworks?',
        'Did they synthesize across frameworks to identify the most important issue?',
        'Did they acknowledge what the critique missed (visual context limitations)?',
        'Is the proposed revision specific and actionable?'
      ],
    }
  },

  // ──────────────────────────────────────────────────────────
  // EXERCISE 5D.2 - Journey Mapping
  // ──────────────────────────────────────────────────────────
  {
    id: '5D.2',
    title: 'Journey Mapping',
    subtitle: 'AI-assisted user journey analysis',
    duration: '25 min',
    track: 'design',
    description: `User journey maps are powerful but time-consuming to create from scratch. Claude can accelerate the process dramatically - especially when combined with real data from Nexus-Product (support tickets, usage analytics, Gong call themes).

The result: journey maps grounded in evidence, not assumptions. The AI doesn't replace user research, but it synthesizes existing data into a structured journey map that you can then validate with real users.`,

    task: {
      instruction: `Build an evidence-grounded journey map for a specific user persona and key flow in your product area. Use Nexus-Product to pull real data for each journey stage.

Steps:
1. Define the persona and the journey (e.g., "first-time host from signup to first booking priced by Beyond")
2. Map the stages (awareness > consideration > setup > first use > ongoing use > expansion/churn)
3. For each stage, pull real data: PostHog for behavior data, Kustomer for pain points, Gong for customer voice
4. For each stage, identify: what the user does, thinks, and feels; the pain points; the opportunities

Generate this as a shareable artifact and publish to Beyond Share.`,
      prompts: {
        design_ic: `Map a journey that's directly relevant to your current design work. The most valuable journeys to map right now:
- First-time host from signup to enabling pricing (the activation journey)
- Property manager from receiving a pricing recommendation to accepting or overriding it (the trust journey)
- Enterprise PM from onboarding to sharing an owner report (the value delivery journey)

Use Nexus data at every stage. Don't guess at pain points when you can pull support tickets. Don't assume emotions when you can read Gong transcripts.`,

        design_lead: `Map a journey that spans multiple touchpoints and potentially multiple designers' work. This exercise helps you identify where handoffs between product areas create friction that no single designer sees.

After building the journey, ask: "Where are the handoff points between different product areas? Which of these handoffs creates the most friction for the user?" This is the kind of systems-level insight that only a design leader is positioned to act on.`
      }
    },

    coachContext: {
      evaluationCriteria: [
        'Is the journey grounded in real data (not just assumptions)?',
        'Did they use Nexus-Product tools to pull evidence for each stage?',
        'Does the journey include user actions, thoughts, AND feelings?',
        'Are pain points and opportunities identified at each stage?',
        'Is the artifact shareable and professional quality?'
      ],
    }
  },

  // ──────────────────────────────────────────────────────────
  // EXERCISE 5D.3 - Behavioral Design Lab
  // ──────────────────────────────────────────────────────────
  {
    id: '5D.3',
    title: 'Behavioral Design Lab',
    subtitle: 'Defaults, friction, and motivation',
    duration: '25 min',
    track: 'design',
    description: `Behavioral design is the science of designing for how people actually behave, not how we wish they would. This exercise teaches you to use Claude as a behavioral design thinking partner - applying principles like smart defaults, strategic friction, progressive disclosure, loss aversion, and the Zeigarnik effect to real Beyond design challenges.

Beyond's UX principle ("feel in control without needing to control") is fundamentally a behavioral design statement. Smarter defaults are a behavioral intervention. Reducing cognitive load is a behavioral intervention. This exercise makes that connection explicit.`,

    principles: [
      {
        name: 'Smart Defaults',
        definition: 'Pre-set options that work well for most users, reducing decisions without removing choice.',
        beyondExample: 'Auto Base Rates (ABR) is a smart default - Beyond calculates the starting price so hosts don\'t have to guess. But do hosts trust it? That\'s the design challenge.',
        prompt: 'For [DESIGN], identify every decision the user makes. Which of these could have a smart default that works for 80%+ of users? What data would we need to set that default well?'
      },
      {
        name: 'Strategic Friction',
        definition: 'Intentionally adding friction where it prevents errors or improves decisions. Removing friction everywhere isn\'t the goal.',
        beyondExample: 'When a host overrides a price recommendation, a confirmation showing the potential revenue impact is strategic friction - it prevents an impulsive change while preserving their control.',
        prompt: 'For [DESIGN], where should we ADD friction (to prevent costly mistakes or ensure deliberate choice)? Where should we REMOVE friction (where it\'s blocking desired behavior without adding value)?'
      },
      {
        name: 'Progressive Disclosure',
        definition: 'Show the essential first, reveal complexity only when needed. Reduces initial cognitive load without removing capability.',
        beyondExample: 'The pricing calendar could show recommended prices by default, with override options one click deeper. Power users still have full control; new users aren\'t overwhelmed.',
        prompt: 'For [DESIGN], what\'s the minimum information a user needs to make the primary decision? What can be hidden behind "advanced" or "learn more"? What should NEVER be hidden?'
      },
      {
        name: 'Loss Aversion',
        definition: 'People feel losses more strongly than equivalent gains. Frame choices in terms of what they\'d lose by not acting.',
        beyondExample: '"You left $2,340 on the table last month by overriding our recommendations on high-demand dates" is more motivating than "You could earn $2,340 more by following our recommendations."',
        prompt: 'For [DESIGN], where can we frame the user\'s choice in terms of what they\'d lose rather than what they\'d gain? Where is loss framing appropriate vs. where would it feel manipulative?'
      },
      {
        name: 'Zeigarnik Effect',
        definition: 'People remember and are more motivated to complete unfinished tasks than tasks they haven\'t started.',
        beyondExample: 'Showing "Your pricing is 60% set up" with a progress bar creates an open loop that motivates completion. Starting the setup process (even with defaults) makes hosts more likely to finish.',
        prompt: 'For [DESIGN], how can we create an "open loop" that motivates completion? Where can we show progress to leverage the completion drive? Where does a progress indicator actually ADD anxiety (and should be avoided)?'
      }
    ],

    task: {
      instruction: `Pick a specific design challenge in your product area. Run it through at least 3 of the behavioral design principles above.

For each principle, identify:
1. Where the principle applies to your design
2. A specific design change that applies the principle
3. A potential downside or risk of applying it (behavioral principles can be misused)

Then synthesize: which 1-2 behavioral interventions would have the highest impact on user behavior?`,
      prompts: {
        design_ic: `Pick a flow or screen where user behavior isn't matching your expectations - maybe a step with high drop-off, a feature with low adoption, or a setting that users configure badly.

Run it through Smart Defaults, Progressive Disclosure, and one other principle of your choice. The combination of defaults + disclosure is especially powerful for Beyond's "feel in control" philosophy.

After the analysis, ask: "Describe this redesign to me as if I'm a first-time host who is nervous about letting an algorithm control my pricing. Does this feel empowering or threatening?"`,

        design_lead: `Pick a design challenge that affects multiple flows or product areas - something systemic rather than a single screen. This could be onboarding patterns, pricing trust signals, or notification design.

Run it through all 5 principles and look for patterns: which principles keep surfacing the same underlying issue? That's your design system-level opportunity.

After the analysis, ask: "Which of these behavioral interventions could become a design pattern or guideline for the whole team, not just a one-off improvement?"`
      }
    },

    coachContext: {
      evaluationCriteria: [
        'Did they apply at least 3 behavioral principles to a real design challenge?',
        'Are the design changes specific and actionable (not just theoretical)?',
        'Did they identify potential downsides or risks of each intervention?',
        'Is the synthesis focused on highest-impact interventions?',
        'Did they consider the user\'s emotional response, not just their behavior?'
      ],
    }
  },

  // ──────────────────────────────────────────────────────────
  // EXERCISE 5D.4 - Accessibility Audit
  // ──────────────────────────────────────────────────────────
  {
    id: '5D.4',
    title: 'The Accessibility Audit',
    subtitle: 'Inclusive design with AI assistance',
    duration: '20 min',
    track: 'design',
    description: `Accessibility isn't a checklist at the end of a project - it's a design quality signal. Claude can help you identify accessibility issues early, when they're cheap to fix, and suggest specific remediation strategies.

The limitation: Claude can't see your visual designs, so you need to describe them in detail. The upside: the act of describing your design in enough detail for an accessibility audit often surfaces issues on its own. If you can't describe the interaction model clearly, users probably can't figure it out either.`,

    task: {
      instruction: `Pick a flow or component you're designing. Describe it in detail to Claude, then ask for a WCAG 2.1 AA accessibility audit.

Your description should include: visual hierarchy, color usage, interactive elements, keyboard flow, error states, and any dynamic content changes. The more specific your description, the more useful the audit.

Document the top 3 issues found and your proposed fixes.`,
      prompts: {
        design_ic: `Pick something you're actively working on. Describe it as if you're explaining it to someone who can't see the screen - element by element, interaction by interaction.

After the audit, ask: "Now walk through this flow using only keyboard navigation. Where does the focus order break? Where would a screen reader miss context?"

This exercise builds a habit: if you can describe a design well enough for Claude to audit it, you've already thought more carefully about accessibility than most designers.`,

        design_lead: `Pick a component or pattern that's used across multiple areas of the product. An accessibility issue in a shared component multiplies across every instance.

After the audit, ask: "Turn the top 5 accessibility findings into guidelines my design team should follow for all new designs. Format them as actionable rules, not abstract principles."

This creates team-level accessibility standards from a concrete audit - much more effective than generic accessibility training.`
      }
    },

    coachContext: {
      evaluationCriteria: [
        'Did they describe the design in enough detail for a meaningful audit?',
        'Did they identify at least 3 specific accessibility issues?',
        'Are the proposed fixes specific and implementable?',
        'Did they consider keyboard navigation and screen reader compatibility?',
        'Did they think beyond visual accessibility (cognitive load, error recovery, etc.)?'
      ],
    }
  },

  // ──────────────────────────────────────────────────────────
  // EXERCISE 5D.5 - Design Capstone
  // ──────────────────────────────────────────────────────────
  {
    id: '5D.5',
    title: 'The Design Specification',
    subtitle: 'A complete design proposal for your team',
    duration: '35 min',
    track: 'design',
    isCapstone: true,
    description: `The Design capstone integrates everything from Level 5 into a single, complete design proposal. This should be a real deliverable for a current project - not a course exercise.

You'll produce: a design spec that includes structured critique evidence, a user journey grounding, behavioral design rationale, and accessibility considerations. This is a design proposal that demonstrates craft.`,

    task: {
      instruction: `Produce a complete design specification for a real project that includes:

1. **Problem statement** grounded in data (support tickets, PostHog, Gong)
2. **User journey excerpt** showing where this design fits in the broader experience
3. **Design approach** with rationale connecting to Beyond's "feel in control" principle
4. **Behavioral design rationale** for key decisions (defaults, friction, disclosure)
5. **Accessibility considerations** for the design
6. **Self-critique** using at least one framework from 5D.1

Package into a shareable artifact and publish to Beyond Share.`,
      prompts: {
        design_ic: `Your design spec should be for a specific feature or flow you're working on. The data-grounding (step 1) and behavioral rationale (step 4) are what elevate this from "a design doc" to "a design doc that product and engineering partners take seriously."

Use Claude to connect the dots: "Review this complete spec. Does the behavioral design rationale actually address the pain points from the user journey? Are there gaps?"`,

        design_lead: `Your design spec can be for a broader design initiative - a design pattern, a system-level improvement, or a cross-product UX standard. The journey mapping and behavioral design components should show how the initiative affects the full user experience, not just a single screen.

Use Opus for the final synthesis. Ask: "If I'm presenting this to our VP of Product, what's the 2-minute version? What data point do I lead with, and what's my answer to 'why now?'"`
      }
    },

    assessment: {
      questions: [
        {
          question: 'What\'s the most important thing about Beyond\'s "feel in control without needing to control" principle for design?',
          options: [
            'Remove all user controls and automate everything',
            'Give users smart defaults that work well while preserving the ability to override when they want to',
            'Add as many settings as possible so users feel in control',
            'Hide all automation so users don\'t know it\'s happening'
          ],
          correct: 1,
          explanation: 'The principle balances automation with agency. Smart defaults do the work; override capability preserves control. This is the opposite of both PriceLabs (too many controls) and full automation (no control).'
        },
        {
          question: 'When is adding friction to a design a good thing?',
          options: [
            'Never - friction always hurts',
            'When it prevents costly mistakes or ensures deliberate decision-making',
            'When you want to reduce engagement with a feature',
            'Only when required by legal compliance'
          ],
          correct: 1,
          explanation: 'Strategic friction protects users from impulsive actions with big consequences. A confirmation showing revenue impact before a price override is friction that helps users make better decisions.'
        },
        {
          question: 'What makes a user journey map evidence-grounded vs. assumption-based?',
          options: [
            'Evidence-grounded maps are longer',
            'Evidence-grounded maps use data from real systems (support tickets, analytics, call transcripts) at each stage rather than guessing what users think and feel',
            'Evidence-grounded maps only include positive experiences',
            'There is no meaningful difference'
          ],
          correct: 1,
          explanation: 'Pulling real data from Kustomer (pain points), PostHog (behavior), and Gong (voice of customer) grounds each journey stage in reality. Assumed journeys are useful starting points but should be validated with real data.'
        }
      ],
      selfReflection: `How has using AI changed your design practice? Which technique from Level 5 would you recommend to every designer on the team?`
    },

    milestone: {
      message: `You're a Property Manager! Your design work is now grounded in data, structured by behavioral science, and tested for accessibility. That design spec is ready for your next design review.`,
      dadJoke: `Why did the designer bring Nielsen's heuristics to the dinner party? Because they wanted to evaluate the "visibility of system status" on the menu. Gerard says this one kills in design circles. (It does not.)`,
      nextLevel: `Level 6: The Destination Definer - Claude Code, the BMAD method, and building your personal AI Operating System. You're about to go agentic.`
    },

    coachContext: {
      evaluationCriteria: [
        'Does the spec include all 6 components?',
        'Is the problem statement grounded in real data (not assumptions)?',
        'Does the behavioral design rationale connect to specific design decisions?',
        'Are accessibility considerations included and specific?',
        'Is the self-critique genuine (not just "looks good")?',
        'Is this a real deliverable, not a practice exercise?'
      ],
    }
  }
],

  assessment: {
      questions: [
        {
          question: 'What makes a one-pager\'s Business Hypothesis section strong?',
          options: [
            'It describes the feature in detail',
            'It states a testable hypothesis connecting a specific change to a measurable outcome with a timeline',
            'It includes competitive analysis',
            'It has approval from stakeholders'
          ],
          correct: 1,
          explanation: 'A strong hypothesis is testable and falsifiable: "We believe [change] will cause [metric] to improve by [amount] because [evidence]." If you can\'t imagine a result that would disprove it, it\'s not a hypothesis.'
        },
        {
          question: 'In an Opportunity Solution Tree, what\'s the difference between an opportunity and a solution?',
          options: [
            'Opportunities are bigger than solutions',
            'Opportunities are customer needs or pain points; solutions are specific product changes that might address those needs',
            'Opportunities come from customers; solutions come from the team',
            'There is no meaningful difference'
          ],
          correct: 1,
          explanation: 'This distinction is the core of Teresa Torres\' framework. Opportunities are in the problem space (customer needs). Solutions are in the solution space (product changes). Multiple solutions can address one opportunity, and the best solution is rarely the first one you think of.'
        },
        {
          question: 'When stress-testing a strategy with Gibson Biddle\'s DHM model, what does "Hard-to-copy" evaluate?',
          options: [
            'How difficult the engineering implementation is',
            'Whether competitors can replicate the strategic advantage within a reasonable timeframe',
            'How hard it is for users to understand',
            'How expensive it is to build'
          ],
          correct: 1,
          explanation: 'Hard-to-copy is about defensibility. At Beyond, our data moat (forward-looking demand signals from search data) is hard to copy. A new settings page is not. Every strategic bet should include something that gets harder for competitors to replicate over time.'
        }
      ],
      selfReflection: `How has using AI changed the quality of your product proposals? What would you do differently in your next OKR planning cycle based on what you learned in Level 5?`
    },

  milestone: {
      message: `You're a Property Manager now - managing not just features, but strategy, evidence, and competitive positioning. That project proposal isn't a course deliverable; it's real work that's ready for your next planning cycle.`,
      dadJoke: `Why did the Product Manager bring an Opportunity Solution Tree to the holiday party? Because they couldn't stop branching out. Gerard says he workshopped this one for 20 minutes and it still isn't great.`,
      nextLevel: `Level 6: The Destination Definer - Claude Code, the BMAD method, and building your personal AI Operating System. You're about to go agentic.`
    },
}

// ─── Engineering Manager Track: Level 5 exercises ────────────────────────────
export const level5EngManagerExercises = [

  // ──────────────────────────────────────────────────────────
  // EXERCISE 5E.1 - The Translation Layer
  // ──────────────────────────────────────────────────────────
  {
    id: '5E.1',
    title: 'The Translation Layer',
    subtitle: 'Speaking business when your brain thinks in code',
    duration: '30 min',
    track: 'engineering',
    description: `The single highest-leverage skill for an engineering manager isn't technical expertise - it's translation. Translating technical decisions into business impact. Translating business priorities into engineering strategy. Translating team health signals into leadership language.

Most engineering managers default to technical framing: "We need to refactor the pricing service because the codebase has accumulated significant technical debt and the coupling between modules makes it hard to deploy independently." That sentence means nothing to your PM partner, your VP, or your CEO.

The translated version: "Our pricing service takes 2 weeks to deploy a change that should take 2 days. This means every activation experiment the PM team wants to run takes 3x longer to ship. A 3-sprint investment in decoupling would let us ship pricing experiments weekly instead of monthly, directly accelerating our activation improvement timeline."

Claude is exceptionally good at this translation - if you give it both the technical reality and the business context to translate into.`,

    workedExample: {
      title: 'Tech Debt Translation',
      before: {
        label: 'Technical framing (what the EM thinks)',
        text: `We need to refactor the pricing service. The monolithic architecture has high coupling between the rate calculation engine, the market data pipeline, and the API layer. Test coverage is at 43%, deployments require a full regression cycle, and we've had 3 incidents in the last quarter traced to unintended side effects from changes in one module affecting another. This is a Medium-effort project (3-6 weeks) requiring 2 senior engineers.`
      },
      after: {
        label: 'Business framing (what leadership needs to hear)',
        text: `Our pricing service architecture is slowing down the product roadmap. Today, every pricing-related feature or experiment takes 2x longer to ship because deployments require full system regression testing. This has directly delayed 3 of the Core App team's Q1 experiments, each targeting our 5% activation rate.

The proposed investment: 3 sprints of 2 senior engineers to decouple the service into independently deployable modules.

Expected return: Cut pricing feature deployment time from 10 days to 3 days. This accelerates every pricing experiment on the PM roadmap, directly supporting our activation OKR. Additionally, the 3 incidents this quarter (each taking ~1 engineer-day to resolve) traced to module coupling would be structurally prevented.

Trade-off: This delays the "Smart Minimum Stay" feature by ~4 weeks. We recommend this sequencing because faster deployment velocity will accelerate ALL subsequent pricing features, including Smart Minimum Stay.`
      },
      technique: `The translation uses these patterns:
1. Lead with the business impact, not the technical problem
2. Connect technical metrics to product metrics (deployment time -> experiment velocity -> activation rate)
3. Quantify the cost of NOT acting (delayed experiments, incident resolution time)
4. Frame the trade-off explicitly (what we delay and why it's worth it)
5. Use language the audience already cares about (OKRs, activation rate, customer impact)`
    },

    translationPatterns: [
      {
        name: 'The "Which Means" Chain',
        description: 'Keep appending "which means..." until you reach a business outcome.',
        example: `"Test coverage is at 43%"
...which means deployments require manual regression testing
...which means each deployment takes 2 extra days
...which means we ship pricing experiments every 2 weeks instead of weekly
...which means our activation improvement experiments run at half the speed they could
...which means we'll hit our 8% activation target 6 months later than necessary.

The last "which means" is your opening line.`,
      },
      {
        name: 'The Revenue/Cost Frame',
        description: 'Translate everything into revenue impact or cost savings.',
        example: `"We need better observability" becomes:
"Our last 3 incidents took an average of 4 hours to diagnose. With proper observability, similar incidents at peer companies resolve in under 30 minutes. At our scale, that's approximately 10 engineer-hours per quarter spent on diagnosis that could be near-zero. More importantly, our last incident caused a 6-hour pricing outage affecting ~2,000 active listings during a high-demand weekend."`,
      },
      {
        name: 'The PM Partnership Frame',
        description: 'Translate technical work into what it enables for the product roadmap.',
        example: `Instead of: "We need to migrate our database"
Try: "This migration unlocks 3 features on the PM's roadmap that are currently blocked by performance constraints: real-time pricing explanations, portfolio-level dashboards, and multi-listing bulk operations. Without the migration, each of these features would require individual workarounds that cost more total engineering time than the migration itself."`,
      },
      {
        name: 'The Risk Reduction Frame',
        description: 'Translate infrastructure investment into risk reduction that leadership understands.',
        example: `Instead of: "We need to improve our CI/CD pipeline"
Try: "Every deployment currently carries a 12% rollback rate. Each rollback costs 2-4 hours of engineering time and creates a window where pricing recommendations may be stale. Improving the pipeline would reduce rollback rate to under 2% (industry benchmark) and cut deploy-to-live time from 45 minutes to under 10."`,
      }
    ],

    task: {
      instruction: `Pick a real technical investment, infrastructure improvement, or tech debt item that your team needs but hasn't gotten buy-in for. Use Claude to translate it from technical framing to business framing.

Steps:
1. Write the technical description as you'd explain it to a fellow engineer
2. Ask Claude to apply the "Which Means" chain until it reaches a business outcome
3. Ask Claude to rewrite the proposal using the Revenue/Cost, PM Partnership, or Risk Reduction frame
4. Run the translated version through CRIT with the Role set to "a VP who controls engineering budget and prioritizes based on business impact"

Paste both versions (technical and translated) plus the CRIT feedback here.`,
      prompts: {
        eng_manager: `Pick the technical investment you most wish you could get approved. The one where you KNOW it's the right engineering decision but you haven't been able to make the business case stick.

The "Which Means" chain is your starting move. Most EMs stop 2-3 levels too early. "Test coverage is low" -> "deployments are risky" is where most EMs stop. Push further: -> "we deploy less often" -> "experiments ship slower" -> "activation improvements are delayed" -> "we miss our revenue target by X months." That last link is what gets investment approved.

After translating, ask Claude: "My VP is going to ask 'why now?' and 'what happens if we wait another quarter?' Prepare me for both questions."`
      }
    },

    coachContext: {
      evaluationCriteria: [
        'Does the translated version lead with business impact (not technical detail)?',
        'Is there a clear "which means" chain connecting tech to business outcomes?',
        'Are there specific numbers (deployment time, incident hours, delayed experiments)?',
        'Is the trade-off explicit (what gets delayed and why it\'s worth it)?',
        'Would a non-technical VP understand this and be able to make a decision?',
        'Did the CRIT feedback surface any gaps in the business argument?'
      ],
      exampleFeedback: {
        strong: `This translation is excellent. You went from "we need to refactor X" (which sounds like engineering housekeeping) to "this investment accelerates our activation experiments by 3x" (which sounds like a strategic enabler). The "Which Means" chain is powerful - notice how the 5th link in the chain is where the VP's ears perk up. Nobody approves "better test coverage." People approve "hit our activation target 3 months sooner." The trade-off framing is also strong: you named what gets delayed and why the sequencing makes sense. Ship this to your VP.`,
        needsWork: `The translation is better than the technical version, but it's still in the weeds. "Reducing module coupling to enable independent deployments" is still engineering language. Translate one more step: what does "independent deployments" mean for the business? Faster experiments? Fewer incidents? More frequent customer-facing improvements? Lead with that. Also, the trade-off section says "this will take engineering time" - be specific. Which feature gets delayed by how many weeks? VPs can evaluate concrete trade-offs; they can't evaluate vague ones.`
      }
    }
  },

  // ──────────────────────────────────────────────────────────
  // EXERCISE 5E.2 - Team Health Intelligence
  // ──────────────────────────────────────────────────────────
  {
    id: '5E.2',
    title: 'Team Health Intelligence',
    subtitle: 'Reading the signals your team isn\'t saying out loud',
    duration: '30 min',
    track: 'engineering',
    description: `Great engineering managers don't wait for someone to tell them something's wrong. They read signals - from sprint data, from Slack patterns, from 1:1 conversations, from support ticket trends, from who's blocking whom.

Claude can help you synthesize these signals systematically. Instead of relying on gut feel ("the team seems stressed"), you can build an evidence-based picture of team health that tells you exactly where to focus your leadership attention.

This is the Camille Fournier approach to management: be systematic about the things most managers do intuitively. Intuition is great when it's right, but it's invisible when it's wrong.`,

    healthSignals: [
      {
        category: 'Delivery Health',
        signals: [
          'Sprint velocity trend (stable, declining, volatile)',
          'Commitment vs. completion ratio',
          'Story point accuracy (are estimates getting worse?)',
          'Carry-over rate (how much rolls to next sprint)',
          'Deployment frequency and rollback rate'
        ],
        whatItTells: 'Whether the team is sustainably delivering, over-committing, or losing capacity to hidden work.',
        nexusTool: 'Pull Jira data via compass_get_user_jira_issues or pg_execute_sql for sprint-level analysis'
      },
      {
        category: 'Quality Health',
        signals: [
          'Incident frequency and severity trend',
          'Support ticket volume for your product area',
          'Bug escape rate (bugs found in production vs. pre-release)',
          'Time to resolve incidents',
          'Customer-reported vs. internally-detected issues ratio'
        ],
        whatItTells: 'Whether technical quality is improving, stable, or degrading. A rising support ticket trend often signals technical debt reaching a tipping point.',
        nexusTool: 'kustomer_get_conversations filtered by your product area + kustomer_get_beyond_tree for categorization'
      },
      {
        category: 'Team Energy',
        signals: [
          'PTO patterns (nobody taking time off = burnout risk)',
          'Slack response times and after-hours activity',
          '1:1 tone shifts (are people bringing problems or just reporting status?)',
          'Volunteering for new work vs. avoiding it',
          'Retrospective themes (are the same complaints recurring?)'
        ],
        whatItTells: 'Whether the team has sustainable energy or is running on fumes. This is the hardest to measure with data and the most important to get right.',
        nexusTool: 'slack_get_conversations_history for activity patterns (use sensitively and transparently)'
      },
      {
        category: 'Growth Health',
        signals: [
          'Who\'s learning new skills vs. doing the same work',
          'Knowledge concentration (is critical knowledge in one person?)',
          'Code review turnaround time (slow reviews = disengaged reviewers or overload)',
          'Mentoring activity (senior engineers investing in juniors)',
          'Engineer-initiated improvements vs. manager-directed work'
        ],
        whatItTells: 'Whether the team is developing capability or just executing. Teams that stop growing start declining.',
        nexusTool: 'pg_execute_sql for code review data if available; Jira data for who works on what'
      }
    ],

    task: {
      instruction: `Build a Team Health Assessment for your engineering team. Use Claude + Nexus-Product to:

1. Pull data for at least 2 of the 4 health categories above (use the suggested Nexus tools)
2. Ask Claude to identify patterns and synthesize across signals
3. For each category you assessed, rate it: Healthy / Watch / Needs Attention
4. Identify the #1 action item based on the data

Then ask Claude: "Based on this team health assessment, what should I focus on in my 1:1s this week? Give me a specific question to ask each team member that would help me validate or invalidate the signals I'm seeing."

Package this as an artifact and publish it (you may want a private version rather than sharing raw team health data publicly).`,
      prompts: {
        eng_manager: `Focus on the health categories where you have the best data available through Nexus. Delivery Health (Jira/sprint data) and Quality Health (support tickets) are usually the most data-rich. Team Energy and Growth Health require more qualitative input from you.

The most valuable output of this exercise isn't the dashboard - it's the 1:1 questions. A data-informed 1:1 question like "I noticed our carry-over rate has doubled in the last 3 sprints - what's happening that isn't visible in the backlog?" is 10x more useful than "how's your sprint going?"

After building the assessment, ask Claude: "Act as Camille Fournier reviewing this team health assessment. What am I missing? What signals should I be tracking that I'm not?"`
      }
    },

    coachContext: {
      evaluationCriteria: [
        'Did they pull real data for at least 2 health categories?',
        'Are the health ratings supported by specific data points (not just gut feel)?',
        'Is the #1 action item specific and actionable?',
        'Did they generate data-informed 1:1 questions?',
        'Did they consider what the data might be missing (qualitative signals)?',
        'Is the assessment something they\'d actually use in their management practice?'
      ],
      exampleFeedback: {
        strong: `This is what data-driven engineering management looks like. You combined sprint velocity data with support ticket trends and found a pattern that gut feel alone wouldn't have surfaced: velocity is stable but carry-over is rising AND support tickets for your area are up 30%. That combination suggests your team is maintaining apparent velocity by deprioritizing quality work. The 1:1 questions you generated are excellent - "I'm seeing more customer-reported issues in our area. Do you feel we have enough time for thorough testing, or is sprint pressure pushing quality down?" is exactly the kind of question that opens honest conversation. Use this template weekly.`,
        needsWork: `You pulled the data, but the health ratings are just restating the numbers without interpreting them. "Velocity is 42 points average" isn't a health rating - is that good? Is it trending up or down? What should it be? The power of this exercise is the synthesis: connecting signals across categories to tell a story. Try: "Velocity is stable (42pts avg), but carry-over has increased from 10% to 25% over 3 sprints, suggesting we're either over-committing or hitting more hidden complexity. Meanwhile, support tickets for our area are up - these might be related." That narrative gives you something to act on.`
      }
    }
  },

  // ──────────────────────────────────────────────────────────
  // EXERCISE 5E.3 - The AI-Era Engineering Manager
  // ──────────────────────────────────────────────────────────
  {
    id: '5E.3',
    title: 'The AI-Era Engineering Manager',
    subtitle: 'How AI changes what your team needs from you',
    duration: '25 min',
    track: 'engineering',
    description: `AI is changing engineering faster than any technology shift since cloud computing. Your engineers are using Copilot, Claude Code, Cursor, or similar tools daily. Code review looks different when 30-40% of the code was AI-generated. Sprint capacity calculations change when a senior engineer with AI tools can do what previously required two engineers.

As an EM, you don't need to be an expert in every AI coding tool. But you need to understand how AI changes three things: what your team can accomplish, how you evaluate quality, and what skills you should be developing in your engineers.

This exercise isn't about learning to code with AI. It's about learning to lead a team that codes with AI.`,

    shifts: [
      {
        area: 'Capacity & Estimation',
        oldWorld: 'Sprint capacity based on engineer count x available days x historical velocity.',
        newWorld: 'Some tasks are 2-5x faster with AI assistance; others aren\'t faster at all. Capacity is no longer linear with headcount. Senior engineers may see bigger AI multipliers than juniors (they know what to ask for).',
        leadershipQuestion: 'How do I adjust my capacity planning and estimation when AI tools make some work dramatically faster but don\'t affect other work at all?',
        prompt: `My team of [N] engineers is using AI coding tools (Claude Code, Copilot) for about 60% of their work. I need to re-think how we estimate sprint capacity. Help me build a framework for:
1. Categorizing work by "AI-accelerated" vs "AI-neutral" vs "AI-irrelevant"
2. Adjusting story point estimates for each category
3. Communicating the new capacity model to my PM partner (who will want to know if we can do more)
4. Avoiding the trap of just increasing commitments because "AI makes us faster"`
      },
      {
        area: 'Code Quality & Review',
        oldWorld: 'Code review catches bugs, enforces standards, and spreads knowledge. Reviewers read every line.',
        newWorld: 'AI-generated code is often correct but generic. It may pass tests but miss architectural intent. The reviewer\'s job shifts from "does this work?" to "does this fit our system?" Knowledge sharing through review is more important than ever because AI-generated code doesn\'t carry context.',
        leadershipQuestion: 'How do I evolve my team\'s code review practice for a world where significant code is AI-generated?',
        prompt: `My team reviews code that's increasingly AI-generated. Help me design an updated code review checklist that accounts for:
1. AI-specific quality risks (generic patterns, missing architectural context, over-engineering)
2. What reviewers should focus on differently when reviewing AI-generated vs human-written code
3. How to maintain knowledge sharing through review when the author didn't write most of the code
4. Signals that an engineer is over-relying on AI (generating without understanding)`
      },
      {
        area: 'Engineer Development',
        oldWorld: 'Growth path: learn languages, learn frameworks, learn architecture, learn system design.',
        newWorld: 'Commodity coding skills are less differentiating. The premium shifts to: problem decomposition (knowing WHAT to ask AI to build), system design thinking, evaluating AI output critically, and understanding business context well enough to make technical trade-offs.',
        leadershipQuestion: 'What skills should I be developing in my engineers that AI makes more valuable, not less?',
        prompt: `I'm updating my engineering team's growth framework for the AI era. Help me identify:
1. Skills that are MORE valuable now that AI handles routine coding (system thinking, problem decomposition, business context, architecture)
2. Skills that are LESS differentiating (syntax mastery, boilerplate patterns, basic CRUD implementation)
3. New skills that didn't exist before (prompt engineering for code, evaluating AI output, AI-assisted debugging, knowing when NOT to use AI)
4. How to assess these skills in performance reviews and 1:1s`
      },
      {
        area: 'Team Structure & Roles',
        oldWorld: 'Team size based on project scope. Senior engineers write complex code; juniors handle simpler tasks.',
        newWorld: 'AI partially flattens the junior/senior gap for implementation tasks. But it widens the gap for architecture, debugging, and judgment calls. The EM role itself shifts: less coordinating work allocation, more ensuring quality, context, and business alignment.',
        leadershipQuestion: 'How does AI change what my team needs from me as their manager?',
        prompt: `As an engineering manager in the AI era, my role is shifting. Help me think through:
1. What my team needs MORE of from me now (architectural guidance, business context, quality standards)
2. What they need LESS of from me now (task assignment, implementation guidance, pairing on code)
3. How I should spend the time freed up by AI-accelerated development
4. What new failure modes I should watch for (over-reliance on AI, quality degradation, loss of deep understanding)`
      }
    ],

    task: {
      instruction: `Pick 2 of the 4 AI-era shifts above. For each one:

1. Run the suggested prompt in Claude Desktop
2. Assess: which recommendations are already relevant to your team, and which are future-state?
3. Identify 1 concrete change you could make this quarter based on the analysis

Then ask Claude: "I manage an engineering team at a dynamic pricing company. We're not a tech-first company - we're a revenue management company that uses technology. How does that context change which AI-era engineering management practices matter most?"

Paste your analysis and the concrete changes you'd make.`,
      prompts: {
        eng_manager: `This exercise is about your leadership evolution, not your team's technical practices.

The most important insight for Beyond's engineering managers: your PM partners are going to start expecting faster delivery because "AI makes engineering faster." But AI makes SOME engineering faster and doesn't affect other engineering at all. You need a framework for explaining this to non-technical stakeholders.

After running the prompts, ask Claude: "Write me a 2-paragraph explanation for my PM partner about how AI coding tools change our team's capacity. Be honest about what gets faster and what doesn't. I need them to understand the nuance, not just the headline."`
      }
    },

    coachContext: {
      evaluationCriteria: [
        'Did they engage with 2 of the 4 AI-era shifts thoughtfully?',
        'Is their assessment honest about what\'s already relevant vs. future-state?',
        'Are the concrete changes specific enough to implement this quarter?',
        'Did they address the Beyond-specific context (revenue management company, not tech-first)?',
        'Did they consider the cross-functional communication angle (explaining AI\'s impact to PMs)?'
      ],
      exampleFeedback: {
        strong: `Sharp analysis. Your distinction between "AI-accelerated" tasks (CRUD endpoints, test generation, boilerplate) and "AI-neutral" tasks (debugging production incidents, architecture decisions, cross-service integration) is exactly the framework your PM partner needs. The concrete change you proposed - creating an "AI acceleration factor" column in your estimation spreadsheet - is practical and testable. And your observation that AI widens the junior/senior gap for judgment calls is an important insight for how you invest in engineer development. This is leadership thinking, not just tool adoption.`,
        needsWork: `You engaged with the prompts but the analysis stays at a general level. "AI will change how we work" is true but not actionable. Get specific: which tasks on YOUR team would be AI-accelerated? Pull up your last sprint's stories and categorize them. That's the exercise - not thinking about AI in the abstract, but mapping it to your actual team's work. Also, the cross-functional communication angle is critical: your PM will ask "so can we do more?" and you need a nuanced answer, not just "it depends."`
      }
    }
  },

  // ──────────────────────────────────────────────────────────
  // EXERCISE 5E.4 - The PM Partnership Playbook
  // ──────────────────────────────────────────────────────────
  {
    id: '5E.4',
    title: 'The PM Partnership Playbook',
    subtitle: 'Being the EM that PMs love working with',
    duration: '25 min',
    track: 'engineering',
    description: `The best product teams have a PM-EM partnership where both leaders bring different but complementary perspectives. The PM brings "what should we build and why?" The EM brings "how should we build it, what are the risks, and what's the real cost?"

The problem: most PM-EM partnerships default to a request-response dynamic. PM writes a spec, EM estimates, PM negotiates timeline, EM delivers. That's a feature factory, not an empowered team.

The better version: EM and PM co-own the problem. The EM doesn't just say "this will take 6 weeks" - they say "this will take 6 weeks, but here's a 2-week version that tests the core hypothesis, and here's what we'd learn from it." That's engineering leadership.

Claude can help you practice this partnership by role-playing your PM's perspective and helping you prepare for the conversations that matter.`,

    partnershipPatterns: [
      {
        name: 'The "Yes, And" Response',
        description: 'Never just say "that\'ll take 6 weeks." Always add what a smaller version could test.',
        prompt: `My PM just brought me this feature request: [FEATURE]. They want it shipped in Q2.

Don't just give me an estimate. Give me:
1. The full-scope estimate (honest, not padded)
2. A "test the hypothesis" version that's 1/3 the effort but validates the core assumption
3. What we'd learn from the smaller version before committing to the full build
4. The technical risks the PM probably hasn't considered

I want to walk into our planning meeting with options, not just a timeline.`
      },
      {
        name: 'The Technical Feasibility Translator',
        description: 'When something isn\'t technically feasible as proposed, explain what IS possible instead of just saying no.',
        prompt: `My PM wants to build [FEATURE AS DESCRIBED]. The technical reality is that [TECHNICAL CONSTRAINT]. Instead of just saying "we can't do that," help me:
1. Explain the constraint in business terms (not technical terms)
2. Propose 2-3 alternative approaches that achieve the same business outcome within the constraint
3. For each alternative, give the effort estimate and trade-off
4. Recommend one approach and explain why`
      },
      {
        name: 'The Proactive Engineering Pitch',
        description: 'Don\'t wait for PMs to ask. Bring them opportunities that only engineering can see.',
        prompt: `Based on what I know about our system architecture, our technical debt, and our incident patterns, there are engineering-led opportunities that could improve our product without any new features. Help me identify and pitch one:
1. What technical improvement would have the most visible customer impact?
2. How would I frame this as a product opportunity, not an engineering request?
3. What data should I pull to make the case? (Think: support tickets, performance metrics, deployment velocity)
4. How should I present this to my PM so it feels like "here's an opportunity for us" not "engineering needs to do housekeeping"?`
      }
    ],

    task: {
      instruction: `Practice the PM partnership using Claude as your PM stand-in:

1. Pick a real upcoming interaction with your PM (a sprint planning discussion, a feature estimation, a roadmap negotiation)
2. Use Claude to role-play the PM's perspective: "You're my PM partner. You care about [PM's priorities]. Challenge my engineering perspective."
3. Practice the "Yes, And" response on a real feature request
4. Practice the "Proactive Engineering Pitch" for a technical improvement you believe in

Document the conversation and identify 1 thing you'd do differently in your next real PM interaction.`,
      prompts: {
        eng_manager: `The most impactful exercise here is the "Yes, And" response. Pick a real feature your PM has proposed. Instead of estimating the full scope, come back with: "Here's the full version (6 weeks). Here's the hypothesis-test version (2 weeks). And here's what we'd learn before committing the other 4 weeks."

This single habit transforms the PM-EM dynamic from negotiation ("I need it faster" / "I need more time") to collaboration ("let's find the smallest thing that teaches us the most").

After the exercise, ask Claude: "Rate my 'Yes, And' response. Does the smaller version actually test the core hypothesis, or is it just a stripped-down feature? There's a big difference."`
      }
    },

    coachContext: {
      evaluationCriteria: [
        'Did they practice with a real upcoming PM interaction (not hypothetical)?',
        'Does the "Yes, And" response include a genuine hypothesis-testing smaller version?',
        'Is the smaller version actually testing the right thing (not just a partial feature)?',
        'Did they identify technical risks the PM probably hasn\'t considered?',
        'Is the communication framed in business terms, not engineering terms?',
        'Did they identify a concrete change for their next PM interaction?'
      ],
      exampleFeedback: {
        strong: `The "Yes, And" response is excellent. Your PM asked for a portfolio health dashboard (6 weeks). You came back with: "Here's a 2-week version that shows health scores for the top 10 accounts using data we already have. If adoption is above 40% in the first month, we build the full version with custom views and alerts." That's not just a smaller feature - it's a genuine learning-first approach. Your PM gets value in 2 weeks, and you avoid building a 6-week feature nobody uses. This is the kind of engineering leadership that Marty Cagan talks about when he says empowered teams.`,
        needsWork: `Your "Yes, And" response stripped features but didn't change the approach. "We'll build the dashboard but without the filters" isn't a hypothesis test - it's just a partial delivery. The question isn't "what can we cut?" it's "what's the smallest thing that tells us if this dashboard is worth building at all?" Maybe that's a weekly email report with the same data (zero UI effort). Maybe it's a prototype in a spreadsheet you share with 3 PMs to see if they actually use it. The hypothesis-test version should be a fundamentally different (and cheaper) approach, not just the same approach with features removed.`
      }
    }
  },

  // ──────────────────────────────────────────────────────────
  // EXERCISE 5E.5 - People Leadership with AI
  // ──────────────────────────────────────────────────────────
  {
    id: '5E.5',
    title: 'People Leadership with AI',
    subtitle: 'Better 1:1s, feedback, and growth conversations',
    duration: '25 min',
    track: 'engineering',
    description: `The most time-consuming part of engineering management is people leadership: 1:1 preparation, feedback drafting, performance reviews, career development conversations, and team dynamics management. These tasks require empathy and judgment that AI can't replace - but AI can dramatically improve the preparation that makes these conversations effective.

The key principle: AI helps you prepare, you deliver with human judgment. Never send AI-generated feedback directly. Always use it as a starting point that you refine with your knowledge of the person.`,

    useCases: [
      {
        name: '1:1 Preparation',
        description: 'Use data and context to make every 1:1 substantive, not just a status update.',
        prompt: `I have a 1:1 with [ENGINEER] tomorrow. Context:
- They've been working on [PROJECT] for the last 2 sprints
- In our last 1:1, they mentioned [CONCERN/GOAL]
- Their recent code reviews have been [OBSERVATION]
- The team's sprint data shows [RELEVANT DATA]

Generate:
1. Three discussion topics that go deeper than status updates (one about their growth, one about a current challenge, one about team dynamics)
2. For each topic, give me an open-ended question that invites honest conversation
3. One observation I could share that shows I'm paying attention to their work
4. One thing I should listen for that might indicate they're struggling but not saying it directly`,
      },
      {
        name: 'Feedback Drafting',
        description: 'Structure feedback that\'s specific, behavioral, and actionable.',
        prompt: `I need to give feedback to [ENGINEER] about [SITUATION]. The behavior I observed: [SPECIFIC BEHAVIOR]. The impact: [WHAT HAPPENED AS A RESULT].

Help me draft feedback using the SBI model (Situation-Behavior-Impact):
1. Frame the situation objectively
2. Describe the behavior specifically (what they did, not who they are)
3. Explain the impact on the team, the project, or the customer
4. Suggest a specific alternative behavior for next time
5. End with a question that invites their perspective

Make it direct but kind. I respect this person and want them to grow, not feel attacked.`,
      },
      {
        name: 'Career Development Planning',
        description: 'Help engineers identify and pursue growth paths.',
        prompt: `[ENGINEER] is a [LEVEL] and wants to grow toward [GOAL - e.g., senior engineer, tech lead, architect]. Their current strengths: [STRENGTHS]. Areas for growth: [AREAS].

Help me build a development plan:
1. Three specific skills they need to demonstrate for the next level
2. For each skill, a concrete project or behavior that would build and demonstrate it
3. A 3-month milestone check: what should be different in 3 months if they're on track?
4. One stretch assignment I could give them this quarter that develops the most important skill`,
      },
      {
        name: 'Difficult Conversation Prep',
        description: 'Prepare for conversations about underperformance, conflict, or organizational change.',
        prompt: `I need to have a difficult conversation with [PERSON] about [SITUATION]. I want to be direct, empathetic, and constructive.

Help me prepare:
1. My opening statement (direct, not softened into meaninglessness)
2. The 3 most likely reactions and how I should respond to each
3. The specific outcome I want from this conversation (what changes after)
4. The line between being kind (good) and being avoidant (bad) in this conversation
5. One question I should ask that gives them agency in the solution`,
      }
    ],

    task: {
      instruction: `Pick 2 of the 4 people leadership use cases above and practice them with real people on your team (using Claude for preparation, not execution).

For each:
1. Run the preparation prompt with real context about the person and situation
2. Review Claude's output and refine it with YOUR knowledge of the person (what would land well, what wouldn't)
3. Note what Claude suggested that you wouldn't have thought of
4. If you've already had the conversation, note how the preparation changed its quality

Important: people leadership content is sensitive. Don't paste names or identifying details into the NexusYou app. Document your learnings in general terms.`,
      prompts: {
        eng_manager: `The 1:1 Preparation use case is the highest-leverage daily practice. If you do nothing else from this exercise, build the habit of spending 5 minutes with Claude before every 1:1 to generate substantive discussion topics and open-ended questions.

The Career Development Planning use case is the highest-leverage quarterly practice. Most EMs think about career development during review season. Using Claude to maintain active development plans means you're coaching year-round, not just evaluating twice a year.

After practicing both, ask Claude: "What's the difference between an engineering manager who prepares for 1:1s with AI and one who doesn't? What does the team experience differently?"`
      }
    },

    coachContext: {
      evaluationCriteria: [
        'Did they practice with real (anonymized) team contexts?',
        'Did they refine Claude\'s output with their own knowledge of the person?',
        'Did they identify something Claude suggested that they wouldn\'t have thought of?',
        'Are they using AI for preparation, not replacing human judgment in delivery?',
        'Did they reflect on how this changes their management practice?'
      ],
      exampleFeedback: {
        strong: `The 1:1 prep is strong - you used real context and Claude generated a question you hadn't considered ("You've been the only person reviewing PRs in this area. How does that feel? Do you want to spread that knowledge or do you want to own it?"). That question opens a conversation about knowledge concentration that you might not have raised. The fact that you refined the career development plan based on your knowledge of the engineer's communication style shows the right balance: AI for structure, you for nuance. Build the 1:1 prep into a weekly habit.`,
        needsWork: `You ran the prompts but used generic context ("an engineer on my team working on a project"). The power of AI-assisted people leadership is that it works with SPECIFIC context about SPECIFIC people. You don't need to share names in NexusYou, but in your actual Claude session, the more specific you are about the person's situation, strengths, and challenges, the more useful the preparation becomes. Try again with real context in your Claude Desktop (privately) and report back on whether the quality difference is meaningful.`
      }
    }
  },

  // ──────────────────────────────────────────────────────────
  // EXERCISE 5E.6 - Engineering Investment Proposal (Capstone)
  // ──────────────────────────────────────────────────────────
  {
    id: '5E.6',
    title: 'The Engineering Investment Proposal',
    subtitle: 'Making the business case for technical excellence',
    duration: '35 min',
    track: 'engineering',
    isCapstone: true,
    description: `The Engineering Investment Proposal is the EM counterpart to the PM's one-pager and the Designer's design spec. It's the document you write when your team needs to invest engineering time in something that isn't on the PM's feature roadmap: infrastructure, reliability, developer experience, architecture improvements, or technical debt.

Most of these proposals die because they're framed in engineering terms. "We need to refactor X" doesn't compete with "we need to build Y feature that drives Z revenue." This capstone teaches you to make engineering investments as compelling as product features.

The proposal should be real - something you actually want to get approved.`,

    template: {
      sections: [
        {
          name: 'Business Context',
          guidance: 'The problem in customer/business terms. Not "our architecture is coupled" but "our pricing feature delivery speed is 2x slower than it should be, directly delaying activation experiments." Lead with the business impact, not the technical problem.'
        },
        {
          name: 'Technical Approach',
          guidance: 'The solution at the architecture level, not implementation detail. Your PM partner should be able to understand this. If they can\'t, it\'s too technical.'
        },
        {
          name: 'Trade-offs Considered',
          guidance: 'What other approaches did you consider and why is this one better? Including "do nothing" as an option with its consequences.'
        },
        {
          name: 'Impact on Team Velocity',
          guidance: 'How does this investment change what the team can deliver? Be specific: "After this investment, pricing feature deployments go from 10 days to 3 days."'
        },
        {
          name: 'Impact on Reliability',
          guidance: 'How does this reduce incidents, improve uptime, or reduce operational burden? Use incident data if available.'
        },
        {
          name: 'Customer Impact',
          guidance: 'How does the customer experience change? Even infrastructure work has downstream customer effects.'
        },
        {
          name: 'Effort & Timeline',
          guidance: 'T-shirt size, team required, timeline, and what feature work gets delayed (the explicit trade-off).'
        },
        {
          name: 'What We Delay',
          guidance: 'Name the specific feature work that gets pushed and why this investment is higher priority. Your PM partner should agree with this trade-off, or at least understand why you believe it.'
        },
        {
          name: 'Success Metrics',
          guidance: 'How will we know this investment worked? Deployment frequency, incident rate, support ticket volume, time-to-ship for subsequent features.'
        },
        {
          name: 'Risks',
          guidance: 'What could go wrong, and what\'s the mitigation? Include the risk of NOT doing this investment.'
        }
      ]
    },

    task: {
      instruction: `Write a real Engineering Investment Proposal using the 4-step workflow from Level 5:

1. **Draft with Claude:** Provide the technical context and ask Claude to draft the proposal using the template above. Tell Claude: "Frame every section in business terms. My audience is my VP and my PM partner."
2. **Adversarial critique:** Ask Claude to critique it from two perspectives: (a) your PM who needs feature velocity and (b) your VP who controls the engineering budget.
3. **Data-grounding:** Use Nexus-Product to pull supporting data - support tickets showing customer impact, PostHog data showing performance issues, any available deployment or incident data.
4. **Final polish with Opus:** Produce the final version using Opus for the highest quality business writing.

The deliverable should be ready to present to your VP and your PM partner. Publish to Beyond Share.`,
      prompts: {
        eng_manager: `Pick the engineering investment you most believe in. The one that your team needs but keeps losing the prioritization battle to feature work.

The template forces you to do the hard work: framing the investment in business terms, naming the trade-off explicitly, and defining success metrics that a non-engineer can evaluate.

After the 4-step workflow, add a 5th step: "I need to present this in a 5-minute slot at our planning meeting. What's the narrative arc? What do I say first? What data point do I lead with? What's the hardest question I'll get, and what's my answer?"

The best Engineering Investment Proposals don't feel like engineering asking for permission. They feel like a business opportunity that happens to require engineering investment.`
      }
    },

    assessment: {
      questions: [
        {
          question: 'What\'s the most effective way to frame a technical debt investment for non-technical leadership?',
          options: [
            'Explain the technical architecture problems in detail',
            'Lead with the business impact (slower delivery, more incidents, delayed experiments) and connect the technical investment to business outcomes',
            'Argue that engineering needs dedicated time for maintenance',
            'Compare to industry benchmarks for code quality'
          ],
          correct: 1,
          explanation: 'Translation is the key skill. VPs and PMs approve investments that drive business outcomes. "This refactor accelerates our experiment velocity by 3x" gets funded. "This codebase needs modernization" doesn\'t.'
        },
        {
          question: 'What makes the "Yes, And" response to a PM\'s feature request effective?',
          options: [
            'It shows the PM that engineering can work faster',
            'It provides the full estimate plus a smaller hypothesis-testing version and what we\'d learn from it',
            'It gives the PM multiple timeline options',
            'It demonstrates technical expertise'
          ],
          correct: 1,
          explanation: 'The "Yes, And" transforms the EM role from order-taker to strategic partner. You\'re not negotiating timeline - you\'re proposing a learning-first approach that might save the team months of building the wrong thing.'
        },
        {
          question: 'How does AI change what engineering teams need from their managers?',
          options: [
            'EMs should learn to code with AI tools like their engineers do',
            'EMs should focus more on architectural guidance, business context, quality standards, and team development since AI accelerates implementation but not judgment',
            'EMs should reduce oversight since AI makes engineers more independent',
            'AI doesn\'t meaningfully change the EM role'
          ],
          correct: 1,
          explanation: 'AI accelerates implementation but increases the need for judgment, context, and quality. EMs who shift from "how should we build this?" to "should we build this, and what does success look like?" become more valuable, not less.'
        }
      ],
      selfReflection: `What's the single biggest change in how you think about your role as an engineering manager after Level 5? How will you use AI to be a better leader, not just a more efficient one?`
    },

    milestone: {
      message: `You're a Property Manager now - and not the kind that just manages resources. You've learned to translate technical value into business language, build data-driven team health assessments, adapt your leadership to the AI era, and partner with PMs as a co-owner of business outcomes. That Engineering Investment Proposal is ready for your next planning cycle.`,
      dadJoke: `Why did the engineering manager bring a translator to the product review? Because someone needed to explain that "refactoring the service mesh" means "making features ship faster." Gerard says this one is practically a TED talk.`,
      nextLevel: `Level 6: The Destination Definer - Claude Code, the BMAD method, and building your personal AI Operating System. As an EM, this is where your technical background becomes a superpower again.`
    },

    coachContext: {
      evaluationCriteria: [
        'Is every section of the proposal framed in business terms (not technical terms)?',
        'Is the trade-off explicit (what feature work gets delayed and why)?',
        'Are there specific numbers grounding the business impact?',
        'Did they use Nexus data to support the case?',
        'Would a non-technical VP be able to make a go/no-go decision from this document?',
        'Does the adversarial critique from the PM perspective surface real objections?',
        'Is this a real investment proposal, not a practice exercise?'
      ],
      exampleFeedback: {
        strong: `This proposal would get funded. You lead with "our pricing experiment velocity is 2x slower than it should be, directly delaying activation improvement" - that's a sentence that makes a VP lean forward. The trade-off section is honest and specific: "This delays Smart Minimum Stay by 4 weeks. We recommend this sequencing because faster deployment velocity accelerates every future pricing feature, including Smart Minimum Stay." That's not just naming the trade-off - it's explaining why the sequencing is rational. Your PM partner should agree with this framing. Send it.`,
        needsWork: `The proposal has the right structure but several sections are still in engineering language. "Reduce coupling between services" doesn't tell a VP anything. Translate: what does reduced coupling MEAN for the business? (Faster deployments? Fewer incidents? Independent team velocity?) Also, the "What We Delay" section just says "some feature work" - name the specific features and explain why this investment takes priority. VPs can evaluate "delay Feature X by 4 weeks to unlock 3x faster experiment shipping" but they can't evaluate "delay some work to do infrastructure."`
      }
    }
  }
]

// ─── Track detection helpers ─────────────────────────────────────────────────
export function getTrackForRole(userRole) {
  const role = (userRole || '').toLowerCase()
  if (role.includes('design')) return 'design'
  if (role.includes('engineering') || role.includes('eng manager') || role.includes('director of engineering'))
    return 'engineering'
  return 'pm'
}

export function getLevel5Exercises(userRole) {
  const track = getTrackForRole(userRole)
  if (track === 'design') return LEVEL5.exercises.filter(ex => ex.track === track || ex.track === 'all')
  if (track === 'engineering') return level5EngManagerExercises
  return LEVEL5.exercises.filter(ex => ex.track === track || ex.track === 'all')
}
