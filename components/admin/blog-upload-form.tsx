"use client";

import { useState, useRef, useCallback, useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, X, Check, AlertCircle, Eye, Edit3 } from "lucide-react";
import { createPost, uploadBlogImage } from "@/lib/supabase/actions";
import { MarkdownRenderer } from "@/components/blog/markdown-renderer";
import { createClient } from "@/lib/supabase/client";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, content: raw };

  const meta: Record<string, string> = {};
  match[1].split("\n").forEach((line) => {
    const idx = line.indexOf(":");
    if (idx > 0) {
      meta[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
    }
  });

  return { meta, content: match[2] };
}

async function uploadImageToStorage(file: File): Promise<string> {
  const result = await uploadBlogImage(file);
  if (result.success) return result.url;
  throw new Error(result.error);
}

async function processMarkdownImages(
  content: string,
  files: Map<string, File>
): Promise<string> {
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  let result = content;
  const uploads: Promise<void>[] = [];
  const urlMap = new Map<string, string>();

  for (const match of content.matchAll(imageRegex)) {
    const [full, alt, src] = match;
    if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("data:")) {
      continue;
    }
    const file = files.get(src);
    if (!file) continue;

    uploads.push(
      uploadImageToStorage(file).then((url) => {
        urlMap.set(src, url);
      })
    );
  }

  await Promise.all(uploads);

  for (const [src, url] of urlMap) {
    result = result.replaceAll(`(${src})`, `(${url})`);
    result = result.replaceAll(`"${src}"`, `"${url}"`);
  }

  return result;
}

interface BlogUploadFormProps {
  initialSlug?: string;
}

