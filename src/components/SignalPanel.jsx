import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { syncSignal } from '../utils/progress.js'
import { postSignal } from '../utils/slack.js'

// ─── Config ──────────────────────────────────────────────────────────────────

const SIGNAL_TYPES = [
  {
    id: 'bug',
    icon: '🐛',
    label: 'Report a Bug',
    description: "Something's broken or weird",
    placeholder: "Describe what's broken or weird...",
    requiresText: true,
  },
  {
    id: 'feedback',
    icon: '💡',
    label: 'Share Feedback',
    description: 'Ideas, suggestions, or hot takes',
    placeholder: "What's on your mind?",
    requiresText: true,
  },
  {
    id: 'beer',
    icon: '🍺',
    label: 'Buy Gerard a Virtual Beer',
    description: 'Say thanks or just spread good vibes',
    placeholder: "Say something nice (or leave blank for a pure vibe) ✨",
    requiresText: false,
  },
]

const CONFIRMATIONS = {
  bug: "Bug reported! Gerard's on it. (Probably.)",
  feedback: "Signal received! Gerard reads every one of these.",
  beer: "Virtual beer sent! Gerard says cheers. 🍻",
}

function getLocationLabel(pathname) {
  if (pathname.startsWith('/level/')) {
    const levelId = pathname.replace('/level/', '').replace(/\/$/, '')
    return `Level ${levelId}`
  }
  if (pathname === '/dashboard') return 'Dashboard'
  if (pathname === '/playground') return 'Prompt Playground'
  if (pathname === '/certification') return 'Certification'
  return 'NexusYou'
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function SignalPanel({ user }) {
  const [open, setOpen] = useState(false)
  const [signalType, setSignalType] = useState(null)
  const [message, setMessage] = useState('')
  const [locationText, setLocationText] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(null)

  const routeLocation = useLocation()
  const autoLocation = getLocationLabel(routeLocation.pathname)

  const selectedType = SIGNAL_TYPES.find(t => t.id === signalType)
  const canSend = signalType && (!selectedType?.requiresText || message.trim().length > 0)

  const handleOpen = () => {
    setOpen(true)
    setLocationText(autoLocation)
    setSent(false)
    setError(null)
    setSignalType(null)
    setMessage('')
  }

  const handleClose = () => {
    setOpen(false)
    setTimeout(() => {
      setSignalType(null)
      setMessage('')
      setSent(false)
      setError(null)
    }, 200)
  }

  const handleSend = async () => {
    setSending(true)
    setError(null)

    const finalMessage = message.trim() || (signalType === 'beer' ? 'Just spreading good vibes!' : '')
    const finalLocation = locationText.trim() || autoLocation
    const levelId = routeLocation.pathname.startsWith('/level/')
      ? parseInt(routeLocation.pathname.replace('/level/', ''))
      : null

    // Post to Slack (blocking — show error if it fails)
    try {
      await postSignal({
        user,
        signalType,
        location: finalLocation,
        message: finalMessage,
      })
    } catch {
      setError("Signal couldn't be sent right now. Try again in a moment.")
      setSending(false)
      return
    }

    // Log to Google Sheets (fire-and-forget)
    syncSignal({
      user,
      signalType,
      levelId,
      exercise: null,
      exerciseTitle: null,
      message: finalMessage,
      location: finalLocation,
    })

    setSent(true)
    setSending(false)
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Floating trigger */}
      <button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 text-white text-sm font-header font-semibold px-4 py-2.5 rounded-full shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
        style={{ backgroundColor: '#ee3968' }}
        title="Send Gerard a Signal"
      >
        <span>📡</span>
        <span className="hidden sm:inline">Send a Signal</span>
      </button>

      {/* Panel */}
      {open && (
        <>
          {/* Backdrop (mobile) */}
          <div
            className="fixed inset-0 z-40 sm:hidden"
            onClick={handleClose}
          />

          <div className="fixed bottom-20 right-6 z-50 w-[22rem] bg-white rounded-2xl shadow-2xl border border-gray-200 animate-fade-in overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-lg">📡</span>
                <span className="font-header font-bold text-beyond-dark">Send Gerard a Signal</span>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                ×
              </button>
            </div>

            <div className="p-5">
              {/* Sent / confirmation state */}
              {sent ? (
                <div className="text-center py-6">
                  <div className="text-4xl mb-3">
                    {signalType === 'beer' ? '🍻' : signalType === 'bug' ? '🐛' : '💡'}
                  </div>
                  <p className="font-header font-semibold text-beyond-dark text-sm mb-1">
                    {CONFIRMATIONS[signalType]}
                  </p>
                  <button
                    onClick={handleClose}
                    className="text-sm text-gray-400 hover:text-gray-600 mt-4 underline underline-offset-2 font-body"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-xs font-semibold text-gray-500 font-header mb-3 uppercase tracking-wide">
                    What kind of signal?
                  </p>

                  {/* Signal type selector */}
                  <div className="space-y-2 mb-4">
                    {SIGNAL_TYPES.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setSignalType(type.id)}
                        className={`w-full flex items-start gap-3 p-3 rounded-xl border-2 text-left transition-all duration-150 ${
                          signalType === type.id
                            ? 'border-rose-300 bg-rose-50'
                            : 'border-gray-100 hover:border-gray-200 bg-gray-50'
                        }`}
                      >
                        <span className="text-2xl shrink-0 mt-0.5">{type.icon}</span>
                        <div>
                          <div className="font-header font-semibold text-beyond-dark text-sm leading-tight">
                            {type.label}
                          </div>
                          <div className="text-gray-500 text-xs font-body mt-0.5">
                            {type.description}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Message + location */}
                  {signalType && (
                    <div className="border-t border-gray-100 pt-4 space-y-3">
                      <div>
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder={selectedType?.placeholder}
                          rows={3}
                          autoFocus
                          className="textarea-field text-sm"
                        />
                      </div>

                      <div>
                        <label className="label text-xs">Where were you?</label>
                        <input
                          type="text"
                          value={locationText}
                          onChange={(e) => setLocationText(e.target.value)}
                          className="input-field text-sm"
                        />
                      </div>

                      {error && (
                        <p className="text-xs font-body" style={{ color: '#ee3968' }}>
                          {error}
                        </p>
                      )}

                      <button
                        onClick={handleSend}
                        disabled={!canSend || sending}
                        className="w-full flex items-center justify-center gap-2 text-white font-header font-semibold text-sm py-2.5 px-4 rounded-lg transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
                        style={{ backgroundColor: '#ee3968' }}
                      >
                        {sending ? (
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>Send Signal 📡</>
                        )}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}
