// ─── Claude API Integration ─────────────────────────────────────────────────
// All Claude API calls go through this module.
// Note: For internal tools only. The API key is exposed in the client bundle.
// For public deployment, route these through a backend proxy (e.g., Vercel API routes).

import {
  BEYOND_STRATEGIC_CONTEXT,
  BEYOND_DOMAIN_TERMS,
  BEYOND_PM_FRAMEWORKS,
  NEXUS_TOOLS_SUMMARY,
} from '../content/beyondContext.js'

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages'
const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY
const MODEL = import.meta.env.VITE_CLAUDE_MODEL || 'claude-sonnet-4-6'

// ─── Shared fetch wrapper ────────────────────────────────────────────────────
async function callClaude({ systemPrompt, userMessage, maxTokens = 1024, model }) {
  if (!API_KEY) {
    throw new Error('VITE_ANTHROPIC_API_KEY is not set. Check your .env file.')
  }

  const response = await fetch(CLAUDE_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: model || MODEL,
      max_tokens: maxTokens,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.error?.message || `API error: ${response.status}`)
  }

  const data = await response.json()
  return data.content[0]?.text || ''
}

// ─── AI Coach Feedback ───────────────────────────────────────────────────────
// Called when a user submits an exercise and asks for AI Coach feedback.
export async function getCoachFeedback({ user, exercise, submission }) {
  const roleContext = user?.role || 'product team member'

  // Build evaluation criteria from new coachContext format or fall back to old format
  const coachCtx = exercise.coachContext
  const evaluationCriteria = coachCtx?.evaluationCriteria?.length
    ? `\nEVALUATION CRITERIA FOR THIS EXERCISE:\n${coachCtx.evaluationCriteria.map((c, i) => `${i + 1}. ${c}`).join('\n')}`
    : ''
  const seniorityNote = coachCtx?.seniorityNote
    ? `\nSENIORITY CONTEXT: ${coachCtx.seniorityNote}`
    : ''
  const feedbackExamples = coachCtx?.exampleFeedback
    ? `\nFEEDBACK TONE REFERENCE:\n- Strong submission sounds like: "${coachCtx.exampleFeedback.strong?.substring(0, 200)}"\n- Needs work sounds like: "${coachCtx.exampleFeedback.needsWork?.substring(0, 200)}"`
    : ''

  const systemPrompt = `You are the NexusYou AI Coach — a friendly, encouraging, and specific mentor helping Beyond's product and design team master AI for their actual work.

The user is a ${roleContext} at Beyond.

${BEYOND_STRATEGIC_CONTEXT}

${BEYOND_DOMAIN_TERMS}

${BEYOND_PM_FRAMEWORKS}

NEXUS-PRODUCT CONTEXT (for Level 3+ exercises):
${NEXUS_TOOLS_SUMMARY}
${evaluationCriteria}${seniorityNote}${feedbackExamples}

YOUR COACHING APPROACH:
1. Evaluate their submission honestly but encouragingly — be SPECIFIC, not vague
2. Give concrete, actionable improvement suggestions with examples tied to Beyond's real context
3. Connect feedback to their specific role — "a ${roleContext} would use this skill by..."
4. If their work is strong, explain exactly what works and why — don't just say "great job"
5. If it's weak, explain clearly what's missing and show them how to fix it with a Beyond-specific example
6. When relevant to Level 3+ exercises, suggest specific Nexus tools that would address their question
7. Occasionally end with a light dad joke or pun attributed to Gerard (1 in 4 responses, keep it brief)

When evaluating Nexus tool exercises: check whether they used specific tool names, whether their queries would actually work, and whether they're choosing the right tool for the job.

Tone: conversational, warm, direct — not corporate, not sycophantic, not condescending.
Length: 150-300 words. Short paragraphs. No bullet lists unless listing specific improvements.`

  const userMessage = `Exercise: ${exercise.title}

Exercise instructions: ${exercise.task?.instruction || exercise.task?.instructions || 'Help the user improve their prompting skills for this exercise.'}

User's submission:
${typeof submission === 'object' ? JSON.stringify(submission, null, 2) : submission}

Please give specific, constructive feedback on their work.`

  return callClaude({ systemPrompt, userMessage, maxTokens: 600 })
}

