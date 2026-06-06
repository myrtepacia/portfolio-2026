'use client'

import { useState } from 'react'
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
  const [startIndex, setStartIndex] = useState(0)

  const visibleCount = 4
  const total = galleryImages.length

  const handlePrev = () => setStartIndex((prev) => (prev - 1 + total) % total)
  const handleNext = () => setStartIndex((prev) => (prev + 1) % total)

  const visibleImages = Array.from({ length: visibleCount }, (_, i) => {
    const index = (startIndex + i) % total
    return { ...galleryImages[index], index }
  })

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
        {/* Image strip */}
        <div className="flex gap-2 overflow-hidden">
          {visibleImages.map((img, i) => (
            <button
              key={`${img.index}-${i}`}
              onClick={() => setLightbox(img.index)}
              className="relative flex-1 aspect-square overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:scale-[1.02] transition-transform duration-200 cursor-pointer"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 25vw, 180px"
              />
            </button>
          ))}
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
