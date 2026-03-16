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
      // Score multiple choice
      const mcScore = level.assessment.questions.reduce((acc, q) => {
        return acc + (assessmentAnswers[q.id] === q.correct ? 1 : 0)
      }, 0)
      const totalMC = level.assessment.questions.length

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

  // Show milestone
  if (showMilestone) {
    return <MilestonePage level={level} user={user} onContinue={() => navigate('/dashboard')} />
  }

  // Show assessment
  if (showAssessment && level.assessment && !levelAlreadyComplete) {
    return (
      <AssessmentPage
        level={level}
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

              {allExercisesComplete && !levelAlreadyComplete && level.assessment && (
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
            {level.assessment && (
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

          {allExercisesComplete && !levelAlreadyComplete && level.assessment && (
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
function AssessmentPage({ level, user, answers, setAnswers, selfReflection, setSelfReflection, onSubmit, submitted, feedback, loading }) {
  return (
    <div className="min-h-screen bg-gray-50 px-8 py-8 max-w-3xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => window.history.back()}
          className="text-gray-400 hover:text-beyond-dark text-sm font-body mb-4 flex items-center gap-1"
        >
          ← Back to exercises
        </button>
        <h2 className="text-2xl font-header font-bold text-beyond-dark">{level.assessment.title}</h2>
        <p className="text-gray-500 font-body mt-1">
          Quick check on what you learned. No trick questions.
        </p>
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
          <p className="text-gray-500 font-body text-sm text-center">
            Redirecting to your milestone... 🏆
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Multiple choice questions */}
          {level.assessment.questions.map((q, qi) => (
            <div key={q.id} className="card">
              <p className="font-header font-semibold text-beyond-dark mb-4">
                {qi + 1}. {q.text}
              </p>
              <div className="space-y-2">
                {q.options.map((opt) => (
                  <label
                    key={opt}
                    className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      answers[q.id] === opt[0]
                        ? 'border-beyond-teal bg-teal-50'
                        : 'border-gray-100 hover:border-beyond-gray hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name={q.id}
                      value={opt[0]}
                      checked={answers[q.id] === opt[0]}
                      onChange={() => setAnswers(prev => ({ ...prev, [q.id]: opt[0] }))}
                      className="mt-0.5 accent-beyond-teal"
                    />
                    <span className="text-beyond-dark text-sm font-body">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          {/* Self-reflection */}
          {level.assessment.selfReflection && (
            <div className="card">
              <label className="label mb-2">
                {level.assessment.selfReflection.question}
              </label>
              <textarea
                value={selfReflection}
                onChange={(e) => setSelfReflection(e.target.value)}
                placeholder={level.assessment.selfReflection.placeholder}
                rows={5}
                className="textarea-field"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading || level.assessment.questions.some(q => !answers[q.id])}
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
function MilestonePage({ level, user, onContinue }) {
  const joke = MILESTONE_JOKES[level.id]
  const milestone = level.milestone

  useEffect(() => {
    // Trigger confetti-like celebration
    const style = document.createElement('style')
    style.textContent = '@keyframes bounce-in { 0% { transform: scale(0.5); opacity: 0; } 70% { transform: scale(1.1); } 100% { transform: scale(1); opacity: 1; } }'
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  return (
    <div className="min-h-screen bg-beyond-dark flex items-center justify-center px-8 py-12">
      <div className="max-w-2xl text-center">
        {/* Icon */}
        <div
          className="text-8xl mb-6"
          style={{ animation: 'bounce-in 0.6s ease-out forwards' }}
        >
          {milestone?.emoji || level.icon}
        </div>

        {/* Title */}
        <h1 className="text-4xl font-header font-bold text-white mb-4">
          {milestone?.title || `Level ${level.id} Complete!`}
        </h1>

        {/* Message */}
        <p className="text-gray-300 text-lg font-body leading-relaxed mb-8">
          {milestone?.message}
        </p>

        {/* Gerard's joke */}
        {joke && (
          <div className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 mb-8 text-left">
            <p className="text-gray-400 text-xs font-header font-semibold uppercase mb-2">
              Gerard wanted me to share this one:
            </p>
            <p className="text-gray-200 font-body italic">"{joke.text}"</p>
          </div>
        )}

        {/* Next level teaser */}
        {milestone?.nextLevelTeaser && (
          <p className="text-gray-400 font-body text-sm mb-8">
            {milestone.nextLevelTeaser}
          </p>
        )}

        <div className="flex gap-4 justify-center">
          <button
            onClick={onContinue}
            className="btn-primary px-8 py-3 text-base"
          >
            Continue to Dashboard →
          </button>
        </div>

        {/* Progress indicator */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i === level.id
                  ? 'w-6 bg-beyond-teal'
                  : i < level.id
                  ? 'bg-beyond-teal/50'
                  : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
