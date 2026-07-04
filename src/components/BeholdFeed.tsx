"use client";

import Script from "next/script";

const BEHOLD_FEED_ID = "rAfeJ0kqND2SHoZkoZoz";

export default function BeholdFeed() {
  return (
    <>
      <Script
        src="https://w.behold.so/widget.js"
        type="module"
        strategy="afterInteractive"
      />
      {/* Cap the host width so Behold's internal grid fills it flush-left,
          keeping the eyebrow and @handle aligned with the photo tiles. */}
      <behold-widget
        feed-id={BEHOLD_FEED_ID}
        suppressHydrationWarning
        className="block w-full max-w-[620px]"
      />
    </>
  );
}
