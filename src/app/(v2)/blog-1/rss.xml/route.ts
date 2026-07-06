import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-static";

const BASE_URL = "https://www.ericescapes.com";
const CHANNEL_TITLE = "ERIC ESCAPES";
const CHANNEL_LINK = `${BASE_URL}/blog-1`;
const CHANNEL_DESCRIPTION =
  "A blog chronicling my journey through photography, travel, and the pursuit of epic light.";

/** Escape a value for safe use in an XML attribute or text node. */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Wrap free text (which may contain markup) in a CDATA section. */
function cdata(value: string): string {
  // Guard against a literal CDATA terminator inside the payload.
  return `<![CDATA[${value.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;
}

/** Format a frontmatter date string as an RFC822 pubDate, or "" if unparseable. */
function toRfc822(date: string): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toUTCString();
}

export async function GET(): Promise<Response> {
  const posts = getAllPosts(); // already sorted newest-first by date

  const items = posts
    .map((post) => {
      const link = `${BASE_URL}/blog-1/${post.slug}`;
      const pubDate = toRfc822(post.date);
      const categories = post.categories
        .map((category) => `<category>${escapeXml(category)}</category>`)
        .join("");

      return [
        "<item>",
        `<title>${escapeXml(post.title)}</title>`,
        `<link>${escapeXml(link)}</link>`,
        `<guid isPermaLink="true">${escapeXml(link)}</guid>`,
        pubDate ? `<pubDate>${pubDate}</pubDate>` : "",
        post.author ? `<dc:creator>${cdata(post.author)}</dc:creator>` : "",
        categories,
        `<description>${cdata(post.excerpt)}</description>`,
        "</item>",
      ]
        .filter(Boolean)
        .join("");
    })
    .join("");

  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<rss xmlns:content="http://purl.org/rss/1.0/modules/content/" ' +
    'xmlns:dc="http://purl.org/dc/elements/1.1/" version="2.0">' +
    "<channel>" +
    `<title>${escapeXml(CHANNEL_TITLE)}</title>` +
    `<link>${escapeXml(CHANNEL_LINK)}</link>` +
    `<description>${cdata(CHANNEL_DESCRIPTION)}</description>` +
    "<language>en-AU</language>" +
    items +
    "</channel>" +
    "</rss>";

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
