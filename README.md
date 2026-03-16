# NexusYou — Get Beyond Prompting

An interactive AI skills course for Beyond's Product Management and Design team. Takes PMs and Designers from AI beginners to agentic power users in ~14 hours, using Beyond's actual tools and real product work.

## What's Built (Phase 1)

- **Full Levels 1 & 2** with all 12 exercises, assessments, and milestone pages
- **Levels 3–6** scaffolded (titles, exercise lists, locked UI)
- **AI Coach** — real-time exercise feedback via Claude API
- **Prompt Playground** — side-by-side prompt comparison tool
- **Progress tracking** — localStorage + Google Sheets webhook sync
- **Slack integration** — milestone announcements to #pde
- **Certification page** — confetti, certificate, Slack celebration post

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` with your actual values:

```
VITE_ANTHROPIC_API_KEY=sk-ant-...
VITE_GOOGLE_WEBHOOK_URL=https://script.google.com/...
VITE_SLACK_WEBHOOK_URL=https://hooks.slack.com/...
VITE_SLACK_CHANNEL=pde
VITE_CLAUDE_MODEL=claude-sonnet-4-6
```

### 3. Run locally

```bash
npm run dev
```

App runs at `http://localhost:5173`

## API Key Security Note

The Anthropic API key is embedded in the client bundle. This is acceptable for internal tools where all users are trusted Beyond employees. For any public-facing deployment, route the API calls through a backend proxy (see Vercel deployment section below).

---

## Google Sheets Webhook Setup

1. Go to [script.google.com](https://script.google.com) and create a new project
2. Paste the contents of `google-apps-script/webhook.gs`
3. Run `initializeSheets()` once to set up the spreadsheet
4. Deploy: **Deploy → New Deployment → Web App**
   - Execute as: **Me**
   - Who has access: **Anyone** (required for cross-origin POST requests)
5. Copy the deployment URL
6. Add it to your `.env` as `VITE_GOOGLE_WEBHOOK_URL`

The script creates three sheets:
- **Registrations** — new user signups
- **Progress** — exercise completions with self-ratings
- **Summary** — auto-calculated stats (total registered, certified, completion by level, by role)

---

## Slack Webhook Setup

1. Go to [api.slack.com/apps](https://api.slack.com/apps) → Create New App
2. Enable **Incoming Webhooks**
3. Create a webhook for your `#pde` channel
4. Copy the webhook URL
5. Add it to your `.env` as `VITE_SLACK_WEBHOOK_URL`

NexusYou will post to Slack on:
- **Registration** — "[Name] just started NexusYou and tagged [Buddy] as their learning partner!"
- **Level completion** — "[Name] just completed Level X: [Title]!"
- **Certification** — Full celebration message with dad joke

---

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Set the same environment variables in the Vercel dashboard under **Settings → Environment Variables**.

### GitHub Pages

```bash
npm run build
```

Then configure your GitHub Pages to serve the `dist/` folder. You'll need to set `base: '/your-repo-name/'` in `vite.config.js` first.

Note: GitHub Pages doesn't support server-side routing. The app uses HashRouter (`#/`) for this reason, which works with static hosting.

### Vercel API Route (for secure API key handling)

If you want to keep the API key server-side, create `api/claude.js`:

```js
export default async function handler(req, res) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY, // Server-side only
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(req.body),
  })
  const data = await response.json()
  res.json(data)
}
```

Then update `src/utils/api.js` to call `/api/claude` instead of the Anthropic API directly.

---

## File Structure

```
nexusyou/
├── src/
│   ├── App.jsx                    # Main router + sidebar layout
│   ├── main.jsx                   # React entry point
│   ├── index.css                  # Tailwind + custom styles
│   ├── components/
│   │   ├── Welcome.jsx            # Registration page
│   │   ├── Dashboard.jsx          # Level map + progress
│   │   ├── LevelView.jsx          # Exercise navigation + assessment
│   │   ├── Exercise.jsx           # Individual exercise renderer
│   │   ├── PromptPlayground.jsx   # Side-by-side prompt tester
│   │   ├── AICoach.jsx            # Persistent chat coach
│   │   └── Certification.jsx      # Celebration + certificate
│   ├── content/
│   │   ├── levels.js              # All course content (Levels 1-6)
│   │   └── dadJokes.js            # Gerard's joke database
│   └── utils/
│       ├── api.js                 # Claude API wrapper
│       ├── progress.js            # localStorage + webhook sync
│       └── slack.js               # Slack webhook functions
├── google-apps-script/
│   └── webhook.gs                 # Google Sheets Apps Script
├── package.json
├── tailwind.config.js
├── vite.config.js
├── .env.example
└── README.md
```

---

## Adding Phase 2 Content (Levels 3–6)

To add content for Levels 3–6:

1. Open `src/content/levels.js`
2. Find the level (e.g., Level 3) and replace the scaffold with full content
3. Set `comingSoon: false` on the level
4. Add exercises following the existing pattern — each exercise needs:
   - `id`, `title`, `duration`, `type`, `skill`, `intro`, `learningObjective`
   - `content` (varies by type — see existing exercises for patterns)
   - `task` with `instructions`, optional `prompts` (role-specific), and `fields`
   - `coachContext` (system prompt context for AI Coach evaluation)
   - `evaluationCriteria`

The `Exercise.jsx` component handles rendering for these content types:
- `comparison` — bad/good example side-by-side
- `comparison_three` — three-way comparison (too little / just right / too much)
- `framework` — framework with lettered elements
- `patterns` — list of prompt patterns
- `decision_tree` — when-to-use decision guide
- `walkthrough` — step-by-step with optional template
- `word_comparison` — vocabulary table

---

## Brand Colors

| Name | Hex | Use |
|------|-----|-----|
| Beyond Teal | `#3bc1cc` | Primary accent, CTAs, progress |
| Deep Teal | `#02556c` | Text on light, secondary CTAs |
| Coral | `#ee3968` | Celebrations, milestones, alerts |
| Dark | `#252f38` | Sidebar, headers |
| Gray | `#cccccb` | Borders, subtle backgrounds |

Note: `#3bc1cc` on white doesn't meet WCAG AA for small text. Use `#02556c` for body text on light backgrounds.

---

## Testing Webhooks Locally

The Google Apps Script webhook uses `mode: 'no-cors'`, which means you can't see the response in the browser console. To test:

1. Deploy the Apps Script
2. Open the web app URL directly in a browser — it should return `{"status":"ok","message":"NexusYou webhook is running"}`
3. Complete a registration in the app and check the Google Sheet directly

For Slack webhooks, they support CORS and should work normally.

---

Built with ❤️ for Beyond's PM & Design team.
