'use client'

import { useEffect, useState } from 'react'
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

  // Build a track that clones `visibleCount` images on each side so the
  // slide can loop seamlessly in both directions. Each slide remembers the
  // real index it maps to (for the lightbox).
  const slides = [
    ...galleryImages
      .slice(total - clones)
      .map((img, i) => ({ ...img, realIndex: total - clones + i })),
    ...galleryImages.map((img, i) => ({ ...img, realIndex: i })),
    ...galleryImages.slice(0, clones).map((img, i) => ({ ...img, realIndex: i })),
  ]

  // Start at the first real image (just past the leading clones).
  const [index, setIndex] = useState(clones)
  const [withTransition, setWithTransition] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)

  const step = 100 / slides.length // % of track width per single slide

  const handlePrev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setWithTransition(true)
    setIndex((prev) => prev - 1)
  }

  const handleNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setWithTransition(true)
    setIndex((prev) => prev + 1)
  }

  // When a slide finishes, snap back to the matching real image without an
  // animation if we've landed on a clone — that's what makes the loop seamless.
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

  // Re-enable the transition on the next frame after a no-animation snap.
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

      {/* Wrapper with horizontal padding so arrows have room to sit outside */}
      <div className="relative px-5">
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
                  className="relative w-full aspect-square rounded-lg bg-gray-100 dark:bg-zinc-800 hover:scale-[1.02] transition-transform duration-200 cursor-pointer p-2"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 25vw, 180px"
                    />
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Prev — centered on the left edge of the image strip */}
        <button
          onClick={handlePrev}
          aria-label="Previous images"
          className="absolute left-5 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10
                     grid place-items-center h-7 w-7 rounded-md
                     border border-zinc-200 dark:border-zinc-600
                     bg-white/75 dark:bg-zinc-800/75 backdrop-blur-sm
                     text-zinc-600 dark:text-zinc-300 shadow-md
                     opacity-80 hover:opacity-100
                     transition-all duration-200"
        >
          <ChevronLeft size={15} />
        </button>

        {/* Next — centered on the right edge of the image strip */}
        <button
          onClick={handleNext}
          aria-label="Next images"
          className="absolute right-5 top-1/2 -translate-y-1/2 translate-x-1/2 z-10
                     grid place-items-center h-7 w-7 rounded-md
                     border border-zinc-200 dark:border-zinc-600
                     bg-white/75 dark:bg-zinc-800/75 backdrop-blur-sm
                     text-zinc-600 dark:text-zinc-300 shadow-md
                     opacity-80 hover:opacity-100
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
            className="w-[85vw] max-w-3xl bg-gray-100 dark:bg-zinc-800 rounded-2xl px-10 py-10 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[lightbox].src}
              alt={galleryImages[lightbox].alt}
              className="max-w-full max-h-[75vh] object-contain rounded-lg"
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
