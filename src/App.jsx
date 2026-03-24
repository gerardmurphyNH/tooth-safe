import { useState, useEffect, createContext, useContext } from 'react'
import { HashRouter, Routes, Route, Navigate, NavLink, useNavigate, Outlet } from 'react-router-dom'
import { getUser, getProgress, saveUser } from './utils/progress.js'
import Welcome from './components/Welcome.jsx'
import Dashboard from './components/Dashboard.jsx'
import LevelView from './components/LevelView.jsx'
import PromptPlayground from './components/PromptPlayground.jsx'
import Certification from './components/Certification.jsx'
import AICoach from './components/AICoach.jsx'
import SignalPanel from './components/SignalPanel.jsx'
import { LEVELS } from './content/levels.js'

// ─── App Context ─────────────────────────────────────────────────────────────
export const AppContext = createContext(null)
export function useAppContext() {
  return useContext(AppContext)
}

// ─── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null)
  const [progress, setProgress] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = getUser()
    const savedProgress = getProgress()
    setUser(savedUser)
    setProgress(savedProgress)
    setLoading(false)
  }, [])

  const handleRegister = (userData) => {
    setUser(userData)
    const freshProgress = getProgress()
    setProgress(freshProgress)
  }

  const refreshProgress = () => {
    setProgress(getProgress())
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-beyond-dark flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-beyond-teal border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm font-header">Loading NexusYou...</p>
        </div>
      </div>
    )
  }

  const contextValue = { user, progress, refreshProgress, setUser }

  return (
    <AppContext.Provider value={contextValue}>
      <HashRouter>
        <Routes>
          {/* Welcome / Registration — full page, no sidebar */}
          <Route
            path="/"
            element={
              user ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Welcome onRegister={handleRegister} />
              )
            }
          />

          {/* Authenticated app routes — with sidebar layout */}
          <Route
            element={
              user ? (
                <AppLayout user={user} progress={progress} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/level/:levelId" element={<LevelView />} />
            <Route path="/playground" element={<PromptPlayground />} />
            <Route path="/certification" element={<Certification />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to={user ? '/dashboard' : '/'} replace />} />
        </Routes>
      </HashRouter>
    </AppContext.Provider>
  )
}

// ─── App Layout (Sidebar + Content) ─────────────────────────────────────────
function AppLayout({ user, progress }) {
  const [coachOpen, setCoachOpen] = useState(false)
  const navigate = useNavigate()

  const completedLevels = progress?.levels_completed || []
  const currentLevel = progress?.current_level || 1

  const unlockedLevelIds = LEVELS
    .filter(l => !l.locked || l.id === 1 || completedLevels.includes(l.id - 1))
    .map(l => l.id)

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ── Sidebar ──────────────────────────────────────────────────────── */}
      <aside className="w-64 shrink-0 sidebar-gradient flex flex-col fixed top-0 left-0 h-screen z-40 shadow-xl">
        {/* Logo */}
        <div className="px-6 py-6 border-b border-white/10">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-3 text-left w-full group"
          >
            <div className="w-9 h-9 bg-beyond-teal rounded-lg flex items-center justify-center shrink-0 group-hover:bg-teal-400 transition-colors">
              <span className="text-lg">🏠</span>
            </div>
            <div>
              <div className="text-white font-header font-bold text-lg leading-tight">NexusYou</div>
              <div className="text-gray-400 text-xs font-body">Get Beyond Prompting</div>
            </div>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <div className="space-y-1 mb-8">
            <NavItem to="/dashboard" icon="🗺️" label="My Journey" />
            <NavItem to="/playground" icon="⚡" label="Prompt Playground" />
          </div>

          {/* Level navigation */}
          <div className="mb-3">
            <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold px-2 mb-2 font-header">Levels</p>
          </div>
          <div className="space-y-1">
            {LEVELS.map((level) => {
              const isUnlocked = unlockedLevelIds.includes(level.id)
              const isCompleted = completedLevels.includes(level.id)
              const isCurrent = level.id === currentLevel

              return (
                <button
                  key={level.id}
                  onClick={() => isUnlocked && navigate(`/level/${level.id}`)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors duration-150 text-left ${
                    isUnlocked
                      ? isCurrent
                        ? 'bg-teal-500/20 text-beyond-teal'
                        : isCompleted
                        ? 'text-green-400 hover:bg-white/10'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                      : 'text-gray-600 cursor-not-allowed'
                  }`}
                >
                  <span className="text-base">{level.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className={`font-medium truncate font-header text-xs ${isUnlocked ? '' : 'opacity-50'}`}>
                      {level.title}
                    </div>
                  </div>
                  <span className="text-xs shrink-0">
                    {isCompleted ? '✅' : isUnlocked ? '' : '🔒'}
                  </span>
                </button>
              )
            })}
          </div>
        </nav>

        {/* AI Coach toggle */}
        <div className="px-4 py-4 border-t border-white/10">
          <button
            onClick={() => setCoachOpen(!coachOpen)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-150"
          >
            <span className="text-base">🤖</span>
            <span className="font-header font-medium">AI Coach</span>
            <span className={`ml-auto text-xs transition-transform duration-200 ${coachOpen ? 'rotate-180' : ''}`}>▲</span>
          </button>
        </div>

        {/* User info */}
        <div className="px-6 py-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-beyond-coral rounded-full flex items-center justify-center shrink-0">
              <span className="text-white text-sm font-bold font-header">
                {user?.name?.[0]?.toUpperCase() || '?'}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-white text-sm font-medium font-header truncate">{user?.name}</div>
              <div className="text-gray-400 text-xs font-body truncate">{user?.role}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main Content Area ─────────────────────────────────────────────── */}
      <main className="ml-64 flex-1 min-h-screen overflow-auto">
        <Outlet />
      </main>

      {/* ── Floating AI Coach Panel ──────────────────────────────────────── */}
      {coachOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-96 max-h-[600px] flex flex-col">
          <AICoach user={user} onClose={() => setCoachOpen(false)} />
        </div>
      )}

      {/* ── Signal Panel (always visible) ────────────────────────────────── */}
      <SignalPanel user={user} />
    </div>
  )
}

// ─── Sidebar NavItem ─────────────────────────────────────────────────────────
function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? 'nav-item-active' : 'nav-item-inactive'
      }
    >
      <span className="text-base">{icon}</span>
      <span className="font-header font-medium text-sm">{label}</span>
    </NavLink>
  )
}
