'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight, Images } from 'lucide-react'
import { programs } from '@/constants'
import SectionTitle from './SectionTitle'
import PhotoViewer from './PhotoViewer'

// Photos previewed on each card; the last one shows "+N more" if there are extras
const PREVIEW = 3

const Gallery = () => {
  // Which program's photos are open, and which photo is showing
  const [open, setOpen] = useState<{ program: number; photo: number } | null>(null)

  return (
    <section id='gallery' aria-label='Gallery' className='scroll-mt-20 !mb-10'>
      <SectionTitle title='Gallery' />

      {/* A lone program fills the row; two columns start once there's a second one */}
      <ul className={`grid gap-4 ${programs.length > 1 ? 'md:grid-cols-2' : ''}`}>
        {programs.map(({ title, description, photos }, program) => {
          const extra = photos.length - PREVIEW

          return (
            <li key={title} className='reveal flex min-w-0 flex-col rounded-2xl border border-line bg-surface p-5 sm:p-6'>
              <h3 className='text-lg font-semibold'>{title}</h3>
              <p className='mt-2 text-sm leading-relaxed text-muted'>{description}</p>

              <div className='mt-auto pt-5'>
                <div className='flex items-center justify-between gap-3 border-t border-line pt-4'>
                  <p className='flex items-center gap-2 text-xs font-medium text-muted'>
                    <Images size={14} />
                    Program Photos ({photos.length})
                  </p>
                  <button
                    type='button'
                    onClick={() => setOpen({ program, photo: 0 })}
                    className='inline-flex shrink-0 cursor-pointer items-center gap-1 font-mono text-[11px] uppercase tracking-[0.12em] text-subtle transition-colors hover:text-fg'
                  >
                    View all
                    <ArrowUpRight size={12} />
                  </button>
                </div>

                <div className='mt-3 grid grid-cols-3 gap-2 sm:gap-3'>
                  {photos.slice(0, PREVIEW).map((photo, index) => {
                    const showsMore = index === PREVIEW - 1 && extra > 0
                    return (
                      <button
                        key={photo}
                        type='button'
                        aria-label={showsMore ? `Show ${extra} more photos` : `Open photo ${index + 1}`}
                        onClick={() => setOpen({ program, photo: index })}
                        className='group relative aspect-square cursor-pointer overflow-hidden rounded-lg bg-wash'
                      >
                        <Image
                          src={photo}
                          alt=''
                          fill
                          sizes='(max-width: 640px) 30vw, 260px'
                          className={`object-cover transition-transform duration-300 group-hover:scale-[1.04] ${showsMore ? 'blur-[2px]' : ''}`}
                        />
                        {showsMore && (
                          <span className='absolute inset-0 grid place-items-center bg-black/60 text-sm font-semibold text-white'>
                            +{extra} more
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            </li>
          )
        })}
      </ul>

      {open !== null && (
        <PhotoViewer
          title={programs[open.program].title}
          photos={programs[open.program].photos}
          index={open.photo}
          onSelect={(photo) => setOpen({ ...open, photo })}
          onClose={() => setOpen(null)}
        />
      )}
    </section>
  )
}

export default Gallery
