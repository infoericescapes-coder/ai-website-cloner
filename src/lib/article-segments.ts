/**
 * Diary-article markdown segmentation (article.md §2/§3).
 *
 * The prototype hand-authored an alternation of centred prose panels and
 * full-bleed photo breaks. Real posts are Markdown where every body image is a
 * standalone line `![alt](src)` (verified across all 70 posts — no inline or
 * mid-paragraph images). We derive the alternation from that structure:
 *
 *   - each run of prose between images -> one prose panel (rendered markdown)
 *   - each body image -> one full-bleed photo break
 *
 * Splitting the RAW markdown (rather than post-processing the react-markdown
 * AST) keeps ordering byte-exact and is robust to the client/server boundary.
 * ZERO content drift: prose text and image order are preserved verbatim; the
 * only thing dropped between segments is the blank-line whitespace that
 * separated block-level nodes anyway.
 */

export type ArticleSegment =
  | { kind: "prose"; markdown: string }
  | { kind: "image"; src: string; alt: string; index: number };

/**
 * Matches a whole line that is exactly a single markdown image:
 * `![alt](src)` with optional surrounding whitespace. Title syntax
 * `![alt](src "title")` is tolerated (src is captured up to the first space
 * or paren). No post uses inline images, so this line-level test is safe.
 */
const IMAGE_LINE = /^\s*!\[([^\]]*)\]\(([^)\s]+)(?:\s+[^)]*)?\)\s*$/;

export function segmentArticle(markdown: string): ArticleSegment[] {
  const lines = markdown.split(/\r?\n/);
  const segments: ArticleSegment[] = [];
  let prose: string[] = [];
  let imageIndex = 0;

  const flushProse = () => {
    // Trim leading/trailing blank lines but keep interior structure intact.
    const text = prose.join("\n").replace(/^\n+/, "").replace(/\n+$/, "");
    if (text.trim().length > 0) {
      segments.push({ kind: "prose", markdown: text });
    }
    prose = [];
  };

  for (const line of lines) {
    const match = IMAGE_LINE.exec(line);
    if (match) {
      flushProse();
      imageIndex += 1;
      segments.push({
        kind: "image",
        alt: match[1] ?? "",
        src: match[2],
        index: imageIndex,
      });
    } else {
      prose.push(line);
    }
  }
  flushProse();

  return segments;
}

/** Total body-image count — for "Frame NN/total" captions. */
export function countImages(segments: ArticleSegment[]): number {
  return segments.filter((s) => s.kind === "image").length;
}
