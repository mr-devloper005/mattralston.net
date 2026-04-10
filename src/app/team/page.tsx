import { Users } from "lucide-react";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { buildTaskMetadata } from "@/lib/seo";
import { fetchTaskPosts, buildPostUrl } from "@/lib/task-data";

export const revalidate = 3;

export const generateMetadata = () =>
  buildTaskMetadata("org", {
    path: "/team",
    title: "Team",
    description: "Meet the people and organizations powering this platform.",
  });

export default async function TeamPage() {
  const teamPosts = await fetchTaskPosts("org", 18);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8faff_0%,#eef2f9_100%)]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-red-700">
            <Users className="h-3.5 w-3.5" />
            Team
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-slate-900">Builders behind the platform</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
            Product, community, and engineering teams work together to keep profile discovery and publishing reliable and useful.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              ["Cross-functional", "Design + Engineering + Community"],
              ["Global workflow", "Remote-first collaboration"],
              ["Org profiles", `${teamPosts.length} public team pages`],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{label}</p>
                <p className="mt-2 text-sm font-semibold text-slate-800">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-slate-900">Team and Organization Profiles</h2>
          </div>
          {teamPosts.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {teamPosts.map((post) => (
                <TaskPostCard key={post.id} post={post} href={buildPostUrl("org", post.slug)} taskKey="org" />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
              Team profiles will appear here once published.
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
