import NextLink from 'next/link'
import {
  Facebook,
  Github,
  Instagram,
  Link as LinkIcon,
} from 'lucide-react'

const socialLinks = [
  {
    href: 'https://discord.com/users/300006432798015489',
    label: 'Discord',
    icon: Discord,
  },
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
]

const SocialLinks = () => {
  return (
    <div className='card'>
      <div className='flex items-center gap-2'>
        <LinkIcon
          size={18}
          strokeWidth={2.3}
          className='text-zinc-500 dark:text-zinc-400'
        />
        <h2 className='font-bold'>Social Links</h2>
      </div>

      <div className='space-y-2'>
        {socialLinks.map((item) => {
          const Icon = item.icon

          return (
            <NextLink
              key={item.label}
              href={item.href}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-4 rounded-lg bg-zinc-100 px-4 py-4 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700'
            >
              <Icon
                size={24}
                strokeWidth={2.5}
                className='shrink-0 text-zinc-700 dark:text-zinc-300'
              />
              <span className='text-sm font-medium text-zinc-900 dark:text-white'>
                {item.label}
              </span>
            </NextLink>
          )
        })}
      </div>
    </div>
  )
}

export default SocialLinks
