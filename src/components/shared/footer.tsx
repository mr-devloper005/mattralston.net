import Link from 'next/link'
import { FOOTER_OVERRIDE_ENABLED, FooterOverride } from '@/overrides/footer'

const footerLinks = {
  company: [
    { name: 'About', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ],
  resources: [
    { name: 'Help Center', href: '/help' },
  ],
}

export function Footer() {
  if (FOOTER_OVERRIDE_ENABLED) {
    return <FooterOverride />
  }

  return (
    <footer className="border-t border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f5f7fb_100%)] text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_0.9fr_1.2fr]">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Company</h3>
            <ul className="mt-5 space-y-3 text-sm text-slate-600">
              {footerLinks.company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-slate-950">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Resources</h3>
            <ul className="mt-5 space-y-3 text-sm text-slate-600">
              {footerLinks.resources.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-slate-950">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:justify-self-end">
            <Link href="/contact" className="inline-flex rounded-full bg-[#b91c1c] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#991b1b]">
              Contact
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-5 text-sm text-slate-500">
          <div className="flex items-center justify-between">
            <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
