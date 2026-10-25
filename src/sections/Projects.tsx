import { useEffect, useRef } from "react";
import { gsap, pointer } from "@/lib/motion";
import { projects, Project } from "@/data/content";
import { DEPTH_UNIT, Layer, usePinned } from "@/components/Stage";
import { Frame, Placeholder, Tag } from "@/components/ui";

function Links({ p }: { p: Project }) {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {p.links.map((l) =>
        l.href ? (
          <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
            className="font-mono text-[10px] lg:text-[0.52vw] tracking-[0.3em] uppercase text-gold border border-gold/40 px-3 py-2 hover:bg-gold hover:text-ink transition-colors">{l.label} ↗</a>
        ) : (
          <span key={l.label} title="Link pending" className="font-mono text-[10px] lg:text-[0.52vw] tracking-[0.3em] uppercase text-silver/50 border border-white/10 px-3 py-2">{l.label} · Pending</span>
        )
      )}
    </div>
  );
}

/** One project = a group of independent planes. */
function DossierPlanes({ p }: { p: Project }) {
  return (
    <div className="pj group-planes flex flex-col gap-6 lg:block lg:absolute lg:inset-0 preserve-3d">
      {/* deep numeral */}
      <Layer depth={-2} className="hidden lg:block lg:absolute lg:left-[4%] lg:top-[6%] select-none pointer-events-none">
        <div className="font-display text-[22vw] leading-none text-white/[0.04]">{p.code}</div>
      </Layer>

      {/* cover plate */}
      <Layer depth={-0.4} className="pj-cover lg:absolute lg:left-[8%] lg:top-[18%] lg:w-[36%]">
        <div className="relative aspect-[4/5] lg:aspect-[4/4.6] overflow-hidden shadow-[0_60px_120px_-30px_rgba(0,0,0,1)]">
          {p.image ? <img src={p.image} alt={p.title} className="absolute inset-0 h-full w-full object-cover" /> : <Placeholder label={`Project ${p.code} Visual`} className="absolute inset-0" />}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
          <div className="absolute left-5 bottom-5">
            <div className="font-display text-6xl lg:text-[5vw] text-bone/90 font-light leading-none">{p.code}</div>
            <div className="font-mono text-[9px] lg:text-[0.5vw] tracking-[0.3em] uppercase text-gold mt-2">{p.status}</div>
          </div>
        </div>
      </Layer>

      {/* body panel */}
      <Layer depth={0.8} className="pj-body lg:absolute lg:left-[40%] lg:top-[12%] lg:w-[46%]">
        <Frame className="glass p-6 lg:p-[1.5vw]">
          <div className="pj-t font-mono text-[9px] lg:text-[0.5vw] tracking-[0.3em] uppercase text-gold mb-2">Project {p.code}</div>
          <h3 className="pj-t font-display text-3xl lg:text-[2.3vw] text-bone font-light leading-[1.05]">{p.title}</h3>
          <p className="pj-t mt-3 text-silver text-sm lg:text-[0.78vw] leading-relaxed">{p.overview}</p>
          <div className="pj-t mt-4 grid sm:grid-cols-2 gap-4">
            <div>
              <div className="font-mono text-[9px] lg:text-[0.5vw] tracking-[0.3em] uppercase text-gold mb-1">Problem</div>
              <p className="text-bone/80 text-sm lg:text-[0.72vw] leading-relaxed">{p.problem}</p>
            </div>
            <div>
              <div className="font-mono text-[9px] lg:text-[0.5vw] tracking-[0.3em] uppercase text-gold mb-1">Proposed Solution</div>
              <p className="text-bone/80 text-sm lg:text-[0.72vw] leading-relaxed">{p.solution}</p>
            </div>
          </div>
          {p.objective && (
            <div className="pj-t mt-4 border-l border-gold/40 pl-3">
              <div className="font-mono text-[9px] lg:text-[0.5vw] tracking-[0.3em] uppercase text-silver/60 mb-1">Objective</div>
              <p className="text-bone/80 text-sm lg:text-[0.72vw] leading-relaxed">{p.objective}</p>
            </div>
          )}
          <div className="pj-t"><Links p={p} /></div>
        </Frame>
      </Layer>

      {/* features plate – nearest, overlapping cover + body */}
      <Layer depth={2} className="pj-feat lg:absolute lg:left-[28%] lg:bottom-[8%] lg:w-[30%]">
        <div className="glass border-gold/20 p-5 lg:p-[1.1vw] shadow-[0_40px_80px_-20px_rgba(0,0,0,1)]">
          <div className="pj-t font-mono text-[9px] lg:text-[0.5vw] tracking-[0.3em] uppercase text-gold mb-2">{p.featuresLabel}</div>
          <ul className="space-y-1.5">
            {p.features.map((f) => (
              <li key={f} className="pj-t flex gap-2 text-xs lg:text-[0.68vw] text-bone/85"><span className="mt-1.5 h-1 w-1 shrink-0 bg-gold" />{f}</li>
            ))}
          </ul>
        </div>
      </Layer>

      {/* category tags – far foreground */}
      <Layer depth={2.8} className="pj-tags lg:absolute lg:right-[6%] lg:bottom-[14%] flex flex-wrap gap-2 lg:max-w-[16%] lg:justify-end">
        {p.category.map((c) => <span key={c} className="pj-t"><Tag>{c}</Tag></span>)}
      </Layer>
    </div>
  );
}

