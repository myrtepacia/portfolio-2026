import { ChevronRight, Trophy } from 'lucide-react'
import React from 'react'
import { certificates } from '@/constants'
import Link from 'next/link'
const Certificate = () => {
  return (
   <div className='card '>

        <div className='flex flex-nowrap items-center justify-between'>
          <div className='flex flex-nowrap items-center gap-2'>
            <span><Trophy color='#71717a' size={16}/></span>
            <h2 className='font-bold'>Certificates</h2>
          </div>

          <div className='flex flex-nowrap items-center gap-1'>
            <Link href={'/certificates'} className='text-xs text-zinc-700 dark:text-white'>View All</Link>
            <ChevronRight size={12} className='text-zinc-700 dark:text-white'/>

          </div>

        </div>

        <div className='space-y-2'>

     
            
{certificates.slice(0, 5).map((item, index) => (
  <div key={index}>
    <img src={item.image} alt={item.title} />
    <h4>{item.title}</h4>
    <p>{item.provider}</p>
  </div>
))}
     
       
          
        </div>

        
    </div>
  )
}

export default Certificate
