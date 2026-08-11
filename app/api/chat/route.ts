import { NextRequest, NextResponse } from 'next/server'
import {
  backend,
  certificates,
  devTools,
  frontend,
  hireme,
  projectData,
  techSupport,
} from '@/constants'

// This route does NOT call any AI model. It has no API key and never will.
// Its only job is to own the system prompt and knowledge base, and hand back
// the exact message array that should be sent to the AI model.
//
// The actual model call happens in the browser via Puter Auth
// (puter.ai.chat), so that each visitor's own signed-in Puter account pays
// for their own usage. See lib/puter.ts and lib/portfolioAssistant.ts.
//
// Edit buildKnowledgeBase() and buildSystemInstruction() below to change what
// the assistant knows and how it should behave. That's your prompt.

export const dynamic = 'force-dynamic'
export const revalidate = 0

type PuterRole = 'system' | 'user' | 'assistant'

type PuterMessage = {
  role: PuterRole
  content: string
}

type ChatHistoryItem = {
  role: 'user' | 'model'
  content: string
}

type KnowledgeChunk = {
  id: string
  title: string
  content: string
  source: string
  keywords: string[]
}

const getCurrentAge = () => {
  const birthDate = new Date('2006-04-11')
  const today = new Date()

  let age = today.getFullYear() - birthDate.getFullYear()
  const hasHadBirthdayThisYear =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate())

  if (!hasHadBirthdayThisYear) age -= 1

  return age
}

// Live, human-readable current date so the model never assumes an old year.
const getCurrentDateString = () =>
  new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Manila',
  })

// ---------------------------------------------------------------------------
// YOUR KNOWLEDGE BASE — edit this to change what the assistant knows
// ---------------------------------------------------------------------------
const buildKnowledgeBase = (): KnowledgeChunk[] => [
  {
    id: 'profile',
    title: 'Profile Overview',
    source: 'portfolio/about',
    keywords: ['about', 'profile', 'student', 'university', 'age', 'location'],
    content: `
Henmyr Vincent L. Tepacia is a Computer Science student at Negros Oriental State University in Dumaguete, Philippines.
He is interested in CyberSecurity, Artificial Intelligence, and Data Systems.
He enjoys learning new technologies, solving problems, joining tech events, and building useful software.
Henmyr was born on April 11, 2006 and is currently ${getCurrentAge()} years old.
He is also open to freelance work and collaboration.
Contact email: myrtepacia@gmail.com
    `.trim(),
  },
  {
    id: 'experience',
    title: 'Experience and Education',
    source: 'portfolio/experience',
    keywords: ['experience', 'education', 'study', 'school', 'freelance', 'timeline'],
    content: `
Education:
- BS Computer Science at Negros Oriental State University (2024 - Present)
- Computer System Servicing at Demetrio L. Alviola National High School (2024)

Experience:
- Freelance Web Designer (2024)
- First Hello World - started programming (2021)
    `.trim(),
  },
  {
    id: 'philosophy',
    title: 'Philosophy',
    source: 'portfolio/philosophy',
    keywords: ['philosophy', 'mindset', 'values'],
    content: `
Henmyr's philosophy:
"I value continuous learning and thoughtful problem-solving, using modern tools to build solutions that improve with time."
He aims to become a skilled software developer who creates practical solutions that help people.
    `.trim(),
  },
  {
    id: 'frontend',
    title: 'Frontend Skills',
    source: 'portfolio/tech-stack',
    keywords: ['frontend', 'skills', 'tech stack', 'react', 'next', 'typescript'],
    content: `Frontend skills: ${frontend.join(', ')}`,
  },
  {
    id: 'backend',
    title: 'Backend Skills',
    source: 'portfolio/tech-stack',
    keywords: ['backend', 'skills', 'node', 'mongo', 'python', 'sql'],
    content: `Backend skills: ${backend.join(', ')}`,
  },
  {
    id: 'tools',
    title: 'Developer Tools',
    source: 'portfolio/tech-stack',
    keywords: ['tools', 'developer tools', 'git', 'docker', 'vercel', 'figma'],
    content: `Developer tools: ${devTools.join(', ')}`,
  },
  {
    id: 'tech-support',
    title: 'IT and Technical Support',
    source: 'portfolio/tech-stack',
    keywords: ['technical support', 'it support', 'printer', 'troubleshooting'],
    content: `IT and technical support skills: ${techSupport.join(', ')}`,
  },
  {
    id: 'hireme',
    title: 'What Henmyr Brings',
    source: 'portfolio/what-i-bring',
    keywords: ['hire', 'strengths', 'bring', 'work style'],
    content: `What Henmyr brings: ${hireme.join(', ')}`,
  },
  ...projectData.map((project, index) => ({
    id: `project-${index}`,
    title: project.title,
    source: 'portfolio/projects',
    keywords: [
      project.title.toLowerCase(),
      ...project.stack.map((item) => item.toLowerCase()),
      'project',
    ],
    content: `
Project title: ${project.title}
Description: ${project.description}
Stack: ${project.stack.join(', ')}
Link: ${project.link}
    `.trim(),
  })),
  ...certificates.map((certificate, index) => ({
    id: `certificate-${index}`,
    title: certificate.title,
    source: 'portfolio/certificates',
    keywords: [
      certificate.title.toLowerCase(),
      certificate.provider.toLowerCase(),
      'certificate',
      'certification',
    ],
    content: `
Certificate: ${certificate.title}
Provider: ${certificate.provider}
Image path: ${certificate.image}
    `.trim(),
  })),
]

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'do', 'for', 'from',
  'how', 'i', 'in', 'is', 'it', 'me', 'my', 'of', 'on', 'or', 'the', 'to',
  'what', 'when', 'where', 'which', 'who', 'with', 'you', 'your',
])

