'use client'

import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import CommandMenu from './CommandMenu'

const TopNav = () => {
  const [searchOpen, setSearchOpen] = useState(false)

  // Cmd/Ctrl + K opens the menu
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
      <header className='sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-md'>
        <div className='mx-auto flex h-14 max-w-[1040px] items-center justify-between gap-4 px-5 sm:px-8'>
          <a href='#about' className='text-[15px] font-semibold tracking-tight'>
            Henmyr <span className='font-normal text-subtle'>/ tech</span>
          </a>

          <div className='flex items-center gap-2'>
            <ThemeToggle />

            {/* Burger menu: opens the menu of sections, projects, and links (also Ctrl/⌘ + K) */}
            <button
              type='button'
              aria-label='Open menu'
              aria-haspopup='dialog'
              aria-expanded={searchOpen}
              title='Menu (Ctrl/⌘ + K)'
              onClick={() => setSearchOpen(true)}
              className='grid h-8 w-8 place-items-center rounded-lg border border-line bg-surface text-muted transition-colors hover:bg-wash hover:text-fg'
            >
              <Menu size={16} />
            </button>
          </div>
        </div>
      </header>

      <CommandMenu open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}

export default TopNav
