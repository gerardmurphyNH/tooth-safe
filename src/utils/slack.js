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
const REGISTRATION_HYPE = [
  "The journey from Part-Time Hustle to Destination Definer begins NOW. 🚀",
  "Six levels. Thirty-six exercises. One certified AI powerhouse in the making. Let's GO. 💪",
  "The PDE team just got a little more dangerous. Welcome to the club. 🔥",
  "From basic prompts to agentic workflows — this one's serious. Eyes on them. 👀",
  "Another one joins the AI revolution. Beyond's future is looking bright. ✨",
]

export async function postRegistration(user) {
  const hype = REGISTRATION_HYPE[Math.floor(Math.random() * REGISTRATION_HYPE.length)]
  const roleEmoji = user.role?.toLowerCase().includes('design') ? '🎨' : '📋'

  const blocks = [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: '🏠 New NexusYou learner just dropped in!',
        emoji: true,
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `${roleEmoji} *${user.name}* — *${user.role}* — just kicked off *NexusYou*.\n\n${hype}`,
      },
    },
    {
      type: 'section',
      fields: [
        { type: 'mrkdwn', text: '*Course:* NexusYou — Get Beyond Prompting' },
        { type: 'mrkdwn', text: '*Starting:* Level 1 — The Part-Time Hustle 🏠' },
      ],
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: `Who's next? Drop a 🏠 if you're leveling up too! • Posted by NexusYou`,
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

// ─── Signal (bug / feedback / beer) ──────────────────────────────────────────
export async function postSignal({ user, signalType, location, message }) {
  const configs = {
    bug: {
      header: '🐛 NexusYou Bug Report',
      label: 'Report',
    },
    feedback: {
      header: '💡 NexusYou Feedback',
      label: 'Feedback',
    },
    beer: {
      header: '🍺 Virtual Beer Alert!',
      label: null,
    },
  }

  const cfg = configs[signalType] || configs.feedback

  let blocks

  if (signalType === 'beer') {
    blocks = [
      {
        type: 'header',
        text: { type: 'plain_text', text: cfg.header, emoji: true },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*From:* ${user.name} (${user.role})\n\n${message || 'Just spreading good vibes!'}\n\n*Cheers!* 🍻`,
        },
      },
      {
        type: 'context',
        elements: [{ type: 'mrkdwn', text: `Sent from NexusYou at ${new Date().toISOString()}` }],
      },
    ]
  } else {
    blocks = [
      {
        type: 'header',
        text: { type: 'plain_text', text: cfg.header, emoji: true },
      },
      {
        type: 'section',
        fields: [
          { type: 'mrkdwn', text: `*From:*\n${user.name} (${user.role})` },
          { type: 'mrkdwn', text: `*Location:*\n${location || 'NexusYou'}` },
        ],
      },
      {
        type: 'section',
        text: { type: 'mrkdwn', text: `*${cfg.label}:*\n${message}` },
      },
      {
        type: 'context',
        elements: [{ type: 'mrkdwn', text: `Sent from NexusYou at ${new Date().toISOString()}` }],
      },
    ]
  }

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
