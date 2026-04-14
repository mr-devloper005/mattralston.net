import Link from "next/link";
import { GatedCreateLink } from "@/components/shared/gated-create-link";
import { BadgeCheck, Search, Users } from "lucide-react";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { buildTaskMetadata } from "@/lib/seo";
import { taskPageMetadata } from "@/config/site.content";
import { fetchTaskPosts, buildPostUrl } from "@/lib/task-data";
import { normalizeCategory } from "@/lib/categories";

export const revalidate = 3;

export const generateMetadata = () =>
  buildTaskMetadata("profile", {
    path: "/profile",
    title: taskPageMetadata.profile.title,
    description: taskPageMetadata.profile.description,
  });

export default async function ProfilePage({ searchParams }: { searchParams?: { category?: string } }) {
  const posts = await fetchTaskPosts("profile", 30);
  const selectedCategory = searchParams?.category ? normalizeCategory(searchParams.category) : "all";

  const filtered = posts.filter((post) => {
    if (selectedCategory === "all") return true;
    const content = post.content && typeof post.content === "object" ? post.content : {};
    const value = typeof (content as any).category === "string" ? normalizeCategory((content as any).category) : "";
    return value === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8faff_0%,#eef2f9_100%)]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-red-700">
                <Users className="h-3.5 w-3.5" />
                Profiles
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-slate-900">
                Discover people, brands, and creators.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                Explore profile pages with stronger trust cues, identity context, and connected activity.
              </p>
            </div>
            <form action="/profile" className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Category</label>
              <div className="mt-3 flex gap-2">
                <input
                  name="category"
                  defaultValue={selectedCategory === "all" ? "" : selectedCategory}
                  placeholder="Type category slug..."
                  className="h-11 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-sm"
                />
                <button className="inline-flex h-11 items-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800">
                  <Search className="h-4 w-4" />
                  Apply
                </button>
              </div>
            </form>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              ["Verified style", "Profile-first visual hierarchy"],
              ["Fast scan", "Compact social discovery cards"],
              ["Live content", `${filtered.length} profile posts`],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{label}</p>
                <p className="mt-2 text-sm font-semibold text-slate-800">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          {filtered.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post) => (
                <TaskPostCard key={post.id} post={post} href={buildPostUrl("profile", post.slug)} taskKey="profile" />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
              No profile posts found in this category yet.
            </div>
          )}
        </section>

        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Profile publishing tips</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {["Use a clear logo or avatar", "Write a specific summary", "Link to your official website"].map((tip) => (
              <div key={tip} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                <span className="inline-flex items-center gap-2 font-semibold">
                  <BadgeCheck className="h-4 w-4 text-red-700" />
                  {tip}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <GatedCreateLink href="/create/profile" className="inline-flex rounded-full bg-[#b91c1c] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#991b1b]">
              Create your profile
            </GatedCreateLink>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
