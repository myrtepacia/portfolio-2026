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
      {/* Top area: About + Techstack on the left, Experience + Projects on the right */}
      <div className='sm:col-span-7 space-y-3'>
        <About />

        <div className='sm:hidden'>
          <Experience />
        </div>

        <Techstack />

        <div className='sm:hidden'>
          <Projects />
        </div>
      </div>

      <div className='sm:col-span-5 space-y-3'>
        <div className='hidden sm:block'>
          <Experience />
        </div>

        <div className='hidden sm:block'>
          <Projects />
        </div>
      </div>

      {/* Bottom row: spans all 12 cols so Certificate, Hireme+Philosophy, and SocialLinks share height */}
      <div className='sm:col-span-12 grid grid-cols-1 sm:grid-cols-12 gap-3 items-stretch'>
        {/* Certificate: takes 4/12 cols */}
        <div className='sm:col-span-4 flex flex-col'>
          <Certificate />
        </div>

        {/* Hireme + Philosophy stacked: takes 4/12 cols */}
        <div className='sm:col-span-4 flex flex-col gap-3'>
          <Hireme />
          <Philosophy />
        </div>

        {/* SocialLinks: takes 4/12 cols, stretches to match Certificate height */}
        <div className='sm:col-span-4 flex flex-col'>
          <SocialLinks />
        </div>
      </div>
    </section>
  )
}

export default BentoGrid
