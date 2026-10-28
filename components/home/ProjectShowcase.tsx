'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Clapperboard, Globe, ImageIcon, MessageSquare, Sparkles, UtensilsCrossed } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { projectData } from '@/constants'
import SectionTitle from './SectionTitle'
import Lightbox from './Lightbox'

// The portfolio itself isn't shown in the featured stack; it stays on /projects
const featured = projectData.filter((project) => project.title !== 'Portfolio')

// App-style icon tile per project
// Fallback icon tiles, used only when a project has no `icon` file in constants
const appIcons: Record<string, { icon: LucideIcon; bg: string }> = {
  CSFlix: { icon: Clapperboard, bg: '#e50914' },
  'Restaurant Discrete Event Simulation': { icon: UtensilsCrossed, bg: '#e8743b' },
  Talkly: { icon: MessageSquare, bg: '#c9853f' },
  'Campus Marketplace': { icon: MessageSquare, bg: '#1d63df' },
  Portfolio: { icon: Sparkles, bg: '#18181b' },
}

// Small laurel branch for the featured badge; `flip` mirrors it for the right side.
const Laurel = ({ flip = false }: { flip?: boolean }) => (
  <svg viewBox='0 0 12 20' className={`h-3.5 w-2 ${flip ? '-scale-x-100' : ''}`} fill='currentColor' aria-hidden>
    <path d='M9 19C4 16 3 9 6 2' fill='none' stroke='currentColor' strokeWidth='1.2' strokeLinecap='round' />
    <ellipse cx='4.6' cy='5.5' rx='1.1' ry='2.2' transform='rotate(-25 4.6 5.5)' />
    <ellipse cx='3.8' cy='10' rx='1.1' ry='2.2' transform='rotate(-10 3.8 10)' />
    <ellipse cx='4.6' cy='14.5' rx='1.1' ry='2.2' transform='rotate(15 4.6 14.5)' />
  </svg>
)

// Store-badge style button: icon + small caption over a bold label.
// Compact on phones so two of them fit side by side in a card.
const BadgeButton = ({ icon: Icon, caption, label, dark, ...props }: {
  icon: LucideIcon
  caption: string
  label: string
  dark?: boolean
} & React.ComponentProps<'button'>) => (
  <button
    type='button'
    {...props}
    className={`inline-flex h-10 shrink-0 items-center gap-1.5 rounded-lg px-2 text-left transition-opacity hover:opacity-85 sm:h-11 sm:gap-2 sm:px-3 ${
      dark ? 'bg-fg text-bg' : 'border border-line bg-surface text-fg'
    }`}
  >
    <Icon strokeWidth={1.8} className='size-4 sm:size-5' />
    <span className='leading-none'>
      <span className='block text-[8px] opacity-80 sm:text-[9px]'>{caption}</span>
      <span className='mt-0.5 block whitespace-nowrap text-[12px] font-semibold tracking-tight sm:text-[14px]'>{label}</span>
    </span>
  </button>
)

