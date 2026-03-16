import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../App.jsx'
import { LEVELS, getAllExerciseIds } from '../content/levels.js'
import { isLevelUnlocked, getLevelProgress, getOverallProgress, getEstimatedTimeSpent } from '../utils/progress.js'

export default function Dashboard() {
  const { user, progress } = useAppContext()
  const navigate = useNavigate()

  const allExerciseIds = getAllExerciseIds()
  const overallPct = getOverallProgress(allExerciseIds)
  const timeSpent = getEstimatedTimeSpent()
  const completedExercises = progress?.exercises_completed?.length || 0
  const completedLevels = progress?.levels_completed || []
  const currentLevel = progress?.current_level || 1

  const firstName = user?.name?.split(' ')[0] || 'there'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-8 py-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-header font-bold text-beyond-dark">
                Welcome back, {firstName}! 👋
              </h1>
              <p className="text-gray-500 font-body mt-1">
                {currentLevel <= 2
                  ? "You're in the early levels — the foundational stuff. Keep going."
                  : currentLevel <= 4
                  ? "Mid-course momentum. The skills are starting to compound."
                  : "You're in the advanced levels. This is where it gets interesting."}
              </p>
            </div>

            {/* Overall progress */}
            <div className="text-right">
              <div className="text-3xl font-bold font-header text-beyond-teal">{overallPct}%</div>
              <div className="text-gray-400 text-sm font-body">complete</div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-5">
            <div className="flex items-center justify-between text-xs text-gray-400 font-body mb-1.5">
              <span>Part-Time Hustle</span>
              <span>Destination Definer</span>
            </div>
            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-teal-gradient rounded-full transition-all duration-700"
                style={{ width: `${overallPct}%` }}
              />
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex gap-6 mt-5">
            {[
              { icon: '✅', value: completedExercises, label: 'exercises done' },
              { icon: '⏱️', value: timeSpent, label: 'time invested' },
              { icon: '🏆', value: completedLevels.length, label: 'levels complete' },
              { icon: '🔥', value: `Level ${currentLevel}`, label: 'current level' },
            ].map(stat => (
              <div key={stat.label} className="flex items-center gap-2">
                <span className="text-lg">{stat.icon}</span>
                <div>
                  <span className="font-header font-bold text-beyond-dark">{stat.value}</span>
                  <span className="text-gray-400 text-sm font-body ml-1">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Level cards */}
      <div className="max-w-5xl mx-auto px-8 py-8">
        <h2 className="text-lg font-header font-bold text-beyond-dark mb-6">Your Learning Journey</h2>

        <div className="grid grid-cols-2 gap-5 xl:grid-cols-3">
          {LEVELS.map((level) => (
            <LevelCard
              key={level.id}
              level={level}
              progress={progress}
              currentLevel={currentLevel}
              completedLevels={completedLevels}
              onClick={() => navigate(`/level/${level.id}`)}
            />
          ))}
        </div>

        {/* Continue learning CTA */}
        <div className="mt-8 bg-beyond-dark rounded-xl p-6 flex items-center justify-between">
          <div>
            <h3 className="text-white font-header font-bold text-lg">
              Continue Level {currentLevel}: {LEVELS[currentLevel - 1]?.title}
            </h3>
            <p className="text-gray-400 font-body text-sm mt-1">
              {LEVELS[currentLevel - 1]?.theme}
            </p>
          </div>
          <button
            onClick={() => navigate(`/level/${currentLevel}`)}
            className="btn-primary shrink-0 ml-6"
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Level Card ───────────────────────────────────────────────────────────────
function LevelCard({ level, progress, currentLevel, completedLevels, onClick }) {
  const exerciseIds = level.exercises.map(ex => ex.id)
  const pct = getLevelProgress(level.id, exerciseIds)
  const isCompleted = completedLevels.includes(level.id)
  const isCurrent = level.id === currentLevel
  const isUnlocked = isLevelUnlocked(level.id, progress)
  const isLocked = !isUnlocked

  return (
    <button
      onClick={isLocked ? undefined : onClick}
      className={`relative text-left rounded-xl border p-5 transition-all duration-200 ${
        isLocked
          ? 'bg-gray-50 border-gray-100 cursor-not-allowed opacity-60'
          : isCurrent
          ? 'bg-white border-beyond-teal/40 shadow-teal-glow hover:shadow-card-hover cursor-pointer'
          : isCompleted
          ? 'bg-white border-green-200 hover:shadow-card-hover cursor-pointer'
          : 'bg-white border-gray-100 hover:shadow-card-hover cursor-pointer'
      }`}
    >
      {/* Status indicator */}
      {isCurrent && (
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-beyond-teal/10 text-beyond-deep px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 bg-beyond-teal rounded-full animate-pulse-slow" />
          <span className="text-xs font-semibold font-header">Active</span>
        </div>
      )}
      {isCompleted && !isCurrent && (
        <div className="absolute top-3 right-3 text-green-500 text-lg">✅</div>
      )}
      {isLocked && (
        <div className="absolute top-3 right-3 text-gray-400 text-lg">🔒</div>
      )}
      {level.comingSoon && isUnlocked && (
        <div className="absolute top-3 right-3 badge badge-gray">Soon</div>
      )}

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
        style={{ backgroundColor: `${level.color}20` }}
      >
        {level.icon}
      </div>

      {/* Level info */}
      <div className="mb-1">
        <span className="text-xs font-header text-gray-400 font-medium">Level {level.id}</span>
      </div>
      <h3 className="font-header font-bold text-beyond-dark text-base mb-1 leading-snug">{level.title}</h3>
      <p className="text-gray-500 text-xs font-body mb-3 leading-relaxed line-clamp-2">
        {level.theme}
      </p>

      {/* Progress bar (only for active/unlocked levels) */}
      {!isLocked && (
        <div>
          <div className="flex justify-between text-xs font-body text-gray-400 mb-1">
            <span>{level.exercises.filter(ex => !ex.locked).length} exercises</span>
            <span>{pct}%</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${pct}%`,
                backgroundColor: isCompleted ? '#22c55e' : level.color,
              }}
            />
          </div>
        </div>
      )}

      {isLocked && (
        <p className="text-gray-400 text-xs font-body">
          Complete Level {level.id - 1} to unlock
        </p>
      )}

      {/* Duration */}
      <div className="mt-3 flex items-center gap-1 text-gray-400 text-xs font-body">
        <span>⏱️</span>
        <span>{level.duration}</span>
      </div>
    </button>
  )
}
