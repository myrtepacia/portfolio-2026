import { BadgeCheck, BrushCleaning, HandHeart, Palette, Rocket, Scale } from 'lucide-react'
import React from 'react'
import { hireme } from '@/constants'

const icons = [
    <BrushCleaning size={13} color='#71717a'/>,
    <Rocket size={13} color='#71717a'/>,
    <Palette size={13} color='#71717a'/>,
    <Scale size={13} color='#71717a'/>,
    <HandHeart size={13} color='#71717a'/>,
]

const Hireme = () => {
  return (
    <div className='card h-full'>

        <div className='flex flex-nowrap items-center gap-2'>
          <span><BadgeCheck color='#71717a' size={20}/></span>
          <h2 className='font-bold'>What I Bring</h2>
        </div>

        <div className='space-y-2'>
            {hireme.map((item, index) =>
                <div key={index} className='flex items-center gap-2'>
                    <span className='shrink-0'>{icons[index]}</span>
                    <p className='text-xs text-zinc-600 dark:text-zinc-400'>{item}</p>
                </div>
            )}
        </div>

    </div>
  )
}

export default Hireme
