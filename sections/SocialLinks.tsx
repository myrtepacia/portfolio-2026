import React from 'react'
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
    <div className='grid grid-cols-1 gap-3'>
      {socialLinks.map((item) => {
        const Icon = item.icon

        return (
          <Link
            key={item.label}
            href={item.href}
            target='_blank'
            className='card flex items-center gap-3 !p-4 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors'
          >
            <Icon
              size={22}
              strokeWidth={1.8}
              className='shrink-0 text-zinc-500 dark:text-zinc-400'
            />
            <span className='text-sm font-medium'>{item.label}</span>
          </Link>
        )
      })}
    </div>
  )
}

export default SocialLinks
