"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { buildPostUrl } from "@/lib/task-data";
import { normalizeCategory, isValidCategory } from "@/lib/categories";
import type { TaskKey } from "@/lib/site-config";
import type { SitePost } from "@/lib/site-connector";
import { getLocalPostsForTask } from "@/lib/local-posts";
import { Input } from "@/components/ui/input";

type Props = {
  task: TaskKey;
  initialPosts: SitePost[];
  category?: string;
};

const postHaystack = (post: SitePost) => {
  const content = post.content && typeof post.content === "object" ? post.content : {};
  const c = content as Record<string, unknown>;
  const parts = [
    post.title,
    post.summary,
    typeof c.description === "string" ? c.description : "",
    typeof c.body === "string" ? c.body : "",
    typeof c.excerpt === "string" ? c.excerpt : "",
    Array.isArray(post.tags) ? post.tags.join(" ") : "",
  ];
  return parts
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
};

export function TaskListClient({ task, initialPosts, category }: Props) {
  const [query, setQuery] = useState("");
  const localPosts = getLocalPostsForTask(task);

  const merged = useMemo(() => {
    const bySlug = new Set<string>();
    const combined: Array<SitePost & { localOnly?: boolean; task?: TaskKey }> = [];

    localPosts.forEach((post) => {
      if (post.slug) {
        bySlug.add(post.slug);
      }
      combined.push(post);
    });

    initialPosts.forEach((post) => {
      if (post.slug && bySlug.has(post.slug)) return;
      combined.push(post);
    });

    const normalizedCategory = category ? normalizeCategory(category) : "all";
    if (normalizedCategory === "all") {
      return combined.filter((post) => {
        const content = post.content && typeof post.content === "object" ? post.content : {};
        const value = typeof (content as any).category === "string" ? (content as any).category : "";
        return !value || isValidCategory(value);
      });
    }

    return combined.filter((post) => {
      const content = post.content && typeof post.content === "object" ? post.content : {};
      const value =
        typeof (content as any).category === "string"
          ? normalizeCategory((content as any).category)
          : "";
      return value === normalizedCategory;
    });
  }, [category, initialPosts, localPosts]);

  const q = query.trim().toLowerCase();
  const visible = useMemo(() => {
    if (!q) return merged;
    return merged.filter((post) => postHaystack(post).includes(q));
  }, [merged, q]);

  return (
    <div className="space-y-6">
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter this page…"
          className="h-11 pl-9"
          aria-label="Filter posts on this page"
          autoComplete="off"
        />
      </div>

      {!visible.length ? (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
          {merged.length ? "No posts match your filter." : "No posts yet for this section."}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((post) => {
            const localOnly = (post as any).localOnly;
            const href = localOnly
              ? `/local/${task}/${post.slug}`
              : buildPostUrl(task, post.slug);
            return <TaskPostCard key={post.id} post={post} href={href} taskKey={task} />;
          })}
        </div>
      )}
    </div>
  );
}
