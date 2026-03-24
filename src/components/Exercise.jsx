import { useState, useEffect } from 'react'
import { getCoachFeedback, generatePracticeExercise } from '../utils/api.js'
import { completeExercise, getExerciseData, saveExerciseDraft, syncExerciseCompletion } from '../utils/progress.js'
import ExerciseFeedback from './ExerciseFeedback.jsx'
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
    saveExerciseDraft(exercise.id, { answers: updated })
  }

  // Support both exercise.task.fields (old format) and exercise.taskFields (new format)
  const getFields = () => exercise.taskFields || exercise.task?.fields || []

  const getSubmissionText = () => {
    const fields = getFields()
    if (fields.length > 0) {
      return Object.entries(answers)
        .map(([key, val]) => {
          const field = fields.find(f => f.id === key)
          return `${field?.label || key}:\n${val}`
        })
        .join('\n\n')
    }
    // New format: single submission field
    return answers['submission'] || ''
  }

  const hasRequiredAnswers = () => {
    const fields = getFields()
    if (!fields.length) {
      // New format: allow completion even without a submission
      return true
    }
    const requiredFields = fields.filter(f => f.required !== false)
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
  const fields = getFields()
  // New format: task.instruction (singular); old format: task.instructions (plural)
  const taskInstruction = exercise.task?.instruction || exercise.task?.instructions

  return (
    <div className="animate-fade-in">
      {/* Exercise header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="badge-teal">{exercise.id}</span>
          <span className="text-gray-400 text-xs font-body">⏱️ {exercise.duration}</span>
          {completed && <span className="badge bg-green-100 text-green-700">✅ Complete</span>}
        </div>
        <h2 className="text-2xl font-header font-bold text-beyond-dark mb-1">{exercise.title}</h2>
        {exercise.subtitle && (
          <p className="text-gray-500 text-sm font-body italic mb-2">{exercise.subtitle}</p>
        )}
        {exercise.learningObjective && (
          <p className="text-beyond-deep text-sm font-body bg-teal-50 border border-teal-100 rounded-lg px-4 py-2.5">
            <span className="font-semibold">By the end of this exercise: </span>
            {exercise.learningObjective}
          </p>
        )}
      </div>

      {/* Description / Intro — new format uses description, old format uses intro */}
      {(exercise.description || exercise.intro) && (
        <div className="mb-6">
          <div className="exercise-prose">
            {(exercise.description || exercise.intro).split('\n\n').map((para, i) => (
              <p key={i} className={i > 0 ? 'mt-3' : ''}>
                {renderInlineMarkdown(para)}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Content section — handles both old content.type format and new direct properties */}
      <ExerciseContent exercise={exercise} user={user} />

      {/* Task section */}
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
                <p className="text-amber-800 font-body text-sm font-medium whitespace-pre-wrap">"{taskPrompt}"</p>
              </div>
            )}

            {/* Task instructions */}
            {taskInstruction && (
              <div className="exercise-prose mb-5">
                {taskInstruction.split('\n\n').map((para, i) => (
                  <p key={i} className={i > 0 ? 'mt-3' : ''}>
                    {renderInlineMarkdown(para)}
                  </p>
                ))}
              </div>
            )}

            {/* Submission fields — old format has task.fields, new format uses single textarea */}
            {fields.length > 0 ? (
              <div className="space-y-5">
                {fields.map((field) => (
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
            ) : (
              /* New format: single open submission field */
              <div>
                <label className="label">Your work and reflection</label>
                <textarea
                  value={answers['submission'] || ''}
                  onChange={(e) => handleAnswerChange('submission', e.target.value)}
                  placeholder="Paste your prompt, describe what you did, or share your reflection from Claude Desktop..."
                  rows={7}
                  disabled={completed}
                  className="textarea-field disabled:opacity-60 disabled:cursor-not-allowed"
                />
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
                  disabled={feedbackLoading}
                  className="btn-secondary flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {feedbackLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-beyond-deep border-t-transparent rounded-full animate-spin" />
                      Getting feedback...
                    </>
                  ) : (
                    <>🤖 Get AI Coach Feedback</>
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

            {/* Complete button */}
            {!completed && (
              <div className="mt-6">
                <button onClick={handleComplete} className="btn-primary w-full">
                  Mark Complete ✓
                </button>
              </div>
            )}

            {/* Completed state */}
            {completed && (
              <div className="mt-6 animate-fade-in">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <p className="font-header font-semibold text-green-800">Exercise complete!</p>
                    <p className="text-green-700 text-sm font-body">Your progress has been saved.</p>
                  </div>
                </div>

                {/* Post-completion feedback bar */}
                <ExerciseFeedback exercise={exercise} level={level} user={user} />

                <div className="mt-4">
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

// ─── Inline markdown renderer (bold only) ────────────────────────────────────
function renderInlineMarkdown(text) {
  if (!text || !text.includes('**')) return text
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  )
}

// ─── Exercise Content Dispatcher ─────────────────────────────────────────────
// Routes to old content.type renderer OR new direct-property renderer
function ExerciseContent({ exercise, user }) {
  // OLD FORMAT: exercise.content.type switch
  if (exercise.content) {
    return <LegacyExerciseContent exercise={exercise} />
  }
  // NEW FORMAT: properties directly on exercise
  return <NewExerciseContent exercise={exercise} user={user} />
}

// ─── Legacy Content Renderer (old content.type format) ───────────────────────
function LegacyExerciseContent({ exercise }) {
  const { content } = exercise
  if (!content) return null

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

// ─── New Exercise Content Renderer ───────────────────────────────────────────
// Renders all new-format content properties (directly on exercise object)
function NewExerciseContent({ exercise, user }) {
  const blocks = []

  // Comparison (bad/good)
  if (exercise.comparison) {
    const c = exercise.comparison
    // Direct bad/good keys
    if (c.bad || c.good) {
      blocks.push(<NewComparisonBlock key="comparison" bad={c.bad} good={c.good} />)
    }
    // Track-keyed (pm/design) with without/with sub-keys
    else if (c.pm || c.design) {
      blocks.push(
        <div key="comparison-tracks" className="space-y-4">
          {c.pm && <TrackComparison label="PM Example" data={c.pm} />}
          {c.design && <TrackComparison label="Design Example" data={c.design} />}
        </div>
      )
    }
  }

  // Three-way comparison
  if (exercise.comparisonThree) {
    const c = exercise.comparisonThree
    blocks.push(
      <div key="comparisonThree" className="space-y-4">
        {c.tooLittle && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-5">
            <div className="text-xs font-header font-semibold text-red-600 mb-2">{c.tooLittle.label || 'Too little context ❌'}</div>
            <div className="bg-white rounded-lg px-4 py-3 font-mono text-sm text-gray-700 mb-3 border border-red-100 leading-relaxed whitespace-pre-wrap">"{c.tooLittle.prompt}"</div>
            <p className="text-red-700 text-sm font-body leading-relaxed">{c.tooLittle.result || c.tooLittle.why}</p>
          </div>
        )}
        {c.justRight && (
          <div className="rounded-xl border border-green-200 bg-green-50 p-5">
            <div className="text-xs font-header font-semibold text-green-700 mb-2">{c.justRight.label || 'Just right ✅'}</div>
            <div className="bg-white rounded-lg px-4 py-3 font-mono text-sm text-gray-700 mb-3 border border-green-100 leading-relaxed whitespace-pre-wrap">"{c.justRight.prompt}"</div>
            <p className="text-green-700 text-sm font-body leading-relaxed">{c.justRight.result || c.justRight.why}</p>
          </div>
        )}
        {c.tooMuch && (
          <div className="rounded-xl border border-orange-200 bg-orange-50 p-5">
            <div className="text-xs font-header font-semibold text-orange-600 mb-2">{c.tooMuch.label || 'Too much context ❌'}</div>
            <div className="bg-white rounded-lg px-4 py-3 font-mono text-sm text-gray-700 mb-3 border border-orange-100 leading-relaxed whitespace-pre-wrap">"{c.tooMuch.prompt}"</div>
            <p className="text-orange-700 text-sm font-body leading-relaxed">{c.tooMuch.result || c.tooMuch.why}</p>
          </div>
        )}
        {c.rule && (
          <div className="bg-beyond-dark rounded-lg px-4 py-3 text-beyond-teal text-sm font-header font-semibold">
            💡 {c.rule}
          </div>
        )}
      </div>
    )
  }

  // Worked example (single, with steps)
  if (exercise.workedExample) {
    blocks.push(<WorkedExampleBlock key="workedExample" example={exercise.workedExample} />)
  }

  // Worked examples (pm/design keyed)
  if (exercise.workedExamples) {
    const we = exercise.workedExamples
    blocks.push(
      <div key="workedExamples" className="space-y-4">
        {we.pm && <WorkedExampleBlock example={we.pm} label="PM Example" />}
        {we.design && <WorkedExampleBlock example={we.design} label="Design Example" />}
      </div>
    )
  }

  // Patterns array
  if (exercise.patterns?.length) {
    blocks.push(
      <div key="patterns" className="space-y-3">
        <p className="text-xs font-header font-bold text-gray-400 uppercase tracking-wider">Patterns</p>
        {exercise.patterns.map((p, i) => (
          <PatternCard key={i} pattern={p} />
        ))}
      </div>
    )
  }

  // Techniques array
  if (exercise.techniques?.length) {
    blocks.push(
      <div key="techniques" className="space-y-3">
        <p className="text-xs font-header font-bold text-gray-400 uppercase tracking-wider">Techniques</p>
        {exercise.techniques.map((t, i) => (
          <PatternCard key={i} pattern={t} />
        ))}
      </div>
    )
  }

  // Chain patterns
  if (exercise.chainPatterns?.length) {
    blocks.push(
      <div key="chainPatterns" className="space-y-3">
        <p className="text-xs font-header font-bold text-gray-400 uppercase tracking-wider">Chain Patterns</p>
        {exercise.chainPatterns.map((p, i) => (
          <PatternCard key={i} pattern={p} />
        ))}
      </div>
    )
  }

  // Tool categories (Exercise 3.1)
  if (exercise.toolCategories?.length) {
    blocks.push(
      <div key="toolCategories" className="space-y-4">
        <p className="text-xs font-header font-bold text-gray-400 uppercase tracking-wider">Available Tools</p>
        {exercise.toolCategories.map((cat, i) => (
          <ToolCategoryCard key={i} category={cat} />
        ))}
      </div>
    )
  }

  // Artifact types
  if (exercise.artifactTypes?.length) {
    blocks.push(
      <div key="artifactTypes" className="space-y-3">
        <p className="text-xs font-header font-bold text-gray-400 uppercase tracking-wider">Choose Your Artifact Type</p>
        {exercise.artifactTypes.map((a, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="font-header font-bold text-beyond-dark text-sm mb-1">{a.type || a.name}</div>
            {a.useWhen && <p className="text-gray-500 text-xs font-body"><span className="font-semibold text-gray-600">Use when: </span>{a.useWhen}</p>}
            {a.bestFor && <p className="text-gray-500 text-xs font-body"><span className="font-semibold text-gray-600">Best for: </span>{a.bestFor}</p>}
            {a.description && <p className="text-gray-500 text-xs font-body mt-1">{a.description}</p>}
          </div>
        ))}
      </div>
    )
  }

  // Starter queries (pm/design keyed)
  if (exercise.starterQueries) {
    const sq = exercise.starterQueries
    const roleKey = user?.role?.toLowerCase().includes('design') ? 'design' : 'pm'
    const queries = sq[roleKey] || sq.pm || sq.design || []
    if (queries.length) {
      blocks.push(
        <StarterQueriesBlock key="starterQueries" queries={queries} label="Starter Queries for Your Role" />
      )
    }
  }

  // Combination queries
  if (exercise.combinationQueries) {
    const cq = exercise.combinationQueries
    const allQueries = []
    if (Array.isArray(cq)) {
      allQueries.push(...cq)
    } else {
      Object.values(cq).forEach(v => Array.isArray(v) && allQueries.push(...v))
    }
    if (allQueries.length) {
      blocks.push(<StarterQueriesBlock key="combinationQueries" queries={allQueries} label="Combination Queries" />)
    }
  }

  // Model guide
  if (exercise.modelGuide) {
    blocks.push(<ModelGuideBlock key="modelGuide" guide={exercise.modelGuide} />)
  }

  // Surgery steps (Exercise 4.4)
  if (exercise.surgerySteps?.length) {
    blocks.push(
      <div key="surgerySteps" className="space-y-4">
        <p className="text-xs font-header font-bold text-gray-400 uppercase tracking-wider">The 4-Step Surgery Process</p>
        {exercise.surgerySteps.map((step, i) => (
          <div key={i} className="flex gap-4 bg-white rounded-xl border border-gray-100 p-4">
            <div className="w-7 h-7 bg-beyond-teal rounded-full flex items-center justify-center text-white text-sm font-header font-bold shrink-0">
              {step.step || i + 1}
            </div>
            <div>
              <div className="font-header font-bold text-beyond-dark text-sm mb-1">{step.name || step.title}</div>
              <p className="text-gray-600 text-xs font-body mb-2">{step.description}</p>
              {step.prompt && (
                <div className="bg-teal-50 rounded px-3 py-2 font-mono text-xs text-gray-700 border border-teal-100 leading-relaxed">
                  {step.prompt}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Starter libraries (Exercise 4.5) — show track-appropriate library
  if (exercise.starterLibraries) {
    const role = user?.role?.toLowerCase() || ''
    let trackKey = 'pm_ic'
    if (role.includes('design director') || role.includes('lead product designer')) trackKey = 'design_lead'
    else if (role.includes('design')) trackKey = 'design_ic'
    else if (role.includes('director') || role.includes('principal') || role.includes('associate director')) trackKey = 'pm_director'

    const lib = exercise.starterLibraries[trackKey] || exercise.starterLibraries['pm_ic'] || []
    if (lib.length) {
      blocks.push(<StarterLibraryBlock key="starterLibraries" library={lib} />)
    }
  }

  // Word pairs
  if (exercise.wordPairs?.length) {
    blocks.push(
      <div key="wordPairs" className="space-y-5">
        {exercise.wordPairs.map((group, i) => (
          <div key={i}>
            <h4 className="font-header font-bold text-beyond-dark text-sm mb-2">{group.category || group.name}</h4>
            <div className="flex flex-wrap gap-2">
              {(group.pairs || group.words || []).map((w, j) => (
                <div key={j} className="bg-white rounded-lg border border-gray-100 px-3 py-2">
                  <div className="font-header font-bold text-beyond-dark text-sm">{w.weak || w.word}</div>
                  <div className="text-gray-400 text-xs">→</div>
                  <div className="font-header font-bold text-beyond-teal text-sm">{w.strong || w.replacement}</div>
                  {w.effect && <div className="text-gray-500 text-xs font-body mt-0.5">{w.effect}</div>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Lenses (strategy evaluation frameworks)
  if (exercise.lenses?.length) {
    blocks.push(
      <div key="lenses" className="space-y-3">
        <p className="text-xs font-header font-bold text-gray-400 uppercase tracking-wider">Evaluation Lenses</p>
        {exercise.lenses.map((lens, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="font-header font-bold text-beyond-dark text-sm mb-1">{lens.name}</div>
            <p className="text-gray-500 text-xs font-body mb-2">{lens.description}</p>
            {lens.prompt && (
              <div className="bg-gray-50 rounded px-3 py-2 font-mono text-xs text-gray-700 border border-gray-100 leading-relaxed italic">
                "{lens.prompt}"
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  // Principles (behavioral design)
  if (exercise.principles?.length) {
    blocks.push(
      <div key="principles" className="space-y-3">
        <p className="text-xs font-header font-bold text-gray-400 uppercase tracking-wider">Principles</p>
        {exercise.principles.map((p, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="font-header font-bold text-beyond-dark text-sm mb-1">{p.name}</div>
            <p className="text-gray-500 text-xs font-body mb-2">{p.description}</p>
            {p.prompt && (
              <div className="bg-teal-50 rounded px-3 py-2 font-mono text-xs text-gray-700 border border-teal-100 leading-relaxed italic">
                "{p.prompt}"
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  // Critique frameworks
  if (exercise.critiqueFrameworks?.length) {
    blocks.push(
      <div key="critiqueFrameworks" className="space-y-3">
        <p className="text-xs font-header font-bold text-gray-400 uppercase tracking-wider">Critique Frameworks</p>
        {exercise.critiqueFrameworks.map((f, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="font-header font-bold text-beyond-dark text-sm mb-1">{f.name}</div>
            <p className="text-gray-500 text-xs font-body mb-2">{f.description}</p>
            {f.criteria?.length && (
              <ul className="space-y-0.5">
                {f.criteria.map((c, j) => (
                  <li key={j} className="text-xs font-body text-gray-600 flex items-start gap-1.5">
                    <span className="text-beyond-teal shrink-0">·</span>{c}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    )
  }

  // Setup (Exercise 6.1 — Claude Code installation)
  if (exercise.setup) {
    blocks.push(<SetupBlock key="setup" setup={exercise.setup} />)
  }

  // Basic commands (Exercise 6.1)
  if (exercise.basicCommands?.length) {
    blocks.push(
      <div key="basicCommands" className="space-y-3">
        <p className="text-xs font-header font-bold text-gray-400 uppercase tracking-wider">Basic Commands to Try</p>
        {exercise.basicCommands.map((cmd, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="font-header font-bold text-beyond-dark text-sm mb-1">{cmd.what}</div>
            <div className="bg-gray-900 rounded-lg px-3 py-2 font-mono text-sm text-green-400 mb-2 leading-relaxed">
              {cmd.example}
            </div>
            <p className="text-gray-500 text-xs font-body">{cmd.why}</p>
          </div>
        ))}
      </div>
    )
  }

  // BMAD installation steps (Exercise 6.2)
  if (exercise.installation) {
    blocks.push(<InstallationBlock key="installation" installation={exercise.installation} />)
  }

  // Workflow examples (Exercise 6.4)
  if (exercise.workflowExamples?.length) {
    blocks.push(
      <div key="workflowExamples" className="space-y-4">
        <p className="text-xs font-header font-bold text-gray-400 uppercase tracking-wider">Workflow Examples</p>
        {exercise.workflowExamples.map((wf, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="font-header font-bold text-beyond-dark text-sm mb-3">{wf.name}</div>
            <ol className="space-y-1 mb-3">
              {wf.steps.map((step, j) => (
                <li key={j} className="text-xs font-body text-gray-600 flex items-start gap-2">
                  <span className="text-beyond-teal font-bold shrink-0">{j + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            {wf.humanInput && (
              <div className="bg-amber-50 rounded px-3 py-2 text-amber-700 text-xs font-body border border-amber-100">
                <span className="font-semibold">Your role: </span>{wf.humanInput}
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  // Template (Exercise 6.5 — AI OS document template)
  if (exercise.template) {
    blocks.push(<TemplateBlock key="template" template={exercise.template} />)
  }

  // Guide (Exercise 1.6 / 2.6 — setup guides)
  if (exercise.guide) {
    blocks.push(<GuideBlock key="guide" guide={exercise.guide} />)
  }

  // Translation patterns (EM Level 5 — 5E.1)
  if (exercise.translationPatterns?.length) {
    blocks.push(
      <div key="translationPatterns" className="space-y-3">
        <p className="text-xs font-header font-bold text-gray-400 uppercase tracking-wider">Translation Patterns</p>
        {exercise.translationPatterns.map((p, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="font-header font-bold text-beyond-dark text-sm mb-1">{p.name}</div>
            <p className="text-gray-500 text-xs font-body mb-2">{p.description}</p>
            {p.example && (
              <div className="bg-teal-50 rounded px-3 py-2 font-mono text-xs text-gray-700 border border-teal-100 leading-relaxed whitespace-pre-wrap">
                {p.example}
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  // Health signals (EM Level 5 — 5E.2)
  if (exercise.healthSignals?.length) {
    blocks.push(
      <div key="healthSignals" className="space-y-3">
        <p className="text-xs font-header font-bold text-gray-400 uppercase tracking-wider">Health Signal Categories</p>
        {exercise.healthSignals.map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="font-header font-bold text-beyond-dark text-sm mb-2">{s.category}</div>
            {s.signals?.length && (
              <ul className="space-y-0.5 mb-2">
                {s.signals.map((sig, j) => (
                  <li key={j} className="text-xs font-body text-gray-600 flex items-start gap-1.5">
                    <span className="text-beyond-teal shrink-0">·</span>{sig}
                  </li>
                ))}
              </ul>
            )}
            {s.whatItTells && (
              <p className="text-gray-500 text-xs font-body mb-2">
                <span className="font-semibold text-gray-600">What it tells you: </span>{s.whatItTells}
              </p>
            )}
            {s.nexusTool && (
              <div className="inline-block bg-beyond-teal/10 text-beyond-teal text-xs font-header font-semibold px-2 py-1 rounded">
                Nexus: {s.nexusTool}
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  // Shifts (EM Level 5 — 5E.3)
  if (exercise.shifts?.length) {
    blocks.push(
      <div key="shifts" className="space-y-4">
        <p className="text-xs font-header font-bold text-gray-400 uppercase tracking-wider">AI-Era Shifts</p>
        {exercise.shifts.map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="font-header font-bold text-beyond-dark text-sm mb-3">{s.area}</div>
            <div className="grid grid-cols-1 gap-3 mb-3 sm:grid-cols-2">
              <div className="bg-red-50 rounded-lg p-3">
                <div className="text-xs font-header font-semibold text-red-600 mb-1">Old World</div>
                <p className="text-xs font-body text-red-800 leading-relaxed">{s.oldWorld}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <div className="text-xs font-header font-semibold text-green-700 mb-1">New World</div>
                <p className="text-xs font-body text-green-800 leading-relaxed">{s.newWorld}</p>
              </div>
            </div>
            {s.leadershipQuestion && (
              <p className="text-gray-600 text-xs font-body italic mb-3">
                <span className="font-semibold not-italic text-gray-700">Leadership question: </span>{s.leadershipQuestion}
              </p>
            )}
            {s.prompt && (
              <div className="bg-gray-50 rounded px-3 py-2 font-mono text-xs text-gray-700 border border-gray-100 leading-relaxed whitespace-pre-wrap">
                {s.prompt}
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  // Partnership patterns (EM Level 5 — 5E.4)
  if (exercise.partnershipPatterns?.length) {
    blocks.push(
      <div key="partnershipPatterns" className="space-y-3">
        <p className="text-xs font-header font-bold text-gray-400 uppercase tracking-wider">Partnership Patterns</p>
        {exercise.partnershipPatterns.map((p, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="font-header font-bold text-beyond-dark text-sm mb-1">{p.name}</div>
            <p className="text-gray-500 text-xs font-body mb-2">{p.description}</p>
            {p.prompt && (
              <div className="bg-teal-50 rounded px-3 py-2 font-mono text-xs text-gray-700 border border-teal-100 leading-relaxed whitespace-pre-wrap italic">
                "{p.prompt}"
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  // Use cases (EM Level 5 — 5E.5)
  if (exercise.useCases?.length) {
    blocks.push(
      <div key="useCases" className="space-y-3">
        <p className="text-xs font-header font-bold text-gray-400 uppercase tracking-wider">Use Cases</p>
        {exercise.useCases.map((u, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="font-header font-bold text-beyond-dark text-sm mb-1">{u.name}</div>
            <p className="text-gray-500 text-xs font-body mb-2">{u.description}</p>
            {u.prompt && (
              <div className="bg-teal-50 rounded px-3 py-2 font-mono text-xs text-gray-700 border border-teal-100 leading-relaxed whitespace-pre-wrap italic">
                "{u.prompt}"
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  if (blocks.length === 0) return null

  return <div className="space-y-6">{blocks}</div>
}

// ─── New Format Sub-components ────────────────────────────────────────────────

function NewComparisonBlock({ bad, good }) {
  return (
    <div className="space-y-4">
      {bad && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <div className="text-xs font-header font-semibold text-red-600 mb-2">{bad.label || 'Search Query ❌'}</div>
          <div className="bg-white rounded-lg px-4 py-3 font-mono text-sm text-gray-700 mb-3 border border-red-100 leading-relaxed whitespace-pre-wrap">
            "{bad.prompt}"
          </div>
          <p className="text-red-700 text-sm font-body leading-relaxed">{bad.why}</p>
        </div>
      )}
      {good && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-5">
          <div className="text-xs font-header font-semibold text-green-700 mb-2">{good.label || 'Thought Partner ✅'}</div>
          <div className="bg-white rounded-lg px-4 py-3 font-mono text-sm text-gray-700 mb-3 border border-green-100 leading-relaxed whitespace-pre-wrap">
            "{good.prompt}"
          </div>
          <p className="text-green-700 text-sm font-body leading-relaxed">{good.why}</p>
        </div>
      )}
    </div>
  )
}

function TrackComparison({ label, data }) {
  // data.without / data.with can be a plain string or an object { label, prompt, response }
  const renderSide = (side, colorClass, headerClass, borderClass, label, icon) => {
    if (!side) return null
    const isObj = typeof side === 'object'
    return (
      <div className={`${colorClass} rounded-xl p-4`}>
        <div className={`text-xs font-header font-semibold ${headerClass} mb-2`}>
          {isObj && side.label ? side.label : label} {icon}
        </div>
        {isObj && side.prompt && (
          <div className={`bg-white rounded px-3 py-2 font-mono text-xs text-gray-600 ${borderClass} leading-relaxed whitespace-pre-wrap mb-2 max-h-48 overflow-y-auto`}>
            {side.prompt}
          </div>
        )}
        {isObj && side.response && (
          <div className="bg-white/70 rounded px-3 py-2 text-xs text-gray-500 font-body italic leading-relaxed max-h-32 overflow-y-auto">
            → {side.response}
          </div>
        )}
        {!isObj && (
          <div className={`bg-white rounded px-3 py-2 font-mono text-xs text-gray-600 ${borderClass} leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto`}>
            "{side}"
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      <p className="text-xs font-header font-bold text-gray-400 uppercase tracking-wider mb-2">{label}</p>
      <div className="grid grid-cols-2 gap-4">
        {renderSide(data.without, 'bg-red-50 border border-red-200', 'text-red-600', 'border border-red-100', 'Without', '❌')}
        {renderSide(data.with, 'bg-green-50 border border-green-200', 'text-green-700', 'border border-green-100', 'With framework', '✅')}
      </div>
    </div>
  )
}

function PatternCard({ pattern }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <div className="font-header font-bold text-beyond-dark text-sm mb-1">{pattern.name}</div>
      {pattern.description && (
        <p className="text-gray-500 text-xs font-body mb-2">{pattern.description}</p>
      )}
      {pattern.prompt && (
        <div className="bg-gray-50 rounded px-3 py-2.5 font-mono text-sm text-gray-700 mb-2 border border-gray-100 leading-relaxed">
          "{pattern.prompt}"
        </div>
      )}
      {pattern.example && !pattern.prompt && (
        <div className="bg-gray-50 rounded px-3 py-2.5 font-mono text-sm text-gray-700 mb-2 border border-gray-100 leading-relaxed italic">
          e.g. "{pattern.example}"
        </div>
      )}
      {pattern.steps?.length > 0 && (
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
      {pattern.template && (
        <div className="mt-2 bg-teal-50 rounded px-3 py-2 font-mono text-xs text-gray-700 border border-teal-100 leading-relaxed whitespace-pre-wrap">
          {pattern.template}
        </div>
      )}
    </div>
  )
}

function WorkedExampleBlock({ example, label }) {
  return (
    <div className="bg-teal-50 border border-teal-200 rounded-xl p-5">
      {label && <p className="text-xs font-header font-bold text-gray-400 uppercase tracking-wider mb-3">{label}</p>}
      <div className="font-header font-bold text-beyond-deep text-sm mb-1">{example.title}</div>
      {example.description && (
        <p className="text-beyond-deep/70 text-xs font-body mb-4">{example.description}</p>
      )}
      {example.steps?.length > 0 && (
        <div className="space-y-3">
          {example.steps.map((step, i) => (
            <div key={i} className="flex gap-3 bg-white rounded-lg p-3 border border-teal-100">
              <div className="w-6 h-6 bg-beyond-teal rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                {step.step || i + 1}
              </div>
              <div className="min-w-0">
                {step.name && <div className="font-header font-semibold text-beyond-dark text-xs mb-1">{step.name}</div>}
                {step.prompt && (
                  <div className="font-mono text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">{step.prompt}</div>
                )}
                {step.output && (
                  <div className="mt-2 bg-gray-50 rounded px-2 py-1.5 text-xs text-gray-600 font-body leading-relaxed italic">
                    Output: {step.output}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ToolCategoryCard({ category }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 bg-beyond-teal rounded-lg flex items-center justify-center text-white text-sm">
          {category.icon || '🔧'}
        </div>
        <div>
          <div className="font-header font-bold text-beyond-dark text-sm">{category.category || category.name}</div>
          {category.description && (
            <p className="text-gray-500 text-xs font-body">{category.description}</p>
          )}
        </div>
      </div>
      {category.tools?.length > 0 && (
        <div className="space-y-2">
          {category.tools.map((tool, i) => (
            <div key={i} className="bg-gray-50 rounded-lg px-3 py-2">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-header font-semibold text-beyond-dark text-xs">{tool.name}</span>
              </div>
              <p className="text-gray-500 text-xs font-body">{tool.description}</p>
              {tool.typicalWorkflow && (
                <p className="text-beyond-teal text-xs font-body mt-1 italic">💡 {tool.typicalWorkflow}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function StarterQueriesBlock({ queries, label }) {
  const [copiedIdx, setCopiedIdx] = useState(null)

  const copy = (text, idx) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIdx(idx)
      setTimeout(() => setCopiedIdx(null), 2000)
    })
  }

  return (
    <div className="space-y-3">
      {label && <p className="text-xs font-header font-bold text-gray-400 uppercase tracking-wider">{label}</p>}
      {queries.map((q, i) => (
        <div key={i} className="bg-teal-50 border border-teal-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-header font-semibold text-beyond-deep">{q.name || q.label || `Query ${i + 1}`}</p>
            <button
              onClick={() => copy(q.prompt || q.query || q.template || '', i)}
              className="text-xs font-body text-beyond-teal hover:text-beyond-deep flex items-center gap-1 transition-colors"
            >
              {copiedIdx === i ? '✓ Copied!' : '📋 Copy'}
            </button>
          </div>
          <div className="bg-white rounded-lg px-4 py-3 font-mono text-sm text-gray-700 border border-teal-100 leading-relaxed whitespace-pre-wrap">
            {q.prompt || q.query || q.template || ''}
          </div>
          {q.tip && <p className="mt-2 text-beyond-teal text-xs font-body italic">💡 {q.tip}</p>}
          {q.expectedOutput && <p className="mt-1 text-gray-500 text-xs font-body">Output: {q.expectedOutput}</p>}
        </div>
      ))}
    </div>
  )
}

function StarterLibraryBlock({ library }) {
  const [copiedIdx, setCopiedIdx] = useState(null)

  const copy = (text, idx) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIdx(idx)
      setTimeout(() => setCopiedIdx(null), 2000)
    })
  }

  return (
    <div className="space-y-3">
      <p className="text-xs font-header font-bold text-gray-400 uppercase tracking-wider">Your Starter Prompt Library</p>
      {library.map((entry, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="font-header font-bold text-beyond-dark text-sm">{entry.name}</div>
              {entry.when && <p className="text-gray-500 text-xs font-body">{entry.when}</p>}
            </div>
            <button
              onClick={() => copy(entry.template || '', i)}
              className="text-xs font-body text-beyond-teal hover:text-beyond-deep flex items-center gap-1 transition-colors shrink-0 ml-2"
            >
              {copiedIdx === i ? '✓ Copied!' : '📋 Copy'}
            </button>
          </div>
          {entry.template && (
            <div className="bg-gray-50 rounded px-3 py-2.5 font-mono text-xs text-gray-700 border border-gray-100 leading-relaxed whitespace-pre-wrap">
              {entry.template}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function ModelGuideBlock({ guide }) {
  return (
    <div className="space-y-4">
      {guide.models?.length > 0 && (
        <div className="space-y-3">
          {guide.models.map((model, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{model.emoji || '🤖'}</span>
                <div>
                  <div className="font-header font-bold text-beyond-dark text-sm">{model.name}</div>
                  <div className="text-gray-500 text-xs font-body">{model.tagline}</div>
                </div>
              </div>
              {model.strengths?.length > 0 && (
                <div className="mb-2">
                  <p className="text-xs font-header font-semibold text-green-700 mb-1">Best for</p>
                  <ul className="space-y-0.5">
                    {model.strengths.map((s, j) => (
                      <li key={j} className="text-xs font-body text-gray-600 flex items-start gap-1">
                        <span className="text-green-500 shrink-0">+</span>{s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {model.bestFor && (
                <div className="bg-teal-50 rounded-lg px-3 py-1.5">
                  <span className="text-xs font-header font-semibold text-beyond-deep">Use when: </span>
                  <span className="text-xs font-body text-beyond-dark">{model.bestFor}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {guide.rules?.length > 0 && (
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
          <h4 className="font-header font-bold text-beyond-dark text-sm mb-3">Decision Rules</h4>
          <div className="space-y-2">
            {guide.rules.map((rule, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-beyond-teal font-bold font-header text-sm shrink-0">→</span>
                <p className="text-sm font-body text-beyond-dark">{rule}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function SetupBlock({ setup }) {
  return (
    <div className="space-y-4">
      {setup.prerequisites?.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-xs font-header font-semibold text-amber-800 mb-2">Prerequisites</p>
          <ul className="space-y-1">
            {setup.prerequisites.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-amber-700 text-sm font-body">
                <span className="text-amber-400 shrink-0">□</span>{p}
              </li>
            ))}
          </ul>
        </div>
      )}
      {setup.installSteps?.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs font-header font-bold text-gray-400 uppercase tracking-wider">Installation Steps</p>
          {setup.installSteps.map((step, i) => (
            <div key={i} className="flex gap-4 bg-white rounded-xl border border-gray-100 p-4">
              <div className="w-7 h-7 bg-beyond-teal rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
                {step.step || i + 1}
              </div>
              <div>
                <div className="font-header font-bold text-beyond-dark text-sm mb-1">{step.instruction}</div>
                {step.command && (
                  <div className="bg-gray-900 rounded-lg px-3 py-2 font-mono text-sm text-green-400 mb-2">{step.command}</div>
                )}
                {step.detail && <p className="text-gray-500 text-xs font-body">{step.detail}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function InstallationBlock({ installation }) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-header font-bold text-gray-400 uppercase tracking-wider">Installation Steps</p>
      {(installation.steps || []).map((step, i) => (
        <div key={i} className="flex gap-4 bg-white rounded-xl border border-gray-100 p-4">
          <div className="w-7 h-7 bg-beyond-teal rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
            {step.step || i + 1}
          </div>
          <div>
            <div className="font-header font-bold text-beyond-dark text-sm mb-1">{step.instruction}</div>
            {step.command && (
              <div className="bg-gray-900 rounded-lg px-3 py-2 font-mono text-sm text-green-400 mb-2">{step.command}</div>
            )}
            {step.prompt && (
              <div className="bg-teal-50 rounded-lg px-3 py-2 font-mono text-sm text-gray-700 border border-teal-100 mb-2 leading-relaxed">
                {step.prompt}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function TemplateBlock({ template }) {
  if (!template.sections?.length) return null
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
      <div className="text-sm font-header font-semibold text-beyond-dark mb-4">Document Template</div>
      <div className="space-y-3">
        {template.sections.map((section, i) => (
          <div key={i} className="flex gap-3">
            <span className="text-beyond-teal font-bold font-header text-sm shrink-0">→</span>
            <div>
              <div className="font-header font-semibold text-beyond-dark text-sm">{section.title}</div>
              {section.guidance && <p className="text-gray-500 text-xs font-body">{section.guidance}</p>}
              {section.description && <p className="text-gray-500 text-xs font-body">{section.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function GuideBlock({ guide }) {
  if (!guide.sections?.length) return null
  return (
    <div className="bg-teal-50 border border-teal-200 rounded-xl p-5">
      <div className="text-sm font-header font-semibold text-beyond-deep mb-4">{guide.title || 'Guide'}</div>
      <div className="space-y-3">
        {guide.sections.map((section, i) => (
          <div key={i} className="bg-white rounded-lg p-3 border border-teal-100">
            <div className="text-xs font-header font-semibold text-beyond-dark mb-1">{section.title}</div>
            {section.guidance && <p className="text-xs font-body text-gray-600">{section.guidance}</p>}
            {section.example && (
              <div className="mt-1 text-xs font-mono text-gray-600 italic">e.g. "{section.example}"</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Legacy Content Renderers (unchanged) ────────────────────────────────────

function ComparisonContent({ content }) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-red-200 bg-red-50 p-5">
        <div className="text-xs font-header font-semibold text-red-600 mb-2">{content.badExample.label}</div>
        <div className="bg-white rounded-lg px-4 py-3 font-mono text-sm text-gray-700 mb-3 border border-red-100">
          "{content.badExample.prompt}"
        </div>
        <p className="text-red-700 text-sm font-body leading-relaxed">{content.badExample.why}</p>
      </div>

      <div className="rounded-xl border border-green-200 bg-green-50 p-5">
        <div className="text-xs font-header font-semibold text-green-700 mb-2">{content.goodExample.label}</div>
        <div className="bg-white rounded-lg px-4 py-3 font-mono text-sm text-gray-700 mb-3 border border-green-100 leading-relaxed whitespace-pre-wrap">
          "{content.goodExample.prompt}"
        </div>
        <p className="text-green-700 text-sm font-body leading-relaxed">{content.goodExample.why}</p>
      </div>

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
      <p className="exercise-prose">{content.framework.description}</p>
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

      {content.example && (
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-5">
          <div className="text-xs font-header font-semibold text-beyond-deep mb-3">{content.example.label}</div>
          <div className="bg-white rounded-lg px-4 py-4 font-mono text-sm text-gray-700 border border-teal-100 leading-relaxed whitespace-pre-wrap">
            {content.example.prompt}
          </div>
        </div>
      )}

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
        <PatternCard key={pattern.name} pattern={pattern} />
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
                  {step.prompt && (
                    <div className="mt-2 bg-gray-900 rounded-lg px-4 py-2.5 font-mono text-sm text-green-400 leading-relaxed whitespace-pre-wrap overflow-x-auto">
                      {step.prompt}
                    </div>
                  )}
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

      {content.reflection && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          <p className="text-xs font-header font-semibold text-amber-700 mb-1">Reflection</p>
          <p className="text-amber-800 text-sm font-body leading-relaxed">{content.reflection}</p>
        </div>
      )}

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

      {content.artifactTypes && (
        <div className="space-y-3">
          <p className="text-xs font-header font-bold text-gray-400 uppercase tracking-wider">Choose your artifact type:</p>
          {content.artifactTypes.map((a) => (
            <div key={a.type} className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 bg-beyond-teal rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold font-header">{a.type[0]}</span>
                </div>
                <div className="font-header font-bold text-beyond-dark text-sm">{a.type}</div>
              </div>
              <p className="text-gray-500 text-xs font-body mb-1"><span className="font-semibold text-gray-600">Use when: </span>{a.useWhen}</p>
              <p className="text-gray-500 text-xs font-body"><span className="font-semibold text-gray-600">Best for: </span>{a.bestFor}</p>
            </div>
          ))}
        </div>
      )}

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
              {p.tip && <p className="mt-2 text-beyond-teal text-xs font-body italic">💡 {p.tip}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ModelComparisonContent({ content }) {
  return (
    <div className="space-y-6">
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

// ─── Bonus Exercise Panel ─────────────────────────────────────────────────────
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
