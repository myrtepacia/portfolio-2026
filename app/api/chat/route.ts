import { GoogleGenerativeAI } from '@google/generative-ai'
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

// Never cache this route — always generate a fresh response per request.
export const dynamic = 'force-dynamic'
export const revalidate = 0

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
  'a',
  'an',
  'and',
  'are',
  'as',
  'at',
  'be',
  'by',
  'do',
  'for',
  'from',
  'how',
  'i',
  'in',
  'is',
  'it',
  'me',
  'my',
  'of',
  'on',
  'or',
  'the',
  'to',
  'what',
  'when',
  'where',
  'which',
  'who',
  'with',
  'you',
  'your',
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
    chunk.keywords.some((keyword) =>
      normalizedQuery.includes(normalize(keyword))
    )
  ) {
    score += 5
  }

  return score
}

const retrieveRelevantChunks = (query: string, limit = 5) => {
  return buildKnowledgeBase()
    .map((chunk) => ({
      ...chunk,
      score: scoreChunk(query, chunk),
    }))
    .filter((chunk) => chunk.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}

const cleanResponseText = (text: string) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/^\s*[-*•]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    .replace(/`/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

// Detect if the question is about current events / news / recent happenings
const isCurrentEventsQuery = (query: string): boolean => {
  const lower = query.toLowerCase()
  const currentKeywords = [
    'latest', 'recent', 'news', 'today', 'now', '2026', 'current',
    'happening', 'update', 'this year', 'trending', 'new', 'just',
    'what happened', 'recently', 'this month', 'this week',
  ]
  return currentKeywords.some((kw) => lower.includes(kw))
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { message: 'Missing GEMINI_API_KEY in environment variables.' },
        { status: 500 }
      )
    }

    const body = await req.json()
    const message =
      typeof body?.message === 'string' ? body.message.trim() : ''

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
            .map(
              (chunk, index) =>
                `[Source ${index + 1}] ${chunk.title}\n${chunk.content}`
            )
            .join('\n\n')
        : 'No relevant portfolio context found.'

    const historyBlock =
      history.length > 0
        ? history
            .map(
              (item) =>
                `${item.role === 'user' ? 'User' : 'Assistant'}: ${item.content}`
            )
            .join('\n')
        : 'No previous conversation.'

    const hasPortfolioContext = retrievedChunks.length > 0
    const needsWebSearch = isCurrentEventsQuery(message)

    const systemInstruction = `
You are Henmyr Vincent L. Tepacia's friendly portfolio AI assistant.
The current year is 2026.

Your job is to be helpful and to ALWAYS give the user an answer, no matter
what they ask. Never refuse a question. There are three kinds of questions:

1. Questions about Henmyr (his profile, skills, projects, certificates,
   experience, education, contact, philosophy, etc.):
   - Answer using the retrieved portfolio context as your source of truth.
   - Do NOT invent specific facts about Henmyr that are not in the context
     (no made-up projects, certifications, dates, or personal details).
   - If a specific Henmyr detail is genuinely not in the context, say:
     "I don't have that specific detail about Henmyr yet, but you can reach
     him at myrtepacia@gmail.com." Then still be helpful with what you know.

2. Questions about current events, news, or 2026 happenings:
   - Use the Google Search tool to look up accurate, up-to-date information.
   - Share what you find in a concise, natural, conversational way.
   - Be honest if something is uncertain or evolving.
   - Keep it brief — 2 to 4 sentences unless they ask for more detail.

3. General questions, casual chat, jokes, opinions, random or nonsense
   questions (e.g. trivia, math, "what's the meaning of life", silly prompts):
   - Just answer them helpfully and naturally using your own knowledge.
   - Keep a warm, lightly playful, conversational tone.
   - You do NOT need portfolio context to answer these.

Style rules:
- Keep answers concise and natural.
- Respond in plain text only. No markdown, asterisks, bold, headings, or
  bullet symbols. If you list things, use short plain lines.
- If the user asks Henmyr's age, use the age from the retrieved context.
- If relevant, mention project links naturally.
    `.trim()

    const finalPrompt = `
Recent conversation:
${historyBlock}

User question:
${message}

Retrieved portfolio context:
${contextBlock}

${
  hasPortfolioContext
    ? 'Use the context above if the question is about Henmyr. Otherwise just answer the question directly and helpfully.'
    : needsWebSearch
    ? 'This looks like a question about current events or 2026 happenings. Use Google Search to find the latest information and answer naturally.'
    : 'No portfolio context matched this question. Answer it directly and helpfully using your own knowledge, in a friendly tone.'
}

Now answer the user.
    `.trim()

    const genAI = new GoogleGenerativeAI(apiKey)

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction,
    })

    // Use Google Search grounding when the question is about current events
    const generateOptions: any = {
      contents: [{ role: 'user', parts: [{ text: finalPrompt }] }],
    }

    if (needsWebSearch) {
      generateOptions.tools = [{ googleSearch: {} }]
    }

    const result = await model.generateContent(generateOptions)
    const text = result.response.text()?.trim()

    if (!text) {
      return NextResponse.json(
        { message: 'Empty response from AI model.' },
        { status: 500 }
      )
    }

    const cleanedText = cleanResponseText(text)

    return NextResponse.json({
      response: cleanedText,
      sources: retrievedChunks.map((chunk) => ({
        title: chunk.title,
        source: chunk.source,
      })),
    })
  } catch (error: any) {
    console.error('Gemini API Error:', error)

    const realMessage =
      error?.message ||
      error?.response?.data?.error?.message ||
      'An unexpected error occurred. Please try again later.'

    return NextResponse.json(
      {
        message:
          process.env.NODE_ENV === 'development'
            ? realMessage
            : 'An unexpected error occurred. Please try again later.',
        success: false,
      },
      { status: 500 }
    )
  }
}
