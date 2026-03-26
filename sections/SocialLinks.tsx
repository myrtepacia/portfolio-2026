import Link from 'next/link'
import { Facebook, Instagram, Link2 } from 'lucide-react'
import { FaDiscord } from 'react-icons/fa'

const socialLinks = [
  {
    href: 'https://discord.com/users/300006432798015489',
    label: 'Discord',
    icon: FaDiscord,
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
        <Link2 size={18} className='text-zinc-500 dark:text-zinc-400' />
        <h2 className='font-bold'>Social Links</h2>
      </div>

      <div className='space-y-2'>
        {socialLinks.map((item) => {
          const Icon = item.icon

          return (
            <Link
              key={item.label}
              href={item.href}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-4 rounded-lg bg-zinc-100 px-4 py-4 transition
