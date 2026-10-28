'use client'

import { MessageCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const HINT_DELAY_MS = 1000
const HINT_VISIBLE_MS = 3000

// Round chat launcher. Shortly after the page loads, an "Any questions?" bubble
// pops out to its left for 3 seconds, then fades away. It also shows whenever
// the pointer is over the button (or the button has keyboard focus).
const BubbleButton = ({ onClick, isOpen = false }: { onClick: () => void; isOpen?: boolean }) => {
  const [showHint, setShowHint] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const show = setTimeout(() => setShowHint(true), HINT_DELAY_MS)
    const hide = setTimeout(() => setShowHint(false), HINT_DELAY_MS + HINT_VISIBLE_MS)
    return () => {
      clearTimeout(show)
      clearTimeout(hide)
    }
  }, [])

  const hintVisible = (showHint || hovered) && !isOpen

  return (
    <div
      className='relative flex items-center'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-fg px-3 py-2 text-[13px] font-semibold text-bg shadow-lg transition-all duration-300 ${
          hintVisible ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'
        }`}
      >
        Any questions?
        {/* Small arrow pointing at the button */}
        <span className='absolute -right-1 top-1/2 size-2.5 -translate-y-1/2 rotate-45 rounded-[2px] bg-fg' />
      </span>

      <button
        type='button'
        onClick={onClick}
        aria-label={isOpen ? 'Close chat' : 'Chat with the AI assistant'}
        aria-expanded={isOpen}
        className='grid size-14 cursor-pointer place-items-center rounded-full border border-line bg-surface text-fg shadow-lg transition-transform hover:scale-105 active:scale-95'
      >
        <MessageCircle size={22} strokeWidth={1.8} />
      </button>
    </div>
  )
}

export default BubbleButton
