import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppContext } from '../App.jsx'
import { LEVELS, getLevelExerciseIds } from '../content/levels.js'
import { getTrackForRole, getLevel5Exercises } from '../content/level5.js'
import { isLevelUnlocked, isExerciseComplete, getLevelProgress, completeLevel } from '../utils/progress.js'
import { postLevelCompletion } from '../utils/slack.js'
import { evaluateAssessment } from '../utils/api.js'
import { MILESTONE_JOKES } from '../content/dadJokes.js'
import Exercise from './Exercise.jsx'

export default function LevelView() {
  const { levelId } = useParams()
  const { user, progress, refreshProgress } = useAppContext()
  const navigate = useNavigate()

  const level = LEVELS.find(l => l.id === parseInt(levelId))
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [showAssessment, setShowAssessment] = useState(false)
  const [showMilestone, setShowMilestone] = useState(false)
  const [assessmentAnswers, setAssessmentAnswers] = useState({})
  const [assessmentSubmitted, setAssessmentSubmitted] = useState(false)
  const [assessmentFeedback, setAssessmentFeedback] = useState(null)
  const [assessmentLoading, setAssessmentLoading] = useState(false)
  const [selfReflection, setSelfReflection] = useState('')
  // Level 5 track selection
  const [selectedTrack, setSelectedTrack] = useState(() => getTrackForRole(user?.role))

  // Redirect if level not found or locked
  useEffect(() => {
    if (!level) {
      navigate('/dashboard')
      return
    }
    if (level.comingSoon && !isLevelUnlocked(level.id, progress)) {
      navigate('/dashboard')
      return
    }
    // Reset index and derive exercises when level changes
    setCurrentExerciseIndex(0)
  }, [level, levelId])

  // Sync track to user role when user changes
  useEffect(() => {
    setSelectedTrack(getTrackForRole(user?.role))
  }, [user?.role])

  if (!level) return null

  // For Level 5, use track-filtered exercises
  const activeExercises = level.hasTracks
    ? level.exercises.filter(ex => ex.track === selectedTrack || ex.track === 'all')
    : level.exercises

  const exerciseIds = level.hasTracks
    ? getLevelExerciseIds(level.id, selectedTrack)
    : getLevelExerciseIds(level.id)
  const levelPct = getLevelProgress(level.id, exerciseIds)
  const allExercisesComplete = exerciseIds.every(id => isExerciseComplete(id))
  const levelAlreadyComplete = progress?.levels_completed?.includes(level.id)

  const currentExercise = activeExercises[currentExerciseIndex]
  const isCurrentComplete = currentExercise ? isExerciseComplete(currentExercise.id) : false

  const handleTrackSwitch = (track) => {
    setSelectedTrack(track)
    setCurrentExerciseIndex(0)
    window.scrollTo(0, 0)
  }

  const handleExerciseComplete = (exerciseId) => {
    refreshProgress()
    // Auto-advance after a short delay
    setTimeout(() => {
      const nextIndex = currentExerciseIndex + 1
      if (nextIndex < activeExercises.length) {
        setCurrentExerciseIndex(nextIndex)
        window.scrollTo(0, 0)
      } else if (level.assessment && !levelAlreadyComplete) {
        setShowAssessment(true)
        window.scrollTo(0, 0)
      }
    }, 1000)
  }

  const handleAssessmentSubmit = async (e) => {
    e.preventDefault()
    setAssessmentLoading(true)

    try {
      // Score multiple choice — supports both old format (q.id + letter correct) and new format (index correct)
      const questions = activeAssessment?.questions || []
      const mcScore = questions.reduce((acc, q, qi) => {
        const userAnswer = assessmentAnswers[q.id || qi]
        // New format: correct is 0-indexed number, answers stored by index
        if (typeof q.correct === 'number') {
          return acc + (userAnswer === q.correct ? 1 : 0)
        }
        // Old format: correct is a letter like 'A'
        return acc + (userAnswer === q.correct ? 1 : 0)
      }, 0)
      const totalMC = questions.length

      // Get AI evaluation of self-reflection (if there's an API key)
      let reflectionFeedback = null
      if (selfReflection.trim()) {
        try {
          reflectionFeedback = await evaluateAssessment({
            user,
            levelTitle: level.title,
            submission: selfReflection,
            rubric: 'Evaluate this self-reflection for genuine insight and specificity about what they learned.',
          })
        } catch {
          // Non-blocking
        }
      }

      setAssessmentFeedback({
        mcScore,
        totalMC,
        reflectionFeedback,
      })
      setAssessmentSubmitted(true)

      // Complete the level
      completeLevel(level.id, {
        mc_score: mcScore,
        self_rating: assessmentAnswers[level.assessment.selfReflection?.id],
      })
      refreshProgress()

      // Post to Slack
      postLevelCompletion(user, level.id, level.title)

      // Show milestone after delay
      setTimeout(() => {
        setShowAssessment(false)
        setShowMilestone(true)
        window.scrollTo(0, 0)
      }, 3000)
    } catch (err) {
      console.error('Assessment submission error:', err)
    } finally {
      setAssessmentLoading(false)
    }
  }

  // Resolve assessment — may be on level object or on the capstone exercise
  const capstoneExercise = level.exercises?.find(ex => ex.isCapstone)
  const activeAssessment = level.assessment || capstoneExercise?.assessment

  // Show milestone
  if (showMilestone) {
    return <MilestonePage level={level} user={user} capstoneExercise={capstoneExercise} onContinue={() => navigate('/dashboard')} />
  }

  // Show assessment
  if (showAssessment && activeAssessment && !levelAlreadyComplete) {
    return (
      <AssessmentPage
        level={level}
        assessment={activeAssessment}
        user={user}
        answers={assessmentAnswers}
        setAnswers={setAssessmentAnswers}
        selfReflection={selfReflection}
        setSelfReflection={setSelfReflection}
        onSubmit={handleAssessmentSubmit}
        submitted={assessmentSubmitted}
        feedback={assessmentFeedback}
        loading={assessmentLoading}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Level header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-gray-400 hover:text-beyond-dark transition-colors text-sm font-body"
              >
                ← Back to Journey
              </button>
              <span className="text-gray-200">|</span>
              <div className="flex items-center gap-2">
                <span className="text-xl">{level.icon}</span>
                <div>
                  <span className="text-xs text-gray-400 font-body">Level {level.id}</span>
                  <h1 className="text-base font-header font-bold text-beyond-dark leading-tight">{level.title}</h1>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-xs text-gray-400 font-body">{levelPct}% complete</div>
                <div className="h-1.5 w-32 bg-gray-100 rounded-full overflow-hidden mt-1">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${levelPct}%`, backgroundColor: level.color }}
                  />
                </div>
              </div>

              {allExercisesComplete && !levelAlreadyComplete && activeAssessment && (
                <button
                  onClick={() => { setShowAssessment(true); window.scrollTo(0, 0) }}
                  className="btn-primary text-sm"
                >
                  Take Assessment →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex min-h-[calc(100vh-73px)]">
        {/* Exercise sidebar */}
        <aside className="w-64 shrink-0 bg-white border-r border-gray-100 p-4 sticky top-[73px] h-[calc(100vh-73px)] overflow-y-auto">
          {/* Level 5 track selector */}
          {level.hasTracks && (
            <div className="mb-4">
              <p className="text-xs font-header font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">Your Track</p>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => handleTrackSwitch('pm')}
                  className={`flex-1 py-1.5 rounded-md text-xs font-header font-semibold transition-all ${
                    selectedTrack === 'pm' ? 'bg-white text-beyond-dark shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  PM Track
                </button>
                <button
                  onClick={() => handleTrackSwitch('design')}
                  className={`flex-1 py-1.5 rounded-md text-xs font-header font-semibold transition-all ${
                    selectedTrack === 'design' ? 'bg-white text-beyond-dark shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Design Track
                </button>
              </div>
            </div>
          )}

          <h3 className="text-xs font-header font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">
            Exercises
          </h3>
          <div className="space-y-1">
            {activeExercises.map((ex, idx) => {
              const isDone = isExerciseComplete(ex.id)
              const isCurrent = idx === currentExerciseIndex && !showAssessment
              const isLocked = ex.locked

              return (
                <button
                  key={ex.id}
                  onClick={() => !isLocked && setCurrentExerciseIndex(idx)}
                  disabled={isLocked}
                  className={`w-full text-left flex items-start gap-2.5 px-3 py-2.5 rounded-lg transition-colors duration-150 ${
                    isLocked
                      ? 'text-gray-300 cursor-not-allowed'
                      : isCurrent
                      ? 'bg-teal-50 border border-teal-200 text-beyond-deep'
                      : isDone
                      ? 'text-green-700 hover:bg-green-50'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className={`shrink-0 mt-0.5 text-sm ${
                    isDone ? 'text-green-500' : isCurrent ? 'text-beyond-teal' : 'text-gray-300'
                  }`}>
                    {isDone ? '✓' : isCurrent ? '▶' : '○'}
                  </span>
                  <div className="min-w-0">
                    <div className={`text-xs font-header font-semibold truncate ${isLocked ? 'opacity-40' : ''}`}>
                      {ex.id} — {ex.title}
                    </div>
                    <div className="text-xs text-gray-400 font-body">{ex.duration}</div>
                  </div>
                </button>
              )
            })}

            {/* Assessment item */}
            {activeAssessment && (
              <button
                onClick={() => allExercisesComplete && setShowAssessment(true)}
                disabled={!allExercisesComplete}
                className={`w-full text-left flex items-start gap-2.5 px-3 py-2.5 rounded-lg transition-colors duration-150 mt-2 ${
                  levelAlreadyComplete
                    ? 'text-green-700'
                    : !allExercisesComplete
                    ? 'text-gray-300 cursor-not-allowed'
                    : showAssessment
                    ? 'bg-teal-50 border border-teal-200 text-beyond-deep'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className={`shrink-0 mt-0.5 text-sm ${levelAlreadyComplete ? 'text-green-500' : 'text-gray-300'}`}>
                  {levelAlreadyComplete ? '✓' : '○'}
                </span>
                <div>
                  <div className="text-xs font-header font-semibold">Level Assessment</div>
                  <div className="text-xs text-gray-400 font-body">Final check</div>
                </div>
              </button>
            )}
          </div>

          {/* Navigation */}
          <div className="mt-6 pt-4 border-t border-gray-100 space-y-2">
            {currentExerciseIndex > 0 && (
              <button
                onClick={() => setCurrentExerciseIndex(prev => prev - 1)}
                className="w-full btn-ghost text-sm text-center"
              >
                ← Previous exercise
              </button>
            )}
            {currentExerciseIndex < activeExercises.length - 1 && (
              <button
                onClick={() => setCurrentExerciseIndex(prev => prev + 1)}
                className="w-full btn-ghost text-sm text-center"
              >
                Next exercise →
              </button>
            )}
          </div>
        </aside>

        {/* Main exercise content */}
        <main className="flex-1 px-8 py-8 max-w-3xl">
          {currentExercise ? (
            <Exercise
              key={currentExercise.id}
              exercise={currentExercise}
              level={level}
              user={user}
              onComplete={handleExerciseComplete}
              onExerciseStart={() => {}}
            />
          ) : (
            <div className="text-center py-16 text-gray-400 font-body">
              Select an exercise from the sidebar to begin.
            </div>
          )}

          {/* Next exercise nav at bottom */}
          {isCurrentComplete && currentExerciseIndex < activeExercises.length - 1 && (
            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => {
                  setCurrentExerciseIndex(prev => prev + 1)
                  window.scrollTo(0, 0)
                }}
                className="btn-primary"
              >
                Next: {activeExercises[currentExerciseIndex + 1]?.title} →
              </button>
            </div>
          )}

          {allExercisesComplete && !levelAlreadyComplete && activeAssessment && (
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-header font-bold text-beyond-deep">All exercises complete! 🎉</h3>
                  <p className="text-beyond-deep/70 text-sm font-body">Ready to take the Level {level.id} assessment?</p>
                </div>
                <button
                  onClick={() => { setShowAssessment(true); window.scrollTo(0, 0) }}
                  className="btn-primary shrink-0 ml-4"
                >
                  Take Assessment →
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

// ─── Assessment Page ──────────────────────────────────────────────────────────
// Handles both old format (q.id + q.text + letter correct) and new format (q.question + index correct + q.explanation)
function AssessmentPage({ level, assessment, user, answers, setAnswers, selfReflection, setSelfReflection, onSubmit, submitted, feedback, loading }) {
  const [revealedExplanations, setRevealedExplanations] = useState({})

  const questions = assessment?.questions || []

  // Detect format: new format uses q.question and numeric q.correct
  const isNewFormat = questions.length > 0 && (questions[0].question !== undefined || typeof questions[0].correct === 'number')

  const getAnswerKey = (q, qi) => q.id || qi
  const isAnswered = (q, qi) => answers[getAnswerKey(q, qi)] !== undefined
  const isCorrect = (q, qi) => {
    const userAnswer = answers[getAnswerKey(q, qi)]
    if (typeof q.correct === 'number') return userAnswer === q.correct
    return userAnswer === q.correct
  }

  const handleAnswer = (q, qi, value) => {
    const key = getAnswerKey(q, qi)
    setAnswers(prev => ({ ...prev, [key]: value }))
    // Show explanation after answering (new format)
    if (isNewFormat) setRevealedExplanations(prev => ({ ...prev, [key]: true }))
  }

  const allAnswered = questions.every((q, qi) => isAnswered(q, qi))

  // Self-reflection: new format is a plain string, old format is {question, placeholder}
  const selfReflectionPrompt = typeof assessment?.selfReflection === 'string'
    ? assessment.selfReflection
    : assessment?.selfReflection?.question

  const selfReflectionPlaceholder = typeof assessment?.selfReflection === 'string'
    ? 'Share your reflection...'
    : assessment?.selfReflection?.placeholder

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-8 max-w-3xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => window.history.back()}
          className="text-gray-400 hover:text-beyond-dark text-sm font-body mb-4 flex items-center gap-1"
        >
          ← Back to exercises
        </button>
        <h2 className="text-2xl font-header font-bold text-beyond-dark">{level.assessment?.title || `Level ${level.id} Assessment`}</h2>
        <p className="text-gray-500 font-body mt-1">Quick check on what you learned. No trick questions.</p>
      </div>

      {submitted && feedback ? (
        <div className="animate-fade-in">
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🎉</span>
              <h3 className="font-header font-bold text-green-800">Assessment complete!</h3>
            </div>
            <p className="text-green-700 font-body">
              Multiple choice: {feedback.mcScore}/{feedback.totalMC} correct
            </p>
            {feedback.reflectionFeedback && (
              <div className="mt-4 pt-4 border-t border-green-200">
                <p className="text-xs font-header font-semibold text-green-800 mb-2">AI Coach on your reflection:</p>
                <p className="text-green-700 text-sm font-body whitespace-pre-wrap">{feedback.reflectionFeedback}</p>
              </div>
            )}
          </div>
          <p className="text-gray-500 font-body text-sm text-center">Redirecting to your milestone... 🏆</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-6">
          {questions.map((q, qi) => {
            const key = getAnswerKey(q, qi)
            const questionText = q.question || q.text
            const answered = isAnswered(q, qi)
            const correct = isCorrect(q, qi)
            const showExplanation = revealedExplanations[key] && q.explanation

            return (
              <div key={key} className="card">
                <p className="font-header font-semibold text-beyond-dark mb-4">
                  {qi + 1}. {questionText}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt, oi) => {
                    // New format: options are plain strings, value is index
                    // Old format: options may start with a letter like "A) text", value is the first char
                    const isNewFmt = typeof q.correct === 'number'
                    const optValue = isNewFmt ? oi : opt[0]
                    const isSelected = answers[key] === optValue
                    const isOptCorrect = isNewFmt ? oi === q.correct : opt[0] === q.correct

                    let borderClass = 'border-gray-100 hover:border-beyond-gray hover:bg-gray-50'
                    if (isSelected && answered && isNewFmt) {
                      borderClass = isOptCorrect ? 'border-green-400 bg-green-50' : 'border-red-300 bg-red-50'
                    } else if (!isSelected && answered && isNewFmt && isOptCorrect) {
                      borderClass = 'border-green-400 bg-green-50'
                    } else if (isSelected && !isNewFmt) {
                      borderClass = 'border-beyond-teal bg-teal-50'
                    }

                    return (
                      <label
                        key={oi}
                        className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${borderClass}`}
                      >
                        <input
                          type="radio"
                          name={String(key)}
                          value={optValue}
                          checked={isSelected}
                          onChange={() => handleAnswer(q, qi, optValue)}
                          className="mt-0.5 accent-beyond-teal"
                        />
                        <span className="text-beyond-dark text-sm font-body">{opt}</span>
                      </label>
                    )
                  })}
                </div>
                {showExplanation && (
                  <div className={`mt-3 rounded-lg px-4 py-3 text-sm font-body border ${correct ? 'bg-green-50 border-green-200 text-green-800' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
                    <span className="font-semibold">{correct ? '✓ Correct! ' : '✗ Not quite. '}</span>
                    {q.explanation}
                  </div>
                )}
              </div>
            )
          })}

          {/* Self-reflection */}
          {selfReflectionPrompt && (
            <div className="card">
              <label className="label mb-2">{selfReflectionPrompt}</label>
              <textarea
                value={selfReflection}
                onChange={(e) => setSelfReflection(e.target.value)}
                placeholder={selfReflectionPlaceholder}
                rows={5}
                className="textarea-field"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !allAnswered}
            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-40"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Evaluating...
              </>
            ) : (
              'Submit Assessment →'
            )}
          </button>
        </form>
      )}
    </div>
  )
}

// ─── Milestone Page ───────────────────────────────────────────────────────────
// Handles both old format (level.milestone) and new format (capstoneExercise.milestone)
function MilestonePage({ level, user, capstoneExercise, onContinue }) {
  const legacyJoke = MILESTONE_JOKES[level.id]
  // New format: milestone on capstone exercise; old format: on level
  const milestone = capstoneExercise?.milestone || level.milestone
  const isCertification = milestone?.certification === true

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = '@keyframes bounce-in { 0% { transform: scale(0.5); opacity: 0; } 70% { transform: scale(1.1); } 100% { transform: scale(1); opacity: 1; } }'
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  // For certification: send Slack notification (reuse postLevelCompletion from static import)
  useEffect(() => {
    if (!isCertification || !user) return
    postLevelCompletion(user, level.id, `${level.title} — CERTIFIED 🏆`)
  }, [isCertification])

  // Replace placeholders in certificationMessage
  const certMessage = milestone?.certificationMessage
    ?.replace('[Name]', user?.name || 'A NexusYou Graduate')
    ?.replace('[Role]', user?.role || 'Product Team')
    ?.replace('[time estimate]', 'several hours of focused learning')

  // Joke: new format uses milestone.dadJoke, old uses MILESTONE_JOKES lookup
  const jokeText = milestone?.dadJoke || legacyJoke?.text

  // Next level teaser: new format uses milestone.nextLevel, old uses milestone.nextLevelTeaser
  const nextTeaser = milestone?.nextLevel || milestone?.nextLevelTeaser

  return (
    <div className="min-h-screen bg-beyond-dark flex items-center justify-center px-8 py-12">
      <div className="max-w-2xl text-center">
        {/* Icon */}
        <div className="text-8xl mb-6" style={{ animation: 'bounce-in 0.6s ease-out forwards' }}>
          {milestone?.emoji || level.icon}
        </div>

        {/* Certification badge */}
        {isCertification && (
          <div className="inline-flex items-center gap-2 bg-beyond-teal/20 border border-beyond-teal/40 rounded-full px-4 py-2 mb-6">
            <span className="text-beyond-teal text-sm font-header font-bold">🏆 CERTIFIED PORTFOLIO MANAGER</span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl font-header font-bold text-white mb-4">
          {milestone?.title || `Level ${level.id} Complete!`}
        </h1>

        {/* Message */}
        <p className="text-gray-300 text-lg font-body leading-relaxed mb-8">
          {milestone?.message}
        </p>

        {/* Certification message */}
        {isCertification && certMessage && (
          <div className="bg-beyond-teal/10 border border-beyond-teal/30 rounded-xl px-6 py-4 mb-6 text-left">
            <p className="text-beyond-teal text-xs font-header font-semibold uppercase mb-2">Certification</p>
            <p className="text-gray-200 font-body text-sm leading-relaxed">{certMessage}</p>
          </div>
        )}

        {/* Joke */}
        {jokeText && (
          <div className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 mb-8 text-left">
            <p className="text-gray-400 text-xs font-header font-semibold uppercase mb-2">
              Gerard wanted me to share this one:
            </p>
            <p className="text-gray-200 font-body italic">"{jokeText}"</p>
          </div>
        )}

        {/* Next level teaser */}
        {nextTeaser && (
          <p className="text-gray-400 font-body text-sm mb-8">{nextTeaser}</p>
        )}

        <div className="flex gap-4 justify-center">
          <button onClick={onContinue} className="btn-primary px-8 py-3 text-base">
            Continue to Dashboard →
          </button>
        </div>

        {/* Progress indicator */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i === level.id ? 'w-6 bg-beyond-teal' : i < level.id ? 'bg-beyond-teal/50' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
