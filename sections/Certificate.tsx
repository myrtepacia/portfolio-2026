'use client'

import { useState } from 'react'
import { ChevronRight, Trophy, X } from 'lucide-react'
import { certificates } from '@/constants'

const MAX_DISPLAY = 4   // "Using HTML and CSS to Design a Website" is at index 4, hidden from main view

const Certificate = () => {
  const [selectedCert, setSelectedCert] = useState<(typeof certificates)[number] | null>(null)
  const [showAll, setShowAll] = useState(false)

  const visibleCerts = certificates.slice(0, MAX_DISPLAY)

  return (
    <div className='card h-full w-full flex flex-col'>
      {/* Header */}
      <div className='flex flex-nowrap items-center justify-between'>
        <div className='flex flex-nowrap items-center gap-2'>
          <span>
            <Trophy color='#71717a' size={20} />
          </span>
          <h2 className='font-bold'>Certificates</h2>
        </div>
        <button
          onClick={() => setShowAll(true)}
          className='flex items-center gap-0.5 text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors'
        >
          View all <ChevronRight size={12} />
        </button>
      </div>

      {/* 4 visible certs */}
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

      {/* Individual cert image lightbox */}
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

      {/* View All modal — shows every certificate including the hidden one */}
      {showAll && (
        <div
          className='fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4'
          onClick={() => setShowAll(false)}
        >
          <div
            className='bg-white dark:bg-zinc-900 rounded-xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center gap-2'>
                <Trophy size={18} color='#71717a' />
                <h2 className='font-bold text-sm'>All Certificates</h2>
              </div>
              <button onClick={() => setShowAll(false)}>
                <X size={20} className='text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors' />
              </button>
            </div>

            {/* All certs list */}
            <div className='flex flex-col gap-2'>
              {certificates.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setShowAll(false)
                    setSelectedCert(item)
                  }}
                  className='bg-gray-100 dark:bg-zinc-800 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer'
                >
                  <h4 className='text-xs font-bold'>{item.title}</h4>
                  <p className='text-xs text-zinc-600 dark:text-zinc-300'>{item.provider}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Certificate
