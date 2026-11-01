'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { projectData } from '@/constants'
import SectionTitle from './SectionTitle'
import Lightbox from './Lightbox'
import ProjectCard from './ProjectCard'

// Every project is featured, in the order listed in constants
const featured = projectData

// How long each card stays in front before the stack rotates to the next one
const AUTOPLAY_MS = 3000

const ProjectShowcase = () => {
  const [active, setActive] = useState(0)
  // Which project's screenshots are open, and which one is showing
  const [preview, setPreview] = useState<{ project: number; shot: number } | null>(null)
  // True while a mouse is over the cards or keyboard focus is inside them.
  // Touch never sets it: phones report a tap as the mouse entering, with no
  // matching leave, which would pause the rotation for good
  const [paused, setPaused] = useState(false)
  // Where a touch swipe started, to tell a left or right swipe from a tap
  const swipeStart = useRef<{ x: number; y: number } | null>(null)
  // Becomes true the first time the card stack comes on screen and stays true,
  // so the rotation starts when the cards are first seen and never stops after
  const [started, setStarted] = useState(false)
  const stackRef = useRef<HTMLDivElement | null>(null)
  const total = featured.length

  const go = (step: number) => setActive((i) => (i + step + total) % total)

  // Watch the card stack until it is first seen (a fifth of it on screen),
  // then stop watching: scrolling away later doesn't stop the rotation
  useEffect(() => {
    const stack = stackRef.current
    if (!stack) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setStarted(true)
        observer.disconnect()
      },
      { threshold: 0.2 }
    )
    observer.observe(stack)
    return () => observer.disconnect()
  }, [])

  // Rotate to the next card every AUTOPLAY_MS. Waits until the cards are first
  // seen, so visitors always see the first card for the full 3 seconds, then
  // keeps going even when scrolled away. Pauses while someone is reading or
  // using a card, or viewing screenshots, and stays still for reduced-motion
  // users. Depending on `active` restarts the 3 seconds after any manual change.
  useEffect(() => {
    if (!started || paused || preview !== null || total < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = setTimeout(() => setActive((i) => (i + 1) % total), AUTOPLAY_MS)
    return () => clearTimeout(timer)
  }, [active, started, paused, preview, total])

  // Signed distance from the active card, wrapped so neighbours sit on both sides
  const offsetOf = (index: number) => {
    let offset = index - active
    if (offset > total / 2) offset -= total
    if (offset < -total / 2) offset += total
    return offset
  }

  return (
    <section id='projects' aria-label='Featured projects' className='scroll-mt-20'>
      <SectionTitle
        title='Featured Projects'
        subtitle='School, personal, and collaborative builds where I take an idea from a rough sketch to a working, deployed app.'
      />

      <div
        ref={stackRef}
        className='relative -mx-5 h-[400px] overflow-hidden px-5 [--card-w:300px] [--fan:96px] sm:mx-0 sm:h-[380px] sm:overflow-visible sm:px-0 sm:[--card-w:380px] sm:[--fan:250px]'
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') go(-1)
          if (e.key === 'ArrowRight') go(1)
        }}
        onPointerEnter={(e) => {
          if (e.pointerType === 'mouse') setPaused(true)
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === 'mouse') setPaused(false)
        }}
        // Only keyboard focus pauses; a tapped or clicked button keeps focus
        // afterwards, which would otherwise leave the rotation stopped
        onFocus={(e) => {
          if (e.target.matches(':focus-visible')) setPaused(true)
        }}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false)
        }}
        // Swipe left for the next card, right for the previous one
        onTouchStart={(e) => {
          const t = e.touches[0]
          swipeStart.current = { x: t.clientX, y: t.clientY }
        }}
        onTouchEnd={(e) => {
          const start = swipeStart.current
          swipeStart.current = null
          if (!start) return
          const t = e.changedTouches[0]
          const dx = t.clientX - start.x
          const dy = t.clientY - start.y
          // Mostly sideways and at least 40px, so vertical scrolling isn't a swipe
          if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) go(dx < 0 ? 1 : -1)
        }}
      >
        {featured.map((project, index) => {
          const offset = offsetOf(index)
          const distance = Math.abs(offset)
          const isActive = offset === 0
          const hidden = distance > 1

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
                <ProjectCard
                  project={project}
                  focusable={isActive}
                  onPreview={() => setPreview({ project: index, shot: 0 })}
                />
              </div>
            </article>
          )
        })}
      </div>

      <div className='mt-3 flex justify-center'>
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
            count={shots.length}
            index={preview.shot}
            onSelect={(shot) => setPreview((p) => (p === null ? p : { ...p, shot }))}
          />
        )
      })()}
    </section>
  )
}

export default ProjectShowcase
