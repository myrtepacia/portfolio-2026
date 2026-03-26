import Link from 'next/link'
import { Facebook, Github, Instagram } from 'lucide-react'

const socialLinks = [
  {
    href: 'https://web.facebook.com/myrtepacia/',
    label: 'Facebook',
    icon: Facebook,
  },
  {
    href: 'https://github.com/myrtepacia/',
    label: 'GitHub',
    icon: Github,
  },
  {
    href: 'https://www.instagram.com/myrtepacia/',
    label: 'Instagram',
    icon: Instagram,
  },
]

const SocialLinks = () => {
  return (
    <div className='grid grid-cols-1 gap-2'>
      {socialLinks.map((item) => {
        const Icon = item.icon

        return (
          <Link
            key={item.label}
            href={item.href}
            target='_blank'
            rel='noopener noreferrer'
            className='rounded-xl border border-slate-300 bg-white px-5 py-6 flex items-center gap-4 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800 shadow-none'
          >
            <Icon
              size={20}
              strokeWidth={2}
              className='shrink-0 text-zinc-500 dark:text-zinc-400'
            />
            <span className='text-sm font-medium text-black dark:text-white'>
              {item.label}
            </span>
          </Link>
        )
      })}
    </div>
  )
}

export default SocialLinks
