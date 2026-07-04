"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";

const MAILERLITE_ACTION =
  "https://assets.mailerlite.com/jsonp/2376297/forms/188824634630604255/subscribe";
const GUMROAD_REDIRECT_URL = "https://ericescape.gumroad.com/l/jetyik";
const IFRAME_TARGET = "ml-sink";
const REDIRECT_DELAY_MS = 1800;

export default function PresetPackForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    if (!email) {
      e.preventDefault();
      return;
    }
    // The form posts natively to the hidden iframe target below, so the
    // browser performs the real cross-origin submit (avoids CORS on fetch).
    setSubmitted(true);
    window.setTimeout(() => {
      window.location.href = GUMROAD_REDIRECT_URL;
    }, REDIRECT_DELAY_MS);
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-md text-center">
        <p className="font-heading text-lg">
          Thank you! You have successfully joined our subscriber list.
        </p>
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
        className="mx-auto flex w-full max-w-xl flex-col gap-3 sm:flex-row"
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
          className="h-12 w-full flex-1 border border-black/20 bg-white px-4 text-base text-black placeholder:text-black/40 focus:border-black focus:outline-none"
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
          className="h-12 w-full flex-1 border border-black/20 bg-white px-4 text-base text-black placeholder:text-black/40 focus:border-black focus:outline-none"
        />
        <Button
          type="submit"
          className="h-12 shrink-0 rounded-none bg-white px-6 text-base font-bold text-black hover:bg-[#333333] hover:text-white"
        >
          Get the Presets
        </Button>
      </form>
    </>
  );
}
