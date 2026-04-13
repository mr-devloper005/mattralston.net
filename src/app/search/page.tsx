import { PageShell } from "@/components/shared/page-shell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { fetchSiteFeed } from "@/lib/site-connector";
import { buildPostUrl, getPostTaskKey } from "@/lib/task-data";
import { getMockPostsForTask } from "@/lib/mock-posts";
import { SITE_CONFIG } from "@/lib/site-config";
import { TaskPostCard } from "@/components/shared/task-post-card";

export const revalidate = 3;

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, " ");

const compactText = (value: unknown) => {
  if (typeof value !== "string") return "";
  return stripHtml(value).replace(/\s+/g, " ").trim().toLowerCase();
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; loc?: string; category?: string; task?: string; master?: string }>;
}) {
  const resolved = (await searchParams) || {};
  const qRaw = (resolved.q || "").trim();
  const locRaw = (resolved.loc || "").trim();
  const queryLabel = [qRaw, locRaw].filter(Boolean).join(" · ");
  const tokens = [qRaw, locRaw].filter(Boolean).map((t) => t.toLowerCase());
  const category = (resolved.category || "").trim().toLowerCase();
  const task = (resolved.task || "").trim().toLowerCase();
  const useMaster = resolved.master !== "0";
  const feed = await fetchSiteFeed(
    useMaster ? 1000 : 300,
    useMaster
      ? { fresh: true, category: category || undefined, task: task || undefined }
      : undefined
  );
  const posts =
    feed?.posts?.length
      ? feed.posts
      : useMaster
        ? []
        : SITE_CONFIG.tasks.flatMap((task) => getMockPostsForTask(task.key));

  const postHaystack = (post: (typeof posts)[number]) => {
    const content = post.content && typeof post.content === "object" ? post.content : {};
    const c = content as Record<string, unknown>;
    const parts = [
      post.title,
      post.summary,
      (content as any).description,
      (content as any).body,
      (content as any).excerpt,
      Array.isArray(post.tags) ? post.tags.join(" ") : "",
      typeof c.location === "string" ? c.location : "",
      typeof c.city === "string" ? c.city : "",
      typeof c.address === "string" ? c.address : "",
      typeof c.region === "string" ? c.region : "",
      typeof c.area === "string" ? c.area : "",
    ];
    return stripHtml(parts.filter(Boolean).join(" "))
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  };

  const filtered = posts.filter((post) => {
    const content = post.content && typeof post.content === "object" ? post.content : {};
    const typeText = compactText((content as any).type);
    if (typeText === "comment") return false;
    const categoryText = compactText((content as any).category);
    const tags = Array.isArray(post.tags) ? post.tags.join(" ") : "";
    const tagsText = compactText(tags);
    const derivedCategory = categoryText || tagsText;
    if (category && !derivedCategory.includes(category)) return false;
    if (task && typeText && typeText !== task) return false;
    if (!tokens.length) return true;
    const haystack = postHaystack(post);
    return tokens.every((t) => haystack.includes(t));
  });

  const results = tokens.length > 0 ? filtered : filtered.slice(0, 24);

  return (
    <PageShell
      title="Search"
      description={
        queryLabel
          ? `Results for "${queryLabel}"`
          : "Browse the latest posts across every task."
      }
      actions={
        <form action="/search" className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <input type="hidden" name="master" value="1" />
          {category ? <input type="hidden" name="category" value={category} /> : null}
          {task ? <input type="hidden" name="task" value={task} /> : null}
          <div className="relative w-full sm:w-56">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="q"
              defaultValue={qRaw}
              placeholder="Keywords…"
              className="h-11 pl-9"
            />
          </div>
          <Input name="loc" defaultValue={locRaw} placeholder="Area or city" className="h-11 w-full sm:w-44" />
          <Button type="submit" className="h-11">
            Search
          </Button>
        </form>
      }
    >
      {results.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((post) => {
            const task = getPostTaskKey(post);
            const href = task ? buildPostUrl(task, post.slug) : `/posts/${post.slug}`;
            return <TaskPostCard key={post.id} post={post} href={href} />;
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
          No matching posts yet.
        </div>
      )}
    </PageShell>
  );
}
