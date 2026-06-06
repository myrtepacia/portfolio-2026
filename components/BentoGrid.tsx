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

      {/* Top-left: About + Techstack.
          Flex column so Techstack can grow (flex-1) and fill the gap left by
          the taller right column (Experience + Projects). */}
      <div className='sm:col-span-7 flex flex-col gap-3'>
        <About />
        <div className='sm:hidden'><Experience /></div>
        <div className='sm:flex-1 flex'>
          <Techstack />
        </div>
        <div className='sm:hidden'><Projects /></div>
      </div>

      {/* Top-right: Experience + Projects */}
      <div className='sm:col-span-5 space-y-3'>
        <div className='hidden sm:block'><Experience /></div>
        <div className='hidden sm:block'><Projects /></div>
      </div>

      {/* Bottom section:
          Left  : Certificates (col-span-4 — slightly wider for more breathing room)
          Right : 3 cards + Gallery (col-span-8) */}

      {/* Left column: Certificates */}
      <div className='sm:col-span-4'>
        <Certificate />
      </div>

      {/* Right column: three cards, then the gallery below them */}
      <div className='sm:col-span-8 flex flex-col gap-3'>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
          <Hireme />
          <Philosophy />
          <SocialLinks />
        </div>
        <Gallery />
      </div>

    </section>
  )
}

export default BentoGrid
