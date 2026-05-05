import { motion } from "framer-motion";
import { Leaf, Heart, Sparkles } from "lucide-react";
import { AboutDecorations } from "./BotanicalDecorations";
import { useLanguage } from "@/contexts/LanguageContext";

const valueDefs = [
  { icon: Leaf, titleKey: "Bazat pe știință", descKey: "Toate recomandările noastre sunt susținute de cercetări dermatologice și tricologice." },
  { icon: Heart, titleKey: "Personalizat", descKey: "Fiecare tip de păr este unic. Oferim sfaturi adaptate nevoilor tale specifice." },
  { icon: Sparkles, titleKey: "Accesibil", descKey: "Informații clare, fără jargon, pentru ca toată lumea să poată avea grijă de părul său." },
];

const About = () => {
  const { t } = useLanguage();
  return (
    <section id="about" className="relative py-24 overflow-hidden">
      <AboutDecorations />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-sm font-medium tracking-widest uppercase text-accent mb-3">
            {t("Despre noi")}
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
            {t("Misiunea Hair Theory")}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t("La")} <span className="font-semibold text-primary">Hair Theory</span>,{" "}
            {t("credem că fiecare persoană merită să înțeleagă și să iubească părul pe care îl are. Misiunea noastră este de a transforma știința tricologică în sfaturi practice, accesibile tuturor — pentru un păr sănătos, frumos și plin de vitalitate.")}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {valueDefs.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -6, scale: 1.03 }}
              className="text-center p-8 rounded-2xl bg-card border border-border transition-shadow hover:shadow-lg"
            >
              <motion.div
                whileHover={{ rotate: 12, scale: 1.1 }}
                className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-5"
              >
                <v.icon size={28} />
              </motion.div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-3">
                {t(v.titleKey)}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t(v.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
