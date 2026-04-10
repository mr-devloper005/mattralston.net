import Link from "next/link";
import { MessageSquare, Users, Calendar } from "lucide-react";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { fetchTaskPosts, buildPostUrl } from "@/lib/task-data";
import { buildTaskMetadata } from "@/lib/seo";

export const revalidate = 3;
export const generateMetadata = () =>
  buildTaskMetadata("social", {
    path: "/community",
    title: "Community",
    description: "Discussions, updates, and social activity from the community.",
  });

const communityPrograms = [
  { title: "Weekly Discussions", detail: "Top creator and product threads every week" },
  { title: "Community Spotlights", detail: "Featured profiles and stories from active members" },
  { title: "Knowledge Sessions", detail: "Live Q&A sessions with builders and contributors" },
];

export default async function CommunityPage() {
  const posts = await fetchTaskPosts("social", 18);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8faff_0%,#eef2f9_100%)]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-red-700">
            <Users className="h-3.5 w-3.5" />
            Community
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-slate-900">Join conversations that move the platform forward</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">Explore public discussions, creator updates, and community-led knowledge sharing.</p>
          <div className="mt-5 flex gap-3">
            <Link href="/contact" className="inline-flex rounded-full bg-[#b91c1c] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#991b1b]">Start a discussion</Link>
            <Link href="/profile" className="inline-flex rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100">Browse profiles</Link>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {communityPrograms.map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900"><Calendar className="h-4 w-4 text-red-700" />{item.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{item.detail}</p>
            </div>
          ))}
        </section>

        <section className="mt-8">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-semibold text-slate-900"><MessageSquare className="h-5 w-5 text-red-700" /> Latest Community Posts</h2>
          {posts.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <TaskPostCard key={post.id} post={post} href={buildPostUrl("social", post.slug)} taskKey="social" />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
              No community posts yet.
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
