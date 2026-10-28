'use client'

import { useEffect, useState } from 'react'
import { profile } from '@/constants'

const format = (date: Date) =>
  date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: profile.timeZone,
  })

// Henmyr's current local time. It renders only after mount so the server's
// clock never mismatches the browser's, then ticks every 15 seconds.
const LocalTime = () => {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const update = () => setTime(format(new Date()))
    update()
    const timer = setInterval(update, 15000)
    return () => clearInterval(timer)
  }, [])

  return <time suppressHydrationWarning>{time ?? '--:--'}</time>
}

export default LocalTime
