import { motion } from "framer-motion";
import { BookOpen, Clock, ExternalLink } from "lucide-react";
import { BlogDecorations } from "./BotanicalDecorations";

const articles = [
  {
    title: "Determină densitatea părului prin testul elasticului",
    excerpt: "O răsucire indică un fir gros, iar peste trei, un fir subțire. Spală părul uscat la două zile, cel normal zilnic sau rar, iar pe cel gras obligatoriu zilnic, evitând excesul de șampon.",
    category: "Ghid",
    readTime: "5 min",
    color: "bg-rose",
    url: "https://www.teenvogue.com/story/how-to-figure-out-your-hair-type-and-how-to-treat-it",
  },
  {
    title: "Identificarea celor 12 tipuri de păr (1A-4C)",
    excerpt: "Depinde de textura naturală, de la drept la foarte creț. Înțelegerea densității și porozității te ajută să alegi produsele ideale pentru hidratare, oferind fiecărei șuvițe îngrijirea specifică.",
    category: "Studiu",
    readTime: "7 min",
    color: "bg-sage",
    url: "https://www.vogue.in/beauty/content/there-are-12-hair-types-heres-how-to-identify-yours-according-to-a-trichologist",
  },
  {
    title: "Poți antrena părul să fie mai puțin gras?",
    excerpt: "Antrenarea părului prin spălări rare este un mit; producția de sebum este hormonală și genetică. Curățarea corectă a scalpului și utilizarea produselor adecvate sunt esențiale.",
    category: "Mituri",
    readTime: "6 min",
    color: "bg-cream",
    url: "https://www.voguearabia.com/article/can-you-really-train-your-hair-to-be-less-greasy",
  },
  {
    title: "Ritualurile de baie tradiționale revin în actualitate",
    excerpt: "Produse artizanale precum săpunurile de Alep, sărurile de la Marea Moartă sau uleiurile ayurvedice oferă o îngrijire autentică și terapeutică, transformând baia într-o experiență senzorială.",
    category: "Ingrediente",
    readTime: "8 min",
    color: "bg-rose",
    url: "https://www.vogue.in/content/the-vogue-guide-to-old-world-bath-gems-to-bring-back-from-your-next-holiday",
  },
  {
    title: "Ordinea aplicării produselor de styling",
    excerpt: "Începe cu texturile lejere, pe bază de apă, și încheie cu cele dense, precum uleiurile. Această tehnică sigilează hidratarea, protejează firul de căldură și oferă un aspect sănătos.",
    category: "Ghid",
    readTime: "5 min",
    color: "bg-sage",
    url: "https://www.voguescandinavia.com/articles/how-to-layer-your-hair-products",
  },
  {
    title: "Sănătatea scalpului: combate mâncărimea și uscăciunea",
    excerpt: "Exfoliere delicată, hidratare intensă și produse calmante. Identificarea cauzelor, de la stres la acumularea de reziduuri, este esențială pentru a reda echilibrul și strălucirea naturală.",
    category: "Scalp",
    readTime: "7 min",
    color: "bg-cream",
    url: "https://www.vogue.in/content/hair-care-experts-talk-about-scalp-problems-itchy-dry-and-solutions",
  },
  {
    title: "Sănătatea părului începe de la scalp",
    excerpt: "Curățare corectă și hidratare profundă. Evită spălarea excesivă și produsele agresive, alegând ingrediente hrănitoare care susțin bariera naturală și previn căderea firului.",
    category: "Educație",
    readTime: "6 min",
    color: "bg-rose",
    url: "https://www.voguescandinavia.com/articles/healthy-hair-and-scalp",
  },
  {
    title: "Îngrijirea personalizată a părului: luxul suprem",
    excerpt: "Formule unice adaptate stilului de viață și geneticii fiecăruia. Tehnologia modernă permite crearea unor produse specifice care maximizează sănătatea firului pentru rezultate remarcabile.",
    category: "Studiu",
    readTime: "8 min",
    color: "bg-sage",
    url: "https://www.voguearabia.com/article/how-custom-haircare-became-beautys-ultimate-luxury",
  },
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {articles.map((a, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6, boxShadow: "0 12px 32px -8px hsl(152 28% 38% / 0.15)" }}
              className="group bg-card rounded-2xl border border-border overflow-hidden transition-colors flex flex-col"
            >
              <div className={`h-3 ${a.color}`} />
              <div className="p-6 flex flex-col flex-1">
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
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {a.excerpt}
                </p>
                <a
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  <BookOpen size={16} />
                  Citește mai mult
                  <ExternalLink size={12} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
