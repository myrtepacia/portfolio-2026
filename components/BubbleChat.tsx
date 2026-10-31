'use client'

import { Send } from 'lucide-react'
import BubbleButton from './BubbleButton'
import ChatHeader from './ChatHeader'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import BubbleConverstation from './BubbleConverstation'
import { ensurePuterSignedIn, getPuterErrorMessage, loadPuter, puterSignOut, type PuterUser } from '@/lib/puter'
import { getAssistantReply } from '@/lib/portfolioAssistant'
type Chat = {
  role: 'user' | 'model'
  content: string
  isError?: boolean
}

gsap.registerPlugin(useGSAP)

const BubbleChat = () => {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chats, setChats] = useState<Chat[]>([
    {
      role: 'model',
      content:
        'Hi there! Thanks for visiting the website. Let me know how I can help!',
    },
  ])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [puterUser, setPuterUser] = useState<PuterUser | null>(null)

  const chatRef = useRef<HTMLDivElement | null>(null)
  const messagesRef = useRef<HTMLDivElement | null>(null)

  useGSAP(() => {
    if (isChatOpen && chatRef.current) {
      gsap.fromTo(
        chatRef.current,
        {
          autoAlpha: 0,
          scale: 0.95,
          y: 10,
          transformOrigin: 'bottom right',
        },
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.25,
          ease: 'power2.out',
        }
      )
    }
  }, [isChatOpen])

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [chats, loading, isChatOpen])

  // Start downloading Puter the first time the chat opens, so it's ready by the
  // time the visitor sends a message (sign-in needs to run inside that click)
  useEffect(() => {
    if (isChatOpen) loadPuter()
  }, [isChatOpen])

  // Alt + K toggles the chat
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsChatOpen((open) => !open)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const handleOpenChat = () => {
    setIsChatOpen(true)
  }

  const handleCloseChat = () => {
    setIsChatOpen(false)
  }

  const handleSignOut = () => {
    puterSignOut()
    setPuterUser(null)
  }

  const handleSubmitMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const trimmedMessage = message.trim()
    if (!trimmedMessage || loading) return

    setLoading(true)

    const historyForRequest = chats.slice(-6)

    setChats((prev) => [
      ...prev,
      {
        role: 'user',
        content: trimmedMessage,
      },
    ])

    setMessage('')

    try {
      // signIn() opens a popup, so this must stay inside this user-gesture
      // handler (form submit). It resolves instantly if already signed in.
      const user = await ensurePuterSignedIn()
      setPuterUser(user)

      const reply = await getAssistantReply(trimmedMessage, historyForRequest)

      setChats((prev) => [
        ...prev,
        {
          role: 'model',
          content: reply || 'No response received.',
        },
      ])
    } catch (error: unknown) {
      console.error('Puter chat failed:', error)
      const errorMessage = getPuterErrorMessage(error)

      setChats((prev) => [
        ...prev,
        {
          role: 'model',
          content: errorMessage,
          isError: true,
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='relative w-full flex justify-end'>
      {isChatOpen && (
        <div
          ref={chatRef}
          className='absolute bottom-full right-0 mb-3 w-full sm:w-[26rem]'
        >
          <div className='flex h-[32rem] max-h-[75vh] flex-col rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-600 dark:bg-zinc-900'>
            <ChatHeader onClick={handleCloseChat} puterUsername={puterUser?.username} />

            <div
              ref={messagesRef}
              className='grow min-h-0 overflow-y-auto'
            >
              <BubbleConverstation chats={chats} loading={loading} />
            </div>

            <div className='space-y-1 p-4'>
              <form onSubmit={handleSubmitMessage}>
                <div className='flex items-center gap-3'>
                  <input
                    type='text'
                    id='input-message'
                    placeholder='Type your message...'
                    className='w-full rounded-md border border-zinc-300 bg-zinc-100 p-2 text-sm outline-none dark:border-zinc-600 dark:bg-zinc-700 dark:text-white'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={100}
                  />

                  <button
                    className={`rounded-lg p-2 ${
                      !message.trim() || loading
                        ? 'cursor-not-allowed bg-zinc-400 opacity-50'
                        : 'cursor-pointer bg-zinc-700 opacity-100 dark:bg-zinc-600'
                    }`}
                    type='submit'
                    disabled={loading || !message.trim()}
                  >
                    <Send size={18} className='text-white' />
                  </button>
                </div>
              </form>

              <div className='relative flex justify-between'>
                <p className='text-xxs text-zinc-500'>
                  {puterUser?.username
                    ? `Signed in as ${puterUser.username} via Puter`
                    : 'Ask me about programming, web dev, or tech!'}
                  <span aria-hidden> · </span>
                  {/* Notice shows on hover or keyboard focus; its bottom padding bridges the
                      gap so the pointer can move up into the links without it closing */}
                  <span className='group/privacy'>
                    <button
                      type='button'
                      aria-describedby='chat-privacy-notice'
                      className='font-bold underline hover:text-zinc-900 dark:hover:text-white'
                    >
                      Privacy
                    </button>
                    <span className='invisible absolute inset-x-0 bottom-full z-10 pb-2 opacity-0 transition-opacity duration-150 group-hover/privacy:visible group-hover/privacy:opacity-100 group-focus-within/privacy:visible group-focus-within/privacy:opacity-100'>
                      <span
                        id='chat-privacy-notice'
                        role='tooltip'
                        className='block rounded-md border border-zinc-200 bg-zinc-50 p-3 leading-relaxed text-zinc-600 shadow-md dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300'
                      >
                        Your messages are sent to an AI model through Puter, under your
                        own Puter account. This site doesn&apos;t save your chats, and
                        they disappear when you leave the page.
                        <span className='mt-2 flex items-center gap-3'>
                          <a
                            href='https://puter.com/privacy'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='underline hover:text-zinc-900 dark:hover:text-white'
                          >
                            Puter privacy policy
                          </a>
                          {puterUser && (
                            <button
                              type='button'
                              onClick={handleSignOut}
                              className='underline hover:text-zinc-900 dark:hover:text-white'
                            >
                              Sign out of Puter
                            </button>
                          )}
                        </span>
                      </span>
                    </span>
                  </span>
                </p>
                <p
                  className={`text-xxs ${
                    message.length < 100 ? 'text-zinc-500' : 'text-red-500'
                  }`}
                >
                  {message.length}/100
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <BubbleButton
        isOpen={isChatOpen}
        onClick={() => (isChatOpen ? handleCloseChat() : handleOpenChat())}
      />
    </div>
  )
}

export default BubbleChat
