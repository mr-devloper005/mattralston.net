import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const cookies = [
  {
    name: 'Session & authentication',
    purpose: 'Keeps you signed in securely across requests; rotates on login.',
    type: 'Essential',
    duration: 'Session or 30 days (remember me)',
  },
  {
    name: 'CSRF token',
    purpose: 'Protects form submissions from cross-site request forgery.',
    type: 'Essential',
    duration: 'Session',
  },
  {
    name: 'Theme & UI preferences',
    purpose: 'Stores display choices such as density or sidebar state when enabled.',
    type: 'Preferences',
    duration: 'Up to 12 months',
  },
  {
    name: 'Analytics (aggregated)',
    purpose: 'Helps us understand feature usage in aggregate without selling data.',
    type: 'Analytics',
    duration: 'Up to 24 months',
  },
]

const toc = [
  { id: 'what', label: 'What cookies are' },
  { id: 'table', label: 'Cookie table' },
  { id: 'control', label: 'Your choices' },
  { id: 'updates', label: 'Updates' },
]

export default function CookiesPage() {
  return (
    <PageShell
      surface="brand"
      title="Cookie policy"
      description="Transparency about cookies and similar technologies on this site: what they do, how long they last, and how you can control them."
    >
      <div className="grid gap-10 lg:grid-cols-[220px_1fr] lg:items-start">
        <Card className="border-[#B08D57]/15 bg-white lg:sticky lg:top-24">
          <CardContent className="p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B08D57]">On this page</p>
            <nav className="mt-4 space-y-2 text-sm">
              {toc.map((item) => (
                <a key={item.id} href={`#${item.id}`} className="block text-slate-600 hover:text-[#1A242F]">
                  {item.label}
                </a>
              ))}
            </nav>
            <p className="mt-6 text-xs text-slate-400">Last updated: April 13, 2026</p>
          </CardContent>
        </Card>

        <div className="space-y-10">
          <section id="what" className="scroll-mt-28">
            <h2 className="text-xl font-semibold text-[#1A242F]">What cookies are</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Cookies are small text files stored on your device. We also use similar technologies such as local storage for lightweight preferences. Essential cookies are required for core functionality; optional categories can often be managed in your browser or, where available, in-product settings.
            </p>
          </section>

          <section id="table" className="scroll-mt-28 space-y-4">
            <h2 className="text-xl font-semibold text-[#1A242F]">Cookie categories</h2>
            <div className="space-y-4">
              {cookies.map((row) => (
                <Card key={row.name} className="border-[#e8e2d9] bg-white">
                  <CardContent className="p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-semibold text-[#1A242F]">{row.name}</h3>
                      <Badge
                        variant="outline"
                        className={
                          row.type === 'Essential'
                            ? 'border-[#1A242F] text-[#1A242F]'
                            : 'border-[#B08D57]/40 text-[#8a6d44]'
                        }
                      >
                        {row.type}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{row.purpose}</p>
                    <p className="mt-3 text-xs text-slate-500">
                      <span className="font-medium text-[#1A242F]">Typical duration: </span>
                      {row.duration}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section id="control" className="scroll-mt-28 rounded-2xl border border-[#B08D57]/15 bg-[#faf8f5] p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-[#1A242F]">Your choices</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Browser settings let you block or delete cookies. Blocking essential cookies may prevent sign-in or core features. For broader questions about data, see our{' '}
              <Link href="/privacy" className="font-medium text-[#B08D57] hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </section>

          <section id="updates" className="scroll-mt-28">
            <h2 className="text-xl font-semibold text-[#1A242F]">Updates</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              When we introduce new cookies that change how we track optional analytics or marketing (if ever enabled), we will update this page and provide notice consistent with our privacy practices.
            </p>
          </section>
        </div>
      </div>
    </PageShell>
  )
}
