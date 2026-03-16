// ─── Slack Integration ───────────────────────────────────────────────────────
// Posts milestone messages to the #pde Slack channel via incoming webhooks.
// All posts are fire-and-forget. CORS note: Slack webhooks support CORS from browsers.

import { DAD_JOKES } from '../content/dadJokes.js'

const SLACK_WEBHOOK_URL = import.meta.env.VITE_SLACK_WEBHOOK_URL
const CHANNEL = import.meta.env.VITE_SLACK_CHANNEL || 'pde'

function getRandomJoke() {
  return DAD_JOKES[Math.floor(Math.random() * DAD_JOKES.length)]
}

async function postToSlack(blocks) {
  if (!SLACK_WEBHOOK_URL) {
    console.warn('[NexusYou] Slack webhook URL not configured (VITE_SLACK_WEBHOOK_URL)')
    return
  }

  try {
    await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ blocks }),
    })
  } catch (err) {
    // Silent failure - never block the user
    console.warn('[NexusYou] Slack post failed (non-blocking):', err.message)
  }
}

// ─── Registration announcement ───────────────────────────────────────────────
export async function postRegistration(user) {
  const buddyText = user.buddy
    ? `They tagged *${user.buddy}* as their learning partner!`
    : `They jumped in solo — respect the hustle.`

  const blocks = [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `🏠 *${user.name}* (${user.role}) just started *NexusYou* and is on the path to "Get Beyond Prompting"!\n\n${buddyText}\n\nWho's next? @product`,
      },
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: `Posted by NexusYou • #${CHANNEL}`,
        },
      ],
    },
  ]

  return postToSlack(blocks)
}

// ─── Level completion announcement ───────────────────────────────────────────
const LEVEL_EMOJIS = {
  1: '🏠',
  2: '🏡',
  3: '🏘️',
  4: '🏗️',
  5: '🏢',
  6: '🏰',
}

const LEVEL_MESSAGES = {
  1: "They've got their first property and a killer AI setup. The hustle is officially on.",
  2: "They're running a real AI operation now — context calibrated, conversation hygiene immaculate.",
  3: "Multiple tools, multiple properties. They're building a portfolio. Watch out.",
  4: "Sophisticated prompting techniques, LLM-as-judge, prompt libraries. This one's serious.",
  5: "OKRs, discovery frameworks, design systems — all supercharged by AI. A true AI-powered practitioner.",
  6: "BMAD method, agentic workflows, Claude Code — they've reached Destination Definer. The course is complete. 🎉",
}

export async function postLevelCompletion(user, levelId, levelTitle) {
  const emoji = LEVEL_EMOJIS[levelId] || '🏠'
  const message = LEVEL_MESSAGES[levelId] || `Another level down. Keep it up!`

  const blocks = [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `${emoji} *${user.name}* just completed *Level ${levelId}: ${levelTitle}* in NexusYou!\n\n${message}`,
      },
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: `Posted by NexusYou • #${CHANNEL}`,
        },
      ],
    },
  ]

  return postToSlack(blocks)
}

// ─── Certification announcement ───────────────────────────────────────────────
export async function postCertification(user) {
  const joke = getRandomJoke()

  // Celebration GIFs - curated safe-for-work options
  const celebrationGifs = [
    'https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif',
    'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif',
    'https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif',
  ]
  const gif = celebrationGifs[Math.floor(Math.random() * celebrationGifs.length)]

  const blocks = [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: '🎉 CERTIFICATION ALERT 🎉',
        emoji: true,
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*${user.name}* (${user.role}) is now a certified *NexusYou Portfolio Manager!*\n\nThey've gone from Part-Time Hustle to Destination Definer and are officially *Beyond Prompting.*\n\nGerard wanted me to share this one: _"${joke.text}"_`,
      },
    },
    {
      type: 'image',
      image_url: gif,
      alt_text: 'Celebration!',
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: `Congratulations! • Posted by NexusYou • #${CHANNEL}`,
        },
      ],
    },
  ]

  return postToSlack(blocks)
}
