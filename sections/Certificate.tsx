'use client'

import { useState } from 'react'
import { ChevronRight, Trophy, X } from 'lucide-react'
import { certificates } from '@/constants'
import Link from 'next/link'

const Certificate = () => {
  const [selectedCert, setSelectedCert] = useState<null | (typeof certificates)[number]>(null)

  return (
    <div className='card'>
      <div className='flex flex-nowrap items-center justify-between'>
        <div className='flex flex-nowrap items-center gap-2'>
          <span><Trophy color='#71717a' size={20} /></span>
          <h2 className='font-bold'>Certificates</h2>
        </div>

        <div className='flex flex-nowrap items-center gap-1'>
          <Link href='/certificates' className='text-xs text-zinc-700 dark:text-white'>
            View All
          </Link>
          <ChevronRight size={12} className='text-zinc-700 dark:text-white' />
        </div>
      </div>

      <div className='space-y-2'>
        {certificates.slice(0, 5).map((item, index) => (
          <div
            key={index}
            className='bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors dark:bg-zinc-800 dark:hover:bg-zinc-700'
          >
            <img
              src={item.image}
              alt={item.title}
              className='w-full rounded-md'
            />

            <button
              type='button'
              onClick={() => setSelectedCert(item)}
              className='mt-2 text-left w-full'
            >
              <h4 className='text-xs font-bold hover:underline'>{item.title}</h4>
            </button>

            <p className='text-xs text-zinc-600 dark:text-zinc-300'>
              {item.provider}
            </p>
          </div>
        ))}
      </div>

      {selectedCert && (
        <div
          className='fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4'
          onClick={() => setSelectedCert(null)}
        >
          <div
            className='relative max-w-4xl w-full'
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type='button'
              onClick={() => setSelectedCert(null)}
              className='absolute -top-10 right-0 text-white'
            >
              <X size={28} />
            </button>

            <img
              src={selectedCert.image}
              alt={selectedCert.title}
              className='w-full max-h-[85vh] object-contain rounded-lg bg-white'
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Certificate
