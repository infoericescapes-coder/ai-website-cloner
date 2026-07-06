"use client";

import { useState, type FormEvent } from "react";
import Reveal from "@/components/v2/chrome/Reveal";
import LedDot from "@/components/v2/chrome/LedDot";

/**
 * Subscribe bar (home-archive.md §7 → shell.md §4). Dark panel with 4 accent
 * corner brackets, left copy block + right email field. Wired to the SAME
 * MailerLite form as PresetPackForm (form 188824634630604255, acct 2376297):
 * native POST to a hidden iframe (avoids CORS on fetch), then redirect to the
 * Gumroad preset pack. On submit → the subscribed state (LED dot + confirmation
 * line) per §4 before the redirect fires.
 */

const MAILERLITE_ACTION =
  "https://assets.mailerlite.com/jsonp/2376297/forms/188824634630604255/subscribe";
const GUMROAD_REDIRECT_URL = "https://ericescape.gumroad.com/l/jetyik";
const IFRAME_TARGET = "ml-sink-subscribe";
const REDIRECT_DELAY_MS = 1800;

export default function SubscribeBar() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    if (!email) {
      e.preventDefault();
      return;
    }
    // Native cross-origin POST goes to the hidden iframe; we flip UI + redirect.
    setSubmitted(true);
    window.setTimeout(() => {
      window.location.href = GUMROAD_REDIRECT_URL;
    }, REDIRECT_DELAY_MS);
  }

  const bracket = { position: "absolute" as const, width: 14, height: 14 };

  return (
    <Reveal
      as="section"
      className="ee-gutter"
      style={{ maxWidth: 1560, margin: "0 auto", paddingBottom: 76 }}
    >
      <div
        className="flex flex-wrap items-center justify-between"
        style={{
          position: "relative",
          background: "var(--ee-panel)",
          border: "1px solid rgba(242,239,230,0.07)",
          padding: "28px 22px",
          gap: 56,
        }}
      >
        {/* 4 corner brackets */}
        <span aria-hidden style={{ ...bracket, top: -1, left: -1, borderTop: "1px solid rgba(242,239,230,0.45)", borderLeft: "1px solid rgba(242,239,230,0.45)" }} />
        <span aria-hidden style={{ ...bracket, top: -1, right: -1, borderTop: "1px solid rgba(242,239,230,0.45)", borderRight: "1px solid rgba(242,239,230,0.45)" }} />
        <span aria-hidden style={{ ...bracket, bottom: -1, left: -1, borderBottom: "1px solid rgba(242,239,230,0.45)", borderLeft: "1px solid rgba(242,239,230,0.45)" }} />
        <span aria-hidden style={{ ...bracket, bottom: -1, right: -1, borderBottom: "1px solid rgba(242,239,230,0.45)", borderRight: "1px solid rgba(242,239,230,0.45)" }} />

        {/* Left copy block */}
        <div className="flex flex-col" style={{ minWidth: 300, gap: 13 }}>
          <span
            style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.24em", color: "var(--ee-text)" }}
          >
            JOURNAL UPDATES{" "}
            <span style={{ color: "var(--ee-accent)" }}>+ FREE PRESET PACK</span>
          </span>
          <span
            style={{ fontSize: 12.5, letterSpacing: "0.06em", lineHeight: 1.75, color: "var(--ee-muted)" }}
          >
            Drop your email, get the Visual Diary preset pack free.
            <br />
            Plus stories from the road. No spam. Just photography.
          </span>
        </div>

        {/* Right — form or subscribed state */}
        {submitted ? (
          <div className="flex items-center" style={{ gap: 12, flex: 1, minWidth: 340 }}>
            <LedDot size={5} />
            <span
              style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.2em", color: "var(--ee-text)" }}
            >
              SUBSCRIBED · PRESET PACK ON ITS WAY
            </span>
          </div>
        ) : (
          <>
            <iframe name={IFRAME_TARGET} className="hidden" title="MailerLite subscribe target" />
            <form
              action={MAILERLITE_ACTION}
              method="post"
              target={IFRAME_TARGET}
              onSubmit={handleSubmit}
              className="flex items-end"
              style={{ gap: 30, flex: 1, maxWidth: 600, minWidth: 340 }}
            >
              <input type="hidden" name="ml-submit" value="1" />
              <input type="hidden" name="anticsrf" value="true" />
              <label htmlFor="subscribe-email" className="sr-only">
                Email address
              </label>
              <input
                id="subscribe-email"
                type="email"
                name="fields[email]"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="ee-sub-input"
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid rgba(242,239,230,0.28)",
                  padding: "9px 2px",
                  fontSize: 12.5,
                  letterSpacing: "0.1em",
                  color: "var(--ee-text)",
                  outline: "none",
                  borderRadius: 0,
                }}
              />
              <button
                type="submit"
                className="ee-sub-submit flex items-center"
                style={{
                  paddingBottom: 9,
                  gap: 9,
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  color: "var(--ee-accent)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  transition: "filter 120ms ease",
                }}
              >
                SUBSCRIBE →
              </button>
            </form>
          </>
        )}
      </div>
    </Reveal>
  );
}
