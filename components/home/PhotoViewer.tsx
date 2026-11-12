'use client'

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

type PhotoViewerProps = {
  title: string
  photos: string[]
  index: number
  onSelect: (index: number) => void
  onClose: () => void
}

// Gallery viewer: a title bar, the current photo with arrows, and a thumbnail strip.
// Rendered at the end of <body> so it isn't clipped by the page's overflow rules.
const PhotoViewer = ({ title, photos, index, onSelect, onClose }: PhotoViewerProps) => {
  const total = photos.length
  const hasMany = total > 1
  const closeRef = useRef<HTMLButtonElement>(null)
  const touchStartX = useRef<number | null>(null)

  const step = (by: number) => onSelect((index + by + total) % total)

  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && hasMany) onSelect((index - 1 + total) % total)
      if (e.key === 'ArrowRight' && hasMany) onSelect((index + 1) % total)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, total, hasMany, onSelect, onClose])

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || !hasMany) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(dx) >= 40) step(dx < 0 ? 1 : -1)
  }

  const arrow =
    'absolute top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-white/15 bg-black/70 text-white transition-colors hover:bg-black'

  return createPortal(
    <div
      role='dialog'
      aria-modal='true'
      aria-label={`${title} photos`}
      onClick={onClose}
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-6'
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='flex max-h-full w-full max-w-[900px] flex-col overflow-hidden rounded-2xl border border-line bg-surface'
      >
        <div className='flex items-center justify-between gap-4 border-b border-line px-5 py-3.5'>
          <div className='min-w-0'>
            <h3 className='truncate font-semibold'>{title}</h3>
            <p className='text-xs text-muted'>
              Photo {index + 1} of {total}
            </p>
          </div>
          <button
            ref={closeRef}
            type='button'
            aria-label='Close'
            onClick={onClose}
            className='grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full bg-wash text-fg transition-opacity hover:opacity-75'
          >
            <X size={18} />
          </button>
        </div>

        <div
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX
          }}
          onTouchEnd={onTouchEnd}
          className='relative h-[min(60vh,62vw)] touch-pan-y bg-black'
        >
          <Image
            key={photos[index]}
            src={photos[index]}
            alt={`${title} photo ${index + 1}`}
            fill
            sizes='(max-width: 900px) 100vw, 900px'
            className='object-contain'
          />

          {hasMany && (
            <>
              <button type='button' aria-label='Previous photo' onClick={() => step(-1)} className={`${arrow} left-3`}>
                <ChevronLeft size={20} />
              </button>
              <button type='button' aria-label='Next photo' onClick={() => step(1)} className={`${arrow} right-3`}>
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>

        {hasMany && (
          // Centered at every size; the inner row is only as wide as the thumbnails, so
          // when there are too many to fit it still scrolls from the first one
          <div className='overflow-x-auto border-t border-line p-3'>
            <div className='mx-auto flex w-max gap-2'>
            {photos.map((photo, i) => (
              <button
                key={photo}
                type='button'
                aria-label={`Show photo ${i + 1}`}
                aria-current={i === index ? 'true' : undefined}
                onClick={() => onSelect(i)}
                className={`relative h-12 w-16 shrink-0 cursor-pointer overflow-hidden rounded-md transition-opacity ${
                  i === index ? 'ring-2 ring-fg' : 'opacity-50 hover:opacity-100'
                }`}
              >
                <Image src={photo} alt='' fill sizes='64px' className='object-cover' />
              </button>
            ))}
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}

export default PhotoViewer
