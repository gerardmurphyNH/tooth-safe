import { useState } from 'react'
import { syncExerciseFeedback, syncExerciseCompletion } from '../utils/progress.js'

// ─── Config ──────────────────────────────────────────────────────────────────

const CONFIDENCE_EMOJIS = [
  { emoji: '😬', label: 'Not yet' },
  { emoji: '😐', label: 'A little' },
  { emoji: '🙂', label: 'Getting there' },
  { emoji: '😊', label: 'Pretty good' },
  { emoji: '🤩', label: 'Got it!' },
]

const THANK_YOU_MESSAGES = [
  "Got it! Your feedback makes NexusYou better.",
  "Noted! Gerard will pretend he doesn't obsessively check this spreadsheet.",
  "Thanks! This data point just made a PM somewhere very happy.",
  "Received! Your confidence rating is now part of a very important dataset.",
  "Logged! You're contributing to the world's most niche analytics dashboard.",
]

// ─── Component ───────────────────────────────────────────────────────────────

export default function ExerciseFeedback({ exercise, level, user }) {
  const [confidence, setConfidence] = useState(null)
  const [useful, setUseful] = useState(null)
  const [commentOpen, setCommentOpen] = useState(false)
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [thankYou] = useState(
    () => THANK_YOU_MESSAGES[Math.floor(Math.random() * THANK_YOU_MESSAGES.length)]
  )

  const handleSubmit = () => {
    // Fire exercise_feedback to Sheets (confidence + useful + comment)
    syncExerciseFeedback({
      user,
      levelId: level.id,
      exercise: exercise.id,
      exerciseTitle: exercise.title,
      confidence,
      useful,
      comment: comment.trim() || null,
    })

    // Also update Progress tab with confidence as self_rating
    if (confidence != null) {
      syncExerciseCompletion({
        user,
        level: level.id,
        exercise: exercise.id,
        exerciseTitle: exercise.title,
        selfRating: confidence,
      })
    }

    setSubmitted(true)
  }

  const handleSkip = () => setSubmitted(true)

  // ── Submitted / thank-you state ───────────────────────────────────────────
  if (submitted) {
    return (
      <div className="mt-4 bg-teal-50 border border-teal-200 rounded-xl px-4 py-3 text-teal-700 text-sm font-body animate-fade-in">
        ✨ {thankYou}
      </div>
    )
  }

  // ── Feedback bar ─────────────────────────────────────────────────────────
  return (
    <div className="mt-4 bg-gray-50 border border-gray-200 rounded-xl p-4 animate-fade-in space-y-3">

      {/* Confidence scale */}
      <div>
        <p className="text-xs font-semibold text-gray-500 font-header mb-2">
          How confident do you feel after this exercise?
        </p>
        <div className="flex gap-2 items-center">
          {CONFIDENCE_EMOJIS.map(({ emoji, label }, i) => (
            <button
              key={i}
              onClick={() => setConfidence(i + 1)}
              title={`${i + 1} — ${label}`}
              className={`w-10 h-10 rounded-lg border-2 text-xl transition-all duration-150 ${
                confidence === i + 1
                  ? 'border-beyond-teal bg-teal-50 scale-110 shadow-sm'
                  : 'border-gray-200 bg-white hover:border-beyond-teal hover:scale-105'
              }`}
            >
              {emoji}
            </button>
          ))}
          {confidence && (
            <span className="text-xs text-gray-400 font-body ml-1">
              {CONFIDENCE_EMOJIS[confidence - 1].label}
            </span>
          )}
        </div>
      </div>

      {/* Usefulness */}
      <div className="flex items-center gap-3">
        <p className="text-xs font-semibold text-gray-500 font-header">Was this exercise useful?</p>
        <button
          onClick={() => setUseful(useful === true ? null : true)}
          className={`text-xl transition-all duration-150 ${
            useful === true ? 'scale-125' : 'opacity-40 hover:opacity-80'
          }`}
          title="Yes, useful"
        >
          👍
        </button>
        <button
          onClick={() => setUseful(useful === false ? null : false)}
          className={`text-xl transition-all duration-150 ${
            useful === false ? 'scale-125' : 'opacity-40 hover:opacity-80'
          }`}
          title="Not useful"
        >
          👎
        </button>
      </div>

      {/* Optional comment */}
      <div>
        {!commentOpen ? (
          <button
            onClick={() => setCommentOpen(true)}
            className="text-xs text-gray-400 hover:text-gray-600 font-body underline underline-offset-2 transition-colors"
          >
            + Tell us more (optional)
          </button>
        ) : (
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Anything on your mind about this exercise..."
            rows={2}
            autoFocus
            className="textarea-field text-sm"
          />
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-1">
        <button
          onClick={handleSubmit}
          disabled={confidence === null && useful === null}
          className="btn-primary text-sm py-1.5 px-5 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Submit
        </button>
        <button
          onClick={handleSkip}
          className="text-xs text-gray-400 hover:text-gray-600 font-body transition-colors"
        >
          Skip
        </button>
      </div>
    </div>
  )
}
