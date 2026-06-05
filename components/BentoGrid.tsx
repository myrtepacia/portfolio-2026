import About from '@/sections/About'
import Experience from '@/sections/Experience'
import Techstack from '@/sections/Techstack'
import Projects from '@/sections/Projects'
import Certificate from '@/sections/Certificate'
import Hireme from '@/sections/Hireme'
import Philosophy from '@/sections/Philosophy'
import SocialLinks from '@/sections/SocialLinks'
import Gallery from '@/sections/Gallery'

const BentoGrid = () => {
  return (
    <section className='grid grid-cols-1 sm:grid-cols-12 gap-3 padding-x max-container max-w-5xl pb-10'>

      {/* Top-left: About + Techstack */}
      <div className='sm:col-span-7 space-y-3'>
        <About />
        <div className='sm:hidden'><Experience /></div>
        <Techstack />
        <div className='sm:hidden'><Projects /></div>
      </div>

      {/* Top-right: Experience + Projects */}
      <div className='sm:col-span-5 space-y-3'>
        <div className='hidden sm:block'><Experience /></div>
        <div className='hidden sm:block'><Projects /></div>
      </div>

      {/* Bottom row: 4 equal cards side by side — matches screenshot */}
      <div className='sm:col-span-3'>
        <Certificate />
      </div>
      <div className='sm:col-span-3'>
        <Hireme />
      </div>
      <div className='sm:col-span-3'>
        <Philosophy />
      </div>
      <div className='sm:col-span-3'>
        <SocialLinks />
      </div>

      {/* Gallery: full width */}
      <div className='sm:col-span-12'>
        <Gallery />
      </div>

    </section>
  )
}

export default BentoGrid
