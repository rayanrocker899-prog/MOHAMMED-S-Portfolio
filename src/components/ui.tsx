import { ReactNode, useEffect, useRef } from "react";
import { gsap, useReducedMotion } from "@/lib/motion";

export function Frame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`corner relative ${className}`}>
      <span className="c" />
      {children}
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-gold/80 border border-gold/25 px-2 py-1">
      {children}
    </span>
  );
}

export function SectionHeader({
  code,
  label,
  title,
  sub,
  align = "left",
}: {
  code: string;
  label: string;
  title: string;
  sub?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`reveal-group mb-14 md:mb-20 ${align === "center" ? "text-center" : ""}`}>
      <div className={`flex items-center gap-4 mb-5 ${align === "center" ? "justify-center" : ""}`}>
        <span className="reveal font-mono text-[11px] tracking-[0.3em] text-gold">{code}</span>
        <span className="reveal h-px w-12 bg-gold/40" />
        <span className="reveal font-mono text-[11px] tracking-[0.3em] uppercase text-silver">{label}</span>
      </div>
      <h2 className="reveal font-display font-light text-4xl md:text-6xl lg:text-7xl text-bone leading-[0.95] tracking-tight">
        {title}
      </h2>
      {sub && <p className="reveal mt-6 max-w-xl text-silver text-sm md:text-base leading-relaxed">{sub}</p>}
    </div>
  );
}

/** Staggers children with `.reveal` class when scrolled into view. */
export function Reveal({ children, className = "", y = 40, stagger = 0.08 }: { children: ReactNode; className?: string; y?: number; stagger?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll(".reveal");
    if (reduced) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power3.out",
          stagger,
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [reduced, y, stagger]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function Placeholder({ label = "Image Placeholder", className = "" }: { label?: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-graphite grid-bg ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-steel/40 via-transparent to-ink/60" />
      <div className="absolute inset-0 scanline opacity-50" />
      <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none">
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="rgba(201,169,97,0.35)" strokeWidth="0.5" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="rgba(201,169,97,0.35)" strokeWidth="0.5" />
      </svg>
      <div className="absolute left-4 top-4 font-mono text-[10px] tracking-[0.25em] uppercase text-gold/70">{label}</div>
      <div className="absolute right-4 bottom-4 font-mono text-[10px] tracking-[0.2em] text-silver/50">AWAITING ASSET</div>
    </div>
  );
}

export function GoldButton({
  children,
  href,
  onClick,
  variant = "solid",
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "ghost";
}) {
  const cls =
    variant === "solid"
      ? "bg-gold text-ink hover:bg-bone"
      : "border border-bone/30 text-bone hover:border-gold hover:text-gold";
  const base = `group relative inline-flex items-center gap-3 px-7 py-3.5 font-mono text-[11px] tracking-[0.3em] uppercase transition-colors duration-300 ${cls}`;
  const inner = (
    <>
      <span>{children}</span>
      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
    </>
  );
  if (href) {
    return (
      <a href={href} onClick={onClick} className={base}>
        {inner}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={base}>
      {inner}
    </button>
  );
}
