import {
  Briefcase,
} from 'lucide-react'
import React from 'react'

const experiences = [
  {
    title: 'BS Computer Science',
    subtitle: 'Negros Oriental State University',
    year: '2024 - Present',
  },
  {
    title: 'Freelance Web Designer',
    subtitle: '',
    year: '2024',
  },
  {
    title: 'Computer System Servicing',
    subtitle: 'Demetrio L. Alviola National High School',
    year: '2024',
  },
  {
    title: 'First Hello World',
    subtitle: '',
    year: '2021',
  },
]

const Experience = () => {
  return (
    <div className='card'>
      <div className='flex flex-nowrap items-center gap-2'>
        <span>
          <Briefcase color='#71717a' size={20} />
        </span>
        <h2 className='font-bold'>Experience</h2>
      </div>

      <div className='flex flex-col gap-5'>
        {experiences.map((item, index) => {
          const isLast = index === experiences.length - 1
          const isPresent = item.year.toLowerCase().includes('present')

          return (
            <div key={index} className='relative flex gap-4'>
              {/* Connector line: dot center is always 12px from item top,
                  vertical gap between items is 20px (gap-5), so this reliably
                  reaches the next dot regardless of subtitle height. */}
              {!isLast && (
                <span
                  className='absolute w-0.5 -translate-x-1/2 bg-zinc-300 dark:bg-zinc-600'
                  style={{ left: 7, top: 12, height: 'calc(100% + 20px)' }}
                />
              )}

              {/* Dot column — fixed height matches the title row exactly */}
              <div
                className='relative z-10 flex flex-shrink-0 items-center justify-center'
                style={{ width: 14, height: 24 }}
              >
                {isPresent ? (
                  <span className='relative flex items-center justify-center'>
                    {/* Ping ring */}
                    <span className='absolute inline-flex h-3 w-3 rounded-full bg-zinc-400 dark:bg-zinc-300 opacity-75 experience-dot-ping' />
                    {/* Core dot */}
                    <span className='relative inline-flex h-2 w-2 rounded-full bg-zinc-600 dark:bg-zinc-200' />
                  </span>
                ) : (
                  <span className='inline-flex h-2 w-2 rounded-full bg-zinc-400 dark:bg-zinc-500' />
                )}
              </div>

              {/* Content column */}
              <div className='flex-1'>
                {/* Title + year share the SAME fixed height as the dot,
                    both centered, so the dot lines up dead-center with them. */}
                <div className='flex items-center justify-between gap-3' style={{ height: 24 }}>
                  <h4 className='text-sm font-bold leading-tight'>{item.title}</h4>
                  <span className='badge text-[10px] shrink-0'>{item.year}</span>
                </div>

                {item.subtitle && (
                  <p className='text-xs text-zinc-600 dark:text-zinc-400 mt-1'>
                    {item.subtitle}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Experience
