import { ChevronRight, Trophy } from 'lucide-react'
import React from 'react'
import { certificates } from '@/constants'
import Link from 'next/link'
const Certificate = () => {
  return (
   <div className='card '>

        <div className='flex flex-nowrap items-center justify-between'>
          <div className='flex flex-nowrap items-center gap-2'>
            <span><Trophy color='#71717a' size={20}/></span>
            <h2 className='font-bold'>Certificates</h2>
          </div>

          <div className='flex flex-nowrap items-center gap-1'>
            <Link href={'/certificates'} className='text-xs text-zinc-700 dark:text-white'>View All</Link>
            <ChevronRight size={12} className='text-zinc-700 dark:text-white'/>

          </div>

        </div>

        <div className='space-y-2'>

     
            
              {certificates.slice(0,5).map( (item, index) => 
             
                      <div key={index} className='bg-gray-100 p-2 rounded-lg  hover:bg-gray-200 transition-colors cursor-pointer dark:bg-zinc-800 dark:hover:bg-zinc-700'>
                          <Link href={item.link}  target='_blank'>
                            <h4 className='text-xs font-bold '>{item.title}</h4>
                            <p className='text-xs text-zinc-600'>{item.provider}</p>
                          </Link>
                      </div>
             
              
              )}
     
       
          
        </div>

        
    </div>
  )
}

export default Certificate