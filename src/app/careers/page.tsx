import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/site-config";
import { Clock, HeartHandshake, Laptop, Sparkles } from "lucide-react";

const openings = [
  {
    title: "Senior Product Designer",
    location: "Remote (US overlap)",
    type: "Full-time",
    level: "Senior",
    focus: "Systems thinking, editorial layouts, and accessible component patterns.",
  },
  {
    title: "Full-stack Engineer",
    location: "Hybrid · New York",
    type: "Full-time",
    level: "Mid–Senior",
    focus: "Next.js, performance budgets, and pragmatic data modeling for multi-tenant content.",
  },
  {
    title: "Community & Support Lead",
    location: "Remote",
    type: "Full-time",
    level: "Mid",
    focus: "Playbooks, onboarding journeys, and thoughtful escalation when things go sideways.",
  },
  {
    title: "Contract Content Strategist",
    location: "Remote",
    type: "Contract",
    level: "Senior",
    focus: "Editorial guidelines, in-product microcopy, and help center architecture.",
  },
];

const benefits = [
  { title: "Deep work blocks", body: "We protect maker time with meeting-light weeks and clear ownership." },
  { title: "Learning budget", body: "Annual stipend for courses, conferences, and the occasional rare book." },
  { title: "Health & rest", body: "Comprehensive medical, mental health support, and a real vacation policy we expect you to use." },
  { title: "Equity mindset", body: "Competitive cash plus equity so wins are shared when the product compounds." },
];

const values = [
  { icon: HeartHandshake, label: "Candor with care", text: "Direct feedback, zero posturing." },
  { icon: Sparkles, label: "Taste is a strategy", text: "We ship fewer things, executed with conviction." },
  { icon: Laptop, label: "Remote-native", text: "Documentation and async rituals beat hallway decisions." },
  { icon: Clock, label: "Sustainable pace", text: "Sprints are for shipping, not for burning people out." },
];

export default function CareersPage() {
  return (
    <PageShell
      surface="brand"
      title="Careers"
      description={`Join ${SITE_CONFIG.name} if you want to craft software that feels editorial, humane, and worthy of someone’s favorite bookmark.`}
      actions={
        <Button className="bg-[#1A242F] text-white hover:bg-[#243040]" asChild>
          <Link href="/contact">Introduce yourself</Link>
        </Button>
      }
    >
      <div className="space-y-16">
        <section className="grid gap-6 lg:grid-cols-2">
          <Card className="border-[#B08D57]/15 bg-white">
            <CardContent className="space-y-4 p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#B08D57]">How we hire</p>
              <h2 className="text-2xl font-semibold text-[#1A242F]">A process that respects your time</h2>
              <ol className="space-y-4 text-sm leading-relaxed text-slate-600">
                <li>
                  <span className="font-semibold text-[#1A242F]">1. Intro call · </span>
                  Mutual fit, role scope, and how you like to work.
                </li>
                <li>
                  <span className="font-semibold text-[#1A242F]">2. Skills conversation · </span>
                  A practical review—often async—with people you would actually ship alongside.
                </li>
                <li>
                  <span className="font-semibold text-[#1A242F]">3. Paid exercise (when relevant) · </span>
                  Realistic, bounded, and compensated for senior craft roles.
                </li>
                <li>
                  <span className="font-semibold text-[#1A242F]">4. Offer · </span>
                  Transparent leveling, no exploding deadlines.
                </li>
              </ol>
            </CardContent>
          </Card>
          <div className="grid grid-cols-2 gap-4">
            {values.map(({ icon: Icon, label, text }) => (
              <Card key={label} className="border-[#e8e2d9] bg-[#faf8f5]/80">
                <CardContent className="p-5">
                  <Icon className="h-5 w-5 text-[#B08D57]" />
                  <p className="mt-3 text-sm font-semibold text-[#1A242F]">{label}</p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#B08D57]">Open roles</p>
            <h2 className="mt-2 text-2xl font-semibold text-[#1A242F] sm:text-3xl">What we are hiring for now</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Don’t see a perfect match? We still read thoughtful notes—especially if you show work we can react to.
            </p>
          </div>
          <div className="grid gap-5">
            {openings.map((role) => (
              <Card key={role.title} className="border-[#e8e2d9] bg-white transition-shadow hover:shadow-md">
                <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between">
                  <div className="max-w-2xl space-y-2">
                    <div className="flex flex-wrap gap-2">
                      <Badge className="border-0 bg-[#1A242F] text-white">{role.level}</Badge>
                      <Badge variant="outline" className="border-[#B08D57]/35 text-[#1A242F]">
                        {role.type}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A242F]">{role.title}</h3>
                    <p className="text-sm text-slate-500">{role.location}</p>
                    <p className="text-sm leading-relaxed text-slate-600">{role.focus}</p>
                  </div>
                  <Button variant="outline" className="shrink-0 border-[#B08D57]/40 text-[#1A242F] hover:bg-[#faf8f5]" asChild>
                    <Link href="/contact">Apply / ask questions</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-[#B08D57]/15 bg-white p-8 sm:p-10">
          <h2 className="text-xl font-semibold text-[#1A242F] sm:text-2xl">Benefits & balance</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-2xl border border-[#f0ebe3] bg-[#fafaf8] p-6">
                <p className="font-semibold text-[#1A242F]">{b.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{b.body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}
