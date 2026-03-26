import React from 'react'
import Link from 'next/link'
import { Facebook, Github, Instagram } from 'lucide-react'

const links = [
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
    <div className='card !p-0 !space-y-0'>
      {links.map((item, index) => {
        const Icon = item.icon

        return (
          <Link
            key={item.label}
            href={item.href}
            target='_blank'
            className={`flex items-center gap-3 px-4 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors ${
              index !== links.length - 1 ? 'border-b border-slate-200 dark:border-zinc-700' : ''
            }`}
          >
            <Icon size={20} className='text-zinc-500 dark:text-zinc-400' />
            <span className='text-sm font-medium'>{item.label}</span>
          </Link>
        )
      })}
    </div>
  )
}

export default SocialLinks
