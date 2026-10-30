'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Award, Eye } from 'lucide-react'
import { certificates } from '@/constants'
import SectionTitle, { MonoLabel } from './SectionTitle'
import Lightbox from './Lightbox'

// Only the first few show on the landing page; the rest live on /certificates
const VISIBLE = 2
const shown = certificates.slice(0, VISIBLE)

const Education = () => {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id='education' aria-label='Certificates and training' data-comment='Certificates' className='scroll-mt-20 !mb-10'>
      <div className='flex flex-wrap items-end justify-between gap-x-6'>
        <SectionTitle
          title='Certificates & Training'
          subtitle='Workshops, courses, and certifications I have completed.'
        />
        <Link
          href='/certificates'
          className='mb-8 inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.12em] text-subtle transition-colors hover:text-fg'
        >
          View all
          <ArrowUpRight size={12} />
        </Link>
      </div>

      <ul className='grid gap-4 sm:grid-cols-2'>
        {shown.map((cert, index) => (
          <li key={cert.title} className='flex flex-col overflow-hidden rounded-2xl border border-line bg-surface'>
            {/* Preview only; the certificate opens from the View Certificate button below */}
            <div className='relative aspect-[16/10] overflow-hidden border-b border-line bg-wash'>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cert.image}
                alt=''
                loading='lazy'
                className='h-full w-full object-cover object-top'
              />
            </div>

            <div className='flex flex-1 flex-col p-4'>
              <div className='flex items-center justify-between gap-2'>
                <MonoLabel icon={<Award size={11} />}>Certificate</MonoLabel>
              </div>
              <h3 className='mt-3 text-[15px] font-semibold leading-snug'>{cert.title}</h3>
              <p className='mt-1 text-xs text-muted'>{cert.provider}</p>
            </div>

            <button
              type='button'
              onClick={() => setOpen(index)}
              className='flex items-center justify-center gap-2 border-t border-line py-2.5 font-mono text-[11px] text-muted transition-colors hover:bg-wash hover:text-fg'
            >
              <Eye size={13} />
              View Certificate
            </button>
          </li>
        ))}
      </ul>

      {open !== null && (
        <Lightbox
          src={shown[open].image}
          alt={shown[open].title}
          onClose={() => setOpen(null)}
        />
      )}
    </section>
  )
}

export default Education
