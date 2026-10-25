import { profile } from "@/data/content";
import { Layer, SceneBackdrop, Stage, T } from "@/components/Stage";
import { GoldButton } from "@/components/ui";
import { scrollToSection } from "@/lib/motion";

export default function Hero({ ready }: { ready: boolean }) {
  return (
    <Stage id="intro" intro ready={ready} length={110}>
      <SceneBackdrop numeral="00" />

      {/* Far background: giant watermark initials */}
      <Layer depth={-2.5} className="hidden lg:block lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 pointer-events-none select-none">
        <div className="font-display text-[34vw] leading-none text-white/[0.03] whitespace-nowrap">MRB</div>
      </Layer>

      {/* Background coordinates */}
      <Layer depth={-1} className="hidden lg:block lg:absolute lg:left-[4%] lg:bottom-[10%] font-mono text-[10px] tracking-[0.3em] uppercase text-silver/40 space-y-1">
        <T>LAT 13.0827° N</T>
        <T>LNG 80.2707° E</T>
        <T>CHENNAI · IN</T>
      </Layer>
      <Layer depth={-1} className="hidden lg:block lg:absolute lg:right-[4%] lg:bottom-[10%] text-right font-mono text-[10px] tracking-[0.3em] uppercase text-silver/40 space-y-1">
        <T>Dossier 2025–2029</T>
        <T>Status · Active</T>
      </Layer>

      {/* Mid: label + name */}
      <Layer depth={0} className="lg:absolute lg:left-[8%] lg:top-[24%] lg:w-[70%]">
        <T className="flex items-center gap-4 mb-6">
          <span className="h-px w-14 bg-gold" />
          <span className="font-mono text-[10px] lg:text-[0.6vw] tracking-[0.4em] uppercase text-gold">Personnel Dossier · Subject 001</span>
        </T>
        <h1 className="font-display font-light text-bone leading-[0.88] tracking-tight">
          <T as="span" className="block text-[14vw] lg:text-[7.4vw]">{profile.firstName}</T>
        </h1>
      </Layer>

      {/* Nearer: last name pulled forward in Z */}
      <Layer depth={0.9} className="lg:absolute lg:left-[14%] lg:top-[45%]">
        <h1 className="font-display font-light leading-[0.88] tracking-tight">
          <T as="span" className="block text-[14vw] lg:text-[7.4vw] italic text-gold/90 drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]">{profile.lastName}</T>
        </h1>
      </Layer>

      {/* Foreground glass panel with headline + CTAs */}
      <Layer depth={1.8} className="lg:absolute lg:right-[6%] lg:bottom-[12%] lg:w-[34%]">
        <div className="glass p-6 lg:p-[1.6vw] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)]">
          <T className="font-mono text-[11px] lg:text-[0.62vw] tracking-[0.2em] uppercase text-bone/85 leading-loose">
            {profile.headline.split(" | ").map((h, i) => (
              <span key={h} className="block"><span className="text-gold/70 mr-3">0{i + 1}</span>{h}</span>
            ))}
          </T>
          <T className="mt-4 text-silver text-sm lg:text-[0.8vw] leading-relaxed">{profile.intro}</T>
          <T className="mt-5 flex flex-wrap gap-3">
            <GoldButton onClick={() => scrollToSection("about")}>Explore My Portfolio</GoldButton>
            <GoldButton onClick={() => scrollToSection("projects")} variant="ghost">View My Projects</GoldButton>
          </T>
        </div>
      </Layer>

      {/* Nearest: floating HUD geometry */}
      <Layer depth={2.6} className="hidden lg:block lg:absolute lg:left-[6%] lg:top-[12%] pointer-events-none">
        <div className="h-[6vw] w-[6vw] border border-gold/25 rotate-45" />
      </Layer>
      <Layer depth={3} className="hidden lg:block lg:absolute lg:right-[20%] lg:top-[16%] pointer-events-none">
        <div className="h-[10vw] w-[10vw] rounded-full border border-bone/10" />
        <div className="absolute inset-[18%] rounded-full border border-gold/25" />
      </Layer>

      <Layer depth={1} className="hidden lg:flex lg:absolute lg:bottom-[5%] lg:left-1/2 lg:-translate-x-1/2 flex-col items-center gap-3 font-mono text-[9px] tracking-[0.4em] uppercase text-silver/70">
        <T>Scroll to begin</T>
        <span className="relative h-10 w-px bg-white/10 overflow-hidden">
          <span className="absolute inset-x-0 top-0 h-4 bg-gold animate-[drop_1.8s_ease-in-out_infinite]" />
        </span>
      </Layer>
      <style>{`@keyframes drop{0%{transform:translateY(-100%)}100%{transform:translateY(300%)}}`}</style>
    </Stage>
  );
}
