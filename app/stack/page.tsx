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
    <main className='max-w-5xl padding-x py-10'>
      {/* Same header as All Projects: back link on the left, page title on the right */}
      <div className='flex flex-nowrap items-center justify-between gap-5'>
        <Link href='/' className='text-sm flex flex-nowrap items-center gap-2'>
          <ArrowLeft size={20} />
          Back to home
        </Link>

        <h1 className='text-2xl font-bold'>Stack</h1>
      </div>
      <p className='mt-5 text-[15px] text-muted'>The languages, frameworks, and tools I work with.</p>

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
