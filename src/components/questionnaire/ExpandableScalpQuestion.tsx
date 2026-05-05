import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { Question, QuestionnaireAnswer } from "./types";
import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  question: Question;
  answer: QuestionnaireAnswer;
  onSelect: (optIndex: number, subIndex?: number) => void;
}

const ExpandableScalpQuestion = ({ question, answer, onSelect }: Props) => {
  const { t } = useLanguage();
  const isExpandedSelected = answer.optionIndex === question.options.length;
  const expandable = question.expandableOption;

  return (
    <div className="grid gap-4">
      {question.options.map((opt, i) => {
        const selected = answer.optionIndex === i;
        return (
          <motion.button
            key={i}
            onClick={() => onSelect(i)}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            animate={selected ? { scale: 1.02 } : { scale: 1 }}
            className={`text-left p-5 rounded-xl border-2 transition-all ${
              selected
                ? "border-primary bg-primary/10 shadow-md"
                : "border-border bg-card hover:border-primary/40 hover:shadow-sm"
            }`}
          >
            <span className="font-semibold text-foreground">{t(opt.label)}</span>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{t(opt.description)}</p>
          </motion.button>
        );
      })}

      {/* Expandable dermatological option */}
      {expandable && (
        <div>
          <motion.button
            onClick={() => onSelect(question.options.length, isExpandedSelected ? undefined : undefined)}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            animate={isExpandedSelected ? { scale: 1.02 } : { scale: 1 }}
            className={`w-full text-left p-5 rounded-xl border-2 transition-all ${
              isExpandedSelected
                ? "border-accent bg-accent/10 shadow-md"
                : "border-border bg-card hover:border-accent/40 hover:shadow-sm"
            }`}
          >
            <div className="flex items-center gap-2">
              <AlertCircle size={18} className="text-accent-foreground shrink-0" />
              <span className="font-semibold text-foreground">{t(expandable.label)}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{t(expandable.description)}</p>
          </motion.button>

          <AnimatePresence>
            {isExpandedSelected && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="mt-3 ml-4 pl-4 border-l-2 border-accent/30 space-y-2">
                  {expandable.subOptions.map((sub, si) => {
                    const subSelected = answer.expandableSubIndex === si;
                    return (
                      <motion.button
                        key={si}
                        onClick={() => onSelect(question.options.length, si)}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: si * 0.06 }}
                        whileHover={{ x: 4 }}
                        className={`w-full text-left p-4 rounded-lg border transition-all flex items-start gap-3 ${
                          subSelected
                            ? "border-primary bg-primary/10 shadow-sm"
                            : "border-border bg-card/60 hover:border-primary/30"
                        }`}
                      >
                        <div className={`mt-0.5 w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
                          subSelected ? "border-primary bg-primary" : "border-muted-foreground/40"
                        }`}>
                          {subSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-2 h-2 rounded-full bg-primary-foreground"
                            />
                          )}
                        </div>
                        <div>
                          <span className="font-medium text-foreground text-sm">{t(sub.label)}</span>
                          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{t(sub.description)}</p>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default ExpandableScalpQuestion;
