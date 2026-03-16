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
    // ── Exercise 5.1 (PM Track) ───────────────────────────────────────────────
    {
      id: '5P.1',
      title: 'The One-Pager',
      track: 'pm',
      duration: '25 min',
      type: 'framework',
      skill: "Using AI to draft and iteratively refine a Beyond OKR one-pager",
      intro:
        "The OKR one-pager is one of the most important documents a PM writes. It's also one of the hardest to get right — too vague and engineering doesn't know what to build, too prescriptive and you're writing specs before discovery.\n\nAI can dramatically accelerate the drafting process, but the real skill is using adversarial prompting to pressure-test every section before it goes to stakeholders.",
      learningObjective:
        "You'll draft a real OKR one-pager using Beyond's format, then iterate it through at least 3 rounds of AI-assisted critique until it meets the quality bar.",
      content: {
        type: 'framework',
        framework: {
          name: "Beyond One-Pager Template (9 Sections)",
          description:
            "The standard Beyond format for any product initiative — from small improvements to large strategic bets. AI can draft this in minutes; your job is to make every section specific and defensible.",
          elements: [
            {
              letter: '1',
              name: 'Project Overview',
              description: 'Project Name, Business Sponsor(s), Project Owner, Date Created',
              example: "Project: Streamlined Host Onboarding · Sponsor: VP Product · Owner: [You] · Date: Q2 2025",
              color: '#3bc1cc',
            },
            {
              letter: '2',
              name: 'Quick Description',
              description: '2-3 sentences: what this project is and why it matters now',
              example: "Reduce the required onboarding steps from 6 to 3 to increase activation rate. Current 5% activation rate creates a 95% attrition problem — this initiative directly targets the conversion gap.",
              color: '#ee3968',
            },
            {
              letter: '3',
              name: 'Business Hypothesis / Goals',
              description: 'What problem does this solve? Expected impact? How long is payback?',
              example: "Hypothesis: 71% of hosts drop off at step 4 (pricing rules setup). If we remove or defer this step, completion rate will increase >50%, improving activation to 8%+ within 2 quarters.",
              color: '#02556c',
            },
            {
              letter: '4-5',
              name: 'Engineering Effort + MVP',
              description: 'T-Shirt size (S/M/L) + what the minimum viable version looks like',
              example: "Effort: Medium (3-6 weeks). MVP: Remove step 4 from required flow, make it optional post-activation with an in-app prompt at day 7.",
              color: '#252f38',
            },
            {
              letter: '6-7',
              name: 'Not In Scope + Dependencies',
              description: 'Explicit exclusions + other teams/systems required for success',
              example: "Not in scope: redesigning the full onboarding flow, mobile app changes. Dependencies: Growth team (email triggers), Data team (activation metric definition).",
              color: '#3bc1cc',
            },
            {
              letter: '8-9',
              name: 'Expected Impact + Risks',
              description: 'Anticipated outcomes (quantified if possible) + the top risks',
              example: "Impact: 5% → 8% activation = ~180 additional paying hosts/month at avg ARR of [X]. Risks: Removing step 4 may reduce algorithm data quality, hurting BtM performance.",
              color: '#ee3968',
            },
          ],
        },
        prompts: [
          {
            label: 'Draft the full one-pager:',
            prompt: `I need to write a Beyond product initiative one-pager. Here's the standard template:

${BEYOND_OKR_TEMPLATE}

My initiative context: [describe your project — what problem it solves, for who, and what you think the solution looks like]

Beyond strategic context to keep in mind:
- Activation crisis: 6,000 signups/month, only 5% convert (target 8-11%)
- Premium problem: Beyond charges 3-5x vs PriceLabs — every feature must justify the premium
- Core metric: BtM (Beat the Market) — customers achieving +20% RevPAN vs competitive set

Please draft a complete one-pager following the template. After drafting, immediately critique it: which section is weakest and what specific improvement would make it stronger?`,
          },
          {
            label: 'Engineering pressure-test:',
            prompt: "You are a skeptical Head of Engineering who's been burned by vague one-pagers. Review this one and tell me: (1) What in the MVP definition is ambiguous enough to cause scope creep? (2) Which dependency am I underestimating? (3) What question would you ask in sprint planning that this one-pager doesn't answer?",
          },
          {
            label: 'Strategic alignment check:',
            prompt: "Review this one-pager against Beyond's four strategic priorities: (1) activation crisis (5% → 8%), (2) premium justification (vs. PriceLabs), (3) BtM improvement (50% → 75% of listings), (4) Owner Suite / PM retention. Which priority does this directly address? Is the Expected Impact section quantified enough to compare it against other initiatives competing for the same engineering capacity?",
          },
        ],
      },
      task: {
        instructions:
          "Write a Beyond one-pager for a real initiative you're working on or recently worked on. It must:\n✓ Use all 9 sections of the real Beyond template\n✓ Include specific numbers (ARR impact, activation rate change, % improvement)\n✓ Go through at least 3 rounds of AI critique (draft → feedback → revise → feedback → final)\n✓ Include the engineering pressure-test and strategic alignment check\n\nSubmit the final version plus a brief log of what changed in each revision round.",
        fields: [
          {
            id: 'initiative_context',
            label: 'The initiative you\'re writing about (brief context):',
            placeholder: 'What is the initiative? What problem does it address? Who is it for? What\'s the current state?',
            rows: 4,
            required: true,
          },
          {
            id: 'final_one_pager',
            label: 'Your final one-pager (after 3+ rounds of critique):',
            placeholder:
              "1. PROJECT OVERVIEW\nProject Name: \nBusiness Sponsor: \nProject Owner: \n\n2. QUICK DESCRIPTION\n[2-3 sentences]\n\n3. BUSINESS HYPOTHESIS / GOALS\n[Problem, expected impact, payback period]\n\n4. ENGINEERING EFFORT\n[S/M/L + rationale]\n\n5. MVP DEFINITION\n[Minimum viable version]\n\n6. NOT IN SCOPE\n[Explicit exclusions]\n\n7. KEY DEPENDENCIES\n[Teams, systems, requirements]\n\n8. EXPECTED IMPACT\n[Quantified outcomes]\n\n9. RISKS & OPEN QUESTIONS\n[Top 3]",
            rows: 20,
            required: true,
          },
          {
            id: 'revision_log',
            label: "Brief revision log — what changed in each round of critique and why:",
            placeholder:
              "Round 1 feedback: [What the critique said]\nRound 1 changes: [What you changed]\n\nRound 2 feedback: ...\nRound 2 changes: ...\n\nRound 3 feedback: ...\nRound 3 changes: ...",
            rows: 8,
            required: true,
          },
        ],
      },
      coachContext:
        "Evaluate the OKR one-pager as a senior PM would. Check each section: (1) Objective — is it in customer/business outcome terms, not feature terms? 'Build a better onboarding flow' fails; 'Activate 12% of signups within 30 days' passes. (2) Key Results — measurable and specific? 'Improve activation' fails; 'Increase activation from 5% to 12%' passes. (3) Problem Statement — is it evidence-backed (specific numbers, specific behaviors) or just assertions? (4) Hypotheses — are they testable? Do they explain the mechanism (not just 'we believe X will improve Y' but 'we believe X will improve Y because [evidence/logic]')? (5) Risks — are these real, specific risks or generic ones that could apply to any initiative? Evaluate the revision log: did each round of critique actually improve the document in a specific way?",
      evaluationCriteria: [
        'Objective is in customer/business outcome terms',
        'Key Results are measurable with specific numbers',
        'Problem Statement is evidence-backed (specific data)',
        'Hypotheses are testable and include mechanism',
        'Risks are specific to this initiative',
        'Revision log shows substantive improvements in each round',
      ],
    },

    // ── Exercise 5.2 (PM Track) ───────────────────────────────────────────────
    {
      id: '5P.2',
      title: 'Opportunity Mapping',
      track: 'pm',
      duration: '25 min',
      type: 'framework',
      skill: 'Building Teresa Torres Opportunity Solution Trees with AI as a thinking partner',
      intro:
        "Teresa Torres' Opportunity Solution Tree is one of the most powerful discovery tools in product management. It forces you to separate problems (opportunities) from solutions, and to think about them in a structured hierarchy.\n\nThe challenge is that most PMs either skip the tree entirely or build it post-hoc to justify decisions they've already made. Using AI as a thinking partner forces you to genuinely explore the opportunity space before committing to solutions.",
      learningObjective:
        "You'll generate a genuine OST for a current product area, challenge your assumptions at each branch, and identify which opportunity branch deserves the most immediate discovery work.",
      content: {
        type: 'framework',
        framework: {
          name: 'Opportunity Solution Tree',
          description:
            "The OST separates problems from solutions. Start with the desired outcome → explore the opportunity space → map potential solutions → design experiments.",
          elements: [
            {
              letter: 'O',
              name: 'Desired Outcome',
              description: 'The business/customer outcome that would make this a success (your OKR)',
              example: 'Increase 30-day host activation rate from 5% to 12%',
              color: '#ee3968',
            },
            {
              letter: 'Op',
              name: 'Opportunities',
              description: 'Customer problems, needs, or pain points that, if addressed, would move the outcome',
              example: "• Hosts don't understand what 'activated' means\n• Setup process is too complex for non-technical hosts\n• Hosts don't trust the algorithm's first recommendations",
              color: '#3bc1cc',
            },
            {
              letter: 'S',
              name: 'Solutions',
              description: 'Potential ways to address each opportunity (many solutions per opportunity)',
              example: "For 'process too complex':\n• Reduce required steps from 6 to 3\n• Add a guided setup wizard\n• Create a 'quick start' mode that uses smart defaults",
              color: '#02556c',
            },
            {
              letter: 'E',
              name: 'Experiments',
              description: 'How to test whether a solution actually addresses the opportunity',
              example: "Test 'quick start' mode with 50 new hosts — measure activation rate and time to first BtM vs. control",
              color: '#252f38',
            },
          ],
        },
        prompts: [
          {
            label: 'Generate the opportunity space:',
            prompt: "I'm building an Opportunity Solution Tree for this outcome: [your outcome]. Without suggesting solutions yet, help me map the full opportunity space. What customer problems, needs, and pain points, if addressed, would move this outcome? Give me at least 10, organized by type (behavioral, motivational, knowledge gaps, trust gaps, friction points).",
          },
          {
            label: 'Challenge the assumptions at each branch:',
            prompt: "For each of these opportunities: [list 3-5 from above], challenge the assumption that this is a real problem. What would a customer say if we assumed this about them? What evidence would validate or invalidate this opportunity before we invest in solutions?",
          },
          {
            label: 'Identify the highest-leverage branch:',
            prompt: "Given our current data ([specific data you have]) and our engineering constraints ([capacity]), which opportunity branch would give us the best ROI on discovery effort? Explain using impact × confidence × ease framework.",
          },
        ],
      },
      task: {
        instructions:
          "Build a real OST for a product area you're working on or recently worked on. Go at least 3 levels deep (Outcome → Opportunities → Solutions → Experiments for at least 2 branches).\n\nThe test: could you walk a skeptical stakeholder through this tree and defend why you're starting with the opportunity branch you chose?",
        fields: [
          {
            id: 'desired_outcome',
            label: 'The desired outcome (your OKR or goal statement):',
            placeholder: 'Specific, measurable outcome you\'re working toward...',
            rows: 2,
            required: true,
          },
          {
            id: 'opportunity_tree',
            label: 'Your OST — at least 3 levels deep (Outcome → 3+ Opportunities → Solutions → Experiments):',
            placeholder:
              "OUTCOME: [Your outcome]\n\nOPPORTUNITY 1: [Customer problem/need]\n  Solutions: [List 2-3 potential solutions]\n  Top experiment: [How to test]\n\nOPPORTUNITY 2: ...\n\nOPPORTUNITY 3: ...\n\n[etc.]",
            rows: 16,
            required: true,
          },
          {
            id: 'highest_leverage',
            label: 'Which opportunity branch deserves immediate discovery work, and why?',
            placeholder:
              "Use the impact × confidence × ease lens. What makes this the highest-leverage starting point over the other branches?",
            rows: 5,
            required: true,
          },
          {
            id: 'assumption_challenged',
            label: 'Which of your opportunities surprised you when you challenged its assumptions?',
            placeholder:
              "Which opportunity seemed obvious until you challenged it? What did the assumption challenge reveal?",
            rows: 3,
            required: false,
          },
        ],
      },
      coachContext:
        "Evaluate the OST exercise. Check: (1) Is the desired outcome measurable, not a feature? (2) Are the opportunities genuinely customer-centric problems/needs — not features or solutions in disguise? 'Build a wizard' is a solution; 'hosts don't complete setup because it feels overwhelming' is an opportunity. (3) Does it go 3+ levels deep (Outcome → Opportunity → Solutions → Experiments)? (4) Is the 'highest leverage' reasoning substantive — does it use impact × confidence × ease or similar, or is it just 'this seems important'? (5) Does the assumption challenge show genuine critical thinking — did it change anything, or was it superficial?",
      evaluationCriteria: [
        'Desired outcome is measurable (specific numbers)',
        'Opportunities are customer problems, not solutions in disguise',
        'Tree goes 3+ levels deep with real content',
        'Highest-leverage reasoning is substantive (uses a framework)',
        'Assumption challenge shows genuine critical thinking',
      ],
    },

    // ── Exercise 5.3 (PM Track) ───────────────────────────────────────────────
    {
      id: '5P.3',
      title: 'The Premium Test',
      track: 'pm',
      duration: '20 min',
      type: 'playground',
      skill: "Using adversarial AI to pressure-test whether a feature justifies Beyond's premium price",
      intro:
        "Beyond's pricing strategy depends on one thing: being worth 3-5x more than PriceLabs to sophisticated STR hosts. Every feature we ship either strengthens or weakens that argument.\n\nThe Premium Test is a forced perspective exercise: you argue both sides of whether a feature justifies the premium. The point isn't to reach a conclusion — it's to know what the strongest arguments are on both sides before you go into a stakeholder conversation.",
      learningObjective:
        "You'll run both sides of the premium argument for a real feature or initiative, surface the strongest objections, and write a one-paragraph positioning statement that survives those objections.",
      content: {
        type: 'patterns',
        patterns: [
          {
            name: 'The Premium Case',
            prompt: "Make the strongest possible case that [feature] justifies Beyond's 3-5x premium over PriceLabs. What can a sophisticated STR host do with this feature that they absolutely cannot do with PriceLabs? Be specific about the economic value — this needs to translate to RevPAN improvement.",
            when: 'Run this first — understand the best version of the pro argument',
          },
          {
            name: 'The PriceLabs Rebuttal',
            prompt: "You are the PriceLabs Head of Product. Beyond just announced [feature]. Write the internal memo you'd send to your team explaining why this is NOT a competitive threat, and what you'd say to shared customers who ask about it.",
            when: 'Forces you to steelman the competitive response',
          },
          {
            name: 'The Customer Skeptic',
            prompt: "You are a sophisticated STR host managing 12 properties who currently uses PriceLabs and is considering switching to Beyond. Beyond's sales team just pitched you [feature] as a reason to switch. Give me your honest internal reaction — and the specific question you'd ask before believing this justifies the price difference.",
            when: 'Gets at the real customer adoption barrier',
          },
          {
            name: 'The Positioning Synthesis',
            prompt: "Given these three perspectives: [paste the three responses above]. Write a 1-paragraph competitive positioning statement for [feature] that honestly acknowledges the strongest objection and still makes a compelling case for the premium. Don't oversell.",
            when: 'Synthesizes the tension into honest, durable positioning',
          },
        ],
      },
      task: {
        instructions:
          "Pick a feature currently on the roadmap or recently shipped. Run all 4 premium test prompts in Claude. Then write the positioning statement that survives the strongest objections.\n\nThis is valuable whether the feature passes or fails the test — knowing it fails is even more valuable.",
        fields: [
          {
            id: 'feature',
            label: 'The feature you\'re testing (brief description):',
            placeholder: 'What the feature does, who it\'s for, and where it sits on the roadmap...',
            rows: 3,
            required: true,
          },
          {
            id: 'premium_case',
            label: "The strongest 'premium case' Claude made for this feature:",
            placeholder: 'Key arguments that genuinely justify the price premium...',
            rows: 4,
            required: true,
          },
          {
            id: 'pricelabs_rebuttal',
            label: "The strongest 'PriceLabs rebuttal' Claude generated:",
            placeholder: 'The most compelling competitive counter-argument...',
            rows: 4,
            required: true,
          },
          {
            id: 'customer_objection',
            label: "The customer skeptic's sharpest objection:",
            placeholder: 'The specific question or objection the skeptical customer raised...',
            rows: 3,
            required: true,
          },
          {
            id: 'positioning_statement',
            label: 'Your final 1-paragraph positioning statement that survives the objections:',
            placeholder:
              "This should honestly acknowledge the strongest objection while still making a compelling case for premium value. No BS, no overselling.",
            rows: 5,
            required: true,
          },
          {
            id: 'verdict',
            label: "Your honest verdict: does this feature justify the premium? (Yes/No/Partially — and your reasoning)",
            placeholder: 'Be direct. If it doesn\'t justify the premium, that\'s valuable information.',
            rows: 3,
            required: true,
          },
        ],
      },
      coachContext:
        "Evaluate the Premium Test exercise. The key test is honesty: is the user willing to reach a conclusion that challenges the feature, or did they just validate what they already believed? Check: (1) Is the premium case genuinely compelling — specific economic value (RevPAN, retention, ARR impact), not just feature descriptions? (2) Is the PriceLabs rebuttal actually strong — would it represent a legitimate competitive response, or is it strawman weak? (3) Does the positioning statement acknowledge the real objection while making a compelling case? The best ones feel honest, not salesy. (4) Is the verdict direct — do they take a position, or hedge indefinitely?",
      evaluationCriteria: [
        'Premium case is specific about economic value (not just feature benefits)',
        'PriceLabs rebuttal is genuinely strong (not strawman)',
        'Customer objection is specific and realistic',
        'Positioning statement acknowledges the real objection honestly',
        'Verdict is direct and takes a position',
      ],
    },

    // ── Exercise 5.4 (PM Track) ───────────────────────────────────────────────
    {
      id: '5P.4',
      title: 'Strategy Stress Test',
      track: 'pm',
      duration: '20 min',
      type: 'reflection',
      skill: 'Using AI to pressure-test strategy documents against Gibson Biddle\'s DHM and Perri\'s build trap lens',
      intro:
        "Strategy documents are where PM hand-waving goes to hide. Vague language ('improve user experience', 'drive growth'), outputs dressed as outcomes, and feature lists in strategic clothing.\n\nGibson Biddle's DHM model asks whether a strategy Delights customers in Hardly-copy-able ways that are Margin-enhancing. Melissa Perri's build trap lens asks whether you're building to ship output vs. achieve outcomes.\n\nUsed together with adversarial AI, they turn strategy documents into something that can actually survive a board meeting.",
      learningObjective:
        "You'll run a real strategy document through both frameworks and document what changed about how you'd defend it to leadership.",
      content: {
        type: 'patterns',
        patterns: [
          {
            name: 'The DHM Lens',
            prompt: "Apply Gibson Biddle's DHM model to this strategy: (1) Delight — does this strategy create customer delight in a specific, measurable way? (2) Hard to copy — what prevents PriceLabs or a well-funded startup from copying this in 18 months? (3) Margin-enhancing — does this strategy improve our margins or pricing power, or does it require ongoing cost investment? Be direct about where the strategy is weakest on DHM.",
            when: 'For any strategy document that claims competitive differentiation',
          },
          {
            name: 'The Build Trap Lens',
            prompt: "Apply Melissa Perri's 'build trap' lens to this strategy. Is this strategy organized around: (a) outputs (features we plan to ship) or (b) outcomes (changes in customer behavior we want to drive)? Identify every place in the document where output thinking is masquerading as outcome thinking.",
            when: 'When the strategy sounds like a roadmap in disguise',
          },
          {
            name: 'The Leadership Challenge',
            prompt: "You are a skeptical board member with a background in SaaS and competitive markets. This strategy document has 10 minutes of your attention. What are the 3 questions you'd ask that the document doesn't answer — and that the PM would be most uncomfortable answering?",
            when: "The ultimate stress test — what's the hardest question this strategy can't answer?",
          },
        ],
      },
      task: {
        instructions:
          "Take a strategy document — your OKR one-pager from 5P.1, a team strategy doc, a recent planning artifact, or a product area strategy you've worked on. Run it through all three lenses.\n\nThen answer: what's the hardest leadership question this strategy currently can't answer, and what would you need to do to answer it?",
        fields: [
          {
            id: 'strategy_doc',
            label: 'The strategy document you\'re stress-testing (paste or summarize):',
            placeholder: 'Your OKR one-pager, strategy memo, or planning document...',
            rows: 8,
            required: true,
          },
          {
            id: 'dhm_analysis',
            label: 'DHM analysis — where is the strategy strong vs. weak?',
            placeholder:
              "Delight: [Strong/Weak — specific reason]\nHard to copy: [Strong/Weak — specific reason]\nMargin-enhancing: [Strong/Weak — specific reason]",
            rows: 6,
            required: true,
          },
          {
            id: 'build_trap_analysis',
            label: 'Build trap analysis — where does output thinking hide in this strategy?',
            placeholder:
              "List the specific sections or sentences that are outputs disguised as outcomes. Quote them if helpful.",
            rows: 4,
            required: true,
          },
          {
            id: 'hardest_question',
            label: "The hardest leadership question this strategy can't currently answer:",
            placeholder: "What would the board member ask that would make you uncomfortable? Be specific.",
            rows: 3,
            required: true,
          },
          {
            id: 'what_changes',
            label: "What would you need to do to answer that question?",
            placeholder:
              "Specific discovery work, data analysis, or strategic thinking needed to close this gap.",
            rows: 3,
            required: true,
          },
        ],
      },
      coachContext:
        "Evaluate the strategy stress test. Check: (1) Is the DHM analysis specific — does it name specific reasons something is weak/strong, not just 'the delight section is okay'? (2) Does the build trap analysis name actual examples from the document — specific sentences that are outputs disguised as outcomes? (3) Is the 'hardest leadership question' genuinely hard — would it make a prepared PM uncomfortable, or is it a question they could easily answer? (4) Is the 'what changes' response substantive — does it name specific actions (discovery interviews, data analysis, competitive research) vs. 'I need to think about this more'?",
      evaluationCriteria: [
        'DHM analysis is specific (names reasons, not just strong/weak)',
        'Build trap analysis quotes actual examples from the document',
        'Hardest question is genuinely difficult (not a softball)',
        'What changes is specific and actionable',
      ],
    },

    // ── Exercise 5.5 (PM Track) ───────────────────────────────────────────────
    {
      id: '5P.5',
      title: 'The Experiment Designer',
      track: 'pm',
      duration: '20 min',
      type: 'framework',
      skill: 'Designing fast, minimal experiments to validate risky assumptions',
      intro:
        "The best discovery is the fastest discovery that still gives you a real signal. Most PM experiments are either too slow (wait 8 weeks for statistical significance on something we could have learned in 5 days) or too small (n=5 user interviews that don't generalize).\n\nAI helps you design better experiments by forcing you to be precise about what you're actually testing, what a real signal looks like, and what the minimum viable test is.",
      learningObjective:
        "You'll design a real experiment for a risky assumption in your current work — specific enough to actually run in the next 2 weeks.",
      content: {
        type: 'framework',
        framework: {
          name: 'The Experiment Design Template',
          description:
            "Six elements that distinguish a real experiment from a research project.",
          elements: [
            {
              letter: 'H',
              name: 'Hypothesis',
              description: 'We believe [assumption] because [evidence/reasoning]',
              example: "We believe hosts abandon step 4 because pricing rules feel too technical, because 71% of Mixpanel drop-offs happen at that step and customer interviews mention 'too complicated'.",
              color: '#ee3968',
            },
            {
              letter: 'S',
              name: 'Success Criteria',
              description: 'We\'ll know we\'re right if [specific, measurable outcome] happens',
              example: "We'll know we're right if the quick-start version of step 4 achieves >50% completion vs. current 29%.",
              color: '#3bc1cc',
            },
            {
              letter: 'T',
              name: 'Test Design',
              description: 'The minimum viable test that would give us signal',
              example: "Show 100 new hosts a simplified version of step 4 (mockup, not built) and measure whether they click 'save' on the pricing rules.",
              color: '#02556c',
            },
            {
              letter: 'F',
              name: 'Failure Condition',
              description: 'We\'ll know we\'re wrong if [specific outcome]',
              example: "We'll know we're wrong if completion on the simplified version is <40% — meaning the problem isn't complexity, it's something else.",
              color: '#252f38',
            },
            {
              letter: 'L',
              name: 'Learning',
              description: 'Regardless of outcome, what will we learn?',
              example: "We'll either confirm that simplifying step 4 drives activation (and build it) or learn that the problem is elsewhere (and look at other hypotheses).",
              color: '#ee3968',
            },
          ],
        },
      },
      task: {
        instructions:
          "Pick the riskiest assumption in your current work — something that, if wrong, would significantly change what you should be building or prioritizing.\n\nDesign a minimum viable experiment using the template. The test: could someone on your team run this experiment in 2 weeks without a kickoff meeting?",
        fields: [
          {
            id: 'risky_assumption',
            label: 'The risky assumption you\'re testing:',
            placeholder:
              "What is the specific assumption that, if wrong, would change your direction? Why is it risky?",
            rows: 3,
            required: true,
          },
          {
            id: 'experiment',
            label: 'Your experiment design (use the H, S, T, F, L format):',
            placeholder:
              "H (Hypothesis): We believe [X] because [evidence].\n\nS (Success Criteria): We'll know we're right if [specific outcome].\n\nT (Test Design): [Minimum viable test — what you'll do, with whom, in what timeframe].\n\nF (Failure Condition): We'll know we're wrong if [specific outcome].\n\nL (Learning): Regardless of outcome, we'll learn [what].",
            rows: 14,
            required: true,
          },
          {
            id: 'mvt_reality_check',
            label: 'Reality check: could someone actually run this in 2 weeks without a kickoff meeting?',
            placeholder:
              "Yes/No — and if No, what makes it too complex? What would you need to simplify?",
            rows: 3,
            required: true,
          },
        ],
      },
      coachContext:
        "Evaluate the experiment design. Check: (1) Is the hypothesis specific — does it name the exact assumption and the evidence behind it? 'We believe users want a better experience' fails; 'We believe hosts abandon step 4 because pricing rules feel technical, supported by 71% Mixpanel drop-off at step 4' passes. (2) Are success criteria measurable — do they name a specific metric and threshold? (3) Is the test design truly minimum viable — could it actually run in 2 weeks with existing resources, or does it require months of engineering? (4) Is the failure condition as specific as the success criteria? Many people define success clearly but leave failure vague — that's a red flag. (5) Does the learning section show they'll learn something regardless of outcome?",
      evaluationCriteria: [
        'Hypothesis is specific (names assumption + evidence)',
        'Success criteria are measurable (specific metric and threshold)',
        'Test design is genuinely minimum viable (2-week runnable)',
        'Failure condition is as specific as success criteria',
        'Learning is valuable regardless of outcome direction',
      ],
    },

    // ── Exercise 5.6 (PM Track Capstone) ─────────────────────────────────────
    {
      id: '5P.6',
      title: 'Capstone: The Complete OKR Package',
      track: 'pm',
      duration: '35 min',
      type: 'capstone',
      skill: 'Delivering a complete, stakeholder-ready OKR one-pager refined through AI critique',
      intro:
        "This capstone is the thing you could put in front of your skip-level or a board member. Not a draft. Not 'directionally right.' A polished, defensible, evidence-backed OKR one-pager that represents the PM craft you've developed across Levels 1-5.",
      learningObjective:
        "Deliver a complete OKR one-pager for a real current project that you'd be proud to submit in a planning cycle.",
      content: {
        type: 'walkthrough',
        steps: [
          { number: 1, title: 'Draft using the Beyond format', description: 'Use your Level 5.1 draft or write fresh for a different initiative.', tip: 'Use your prompt library from Level 4.5 — you should have a prompt for this.' },
          { number: 2, title: 'Run the Four Risks check', description: "Apply Exercise 4.6's framework to verify you haven't missed a critical risk.", tip: 'Be honest. A risk log that says everything is low risk is a warning sign.' },
          { number: 3, title: 'Run the DHM check', description: 'Apply the DHM lens from Exercise 5.4 to verify the strategy passes the differentiation bar.', tip: "If it doesn't pass DHM, is it actually the right initiative?" },
          { number: 4, title: 'Pressure-test with LLM-as-judge', description: 'Use your Exercise 4.2 judge prompt — with a senior PM or board member evaluator — to score the final document.', tip: 'Accept a score below 4 on any criterion as a revision trigger.' },
          { number: 5, title: 'Submit', description: 'Paste the final document. It should be indistinguishable from something produced by a senior PM with deep context.', tip: "If you wouldn't submit this in a real planning cycle, keep refining." },
        ],
      },
      task: {
        instructions:
          "Submit your complete OKR package. The AI Coach will evaluate it against the full PM quality bar: objective quality, KR specificity, evidence behind the problem statement, testable hypotheses, and honest risk identification.\n\nAlso include your Four Risks and DHM summary so the Coach can see your reasoning.",
        fields: [
          {
            id: 'final_okr',
            label: 'Your complete Beyond one-pager (all 9 sections):',
            placeholder: "1. PROJECT OVERVIEW\nProject Name: \nBusiness Sponsor: \nProject Owner: \n\n2. QUICK DESCRIPTION\n\n3. BUSINESS HYPOTHESIS / GOALS\n\n4. ENGINEERING EFFORT\n\n5. MVP DEFINITION\n\n6. NOT IN SCOPE\n\n7. KEY DEPENDENCIES\n\n8. EXPECTED IMPACT\n\n9. RISKS & OPEN QUESTIONS",
            rows: 20,
            required: true,
          },
          {
            id: 'four_risks_summary',
            label: 'Your Four Risks assessment (brief summary from Exercise 4.6 or fresh):',
            placeholder: "Value risk: [High/Med/Low — why]\nUsability risk: ...\nFeasibility risk: ...\nViability risk: ...",
            rows: 5,
            required: true,
          },
          {
            id: 'dhm_summary',
            label: 'Your DHM check (brief):',
            placeholder: "Delight: [passes/fails — why]\nHard to copy: ...\nMargin-enhancing: ...",
            rows: 4,
            required: true,
          },
          {
            id: 'judge_score',
            label: 'Your LLM-as-judge score and top 2 improvements made from the verdict:',
            placeholder: "Overall score: [X/5]\nTop improvement 1: [What you changed based on judge feedback]\nTop improvement 2: ...",
            rows: 4,
            required: true,
          },
        ],
      },
      coachContext:
        "This is the Level 5 PM capstone. Evaluate with a senior PM's eye. Check all sections: (1) Objective — measurable outcome, customer-centric language, no feature terms? (2) KRs — specific numbers, achievable in one quarter, business-connected? (3) Problem statement — evidence-backed with specific data? (4) Hypotheses — testable, with mechanisms? (5) Risks — specific to this initiative? Also evaluate the Four Risks and DHM summaries: are they thoughtful or perfunctory? A perfunctory 'all risks are low' or 'passes DHM on all three' is a red flag. Finally: would this document genuinely inform a planning decision, or is it doing the minimum to satisfy the format?",
      evaluationCriteria: [
        'All OKR sections meet the quality bar (see 5P.1 criteria)',
        'Four Risks assessment is honest and specific',
        'DHM check shows genuine analysis (not all passing)',
        'LLM-as-judge was used and improvements documented',
        'Document would genuinely inform a planning decision',
      ],
    },

    // ── Exercise 5.1 (Design Track) ───────────────────────────────────────────
    {
      id: '5D.1',
      title: 'The Design Critic',
      track: 'design',
      duration: '25 min',
      type: 'framework',
      skill: "Using Nielsen's heuristics as a structured lens for AI-powered design critique",
      intro:
        "Getting useful design feedback from Claude requires the same thing as getting useful design feedback from a colleague: specificity about what you're evaluating and what the quality bar is.\n\nNielsen's 10 Usability Heuristics are the gold standard for UX critique. Used as explicit evaluation criteria in a Claude prompt, they transform 'what do you think of this design?' into a structured, actionable review.",
      learningObjective:
        "You'll write a structured UX critique prompt using Nielsen's heuristics, run it on a current design, and get feedback specific enough to act on.",
      content: {
        type: 'framework',
        framework: {
          name: "Nielsen's 10 Usability Heuristics",
          description:
            "The standard evaluation framework for UX critique. Use 3-4 most relevant to your design challenge as evaluation criteria.",
          elements: [
            { letter: '1', name: 'System Status Visibility', description: 'Does the user always know what\'s happening?', example: 'Are loading states, error states, and success states clearly communicated?', color: '#3bc1cc' },
            { letter: '2', name: 'Match with Mental Models', description: 'Does it work how users expect the world to work?', example: 'Are metaphors and concepts consistent with what users already understand?', color: '#02556c' },
            { letter: '3', name: 'User Control & Freedom', description: 'Can users easily undo or exit?', example: 'Are there clear escape routes when users take wrong actions?', color: '#ee3968' },
            { letter: '4', name: 'Consistency & Standards', description: 'Do things look and work the same throughout?', example: 'Are conventions consistent with platform standards and internal patterns?', color: '#3bc1cc' },
            { letter: '5', name: 'Error Prevention', description: 'Does the design prevent errors before they happen?', example: 'Are dangerous actions confirmed? Are likely mistakes anticipated?', color: '#02556c' },
            { letter: '6', name: 'Recognition Over Recall', description: 'Are options visible, not memorized?', example: 'Do users need to remember information from one step to apply at another?', color: '#ee3968' },
            { letter: '7', name: 'Flexibility & Efficiency', description: 'Does it work for both novices and experts?', example: 'Are there shortcuts or accelerators for power users?', color: '#3bc1cc' },
            { letter: '8', name: 'Aesthetic & Minimal Design', description: 'Does every element serve a purpose?', example: 'Is irrelevant or rarely-used information suppressed?', color: '#02556c' },
            { letter: '9', name: 'Error Recovery', description: 'Are error messages helpful and constructive?', example: 'Do errors tell users exactly what went wrong and how to fix it?', color: '#ee3968' },
            { letter: '10', name: 'Help & Documentation', description: 'Can users get help when needed without leaving the flow?', example: 'Is documentation available at the point of need?', color: '#3bc1cc' },
          ],
        },
      },
      task: {
        instructions:
          "Pick a current design flow you're working on — a new feature, a revised onboarding, a settings page, a critical user journey. Describe it to Claude in enough detail for it to evaluate it (screenshots described, or the copy/flow steps written out).\n\nWrite a CRIT prompt using 3-4 heuristics most relevant to your design challenge. Run it and use the feedback.",
        fields: [
          {
            id: 'design_description',
            label: 'Describe the design flow you\'re critiquing:',
            placeholder:
              "Describe the flow step-by-step, including the key UI elements, copy, and the user\'s goal. Be specific enough that Claude can evaluate it without seeing a screenshot.",
            rows: 8,
            required: true,
          },
          {
            id: 'critique_prompt',
            label: 'Your CRIT-structured critique prompt (using Nielsen\'s heuristics as criteria):',
            placeholder:
              "C: [Context — what this design is, who the user is, where in the flow]\nR: [Role — e.g., 'experienced UX designer who specializes in B2B SaaS onboarding']\nI: [Instructions — which 3-4 heuristics to evaluate and what to look for]\nT: [Tone — how direct you want the feedback]",
            rows: 8,
            required: true,
          },
          {
            id: 'feedback_received',
            label: "Claude's critique — the 3 most actionable findings:",
            placeholder:
              "Finding 1: [Heuristic violated] — [Specific issue] — [Recommended fix]\nFinding 2: ...\nFinding 3: ...",
            rows: 6,
            required: true,
          },
          {
            id: 'design_decision',
            label: 'Which finding will you act on first, and why?',
            placeholder: 'Which issue has the highest user impact? What specifically will you change?',
            rows: 3,
            required: true,
          },
        ],
      },
      coachContext:
        "Evaluate the design critique exercise. Check: (1) Is the design description specific enough for meaningful critique — can you understand the flow, the user's goal, and the key design decisions? If it's vague, the critique will be generic. (2) Does the CRIT prompt correctly apply the heuristics as evaluation criteria (not just mention them)? (3) Are the critique findings specific — do they name actual UI elements or copy choices, not generic 'the design could be clearer'? (4) Is the design decision specific — does it name what exactly will change in the design?",
      evaluationCriteria: [
        'Design description is specific enough for meaningful evaluation',
        'CRIT prompt correctly uses heuristics as evaluation criteria',
        'Critique findings name specific design elements (not generic)',
        'Design decision is specific about what will change',
      ],
    },

    // ── Exercise 5.2 (Design Track) ───────────────────────────────────────────
    {
      id: '5D.2',
      title: 'Journey Mapping',
      track: 'design',
      duration: '25 min',
      type: 'framework',
      skill: 'Using AI to generate and validate user journey maps with friction point analysis',
      intro:
        "User journey maps are powerful when they represent reality, and useless when they represent what we wish reality was. AI helps you generate a detailed journey quickly — but the real skill is using prompts that force Claude to surface the friction points you'd rather not see.\n\nThe journey map is only as valuable as its ability to make the team uncomfortable about things they've been ignoring.",
      learningObjective:
        "You'll generate a realistic journey map for a specific persona and flow, then use adversarial prompts to surface the friction points with highest design impact.",
      content: {
        type: 'patterns',
        patterns: [
          {
            name: 'The Journey Generation Prompt',
            prompt: "Map the complete journey of [specific persona] trying to [specific goal] using [product/feature]. For each stage: (1) what they're doing, (2) what they're thinking, (3) what they're feeling, (4) where they might get stuck or give up. Be realistic — don't show the journey we wish they had.",
            when: 'The starting point — generates the full journey',
          },
          {
            name: 'The Friction Surface Prompt',
            prompt: "Looking at the journey above: identify the top 3 friction points where users are most likely to fail, give up, or do the wrong thing. For each: (a) what's the underlying cause (knowledge gap? motivation drop? UX confusion?), (b) what does failure here cost the user and the business, (c) what's the minimal design intervention that would reduce friction?",
            when: "After generating the journey — surface what's actually hard",
          },
          {
            name: 'The Persona Mismatch Prompt',
            prompt: "This journey assumes [specific assumption about the user]. What would the journey look like if we're wrong — if the user is more [novice/expert/skeptical/rushed/technical] than we assumed? What changes?",
            when: "Tests whether your journey is persona-specific or just generic",
          },
          {
            name: 'The Moment of Truth Prompt',
            prompt: "In this journey, what is the single most critical moment — the point where we either earn the user's trust and continuation, or lose them permanently? What design decisions at that moment matter most?",
            when: "Focuses team on the highest-stakes interaction",
          },
        ],
      },
      task: {
        instructions:
          "Generate a journey map for a specific persona doing a specific task in Beyond's product. The best candidates: host onboarding, a host's first pricing review, or the moment a host considers manual override.\n\nRun the journey generation, friction surface, and moment of truth prompts. Then identify your top 3 friction points and rank them by design impact.",
        fields: [
          {
            id: 'persona_and_goal',
            label: 'The persona and goal you\'re mapping (be specific):',
            placeholder:
              "Persona: [e.g., 'First-time STR host, 1 property, manages it part-time, not tech-savvy']\nGoal: [e.g., 'Complete Beyond pricing setup and see their first recommendation']",
            rows: 3,
            required: true,
          },
          {
            id: 'journey_map',
            label: 'Your generated journey map (stages, actions, thoughts, feelings, friction):',
            placeholder:
              "Stage 1: [Name]\n• Doing: ...\n• Thinking: ...\n• Feeling: ...\n• Potential friction: ...\n\nStage 2: ...",
            rows: 14,
            required: true,
          },
          {
            id: 'top_3_friction',
            label: 'Top 3 friction points ranked by design impact:',
            placeholder:
              "#1 (Highest impact): [What happens] — [Root cause] — [Design opportunity]\n#2: ...\n#3: ...",
            rows: 6,
            required: true,
          },
          {
            id: 'moment_of_truth',
            label: 'The moment of truth — what is it and what design decision matters most there?',
            placeholder:
              "The critical moment: [what happens here]\nWhy it matters: [trust/retention/conversion impact]\nKey design decision: [what makes or breaks this moment]",
            rows: 4,
            required: true,
          },
        ],
      },
      coachContext:
        "Evaluate the journey mapping exercise. Check: (1) Is the persona specific enough to generate a meaningfully different journey than a generic user? 'A host' is not specific enough; 'First-time STR host with 1 property, non-technical, managing part-time' is. (2) Does the journey map show realistic friction (emotional lows, confusion points, potential abandonment) — not an idealized version of the flow? (3) Are the top 3 friction points ranked with a genuine reasoning about design impact — not just listed? (4) Is the moment of truth actually critical — is it the make-or-break moment, or just an important moment among many?",
      evaluationCriteria: [
        'Persona is specific (not just "a host")',
        'Journey map shows realistic friction (not idealized)',
        'Friction points are ranked with design impact reasoning',
        'Moment of truth is genuinely critical to retention/conversion',
      ],
    },

    // ── Exercise 5.3 (Design Track) ───────────────────────────────────────────
    {
      id: '5D.3',
      title: 'Behavioral Design Lab',
      track: 'design',
      duration: '20 min',
      type: 'framework',
      skill: 'Applying behavioral design principles via prompting to improve user decision-making in the product',
      intro:
        "Behavioral design is the application of cognitive psychology to interface decisions. The goal: make it easier for users to do what's good for them and harder to do what's harmful to them.\n\nFor Beyond, this means making it easier for hosts to trust the algorithm, follow through on setup, and stick to dynamic pricing rather than manual overrides. Every friction point in the journey is a behavioral design opportunity.",
      learningObjective:
        "You'll apply behavioral design principles to a specific challenge in Beyond's product and generate concrete design recommendations.",
      content: {
        type: 'framework',
        framework: {
          name: 'Behavioral Design Principles',
          description: 'Six principles with direct application to STR platform design.',
          elements: [
            {
              letter: 'D',
              name: 'Defaults',
              description: 'The most powerful principle: people stick with whatever is pre-selected',
              example: "Prompt: 'How should we set default pricing rules for new hosts — what default makes it most likely they achieve BtM without overriding?'",
              color: '#ee3968',
            },
            {
              letter: 'L',
              name: 'Loss Aversion',
              description: 'Losses feel ~2x more painful than equivalent gains feel good',
              example: "Prompt: 'Reframe our algorithm recommendation UI using loss aversion — show hosts what they risk losing by overriding vs. what they gain by following the recommendation.'",
              color: '#3bc1cc',
            },
            {
              letter: 'P',
              name: 'Progressive Disclosure',
              description: 'Show only what\'s needed for the current decision; reveal complexity as needed',
              example: "Prompt: 'Redesign our pricing rules interface using progressive disclosure — what\'s shown by default, what\'s one level deeper, what\'s advanced-only?'",
              color: '#02556c',
            },
            {
              letter: 'Z',
              name: 'Zeigarnik Effect',
              description: 'Incomplete tasks create psychological tension that motivates completion',
              example: "Prompt: 'How can we use the Zeigarnik effect in our onboarding checklist to increase completion rates? What visual and copy changes create the right tension?'",
              color: '#252f38',
            },
            {
              letter: 'S',
              name: 'Social Proof',
              description: 'People follow what others like them do',
              example: "Prompt: 'Design social proof elements for the pricing recommendation UI — what data about similar hosts\'s behavior would most increase trust in the algorithm?'",
              color: '#ee3968',
            },
            {
              letter: 'R',
              name: 'Reduction of Choice',
              description: 'Fewer options increase satisfaction and reduce paralysis',
              example: "Prompt: 'Our pricing rules setup has 12 configuration options. Using the paradox of choice principle, which 3 should be the only options shown to new hosts?'",
              color: '#3bc1cc',
            },
          ],
        },
      },
      task: {
        instructions:
          "Pick a specific design challenge in Beyond's product where user behavior doesn't match what's good for them. Examples: hosts overriding algorithm recommendations, hosts abandoning onboarding, hosts not enabling automatic pricing.\n\nApply 3 behavioral principles to generate specific design recommendations. Each recommendation should be concrete enough to put in a design brief.",
        fields: [
          {
            id: 'behavioral_challenge',
            label: 'The behavioral challenge — what are users doing that hurts them or the business?',
            placeholder:
              "Specific user behavior + why it's problematic + current design context...",
            rows: 3,
            required: true,
          },
          {
            id: 'principle_1',
            label: 'Behavioral Principle 1 applied — principle, prompt used, design recommendation:',
            placeholder:
              "Principle: [Which one]\nPrompt: [What you asked Claude]\nDesign recommendation: [Specific, actionable UI/copy change]",
            rows: 5,
            required: true,
          },
          {
            id: 'principle_2',
            label: 'Behavioral Principle 2 applied:',
            placeholder: "Principle: ...\nPrompt: ...\nDesign recommendation: ...",
            rows: 5,
            required: true,
          },
          {
            id: 'principle_3',
            label: 'Behavioral Principle 3 applied:',
            placeholder: "Principle: ...\nPrompt: ...\nDesign recommendation: ...",
            rows: 5,
            required: true,
          },
          {
            id: 'highest_impact',
            label: 'Which recommendation would have the highest behavioral impact, and why?',
            placeholder: 'Rank your 3 recommendations and explain your reasoning...',
            rows: 3,
            required: true,
          },
        ],
      },
      coachContext:
        "Evaluate the behavioral design exercise. Check: (1) Is the behavioral challenge specific — does it name a real behavior, not just 'users struggle with onboarding'? (2) Are the three principles applied correctly — does the prompt match the principle's actual mechanism? (3) Are the design recommendations specific enough to put in a design brief — 'make it clearer' fails; 'change the algorithm recommendation card to show potential revenue lost by overriding' passes. (4) Is the highest-impact selection justified with reasoning about the behavioral mechanism, not just preference?",
      evaluationCriteria: [
        'Behavioral challenge names a specific problematic user behavior',
        'Three principles are correctly applied (prompts match mechanism)',
        'Design recommendations are brief-ready specific (not generic)',
        'Highest-impact selection is justified with behavioral reasoning',
      ],
    },

    // ── Exercise 5.4 (Design Track) ───────────────────────────────────────────
    {
      id: '5D.4',
      title: 'The Accessibility Audit',
      track: 'design',
      duration: '20 min',
      type: 'reflection',
      skill: 'Using AI to audit designs for accessibility issues and generate WCAG-compliant improvements',
      intro:
        "Accessibility is often the thing design teams know matters and don't have enough bandwidth to address properly. AI dramatically lowers the cost of a first-pass accessibility audit — not as a replacement for real accessibility testing with users, but as a way to catch the obvious issues before they reach production.\n\nThe skill is describing your design precisely enough that Claude can identify real accessibility concerns, not just generic advice.",
      learningObjective:
        "You'll run an AI accessibility audit on a current design flow and generate specific WCAG-compliant improvement recommendations.",
      content: {
        type: 'patterns',
        patterns: [
          {
            name: 'The Comprehensive Audit Prompt',
            prompt: "Audit this design flow for accessibility issues using WCAG 2.1 AA standards. Check specifically: (1) color contrast ratios for all text on backgrounds — flag anything below 4.5:1 for normal text or 3:1 for large text, (2) interactive element sizing — flag anything below 44×44px touch target, (3) keyboard navigation path — can a keyboard-only user complete this flow, (4) screen reader experience — are all interactive elements properly labeled, (5) motion/animation — is there a way to reduce motion? Design description: [your description]",
            when: 'Comprehensive first-pass audit',
          },
          {
            name: 'The Color Contrast Checker',
            prompt: "For this design: [describe colors used, e.g., '#3bc1cc text on white background', '#ee3968 on dark background']. Calculate the approximate contrast ratios and flag any combinations that would fail WCAG AA standards for normal text, large text, or UI components.",
            when: 'Quick color check before handoff',
          },
          {
            name: 'The Screen Reader Simulation',
            prompt: "Simulate the screen reader experience for a blind user navigating this flow. What would they hear, in what order, and where would they likely get confused or stuck? Write the screen reader output as if narrating the page.",
            when: "Most revealing — shows what's invisible to sighted designers",
          },
          {
            name: 'The Fix Generator',
            prompt: "For each accessibility issue you identified: give me the specific code change, copy change, or design specification needed to fix it. Be precise enough that a developer could implement the fix without a follow-up question.",
            when: 'Converting findings to actionable specs',
          },
        ],
      },
      task: {
        instructions:
          "Run an AI accessibility audit on a real design you're working on. Describe the design in enough detail for meaningful evaluation (colors, interactive elements, flow structure, copy).\n\nRun at least 2 of the audit prompts and generate specific fixes for the top 3 issues found.",
        fields: [
          {
            id: 'design_to_audit',
            label: 'The design you\'re auditing (describe in accessible-audit-ready detail):',
            placeholder:
              "Include: colors with hex codes, text sizes, interactive elements, the flow sequence, and any motion/animation. E.g., 'Primary button: #3bc1cc background, white #ffffff text, 14px regular weight...'",
            rows: 8,
            required: true,
          },
          {
            id: 'audit_results',
            label: "Accessibility issues found (from 2+ audit prompts):",
            placeholder:
              "Issue 1: [WCAG criterion] — [Specific problem] — [Where in the design]\nIssue 2: ...\nIssue 3: ...\n[List all issues found]",
            rows: 8,
            required: true,
          },
          {
            id: 'top_3_fixes',
            label: 'Specific fixes for the top 3 issues (developer-ready specs):',
            placeholder:
              "Fix 1: [Issue] → [Specific change: color value, size, ARIA label, etc.]\nFix 2: ...\nFix 3: ...",
            rows: 6,
            required: true,
          },
          {
            id: 'priority_issue',
            label: 'Which accessibility issue would have the biggest impact on the largest number of users, and why?',
            placeholder:
              'Consider: frequency of impact, severity of barrier, user population affected...',
            rows: 3,
            required: true,
          },
        ],
      },
      coachContext:
        "Evaluate the accessibility audit. Check: (1) Is the design description specific enough for real evaluation — does it include colors with hex codes, text sizes, element descriptions? Generic descriptions get generic audits. (2) Are the issues found specific WCAG violations — do they name the criterion and the specific design element? 'The colors might be hard to read' fails; 'Primary button #3bc1cc on white fails WCAG AA at 2.8:1 contrast ratio (needs 4.5:1)' passes. (3) Are the fixes developer-ready — could a developer implement them without follow-up questions? (4) Is the priority issue reasoning substantive — does it reference user population size or severity of barrier?",
      evaluationCriteria: [
        'Design description includes specific details (colors, sizes)',
        'Issues name specific WCAG criteria and design elements',
        'Fixes are developer-ready specifications',
        'Priority reasoning is substantive',
      ],
    },

    // ── Exercise 5.5 (Design Track) ───────────────────────────────────────────
    {
      id: '5D.5',
      title: 'Design System Documenter',
      track: 'design',
      duration: '20 min',
      type: 'framework',
      skill: 'Using AI to generate design system documentation from component descriptions',
      intro:
        "Design system documentation is the thing every design team knows they need and never has time to do properly. It exists in Figma comments, in someone's head, and in pull request reviews — but rarely in a form that a new designer or developer can actually use.\n\nAI can dramatically reduce the cost of creating good documentation, if you know how to describe components precisely enough. This exercise teaches you to write descriptions that produce useful documentation.",
      learningObjective:
        "You'll generate design system documentation for 2-3 components by writing precise component descriptions and using AI to structure them into usable docs.",
      content: {
        type: 'patterns',
        patterns: [
          {
            name: 'The Component Documentation Prompt',
            prompt: "Document this UI component for our design system. Component: [name]. Description: [how it works, what it does, what it looks like]. Use this structure: (1) Purpose (what problem it solves), (2) Anatomy (the visual parts), (3) Variants (states and configurations), (4) Usage guidelines (when to use, when NOT to use), (5) Accessibility requirements, (6) Copy guidelines (if it contains text).",
            when: 'For individual component documentation',
          },
          {
            name: 'The Pattern Documentation Prompt',
            prompt: "Document this UX pattern for our design system. Pattern: [name]. Context: [when this pattern appears, what user need it addresses]. Structure as: (1) Problem this pattern solves, (2) How it works, (3) Examples of correct use, (4) Anti-patterns (incorrect use cases), (5) Relationship to other patterns.",
            when: 'For interaction pattern documentation',
          },
          {
            name: 'The Critique-and-Improve Prompt',
            prompt: "Here's our current documentation for [component]: [paste existing docs]. Evaluate it: (1) What would a new designer misunderstand based on this doc? (2) What's missing that would cause implementation errors? (3) Rewrite the weakest section to be more precise and usable.",
            when: 'For improving existing documentation',
          },
        ],
      },
      task: {
        instructions:
          "Choose 2-3 components or patterns from Beyond's product that lack good documentation. Write precise component descriptions and generate documentation for each.\n\nThe test: could a developer implement this component correctly from the documentation alone, without asking a designer?",
        fields: [
          {
            id: 'components_chosen',
            label: 'The 2-3 components or patterns you\'re documenting and why they need better docs:',
            placeholder:
              "Component 1: [name] — Current documentation gap: [what\'s missing or unclear]\nComponent 2: ...",
            rows: 4,
            required: true,
          },
          {
            id: 'documentation',
            label: 'Your generated design system documentation (for all 2-3 components):',
            placeholder:
              "=== COMPONENT 1: [Name] ===\nPurpose: ...\nAnatomy: ...\nVariants: ...\nUsage guidelines: ...\nAccessibility: ...\n\n=== COMPONENT 2: [Name] ===\n[etc.]",
            rows: 18,
            required: true,
          },
          {
            id: 'dev_test',
            label: 'Developer implementation test: what\'s the hardest thing to implement correctly from this doc alone?',
            placeholder:
              "What would a developer most likely get wrong, even with this documentation? What would you add to prevent it?",
            rows: 4,
            required: true,
          },
        ],
      },
      coachContext:
        "Evaluate the design system documentation. Check: (1) Are the component descriptions precise enough for real documentation — do they name specific visual properties, behaviors, and states? (2) Does the documentation follow the structured format (Purpose, Anatomy, Variants, Usage, Accessibility, Copy)? (3) Does it include 'when NOT to use' — this is often the most valuable section and usually missing? (4) Is the developer implementation test genuine — does it identify a real edge case, not just 'they might misunderstand something'?",
      evaluationCriteria: [
        'Component descriptions are specific (visual properties, behaviors, states)',
        'Documentation follows the structured format',
        'Includes "when NOT to use" for each component',
        'Developer test identifies a real implementation edge case',
      ],
    },

    // ── Exercise 5.6 (Design Track Capstone) ─────────────────────────────────
    {
      id: '5D.6',
      title: 'Capstone: The Design Spec',
      track: 'design',
      duration: '35 min',
      type: 'capstone',
      skill: 'Delivering a complete, AI-refined design spec for a real current project',
      intro:
        "This capstone is the design equivalent of the PM one-pager: a complete, polished design spec for a real current project that you'd be proud to share in a design review or hand off to engineering.",
      learningObjective:
        "Deliver a complete design spec incorporating AI-generated critique, behavioral design principles, and accessibility requirements.",
      content: {
        type: 'walkthrough',
        steps: [
          { number: 1, title: 'Choose a real design challenge', description: 'Pick something current — a feature redesign, a new flow, a component overhaul. It should be complex enough that the spec has real substance.', tip: 'The best specs are for something that\'s been talked about but not fully designed yet.' },
          { number: 2, title: 'Generate the journey and friction analysis', description: 'Use Exercise 5D.2 techniques to map the user journey and identify the top friction points the design must address.', tip: 'Your design decisions should directly connect to the friction points you identified.' },
          { number: 3, title: 'Apply behavioral design', description: 'Use Exercise 5D.3 techniques to embed behavioral design principles into your key design decisions.', tip: 'Name which principle each design decision applies — this makes your reasoning transparent.' },
          { number: 4, title: 'Run the accessibility audit', description: 'Use Exercise 5D.4 techniques to audit your design before finalizing. Fix issues before submission.', tip: 'Including accessibility specs in the design brief saves engineering rework.' },
          { number: 5, title: 'Get AI critique using Nielsen\'s heuristics', description: 'Run the CRIT-structured critique from 5D.1 on the full spec. Revise based on the top findings.', tip: 'Aim for at least 2 rounds of critique and revision.' },
        ],
      },
      task: {
        instructions:
          "Submit your complete design spec. Include: the design challenge, friction analysis, design decisions with behavioral design rationale, accessibility requirements, and the Nielsen\'s heuristics critique and revision log.\n\nThe AI Coach will evaluate against the full design quality bar.",
        fields: [
          {
            id: 'design_challenge',
            label: 'The design challenge (what you\'re designing and why):',
            placeholder: 'What problem does this design solve? Who is the user? What are the constraints?',
            rows: 4,
            required: true,
          },
          {
            id: 'friction_analysis',
            label: 'Top 3 friction points this design must address (from your journey analysis):',
            placeholder: "#1: [Friction point] — [How the design addresses it]\n#2: ...\n#3: ...",
            rows: 6,
            required: true,
          },
          {
            id: 'design_decisions',
            label: 'Key design decisions with behavioral design rationale:',
            placeholder:
              "Decision 1: [What you designed]\nBehavioral principle applied: [Which one]\nRationale: [Why this principle matters here]\n\nDecision 2: ...",
            rows: 10,
            required: true,
          },
          {
            id: 'accessibility_specs',
            label: 'Accessibility requirements incorporated into the spec:',
            placeholder: "Color contrast ratios, touch target sizes, keyboard navigation, ARIA labels, motion guidelines...",
            rows: 4,
            required: true,
          },
          {
            id: 'critique_log',
            label: "Nielsen's heuristics critique summary + what you revised:",
            placeholder: "Top finding: [Issue] → [What you changed]\nSecond finding: ...",
            rows: 4,
            required: true,
          },
        ],
      },
      coachContext:
        "This is the Level 5 Design capstone. Evaluate as a design lead would in a design review. Check: (1) Does the design challenge clearly define the problem space (user, goal, constraints)? (2) Are the friction points specific and directly addressed by the design decisions? (3) Do the behavioral design decisions name specific principles with clear mechanisms — not just 'we used progressive disclosure' but 'we use progressive disclosure because hosts are overwhelmed by the 12 configuration options, so we show only 3 until they opt in to advanced settings'? (4) Are accessibility specs specific (actual contrast ratios, actual pixel sizes)? (5) Does the critique log show genuine revision based on feedback — not just acknowledging the feedback?",
      evaluationCriteria: [
        'Design challenge clearly defines problem, user, and constraints',
        'Friction points are specific and directly addressed by design decisions',
        'Behavioral design decisions name specific principles with mechanisms',
        'Accessibility specs include actual measurements',
        'Critique log shows genuine revision (not just acknowledgment)',
      ],
    },
  ],

  assessment: {
    title: 'Level 5 Assessment',
    questions: [
      {
        id: 'q5_1',
        text: "In an Opportunity Solution Tree, which of the following is an 'opportunity' (not a solution)?",
        options: [
          "A) 'Add a guided setup wizard to onboarding'",
          "B) 'Hosts find the pricing rules setup too technical to complete'",
          "C) 'Increase onboarding completion rate to 70%'",
          "D) 'Reduce the number of required steps from 6 to 3'",
        ],
        correct: 'B',
        explanation:
          "Opportunities are customer problems, needs, or pain points. Solutions (A, D) and outcomes (C) are different nodes in the tree. 'Hosts find setup too technical' is the customer problem the solutions should address.",
      },
      {
        id: 'q5_2',
        text: "What is the most important quality check for a behavioral design decision?",
        options: [
          'A) It looks good in the design review',
          'B) It is technically feasible',
          'C) It uses a behavioral principle whose mechanism directly addresses the specific user behavior you want to change',
          'D) It was validated in user research',
        ],
        correct: 'C',
        explanation:
          "Behavioral design works when the principle's mechanism matches the problem. 'Adding social proof' only works if the user's barrier is uncertainty about whether others succeed — if the barrier is something else, the principle doesn't apply.",
      },
      {
        id: 'q5_3',
        text: "What makes a PM hypothesis 'testable' vs. just an assertion?",
        options: [
          'A) It uses data to support it',
          'B) It names a specific mechanism (X will move Y because Z) and defines what confirmation and disconfirmation look like',
          'C) The team agrees with it',
          'D) It is written in COSTAR format',
        ],
        correct: 'B',
        explanation:
          "A testable hypothesis names the mechanism (what causes the effect) and defines success and failure conditions. 'Better onboarding will improve activation' is an assertion. 'Simplifying step 4 will increase activation by >30% because step 4 has a 71% drop-off rate, suggesting it\'s the critical barrier' is testable.",
      },
    ],
    selfReflection: {
      id: 'sr5',
      question:
        "Which technique from Level 5 changed how you think about your craft as a PM or Designer? How will you use it on your next real project?",
      placeholder:
        "Be specific: name the technique, the next project you'll apply it to, and what it will change about your approach.",
    },
  },

  milestone: {
    title: 'Property Manager Status!',
    emoji: '🏢',
    message:
      "Your PM and Design craft just got a serious AI upgrade. You're writing OKRs that survive adversarial critique, running behavioral design labs, doing opportunity mapping, and shipping specs that include the reasoning behind every decision. This is what empowered product work looks like.",
    gerardJokeId: 'beyond_4',
    nextLevelTeaser:
      "Level 6 is the destination — BMAD method, Claude Code, agentic workflows, and your personal AI Operating System. This is where everything comes together.",
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
