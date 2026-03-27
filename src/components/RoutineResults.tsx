import { useState } from "react";
import { motion } from "framer-motion";
import { Leaf, Star, Crown, Check, Calendar, Video, Utensils, UserCheck, Sparkles, ArrowRight, X, Droplets, Wind, Scissors, Heart, Apple, Moon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface RoutineResultsProps {
  answers: (number | null)[];
  questions: { title: string; options: { label: string; description: string }[] }[];
  hasMedicalCondition?: boolean;
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

const BasicRoutineDialog = ({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: "Produse recomandate", icon: Droplets },
    { label: "Rutina de aplicare", icon: Wind },
    { label: "Sfaturi & Nutriție", icon: Heart },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <Leaf className="text-primary" size={28} />
            Rutina ta Basic — Recomandări AI
          </DialogTitle>
        </DialogHeader>

        {/* Tab navigation */}
        <div className="flex border-b border-border px-6">
          {tabs.map((tab, idx) => {
            const TabIcon = tab.icon;
            return (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === idx
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <TabIcon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div className="p-6 min-h-[300px]">
          {activeTab === 0 && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Ordinea de aplicare a produselor</h3>
              <div className="flex flex-col items-center gap-2">
                {/* Empty product slots - to be populated later */}
                {["Pasul 1", "Pasul 2", "Pasul 3", "Pasul 4", "Pasul 5"].map((step, i, arr) => (
                  <div key={i} className="w-full">
                    <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
                      <p className="text-muted-foreground font-medium">{step}</p>
                      <p className="text-xs text-muted-foreground/60 mt-1">Produs recomandat — va fi completat</p>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="flex justify-center py-1">
                        <ArrowRight className="text-primary rotate-90" size={20} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 1 && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Cum să aplici fiecare produs</h3>
              <div className="space-y-4">
                {["Pasul 1", "Pasul 2", "Pasul 3", "Pasul 4", "Pasul 5"].map((step, i) => (
                  <div key={i} className="border border-border rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                        {i + 1}
                      </span>
                      <h4 className="font-semibold text-foreground">{step}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground ml-11">
                      Instrucțiuni de aplicare — vor fi completate ulterior.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 2 && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Sfaturi pentru sănătate și nutriție</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Apple, title: "Nutriție", placeholder: "Sfaturi alimentare — vor fi completate." },
                  { icon: Droplets, title: "Hidratare", placeholder: "Recomandări de hidratare — vor fi completate." },
                  { icon: Moon, title: "Odihnă", placeholder: "Sfaturi pentru somn — vor fi completate." },
                  { icon: Scissors, title: "Îngrijire generală", placeholder: "Sfaturi generale — vor fi completate." },
                ].map((card, i) => {
                  const CardIcon = card.icon;
                  return (
                    <div key={i} className="border border-border rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <CardIcon className="text-primary" size={20} />
                        <h4 className="font-semibold text-foreground">{card.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">{card.placeholder}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const RoutineResults = ({ answers, questions, hasMedicalCondition = false }: RoutineResultsProps) => {
  const [showBasicDialog, setShowBasicDialog] = useState(false);

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
          const isBasic = tier.name === "Basic";
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
                disabled={'disabled' in tier && tier.disabled}
                onClick={isBasic ? () => setShowBasicDialog(true) : undefined}
                className={`w-full py-3 rounded-lg font-semibold transition-opacity ${
                  'disabled' in tier && tier.disabled
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : tier.popular
                      ? "bg-accent text-accent-foreground hover:opacity-90"
                      : "bg-primary text-primary-foreground hover:opacity-90"
                }`}
              >
                {tier.buttonLabel}
              </button>
            </motion.div>
          );
        })}
      </div>

      <BasicRoutineDialog open={showBasicDialog} onOpenChange={setShowBasicDialog} />
    </div>
  );
};

export default RoutineResults;
