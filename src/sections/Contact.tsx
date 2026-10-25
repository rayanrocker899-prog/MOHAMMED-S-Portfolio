import { useState } from "react";
import { contact, profile } from "@/data/content";
import { Layer, SceneBackdrop, SceneHud, Stage, T } from "@/components/Stage";
import { Frame } from "@/components/ui";

export default function Contact() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = async (v: string) => {
    try { await navigator.clipboard.writeText(v); setCopied(v); setTimeout(() => setCopied(null), 1500); } catch { /* noop */ }
  };

  return (
    <>
      <Stage id="contact" length={150}>
        <SceneBackdrop numeral="07" word="Secure Connection" />
        <SceneHud code="07" label="Secure Connection" />

        {/* Deep targeting ring */}
        <Layer depth={-2.4} className="hidden lg:block lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 pointer-events-none">
          <div className="relative h-[48vw] w-[48vw] rounded-full border border-dashed border-gold/15 animate-[spin_90s_linear_infinite]">
            <div className="absolute inset-[12%] rounded-full border border-bone/5" />
            <div className="absolute inset-[30%] rounded-full border border-gold/10" />
            <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-bone/10 to-transparent" />
          </div>
        </Layer>

        <Layer depth={-0.8} className="lg:absolute lg:left-[8%] lg:top-[14%]">
          <T className="font-display font-light text-5xl lg:text-[5.2vw] leading-[0.95] text-bone/90">Establish<br />Contact</T>
          <T className="mt-3 text-silver text-sm lg:text-[0.75vw] max-w-xs">Channel open for collaborations, projects, event ideas, or simply to connect.</T>
        </Layer>

        {/* Mid: channel panel */}
        <Layer depth={0.4} className="lg:absolute lg:left-[38%] lg:top-[14%] lg:w-[44%]">
          <Frame className="glass p-6 lg:p-[1.6vw] shadow-[0_50px_100px_-30px_rgba(0,0,0,1)]">
            <T className="flex items-center justify-between mb-4 pb-3 border-b border-white/10 font-mono text-[9px] lg:text-[0.5vw] tracking-[0.3em] uppercase">
              <span className="text-silver">Encrypted Channel</span>
              <span className="flex items-center gap-2 text-gold"><span className="h-1.5 w-1.5 bg-gold animate-pulse" /> Online</span>
            </T>
            {[
              { k: "Email", v: contact.email, href: `mailto:${contact.email}`, copy: contact.email },
              { k: "Phone", v: contact.phoneDisplay, href: `tel:+91${contact.phone}`, copy: contact.phone },
              { k: "Location", v: contact.location },
            ].map((r) => (
              <T key={r.k} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-3 lg:py-[0.7vw] border-b border-white/5">
                <span className="font-mono text-[9px] lg:text-[0.5vw] tracking-[0.3em] uppercase text-silver/60 sm:w-24">{r.k}</span>
                {r.href ? <a href={r.href} className="font-display text-xl lg:text-[1.5vw] text-bone hover:text-gold transition-colors flex-1 break-all">{r.v}</a>
                  : <span className="font-display text-xl lg:text-[1.5vw] text-bone flex-1">{r.v}</span>}
                {r.copy && <button onClick={() => copy(r.copy!)} className="font-mono text-[9px] lg:text-[0.5vw] tracking-[0.3em] uppercase text-silver/60 hover:text-gold self-start sm:self-auto">{copied === r.copy ? "Copied" : "Copy"}</button>}
              </T>
            ))}
            <T className="mt-5 flex flex-wrap gap-3">
              <a href={`mailto:${contact.email}?subject=Hello%20Rayan`} className="group inline-flex items-center gap-3 bg-gold text-ink px-6 py-3 font-mono text-[10px] lg:text-[0.55vw] tracking-[0.3em] uppercase hover:bg-bone transition-colors">Send Message <span className="transition-transform group-hover:translate-x-1">→</span></a>
              <a href={`tel:+91${contact.phone}`} className="inline-flex items-center border border-bone/30 text-bone px-6 py-3 font-mono text-[10px] lg:text-[0.55vw] tracking-[0.3em] uppercase hover:border-gold hover:text-gold transition-colors">Call</a>
            </T>
          </Frame>
        </Layer>

        {/* Foreground: social channels plate */}
        <Layer depth={2} className="lg:absolute lg:left-[8%] lg:bottom-[12%] lg:w-[34%]">
          <div className="glass border-gold/20 p-5 lg:p-[1.2vw]">
            <T className="font-mono text-[9px] lg:text-[0.5vw] tracking-[0.3em] uppercase text-gold mb-3">Channels</T>
            <T className="flex flex-wrap gap-2">
              {contact.socials.map((s) => s.href
                ? <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="font-mono text-[10px] lg:text-[0.55vw] tracking-[0.3em] uppercase text-bone border border-bone/30 px-4 py-2.5 hover:border-gold hover:text-gold transition-colors">{s.label} ↗</a>
                : <span key={s.label} title="Profile link to be added" className="font-mono text-[10px] lg:text-[0.55vw] tracking-[0.3em] uppercase text-silver/50 border border-white/10 px-4 py-2.5">{s.label} · Pending</span>)}
            </T>
          </div>
        </Layer>

        <Layer depth={2.8} className="hidden lg:block lg:absolute lg:right-[6%] lg:bottom-[10%] text-right font-mono text-[0.5vw] tracking-[0.3em] uppercase text-silver/50">
          <T>End of Dossier</T><T>{profile.name}</T>
        </Layer>
      </Stage>

      {/* Credits strip */}
      <footer className="relative z-10 border-t border-white/10 bg-ink/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[9px] tracking-[0.3em] uppercase text-silver/50">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span className="font-display normal-case tracking-normal text-2xl text-bone/80 italic">Until next time.</span>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-gold transition-colors">↑ Return to top</button>
        </div>
      </footer>
    </>
  );
}
