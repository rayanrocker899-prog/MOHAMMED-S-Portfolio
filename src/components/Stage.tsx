import { CSSProperties, ReactNode, useEffect, useRef } from "react";
import { gsap, pointer, useIsDesktop, useReducedMotion } from "@/lib/motion";

/**
 * Stage = one full-screen cinematic scene composed in a 16:9 frame.
 * Children are <Layer depth={n}> planes. Depth is in "units" (1 unit = 140px of Z).
 * Negative = background (moves slower), positive = foreground (moves faster).
 *
 * Desktop: pinned; scroll drives a camera dolly (enter → hold/drift → exit past lens).
 * Mobile / reduced-motion: natural flow with simple staggered reveals.
 */
export const DEPTH_UNIT = 140;

export function usePinned() {
  const desktop = useIsDesktop();
  const reduced = useReducedMotion();
  return desktop && !reduced;
}

export function Layer({
  depth = 0,
  className = "",
  children,
  style,
}: {
  depth?: number;
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div className={`layer preserve-3d will-change-transform ${className}`} data-depth={depth} style={style}>
      {children}
    </div>
  );
}

export function Stage({
  id,
  length = 130,
  intro = false,
  ready = true,
  children,
  mobileClass = "",
}: {
  id: string;
  length?: number;
  intro?: boolean; // first scene: no dolly-in, entrance is time-based
  ready?: boolean;
  children: ReactNode;
  mobileClass?: string;
}) {
  const root = useRef<HTMLElement>(null);
  const pinned = usePinned();

  useEffect(() => {
    const el = root.current;
    if (!el || !ready) return;
    const ctx = gsap.context(() => {
      const layers = gsap.utils.toArray<HTMLElement>(".layer");
      const texts = gsap.utils.toArray<HTMLElement>(".t-reveal");
      const cam = el.querySelector(".cam") as HTMLElement;
      const tilt = el.querySelector(".cam-tilt") as HTMLElement;

      if (pinned) {
        layers.forEach((l) => gsap.set(l, { z: Number(l.dataset.depth) * DEPTH_UNIT }));
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: `+=${length}%`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
          },
        });
        if (intro) {
          gsap.set(cam, { z: 0, opacity: 1 });
          // time-based entrance
          gsap
            .timeline({ defaults: { ease: "power3.out" } })
            .fromTo(texts, { opacity: 0, y: 40, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.12, duration: 1.2 }, 0.2)
            .fromTo(layers, { opacity: 0 }, { opacity: 1, stagger: 0.08, duration: 1 }, 0);
          tl.to({}, { duration: 1 }, 0);
        } else {
          tl.fromTo(cam, { z: -1100, opacity: 0 }, { z: 0, opacity: 1, duration: 1, ease: "power2.out" }, 0)
            .fromTo(texts, { opacity: 0, y: 30, filter: "blur(6px)" }, { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.07, duration: 0.6, ease: "power2.out" }, 0.4);
        }
        // Independent parallax drift across the hold: far layers slow, near layers fast
        tl.to(layers, { y: (_, t: HTMLElement) => -(Number(t.dataset.depth) + 1.5) * 28, duration: 2.2, ease: "none" }, 0.2);
        // Exit: camera pushes through the scene
        tl.to(cam, { z: 900, opacity: 0, duration: 0.8, ease: "power2.in" }, 2.3);

        // Mouse response: subtle tilt + per-depth shift
        const tick = () => {
          gsap.set(tilt, { rotateY: pointer.x * 2.2, rotateX: pointer.y * -1.6 });
          layers.forEach((l) => {
            const d = Number(l.dataset.depth);
            gsap.set(l, { x: pointer.x * d * 14 });
          });
        };
        gsap.ticker.add(tick);
        return () => gsap.ticker.remove(tick);
      } else {
        gsap.set(cam, { z: 0, opacity: 1 });
        gsap.fromTo(layers, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 75%", once: true },
        });
        gsap.fromTo(texts, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, stagger: 0.06, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 65%", once: true },
        });
      }
    }, el);
    return () => ctx.revert();
  }, [pinned, length, intro, ready]);

  return (
    <section
      id={id}
      ref={root}
      className={`scene relative ${pinned ? "h-screen overflow-hidden" : `min-h-screen py-24 ${mobileClass}`}`}
    >
      {pinned ? (
        <div className="absolute inset-0 flex items-center justify-center perspective">
          {/* 16:9 frame */}
          <div className="frame relative w-[min(100vw,177.78vh)] h-[min(100vh,56.25vw)] preserve-3d">
            <div className="cam-tilt absolute inset-0 preserve-3d">
              <div className="cam absolute inset-0 preserve-3d opacity-0">{children}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="cam relative mx-auto max-w-2xl px-6 flex flex-col gap-8">{children}</div>
      )}
    </section>
  );
}

/** Text that reveals with the scene timeline. */
export function T({ children, className = "", as: As = "div" }: { children: ReactNode; className?: string; as?: any }) {
  return <As className={`t-reveal ${className}`}>{children}</As>;
}

/** Scene label / HUD header used in every scene. */
export function SceneHud({ code, label, pos = "tl" }: { code: string; label: string; pos?: "tl" | "tr" }) {
  return (
    <Layer depth={2.5} className={`lg:absolute ${pos === "tl" ? "lg:left-[4%]" : "lg:right-[4%] lg:text-right"} lg:top-[6%] pointer-events-none`}>
      <T className="flex items-center gap-3 font-mono text-[10px] tracking-[0.35em] uppercase">
        <span className="text-gold">{code}</span>
        <span className="h-px w-8 bg-gold/40" />
        <span className="text-silver">{label}</span>
      </T>
    </Layer>
  );
}

/** Background technical grid + faint giant numeral for depth. */
export function SceneBackdrop({ numeral, word }: { numeral: string; word?: string }) {
  return (
    <>
      <Layer depth={-3} className="lg:absolute lg:inset-[-10%] hidden lg:block pointer-events-none">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,5,5,0.8)_90%)]" />
      </Layer>
      <Layer depth={-2} className="lg:absolute lg:right-[2%] lg:bottom-[0%] hidden lg:block pointer-events-none select-none">
        <div className="font-display font-light leading-none text-white/[0.035] text-[28vw]">{numeral}</div>
      </Layer>
      {word && (
        <Layer depth={-1.5} className="lg:absolute lg:left-[4%] lg:top-[14%] hidden lg:block pointer-events-none select-none">
          <div className="font-mono text-[10px] tracking-[0.6em] uppercase text-bone/10 [writing-mode:vertical-rl]">{word}</div>
        </Layer>
      )}
    </>
  );
}
