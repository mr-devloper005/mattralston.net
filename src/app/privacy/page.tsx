import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'

const toc = [
  { id: 'overview', label: 'Overview' },
  { id: 'collection', label: 'What we collect' },
  { id: 'use', label: 'How we use data' },
  { id: 'sharing', label: 'Sharing & processors' },
  { id: 'retention', label: 'Retention' },
  { id: 'rights', label: 'Your rights' },
  { id: 'contact', label: 'Contact' },
]

export default function PrivacyPage() {
  return (
    <PageShell
      surface="brand"
      title="Privacy policy"
      description="How we handle personal information when you browse, publish, or administer content on this platform. Plain language first; legal precision where it matters."
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
          <section id="overview" className="scroll-mt-28">
            <h2 className="text-xl font-semibold text-[#1A242F]">Overview</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              We collect only what we need to run the service, keep accounts secure, and understand aggregate product health. We do not sell personal data, and we minimize retention wherever a shorter window still lets us operate safely.
            </p>
          </section>

          <section id="collection" className="scroll-mt-28 rounded-2xl border border-[#e8e2d9] bg-white p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-[#1A242F]">What we collect</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
              <li>
                <span className="font-medium text-[#1A242F]">Account data · </span>
                Name, email, authentication identifiers, and profile fields you choose to add.
              </li>
              <li>
                <span className="font-medium text-[#1A242F]">Content you submit · </span>
                Posts, listings, media uploads, bookmarks, and metadata such as categories or tags.
              </li>
              <li>
                <span className="font-medium text-[#1A242F]">Technical data · </span>
                IP address, device type, coarse location derived from IP, and diagnostic logs for reliability.
              </li>
              <li>
                <span className="font-medium text-[#1A242F]">Support interactions · </span>
                Messages you send to us and notes we add to resolve your request.
              </li>
            </ul>
          </section>

          <section id="use" className="scroll-mt-28">
            <h2 className="text-xl font-semibold text-[#1A242F]">How we use data</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              We use information to provide and improve the product, personalize in-product experiences you opt into, prevent abuse, comply with law, and communicate service-related updates. Analytics are aggregated or pseudonymized where feasible.
            </p>
          </section>

          <section id="sharing" className="scroll-mt-28">
            <h2 className="text-xl font-semibold text-[#1A242F]">Sharing & subprocessors</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              We share data with infrastructure and communications vendors who process it on our instructions—hosting, email delivery, error monitoring, and similar services. We contractually require appropriate safeguards. We may disclose information if required by law or to protect rights and safety.
            </p>
          </section>

          <section id="retention" className="scroll-mt-28">
            <h2 className="text-xl font-semibold text-[#1A242F]">Retention</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              We keep account and content data while your account is active and for a limited period afterward for backups, disputes, and legal obligations. Logs with technical identifiers roll off on a shorter schedule unless needed for security investigations.
            </p>
          </section>

          <section id="rights" className="scroll-mt-28 rounded-2xl border border-[#B08D57]/15 bg-[#faf8f5] p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-[#1A242F]">Your rights</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Depending on where you live, you may have rights to access, correct, delete, or export your personal data, and to object to certain processing. You can manage many settings in your account; for everything else, contact us and we will verify your request.
            </p>
          </section>

          <section id="contact" className="scroll-mt-28">
            <h2 className="text-xl font-semibold text-[#1A242F]">Contact</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Questions about this policy or a data request? Reach us through{' '}
              <Link href="/contact" className="font-medium text-[#B08D57] hover:underline">
                the contact page
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </PageShell>
  )
}
