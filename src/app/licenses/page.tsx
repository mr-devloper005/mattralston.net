import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'

const stacks = [
  {
    group: 'Application framework',
    items: [
      { name: 'Next.js', license: 'MIT', notice: 'Copyright Vercel, Inc.' },
      { name: 'React', license: 'MIT', notice: 'Copyright Meta Platforms, Inc.' },
    ],
  },
  {
    group: 'Styling & UI',
    items: [
      { name: 'Tailwind CSS', license: 'MIT', notice: 'Copyright Tailwind Labs, Inc.' },
      { name: 'Radix UI primitives', license: 'MIT', notice: 'Copyright WorkOS' },
      { name: 'Lucide icons', license: 'ISC', notice: 'Copyright Lucide Contributors' },
    ],
  },
  {
    group: 'Forms, motion & charts',
    items: [
      { name: 'React Hook Form', license: 'MIT', notice: 'Copyright Bill Luo' },
      { name: 'Zod', license: 'MIT', notice: 'Copyright Colin McDonnell' },
      { name: 'Framer Motion', license: 'MIT', notice: 'Copyright Framer B.V.' },
      { name: 'Recharts', license: 'MIT', notice: 'Copyright Recharts Group' },
    ],
  },
  {
    group: 'Tooling & utilities',
    items: [
      { name: 'TypeScript', license: 'Apache-2.0', notice: 'Copyright Microsoft Corporation' },
      { name: 'date-fns', license: 'MIT', notice: 'Copyright Sasha Koss and Lesha Koss' },
      { name: 'clsx / tailwind-merge', license: 'MIT', notice: 'See respective repositories' },
    ],
  },
]

export default function LicensesPage() {
  return (
    <PageShell
      surface="brand"
      title="Open source licenses"
      description="We build on a foundation of excellent open source software. This page lists major dependencies and their licenses; full text lives in each package’s repository."
    >
      <div className="space-y-8">
        <Card className="border-[#1A242F] bg-[#1A242F] text-white">
          <CardContent className="p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#B08D57]">Note</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-200">
              The table below is representative, not exhaustive. Your deployed bundle may include transitive dependencies—run your package manager’s license audit for a complete export if you redistribute this application.
            </p>
          </CardContent>
        </Card>

        {stacks.map((block) => (
          <section key={block.group}>
            <h2 className="text-lg font-semibold text-[#1A242F]">{block.group}</h2>
            <div className="mt-4 overflow-hidden rounded-2xl border border-[#e8e2d9] bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#faf8f5] text-[11px] font-semibold uppercase tracking-[0.15em] text-[#8a6d44]">
                  <tr>
                    <th className="px-5 py-3">Package</th>
                    <th className="px-5 py-3">License</th>
                    <th className="hidden px-5 py-3 sm:table-cell">Attribution</th>
                  </tr>
                </thead>
                <tbody>
                  {block.items.map((row) => (
                    <tr key={row.name} className="border-t border-[#f0ebe3]">
                      <td className="px-5 py-4 font-medium text-[#1A242F]">{row.name}</td>
                      <td className="px-5 py-4 text-slate-600">{row.license}</td>
                      <td className="hidden px-5 py-4 text-slate-500 sm:table-cell">{row.notice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>
    </PageShell>
  )
}
