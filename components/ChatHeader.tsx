import React from 'react'
import Image from 'next/image'
import profileImage from '@/public/images/profile-img.jpg'
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
                <Image src={profileImage} alt='Profile Image' className='rounded-full w-10' />
                <div>
                    <p className='font-bold'>Henmyr&apos;s AI Assistant</p>
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
