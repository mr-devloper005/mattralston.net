import Link from "next/link";
import { Users2, Compass, ShieldCheck } from "lucide-react";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { SITE_CONFIG } from "@/lib/site-config";

const highlights = [
  { label: "Active contributors", value: "12k+" },
  { label: "Profiles published", value: "18k+" },
  { label: "Monthly interactions", value: "320k+" },
];

const pillars = [
  { title: "Identity-first", description: "Profiles and trust cues lead every discovery path." },
  { title: "Community-powered", description: "People, teams, and creators shape the platform through content." },
  { title: "Utility-focused", description: "Fast scanning and structured layouts keep discovery clear and practical." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8faff_0%,#eef2f9_100%)]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-red-700">
            <Users2 className="h-3.5 w-3.5" />
            About {SITE_CONFIG.name}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-slate-900">A profile-first platform for discovery and publishing</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
            {SITE_CONFIG.name} combines profile identity, social discovery, and publishing tools in one cohesive product experience.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.label} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
                <p className="mt-2 text-sm font-semibold text-slate-800">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">{pillar.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{pillar.description}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">What you can do here</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"><Compass className="mb-2 h-4 w-4 text-red-700" />Discover profile-led content across tasks</div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"><ShieldCheck className="mb-2 h-4 w-4 text-red-700" />Build trust with structured identity pages</div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"><Users2 className="mb-2 h-4 w-4 text-red-700" />Join communities and publish updates</div>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/team" className="inline-flex rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100">Meet the Team</Link>
            <Link href="/contact" className="inline-flex rounded-full bg-[#b91c1c] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#991b1b]">Contact Us</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
