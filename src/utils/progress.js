// ─── Progress Tracking ───────────────────────────────────────────────────────
// Manages user data and progress in localStorage, with async sync to Google Sheets.

const USER_KEY = 'nexusyou_user'
const PROGRESS_KEY = 'nexusyou_progress'

// ─── User Management ─────────────────────────────────────────────────────────

export function getUser() {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveUser(userData) {
  localStorage.setItem(USER_KEY, JSON.stringify(userData))
}

export function clearUser() {
  localStorage.removeItem(USER_KEY)
  localStorage.removeItem(PROGRESS_KEY)
}

// ─── Progress Management ─────────────────────────────────────────────────────

const DEFAULT_PROGRESS = {
  current_level: 1,
  exercises_completed: [],
  exercise_data: {},
  assessments: {},
  levels_completed: [],
  started_at: new Date().toISOString(),
  last_active: new Date().toISOString(),
}

export function getProgress() {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY)
    if (!raw) return { ...DEFAULT_PROGRESS }
    return { ...DEFAULT_PROGRESS, ...JSON.parse(raw) }
  } catch {
    return { ...DEFAULT_PROGRESS }
  }
}

export function saveProgress(progressData) {
  const updated = {
    ...progressData,
    last_active: new Date().toISOString(),
  }
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(updated))
}

// Mark a specific exercise as completed with optional data
export function completeExercise(exerciseId, data = {}) {
  const progress = getProgress()

  if (!progress.exercises_completed.includes(exerciseId)) {
    progress.exercises_completed.push(exerciseId)
  }

  progress.exercise_data[exerciseId] = {
    status: 'completed',
    completed_at: new Date().toISOString(),
    ...data,
  }

  saveProgress(progress)
  return progress
}

// Check if a specific exercise is complete
export function isExerciseComplete(exerciseId) {
  const progress = getProgress()
  return progress.exercises_completed.includes(exerciseId)
}

// Get all exercise data for a specific exercise
export function getExerciseData(exerciseId) {
  const progress = getProgress()
  return progress.exercise_data[exerciseId] || null
}

// Save (but don't complete) exercise in-progress data
export function saveExerciseDraft(exerciseId, data) {
  const progress = getProgress()
  progress.exercise_data[exerciseId] = {
    status: 'in_progress',
    ...(progress.exercise_data[exerciseId] || {}),
    ...data,
    last_saved: new Date().toISOString(),
  }
  saveProgress(progress)
}

// Complete an entire level
export function completeLevel(levelId, assessmentData = {}) {
  const progress = getProgress()

  if (!progress.levels_completed.includes(levelId)) {
    progress.levels_completed.push(levelId)
  }

  progress.assessments[`level_${levelId}`] = {
    completed_at: new Date().toISOString(),
    ...assessmentData,
  }

  // Auto-advance current level
  if (progress.current_level === levelId && levelId < 6) {
    progress.current_level = levelId + 1
  }

  saveProgress(progress)
  return progress
}

// Check if a level is unlocked (level 1 is always unlocked)
export function isLevelUnlocked(levelId, progress) {
  if (levelId === 1) return true
  const p = progress || getProgress()
  return p.levels_completed.includes(levelId - 1)
}

// Get completion percentage for a specific level
export function getLevelProgress(levelId, exerciseIds) {
  const progress = getProgress()
  const completed = exerciseIds.filter(id => progress.exercises_completed.includes(id))
  return Math.round((completed.length / exerciseIds.length) * 100)
}

// Get overall course completion percentage
export function getOverallProgress(allExerciseIds) {
  const progress = getProgress()
  const completed = allExerciseIds.filter(id => progress.exercises_completed.includes(id))
  return Math.round((completed.length / allExerciseIds.length) * 100)
}

// Calculate estimated time spent (rough estimate based on exercises completed)
export function getEstimatedTimeSpent() {
  const progress = getProgress()
  // ~20 min per exercise on average
  const minutes = progress.exercises_completed.length * 20
  if (minutes < 60) return `${minutes}m`
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
}

// ─── Webhook Sync ────────────────────────────────────────────────────────────
// Fire-and-forget POST to Google Sheets webhook. Never blocks UI.

const WEBHOOK_URL = import.meta.env.VITE_GOOGLE_WEBHOOK_URL
  || 'https://script.google.com/macros/s/AKfycbx36WlzJ5sMZz3zgkgEs7iJ71C26qb6lE7m2IMeZp4JQ-LvH0rtarDxfEoSEXuB3tmqtA/exec'

async function postToWebhook(payload) {
  if (!WEBHOOK_URL) return // Silently skip if not configured

  try {
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      mode: 'no-cors', // Google Apps Script requires this
    })
  } catch (err) {
    // Silent failure - never block the user
    console.warn('[NexusYou] Webhook sync failed (non-blocking):', err.message)
  }
}

export function syncRegistration(user) {
  return postToWebhook({
    action: 'registration',
    user_name: user.name,
    user_email: user.email,
    user_role: user.role,
    buddy_name: user.buddy || null,
    timestamp: new Date().toISOString(),
  })
}

export function syncExerciseCompletion({ user, level, exercise, exerciseTitle, selfRating }) {
  return postToWebhook({
    action: 'progress_update',
    user_name: user.name,
    user_email: user.email,
    user_role: user.role,
    level,
    exercise,
    exercise_title: exerciseTitle,
    status: 'completed',
    self_rating: selfRating || null,
    buddy_name: user.buddy || null,
    timestamp: new Date().toISOString(),
  })
}

export function syncExerciseFeedback({ user, levelId, exercise, exerciseTitle, confidence, useful, comment }) {
  return postToWebhook({
    action: 'exercise_feedback',
    user_name: user.name,
    user_email: user.email,
    user_role: user.role,
    level: levelId,
    exercise,
    exercise_title: exerciseTitle,
    confidence_rating: confidence,
    useful,
    comment: comment || null,
    timestamp: new Date().toISOString(),
  })
}

export function syncSignal({ user, signalType, levelId, exercise, exerciseTitle, message, location }) {
  return postToWebhook({
    action: 'signal',
    user_name: user.name,
    user_email: user.email,
    user_role: user.role,
    signal_type: signalType,
    level: levelId || null,
    exercise: exercise || null,
    exercise_title: exerciseTitle || null,
    message,
    location: location || null,
    timestamp: new Date().toISOString(),
  })
}

export function syncLevelCompletion({ user, levelId, levelTitle, mcScore, totalMC }) {
  return postToWebhook({
    action: 'level_completed',
    user_name: user.name,
    user_email: user.email,
    user_role: user.role,
    level: levelId,
    level_title: levelTitle,
    mc_score: mcScore != null ? `${mcScore}/${totalMC}` : null,
    timestamp: new Date().toISOString(),
  })
}

export function syncCertification(user) {
  return postToWebhook({
    action: 'certification',
    user_name: user.name,
    user_email: user.email,
    user_role: user.role,
    completed_at: new Date().toISOString(),
    total_time_estimate: getEstimatedTimeSpent(),
  })
}
