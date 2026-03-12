import React from 'react'
import Image from 'next/image'
import profileImage from '@/public/images/profile-img.jpg'
type Chat = {
  role: 'user' | 'model'
  content: string
  isError?: boolean
}
import TypingBubble from './TypingBubble'

const BubbleConverstation = ({
  chats,
  loading,
}: {
  chats: Chat[]
  loading: boolean
}) => {
  return (
    <div className='space-y-4 p-4'>
      {chats.map((chat, index) => (
        <div
          key={`${chat.role}-${index}`}
          className={`flex items-start gap-3 ${
            chat.role === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          {chat.role === 'model' && (
            <Image
              src={profileImage}
              alt='Profile Image'
              className='h-5 w-5 shrink-0 rounded-full object-cover'
            />
          )}

          <div
            className={`max-w-[75%] min-w-0 rounded-lg border p-3 ${
              chat.role === 'user'
                ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
                : chat.isError
                ? 'border-red-300 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-200'
                : 'border-zinc-200 bg-white text-black dark:border-zinc-700 dark:bg-zinc-900 dark:text-white'
            }`}
          >
            <p className='whitespace-pre-wrap break-words text-sm'>
              {chat.content}
            </p>
          </div>
        </div>
      ))}

      {loading && (
        <div className='flex items-start gap-3 justify-start'>
          <Image
            src={profileImage}
            alt='Profile Image'
            className='h-5 w-5 shrink-0 rounded-full object-cover'
          />
          <TypingBubble />
        </div>
      )}
    </div>
  )
}

export default BubbleConverstation