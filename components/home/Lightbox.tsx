'use client'

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

type LightboxProps = {
  src: string
  alt: string
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
  // Show every image in the same fixed 2:1 frame (the shape of the project
  // screenshots) instead of sizing to each one, so the viewer doesn't jump
  // around when stepping between images
  fixedFrame?: boolean
  // Optional dot row under the image: how many images there are, which one is showing, and how to jump to one
  count?: number
  index?: number
  onSelect?: (index: number) => void
}

const Lightbox = ({ src, alt, onClose, onPrev, onNext, fixedFrame = false, count = 0, index = 0, onSelect }: LightboxProps) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev?.()
      if (e.key === 'ArrowRight') onNext?.()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onPrev, onNext])

  // Swipe left/right on the image to step through images (phones and touchpads)
  const touchStartX = useRef<number | null>(null)
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(dx) < 40) return
    if (dx < 0) onNext?.()
    else onPrev?.()
  }

  const navButton = 'absolute top-1/2 z-10 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-zinc-800/90 text-white ring-1 ring-white/20 transition hover:bg-zinc-700'

  // Rendered at the end of <body> rather than inside the section that opened it,
  // so dialogs sit together after the main content in the page structure
  return createPortal(
    <div
      id='lightbox'
      role='dialog'
      aria-modal='true'
      aria-label={alt}
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm'
      onClick={onClose}
    >
      <button type='button' aria-label='Close' onClick={onClose} className='absolute right-4 top-4 text-white'>
        <X size={26} />
      </button>

      {onPrev && (
        <button
          type='button'
          aria-label='Previous image'
          onClick={(e) => { e.stopPropagation(); onPrev() }}
          className={`${navButton} left-1 sm:left-4`}
        >
          <ChevronLeft size={22} />
        </button>
      )}

      {fixedFrame ? (
        // Width is the largest 2:1 box that fits in 80% of the width and 70% of the height,
        // and on phones leaves 3.5rem each side so the arrows sit beside the image, not on it;
        // The frame itself is invisible: it only keeps the size steady between images.
        // The image is shown whole inside it (tall phone screenshots aren't cropped),
        // with the rounded corners and outline on the image, not the frame
        <div onClick={(e) => e.stopPropagation()} className='flex flex-col items-center gap-4'>
          <div
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className='flex aspect-[2/1] w-[min(calc(100vw-7rem),80vw,1200px,calc(70vh*2))] touch-pan-y items-center justify-center'
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={alt} className='max-h-full max-w-full rounded-xl object-contain ring-1 ring-white/10' />
          </div>

          {count > 1 && (
            <div className='flex items-center'>
              {Array.from({ length: count }, (_, i) => (
                // Padding gives each small dot a finger-sized tap area
                <button
                  key={i}
                  type='button'
                  aria-label={`Show image ${i + 1} of ${count}`}
                  aria-current={i === index ? 'true' : undefined}
                  onClick={() => onSelect?.(i)}
                  className='group cursor-pointer p-2'
                >
                  <span
                    className={`block h-2 rounded-full transition-all ${i === index ? 'w-6 bg-white' : 'w-2 bg-white/40 group-hover:bg-white/70'}`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          onClick={(e) => e.stopPropagation()}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className='max-h-[85vh] max-w-[90vw] touch-pan-y rounded-xl object-contain'
        />
      )}

      {onNext && (
        <button
          type='button'
          aria-label='Next image'
          onClick={(e) => { e.stopPropagation(); onNext() }}
          className={`${navButton} right-1 sm:right-4`}
        >
          <ChevronRight size={22} />
        </button>
      )}
    </div>,
    document.body
  )
}

export default Lightbox
