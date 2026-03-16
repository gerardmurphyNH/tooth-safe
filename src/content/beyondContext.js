// ─── Beyond Product Context ──────────────────────────────────────────────────
// Shared context for AI Coach system prompts and course exercises.
// Sourced from the NexusYou Complete Context Document v2.

// ─── Strategic Context (system prompt fragment) ───────────────────────────────
export const BEYOND_STRATEGIC_CONTEXT = `
BEYOND COMPANY CONTEXT
======================
Beyond is a revenue intelligence platform for the short-term rental (STR) industry. It pioneered dynamic pricing for vacation rentals and is evolving into the "Revenue Operating System" for STR property managers and hosts.

Business model:
- Performance-based take rate: 1.0–1.5% of booking value (we win when customers win)
- ~25,000 self-serve individual hosts + enterprise property managers with contracted minimums
- Contracted enterprise customers represent ~75% of revenue

Key metrics and targets:
- BtM (Beat the Market): whether customers achieve +20% RevPAN vs their competitive set. Currently ~50% of listings hit this; target is 75%
- Activation: 6,000 host signups/month, only ~5% convert to active paying customers (target: 8–11%)
- In 2025: added ~17,000 host listings, netted only 1,329 after churn — a 95% attrition rate

THE FOUR STRATEGIC TENSIONS that shape every product decision:

1. THE PREMIUM PROBLEM: Beyond charges 3–5x more than PriceLabs ($19.99/listing/month, ~40–45% market share). Every feature either justifies or undermines that premium. Always ask: "Does this make the price gap feel worth it?"

2. THE ACTIVATION CRISIS: The single biggest leverage point. Any product work that improves the 5% → 8%+ conversion is high-value.

3. THE PLATFORM SHIFT: Evolving from "dynamic pricing tool" to "revenue operating system." Owner Suite (dashboards, projections, communication tools for property owners) is the next major growth vector.

4. TWO USER WORLDS: Self-serve hosts need simplicity and fast time-to-value. Enterprise PMs need portfolio-level control and owner communication tools.

Core product principles:
- Outcomes over output (don't measure success by features shipped)
- Discovery before delivery (validate before building)
- Fall in love with the problem, not the solution
- Make users feel in control without needing to control
- Simplicity is a feature (PriceLabs has 30+ customization options — Beyond's advantage is it works without expertise)
`.trim()

// ─── Domain Terms ─────────────────────────────────────────────────────────────
export const BEYOND_DOMAIN_TERMS = `
KEY TERMS
=========
- LAMEN: Listing-adjusted monthly enabled net — core unit for measuring active customer base
- BtM (Beat the Market): Performance metric — +20% RevPAN vs competitive set
- RevPAN: Revenue per available night
- PMC: Property Management Company (enterprise customer segment)
- PMS: Property Management System (software PMs use; Beyond integrates with these)
- Take rate: Revenue as % of booking value (1.0–1.5%)
- ABR (Auto Base Rates): Automated calculation of listing base prices
- Comp sets: Competitive sets used for BtM comparison
- PLG: Product-led growth (self-serve host acquisition motion)
- PQL: Product-qualified lead (usage signals indicating readiness for sales)
- HUR: Host utilization rate
- Market Trends: Free market data tool driving top-of-funnel signups
- Neyoba: External AI assistant for customers
- Nexus: Internal AI operating layer (Nexus-Product, Nexus-Sales, Nexus-CX)
- Owner Suite: Dashboard and communication tools for property owners
- GBV: Gross booking value
- NRR: Net revenue retention
- Channel listings: Listings actively connected and pushing prices to booking channels
`.trim()

