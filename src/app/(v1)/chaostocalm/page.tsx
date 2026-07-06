import type { Metadata } from "next";
import styles from "./chaostocalm.module.css";

export const metadata: Metadata = {
  title: "Chaos to Calm — ERIC ESCAPES",
  description:
    "Two Lightroom preset looks pulled off the streets of Japan: Neon & Grey for after dark, Warm Afternoon for the slow golden-hour days.",
};

const GUMROAD_URL = "https://ericescape.gumroad.com/l/avcmj";

type PresetCard = {
  title: string;
  tag: string;
  description: string;
  shotCaption: string;
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
};

const PRESETS: readonly PresetCard[] = [
  {
    title: "Neon & Grey",
    tag: "Cinestill 800T",
    description:
      "Cinestill 800T, shot at street level. Warm neon glow, teal sliding into the shadows, that red halation bleeding around every sign. Reach for it after dark, when the city is lit by its own signage and you want the photo to feel like the place felt.",
    shotCaption: "Shinjuku, after dark.",
    beforeSrc: "/images/chaostocalm/neon-grey-before.jpg",
    afterSrc: "/images/chaostocalm/neon-grey-after.jpg",
    beforeAlt: "Neon and Grey, before",
    afterAlt: "Neon and Grey, after",
  },
  {
    title: "Warm Afternoon",
    tag: "Warm / Kodak Gold",
    description:
      "Soft golden highlights, cool shadows, contrast kept gentle. Named for the second time I went to Kamakura, the day the light finally showed up. For late afternoons, the slow shots where you have time to wait for the sun.",
    shotCaption: "Kamakura, morning light.",
    beforeSrc: "/images/chaostocalm/warm-afternoon-before.jpg",
    afterSrc: "/images/chaostocalm/warm-afternoon-after.jpg",
    beforeAlt: "Warm Afternoon, before",
    afterAlt: "Warm Afternoon, after",
  },
];

type Qa = { q: string; a: string };

const FAQS: readonly Qa[] = [
  {
    q: "Will this work with my camera and software?",
    a: "Yeah, most likely. The XMP files run in Lightroom Classic, Lightroom desktop, and Lightroom Mobile. They are built for RAW and they work on any brand, so you do not need to shoot Fuji to use them. I have run them on Canon, Sony and Fuji files. JPEGs work too, the colour just shifts a bit differently.",
  },
  {
    q: "Does it work on Lightroom Mobile?",
    a: "Yep. The .xmp files import straight into the Lightroom Mobile app. And if you use the cloud version of Lightroom, presets you add on desktop sync to your phone on their own. Same files, all your devices.",
  },
  {
    q: "What if it looks off on my photos?",
    a: "Set your exposure and white balance first, then apply the preset. That fixes most of it. Each look comes with a note on where to start. And if a file turns up broken or missing on delivery, tell me and I will sort it.",
  },
];

export default function ChaosToCalm() {
  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <p className={styles.eyebrow}>Lightroom Preset Pack</p>
        <h1>Chaos to Calm</h1>
        <p className={styles.subtitle}>
          Two looks, pulled off the streets of Japan. Built on the road, based
          on how the places made me feel.
        </p>
        <p className={styles.lede}>
          No over-cooked HDR, no fake grain cranked to eleven. Just colour that
          respects the place.
        </p>

        <p className={styles.sectionLabel}>See the difference</p>

        {PRESETS.map((preset) => (
          <div key={preset.title} className={styles.card}>
            <div className={styles.presetTitle}>
              {preset.title} <span className={styles.tag}>{preset.tag}</span>
            </div>
            <p className={styles.presetDesc}>{preset.description}</p>
            <div className={styles.ba}>
              <figure className={styles.shot}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preset.beforeSrc} alt={preset.beforeAlt} />
                <figcaption>Before</figcaption>
              </figure>
              <figure className={styles.shot}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preset.afterSrc} alt={preset.afterAlt} />
                <figcaption>After</figcaption>
              </figure>
            </div>
            <p className={styles.shotcap}>{preset.shotCaption}</p>
          </div>
        ))}

        <p className={styles.sectionLabel}>The pack</p>
        <div className={styles.offer}>
          <span className={styles.badge}>2 presets</span>
          <h2>Chaos to Calm</h2>
          <div className={styles.price}>
            A$5+ <small>AUD, pay what you want</small>
          </div>
          <p>
            The two looks I actually reach for, in one pack. Neon &amp; Grey for
            the nights, Warm Afternoon for the slow days. These are a starting
            point, not a one-tap miracle. You will still nudge them to fit your
            shot, and that is kind of the point. Pay what you want, from five
            bucks. You decide what they are worth.
          </p>
          <ul className={styles.incl}>
            <li>Two presets: Neon &amp; Grey and Warm Afternoon</li>
            <li>XMP files for Lightroom Classic, desktop, and Mobile</li>
            <li>A plain-English install &amp; usage guide</li>
            <li>Free updates, forever</li>
          </ul>
          <a
            className={styles.btn}
            href={GUMROAD_URL}
            target="_blank"
            rel="noopener"
          >
            Get the pack
          </a>
          <div className={styles.finePrint}>
            Works with Lightroom Classic 7.3+, Lightroom CC desktop, and
            Lightroom Mobile. Built for RAW, fine on any camera brand. Not
            one-click magic: set your exposure and white balance first, then
            drop the look on top.
          </div>
        </div>

        <div className={styles.about}>
          <p className={styles.sectionLabel}>About these</p>
          <p>
            I am a street and travel photographer based in Sydney. I shoot Fuji
            mostly, Sony occasionally, a Ricoh in the pocket, sometimes just the
            phone. These two looks came out of three weeks in Japan in 2025,
            then got refined back home at the desk. They are a starting point.
            The whole idea is that you make them yours.
          </p>
        </div>

        <div className={styles.faq}>
          <p className={styles.sectionLabel}>A few questions</p>
          {FAQS.map((item) => (
            <div key={item.q} className={styles.qa}>
              <p className={styles.q}>{item.q}</p>
              <p className={styles.a}>{item.a}</p>
            </div>
          ))}
        </div>

        <div className={styles.sitefoot}>
          Questions?{" "}
          <a href="mailto:info.ericescapes@gmail.com">
            info.ericescapes@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}
