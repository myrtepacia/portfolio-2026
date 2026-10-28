import Link from 'next/link'
import { ArrowDown, ArrowUpRight, Calendar, Clock, GraduationCap, Mail, MapPin } from 'lucide-react'
import { backend, devTools, education, frontend, profile } from '@/constants'
import { MonoLabel } from './SectionTitle'
import LocalTime from './LocalTime'

// The landing page shows a short slice; the full grouped list lives on /stack
const STACK_PREVIEW = 12
const allTools = [...frontend, ...backend, ...devTools]

const Hero = () => {
  return (
    <section id='about' aria-labelledby='hero-title' data-comment='Hero' className='scroll-mt-20 !mb-10 pt-14 sm:pt-20'>
      <h1 id='hero-title' className='text-[36px] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[56px]'>
        Henmyr Vincent Tepacia
      </h1>
      <p className='mt-3 text-lg font-medium text-muted sm:text-xl'>{profile.role}</p>

      <p data-comment='Bio' className='mt-6 max-w-[640px] text-[15px] leading-relaxed text-muted'>
        I&apos;m a Computer Science student at Negros Oriental State University, gaining experience in
        software development through school projects and tech events. I&apos;m interested in
        CyberSecurity, Artificial Intelligence, and Data Systems, and I enjoy learning new tools to
        build useful, creative projects.
      </p>

      {/* Wraps only when the email truly runs out of room, not at a fixed breakpoint */}
      <div data-comment='Location, local time & email' className='mt-5 flex flex-wrap items-start gap-x-6 gap-y-2 text-[13px] text-subtle'>
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

      <div data-comment='Call to action' className='mt-8 flex flex-wrap items-center gap-3'>
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

      <div aria-label='Education' data-comment='Education' className='mt-12 border-t border-line pt-6'>
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
                <span className='grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-wash font-mono text-[10px] font-semibold text-muted'>
                  {item.initials}
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

      <div id='stack' data-comment='Tech stack' className='mt-10 scroll-mt-20 border-t border-line pt-6'>
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

      <div aria-hidden data-comment='Dotted divider' className='dot-divider mt-10' />
    </section>
  )
}

export default Hero
