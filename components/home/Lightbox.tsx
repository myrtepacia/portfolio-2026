'use client'

import { useEffect } from 'react'
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
}

const Lightbox = ({ src, alt, onClose, onPrev, onNext, fixedFrame = false }: LightboxProps) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev?.()
      if (e.key === 'ArrowRight') onNext?.()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onPrev, onNext])

  const navButton = 'absolute top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/30'

  return (
    <div
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
          className={`${navButton} left-4`}
        >
          <ChevronLeft size={22} />
        </button>
      )}

      {fixedFrame ? (
        // Width is the largest 2:1 box that fits in 94% of the width and 88% of the height;
        // object-cover fills it edge to edge, so there are no bars around the image
        <div
          onClick={(e) => e.stopPropagation()}
          className='aspect-[2/1] w-[min(94vw,1600px,calc(88vh*2))] overflow-hidden rounded-xl ring-1 ring-white/10'
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className='h-full w-full object-cover object-top' />
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          onClick={(e) => e.stopPropagation()}
          className='max-h-[85vh] max-w-[90vw] rounded-xl object-contain'
        />
      )}

      {onNext && (
        <button
          type='button'
          aria-label='Next image'
          onClick={(e) => { e.stopPropagation(); onNext() }}
          className={`${navButton} right-4`}
        >
          <ChevronRight size={22} />
        </button>
      )}
    </div>
  )
}

export default Lightbox
