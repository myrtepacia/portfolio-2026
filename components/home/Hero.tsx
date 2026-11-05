import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowUpRight, Calendar, Clock, GraduationCap, Mail, MapPin, School, University } from 'lucide-react'
import { backend, devTools, education, frontend, profile } from '@/constants'
import portrait from '@/public/images/face-halftone.png'
import { MonoLabel } from './SectionTitle'
import LocalTime from './LocalTime'

// The landing page shows a short slice; the full grouped list lives on /stack
const STACK_PREVIEW = 12
const allTools = [...frontend, ...backend, ...devTools]

const Hero = () => {
  return (
    <section id='about' aria-labelledby='hero-title' className='scroll-mt-20 !mb-10 pt-8 sm:pt-30'>
      {/* Portrait above the name on phones only; hidden from 640px up */}
      <div className='flex flex-col-reverse gap-6'>
        <div className='min-w-0'>
          {/* Phones: sized so the name runs from the left edge to the photo's right
              edge, on one line. The name is 11.02× its font size wide and starts at
              the 20px page padding; the centered photo ends at (screen + photo) / 2.
              Below 591px the photo is 67.7vw wide, from 591px it stays 400px. */}
          <h1
            id='hero-title'
            className='text-[length:calc(7.609vw_-_1.815px)] font-bold leading-[1.05] tracking-[-0.035em] min-[591px]:text-[length:calc(4.537vw_+_16.33px)] sm:text-[56px]'
          >
            Henmyr Vincent Tepacia
          </h1>

          <p className='mt-6 max-w-[640px] text-[15px] leading-relaxed text-muted'>
            I&apos;m a Computer Science student at Negros Oriental State University, gaining experience in
            software development through school projects and tech events. I&apos;m interested in
            CyberSecurity, Artificial Intelligence, and Data Systems, and I enjoy learning new tools to
            build useful, creative projects.
          </p>
        </div>

        {/* Halftone portrait with the background cut out; the bottom fades so the
            shirt blends into the page instead of ending in a hard edge */}
        <Image
          src={portrait}
          alt={`Portrait of ${profile.name}`}
          // Serve the original 512px file: resized copies blur the halftone dots
          unoptimized
         
          // Centered square sized like the 591px reference design: 400px there, the
          // same share of the screen (67.7%) on smaller phones; hidden from 640px
          className='mx-auto aspect-square h-auto w-[min(400px,67.7vw)] select-none [mask-image:linear-gradient(to_bottom,black_72%,transparent)] sm:hidden'
        />
      </div>

      {/* Wraps only when the email truly runs out of room, not at a fixed breakpoint */}
      <div className='reveal mt-5 flex flex-wrap items-start gap-x-6 gap-y-2 text-[13px] text-subtle'>
        {/* Local time sits directly under the location */}
        <div className='flex flex-col gap-2'>
          <a
            href={profile.mapUrl}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={`${profile.location} on Google Maps (opens in a new tab)`}
            className='flex items-center gap-1.5 hover:text-fg'
          >
            <MapPin size={14} />
            {profile.location}
          </a>
          <span className='flex items-center gap-1.5'>
            <Clock size={14} />
            <span><LocalTime /> local time</span>
          </span>
        </div>
        <Link href={`mailto:${profile.email}`} className='flex items-center gap-1.5 hover:text-fg'>
          <Mail size={14} />
          {profile.email}
        </Link>
      </div>

      <div className='reveal mt-8 flex flex-wrap items-center gap-3'>
        <a
          href='#projects'
          className='inline-flex h-10 items-center gap-2 rounded-lg bg-fg px-4 text-sm font-medium text-bg transition-opacity hover:opacity-85'
        >
          Explore Projects
          <ArrowDown size={15} />
        </a>
        <Link
          href={profile.calendly}
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex h-10 items-center gap-2 rounded-lg border border-line bg-surface px-4 text-sm font-medium transition-colors hover:bg-wash'
        >
          <Calendar size={15} className='text-muted' />
          Schedule a Call
        </Link>
      </div>

      <div aria-label='Education' className='reveal mt-12 border-t border-line pt-6'>
        <MonoLabel icon={<GraduationCap size={13} />}>Education</MonoLabel>
        <ul className='mt-3 grid gap-3 sm:grid-cols-2'>
          {education.map((item) => (
            <li key={item.school}>
              <a
                href={item.link}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={`${item.school} on Facebook (opens in a new tab)`}
                className='group flex items-center gap-3 rounded-xl border border-line bg-surface p-3 transition-colors hover:bg-wash'
              >
                {/* Generic building icon: a university for college, a school otherwise */}
                <span className='grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-wash text-muted'>
                  {item.level === 'College Degree' ? (
                    <University size={16} strokeWidth={1.8} aria-hidden />
                  ) : (
                    <School size={16} strokeWidth={1.8} aria-hidden />
                  )}
                </span>
                <div className='min-w-0 flex-1'>
                  <p className='truncate text-[13px] font-semibold'>{item.school}</p>
                  <p className='truncate text-[11px] text-muted'>{item.detail}</p>
                </div>
                <ArrowUpRight size={14} className='shrink-0 text-subtle transition-colors group-hover:text-fg' />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div id='stack' className='reveal mt-10 scroll-mt-20 border-t border-line pt-6'>
        <div className='flex items-center justify-between'>
          <h2 className='font-mono text-[11px] uppercase tracking-[0.12em] text-subtle'>Stack</h2>
          <Link
            href='/stack'
            className='inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.12em] text-subtle transition-colors hover:text-fg'
          >
            View all
            <ArrowUpRight size={12} />
          </Link>
        </div>

        <ul className='mt-4 flex flex-wrap gap-2'>
          {allTools.slice(0, STACK_PREVIEW).map((tool) => (
            <li key={tool} className='rounded-md border border-line px-3 py-1.5 font-mono text-xs text-muted'>
              {tool}
            </li>
          ))}
          {allTools.length > STACK_PREVIEW && (
            <li>
              <Link
                href='/stack'
                className='block rounded-md border border-dashed border-line px-3 py-1.5 font-mono text-xs text-subtle transition-colors hover:border-subtle hover:text-fg'
              >
                + more
              </Link>
            </li>
          )}
        </ul>
      </div>

      <div aria-hidden className='dot-divider mt-10' />
    </section>
  )
}

export default Hero
