'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { certificates } from '@/constants'
import SectionTitle from './SectionTitle'
import Lightbox from './Lightbox'
import CertificateCard from './CertificateCard'

// Only the first few show on the landing page; the rest live on /certificates
const VISIBLE = 2
const shown = certificates.slice(0, VISIBLE)

const Education = () => {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id='education' aria-label='Certificates and training' className='scroll-mt-20 !mb-10'>
      <div className='flex flex-wrap items-end justify-between gap-x-6'>
        <SectionTitle
          title='Certificates & Training'
          subtitle='Workshops, courses, and certifications I have completed.'
        />
        <Link
          href='/certificates'
          // ml-auto keeps it on the right even when it wraps below the title on phones
          className='mb-8 ml-auto inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.12em] text-subtle transition-colors hover:text-fg'
        >
          View all
          <ArrowUpRight size={12} />
        </Link>
      </div>

      <ul className='grid gap-4 sm:grid-cols-2'>
        {shown.map((cert, index) => (
          <CertificateCard key={cert.title} {...cert} onView={() => setOpen(index)} />
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