// ─── Adaptive Exercise Generation ───────────────────────────────────────────
// Generates a fresh practice exercise when user clicks "Need another round?"
export async function generatePracticeExercise({ user, currentExercise, difficulty = 'same' }) {
  const roleContext = user?.role || 'product team member'

  const systemPrompt = `You are the NexusYou AI Coach generating practice exercises for Beyond's product and design team.

You must return ONLY valid JSON — no markdown, no explanation, just the JSON object.`

  const userMessage = `Generate a new practice exercise for a ${roleContext} at Beyond (a dynamic pricing and revenue management company for short-term rentals).

The exercise should practice: ${currentExercise.skill || currentExercise.title}
Current exercise context: ${currentExercise.title} — ${currentExercise.intro?.substring(0, 200) || ''}
Difficulty: ${difficulty === 'harder' ? 'slightly harder than the previous' : 'similar difficulty to the previous'}

The exercise must feel immediately practical and tied to real product/design work at a company like Beyond. Not academic or abstract.

Return exactly this JSON structure:
{
  "exercise_title": "string — catchy, specific title",
  "instructions": "string — 2-3 paragraphs of clear instructions",
  "scenario": "string — a realistic Beyond product/design scenario that grounds the exercise",
  "example_good_output": "string — what a strong submission looks like (1-2 paragraphs)",
  "evaluation_criteria": ["criterion 1", "criterion 2", "criterion 3"]
}`

  const raw = await callClaude({ systemPrompt, userMessage, maxTokens: 800 })

  try {
    // Strip any accidental markdown code fences
    const cleaned = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    return JSON.parse(cleaned)
  } catch {
    // Fallback if JSON parse fails
    return {
      exercise_title: 'Bonus Practice Round',
      instructions: raw,
      scenario: '',
      example_good_output: '',
      evaluation_criteria: [],
    }
  }
}

// ─── Prompt Playground ───────────────────────────────────────────────────────
// Direct prompt interface for the Playground page.
// Returns the full response text.
// Optional `model` overrides the default model (for Exercise 4.3 model comparison).
export async function runPlaygroundPrompt(userPrompt, model) {
  const systemPrompt = `You are Claude, being used inside NexusYou — Beyond's AI skills training course. Respond naturally and helpfully.

Important teaching context: Users are practicing their prompting skills. Your responses should clearly demonstrate how prompt quality affects output quality:
- If a prompt is vague or generic → give a somewhat generic response (but still helpful)
- If a prompt is specific, contextual, and well-structured → give a detailed, high-quality, tailored response
- If a prompt is excellent → give an exceptional response that shows what's possible

This contrast IS the lesson. Don't explain that you're doing this — just let the quality difference speak for itself.`

  return callClaude({ systemPrompt, userMessage: userPrompt, maxTokens: 1200, model })
}

// ─── Dashboard AI Coach Chat ─────────────────────────────────────────────────
// Handles ongoing chat in the persistent AI Coach panel on the Dashboard.
export async function chatWithCoach({ user, messages, currentQuestion }) {
  const roleContext = user?.role || 'product team member'

  const systemPrompt = `You are the NexusYou AI Coach — a friendly, knowledgeable mentor helping ${user?.name || 'a Beyond team member'} (${roleContext}) master AI for their actual PM and design work.

${BEYOND_STRATEGIC_CONTEXT}

${BEYOND_DOMAIN_TERMS}

NEXUS-PRODUCT TOOLS (for course Level 3+ questions):
${NEXUS_TOOLS_SUMMARY}

You can answer questions about:
- Any NexusYou course content (Levels 1-6)
- Prompting techniques (COSTAR, CRIT, adversarial prompting, multi-step chains, LLM-as-judge)
- How to use Claude effectively for PM or Design work at Beyond
- Nexus-Product tools — which to use for a given task, how to query them, tool combinations
- Beyond product strategy, domain terms, frameworks
- Best practices for AI tool usage in a product team

Be conversational, specific, and practical. Keep answers focused — 2-4 short paragraphs max.
When someone asks a Nexus tool question, suggest specific tool names from the catalog above.
If they ask something unrelated to AI/product skills, gently redirect.`

  // Build conversation history for multi-turn chat
  const chatMessages = messages.map(m => ({
    role: m.role,
    content: m.content,
  }))
  chatMessages.push({ role: 'user', content: currentQuestion })

  if (!API_KEY) {
    throw new Error('VITE_ANTHROPIC_API_KEY is not set.')
  }

  const response = await fetch(CLAUDE_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 800,
      system: systemPrompt,
      messages: chatMessages,
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.error?.message || `API error: ${response.status}`)
  }

  const data = await response.json()
  return data.content[0]?.text || ''
}

// ─── Assessment Evaluation ───────────────────────────────────────────────────
// Evaluates a capstone or open-ended assessment submission.
export async function evaluateAssessment({ user, levelTitle, submission, rubric }) {
  const roleContext = user?.role || 'product team member'

  const systemPrompt = `You are the NexusYou AI Coach evaluating a level capstone submission from a ${roleContext} at Beyond.

${BEYOND_STRATEGIC_CONTEXT}

${BEYOND_DOMAIN_TERMS}

Be direct, encouraging, and specific. Ground your evaluation in Beyond's real context — reference BtM, activation, premium positioning, or domain terms when relevant.

Give a score out of 5 and explain it. Then give 2-3 concrete ways to improve.

Format your response as:
**Score: X/5**

[2-3 sentence evaluation of what works well, grounded in Beyond context]

**To strengthen this:**
- [specific improvement 1 — with a Beyond example if possible]
- [specific improvement 2]
- [specific improvement 3 if needed]

[Optional: brief encouraging close, with a Gerard dad joke 1 in 4 times]`

  const userMessage = `Level: ${levelTitle}
Evaluation rubric: ${rubric || 'Evaluate for quality, specificity, and practical applicability to product/design work at Beyond.'}

User's submission:
${submission}`

  return callClaude({ systemPrompt, userMessage, maxTokens: 500 })
}
