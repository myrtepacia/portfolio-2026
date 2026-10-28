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
    // Safety net in case the model still returns a markdown link or a raw
    // URL despite the system prompt saying not to. Markdown links keep the
    // visible label and drop the address; raw URLs are dropped entirely.
    .replace(/\[([^\]]+)\]\((?:https?:\/\/|www\.)[^\s)]+\)/g, '$1')
    .replace(/\(?\bhttps?:\/\/[^\s)]+\)?/g, '')
    .replace(/\(?\bwww\.[^\s)]+\)?/g, '')
    // Safety net for em dashes (and stray " -- " used the same way) slipping
    // through despite the system prompt.
    .replace(/\s*—\s*/g, ', ')
    .replace(/\s+--\s+/g, ', ')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/ ,/g, ',')
    .replace(/,\s*,/g, ',')
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
