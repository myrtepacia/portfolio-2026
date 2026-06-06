import Link from 'next/link'
import { Facebook, Instagram, Github, Link2 } from 'lucide-react'

const DiscordIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
    <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.2 13.2 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" />
  </svg>
)

const socialLinks = [
  {
    href: 'https://web.facebook.com/myrtepacia/',
    label: 'Facebook',
    icon: Facebook,
    custom: false,
  },
  {
    href: 'https://www.instagram.com/myrtepacia/',
    label: 'Instagram',
    icon: Instagram,
    custom: false,
  },
  {
    href: 'https://github.com/myrtepacia/',
    label: 'GitHub',
    icon: Github,
    custom: false,
  },
  {
    href: 'https://discord.com/',
    label: 'Discord',
    icon: null,
    custom: true,
  },
]

const SocialLinks = () => {
  return (
    <div className='card h-full'>
      <div className='flex items-center gap-2'>
        <Link2 size={18} className='text-zinc-500 dark:text-zinc-400' />
        <h2 className='font-bold'>Social</h2>
      </div>

      <div className='flex flex-col gap-3'>
        {socialLinks.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            target='_blank'
            rel='noopener noreferrer'
            className='group flex items-center gap-3 text-zinc-700 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white'
          >
            {item.custom ? (
              <DiscordIcon size={14} />
            ) : (
              item.icon && <item.icon size={14} className='shrink-0' />
            )}
            <span className='text-xs'>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SocialLinks
