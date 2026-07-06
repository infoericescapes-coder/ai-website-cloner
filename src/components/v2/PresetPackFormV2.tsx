"use client";

import { useState, type FormEvent } from "react";
import LedDot from "@/components/v2/chrome/LedDot";

/**
 * Preset-pack signup, v2 dark skin. WIRING LOCK: identical to the retired v1
 * PresetPackForm — same MailerLite form (188824634630604255, acct 2376297),
 * native POST to a hidden iframe (avoids CORS on fetch), then redirect to the
 * Gumroad preset pack after REDIRECT_DELAY_MS. Keeps BOTH fields (name +
 * required email) so the submitted record matches the old form exactly. Only
 * the presentation changed: underline inputs on the dark panel.
 */

const MAILERLITE_ACTION =
  "https://assets.mailerlite.com/jsonp/2376297/forms/188824634630604255/subscribe";
const GUMROAD_REDIRECT_URL = "https://ericescape.gumroad.com/l/jetyik";
const IFRAME_TARGET = "ml-sink-preset";
const REDIRECT_DELAY_MS = 1800;

export default function PresetPackFormV2() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    if (!email) {
      e.preventDefault();
      return;
    }
    // Native cross-origin POST goes to the hidden iframe; flip UI + redirect.
    setSubmitted(true);
    window.setTimeout(() => {
      window.location.href = GUMROAD_REDIRECT_URL;
    }, REDIRECT_DELAY_MS);
  }

  if (submitted) {
    return (
      <div className="flex items-center" style={{ gap: 12 }}>
        <LedDot size={5} />
        <span
          style={{
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: "0.2em",
            color: "var(--ee-text)",
          }}
        >
          SUBSCRIBED · PRESET PACK ON ITS WAY
        </span>
      </div>
    );
  }

  return (
    <>
      <iframe name={IFRAME_TARGET} className="hidden" title="MailerLite subscribe target" />
      <form
        action={MAILERLITE_ACTION}
        method="post"
        target={IFRAME_TARGET}
        onSubmit={handleSubmit}
        className="flex w-full flex-col"
        style={{ gap: 22 }}
      >
        <input type="hidden" name="ml-submit" value="1" />
        <input type="hidden" name="anticsrf" value="true" />

        <label htmlFor="preset-name" className="sr-only">
          Name
        </label>
        <input
          id="preset-name"
          type="text"
          name="fields[name]"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="ee-sub-input"
          style={{
            background: "transparent",
            border: "none",
            borderBottom: "1px solid rgba(242,239,230,0.28)",
            padding: "9px 2px",
            fontSize: 13,
            letterSpacing: "0.08em",
            color: "var(--ee-text)",
            outline: "none",
            borderRadius: 0,
          }}
        />

        <label htmlFor="preset-email" className="sr-only">
          Email address
        </label>
        <input
          id="preset-email"
          type="email"
          name="fields[email]"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="ee-sub-input"
          style={{
            background: "transparent",
            border: "none",
            borderBottom: "1px solid rgba(242,239,230,0.28)",
            padding: "9px 2px",
            fontSize: 13,
            letterSpacing: "0.08em",
            color: "var(--ee-text)",
            outline: "none",
            borderRadius: 0,
          }}
        />

        <button
          type="submit"
          className="ee-sub-submit flex items-center self-start"
          style={{
            marginTop: 6,
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
          GET THE PRESETS →
        </button>
      </form>
    </>
  );
}