const ProjectShowcase = () => {
  const [active, setActive] = useState(0)
  // Which project's screenshots are open, and which one is showing
  const [preview, setPreview] = useState<{ project: number; shot: number } | null>(null)
  const total = featured.length

  const go = (step: number) => setActive((i) => (i + step + total) % total)

  // Signed distance from the active card, wrapped so neighbours sit on both sides
  const offsetOf = (index: number) => {
    let offset = index - active
    if (offset > total / 2) offset -= total
    if (offset < -total / 2) offset += total
    return offset
  }

  return (
    <section id='projects' aria-label='Featured projects' data-comment='Featured projects' className='scroll-mt-20'>
      <SectionTitle
        title='Featured Projects'
        subtitle='School and personal builds where I take an idea from a rough sketch to a working, deployed app.'
      />

      <div
        className='relative -mx-5 h-[400px] overflow-hidden px-5 [--card-w:300px] [--fan:96px] sm:mx-0 sm:h-[380px] sm:overflow-visible sm:px-0 sm:[--card-w:380px] sm:[--fan:250px]'
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') go(-1)
          if (e.key === 'ArrowRight') go(1)
        }}
      >
        {featured.map((project, index) => {
          const offset = offsetOf(index)
          const distance = Math.abs(offset)
          const isActive = offset === 0
          const hidden = distance > 1
          const { icon: Icon, bg: fallbackBg } = appIcons[project.title] ?? { icon: Globe, bg: '#18181b' }
          const image = project.icon
          const bg = image ? 'transparent' : fallbackBg

          return (
            <article
              key={project.title}
              aria-hidden={!isActive}
              className='absolute top-10 w-[var(--card-w)] sm:top-6 rounded-2xl border border-line bg-surface p-4 transition-[transform,opacity,box-shadow] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] sm:p-6'
              style={{
                left: 'calc(50% - var(--card-w) / 2)',
                // Hidden cards wait behind the front one instead of off-screen, so they never widen the page
                transform: hidden
                  ? 'translateY(40px) scale(0.85)'
                  : `translateX(calc(var(--fan) * ${offset})) translateY(${distance * 26}px) rotate(${offset * 7}deg) scale(${1 - distance * 0.06})`,
                zIndex: 10 - distance,
                opacity: hidden ? 0 : 1,
                boxShadow: isActive ? '0 24px 60px -18px rgba(0,0,0,0.25)' : '0 10px 30px -16px rgba(0,0,0,0.15)',
                pointerEvents: hidden ? 'none' : undefined,
              }}
            >
              {/* Side cards: whole card brings it to the front */}
              {!isActive && !hidden && (
                <button
                  type='button'
                  tabIndex={-1}
                  aria-label={`Show ${project.title}`}
                  onClick={() => setActive(index)}
                  className='absolute inset-0 z-10 cursor-pointer rounded-2xl'
                />
              )}

              <div className={`transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-45'}`}>
                <ul className='flex flex-wrap gap-1.5'>
                  <li className='inline-flex items-center gap-1 rounded-full bg-fg px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-bg'>
                    <Laurel />
                    {project.type}
                    <Laurel flip />
                  </li>
                </ul>

                <div className='mt-5 flex items-center gap-3.5'>
                  <span
                    className={`relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-[14px] text-white ${image ? '' : 'shadow-sm'}`}
                    style={{ backgroundColor: bg }}
                  >
                    {image ? (
                      <Image src={image} alt='' fill sizes='56px' className='object-contain' />
                    ) : (
                      <Icon size={26} strokeWidth={1.8} />
                    )}
                  </span>
                  <div className='min-w-0'>
                    <h3 className='font-mono text-[17px] leading-tight tracking-tight'>{project.title}</h3>
                    <p className='mt-1 truncate font-mono text-[11px] text-subtle'>{project.tagline}</p>
                  </div>
                </div>

                <p className='mt-4 line-clamp-3 text-[13px] leading-relaxed text-muted'>{project.description}</p>

                <div className='mt-5 flex flex-wrap gap-2 sm:gap-2.5'>
                  {/* Only projects with a link get the Live Website button */}
                  {project.link && (
                    <BadgeButton
                      dark
                      icon={Globe}
                      caption='Visit the'
                      label='Live Website'
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => window.open(project.link, '_blank', 'noopener,noreferrer')}
                    />
                  )}
                  {project.screenshots.length > 0 && (
                    <BadgeButton
                      icon={ImageIcon}
                      caption='Preview the'
                      label={project.screenshots.length > 1 ? 'Screenshots' : 'Screenshot'}
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => setPreview({ project: index, shot: 0 })}
                    />
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </div>

      <div data-comment='All projects link' className='mt-3 flex justify-center'>
        <Link href='/projects' className='inline-flex items-center gap-1 font-mono text-xs text-subtle hover:text-fg'>
          View all projects
          <ArrowUpRight size={12} />
        </Link>
      </div>

      {preview !== null && (() => {
        // Arrows step through this project's own screenshots, never into another project
        const shots = featured[preview.project].screenshots
        const step = (by: number) =>
          setPreview((p) => (p === null ? p : { ...p, shot: (p.shot + by + shots.length) % shots.length }))
        return (
          <Lightbox
            fixedFrame
            src={shots[preview.shot]}
            alt={`${featured[preview.project].title} screenshot ${preview.shot + 1} of ${shots.length}`}
            onClose={() => setPreview(null)}
            onPrev={shots.length > 1 ? () => step(-1) : undefined}
            onNext={shots.length > 1 ? () => step(1) : undefined}
          />
        )
      })()}
    </section>
  )
}

export default ProjectShowcase
