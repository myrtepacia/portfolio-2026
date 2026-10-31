import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'

const GITHUB_USERNAME = 'myrtepacia'
const MOBILE_WEEKS = 26

type Contribution = {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

type ContributionsResponse = {
  total: { lastYear: number }
  contributions: Contribution[]
}

// Heat scale in GitHub's Halloween palette; colors live in globals.css (--heat-0..4)
const levelColors = [
  'bg-[var(--heat-0)]',
  'bg-[var(--heat-1)]',
  'bg-[var(--heat-2)]',
  'bg-[var(--heat-3)]',
  'bg-[var(--heat-4)]',
]

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// How often the graph refreshes, in seconds. Next.js keeps the last fetched
// calendar for this long, then fetches a fresh one in the background on the
// next visit, so new contributions show up within about 30 minutes.
const REFRESH_SECONDS = 1800

// Public proxy over GitHub's contribution calendar
const getContributions = async (): Promise<ContributionsResponse | null> => {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
      { next: { revalidate: REFRESH_SECONDS } }
    )
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

// Group days into Sunday-first week columns, padding the first week so
// each column lines up with the weekday rows.
const toWeeks = (days: Contribution[]) => {
  const weeks: (Contribution | null)[][] = []
  let week: (Contribution | null)[] = Array(new Date(days[0].date).getUTCDay()).fill(null)

  for (const day of days) {
    week.push(day)
    if (week.length === 7) {
      weeks.push(week)
      week = []
    }
  }
  if (week.length) weeks.push(week)

  return weeks
}

const GithubContributions = async () => {
  const data = await getContributions()
  const weeks = data?.contributions.length ? toWeeks(data.contributions) : []
  const isDesktopOnly = (index: number) => index < weeks.length - MOBILE_WEEKS

  // Label a column when its first day starts a new month, skipping labels
  // that would sit too close to the previous one or run off the right edge.
  const monthLabels: string[] = []
  let lastLabelIndex = -Infinity
  weeks.forEach((week, index) => {
    const firstDay = week.find(Boolean)
    const prevDay = index > 0 ? weeks[index - 1].find(Boolean) : null
    const month = firstDay ? new Date(firstDay.date).getUTCMonth() : -1
    const nextDay = weeks[index + 1]?.find(Boolean)
    const prevMonth = prevDay ? new Date(prevDay.date).getUTCMonth() : -1
    const spansTwoWeeks = nextDay ? new Date(nextDay.date).getUTCMonth() === month : false
    const fits = spansTwoWeeks && index - lastLabelIndex >= 3 && index < weeks.length - 2

    if (firstDay && month !== prevMonth && fits) {
      monthLabels.push(MONTHS[month])
      lastLabelIndex = index
    } else {
      monthLabels.push('')
    }
  })

  return (
    <section id='github' aria-label='GitHub contributions' className='scroll-mt-24 space-y-5 rounded-2xl border border-line bg-surface p-5 sm:p-6'>
      <div className='flex flex-nowrap items-center justify-between gap-3'>
        <h2 className='flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted'>
          <FaGithub size={14} />
          GitHub
        </h2>

        <Link
          href={`https://github.com/${GITHUB_USERNAME}`}
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center gap-1 font-mono text-xs text-muted hover:text-fg'
        >
          @{GITHUB_USERNAME}
          <ArrowUpRight size={12} />
        </Link>
      </div>

      {data && weeks.length ? (
        <div className='space-y-3'>
          {/* Phones show the last MOBILE_WEEKS weeks so cells stay readable;
              hidden columns drop out of auto-placement in both rows. */}
          <div
            className='grid gap-[2px] sm:gap-[3px] [grid-template-columns:repeat(var(--mobile-weeks),minmax(0,1fr))] sm:[grid-template-columns:repeat(var(--weeks),minmax(0,1fr))]'
            style={{ '--weeks': weeks.length, '--mobile-weeks': Math.min(MOBILE_WEEKS, weeks.length) } as React.CSSProperties}
          >
            {monthLabels.map((label, index) => (
              <span
                key={`m-${index}`}
                className={`text-[10px] text-subtle whitespace-nowrap overflow-visible h-4 ${isDesktopOnly(index) ? 'hidden sm:block' : ''}`}
              >
                {label}
              </span>
            ))}

            {weeks.map((week, weekIndex) => (
              <div
                key={weekIndex}
                className={`grid grid-rows-7 gap-[2px] sm:gap-[3px] ${isDesktopOnly(weekIndex) ? 'hidden sm:grid' : ''}`}
              >
                {Array.from({ length: 7 }, (_, dayIndex) => {
                  const day = week[dayIndex]
                  return day ? (
                    <span
                      key={dayIndex}
                      title={`${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}`}
                      className={`aspect-square rounded-[2px] ${levelColors[day.level]}`}
                    />
                  ) : (
                    <span key={dayIndex} className='aspect-square' />
                  )
                })}
              </div>
            ))}
          </div>

          <div className='flex flex-wrap items-center justify-between gap-2 text-xs text-muted'>
            <p>
              <strong className='font-medium text-fg'>{data.total.lastYear}</strong> contributions in the last year
            </p>

          </div>
        </div>
      ) : (
        <p className='text-xs text-muted'>
          Contribution activity is unavailable right now. See it on{' '}
          <Link
            href={`https://github.com/${GITHUB_USERNAME}`}
            target='_blank'
            rel='noopener noreferrer'
            className='underline'
          >
            GitHub
          </Link>
          .
        </p>
      )}
    </section>
  )
}

export default GithubContributions
