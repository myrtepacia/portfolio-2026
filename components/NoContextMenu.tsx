'use client'

import { useEffect } from 'react'

// Blocks the right-click menu across the site. Text boxes (like the chat input)
// keep it, so visitors can still paste. This only deters casual copying: anyone
// can still use the browser's developer tools or save the page.
const NoContextMenu = () => {
  useEffect(() => {
    const block = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (target?.closest('input, textarea, [contenteditable="true"]')) return
      e.preventDefault()
    }
    document.addEventListener('contextmenu', block)
    return () => document.removeEventListener('contextmenu', block)
  }, [])

  return null
}

export default NoContextMenu
