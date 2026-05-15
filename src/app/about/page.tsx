import Link from 'next/link'
import { FileText, MessageSquare, ShieldCheck } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

const focusAreas = [
  {
    title: 'Article-led structure',
    description: 'The website is organized around long-form readability, strong section hierarchy, and easy discovery.',
    icon: FileText,
  },
  {
    title: 'Audience engagement',
    description: 'Content sections and visual cards are designed to keep readers engaged and returning for new posts.',
    icon: MessageSquare,
  },
  {
    title: 'Editorial consistency',
    description: 'Publishing and moderation workflows help maintain quality, clarity, and consistency across pages.',
    icon: ShieldCheck,
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8faff_0%,#eef2f9_100%)]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-700">About {SITE_CONFIG.name}</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-900">A focused website for article publishing and reader experience.</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
            {SITE_CONFIG.name} is built for clear article presentation, strong information flow, and visual consistency.
            The website combines editorial layout, discoverable sections, and focused UI patterns to make content easier to read and revisit.
          </p>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-3">
          {focusAreas.map((area) => (
            <div key={area.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <area.icon className="h-5 w-5 text-red-700" />
              <h2 className="mt-3 text-lg font-semibold text-slate-900">{area.title}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">{area.description}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">How the website is organized</h2>
          <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
            <p>1. Homepage sections prioritize article readability and visual rhythm.</p>
            <p>2. Content blocks are structured for fast scanning and deeper long-form reading.</p>
            <p>3. Navigation and supporting pages are designed for simple, low-friction exploration.</p>
          </div>
          <div className="mt-6">
            <Link href="/contact" className="inline-flex rounded-full bg-[#b91c1c] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#991b1b]">
              Contact
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
