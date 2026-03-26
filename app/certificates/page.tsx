'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, X } from 'lucide-react'
import { certificates } from '@/constants'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const Page = () => {
  const [selectedCert, setSelectedCert] = useState<(typeof certificates)[number] | null>(null)

  useGSAP(() => {
    gsap.from('.certificate-card', {
      opacity: 0,
      y: 20,
      stagger: 0.2,
      duration: 0.5,
      ease: 'power4.inOut',
    })
  }, [])

  return (
    <div className='max-w-5xl padding-x py-10 space-y-5'>
      <div className='flex flex-nowrap gap-5 flex-col sm:items-center sm:flex-row'>
        <Link href='/' className='text-sm flex flex-nowrap items-center gap-2'>
          <ArrowLeft size={20} />
          Back to home
        </Link>

        <h1 className='text-2xl font-bold'>All Certifications</h1>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
        {certificates.map((item, index) => (
          <button
            key={index}
            type='button'
            onClick={() => setSelectedCert(item)}
            className='certificate-card card space-y-2 text-left'
          >
            <h3 className='font-bold'>{item.title}</h3>
            <p className='text-sm text-zinc-500'>{item.provider}</p>
          </button>
        ))}
      </div>

      {selectedCert && (
        <div
          className='fixed inset-0 z-50 bg-black/70 flex items-center justify-center'
          onClick={() => setSelectedCert(null)}
        >
          <button
            type='button'
            onClick={() => setSelectedCert(null)}
            className='absolute top-4 right-4 text-white z-50'
          >
            <X size={28} />
          </button>

          <img
            src={selectedCert.image}
            alt={selectedCert.title}
            onClick={(e) => e.stopPropagation()}
            className='max-w-[90vw] max-h-[90vh] object-contain'
          />
        </div>
      )}
    </div>
  )
}

export default Page
