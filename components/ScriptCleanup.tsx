'use client'

import { useEffect } from 'react'

// Next.js streams the page's React data as many small inline
// `self.__next_f.push(...)` scripts. Each one runs once, hands its data to
// React, and is then just a leftover tag that clutters the Elements panel.
// Once the page has fully loaded, remove only those spent tags. The real
// JavaScript files (scripts with a src) are never touched.
const isSpentNextDataScript = (script: HTMLScriptElement) =>
  !script.src && script.textContent?.includes('self.__next_f') === true

const ScriptCleanup = () => {
  useEffect(() => {
    const clean = () => {
      document.querySelectorAll('script').forEach((script) => {
        if (isSpentNextDataScript(script)) script.remove()
      })
    }

    if (document.readyState === 'complete') {
      clean()
      return
    }

    window.addEventListener('load', clean, { once: true })
    return () => window.removeEventListener('load', clean)
  }, [])

  return null
}

export default ScriptCleanup
