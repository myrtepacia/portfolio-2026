'use client'

import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import CommandMenu from './CommandMenu'

const TopNav = () => {
  const [searchOpen, setSearchOpen] = useState(false)

  // Cmd/Ctrl + K opens the search palette
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen((open) => !open)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <header data-comment='Navigation' className='sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-md'>
        <div className='mx-auto flex h-14 max-w-[1040px] items-center justify-between gap-4 px-5 sm:px-8'>
          <a href='#about' className='text-[15px] font-semibold tracking-tight'>
            Henmyr <span className='font-normal text-subtle'>/ dev</span>
          </a>

          <div className='flex items-center gap-2'>
            <button
              type='button'
              onClick={() => setSearchOpen(true)}
              className='hidden h-8 items-center gap-2 rounded-lg border border-line bg-surface pl-2.5 pr-1.5 text-xs text-subtle transition-colors hover:text-fg sm:flex'
            >
              <Search size={13} />
              <span className='mr-3'>Search...</span>
              <kbd className='rounded border border-line bg-wash px-1.5 py-px font-mono text-[10px]'>⌘K</kbd>
            </button>

            <button
              type='button'
              aria-label='Search'
              onClick={() => setSearchOpen(true)}
              className='grid h-8 w-8 place-items-center rounded-lg border border-line bg-surface text-muted sm:hidden'
            >
              <Search size={15} />
            </button>

            <ThemeToggle />
          </div>
        </div>
      </header>

      <CommandMenu open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}

export default TopNav
