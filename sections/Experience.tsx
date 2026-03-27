import { Binary, BrainCog, Briefcase, CodeXml, GraduationCap } from 'lucide-react'
import React from 'react'

const Experience = () => {
  return (
    <div className='card '>
            <div className='flex flex-nowrap items-center gap-2 '>
                <span><Briefcase color='#71717a' size='20'/></span>
                <h2 className='font-bold'>Experience</h2>
            </div>

            <div className='flex gap-4'>

                {/* Timeline */}
                <div className='relative flex flex-col gap-5 '>
                   

                    <div className='bg-zinc-100 dark:bg-zinc-800 rounded-full p-2 z-1 relative border border-zinc-200 dark:border-zinc-400'>
                          <Binary className="text-zinc-500 dark:text-zinc-400" size={15} /> 
                    </div>
                    <div className='bg-zinc-100 dark:bg-zinc-800 rounded-full p-2 z-1 relative border border-zinc-200 dark:border-zinc-400'>
                          <BrainCog className="text-zinc-500 dark:text-zinc-400"  size={15} />
                    </div>
                    <div className='bg-zinc-100 dark:bg-zinc-800 rounded-full p-2 z-1 relative border border-zinc-200 dark:border-zinc-400'>
                          <GraduationCap className="text-zinc-500 dark:text-zinc-400" size={15} />
                    </div>
                    <div className='bg-zinc-100 dark:bg-zinc-800 rounded-full p-2 z-1 relative border border-zinc-200 dark:border-zinc-400'>
                          <CodeXml className="text-zinc-500 dark:text-zinc-400" size={15} />
                    </div>
                    
                    {/* Vertical Line */}
                    <div className=' h-full w-0.5 bg-zinc-300 absolute left-[50%] top-0 z-0 dark:bg-zinc-400' ></div>

                </div>


                {/* Experience */}
                <div className='flex flex-col justify-between w-full'>

                    <div>
                          <div className='flex justify-between '>
                            <h4 className='text-sm font-bold course-text'>BS Computer Science</h4>
                            <span className='badge text-[10px]'>2024 - Present</span>
                            
                          </div>
                          <p className='text-xs text-zinc-600 dark:text-zinc-400'>Negros Oriental State University</p>
                    </div>
                    <div>
                          <div className='flex justify-between relative'>
                            <h4 className='text-sm font-bold'>Freelance Web Designer</h4>
                            <span className='badge text-[10px] absolute right-0'>2024</span>
                            
                          </div>
                    </div>
                    <div>
                        <div className='flex justify-between relative'>
                            <h4 className='text-sm font-bold course-text'>Computer System Servicing</h4>
                            <span className='badge text-[10px] absolute right-0 '>2024</span>
                            
                        </div>
                          <p className='text-xs text-zinc-600 dark:text-zinc-400'>Demetrio L. Alviola National High School</p>
                    </div>
                     <div>
                       <div>
                          <div className='flex justify-between relative'>
                            <h4 className='text-sm font-bold'>First Hello World</h4>
                            <span className='badge text-[10px] absolute right-0'>2021</span>
                            </div>
                          <p className='text-xs text-zinc-600 dark:text-zinc-400'>sdasdasdasdas  </p>
                          </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Experience
