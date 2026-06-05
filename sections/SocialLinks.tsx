import Link from 'next/link'
import { Facebook, Instagram, Github, Link2 } from 'lucide-react'
import { FaDiscord } from 'react-icons/fa'

const socialLinks = [
  {
    href: 'https://web.facebook.com/myrtepacia/',
    label: 'Facebook',
    icon: Facebook,
  },
  {
    href: 'https://www.instagram.com/myrtepacia/',
    label: 'Instagram',
    icon: Instagram,
  },
   {
    href: 'https://github.com/myrtepacia/',
    label: 'GitHub',
    icon: Github,
  },
   {
    href: 'https://discord.com/users/300006432798015489',
    label: 'Discord',
    icon: FaDiscord,
  },
]

const SocialLinks = () => {
  return (
    <div className='card'>
      <div className='flex items-center gap-2'>
        <Link2 size={18} className='text-zinc-500 dark:text-zinc-400' />
        <h2 className='font-bold'>Social Links</h2>
      </div>

      <div className='flex flex-col gap-2.5'>
        {socialLinks.map((item) => {
          const Icon = item.icon

          return (
            <Link
              key={item.label}
              href={item.href}
              target='_blank'
              rel='noopener noreferrer'
              className='group flex items-center gap-3 rounded-xl border border-transparent bg-zinc-100 px-4 py-3 transition-colors hover:border-zinc-300 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:border-zinc-600 dark:hover:bg-zinc-700'
            >
              <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-zinc-700 dark:bg-zinc-900 dark:text-zinc-200'>
                <Icon size={18} />
              </span>
              <span className='text-sm font-medium text-zinc-900 dark:text-white'>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default SocialLinks
