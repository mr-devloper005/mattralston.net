import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Compass, MessageSquarePlus, Search, Sparkles, TrendingUp, UserRound, Users } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import { fetchTaskPosts } from '@/lib/task-data'
import { siteContent } from '@/config/site.content'
import type { SitePost } from '@/lib/site-connector'
import { HOME_PAGE_OVERRIDE_ENABLED, HomePageOverride } from '@/overrides/home-page'
import { GatedCreateLink } from '@/components/shared/gated-create-link'

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

function resolveTaskKey(value: unknown, fallback: TaskKey): TaskKey {
  if (value === 'listing' || value === 'classified' || value === 'article' || value === 'image' || value === 'profile' || value === 'sbm') return value
  return fallback
}

function getTaskHref(task: TaskKey, slug: string) {
  const route = SITE_CONFIG.tasks.find((item) => item.key === task)?.route || `/${task}`
  return `${route}/${slug}`
}

type FeedBlock = {
  task: TaskKey
  post: SitePost
}

export default async function HomePage() {
  if (HOME_PAGE_OVERRIDE_ENABLED) {
    return <HomePageOverride />
  }

  const enabledTasks = SITE_CONFIG.tasks.filter((task) => task.enabled)

  const taskFeed = await Promise.all(
    enabledTasks.map(async (task) => ({
      task: task.key,
      label: task.label,
      route: task.route,
      posts: await fetchTaskPosts(task.key, 8, { allowMockFallback: false, fresh: true }),
    })),
  )

  const profilePosts = taskFeed.find((item) => item.task === 'profile')?.posts || []
  const articlePosts = taskFeed.find((item) => item.task === 'article')?.posts || []
  const imagePosts = taskFeed.find((item) => item.task === 'image')?.posts || []
  const listingPosts = taskFeed.find((item) => item.task === 'listing')?.posts || []
  const classifiedPosts = taskFeed.find((item) => item.task === 'classified')?.posts || []

  const combinedFeed: FeedBlock[] = [
    ...profilePosts.slice(0, 6).map((post) => ({ task: 'profile' as TaskKey, post })),
    ...articlePosts.slice(0, 4).map((post) => ({ task: 'article' as TaskKey, post })),
    ...imagePosts.slice(0, 3).map((post) => ({ task: 'image' as TaskKey, post })),
    ...listingPosts.slice(0, 3).map((post) => ({ task: 'listing' as TaskKey, post })),
    ...classifiedPosts.slice(0, 2).map((post) => ({ task: 'classified' as TaskKey, post })),
  ].slice(0, 12)

  const discoverTasks = enabledTasks.slice(0, 6)

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
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8faff_0%,#eef2f9_100%)] text-slate-900">
      <NavbarShell />
      <SchemaJsonLd data={schemaData} />

      <main className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
        <section className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)_300px]">
          <aside className="space-y-4 xl:sticky xl:top-8 xl:h-fit">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Your spaces</p>
              <div className="mt-4 space-y-2">
                {discoverTasks.map((task) => (
                  <Link key={task.key} href={task.route} className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900">
                    <span>{task.label}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Profile network</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>Identity-first discovery</li>
                <li>Trust cues and follower context</li>
                <li>Readable post rhythm</li>
              </ul>
            </div>
          </aside>

          <div className="space-y-5">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-red-700">
                    <Users className="h-3.5 w-3.5" />
                    Profiles first
                  </p>
                  <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-900">Discover people, ideas, and communities.</h1>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">A feed designed for profile-led conversation and discovery, inspired by community Q&A and social knowledge products.</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Link href="/profile" className="inline-flex items-center gap-2 rounded-full bg-[#b91c1c] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#991b1b]">
                    <UserRound className="h-4 w-4" />
                    Explore Profiles
                  </Link>
                  <Link href="/search" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                    <Search className="h-4 w-4" />
                    Search
                  </Link>
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
                <div className="relative flex h-32 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 sm:h-auto sm:w-36 sm:min-h-[128px]">
                  <div className="flex flex-1 items-center justify-center">
                    <UserRound className="h-14 w-14 text-slate-400/80" aria-hidden />
                  </div>
                </div>
                <div className="min-w-0 flex-1 space-y-3">
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                    <MessageSquarePlus className="h-4 w-4 shrink-0 text-red-700" aria-hidden />
                    Build or update your public profile so others can find and trust you.
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <GatedCreateLink
                      href="/create/profile"
                      className="inline-flex min-w-[140px] flex-1 items-center justify-center rounded-xl bg-[#b91c1c] px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-[#991b1b] sm:flex-none"
                    >
                      Create profile
                    </GatedCreateLink>
                    <Link
                      href="/profile"
                      className="inline-flex min-w-[140px] flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-center text-sm font-semibold text-slate-700 hover:bg-slate-100 sm:flex-none"
                    >
                      Browse profiles
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              {combinedFeed.map(({ post, task }) => (
                <TaskPostCard key={`${task}-${post.id}`} post={post} href={getTaskHref(resolveTaskKey(post.task, task), post.slug)} taskKey={task} />
              ))}
            </section>
          </div>

          <aside className="space-y-4 xl:sticky xl:top-8 xl:h-fit">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Trending now</p>
              <div className="mt-4 space-y-3">
                {[
                  ['Profile spotlights', `${profilePosts.length} active profiles`],
                  ['Fresh discussions', `${articlePosts.length + classifiedPosts.length} new posts`],
                  ['Visual updates', `${imagePosts.length} image posts`],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <p className="flex items-center gap-2 text-sm font-semibold text-slate-800"><TrendingUp className="h-4 w-4 text-red-700" />{label}</p>
                    <p className="mt-1 text-xs text-slate-500">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Why this design</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">This site now follows a profile-centric social layout: compact scan lanes, contextual cards, and clear call-to-action hierarchy for discovery and posting.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"><Compass className="h-3.5 w-3.5" />Discovery</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"><Sparkles className="h-3.5 w-3.5" />Profiles</span>
              </div>
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  )
}

