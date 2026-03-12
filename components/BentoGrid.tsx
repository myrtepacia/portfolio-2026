import React from 'react'
import About from '@/sections/About'
import Experience from '@/sections/Experience'
import Techstack from '@/sections/Techstack'
import Projects from '@/sections/Projects'
import Certificate from '@/sections/Certificate'
import Hireme from '@/sections/Hireme'
import Philosophy from '@/sections/Philosophy'
const BentoGrid = () => {
  return (
    <section className='grid grid-cols-1 sm:grid-cols-12 gap-3    padding-x max-container max-w-5xl pb-10 '>
        <div className=' sm:col-span-7 space-y-3'>
            <About/>

            {/* Hide in desktop */}
            <div className='sm:hidden'>
                <Experience/>
            </div>

            <Techstack/>

            <div className='sm:hidden '>
                <Projects/>
            </div>
            
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                <Certificate/>
                <div className='grid grid-cols-1 gap-3'>
                  <Hireme/>
                  <Philosophy/>
                </div>
            </div>

        </div>

        <div className=' sm:col-span-5 space-y-3'>

          {/* hide in mobile & display in large devices */}
          <div className='hidden sm:block'>
            <Experience/>
          </div>

          <div className='hidden sm:block'>
            <Projects/>
          </div>
        </div>  

       

    </section>
  )
}

export default BentoGrid