import { useState } from 'react'
import { useAppContext } from '../App.jsx'
import { runPlaygroundPrompt } from '../utils/api.js'

const MODEL_OPTIONS = [
  { id: 'claude-sonnet-4-6', label: 'Sonnet 4.6', emoji: '🏡', tagline: 'Default — fast & capable' },
  { id: 'claude-opus-4-6', label: 'Opus 4.6', emoji: '🏰', tagline: 'Most powerful' },
  { id: 'claude-haiku-4-5-20251001', label: 'Haiku 4.5', emoji: '🏠', tagline: 'Fastest & cheapest' },
]

// Pre-loaded example prompts organized by skill
const EXAMPLE_PROMPTS = [
  {
    category: 'Thought Partner',
    label: 'Bad → Good (L1.1)',
    left: "What is dynamic pricing?",
    right: "I'm a product manager at a dynamic pricing company for short-term rentals. We have ~6,000 monthly signups but only 5% convert to paying customers. Our research suggests hosts find the initial setup confusing and don't trust the first few weeks of pricing recommendations. Help me think through what product changes would most increase trust in automated pricing without removing host control.",
  },
  {
    category: 'COSTAR',
    label: 'Generic → COSTAR',
    left: "Write a problem statement for improving onboarding",
    right: "Context: I'm a PM at Beyond, a dynamic pricing platform for STR hosts. We have a 5% activation rate on signups and believe setup friction is the #1 barrier.\n\nObjective: Write a compelling problem statement that builds internal alignment on why this is our #1 priority for Q2.\n\nStyle: Strategic and evidence-driven — like a PM who's done discovery and is making a confident recommendation.\n\nTone: Confident but open to iteration — this is a validated hypothesis, not a guarantee.\n\nAudience: Head of Product and Head of Engineering, who need to deprioritize 3 other initiatives for this.\n\nResponse Format: 3 paragraphs — (1) what's happening, (2) why it matters, (3) proposed solution space.",
  },
  {
    category: 'Adversarial',
    label: 'Basic → Adversarial',
    left: "What are the risks of launching a new onboarding flow?",
    right: "You are a skeptical senior engineer who's been burned by PMs overpromising on onboarding redesigns. I'm proposing we overhaul Beyond's host onboarding to improve our 5% activation rate. Give me the top 5 ways this project could fail, even if we execute it well. Be specific — name the actual failure modes, not generic 'risk categories'.",
  },
  {
    category: 'Word Choice',
    label: 'List vs. Surface',
    left: "List ways to improve host retention",
    right: "Surface the non-obvious factors that drive STR host churn at a dynamic pricing platform like Beyond — the things that don't show up in exit surveys because customers don't articulate them. Focus specifically on hosts who were initially engaged but disengaged in months 2-4.",
  },
  {
    category: 'Context',
    label: 'Too Little vs. Goldilocks',
    left: "Should we prioritize the mobile app?",
    right: "I'm a PM at Beyond. We're deciding whether to invest 2 engineer-quarters in a native mobile app (currently we have a mobile-responsive web app). 70% of our hosts check pricing on mobile, but only 15% of changes are made on mobile. Our biggest current problem is a 5% activation rate on signups — most drop off before week 2. The proposed mobile app would not directly address activation. Help me think through whether this is the right investment timing.",
  },
]

