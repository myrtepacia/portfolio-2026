import { puterChat, type PuterMessage } from './puter'

export type AssistantHistoryItem = {
  role: 'user' | 'model'
  content: string
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

// Step 1: ask our own /api/chat route to build the system prompt + retrieved
// context (that's where your prompt and knowledge base live, edit it there).
// Step 2: hand that message array to Puter, which runs the actual model call
// in the browser under the signed-in visitor's Puter account.
export const getAssistantReply = async (
  message: string,
  history: AssistantHistoryItem[]
): Promise<string> => {
  const promptResponse = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history: history.slice(-6) }),
  })

  let promptData: { messages?: PuterMessage[]; message?: string } = {}

  try {
    promptData = await promptResponse.json()
  } catch {
    promptData = {}
  }

  if (!promptResponse.ok || !promptData.messages) {
    throw new Error(
      promptData.message || 'Failed to build the prompt. Please try again.'
    )
  }

  const rawReply = await puterChat(promptData.messages)
  return cleanResponseText(rawReply)
}
