import Link from 'next/link'
import { ArrowUpRight, Github, Linkedin, Mail, MessageSquare } from 'lucide-react'
import { profile } from '@/constants'
import { MonoLabel } from './SectionTitle'

const primary = [
  { label: 'GitHub', handle: profile.githubUsername, href: profile.github, icon: Github },
  { label: 'LinkedIn', handle: 'myrtepacia', href: 'https://www.linkedin.com/in/myrtepacia/', icon: Linkedin },
  { label: 'Email', handle: profile.email, href: `mailto:${profile.email}`, icon: Mail },
]

const ConnectFooter = () => {
  return (
    <footer>
      <div className='flex justify-center'>
        <MonoLabel icon={<MessageSquare size={12} />}>Connect across platforms</MonoLabel>
      </div>

      <ul className='mx-auto mt-4 grid max-w-[480px] gap-3 sm:grid-cols-2'>
        {primary.map(({ label, handle, href, icon: Icon }) => (
          // Email takes its own row, at the same width as one card, centered under GitHub and Facebook
          <li key={label} className={label === 'Email' ? 'sm:col-span-2 sm:mx-auto sm:w-[calc(50%-6px)]' : undefined}>
            <Link
              href={href}
              target={href.startsWith('mailto:') ? undefined : '_blank'}
              rel='noopener noreferrer'
              className='group flex items-center gap-3 rounded-xl border border-line bg-surface p-3 transition-colors hover:bg-wash'
            >
              <span className='grid h-9 w-9 place-items-center rounded-lg border border-line bg-wash'>
                <Icon size={16} />
              </span>
              <span className='flex-1'>
                <span className='block text-[13px] font-semibold'>{label}</span>
                <span className='block font-mono text-[10px] text-subtle'>{handle}</span>
              </span>
              <ArrowUpRight size={14} className='text-subtle transition-colors group-hover:text-fg' />
            </Link>
          </li>
        ))}
      </ul>

      <p className='mt-12 border-t border-line py-6 text-center text-xs text-subtle'>
        © {new Date().getFullYear()} {profile.name}. All rights reserved.
      </p>
    </footer>
  )
}

export default ConnectFooter
