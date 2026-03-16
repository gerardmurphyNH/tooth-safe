import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../App.jsx'
import { getProgress } from '../utils/progress.js'
import { syncCertification } from '../utils/progress.js'
import { postCertification } from '../utils/slack.js'
import { getRandomJoke } from '../content/dadJokes.js'
import { LEVELS } from '../content/levels.js'

export default function Certification() {
  const { user, progress } = useAppContext()
  const navigate = useNavigate()
  const [joke] = useState(() => getRandomJoke())
  const [celebrationPosted, setCelebrationPosted] = useState(false)
  const canvasRef = useRef(null)

  const completedLevels = progress?.levels_completed || []
  const allLevelsComplete = LEVELS.filter(l => !l.comingSoon).every(l => completedLevels.includes(l.id))
  const completionDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  })

  useEffect(() => {
    // Fire confetti
    fireConfetti()

    // Post to Slack and Google Sheets (once)
    if (!celebrationPosted && user) {
      syncCertification(user)
      postCertification(user)
      setCelebrationPosted(true)
    }
  }, [])

  const fireConfetti = async () => {
    try {
      const confetti = (await import('canvas-confetti')).default
      const colors = ['#3bc1cc', '#ee3968', '#02556c', '#ffffff']

      // Initial burst
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.5, x: 0.5 },
        colors,
      })

      // Follow-up bursts
      setTimeout(() => {
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6, x: 0.2 }, colors, angle: 60 })
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6, x: 0.8 }, colors, angle: 120 })
      }, 500)

      setTimeout(() => {
        confetti({ particleCount: 50, spread: 120, origin: { y: 0.3 }, colors })
      }, 1200)
    } catch (err) {
      console.warn('Confetti unavailable:', err)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  if (!user) {
    navigate('/')
    return null
  }

  return (
    <div className="min-h-screen bg-beyond-dark flex flex-col items-center justify-center px-8 py-12">
      <div className="max-w-3xl w-full">
        {/* Celebration header */}
        <div className="text-center mb-8">
          <div className="text-7xl mb-4 animate-bounce-gentle">🏰</div>
          <h1 className="text-4xl font-header font-bold text-white mb-3">
            Destination Definer!
          </h1>
          <p className="text-gray-300 font-body text-lg leading-relaxed">
            From Part-Time Hustle to the top of the property ladder. You've officially gone Beyond Prompting.
          </p>
        </div>

        {/* Certificate card */}
        <div
          id="certificate-print"
          className="bg-white rounded-2xl overflow-hidden shadow-2xl mb-8"
        >
          {/* Certificate top band */}
          <div className="h-3 bg-teal-gradient" />

          <div className="px-12 py-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-beyond-teal rounded-xl flex items-center justify-center">
                  <span className="text-xl">🏠</span>
                </div>
                <div>
                  <div className="font-header font-bold text-beyond-dark text-xl">NexusYou</div>
                  <div className="text-gray-400 text-xs font-body">Get Beyond Prompting</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-beyond-teal font-header font-bold text-sm">Beyond Pricing</div>
                <div className="text-gray-400 text-xs font-body">PD&E Team</div>
              </div>
            </div>

            {/* Certificate body */}
            <div className="text-center border-y border-gray-100 py-10 mb-8">
              <p className="text-gray-500 font-body text-sm uppercase tracking-widest mb-4">
                This certifies that
              </p>
              <h2 className="text-4xl font-header font-bold text-beyond-dark mb-2">
                {user.name}
              </h2>
              <p className="text-gray-500 font-body text-sm mb-6">{user.role}</p>

              <p className="text-gray-500 font-body text-sm mb-2">
                has successfully completed
              </p>
              <p className="text-2xl font-header font-bold text-beyond-teal mb-2">
                NexusYou: Get Beyond Prompting
              </p>
              <p className="text-gray-500 font-body text-sm">
                and is hereby certified as a
              </p>
              <p className="text-xl font-header font-bold text-beyond-dark mt-2">
                NexusYou Portfolio Manager
              </p>
            </div>

            {/* Skills earned */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { icon: '🧠', title: 'Prompt Engineering', desc: 'COSTAR, CRIT, adversarial patterns' },
                { icon: '💬', title: 'Conversation Mastery', desc: 'Context calibration, conversation hygiene' },
                { icon: '⚡', title: 'Agentic Workflows', desc: 'BMAD, Claude Code, AI OS design' },
              ].map(skill => (
                <div key={skill.title} className="text-center bg-gray-50 rounded-xl p-4">
                  <div className="text-2xl mb-2">{skill.icon}</div>
                  <div className="font-header font-bold text-beyond-dark text-sm">{skill.title}</div>
                  <div className="text-gray-500 text-xs font-body mt-1">{skill.desc}</div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-sm text-gray-400 font-body">
              <span>Issued: {completionDate}</span>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-beyond-teal rounded-full" />
                <span>Beyond Pricing — AI Skills Certification</span>
              </div>
            </div>
          </div>

          {/* Certificate bottom band */}
          <div className="h-3 bg-teal-gradient" />
        </div>

        {/* Gerard's joke */}
        <div className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 mb-6 text-center">
          <p className="text-gray-400 text-xs font-header font-semibold uppercase mb-2">
            Gerard wanted me to share this one:
          </p>
          <p className="text-gray-200 font-body italic">"{joke.text}"</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            {
              icon: '✅',
              value: `${progress?.exercises_completed?.length || 0}`,
              label: 'exercises completed',
            },
            {
              icon: '🏆',
              value: `${completedLevels.length}/6`,
              label: 'levels mastered',
            },
            {
              icon: '⏱️',
              value: '~14h',
              label: 'of learning invested',
            },
          ].map(stat => (
            <div key={stat.label} className="bg-white/10 border border-white/20 rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="font-header font-bold text-white text-xl">{stat.value}</div>
              <div className="text-gray-400 text-xs font-body">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => fireConfetti()}
            className="btn-coral flex items-center justify-center gap-2"
          >
            🎉 Celebrate Again
          </button>
          <button
            onClick={handlePrint}
            className="btn-secondary flex items-center justify-center gap-2"
          >
            🖨️ Download Certificate
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-ghost text-gray-300 hover:text-white flex items-center justify-center gap-2"
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* What's next */}
        <div className="mt-10 bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="font-header font-bold text-white mb-3">What's next?</h3>
          <div className="space-y-2 text-sm font-body">
            {[
              "Share this with your team — copy your certificate and post it in #pde",
              "Start using BMAD for your next PRD — you've got the tools now",
              "Teach someone else what you learned — that's the fastest way to cement it",
              "Keep iterating your system prompt — it should evolve with your work",
              "Watch for NexusYou v2.0 — we're building more advanced modules based on what this cohort needs",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-gray-300">
                <span className="text-beyond-teal shrink-0 mt-0.5">→</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
