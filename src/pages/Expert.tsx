import { motion } from "framer-motion";
import { Link, useParams, Navigate, useNavigate } from "react-router-dom";
import { ArrowLeft, Instagram, Facebook, Youtube, Globe } from "lucide-react";
import avatarCurly from "@/assets/avatar-curly.png";
import avatarStraight from "@/assets/avatar-straight.png";
import { useLanguage } from "@/contexts/LanguageContext";

const experts = {
  curly: {
    team: "Team Curly",
    name: "Andreea Chircea",
    avatar: avatarCurly,
    bgClass: "from-rose/40 via-rose/10 to-cream",
    bioPlaceholder: "Bio expert — adaugă aici descrierea Andreei Chircea, specialistă în îngrijirea părului creț și ondulat.",
  },
  straight: {
    team: "Team Straight",
    name: "Andrada Cazacu",
    avatar: avatarStraight,
    bgClass: "from-sage/50 via-sage/15 to-cream",
    bioPlaceholder: "Bio expert — adaugă aici descrierea Andradei Cazacu, specialistă în îngrijirea părului drept și ondulat lejer.",
  },
} as const;

type ExpertKey = keyof typeof experts;

const socials = [
  { Icon: Instagram, label: "Instagram" },
  { Icon: Facebook, label: "Facebook" },
  { Icon: Youtube, label: "YouTube" },
  { Icon: Globe, label: "Website" },
];

const Expert = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();

  if (!id || !(id in experts)) {
    return <Navigate to="/teams" replace />;
  }
  const expert = experts[id as ExpertKey];

  return (
    <div className={`min-h-screen relative bg-gradient-to-br ${expert.bgClass}`}>
      <Link
        to="/teams"
        className="absolute top-6 left-6 z-20 inline-flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-primary bg-background/70 backdrop-blur-sm rounded-full px-4 py-2 border border-border"
      >
        <ArrowLeft size={16} /> {t("Înapoi")}
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-24 md:py-32"
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Image / avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative flex justify-center"
          >
            <div className="absolute inset-0 -z-0 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden bg-cream/70 border-4 border-background shadow-2xl">
              <img
                src={expert.avatar}
                alt={expert.name}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Image upload placeholder badge */}
            <div className="absolute bottom-2 right-2 md:right-8 bg-background/80 backdrop-blur-sm border border-dashed border-primary/40 rounded-full px-3 py-1 text-xs text-muted-foreground">
              {t("Slot foto")}
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-sm uppercase tracking-[0.25em] text-primary font-semibold">
              {expert.team}
            </p>
            <h1 className="mt-2 text-5xl md:text-6xl font-display font-bold text-foreground">
              {expert.name}
            </h1>

            <div className="mt-6 bg-card/70 backdrop-blur-sm border border-dashed border-border rounded-xl p-6 min-h-[140px]">
              <p className="text-muted-foreground leading-relaxed italic">
                {expert.bioPlaceholder}
              </p>
            </div>

            {/* Socials */}
            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
                {t("Social media")}
              </p>
              <div className="flex gap-3">
                {socials.map(({ Icon, label }) => (
                  <button
                    key={label}
                    aria-label={label}
                    className="w-11 h-11 rounded-full border border-dashed border-primary/40 bg-background/60 backdrop-blur-sm text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors flex items-center justify-center"
                  >
                    <Icon size={18} />
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <motion.button
              onClick={() => id === "curly" && navigate("/teams/curly/questionnaire")}
              whileHover={{ scale: 1.04, boxShadow: "0 15px 40px -10px hsl(var(--primary) / 0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="mt-8 inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-medium text-lg shadow-lg"
            >
              Descoperă secretele părului tău
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Expert;
