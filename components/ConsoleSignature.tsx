'use client'

import { useEffect } from 'react'
import { profile } from '@/constants'

// "henmyr" in the figlet Standard font, one letter per column so it can't drift
const LETTERS = [
  [' _     ', '| |__  ', "| '_ \\ ", '| | | |', '|_| |_|', '       '],
  ['      ', '  ___ ', ' / _ \\', '|  __/', ' \\___|', '      '],
  ['       ', ' _ __  ', "| '_ \\ ", '| | | |', '|_| |_|', '       '],
  ['           ', ' _ __ ___  ', "| '_ ` _ \\ ", '| | | | | |', '|_| |_| |_|', '           '],
  ['       ', ' _   _ ', '| | | |', '| |_| |', ' \\__, |', ' |___/ '],
  ['      ', ' _ __ ', "| '__|", '| |   ', '|_|   ', '      '],
]

const BANNER = LETTERS[0].map((_, row) => LETTERS.map((letter) => letter[row]).join('')).join('\n')

const muted = 'color:#8b8b94;font-family:ui-monospace,monospace;font-size:12px'
const strong = 'color:inherit;font-family:ui-monospace,monospace;font-size:12px;font-weight:700'

const print = () => {
  console.log(`%c${BANNER}`, 'color:#8b8b94;font-family:ui-monospace,monospace;font-size:11px;line-height:1.2')
  console.log(`%c${profile.name}%c  ·  ${profile.role}  ·  ${profile.city}`, strong, muted)
  console.log('%cOh hey, a fellow developer. Thanks for peeking under the hood.', muted)
  console.log(
    '%cBuilt with%c Next.js · React · TypeScript · Tailwind CSS%c, deployed on Vercel.',
    muted,
    strong,
    muted,
  )
  console.log(
    `%cGitHub    %c${profile.github}\n%cLinkedIn  %c${profile.linkedin}\n%cEmail     %c${profile.email}`,
    muted, strong, muted, strong, muted, strong,
  )
  console.log('%cOpen to internships, part-time remote, and freelance work. Say hi!', muted)
}

const WAIT_FOR_PUTER_MS = 5000

// Greets developers who open DevTools: a banner, the stack, and where to reach me.
// The Puter chat script prints its own banner when it loads, so this waits for
// Puter first and prints after it; otherwise Puter's banner would bury this one.
// Logs once per page load, even though React runs effects twice in development.
const ConsoleSignature = () => {
  useEffect(() => {
    const flag = '__henmyrSignature'
    const win = window as typeof window & { [flag]?: boolean }
    if (win[flag]) return
    win[flag] = true

    const startedAt = Date.now()
    const timer = setInterval(() => {
      if (window.puter || Date.now() - startedAt > WAIT_FOR_PUTER_MS) {
        clearInterval(timer)
        setTimeout(print, 300)
      }
    }, 100)
  }, [])

  return null
}

export default ConsoleSignature
