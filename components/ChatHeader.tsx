import React from 'react'
import Image from 'next/image'
import profileImage from '@/public/images/profile-img.jpg'
import { X } from 'lucide-react'

const ChatHeader = ({onClick} : {onClick: ()=>void}) => {
    return (
        <div className='flex justify-between  border-b border-zinc-300 dark:border-zinc-700 p-4'>
            <div className='flex gap-3 items-center'>
                <Image src={profileImage} alt='Profile Image' className='rounded-full w-10' />
                <div>
                    <p className='font-bold'>Henmyr's Bot Assistant</p>
                    <div className='flex gap-2 '>
                        <div className='bg-green-500 w-2 h-2 rounded-full mt-0.75'></div>
                        <p className='text-xxs'>  Online</p>
                    </div>
                </div>
            </div>

            <div >
                <button onClick={onClick} className='cursor-pointer'><X /></button>
            </div>
        </div>
    )
}

export default ChatHeader