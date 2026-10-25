import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { skills } from "@/data/content";
import { Layer, SceneBackdrop, SceneHud, Stage, T } from "@/components/Stage";

const groups = [
  { key: "professional", label: "Professional Skills", code: "CAP-A", items: skills.professional },
  { key: "technical", label: "Technical Interests", code: "CAP-B", items: skills.technical },
  { key: "interests", label: "Areas of Interest", code: "CAP-C", items: skills.interests },
];

function Radar({ active }: { active: number }) {
  const items = groups[active].items;
  const n = items.length, R = 150;
  return (
    <svg viewBox="-210 -210 420 420" className="w-full">
      {[0.33, 0.66, 1].map((k) => <circle key={k} r={R * k} fill="none" stroke="rgba(232,228,220,0.08)" strokeWidth="0.8" />)}
      <circle r={R} fill="none" stroke="rgba(201,169,97,0.25)" strokeDasharray="2 6" strokeWidth="0.8" />
      <motion.g key={active} initial={{ rotate: -30, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
        {items.map((it, i) => {
          const a = (i / n) * Math.PI * 2 - Math.PI / 2;
          const x = Math.cos(a) * R, y = Math.sin(a) * R;
          return (
            <g key={it}>
              <line x1="0" y1="0" x2={x} y2={y} stroke="rgba(201,169,97,0.35)" strokeWidth="0.6" />
              <motion.circle cx={x} cy={y} r="4" fill="#050505" stroke="#c9a961" strokeWidth="1" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 + i * 0.07 }} />
              <text x={Math.cos(a) * (R + 22)} y={Math.sin(a) * (R + 22)} textAnchor={Math.abs(Math.cos(a)) < 0.2 ? "middle" : Math.cos(a) > 0 ? "start" : "end"} dominantBaseline="middle" fontSize="9" fontFamily="IBM Plex Mono, monospace" letterSpacing="1" fill="rgba(232,228,220,0.75)">{it.toUpperCase()}</text>
            </g>
          );
        })}
        <polygon points={items.map((_, i) => { const a = (i / n) * Math.PI * 2 - Math.PI / 2; return `${Math.cos(a) * R * 0.72},${Math.sin(a) * R * 0.72}`; }).join(" ")} fill="rgba(201,169,97,0.06)" stroke="rgba(201,169,97,0.5)" strokeWidth="0.8" />
      </motion.g>
      <circle r="3" fill="#c9a961" />
    </svg>
  );
}

export default function Skills() {
  const [active, setActive] = useState(0);
  return (
    <Stage id="skills" length={150}>
      <SceneBackdrop numeral="05" word="Capability Assessment" />
      <SceneHud code="05" label="Capability Assessment" pos="tr" />

      <Layer depth={-1} className="lg:absolute lg:left-[8%] lg:top-[14%]">
        <T className="font-display font-light text-5xl lg:text-[5vw] leading-[0.95] text-bone/90">Skills &<br />Interests</T>
        <T className="mt-3 text-silver text-sm lg:text-[0.75vw] max-w-xs">Capabilities are stated, not scored.</T>
      </Layer>

      {/* Radar mid-ground, center-right */}
      <Layer depth={0} className="lg:absolute lg:left-[46%] lg:top-[8%] lg:w-[34%]">
        <div className="relative">
          <div className="absolute inset-[-10%] rounded-full bg-[radial-gradient(circle,rgba(201,169,97,0.08),transparent_60%)]" />
          <Radar active={active} />
        </div>
      </Layer>

      {/* Foreground: group selector */}
      <Layer depth={1.6} className="lg:absolute lg:left-[8%] lg:bottom-[12%] lg:w-[30%]">
        <div role="tablist" aria-label="Skill groups" className="space-y-2">
          {groups.map((g, i) => (
            <T key={g.key}>
              <button role="tab" aria-selected={active === i} onClick={() => setActive(i)}
                className={`w-full text-left flex items-center justify-between px-4 py-3 lg:px-[1vw] lg:py-[0.7vw] border glass transition-all duration-300 ${active === i ? "border-gold/60 bg-gold/5" : "border-white/10 hover:border-white/25"}`}>
                <span className="flex items-center gap-3">
                  <span className={`font-mono text-[9px] lg:text-[0.5vw] tracking-[0.3em] ${active === i ? "text-gold" : "text-silver/60"}`}>{g.code}</span>
                  <span className={`font-display text-lg lg:text-[1.2vw] ${active === i ? "text-bone" : "text-silver"}`}>{g.label}</span>
                </span>
                <span className="font-mono text-[9px] text-silver/50">{g.items.length.toString().padStart(2, "0")}</span>
              </button>
            </T>
          ))}
        </div>
      </Layer>

      {/* Nearest: chips */}
      <Layer depth={2.4} className="lg:absolute lg:right-[5%] lg:bottom-[12%] lg:w-[26%]">
        <AnimatePresence mode="wait">
          <motion.ul key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="flex flex-wrap gap-2 lg:justify-end">
            {groups[active].items.map((it, i) => (
              <motion.li key={it} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} data-hover
                className="font-mono text-[10px] lg:text-[0.52vw] tracking-[0.2em] uppercase text-bone/85 glass px-3 py-2 hover:border-gold/60 hover:text-gold transition-colors">{it}</motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </Layer>
    </Stage>
  );
}
