import { education } from "@/data/content";
import { Layer, SceneBackdrop, SceneHud, Stage, T } from "@/components/Stage";
import { Frame } from "@/components/ui";

const years = ["2025", "2026", "2027", "2028", "2029"];

export default function Education() {
  const e = education[0];
  return (
    <Stage id="education" length={140}>
      <SceneBackdrop numeral="02" word="Academic Record" />
      <SceneHud code="02" label="Academic Record" pos="tr" />

      {/* Deep background: large technical ring */}
      <Layer depth={-2.2} className="hidden lg:block lg:absolute lg:left-[-10%] lg:top-[-20%] pointer-events-none">
        <div className="relative h-[50vw] w-[50vw] rounded-full border border-bone/5">
          <div className="absolute inset-[8%] rounded-full border border-gold/10" />
          <div className="absolute inset-[22%] rounded-full border border-dashed border-bone/10" />
        </div>
      </Layer>

      <Layer depth={-0.8} className="lg:absolute lg:left-[8%] lg:top-[16%]">
        <T className="font-display font-light text-5xl lg:text-[5.4vw] leading-[0.95] text-bone/90">Education</T>
      </Layer>

      {/* Mid: horizontal timeline rail across the frame */}
      <Layer depth={0} className="lg:absolute lg:left-[8%] lg:right-[8%] lg:top-[52%]">
        <div className="relative hidden lg:block">
          <div className="h-px w-full bg-white/10" />
          <div className="absolute left-0 top-0 h-px w-[8%] bg-gold" />
          <div className="absolute inset-x-0 -top-2 flex justify-between">
            {years.map((y, i) => (
              <T key={y} className="flex flex-col items-center gap-3">
                <span className={`h-[9px] w-[9px] rotate-45 border ${i === 0 ? "bg-gold border-gold" : "bg-ink border-gold/60"}`} />
                <span className="font-display text-[1.6vw] text-bone font-light">{y}</span>
                <span className="font-mono text-[0.5vw] tracking-[0.3em] uppercase text-silver/60">
                  {i === 0 ? "Enrollment" : i === 4 ? "Graduation" : `Year ${i + 1}`}
                </span>
              </T>
            ))}
          </div>
        </div>
        <div className="lg:hidden flex gap-4 overflow-x-auto font-display text-2xl text-bone/80">{years.map((y) => <T key={y}>{y}</T>)}</div>
      </Layer>

      {/* Foreground: record card */}
      <Layer depth={1.4} className="lg:absolute lg:right-[8%] lg:top-[12%] lg:w-[38%]">
        <Frame className="glass p-6 lg:p-[1.6vw] shadow-[0_50px_100px_-30px_rgba(0,0,0,1)]">
          <T className="flex items-center justify-between mb-5 font-mono text-[10px] lg:text-[0.55vw] tracking-[0.3em] uppercase">
            <span className="text-gold">Record 01</span><span className="text-silver border border-white/10 px-2 py-1">{e.status}</span>
          </T>
          <T className="font-display text-2xl lg:text-[1.9vw] text-bone font-light leading-tight">{e.institution}</T>
          <div className="mt-5 grid grid-cols-3 gap-4 border-t border-white/10 pt-5">
            {[["Degree", e.degree], ["Duration", e.duration], ["Location", e.location]].map(([k, v]) => (
              <T key={k}>
                <div className="font-mono text-[9px] lg:text-[0.5vw] tracking-[0.3em] uppercase text-silver/60 mb-1">{k}</div>
                <div className="text-bone text-sm lg:text-[0.8vw] leading-snug">{v}</div>
              </T>
            ))}
          </div>
        </Frame>
      </Layer>

      {/* Foreground: degree plate pulled nearest */}
      <Layer depth={2.4} className="lg:absolute lg:left-[8%] lg:bottom-[12%] lg:w-[28%]">
        <div className="glass border-gold/20 px-5 py-4 lg:px-[1.2vw] lg:py-[1vw]">
          <T className="font-mono text-[9px] lg:text-[0.5vw] tracking-[0.3em] uppercase text-gold mb-1">Programme</T>
          <T className="font-display text-xl lg:text-[1.5vw] text-bone">B.Tech Mechanical Engineering</T>
          <T className="font-mono text-[10px] lg:text-[0.55vw] tracking-[0.25em] text-silver/70 mt-1">2025 — 2029 · Chennai</T>
        </div>
      </Layer>
    </Stage>
  );
}
