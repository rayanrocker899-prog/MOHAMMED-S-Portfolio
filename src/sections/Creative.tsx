import { useRef } from "react";
import { gsap, useIsDesktop, useReducedMotion } from "@/lib/motion";
import { creative, CreativeItem } from "@/data/content";
import { Layer, SceneBackdrop, SceneHud, Stage, T } from "@/components/Stage";
import { Placeholder } from "@/components/ui";

// Each gallery tile gets its own position & depth in the 16:9 frame.
const slots = [
  { depth: -1.2, cls: "lg:left-[30%] lg:top-[8%] lg:w-[22%]", ratio: "aspect-[3/4]" },
  { depth: -0.4, cls: "lg:left-[56%] lg:top-[14%] lg:w-[20%]", ratio: "aspect-[4/3]" },
  { depth: 0.4, cls: "lg:left-[78%] lg:top-[6%] lg:w-[16%]", ratio: "aspect-[9/16]" },
  { depth: 1.2, cls: "lg:left-[40%] lg:top-[52%] lg:w-[26%]", ratio: "aspect-[16/9]" },
  { depth: 2.0, cls: "lg:left-[70%] lg:top-[58%] lg:w-[18%]", ratio: "aspect-square" },
  { depth: 2.8, cls: "lg:left-[8%] lg:top-[62%] lg:w-[18%]", ratio: "aspect-[4/5]" },
];

function Tile({ item, idx }: { item: CreativeItem; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const desktop = useIsDesktop();
  const reduced = useReducedMotion();
  const slot = slots[idx % slots.length];

  const onMove = (e: React.MouseEvent) => {
    if (!desktop || reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(ref.current, { rotateY: x * 14, rotateX: -y * 14, scale: 1.04, duration: 0.5, ease: "power2.out" });
    gsap.to(ref.current.querySelector(".shine"), { opacity: 1, x: `${x * 100}%`, y: `${y * 100}%`, duration: 0.5 });
  };
  const onLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.8, ease: "power3.out" });
    gsap.to(ref.current.querySelector(".shine"), { opacity: 0, duration: 0.5 });
  };
  const W = item.href ? "a" : "div";

  return (
    <Layer depth={slot.depth} className={`lg:absolute ${slot.cls}`}>
      <W {...(item.href ? { href: item.href, target: "_blank", rel: "noreferrer" } : {})} className="block perspective" data-hover>
        <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
          className={`relative overflow-hidden border border-white/10 preserve-3d group shadow-[0_40px_90px_-30px_rgba(0,0,0,1)] ${slot.ratio}`}>
          {item.image ? <img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover" /> : <Placeholder label={`Creative ${(idx + 1).toString().padStart(2, "0")}`} className="absolute inset-0" />}
          <div className="shine pointer-events-none absolute -inset-1/2 opacity-0 bg-[radial-gradient(circle,rgba(201,169,97,0.2),transparent_60%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent opacity-80" />
          <div className="absolute inset-x-0 bottom-0 p-4 lg:p-[0.9vw]">
            <div className="font-mono text-[9px] lg:text-[0.48vw] tracking-[0.3em] uppercase text-gold mb-1">{item.type}</div>
            <div className="font-display text-lg lg:text-[1.1vw] text-bone leading-tight">{item.title}</div>
          </div>
        </div>
      </W>
    </Layer>
  );
}

export default function Creative() {
  return (
    <Stage id="creative" length={170}>
      <SceneBackdrop numeral="06" word="Creative Archive" />
      <SceneHud code="06" label="Creative Archive" />
      <Layer depth={-2} className="hidden lg:block lg:absolute lg:left-[-5%] lg:top-[40%] whitespace-nowrap select-none pointer-events-none">
        <div className="font-display text-[12vw] leading-none text-white/[0.025]">Posters · Reels · Branding</div>
      </Layer>
      <Layer depth={-0.6} className="lg:absolute lg:left-[8%] lg:top-[14%] lg:w-[22%]">
        <T className="font-display font-light text-5xl lg:text-[4.6vw] leading-[0.95] text-bone/90">Creative<br />Work</T>
        <T className="mt-3 text-silver text-sm lg:text-[0.72vw] leading-relaxed">Posters, promotional designs, reels, video edits and experiments. Placeholders until samples are supplied.</T>
      </Layer>
      {creative.map((c, i) => <Tile key={c.title + i} item={c} idx={i} />)}
    </Stage>
  );
}
