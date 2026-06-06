'use client'

import { useEffect, useRef, useState } from 'react'
import { ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

const galleryImages = [
  { src: '/images/gal1.jpg', alt: 'Gallery 1' },
  { src: '/images/gal2.jpg', alt: 'Gallery 2' },
  { src: '/images/gal3.jpg', alt: 'Gallery 3' },
  { src: '/images/gal4.jpg', alt: 'Gallery 4' },
  { src: '/images/gal5.jpg', alt: 'Gallery 5' },
  { src: '/images/gal6.jpg', alt: 'Gallery 6' },
]

const Gallery = () => {
  const [lightbox, setLightbox] = useState<number | null>(null)

  const visibleCount = 4
  const total = galleryImages.length
  const clones = visibleCount

  const slides = [
    ...galleryImages
      .slice(total - clones)
      .map((img, i) => ({ ...img, realIndex: total - clones + i })),
    ...galleryImages.map((img, i) => ({ ...img, realIndex: i })),
    ...galleryImages.slice(0, clones).map((img, i) => ({ ...img, realIndex: i })),
  ]

  const [index, setIndex] = useState(clones)
  const [withTransition, setWithTransition] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)

  // Ref so the auto-advance interval always sees the latest isAnimating value
  // without needing to recreate the interval on every render.
  const isAnimatingRef = useRef(false)
  useEffect(() => { isAnimatingRef.current = isAnimating }, [isAnimating])

  // Bump this to restart the 2-second window after a manual click.
  const [autoKey, setAutoKey] = useState(0)

  const step = 100 / slides.length

  const handlePrev = () => {
    if (isAnimating) return
    setAutoKey((k) => k + 1)   // reset auto-timer
    setIsAnimating(true)
    setWithTransition(true)
    setIndex((prev) => prev - 1)
  }

  const handleNext = () => {
    if (isAnimating) return
    setAutoKey((k) => k + 1)   // reset auto-timer
    setIsAnimating(true)
    setWithTransition(true)
    setIndex((prev) => prev + 1)
  }

  // Auto-advance every 2 seconds. Pauses while lightbox is open.
  // Resets the 2-second window whenever the user manually navigates.
  useEffect(() => {
    if (lightbox !== null) return
    const id = setInterval(() => {
      if (!isAnimatingRef.current) {
        setIsAnimating(true)
        setWithTransition(true)
        setIndex((prev) => prev + 1)
      }
    }, 2000)
    return () => clearInterval(id)
  }, [autoKey, lightbox])

  const handleTransitionEnd = () => {
    setIsAnimating(false)
    if (index >= clones + total) {
      setWithTransition(false)
      setIndex(index - total)
    } else if (index < clones) {
      setWithTransition(false)
      setIndex(index + total)
    }
  }

  useEffect(() => {
    if (!withTransition) {
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => setWithTransition(true))
      )
      return () => cancelAnimationFrame(id)
    }
  }, [withTransition])

  const handleLightboxPrev = () =>
    setLightbox((prev) => (prev !== null ? (prev - 1 + total) % total : 0))
  const handleLightboxNext = () =>
    setLightbox((prev) => (prev !== null ? (prev + 1) % total : 0))

  return (
    <div className="card">
      <div className="flex items-center gap-2">
        <ImageIcon size={18} className="text-zinc-500 dark:text-zinc-400" />
        <h2 className="font-bold">Gallery</h2>
      </div>

      {/*
        FIX 1 — Equal padding on all sides: p-3 (12px everywhere) instead of px-7 py-3
        FIX 2 — Gray box is now the `relative` parent, so both arrow buttons are
                 absolutely positioned *inside* the box. `top-1/2 -translate-y-1/2`
                 now resolves against the box height which is:
                   p-3(top) + imageHeight + p-3(bottom)
                 The vertical center of the box equals the center of the images,
                 so the arrows land exactly in the middle of the image strip.
      */}
      <div className="relative rounded-xl bg-gray-100 dark:bg-zinc-800/50 p-3">

        {/* Viewport — clips the sliding track */}
        <div className="overflow-hidden">
          {/* Sliding track */}
          <div
            className="flex"
            style={{
              width: `${(slides.length / visibleCount) * 100}%`,
              transform: `translateX(-${index * step}%)`,
              transition: withTransition ? 'transform 450ms ease-in-out' : 'none',
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {slides.map((img, i) => (
              <div
                key={`${img.realIndex}-${i}`}
                style={{ flex: `0 0 ${100 / slides.length}%` }}
                className="px-1"
              >
                <button
                  onClick={() => setLightbox(img.realIndex)}
                  className="relative w-full aspect-square overflow-hidden rounded-lg bg-zinc-200 dark:bg-zinc-700 hover:scale-[1.02] transition-transform duration-200 cursor-pointer"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 25vw, 180px"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Prev — centered on the left edge of the gray box */}
        <button
          onClick={handlePrev}
          aria-label="Previous images"
          className="absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10
                     grid place-items-center h-7 w-7 rounded-md
                     border border-zinc-200 dark:border-zinc-600
                     bg-white dark:bg-zinc-800
                     text-zinc-600 dark:text-zinc-300 shadow-md
                     hover:shadow-lg hover:scale-105
                     transition-all duration-200"
        >
          <ChevronLeft size={15} />
        </button>

        {/* Next — centered on the right edge of the gray box */}
        <button
          onClick={handleNext}
          aria-label="Next images"
          className="absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 z-10
                     grid place-items-center h-7 w-7 rounded-md
                     border border-zinc-200 dark:border-zinc-600
                     bg-white dark:bg-zinc-800
                     text-zinc-600 dark:text-zinc-300 shadow-md
                     hover:shadow-lg hover:scale-105
                     transition-all duration-200"
        >
          <ChevronRight size={15} />
        </button>

      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={(e) => { e.stopPropagation(); handleLightboxPrev() }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition"
          >
            <ChevronLeft size={28} />
          </button>

          <div
            className="relative max-w-[90vw] max-h-[85vh] rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[lightbox].src}
              alt={galleryImages[lightbox].alt}
              className="max-w-[90vw] max-h-[85vh] object-contain"
            />
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); handleLightboxNext() }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition"
          >
            <ChevronRight size={28} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {galleryImages.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightbox(i) }}
                className={`w-2 h-2 rounded-full transition-all ${i === lightbox ? 'bg-white scale-125' : 'bg-white/40'}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Gallery
