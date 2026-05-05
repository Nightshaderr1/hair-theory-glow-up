import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReviewsDecorations } from "./BotanicalDecorations";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";

// Mini logo component used as "star" rating
const MiniLogo = ({
  filled,
  onClick,
  index,
}: {
  filled: boolean;
  onClick: () => void;
  index: number;
}) => {
  const [popped, setPopped] = useState(false);

  const handleClick = () => {
    onClick();
    setPopped(true);
    setTimeout(() => setPopped(false), 400);
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      animate={popped ? { scale: [1, 1.5, 1] } : {}}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="focus:outline-none cursor-pointer"
      aria-label={`${index + 1} stele`}
    >
      <img
        src="/lovable-uploads/9f7bacae-db23-4074-a5d2-542fb1bf962c.png"
        alt="Rating"
        className={`w-8 h-8 md:w-10 md:h-10 transition-all duration-200 ${
          filled ? "opacity-100 saturate-100" : "opacity-30 saturate-0"
        }`}
      />
    </motion.button>
  );
};

// Placeholder for future reviews from DB
interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
}

const sampleReviews: Review[] = [];

const Reviews = () => {
  const { t } = useLanguage();
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isLoggedIn] = useState(false); // Will be connected to auth later
  const [reviews] = useState<Review[]>(sampleReviews);

  // Filter: only 4-5 star reviews with less than 30 words
  const displayedReviews = reviews.filter(
    (r) => r.rating >= 4 && r.text.split(/\s+/).length < 30
  );

  const handleSubmit = () => {
    if (!isLoggedIn) return;
    // Future: save to database
    console.log("Review submitted:", { rating, text: reviewText });
  };

  return (
    <section id="reviews" className="relative py-24 bg-rose/30 overflow-hidden">
      <ReviewsDecorations />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium tracking-widest uppercase text-accent mb-3">
            {t("Comunitate")}
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            {t("Recenzii")}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t("Spune-ne ce crezi. Opinia ta este foarte importantă pentru noi!")}
          </p>
        </div>

        {/* Review Form */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
            {!isLoggedIn ? (
              <div className="text-center py-6">
                <p className="text-muted-foreground mb-4">
                  {t("Trebuie să fii autentificat pentru a lăsa o recenzie.")}
                </p>
                <Button className="rounded-full">
                  {t("Sign up / Log in")}
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Rating with mini logos */}
                <div className="flex flex-col items-center gap-3">
                  <span className="text-sm font-medium text-foreground">
                    {t("Acordă-ne o notă")}
                  </span>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <MiniLogo
                        key={star}
                        index={star - 1}
                        filled={star <= rating}
                        onClick={() => setRating(star)}
                      />
                    ))}
                  </div>
                </div>

                {/* Review text */}
                <Textarea
                  placeholder={t("Scrie recenzia ta aici...")}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="min-h-[100px] resize-none bg-background"
                />

                <div className="flex justify-end">
                  <Button
                    onClick={handleSubmit}
                    disabled={rating === 0 || reviewText.trim().length === 0}
                    className="rounded-full"
                  >
                    {t("Trimite recenzia")}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Display Reviews */}
        {displayedReviews.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <AnimatePresence>
              {displayedReviews.map((r) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-card rounded-2xl p-8 border border-border shadow-sm"
                >
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <img
                        key={star}
                        src="/lovable-uploads/9f7bacae-db23-4074-a5d2-542fb1bf962c.png"
                        alt=""
                        className={`w-5 h-5 ${
                          star <= r.rating ? "opacity-100 saturate-100" : "opacity-30 saturate-0"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-foreground leading-relaxed mb-4 italic">
                    "{r.text}"
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">{r.name}</span>
                    <span className="text-xs text-muted-foreground">{r.date}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground text-sm">
              {t("Nu există recenzii momentan. Fii primul care lasă o recenzie!")}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;
