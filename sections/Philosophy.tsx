import { Quote } from 'lucide-react'
import React from 'react'

const Philosophy = () => {
  return (
    <div className='card flex-1 flex flex-col justify-center'>
         <div className='flex flex-nowrap items-center gap-2 '>
            <span><Quote color='#71717a' size={20}/></span>
            <h2 className='font-bold'>Philosophy</h2>
        </div>
        
        <div className='border-l-2 pl-3 border-gray-300 dark:border-zinc-500'>
            <p className='text-xs text-zinc-600 dark:text-zinc-400'>"I value continuous learning and thoughtful problem-solving, using modern tools to build solutions that improve with time."</p>
        </div>

    </div>
  )
}

export default Philosophy
