import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import avatarCurly from "@/assets/avatar-curly.png";
import avatarStraight from "@/assets/avatar-straight.png";
import { useLanguage } from "@/contexts/LanguageContext";

type Side = {
  to: string;
  team: string;
  expert: string;
  avatar: string;
  // Tailwind classes for the side gradient/background
  baseBg: string;
  hoverBg: string;
  accent: string;
};

const sides: Side[] = [
  {
    to: "/teams/curly",
    team: "Team Curly",
    expert: "Andreea Chircea",
    avatar: avatarCurly,
    baseBg: "bg-gradient-to-br from-rose/40 via-rose/20 to-cream",
    hoverBg: "from-rose/70 via-rose-dark/40 to-sand/60",
    accent: "text-secondary-foreground",
  },
  {
    to: "/teams/straight",
    team: "Team Straight",
    expert: "Andrada Cazacu",
    avatar: avatarStraight,
    baseBg: "bg-gradient-to-br from-sage/50 via-sage/20 to-cream",
    hoverBg: "from-sage/80 via-sage-dark/40 to-cream",
    accent: "text-primary",
  },
];

const FloatingLeaf = ({ delay = 0, x = 0, y = 0 }: { delay?: number; x?: number; y?: number }) => (
  <motion.svg
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 0.7, 0.4], y: [y, y - 30, y], rotate: [0, 15, -10, 0] }}
    transition={{ duration: 6, repeat: Infinity, delay, ease: "easeInOut" }}
    className="absolute"
    style={{ left: `${x}%`, top: `${y}%` }}
    width="48" height="48" viewBox="0 0 24 24" fill="none"
  >
    <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" fill="currentColor"/>
  </motion.svg>
);

const TeamHalf = ({ side, isHovered, onHover, onLeave }: {
  side: Side;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) => {
  const { t } = useLanguage();
  return (
    <Link
      to={side.to}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`group relative flex-1 min-h-[50vh] md:min-h-screen flex items-center justify-center overflow-hidden cursor-pointer ${side.baseBg}`}
    >
      {/* Animated background overlay on hover */}
      <motion.div
        initial={false}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className={`absolute inset-0 bg-gradient-to-br ${side.hoverBg}`}
      />

      {/* Floating leaves appearing on hover */}
      <motion.div
        initial={false}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className={`absolute inset-0 pointer-events-none ${side.accent}`}
      >
        <FloatingLeaf x={10} y={20} delay={0} />
        <FloatingLeaf x={80} y={30} delay={1.2} />
        <FloatingLeaf x={20} y={70} delay={2.4} />
        <FloatingLeaf x={75} y={75} delay={0.6} />
        <FloatingLeaf x={50} y={15} delay={1.8} />
      </motion.div>

      {/* Decorative ring around avatar */}
      <motion.div
        initial={false}
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col items-center text-center px-6"
      >
        <div className="relative">
          <motion.div
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 20, ease: "linear", repeat: isHovered ? Infinity : 0 }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30"
          />
          <motion.div
            animate={{
              boxShadow: isHovered
                ? "0 20px 60px -10px hsl(var(--primary) / 0.35)"
                : "0 10px 30px -10px hsl(var(--primary) / 0.15)",
            }}
            transition={{ duration: 0.5 }}
            className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden bg-cream/60 backdrop-blur-sm border border-border"
          >
            {/* Hair flow animation: subtle vertical sway */}
            <motion.img
              src={side.avatar}
              alt={`${side.team} - ${side.expert}`}
              loading="lazy"
              animate={
                isHovered
                  ? { y: [0, -6, 0, 4, 0], rotate: [0, 1.5, -1, 0.8, 0], scale: 1.06 }
                  : { y: 0, rotate: 0, scale: 1 }
              }
              transition={{
                duration: 4,
                repeat: isHovered ? Infinity : 0,
                ease: "easeInOut",
              }}
              className="w-full h-full object-cover"
            />
            {/* Highlight glow */}
            <motion.div
              initial={false}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent"
            />
          </motion.div>
        </div>

        <motion.h2
          animate={{ y: isHovered ? -4 : 0 }}
          className="mt-8 text-4xl md:text-5xl font-display font-bold text-foreground"
        >
          {side.team}
        </motion.h2>
        <p className="mt-2 text-sm uppercase tracking-[0.2em] text-muted-foreground">
          {t("Expert")}
        </p>
        <p className="text-xl md:text-2xl font-display text-primary mt-1">{side.expert}</p>

        <motion.span
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0.6, y: isHovered ? 0 : 6 }}
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground/70 border-b border-foreground/30 pb-1"
        >
          {t("Intră în profil")} →
        </motion.span>
      </motion.div>
    </Link>
  );
};

import { useState } from "react";

const Teams = () => {
  const { t } = useLanguage();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="min-h-screen relative bg-background">
      <Link
        to="/"
        className="absolute top-6 left-6 z-50 inline-flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-primary bg-background/70 backdrop-blur-sm rounded-full px-4 py-2 border border-border"
      >
        <ArrowLeft size={16} /> {t("Înapoi")}
      </Link>

      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 text-center pointer-events-none">
        <p className="font-display text-2xl text-primary">Hair Theory</p>
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mt-1">
          {t("Alege-ți echipa")}
        </p>
      </div>

      <div className="flex flex-col md:flex-row min-h-screen">
        {sides.map((s, i) => (
          <TeamHalf
            key={s.to}
            side={s}
            isHovered={hovered === i}
            onHover={() => setHovered(i)}
            onLeave={() => setHovered(null)}
          />
        ))}
      </div>
    </div>
  );
};

export default Teams;
