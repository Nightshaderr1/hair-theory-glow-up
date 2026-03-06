import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Maria D.",
    text: "Am descoperit că am porozitate ridicată și am schimbat complet rutina. Diferența este enormă!",
    rating: 5,
  },
  {
    name: "Andreea P.",
    text: "Chestionarul m-a ajutat să înțeleg de ce produsele pe care le foloseam nu funcționau. Foarte util!",
    rating: 5,
  },
  {
    name: "Ioana M.",
    text: "Articolele de pe blog sunt bine documentate și ușor de înțeles. Recomand tuturor!",
    rating: 4,
  },
  {
    name: "Elena S.",
    text: "În sfârșit un loc unde găsesc informații bazate pe știință, nu pe tendințe trecătoare.",
    rating: 5,
  },
];

const Reviews = () => {
  return (
    <section id="reviews" className="py-24 bg-rose/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium tracking-widest uppercase text-accent mb-3">
            Comunitate
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Ce spun cititorii noștri
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-2xl p-8 border border-border shadow-sm"
            >
              <Quote className="text-primary/30 mb-4" size={32} />
              <p className="text-foreground leading-relaxed mb-4 italic">"{r.text}"</p>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">{r.name}</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star
                      key={si}
                      size={16}
                      className={si < r.rating ? "fill-accent text-accent" : "text-sand"}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
