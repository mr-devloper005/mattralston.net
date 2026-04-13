import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Activity, Globe2, Radio } from 'lucide-react'

const regions = [
  { name: 'North America', latency: '18 ms p95', note: 'Primary API + app edge' },
  { name: 'European Union', latency: '34 ms p95', note: 'Read-heavy traffic, GDPR-aligned logging' },
  { name: 'Asia-Pacific', latency: '52 ms p95', note: 'Media delivery via CDN; writes routed to primary' },
]

const services = [
  { name: 'Web application', detail: 'SSR, dashboards, and authenticated flows', status: 'Operational' },
  { name: 'Public API', detail: 'REST endpoints + rate limits', status: 'Operational' },
  { name: 'Search index', detail: 'Full-text + category filters', status: 'Operational' },
  { name: 'Media pipeline', detail: 'Uploads, derivatives, CDN purge', status: 'Operational' },
  { name: 'Notifications', detail: 'Email + in-app delivery', status: 'Operational' },
]

const incidents = [
  { date: 'Mar 12, 2026', title: 'Delayed notification delivery', window: '42 minutes', status: 'Resolved', summary: 'Queue worker saturation; autoscaled workers and added back-pressure alerts.' },
  { date: 'Feb 22, 2026', title: 'Search indexing lag', window: '2h 10m', status: 'Resolved', summary: 'Rebuilt stale indexer node; added synthetic checks on ingest lag.' },
  { date: 'Jan 08, 2026', title: 'Elevated API 503s', window: '18 minutes', status: 'Resolved', summary: 'Database failover test exposed connection pool misconfig—patched and documented.' },
]

export default function StatusPage() {
  return (
    <PageShell
      surface="brand"
      title="System status"
      description="Live posture for core services, regional latency snapshots, and a transparent incident log—refreshed as our monitoring pipelines update."
      actions={
        <Button variant="outline" className="border-[#B08D57]/40 bg-white text-[#1A242F] hover:bg-[#faf8f5]" asChild>
          <Link href="/contact">Report an issue</Link>
        </Button>
      }
    >
      <div className="space-y-16">
        <section className="flex flex-wrap items-center gap-4 rounded-2xl border border-emerald-200/80 bg-emerald-50/90 px-6 py-4 text-sm text-emerald-950">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white">
            <Activity className="h-5 w-5" />
          </span>
          <div>
            <p className="font-semibold">All systems operational</p>
            <p className="text-xs text-emerald-900/80">Last checked moments ago · synthetic + real-user probes</p>
          </div>
        </section>

        <section>
          <div className="mb-6 flex items-center gap-2">
            <Radio className="h-4 w-4 text-[#B08D57]" />
            <h2 className="text-xl font-semibold text-[#1A242F] sm:text-2xl">Services</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {services.map((service) => (
              <Card key={service.name} className="border-[#e8e2d9] bg-white">
                <CardContent className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-semibold text-[#1A242F]">{service.name}</h3>
                    <p className="mt-1 text-xs text-slate-500">{service.detail}</p>
                  </div>
                  <Badge className="w-fit border-0 bg-emerald-600 text-white">{service.status}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-6 flex items-center gap-2">
            <Globe2 className="h-4 w-4 text-[#B08D57]" />
            <h2 className="text-xl font-semibold text-[#1A242F] sm:text-2xl">Regions</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {regions.map((r) => (
              <Card key={r.name} className="border-[#B08D57]/12 bg-[linear-gradient(180deg,#ffffff_0%,#faf8f5_100%)]">
                <CardContent className="p-6">
                  <p className="text-sm font-semibold text-[#1A242F]">{r.name}</p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight text-[#B08D57]">{r.latency}</p>
                  <p className="mt-3 text-xs leading-relaxed text-slate-600">{r.note}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#1A242F] sm:text-2xl">Incident history</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            We post summaries here even when impact was small—consistency beats surprise when you depend on us for live workflows.
          </p>
          <div className="mt-8 space-y-4">
            {incidents.map((incident) => (
              <Card key={incident.title} className="border-[#e8e2d9] bg-white">
                <CardContent className="grid gap-4 p-6 lg:grid-cols-[200px_1fr] lg:items-start">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#B08D57]">{incident.date}</p>
                    <p className="mt-2 text-sm text-slate-500">Window · {incident.window}</p>
                    <Badge variant="outline" className="mt-3 border-emerald-300 text-emerald-800">
                      {incident.status}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A242F]">{incident.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{incident.summary}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  )
}
