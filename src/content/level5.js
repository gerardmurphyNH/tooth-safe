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

// ─── Track detection helpers ─────────────────────────────────────────────────
export function getTrackForRole(userRole) {
  const role = (userRole || '').toLowerCase()
  if (role.includes('design')) return 'design'
  return 'pm'
}

export function getLevel5Exercises(userRole) {
  const track = getTrackForRole(userRole)
  return LEVEL5.exercises.filter(ex => ex.track === track || ex.track === 'all')
}
