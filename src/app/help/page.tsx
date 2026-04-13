import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { mockFaqs } from '@/data/mock-data'
import { BookOpen, FolderKanban, LifeBuoy, Search, Zap } from 'lucide-react'

const guides = [
  {
    title: 'First 15 minutes',
    description: 'Create an account, verify email, and publish your first post or listing with the checklist we use internally.',
    icon: Zap,
    href: '/register',
  },
  {
    title: 'Collections & bookmarks',
    description: 'Organize research, client links, and team resources without losing context in a generic favorites folder.',
    icon: FolderKanban,
    href: '/sbm',
  },
  {
    title: 'Editorial workflow',
    description: 'Draft states, preview links, and category hygiene for long-form articles and announcements.',
    icon: BookOpen,
    href: '/articles',
  },
  {
    title: 'Search & discovery',
    description: 'How ranking blends freshness, engagement, and explicit curator signals—plus tips for better titles.',
    icon: Search,
    href: '/search',
  },
]

export default function HelpPage() {
  return (
    <PageShell
      surface="brand"
      title="Help Center"
      description="Practical answers, structured guides, and the fastest path to a human when something genuinely unusual breaks."
      actions={
        <Button className="bg-[#1A242F] text-white hover:bg-[#243040]" asChild>
          <Link href="/contact">Contact support</Link>
        </Button>
      }
    >
      <div className="space-y-16">
        <section className="rounded-3xl border border-[#B08D57]/15 bg-white p-8 sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#B08D57]/25 bg-[#faf8f5] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1A242F]">
                <LifeBuoy className="h-3.5 w-3.5 text-[#B08D57]" />
                Priority path
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-[#1A242F] sm:text-3xl">Most teams start here</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                If you are onboarding a group, skim the four tiles below in order—then jump into the FAQ for edge cases. Average time to first successful publish: under half an hour.
              </p>
            </div>
            <Button variant="outline" className="h-11 border-[#B08D57]/40 px-6 text-[#1A242F]" asChild>
              <Link href="/status">Check system status</Link>
            </Button>
          </div>
        </section>

        <section className="grid gap-5 sm:grid-cols-2">
          {guides.map(({ title, description, icon: Icon, href }) => (
            <Card key={title} className="group border-[#e8e2d9] bg-white transition-shadow hover:shadow-md">
              <CardContent className="flex h-full flex-col p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#B08D57]/20 bg-[#faf8f5] text-[#B08D57]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[#1A242F]">{title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{description}</p>
                <Link
                  href={href}
                  className="mt-4 text-sm font-medium text-[#B08D57] group-hover:underline"
                >
                  Open guide →
                </Link>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="border-[#B08D57]/15 bg-[#fafaf8]">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-[#1A242F]">Frequently asked</h3>
              <p className="mt-2 text-sm text-slate-600">Straight answers—no support-bot tone.</p>
              <Accordion type="single" collapsible className="mt-6 w-full">
                {mockFaqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id} className="border-[#e8e2d9]">
                    <AccordionTrigger className="text-left text-[#1A242F] hover:no-underline">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-slate-600">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
          <Card className="border-[#1A242F] bg-[#1A242F] text-white">
            <CardContent className="space-y-4 p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#B08D57]">Still stuck?</p>
              <h3 className="text-xl font-semibold">We read every message</h3>
              <p className="text-sm leading-relaxed text-slate-300">
                Include URLs, screenshots, and what you expected to happen. For billing or account lockouts, mention the email on the account—we match tickets faster that way.
              </p>
              <Button className="bg-[#B08D57] text-white hover:bg-[#9a7a49]" asChild>
                <Link href="/contact">Open a ticket</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </PageShell>
  )
}