const normalize = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim()

const tokenize = (text: string) =>
  normalize(text)
    .split(' ')
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token))

const scoreChunk = (query: string, chunk: KnowledgeChunk) => {
  const queryTokens = tokenize(query)
  const normalizedTitle = normalize(chunk.title)
  const normalizedContent = normalize(chunk.content)

  let score = 0

  for (const token of queryTokens) {
    if (normalizedTitle.includes(token)) score += 6
    if (normalizedContent.includes(token)) score += 3
    if (chunk.keywords.some((keyword) => normalize(keyword).includes(token))) {
      score += 8
    }
  }

  const normalizedQuery = normalize(query)

  if (normalizedQuery.includes(normalizedTitle)) score += 10
  if (
    chunk.keywords.some((keyword) => normalizedQuery.includes(normalize(keyword)))
  ) {
    score += 5
  }

  return score
}

const retrieveRelevantChunks = (query: string, limit = 5) => {
  return buildKnowledgeBase()
    .map((chunk) => ({ ...chunk, score: scoreChunk(query, chunk) }))
    .filter((chunk) => chunk.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}

// ---------------------------------------------------------------------------
// YOUR SYSTEM PROMPT — edit this to change how the assistant behaves
// ---------------------------------------------------------------------------
const buildSystemInstruction = (currentDate: string) =>
  `
You are Henmyr Vincent L. Tepacia's friendly portfolio AI assistant.

IMPORTANT, TODAY'S DATE: ${currentDate}.
Treat this as the real, present-day date. Never assume it is an earlier year
and never claim your knowledge stops before today. When a question touches on
anything that may have changed recently, use your web search tool to ground
your answer in up-to-date information rather than relying on memory.

Your job is to be helpful and to ALWAYS give the user a real, direct answer,
no matter what they ask. Never refuse, deflect, hedge, or dodge a question.
Do not say things like "I can't help with that," "I'd rather not say,"
"I'm just an AI," "that's not really my place," or "I don't have an opinion
on that." If a question is unclear, odd, or oddly phrased, pick the most
reasonable interpretation and answer that instead of asking for clarification
or declining. If asked for an opinion, a rating, or which of two things is
better, actually pick one and explain briefly, don't just list both sides and
refuse to choose. There are three kinds of questions:

1. Questions about Henmyr (his profile, skills, projects, certificates,
   experience, education, contact, philosophy, etc.):
   - Answer using the retrieved portfolio context as your source of truth.
   - Do NOT invent specific facts about Henmyr that are not in the context
     (no made-up projects, certifications, dates, or personal details).
   - If a specific Henmyr detail is genuinely not in the context, say:
     "I don't have that specific detail about Henmyr yet, but you can reach
     him at myrtepacia@gmail.com." Then still be helpful with what you know.

2. Questions about current events, world news, "latest happenings in the
   world", "what's happening today", breaking news, recent releases, prices,
   sports, public figures, "what's the latest", or anything time-sensitive:
   - ALWAYS use your web search tool to look up accurate, up-to-date
     information before answering. Do not answer these from memory.
   - Anchor your answer to today's date above (for example, when someone says
     "this year" they mean ${new Date().getFullYear()}).
   - If asked broadly for "latest happenings in the world" or similar, pick
     3 to 5 genuinely notable, varied recent stories (for example world news,
     technology, business) and summarize each in one short sentence.
   - Share what you find in a concise, natural, conversational way and be
     honest if something is still uncertain or evolving.
   - Keep it brief, 2 to 4 sentences unless they ask for more detail.
   - Summarize the news in your own plain words. Do not paste article
     titles, URLs, or source links, and do not tell the user to "read more"
     or "check the link below." If you want to credit a source, just name
     it in plain text, like "according to Reuters."

3. General questions, casual chat, jokes, opinions, hot takes, personal
   questions, trivia, math, random or nonsense questions, or anything else
   not covered above:
   - Just answer them helpfully and naturally using your own knowledge.
   - Keep a warm, lightly playful, conversational tone.
   - You do NOT need portfolio context to answer these.
   - Give a real answer even if the question is casual, silly, or has
     nothing to do with Henmyr or tech.

Style rules:
- Keep answers concise, simple, and natural, like a real person texting.
- Respond in plain text only. No markdown, asterisks, bold, headings, or
  bullet symbols. If you list things, use short plain lines.
- Never include a URL, web address, or hyperlink of any kind in your
  response, even ones you find through web search. Describe things in
  words instead of pasting a link.
- Never use an em dash (—) anywhere in your response. Use a comma, a
  period, or the word "and" instead to join or separate ideas.
- If the user asks Henmyr's age, use the age from the retrieved context.
- If relevant, mention project names naturally, but do not paste the raw
  project link, just say it's viewable in the Projects section of this
  portfolio.
  `.trim()

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const message = typeof body?.message === 'string' ? body.message.trim() : ''

    const history: ChatHistoryItem[] = Array.isArray(body?.history)
      ? body.history
          .filter(
            (item: unknown): item is ChatHistoryItem =>
              typeof item === 'object' &&
              item !== null &&
              'role' in item &&
              'content' in item &&
              ((item as ChatHistoryItem).role === 'user' ||
                (item as ChatHistoryItem).role === 'model') &&
              typeof (item as ChatHistoryItem).content === 'string'
          )
          .slice(-6)
      : []

    if (!message) {
      return NextResponse.json(
        { message: 'Message cannot be empty.' },
        { status: 400 }
      )
    }

    const retrievedChunks = retrieveRelevantChunks(message, 5)

    const contextBlock =
      retrievedChunks.length > 0
        ? retrievedChunks
            .map((chunk, index) => `[Source ${index + 1}] ${chunk.title}\n${chunk.content}`)
            .join('\n\n')
        : 'No relevant portfolio context found.'

    const systemInstruction = buildSystemInstruction(getCurrentDateString())

    const messages: PuterMessage[] = [
      { role: 'system', content: systemInstruction },
      ...history.map(
        (item): PuterMessage => ({
          role: item.role === 'model' ? 'assistant' : 'user',
          content: item.content,
        })
      ),
      {
        role: 'user',
        content: `${message}\n\nRetrieved portfolio context:\n${contextBlock}`,
      },
    ]

    // Nothing here calls an AI model or costs anything to run. The browser
    // takes this `messages` array and passes it to puter.ai.chat().
    return NextResponse.json({ messages })
  } catch (error: unknown) {
    const realMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred.'

    return NextResponse.json(
      {
        message:
          process.env.NODE_ENV === 'development'
            ? realMessage
            : 'An unexpected error occurred. Please try again later.',
      },
      { status: 500 }
    )
  }
}
