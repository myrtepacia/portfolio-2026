'use client'
import { Facebook, Github, Instagram, Linkedin, Mail } from 'lucide-react'
import React from 'react'
import nextJs from '@/public/icons/next-js.svg'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import nextWhite from '@/public/icons/next-white.svg'

 // Animation Handler
  export const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      y: -3, // Moves the icon up
      duration: 0.3,
      ease: 'power2.out'
    })
  }


   export const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      y: 0, // Returns to original position
      duration: 0.3,
      ease: "power2.out"
      
    })
  }


const Footer = () => {



 

  
const socialLinks = [
    { href: 'https://www.instagram.com/myrtepacia/', icon: <Instagram /> },
    { href: 'https://web.facebook.com/myrtepacia/', icon: <Facebook /> },
    { href: 'https://github.com/myrtepacia/', icon: <Github /> },
  ]


  return (
    <footer className='max-w-5xl padding-x '>

        <div className='border-t border-zinc-300 py-10 flex flex-col justify-center gap-3 sm:flex-row sm:justify-between items-center'>

            <div className='text-center space-y-1'>
                <p className='font-bold text-sm'>Henmyr Vincent L. Tepacia</p>
                <p className='text-xs text-zinc-500 dark:text-zinc-400'>© { new Date().getFullYear() }. All rights reserved.</p>
                
            </div> 

          

           <div className='flex gap-3 justify-center'>
                {socialLinks.map((social, index) => (
                    <Link
                    key={index}
                    href={social.href}
                    target='_blank'
                    className='social-icon inline-block' 
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    >
                    {social.icon}
                    </Link>
                ))}
                </div>

              <div className='text-center flex gap-1 justify-center items-center'>
                <p className='text-sm dark:text-white'>Powered by  </p>
                <Image src={nextJs} alt="Next.js" className='w-5 dark:hidden' />
                <Image src={nextWhite} alt="Next.js" className='w-5 not-dark:hidden' />
            </div> 
        </div>
        
    </footer>
  )
}

export default Footer