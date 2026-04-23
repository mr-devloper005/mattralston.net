import Link from 'next/link'
import { FileText, Building2, LayoutGrid, Tag, Github, Twitter, Linkedin, Image as ImageIcon, User, ArrowRight, Users } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import { FOOTER_OVERRIDE_ENABLED, FooterOverride } from '@/overrides/footer'

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

const footerLinks = {
  platform: SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => ({
    name: task.label,
    href: task.route,
    icon: taskIcons[task.key] || LayoutGrid,
  })),
  company: [
    { name: 'About', href: '/about' },
    { name: 'Team', href: '/team' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' },
    { name: 'Press', href: '/press' },
  ],
  resources: [
    { name: 'Help Center', href: '/help' },
    { name: 'Community', href: '/community' },
    { name: 'Developers', href: '/developers' },
    { name: 'Status', href: '/status' },
  ],
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Cookies', href: '/cookies' },
    { name: 'Licenses', href: '/licenses' },
  ],
}

const socialLinks = [
  { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { name: 'GitHub', href: 'https://github.com', icon: Github },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
]

export function Footer() {
  if (FOOTER_OVERRIDE_ENABLED) {
    return <FooterOverride />
  }

  return (
    <footer className="border-t border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f5f7fb_100%)] text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.9fr_0.9fr_0.9fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="h-12 w-12 overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
                <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="48" height="48" className="h-full w-full object-contain" />
              </div>
              <div>
                <span className="block text-xl font-semibold">{SITE_CONFIG.name}</span>
                <span className="text-xs uppercase tracking-[0.22em] text-slate-500">{siteContent.footer.tagline}</span>
              </div>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-600">{SITE_CONFIG.description}</p>
            <Link href="/profile" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#b91c1c] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#991b1b]">
              <Users className="h-4 w-4" />
              Browse Profiles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Platform</h3>
            <ul className="mt-5 space-y-3 text-sm text-slate-600">
              {footerLinks.platform.map((item: any) => (
                <li key={item.name}>
                  <Link href={item.href} className="flex items-center gap-2 hover:text-slate-950">
                    {item.icon ? <item.icon className="h-4 w-4" /> : null}
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Company</h3>
            <ul className="mt-5 space-y-3 text-sm text-slate-600">
              {footerLinks.company.map((item: any) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-slate-950">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Resources</h3>
            <ul className="mt-5 space-y-3 text-sm text-slate-600">
              {footerLinks.resources.map((item: any) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-slate-950">{item.name}</Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center gap-2">
              {socialLinks.map((item) => (
                <Link key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-slate-200 bg-white p-2.5 text-slate-500 hover:border-slate-300 hover:text-slate-900">
                  <item.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-5 text-sm text-slate-500">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <span>&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</span>
            <div className="flex flex-wrap gap-3">
              {footerLinks.legal.map((item) => (
                <Link key={item.name} href={item.href} className="hover:text-slate-900">{item.name}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

