import React from 'react'
import Image from 'next/image'
import assistantImage from '@/public/images/ai-assistant.png'
import { X } from 'lucide-react'
import { puterSignOut } from '@/lib/puter'

const ChatHeader = ({
    onClick,
    puterUsername,
}: {
    onClick: () => void
    puterUsername?: string
}) => {
    return (
        <div className='flex justify-between  border-b border-zinc-300 dark:border-zinc-700 p-4'>
            <div className='flex gap-3 items-center'>
                <Image src={assistantImage} alt='AI assistant' className='w-10 rounded-full bg-white object-cover' />
                <div>
                    <p className='font-bold'>AI Assistant</p>
                    <div className='flex gap-2 '>
                        <div className='bg-green-500 w-2 h-2 rounded-full mt-0.75'></div>
                        <p className='text-xxs'>
                            {puterUsername ? `Signed in as ${puterUsername}` : 'Online'}
                        </p>
                    </div>
                </div>
            </div>

            <div className='flex items-center gap-3'>
                {puterUsername && (
                    <button
                        onClick={() => puterSignOut()}
                        className='cursor-pointer text-xxs text-zinc-500 hover:underline'
                    >
                        Sign out
                    </button>
                )}
                <button onClick={onClick} className='cursor-pointer'><X /></button>
            </div>
        </div>
    )
}

export default ChatHeader
