import { motion } from "framer-motion";
import { Leaf, Star, Crown, Check, Calendar, Video, Utensils, UserCheck, Sparkles } from "lucide-react";

interface RoutineResultsProps {
  answers: (number | null)[];
  questions: { title: string; options: { label: string; description: string }[] }[];
}

const tiers = [
  {
    name: "Basic",
    icon: Leaf,
    price: "Gratuit",
    oldPrice: null,
    color: "primary",
    description: "Rutină personalizată cu sfaturi și tehnici adaptate profilului tău capilar.",
    buttonLabel: "Alege Basic - Recomandări AI",
    features: [
      "Rutină detaliată pas cu pas",
      "Sfaturi personalizate pentru tipul tău de scalp",
      "Recomandări de tipuri de produse (nu branduri)",
      "Tehnici de spălare și uscare adaptate",
      "Ghid de frecvență optimă de spălare",
      "Sfaturi pentru protecția părului în funcție de calitatea apei",
    ],
  },
  {
    name: "Pro",
    icon: Star,
    price: "29.99",
    oldPrice: "59.99",
    color: "accent",
    popular: true,
    description: "Tot ce include Basic, plus produse recomandate, video-uri demonstrative și calendar de rutină.",
    buttonLabel: "Disponibil în curând",
    disabled: true,
    features: [
      "Tot ce include rutina Basic",
      "Recomandări efective de produse specifice",
      "Video-uri demonstrative pentru tehnicile de îngrijire",
      "Calendar personalizat pentru rutina ta",
      "Urmărirea progresului în timp",
      "Actualizări lunare ale rutinei",
    ],
    extraIcons: [Video, Calendar],
  },
  {
    name: "Royal",
    icon: Crown,
    price: "99.99",
    oldPrice: "199.99",
    color: "warm",
    description: "Experiența completă: consultații profesionale, produse ultra-naturale și sfaturi holistice.",
    buttonLabel: "Disponibil în curând",
    disabled: true,
    features: [
      "Tot ce include rutina Pro",
      "Consultație personalizată cu un dermatolog",
      "Consultație cu un hairstylist profesionist",
      "Produse ultra-specifice și 100% naturale",
      "Sfaturi de nutriție pentru sănătatea părului",
      "Recomandări de odihnă și stil de viață",
      "Ghid holistic: suplimente, hidratare, stres",
    ],
    extraIcons: [UserCheck, Utensils, Sparkles],
  },
];

const RoutineResults = ({ answers, questions }: RoutineResultsProps) => {
  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
          Rutinele tale recomandate
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Pe baza profilului tău, am creat trei niveluri de rutine personalizate. Alege varianta care ți se potrivește.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {tiers.map((tier, idx) => {
          const Icon = tier.icon;
          return (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className={`relative bg-card rounded-2xl border-2 p-8 flex flex-col ${
                tier.popular
                  ? "border-accent shadow-xl scale-[1.03]"
                  : "border-border shadow-lg"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                  Cel mai popular
                </div>
              )}

              <div className="text-center mb-6">
                <Icon className="mx-auto mb-3 text-primary" size={40} />
                <h3 className="text-2xl font-display font-bold text-foreground">{tier.name}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {tier.description}
                </p>
              </div>

              <div className="text-center mb-6">
                {tier.oldPrice ? (
                  <>
                    <span className="text-sm text-muted-foreground line-through mr-2">
                      {tier.oldPrice}€
                    </span>
                    <span className="text-4xl font-display font-bold text-foreground">
                      {tier.price}
                    </span>
                    <span className="text-muted-foreground ml-1">€</span>
                    <div className="mt-1">
                      <span className="inline-block bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                        -50% PROMOȚIE
                      </span>
                    </div>
                  </>
                ) : (
                  <span className="text-4xl font-display font-bold text-foreground">
                    {tier.price}
                  </span>
                )}
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {tier.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="text-primary mt-0.5 shrink-0" size={16} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-lg font-semibold transition-opacity hover:opacity-90 ${
                  tier.popular
                    ? "bg-accent text-accent-foreground"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                Alege {tier.name}
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default RoutineResults;
