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

      <div className='flex gap-4'>
        <div className='relative flex flex-col gap-5 pt-1'>
          {experiences.map((item, index) => {
            const Icon = item.icon

            return (
              <div
                key={index}
                className='bg-zinc-100 dark:bg-zinc-800 rounded-full p-2 relative z-10 border border-zinc-200 dark:border-zinc-400'
              >
                <Icon className='text-zinc-500 dark:text-zinc-400' size={15} />
              </div>
            )
          })}

          <div className='absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-zinc-300 dark:bg-zinc-400' />
        </div>

        <div className='flex flex-col gap-5 w-full'>
          {experiences.map((item, index) => (
            <div key={index}>
              <div className='flex items-start justify-between gap-3'>
                <h4 className='text-sm font-bold leading-tight pr-2'>
                  {item.title}
                </h4>
                <span className='badge text-[10px] shrink-0'>{item.year}</span>
              </div>

              {item.subtitle && (
                <p className='text-xs text-zinc-600 dark:text-zinc-400 mt-1'>
                  {item.subtitle}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Experience
