'use client'

import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Menu, X, User, FileText, Building2, LayoutGrid, Tag, Image as ImageIcon, Plus, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { NAVBAR_OVERRIDE_ENABLED, NavbarOverride } from '@/overrides/navbar'
import { GatedCreateLink } from '@/components/shared/gated-create-link'

const NavbarAuthControls = dynamic(() => import('@/components/shared/navbar-auth-controls').then((mod) => mod.NavbarAuthControls), {
  ssr: false,
  loading: () => null,
})

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

export function Navbar() {
  if (NAVBAR_OVERRIDE_ENABLED) {
    return <NavbarOverride />
  }

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()
  const { recipe } = getFactoryState()

  const navigation = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled), [])
  const primaryNavigation = navigation.slice(0, 6)

  const isDark = recipe.brandPack === 'studio-dark' || recipe.navbar === 'floating-bar'
  const tone = isDark
    ? {
        shell: 'border-b border-white/10 bg-[#0c1424]/95 text-white backdrop-blur-xl',
        logo: 'border border-white/10 bg-white/5',
        nav: 'text-slate-300 hover:bg-white/8 hover:text-white',
        active: 'bg-white text-[#111827]',
        search: 'border border-white/10 bg-white/6 text-slate-300',
        cta: 'bg-[#d32f2f] text-white hover:bg-[#b71c1c]',
      }
    : {
        shell: 'border-b border-slate-200 bg-white/95 text-slate-900 backdrop-blur-xl',
        logo: 'border border-slate-200 bg-white',
        nav: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
        active: 'bg-[#b91c1c] text-white shadow-[0_10px_20px_rgba(185,28,28,0.2)]',
        search: 'border border-slate-200 bg-slate-50 text-slate-500',
        cta: 'bg-[#b91c1c] text-white hover:bg-[#991b1b]',
      }

  return (
    <header data-mobile-nav="true" className={cn('sticky top-0 z-50 w-full', tone.shell)}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl p-1.5', tone.logo)}>
            <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="40" height="40" className="h-full w-full object-contain" />
          </div>
          <div className="min-w-0">
            <span className="block truncate text-base font-semibold">{SITE_CONFIG.name}</span>
            <span className="block truncate text-[10px] uppercase tracking-[0.22em] opacity-65">{siteContent.navbar.tagline}</span>
          </div>
        </Link>

        <form
          action="/search"
          method="get"
          className={cn('ml-2 hidden min-w-[220px] flex-1 items-center gap-2 rounded-full px-3 py-1.5 text-sm md:flex lg:max-w-sm', tone.search)}
        >
          <Search className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
          <input
            type="search"
            name="q"
            placeholder="Search profiles, topics, and posts"
            className="min-w-0 flex-1 bg-transparent text-sm text-inherit outline-none placeholder:opacity-70"
            autoComplete="off"
            aria-label="Search"
          />
        </form>

        <div className="ml-auto hidden items-center gap-1 lg:flex">
          <Link href="/" className={cn('inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium', pathname === '/' ? tone.active : tone.nav)}>
            <Users className="h-4 w-4" />
            Home
          </Link>
          {primaryNavigation.map((task) => {
            const Icon = taskIcons[task.key] || LayoutGrid
            const isActive = pathname.startsWith(task.route)
            return (
              <Link key={task.key} href={task.route} className={cn('inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium', isActive ? tone.active : tone.nav)}>
                <Icon className="h-4 w-4" />
                {task.label}
              </Link>
            )
          })}
        </div>

        <div className="ml-auto flex items-center gap-2">
          {!isAuthenticated ? (
            <Button size="sm" asChild className={cn('hidden rounded-full px-4 sm:inline-flex', tone.cta)}>
              <Link href="/register">
                <Plus className="mr-1 h-4 w-4" />
                Join
              </Link>
            </Button>
          ) : (
            <NavbarAuthControls />
          )}

          <Button variant="ghost" size="icon" className="rounded-full lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {isMobileMenuOpen ? (
        <div className="border-t border-current/10 lg:hidden">
          <div className="space-y-2 px-4 py-4 sm:px-6">
            <form action="/search" method="get" className={cn('mb-3 flex items-center gap-2 rounded-xl px-3 py-2 text-sm', tone.search)}>
              <Search className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
              <input
                type="search"
                name="q"
                placeholder="Search profiles, topics, and posts"
                className="min-w-0 flex-1 bg-transparent text-sm text-inherit outline-none placeholder:opacity-70"
                autoComplete="off"
                aria-label="Search"
              />
            </form>
            {navigation.map((task) => {
              const Icon = taskIcons[task.key] || LayoutGrid
              const isActive = pathname.startsWith(task.route)
              return (
                <Link key={task.key} href={task.route} onClick={() => setIsMobileMenuOpen(false)} className={cn('flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors', isActive ? tone.active : tone.nav)}>
                  <Icon className="h-4 w-4" />
                  {task.label}
                </Link>
              )
            })}

            {!isAuthenticated ? (
              <Button size="sm" asChild className={cn('mt-2 w-full rounded-full', tone.cta)}>
                <GatedCreateLink href="/create/profile" onClick={() => setIsMobileMenuOpen(false)}>
                  <Plus className="mr-1 h-4 w-4" />
                  Create Profile
                </GatedCreateLink>
              </Button>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}
