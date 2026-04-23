import Link from "next/link";
import { Briefcase, Globe, HeartHandshake } from "lucide-react";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";

const roles = [
  { title: "Senior Frontend Engineer", location: "Remote (India)", type: "Full-time", team: "Platform UX" },
  { title: "Community Programs Manager", location: "Remote", type: "Full-time", team: "Community" },
  { title: "Product Designer (Growth)", location: "Hybrid", type: "Full-time", team: "Design" },
  { title: "Developer Relations Engineer", location: "Remote", type: "Contract", team: "Developers" },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8faff_0%,#eef2f9_100%)]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-red-700">
            <Briefcase className="h-3.5 w-3.5" />
            Careers
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-slate-900">Build the future of profile-led discovery</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
            Join a team focused on trust, community, and high-quality browsing experiences across profiles, content, and conversations.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">Remote-first collaboration</div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">Small teams, high ownership</div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">Product + community mindset</div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            {roles.map((role) => (
              <div key={role.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{role.team}</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">{role.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{role.location} • {role.type}</p>
                <Link href="/contact" className="mt-4 inline-flex rounded-full bg-[#b91c1c] px-4 py-2 text-sm font-semibold text-white hover:bg-[#991b1b]">
                  Apply for this role
                </Link>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900"><HeartHandshake className="h-5 w-5 text-red-700" /> Benefits</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>Competitive compensation and flexible schedules</li>
                <li>Learning and conference stipend</li>
                <li>Wellness support and team offsites</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900"><Globe className="h-5 w-5 text-red-700" /> Hiring Process</h3>
              <ol className="mt-3 space-y-2 text-sm text-slate-600">
                <li>1. Intro call</li>
                <li>2. Role-specific assessment</li>
                <li>3. Team panel + culture chat</li>
                <li>4. Offer and onboarding</li>
              </ol>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
