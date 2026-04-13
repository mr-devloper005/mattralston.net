import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockTeamMembers } from "@/data/mock-data";
import { SITE_CONFIG } from "@/lib/site-config";
import { ArrowRight, Compass, Layers, ShieldCheck } from "lucide-react";

const pillars = [
  {
    title: "Clarity over noise",
    body: "We design surfaces that respect attention: fewer gimmicks, stronger hierarchy, and copy that tells you what matters in the first screen.",
    icon: Compass,
  },
  {
    title: "Trust by default",
    body: "Profiles, listings, and shared resources are structured so provenance and context are visible—not buried behind endless feeds.",
    icon: ShieldCheck,
  },
  {
    title: "Built to compound",
    body: "Collections, categories, and search work together so good work stays findable months later, not lost the moment it scrolls away.",
    icon: Layers,
  },
];

const milestones = [
  { year: "2023", label: "Foundation", detail: "Defined the editorial and directory primitives that still anchor the product today." },
  { year: "2024", label: "Scale", detail: "Expanded task types, tightened performance budgets, and shipped calmer navigation patterns." },
  { year: "2025–26", label: "Depth", detail: "Invested in discovery, saved views, and clearer pathways for teams publishing together." },
];

export default function AboutPage() {
  return (
    <PageShell
      surface="brand"
      title={`About ${SITE_CONFIG.name}`}
      description="We are building a quieter, more intentional place on the web for people and organizations who care how their work is seen, saved, and shared."
      actions={
        <>
          <Button
            variant="outline"
            className="border-[#B08D57]/40 bg-white text-[#1A242F] hover:bg-[#faf8f5]"
            asChild
          >
            <Link href="/team">Meet collaborators</Link>
          </Button>
          <Button className="bg-[#1A242F] text-white hover:bg-[#243040]" asChild>
            <Link href="/contact">
              Start a conversation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </>
      }
    >
      <div className="space-y-16">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <Card className="overflow-hidden border-[#B08D57]/15 bg-white shadow-[0_24px_80px_rgba(26,36,47,0.06)]">
            <CardContent className="space-y-6 p-8 sm:p-10">
              <Badge className="border-0 bg-[#B08D57]/12 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1A242F]">
                Origin
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight text-[#1A242F] sm:text-4xl">
                A platform shaped like a well-edited journal—not an endless mall.
              </h2>
              <p className="text-base leading-relaxed text-slate-600">
                {SITE_CONFIG.name} began as a reaction to cluttered feeds and anonymous directories. We wanted a home where{" "}
                <span className="font-medium text-[#1A242F]">long-form writing</span>,{" "}
                <span className="font-medium text-[#1A242F]">credible listings</span>, and{" "}
                <span className="font-medium text-[#1A242F]">human-curated bookmarks</span> could coexist without fighting for the same visual language.
              </p>
              <p className="text-base leading-relaxed text-slate-600">
                Today we partner with creators, operators, and community leaders who treat the web as a craft—not a billboard. If that resonates, you are already speaking our language.
              </p>
            </CardContent>
          </Card>
          <div className="space-y-4">
            {pillars.map(({ title, body, icon: Icon }) => (
              <Card key={title} className="border-[#e8e2d9] bg-white/90">
                <CardContent className="flex gap-4 p-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#B08D57]/25 bg-[#faf8f5] text-[#B08D57]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#1A242F]">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <section className="rounded-3xl border border-[#B08D57]/15 bg-[linear-gradient(135deg,#ffffff_0%,#f9f7f3_55%,#fffefb_100%)] p-8 sm:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#B08D57]">Trajectory</p>
              <h2 className="mt-2 text-2xl font-semibold text-[#1A242F] sm:text-3xl">Milestones, told honestly</h2>
            </div>
            <p className="max-w-md text-sm text-slate-600">We grow in public where it helps our community—and keep the boring, reliable parts boring and reliable.</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {milestones.map((m) => (
              <div key={m.year} className="rounded-2xl border border-white/80 bg-white/70 p-6 shadow-sm backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B08D57]">{m.year}</p>
                <p className="mt-2 text-lg font-semibold text-[#1A242F]">{m.label}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{m.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#B08D57]">People</p>
              <h2 className="text-2xl font-semibold text-[#1A242F] sm:text-3xl">Faces behind the work</h2>
            </div>
            <Link href="/team" className="text-sm font-medium text-[#B08D57] hover:underline">
              View the full roster →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {mockTeamMembers.map((member) => (
              <Card
                key={member.id}
                className="border-[#e8e2d9] bg-white transition-transform hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(26,36,47,0.08)]"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-14 w-14 border border-[#B08D57]/20">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="bg-[#1A242F] text-white">{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-[#1A242F]">{member.name}</p>
                      <p className="text-xs text-slate-500">{member.role}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">{member.bio}</p>
                  <p className="mt-3 text-xs text-slate-400">{member.location}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}
