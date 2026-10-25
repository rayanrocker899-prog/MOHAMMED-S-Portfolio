import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap, ScrollTrigger, scrollToSection, useIsDesktop, useReducedMotion } from "@/lib/motion";
import { profile, sections } from "@/data/content";

export function Nav() {
  const [active, setActive] = useState("intro");
  const [open, setOpen] = useState(false);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggers = sections.map((s) =>
      ScrollTrigger.create({
        trigger: `#${s.id}`,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: (self) => self.isActive && setActive(s.id),
      })
    );
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
      },
    });
    return () => {
      triggers.forEach((t) => t.kill());
      st.kill();
    };
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      {/* progress line */}
      <div className="fixed top-0 left-0 right-0 h-px bg-white/5 z-[70]">
        <div ref={bar} className="h-full w-full bg-gold origin-left scale-x-0" />
      </div>

      {/* top bar */}
      <header className="fixed top-0 left-0 right-0 z-[65] flex items-center justify-between px-5 md:px-10 py-5 mix-blend-difference">
        <button onClick={() => go("intro")} className="flex items-center gap-3 text-left">
          <span className="h-6 w-6 border border-gold/70 grid place-items-center">
            <span className="h-1.5 w-1.5 bg-gold" />
          </span>
          <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-bone hidden sm:block">
            M.R. Basha · Dossier
          </span>
        </button>
        <div className="flex items-center gap-6">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-silver hidden md:block">
            {sections.find((s) => s.id === active)?.code} / {sections.find((s) => s.id === active)?.label}
          </span>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle navigation"
            aria-expanded={open}
            className="font-mono text-[10px] tracking-[0.3em] uppercase text-bone flex items-center gap-3"
          >
            <span>{open ? "Close" : "Index"}</span>
            <span className="flex flex-col gap-1">
              <span className={`block h-px w-6 bg-bone transition-transform ${open ? "translate-y-[2.5px] rotate-45" : ""}`} />
              <span className={`block h-px w-6 bg-bone transition-transform ${open ? "-translate-y-[2.5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </header>

      {/* side indicators */}
      <nav className="fixed right-5 top-1/2 -translate-y-1/2 z-[65] hidden lg:flex flex-col gap-4" aria-label="Sections">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => go(s.id)}
            aria-label={s.label}
            className="group flex items-center justify-end gap-3"
          >
            <span
              className={`font-mono text-[9px] tracking-[0.25em] uppercase transition-all duration-300 ${
                active === s.id ? "text-gold opacity-100" : "text-silver opacity-0 group-hover:opacity-70"
              }`}
            >
              {s.label}
            </span>
            <span
              className={`block h-px transition-all duration-500 ${
                active === s.id ? "w-8 bg-gold" : "w-4 bg-silver/40 group-hover:bg-silver"
              }`}
            />
          </button>
        ))}
      </nav>

      {/* full index overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[64] bg-ink/95 backdrop-blur-xl flex items-center"
          >
            <div className="absolute inset-0 grid-bg opacity-60" />
            <div className="relative mx-auto w-full max-w-5xl px-6 md:px-12 grid md:grid-cols-2 gap-10">
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold mb-6">Dossier Index</p>
                <ul className="space-y-1">
                  {sections.map((s, i) => (
                    <motion.li
                      key={s.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i, duration: 0.5 }}
                    >
                      <button
                        onClick={() => go(s.id)}
                        className="group flex items-baseline gap-5 py-2 text-left w-full"
                      >
                        <span className="font-mono text-[11px] text-gold/70">{s.code}</span>
                        <span className="font-display text-3xl md:text-5xl font-light text-bone group-hover:text-gold group-hover:translate-x-2 transition-all duration-300">
                          {s.label}
                        </span>
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="hidden md:flex flex-col justify-end text-silver text-sm leading-relaxed">
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold mb-4">Subject</p>
                <p className="font-display text-2xl text-bone mb-3">{profile.name}</p>
                <p className="max-w-sm">{profile.headline}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function Preloader({ onDone }: { onDone: () => void }) {
  const [p, setP] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) {
      onDone();
      return;
    }
    const o = { v: 0 };
    const tw = gsap.to(o, {
      v: 100,
      duration: 1.8,
      ease: "power2.inOut",
      onUpdate: () => setP(Math.round(o.v)),
      onComplete: () => setTimeout(onDone, 350),
    });
    return () => {
      tw.kill();
    };
  }, [onDone, reduced]);
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-ink flex flex-col items-center justify-center"
      exit={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="font-mono text-[10px] tracking-[0.4em] uppercase text-silver mb-6">Decrypting Dossier</div>
      <div className="font-display text-6xl md:text-8xl font-light text-bone tabular-nums">{p.toString().padStart(3, "0")}</div>
      <div className="mt-8 h-px w-48 bg-white/10 overflow-hidden">
        <div className="h-full bg-gold" style={{ width: `${p}%` }} />
      </div>
      <div className="absolute bottom-10 font-mono text-[9px] tracking-[0.3em] uppercase text-silver/50">
        Clearance Level · Public
      </div>
    </motion.div>
  );
}

export function Overlays() {
  const top = useRef<HTMLDivElement>(null);
  const bottom = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Letterbox bars thicken slightly during pinned cinematic sequences.
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => gsap.to([top.current, bottom.current], { height: mq.matches ? "3vh" : "0vh", duration: 1.2, ease: "power2.inOut", delay: 0.5 });
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return (
    <>
      <div className="film-grain" />
      <div className="vignette" />
      <div ref={top} className="letterbox-top" />
      <div ref={bottom} className="letterbox-bottom" />
    </>
  );
}

export function Cursor() {
  const desktop = useIsDesktop();
  const reduced = useReducedMotion();
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!desktop || reduced) return;
    document.body.classList.add("no-cursor");
    const r = ring.current!, d = dot.current!;
    const move = (e: PointerEvent) => {
      gsap.to(d, { x: e.clientX, y: e.clientY, duration: 0.08 });
      gsap.to(r, { x: e.clientX, y: e.clientY, duration: 0.35, ease: "power3.out" });
    };
    const over = (e: Event) => {
      const t = (e.target as HTMLElement).closest("a,button,[data-hover]");
      gsap.to(r, { scale: t ? 2 : 1, borderColor: t ? "rgba(201,169,97,0.9)" : "rgba(232,228,220,0.5)", duration: 0.3 });
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    return () => {
      document.body.classList.remove("no-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, [desktop, reduced]);
  if (!desktop || reduced) return null;
  return (
    <>
      <div ref={dot} className="fixed top-0 left-0 z-[90] h-1 w-1 -ml-0.5 -mt-0.5 bg-gold pointer-events-none" />
      <div
        ref={ring}
        className="fixed top-0 left-0 z-[90] h-8 w-8 -ml-4 -mt-4 rounded-full border border-bone/50 pointer-events-none"
      />
    </>
  );
}
