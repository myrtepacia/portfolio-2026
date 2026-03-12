'use client'

import { Send } from 'lucide-react'
import BubbleButton from './BubbleButton'
import ChatHeader from './ChatHeader'
import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import BubbleConverstation from './BubbleConverstation'
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
        'Hi there! 👋🏻 Thanks for visiting my website. Feel free to ask me anything about programming, web development, or my experiences in tech. Let me know how I can help!',
    },
  ])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const chatRef = useRef<HTMLDivElement | null>(null)

  useGSAP(() => {
    if (!chatRef.current) return

    gsap.set(chatRef.current, {
      autoAlpha: 0,
      scale: 0.8,
      y: 20,
      transformOrigin: 'bottom right',
      display: 'none',
    })
  }, [])

  const handleOpenChat = () => {
    if (!chatRef.current) return

    gsap.set(chatRef.current, { display: 'block' })
    gsap.to(chatRef.current, {
      autoAlpha: 1,
      scale: 1,
      y: 0,
      duration: 0.4,
      ease: 'back.out(1.7)',
    })

    setIsChatOpen(true)
  }

  const handleCloseChat = () => {
    if (!chatRef.current) return

    gsap.to(chatRef.current, {
      autoAlpha: 0,
      scale: 0.8,
      y: 20,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        if (chatRef.current) {
          gsap.set(chatRef.current, { display: 'none' })
        }
      },
    })

    setIsChatOpen(false)
  }

  const handleSubmitMessage = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    const trimmedMessage = message.trim()
    if (!trimmedMessage || loading) return

    setLoading(true)

    setChats((prev) => [
      ...prev,
      {
        role: 'user',
        content: trimmedMessage,
      },
    ])

    setMessage('')

    try {
      const result = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmedMessage }),
      })

      let data: any = {}

      try {
        data = await result.json()
      } catch {
        data = {}
      }

      if (!result.ok) {
        throw new Error(
          data.message || 'An unexpected error occurred. Please try again later.'
        )
      }

      setChats((prev) => [
        ...prev,
        {
          role: 'model',
          content: data.response || 'No response received.',
        },
      ])
    } catch (error: any) {
      setChats((prev) => [
        ...prev,
        {
          role: 'model',
          content: error.message || 'Failed to connect to the server.',
          isError: true,
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='relative w-full space-y-5'>
      <div ref={chatRef} className='chat-container'>
        <div className='flex h-[32rem] max-h-[75vh] flex-col rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-600 dark:bg-zinc-900'>
          <ChatHeader onClick={handleCloseChat} />

          <div className='grow overflow-y-auto'>
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

            <div className='flex justify-between'>
              <p className='text-xxs text-zinc-500'>
                Ask me about programming, web dev, or tech!
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

      <div className='flex justify-end'>
        <BubbleButton
          onClick={() =>
            isChatOpen ? handleCloseChat() : handleOpenChat()
          }
        />
      </div>
    </div>
  )
}

export default BubbleChat