// ─── PM Frameworks ────────────────────────────────────────────────────────────
export const BEYOND_PM_FRAMEWORKS = `
FRAMEWORKS THIS TEAM USES
=========================
- Opportunity Solution Trees (Teresa Torres): Map desired outcomes → opportunities → solutions → experiments
- RICE: Reach, Impact, Confidence, Effort scoring for prioritization
- Kano Model: Must-haves, performance features, delighters
- Jobs-to-Be-Done: Triggering event, desired progress, competing alternatives
- Cagan's Four Risks: Value, Usability, Feasibility, Viability
- Gibson Biddle DHM: Delight, Hard-to-copy, Margin-enhancing
- Shreyas Doshi LNO: Leverage, Neutral, Overhead task categorization
- Behavioral Design: Defaults, friction, progressive disclosure, Zeigarnik effect, loss aversion
`.trim()

// ─── Nexus Tool Catalog (by category) ─────────────────────────────────────────
export const NEXUS_TOOL_CATEGORIES = [
  {
    name: 'Customer & Account Research',
    useCase: 'Understanding a specific customer — their account, listings, usage, and business relationship with Beyond',
    tools: [
      { name: 'compass_get_customer_info', description: 'Comprehensive customer account info — first stop for any customer research' },
      { name: 'compass_get_user_listing_data', description: 'All listings data for a customer — portfolio size, types, geography' },
      { name: 'compass_get_user_lamen_by_date', description: 'Which listings were enabled on a specific date' },
      { name: 'compass_get_user_lamen_daily_evolution', description: 'Daily enabled listings over a date range — tracking customer health' },
      { name: 'compass_get_user_logins', description: 'Login history — engagement analysis, are they actually using the product?' },
      { name: 'compass_get_user_abr_interactions', description: 'Auto Base Rate interaction history' },
      { name: 'compass_get_user_base_price_changes', description: 'Base price change history — when and how customers override pricing' },
      { name: 'compass_get_user_availability', description: 'Listing availability between dates' },
    ],
  },
  {
    name: 'Performance & Revenue Analysis',
    useCase: 'Analyzing how customers or markets are performing against the BtM target',
    tools: [
      { name: 'compass_get_user_btm_detail', description: 'Beat the Market detail analysis — the big one, are customers outperforming their competitive set?' },
      { name: 'compass_get_listing_metrics', description: 'Listing metrics with aggregation — pricing behavior and performance at listing level' },
      { name: 'compass_get_user_reservations', description: 'Detailed individual reservations — booking patterns, revenue, channel mix' },
      { name: 'compass_get_reservations_summary', description: 'Aggregated reservation summaries — great for portfolio analysis' },
      { name: 'compass_get_reservations_pickup', description: 'Daily reservation pickup metrics — booking velocity and demand patterns' },
    ],
  },
  {
    name: 'Market & Geographic Data',
    useCase: 'Understanding markets, clusters, events, and geographic trends',
    tools: [
      { name: 'compass_get_market_info', description: 'Market IDs, names, countries, types — looking up markets by geography' },
      { name: 'compass_get_cluster_info', description: 'Cluster IDs, coordinates, occupancy rates — neighborhood-level data' },
      { name: 'compass_get_market_events', description: 'Events impacting pricing and demand (conferences, festivals, weather)' },
    ],
  },
  {
    name: 'Product Analytics (PostHog)',
    useCase: 'Understanding product usage, feature adoption, experiments, and user behavior',
    tools: [
      { name: 'posthog__query-run', description: 'Execute HogQL queries — most flexible analytics tool, custom analysis' },
      { name: 'posthog__insight-get', description: 'Get a specific saved insight — checking dashboards' },
      { name: 'posthog__insights-get-all', description: 'List all insights — discovering what analytics already exist' },
      { name: 'posthog__experiment-get', description: 'Get experiment details — reviewing A/B test configuration' },
      { name: 'posthog__experiment-results-get', description: 'Get experiment results with all metrics — analyzing A/B test outcomes' },
      { name: 'posthog__experiment-get-all', description: 'List all experiments — what tests are running' },
      { name: 'posthog__feature-flag-get-all', description: 'List feature flags — understanding what\'s being gated/rolled out' },
      { name: 'posthog__survey-stats', description: 'Survey response statistics — analyzing in-product survey engagement' },
      { name: 'posthog__event-definitions-list', description: 'List tracked events — understanding what\'s instrumented' },
      { name: 'posthog__cohorts-list', description: 'List user cohorts — finding pre-defined user segments' },
      { name: 'posthog__error-tracking-issues-list', description: 'List error tracking issues — monitoring product stability' },
    ],
  },
  {
    name: 'Support & Customer Feedback (Kustomer)',
    useCase: 'Understanding customer issues, support patterns, and product pain points',
    tools: [
      { name: 'kustomer_get_conversations', description: 'Support conversations with filtering — researching complaints by product area' },
      { name: 'kustomer_get_beyond_tree', description: 'Beyond Attribution Tree — categorizing support tickets by product area' },
      { name: 'kustomer_search', description: 'Search Beyond\'s public knowledge base — finding existing help documentation' },
      { name: 'compass_get_user_jira_issues', description: 'Jira feature requests for a customer — connecting feedback to product backlog' },
    ],
  },
  {
    name: 'Sales Intelligence (Gong)',
    useCase: 'Analyzing customer call recordings for product insights and competitive intelligence',
    tools: [
      { name: 'gong_get_calls', description: 'Retrieve Gong calls — finding relevant customer or sales calls' },
      { name: 'gong_get_call_transcript', description: 'Full call transcripts — deep dive into what customers actually said' },
      { name: 'gong_get_call_extensive', description: 'Transcript + metadata + Gong AI analysis — comprehensive call analysis' },
    ],
  },
  {
    name: 'Salesforce / CRM',
    useCase: 'Understanding the sales pipeline, account relationships, and enterprise context',
    tools: [
      { name: 'compass_get_salesforce_accounts', description: 'Account data from Salesforce — enterprise customer research' },
      { name: 'compass_get_salesforce_onboardings', description: 'Onboarding information — tracking enterprise customer onboarding' },
      { name: 'compass_get_salesforce_opportunities', description: 'Opportunity/deal data — pipeline and revenue forecasting' },
    ],
  },
  {
    name: 'Data Infrastructure',
    useCase: 'Direct database access and internal knowledge search',
    tools: [
      { name: 'pg_execute_sql', description: 'Execute read-only SQL queries — custom data pulls when other tools don\'t cover the need' },
      { name: 'pg_list_objects', description: 'List tables/views in a schema — exploring available data' },
      { name: 'dbt_get_model_descriptions', description: 'dbt model descriptions — understanding the data warehouse structure' },
      { name: 'tettra_search', description: 'Search internal knowledge base — finding internal documentation' },
    ],
  },
  {
    name: 'Sharing & Publishing',
    useCase: 'Publishing artifacts and sharing work with the team',
    tools: [
      { name: 'core_publish_artifacts', description: 'Publish HTML artifacts to Beyond Share — sharing dashboards and reports' },
      { name: 'core_search_artifacts', description: 'Search previously published artifacts — finding and referencing past work' },
    ],
  },
]

