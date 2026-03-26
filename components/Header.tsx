'use client'

import React from 'react'
import Image from 'next/image'
import { profileImg } from '@/public/images'
import { MapPin, ChevronRight, Linkedin, Github, Calendar, Mail } from 'lucide-react'
import Button from './Button'
import Link from 'next/link'
import gsap from 'gsap'
import Switch from './Switch'

const Header = () => {
  const handleMouseEnter = () => {
    gsap.to('.header-button', {
      y: -3,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    gsap.to('.header-button', {
      y: 0,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  return (
    <section className='max-w-5xl padding-x pb-10'>
      <div className='relative'>
        <div className='flex flex-col items-center text-center gap-3 sm:flex-row sm:items-stretch sm:gap-5'>
          <Image
            alt='Profile Image'
            src={profileImg}
            className='max-w-40 rounded-xl w-full'
          />

          <div className='w-full flex flex-col gap-3 sm:justify-between'>
            <div className='flex flex-col justify-center items-center sm:items-start gap-1'>
              <h1 className='text-2xl font-bold'>Henmyr Vincent L. Tepacia</h1>
              <p className='flex items-center gap-1 text-zinc-600 dark:text-zinc-400'>
                <MapPin size={18} />
                Dumaguete, Philippines
              </p>
              <p className='flex items-center justify-between mt-1.5 md:mt-2 text-[20px] text-lg '>AI \ Student \ Freelancer</p>
            </div>

            <div className='flex flex-col w-full gap-2 sm:flex-row'>
              <Link
                href='https://calendly.com/tepacia18/consultation'
                target='_blank'
                className='header-button bg-black border border-slate-300 rounded py-2 px-2 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer text-white hover:bg-white hover:text-black transition-all dark:bg-white dark:text-black'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Calendar size={15} />
                <span>Schedule a Call</span>
                {<ChevronRight size={18} />}
              </Link>

              <Button
                label='Send Email'
                textColor='text-black'
                link='mailto:tepacia18@gmail.com'
                icon={<Mail size={15} />}
                arrow={<ChevronRight size={0} />}
              />

              <Button
                label='Github'
                textColor='text-black'
                link='https://github.com/myrtepacia/'
                icon={<Github size={15} />}
                arrow={<ChevronRight size={0} />}
              />
            </div>
          </div>
        </div>

        <div className='absolute top-0 right-0'>
          <Switch />
        </div>
      </div>
    </section>
  )
}

export default Header
