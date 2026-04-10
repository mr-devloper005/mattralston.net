import Link from "next/link";
import { Code2, FileCode2, Terminal } from "lucide-react";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { fetchTaskPosts, buildPostUrl } from "@/lib/task-data";
import { buildTaskMetadata } from "@/lib/seo";

export const revalidate = 3;
export const generateMetadata = () =>
  buildTaskMetadata("pdf", {
    path: "/developers",
    title: "Developers",
    description: "Developer resources, docs, and integration guides.",
  });

const quickstart = [
  "Authenticate using your existing account session.",
  "Use the content endpoints for profiles, posts, and discovery feeds.",
  "Render task-specific cards using typed task keys.",
  "Validate payload shape before storing local post drafts.",
];

export default async function DevelopersPage() {
  const docs = await fetchTaskPosts("pdf", 18);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8faff_0%,#eef2f9_100%)]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-red-700">
            <Code2 className="h-3.5 w-3.5" />
            Developers
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-slate-900">Build with the platform confidently</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">Reference docs, integration guides, and examples for profile-led products.</p>
          <Link href="/contact" className="mt-4 inline-flex rounded-full bg-[#b91c1c] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#991b1b]">
            Request API access
          </Link>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900"><Terminal className="h-5 w-5 text-red-700" /> Quickstart</h2>
            <ol className="mt-4 space-y-2 text-sm text-slate-600">
              {quickstart.map((step, index) => (
                <li key={step}>{index + 1}. {step}</li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900"><FileCode2 className="h-5 w-5 text-red-700" /> Sample Request</h2>
            <pre className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-700">
{`GET /api/feed?task=profile&limit=20
Authorization: Bearer <token>
Accept: application/json`}
            </pre>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="mb-4 text-2xl font-semibold text-slate-900">Developer Documentation</h2>
          {docs.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {docs.map((doc) => (
                <TaskPostCard key={doc.id} post={doc} href={buildPostUrl("pdf", doc.slug)} taskKey="pdf" />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
              Docs will appear here as soon as they are published.
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
