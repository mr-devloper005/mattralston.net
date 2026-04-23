import Link from 'next/link'
import { ArrowRight, Building2, FileText, Image as ImageIcon, LayoutGrid, Search, Tag, User, Users } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { TaskListClient } from '@/components/tasks/task-list-client'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG, getTaskConfig, type TaskKey } from '@/lib/site-config'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { taskIntroCopy } from '@/config/site.content'
import { TASK_LIST_PAGE_OVERRIDE_ENABLED, TaskListPageOverride } from '@/overrides/task-list-page'

const taskIcons: Record<TaskKey, any> = {
  listing: Building2,
  article: FileText,
  image: ImageIcon,
  profile: User,
  classified: Tag,
  sbm: LayoutGrid,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

export async function TaskListPage({ task, category }: { task: TaskKey; category?: string }) {
  if (TASK_LIST_PAGE_OVERRIDE_ENABLED) {
    return await TaskListPageOverride({ task, category })
  }

  const taskConfig = getTaskConfig(task)
  const posts = await fetchTaskPosts(task, 30)
  const normalizedCategory = category ? normalizeCategory(category) : 'all'
  const intro = taskIntroCopy[task]
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '')
  const schemaItems = posts.slice(0, 10).map((post, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${baseUrl}${taskConfig?.route || '/posts'}/${post.slug}`,
    name: post.title,
  }))

  const shellClass = 'bg-[linear-gradient(180deg,#f8faff_0%,#eef2f9_100%)]'
  const Icon = taskIcons[task] || LayoutGrid

  return (
    <div className={`min-h-screen ${shellClass}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {task === 'listing' ? (
          <SchemaJsonLd
            data={[
              {
                '@context': 'https://schema.org',
                '@type': 'ItemList',
                name: 'Business Directory Listings',
                itemListElement: schemaItems,
              },
              {
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                name: SITE_CONFIG.name,
                url: `${baseUrl}/listings`,
                areaServed: 'Worldwide',
              },
            ]}
          />
        ) : null}

        {task === 'article' || task === 'classified' ? (
          <SchemaJsonLd
            data={{
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: `${taskConfig?.label || task} | ${SITE_CONFIG.name}`,
              url: `${baseUrl}${taskConfig?.route || ''}`,
              hasPart: schemaItems,
            }}
          />
        ) : null}

        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-red-700">
                <Icon className="h-3.5 w-3.5" />
                {taskConfig?.label || task}
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-slate-900">{task === 'profile' ? 'Find profiles and identity-driven pages.' : taskConfig?.description || 'Latest posts'}</h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">A cleaner social feed layout with easier scanning, stronger metadata cues, and profile-aware discovery.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href={taskConfig?.route || '#'} className="inline-flex items-center gap-2 rounded-full bg-[#b91c1c] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#991b1b]">
                  Explore {taskConfig?.label || task}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/search" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                  <Search className="h-4 w-4" />
                  Search across site
                </Link>
              </div>
            </div>

            <form className="rounded-2xl border border-slate-200 bg-slate-50 p-4" action={taskConfig?.route || '#'}>
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Filter by category</label>
              <div className="mt-3 flex gap-2">
                <select name="category" defaultValue={normalizedCategory} className="h-11 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800">
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
                <button type="submit" className="h-11 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800">Apply</button>
              </div>
            </form>
          </div>

          {task === 'profile' ? (
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                ['Active profiles', `${posts.length}+ entries`],
                ['Trust-led UI', 'Identity and context first'],
                ['Fast discovery', 'Cards optimized for scan speed'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{label}</p>
                  <p className="mt-2 text-sm font-semibold text-slate-800">{value}</p>
                </div>
              ))}
            </div>
          ) : null}
        </section>

        {intro ? (
          <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-semibold text-slate-900">{intro.title}</h2>
            {intro.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="mt-4 text-sm leading-7 text-slate-600">{paragraph}</p>
            ))}
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              {intro.links.map((link) => (
                <a key={link.href} href={link.href} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 font-semibold text-slate-700 hover:bg-slate-100">
                  <Users className="h-3.5 w-3.5" />
                  {link.label}
                </a>
              ))}
            </div>
          </section>
        ) : null}

        <TaskListClient task={task} initialPosts={posts} category={normalizedCategory} />
      </main>
      <Footer />
    </div>
  )
}

