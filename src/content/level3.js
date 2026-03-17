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

  // ──────────────────────────────────────────────────────────
  // EXERCISE 3.1 - Meet Your Toolkit
  // ──────────────────────────────────────────────────────────
  {
    id: '3.1',
    title: 'Meet Your Toolkit',
    subtitle: 'Discovering what Nexus-Product can do',
    duration: '25 min',
    description: `Nexus-Product is Beyond's internal MCP (Model Context Protocol) tooling layer that connects Claude Desktop to your company's data - Compass, Salesforce, PostHog, Kustomer, Gong, HubSpot, Slack, Jira, and more. It's like giving Claude a direct line into the systems you use every day.

Most people on the team either don't know these tools exist or have only scratched the surface. This exercise is about systematic discovery - understanding what's available so you can reach for the right tool at the right moment.

**To do this exercise, open Claude Desktop and make sure Nexus-Product is connected (you should see it in your MCP tools panel).**`,

    toolCategories: [
      {
        name: 'Customer & Account Research',
        description: 'Understanding a specific customer - who they are, how they use Beyond, and what their account looks like.',
        keyTools: [
          { tool: 'compass_get_customer_info', what: 'Full customer profile - the first stop for any customer research' },
          { tool: 'compass_get_user_listing_data', what: 'All listings for a customer - portfolio composition, property types, locations' },
          { tool: 'compass_get_user_lamen_daily_evolution', what: 'How a customer\'s enabled listings changed over time - great for spotting trends' },
          { tool: 'compass_get_user_logins', what: 'Login history - are they actually using the product?' },
        ],
        typicalWorkflow: 'Start with compass_get_customer_info to get the full picture, then drill into listings or login activity depending on your question.'
      },
      {
        name: 'Performance & Revenue',
        description: 'How customers or markets are performing - the data behind BtM, revenue, and pricing behavior.',
        keyTools: [
          { tool: 'compass_get_user_btm_detail', what: 'Beat the Market analysis - the most important performance metric' },
          { tool: 'compass_get_listing_metrics', what: 'Listing-level pricing and performance data with aggregation options' },
          { tool: 'compass_get_user_reservations', what: 'Individual reservation details - booking patterns, revenue, channel mix' },
          { tool: 'compass_get_reservations_summary', what: 'Aggregated reservation views by market, cluster, bedrooms, or listing' },
        ],
        typicalWorkflow: 'For a customer health check: compass_get_user_btm_detail first (are they beating the market?), then compass_get_listing_metrics for the details.'
      },
      {
        name: 'Market & Geography',
        description: 'Understanding markets, clusters, demand patterns, and events.',
        keyTools: [
          { tool: 'compass_get_market_info', what: 'Market details - IDs, names, countries, regions' },
          { tool: 'compass_get_cluster_info', what: 'Neighborhood-level data within markets' },
          { tool: 'compass_get_market_events', what: 'Events that impact demand - conferences, festivals, sports, weather' },
        ],
        typicalWorkflow: 'Use compass_get_market_info to find the market, compass_get_cluster_info for neighborhood detail, compass_get_market_events for demand drivers.'
      },
      {
        name: 'Support & Customer Feedback',
        description: 'What customers are asking about, complaining about, and struggling with.',
        keyTools: [
          { tool: 'kustomer_get_conversations', what: 'Support ticket history with filtering by customer, status, tags' },
          { tool: 'kustomer_get_beyond_tree', what: 'Beyond\'s support categorization tree - which product areas generate the most tickets' },
          { tool: 'kustomer_search', what: 'Search the public knowledge base for existing help articles' },
          { tool: 'compass_get_user_jira_issues', what: 'Jira feature requests and bugs associated with a customer' },
        ],
        typicalWorkflow: 'For discovery work: kustomer_get_beyond_tree to find which product area generates the most support load, then kustomer_get_conversations to read actual tickets.'
      },
      {
        name: 'Product Analytics (PostHog)',
        description: 'Feature adoption, user behavior, experiments, and usage patterns.',
        keyTools: [
          { tool: 'posthog__query-run', what: 'Run custom HogQL queries on product analytics data - the most flexible tool' },
          { tool: 'posthog__experiment-results-get', what: 'Get A/B test results with all metrics' },
          { tool: 'posthog__insights-get-all', what: 'Find existing saved insights and dashboards' },
          { tool: 'posthog__survey-stats', what: 'In-product survey response data' },
          { tool: 'posthog__feature-flag-get-all', what: 'Feature flags and rollout status' },
        ],
        typicalWorkflow: 'Start with posthog__insights-get-all to see what analysis already exists, then posthog__query-run for custom questions.'
      },
      {
        name: 'Sales Intelligence (Gong)',
        description: 'Customer call recordings - what customers actually say in their own words.',
        keyTools: [
          { tool: 'gong_get_calls', what: 'Find calls by customer, date, or other filters' },
          { tool: 'gong_get_call_transcript', what: 'Full call transcript - read what was actually said' },
          { tool: 'gong_get_call_extensive', what: 'Transcript plus Gong\'s own analysis and metadata' },
        ],
        typicalWorkflow: 'gong_get_calls to find relevant calls, then gong_get_call_transcript to read the actual conversation.'
      },
      {
        name: 'CRM & Sales Pipeline (Salesforce)',
        description: 'Enterprise accounts, deals, contacts, and onboarding status.',
        keyTools: [
          { tool: 'compass_get_salesforce_accounts', what: 'Account-level data from Salesforce' },
          { tool: 'compass_get_salesforce_opportunities', what: 'Deal pipeline and status' },
          { tool: 'compass_get_salesforce_contacts', what: 'Key stakeholders at customer accounts' },
          { tool: 'compass_get_salesforce_onboardings', what: 'Enterprise onboarding progress tracking' },
        ],
        typicalWorkflow: 'For enterprise deal prep: compass_get_salesforce_accounts for the account overview, then compass_get_salesforce_opportunities for deal specifics.'
      },
      {
        name: 'Data Infrastructure',
        description: 'Power user tools for direct database access and data model exploration.',
        keyTools: [
          { tool: 'pg_execute_sql', what: 'Run read-only SQL queries directly against the database' },
          { tool: 'dbt_get_model_descriptions', what: 'Understand the data warehouse structure - table descriptions and metadata' },
          { tool: 'tettra_search', what: 'Search Beyond\'s internal knowledge base' },
        ],
        typicalWorkflow: 'Use dbt_get_model_descriptions to find the right table, then pg_execute_sql for custom queries.'
      },
      {
        name: 'Publishing & Sharing',
        description: 'Share your work with the team.',
        keyTools: [
          { tool: 'core_publish_artifacts', what: 'Publish HTML artifacts to Beyond Share - shareable dashboards, reports, and visualizations' },
          { tool: 'core_search_artifacts', what: 'Find previously published artifacts' },
        ],
        typicalWorkflow: 'Build an artifact in Claude Desktop, then use core_publish_artifacts to get a shareable link for your team.'
      }
    ],

    task: {
      instruction: `**Do this in Claude Desktop with Nexus-Product connected.**

Step 1: Ask Claude Desktop to list all available tools in nexus-product. You can simply type: "List all the tools available in nexus-product and organize them by category."

Step 2: Pick the 5 tools most relevant to YOUR role and daily work. For each one, write a one-sentence description of when you'd use it.

Step 3: Come back here and paste your top 5 tools with descriptions.`,
      prompts: {
        pm_ic: `As a PM, your highest-value tools are probably in the Customer & Account Research and Performance categories. Think about your typical week: when do you need to look up a customer? When do you need to check how a feature is performing? When do you prepare for a customer meeting?

Focus on the tools that would replace your most common manual data pulls. If you find yourself regularly exporting CSVs from Compass or running the same Metabase query, there's likely a Nexus tool that does it faster.`,

        pm_director: `As a director, your highest-value tools span across categories - you need customer data, pipeline data, product analytics, AND competitive intelligence. Think about the questions that come up in your leadership meetings: portfolio health, deal progress, feature adoption, team-level metrics.

Pay special attention to the Salesforce tools and Gong tools - these power the enterprise intelligence work that directors do but ICs rarely touch.`,

        design_ic: `As a designer, your highest-value tools are probably in Product Analytics (PostHog), Support & Feedback (Kustomer), and Sales Intelligence (Gong). Think about your discovery and research workflows: when do you need to understand how users behave? When do you need to hear customer voice data?

The PostHog tools are especially powerful for design work - you can check feature adoption, analyze user flows, and see experiment results without waiting for a data team request.`,

        design_lead: `As a design leader, you need tools that give you a view across the product - not just one feature area. PostHog for product-wide usage patterns, Kustomer for cross-product support themes, and Gong for understanding how customers talk about the product holistically.

Also consider the Publishing tools (core_publish_artifacts) - as a design leader, being able to publish shareable dashboards and research summaries raises the visibility of your team's work.`
      }
    },

    coachContext: {
      evaluationCriteria: [
        'Did they actually run the tool listing in Claude Desktop (not just read the descriptions here)?',
        'Are their top 5 tools genuinely relevant to their role (not just the first 5 they saw)?',
        'Do the one-sentence descriptions show they understand when they\'d use each tool?',
        'Is there a mix of categories (not all from one category)?',
        'Did they identify tools they didn\'t know existed?'
      ],
      seniorityNote: `Director-level roles should include cross-category tools (Salesforce + PostHog + Gong). IC roles should have depth in their primary category (Customer Research for PMs, PostHog for Designers).`,
      exampleFeedback: {
        strong: `Great tool selection. You've picked tools that cover your actual workflow - customer research, performance analysis, and support data. I especially like that you included Gong call transcripts - most PMs underuse that tool, but hearing customers in their own words is some of the best discovery data available. One tool I'd add to your list: kustomer_get_beyond_tree. It gives you a bird's-eye view of which product areas generate the most support volume, which is gold for prioritization.`,
        needsWork: `Your tool list is a bit too concentrated in one category. You've picked 4 Compass customer tools and 1 PostHog tool. That's fine for deep customer research, but you're missing some high-value tools in other categories. Try adding a Gong tool (customer voice data is invaluable for PMs) and a Kustomer tool (support patterns reveal product pain points). A balanced toolkit means you can answer different types of questions without switching between systems.`
      }
    }
  },

  // ──────────────────────────────────────────────────────────
  // EXERCISE 3.2 - Your First Nexus Query
  // ──────────────────────────────────────────────────────────
  {
    id: '3.2',
    title: 'Your First Nexus Query',
    subtitle: 'Pulling real data with natural language',
    duration: '30 min',
    description: `Now that you know what tools are available, it's time to use them. The magic of Nexus-Product is that you don't need to know SQL, API syntax, or system-specific query languages. You just describe what you want in natural language and Claude figures out which tool to call and how.

This exercise is about building confidence with your first real data pulls. The goal: ask 3 different questions that require 3 different tools, and see real Beyond data come back.

**Do this entire exercise in Claude Desktop with Nexus-Product connected.**`,

    starterQueries: {
      pm: [
        {
          query: 'Look up customer information for [pick a customer you know]. What does their account look like?',
          toolUsed: 'compass_get_customer_info',
          whatYouLearn: 'How to pull a customer profile - the foundation for any account research'
        },
        {
          query: 'What\'s the Beat the Market performance for [that same customer]? Are they outperforming their competitive set?',
          toolUsed: 'compass_get_user_btm_detail',
          whatYouLearn: 'How to check the most important performance metric for any customer'
        },
        {
          query: 'Show me the support conversations for [that customer] from the last 3 months. What are they contacting us about?',
          toolUsed: 'kustomer_get_conversations',
          whatYouLearn: 'How to connect customer data with their support experience'
        },
        {
          query: 'What events are happening in [a market you care about] in the next 60 days that might affect demand?',
          toolUsed: 'compass_get_market_events',
          whatYouLearn: 'How to get market intelligence for pricing and demand analysis'
        }
      ],
      design: [
        {
          query: 'What are the most common support categories in Kustomer? Which product areas generate the most tickets?',
          toolUsed: 'kustomer_get_beyond_tree',
          whatYouLearn: 'How to find product pain points from support data - great for prioritizing design improvements'
        },
        {
          query: 'Show me all the PostHog dashboards that exist for [your product area]. What metrics is the team already tracking?',
          toolUsed: 'posthog__dashboards-get-all / posthog__insights-get-all',
          whatYouLearn: 'How to discover existing analytics before building new ones'
        },
        {
          query: 'Are there any active experiments running right now? What\'s being tested and what are the results so far?',
          toolUsed: 'posthog__experiment-get-all / posthog__experiment-results-get',
          whatYouLearn: 'How to check experiment status - useful for designers who need to understand what\'s in-flight'
        },
        {
          query: 'Find recent Gong calls with [a customer or account you\'re curious about]. What topics came up?',
          toolUsed: 'gong_get_calls / gong_get_call_transcript',
          whatYouLearn: 'How to access real customer voice data for discovery and design research'
        }
      ]
    },

    task: {
      instruction: `**In Claude Desktop with Nexus-Product connected:**

Run at least 3 queries from the starter list above (or write your own). For each query:
1. Note which tool(s) Claude used to answer it
2. Write down one thing you learned from the data that you didn't know before
3. Write a follow-up question you'd want to ask based on what you found

Come back here and document your 3 queries, what you found, and your follow-up questions.`,
      prompts: {
        pm_ic: `Run 3 queries that would actually help your current work. Good starters:
1. Look up a customer you're meeting with this week or a customer who recently churned
2. Check BtM performance for a customer segment you own
3. Pull support tickets for your product area to find pain points

The follow-up question matters most: good PMs don't stop at the first answer. "This customer has 200 listings but only 80 enabled - can you show me when the other 120 were disabled and what happened around that time?" is the kind of chained question that turns data into insight.`,

        pm_director: `Run 3 queries that give you a portfolio view:
1. Pull Salesforce account data for your top enterprise customers
2. Check performance metrics across a market or customer segment
3. Look at support ticket volume trends for your product areas

Think about the questions you ask in your weekly leadership meetings. Can Nexus answer any of them faster than your current workflow? That's where the real time savings are.`,

        design_ic: `Run 3 queries focused on understanding users:
1. Pull the support categorization tree to find the top user pain points
2. Check what experiments are running (or recently finished) in your product area
3. Look at PostHog data for a feature you designed - how is it actually being used?

For designers, the support data and experiment results are gold mines. You're hearing directly from users about what's not working, and seeing quantitative evidence of how design changes impact behavior.`,

        design_lead: `Run 3 queries that inform your design strategy:
1. Pull support ticket data across your team's product areas - which areas generate the most friction?
2. Check PostHog surveys or feedback for design-relevant insights
3. Look at experiment results for recent design changes - did they actually move the metrics?

As a design leader, these queries help you make data-informed decisions about where to invest your team's effort. If one product area generates 3x the support tickets, that's a design quality signal.`
      }
    },

    coachContext: {
      evaluationCriteria: [
        'Did they run 3 actual queries in Claude Desktop (not hypothetical ones)?',
        'Did they note which tools were used (showing awareness of the tool ecosystem)?',
        'Did they find at least one genuinely new insight from the data?',
        'Are their follow-up questions good (do they go deeper rather than just asking a different question)?',
        'Were the queries relevant to their actual work (not just testing random tools)?'
      ],
      seniorityNote: `Director-level queries should be broader (portfolio, pipeline, cross-team) while IC queries should be deeper (specific customer, specific feature, specific metric). Both should produce insights they didn't have before the query.`,
      exampleFeedback: {
        strong: `Three solid queries that are clearly connected to your actual work. The best part is your follow-up questions - "show me when the listings were disabled and what happened around that time" is exactly the kind of chained thinking that turns a data lookup into an investigation. That's the shift from "using a tool" to "doing analysis with a tool." One suggestion: try combining data from two different tools in your next session. For example, pull customer info from Compass AND their support history from Kustomer in the same conversation - Claude can connect the dots across systems.`,
        needsWork: `You ran the queries, which is great, but they're all from the same category. Try branching out: if you ran 3 customer lookups, try a PostHog query or a Kustomer support search next. Also, your follow-up questions are really just new queries rather than deeper digs. Instead of "now look up a different customer," try "why might this customer's BtM score be low? Can you check their price override frequency and compare it to their comp set?"`
      }
    }
  },

  // ──────────────────────────────────────────────────────────
  // EXERCISE 3.3 - From Data to Insight
  // ──────────────────────────────────────────────────────────
  {
    id: '3.3',
    title: 'From Data to Insight',
    subtitle: 'The "so what?" follow-up',
    duration: '25 min',
    description: `Pulling data is step one. The real value is what you do with it. This exercise is about developing the habit of never stopping at the data - always asking "so what?" and "what should we do about this?"

The technique is simple: after any Nexus data pull, immediately ask Claude to analyze the results. Don't just read the numbers - ask Claude to interpret them, find patterns, and suggest actions. This is where the thought-partner mode from Level 1 meets real data.`,

    technique: {
      name: 'The "So What?" Chain',
      steps: [
        { step: 1, action: 'Pull the data', example: 'Show me BtM performance for customers in the [market] market' },
        { step: 2, action: 'Ask for patterns', example: 'What patterns do you see? Which customers are underperforming and is there a common factor?' },
        { step: 3, action: 'Ask for implications', example: 'So what? What does this mean for our product strategy in this market?' },
        { step: 4, action: 'Ask for actions', example: 'Based on this analysis, what are the 3 highest-leverage product changes we could make?' },
      ],
      keyInsight: 'Each step builds on the previous one. By step 4, Claude has the data, the patterns, and the strategic context to make genuinely useful recommendations. Skipping straight to step 4 without the data foundation produces generic advice.'
    },

    combinationQueries: {
      description: 'The most powerful analyses combine data from multiple tools. Here are real Beyond workflows:',
      examples: [
        {
          name: 'Customer Health Check',
          tools: ['compass_get_customer_info', 'compass_get_user_btm_detail', 'compass_get_user_lamen_daily_evolution', 'compass_get_user_logins'],
          prompt: 'Give me a complete health check for [customer]. Pull their account info, BtM performance, listing enablement trend, and login activity. Then assess: is this customer healthy, at risk, or already churning? What signals are you seeing?',
          whyItWorks: 'No single metric tells the full story. A customer might have great BtM but declining logins (losing engagement), or growing LAMEN but poor BtM (adding listings but not performing). The combination reveals the real picture.'
        },
        {
          name: 'Feature Impact Investigation',
          tools: ['posthog__experiment-results-get', 'kustomer_get_conversations', 'posthog__query-run'],
          prompt: 'We recently launched [feature]. Pull the experiment results if there was an A/B test, check Kustomer for any support tickets mentioning it, and look at PostHog for usage patterns. Then assess: is this feature working as intended? What should we adjust?',
          whyItWorks: "Experiment results tell you IF something worked. Support tickets tell you what's confusing. Usage patterns tell you HOW people are actually using it. Together they give you a complete post-launch picture."
        },
        {
          name: 'Churn Investigation',
          tools: ['compass_get_customer_info', 'compass_get_user_lamen_daily_evolution', 'compass_get_user_logins', 'kustomer_get_conversations', 'compass_get_user_jira_issues'],
          prompt: 'Investigate why [customer] might be churning. Check their account status, listing enablement trend over the last 6 months, login frequency, support tickets, and any Jira issues they have filed. Then give me your assessment: what happened and could we have caught this earlier?',
          whyItWorks: 'Churn is rarely caused by one thing. This multi-tool investigation usually reveals a narrative: declining logins, then support tickets about a specific issue, then listings being disabled one by one.'
        }
      ]
    },

    task: {
      instruction: `**In Claude Desktop with Nexus-Product connected:**

Pick one of the combination query workflows above (or design your own multi-tool investigation). Run the full "So What?" chain: pull the data, ask for patterns, ask for implications, ask for actions.

Come back here and document:
1. What question you investigated
2. Which tools were used
3. The insight that surprised you
4. The action you'd recommend based on the analysis`,
      prompts: {
        pm_ic: `The Customer Health Check and Churn Investigation workflows are probably the most immediately useful for your work. Pick a customer you have a meeting with soon, or one you're worried about, and run the full investigation.

The best version of this exercise: find something in the data you didn't expect, then dig one level deeper. "Their BtM score dropped in January - can you check what changed? Did they add new listings, change their pricing overrides, or did the market shift?"`,

        pm_director: `Try the combination query at portfolio scale: instead of one customer, ask about a segment. "Show me the health metrics for our top 20 contracted customers by GBV. Flag anyone with declining LAMEN, declining BtM, or declining logins."

Director-level insight comes from patterns across customers, not individual cases. The "So What?" chain for you should end at "what does this mean for our Q2 priorities?" not just "what should we do for this customer?"`,

        design_ic: `The Feature Impact Investigation workflow is your best bet. Pick a feature or design change your team recently shipped and run the full assessment.

For designers, the "So What?" chain should focus on behavior: "Users are clicking the button but not completing the flow - what's the friction point?" or "Support tickets mention confusion about [feature] - what specific aspect is confusing?"`,

        design_lead: `Run a cross-product investigation: "Pull support ticket volume by product area for the last quarter. Then check PostHog for feature adoption rates in the areas with the highest support load. Are the highest-friction areas also the lowest-adoption areas?"

This kind of analysis helps you make data-informed decisions about where to invest your design team's effort. If you can show that a design-led intervention reduced support volume by 30% in one area, that's the case for design investment in another.`
      }
    },

    coachContext: {
      evaluationCriteria: [
        'Did they run a multi-tool investigation (not just a single query)?',
        'Did they follow the "So What?" chain through to actions (not just data)?',
        'Did they find a genuinely surprising insight?',
        'Is the recommended action specific and actionable (not just "we should investigate further")?',
        'Did they combine data from multiple systems to build a more complete picture?'
      ],
      seniorityNote: `Director-level analyses should identify portfolio-level patterns and strategic implications. IC-level analyses should identify specific customer or feature-level insights with direct tactical actions.`,
      exampleFeedback: {
        strong: `This is excellent analytical work. You combined customer performance data with support history and found the narrative: this customer's BtM declined after they started overriding prices more aggressively, which coincided with a support ticket about a confusing new feature. That's the kind of multi-system insight that would take 30 minutes of manual data pulling, and you got it in one Claude conversation. The action recommendation is specific too - "redesign the override confirmation to show estimated BtM impact" is a real product improvement, not a vague suggestion.`,
        needsWork: `You pulled data from multiple tools, but the analysis stopped at "here are the numbers." The "So What?" chain is where the value lives. After getting BtM data, don't just report the score - ask Claude why it might be that score. "This customer's BtM is 12% - below the 20% threshold. Can you check their price override frequency and see if there's a correlation?" That follow-up question turns a data point into an insight.`
      }
    }
  },

  // ──────────────────────────────────────────────────────────
  // EXERCISE 3.4 - Build an Artifact
  // ──────────────────────────────────────────────────────────
  {
    id: '3.4',
    title: 'Build an Artifact',
    subtitle: 'From data to shareable deliverable',
    duration: '30 min',
    description: `Now that you can pull and analyze data, it's time to turn that analysis into something shareable. Claude can generate artifacts - standalone documents, dashboards, reports, and interactive tools - that you can share with your team.

This is where AI stops being a private productivity tool and starts being a team multiplier. A PM who can build a customer health dashboard in 15 minutes, or a designer who can synthesize research findings into a shareable report, is operating at a fundamentally different level.

**Key concept: core_publish_artifacts.** This Nexus-Product tool lets you publish any HTML artifact to Beyond Share and get a shareable URL. Your artifact goes from "in my Claude conversation" to "a link I can drop in Slack."`,

    artifactTypes: [
      {
        name: 'Data Summary Dashboard',
        description: 'A visual summary of key metrics for a customer, market, or product area.',
        suitableFor: 'Customer meeting prep, team standups, stakeholder updates',
        example: 'Pull BtM data for your top 10 customers and generate a color-coded health dashboard showing who is above/below threshold.'
      },
      {
        name: 'Research Synthesis Report',
        description: 'A structured summary of findings from support tickets, Gong calls, or survey data.',
        suitableFor: 'Discovery kickoffs, design reviews, sprint planning',
        example: 'Pull the last 50 support tickets for your product area, have Claude identify the top 5 themes, and generate a report with issue frequency, severity, and example quotes.'
      },
      {
        name: 'Competitive Intelligence Brief',
        description: 'A structured analysis comparing Beyond to competitors on specific dimensions.',
        suitableFor: 'Product strategy meetings, sales enablement, board prep',
        example: 'Combine Gong call transcripts where competitors are mentioned with market data to build a competitive positioning brief.'
      },
      {
        name: 'Customer Story Document',
        description: 'A narrative document combining account data, performance metrics, and support history into a cohesive customer story.',
        suitableFor: 'Executive reviews, churn prevention discussions, case studies',
        example: 'Run the full Customer Health Check from Exercise 3.3 and ask Claude to generate a one-page customer story document with the key findings and recommended actions.'
      }
    ],

    task: {
      instruction: `**In Claude Desktop with Nexus-Product connected:**

1. Pick one of the artifact types above (or invent your own)
2. Pull the relevant data using Nexus-Product tools
3. Ask Claude to generate the artifact
4. Use core_publish_artifacts to publish it to Beyond Share
5. Come back here and paste the Beyond Share link

The artifact should be something genuinely useful - something you'd actually share with your team or use in a meeting this week.`,
      prompts: {
        pm_ic: `Build an artifact that would actually save you time this week. Strong options:
- A customer health dashboard for an account you're presenting about
- A support ticket analysis showing the top pain points in your product area
- A reservation data summary for a customer meeting
- An experiment results report for a feature your team shipped

Ask Claude to format it as a clean, professional HTML page with Beyond's colors (#3bc1cc, #ee3968, #252f38) so it looks polished when you share it.`,

        pm_director: `Build an artifact that you'd share with your leadership team or in a cross-team meeting:
- A portfolio health dashboard across your top enterprise accounts
- A quarterly support trend report across your product areas
- A competitive intelligence summary combining Gong data and market analysis
- A pipeline health view combining Salesforce data with customer performance metrics

Director-level artifacts should tell a story, not just display numbers. Ask Claude to include narrative sections alongside the data.`,

        design_ic: `Build an artifact focused on user understanding:
- A user pain point report synthesizing support tickets for your product area
- A feature adoption analysis from PostHog showing how users interact with your recent designs
- A research synthesis combining Gong call themes with support ticket themes for your product area
- An experiment results summary for a design change your team tested

Design artifacts should be visual and scannable. Ask Claude to use charts, color-coding, and clear hierarchy so the artifact communicates at a glance.`,

        design_lead: `Build an artifact that elevates your team's impact:
- A cross-product design quality report showing support ticket volume by product area (proxy for UX friction)
- A design impact report showing experiment results from design-led initiatives
- A research dashboard aggregating user feedback themes across your team's product areas
- A design strategy artifact showing where design investment has the highest leverage based on data

This artifact should be something you could share at an all-hands or include in a design strategy presentation.`
      }
    },

    coachContext: {
      evaluationCriteria: [
        'Did they actually build and publish an artifact (not just describe what they would build)?',
        'Is the artifact genuinely useful (would they actually share it with their team)?',
        'Did it combine Nexus-Product data with Claude\'s analysis capabilities?',
        'Is the artifact well-formatted and professional-looking?',
        'Did they use core_publish_artifacts to get a shareable link?'
      ],
      seniorityNote: `Director-level artifacts should serve leadership communication purposes (portfolio views, strategic analyses). IC-level artifacts should serve working-level purposes (customer prep, design research, feature analysis).`,
      exampleFeedback: {
        strong: `This is a genuinely useful artifact. You've combined customer data with BtM performance in a way that tells a clear story at a glance. The color-coding (green/yellow/red) makes it immediately scannable, and the narrative section at the bottom connects the data to action items. This is the kind of thing you can drop into Slack before a meeting and save 15 minutes of "let me pull up the numbers." That's the multiplier effect of AI - not just doing your work faster, but creating artifacts that make your whole team faster.`,
        needsWork: `You built an artifact, which is the important thing, but it's essentially a data dump formatted as a table. Ask Claude to add analysis: "Highlight the top 3 most concerning patterns and add a one-paragraph interpretation for each." Also, consider your audience - if this is for a stakeholder meeting, it needs a summary section at the top. If it's for your team's working session, it needs more detail. The format should serve the audience.`
      }
    }
  },

  // ──────────────────────────────────────────────────────────
  // EXERCISE 3.5 - The Sharing Game
  // ──────────────────────────────────────────────────────────
  {
    id: '3.5',
    title: 'The Sharing Game',
    subtitle: 'Making your work visible',
    duration: '20 min',
    description: `The biggest unlock with AI-generated artifacts isn't making them - it's sharing them. A customer health dashboard that lives in your Claude conversation helps one person. That same dashboard published to Beyond Share and linked in a Slack thread helps the whole team.

This exercise is about building the sharing habit: creating something useful and getting it in front of people who can use it. It's also a chance to practice your buddy system - share with your NexusYou learning partner and get feedback.`,

    task: {
      instruction: `Take the artifact you built in Exercise 3.4 (or build a new one) and do two things:

1. **Share with your NexusYou buddy.** Send them the Beyond Share link and ask them one specific question about the artifact: "Is this useful for your work?" or "What's missing that would make this more useful?"

2. **Share with your team.** Post the artifact in your team's Slack channel with a brief note: what it shows, what tool you used to build it, and how long it took. This normalizes AI-generated artifacts on your team.

Come back here and document: what feedback did you get, and how would you improve the artifact based on that feedback?`,
      prompts: {
        pm_ic: `Share your artifact in your team's Slack channel with something like: "I built this [customer dashboard / support analysis / experiment report] using Nexus-Product in Claude Desktop. It took about 15 minutes. Would this be useful for our team meetings?"

The goal isn't just to share - it's to normalize using AI tools to create shareable work product. When your teammates see that you built something useful in 15 minutes, they'll want to know how.`,

        pm_director: `Share your artifact in a way that demonstrates the capability, not just the output. Something like: "Experimenting with Nexus-Product - built this portfolio health dashboard in one Claude Desktop session. Could we use something like this for our weekly leadership review? Feedback welcome."

Director-level sharing has an amplification effect: when team leads see you using AI tools for real work, it signals permission and priority.`,

        design_ic: `Share your artifact with your design team and your PM partner. For your PM partner: "Built this user pain point analysis using Kustomer data in Claude Desktop. Does this match what you're hearing from customers?" This grounds design decisions in data and builds credibility with your product partner.

For your design team: share the technique as much as the output. "I pulled support tickets via Nexus and asked Claude to identify UX friction patterns. Here's what I found."`,

        design_lead: `Share your artifact with your cross-functional partners (PM leads, engineering leads) and your design team. For cross-functional partners, frame it as design's contribution to data-informed decision-making. For your design team, frame it as a workflow they can adopt.

Consider creating a brief Slack post or team demo showing the end-to-end process: "I asked Claude to pull support data, analyze patterns, and generate this report. Total time: 20 minutes. Here's how you can do the same for your product area."`
      }
    },

    coachContext: {
      evaluationCriteria: [
        'Did they actually share the artifact (not just plan to)?',
        'Did they share with their buddy AND with their team?',
        'Did they frame the sharing in a way that others could learn from?',
        'Did they collect feedback and identify improvements?',
        'Did the sharing normalize AI usage on their team?'
      ],
      seniorityNote: `Director-level sharing should emphasize the organizational capability, not just the individual output. IC-level sharing should emphasize the practical technique and time savings.`,
      exampleFeedback: {
        strong: `Love that you shared this AND included the "how I built it" context. That's the difference between showing off and enabling your team. The feedback you got about adding a trend line is a great improvement - ask Claude to regenerate the artifact with that addition. Also, your buddy's observation that they want the same report for THEIR product area is the best possible outcome. You've just seeded an AI workflow that could spread across the team.`,
        needsWork: `Sharing with your buddy is a good start, but the team share is where the real leverage is. Even if the artifact isn't perfect, posting it in Slack with "built this in 15 minutes with Nexus tools, still rough but thought it was interesting" is more valuable than waiting until it's polished. The point isn't the artifact - it's normalizing the workflow.`
      }
    }
  },

  // ──────────────────────────────────────────────────────────
  // EXERCISE 3.6 - Capstone: Your Nexus Workflow
  // ──────────────────────────────────────────────────────────
  {
    id: '3.6',
    title: 'Your Nexus Workflow',
    subtitle: 'A real deliverable for your team',
    duration: '35 min',
    isCapstone: true,
    description: `The Level 3 capstone is about producing something genuinely useful - not a practice exercise, but a real deliverable that solves a real problem for your team. You'll combine everything from this level: tool discovery, data querying, multi-tool investigation, artifact creation, and sharing.

The deliverable should be something you'd be proud to present in a team meeting. If it's not, it's not done yet.`,

    task: {
      instruction: `**In Claude Desktop with Nexus-Product connected:**

Build and publish an artifact that:
1. Uses at least 3 different Nexus-Product tools
2. Combines data from multiple sources into a single coherent analysis
3. Includes both data and interpretation (not just numbers - narrative too)
4. Solves a real problem or answers a real question for your team
5. Is published to Beyond Share with a shareable link

Then share it with your team via Slack with a description of what it shows and how you built it.

Paste the Beyond Share link and your Slack message here.`,
      prompts: {
        pm_ic: `Build something your team actually needs. Ideas based on common PM workflows:
- **Meeting Prep Dashboard:** For your next customer meeting - combine customer info, BtM performance, recent support tickets, and any Jira issues into a single pre-meeting brief
- **Discovery Evidence Report:** For a hypothesis you're exploring - pull support data, usage analytics, and customer call themes into a structured evidence document
- **Sprint Retro Data Pack:** For your next retro - combine experiment results, support ticket trends, and feature adoption data for features shipped last sprint
- **Churn Risk Report:** For your product area - identify customers with declining engagement and flag early warning signs

Choose the one that creates the most value for your team this week.`,

        pm_director: `Build something that serves your leadership responsibilities:
- **Portfolio Health Dashboard:** Top customers by GBV with BtM, LAMEN trend, login activity, and support volume - a one-glance view of customer health across your portfolio
- **Quarterly Business Review Support:** Combine revenue data, performance metrics, support trends, and pipeline data into a quarterly narrative for your leadership meeting
- **Team Impact Report:** Pull experiment results, feature adoption data, and customer feedback across your teams to build a "what PDE delivered this quarter" summary
- **Risk Register:** Identify the top 5 customer or product risks based on data signals across Compass, Kustomer, and PostHog

This should be something you'd include in a leadership email or present at a team all-hands.`,

        design_ic: `Build something that elevates your design practice:
- **User Pain Point Map:** Combine support tickets, Gong call themes, and PostHog behavior data to map the biggest UX friction points in your product area
- **Design Impact Report:** Pull experiment results for design-led changes, support ticket trends before/after design updates, and feature adoption data to show design's measurable impact
- **Competitor Experience Teardown:** Combine Gong calls where competitors are mentioned with your own analysis to build an artifact documenting what users say about competitive UX
- **Research Synthesis:** If you have recent user interviews, combine those themes with quantitative data from PostHog and qualitative data from Kustomer into a comprehensive research report

Choose the one that would be most useful for your next design review or sprint planning session.`,

        design_lead: `Build something that demonstrates design's strategic value:
- **Design Investment Case:** Data-driven artifact showing where design attention has the highest leverage: support volume by area, adoption rates of designed vs. undesigned features, experiment results from design-led initiatives
- **Cross-Product UX Quality Report:** Support friction, task completion rates, and user feedback across all product areas your team covers - highlighting where design quality varies
- **Design Roadmap Prioritization:** Combine user pain point data, business impact metrics, and team capacity signals into a data-informed design roadmap for next quarter
- **Team Impact Showcase:** A shareable artifact that your design team can be proud of - showing the measurable impact of design work across the product

This should be something you could present to Beyond's leadership to demonstrate design's strategic contribution.`
      }
    },

    assessment: {
      questions: [
        {
          question: 'You need to prepare for a customer meeting in 30 minutes. Which Nexus-Product workflow is most efficient?',
          options: [
            'Run 5 separate queries for each piece of information you need',
            'Ask Claude to run a complete customer health check combining account info, BtM, LAMEN trends, and recent support tickets in one conversation',
            'Export data from Compass manually and build a spreadsheet',
            'Ask a colleague to brief you verbally'
          ],
          correct: 1,
          explanation: 'The multi-tool conversation is the whole point of Nexus-Product. Claude can chain compass_get_customer_info, compass_get_user_btm_detail, compass_get_user_lamen_daily_evolution, and kustomer_get_conversations in a single conversation and synthesize the findings. One conversation, multiple tools, complete picture.'
        },
        {
          question: 'You\'ve built a useful artifact in Claude Desktop. What\'s the most impactful thing to do next?',
          options: [
            'Save it to your local drive for reference',
            'Publish it to Beyond Share with core_publish_artifacts and share the link with your team via Slack',
            'Copy the text into a Google Doc',
            'Screenshot it and paste into a Slack message'
          ],
          correct: 1,
          explanation: 'core_publish_artifacts gives you a shareable URL that anyone at Beyond can access. This turns your individual analysis into a team resource. Slack sharing normalizes the workflow and invites others to try it. Screenshots lose interactivity; Google Docs add unnecessary friction.'
        },
        {
          question: 'What\'s the difference between a data pull and an insight?',
          options: [
            'An insight has more data points',
            'A data pull gives you numbers; an insight tells you what the numbers mean and what to do about them',
            'An insight is Claude\'s opinion; a data pull is facts',
            'There is no difference - they are the same thing'
          ],
          correct: 1,
          explanation: 'The "So What?" chain exists because data without interpretation is noise. A data pull says "BtM is 12%." An insight says "BtM is 12% because this customer overrides prices on high-demand dates, and here is what we can do about it." Always push past the numbers to the meaning.'
        }
      ],
      selfReflection: `Which Nexus-Product tool turned out to be most useful for your specific role? And what's one recurring task in your weekly workflow that you'll now do with Nexus instead of manually?`
    },

    coachContext: {
      evaluationCriteria: [
        'Did they use at least 3 different Nexus-Product tools?',
        'Does the artifact combine data with interpretation (not just a data dump)?',
        'Is it genuinely useful - would they actually present this to their team?',
        'Did they publish it and share it?',
        'Is the quality level professional enough for a team meeting?'
      ],
      seniorityNote: `Director-level capstones should demonstrate portfolio-level thinking and strategic narrative. IC-level capstones should demonstrate depth in their specific domain and practical utility for their immediate team.`,
      exampleFeedback: {
        strong: `This is a legitimate team deliverable, not a course exercise. You combined 4 different data sources into a coherent narrative, the artifact looks professional with clear visualization and a summary section, and you published it to Beyond Share. The fact that you shared it in Slack and got "can you build this for my customer too?" from a teammate is the ultimate validation. You've just created a workflow that could become a standard team practice. That's Level 3 done right.`,
        needsWork: `The artifact is functional but it reads like a data report rather than a strategic document. Try adding: (1) an executive summary at the top (2-3 sentences of "here's what this means"), (2) color-coding or visual hierarchy to highlight the most important findings, and (3) a "recommended actions" section at the bottom. Also, you used 2 tools rather than 3 - try pulling in one more data source (support tickets? Gong calls?) to make the analysis more complete.`
      }
    },

    milestone: {
      message: `You're now managing a Small Portfolio! You've gone from "what's Nexus?" to building and sharing real data artifacts with your team. That's a significant capability jump.`,
      dadJoke: `Why did the PM bring Nexus-Product to the customer meeting? Because it's better to have 9 data sources and be prepared than to wing it and hope nobody asks hard questions. Gerard admits this one is more "dad advice" than "dad joke."`,
      nextLevel: `Level 4: The Large Portfolio - where you'll master advanced prompting techniques, multi-step chains, prompt libraries, and the art of choosing the right model for the right task. Scale demands sophistication.`
    }
  }
],

  assessment: {
      questions: [
        {
          question: 'You need to prepare for a customer meeting in 30 minutes. Which Nexus-Product workflow is most efficient?',
          options: [
            'Run 5 separate queries for each piece of information you need',
            'Ask Claude to run a complete customer health check combining account info, BtM, LAMEN trends, and recent support tickets in one conversation',
            'Export data from Compass manually and build a spreadsheet',
            'Ask a colleague to brief you verbally'
          ],
          correct: 1,
          explanation: 'The multi-tool conversation is the whole point of Nexus-Product. Claude can chain compass_get_customer_info, compass_get_user_btm_detail, compass_get_user_lamen_daily_evolution, and kustomer_get_conversations in a single conversation and synthesize the findings. One conversation, multiple tools, complete picture.'
        },
        {
          question: 'You\'ve built a useful artifact in Claude Desktop. What\'s the most impactful thing to do next?',
          options: [
            'Save it to your local drive for reference',
            'Publish it to Beyond Share with core_publish_artifacts and share the link with your team via Slack',
            'Copy the text into a Google Doc',
            'Screenshot it and paste into a Slack message'
          ],
          correct: 1,
          explanation: 'core_publish_artifacts gives you a shareable URL that anyone at Beyond can access. This turns your individual analysis into a team resource. Slack sharing normalizes the workflow and invites others to try it. Screenshots lose interactivity; Google Docs add unnecessary friction.'
        },
        {
          question: 'What\'s the difference between a data pull and an insight?',
          options: [
            'An insight has more data points',
            'A data pull gives you numbers; an insight tells you what the numbers mean and what to do about them',
            'An insight is Claude\'s opinion; a data pull is facts',
            'There is no difference - they are the same thing'
          ],
          correct: 1,
          explanation: 'The "So What?" chain exists because data without interpretation is noise. A data pull says "BtM is 12%." An insight says "BtM is 12% because this customer overrides prices on high-demand dates, and here is what we can do about it." Always push past the numbers to the meaning.'
        }
      ],
      selfReflection: `Which Nexus-Product tool turned out to be most useful for your specific role? And what's one recurring task in your weekly workflow that you'll now do with Nexus instead of manually?`
    },

  milestone: {
      message: `You're now managing a Small Portfolio! You've gone from "what's Nexus?" to building and sharing real data artifacts with your team. That's a significant capability jump.`,
      dadJoke: `Why did the PM bring Nexus-Product to the customer meeting? Because it's better to have 9 data sources and be prepared than to wing it and hope nobody asks hard questions. Gerard admits this one is more "dad advice" than "dad joke."`,
      nextLevel: `Level 4: The Large Portfolio - where you'll master advanced prompting techniques, multi-step chains, prompt libraries, and the art of choosing the right model for the right task. Scale demands sophistication.`
    },
}
