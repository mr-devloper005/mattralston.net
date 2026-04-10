import { Mail, MapPin, Phone, UserCircle } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { CONTACT_PAGE_OVERRIDE_ENABLED, ContactPageOverride } from '@/overrides/contact-page'

const lanes = [
  {
    icon: UserCircle,
    title: 'Profile questions',
    body: 'Get help finishing your profile, updating your photo or bio, or fixing how your page appears to others.',
  },
  {
    icon: Mail,
    title: 'Account email',
    body: 'Reach out if you have trouble signing in, need to update contact details, or want to understand how your session works on this site.',
  },
  {
    icon: Phone,
    title: 'General support',
    body: 'Ask about discovery, reporting an issue, or anything else related to using profiles here.',
  },
]

export default function ContactPage() {
  if (CONTACT_PAGE_OVERRIDE_ENABLED) {
    return <ContactPageOverride />
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8faff_0%,#eef2f9_100%)] text-slate-900">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-red-700">
            <MapPin className="h-3.5 w-3.5" />
            Contact
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-slate-900">Contact {SITE_CONFIG.name}</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
            Send a message about your profile, account, or anything else on this site. We read every note and reply when we can.
          </p>
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div className="space-y-4">
            {lanes.map((lane) => (
              <div key={lane.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <lane.icon className="h-5 w-5 text-red-700" />
                <h2 className="mt-3 text-lg font-semibold text-slate-900">{lane.title}</h2>
                <p className="mt-2 text-sm leading-7 text-slate-600">{lane.body}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Send a message</h2>
            <form className="mt-6 grid gap-4">
              <input
                className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 placeholder:text-slate-500"
                placeholder="Your name"
              />
              <input
                className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 placeholder:text-slate-500"
                placeholder="Email address"
                type="email"
              />
              <input
                className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 placeholder:text-slate-500"
                placeholder="Subject"
              />
              <textarea
                className="min-h-[160px] rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-500"
                placeholder="How can we help?"
              />
              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center rounded-full bg-[#b91c1c] px-6 text-sm font-semibold text-white hover:bg-[#991b1b]"
              >
                Send message
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
