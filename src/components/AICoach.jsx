import { useState, useRef, useEffect } from 'react'
import { chatWithCoach } from '../utils/api.js'

export default function AICoach({ user, onClose, exerciseContext = null }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hey${user?.name ? ` ${user.name.split(' ')[0]}` : ''}! I'm your NexusYou AI Coach. Ask me anything about the course content, prompting techniques, or how to apply what you're learning to your work at Beyond.\n\nWhat's on your mind?`,
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (e) => {
    e?.preventDefault()
    const question = input.trim()
    if (!question || loading) return

    setInput('')
    setError(null)

    const newMessages = [...messages, { role: 'user', content: question }]
    setMessages(newMessages)
    setLoading(true)

    try {
      // Only pass non-system messages to the API
      const chatHistory = newMessages
        .slice(1) // Skip the initial greeting
        .slice(0, -1) // Skip the message we just added (it's the current question)
        .filter(m => m.role === 'user' || m.role === 'assistant')

      const response = await chatWithCoach({
        user,
        messages: chatHistory,
        currentQuestion: question,
      })

      setMessages(prev => [...prev, { role: 'assistant', content: response }])
    } catch (err) {
      setError("The AI Coach is taking a coffee break. Try again in a moment.")
      // Still show user message but remove the loading indicator
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden h-full max-h-[600px]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-beyond-dark border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-beyond-teal rounded-lg flex items-center justify-center">
            <span className="text-sm">🤖</span>
          </div>
          <div>
            <div className="text-white text-sm font-header font-semibold">AI Coach</div>
            <div className="text-gray-400 text-xs font-body">Ask anything about the course</div>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            ✕
          </button>
        )}
      </div>

      {/* Exercise context banner */}
      {exerciseContext && (
        <div className="px-4 py-2 bg-teal-50 border-b border-teal-100">
          <p className="text-beyond-deep text-xs font-body">
            <span className="font-semibold">Discussing:</span> {exerciseContext}
          </p>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg} />
        ))}

        {loading && (
          <div className="flex gap-2 items-start">
            <div className="w-7 h-7 bg-beyond-teal rounded-lg flex items-center justify-center shrink-0">
              <span className="text-sm">🤖</span>
            </div>
            <div className="bg-gray-100 rounded-xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1 items-center h-4">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-100 rounded-lg px-3 py-2 text-red-600 text-xs font-body">
            {error}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-100">
        <form onSubmit={sendMessage} className="flex gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask the AI Coach..."
            rows={2}
            className="flex-1 resize-none border border-beyond-gray rounded-lg px-3 py-2 text-sm text-beyond-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-beyond-teal font-body"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="bg-beyond-teal hover:bg-beyond-deep disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg px-3 py-2 transition-colors"
          >
            ↑
          </button>
        </form>
        <p className="text-gray-400 text-xs mt-1.5 font-body">Enter to send · Shift+Enter for new line</p>
      </div>
    </div>
  )
}

function ChatMessage({ message }) {
  const isAssistant = message.role === 'assistant'

  if (isAssistant) {
    return (
      <div className="flex gap-2 items-start animate-fade-in">
        <div className="w-7 h-7 bg-beyond-teal rounded-lg flex items-center justify-center shrink-0 mt-0.5">
          <span className="text-sm">🤖</span>
        </div>
        <div className="bg-gray-100 rounded-xl rounded-tl-sm px-4 py-3 max-w-sm">
          <p className="text-beyond-dark text-sm font-body leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-2 items-start justify-end animate-fade-in">
      <div className="bg-beyond-deep rounded-xl rounded-tr-sm px-4 py-3 max-w-sm">
        <p className="text-white text-sm font-body leading-relaxed whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  )
}
