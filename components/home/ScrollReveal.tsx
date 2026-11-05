'use client'

import { useEffect } from 'react'

// Fades in every .reveal element on the home page as it scrolls up into view (see
// .reveal in globals.css). Elements stay shown while scrolling back up and reset once
// they are fully below the screen, so the fade plays again on the next scroll down.
const ScrollReveal = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')

    // Show once 60px past the bottom edge. Anything already above the screen shows
    // too, so a page opened at #contact doesn't leave blank sections to scroll back to.
    // 60px is less than the page's bottom padding, so the last element always triggers
    const show = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            entry.target.classList.add('is-visible')
          }
        }
      },
      { rootMargin: '0px 0px -60px 0px' }
    )

    // Separate from show, without the 60px, so nothing fades out while still on screen
    const reset = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
          entry.target.classList.remove('is-visible')
        }
      }
    })

    elements.forEach((element) => {
      show.observe(element)
      reset.observe(element)
    })

    return () => {
      show.disconnect()
      reset.disconnect()
    }
  }, [])

  return null
}

export default ScrollReveal
