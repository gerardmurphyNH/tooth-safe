import { useState, useEffect } from 'react'
import { getCoachFeedback, generatePracticeExercise } from '../utils/api.js'
import { completeExercise, getExerciseData, saveExerciseDraft, syncExerciseCompletion } from '../utils/progress.js'
import { getTaskPrompt } from '../content/levels.js'
import AICoach from './AICoach.jsx'

export default function Exercise({ exercise, level, user, onComplete, onExerciseStart }) {
  const [answers, setAnswers] = useState({})
  const [feedback, setFeedback] = useState(null)
  const [feedbackLoading, setFeedbackLoading] = useState(false)
  const [feedbackError, setFeedbackError] = useState(null)
  const [selfRating, setSelfRating] = useState(null)
  const [completed, setCompleted] = useState(false)
  const [showCoach, setShowCoach] = useState(false)
  const [bonusExercise, setBonusExercise] = useState(null)
  const [bonusLoading, setBonusLoading] = useState(false)
  const [showBonus, setShowBonus] = useState(false)

  // Load saved data
  useEffect(() => {
    const saved = getExerciseData(exercise.id)
    if (saved) {
      setAnswers(saved.answers || {})
      setFeedback(saved.ai_feedback || null)
      setSelfRating(saved.self_rating || null)
      if (saved.status === 'completed') setCompleted(true)
    }
    onExerciseStart?.()
  }, [exercise.id])

  const handleAnswerChange = (fieldId, value) => {
    const updated = { ...answers, [fieldId]: value }
    setAnswers(updated)
    // Auto-save draft
    saveExerciseDraft(exercise.id, { answers: updated })
  }

  // Support both exercise.task.fields (old format) and exercise.taskFields (new format)
  const getFields = () => exercise.taskFields || exercise.task?.fields || []

  const getSubmissionText = () => {
    const fields = getFields()
    return Object.entries(answers)
      .map(([key, val]) => {
        const field = fields.find(f => f.id === key)
        return `${field?.label || key}:\n${val}`
      })
      .join('\n\n')
  }

  const hasRequiredAnswers = () => {
    const fields = getFields()
    if (!fields.length) return true
    const requiredFields = fields.filter(f => f.required !== false)
    // If none are explicitly required, any answer is sufficient
    if (requiredFields.length === 0) return Object.values(answers).some(v => v?.trim?.()?.length > 0)
    return requiredFields.every(f => answers[f.id]?.trim?.()?.length > 0)
  }

  const getCoachFeedbackHandler = async () => {
    if (!hasRequiredAnswers()) {
      setFeedbackError('Complete the required fields before asking for feedback.')
      return
    }

    setFeedbackLoading(true)
    setFeedbackError(null)
    setFeedback(null)

    try {
      const submission = getSubmissionText()
      const result = await getCoachFeedback({ user, exercise, submission })
      setFeedback(result)
      saveExerciseDraft(exercise.id, { answers, ai_feedback: result })
    } catch (err) {
      setFeedbackError(
        "The AI Coach is taking a coffee break. Try again in a moment, or continue to complete the exercise."
      )
    } finally {
      setFeedbackLoading(false)
    }
  }

  const handleComplete = () => {
    if (!hasRequiredAnswers()) {
      setFeedbackError('Complete the required fields before finishing.')
      return
    }

    const exerciseData = {
      answers,
      ai_feedback: feedback,
      self_rating: selfRating,
    }

    completeExercise(exercise.id, exerciseData)
    syncExerciseCompletion({
      user,
      level: level.id,
      exercise: exercise.id,
      exerciseTitle: exercise.title,
      selfRating,
    })

    setCompleted(true)
    onComplete?.(exercise.id)
  }

  const handleBonusRound = async () => {
    setBonusLoading(true)
    try {
      const bonus = await generatePracticeExercise({
        user,
        currentExercise: exercise,
        difficulty: 'same',
      })
      setBonusExercise(bonus)
      setShowBonus(true)
    } catch {
      setFeedbackError("Couldn't generate a bonus exercise right now. Try again in a moment.")
    } finally {
      setBonusLoading(false)
    }
  }

  const taskPrompt = getTaskPrompt(exercise, user?.role)

  return (
    <div className="animate-fade-in">
      {/* Exercise header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="badge-teal">{exercise.id}</span>
          <span className="text-gray-400 text-xs font-body">⏱️ {exercise.duration}</span>
          {completed && <span className="badge bg-green-100 text-green-700">✅ Complete</span>}
        </div>
        <h2 className="text-2xl font-header font-bold text-beyond-dark mb-2">{exercise.title}</h2>
        {exercise.learningObjective && (
          <p className="text-beyond-deep text-sm font-body bg-teal-50 border border-teal-100 rounded-lg px-4 py-2.5">
            <span className="font-semibold">By the end of this exercise: </span>
            {exercise.learningObjective}
          </p>
        )}
      </div>

      {/* Intro */}
      {exercise.intro && (
        <div className="mb-6">
          <div className="exercise-prose">
            {exercise.intro.split('\n\n').map((para, i) => (
              <p key={i} className={i > 0 ? 'mt-3' : ''}>{para}</p>
            ))}
          </div>
        </div>
      )}

      {/* Content section — varies by exercise type */}
      <ExerciseContent exercise={exercise} />

      {/* Task section — supports both exercise.task (old) and exercise.taskFields (new) */}
      {(exercise.task || exercise.taskFields) && (
        <div className="mt-8">
          <div className="border-t border-gray-100 pt-6">
            <h3 className="font-header font-bold text-beyond-dark text-lg mb-3">Your Turn</h3>

            {/* Role-specific prompt */}
            {taskPrompt && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-5">
                <p className="text-xs font-semibold text-amber-700 font-header mb-1">
                  Your starting point ({user?.role || 'your role'}):
                </p>
                <p className="text-amber-800 font-body text-sm font-medium">"{taskPrompt}"</p>
              </div>
            )}

            {/* Instructions (old format only) */}
            {exercise.task?.instructions && (
              <div className="exercise-prose mb-5">
                {exercise.task.instructions.split('\n\n').map((para, i) => (
                  <p key={i} className={i > 0 ? 'mt-3' : ''}>{para}</p>
                ))}
              </div>
            )}

            {/* Submission fields */}
            {getFields().length > 0 && (
              <div className="space-y-5">
                {getFields().map((field) => (
                  <div key={field.id}>
                    <label className="label">
                      {field.label}
                      {field.required && <span className="text-beyond-coral ml-1">*</span>}
                    </label>
                    {field.type === 'text' ? (
                      <input
                        type="text"
                        value={answers[field.id] || ''}
                        onChange={(e) => handleAnswerChange(field.id, e.target.value)}
                        placeholder={field.placeholder}
                        disabled={completed}
                        className="input-field disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                    ) : (
                      <textarea
                        value={answers[field.id] || ''}
                        onChange={(e) => handleAnswerChange(field.id, e.target.value)}
                        placeholder={field.placeholder}
                        rows={field.rows || 5}
                        disabled={completed}
                        className="textarea-field disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Error message */}
            {feedbackError && (
              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-amber-700 text-sm font-body">
                {feedbackError}
              </div>
            )}

            {/* AI Coach feedback request */}
            {!completed && (
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={getCoachFeedbackHandler}
                  disabled={feedbackLoading || !hasRequiredAnswers()}
                  className="btn-secondary flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {feedbackLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-beyond-deep border-t-transparent rounded-full animate-spin" />
                      Getting feedback...
                    </>
                  ) : (
                    <>
                      🤖 Get AI Coach Feedback
                    </>
                  )}
                </button>

                <button
                  onClick={() => setShowCoach(!showCoach)}
                  className="btn-ghost text-sm"
                >
                  💬 Ask a question
                </button>
              </div>
            )}

            {/* AI Coach Feedback panel */}
            {feedback && (
              <div className="mt-5 bg-teal-50 border border-teal-200 rounded-xl p-5 animate-fade-in">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">🤖</span>
                  <h4 className="font-header font-bold text-beyond-deep text-sm">AI Coach Feedback</h4>
                </div>
                <div className="text-beyond-dark text-sm font-body leading-relaxed whitespace-pre-wrap">
                  {feedback}
                </div>
              </div>
            )}

            {/* Mini AI Coach Q&A */}
            {showCoach && (
              <div className="mt-5">
                <AICoach
                  user={user}
                  exerciseContext={`${exercise.title} (Exercise ${exercise.id})`}
                  onClose={() => setShowCoach(false)}
                />
              </div>
            )}

            {/* Self-rating + Complete */}
            {!completed && hasRequiredAnswers() && (
              <div className="mt-6 p-5 bg-gray-50 rounded-xl border border-gray-100">
                <p className="font-header font-semibold text-beyond-dark text-sm mb-3">
                  How confident do you feel after this exercise?
                </p>
                <div className="flex gap-2 mb-5">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setSelfRating(rating)}
                      className={`w-10 h-10 rounded-lg border-2 font-header font-bold text-sm transition-all duration-150 ${
                        selfRating === rating
                          ? 'border-beyond-teal bg-beyond-teal text-white'
                          : 'border-gray-200 text-gray-400 hover:border-beyond-teal hover:text-beyond-teal'
                      }`}
                    >
                      {rating}
                    </button>
                  ))}
                  <span className="text-gray-400 text-xs font-body self-center ml-1">
                    1 = Not yet · 5 = Got it
                  </span>
                </div>

                <button
                  onClick={handleComplete}
                  className="btn-primary w-full"
                >
                  Mark Complete ✓
                </button>
              </div>
            )}

            {/* Completed state */}
            {completed && (
              <div className="mt-6 animate-fade-in">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 mb-4">
                  <span className="text-2xl">✅</span>
                  <div>
                    <p className="font-header font-semibold text-green-800">Exercise complete!</p>
                    <p className="text-green-700 text-sm font-body">Your progress has been saved.</p>
                  </div>
                </div>

                {/* Bonus round */}
                {!showBonus && (
                  <button
                    onClick={handleBonusRound}
                    disabled={bonusLoading}
                    className="btn-secondary text-sm flex items-center gap-2"
                  >
                    {bonusLoading ? (
                      <>
                        <span className="w-3 h-3 border-2 border-beyond-deep border-t-transparent rounded-full animate-spin" />
                        Generating bonus round...
                      </>
                    ) : (
                      "⚡ Need another round? Generate a bonus exercise"
                    )}
                  </button>
                )}
              </div>
            )}

            {/* Bonus exercise panel */}
            {showBonus && bonusExercise && (
              <BonusExercise exercise={bonusExercise} user={user} onDismiss={() => setShowBonus(false)} />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Exercise Content Renderer ────────────────────────────────────────────────
function ExerciseContent({ exercise }) {
  if (!exercise.content) return null
  const { content } = exercise

  switch (content.type) {
    case 'comparison':
      return <ComparisonContent content={content} />
    case 'comparison_three':
      return <ThreeWayComparison content={content} />
    case 'framework':
      return <FrameworkContent content={content} exercise={exercise} />
    case 'patterns':
      return <PatternsContent content={content} />
    case 'decision_tree':
      return <DecisionTreeContent content={content} />
    case 'walkthrough':
      return <WalkthroughContent content={content} />
    case 'word_comparison':
      return <WordComparisonContent content={content} />
    case 'nexus_walkthrough':
      return <NexusWalkthroughContent content={content} />
    case 'model_comparison':
      return <ModelComparisonContent content={content} />
    case 'reflection':
      return <ReflectionContent content={content} />
    case 'capstone':
      return <CapstoneContent content={content} />
    default:
      return null
  }
}

function ComparisonContent({ content }) {
  return (
    <div className="space-y-4">
      {/* Bad example */}
      <div className="rounded-xl border border-red-200 bg-red-50 p-5">
        <div className="text-xs font-header font-semibold text-red-600 mb-2">{content.badExample.label}</div>
        <div className="bg-white rounded-lg px-4 py-3 font-mono text-sm text-gray-700 mb-3 border border-red-100">
          "{content.badExample.prompt}"
        </div>
        <p className="text-red-700 text-sm font-body leading-relaxed">{content.badExample.why}</p>
      </div>

      {/* Good example */}
      <div className="rounded-xl border border-green-200 bg-green-50 p-5">
        <div className="text-xs font-header font-semibold text-green-700 mb-2">{content.goodExample.label}</div>
        <div className="bg-white rounded-lg px-4 py-3 font-mono text-sm text-gray-700 mb-3 border border-green-100 leading-relaxed whitespace-pre-wrap">
          "{content.goodExample.prompt}"
        </div>
        <p className="text-green-700 text-sm font-body leading-relaxed">{content.goodExample.why}</p>
      </div>

      {/* Breakdown */}
      {content.breakdown && (
        <div className="grid grid-cols-2 gap-3 mt-2">
          {content.breakdown.map((item) => (
            <div key={item.label} className="bg-white rounded-lg border border-gray-100 p-3">
              <div className="flex items-center gap-2 mb-1">
                <span>{item.icon}</span>
                <span className="font-header font-semibold text-beyond-dark text-sm">{item.label}</span>
              </div>
              <p className="text-gray-600 text-xs font-body leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ThreeWayComparison({ content }) {
  const colors = {
    '❌ Too Little Context': { border: 'border-red-200', bg: 'bg-red-50', text: 'text-red-600', promptBg: 'border-red-100' },
    '✅ Goldilocks Zone': { border: 'border-green-200', bg: 'bg-green-50', text: 'text-green-700', promptBg: 'border-green-100' },
    '❌ Too Much Context': { border: 'border-orange-200', bg: 'bg-orange-50', text: 'text-orange-600', promptBg: 'border-orange-100' },
  }

  return (
    <div className="space-y-4">
      {content.examples.map((ex) => {
        const style = colors[ex.label] || { border: 'border-gray-200', bg: 'bg-gray-50', text: 'text-gray-600', promptBg: 'border-gray-100' }
        return (
          <div key={ex.label} className={`rounded-xl border ${style.border} ${style.bg} p-5`}>
            <div className={`text-xs font-header font-semibold ${style.text} mb-2`}>{ex.label}</div>
            <div className={`bg-white rounded-lg px-4 py-3 font-mono text-sm text-gray-700 mb-3 border ${style.promptBg} leading-relaxed whitespace-pre-wrap`}>
              "{ex.prompt}"
            </div>
            <p className={`${style.text} text-sm font-body leading-relaxed`}>{ex.why}</p>
          </div>
        )
      })}
      {content.rule && (
        <div className="bg-beyond-dark rounded-lg px-4 py-3 text-beyond-teal text-sm font-header font-semibold">
          💡 {content.rule}
        </div>
      )}
    </div>
  )
}

function FrameworkContent({ content, exercise }) {
  const [copiedIdx, setCopiedIdx] = useState(null)

  if (!content.framework) return null

  const copyPrompt = (text, idx) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIdx(idx)
      setTimeout(() => setCopiedIdx(null), 2000)
    })
  }

  return (
    <div className="space-y-5">
      {/* Framework description */}
      <p className="exercise-prose">{content.framework.description}</p>

      {/* Framework elements */}
      <div className="grid gap-3">
        {content.framework.elements.map((el) => (
          <div key={el.letter} className="flex gap-4 bg-white rounded-xl border border-gray-100 p-4">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-header font-bold text-lg shrink-0"
              style={{ backgroundColor: el.color }}
            >
              {el.letter}
            </div>
            <div className="min-w-0">
              <div className="font-header font-bold text-beyond-dark text-sm mb-0.5">{el.name}</div>
              <p className="text-gray-500 text-xs font-body mb-1.5">{el.description}</p>
              <div className="bg-gray-50 rounded px-3 py-1.5 text-xs font-mono text-gray-600 italic">
                e.g. "{el.example}"
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Phase/step prompts — used in Level 5 framework exercises and Level 6 PRD */}
      {content.prompts && (
        <div className="space-y-3">
          {content.prompts.map((p, i) => (
            <div key={i} className="bg-teal-50 border border-teal-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-header font-semibold text-beyond-deep">{p.phase || p.label}</p>
                <button
                  onClick={() => copyPrompt(p.prompt, i)}
                  className="text-xs font-body text-beyond-teal hover:text-beyond-deep flex items-center gap-1 transition-colors"
                >
                  {copiedIdx === i ? '✓ Copied!' : '📋 Copy'}
                </button>
              </div>
              <div className="bg-white rounded-lg px-4 py-3 font-mono text-sm text-gray-700 border border-teal-100 leading-relaxed whitespace-pre-wrap">
                {p.prompt}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Single example prompt (COSTAR, CRIT etc.) */}
      {content.example && (
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-5">
          <div className="text-xs font-header font-semibold text-beyond-deep mb-3">{content.example.label}</div>
          <div className="bg-white rounded-lg px-4 py-4 font-mono text-sm text-gray-700 border border-teal-100 leading-relaxed whitespace-pre-wrap">
            {content.example.prompt}
          </div>
        </div>
      )}

      {/* Comparison for CRIT */}
      {content.comparison && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="text-xs font-header font-semibold text-red-600 mb-2">Without CRIT ❌</div>
            <div className="bg-white rounded px-3 py-2 font-mono text-sm text-gray-600 border border-red-100">
              "{content.comparison.without}"
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="text-xs font-header font-semibold text-green-700 mb-2">With CRIT ✅</div>
            <div className="bg-white rounded px-3 py-2 font-mono text-xs text-gray-600 border border-green-100 leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto">
              {content.comparison.withCRIT}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function PatternsContent({ content }) {
  return (
    <div className="space-y-3">
      {content.patterns.map((pattern) => (
        <div key={pattern.name} className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="font-header font-bold text-beyond-dark text-sm mb-1">{pattern.name}</div>
          {pattern.description && (
            <p className="text-gray-500 text-xs font-body mb-2">{pattern.description}</p>
          )}
          {/* Old format: single prompt string */}
          {pattern.prompt && (
            <div className="bg-gray-50 rounded px-3 py-2.5 font-mono text-sm text-gray-700 mb-2 border border-gray-100 leading-relaxed">
              "{pattern.prompt}"
            </div>
          )}
          {/* New format: steps array */}
          {pattern.steps && (
            <ul className="space-y-1 mb-2">
              {pattern.steps.map((s, i) => (
                <li key={i} className="text-xs font-body text-gray-600 flex items-start gap-2">
                  <span className="text-beyond-teal font-bold shrink-0">{i + 1}.</span>
                  <span className="font-mono leading-relaxed">{s}</span>
                </li>
              ))}
            </ul>
          )}
          {pattern.when && (
            <p className="text-gray-500 text-xs font-body">
              <span className="font-semibold text-gray-600">When to use: </span>{pattern.when}
            </p>
          )}
          {pattern.useCase && (
            <p className="text-gray-500 text-xs font-body">
              <span className="font-semibold text-gray-600">Best for: </span>{pattern.useCase}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

function DecisionTreeContent({ content }) {
  return (
    <div className="space-y-3">
      {content.options.map((option) => (
        <div key={option.choice} className="bg-white rounded-xl border-l-4 border border-gray-100 p-4"
          style={{ borderLeftColor: option.color }}
        >
          <div className="font-header font-bold text-beyond-dark text-sm mb-2">{option.choice}</div>
          <ul className="space-y-1 mb-2">
            {option.when.map((w, i) => (
              <li key={i} className="text-gray-600 text-xs font-body flex items-start gap-2">
                <span className="text-gray-300 shrink-0 mt-0.5">•</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
          <div className="bg-gray-50 rounded px-3 py-1.5 text-xs font-body">
            <span className="font-semibold text-gray-600">Signal: </span>
            <span className="text-gray-600 italic">{option.signal}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function WalkthroughContent({ content }) {
  return (
    <div className="space-y-5">
      {/* Steps — supports both step.number (old) and step.step (new) */}
      {content.steps && (
        <div className="space-y-4">
          {content.steps.map((step) => {
            const stepNum = step.number ?? step.step
            return (
              <div key={stepNum} className="flex gap-4">
                <div className="w-7 h-7 bg-beyond-teal rounded-full flex items-center justify-center text-white text-sm font-header font-bold shrink-0 mt-0.5">
                  {stepNum}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-header font-bold text-beyond-dark text-sm mb-1">{step.title}</div>
                  <p className="text-gray-600 text-sm font-body leading-relaxed">{step.description}</p>
                  {/* Terminal command block */}
                  {step.prompt && (
                    <div className="mt-2 bg-gray-900 rounded-lg px-4 py-2.5 font-mono text-sm text-green-400 leading-relaxed whitespace-pre-wrap overflow-x-auto">
                      {step.prompt}
                    </div>
                  )}
                  {/* Callout / tip */}
                  {(step.callout || step.tip) && (
                    <p className="text-beyond-teal text-xs font-body mt-1.5 italic">
                      💡 {step.callout || step.tip}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Reflection (new format) */}
      {content.reflection && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          <p className="text-xs font-header font-semibold text-amber-700 mb-1">Reflection</p>
          <p className="text-amber-800 text-sm font-body leading-relaxed">{content.reflection}</p>
        </div>
      )}

      {/* System prompt guide */}
      {content.systemPromptGuide && (
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-5">
          <div className="text-sm font-header font-semibold text-beyond-deep mb-4">{content.systemPromptGuide.label}</div>
          <div className="space-y-3">
            {content.systemPromptGuide.elements.map((el) => (
              <div key={el.label} className="bg-white rounded-lg p-3 border border-teal-100">
                <div className="text-xs font-header font-semibold text-beyond-dark mb-1">{el.label}</div>
                <div className="text-xs font-mono text-gray-600 italic">e.g. "{el.example}"</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Playbook template */}
      {content.playbookTemplate && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
          <div className="text-sm font-header font-semibold text-beyond-dark mb-4">{content.playbookTemplate.label}</div>
          <div className="space-y-3">
            {content.playbookTemplate.sections.map((section) => (
              <div key={section.title} className="flex gap-3">
                <span className="text-beyond-teal font-bold font-header text-sm shrink-0">→</span>
                <div>
                  <div className="font-header font-semibold text-beyond-dark text-sm">{section.title}</div>
                  <p className="text-gray-500 text-xs font-body">{section.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function WordComparisonContent({ content }) {
  return (
    <div className="space-y-5">
      {content.categories.map((cat) => (
        <div key={cat.name}>
          <h4 className="font-header font-bold text-beyond-dark text-sm mb-2">{cat.name}</h4>
          <div className="flex flex-wrap gap-2">
            {cat.words.map((w) => (
              <div key={w.word} className="bg-white rounded-lg border border-gray-100 px-3 py-2 group hover:border-beyond-teal transition-colors">
                <div className="font-header font-bold text-beyond-dark text-sm">{w.word}</div>
                <div className="text-gray-500 text-xs font-body mt-0.5">{w.effect}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Nexus Walkthrough Content ───────────────────────────────────────────────
function NexusWalkthroughContent({ content }) {
  const [copied, setCopied] = useState(null)

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  return (
    <div className="space-y-5">
      {/* Prerequisite checklist */}
      {content.prerequisite && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">⚠️</span>
            <p className="font-header font-semibold text-amber-800 text-sm">{content.prerequisite.title}</p>
          </div>
          <ul className="space-y-1">
            {content.prerequisite.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-amber-700 text-sm font-body">
                <span className="text-amber-400 shrink-0 mt-0.5">□</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Artifact type cards (Exercise 3.4) */}
      {content.artifactTypes && (
        <div className="space-y-3">
          <p className="text-xs font-header font-bold text-gray-400 uppercase tracking-wider">Choose your artifact type:</p>
          {content.artifactTypes.map((a) => (
            <div key={a.type} className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 bg-beyond-teal rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold font-header">
                    {a.type[0]}
                  </span>
                </div>
                <div className="font-header font-bold text-beyond-dark text-sm">{a.type}</div>
              </div>
              <p className="text-gray-500 text-xs font-body mb-1">
                <span className="font-semibold text-gray-600">Use when: </span>{a.useWhen}
              </p>
              <p className="text-gray-500 text-xs font-body">
                <span className="font-semibold text-gray-600">Best for: </span>{a.bestFor}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Query patterns */}
      {content.patterns && (
        <div className="space-y-3">
          {content.patterns.map((p) => (
            <div key={p.name} className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="font-header font-bold text-beyond-dark text-sm mb-0.5">{p.name}</div>
              <p className="text-gray-500 text-xs font-body mb-2">{p.description}</p>
              <div className="bg-gray-50 rounded px-3 py-2 font-mono text-xs text-gray-700 border border-gray-100 leading-relaxed italic">
                e.g. "{p.example}"
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Prompts to copy and run in Claude Desktop */}
      {content.prompts && (
        <div className="space-y-4">
          {content.prompts.map((p, i) => (
            <div key={i} className="bg-teal-50 border border-teal-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-header font-semibold text-beyond-deep">{p.label}</p>
                <button
                  onClick={() => copyToClipboard(p.prompt, i)}
                  className="text-xs font-body text-beyond-teal hover:text-beyond-deep flex items-center gap-1 transition-colors"
                >
                  {copied === i ? '✓ Copied!' : '📋 Copy'}
                </button>
              </div>
              <div className="bg-white rounded-lg px-4 py-3 font-mono text-sm text-gray-700 border border-teal-100 leading-relaxed">
                {p.prompt}
              </div>
              {p.tip && (
                <p className="mt-2 text-beyond-teal text-xs font-body italic">💡 {p.tip}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Model Comparison Content ─────────────────────────────────────────────────
function ModelComparisonContent({ content }) {
  return (
    <div className="space-y-6">
      {/* Model cards */}
      {content.models && (
        <div className="grid gap-4">
          {content.models.map((model) => (
            <div key={model.id} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{model.emoji}</span>
                <div>
                  <div className="font-header font-bold text-beyond-dark text-sm">{model.name}</div>
                  <div className="text-gray-500 text-xs font-body">{model.tagline}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <p className="text-xs font-header font-semibold text-green-700 mb-1">Strengths</p>
                  <ul className="space-y-0.5">
                    {model.strengths.map((s, i) => (
                      <li key={i} className="text-xs font-body text-gray-600 flex items-start gap-1">
                        <span className="text-green-500 shrink-0">+</span>{s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-header font-semibold text-red-600 mb-1">Weaknesses</p>
                  <ul className="space-y-0.5">
                    {model.weaknesses.map((w, i) => (
                      <li key={i} className="text-xs font-body text-gray-600 flex items-start gap-1">
                        <span className="text-red-400 shrink-0">−</span>{w}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="bg-teal-50 rounded-lg px-3 py-1.5">
                <span className="text-xs font-header font-semibold text-beyond-deep">Best for: </span>
                <span className="text-xs font-body text-beyond-dark">{model.bestFor}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Decision framework */}
      {content.decisionFramework && (
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
          <h4 className="font-header font-bold text-beyond-dark text-sm mb-3">Decision Framework</h4>
          <div className="space-y-3">
            {content.decisionFramework.map((item, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-beyond-teal font-bold font-header text-sm shrink-0">?</span>
                <div>
                  <p className="text-sm font-body text-beyond-dark font-medium">{item.question}</p>
                  <p className="text-xs font-body text-beyond-teal mt-0.5">→ {item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Reflection Content ───────────────────────────────────────────────────────
function ReflectionContent({ content }) {
  if (!content.sections && !content.buildPrompt) return null

  return (
    <div className="space-y-5">
      {content.sections && content.sections.map((section) => (
        <div key={section.title} className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="font-header font-bold text-beyond-dark text-sm mb-1">{section.title}</div>
          {section.description && (
            <p className="text-gray-500 text-xs font-body mb-3 leading-relaxed">{section.description}</p>
          )}
          <ul className="space-y-2">
            {section.prompts?.map((prompt, i) => (
              <li key={i} className="flex items-start gap-2 text-sm font-body text-gray-700">
                <span className="text-beyond-teal font-bold shrink-0 mt-0.5">→</span>
                <span className="italic">{prompt}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {content.buildPrompt && (
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-4">
          <p className="text-xs font-header font-semibold text-beyond-deep mb-2">Now build your document:</p>
          <div className="bg-white rounded-lg px-4 py-3 font-mono text-sm text-gray-700 border border-teal-100 leading-relaxed whitespace-pre-wrap">
            {content.buildPrompt}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Capstone Content ─────────────────────────────────────────────────────────
function CapstoneContent({ content }) {
  if (!content.deliverables && !content.finalReflection) return null

  return (
    <div className="space-y-5">
      {content.deliverables && (
        <div className="space-y-4">
          {content.deliverables.map((d, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-beyond-coral rounded-full flex items-center justify-center text-white text-xs font-bold font-header">
                  {i + 1}
                </div>
                <div className="font-header font-bold text-beyond-dark text-sm">{d.title}</div>
              </div>
              <p className="text-gray-600 text-sm font-body leading-relaxed mb-3">{d.description}</p>
              {d.prompt && (
                <div className="bg-teal-50 rounded-lg px-4 py-3 font-mono text-sm text-gray-700 border border-teal-100 leading-relaxed">
                  {d.prompt}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {content.finalReflection && (
        <div className="bg-beyond-dark rounded-xl p-5">
          <p className="text-beyond-teal text-xs font-header font-semibold mb-3">Final Reflection Questions</p>
          <ul className="space-y-2">
            {content.finalReflection.map((q, i) => (
              <li key={i} className="text-gray-300 text-sm font-body flex items-start gap-2">
                <span className="text-beyond-teal shrink-0">→</span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// ─── Bonus Exercise Panel ────────────────────────────────────────────────────
function BonusExercise({ exercise, user, onDismiss }) {
  const [answer, setAnswer] = useState('')

  return (
    <div className="mt-5 bg-amber-50 border border-amber-200 rounded-xl p-5 animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">⚡</span>
          <h4 className="font-header font-bold text-amber-800">Bonus Round: {exercise.exercise_title}</h4>
        </div>
        <button onClick={onDismiss} className="text-amber-400 hover:text-amber-600 text-sm">✕</button>
      </div>

      {exercise.scenario && (
        <div className="bg-white rounded-lg px-3 py-2.5 mb-3 border border-amber-100">
          <p className="text-amber-700 text-xs font-header font-semibold mb-1">Scenario:</p>
          <p className="text-gray-700 text-sm font-body">{exercise.scenario}</p>
        </div>
      )}

      <div className="exercise-prose text-sm mb-4 text-amber-800">
        {exercise.instructions}
      </div>

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Your response..."
        rows={5}
        className="w-full border border-amber-200 rounded-lg px-4 py-2.5 text-beyond-dark placeholder-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 font-body text-sm bg-white"
      />

      {exercise.evaluation_criteria?.length > 0 && (
        <div className="mt-3">
          <p className="text-xs font-header font-semibold text-amber-700 mb-1">You'll be evaluated on:</p>
          <ul className="space-y-0.5">
            {exercise.evaluation_criteria.map((c, i) => (
              <li key={i} className="text-xs font-body text-amber-700 flex items-start gap-1.5">
                <span>·</span><span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
