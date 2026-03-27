import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { Question, QuestionnaireAnswer } from "./types";
import { StraightHairSVG, WavyHairSVG, CurlyHairSVG, VeryСurlyHairSVG } from "./HairTypeSVGs";

import hairStraightImg from "@/assets/hair-type-straight.png";
import hairWavyImg from "@/assets/hair-type-wavy.png";
import hairCurlyImg from "@/assets/hair-type-curly.png";
import hairVeryCurlyImg from "@/assets/hair-type-very-curly.png";

const mainImages = [hairStraightImg, hairWavyImg, hairCurlyImg, hairVeryCurlyImg];
const mainIcons = [StraightHairSVG, WavyHairSVG, CurlyHairSVG, VeryСurlyHairSVG];
const subVariants = ['A', 'B', 'C'] as const;

const getSubIcon = (mainIndex: number, variant: 'A' | 'B' | 'C') => {
  const Icon = mainIcons[mainIndex];
  return <Icon variant={variant} className="w-12 h-12 text-primary" />;
};

interface Props {
  question: Question;
  answer: QuestionnaireAnswer;
  onSelect: (optIndex: number, subIndex?: number) => void;
}

const TwoStepHairType = ({ question, answer, onSelect }: Props) => {
  const [selectedMain, setSelectedMain] = useState<number | null>(
    answer.optionIndex !== null && answer.subOptionIndex !== null ? answer.optionIndex : null
  );
  const showSub = selectedMain !== null && question.subCategories?.[selectedMain];

  const handleMainSelect = (i: number) => {
    setSelectedMain(i);
  };

  const handleSubSelect = (subIdx: number) => {
    if (selectedMain !== null) {
      onSelect(selectedMain, subIdx);
    }
  };

  const handleBack = () => {
    setSelectedMain(null);
  };

  return (
    <div>
      <AnimatePresence mode="wait">
        {!showSub ? (
          <motion.div
            key="main"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            {question.options.map((opt, i) => {
              const isSelected = answer.optionIndex === i && answer.subOptionIndex !== null;
              return (
                <motion.button
                  key={i}
                  onClick={() => handleMainSelect(i)}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className={`text-left p-5 rounded-xl border-2 transition-all flex flex-col items-center text-center gap-3 ${
                    isSelected
                      ? "border-primary bg-primary/10 shadow-md"
                      : "border-border bg-card hover:border-primary/40 hover:shadow-sm"
                  }`}
                >
                  <img
                    src={mainImages[i]}
                    alt={opt.label}
                    className="w-24 h-24 object-contain"
                    loading="lazy"
                    width={512}
                    height={512}
                  />
                  <span className="font-semibold text-foreground">{opt.label}</span>
                  <p className="text-xs text-muted-foreground leading-relaxed">{opt.description}</p>
                  {isSelected && answer.subOptionIndex !== null && question.subCategories?.[i] && (
                    <span className="text-xs font-medium text-primary mt-1">
                      ✓ {question.subCategories[i][answer.subOptionIndex!].code}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            key="sub"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={handleBack}
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground mb-4 transition-colors text-sm"
            >
              <ChevronLeft size={16} /> Înapoi la categorii
            </button>

            <p className="text-sm text-muted-foreground mb-4">
              Ai ales <span className="font-semibold text-foreground">{question.options[selectedMain!].label}</span>. Selectează subtipul:
            </p>

            <div className="grid gap-3">
              {question.subCategories![selectedMain!].map((sub, si) => {
                const isSelected = answer.optionIndex === selectedMain && answer.subOptionIndex === si;
                return (
                  <motion.button
                    key={si}
                    onClick={() => handleSubSelect(si)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: si * 0.08 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                      isSelected
                        ? "border-primary bg-primary/10 shadow-md"
                        : "border-border bg-card hover:border-primary/40 hover:shadow-sm"
                    }`}
                  >
                    <div className="shrink-0">
                      {getSubIcon(selectedMain!, subVariants[si])}
                    </div>
                    <div>
                      <span className="font-bold text-primary text-lg">{sub.code}</span>
                      <span className="font-semibold text-foreground ml-2">{sub.label}</span>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{sub.description}</p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TwoStepHairType;
