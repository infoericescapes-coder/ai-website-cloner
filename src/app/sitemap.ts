import type { MetadataRoute } from "next";
import { getAllPosts, getAllSlugs } from "@/lib/blog";

const BASE_URL = "https://www.ericescapes.com";

/**
 * Static, non-dynamic routes enumerated from src/app/**\/page.tsx.
 * Dynamic templates (blog-1/[slug]) are excluded here and generated
 * from the content layer below. "/" replaces the live site's /home
 * (see docs/research/redirect-map.md — /home -> / alias).
 */
const STATIC_ROUTES = [
  "/",
  "/about",
  "/austria",
  "/blog-1",
  "/cenycoast",
  "/chaostocalm",
  "/dolomites",
  "/free-1",
  // /gallery-1-1 is an unpopulated placeholder stub — kept reachable by URL but
  // excluded from the sitemap + marked noindex (see its page metadata) until
  // real gallery content lands.
  "/hallstatt",
  "/italy1",
  "/japan",
  "/kosciuszko-25",
  "/melbourne",
  "/my-gear",
  "/prints-1",
  "/salzburg",
  "/sapphirecoast",
  "/slovenia",
  "/social-lander",
  "/special",
  "/store",
  // /store/p/visual-diary-collection-lightroom-presets 301s to /store
  // (next.config.ts) — redirecting URLs stay out of the sitemap.
  "/sydney",
  "/sydney2",
  "/verona",
  "/vietnam",
  "/vietnam2",
] as const;

/**
 * Blog archive routes, mirrored 1:1 from the live Squarespace sitemap
 * (https://www.ericescapes.com/sitemap.xml). Names keep the SAME URL
 * encoding the live site uses — spaces are "+" (e.g. Film+Simulations)
 * — so the clone's archive URLs match the originals exactly.
 */
const CATEGORY_ARCHIVES = [
  "Diary",
  "Film+Simulations",
  "FujiFilm",
  "Gear",
  "Guide",
  "Inspiration",
  "Lesson",
  "Photography",
  "Review",
  "Travel",
] as const;

const TAG_ARCHIVES = [
  "Film+Simulations",
  "FujiFilm",
  "Gear",
  "Guide",
  "Inspiration",
  "Journal",
  "Lesson",
  "Photography",
  "Review",
  "Story",
  "iPad",
  "iPadOS",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
  }));

  const archiveEntries: MetadataRoute.Sitemap = [
    ...CATEGORY_ARCHIVES.map((name) => `/blog-1/category/${name}`),
    ...TAG_ARCHIVES.map((name) => `/blog-1/tag/${name}`),
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
  }));

  // Post lastModified = the post's own frontmatter date (fall back to now
  // if a post has no parseable date).
  const dateBySlug = new Map(
    getAllPosts().map((post) => [post.slug, post.date] as const),
  );

  const postEntries: MetadataRoute.Sitemap = getAllSlugs().map((slug) => {
    const rawDate = dateBySlug.get(slug);
    const parsed = rawDate ? new Date(rawDate) : null;
    const lastModified =
      parsed && !Number.isNaN(parsed.getTime()) ? parsed : now;
    return {
      url: `${BASE_URL}/blog-1/${slug}`,
      lastModified,
    };
  });

  return [...staticEntries, ...archiveEntries, ...postEntries];
}