export function BlogUploadForm({ initialSlug = "" }: BlogUploadFormProps) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(createPost, {
    success: false,
    error: "",
    slug: "",
  });

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState(initialSlug);
  const [excerpt, setExcerpt] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState("");
  const [uploadedCoverUrl, setUploadedCoverUrl] = useState("");
  const [mdFileName, setMdFileName] = useState("");
  const [imageFiles, setImageFiles] = useState<Map<string, File>>(new Map());
  const [status, setStatus] = useState<string[]>([]);
  const [previewMode, setPreviewMode] = useState<"edit" | "preview">("edit");

  const mdInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.success && state.slug) {
      router.push(`/blog/${state.slug}`);
    }
  }, [state, router]);

  const autoSlug = useCallback((value: string) => {
    setSlug(slugify(value));
  }, []);

  const handleMdFile = useCallback((file: File) => {
    setMdFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const raw = e.target?.result as string;
      const { meta, content: parsed } = parseFrontmatter(raw);
      if (meta.title) {
        setTitle(meta.title);
        autoSlug(meta.title);
      }
      if (meta.excerpt) setExcerpt(meta.excerpt);
      if (meta.tags) setTags(meta.tags);
      setContent(parsed);
    };
    reader.readAsText(file);
  }, [autoSlug]);

  const handleMdDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = Array.from(e.dataTransfer.files).find((f) =>
      f.name.endsWith(".md") || f.name.endsWith(".markdown")
    );
    if (file) handleMdFile(file);
  }, [handleMdFile]);

  const handleCoverChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImageFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => setCoverImagePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  }, []);

  const handleContentImageInsert = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newFiles = new Map(imageFiles);
    let updated = content;
    for (const file of Array.from(files)) {
      const placeholder = `![${file.name}](uploading:${file.name})`;
      updated += `\n\n${placeholder}`;
      newFiles.set(`uploading:${file.name}`, file);
    }
    setImageFiles(newFiles);
    setContent(updated);
  }, [content, imageFiles]);

  const handleSubmit = useCallback(async (formData: FormData) => {
    setStatus([]);

    // Upload cover image first
    if (coverImageFile) {
      setStatus((s) => [...s, "Uploading cover image..."]);
      const result = await uploadBlogImage(coverImageFile);
      if (result.success) {
        setUploadedCoverUrl(result.url);
        formData.set("cover_image", result.url);
        setStatus((s) => [...s, "Cover image uploaded."]);
      } else {
        setStatus((s) => [...s, `Cover upload failed: ${result.error}`]);
      }
    }

    // Process markdown images
    if (imageFiles.size > 0) {
      setStatus((s) => [...s, `Uploading ${imageFiles.size} embedded image(s)...`]);
      const processed = await processMarkdownImages(content, imageFiles);
      formData.set("content", processed);
      setStatus((s) => [...s, "Embedded images uploaded."]);
    }

    setStatus((s) => [...s, "Creating post..."]);
    formAction(formData);
  }, [coverImageFile, content, imageFiles, formAction]);

  return (
    <form action={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left: Form */}
      <div className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-xs font-mono text-text-muted mb-1.5 uppercase tracking-widest">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              autoSlug(e.target.value);
            }}
            required
            className="w-full rounded-xl border border-border-subtle bg-surface px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted outline-none transition-all focus:border-brand-purple/30 focus:ring-2 focus:ring-brand-purple/10"
            placeholder="My awesome post"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-xs font-mono text-text-muted mb-1.5 uppercase tracking-widest">
            Slug
          </label>
          <input
            type="text"
            name="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            className="w-full rounded-xl border border-border-subtle bg-surface px-4 py-2.5 text-sm text-text-primary font-mono placeholder:text-text-muted outline-none transition-all focus:border-brand-purple/30 focus:ring-2 focus:ring-brand-purple/10"
            placeholder="my-awesome-post"
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-xs font-mono text-text-muted mb-1.5 uppercase tracking-widest">
            Excerpt
          </label>
          <textarea
            name="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            className="w-full rounded-xl border border-border-subtle bg-surface px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted outline-none transition-all focus:border-brand-purple/30 focus:ring-2 focus:ring-brand-purple/10 resize-none"
            placeholder="Brief description of the post..."
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-xs font-mono text-text-muted mb-1.5 uppercase tracking-widest">
            Tags (comma separated)
          </label>
          <input
            type="text"
            name="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full rounded-xl border border-border-subtle bg-surface px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted outline-none transition-all focus:border-brand-purple/30 focus:ring-2 focus:ring-brand-purple/10"
            placeholder="react, nextjs, tutorial"
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-xs font-mono text-text-muted mb-1.5 uppercase tracking-widest">
            Cover Image
          </label>
          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            onChange={handleCoverChange}
            className="hidden"
          />
          {coverImagePreview ? (
            <div className="relative rounded-xl overflow-hidden border border-border-subtle">
              <img
                src={coverImagePreview}
                alt="Cover preview"
                className="w-full h-40 object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setCoverImageFile(null);
                  setCoverImagePreview("");
                  if (coverInputRef.current) coverInputRef.current.value = "";
                }}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-white hover:bg-black/80 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => coverInputRef.current?.click()}
              className="w-full h-32 rounded-xl border-2 border-dashed border-border-subtle hover:border-brand-purple/30 flex flex-col items-center justify-center gap-2 text-text-muted hover:text-text-secondary transition-colors"
            >
              <Upload size={20} />
              <span className="text-xs font-mono">Click to upload cover image</span>
            </button>
          )}
        </div>

        {/* Markdown File Upload */}
        <div>
          <label className="block text-xs font-mono text-text-muted mb-1.5 uppercase tracking-widest">
            Markdown File
          </label>
          <input
            ref={mdInputRef}
            type="file"
            accept=".md,.markdown,.mdx"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleMdFile(file);
            }}
            className="hidden"
          />
          <div
            ref={dropRef}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleMdDrop}
            onClick={() => mdInputRef.current?.click()}
            className="w-full py-6 rounded-xl border-2 border-dashed border-border-subtle hover:border-brand-purple/30 flex flex-col items-center justify-center gap-2 text-text-muted hover:text-text-secondary transition-colors cursor-pointer"
          >
            {mdFileName ? (
              <>
                <FileText size={20} className="text-neon-green" />
                <span className="text-xs font-mono text-neon-green">{mdFileName}</span>
                <span className="text-[10px] text-text-muted">Click or drop another file to replace</span>
              </>
            ) : (
              <>
                <Upload size={20} />
                <span className="text-xs font-mono">Drop .md file here or click to browse</span>
                <span className="text-[10px] text-text-muted">Supports frontmatter (title, excerpt, tags)</span>
              </>
            )}
          </div>
        </div>

        {/* Content */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-mono text-text-muted uppercase tracking-widest">
              Content
            </label>
            <div className="flex items-center gap-1">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleContentImageInsert}
                className="hidden"
                id="insert-image"
              />
              <label
                htmlFor="insert-image"
                className="text-[10px] font-mono text-text-muted hover:text-brand-purple cursor-pointer px-2 py-0.5 rounded bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
              >
                + image
              </label>
            </div>
          </div>
          <textarea
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={16}
            className="w-full rounded-xl border border-border-subtle bg-surface px-4 py-3 text-sm text-text-primary font-mono placeholder:text-text-muted outline-none transition-all focus:border-brand-purple/30 focus:ring-2 focus:ring-brand-purple/10 resize-y"
            placeholder="# Write your markdown here..."
          />
        </div>

        {/* Publish toggle */}
        <div className="flex items-center gap-3">
          <input type="hidden" name="published" value="false" />
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="published"
              value="true"
              className="sr-only peer"
              defaultChecked
            />
            <div className="w-9 h-5 rounded-full bg-white/10 peer peer-checked:bg-brand-purple/60 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full" />
          </label>
          <span className="text-sm text-text-secondary">Publish immediately</span>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending || !title || !slug || !content}
          className="w-full py-3 rounded-xl font-medium text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-brand-purple hover:bg-brand-purple/90 text-white shadow-[0_0_20px_rgba(124,58,237,0.2)] hover:shadow-[0_0_30px_rgba(124,58,237,0.3)]"
        >
          {isPending ? "Publishing..." : "Publish Post"}
        </button>

        {/* Status messages */}
        <AnimatePresence>
          {status.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="rounded-xl bg-white/[0.03] p-4 font-mono text-xs space-y-1"
            >
              {status.map((s, i) => (
                <p key={i} className="text-text-muted">
                  <span className="text-brand-purple">$</span> {s}
                </p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error */}
        {state.error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono"
          >
            <AlertCircle size={14} />
            {state.error}
          </motion.div>
        )}

        {/* Success */}
        {state.success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 p-3 rounded-xl bg-neon-green/10 border border-neon-green/20 text-neon-green text-xs font-mono"
          >
            <Check size={14} />
            Post created successfully! Redirecting...
          </motion.div>
        )}
      </div>

      {/* Right: Preview */}
      <div className="lg:sticky lg:top-32 lg:self-start">
        <div className="flex items-center gap-2 mb-3">
          <button
            type="button"
            onClick={() => setPreviewMode("edit")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              previewMode === "edit"
                ? "bg-brand-purple/10 text-brand-purple"
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            <Edit3 size={12} /> Edit
          </button>
          <button
            type="button"
            onClick={() => setPreviewMode("preview")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              previewMode === "preview"
                ? "bg-brand-purple/10 text-brand-purple"
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            <Eye size={12} /> Preview
          </button>
        </div>

        <div className="rounded-xl border border-border-subtle bg-surface/50 p-6 min-h-[400px]">
          {previewMode === "preview" && content ? (
            <div>
              {title && (
                <h1 className="text-2xl font-bold text-text-primary mb-4">
                  {title}
                </h1>
              )}
              {excerpt && (
                <p className="text-text-secondary mb-6 leading-relaxed">
                  {excerpt}
                </p>
              )}
              <div className="h-px bg-gradient-to-r from-brand-purple/30 via-brand-cyan/20 to-transparent mb-6" />
              <MarkdownRenderer content={content} />
            </div>
          ) : previewMode === "preview" ? (
            <div className="flex items-center justify-center h-64 text-text-muted text-sm font-mono">
              Write some content to see preview...
            </div>
          ) : (
            <div className="text-text-muted text-sm font-mono">
              <p className="mb-2 text-text-secondary">Markdown source:</p>
              <pre className="whitespace-pre-wrap text-xs leading-relaxed max-h-[500px] overflow-y-auto">
                {content || "# Your content here..."}
              </pre>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
