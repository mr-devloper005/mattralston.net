import Link from "next/link";
import { Activity, AlertTriangle, CheckCircle2 } from "lucide-react";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";

const services = [
  { name: "Web App", status: "Operational", latency: "112ms" },
  { name: "Publishing API", status: "Operational", latency: "148ms" },
  { name: "Search Index", status: "Degraded", latency: "420ms" },
  { name: "Media Delivery", status: "Operational", latency: "96ms" },
];

const incidents = [
  { date: "April 8, 2026", title: "Search latency spike", impact: "Resolved" },
  { date: "March 28, 2026", title: "Delayed profile sync", impact: "Resolved" },
  { date: "March 14, 2026", title: "Community feed refresh lag", impact: "Resolved" },
];

export default function StatusPage() {
  const updated = new Date().toLocaleString("en-US", { dateStyle: "long", timeStyle: "short" });

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8faff_0%,#eef2f9_100%)]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-red-700">
            <Activity className="h-3.5 w-3.5" />
            Status
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-slate-900">System health and incident history</h1>
          <p className="mt-3 text-sm text-slate-600">Last updated: {updated}</p>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div key={service.name} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">{service.name}</h2>
              <p className="mt-2 text-sm text-slate-600">Latency: {service.latency}</p>
              <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {service.status === "Operational" ? <CheckCircle2 className="h-3.5 w-3.5 text-green-600" /> : <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />}
                {service.status}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Recent Incidents</h2>
          <div className="mt-4 space-y-3">
            {incidents.map((incident) => (
              <div key={incident.title} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{incident.date}</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{incident.title}</p>
                <p className="text-xs text-slate-500">{incident.impact}</p>
              </div>
            ))}
          </div>
          <Link href="/help" className="mt-5 inline-flex rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100">
            Visit Help Center
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
