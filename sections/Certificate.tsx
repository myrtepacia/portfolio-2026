'use client'

import { useState } from 'react'
import { ChevronRight, Trophy, X } from 'lucide-react'
import { certificates } from '@/constants'
import Link from 'next/link'

const MAX_DISPLAY = 5

const Certificate = () => {
  const [selectedCert, setSelectedCert] = useState<(typeof certificates)[number] | null>(null)

  // Always shows the first MAX_DISPLAY entries.
  // Add new certificates to the TOP of the array in constants/index.ts
  // and the oldest one will automatically fall off the visible list.
  const visibleCerts = certificates.slice(0, MAX_DISPLAY)

  return (
    <div className='card h-full w-full flex flex-col'>
      <div className='flex flex-nowrap items-center justify-between'>
        <div className='flex flex-nowrap items-center gap-2'>
          <span>
            <Trophy color='#71717a' size={20} />
          </span>
          <h2 className='font-bold'>Certificates</h2>
        </div>

        <div className='flex flex-nowrap items-center gap-1'>
          <Link href='/certificates' className='text-xs text-zinc-700 dark:text-white'>
            View All
          </Link>
          <ChevronRight size={12} className='text-zinc-700 dark:text-white' />
        </div>
      </div>

      <div className='flex flex-col flex-1 justify-between gap-2'>
        {visibleCerts.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedCert(item)}
            className='flex-1 flex flex-col justify-center bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer dark:bg-zinc-800 dark:hover:bg-zinc-700'
          >
            <h4 className='text-xs font-bold'>{item.title}</h4>
            <p className='text-xs text-zinc-600 dark:text-zinc-300'>
              {item.provider}
            </p>
          </div>
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

export default Certificate
