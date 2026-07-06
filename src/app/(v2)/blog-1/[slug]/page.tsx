import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getAllSlugs, getPostBySlug } from "@/lib/blog";
import Reveal from "@/components/v2/chrome/Reveal";
import ArticleBody from "@/components/v2/blog/ArticleBody";
import { segmentArticle, countImages } from "@/lib/article-segments";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

const MUTED = "#8B8F86";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post not found — ERIC ESCAPES" };
  }

  return {
    title: `${post.title} — ERIC ESCAPES`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.featured ? [post.featured] : undefined,
    },
  };
}

/** "12 Jan 2026" — DD MMM YYYY, matching the prototype data line. */
function formatFullDate(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const fullDate = formatFullDate(post.date);
  const primaryCategory = post.categories[0] ?? "Diary";

  // Kicker: "Diary · {category} · {date}".
  const kickerParts = ["Diary", primaryCategory, fullDate].filter(Boolean);

  // Data line — degraded (no fabricated coords/frame-count): the signature
  // richness only exists for travel diaries in the prototype; ours builds from
  // real data only. "{category} · {date} · {N} images" (frames only when >0).
  const imageCount = countImages(segmentArticle(post.content));
  const dataLineParts = [
    primaryCategory,
    fullDate,
    imageCount > 0 ? `${imageCount} frame${imageCount === 1 ? "" : "s"}` : "",
  ].filter(Boolean);

  // Prev / next by date order. getAllPosts() is newest-first, so the OLDER
  // neighbour (prev) is at index+1 and the NEWER (next) is at index-1.
  const all = getAllPosts();
  const idx = all.findIndex((p) => p.slug === post.slug);
  const prev = idx >= 0 && idx + 1 < all.length ? all[idx + 1] : null;
  const next = idx > 0 ? all[idx - 1] : null;

  return (
    <article className="ee-article" style={{ position: "relative", zIndex: 1 }}>
      {/* Header block */}
      <div
        style={{
          maxWidth: 860,
          margin: "0 auto",
          padding: "64px var(--ee-gutter, 40px) 0",
        }}
      >
        <Reveal>
          <Link
            href="/blog-1"
            className="ee-artnav-back"
            style={{
              display: "inline-block",
              fontSize: 11.5,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: MUTED,
              textDecoration: "none",
              transition: "color 120ms ease",
            }}
          >
            ← Visual Diaries
          </Link>

          <div
            style={{
              marginTop: 42,
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            {kickerParts.join(" · ")}
          </div>

          <h1
            className="ee-article-title"
            style={{
              marginTop: 18,
              marginBottom: 0,
              fontWeight: 600,
              lineHeight: 1.02,
              letterSpacing: "-0.01em",
              textWrap: "balance",
            }}
          >
            {post.title}
          </h1>

          {dataLineParts.length > 0 ? (
            <div
              style={{
                marginTop: 20,
                fontSize: 12,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: MUTED,
              }}
            >
              {dataLineParts.join(" · ")}
            </div>
          ) : null}
        </Reveal>
      </div>

      {/* Prose panels + full-bleed photo breaks */}
      <ArticleBody content={post.content} />

      {/* Sign-off */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 var(--ee-gutter, 40px) 40px" }}>
        <div
          style={{
            marginTop: 34,
            fontSize: 12,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          Eric
        </div>
      </div>

      {/* Prev / next */}
      {prev || next ? (
        <div
          style={{ maxWidth: 860, margin: "40px auto 110px", padding: "0 var(--ee-gutter, 40px)" }}
        >
          <Reveal
            className="ee-artnav-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              borderTop: "1px solid rgba(242,239,230,0.13)",
              borderBottom: "1px solid rgba(242,239,230,0.13)",
            }}
          >
            <div
              className="ee-artnav-cell ee-artnav-prev"
              style={{
                padding: "26px 28px 26px 0",
                borderRight: "1px solid rgba(242,239,230,0.09)",
              }}
            >
              {prev ? (
                <Link
                  href={`/blog-1/${prev.slug}`}
                  style={{ textDecoration: "none", color: "inherit", display: "block" }}
                >
                  <div
                    className="ee-artnav-label"
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: MUTED,
                      transition: "color 120ms ease",
                    }}
                  >
                    ← Prev
                  </div>
                  <div style={{ marginTop: 10, fontSize: 20, fontWeight: 500, lineHeight: 1.2 }}>
                    {prev.title}
                  </div>
                </Link>
              ) : null}
            </div>

            <div
              className="ee-artnav-cell ee-artnav-next"
              style={{ padding: "26px 0 26px 28px", textAlign: "right" }}
            >
              {next ? (
                <Link
                  href={`/blog-1/${next.slug}`}
                  style={{ textDecoration: "none", color: "inherit", display: "block" }}
                >
                  <div
                    className="ee-artnav-label"
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: MUTED,
                      transition: "color 120ms ease",
                    }}
                  >
                    Next →
                  </div>
                  <div style={{ marginTop: 10, fontSize: 20, fontWeight: 500, lineHeight: 1.2 }}>
                    {next.title}
                  </div>
                </Link>
              ) : null}
            </div>
          </Reveal>
        </div>
      ) : null}
    </article>
  );
}
