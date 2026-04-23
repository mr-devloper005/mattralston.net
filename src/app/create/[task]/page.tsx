"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  AlignLeft,
  Check,
  Circle,
  Image as ImageIcon,
  Layers,
  MapPin,
  Plus,
  Save,
  Sparkles,
  Tag,
} from "lucide-react";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/auth-context";
import { CATEGORY_OPTIONS } from "@/lib/categories";
import { SITE_CONFIG, type TaskKey } from "@/lib/site-config";
import { addLocalPost } from "@/lib/local-posts";
import { cn } from "@/lib/utils";

type Field = {
  key: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "url"
    | "number"
    | "tags"
    | "images"
    | "highlights"
    | "category"
    | "file";
  placeholder?: string;
  required?: boolean;
};

const FORM_CONFIG: Record<TaskKey, { title: string; description: string; fields: Field[] }> = {
  listing: {
    title: "Create Business Listing",
    description: "Add a local-only listing with business details.",
    fields: [
      { key: "title", label: "Listing title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Full description", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "location", label: "Location", type: "text" },
      { key: "address", label: "Address", type: "text" },
      { key: "website", label: "Website URL", type: "url" },
      { key: "email", label: "Business email", type: "text" },
      { key: "phone", label: "Phone", type: "text" },
      { key: "logo", label: "Logo URL", type: "url" },
      { key: "images", label: "Gallery images", type: "images" },
      { key: "highlights", label: "Highlights", type: "highlights" },
    ],
  },
  classified: {
    title: "Create Classified",
    description: "Add a local-only classified ad.",
    fields: [
      { key: "title", label: "Ad title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Ad details", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "location", label: "Location", type: "text" },
      { key: "address", label: "Address", type: "text" },
      { key: "website", label: "Website URL", type: "url" },
      { key: "email", label: "Business email", type: "text" },
      { key: "phone", label: "Phone", type: "text" },
      { key: "images", label: "Images", type: "images" },
      { key: "highlights", label: "Highlights", type: "highlights" },
    ],
  },
  article: {
    title: "Create Article",
    description: "Write a local-only article post.",
    fields: [
      { key: "title", label: "Article title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Article content (HTML allowed)", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "images", label: "Cover images", type: "images" },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  image: {
    title: "Create Image Share",
    description: "Share image-only content locally.",
    fields: [
      { key: "title", label: "Image title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Caption", type: "textarea" },
      { key: "category", label: "Category", type: "category" },
      { key: "images", label: "Images", type: "images", required: true },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  profile: {
    title: "Create Profile",
    description: "Create a local-only business profile.",
    fields: [
      { key: "brandName", label: "Brand name", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "About the brand", type: "textarea" },
      { key: "website", label: "Website URL", type: "url", required: true },
      { key: "logo", label: "Logo URL", type: "url", required: true },
    ],
  },
  social: {
    title: "Create Social Post",
    description: "Publish a local-only social update.",
    fields: [
      { key: "title", label: "Post title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Post content", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category" },
      { key: "images", label: "Images", type: "images" },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  sbm: {
    title: "Create Bookmark",
    description: "Submit a local-only social bookmark.",
    fields: [
      { key: "title", label: "Bookmark title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Why it's useful", type: "textarea" },
      { key: "website", label: "Target URL", type: "url", required: true },
      { key: "category", label: "Category", type: "category" },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  pdf: {
    title: "Create PDF Entry",
    description: "Add a local-only PDF resource.",
    fields: [
      { key: "title", label: "PDF title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Description", type: "textarea" },
      { key: "fileUrl", label: "PDF file URL", type: "file", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "images", label: "Cover image", type: "images" },
    ],
  },
  org: {
    title: "Create Organization",
    description: "Create a local-only organization profile.",
    fields: [
      { key: "brandName", label: "Organization name", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "About the organization", type: "textarea" },
      { key: "website", label: "Website URL", type: "url" },
      { key: "logo", label: "Logo URL", type: "url" },
    ],
  },
  comment: {
    title: "Create Blog Comment",
    description: "Store a local-only blog comment entry.",
    fields: [
      { key: "title", label: "Comment title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Comment body", type: "textarea", required: true },
      { key: "website", label: "Target post URL", type: "url", required: true },
      { key: "category", label: "Category", type: "category" },
    ],
  },
};

const SECTION_ORDER = ["basics", "content", "details", "media", "extras"] as const;
type SectionId = (typeof SECTION_ORDER)[number];

const SECTION_META: Record<
  SectionId,
  { title: string; description: string; icon: typeof Sparkles }
> = {
  basics: {
    title: "Essentials",
    description: "Titles and summaries—what people notice first.",
    icon: Sparkles,
  },
  content: {
    title: "Main content",
    description: "Longer text, story, or full description.",
    icon: AlignLeft,
  },
  details: {
    title: "Category & contact",
    description: "Location, links, and how to reach you.",
    icon: MapPin,
  },
  media: {
    title: "Images & files",
    description: "URLs, uploads, and visuals (kept in this browser).",
    icon: ImageIcon,
  },
  extras: {
    title: "Tags & highlights",
    description: "Optional keywords and quick bullet points.",
    icon: Tag,
  },
};

function sectionForField(field: Field): SectionId {
  const k = field.key;
  if (k === "title" || k === "brandName" || k === "summary") return "basics";
  if (k === "description") return "content";
  if (k === "logo" || k === "images" || k === "fileUrl" || field.type === "file") return "media";
  if (k === "tags" || k === "highlights") return "extras";
  return "details";
}

function groupFieldsBySection(fields: Field[]) {
  const buckets = new Map<SectionId, Field[]>();
  for (const id of SECTION_ORDER) buckets.set(id, []);
  for (const f of fields) {
    buckets.get(sectionForField(f))!.push(f);
  }
  return SECTION_ORDER.map((id) => ({ id, fields: buckets.get(id)! })).filter((g) => g.fields.length > 0);
}

function fieldValueFilled(value: string | undefined) {
  return Boolean((value ?? "").toString().trim());
}

const shellClass = "min-h-screen bg-[linear-gradient(180deg,#f8faff_0%,#eef2f9_100%)] text-slate-900";

export default function CreateTaskPage() {
  const { user, isAuthenticated, isAuthReady } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const taskKey = params?.task as TaskKey;

  const taskConfig = useMemo(
    () => SITE_CONFIG.tasks.find((task) => task.key === taskKey && task.enabled),
    [taskKey]
  );
  const formConfig = FORM_CONFIG[taskKey];

  const [values, setValues] = useState<Record<string, string>>({});
  const [uploadingPdf, setUploadingPdf] = useState(false);

  const fieldGroups = useMemo(
    () => (formConfig ? groupFieldsBySection(formConfig.fields) : []),
    [formConfig]
  );

  const requiredFields = useMemo(() => formConfig?.fields.filter((f) => f.required) ?? [], [formConfig]);
  const requiredFilled = useMemo(
    () => requiredFields.filter((f) => fieldValueFilled(values[f.key])).length,
    [requiredFields, values]
  );
  const requiredTotal = requiredFields.length;
  const progressPct = requiredTotal ? Math.round((requiredFilled / requiredTotal) * 100) : 100;

  useEffect(() => {
    if (!isAuthReady || taskKey !== "profile") return;
    if (isAuthenticated) return;
    router.replace(`/login?from=${encodeURIComponent("/create/profile")}`);
  }, [isAuthReady, taskKey, isAuthenticated, router]);

  if (!taskConfig || !formConfig) {
    return (
      <div className={shellClass}>
        <NavbarShell />
        <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
              <Layers className="h-7 w-7 text-slate-500" />
            </div>
            <h1 className="mt-6 text-2xl font-semibold tracking-tight text-slate-900">This type isn’t available</h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">This content type isn’t enabled for this site.</p>
            <Button className="mt-8 rounded-full bg-[#b91c1c] px-8 text-white hover:bg-[#991b1b]" asChild>
              <Link href="/">Back home</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (taskKey === "profile") {
    if (!isAuthReady) {
      return (
        <div className={shellClass}>
          <NavbarShell />
          <main className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 sm:px-6">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-[#b91c1c]" aria-hidden />
            <p className="mt-4 text-sm text-slate-600">Loading…</p>
          </main>
          <Footer />
        </div>
      );
    }
    if (!isAuthenticated) {
      return (
        <div className={shellClass}>
          <NavbarShell />
          <main className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 sm:px-6">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-[#b91c1c]" aria-hidden />
            <p className="mt-4 text-sm text-slate-600">Redirecting to sign in…</p>
          </main>
          <Footer />
        </div>
      );
    }
  }

  const updateValue = (key: string, value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in before creating content.",
      });
      const returnPath = `/create/${taskKey}`;
      router.push(`/login?from=${encodeURIComponent(returnPath)}`);
      return;
    }

    const missing = formConfig.fields.filter((field) => field.required && !values[field.key]);
    if (missing.length) {
      toast({
        title: "Missing fields",
        description: "Please fill all required fields before saving.",
      });
      return;
    }

    const title = values.title || values.brandName || "Untitled";
    const summary = values.summary || "";
    const contentType = taskConfig.contentType || taskKey;

    const content: Record<string, unknown> = {
      type: contentType,
    };

    if (values.category) content.category = values.category;
    if (values.description) content.description = values.description;
    if (values.website) content.website = values.website;
    if (values.email) content.email = values.email;
    if (values.phone) content.phone = values.phone;
    if (values.address) content.address = values.address;
    if (values.location) content.location = values.location;
    if (values.logo) content.logo = values.logo;
    if (values.fileUrl) content.fileUrl = values.fileUrl;
    if (values.brandName) content.brandName = values.brandName;

    const highlights = values.highlights
      ? values.highlights.split(",").map((item) => item.trim()).filter(Boolean)
      : [];
    if (highlights.length) content.highlights = highlights;

    const tags = values.tags
      ? values.tags.split(",").map((item) => item.trim()).filter(Boolean)
      : [];

    const images = values.images
      ? values.images.split(",").map((item) => item.trim()).filter(Boolean)
      : [];

    const post = addLocalPost({
      task: taskKey,
      title,
      summary,
      authorName: user.name,
      tags,
      content,
      media: images.map((url) => ({ url, type: "IMAGE" })),
      publishedAt: new Date().toISOString(),
    });

    toast({
      title: "Saved locally",
      description: "This post is stored only in your browser.",
    });

    router.push(`/local/${taskKey}/${post.slug}`);
  };

  const renderField = (field: Field) => (
    <div key={field.key} className="space-y-2">
      <Label className="text-sm font-medium text-slate-800">
        {field.label}{" "}
        {field.required ? <span className="font-normal text-red-600">*</span> : null}
      </Label>
      {field.type === "textarea" ? (
        <Textarea
          rows={field.key === "description" ? 6 : 4}
          placeholder={field.placeholder}
          value={values[field.key] || ""}
          onChange={(event) => updateValue(field.key, event.target.value)}
          className="rounded-xl border-slate-200 bg-slate-50/80 text-slate-900 transition-colors focus-visible:border-red-300 focus-visible:ring-red-200/50"
        />
      ) : field.type === "category" ? (
        <select
          value={values[field.key] || ""}
          onChange={(event) => updateValue(field.key, event.target.value)}
          className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-200"
        >
          <option value="">Select category</option>
          {CATEGORY_OPTIONS.map((option) => (
            <option key={option.slug} value={option.slug}>
              {option.name}
            </option>
          ))}
        </select>
      ) : field.type === "file" ? (
        <div className="space-y-3 rounded-xl border border-dashed border-slate-200 bg-slate-50/80 p-4">
          <Input
            type="file"
            accept="application/pdf"
            className="cursor-pointer border-0 bg-transparent p-0 file:mr-4 file:rounded-lg file:border-0 file:bg-[#b91c1c] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#991b1b]"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (!file) return;
              if (file.type !== "application/pdf") {
                toast({
                  title: "Invalid file",
                  description: "Please upload a PDF file.",
                });
                return;
              }
              const reader = new FileReader();
              setUploadingPdf(true);
              reader.onload = () => {
                const result = typeof reader.result === "string" ? reader.result : "";
                updateValue(field.key, result);
                setUploadingPdf(false);
                toast({
                  title: "PDF uploaded",
                  description: "File is stored locally.",
                });
              };
              reader.readAsDataURL(file);
            }}
          />
          <p className="text-xs text-slate-500">Or paste a URL below</p>
          <Input
            type="text"
            placeholder="https://…"
            value={values[field.key] || ""}
            onChange={(event) => updateValue(field.key, event.target.value)}
            className="h-11 rounded-xl border-slate-200"
          />
          {uploadingPdf ? <p className="text-xs text-slate-500">Uploading PDF…</p> : null}
        </div>
      ) : (
        <Input
          type={field.type === "number" ? "number" : field.type === "url" ? "url" : "text"}
          placeholder={
            field.type === "images" || field.type === "tags" || field.type === "highlights"
              ? "Separate values with commas"
              : field.placeholder
          }
          value={values[field.key] || ""}
          onChange={(event) => updateValue(field.key, event.target.value)}
          className="h-11 rounded-xl border-slate-200 bg-white shadow-sm focus-visible:ring-red-200"
        />
      )}
    </div>
  );

  const actionButtons = (
    <>
      <Button
        onClick={handleSubmit}
        className="h-11 flex-1 rounded-full bg-[#b91c1c] px-6 text-white shadow-md hover:bg-[#991b1b] sm:flex-none"
      >
        <Save className="mr-2 h-4 w-4" />
        Save locally
      </Button>
      <Button variant="outline" asChild className="h-11 flex-1 rounded-full border-slate-200 bg-white sm:flex-none">
        <Link href={taskConfig.route} className="inline-flex items-center justify-center gap-2">
          View {taskConfig.label}
          <Plus className="h-4 w-4" />
        </Link>
      </Button>
    </>
  );

  return (
    <div className={shellClass}>
      <NavbarShell />

      <main className="mx-auto max-w-7xl px-4 pb-28 pt-8 sm:px-6 sm:pb-12 lg:px-8 lg:pb-16 lg:pt-10">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,320px)_minmax(0,1fr)] xl:items-start xl:gap-12">
          {/* Sidebar */}
          <aside className="space-y-4 xl:sticky xl:top-24">
            <Button variant="ghost" size="sm" asChild className="-ml-2 h-9 gap-2 rounded-full text-slate-600 hover:bg-slate-100 hover:text-slate-900">
              <Link href={taskConfig.route}>
                <ArrowLeft className="h-4 w-4" />
                Back to {taskConfig.label}
              </Link>
            </Button>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap gap-2">
                <Badge className="border-0 bg-red-50 font-semibold text-red-800 hover:bg-red-50">{taskConfig.label}</Badge>
                <Badge variant="outline" className="border-slate-200 text-slate-600">
                  Browser only
                </Badge>
              </div>
              <h1 className="mt-4 text-2xl font-semibold tracking-[-0.02em] text-slate-900 sm:text-3xl">{formConfig.title}</h1>
              <p className="mt-3 text-sm leading-7 text-slate-600">{formConfig.description}</p>

              {requiredTotal > 0 ? (
                <div className="mt-6 border-t border-slate-100 pt-6">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-500">
                    <span>Required fields</span>
                    <span className="tabular-nums text-slate-700">
                      {requiredFilled}/{requiredTotal}
                    </span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-[#b91c1c] transition-[width] duration-300"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                  <ul className="mt-4 space-y-2">
                    {requiredFields.map((f) => {
                      const done = fieldValueFilled(values[f.key]);
                      return (
                        <li key={f.key} className="flex items-start gap-2 text-sm">
                          {done ? (
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                              <Check className="h-3 w-3" strokeWidth={3} />
                            </span>
                          ) : (
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-300">
                              <Circle className="h-2 w-2 fill-current" />
                            </span>
                          )}
                          <span className={cn(done ? "font-medium text-emerald-800" : "text-slate-800")}>{f.label}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : null}
            </div>

            <div className="hidden rounded-2xl border border-slate-200 bg-slate-50/80 p-5 text-sm leading-6 text-slate-600 xl:block">
              <p className="font-medium text-slate-800">Local save</p>
              <p className="mt-2">Nothing is sent to a server. Your draft lives in this browser until you save.</p>
            </div>

            <div className="hidden gap-3 xl:flex">{actionButtons}</div>
          </aside>

          {/* Form columns */}
          <div className="min-w-0 space-y-6">
            {fieldGroups.map(({ id, fields }) => {
              const meta = SECTION_META[id];
              const Icon = meta.icon;
              return (
                <section
                  key={id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                >
                  <div className="flex gap-4 border-b border-slate-100 pb-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-700">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">{meta.title}</h2>
                      <p className="mt-1 text-sm text-slate-600">{meta.description}</p>
                    </div>
                  </div>
                  <div className="mt-6 grid gap-6">{fields.map((field) => renderField(field))}</div>
                </section>
              );
            })}
          </div>
        </div>
      </main>

      {/* Mobile / tablet sticky actions */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200/80 bg-white/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(15,23,42,0.08)] backdrop-blur-md xl:hidden">
        <div className="mx-auto flex max-w-lg gap-2">{actionButtons}</div>
      </div>

      <Footer />
    </div>
  );
}
