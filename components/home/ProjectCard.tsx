'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Clapperboard, Globe, ImageIcon, MessageSquare, Sparkles, UtensilsCrossed } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { projectData } from '@/constants'

export type Project = (typeof projectData)[number]

// Fallback icon tiles, used only when a project has no `icon` file in constants
const appIcons: Record<string, { icon: LucideIcon; bg: string }> = {
  CSFlix: { icon: Clapperboard, bg: '#e50914' },
  'Restaurant Discrete Event Simulation': { icon: UtensilsCrossed, bg: '#e8743b' },
  Talkly: { icon: MessageSquare, bg: '#c9853f' },
  Portfolio: { icon: Sparkles, bg: '#18181b' },
}

// Small laurel branch for the type badge; `flip` mirrors it for the right side.
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

// Slide speed for tag rows that don't fit, in pixels per second
const TAG_SLIDE_SPEED = 20

const tagClass = 'shrink-0 whitespace-nowrap rounded-md border border-line px-2.5 py-1 font-mono text-xs text-muted'

// One row of tech tags, so every /projects card is the same height. If the tags
// are wider than the card, the row slowly slides in a loop instead of wrapping
// to a second line (paused on hover, still for reduced-motion users; see
// .marquee in globals.css). Rows that fit stay still.
const StackTags = ({ stack }: { stack: string[] }) => {
  const boxRef = useRef<HTMLDivElement | null>(null)
  const listRef = useRef<HTMLUListElement | null>(null)
  // Width of one full set of tags when it overflows the row, otherwise null
  const [slideWidth, setSlideWidth] = useState<number | null>(null)

  useEffect(() => {
    const box = boxRef.current
    const list = listRef.current
    if (!box || !list) return
    const measure = () => {
      const width = list.getBoundingClientRect().width
      setSlideWidth(width > box.clientWidth + 1 ? width : null)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(box)
    return () => observer.disconnect()
  }, [])

  const sliding = slideWidth !== null

  return (
    <div ref={boxRef} className={`mt-5 overflow-hidden ${sliding ? 'marquee' : ''}`}>
      {/* The track holds the tags twice when sliding; moving it left by exactly
          one set (-50%) loops seamlessly. Each set ends in a gap-wide pad so the
          join between sets is spaced like the gaps between tags. */}
      <div
        className={`flex w-max ${sliding ? 'marquee-track' : ''}`}
        style={sliding ? { animationDuration: `${slideWidth / TAG_SLIDE_SPEED}s` } : undefined}
      >
        <ul ref={listRef} aria-label='Tech stack' className={`flex gap-2 ${sliding ? 'pr-2' : ''}`}>
          {stack.map((tech) => (
            <li key={tech} className={tagClass}>
              {tech}
            </li>
          ))}
        </ul>
        {sliding && (
          <ul aria-hidden className='flex gap-2 pr-2'>
            {stack.map((tech) => (
              <li key={tech} className={tagClass}>
                {tech}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

type ProjectCardProps = {
  project: Project
  // Opens this project's screenshots
  onPreview?: () => void
  // False for cards that are on screen but not usable yet (the side cards of
  // the home page stack), so keyboard users can't tab into them
  focusable?: boolean
  // Bottom row: the Live Website and Screenshots buttons (home page), or the
  // project's tech stack as tags (/projects)
  footer?: 'buttons' | 'stack'
  // Show the type badge (e.g. "School Project") at the top; /projects hides it
  showType?: boolean
}

// Inside of a project card, shared by the home page stack and /projects: type
// badge, app icon, title and tagline, description, and a bottom row of either
// buttons or tech stack tags. The page around it supplies the card frame.
const ProjectCard = ({ project, onPreview, focusable = true, footer = 'buttons', showType = true }: ProjectCardProps) => {
  const { icon: Icon, bg: fallbackBg } = appIcons[project.title] ?? { icon: Globe, bg: '#18181b' }
  const image = project.icon
  const tabIndex = focusable ? 0 : -1

  return (
    <>
      {showType && (
        <ul className='mb-5 flex flex-wrap gap-1.5'>
          <li className='inline-flex items-center gap-1 rounded-full bg-fg px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-bg'>
            <Laurel />
            {project.type}
            <Laurel flip />
          </li>
        </ul>
      )}

      <div className='flex items-center gap-3.5'>
        <span
          className={`relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-[14px] text-white ${image ? '' : 'shadow-sm'}`}
          style={{ backgroundColor: image ? 'transparent' : fallbackBg }}
        >
          {image ? (
            <Image src={image} alt='' fill sizes='56px' className='object-contain' />
          ) : (
            <Icon size={26} strokeWidth={1.8} />
          )}
        </span>
        <div className='min-w-0'>
          {/* In the /projects grid the title stays on one line with "…", so a long
              name can't make its card taller than the others */}
          <h3 className={`font-mono text-[17px] leading-tight tracking-tight ${footer === 'stack' ? 'truncate' : ''}`}>
            {project.title}
          </h3>
          <p className='mt-1 truncate font-mono text-[11px] text-subtle'>{project.tagline}</p>
        </div>
      </div>

      {/* Long descriptions stop after three lines with "…". In the /projects grid,
          short ones still take three lines of space (3 × 1.625em line height) so
          every card lines up */}
      <p
        className={`mt-4 line-clamp-3 text-[13px] leading-relaxed text-muted ${footer === 'stack' ? 'min-h-[4.875em]' : ''}`}
      >
        {project.description}
      </p>

      {footer === 'stack' ? (
        <StackTags stack={project.stack} />
      ) : (
        <div className='mt-5 flex flex-wrap gap-2 sm:gap-2.5'>
          {/* Only projects with a link get the Live Website button */}
          {project.link && (
            <BadgeButton
              dark
              icon={Globe}
              caption='Visit the'
              label='Live Website'
              tabIndex={tabIndex}
              onClick={() => window.open(project.link, '_blank', 'noopener,noreferrer')}
            />
          )}
          {project.screenshots.length > 0 && onPreview && (
            <BadgeButton
              icon={ImageIcon}
              caption='Preview the'
              label={project.screenshots.length > 1 ? 'Screenshots' : 'Screenshot'}
              tabIndex={tabIndex}
              onClick={onPreview}
            />
          )}
        </div>
      )}
    </>
  )
}

export default ProjectCard
