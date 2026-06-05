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

      <div className='flex flex-col'>
        {experiences.map((item, index) => {
          const isLast = index === experiences.length - 1
          const isPresent = item.year.toLowerCase().includes('present')

          return (
            <div key={index} className='flex gap-4'>
              {/* Dot + line column */}
              <div className='flex flex-col items-center flex-shrink-0' style={{ width: 14 }}>
                {/* Spacer aligns dot center with title's first line center (text-sm leading-tight) */}
                <div className='h-[5px]' />

                {/* Dot */}
                {isPresent ? (
                  <span className='relative flex items-center justify-center flex-shrink-0'>
                    {/* Ping ring */}
                    <span className='absolute inline-flex h-3 w-3 rounded-full bg-zinc-400 dark:bg-zinc-300 opacity-75 experience-dot-ping' />
                    {/* Core dot */}
                    <span className='relative inline-flex h-2 w-2 rounded-full bg-zinc-600 dark:bg-zinc-200' />
                  </span>
                ) : (
                  <span className='inline-flex h-2 w-2 flex-shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-500' />
                )}

                {/* Connector line stretches to bottom of this row */}
                {!isLast && (
                  <div className='flex-1 w-0.5 bg-zinc-300 dark:bg-zinc-600 mt-1' />
                )}
              </div>

              {/* Text content — pb creates spacing between items */}
              <div className={`flex-1 ${isLast ? 'pb-0' : 'pb-5'}`}>
                <div className='flex items-start justify-between gap-3'>
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
