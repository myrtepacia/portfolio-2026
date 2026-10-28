'use client'

import { useSyncExternalStore } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

const noopSubscribe = () => () => {}

const ThemeToggle = ({ className = '' }: { className?: string }) => {
  const { resolvedTheme, setTheme } = useTheme()

  // False on the server and during hydration, true after; avoids an icon mismatch
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false)

  const isDark = mounted && resolvedTheme === 'dark'

  return (
    <button
      type='button'
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`grid h-8 w-8 place-items-center rounded-lg border border-line bg-surface text-muted transition-colors hover:bg-wash hover:text-fg ${className}`}
    >
      {mounted && (isDark ? <Sun size={15} /> : <Moon size={15} />)}
    </button>
  )
}

export default ThemeToggle
