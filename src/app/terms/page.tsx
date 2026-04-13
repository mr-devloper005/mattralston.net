import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { SITE_CONFIG } from '@/lib/site-config'

const toc = [
  { id: 'agreement', label: 'Agreement' },
  { id: 'accounts', label: 'Accounts' },
  { id: 'content', label: 'Content & license' },
  { id: 'conduct', label: 'Acceptable use' },
  { id: 'disclaimers', label: 'Disclaimers' },
  { id: 'termination', label: 'Termination' },
  { id: 'changes', label: 'Changes' },
]

export default function TermsPage() {
  return (
    <PageShell
      surface="brand"
      title="Terms of service"
      description={`The rules that govern access to and use of ${SITE_CONFIG.name}. If you use the site, these terms apply.`}
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
          <section id="agreement" className="scroll-mt-28">
            <h2 className="text-xl font-semibold text-[#1A242F]">Agreement to terms</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              By creating an account, accessing the site, or submitting content, you agree to these terms and to our{' '}
              <Link href="/privacy" className="font-medium text-[#B08D57] hover:underline">
                Privacy Policy
              </Link>
              . If you disagree, do not use the services.
            </p>
          </section>

          <section id="accounts" className="scroll-mt-28 rounded-2xl border border-[#e8e2d9] bg-white p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-[#1A242F]">Accounts & security</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              You are responsible for safeguarding login credentials and for activity under your account. Notify us promptly of unauthorized use. We may suspend accounts that present risk to the platform or other users.
            </p>
          </section>

          <section id="content" className="scroll-mt-28">
            <h2 className="text-xl font-semibold text-[#1A242F]">Your content & license to us</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              You retain rights to content you submit. You grant {SITE_CONFIG.name} a non-exclusive, worldwide license to host, reproduce, display, and distribute that content solely to operate, promote, and improve the services you use. You represent that you have the rights to grant this license.
            </p>
          </section>

          <section id="conduct" className="scroll-mt-28">
            <h2 className="text-xl font-semibold text-[#1A242F]">Acceptable use</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              You may not use the services to break the law, harass others, distribute malware, scrape at a scale that impairs the site, misrepresent your identity, or spam. We may remove content or limit features when these rules are violated.
            </p>
          </section>

          <section id="disclaimers" className="scroll-mt-28 rounded-2xl border border-[#B08D57]/15 bg-[#faf8f5] p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-[#1A242F]">Disclaimers</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              The services are provided “as is” to the fullest extent permitted by law. We do not warrant uninterrupted or error-free operation. Third-party content and links are not endorsed by us unless explicitly stated.
            </p>
          </section>

          <section id="termination" className="scroll-mt-28">
            <h2 className="text-xl font-semibold text-[#1A242F]">Termination</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              You may stop using the services at any time. We may suspend or terminate access for breaches, risk, or operational reasons, with or without notice where allowed by law. Provisions that should survive termination will remain in effect.
            </p>
          </section>

          <section id="changes" className="scroll-mt-28">
            <h2 className="text-xl font-semibold text-[#1A242F]">Changes</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              We may update these terms periodically. Material changes will be communicated in-product or by email when appropriate. Continued use after changes take effect constitutes acceptance.
            </p>
          </section>
        </div>
      </div>
    </PageShell>
  )
}
