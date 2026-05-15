import type { Metadata } from 'next'
import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import { siteContent } from '@/config/site.content'
import { HOME_PAGE_OVERRIDE_ENABLED, HomePageOverride } from '@/overrides/home-page'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/',
    title: siteContent.home.metadata.title,
    description: siteContent.home.metadata.description,
    openGraphTitle: siteContent.home.metadata.openGraphTitle,
    openGraphDescription: siteContent.home.metadata.openGraphDescription,
    image: SITE_CONFIG.defaultOgImage,
    keywords: [...siteContent.home.metadata.keywords],
  })
}

const highlights = [
  'Publish article content with a clean, focused reading experience.',
  'Keep engagement quality high through clear structure and moderation.',
  'Bring readers back with strong topic organization and consistent updates.',
]

const usersFeatures = [
  'Reader identity for higher-quality participation.',
  'Reputation context for trusted discussion flow.',
  'Voting and feedback tools for useful responses.',
  'Activity history for better transparency.',
]

const adminFeatures = [
  'Content moderation controls for quality and safety.',
  'Spam prevention workflows for cleaner threads.',
  'Editorial tools for consistent publishing standards.',
  'Team support for multi-admin management.',
]

const visualCards = [
  { src: '/sample-editorial.svg', alt: 'Editorial workspace scene', title: 'Editorial Workspace', tags: ['Publishing', 'Workflow'] },
  { src: '/sample-reader.svg', alt: 'Reading and review session', title: 'Reader Review Flow', tags: ['Audience', 'Insights'] },
  { src: '/sample-layout.svg', alt: 'Structured article layout preview', title: 'Article Layout Preview', tags: ['Structure', 'Design'] },
  { src: '/sample-brand.svg', alt: 'Publishing brand surface', title: 'Publishing Identity', tags: ['Brand', 'Content'] },
]

export default async function HomePage() {
  if (HOME_PAGE_OVERRIDE_ENABLED) {
    return <HomePageOverride />
  }

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      logo: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${SITE_CONFIG.defaultOgImage}`,
      sameAs: [],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ]

  return (
    <div className="min-h-screen bg-[#f4f4f4] text-[#111]">
      <NavbarShell />
      <SchemaJsonLd data={schemaData} />

      <main className="mx-auto max-w-[980px] px-6 py-10 sm:px-8">
        <header className="text-center">
          <p className="text-[30px] leading-tight tracking-[-0.02em] text-[#1b1b1b]" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
            Imagine better articles.
          </p>
          <p className="mt-3 text-[13px] text-[#5f6b7a]">{SITE_CONFIG.name} helps websites publish clearer, more engaging, and better organized content.</p>
          <div className="mt-6">
            <Link href="/register" className="inline-flex rounded-sm bg-[#8cc63f] px-7 py-2 text-[24px] font-semibold leading-none text-white hover:bg-[#79ae34]" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
              Sign Up
            </Link>
          </div>
        </header>

        <section className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-sm leading-7 text-[#333]">{SITE_CONFIG.name} is an article-focused publishing platform built for stronger reading flow and sustained audience interest.</p>
            <h2 className="mt-5 text-[30px] leading-tight text-[#1d1d1d]" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
              Supercharge Your Publishing
            </h2>
            <ul className="mt-4 list-disc space-y-3 pl-6 text-sm leading-7 text-[#1f1f1f]">
              {highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-[#d7d7d7] bg-white p-3 shadow-[0_6px_22px_rgba(0,0,0,0.12)]">
            <div className="grid grid-cols-2 gap-2">
              <img src="/sample-editorial.svg" alt="Editorial sample image one" className="h-24 w-full rounded-md object-cover" />
              <img src="/sample-reader.svg" alt="Editorial sample image two" className="h-24 w-full rounded-md object-cover" />
              <img src="/sample-layout.svg" alt="Editorial sample image three" className="h-24 w-full rounded-md object-cover" />
              <img src="/sample-brand.svg" alt="Editorial sample image four" className="h-24 w-full rounded-md object-cover" />
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-[#d4d4d4] bg-[radial-gradient(circle_at_20%_20%,#ffffff_0%,#f0f4fa_48%,#e8edf5_100%)] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {visualCards.map((card, index) => (
              <div key={card.title} className="group relative overflow-hidden rounded-lg border border-[#dbdbdb] bg-[#fbfbfb]">
                <img
                  src={card.src}
                  alt={card.alt}
                  className={`w-full object-cover ${index === 0 ? 'h-52' : 'h-44'}`}
                />
                <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent_0%,rgba(18,22,30,0.75)_75%,rgba(18,22,30,0.92)_100%)] px-3 pb-2 pt-8">
                  <p className="text-[12px] font-semibold text-white">{card.title}</p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {card.tags.map((tag) => (
                      <span key={`${card.title}-${tag}`} className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 space-y-10">
          <section>
            <h3 className="text-[38px] leading-none text-[#161616]" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>Users</h3>
            <p className="mt-3 text-sm leading-7 text-[#333]">Let readers build trust and continuity around useful contributions.</p>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-sm leading-7 text-[#1f1f1f]">
              {usersFeatures.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-[38px] leading-none text-[#161616]" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>Administration</h3>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-sm leading-7 text-[#1f1f1f]">
              {adminFeatures.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </section>
      </main>

      <Footer />
    </div>
  )
}
