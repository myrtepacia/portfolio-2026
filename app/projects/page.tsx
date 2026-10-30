'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { projectData } from '@/constants'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ProjectCard from '@/components/home/ProjectCard'

// This page's own order (the home page keeps the constants order)
const PAGE_ORDER = ['CSFlix', 'Restaurant Discrete Event Simulation', 'Portfolio', 'Campus Marketplace']
const orderedProjects = [...projectData].sort((a, b) => {
  // Projects not listed above keep their place after the listed ones
  const rank = (title: string) => (PAGE_ORDER.indexOf(title) + 1 || PAGE_ORDER.length + 1)
  return rank(a.title) - rank(b.title)
})

const cardClass =
  'project-card block rounded-2xl border border-line bg-surface p-4 transition-colors sm:p-6'

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
    <main id='top' className='max-w-5xl padding-x py-10 space-y-5'>
      <div className='flex flex-nowrap gap-5 flex-col sm:items-center sm:flex-row'>
        <Link href='/' className='text-sm flex flex-nowrap items-center gap-2'>
          <ArrowLeft size={20} />
          Back to home
        </Link>

        <h1 className='text-2xl font-bold'>All Projects</h1>
      </div>

      {/* Same cards as the home page's Featured Projects stack, laid out flat, with
          the tech stack in place of the buttons. A card with a live site opens it. */}
      {/* Cards come out the same height on their own (one-line title, three-line
          description, one row of tags), so nothing is stretched to match */}
      <ul className='grid gap-4 sm:grid-cols-2'>
        {orderedProjects.map((project) => (
          <li key={project.title}>
            {project.link ? (
              <a
                href={project.link}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={`${project.title}: visit the live website (opens in a new tab)`}
                className={`${cardClass} hover:bg-wash`}
              >
                <ProjectCard project={project} footer='stack' showType={false} />
              </a>
            ) : (
              <div className={cardClass}>
                <ProjectCard project={project} footer='stack' showType={false} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </main>
  )
}

export default Page
