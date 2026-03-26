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
    <div className='flex flex-col gap-2'>
      {socialLinks.map((item) => {
        const Icon = item.icon

        return (
          <Link
            key={item.label}
            href={item.href}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-4 rounded-xl bg-zinc-100 px-5 py-5 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700'
          >
            <Icon
              size={26}
              strokeWidth={2.4}
              className='shrink-0 text-zinc-600 dark:text-zinc-300'
            />
            <span className='text-sm font-medium text-zinc-900 dark:text-white'>
              {item.label}
            </span>
          </Link>
        )
      })}
    </div>
  )
}

export default SocialLinks
