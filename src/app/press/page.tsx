import Link from "next/link";
import { Megaphone, Newspaper, Download } from "lucide-react";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";

const pressCoverage = [
  { outlet: "Tech Chronicle", headline: "How profile-first design improves trust in discovery products", date: "April 2026" },
  { outlet: "Product Weekly", headline: "Inside the redesign of a social knowledge platform", date: "March 2026" },
  { outlet: "Community Wire", headline: "Why creator identity pages are becoming core product surfaces", date: "February 2026" },
];

const assets = [
  { name: "Brand Logos", format: "SVG, PNG" },
  { name: "UI Screenshots", format: "PNG" },
  { name: "Media Fact Sheet", format: "PDF" },
];

export default function PressPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8faff_0%,#eef2f9_100%)]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-red-700">
            <Megaphone className="h-3.5 w-3.5" />
            Press
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-slate-900">Media resources and company updates</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
            Find the latest announcements, media mentions, and press-ready brand assets.
          </p>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900"><Newspaper className="h-5 w-5 text-red-700" /> Recent Coverage</h2>
            <div className="mt-4 space-y-3">
              {pressCoverage.map((item) => (
                <div key={item.headline} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{item.outlet}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{item.headline}</p>
                  <p className="mt-1 text-xs text-slate-500">{item.date}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900"><Download className="h-5 w-5 text-red-700" /> Press Kit</h2>
            <div className="mt-4 space-y-3">
              {assets.map((asset) => (
                <div key={asset.name} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-sm font-semibold text-slate-900">{asset.name}</p>
                  <p className="text-xs text-slate-500">{asset.format}</p>
                </div>
              ))}
            </div>
            <Link href="/contact" className="mt-5 inline-flex rounded-full bg-[#b91c1c] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#991b1b]">
              Request press resources
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
