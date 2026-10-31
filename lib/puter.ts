'use client'

// Thin wrapper around the Puter.js global. The script is added to the page only when
// the chat first opens (see loadPuter), so visitors who never chat don't download it
// and its console banner doesn't show up on every page. Puter Auth signs the visitor into their own free Puter account, and
// puter.ai.chat() bills that visitor's account instead of us needing a server-side API key.

export type PuterUser = {
  username?: string
  uuid?: string
  [key: string]: unknown
}

export type PuterMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

declare global {
  interface Window {
    puter?: {
      auth: {
        isSignedIn: () => boolean
        signIn: () => Promise<unknown>
        signOut: () => void
        getUser: () => Promise<PuterUser>
      }
      ai: {
        chat: (
          messages: PuterMessage[],
          options?: Record<string, unknown>
        ) => Promise<unknown>
      }
    }
  }
}

const READY_TIMEOUT_MS = 10000
const READY_POLL_MS = 100

const PUTER_SRC = 'https://js.puter.com/v2/'

// Adds the Puter <script> once; safe to call many times
export const loadPuter = () => {
  if (typeof document === 'undefined') return
  if (document.querySelector(`script[src="${PUTER_SRC}"]`)) return
  const script = document.createElement('script')
  script.src = PUTER_SRC
  script.async = true
  document.head.appendChild(script)
}

export const isPuterLoaded = () =>
  typeof window !== 'undefined' && !!window.puter?.ai && !!window.puter?.auth

// The <script> tag loads async, so the widget may render before `window.puter`
// exists. Poll briefly instead of failing immediately.
export const waitForPuter = (): Promise<void> =>
  new Promise((resolve, reject) => {
    loadPuter()
    if (isPuterLoaded()) {
      resolve()
      return
    }

    const startedAt = Date.now()
    const timer = setInterval(() => {
      if (isPuterLoaded()) {
        clearInterval(timer)
        resolve()
        return
      }

      if (Date.now() - startedAt > READY_TIMEOUT_MS) {
        clearInterval(timer)
        reject(
          new Error(
            'Puter is taking too long to load. Check your connection and refresh the page.'
          )
        )
      }
    }, READY_POLL_MS)
  })

// Call this from inside a user-gesture handler (click, submit) since signIn()
// opens a popup and browsers block popups triggered outside a user gesture.
export const ensurePuterSignedIn = async (): Promise<PuterUser | null> => {
  await waitForPuter()
  const puter = window.puter!

  if (!puter.auth.isSignedIn()) {
    await puter.auth.signIn()
  }

  try {
    return await puter.auth.getUser()
  } catch {
    return null
  }
}

export const puterSignOut = () => {
  if (isPuterLoaded()) {
    window.puter!.auth.signOut()
  }
}

type PuterError = {
  message?: string
  msg?: string
  code?: string
  error?: string | { message?: string; code?: string }
}

// Puter rejects with plain objects like { error: 'auth_window_closed', msg }
// or { success: false, error: { code, message } } instead of Error instances.
// Pull out a readable reason so the chat doesn't hide what actually failed.
export const getPuterErrorMessage = (error: unknown): string => {
  if (error instanceof Error && error.message) return error.message
  if (typeof error === 'string' && error) return error

  const typedError = error as PuterError | null
  const nested = typedError?.error

  if (nested && typeof nested === 'object') {
    if (nested.message) return nested.message
    if (nested.code) return `Puter error: ${nested.code}`
  }

  if (typedError?.message) return typedError.message
  if (typedError?.msg) return typedError.msg

  if (nested === 'auth_window_closed') {
    return 'The Puter sign-in window was closed. Send your message again to sign in.'
  }
  if (typeof nested === 'string') return `Puter error: ${nested}`
  if (typedError?.code) return `Puter error: ${typedError.code}`

  return 'Failed to connect to Puter. Allow popups for this site and try again.'
}

type PuterContentBlock = { type?: string; text?: string }

type PuterChatResult = {
  message?: { content?: string | PuterContentBlock[] }
  content?: string | PuterContentBlock[]
  text?: string
  toString?: () => string
}

// puter.ai.chat() can resolve to a plain string, or an object shaped like
// { message: { content: string | Array<{ type, text }> } } depending on the
// model/provider. Normalize all of that down to plain text.
const extractText = (result: unknown): string => {
  if (typeof result === 'string') return result.trim()

  const typedResult = result as PuterChatResult
  const content =
    typedResult?.message?.content ?? typedResult?.content ?? typedResult?.text

  if (typeof content === 'string') return content.trim()

  if (Array.isArray(content)) {
    return content
      .map((block) => (typeof block?.text === 'string' ? block.text : ''))
      .join('\n')
      .trim()
  }

  if (typedResult && typeof typedResult.toString === 'function') {
    const asString = typedResult.toString()
    if (asString && asString !== '[object Object]') return asString.trim()
  }

  return ''
}

export const puterChat = async (
  messages: PuterMessage[],
  options: Record<string, unknown> = {}
): Promise<string> => {
  await waitForPuter()

  const result = await window.puter!.ai.chat(messages, {
    // Fast, inexpensive OpenAI model. Puter's built-in web_search tool is
    // currently OpenAI-model-specific, which is why we default to one here.
    model: 'gpt-5.4-nano',
    tools: [{ type: 'web_search' }],
    ...options,
  })

  const text = extractText(result)

  if (!text) {
    throw new Error('Empty response from the AI model.')
  }

  return text
}
