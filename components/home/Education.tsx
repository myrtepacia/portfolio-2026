'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { certificates } from '@/constants'
import SectionTitle from './SectionTitle'
import Lightbox from './Lightbox'
import CertificateCard from './CertificateCard'

// Only the newest few show on the home page; the rest live on /certificates
const shown = certificates.slice(0, 4)
// Phones show one row of two; the rest are a tap away on /certificates
const SHOWN_ON_PHONES = 2

const Education = () => {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id='education' aria-label='Certificates and training' className='scroll-mt-20 !mb-10'>
      {/* View all sits on the right, level with the subtitle's last line, at every screen size */}
      <div className='flex items-end justify-between gap-x-4 sm:gap-x-6'>
        <SectionTitle
          title='Certificates & Training'
          subtitle='Workshops, courses, and certifications I have completed.'
        />
        <Link
          href='/certificates'
          // mb-8 matches the title block's bottom margin so it lines up with the subtitle
          className='reveal mb-8 inline-flex shrink-0 items-center gap-1 font-mono text-[11px] uppercase tracking-[0.12em] text-subtle transition-colors hover:text-fg'
        >
          View all
          <ArrowUpRight size={12} />
        </Link>
      </div>

      <ul className='grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4'>
        {shown.map((cert, index) => (
          <CertificateCard
            key={cert.title}
            {...cert}
            onView={() => setOpen(index)}
            className={`reveal ${index >= SHOWN_ON_PHONES ? 'max-sm:hidden' : ''}`}
          />
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