export default function Projects() {
  const root = useRef<HTMLElement>(null);
  const pinned = usePinned();

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const groups = gsap.utils.toArray<HTMLElement>(".pj");
      const tilt = el.querySelector(".cam-tilt");
      if (pinned) {
        const counter = el.querySelector(".pj-counter") as HTMLElement;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el, start: "top top", end: `+=${groups.length * 170}%`, pin: true, scrub: 0.9, anticipatePin: 1,
            onUpdate: (s) => {
              const i = Math.min(groups.length - 1, Math.floor(s.progress * groups.length));
              if (counter) counter.textContent = `0${i + 1} / 0${groups.length}`;
              gsap.set(".pj-prog", { scaleX: s.progress });
            },
          },
        });
        // Header fades in once
        tl.fromTo(".pj-head", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.4 }, 0);

        groups.forEach((g, i) => {
          const layers = g.querySelectorAll<HTMLElement>(".layer");
          const texts = g.querySelectorAll(".pj-t");
          const at = i * 3;
          gsap.set(g, { opacity: 0 });
          // flat stack arrives from deep Z
          tl.fromTo(g, { z: -1300, opacity: 0, rotateY: -14 }, { z: 0, opacity: 1, rotateY: 0, duration: 1, ease: "power2.out" }, at);
          // planes separate to their depths
          tl.fromTo(layers, { z: 0 }, { z: (_, t: HTMLElement) => Number(t.dataset.depth) * DEPTH_UNIT, duration: 0.7, ease: "power3.out", stagger: 0.05 }, at + 0.55);
          tl.fromTo(texts, { opacity: 0, y: 18 }, { opacity: 1, y: 0, stagger: 0.04, duration: 0.5 }, at + 0.7);
          // parallax drift during hold
          tl.to(layers, { y: (_, t: HTMLElement) => -(Number(t.dataset.depth) + 2) * 18, duration: 1.4, ease: "none" }, at + 1);
          // exit: planes collapse back, group pushes past lens
          tl.to(layers, { z: 0, duration: 0.5, ease: "power2.in" }, at + 2.3);
          tl.to(g, { z: 800, opacity: 0, rotateY: 10, duration: 0.7, ease: "power2.in" }, at + 2.4);
        });
        tl.to({}, { duration: 0.3 });

        const tick = () => {
          gsap.set(tilt, { rotateY: pointer.x * 2.5, rotateX: pointer.y * -1.8 });
          groups.forEach((g) => g.querySelectorAll<HTMLElement>(".layer").forEach((l) => gsap.set(l, { x: pointer.x * Number(l.dataset.depth) * 14 })));
        };
        gsap.ticker.add(tick);
        return () => gsap.ticker.remove(tick);
      } else {
        groups.forEach((g) => {
          gsap.fromTo(g.querySelectorAll(".layer"), { opacity: 0, y: 50 }, {
            opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: g, start: "top 80%", once: true },
          });
        });
      }
    }, el);
    return () => ctx.revert();
  }, [pinned]);

  return (
    <section id="projects" ref={root} className={`scene relative ${pinned ? "h-screen overflow-hidden" : "min-h-screen py-24"}`}>
      {pinned ? (
        <div className="absolute inset-0 flex items-center justify-center perspective">
          <div className="relative w-[min(100vw,177.78vh)] h-[min(100vh,56.25vw)] preserve-3d">
            <div className="pj-head absolute left-[4%] right-[4%] top-[6%] z-10 flex items-center justify-between font-mono text-[10px] tracking-[0.35em] uppercase">
              <span className="flex items-center gap-3"><span className="text-gold">03</span><span className="h-px w-8 bg-gold/40" /><span className="text-silver">Project Archive</span></span>
              <span className="flex items-center gap-4">
                <span className="h-px w-32 bg-white/10 overflow-hidden block"><span className="pj-prog block h-full w-full bg-gold origin-left scale-x-0" /></span>
                <span className="pj-counter text-gold">01 / 03</span>
              </span>
            </div>
            <div className="absolute inset-0 grid-bg opacity-40" />
            <div className="cam-tilt absolute inset-0 preserve-3d">
              {projects.map((p) => <DossierPlanes key={p.id} p={p} />)}
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-2xl px-6">
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.35em] uppercase mb-10">
            <span className="text-gold">03</span><span className="h-px w-8 bg-gold/40" /><span className="text-silver">Project Archive</span>
          </div>
          <div className="space-y-20">
            {projects.map((p) => (
              <div key={p.id} className="space-y-6 [&_.layer]:relative">
                <DossierPlanes p={p} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
