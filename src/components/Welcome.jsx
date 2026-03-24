import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveUser, syncRegistration } from '../utils/progress.js'
import { postRegistration } from '../utils/slack.js'
import { ROLE_OPTIONS } from '../content/levels.js'

export default function Welcome({ onRegister }) {
  const navigate = useNavigate()
  const [step, setStep] = useState(1) // 1 = intro, 2 = form
  const [form, setForm] = useState({
    name: '',
    email: '',
    role: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Your name is required'
    if (!form.email.trim() || !form.email.includes('@')) newErrors.email = 'A valid email is required'
    if (!form.role) newErrors.role = 'Select your role'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setSubmitting(true)
    setErrors({})

    const userData = {
      ...form,
      registered_at: new Date().toISOString(),
    }

    // Save to localStorage
    saveUser(userData)

    // Fire-and-forget webhooks (don't block registration)
    syncRegistration(userData)
    postRegistration(userData)

    // Notify parent and navigate
    onRegister(userData)
    navigate('/dashboard')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  return (
    <div className="min-h-screen bg-beyond-dark flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-teal-gradient opacity-5" />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-beyond-teal rounded-full opacity-10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-beyond-coral rounded-full opacity-10 blur-3xl" />

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 bg-beyond-teal rounded-xl flex items-center justify-center">
              <span className="text-xl">🏠</span>
            </div>
            <div>
              <div className="text-white font-header font-bold text-xl">NexusYou</div>
              <div className="text-gray-400 text-xs">Get Beyond Prompting</div>
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-4xl font-header font-bold text-white mb-4 leading-tight">
              From Part-Time Hustle to Destination Definer.
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed font-body">
              14 hours of interactive learning that takes Beyond's PM and Design team from AI beginners to agentic power users — using real tools, real work, and real results.
            </p>
          </div>

          {/* Course stats */}
          <div className="grid grid-cols-3 gap-4 mb-12">
            {[
              { value: '6', label: 'Levels' },
              { value: '36+', label: 'Exercises' },
              { value: '~14h', label: 'Total time' },
            ].map(stat => (
              <div key={stat.label} className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-bold text-beyond-teal font-header">{stat.value}</div>
                <div className="text-gray-400 text-sm font-body">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Level progression */}
          <div className="space-y-2">
            {[
              { icon: '🏠', title: 'The Part-Time Hustle', sub: 'Prompting fundamentals' },
              { icon: '🏡', title: 'The Host', sub: 'Context management' },
              { icon: '🏘️', title: 'The Small Portfolio', sub: 'Nexus-Product tools' },
              { icon: '🏗️', title: 'The Large Portfolio', sub: 'Advanced prompting' },
              { icon: '🏢', title: 'The Property Manager', sub: 'PM & Design craft' },
              { icon: '🏰', title: 'The Destination Definer', sub: 'Agentic workflows' },
            ].map((level, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <span className="text-base w-6 shrink-0">{level.icon}</span>
                <span className="text-white font-medium font-header">{level.title}</span>
                <span className="text-gray-500">·</span>
                <span className="text-gray-400 font-body">{level.sub}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-gray-500 text-xs font-body">
          Built for Beyond's Product Management & Design team.
        </div>
      </div>

      {/* Right panel — registration */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md">
          {step === 1 ? (
            <div className="animate-fade-in">
              {/* Mobile logo */}
              <div className="flex items-center gap-3 mb-8 lg:hidden">
                <div className="w-9 h-9 bg-beyond-teal rounded-lg flex items-center justify-center">
                  <span className="text-lg">🏠</span>
                </div>
                <div>
                  <div className="text-white font-header font-bold text-lg">NexusYou</div>
                  <div className="text-gray-400 text-xs">Get Beyond Prompting</div>
                </div>
              </div>

              <h2 className="text-3xl font-header font-bold text-white mb-3">
                Ready to level up?
              </h2>
              <p className="text-gray-300 mb-8 font-body leading-relaxed">
                NexusYou is an interactive course that takes you from basic prompting to agentic AI workflows using Beyond's actual tools and your real product work.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { icon: '🧠', text: "Learn by doing — every exercise uses real Beyond scenarios" },
                  { icon: '🤖', text: "AI Coach gives you personalized feedback on your work" },
                  { icon: '⚡', text: "Prompt Playground lets you test your skills hands-on" },
                  { icon: '🎯', text: "Walk away with a personal AI workflow for your role" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-xl shrink-0">{item.icon}</span>
                    <p className="text-gray-300 text-sm font-body leading-snug">{item.text}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full btn-primary text-center py-3.5 text-base"
              >
                Get Started →
              </button>

              <p className="text-gray-500 text-xs text-center mt-4 font-body">
                Takes about 2 minutes to get set up. No password needed.
              </p>
            </div>
          ) : (
            <div className="animate-fade-in">
              <button
                onClick={() => setStep(1)}
                className="text-gray-400 hover:text-white text-sm mb-6 flex items-center gap-1 transition-colors font-body"
              >
                ← Back
              </button>

              <h2 className="text-2xl font-header font-bold text-white mb-2">
                Let's get you set up
              </h2>
              <p className="text-gray-400 mb-6 font-body text-sm">
                This takes 2 minutes. We'll use your name and role to personalize the AI Coach's feedback.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-1.5 font-header">
                    Your name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="First name is fine"
                    className={`w-full bg-white/5 border rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-beyond-teal font-body ${
                      errors.name ? 'border-red-500' : 'border-white/10 focus:border-transparent'
                    }`}
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1 font-body">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-1.5 font-header">
                    Work email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@beyondpricing.com"
                    className={`w-full bg-white/5 border rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-beyond-teal font-body ${
                      errors.email ? 'border-red-500' : 'border-white/10 focus:border-transparent'
                    }`}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1 font-body">{errors.email}</p>}
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-1.5 font-header">
                    Your role
                  </label>
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className={`w-full bg-white/5 border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-beyond-teal font-body ${
                      errors.role ? 'border-red-500' : 'border-white/10 focus:border-transparent'
                    } ${!form.role ? 'text-gray-500' : 'text-white'}`}
                    style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                  >
                    <option value="" disabled className="bg-beyond-dark">Select your role</option>
                    <optgroup label="── Product Management ──" className="bg-beyond-dark text-gray-400">
                      {ROLE_OPTIONS.pm.map(role => (
                        <option key={role} value={role} className="bg-beyond-dark text-white">{role}</option>
                      ))}
                    </optgroup>
                    <optgroup label="── Engineering ──" className="bg-beyond-dark text-gray-400">
                      {ROLE_OPTIONS.engineering.map(role => (
                        <option key={role} value={role} className="bg-beyond-dark text-white">{role}</option>
                      ))}
                    </optgroup>
                    <optgroup label="── Product Design ──" className="bg-beyond-dark text-gray-400">
                      {ROLE_OPTIONS.design.map(role => (
                        <option key={role} value={role} className="bg-beyond-dark text-white">{role}</option>
                      ))}
                    </optgroup>
                  </select>
                  {errors.role && <p className="text-red-400 text-xs mt-1 font-body">{errors.role}</p>}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-primary py-3.5 text-base flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Getting ready...
                    </>
                  ) : (
                    "Start NexusYou →"
                  )}
                </button>

                <p className="text-gray-600 text-xs text-center font-body">
                  Your data stays in your browser. We only sync progress to our team Google Sheet.
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
