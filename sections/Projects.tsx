import Link from 'next/link'
import { ChevronRight, FolderOpen, Globe } from 'lucide-react'
import { projectData } from '@/constants'

const Projects = () => {
  return (
    <div className='card'>
      <div className='flex flex-nowrap items-center justify-between'>
        <div className='flex flex-nowrap items-center gap-2'>
          <span>
            <FolderOpen color='#71717a' size={20} />
          </span>
          <h2 className='font-bold'>Projects</h2>
        </div>

        <div className='flex flex-nowrap items-center gap-1'>
          <Link href='/projects' className='text-xs text-zinc-700 dark:text-white'>
            View All
          </Link>
          <ChevronRight size={12} className='text-zinc-700 dark:text-white' />
        </div>
      </div>

      <div className='space-y-6'>
        {projectData.slice(0, 3).map((item, index) => (
          <div key={index} className='space-y-2'>
            <div className='flex items-start justify-between gap-3'>
              <div className='flex items-start gap-3'>
                <span
                  className={`mt-2 h-2.5 w-2.5 rounded-full ${
                    index === 0
                      ? 'bg-red-500'
                      : index === 1
                      ? 'bg-blue-500'
                      : 'bg-green-500'
                  }`}
                />
                <div>
                  <h3 className='font-bold leading-tight'>{item.title}</h3>
                  <p className='text-sm text-zinc-600 dark:text-zinc-300'>
                    {item.description}
                  </p>
                </div>
              </div>

              <Link href={item.link} target='_blank' rel='noopener noreferrer'>
                <Globe
                  size={18}
                  className='text-zinc-500 dark:text-zinc-400 shrink-0'
                />
              </Link>
            </div>

            <div className='flex flex-wrap gap-2 pl-5'>
              {item.stack.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className='rounded-md bg-zinc-100 px-2 py-1 text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200'
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Projects
