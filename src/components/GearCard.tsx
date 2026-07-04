import Image from "next/image";

type GearCardProps = {
  kicker: string;
  name: string;
  image?: string;
  href: string;
};

export default function GearCard({ kicker, name, image, href }: GearCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className="group flex items-center gap-4 border-t border-white/10 py-4 transition-opacity hover:opacity-70 first:border-t-0"
    >
      <div className="relative size-16 shrink-0 overflow-hidden bg-white/5 sm:size-20">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="80px"
            className="object-contain p-2 grayscale-[40%]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-eyebrow text-[10px] text-white/30">
              {name}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <span className="font-eyebrow text-[11px] tracking-[3px] text-white/45">
          {kicker}
        </span>
        <span className="font-eyebrow text-sm tracking-[2px] text-white/90 sm:text-base">
          {name}
        </span>
      </div>
      <span aria-hidden="true" className="shrink-0 text-white/40">
        ↗
      </span>
    </a>
  );
}
