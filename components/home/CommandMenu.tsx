'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowUpRight, Award, ChevronDown, ChevronRight, CornerDownLeft, FolderGit2, Hash, Mail, Search } from 'lucide-react'
import type { IconType } from 'react-icons'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { certificates, profile, projectData, socials } from '@/constants'
import { sections } from './navigation'

type Item = {
  label: string
  href: string
  external?: boolean
  // Child rows sit indented under their section
  parent?: string
}

// Rows listed under a section, shown indented beneath it
const children: Record<string, Omit<Item, 'parent'>[]> = {
  projects: projectData.map((p) => ({ label: p.title, href: p.link || '/projects', external: Boolean(p.link) })),
  education: certificates.map((c) => ({ label: c.title, href: c.image, external: true })),
  contact: [
    { label: profile.email, href: `mailto:${profile.email}` },
    { label: 'GitHub', href: profile.github, external: true },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/myrtepacia/', external: true },
  ],
}

// Brand icons for GitHub and LinkedIn; other socials use the plain arrow
const brandIcons: Record<string, IconType> = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedin,
}

// Other socials show as their own suggestions, outside Contact
const otherSocials: Item[] = socials
  .filter((s) => !['GitHub', 'LinkedIn'].includes(s.label))
  .map((s) => ({ label: s.label, href: s.href, external: true }))

const items: Item[] = [
  ...sections.flatMap((s) => [
    { label: s.label, href: `#${s.id}` },
    ...(children[s.id] ?? []).map((child) => ({ ...child, parent: s.label })),
  ]),
  ...otherSocials,
]

const CommandMenu = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  // Sections whose child rows are showing; children stay hidden until their section is clicked
  const [expanded, setExpanded] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  // A section stays visible when one of its children matches; children show when they or their section match
  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items.filter((item) => !item.parent || expanded.includes(item.parent))
    const matches = (item: Item) => item.label.toLowerCase().includes(q)
    return items.filter((item) =>
      item.parent
        ? matches(item) || items.some((p) => p.label === item.parent && !p.parent && matches(p))
        : matches(item) || items.some((c) => c.parent === item.label && matches(c))
    )
  }, [query, expanded])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  if (!open) return null

  const close = () => {
    setQuery('')
    setSelected(0)
    setExpanded([])
    onClose()
  }

  const hasChildren = (item: Item) => !item.parent && items.some((c) => c.parent === item.label)

  const go = (item: Item) => {
    // Sections with children open/close their list instead of navigating
    if (hasChildren(item) && !query.trim()) {
      setExpanded((list) => (list.includes(item.label) ? list.filter((l) => l !== item.label) : [...list, item.label]))
      return
    }
    close()
    if (item.external) window.open(item.href, '_blank', 'noopener,noreferrer')
    else if (item.href.startsWith('mailto:')) window.open(item.href, '_self')
    else document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' })
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') close()
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelected((i) => Math.min(i + 1, results.length - 1))
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelected((i) => Math.max(i - 1, 0))
    }
    if (e.key === 'Enter' && results[selected]) go(results[selected])
  }

  return (
    <div className='fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 pt-[15vh] backdrop-blur-sm' onClick={close}>
      <div
        role='dialog'
        aria-modal='true'
        aria-label='Search'
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
        className='w-full max-w-[520px] overflow-hidden rounded-xl border border-line bg-surface shadow-2xl'
      >
        <div className='flex items-center gap-2.5 border-b border-line px-4'>
          <Search size={16} className='text-subtle' />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelected(0)
            }}
            placeholder='Search projects, certifications, contact...'
            className='h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-subtle'
          />
          <kbd className='rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-subtle'>ESC</kbd>
        </div>

        <ul className='max-h-[360px] overflow-y-auto p-2'>
          {results.length === 0 && <li className='px-3 py-6 text-center text-sm text-muted'>No results</li>}
          {results.map((item, index) => {
            const isSelected = index === selected
            const Icon = brandIcons[item.label]
              ? brandIcons[item.label]
              : item.external && !item.parent
              ? ArrowUpRight
              : !item.parent
              ? Hash
              : item.href.startsWith('mailto:')
                ? Mail
                : item.parent === 'Projects'
                  ? FolderGit2
                  : item.parent === 'Certifications'
                    ? Award
                    : ArrowUpRight
            return (
              <li key={`${item.parent ?? 'section'}-${item.label}`}>
                <button
                  type='button'
                  onMouseEnter={() => setSelected(index)}
                  onClick={() => go(item)}
                  className={`flex w-full items-center gap-3 rounded-lg py-2 pr-3 text-left text-sm ${
                    item.parent ? 'pl-9' : 'pl-3'
                  } ${isSelected ? 'bg-wash text-fg' : item.parent ? 'text-muted' : 'text-fg'}`}
                >
                  <Icon size={item.parent ? 13 : 15} className='shrink-0 text-subtle' />
                  <span className='flex-1 truncate'>{item.label}</span>
                  {hasChildren(item) && !query.trim() ? (
                    expanded.includes(item.label) ? (
                      <ChevronDown size={14} className='shrink-0 text-subtle' />
                    ) : (
                      <ChevronRight size={14} className='shrink-0 text-subtle' />
                    )
                  ) : (
                    isSelected && <CornerDownLeft size={13} className='shrink-0 text-subtle' />
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default CommandMenu