// ─── Role-Specific Tool Recommendations ───────────────────────────────────────
export const ROLE_TOOL_RECOMMENDATIONS = {
  pm: {
    daily: ['compass_get_customer_info', 'compass_get_user_btm_detail', 'compass_get_listing_metrics', 'posthog__query-run', 'kustomer_get_conversations', 'gong_get_call_transcript'],
    weekly: ['compass_get_salesforce_accounts', 'posthog__experiment-results-get', 'compass_get_market_events', 'tettra_search'],
    focus: 'Customer research workflows, performance analysis, experiment review, support pattern analysis, competitive intelligence from Gong calls',
  },
  design: {
    daily: ['posthog__query-run', 'posthog__insights-get-all', 'kustomer_get_conversations', 'kustomer_search'],
    weekly: ['posthog__survey-stats', 'posthog__experiment-results-get', 'compass_get_user_logins', 'gong_get_call_transcript'],
    focus: 'Usage pattern analysis, finding user pain points in support data, reviewing experiment results for UX impact, analyzing survey feedback, understanding engagement patterns',
  },
}

// ─── Tool Combos for Common Tasks ─────────────────────────────────────────────
export const TOOL_COMBOS = {
  'Customer health check': ['compass_get_customer_info', 'compass_get_user_btm_detail', 'compass_get_user_lamen_daily_evolution', 'compass_get_user_logins'],
  'Feature impact analysis': ['posthog__experiment-results-get', 'posthog__query-run', 'kustomer_get_conversations (filter by date range after launch)'],
  'Market opportunity research': ['compass_get_market_info', 'compass_get_market_events', 'compass_get_cluster_info', 'compass_get_listing_metrics'],
  'Churn investigation': ['compass_get_customer_info', 'compass_get_user_lamen_daily_evolution', 'compass_get_user_logins', 'kustomer_get_conversations', 'compass_get_user_jira_issues'],
  'Enterprise deal prep': ['compass_get_salesforce_accounts', 'compass_get_customer_info', 'gong_get_calls', 'compass_get_user_btm_detail'],
}

