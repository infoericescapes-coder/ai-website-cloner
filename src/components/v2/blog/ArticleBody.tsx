import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import Reveal from "@/components/v2/chrome/Reveal";
import { segmentArticle, countImages, type ArticleSegment } from "@/lib/article-segments";

/**
 * Diary article body — ONE continuous lifted panel (#0B0D0B, max-width 860,
 * 17.5px/1.75) containing both prose and photos.
 *
 * ERIC DESIGN OVERRIDE (live review, 2026-07-06; supersedes
 * docs/design-v2/specs/article.md §3 photo breaks): article images must NOT
 * break out full-bleed onto the canvas. They render INSIDE the same panel as
 * the text, at the text column width, as mounted frames (#2B2D2C mount +
 * 1px hairline — gallery.md mounted-mode vocabulary). Named test case:
 * /blog-1/the-cure-to-gas ("images are not aligned with text").
 *
 * Segmentation is unchanged (src/lib/article-segments.ts, raw-markdown split,
 * zero content drift) — only the RENDERING of image segments moved from
 * full-bleed breaks to panel-internal mounted frames.
 *
 * Spacing rhythm (deliberate, consistent):
 *   prose ↔ image           44px
 *   image → image (a run)   28px (tighter — reads as a stacked sequence)
 *   first/last segment      0 extra — the panel padding owns the edges
 *     (.ee-article-prose > *:first/last-child strip markdown edge margins).
 */

const MUTED = "#8B8F86";
const HAIRLINE = "1px solid rgba(242,239,230,0.16)";

/** Gap above a segment, given what precedes it. */
function gapAbove(segments: ArticleSegment[], i: number): number {
  if (i === 0) return 0;
  const prev = segments[i - 1];
  const curr = segments[i];
  if (prev?.kind === "image" && curr?.kind === "image") return 28;
  return 44;
}

/**
 * Inside a prose segment the block-level image case should never occur (all
 * standalone image lines are split out upstream), but guard defensively:
 * render any stray inline/edge-case image as a column-width mounted frame
 * rather than dropping it — same treatment as the promoted segments.
 */
const proseComponents: Components = {
  img: ({ src, alt }) => {
    if (typeof src !== "string") return null;
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt ?? ""}
        loading="lazy"
        style={{
          display: "block",
          width: "100%",
          height: "auto",
          margin: "26px 0",
          background: "var(--ee-mount)",
          border: HAIRLINE,
          padding: 10,
        }}
      />
    );
  },
};

function ProseBlock({ markdown, marginTop }: { markdown: string; marginTop: number }) {
  return (
    <Reveal className="ee-article-prose" style={{ marginTop }}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={proseComponents}>
        {markdown}
      </ReactMarkdown>
    </Reveal>
  );
}

function MountedPhoto({
  src,
  alt,
  index,
  total,
  marginTop,
}: {
  src: string;
  alt: string;
  index: number;
  total: number;
  marginTop: number;
}) {
  // Caption: use alt text when the author supplied it, else a simple frame
  // index. Never fabricate times/locations (article.md §3 data note).
  const label =
    alt.trim().length > 0 ? alt.trim() : `Frame ${String(index).padStart(2, "0")}/${total}`;

  return (
    <Reveal className="ee-article-photo" style={{ marginTop }}>
      {/* Mount: #2B2D2C bed + 1px hairline, image at natural aspect, full
          column width — aligned with the prose either side of it. */}
      <div style={{ background: "var(--ee-mount)", border: HAIRLINE, padding: 10 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          style={{ display: "block", width: "100%", height: "auto" }}
        />
      </div>
      <div
        style={{
          marginTop: 12,
          textAlign: "center",
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: MUTED,
        }}
      >
        {label}
      </div>
    </Reveal>
  );
}

export default function ArticleBody({ content }: { content: string }) {
  const segments = segmentArticle(content);
  const total = countImages(segments);

  return (
    <div
      className="ee-article-prosewrap"
      style={{
        maxWidth: 860,
        margin: "52px auto 0",
        padding: "0 var(--ee-gutter, 40px)",
      }}
    >
      <div
        className="ee-article-panel"
        style={{
          background: "var(--ee-panel)",
          border: "1px solid rgba(242,239,230,0.08)",
          padding: "var(--ee-panelpad, 56px 72px)",
          fontSize: 17.5,
          lineHeight: 1.75,
          color: "var(--ee-text)",
        }}
      >
        {segments.map((seg, i) => {
          const marginTop = gapAbove(segments, i);
          if (seg.kind === "image") {
            return (
              <MountedPhoto
                key={`img-${i}`}
                src={seg.src}
                alt={seg.alt}
                index={seg.index}
                total={total}
                marginTop={marginTop}
              />
            );
          }
          return <ProseBlock key={`prose-${i}`} markdown={seg.markdown} marginTop={marginTop} />;
        })}
      </div>
    </div>
  );
}
