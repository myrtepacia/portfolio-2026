'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { projectData } from '@/constants'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const Page = () => {
  useGSAP(() => {
    gsap.from('.project-card', {
      opacity: 0,
      y: 20,
      stagger: 0.2,
      duration: 0.5,
      ease: 'power4.inOut',
    })
  }, [])

  return (
    <div className='max-w-5xl padding-x py-10 space-y-5'>
      <div className='flex flex-nowrap gap-5 flex-col sm:items-center sm:flex-row'>
        <Link href='/' className='text-sm flex flex-nowrap items-center gap-2'>
          <ArrowLeft size={20} />
          Back to home
        </Link>

        <h1 className='text-2xl font-bold'>All Projects</h1>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
        {projectData.map((item, index) => (
          <Link
            key={index}
            // Projects without a live link stay on this page instead of opening a new tab
            href={item.link || '/projects'}
            target={item.link ? '_blank' : undefined}
            rel='noopener noreferrer'
            className='project-card card space-y-3 block hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors'
          >
            <div className='space-y-1'>
              <h2 className='font-bold'>{item.title}</h2>
              <p className='text-sm text-zinc-500 dark:text-zinc-300'>
                {item.description}
              </p>
            </div>

            <div className='flex flex-wrap gap-2'>
              {item.stack.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className='rounded-md bg-zinc-100 px-2 py-1 text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200'
                >
                  {tech}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Page
