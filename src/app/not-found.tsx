import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found — ERIC ESCAPES",
};

export default function NotFound() {
  return (
    <section className="bg-white text-black">
      <div className="mx-auto flex min-h-[60vh] max-w-[720px] flex-col justify-center px-6 py-24 md:py-32">
        <p className="eyebrow mb-6">404</p>
        <h1 className="font-heading text-4xl font-semibold leading-tight md:text-6xl">
          Page not found
        </h1>
        <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-black/70">
          This one is off the map. The page you were after has moved or never
          existed. Head back and find your way from there.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/"
            className="border border-black px-6 py-3 text-sm font-medium transition-colors hover:bg-black hover:text-white"
          >
            Back to home
          </Link>
          <Link
            href="/blog-1"
            className="border border-black/20 px-6 py-3 text-sm font-medium transition-colors hover:border-black"
          >
            Read the blog
          </Link>
        </div>
      </div>
    </section>
  );
}