export default function PromptPlayground() {
  const { user } = useAppContext()
  const [mode, setMode] = useState('compare') // 'compare' | 'single'
  const [selectedModel, setSelectedModel] = useState('claude-sonnet-4-6')

  // Single mode state
  const [singlePrompt, setSinglePrompt] = useState('')
  const [singleResponse, setSingleResponse] = useState('')
  const [singleLoading, setSingleLoading] = useState(false)
  const [singleError, setSingleError] = useState(null)

  // Compare mode state
  const [leftPrompt, setLeftPrompt] = useState('')
  const [rightPrompt, setRightPrompt] = useState('')
  const [leftResponse, setLeftResponse] = useState('')
  const [rightResponse, setRightResponse] = useState('')
  const [leftLoading, setLeftLoading] = useState(false)
  const [rightLoading, setRightLoading] = useState(false)
  const [compareError, setCompareError] = useState(null)

  const [selectedExample, setSelectedExample] = useState(null)

  const loadExample = (example) => {
    setSelectedExample(example)
    if (mode === 'compare') {
      setLeftPrompt(example.left)
      setRightPrompt(example.right)
      setLeftResponse('')
      setRightResponse('')
    } else {
      setSinglePrompt(example.right)
      setSingleResponse('')
    }
  }

  // Single mode handlers
  const runSingle = async () => {
    if (!singlePrompt.trim() || singleLoading) return
    setSingleLoading(true)
    setSingleError(null)
    setSingleResponse('')
    try {
      const response = await runPlaygroundPrompt(singlePrompt, selectedModel)
      setSingleResponse(response)
    } catch (err) {
      setSingleError("Couldn't reach the AI. Check your API key in .env and try again.")
    } finally {
      setSingleLoading(false)
    }
  }

  // Compare mode handlers
  const runBoth = async () => {
    if ((!leftPrompt.trim() && !rightPrompt.trim()) || (leftLoading && rightLoading)) return
    setCompareError(null)

    const promises = []

    if (leftPrompt.trim()) {
      setLeftLoading(true)
      setLeftResponse('')
      promises.push(
        runPlaygroundPrompt(leftPrompt, selectedModel)
          .then(r => setLeftResponse(r))
          .catch(() => setLeftResponse('⚠️ Error getting response'))
          .finally(() => setLeftLoading(false))
      )
    }

    if (rightPrompt.trim()) {
      setRightLoading(true)
      setRightResponse('')
      promises.push(
        runPlaygroundPrompt(rightPrompt, selectedModel)
          .then(r => setRightResponse(r))
          .catch(() => setRightResponse('⚠️ Error getting response'))
          .finally(() => setRightLoading(false))
      )
    }

    await Promise.all(promises)
  }

  const runLeft = async () => {
    if (!leftPrompt.trim() || leftLoading) return
    setLeftLoading(true)
    setLeftResponse('')
    try {
      setLeftResponse(await runPlaygroundPrompt(leftPrompt, selectedModel))
    } catch {
      setLeftResponse('⚠️ Error getting response')
    } finally {
      setLeftLoading(false)
    }
  }

  const runRight = async () => {
    if (!rightPrompt.trim() || rightLoading) return
    setRightLoading(true)
    setRightResponse('')
    try {
      setRightResponse(await runPlaygroundPrompt(rightPrompt, selectedModel))
    } catch {
      setRightResponse('⚠️ Error getting response')
    } finally {
      setRightLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-8 py-5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-header font-bold text-beyond-dark">⚡ Prompt Playground</h1>
              <p className="text-gray-500 font-body mt-1">
                Test prompts, compare versions side-by-side, and see how word choice changes everything.
              </p>
            </div>

            {/* Mode toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setMode('compare')}
                className={`px-4 py-2 rounded-md text-sm font-header font-semibold transition-all ${
                  mode === 'compare' ? 'bg-white text-beyond-dark shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Compare Mode
              </button>
              <button
                onClick={() => setMode('single')}
                className={`px-4 py-2 rounded-md text-sm font-header font-semibold transition-all ${
                  mode === 'single' ? 'bg-white text-beyond-dark shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Single Mode
              </button>
            </div>
          </div>

          {/* Model selector */}
          <div className="mt-4 flex items-center gap-2">
            <span className="text-xs font-header font-semibold text-gray-400 uppercase tracking-wide shrink-0">Model:</span>
            <div className="flex gap-1">
              {MODEL_OPTIONS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedModel(m.id)}
                  title={m.tagline}
                  className={`text-xs px-3 py-1.5 rounded-full font-body border transition-colors ${
                    selectedModel === m.id
                      ? 'bg-beyond-deep text-white border-beyond-deep'
                      : 'border-gray-200 text-gray-600 hover:border-beyond-deep hover:text-beyond-deep'
                  }`}
                >
                  {m.emoji} {m.label}
                </button>
              ))}
            </div>
            <span className="text-xs text-gray-400 font-body hidden sm:inline">
              {MODEL_OPTIONS.find(m => m.id === selectedModel)?.tagline}
            </span>
          </div>

          {/* Example prompts */}
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <span className="text-xs font-header font-semibold text-gray-400 uppercase tracking-wide">Try an example:</span>
            {EXAMPLE_PROMPTS.map((ex) => (
              <button
                key={ex.label}
                onClick={() => loadExample(ex)}
                className={`text-xs px-3 py-1.5 rounded-full font-body border transition-colors ${
                  selectedExample?.label === ex.label
                    ? 'bg-beyond-teal text-white border-beyond-teal'
                    : 'border-gray-200 text-gray-600 hover:border-beyond-teal hover:text-beyond-teal'
                }`}
              >
                {ex.category}: {ex.label}
              </button>
            ))}
            <button
              onClick={() => {
                setSelectedExample(null)
                setLeftPrompt(''); setRightPrompt(''); setLeftResponse(''); setRightResponse('')
                setSinglePrompt(''); setSingleResponse('')
              }}
              className="text-xs text-gray-400 hover:text-gray-600 font-body ml-1"
            >
              Clear all
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {mode === 'single' ? (
          // ── Single Mode ───────────────────────────────────────────────────
          <div className="max-w-3xl mx-auto">
            <div className="card">
              <label className="label">Your prompt:</label>
              <textarea
                value={singlePrompt}
                onChange={(e) => setSinglePrompt(e.target.value)}
                placeholder="Type your prompt here... Try making it vague first, then add context and see what changes."
                rows={6}
                className="textarea-field mb-4"
                onKeyDown={(e) => {
                  if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') runSingle()
                }}
              />
              <div className="flex items-center gap-3">
                <button
                  onClick={runSingle}
                  disabled={!singlePrompt.trim() || singleLoading}
                  className="btn-primary flex items-center gap-2 disabled:opacity-40"
                >
                  {singleLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Running...
                    </>
                  ) : (
                    "Run Prompt ▶"
                  )}
                </button>
                <span className="text-gray-400 text-xs font-body">⌘+Enter to run</span>
              </div>

              {singleError && (
                <p className="mt-3 text-red-600 text-sm font-body bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                  {singleError}
                </p>
              )}
            </div>

            {(singleLoading || singleResponse) && (
              <div className="card mt-4 animate-fade-in">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">🤖</span>
                  <h3 className="font-header font-semibold text-beyond-dark">Response</h3>
                </div>
                {singleLoading ? (
                  <div className="space-y-3">
                    <div className="skeleton h-4 w-full" />
                    <div className="skeleton h-4 w-5/6" />
                    <div className="skeleton h-4 w-4/6" />
                    <div className="skeleton h-4 w-full mt-4" />
                    <div className="skeleton h-4 w-3/4" />
                  </div>
                ) : (
                  <div className="text-beyond-dark font-body leading-relaxed whitespace-pre-wrap text-sm">
                    {singleResponse}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          // ── Compare Mode ──────────────────────────────────────────────────
          <div>
            <div className="flex gap-2 mb-5 items-center">
              <button
                onClick={runBoth}
                disabled={(leftLoading || rightLoading) || (!leftPrompt.trim() && !rightPrompt.trim())}
                className="btn-primary flex items-center gap-2 disabled:opacity-40"
              >
                {(leftLoading || rightLoading) ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Running both...
                  </>
                ) : (
                  "▶▶ Run Both Prompts"
                )}
              </button>
              <span className="text-gray-400 text-xs font-body">or run each pane individually</span>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {/* Left pane */}
              <PromptPane
                label="Prompt A"
                labelStyle="bg-red-50 text-red-700 border-red-200"
                prompt={leftPrompt}
                setPrompt={setLeftPrompt}
                response={leftResponse}
                loading={leftLoading}
                onRun={runLeft}
                placeholder="Try the weaker version here — vague, no context, generic..."
              />

              {/* Right pane */}
              <PromptPane
                label="Prompt B"
                labelStyle="bg-green-50 text-green-700 border-green-200"
                prompt={rightPrompt}
                setPrompt={setRightPrompt}
                response={rightResponse}
                loading={rightLoading}
                onRun={runRight}
                placeholder="Try the stronger version here — specific context, clear objective, good structure..."
              />
            </div>

            {/* Comparison tips */}
            {leftResponse && rightResponse && (
              <div className="mt-5 bg-amber-50 border border-amber-200 rounded-xl p-4 animate-fade-in">
                <h4 className="font-header font-bold text-amber-800 mb-2">🧠 Reflection prompt</h4>
                <p className="text-amber-700 font-body text-sm">
                  What's the most significant difference between these two responses? Is it length? Specificity? Actionability? Relevance to your actual situation? Ask the AI Coach to analyze what changed and why.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Reusable Prompt Pane ─────────────────────────────────────────────────────
function PromptPane({ label, labelStyle, prompt, setPrompt, response, loading, onRun, placeholder }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="card flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className={`badge border text-xs font-header font-semibold ${labelStyle}`}>{label}</span>
          <button
            onClick={onRun}
            disabled={!prompt.trim() || loading}
            className="text-xs btn-ghost text-beyond-teal disabled:opacity-40"
          >
            {loading ? (
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 border border-beyond-teal border-t-transparent rounded-full animate-spin" />
                Running
              </span>
            ) : '▶ Run'}
          </button>
        </div>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={placeholder}
          rows={8}
          className="textarea-field text-sm"
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') onRun()
          }}
        />
        <p className="text-gray-400 text-xs font-body mt-1.5">⌘+Enter to run</p>
      </div>

      {/* Response */}
      {(loading || response) && (
        <div className="card animate-fade-in">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 bg-beyond-teal rounded flex items-center justify-center">
              <span className="text-xs text-white">AI</span>
            </div>
            <span className="font-header font-semibold text-beyond-dark text-sm">Response</span>
          </div>
          {loading ? (
            <div className="space-y-2">
              <div className="skeleton h-3 w-full" />
              <div className="skeleton h-3 w-5/6" />
              <div className="skeleton h-3 w-4/6" />
              <div className="skeleton h-3 w-full mt-3" />
              <div className="skeleton h-3 w-3/4" />
              <div className="skeleton h-3 w-5/6" />
            </div>
          ) : (
            <div className="text-beyond-dark font-body leading-relaxed whitespace-pre-wrap text-sm max-h-80 overflow-y-auto">
              {response}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