// ─── OKR One-Pager Template (Beyond standard format) ──────────────────────────
export const BEYOND_OKR_TEMPLATE = `
BEYOND OKR ONE-PAGER TEMPLATE
==============================
1. PROJECT OVERVIEW
   - Project Name:
   - Business Sponsor(s):
   - Project Owner:
   - Date Created:

2. QUICK DESCRIPTION
   A brief, 2-3 sentence summary of what this project is and why it matters.

3. BUSINESS HYPOTHESIS / GOALS
   What business problem does this solve? What is the expected impact? How long is expected payback?

4. ENGINEERING EFFORT (T-Shirt Size)
   Small (1-2 weeks) / Medium (3-6 weeks) / Large (6+ weeks)

5. MVP DEFINITION
   What is the minimum viable product or first iteration we can release to test this hypothesis?

6. NOT IN SCOPE
   What's explicitly not included in this phase?

7. KEY DEPENDENCIES
   What other teams, systems, or business requirements are required for success?

8. EXPECTED IMPACT
   Anticipated business or customer outcomes (revenue, engagement, cost savings, efficiency, etc.)

9. RISKS & OPEN QUESTIONS
   Biggest risks, concerns, or unanswered questions.
`.trim()

// ─── Compact system-prompt summary of Nexus tools (for AI Coach) ──────────────
export const NEXUS_TOOLS_SUMMARY = `
NEXUS-PRODUCT TOOL CATEGORIES
==============================
1. Customer & Account Research: compass_get_customer_info (start here), compass_get_user_lamen_daily_evolution, compass_get_user_logins, compass_get_user_btm_detail
2. Performance & Revenue: compass_get_user_btm_detail, compass_get_listing_metrics, compass_get_user_reservations, compass_get_reservations_summary
3. Market & Geographic: compass_get_market_info, compass_get_cluster_info, compass_get_market_events
4. Product Analytics (PostHog): posthog__query-run (most flexible), posthog__experiment-results-get, posthog__insights-get-all, posthog__survey-stats, posthog__cohorts-list
5. Support & Feedback (Kustomer): kustomer_get_conversations, kustomer_get_beyond_tree, compass_get_user_jira_issues
6. Sales Intelligence (Gong): gong_get_calls, gong_get_call_transcript, gong_get_call_extensive
7. Salesforce/CRM: compass_get_salesforce_accounts, compass_get_salesforce_opportunities, compass_get_salesforce_onboardings
8. Data Infrastructure: pg_execute_sql (custom SQL), dbt_get_model_descriptions, tettra_search (internal docs)
9. Sharing: core_publish_artifacts (publish to Beyond Share)

KEY TOOL COMBOS:
- Customer health check: compass_get_customer_info + compass_get_user_btm_detail + compass_get_user_lamen_daily_evolution + compass_get_user_logins
- Feature impact: posthog__experiment-results-get + posthog__query-run + kustomer_get_conversations
- Churn investigation: compass_get_customer_info + compass_get_user_lamen_daily_evolution + compass_get_user_logins + kustomer_get_conversations + compass_get_user_jira_issues
- Enterprise deal prep: compass_get_salesforce_accounts + compass_get_customer_info + gong_get_calls + compass_get_user_btm_detail
`.trim()
