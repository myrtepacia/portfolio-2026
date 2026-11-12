'use client'

import { useEffect } from 'react'

const MESSAGE = `WARNING: This console is a restricted developer environment.

Unauthorized access, system tampering, reverse engineering, or data interference is strictly prohibited. Any malicious activity targeting this application may be subject to criminal prosecution under the Philippine Cybercrime Prevention Act of 2012 (Republic Act No. 10175).

If you were told to copy and paste something here, it is likely a scam that will give attackers access to your account. Close this window immediately.`

// Printed once per page load, even though React runs effects twice in development
let shown = false

// Shows the warning above in the browser console when the site loads
const ConsoleWarning = () => {
  useEffect(() => {
    if (shown) return
    shown = true
    console.warn(MESSAGE)
  }, [])

  return null
}

export default ConsoleWarning
