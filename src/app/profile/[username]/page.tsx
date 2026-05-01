import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Footer } from '@/components/shared/footer'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { ContentImage } from '@/components/shared/content-image'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { Button } from '@/components/ui/button'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { buildPostUrl } from '@/lib/task-data'
import { buildPostMetadata, buildTaskMetadata } from '@/lib/seo'
import { fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG } from '@/lib/site-config'
import { BadgeCheck, ChevronRight, Globe, ArrowUpRight, Users } from 'lucide-react'
import { ShareButton } from '@/components/profile/share-button'
import { FollowButton } from '@/components/profile/follow-button'

export const revalidate = 3

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const sanitizeRichHtml = (html: string) =>
  html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, '')
    .replace(/<object[^>]*>[\s\S]*?<\/object>/gi, '')
    .replace(/\son[a-z]+\s*=\s*(['"]).*?\1/gi, '')
    .replace(/\shref\s*=\s*(['"])javascript:.*?\1/gi, ' href="#"')

const formatRichHtml = (raw?: string | null, fallback = 'Profile details will appear here once available.') => {
  const source = typeof raw === 'string' ? raw.trim() : ''
  if (!source) return `<p>${escapeHtml(fallback)}</p>`
  if (/<[a-z][\s\S]*>/i.test(source)) return sanitizeRichHtml(source)
  return source
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${escapeHtml(paragraph.replace(/\n/g, ' ').trim())}</p>`)
    .join('')
}

export async function generateStaticParams() {
  const posts = await fetchTaskPosts('profile', 50)
  if (!posts.length) {
    return [{ username: 'placeholder' }]
  }
  return posts.map((post) => ({ username: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params
  try {
    const post = await fetchTaskPostBySlug('profile', resolvedParams.username)
    return post ? await buildPostMetadata('profile', post) : await buildTaskMetadata('profile')
  } catch (error) {
    console.warn('Profile metadata lookup failed', error)
    return await buildTaskMetadata('profile')
  }
}

export default async function ProfileDetailPage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params
  const post = await fetchTaskPostBySlug('profile', resolvedParams.username)
  if (!post) {
    notFound()
  }

  const content = (post.content || {}) as Record<string, any>
  const logoUrl = typeof content.logo === 'string' ? content.logo : undefined
  const brandName =
    (content.brandName as string | undefined) ||
    (content.companyName as string | undefined) ||
    (content.name as string | undefined) ||
    post.title
  const website = content.website as string | undefined
  const domain = website ? website.replace(/^https?:\/\//, '').replace(/\/.*$/, '') : undefined
  const description =
    (content.description as string | undefined) ||
    post.summary ||
    'Profile details will appear here once available.'
  const descriptionHtml = formatRichHtml(description)
  const suggestedArticles = await fetchTaskPosts('article', 6)

  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '')
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Profiles',
        item: `${baseUrl}/profile`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: brandName,
        item: `${baseUrl}/profile/${post.slug}`,
      },
    ],
  }

  const isVerified = true
  const profileUrl = `${baseUrl}/profile/${post.slug}`

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8faff_0%,#eef2f9_100%)]">
      <NavbarShell />
      <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <SchemaJsonLd data={breadcrumbData} />

        <nav className="flex items-center gap-2 text-sm">
          <Link href="/" className="text-slate-500 hover:text-red-700 transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4 text-slate-400" />
          <Link href="/profile" className="flex items-center gap-1.5 text-slate-500 hover:text-red-700 transition-colors">
            <Users className="h-3.5 w-3.5" />
            Users
          </Link>
          <ChevronRight className="h-4 w-4 text-slate-400" />
          <span className="font-semibold text-slate-900">{brandName}</span>
        </nav>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)] md:p-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-start">
            <div className="flex flex-col items-center md:items-start">
              <div className="relative h-32 w-32 overflow-hidden rounded-full bg-slate-900 ring-4 ring-slate-100 md:h-36 md:w-36">
                {logoUrl ? (
                  <ContentImage
                    src={logoUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="144px"
                    intrinsicWidth={144}
                    intrinsicHeight={144}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-slate-900 text-3xl font-bold text-white md:text-4xl">
                    {post.title.slice(0, 1).toUpperCase()}
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1">
              <div className="flex flex-col items-center gap-3 md:items-start">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">{brandName}</h1>
                  {isVerified && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100">
                      <BadgeCheck className="h-4 w-4 text-red-700" />
                    </div>
                  )}
                </div>

                {domain && (
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Globe className="h-4 w-4" />
                    <span>{domain}</span>
                  </div>
                )}
              </div>

              <article
                className="mt-5 max-w-2xl text-[15px] leading-7 text-slate-600"
                dangerouslySetInnerHTML={{ __html: descriptionHtml }}
              />

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                {website ? (
                  <Button
                    asChild
                    size="default"
                    className="h-11 gap-2 rounded-full bg-slate-900 px-6 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
                  >
                    <Link href={website} target="_blank" rel="noopener noreferrer">
                      Visit Official Site
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                ) : null}
                <ShareButton url={profileUrl} />
                <FollowButton />
              </div>
            </div>
          </div>
        </section>

        {suggestedArticles.length ? (
          <section className="mt-10">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold tracking-tight text-slate-900">Related posts</h2>
              <Link
                href="/articles"
                className="text-sm font-semibold text-red-700 hover:text-red-800 hover:underline"
              >
                View all
              </Link>
            </div>
            <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {suggestedArticles.slice(0, 3).map((article) => (
                <TaskPostCard
                  key={article.id}
                  post={article}
                  href={buildPostUrl('article', article.slug)}
                  compact
                />
              ))}
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  )
}

