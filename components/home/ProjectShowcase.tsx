'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { projectData } from '@/constants'
import SectionTitle from './SectionTitle'
import Lightbox from './Lightbox'
import ProjectCard from './ProjectCard'

// Featured unless a project says otherwise, in the order listed in constants
const featured = projectData.filter((project) => project.featured !== false)

// How long each card stays in front before the stack rotates to the next one
const AUTOPLAY_MS = 3000

type Project = (typeof projectData)[number]

// How long each screenshot stays in front before the phones rotate
const PHONE_ROTATE_MS = 3000

// How far a finger has to drag the phones (in px) to switch screenshots
const PHONE_DRAG_THRESHOLD = 40

// Where each phone sits. The rotation moves left to right: the left phone comes
// to the front, the front one moves to the right, and the right one tucks
// behind the front until it comes back on the left
const PHONE_FRONT = 'z-20'
const PHONE_LEFT = '-translate-x-[62%] translate-y-3 -rotate-6 scale-[0.86] z-10 opacity-90'
const PHONE_RIGHT = 'translate-x-[62%] translate-y-3 rotate-6 scale-[0.86] z-10 opacity-90'
const PHONE_WAITING = 'translate-y-6 scale-75 z-0 opacity-0 pointer-events-none'

// Position for a phone by its place in the rotation (0 = front, 1 = next up)
const phonePosition = (place: number, total: number) => {
  if (place === 0) return PHONE_FRONT
  if (place === 1) return PHONE_LEFT
  if (place === total - 1 && total > 2) return PHONE_RIGHT
  return PHONE_WAITING
}

// Layout for a single featured project: the card's details on the left and its
// screenshots shown as phones on the right (below on small screens)
const Spotlight = ({ project, onPreview }: { project: Project; onPreview: (shot: number) => void }) => {
  const shots = project.screenshots
  const total = shots.length
  // Which screenshot is in front; the rest follow it in order
  const [front, setFront] = useState(0)
  // Paused only while the phones are being dragged
  const [paused, setPaused] = useState(false)
  // `switched` is set once this drag has changed the photo, so one drag = one switch
  const dragStart = useRef<{ x: number; y: number; id: number; switched: boolean } | null>(null)
  // Set when a touch turned into a drag, so letting go doesn't also open the viewer
  const dragged = useRef(false)

  const step = (by: number) => setFront((i) => (i + by + total) % total)

  useEffect(() => {
    if (paused || total < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = setTimeout(() => step(1), PHONE_ROTATE_MS)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [front, paused, total])

  // Dragging with a finger or the mouse: once the drag passes the threshold the
  // next screenshot switches in right away (the phones don't follow the pointer).
  // Dragging right brings the left phone to the front, matching the rotation
  const onPointerDown = (e: React.PointerEvent) => {
    if (total < 2 || (e.pointerType === 'mouse' && e.button !== 0)) return
    dragStart.current = { x: e.clientX, y: e.clientY, id: e.pointerId, switched: false }
    dragged.current = false
    setPaused(true)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    const start = dragStart.current
    if (!start || start.id !== e.pointerId || start.switched) return
    const dx = e.clientX - start.x
    const dy = e.clientY - start.y
    // Mostly vertical: let the page scroll instead
    if (!dragged.current && Math.abs(dy) > Math.abs(dx)) return
    if (Math.abs(dx) > 6) dragged.current = true
    if (Math.abs(dx) < PHONE_DRAG_THRESHOLD) return
    step(dx > 0 ? 1 : -1)
    start.switched = true
  }
  const endDrag = (e: React.PointerEvent) => {
    const start = dragStart.current
    if (!start || start.id !== e.pointerId) return
    dragStart.current = null
    setPaused(false)
  }

  return (
    // No card frame: the details and the phones sit straight on the page
    <article className='reveal grid items-center gap-8 md:grid-cols-2'>
      {/* The "Mobile App" badge (the card's first row) shows on desktop, hidden on phones */}
      <div className='flex flex-col justify-center max-md:[&>ul:first-child]:hidden'>
        {/* No Screenshots button here (the phones beside it open the screenshots) */}
        <ProjectCard project={project} />
      </div>

      <div
        // touch-pan-y: vertical swipes still scroll the page; sideways ones drag the phones
        className='relative order-first flex min-h-[330px] cursor-grab touch-pan-y select-none items-center justify-center overflow-hidden active:cursor-grabbing md:order-none'
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        // A mouse drag that leaves the phones ends there
        onPointerLeave={endDrag}
      >
        <div className='absolute inset-0 flex items-center justify-center'>
          {shots.map((src, shot) => {
            // Place in the rotation, counting from the screenshot in front
            const place = (shot - front + total) % total
            const position = phonePosition(place, total)
            const waiting = position === PHONE_WAITING
            return (
              <button
                key={src}
                type='button'
                onClick={() => {
                  if (!dragged.current) onPreview(shot)
                }}
                tabIndex={waiting ? -1 : 0}
                aria-hidden={waiting}
                aria-label={`View ${project.title} screenshot ${shot + 1}`}
                draggable={false}
                className={`absolute aspect-[922/1989] w-[118px] cursor-[inherit] overflow-hidden rounded-[18px] border-[3px] border-[#111] bg-black shadow-[0_18px_40px_-14px_rgba(0,0,0,0.45)] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] sm:w-[140px] ${position}`}
              >
                <Image src={src} alt='' fill sizes='140px' draggable={false} className='object-cover object-top' />
              </button>
            )
          })}
        </div>
      </div>
    </article>
  )
}

// Centered under the whole section, below Download on phones (where the columns stack)
const ViewAllLink = () => (
  <div className='reveal mt-6 flex justify-center'>
    <Link href='/projects' className='inline-flex items-center gap-1 font-mono text-xs text-subtle hover:text-fg'>
      View all projects
      <ArrowUpRight size={12} />
    </Link>
  </div>
)

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
    <section id='projects' aria-label='Featured project' className='scroll-mt-20 !mb-12'>
      <SectionTitle
        title='Featured Project'
        subtitle='School, personal, and collaborative builds where I take an idea from a rough sketch to a working, deployed app.'
      />

      {total === 1 ? (
        <>
          <Spotlight project={featured[0]} onPreview={(shot) => setPreview({ project: 0, shot })} />
          <ViewAllLink />
        </>
      ) : (
      <div
        ref={stackRef}
        className='reveal relative -mx-5 h-[400px] overflow-hidden px-5 [--card-w:300px] [--fan:96px] sm:mx-0 sm:h-[380px] sm:overflow-visible sm:px-0 sm:[--card-w:380px] sm:[--fan:250px]'
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
      )}

      {total > 1 && (
      <div className='reveal mt-3 flex justify-center'>
        <Link href='/projects' className='inline-flex items-center gap-1 font-mono text-xs text-subtle hover:text-fg'>
          View all projects
          <ArrowUpRight size={12} />
        </Link>
      </div>
      )}

      {preview !== null && (() => {
        // Arrows step through this project's own screenshots, never into another project
        const shots = featured[preview.project].screenshots
        const step = (by: number) =>
          setPreview((p) => (p === null ? p : { ...p, shot: (p.shot + by + shots.length) % shots.length }))
        return (
          <Lightbox
            fixedFrame
            tallFrame={featured[preview.project].tallScreenshots}
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
