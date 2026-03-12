'use client'

import React from 'react'
import Link from 'next/link'
import { handleMouseEnter, handleMouseLeave } from '@/sections/Footer'
type Button = {
    label: string

    textColor: string
    icon: React.ReactNode
    arrow: React.ReactNode
    link: string
    
}

const Button = ({label, textColor, icon, arrow, link} : Button) => {
  return (
    <Link href={link} target='_blank' className={` ${textColor} bg-white dark:bg-black dark:text-white dark:border-zinc-800 border border-slate-300 rounded py-2 px-2 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer hover:bg-black hover:text-white transition-all`}
     onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
    > 
        <span>{icon}</span>
        {label}
        <span>{arrow}</span>
    </Link>
  )
}

export default Button