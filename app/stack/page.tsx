import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { backend, devTools, frontend, techSupport } from '@/constants'

export const metadata: Metadata = {
  title: 'Stack · Henmyr Vincent Tepacia',
  description: 'Languages, frameworks, and tools Henmyr Vincent Tepacia works with.',
}

const groups = [
  { label: 'Frontend', items: frontend },
  { label: 'Backend', items: backend },
  { label: 'Developer Tools', items: devTools },
  { label: 'IT & Technical Support', items: techSupport },
]

const StackPage = () => {
  return (
    <main className='mx-auto max-w-[880px] px-5 py-14 sm:px-8 sm:py-20'>
      <Link
        href='/'
        className='inline-flex items-center gap-2 font-mono text-xs text-subtle transition-colors hover:text-fg'
      >
        <ArrowLeft size={14} />
        Back home
      </Link>

      <h1 className='mt-8 text-[32px] font-bold tracking-[-0.03em] sm:text-[40px]'>Stack</h1>
      <p className='mt-2 text-[15px] text-muted'>The languages, frameworks, and tools I work with.</p>

      <div className='mt-10 space-y-8'>
        {groups.map((group) => (
          <section key={group.label} className='border-t border-line pt-6'>
            <div className='flex items-center justify-between'>
              <h2 className='font-mono text-[11px] uppercase tracking-[0.12em] text-subtle'>{group.label}</h2>
              <span className='font-mono text-[11px] text-subtle'>{String(group.items.length).padStart(2, '0')}</span>
            </div>
            <ul className='mt-4 flex flex-wrap gap-2'>
              {group.items.map((item) => (
                <li key={item} className='rounded-md border border-line px-3 py-1.5 font-mono text-xs text-muted'>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  )
}

export default StackPage
