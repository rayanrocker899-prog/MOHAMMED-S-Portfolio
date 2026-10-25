import { activities, experience } from "@/data/content";
import { Layer, SceneBackdrop, SceneHud, Stage, T } from "@/components/Stage";
import { Frame } from "@/components/ui";

export default function Experience() {
  return (
    <Stage id="experience" length={150}>
      <SceneBackdrop numeral="04" word="Field Operations" />
      <SceneHud code="04" label="Field Operations" />

      {/* Deep: operations map lines */}
      <Layer depth={-2} className="hidden lg:block lg:absolute lg:inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-40" viewBox="0 0 1920 1080" fill="none" stroke="rgba(201,169,97,0.35)" strokeWidth="1">
          <path d="M200 300 L700 420 L1250 350 L1700 520" strokeDasharray="4 8" />
          <path d="M300 800 L820 640 L1400 760" strokeDasharray="4 8" />
          {[[200,300],[700,420],[1250,350],[1700,520],[300,800],[820,640],[1400,760]].map(([x,y],i)=>(
            <g key={i}><circle cx={x} cy={y} r="18" stroke="rgba(232,228,220,0.15)" /><circle cx={x} cy={y} r="3" fill="#c9a961" stroke="none" /></g>
          ))}
        </svg>
      </Layer>

      <Layer depth={-0.8} className="lg:absolute lg:left-[8%] lg:top-[14%]">
        <T className="font-display font-light text-5xl lg:text-[5.2vw] leading-[0.95] text-bone/90">Active<br />Operations</T>
      </Layer>

      {/* Mission card 1 — mid */}
      <Layer depth={0.3} className="lg:absolute lg:left-[8%] lg:bottom-[12%] lg:w-[30%]">
        <Frame className="glass p-6 lg:p-[1.4vw] shadow-[0_50px_100px_-30px_rgba(0,0,0,1)]">
          <T className="flex justify-between font-mono text-[9px] lg:text-[0.5vw] tracking-[0.3em] uppercase mb-4"><span className="text-gold">{experience[0].code}</span><span className="text-silver/60">Ongoing</span></T>
          <T className="font-display text-2xl lg:text-[1.9vw] text-bone font-light leading-tight">{experience[0].org}</T>
          <T className="mt-2 font-mono text-[10px] lg:text-[0.55vw] tracking-[0.25em] uppercase text-bone/70">{experience[0].role}</T>
          {experience[0].points.map((pt) => <T key={pt} className="mt-4 pt-4 border-t border-white/10 text-sm lg:text-[0.75vw] text-silver leading-relaxed">{pt}</T>)}
        </Frame>
      </Layer>

      {/* Mission card 2 — nearer, offset */}
      <Layer depth={1.4} className="lg:absolute lg:left-[42%] lg:top-[22%] lg:w-[30%]">
        <Frame className="glass p-6 lg:p-[1.4vw] shadow-[0_50px_100px_-30px_rgba(0,0,0,1)]">
          <T className="flex justify-between font-mono text-[9px] lg:text-[0.5vw] tracking-[0.3em] uppercase mb-4"><span className="text-gold">{experience[1].code}</span><span className="text-silver/60">Ongoing</span></T>
          <T className="font-display text-2xl lg:text-[1.9vw] text-bone font-light leading-tight">{experience[1].org}</T>
          <T className="mt-2 font-mono text-[10px] lg:text-[0.55vw] tracking-[0.25em] uppercase text-bone/70">{experience[1].role}</T>
          {experience[1].points.map((pt) => <T key={pt} className="mt-4 pt-4 border-t border-white/10 text-sm lg:text-[0.75vw] text-silver leading-relaxed">{pt}</T>)}
        </Frame>
      </Layer>

      {/* Activities list — foreground right */}
      <Layer depth={2.2} className="lg:absolute lg:right-[5%] lg:bottom-[12%] lg:w-[24%]">
        <div className="glass border-gold/20 p-5 lg:p-[1.2vw]">
          <T className="font-mono text-[9px] lg:text-[0.5vw] tracking-[0.3em] uppercase text-gold mb-3">Relevant Activities</T>
          <ul className="space-y-2">
            {activities.map((a, i) => (
              <T key={a} as="li" className="flex gap-3 text-sm lg:text-[0.72vw] text-bone/85"><span className="font-mono text-[9px] text-gold/70 mt-0.5">0{i + 1}</span>{a}</T>
            ))}
          </ul>
        </div>
      </Layer>

      <Layer depth={3} className="hidden lg:block lg:absolute lg:right-[12%] lg:top-[12%] pointer-events-none">
        <div className="h-[5vw] w-[5vw] border border-gold/25 rotate-45" />
      </Layer>
    </Stage>
  );
}
