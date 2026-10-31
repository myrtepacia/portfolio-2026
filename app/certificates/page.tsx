'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { certificates } from '@/constants'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import CertificateCard from '@/components/home/CertificateCard'
import Lightbox from '@/components/home/Lightbox'

const Page = () => {
  // Which certificate is open in the viewer
  const [open, setOpen] = useState<number | null>(null)
  const total = certificates.length

  useGSAP(() => {
    gsap.from('.certificate-card', {
      opacity: 0,
      y: 20,
      stagger: 0.2,
      duration: 0.5,
      ease: 'power4.inOut',
    })
  }, [])

  const step = (by: number) => setOpen((i) => (i === null ? i : (i + by + total) % total))

  return (
    <main id='top' className='max-w-5xl padding-x py-10 space-y-5'>
      {/* Same header as All Projects: back link on the left, page title on the right */}
      <div className='flex flex-nowrap items-center justify-between gap-5'>
        <Link href='/' className='text-sm flex flex-nowrap items-center gap-2'>
          <ArrowLeft size={20} />
          Back to home
        </Link>

        <h1 className='text-2xl font-bold'>All Certifications</h1>
      </div>

      {/* Same cards as the home page's Certificates & Training section */}
      <ul className='grid gap-4 sm:grid-cols-2'>
        {certificates.map((cert, index) => (
          <CertificateCard key={cert.title} {...cert} className='certificate-card' onView={() => setOpen(index)} />
        ))}
      </ul>

      {open !== null && (
        <Lightbox
          src={certificates[open].image}
          alt={certificates[open].title}
          onClose={() => setOpen(null)}
          onPrev={total > 1 ? () => step(-1) : undefined}
          onNext={total > 1 ? () => step(1) : undefined}
        />
      )}
    </main>
  )
}

export default Page
