import { motion } from "framer-motion";
import { BookOpen, Clock } from "lucide-react";
import { BlogDecorations } from "./BotanicalDecorations";

const articles = [
  { title: "Cum să îți identifici tipul de păr corect", excerpt: "Ghid complet pentru a înțelege structura firului de păr și cum să îl îngrijești eficient.", category: "Ghid", readTime: "5 min", color: "bg-rose" },
  { title: "Porozitatea părului: de ce contează", excerpt: "Studiile arată că porozitatea influențează absorbția produselor. Află cum să o testezi acasă.", category: "Studiu", readTime: "7 min", color: "bg-sage" },
  { title: "5 ingrediente naturale pentru un scalp sănătos", excerpt: "De la ulei de cocos la aloe vera – ingredientele validate de știință pentru hidratare și echilibru.", category: "Ingrediente", readTime: "4 min", color: "bg-cream" },
  { title: "Efectele tratamentelor chimice asupra cuticulei", excerpt: "Ce se întâmplă la nivel molecular când vopsești sau decolorezi părul și cum să minimizezi daunele.", category: "Studiu", readTime: "8 min", color: "bg-rose" },
  { title: "Rutina perfectă de spălare pentru fiecare tip de păr", excerpt: "Frecvența, temperatura apei și ordinea produselor – totul contează pentru un păr sănătos.", category: "Ghid", readTime: "6 min", color: "bg-sage" },
  { title: "Miturile despre creșterea părului demontate", excerpt: "Tăierea vârfurilor face părul să crească mai repede? Separăm faptele de ficțiune.", category: "Educație", readTime: "5 min", color: "bg-cream" },
];

const Blog = () => {
  return (
    <section id="blog" className="relative py-24 overflow-hidden">
      <BlogDecorations />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium tracking-widest uppercase text-accent mb-3">
            Resurse
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Blog & Studii
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Articole bazate pe cercetare pentru a-ți înțelege și îngriji mai bine părul.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((a, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, boxShadow: "0 12px 32px -8px hsl(152 28% 38% / 0.15)" }}
              className="group bg-card rounded-2xl border border-border overflow-hidden cursor-pointer transition-colors"
            >
              <div className={`h-3 ${a.color}`} />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {a.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock size={12} /> {a.readTime}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors mb-2">
                  {a.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {a.excerpt}
                </p>
                <motion.div
                  className="mt-4 flex items-center gap-1 text-sm font-medium text-primary"
                  whileHover={{ x: 4 }}
                >
                  <BookOpen size={16} /> Citește mai mult
                </motion.div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
