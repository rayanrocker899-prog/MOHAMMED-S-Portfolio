import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ScrollTrigger, gsap, scrollToSection, useReducedMotion } from "@/lib/motion";
import { scrollState } from "@/components/Scene";
import { Cursor, Nav, Overlays, Preloader } from "@/components/Chrome";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Education from "@/sections/Education";
import Projects from "@/sections/Projects";
import Experience from "@/sections/Experience";
import Skills from "@/sections/Skills";
import Creative from "@/sections/Creative";
import Contact from "@/sections/Contact";

const Scene = lazy(() => import("@/components/Scene"));

export default function App() {
  const [ready, setReady] = useState(false);
  const reduced = useReducedMotion();
  const onDone = useCallback(() => setReady(true), []);

  // Feed global scroll progress + velocity to the 3D scene without React re-renders.
  useEffect(() => {
    let last = 0;
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        scrollState.p = self.progress;
        scrollState.v = gsap.utils.clamp(-0.05, 0.05, (self.progress - last) * 2);
        last = self.progress;
      },
    });
    const decay = () => { scrollState.v *= 0.9; };
    gsap.ticker.add(decay);
    return () => { st.kill(); gsap.ticker.remove(decay); };
  }, []);

  // Lock scroll while preloading; refresh triggers once layout settles.
  useEffect(() => {
    document.documentElement.style.overflow = ready ? "" : "hidden";
    if (ready) {
      const t = setTimeout(() => ScrollTrigger.refresh(), 100);
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      return () => clearTimeout(t);
    }
  }, [ready]);

  // Keyboard navigation between sections (J/K or Arrow keys w/ Shift)
  useEffect(() => {
    const ids = ["intro", "about", "education", "projects", "experience", "skills", "creative", "contact"];
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const dir = e.key === "j" || e.key === "J" ? 1 : e.key === "k" || e.key === "K" ? -1 : 0;
      if (!dir) return;
      const y = window.scrollY + 2;
      const tops = ids.map((id) => {
        const el = document.getElementById(id)!;
        const st = ScrollTrigger.getAll().find((t) => t.trigger === el && t.pin);
        return { id, top: st ? st.start : el.getBoundingClientRect().top + window.scrollY };
      });
      const current = tops.reduce((acc, s, i) => (s.top <= y ? i : acc), 0);
      scrollToSection(tops[gsap.utils.clamp(0, ids.length - 1, current + dir)].id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="relative bg-ink text-bone min-h-screen">
      <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection("about"); }} className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] bg-gold text-ink px-4 py-2 font-mono text-xs">
        Skip to content
      </a>

      <Suspense fallback={null}>
        <Scene reduced={reduced} />
      </Suspense>

      <Overlays />
      <Cursor />
      <Nav />

      <AnimatePresence>{!ready && <Preloader onDone={onDone} />}</AnimatePresence>

      <main className="relative z-10">
        <Hero ready={ready} />
        <About />
        <Education />
        <Projects />
        <Experience />
        <Skills />
        <Creative />
        <Contact />
      </main>

      <div className="fixed bottom-5 left-5 z-[65] hidden lg:block font-mono text-[9px] tracking-[0.3em] uppercase text-silver/40">
        J / K · Navigate sections
      </div>
    </div>
  );
}
