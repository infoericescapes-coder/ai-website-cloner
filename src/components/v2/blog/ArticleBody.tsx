import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import Reveal from "@/components/v2/chrome/Reveal";
import { segmentArticle, countImages } from "@/lib/article-segments";

/**
 * Diary article body — alternates centred prose panels (#0B0D0B, max-width 860,
 * 17.5px/1.75) with full-bleed photo breaks that break out onto the canvas.
 * Spec: docs/design-v2/specs/article.md §2/§3. Segmentation logic lives in
 * src/lib/article-segments.ts (raw-markdown split, zero content drift).
 *
 * Full-bleed mechanic: prose panels sit in the normal 860px column; image
 * breaks use the `.ee-article-fullbleed` escape (100vw, centred) so they span
 * the whole canvas between passages, with mount hairlines top + bottom.
 */

const MUTED = "#8B8F86";

/**
 * Inside a prose panel the block-level image case should never occur (all
 * images are promoted to full-bleed breaks upstream), but guard defensively:
 * render any stray inline/edge-case image full-width rather than dropping it.
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
        style={{ display: "block", width: "100%", height: "auto", margin: "26px 0" }}
      />
    );
  },
};

function ProsePanel({ markdown, first }: { markdown: string; first: boolean }) {
  return (
    <div
      className="ee-article-prosewrap"
      style={{
        maxWidth: 860,
        margin: first ? "52px auto 0" : "0 auto",
        padding: "0 var(--ee-gutter, 40px)",
      }}
    >
      <Reveal
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
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={proseComponents}>
          {markdown}
        </ReactMarkdown>
      </Reveal>
    </div>
  );
}

function PhotoBreak({
  src,
  alt,
  index,
  total,
}: {
  src: string;
  alt: string;
  index: number;
  total: number;
}) {
  // Caption: use alt text when the author supplied it, else a simple frame
  // index. Never fabricate times/locations (article.md §3 data note).
  const label = alt.trim().length > 0 ? alt.trim() : `Frame ${String(index).padStart(2, "0")}/${total}`;

  return (
    <Reveal className="ee-article-fullbleed" style={{ margin: "72px 0" }}>
      <div style={{ borderTop: "1px solid rgba(242,239,230,0.09)" }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={{
          display: "block",
          width: "100%",
          height: "70vh",
          objectFit: "cover",
          objectPosition: "50% 50%",
        }}
      />
      <div style={{ borderBottom: "1px solid rgba(242,239,230,0.09)" }} />
      <div
        style={{
          marginTop: 13,
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

  const firstProseIndex = segments.findIndex((seg) => seg.kind !== "image");

  return (
    <div>
      {segments.map((seg, i) => {
        if (seg.kind === "image") {
          return (
            <PhotoBreak
              key={`img-${i}`}
              src={seg.src}
              alt={seg.alt}
              index={seg.index}
              total={total}
            />
          );
        }
        return (
          <ProsePanel key={`prose-${i}`} markdown={seg.markdown} first={i === firstProseIndex} />
        );
      })}
    </div>
  );
}
