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

  // ──────────────────────────────────────────────────────────
  // EXERCISE 1.1 - Search Query vs. Thought Partner
  // ──────────────────────────────────────────────────────────
  {
    id: '1.1',
    title: 'Search Query vs. Thought Partner',
    subtitle: "Stop Googling your AI",
    duration: '20 min',
    description: `Most people use Claude the same way they use Google - type a question, get an answer, move on. That's leaving 90% of the value on the table. The shift from "search query" to "thought partner" is the single biggest unlock in your AI journey.

A search query asks for information. A thought partner prompt invites analysis, challenges assumptions, and produces thinking you couldn't have done alone (or would have taken you 3x as long).

The difference isn't about writing longer prompts. It's about framing your request so Claude has enough context to actually think with you, not just retrieve for you.`,

    comparison: {
      bad: {
        label: 'Search query',
        prompt: `What is Beat the Market?`
      },
      good: {
        label: 'Thought partner',
        prompt: `I'm a PM at Beyond, a dynamic pricing platform for short-term rentals. Our key performance metric is "Beat the Market" (BtM) - we measure whether a customer's RevPAN (revenue per available night) exceeds their competitive set by 20% or more.

Right now about 50% of listings hit that threshold. Our target is 75%.

I need to think through why the other 50% aren't hitting BtM. Some possible factors: hosts overriding our recommended prices, poor comp set matching, listings in low-demand markets, or hosts who enabled pricing but aren't actually following through on operational basics (photos, response time, etc).

Help me build a structured framework for diagnosing why a listing doesn't beat the market, organized by factors Beyond can influence vs. factors we can't.`
      },
      explanation: `The search query gets you a definition - something you could find on the company wiki. The thought partner prompt gives Claude your role, the specific metric, the current gap, your initial hypotheses, and a clear analytical task. The output will be a diagnostic framework you can actually use in your next product review. Notice how the good prompt doesn't just ask "why" - it shares initial thinking and asks Claude to build on it.`
    },

    task: {
      instruction: `Take the search-query style prompt below and rewrite it as a thought-partner prompt. Add your role context, the specific problem you're solving, any initial thinking you have, and what kind of output would actually be useful to you.

Don't just make it longer - make it invite real analysis.`,
      prompts: {
        pm_ic: `Your search query to transform: "How does host onboarding work at Beyond?"

Think about what you'd actually need to know - maybe you're investigating why only 5% of the 6,000 monthly signups convert to active customers, or you're trying to identify where in the first-48-hours experience hosts drop off. What specific angle would make Claude's response useful for your actual work this week?`,

        pm_director: `Your search query to transform: "What's our competitive positioning vs PriceLabs?"

Think about what you'd actually need - maybe you're preparing for a board discussion about the 3-5x price premium, or you're evaluating whether your Q2 product roadmap sufficiently differentiates from PriceLabs' recent feature releases. What strategic question would make Claude's response worth sharing with your leadership team?`,

        design_ic: `Your search query to transform: "What are best practices for pricing dashboards?"

Think about what you'd actually need - maybe you're redesigning the main pricing view and struggling with how to show recommended vs. actual prices for hosts who override frequently, or you're trying to reduce cognitive load in a view that currently has 12 different data points. What specific design challenge would make Claude's response useful for your next Figma session?`,

        design_lead: `Your search query to transform: "How should we approach design systems for B2B SaaS?"

Think about what you'd actually need - maybe you're evaluating whether Beyond's current component library scales to support both the host self-serve experience and the enterprise portfolio manager view, or you're building a case for dedicated design system investment in next quarter's OKRs. What strategic design question would make Claude's response worth presenting at your next design review?`
      }
    },

    coachContext: {
      evaluationCriteria: [
        'Did they add specific role and company context (not just "I am a PM")?',
        'Did they include a concrete problem or decision they are facing?',
        'Did they share initial hypotheses or thinking (not just ask for answers)?',
        'Did they specify what kind of output would be useful (framework, analysis, options, critique)?',
        'Does the rewrite invite analysis rather than just information retrieval?'
      ],
      seniorityNote: `For Director-level roles, look for strategic framing (stakeholder context, cross-team implications, business impact). For IC roles, look for tactical specificity (specific feature area, specific user segment, specific metric).`,
      exampleFeedback: {
        strong: `This is a solid rewrite. You gave Claude your specific role context, the actual metric gap you're working on, and your initial hypotheses. The ask for a "diagnostic framework" is great because it gives Claude a clear output format. One thing that would make this even stronger: tell Claude what you plan to do with the output. "I'll use this framework in next Thursday's product review with engineering" helps Claude calibrate the right level of detail and technical depth.`,
        needsWork: `You've made it longer, but it's still mostly a search query in disguise. You're asking "explain X to me" rather than "help me think through Y." Try this: instead of asking Claude what something is, tell Claude what you already know and what you're stuck on. The magic happens when you share your partial thinking and ask Claude to build on it, challenge it, or structure it.`
      }
    }
  },

  // ──────────────────────────────────────────────────────────
  // EXERCISE 1.2 - The COSTAR Framework
  // ──────────────────────────────────────────────────────────
  {
    id: '1.2',
    title: 'The COSTAR Framework',
    subtitle: 'Structure that actually works',
    duration: '25 min',
    description: `COSTAR is a prompting framework that gives you a reliable structure for any complex prompt. It stands for Context, Objective, Style, Tone, Audience, and Response format. Think of it like a creative brief for your AI - the more clearly you define these six dimensions, the more precisely Claude can deliver.

You don't need all six for every prompt (some quick questions just need Context and Objective), but for anything you'd spend more than 10 minutes writing yourself, COSTAR pays for itself immediately.`,

    comparison: {
      bad: {
        label: 'Unstructured',
        prompt: `Write a summary of our new listing groups feature for the team.`
      },
      good: {
        label: 'COSTAR structured',
        prompt: `**Context:** Beyond is launching "Listing Groups v2" - a feature that lets property managers group listings by property type, location, or custom criteria and apply pricing strategies at the group level instead of listing-by-listing. This replaces the current approach where PMs with 200+ listings have to configure pricing individually.

**Objective:** Write an internal announcement summarizing what shipped, why it matters, and what we learned during the beta with 12 contracted customers.

**Style:** Concise and evidence-based, similar to how Shreyas Doshi writes product updates - lead with the outcome, not the feature description.

**Tone:** Confident but honest about what's still in progress. We're excited about early results but the beta sample is small.

**Audience:** Beyond's PDE (Product, Design, Engineering) org plus Go-to-Market team. They understand our product but may not know the details of this specific feature.

**Response format:** 3 paragraphs max. First paragraph: what shipped and the key metric from beta. Second: why this matters strategically (connect to our "revenue operating system" positioning). Third: what's next and open questions.`
      },
      explanation: `The unstructured prompt will get you something - but it'll be generic, probably too long, and you'll spend 15 minutes editing it. The COSTAR version takes 3 minutes to write and produces a near-final draft because Claude knows exactly who it's writing for, in what style, and how to structure it. Notice that the COSTAR prompt also embeds strategic context (the "revenue operating system" positioning) that shapes the entire framing.`
    },

    workedExamples: {
      pm: {
        label: 'PM Example',
        prompt: `**Context:** Beyond's host activation rate is 5% (target: 8-11%). We sign up ~6,000 hosts/month but most never enable pricing on their listings. The data team found that hosts who complete setup within 48 hours are 3x more likely to still be active at 90 days. I own the activation workstream on the Core App team.

**Objective:** Draft an experiment plan to test whether a guided "first 48 hours" experience (email + in-app nudges + a simplified setup wizard) improves activation rate.

**Style:** Structured like a Teresa Torres assumption test - start with the riskiest assumption, define the test, set success criteria.

**Tone:** Analytically honest - acknowledge what we know vs. what we're guessing.

**Audience:** My product trio (PM, designer, tech lead) plus our group PM who needs to approve the experiment scope.

**Response format:** One-page experiment brief with sections: Hypothesis, Riskiest Assumption, Test Design, Success Metric, Timeline, and "What we'll do with the results."`
      },
      design: {
        label: 'Design Example',
        prompt: `**Context:** Beyond's pricing calendar view is the most-visited screen in the app for hosts. It currently shows 30 days of nightly prices with color coding for high/low demand. Hosts with 3+ listings tell us they want to see all their listings at once, but the current view only shows one listing at a time. I'm the designer on the Core App team exploring a "multi-listing calendar" concept.

**Objective:** Help me think through 3 different approaches to showing multiple listings on a single calendar view, with trade-offs for each.

**Style:** Think like a design review at Airbnb or Figma - sketch-level concepts with clear rationale, not polished mockups.

**Tone:** Exploratory and critical - poke holes in each approach.

**Audience:** Me (I'll use this to frame concepts before going to Figma) and my PM partner who'll weigh in on feasibility.

**Response format:** For each of the 3 approaches: a 2-sentence description, a rough layout description, 2 pros, 2 cons, and "best for [user type]" recommendation.`
      }
    },

    task: {
      instruction: `Pick a real task you need to do this week (or one you recently completed). Write a COSTAR prompt for it. Try to fill in all six dimensions, even if some are brief. The goal is to practice the structure, not to write the perfect prompt.

After you write it, we'll have the AI Coach evaluate whether your COSTAR covers all six dimensions and whether each one is specific enough to actually change the output.`,
      prompts: {
        pm_ic: `Think about a real deliverable from your current sprint or workstream. Maybe it's a spec you need to write, a competitive analysis, an experiment you're designing, or a customer interview guide. Pick something where getting a strong first draft from Claude would save you meaningful time.

Write a COSTAR prompt for that deliverable. Be specific about audience - "the team" is too vague. Who will actually read this, and what do they need to walk away understanding?`,

        pm_director: `Think about a strategic artifact you need to produce - an OKR proposal, a roadmap narrative for stakeholders, a board memo section, or a prioritization framework for your teams. Pick something where the framing and audience calibration matter as much as the content.

Write a COSTAR prompt for it. Pay special attention to the Audience and Tone dimensions - at your level, the same content often needs to land differently with engineers vs. executives vs. the board.`,

        design_ic: `Think about a real design task on your plate - a UX critique you need to prepare, a flow you're mapping, a research synthesis, or component documentation. Pick something where you'd normally spend 30+ minutes before opening Figma or Miro.

Write a COSTAR prompt for it. For the Style dimension, think about what kind of design thinking you want - Nielsen heuristics, Jobs-to-Be-Done framing, behavioral design lens, or something else?`,

        design_lead: `Think about a design leadership deliverable - a design strategy document, a critique framework for your team, a design quality rubric, or a proposal for design system investment. Pick something where you're shaping how your team works, not just shipping a screen.

Write a COSTAR prompt for it. The Audience dimension is especially important here - are you writing for your design team, for product leadership, or for engineering partners? Each audience changes the framing significantly.`
      }
    },

    coachContext: {
      evaluationCriteria: [
        'Are all 6 COSTAR dimensions present (Context, Objective, Style, Tone, Audience, Response format)?',
        'Is the Context specific to Beyond and their actual work, not generic?',
        'Is the Objective clear enough that you could evaluate whether the output succeeded?',
        'Is the Audience a specific group of people, not "the team" or "stakeholders"?',
        'Is the Response format concrete (e.g., "3 paragraphs" or "a table with columns X, Y, Z"), not vague (e.g., "a summary")?',
        'Would this COSTAR actually produce a meaningfully different output than just asking the question without structure?'
      ],
      seniorityNote: `For Director-level roles, the Context should include strategic positioning and stakeholder dynamics, not just task details. The Audience dimension should show awareness of how the same message needs different framing for different groups. For IC roles, look for tactical specificity - a named feature area, a specific user segment, a concrete deadline or sprint goal.`,
      exampleFeedback: {
        strong: `Clean COSTAR structure. Your Context grounds Claude in the specific Beyond problem, your Objective is measurable (I could evaluate whether the output achieves it), and your Response format gives clear guardrails. The Style reference to Teresa Torres is smart - it tells Claude which analytical framework to use. One refinement: your Tone says "professional" which is generic. Try something more specific like "confident but honest about uncertainty" or "direct, no hedging, flag where data is thin."`,
        needsWork: `You've got the structure, but several dimensions are too vague to change the output. "Write something about our onboarding" could be Context for almost anything. Tell Claude the specific numbers (5% conversion rate), the specific hypothesis you're exploring, and the specific decisions this output needs to inform. Also, "the team" as your Audience is doing no work. Is this for your product trio? For the engineering team who'll build it? For your VP who needs to approve scope? Each of those audiences means a fundamentally different document.`
      }
    }
  },

  // ──────────────────────────────────────────────────────────
  // EXERCISE 1.3 - The CRIT Framework
  // ──────────────────────────────────────────────────────────
  {
    id: '1.3',
    title: 'The CRIT Framework',
    subtitle: 'Getting critique that actually bites',
    duration: '20 min',
    description: `CRIT stands for Context, Role, Instructions, and Tone. While COSTAR is great for generating content, CRIT is designed specifically for getting useful feedback and critique. The secret ingredient is the Role dimension - by telling Claude to adopt a specific expert perspective, you get critique that's genuinely useful rather than generic "looks good, maybe consider..." fluff.

The difference between "What do you think of this?" and a well-crafted CRIT prompt is the difference between a polite colleague nodding at your work and a sharp mentor who cares enough to tell you where it's weak.`,

    comparison: {
      pm: {
        without: {
          label: 'Without CRIT',
          prompt: `Here's my PRD for the Owner Reporting feature. What do you think?

[PRD content...]`,
          response: `This looks like a solid PRD. You've covered the key user stories and the technical requirements are clear. A few suggestions: you might want to add more detail on edge cases, consider the mobile experience, and think about localization...`
        },
        with: {
          label: 'With CRIT',
          prompt: `**Context:** I'm a PM at Beyond. This PRD is for "Owner Reporting" - a feature that lets property managers generate branded performance reports to send to property owners. Nearly half of PM churn traces back to PMs losing owners, so this is a retention play. The PRD will be reviewed by my group PM and our engineering lead on Thursday.

**Role:** Act as Marty Cagan reviewing this PRD. You believe teams should be given problems to solve, not features to build. You're skeptical of PRDs that describe solutions without validating the underlying problem. You push hard on "do we have evidence this matters?"

**Instructions:** Critique this PRD on three specific dimensions: (1) Is the problem statement strong enough that engineering would be excited to solve it, or does it read like a feature spec? (2) Are the success metrics actually measurable and connected to business outcomes, or are they vanity metrics? (3) What's the riskiest assumption in this PRD that we haven't validated?

**Tone:** Direct and challenging. Don't be polite about weak spots. I want to find the holes before my group PM does.

[PRD content...]`,
          response: `The problem statement needs work. You're describing a feature ("generate branded reports") rather than a problem worth solving. Start with the outcome: "Property managers lose owners because owners don't see the value their PM delivers." Then the question becomes: what's the cheapest way to prove that visible performance data reduces owner churn? A branded PDF report is one hypothesis, but have you validated that owners actually read reports? Your biggest unvalidated assumption is that...`
        }
      },
      design: {
        without: {
          label: 'Without CRIT',
          prompt: `I designed a new onboarding flow for Beyond hosts. Can you review it?

[Flow description...]`,
          response: `The flow looks clean and well-organized. The progress indicator is helpful, and the step-by-step approach should reduce cognitive load. You might want to consider adding tooltips for complex fields and ensuring the flow works on mobile...`
        },
        with: {
          label: 'With CRIT',
          prompt: `**Context:** I'm a designer at Beyond working on host onboarding. Our activation rate is 5% (target: 8-11%) - of 6,000 monthly signups, most never enable pricing. We believe hosts who don't complete setup in the first 48 hours are nearly impossible to recover. This redesigned flow cuts the current 14-step onboarding to 6 steps.

**Role:** Act as a behavioral designer who specializes in activation and onboarding for fintech and marketplace products. You think about defaults, commitment devices, loss aversion, and the Zeigarnik effect (people are more likely to complete tasks they've already started). You're skeptical of flows that look clean but don't account for user motivation.

**Instructions:** Critique this flow on: (1) Where does motivation drop? At which step would a busy host with one Airbnb listing decide "I'll finish this later" (and never come back)? (2) Are we using any behavioral nudges, or is this just a form wizard with fewer steps? (3) What's the first moment the host sees value (not a promise of value, actual value)?

**Tone:** Constructively brutal. I want to ship something that moves our 5% activation rate, not something that just looks nicer than what we have.

[Flow description...]`,
          response: `Your flow has a classic fintech problem: you front-loaded all the work (connect PMS, import listings, set preferences) before the host sees any value. By step 3, a host with one Airbnb listing is thinking "this is a lot of setup for something I'm not sure about." The Zeigarnik effect won't save you here because...`
        }
      },
      explanation: `The CRIT versions get feedback that's specific, actionable, and grounded in real expertise. The Role dimension is doing the heavy lifting - "act as Marty Cagan" produces fundamentally different critique than "act as a reviewer." And the Instructions keep the critique focused on the dimensions that actually matter for the decision you're making. Notice how both CRIT examples produce feedback that challenges the underlying approach, not just surface details.`
    },

    task: {
      instruction: `Think of something you've recently written or created that you'd want sharp feedback on - a PRD, a design spec, a strategy doc, a research plan, an experiment design, even a Slack message you're drafting for a sensitive topic.

Write a CRIT prompt for it. The key is the Role dimension: pick a specific expert whose perspective would be genuinely useful, not just "an experienced PM." Think about whose critique you'd most value and why.

You don't need to include the actual document (though you can). Focus on crafting the CRIT structure.`,
      prompts: {
        pm_ic: `Pick a deliverable from your current work - maybe a PRD, an experiment plan, a one-pager, or a customer problem statement. For the Role, think about a specific thinker whose lens would be valuable: Teresa Torres for discovery quality, Shreyas Doshi for prioritization rigor, a skeptical engineer for feasibility, or a Beyond customer for "does this actually solve my problem?"

The Instructions should focus on the 2-3 dimensions where you're least confident. Don't ask for general feedback - target the areas where finding a problem now saves you the most time later.`,

        pm_director: `Pick a strategic artifact - an OKR proposal, a roadmap narrative, a prioritization framework, or a stakeholder communication. For the Role, think about who in your professional world gives the most uncomfortable but useful feedback: a board member asking about defensibility, your CEO pushing on focus, a senior PM from a competitor poking at your positioning.

The Instructions should target strategic weaknesses - not "is this well-written" but "is this strategy actually sound? What would make it fail?"`,

        design_ic: `Pick a recent design - a flow, a component, a prototype, or a research plan. For the Role, think about a specific design perspective that would challenge you: a11y expert (accessibility specialist), a behavioral designer, a design systems engineer, a first-time user who just signed up and has no context, or a Beyond host who manages 200+ listings and has zero patience for unnecessary clicks.

The Instructions should go beyond aesthetics - focus on whether the design actually solves the user's problem, not just whether it looks right.`,

        design_lead: `Pick a design leadership artifact - a design quality rubric, a critique framework, a design strategy doc, or a team process proposal. For the Role, think about who would give the most useful strategic critique: Julie Zhuo on design management, a VP of Engineering questioning design ROI, or a product leader asking how design connects to business outcomes.

The Instructions should focus on whether your artifact actually changes team behavior, not just whether it's thorough.`
      }
    },

    coachContext: {
      evaluationCriteria: [
        'Is the Context specific enough that the critique will be grounded in the real situation?',
        'Is the Role a specific expert perspective (not just "an experienced person")?',
        'Do the Instructions target 2-3 specific dimensions rather than asking for general feedback?',
        'Is the Tone calibrated to get honest feedback (not just validation)?',
        'Would this CRIT prompt produce critique that changes the user\'s work, or just commentary?'
      ],
      seniorityNote: `For Director-level roles, the Role should involve strategic or organizational perspectives (board members, CEO, competitor PMs, team leads they manage). For IC roles, the Role should involve craft perspectives (specific methodology experts, end users, engineering partners). Both should produce critique that's genuinely uncomfortable in a useful way.`,
      exampleFeedback: {
        strong: `This is excellent CRIT structure. The Role is specific and purposeful - you're not just asking for "expert feedback," you're getting a specific lens that will challenge your work in a targeted way. The Instructions are focused on the 2-3 things that matter most for your decision. And the Tone calibration ("don't be polite about weak spots") gives Claude permission to be genuinely critical. One thing to try next: after getting this critique, ask Claude "Now switch roles: you're [different expert]. What does this critique miss?"`,
        needsWork: `The CRIT structure is there but the Role is doing no work. "Act as an experienced PM" is too generic - it produces the same polite, surface-level feedback you'd get without CRIT. Think about a specific person or perspective: "Act as a Teresa Torres-trained PM who believes no spec should be written until the riskiest assumption has been tested." That Role will produce fundamentally different critique. Also, your Instructions say "give me feedback on this" - that's too open-ended. Name the 2-3 specific dimensions you're worried about.`
      }
    }
  },

  // ──────────────────────────────────────────────────────────
  // EXERCISE 1.4 - Adversarial Prompting
  // ──────────────────────────────────────────────────────────
  {
    id: '1.4',
    title: 'Make It Argue With You',
    subtitle: 'Your new favorite sparring partner',
    duration: '25 min',
    description: `The most underused Claude capability isn't writing or analysis - it's disagreement. Most people use AI to confirm what they already think. The real power is in asking Claude to systematically attack your ideas before someone else does.

This is adversarial prompting: deliberately asking Claude to find weaknesses, argue the other side, or pressure-test your assumptions. It's the difference between showing up to a product review hoping nobody finds the holes and showing up having already found and addressed them.`,

    patterns: [
      {
        name: 'The Pre-Mortem',
        description: 'Ask Claude to imagine your project has failed and work backward to identify why.',
        example: `We're building a "Portfolio Health Score" that gives property managers a single number (1-100) showing how well their portfolio is performing. It combines BtM performance, price override frequency, occupancy, and owner satisfaction signals.

Imagine it's 6 months after launch and this feature has completely failed to move our NRR needle. What went wrong? Give me the 5 most likely failure modes, starting with the most probable.`,
        beyondContext: `This is real - Beyond has considered health scoring approaches. The failure modes are instructive: PMs might ignore a score they don't trust, the score might not be actionable, it might surface problems PMs already know about, or it might create anxiety without providing solutions.`
      },
      {
        name: 'The Competitor Response',
        description: 'Ask Claude to argue from a competitor\'s perspective.',
        example: `I'm building Beyond's case for why property managers should pay 3-5x more than PriceLabs ($19.99/listing/month vs our ~$5-7/listing equivalent).

Now argue the opposite: you're PriceLabs' VP of Product. Beyond just launched Listing Groups v2 and an Owner Reporting suite. Draft your counter-positioning memo to your sales team explaining why customers should stay with PriceLabs despite these new Beyond features. Be genuinely persuasive - don't strawman.`,
        beyondContext: `This is one of the most valuable prompts a Beyond PM can run. PriceLabs' actual counter-positioning focuses on configurability, lower cost, and transparency ("you control every lever"). Understanding their strongest arguments helps you build products that can't be easily counter-positioned.`
      },
      {
        name: 'The Sophistication Check',
        description: 'Ask Claude to rewrite your thinking at a different user sophistication level.',
        example: `Here's my PRD for a "Smart Minimum Stay" feature that automatically adjusts minimum night requirements based on demand patterns and booking lead time.

Rewrite the user-facing explanation of this feature as if our target user is a first-time Airbnb host with one property who has never used a pricing tool before. They don't know what "booking lead time" means and they're nervous about automation changing things they don't understand.

Then tell me: does this feature as designed actually work for this user, or have I designed it for a power user and assumed everyone thinks like me?`,
        beyondContext: `This is critical for Beyond given the activation crisis. Features designed for sophisticated property managers often overwhelm the hosts who make up the highest-volume acquisition segment. This prompt forces you to confront whether you're building for your power users at the expense of your growth engine.`
      },
      {
        name: 'The Assumption Excavator',
        description: 'Ask Claude to find the hidden assumptions in your plan.',
        example: `Here's our Q2 OKR: "Improve host activation rate from 5% to 8% by reducing onboarding steps from 14 to 6 and adding an in-app setup wizard."

List every assumption embedded in this OKR. For each one, rate it: (a) validated with evidence, (b) reasonable but unvalidated, or (c) actually risky. Be thorough - I want the assumptions I'm not seeing, not just the obvious ones.`,
        beyondContext: `Hidden assumptions kill OKRs. The big one here: does reducing onboarding steps actually cause higher activation, or do hosts who complete 14 steps self-select as more committed? Fewer steps might just mean more people finish onboarding but still don't enable pricing.`
      }
    ],

    task: {
      instruction: `Pick a real product idea, strategy, or decision you're working on (or recently worked on). Write 3 different adversarial prompts using the patterns above. Then run at least one of them in the Prompt Playground and paste the result.

The goal isn't to destroy your idea. It's to find the weaknesses before someone else does. The best product thinking survives adversarial pressure - it gets sharper, not weaker.`,
      prompts: {
        pm_ic: `Think about a feature, experiment, or spec you're currently working on. Write adversarial prompts using at least 2 of these patterns:
- Pre-Mortem: "It's 6 months after launch and this has failed. Why?"
- Competitor Response: "You're PriceLabs' PM. How do you counter-position this?"
- Sophistication Check: "Rewrite this for a first-time host who has never used a pricing tool"
- Assumption Excavator: "List every assumption in this plan I might be missing"

The best prompt to start with is the Pre-Mortem - it's the fastest way to surface blind spots in your current work.`,

        pm_director: `Think about a strategic bet, OKR, or roadmap decision your teams are pursuing. Write adversarial prompts that test the strategy, not just the execution:
- Pre-Mortem: "It's end of year and this initiative failed to move the metric. What happened?"
- Competitor Response: "You're a PriceLabs executive. Draft your board's response to Beyond's Q2 roadmap."
- Assumption Excavator: "What assumptions about our market, our users, and our team need to be true for this strategy to work?"

Try to write at least one prompt that would make you uncomfortable to read the answer. That's where the value is.`,

        design_ic: `Think about a design you're working on or recently shipped. Write adversarial prompts that challenge the design decisions:
- Pre-Mortem: "We shipped this design and users still aren't completing the flow. Where did we go wrong?"
- Sophistication Check: "Walk through this flow as a host who is skeptical of automation and doesn't trust algorithms to set their prices"
- Assumption Excavator: "What am I assuming about user behavior that I haven't validated with research?"

The Sophistication Check is especially powerful for designers - it forces you to experience your design through a different user's mental model.`,

        design_lead: `Think about a design strategy or team process decision you're making. Write adversarial prompts that test the organizational impact:
- Pre-Mortem: "We adopted this design approach/process and 6 months later the team's output quality hasn't improved. Why?"
- Competitor Response: "You're the VP of Design at a competitor. How does your design org outperform Beyond's based on what you see?"
- Assumption Excavator: "What assumptions about my team's capabilities, motivation, and bandwidth need to be true for this design strategy to work?"

Push yourself to test the uncomfortable assumptions - the ones about team dynamics and organizational readiness, not just design quality.`
      }
    },

    coachContext: {
      evaluationCriteria: [
        'Did they write prompts that would produce genuinely uncomfortable feedback?',
        'Are the prompts grounded in real Beyond work (not hypothetical scenarios)?',
        'Do the adversarial prompts target different angles (strategy, execution, user sophistication, assumptions)?',
        'If they ran a prompt, did their reflection show they actually found something they hadn\'t considered?',
        'Are the prompts specific enough to produce actionable critique (not just "what could go wrong?")?'
      ],
      seniorityNote: `For Director-level roles, look for strategic-level adversarial thinking (market positioning, organizational assumptions, portfolio risk). For IC roles, look for execution-level adversarial thinking (user behavior, feature design, experiment validity). Both should produce prompts that are genuinely uncomfortable.`,
      exampleFeedback: {
        strong: `These adversarial prompts have real teeth. The Pre-Mortem is specific enough to produce concrete failure modes, not generic risk lists. And I like that your Competitor Response prompt asks for a "genuinely persuasive" counter - that instruction prevents Claude from strawmanning the opposition. The reflection shows you actually found a blind spot. Now here's the meta-move: take the biggest failure mode from the Pre-Mortem and write a follow-up prompt: "Given this risk, what's the cheapest test we could run in the next 2 weeks to validate whether it's real?"`,
        needsWork: `The adversarial prompts are too gentle. "What could go wrong with this feature?" will get you a generic risk list. You need to be more specific: name the feature, name the metric it's supposed to move, and ask Claude to explain specifically why it won't move that metric. Also, the Competitor Response prompt asks "what would PriceLabs say?" but doesn't give Claude enough context about PriceLabs' actual positioning (configurability, low cost, transparency) to generate a genuinely persuasive counter-argument.`
      }
    }
  },

  // ──────────────────────────────────────────────────────────
  // EXERCISE 1.5 - The Retrospective Prompt
  // ──────────────────────────────────────────────────────────
  {
    id: '1.5',
    title: 'The Retrospective Prompt',
    subtitle: 'Getting better at getting better',
    duration: '20 min',
    description: `The fastest way to improve at prompting is to ask the AI to help you improve at prompting. This sounds circular, but it's the single most effective habit you can build. After any significant Claude interaction, ask: "How could I have gotten here faster?" or "What should I have done differently?"

Claude can see exactly where your prompt was vague, where it had to guess your intent, and what additional context would have saved three rounds of back-and-forth. It just needs permission to tell you.

This is the meta-skill that makes every other skill in this course compound over time.`,

    patterns: [
      {
        name: 'The Prompt Rewrite',
        description: 'Ask Claude to improve your own prompt after seeing the results.',
        before: `Help me write a competitive analysis of PriceLabs.`,
        after: `I just asked you to "help me write a competitive analysis of PriceLabs" and the result was too generic. Rewrite my original prompt so that it would have produced a sharp, specific analysis on the first try. Show me the improved prompt and explain what was missing from my original.`,
        insight: `Claude will typically identify that you didn't specify: the audience (board? product team? sales?), the dimensions of comparison (pricing? feature depth? market positioning?), the format (table? narrative? SWOT?), or the strategic question you're actually trying to answer. The rewritten prompt will include all of this.`
      },
      {
        name: 'The Efficiency Audit',
        description: 'Ask Claude to identify where you wasted time in a conversation.',
        example: `Look at our conversation above. We went back and forth 6 times before you gave me what I needed. Where could I have given you better context or clearer instructions upfront to get to this result in 1-2 exchanges instead of 6? Be specific about what information I made you guess at.`,
        insight: `This is humbling but incredibly useful. Claude will point out the exact moments where it had to make assumptions because you didn't specify something. Over time, you internalize these patterns and your first prompts get dramatically better.`
      },
      {
        name: 'The Level-Up',
        description: 'Ask Claude to assess your overall prompting patterns and suggest improvements.',
        example: `Here's how I typically use Claude in my PM work at Beyond:
- I paste in customer support tickets and ask for themes
- I write rough PRD sections and ask Claude to clean them up
- I ask for competitive analysis when prepping for meetings
- I use it to draft emails and Slack messages

Based on these patterns, what am I missing? What are the highest-leverage uses of AI for a product manager at a dynamic pricing company that I'm probably not doing? I want to go from "good" to "genuinely hard to compete with."`,
        insight: `This prompt often surfaces blind spots like: using Claude for discovery (generating interview questions, structuring assumption maps), using it for adversarial thinking (as you learned in 1.4), and using it for synthesis (connecting insights across multiple customer conversations). Most people use AI for drafting and editing but miss the strategic thinking applications.`
      }
    ],

    task: {
      instruction: `Go back to your best prompt from Exercises 1.1-1.4. Run it in the Prompt Playground, then immediately follow up with a Retrospective Prompt asking Claude to help you improve it. Document what you learned.

Then try the Level-Up pattern: describe how you currently use AI in your daily work and ask Claude what you're missing.`,
      prompts: {
        pm_ic: `Take your strongest prompt from the previous exercises and run it. Then ask Claude:
1. "Rewrite my prompt so it would have produced a better result on the first try. Show me both versions and explain what changed."
2. "Here's how I currently use AI in my PM work: [describe your actual patterns]. What am I missing that would make me significantly more effective at shipping features that move metrics?"

Focus on identifying one concrete habit you can start this week.`,

        pm_director: `Take your strongest prompt from the previous exercises and run it. Then ask Claude:
1. "Where in our conversation did you have to make assumptions because I wasn't specific enough? What strategic context was missing?"
2. "Here's how I currently use AI in my product leadership work: [describe your actual patterns]. Given that I'm responsible for team strategy, OKR quality, and stakeholder alignment, what are the highest-leverage AI use cases I'm probably not doing?"

The Level-Up prompt is especially powerful at the director level because the highest-leverage uses of AI shift from execution (drafting, analysis) to strategic thinking (pressure-testing strategy, modeling scenarios, preparing for difficult conversations).`,

        design_ic: `Take your strongest prompt from the previous exercises and run it. Then ask Claude:
1. "Rewrite my prompt so it would have given me better design critique on the first try. What context about the user, the constraints, or the design rationale was I missing?"
2. "Here's how I currently use AI in my design work: [describe your actual patterns]. What am I missing that would make my design thinking sharper and my workflow faster?"

Pay attention to whether Claude suggests uses you hadn't considered - like using AI for research synthesis, accessibility auditing, or generating design variation concepts.`,

        design_lead: `Take your strongest prompt from the previous exercises and run it. Then ask Claude:
1. "What assumptions did you make about my design organization and strategic context because I didn't specify them? What would have made your response more useful for someone leading a design team?"
2. "Here's how I currently use AI in my design leadership work: [describe your actual patterns]. I manage a design team and am responsible for design quality, design strategy, and cross-functional influence. What are the highest-leverage AI patterns for design leaders that I'm probably not using?"

This is where you might discover uses like: using AI to synthesize research across multiple studies, generating design critique rubrics, preparing design strategy presentations, or modeling the organizational impact of design system investments.`
      }
    },

    coachContext: {
      evaluationCriteria: [
        'Did they actually run a previous prompt and then do a retrospective (not just write about it)?',
        'Did their retrospective surface a specific, actionable improvement?',
        'Does their Level-Up prompt honestly describe their current AI usage patterns?',
        'Did they identify at least one new AI use case they hadn\'t considered?',
        'Is their "one concrete habit" specific enough to actually practice this week?'
      ],
      seniorityNote: `For Director-level roles, the Level-Up should surface strategic AI uses (scenario modeling, stakeholder prep, organizational design). For IC roles, it should surface craft-level AI uses (faster research synthesis, better design exploration, sharper specs). Both should identify patterns that go beyond drafting and editing.`,
      exampleFeedback: {
        strong: `Really solid retrospective work. The prompt rewrite shows a meaningful improvement - you went from a generic ask to one with clear context and evaluation criteria. And your Level-Up response surfaced a genuine blind spot (using Claude for assumption testing before writing specs, not after). That's the kind of habit that compounds. The meta-lesson here: you just used Claude to learn how to use Claude better. Make this a regular practice - even 30 seconds at the end of a session asking "how could I have gotten here faster?" will dramatically improve your prompting over the next few weeks.`,
        needsWork: `The retrospective is too surface-level. "I should have been more specific" is true but not actionable. Ask Claude to show you the exact rewritten prompt - seeing the concrete difference between your version and the improved version is where the learning happens. Also, your Level-Up prompt describes your current usage but doesn't give Claude enough context about your specific role, your biggest time sinks, or where you feel least confident. The more honest you are about where you struggle, the more useful the suggestions will be.`
      }
    }
  },

  // ──────────────────────────────────────────────────────────
  // EXERCISE 1.6 - Capstone: Set Up Your AI Environment
  // ──────────────────────────────────────────────────────────
  {
    id: '1.6',
    title: 'Set Up Your AI Environment',
    subtitle: 'Your home base for everything that follows',
    duration: '30 min',
    isCapstone: true,
    description: `Everything you've learned in Level 1 culminates here: you're going to set up a Claude environment that's genuinely configured for YOUR work. This isn't a toy exercise - the system prompt and project folder you create here will be your daily driver for the rest of the course and beyond.

A well-configured Claude environment is like having a colleague who already knows your company, your role, your current priorities, and how you like to work. Every conversation starts from a higher baseline.`,

    guide: {
      sections: [
        {
          title: 'Step 1: Create a Claude Project folder',
          instructions: `Go to Claude Desktop and create a new Project. Name it something you'll actually use (e.g., "Core App PM Work" or "Host Experience Design" - not "NexusYou Exercise").

This folder will hold your system prompt and any reference documents you want Claude to always have access to when working on this area.`,
        },
        {
          title: 'Step 2: Write your system prompt',
          instructions: `This is where everything from Level 1 comes together. Your system prompt should cover these areas (use the examples below as starting points, not templates to copy):`,
          subsections: [
            {
              name: 'Who I am',
              workedExamples: {
                pm: `I'm a Senior PM at Beyond, a revenue management platform for short-term rental hosts and property managers. I own the activation workstream on the Core App team. My team's mission is to improve the rate at which new host signups become active, paying customers (currently 5%, target 8-11%). I work with a product trio (myself, a senior designer, and an engineering lead) plus data science support.`,
                design: `I'm a Senior Product Designer at Beyond, working on the Core App team. I own the host-facing pricing experience - the calendar view, pricing recommendations, and the flows where hosts interact with (or override) our dynamic pricing. My design work directly impacts whether hosts trust the algorithm enough to let it work, which is our biggest product challenge.`
              }
            },
            {
              name: 'How I work',
              workedExamples: {
                pm: `I think in outcomes, not features. When I bring an idea, push me to articulate the problem first and identify the riskiest assumption. I value Teresa Torres-style discovery and Marty Cagan's emphasis on empowered teams. I prefer structured frameworks (RICE, OSTs, Four Risks) over gut-feel prioritization. When I ask for a draft, give me a strong starting point, not a perfect final version - I want to apply my own judgment to refine it.`,
                design: `I design for behavior change, not just aesthetics. When I describe a design problem, push me on the underlying user motivation and the behavioral triggers, not just the UI layout. I value progressive disclosure, smart defaults, and reducing decisions. I want design feedback to be direct and specific - "the hierarchy is unclear because..." not "looks good." When reviewing my work, apply Nielsen's heuristics and Beyond's "feel in control without needing to control" principle.`
              }
            },
            {
              name: 'Key Beyond context',
              content: `Include context that's relevant to YOUR specific work area. Don't dump everything - pick the 5-10 facts that shape most of your conversations:

- Beyond's pricing algorithm adjusts nightly rates using demand signals, market data, seasonality, and events
- Our core metric is Beat the Market (BtM): whether customers achieve +20% RevPAN vs their competitive set
- We serve two segments: self-serve hosts (~25K, PLG motion) and enterprise property managers (contracted, ~75% of revenue)
- Our biggest product challenge: 5% activation rate on ~6,000 monthly host signups
- Main competitor: PriceLabs (3-5x cheaper, more manual/configurable, ~40-45% market share)
- Philosophy: "Make users feel in control without needing to control" - smarter defaults over more settings
- Key product areas: pricing engine, Compass (analytics), host onboarding, Owner Suite, Neyoba (AI assistant), Nexus (internal AI tools)
- Relevant to your role: [add your team's specific OKRs, metrics, and current priorities]`
            },
            {
              name: 'Response preferences',
              content: `Specify how you want Claude to communicate:

- Format preferences (bullets vs. prose, headers vs. no headers, length)
- How direct you want feedback to be
- Whether to ask clarifying questions before answering or take a best-guess first pass
- Any terms or jargon to use or avoid
- Whether you want Claude to challenge your thinking or focus on executing your request`
            }
          ]
        },
        {
          title: 'Step 3: Add reference documents',
          instructions: `Add 1-3 documents that are relevant to your daily work. Good candidates:
- Your team's current OKRs
- The Beyond Product & Design LLM Guide (ask your team lead for access to the shared PDE folder)
- A recent PRD or design spec that represents the kind of work you do
- A customer research summary or competitive analysis you reference often

Don't add everything - add the documents that would save you the most "let me paste this context" time across your conversations.`
        },
        {
          title: 'Step 4: Test and refine',
          instructions: `Open a conversation in your new Project folder and try 3 different types of prompts:
1. A quick question about your product area (does it give a contextually aware answer?)
2. A COSTAR prompt from Exercise 1.2 (does the output reflect your role and context?)
3. An adversarial prompt from Exercise 1.4 (does the critique reference Beyond-specific challenges?)

If the responses feel generic, your system prompt needs more specific context. If Claude seems confused about what you do, clarify your role and scope.`
        }
      ]
    },

    task: {
      instruction: `Complete all 4 steps above, then paste your system prompt into the text field below. The AI Coach will evaluate it against best practices and your specific role.

This is the deliverable for Level 1 - a working Claude environment you'll actually use going forward. Don't just write a system prompt for this exercise; write one you'd genuinely keep.`,
      prompts: {
        pm_ic: `Your system prompt should reflect your specific PM responsibilities - the product area you own, the metrics you're trying to move, and how you make decisions. Include your team context (who do you collaborate with daily?) and your current top priority.

Strong PM IC system prompts usually include: the specific user segment they're focused on, their team's current OKR or north star metric, their preferred frameworks, and instructions for Claude to push back on feature-first thinking.`,

        pm_director: `Your system prompt should reflect your scope - the teams and product areas you're responsible for, the strategic bets you're guiding, and the stakeholder landscape you navigate. It should give Claude enough context to help you think at the portfolio level, not just the feature level.

Strong Director-level system prompts include: the business context that shapes your decisions (revenue mix, market positioning, competitive dynamics), your expectations for strategic rigor, and instructions for Claude to distinguish between team-level execution questions and director-level strategy questions.`,

        design_ic: `Your system prompt should reflect your specific design domain - the product area you design for, the users you serve, and the design principles that guide your work. Include your preferred tools and methods (Figma, user research approaches, design system usage).

Strong Design IC system prompts include: the specific UX challenges in their area (e.g., "hosts don't trust algorithmic pricing"), their design philosophy, and instructions for Claude to give feedback using specific design heuristics rather than generic suggestions.`,

        design_lead: `Your system prompt should reflect your leadership scope - the design team you manage, the product areas your team covers, and the design culture you're building. It should help Claude operate as a strategic design thinking partner, not just a UI feedback tool.

Strong Design Leader system prompts include: the team composition and current design challenges, the cross-functional dynamics with PM and engineering, design quality standards, and instructions for Claude to help with both craft-level reviews and organizational design decisions.`
      }
    },

    assessment: {
      questions: [
        {
          question: 'What\'s the single biggest difference between a "search query" prompt and a "thought partner" prompt?',
          options: [
            'Thought partner prompts are longer',
            'Thought partner prompts include your context, initial thinking, and ask for analysis rather than information',
            'Thought partner prompts use more formal language',
            'Thought partner prompts always use a framework like COSTAR'
          ],
          correct: 1,
          explanation: 'Length, formality, and frameworks are tools, not the core difference. The real shift is sharing your context and partial thinking so Claude can analyze with you rather than just retrieve for you.'
        },
        {
          question: 'When would you use CRIT instead of COSTAR?',
          options: [
            'When you want longer output',
            'When you want Claude to generate content from scratch',
            'When you want Claude to critique or evaluate something you\'ve already created',
            'When you\'re working on a design task'
          ],
          correct: 2,
          explanation: 'COSTAR is for generating content (tell Claude what to create). CRIT is for getting critique (tell Claude what perspective to evaluate from). The Role dimension in CRIT is what makes critique specific and useful rather than generic.'
        },
        {
          question: 'What\'s the most valuable habit to build for long-term prompting improvement?',
          options: [
            'Memorizing prompting frameworks',
            'Writing longer prompts with more detail',
            'Regularly asking Claude how you could have gotten to the answer faster',
            'Using the same prompt template for every task'
          ],
          correct: 2,
          explanation: 'The retrospective prompt habit compounds over time. Frameworks are useful starting points, but the meta-skill of evaluating and improving your own prompting is what makes you genuinely excellent rather than just competent.'
        }
      ],
      selfReflection: `On a scale of 1-5, how confident do you now feel using Claude as a thought partner rather than a search engine? And more importantly: what's the one prompting habit from Level 1 that you'll start using this week?`
    },

    coachContext: {
      evaluationCriteria: [
        'Does the system prompt include specific role and team context (not just "I am a PM at Beyond")?',
        'Does it include Beyond-specific knowledge that would save context-setting in future conversations?',
        'Does it include "how I work" preferences that shape Claude\'s behavior?',
        'Does it include response format preferences?',
        'Does it reference relevant frameworks or principles (SVPG, Teresa Torres, etc)?',
        'Is it practical - would this person actually use this system prompt daily?',
        'Is it the right length - enough context to be useful, not so much that it dilutes focus?'
      ],
      seniorityNote: `For Director-level roles, the system prompt should reflect strategic scope - multiple teams, business-level metrics, stakeholder management. It should instruct Claude to think at the portfolio/strategy level by default. For IC roles, the system prompt should reflect tactical depth - specific product area, specific user segment, specific methodologies. It should instruct Claude to be a hands-on craft partner.`,
      exampleFeedback: {
        strong: `This is a system prompt you'll actually use - and that's the whole point. Your role context is specific enough that Claude starts every conversation knowing your team, your metrics, and your current priorities. The "how I work" section is excellent - telling Claude to push back on feature-first thinking and ask for the problem statement first will genuinely improve every conversation. One suggestion: add a line about response format preferences (do you want bullets or prose? Short answers or detailed analysis?) since that'll save you asking for format adjustments in every conversation. Nice work - you've just leveled up every future Claude interaction.`,
        needsWork: `This system prompt is a good start but it's too generic to meaningfully change Claude's behavior. "I'm a PM at Beyond who works on the product" could describe anyone on the team. Make it specific: which product area? Which user segment? What's the metric you're trying to move this quarter? Also, the "how I work" section is missing - this is where the real leverage is. Tell Claude whether you want it to challenge your thinking or execute your requests, whether to ask clarifying questions or take a best guess, and what frameworks you prefer. These instructions compound across every conversation.`
      }
    },

    milestone: {
      message: `You just checked into your first property! From zero to a fully configured AI environment in one level. That system prompt is going to make every Claude conversation better from here on out.`,
      dadJoke: `Why did the AI go to real estate school? Because it wanted to learn about property management... of prompts. Yeah, that one's from Gerard. He's not sorry.`,
      nextLevel: `Level 2: The Host - where you'll learn context management, conversation hygiene, and why word choice can completely change what Claude gives you.`
    }
  }
],
    assessment: {
      questions: [
        {
          question: 'What\'s the single biggest difference between a "search query" prompt and a "thought partner" prompt?',
          options: [
            'Thought partner prompts are longer',
            'Thought partner prompts include your context, initial thinking, and ask for analysis rather than information',
            'Thought partner prompts use more formal language',
            'Thought partner prompts always use a framework like COSTAR'
          ],
          correct: 1,
          explanation: 'Length, formality, and frameworks are tools, not the core difference. The real shift is sharing your context and partial thinking so Claude can analyze with you rather than just retrieve for you.'
        },
        {
          question: 'When would you use CRIT instead of COSTAR?',
          options: [
            'When you want longer output',
            'When you want Claude to generate content from scratch',
            'When you want Claude to critique or evaluate something you\'ve already created',
            'When you\'re working on a design task'
          ],
          correct: 2,
          explanation: 'COSTAR is for generating content (tell Claude what to create). CRIT is for getting critique (tell Claude what perspective to evaluate from). The Role dimension in CRIT is what makes critique specific and useful rather than generic.'
        },
        {
          question: 'What\'s the most valuable habit to build for long-term prompting improvement?',
          options: [
            'Memorizing prompting frameworks',
            'Writing longer prompts with more detail',
            'Regularly asking Claude how you could have gotten to the answer faster',
            'Using the same prompt template for every task'
          ],
          correct: 2,
          explanation: 'The retrospective prompt habit compounds over time. Frameworks are useful starting points, but the meta-skill of evaluating and improving your own prompting is what makes you genuinely excellent rather than just competent.'
        }
      ],
      selfReflection: `On a scale of 1-5, how confident do you now feel using Claude as a thought partner rather than a search engine? And more importantly: what's the one prompting habit from Level 1 that you'll start using this week?`
    },
    milestone: {
      message: `You just checked into your first property! From zero to a fully configured AI environment in one level. That system prompt is going to make every Claude conversation better from here on out.`,
      dadJoke: `Why did the AI go to real estate school? Because it wanted to learn about property management... of prompts. Yeah, that one's from Gerard. He's not sorry.`,
      nextLevel: `Level 2: The Host - where you'll learn context management, conversation hygiene, and why word choice can completely change what Claude gives you.`
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

  // ──────────────────────────────────────────────────────────
  // EXERCISE 2.1 - The Goldilocks Zone
  // ──────────────────────────────────────────────────────────
  {
    id: '2.1',
    title: 'The Goldilocks Zone',
    subtitle: "Context that's just right",
    duration: '25 min',
    description: `One of the most common mistakes people make with LLMs is getting context wrong - either starving Claude of information or drowning it. Too little context produces generic answers. Too much context dilutes focus and can actually confuse the output.

The sweet spot is what we call the Goldilocks Zone: enough context for Claude to understand your specific situation, but focused enough that every piece of context is doing work. The test is simple: if you removed a sentence from your prompt and the output wouldn't change, that sentence wasn't earning its keep.`,

    comparisonThree: {
      tooLittle: {
        label: 'Too little context',
        prompt: `Why are hosts churning?`,
        result: `You get a generic list of reasons why SaaS customers churn - pricing, competition, poor onboarding, lack of value perception. None of it is specific to Beyond, your customer segment, or the actual churn patterns in your data. You could have gotten this from a Google search.`,
      },
      justRight: {
        label: 'Just right',
        prompt: `I'm a PM at Beyond (dynamic pricing for short-term rentals). I'm investigating host churn in our self-serve segment. We add ~6,000 new host signups monthly but only net ~110/month after churn.

Our data shows that hosts who never enable pricing (never turn on the algorithm) make up about 60% of churn. The remaining 40% enabled pricing but left within 90 days.

I need to think through what's different about these two churn cohorts. What are the likely drivers for each, and what product interventions might be different for "never enabled" vs. "enabled but left"?`,
        result: `You get a structured analysis distinguishing two meaningfully different churn populations. Claude can reason about the "never enabled" group (likely activation/trust/complexity issues) vs. the "enabled but left" group (likely value perception/performance/cost issues) and suggest different product responses for each. The output directly informs your next product decision.`,
      },
      tooMuch: {
        label: 'Too much context',
        prompt: `I'm a PM at Beyond, a revenue intelligence platform for the short-term rental industry. Founded in 2013 as Beyond Pricing, the company pioneered dynamic pricing for vacation rentals. We serve both self-serve hosts (~25,000) and enterprise property managers. Our pricing model is a performance-based take rate of 1.0%-1.5% of booking value. We integrate with major PMS platforms including Guesty, Hostaway, Lodgify, and others. Our key metric is Beat the Market (BtM) which measures whether customers achieve +20% RevPAN versus their competitive set. Currently about 50% of listings hit this threshold and our target is 75%.

Our main competitor is PriceLabs which charges $19.99/listing/month and has about 40-45% market share. They offer more manual configuration options. We also compete with Wheelhouse, DPGO, and native pricing tools from Airbnb and Vrbo. Our pricing philosophy is "make users feel in control without needing to control." We believe smarter defaults beat more settings.

In terms of team structure, we have Product, Design, and Engineering organized into Outcome-Based Teams. I'm on the Core App team. We follow an OKR methodology influenced by Marty Cagan and SVPG. We do quarterly planning with mid-quarter check-ins.

Now, about churn. We add about 6,000 new host signups monthly. Our activation rate is about 5%. We net about 110 hosts per month after churn. I want to understand why hosts are churning.`,
        result: `The first 3 paragraphs of company background are noise. Claude dutifully processes all of it but the actual churn analysis is diluted - it spends tokens connecting churn to your competitive positioning, team structure, and OKR methodology rather than focusing sharply on the two distinct churn cohorts. The signal gets lost in the context.`,
      },
      explanation: `Notice that the "just right" version is actually shorter than the "too much" version but produces better output. It includes the specific numbers that matter (6,000 signups, ~110 net, 60/40 split between churn types) and a focused analytical question. Everything else - company founding date, competitor details, team structure, OKR methodology - isn't relevant to this specific question. Save that context for your system prompt where it helps across all conversations.

The rule of thumb: include context that changes the answer, not context that describes your world.`
    },

    task: {
      instruction: `Pick a real question you'd ask Claude this week. Write three versions of the prompt:

1. **Too little** - A bare search query with no context
2. **Just right** - Specific context + focused question (aim for 3-5 sentences of context)
3. **Too much** - The "just right" version with 2-3 paragraphs of unnecessary background added

Then run versions 2 and 3 in the Prompt Playground side by side. Compare the outputs. Where does the "too much" version actually produce worse results?`,
      prompts: {
        pm_ic: `Think about a product question you're actively trying to answer - maybe about a feature's performance, a customer behavior pattern, or an experiment result. Write the three versions.

The "just right" version should include: which product area, which user segment, the specific data point or hypothesis, and what kind of analysis you want. The "too much" version should add irrelevant company background, team structure, and competitive context that doesn't change the answer.`,

        pm_director: `Think about a strategic question - roadmap prioritization, resource allocation, or a cross-team trade-off. Write the three versions.

At the director level, the Goldilocks challenge is different: you often NEED more context because strategic questions involve multiple teams and stakeholders. The trick is including the context that shapes the decision (budget constraints, competing priorities, stakeholder positions) while excluding the context that's just background.`,

        design_ic: `Think about a design question - maybe a UX trade-off, a flow decision, or a research question. Write the three versions.

For design work, the "just right" context usually includes: the user persona, the specific interaction, the constraint you're working within, and what you've already considered. The "too much" trap for designers is often describing the entire product rather than the specific screen or flow in question.`,

        design_lead: `Think about a design strategy question - team process, quality standards, or a cross-functional design decision. Write the three versions.

For design leaders, context often needs to include organizational dynamics (team composition, PM relationships, engineering constraints) that IC designers wouldn't include. The trick is distinguishing between organizational context that shapes the answer and organizational context that's just narrative.`
      }
    },

    coachContext: {
      evaluationCriteria: [
        'Did they write three genuinely different versions (not just adding/removing a sentence)?',
        'Does the "just right" version include only context that changes the answer?',
        'Does the "too much" version clearly contain irrelevant background?',
        'If they ran the comparison, did they identify where extra context actually degraded the output?',
        'Is the "just right" version focused enough to produce a specific, actionable response?'
      ],
      seniorityNote: `For Director-level roles, "just right" context is often longer than for ICs because strategic decisions genuinely require more situational framing. The evaluation should focus on whether the additional context is decision-relevant (stakeholder dynamics, resource constraints) vs. decorative (company history, mission statements).`,
      exampleFeedback: {
        strong: `Sharp work. Your "just right" version nails the balance - every sentence is doing work. The 60/40 churn split you included completely changes the analysis Claude provides. And your observation from the side-by-side comparison is spot on: the "too much" version didn't give a wrong answer, it gave a diffuse one. That's the insidious thing about over-contexting - the answer looks fine but it's not as sharp as it should be. Pro tip: when in doubt, write the "too much" version first, then ruthlessly cut everything that doesn't change the answer.`,
        needsWork: `Your three versions are more like three lengths of the same prompt rather than three different context strategies. The "too little" version has some context, and the "too much" version is only a sentence longer than "just right." Push harder on the extremes. Your "too little" should be something you'd type into Google. Your "too much" should include your company's founding story, your competitor's pricing, and your team's OKR methodology. The contrast will make the Goldilocks principle obvious.`
      }
    }
  },

  // ──────────────────────────────────────────────────────────
  // EXERCISE 2.2 - Ask Me First
  // ──────────────────────────────────────────────────────────
  {
    id: '2.2',
    title: 'Ask Me First',
    subtitle: 'Teaching Claude to clarify before answering',
    duration: '20 min',
    description: `One of the most powerful yet underused techniques is telling Claude to ask you questions before giving you an answer. This flips the dynamic: instead of you trying to guess what context Claude needs, you let Claude tell you.

This is especially valuable when you're working on a problem you haven't fully structured yet. Claude's clarifying questions often surface dimensions of the problem you hadn't considered, which is itself a form of useful thinking.`,

    workedExamples: {
      pm: {
        label: 'PM Example',
        prompt: `I need to decide whether to prioritize the Owner Reporting feature or the Listing Groups v2 enhancement for Q2. Before giving me a recommendation, ask me the questions you'd need answered to make a well-informed suggestion. Don't guess at my context - interview me.`,
        sampleQuestions: `Claude would typically ask:
- What business outcome does each feature target? (retention vs. activation vs. expansion?)
- Do you have data on which one has stronger customer demand signal?
- Are there dependencies - does one need to ship before the other makes sense?
- What's the engineering effort difference? Is one significantly smaller?
- Is there pressure from a specific customer segment or enterprise deal driving either one?
- What happens to the metric you care about if you do neither for a quarter?

Notice how these questions force you to articulate trade-offs you may not have explicitly compared. The interview process IS the value, even before Claude gives a recommendation.`
      },
      design: {
        label: 'Design Example',
        prompt: `I'm redesigning the host settings page - the screen where hosts configure their pricing preferences (min/max prices, seasonal adjustments, minimum stays, etc). Before suggesting an approach, interview me about the problem. Ask me the questions that would help you give design feedback that's actually useful, not generic.`,
        sampleQuestions: `Claude would typically ask:
- What's the primary user complaint about the current settings page?
- How many settings are on the page currently, and how many do hosts actually change vs. leave at defaults?
- Are you redesigning for the self-serve host (1-3 listings) or the property manager (50+ listings)?
- What's the biggest risk - that hosts can't find what they need, or that they change things that make their pricing worse?
- Does this need to work with or replace the current UI, or is this a ground-up redesign?
- What does "success" look like - faster task completion, fewer support tickets, higher setting adoption?

These questions surface the design problem's structure before you start solving it.`
      }
    },

    techniques: [
      {
        name: 'The Interview Request',
        prompt: `Before answering, ask me 5 clarifying questions that would help you give a significantly better response. Don't make assumptions about my situation.`,
        when: 'When you have a complex problem and aren\'t sure what context matters most.'
      },
      {
        name: 'The Assumption Check',
        prompt: `Before you answer, tell me what assumptions you're about to make. Let me correct any wrong ones before you proceed.`,
        when: 'When you suspect Claude might go in the wrong direction with default assumptions.'
      },
      {
        name: 'The Scoping Interview',
        prompt: `I have a broad problem I need to narrow down. Interview me with 3-4 questions to help scope this to something we can make progress on in this conversation.`,
        when: 'When your problem is too big to tackle all at once.'
      },
      {
        name: 'The Expertise Calibration',
        prompt: `Before explaining this, ask me 2-3 questions to gauge my familiarity with the topic so you can calibrate the right level of detail.`,
        when: 'When you want an explanation matched to your knowledge level.'
      }
    ],

    task: {
      instruction: `Pick a real decision or problem you're working through (the messier the better - this technique shines on poorly structured problems). Write a prompt that asks Claude to interview you before giving an answer.

Then actually run it in the Prompt Playground, answer Claude's questions, and see how the final response compares to what you would have gotten by just asking your question directly.`,
      prompts: {
        pm_ic: `Think about a product decision where you're genuinely unsure of the right path - maybe a prioritization trade-off between two features, an experiment design where you're not sure what to test first, or a customer problem where you're not confident in your hypothesis.

Use the "Interview Request" or "Scoping Interview" technique. After Claude asks its questions, notice which questions surprised you - those are the dimensions of the problem you hadn't structured yet.`,

        pm_director: `Think about a strategic decision that involves multiple stakeholders or cross-team trade-offs - maybe resource allocation across teams, a roadmap narrative that needs to satisfy different audiences, or a prioritization call where reasonable people disagree.

Use the "Interview Request" technique. At the director level, Claude's questions often surface stakeholder perspectives you haven't fully mapped or second-order effects you haven't modeled. Pay attention to questions about "what happens if you're wrong?"`,

        design_ic: `Think about a design problem where you're still in the exploration phase - maybe a flow that could go in multiple directions, a component that serves different user types, or a research question you're trying to scope.

Use the "Scoping Interview" technique. Designers often jump to solutions too quickly (we've all done it). Claude's scoping questions can help you define the problem space before committing to an approach.`,

        design_lead: `Think about an organizational design decision - how to structure a design review process, how to allocate your team's time between product work and design system work, or how to improve design quality across your team.

Use the "Interview Request" technique, but frame it for organizational complexity: "I'm making a decision that affects my design team's workflow. Interview me about the problem so you understand the team dynamics, constraints, and trade-offs before suggesting an approach."`
      }
    },

    coachContext: {
      evaluationCriteria: [
        'Did they ask Claude to interview them (not just ask a question and hope for clarification)?',
        'Did they pick a genuinely complex or uncertain problem (not something with an obvious answer)?',
        'Did they actually answer Claude\'s questions and continue the conversation?',
        'Did they reflect on which questions surprised them or surfaced new dimensions?',
        'Was the final answer meaningfully better than what a direct question would have produced?'
      ],
      seniorityNote: `For Director-level roles, the interview should surface strategic and organizational dimensions. For IC roles, it should surface craft and execution dimensions. Both should produce clarifying questions the user hadn't considered.`,
      exampleFeedback: {
        strong: `Great use of the interview technique. I notice you picked a genuinely messy problem - one where you didn't have a clear answer. That's exactly when this technique is most valuable. Claude's third question (about what happens to the other initiative if you choose this one) is the kind of second-order thinking that often gets missed in prioritization discussions. The key habit: any time you catch yourself writing a prompt and thinking "I'm not sure how to frame this," that's your cue to ask Claude to interview you instead.`,
        needsWork: `The technique is right but you picked a problem where you already knew the answer. "Ask me questions before telling me how to implement X" isn't really an interview - it's just adding a step before getting implementation help. Try this with a decision where you're genuinely uncertain. The magic of this technique is that Claude's questions help YOU think, not just help Claude respond.`
      }
    }
  },

  // ──────────────────────────────────────────────────────────
  // EXERCISE 2.3 - Conversation Hygiene
  // ──────────────────────────────────────────────────────────
  {
    id: '2.3',
    title: 'Conversation Hygiene',
    subtitle: 'When to continue, branch, or start fresh',
    duration: '20 min',
    description: `Every Claude conversation accumulates context - and that's both a superpower and a trap. Early in a conversation, accumulated context makes Claude more helpful. But past a certain point, old context starts interfering with new questions, Claude gets confused about which instructions to prioritize, and quality degrades.

Conversation hygiene is the skill of knowing when to continue, when to start fresh, and when something should live in a persistent Project folder. Getting this right is the difference between Claude feeling like a sharp collaborator and Claude feeling like it's slowly losing the plot.`,

    decisionTree: {
      description: 'Use this mental model to decide what to do with your conversation:',
      rules: [
        {
          situation: 'Continue the conversation',
          when: [
            'You are iterating on the same document, analysis, or artifact',
            'Claude made something good and you want to refine it',
            'You are in a back-and-forth thinking session on one topic',
            'You are within ~15-20 exchanges and quality still feels sharp'
          ],
          beyondExample: 'You are drafting a PRD section, getting Claude\'s critique, revising, and getting another round of feedback. All one thread.'
        },
        {
          situation: 'Start a fresh conversation',
          when: [
            'You are switching to a completely different topic',
            'The conversation is past ~20 exchanges and feels muddled',
            'Claude starts repeating itself or contradicting earlier responses',
            'You want a "clean take" on something without prior context biasing the output',
            'You tried something and it went sideways - a fresh start is faster than fixing it'
          ],
          beyondExample: 'You spent 15 messages working on a competitive analysis and now want to draft an experiment plan. Start fresh - the competitive analysis context will bias the experiment framing.'
        },
        {
          situation: 'Use a Project folder',
          when: [
            'You will return to this topic across multiple sessions (days/weeks)',
            'You want consistent context every time (your role, your team, your product area)',
            'You have reference documents Claude should always have access to',
            'Multiple conversations need the same baseline context'
          ],
          beyondExample: 'Your ongoing work on the activation workstream - set up a Project with your system prompt, current OKRs, and the latest activation data. Every conversation in this Project starts from your baseline.'
        },
        {
          situation: 'Summarize and bridge',
          when: [
            'A conversation produced great thinking but it is getting long',
            'You want to carry forward conclusions without all the back-and-forth',
            'You are starting a new conversation that builds on a previous one'
          ],
          beyondExample: 'After a 20-message brainstorm about churn interventions, ask Claude: "Summarize the 3 key conclusions we reached and the open questions. I will paste this into a fresh conversation to continue." Then start fresh with that summary as your opening context.',
          technique: `Ask Claude: "Summarize our conversation so far. Focus on: (1) the conclusions we reached, (2) the open questions, and (3) any context from this conversation I'd need to include if I were continuing this work in a new thread." Then paste that summary into a fresh conversation.`
        }
      ]
    },

    task: {
      instruction: `Go back and look at your last 5 Claude conversations (or as many as you've had recently). For each one, assess:

1. Did you manage the conversation well, or did you stay in one thread too long?
2. Should any of these have been in a Project folder?
3. Was there a point where quality degraded and you should have started fresh?

Then write a brief "conversation playbook" for your typical work week - what gets its own conversation, what lives in a Project, and what triggers a fresh start.`,
      prompts: {
        pm_ic: `Think about your typical week. You probably have several types of Claude conversations:
- Quick questions ("how should I frame this Slack message?")
- Working sessions (drafting a spec, analyzing data, designing an experiment)
- Research (competitive analysis, market trends, customer behavior)

For each type, write your personal rule: continue, fresh start, or Project folder? Think about the conversations where Claude's quality degraded - what was the pattern?`,

        pm_director: `At the director level, your Claude conversations tend to span broader strategic territory. Think about:
- Recurring strategy work (OKR planning, roadmap reviews, board prep)
- Cross-team coordination (alignment docs, stakeholder communications)
- Thinking sessions (market analysis, organizational design, prioritization frameworks)

Which of these deserve their own Project folders? Which should always be fresh conversations? When do you find yourself providing the same context over and over - that is a signal for a Project folder.`,

        design_ic: `Think about your typical design workflows with Claude:
- Design critique sessions (reviewing a specific flow or component)
- Research synthesis (making sense of user interview notes)
- Content and copy work (writing UX copy, error messages, onboarding text)
- Exploration (brainstorming approaches to a design problem)

Exploration sessions especially need good hygiene - it is easy to go down a rabbit hole in one conversation that biases all your subsequent thinking. When do you need a clean slate?`,

        design_lead: `Think about your leadership conversations with Claude:
- Team planning (sprint planning, design review agendas, team goals)
- Strategy documents (design principles, quality rubrics, process proposals)
- Stakeholder communication (presenting design rationale to product/engineering leadership)
- People management (feedback preparation, career development conversations)

People management conversations especially benefit from fresh starts - you don't want context from a previous team member's feedback session bleeding into the next one.`
      }
    },

    coachContext: {
      evaluationCriteria: [
        'Did they actually review their recent conversations (not just write theoretical rules)?',
        'Did they identify at least one conversation that went too long or was in the wrong format?',
        'Does their playbook have specific rules, not just "it depends"?',
        'Do they distinguish between conversation types that need different management?',
        'Did they identify anything that should be a Project folder but isn\'t yet?'
      ],
      seniorityNote: `Director-level roles often need more Project folders because their work is more persistent and cross-cutting. IC roles should focus on the "fresh start" trigger - knowing when a conversation has gone stale is the highest-leverage skill for daily productivity.`,
      exampleFeedback: {
        strong: `Solid playbook. I especially like your rule about exploration sessions always getting a fresh conversation - that's a pattern a lot of people miss. When you brainstorm in one thread and then evaluate in the same thread, the brainstorm context biases the evaluation. Your observation that you kept pasting the same 3 paragraphs of team context into every conversation is a clear signal for a Project folder. Set that up this week and you'll save yourself 5 minutes per conversation, which adds up fast.`,
        needsWork: `Your playbook is mostly "I'll start fresh when things feel muddled." That's reactive, not proactive. Try setting concrete triggers: "After 15 exchanges, I'll ask Claude to summarize and then start fresh" or "Any working session on a spec gets its own conversation; quick questions go in a general thread." Also, you didn't mention Project folders at all - if you're doing recurring work on the same product area, a folder with your system prompt and OKRs will transform every conversation.`
      }
    }
  },

  // ──────────────────────────────────────────────────────────
  // EXERCISE 2.4 - Hallucination Hunting
  // ──────────────────────────────────────────────────────────
  {
    id: '2.4',
    title: 'Hallucination Hunting',
    subtitle: 'Demand accuracy, verify claims',
    duration: '25 min',
    description: `LLMs hallucinate. Not sometimes - regularly. They state things with confidence that are completely wrong, they fabricate plausible-sounding statistics, and they fill knowledge gaps with convincing fiction. This isn't a bug that'll be fixed someday; it's a fundamental property of how language models work.

The good news: there are reliable techniques to dramatically reduce hallucinations and catch them when they happen. The bad news: most people don't use them because the hallucinations sound so convincing.

For product and design work at Beyond, this matters enormously. An AI that confidently tells you "60% of hosts who override prices churn within 90 days" when it made that number up could send your product strategy in the wrong direction.`,

    techniques: [
      {
        name: 'The Confidence Demand',
        prompt: `For each claim or recommendation, rate your confidence from 1-10 and explain why. If you're below a 7, explicitly flag it as uncertain.`,
        why: 'Forces Claude to distinguish between things it knows well and things it\'s pattern-matching on. Claims rated 5-6 are where hallucinations hide.'
      },
      {
        name: 'The Source Challenge',
        prompt: `For each factual claim in your response, tell me whether this comes from well-established knowledge, reasonable inference, or whether you're uncertain. I'd rather have "I don't know" than a confident guess.`,
        why: 'Gives Claude explicit permission to say "I don\'t know" which reduces the incentive to fill gaps with plausible fiction.'
      },
      {
        name: 'The Echo Test',
        prompt: `Before answering, repeat back to me: (1) what you think I'm asking, (2) the constraints I've given you, and (3) any assumptions you're making. Let me correct anything before you proceed.`,
        why: 'Catches misunderstandings before they become hallucinated answers built on wrong premises.'
      },
      {
        name: 'The Cross-Examination',
        prompt: `Run the same question in a brand new conversation and compare the two answers. If they diverge on specific facts or numbers, the divergent claims are the ones most likely to be hallucinated.`,
        why: 'Hallucinated facts are typically non-deterministic - they change between conversations. Real knowledge is consistent.'
      },
      {
        name: 'The Adversarial Input Test',
        description: 'Deliberately give Claude wrong information and see if it pushes back or accepts it.',
        example: `Beyond's current activation rate is 35% (it's actually 5%). Given this strong activation, should we shift investment from onboarding to retention?`,
        why: 'Tests whether Claude critically evaluates your inputs or just works with whatever you provide. Claude will often accept wrong premises uncritically, which means YOUR context errors become ITS hallucinations.'
      }
    ],

    task: {
      instruction: `Run two experiments:

**Experiment 1:** Ask Claude a factual question about Beyond's market, product, or competitors where you KNOW the correct answer. Don't include the answer in your prompt. Evaluate Claude's response for accuracy. Then try adding the Confidence Demand technique and see if the accuracy or flagging improves.

**Experiment 2:** Deliberately feed Claude an incorrect fact about Beyond (wrong metric, wrong competitor claim, wrong user number) and see if it pushes back or builds on the wrong premise.

Document what you found. This exercise is designed to be a little unsettling - the goal is healthy skepticism.`,
      prompts: {
        pm_ic: `For Experiment 1, ask Claude about a metric, product feature, or market fact you know well. Good candidates: Beyond's pricing model, how BtM is calculated, what PriceLabs charges, or what our activation rate is.

For Experiment 2, try something like: "Beyond's biggest competitor PriceLabs has a 70% market share and charges $49.99/listing. Given their dominant position, how should Beyond compete?" (Neither number is accurate.) See if Claude accepts or challenges.`,

        pm_director: `For Experiment 1, ask Claude about a strategic or market-level claim - industry TAM, competitor positioning, or a market trend. Director-level hallucinations are more dangerous because they're harder to verify and shape bigger decisions.

For Experiment 2, try feeding Claude a plausible but wrong strategic premise: "Beyond has 60% market share in dynamic pricing for STR. Given our dominant position, what defensive strategies should we prioritize?" See whether Claude challenges the dominance framing or builds on it.`,

        design_ic: `For Experiment 1, ask Claude about a UX principle or design pattern you know well - progressive disclosure, Fitts's Law, Nielsen heuristics - and see if it explains them accurately. Then ask about a Beyond-specific design pattern and compare confidence levels.

For Experiment 2, try: "Our user research shows that hosts prefer seeing 15+ configuration options on the pricing settings page because it gives them a sense of control. How should I design for this preference?" (This contradicts Beyond's actual philosophy and likely user behavior.) See if Claude pushes back.`,

        design_lead: `For Experiment 1, ask Claude about design org structures, design leadership practices, or industry benchmarks. These are areas where Claude tends to sound confident but may be synthesizing from inconsistent sources.

For Experiment 2, try: "My design team's NPS from our product partners is consistently 95+ and they report no friction in our collaboration process. Given this, should I focus my Q2 goals on scaling the team rather than improving our processes?" See if Claude accepts the premise or probes whether 95+ NPS might indicate insufficient challenge.`
      }
    },

    coachContext: {
      evaluationCriteria: [
        'Did they actually run both experiments (factual test + adversarial input)?',
        'Did they catch a real hallucination or inaccuracy in Experiment 1?',
        'In Experiment 2, did they observe whether Claude accepted or challenged the wrong premise?',
        'Did they reflect on what this means for how they should use Claude in their work?',
        'Did they try at least one of the accuracy techniques (Confidence Demand, Source Challenge, Echo Test)?'
      ],
      seniorityNote: `For Director-level roles, emphasize that strategic-level hallucinations are more dangerous because they're harder to verify and inform bigger decisions. For IC roles, emphasize that execution-level hallucinations (wrong metrics, wrong feature behaviors) can waste sprint cycles.`,
      exampleFeedback: {
        strong: `This is exactly the kind of healthy skepticism that makes you an effective AI user. Your observation that Claude confidently stated a wrong market share number in Experiment 1 is a perfect example of why the Confidence Demand technique matters. And the Experiment 2 result - Claude building a strategy on your false premise without questioning it - is the most important lesson: Claude will work with bad inputs as confidently as good ones. Your job is to be the quality filter. The habit to build: any time Claude states a specific number or fact that matters to your decision, ask "confidence?" before acting on it.`,
        needsWork: `You ran the experiments, but your takeaway of "I should be careful with Claude's answers" is too generic. Be specific: which types of claims are most likely to be hallucinated? (Specific numbers, competitor facts, and market statistics are high-risk. General frameworks and reasoning approaches are lower-risk.) And you didn't try any of the accuracy techniques. Run the Confidence Demand technique on your Experiment 1 question and see if Claude flags the same claim it confidently stated before. The difference is often dramatic.`
      }
    }
  },

  // ──────────────────────────────────────────────────────────
  // EXERCISE 2.5 - Word Choice is Everything
  // ──────────────────────────────────────────────────────────
  {
    id: '2.5',
    title: 'Word Choice is Everything',
    subtitle: 'One word can change everything',
    duration: '25 min',
    description: `A single word in your prompt can completely change Claude's output. Not the meaning, not the structure - a single word. This is one of the most counterintuitive and powerful things about working with LLMs.

The word you choose signals to Claude what kind of thinking you want. "List" produces a checklist. "Brainstorm" produces creative ideas. "Prioritize" produces a ranked framework. "Critique" produces adversarial analysis. Same topic, same context - totally different outputs.

Once you develop a feel for this, you can dial in exactly the kind of thinking you need.`,

    wordPairs: [
      {
        category: 'Action words',
        pairs: [
          { word: 'List', produces: 'A flat enumeration - comprehensive but undifferentiated', example: 'List reasons hosts override prices' },
          { word: 'Prioritize', produces: 'A ranked analysis with reasoning for the ordering', example: 'Prioritize the reasons hosts override prices by business impact' },
          { word: 'Brainstorm', produces: 'Creative, divergent ideas - quantity over quality', example: 'Brainstorm why hosts override prices' },
          { word: 'Diagnose', produces: 'Root-cause analysis with causal reasoning', example: 'Diagnose why hosts override prices' }
        ]
      },
      {
        category: 'Thinking words',
        pairs: [
          { word: 'Explain', produces: 'An educational walkthrough - good for learning', example: 'Explain how BtM works' },
          { word: 'Convince', produces: 'Persuasive argument with evidence - good for stakeholder prep', example: 'Convince me that BtM is the right metric' },
          { word: 'Debate', produces: 'Both sides of an argument - good for understanding trade-offs', example: 'Debate whether BtM is the right metric' },
          { word: 'Challenge', produces: 'Adversarial pushback on the premise itself', example: 'Challenge whether BtM is the right metric' }
        ]
      },
      {
        category: 'Quality words',
        pairs: [
          { word: 'Good', produces: 'Satisfactory, meets basic expectations' },
          { word: 'Exceptional', produces: 'Raises the bar significantly, includes non-obvious insights' },
          { word: 'World-class', produces: 'Best-in-industry quality, referencing top practitioners' },
          { word: 'Adequate', produces: 'Meets minimum requirements, signals Claude can be brief' }
        ]
      },
      {
        category: 'Scope words',
        pairs: [
          { word: 'Summarize', produces: 'Compressed version preserving key points', example: 'Summarize the Owner Suite strategy' },
          { word: 'Distill', produces: 'The essential insight stripped of everything else', example: 'Distill the Owner Suite strategy to its core bet' },
          { word: 'Expand', produces: 'More detail and nuance on each point', example: 'Expand on the Owner Suite strategy' },
          { word: 'Synthesize', produces: 'Connecting multiple inputs into a new insight', example: 'Synthesize what our activation data, churn data, and customer interviews tell us about the Owner Suite strategy' }
        ]
      }
    ],

    task: {
      instruction: `Open the Prompt Playground in side-by-side mode. Take a prompt you'd normally write for your work, then change ONE key word and compare the outputs. Do this 3 times with different word swaps.

For example, start with "Explain why our activation rate is low" then swap "Explain" for "Diagnose." Same context, same question, dramatically different output.

Document the 3 word swaps and which version produced more useful output for your actual need.`,
      prompts: {
        pm_ic: `Try these word swaps on a real product question:
1. Swap an action word: "List the risks of [your feature]" vs. "Diagnose the risks of [your feature]"
2. Swap a thinking word: "Explain why [metric] is declining" vs. "Debate whether [metric] is actually declining or if we're measuring it wrong"
3. Swap a quality word: "Write a good experiment plan" vs. "Write a world-class experiment plan"

Notice which swap produces the biggest change in output quality and usefulness.`,

        pm_director: `Try these word swaps on a strategic question:
1. "Summarize our competitive position" vs. "Distill our competitive position to the one thing that matters most"
2. "Explain the trade-off between investing in activation vs. retention" vs. "Debate the trade-off..."
3. "List our Q2 priorities" vs. "Prioritize our Q2 bets by expected impact on NRR"

At the director level, "distill" and "synthesize" are often more valuable than "explain" or "list" because they force Claude to do the analytical work, not just the organizational work.`,

        design_ic: `Try these word swaps on a design question:
1. "List the usability issues in [your flow]" vs. "Diagnose the usability issues..."
2. "Explain this design pattern" vs. "Critique this design pattern for Beyond's use case"
3. "Brainstorm alternatives to [your current design]" vs. "Prioritize alternatives to [your current design] by user impact"

For design work, the shift from "brainstorm" (divergent) to "prioritize" (convergent) is especially powerful - it's the difference between ideation and decision-making.`,

        design_lead: `Try these word swaps on a design leadership question:
1. "Explain how to improve design quality on my team" vs. "Diagnose why design quality varies across my team"
2. "List design system investment options" vs. "Synthesize the case for design system investment from team velocity, design consistency, and engineering partnership data"
3. "Summarize our design strategy" vs. "Distill our design strategy to the single bet that matters most this quarter"

For design leaders, "synthesize" is your power word - it's what you do that ICs can't, and it's what Claude does best when given multiple inputs to connect.`
      }
    },

    coachContext: {
      evaluationCriteria: [
        'Did they run 3 actual side-by-side comparisons (not just theorize about word choice)?',
        'Did they identify which word swap produced the most meaningful output change?',
        'Are the word swaps relevant to their actual work (not just testing with toy examples)?',
        'Did they document a specific insight about which words they should use more often?',
        'Did they go beyond the suggested swaps and try their own word experiments?'
      ],
      seniorityNote: `For Director-level roles, emphasize "distill" and "synthesize" as high-leverage words for strategic thinking. For IC roles, emphasize the action word spectrum (list vs. brainstorm vs. prioritize vs. diagnose) as the most impactful for daily work.`,
      exampleFeedback: {
        strong: `This is the kind of precision that separates good prompters from great ones. Your observation that swapping "explain" for "diagnose" completely changed the output from an educational overview to a root-cause analysis is exactly right. And the quality word swap ("good" to "exceptional") is subtle but real - Claude literally raises its internal quality threshold. Build this into a habit: before hitting enter, scan your prompt for the key action word and ask "is this the right verb for what I actually need?"`,
        needsWork: `You ran the comparisons, which is great, but your word swaps were too similar to produce a dramatic difference. "List" vs. "describe" won't show you much. Try more extreme swaps: "list" vs. "diagnose" or "explain" vs. "challenge." The goal is to see how a single word can produce a fundamentally different type of thinking, not just a different format.`
      }
    }
  },

  // ──────────────────────────────────────────────────────────
  // EXERCISE 2.6 - Capstone: Your Conversation Playbook
  // ──────────────────────────────────────────────────────────
  {
    id: '2.6',
    title: 'Your Conversation Playbook',
    subtitle: 'Documenting your AI operating rules',
    duration: '25 min',
    isCapstone: true,
    description: `Everything you've learned in Level 2 comes together here. You're going to create a personal "Conversation Playbook" - a reference document that captures your best practices for working with Claude, customized to your role and workflows.

This isn't an exercise document you'll throw away. It's a living reference you should keep in your Claude Project folder and update as you get better. Think of it as your personal AI operating manual.`,

    template: {
      sections: [
        {
          title: 'My Top Prompt Patterns',
          instructions: 'Document your 5 best go-to prompt structures from Levels 1-2. For each: the pattern name, when to use it, and a template you can quickly adapt.',
        },
        {
          title: 'My Context Rules',
          instructions: 'Based on Exercise 2.1, write your personal rules for the Goldilocks Zone. What context always gets included? What gets left out? How do you decide?',
        },
        {
          title: 'My Conversation Hygiene Rules',
          instructions: 'Based on Exercise 2.3, document when you start fresh, when you continue, and when something gets a Project folder. Include specific triggers.',
        },
        {
          title: 'My Accuracy Checklist',
          instructions: 'Based on Exercise 2.4, list the techniques you\'ll use to prevent and catch hallucinations. Which types of claims do you always verify?',
        },
        {
          title: 'My Power Words',
          instructions: 'Based on Exercise 2.5, document the word swaps that made the biggest difference. Which verbs do you default to, and which should you use more?',
        }
      ]
    },

    task: {
      instruction: `Build your Conversation Playbook using Claude (ideally in your newly created Project folder from Level 1). Include all 5 sections above with specific, practical content - not generic advice, but YOUR rules based on YOUR experience in the exercises.

Paste the finished playbook below. The AI Coach will review it for completeness, specificity, and role-relevance.`,
      prompts: {
        pm_ic: `Your playbook should reflect PM craft - the prompt patterns that help you write better specs, design sharper experiments, and analyze customer data more effectively. Your "Power Words" section should focus on the action and thinking verbs most relevant to your daily work (diagnose, prioritize, synthesize, challenge).

Build this in your Claude Project folder so it's always available as a reference.`,

        pm_director: `Your playbook should reflect product leadership - the patterns that help you pressure-test strategy, align stakeholders, and make better prioritization decisions. Your "Context Rules" section is especially important since your prompts naturally involve more context (multiple teams, stakeholder dynamics, business metrics).

Consider including a "Stakeholder Communication" section: how you use Claude to calibrate messages for different audiences (board, engineering, customers, team).`,

        design_ic: `Your playbook should reflect design craft - the patterns that help you get sharper critique, explore design alternatives, and synthesize research. Your "Accuracy Checklist" should specifically address design-related hallucinations (Claude suggesting UI patterns that sound right but don't match your product's constraints or design system).

Include a note on how you use Claude for design work specifically - where it helps most (critique, copy, research synthesis) vs. where you rely on other tools (visual design, prototyping).`,

        design_lead: `Your playbook should reflect design leadership - the patterns that help you make team decisions, present design strategy, and coach your designers. Your "Conversation Hygiene Rules" are critical since you likely have many different conversation types (team coaching, strategy work, stakeholder prep, design review prep).

Consider including a "Team Coaching" section: prompt patterns you could share with your designers to level up their own AI usage.`
      }
    },

    assessment: {
      questions: [
        {
          question: 'You\'re 18 messages into a Claude conversation about a PRD. Claude starts giving responses that contradict what it said earlier. What should you do?',
          options: [
            'Keep going and correct Claude each time',
            'Ask Claude to summarize the key conclusions, then start a fresh conversation with that summary as context',
            'Delete the conversation and start over from scratch',
            'Switch to a different AI model'
          ],
          correct: 1,
          explanation: 'The "summarize and bridge" technique preserves your work while giving Claude a fresh context. Starting over from scratch loses all the thinking. Correcting Claude repeatedly in a degraded conversation just adds more context that makes it worse.'
        },
        {
          question: 'Claude gives you a market analysis stating "PriceLabs has 60% market share and growing." You\'re not sure if this is accurate. What\'s the best approach?',
          options: [
            'Trust it - Claude is usually right about market data',
            'Ask Claude to rate its confidence in that claim and explain its reasoning',
            'Ignore the specific number and focus on the qualitative analysis',
            'Stop using Claude for market analysis'
          ],
          correct: 1,
          explanation: 'The Confidence Demand technique forces Claude to distinguish between well-established facts and pattern-matched guesses. If Claude rates its confidence at 4/10, you know to verify. Ignoring numbers entirely wastes useful analysis; trusting blindly is dangerous.'
        },
        {
          question: 'You want Claude to help you evaluate whether a feature idea justifies Beyond\'s premium pricing. Which word produces the most useful output?',
          options: [
            '"Explain whether this feature justifies our pricing"',
            '"Debate whether this feature justifies our pricing"',
            '"List reasons this feature justifies our pricing"',
            '"Summarize whether this feature justifies our pricing"'
          ],
          correct: 1,
          explanation: '"Debate" produces both sides of the argument, which is exactly what you need for a pricing justification decision. "Explain" is educational but one-sided. "List" gives you reasons but not reasoning. "Summarize" assumes a conclusion already exists.'
        }
      ],
      selfReflection: `What's the single biggest change you've made to how you prompt since starting NexusYou? And what's the one new word or technique from Level 2 that you'll use this week?`
    },

    coachContext: {
      evaluationCriteria: [
        'Does the playbook have all 5 sections with specific content (not placeholder text)?',
        'Are the prompt patterns based on their actual experience in the exercises (not copied from the examples)?',
        'Are the context rules specific and actionable (concrete triggers, not "it depends")?',
        'Does the accuracy checklist include specific claim types they\'ll verify?',
        'Is the playbook practical enough that they\'d actually reference it in daily work?',
        'Is the content role-appropriate (PM vs. Design, IC vs. Director)?'
      ],
      seniorityNote: `For Director-level roles, the playbook should include patterns for stakeholder communication and strategic analysis. For IC roles, it should include patterns for craft work and execution. Both should feel like a personal reference guide, not a generic best-practices document.`,
      exampleFeedback: {
        strong: `This is a playbook you'll actually use - and that's the whole test. Your "Power Words" section is especially sharp: you've identified specific word swaps for your most common prompt types and written them as quick-reference rules. Your conversation hygiene triggers are concrete ("after 15 messages on any topic, summarize and bridge"). And I like that your accuracy checklist focuses on the specific claim types that matter most for your work. Save this in your Project folder and revisit it in 2 weeks - you'll be surprised how much you've already internalized.`,
        needsWork: `The structure is there but most sections read like general advice rather than personal rules. "Use the COSTAR framework for complex prompts" is a Level 1 lesson recap, not a playbook entry. What I want to see: "When drafting a PRD, I use COSTAR with the Role set to [specific persona]. When getting design critique, I use CRIT with the Role set to [specific expert]." Make every entry specific to YOUR workflow. Also, your conversation hygiene section just says "start fresh when needed" - add the specific trigger (message count, quality degradation signal, topic change).`
      }
    },

    milestone: {
      message: `Welcome to Host status! You're no longer dabbling - you're running a real AI operation. Your context game is tight, you know when to start fresh, you can spot a hallucination at twenty paces, and you've got a playbook to prove it.`,
      dadJoke: `I asked Claude for a joke about context windows, but it forgot the punchline halfway through. Gerard says that one works better if you've experienced it. Which, after Level 2, you probably have.`,
      nextLevel: `Level 3: The Small Portfolio - where you'll discover Nexus-Product's toolkit and start building artifacts with real Beyond data. This is where it gets really fun.`
    }
  }
],
    assessment: {
      questions: [
        {
          question: 'You\'re 18 messages into a Claude conversation about a PRD. Claude starts giving responses that contradict what it said earlier. What should you do?',
          options: [
            'Keep going and correct Claude each time',
            'Ask Claude to summarize the key conclusions, then start a fresh conversation with that summary as context',
            'Delete the conversation and start over from scratch',
            'Switch to a different AI model'
          ],
          correct: 1,
          explanation: 'The "summarize and bridge" technique preserves your work while giving Claude a fresh context. Starting over from scratch loses all the thinking. Correcting Claude repeatedly in a degraded conversation just adds more context that makes it worse.'
        },
        {
          question: 'Claude gives you a market analysis stating "PriceLabs has 60% market share and growing." You\'re not sure if this is accurate. What\'s the best approach?',
          options: [
            'Trust it - Claude is usually right about market data',
            'Ask Claude to rate its confidence in that claim and explain its reasoning',
            'Ignore the specific number and focus on the qualitative analysis',
            'Stop using Claude for market analysis'
          ],
          correct: 1,
          explanation: 'The Confidence Demand technique forces Claude to distinguish between well-established facts and pattern-matched guesses. If Claude rates its confidence at 4/10, you know to verify. Ignoring numbers entirely wastes useful analysis; trusting blindly is dangerous.'
        },
        {
          question: 'You want Claude to help you evaluate whether a feature idea justifies Beyond\'s premium pricing. Which word produces the most useful output?',
          options: [
            '"Explain whether this feature justifies our pricing"',
            '"Debate whether this feature justifies our pricing"',
            '"List reasons this feature justifies our pricing"',
            '"Summarize whether this feature justifies our pricing"'
          ],
          correct: 1,
          explanation: '"Debate" produces both sides of the argument, which is exactly what you need for a pricing justification decision. "Explain" is educational but one-sided. "List" gives you reasons but not reasoning. "Summarize" assumes a conclusion already exists.'
        }
      ],
      selfReflection: `What's the single biggest change you've made to how you prompt since starting NexusYou? And what's the one new word or technique from Level 2 that you'll use this week?`
    },
    milestone: {
      message: `Welcome to Host status! You're no longer dabbling - you're running a real AI operation. Your context game is tight, you know when to start fresh, you can spot a hallucination at twenty paces, and you've got a playbook to prove it.`,
      dadJoke: `I asked Claude for a joke about context windows, but it forgot the punchline halfway through. Gerard says that one works better if you've experienced it. Which, after Level 2, you probably have.`,
      nextLevel: `Level 3: The Small Portfolio - where you'll discover Nexus-Product's toolkit and start building artifacts with real Beyond data. This is where it gets really fun.`
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

// ─── Role-specific prompt getter (4-track) ────────────────────────────────────
export function getTaskPrompt(exercise, userRole) {
  if (!exercise.task?.prompts) return null
  const p = exercise.task.prompts
  const role = (userRole || '').toLowerCase()

  // Design lead track
  if (role.includes('design director') || role.includes('lead product designer') || role.includes('design manager'))
    return p.design_lead || p.design_ic || p.design || p.default

  // Design IC track
  if (role.includes('design'))
    return p.design_ic || p.design || p.default

  // PM Director track
  if (role.includes('director') || role.includes('senior director') ||
      role.includes('principal') || role.includes('associate director') ||
      role.includes('head of') || role.includes('vp'))
    return p.pm_director || p.pm_ic || p.pm || p.default

  // PM IC track (default)
  return p.pm_ic || p.pm || p.default
}

// Grouped by track — used in Welcome.jsx <optgroup> select
export const ROLE_OPTIONS = {
  pm: [
    'Product Manager',
    'Senior Product Manager',
    'Associate Director (Group PM)',
    'Principal Product Manager',
    'Director',
    'Senior Director',
  ],
  design: [
    'Associate Product Designer',
    'Product Designer',
    'Senior Product Designer',
    'Lead Product Designer (IC track)',
    'Design Director',
  ],
}
