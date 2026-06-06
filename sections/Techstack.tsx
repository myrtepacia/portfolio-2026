import { Code, CodeXml, Layers,GitPullRequest, Terminal, Cpu } from 'lucide-react'
import React from 'react'
import { frontend, backend, devTools, techSupport } from '@/constants'
const Techstack = () => {
  return (
    <div className='card h-full w-full'>

        <div className='flex flex-nowrap items-center gap-2 '>
          <span><Layers color='#71717a' size={20}/></span>
          <h2 className='font-bold'>Tech Stack</h2>
        </div>

       <div className='space-y-5'>
            <div className=' space-y-3   '>
                <div className='flex items-center flex-nowrap gap-2 text-xs font-semibold text-gray-500'>
                    <span><Code color='#252ff7' size={15}/></span>
                    <p>Frontend</p>
                </div>

                <div className='flex gap-2 flex-wrap'>

                    {frontend.map( (item, index) => 
                        <span key={index} className='badge '>{item}</span>
                    
                    )}
                </div>
            </div>

             <div className='space-y-3'>
                <div className='flex items-center flex-nowrap gap-2 text-xs font-semibold text-gray-500'>
                    <span><CodeXml color='#23e21d' size={15}/></span>
                    <p>Backend</p>
                </div>

                <div className='flex gap-2 flex-wrap'>
                      {backend.map( (item, index) => 
                        <span key={index} className='badge  '>{item}</span>
                    
                    )}
                </div>
            </div>


            <div className='space-y-3'>
                <div className='flex items-center flex-nowrap gap-2 text-xs font-semibold text-gray-500'>
                    <span><GitPullRequest color='#f76711' size={15} /></span>
                    <p>Developer Tools</p>
                </div>

                 <div className='flex gap-2 flex-wrap'>
                      {devTools.map( (item, index) => 
                        <span key={index} className='badge '>{item}</span>
                    
                    )}
                </div>
            </div>

             <div className='space-y-3'>
                <div className='flex items-center flex-nowrap gap-2 text-xs font-semibold text-gray-500'>
                    <span><Cpu color='#00d1ea' size={15}/></span>
                    <p>IT & Technical Support</p>
                </div>

                 <div className='flex gap-2 flex-wrap'>
                      {techSupport.map( (item, index) => 
                        <span key={index} className='badge '>{item}</span>
                    
                    )}
                </div>
            </div>
       </div>
    </div>
  )
}

export default Techstack