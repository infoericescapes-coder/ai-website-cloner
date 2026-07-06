import Header from "@/components/Header";
import Footer from "@/components/Footer";

/**
 * V1Shell — the OLD site chrome, exactly as the root layout used to render it
 * before the layout-group separation: old Header, padded <main>, old Footer,
 * `font-body` (Open Sans) cascade.
 *
 * Used by `src/app/(v1)/layout.tsx` (every un-migrated route) and by the
 * global `src/app/not-found.tsx` (which renders under the BARE root layout,
 * so it must bring its own chrome).
 *
 * `min-h-svh` replaces the old `body.min-h-full` (100% of `html.h-full`, i.e.
 * the small viewport height) now that the flex column lives on a div instead
 * of <body> — a percentage min-height would resolve against an auto-height
 * parent and collapse.
 */
export default function V1Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col font-body">
      <Header />
      <main className="flex-1 pt-[100px] md:pt-[174px]">{children}</main>
      <Footer />
    </div>
  );
}
