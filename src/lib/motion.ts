import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
export { gsap, ScrollTrigger };

export function useReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fn = () => setReduced(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return reduced;
}

export function useIsDesktop() {
  const [desktop, setDesktop] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches : true
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const fn = () => setDesktop(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return desktop;
}

/** Scroll to a scene; if it's pinned, land after the camera dolly-in. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const st = ScrollTrigger.getAll().find((t) => t.trigger === el && t.pin);
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (st) {
    const y = id === "intro" ? st.start : st.start + (st.end - st.start) * 0.36;
    window.scrollTo({ top: y, behavior: reduced ? "auto" : "smooth" });
  } else {
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  }
}

/** Normalized pointer position (-1..1), shared singleton for cheap parallax. */
export const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
if (typeof window !== "undefined") {
  window.addEventListener(
    "pointermove",
    (e) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    },
    { passive: true }
  );
  gsap.ticker.add(() => {
    pointer.x += (pointer.tx - pointer.x) * 0.06;
    pointer.y += (pointer.ty - pointer.y) * 0.06;
  });
}
