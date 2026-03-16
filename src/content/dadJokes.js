// ─── Gerard's Dad Joke Database ─────────────────────────────────────────────
// Used at milestone moments throughout NexusYou.
// Format: { id, text, category }

export const DAD_JOKES = [
  // AI / Tech themed
  {
    id: 'ai_1',
    text: "Why did the neural network break up with the decision tree? There were too many branches in the relationship.",
    category: 'ai',
  },
  {
    id: 'ai_2',
    text: "My prompt walked into a bar. The bartender said, 'Could you be more specific about what you'd like?'",
    category: 'prompting',
  },
  {
    id: 'ai_3',
    text: "I asked Claude for a joke about context windows, but it forgot the punchline halfway through.",
    category: 'ai',
  },
  {
    id: 'ai_4',
    text: "Why did the LLM get a performance review? Because its outputs needed more alignment.",
    category: 'ai',
  },
  {
    id: 'ai_5',
    text: "What do you call an AI that won't stop arguing with you? An adversarial thought partner.",
    category: 'prompting',
  },
  {
    id: 'ai_6',
    text: "I told the AI to be more concise. It sent me a blank page. Fair enough.",
    category: 'ai',
  },
  {
    id: 'ai_7',
    text: "Why did the chatbot go to therapy? It had too many unresolved dependencies.",
    category: 'ai',
  },
  {
    id: 'ai_8',
    text: "What's an LLM's favorite workout? Token lifts.",
    category: 'ai',
  },
  {
    id: 'ai_9',
    text: "I asked the AI to write me a suspense novel. It said, 'I'll get to the climax in 32,000 tokens.'",
    category: 'ai',
  },

  // Prompting themed
  {
    id: 'prompt_1',
    text: "Why are good prompts like good leases? Context is everything.",
    category: 'prompting',
  },
  {
    id: 'prompt_2',
    text: "How many product managers does it take to write a good prompt? One — but they need 3 more clarifying questions first.",
    category: 'prompting',
  },
  {
    id: 'prompt_3',
    text: "I used the CRIT framework on my dad's jokes. The feedback was scathing. Accurate, but scathing.",
    category: 'prompting',
  },

  // Real estate / STR themed
  {
    id: 'str_1',
    text: "I asked my vacation rental for feedback. It said my expectations had too many rooms for improvement.",
    category: 'str',
  },
  {
    id: 'str_2',
    text: "Why did the property manager use AI? They were tired of making hosts and guests.",
    category: 'str',
  },
  {
    id: 'str_3',
    text: "My Airbnb listing got 5 stars. My prompt writing... still working on that.",
    category: 'str',
  },
  {
    id: 'str_4',
    text: "What do you call an STR host who's good at AI? A Prompt and Breakfast operator.",
    category: 'str',
  },

  // Beyond-specific
  {
    id: 'beyond_1',
    text: "Why did the algorithm go to therapy? It had too many unresolved overrides.",
    category: 'beyond',
  },
  {
    id: 'beyond_2',
    text: "A PriceLabs user and a Beyond user walk into a bar. The Beyond user doesn't have to manually adjust anything.",
    category: 'beyond',
  },
  {
    id: 'beyond_3',
    text: "What did the dynamic pricing algorithm say when it got the answer right? 'BtM that!'",
    category: 'beyond',
  },
  {
    id: 'beyond_4',
    text: "Why did the product manager fall in love with the problem? The solution ghosted them.",
    category: 'beyond',
  },

  // General dad jokes
  {
    id: 'general_1',
    text: "I'm reading a book about anti-gravity. It's impossible to put down.",
    category: 'general',
  },
  {
    id: 'general_2',
    text: "Why do programmers prefer dark mode? Because light attracts bugs.",
    category: 'general',
  },
  {
    id: 'general_3',
    text: "I used to hate facial hair, but then it grew on me.",
    category: 'general',
  },
  {
    id: 'general_4',
    text: "What do you call a fake noodle? An impasta.",
    category: 'general',
  },
]

// Get a random joke
export function getRandomJoke(category = null) {
  const pool = category ? DAD_JOKES.filter(j => j.category === category) : DAD_JOKES
  return pool[Math.floor(Math.random() * pool.length)]
}

// Get the milestone joke for each level
export const MILESTONE_JOKES = {
  1: DAD_JOKES.find(j => j.id === 'ai_3'),
  2: DAD_JOKES.find(j => j.id === 'ai_3'),
  3: DAD_JOKES.find(j => j.id === 'beyond_1'),
  4: DAD_JOKES.find(j => j.id === 'prompt_2'),
  5: DAD_JOKES.find(j => j.id === 'beyond_4'),
  6: DAD_JOKES.find(j => j.id === 'beyond_3'),
}
