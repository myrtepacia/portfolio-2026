import About from '@/sections/About'
import Experience from '@/sections/Experience'
import Techstack from '@/sections/Techstack'
import Projects from '@/sections/Projects'
import Certificate from '@/sections/Certificate'
import Hireme from '@/sections/Hireme'
import Philosophy from '@/sections/Philosophy'
import SocialLinks from '@/sections/SocialLinks'

const BentoGrid = () => {
  return (
    <section className='grid grid-cols-1 sm:grid-cols-12 gap-3 padding-x max-container max-w-5xl pb-10'>
      <div className='sm:col-span-7 space-y-3'>
        <About />

        <div className='sm:hidden'>
          <Experience />
        </div>

        <Techstack />

        <div className='sm:hidden'>
          <Projects />
        </div>

        {/* Bottom row: Certificate + (Hireme & Philosophy) — locked to same height */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 items-stretch'>
          <Certificate />

          <div className='grid grid-cols-1 gap-3 items-stretch'>
            <Hireme />
            <Philosophy />
          </div>
        </div>
      </div>

      <div className='sm:col-span-5 space-y-3'>
        <div className='hidden sm:block'>
          <Experience />
        </div>

        <div className='hidden sm:block'>
          <Projects />
        </div>

        <SocialLinks />
      </div>
    </section>
  )
}

export default BentoGrid
