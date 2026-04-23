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

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8faff_0%,#eef2f9_100%)]">
      <NavbarShell />
      <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <SchemaJsonLd data={breadcrumbData} />

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <div className="grid gap-8 md:grid-cols-[220px_1fr] md:items-start">
            <div className="flex justify-center md:justify-start">
              <div className="relative h-44 w-44 overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
                {logoUrl ? (
                  <ContentImage src={logoUrl} alt={post.title} fill className="object-cover" sizes="176px" intrinsicWidth={176} intrinsicHeight={176} />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-4xl font-semibold text-slate-500">
                    {post.title.slice(0, 1).toUpperCase()}
                  </div>
                )}
              </div>
            </div>

            <div>
              <p className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-red-700">Public profile</p>
              <h1 className="mt-4 text-4xl font-bold tracking-[-0.03em] text-slate-900 sm:text-5xl">{brandName}</h1>
              {domain ? <p className="mt-1 text-sm font-medium text-slate-500">{domain}</p> : null}

              <article
                className="article-content prose prose-slate mt-6 max-w-2xl text-base leading-relaxed prose-p:my-4 prose-a:text-red-700 prose-a:underline prose-strong:font-semibold"
                dangerouslySetInnerHTML={{ __html: descriptionHtml }}
              />

              <div className="mt-6 flex flex-wrap gap-3">
                {website ? (
                  <Button asChild size="lg" className="rounded-full bg-[#b91c1c] px-7 text-base text-white hover:bg-[#991b1b]">
                    <Link href={website} target="_blank" rel="noopener noreferrer">
                      Visit Official Site
                    </Link>
                  </Button>
                ) : null}
                <Button asChild variant="outline" size="lg" className="rounded-full px-7 text-base">
                  <Link href="/profile">Browse more profiles</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {suggestedArticles.length ? (
          <section className="mt-12">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-slate-900">Related posts</h2>
              <Link href="/articles" className="text-sm font-semibold text-red-700 hover:underline">View all</Link>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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

