import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostFrontmatter = {
  title: string;
  date: string;
  author: string;
  categories: string[];
  tags: string[];
  excerpt: string;
  featured: string;
  slug: string;
};

export type PostSummary = PostFrontmatter;

export type Post = PostFrontmatter & {
  content: string;
};

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

/**
 * Normalise gray-matter's loosely-typed `data` blob into a strict
 * PostFrontmatter, filling in safe defaults for anything missing or
 * malformed rather than throwing at build time.
 */
function normaliseFrontmatter(
  data: Record<string, unknown>,
  fallbackSlug: string,
): PostFrontmatter {
  const title = typeof data.title === "string" ? data.title : fallbackSlug;
  const date = typeof data.date === "string" ? data.date : "";
  const author = typeof data.author === "string" ? data.author : "Eric Kowalczyk";
  const categories = isStringArray(data.categories) ? data.categories : [];
  const tags = isStringArray(data.tags) ? data.tags : [];
  const excerpt = typeof data.excerpt === "string" ? data.excerpt : "";
  const featured = typeof data.featured === "string" ? data.featured : "";
  const slug = typeof data.slug === "string" ? data.slug : fallbackSlug;

  return { title, date, author, categories, tags, excerpt, featured, slug };
}

function readMarkdownFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".md"));
}

/**
 * Reads every content/blog/*.md file and returns typed post summaries
 * (frontmatter only, no body), sorted newest first by date.
 */
export function getAllPosts(): PostSummary[] {
  const files = readMarkdownFiles();

  const posts = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const fullPath = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(raw);
    return normaliseFrontmatter(data, slug);
  });

  return posts.sort((a, b) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;
    return dateB - dateA;
  });
}

/**
 * Reads a single post by slug, returning frontmatter + raw markdown body.
 * Returns null if the post file doesn't exist.
 */
export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = normaliseFrontmatter(data, slug);

  return { ...frontmatter, content };
}

/**
 * All post slugs, for generateStaticParams.
 */
export function getAllSlugs(): string[] {
  return readMarkdownFiles().map((file) => file.replace(/\.md$/, ""));
}
