'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// React never writes JSX comments into the page, so the HTML has no section
// markers. Any element with a `data-comment="Label"` attribute gets a
// `<!-- ── Label ── -->` comment placed right before it, so the Elements panel
// reads like a hand-annotated document. Runs again after each client-side
// navigation, and never adds the same marker twice.
const MARK = ' ── '

const labelFor = (el: Element) => `${MARK}${el.getAttribute('data-comment')}${MARK}`

const annotate = () => {
  document.querySelectorAll('[data-comment]').forEach((el) => {
    const label = labelFor(el)
    let prev = el.previousSibling
    // Skip whitespace text nodes so a marker that is already there is found
    while (prev && prev.nodeType === Node.TEXT_NODE && !prev.textContent?.trim()) {
      prev = prev.previousSibling
    }
    if (prev?.nodeType === Node.COMMENT_NODE && prev.nodeValue === label) return
    el.parentNode?.insertBefore(document.createComment(label), el)
  })
}

const HtmlComments = () => {
  const pathname = usePathname()

  useEffect(() => {
    // A timer rather than requestAnimationFrame: frames pause in background
    // tabs, and the markers should be there whenever DevTools opens
    annotate()
    const timer = setTimeout(annotate, 500)
    return () => clearTimeout(timer)
  }, [pathname])

  return null
}

export default HtmlComments
