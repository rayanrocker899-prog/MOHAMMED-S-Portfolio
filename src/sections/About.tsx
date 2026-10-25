import { profile } from "@/data/content";
import { Layer, SceneBackdrop, SceneHud, Stage, T } from "@/components/Stage";
import { Frame, Placeholder, Tag } from "@/components/ui";

export default function About() {
  return (
    <Stage id="about" length={150}>
      <SceneBackdrop numeral="01" word="Personnel File" />
      <SceneHud code="01" label="Personnel File" />

      {/* Background: big title sits deep */}
      <Layer depth={-1.2} className="lg:absolute lg:left-[8%] lg:top-[14%]">
        <T className="font-display font-light text-5xl lg:text-[5.6vw] leading-[0.95] text-bone/90">Subject<br />Profile</T>
      </Layer>

      {/* Mid-ground: portrait plate */}
      <Layer depth={0} className="lg:absolute lg:left-[8%] lg:bottom-[10%] lg:w-[20%]">
        <div className="relative shadow-[0_50px_100px_-30px_rgba(0,0,0,1)]">
          {profile.portrait ? (
            <img src={profile.portrait} alt={profile.name} className="aspect-[3/4] w-full object-cover grayscale contrast-125" />
          ) : (
            <Placeholder label="Portrait" className="aspect-[3/4] w-full" />
          )}
          <div className="absolute inset-0 border border-gold/25 pointer-events-none" />
        </div>
        <T className="mt-4 flex flex-wrap gap-2">
          <Tag>Entrepreneurship</Tag><Tag>Technology</Tag><Tag>Leadership</Tag>
        </T>
      </Layer>

      {/* Mid: dossier details sheet */}
      <Layer depth={0.6} className="lg:absolute lg:left-[33%] lg:top-[18%] lg:w-[38%]">
        <Frame className="glass p-6 lg:p-[1.6vw]">
          <T className="flex items-center justify-between mb-5 pb-3 border-b border-white/10 font-mono text-[10px] lg:text-[0.55vw] tracking-[0.3em] uppercase">
            <span className="text-silver">File No. MRB-2025-001</span><span className="text-gold">Active</span>
          </T>
          <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
            {profile.details.map((d) => (
              <T key={d.label} className={d.label === "Institution" ? "sm:col-span-2" : ""}>
                <dt className="font-mono text-[10px] lg:text-[0.55vw] tracking-[0.3em] uppercase text-silver/70 mb-1">{d.label}</dt>
                <dd className="font-display text-xl lg:text-[1.35vw] text-bone leading-snug">{d.value}</dd>
              </T>
            ))}
          </dl>
        </Frame>
      </Layer>

      {/* Foreground: summary card floats nearest, overlapping */}
      <Layer depth={1.8} className="lg:absolute lg:right-[5%] lg:bottom-[12%] lg:w-[30%]">
        <div className="glass border-gold/20 p-6 lg:p-[1.5vw] shadow-[0_40px_90px_-20px_rgba(0,0,0,1)]">
          <T className="font-mono text-[10px] lg:text-[0.55vw] tracking-[0.3em] uppercase text-gold mb-3">Summary</T>
          <T className="text-silver text-sm lg:text-[0.82vw] leading-relaxed">{profile.about}</T>
          <T className="mt-4 border-2 border-gold/60 inline-block px-3 py-1 font-mono text-[10px] tracking-[0.3em] uppercase text-gold -rotate-6">Verified</T>
        </div>
      </Layer>

      <Layer depth={2.8} className="hidden lg:block lg:absolute lg:right-[30%] lg:top-[10%] pointer-events-none">
        <div className="h-[7vw] w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent" />
      </Layer>
    </Stage>
  );
}
