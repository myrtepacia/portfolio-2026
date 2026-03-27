import {
  Binary,
  BrainCog,
  Briefcase,
  CodeXml,
  GraduationCap,
} from 'lucide-react'
import React from 'react'

const experiences = [
  {
    title: 'BS Computer Science',
    subtitle: 'Negros Oriental State University',
    year: '2024 - Present',
    icon: Binary,
  },
  {
    title: 'Freelance Web Designer',
    subtitle: '',
    year: '2024',
    icon: BrainCog,
  },
  {
    title: 'Computer System Servicing',
    subtitle: 'Demetrio L. Alviola National High School',
    year: '2024',
    icon: GraduationCap,
  },
  {
    title: 'First Hello World',
    subtitle: '',
    year: '2021',
    icon: CodeXml,
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

      <div className='space-y-5'>
        {experiences.map((item, index) => {
          const Icon = item.icon
          const isLast = index === experiences.length - 1

          return (
            <div key={index} className='relative flex gap-4'>
              <div className='relative flex flex-col items-center shrink-0'>
                {!isLast && (
                  <div className='absolute top-10 h-[calc(100%+20px)] w-0.5 bg-zinc-300 dark:bg-zinc-400' />
                )}

                <div className='bg-zinc-100 dark:bg-zinc-800 rounded-full p-2 z-10 relative border border-zinc-200 dark:border-zinc-400'>
                  <Icon className='text-zinc-500 dark:text-zinc-400' size={15} />
                </div>
              </div>

              <div className='flex-1'>
                <div
                  className={`flex justify-between gap-3 ${
                    item.subtitle ? 'items-start' : 'items-center min-h-[32px]'
                  }`}
                >
                  <div className='pr-2'>
                    <h4 className='text-sm font-bold leading-tight'>{item.title}</h4>
                    {item.subtitle && (
                      <p className='text-xs text-zinc-600 dark:text-zinc-400 mt-1'>
                        {item.subtitle}
                      </p>
                    )}
                  </div>

                  <span className='badge text-[10px] shrink-0'>{item.year}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Experience
