import { useState } from "react";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import { Question, QuestionnaireAnswer } from "./types";
import { LowPorositySVG, MediumPorositySVG, HighPorositySVG, SlipTestSVG } from "./HairTypeSVGs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const porosityIcons = [LowPorositySVG, MediumPorositySVG, HighPorositySVG];

interface Props {
  question: Question;
  answer: QuestionnaireAnswer;
  onSelect: (optIndex: number) => void;
}

const PorosityQuestion = ({ question, answer, onSelect }: Props) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className="grid gap-4">
        {question.options.map((opt, i) => {
          const selected = answer.optionIndex === i;
          const Icon = porosityIcons[i];
          return (
            <motion.button
              key={i}
              onClick={() => onSelect(i)}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              animate={selected ? { scale: 1.02 } : { scale: 1 }}
              className={`text-left p-5 rounded-xl border-2 transition-all flex items-start gap-4 ${
                selected
                  ? "border-primary bg-primary/10 shadow-md"
                  : "border-border bg-card hover:border-primary/40 hover:shadow-sm"
              }`}
            >
              <div className="shrink-0 mt-1">
                <Icon className="w-12 h-12 text-foreground" />
              </div>
              <div>
                <span className="font-semibold text-foreground">{opt.label}</span>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{opt.description}</p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Test button */}
      {question.testModal && (
        <motion.button
          onClick={() => setShowModal(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-4 w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-dashed border-primary/40 text-primary text-sm font-medium hover:bg-primary/5 transition-colors"
        >
          <HelpCircle size={16} />
          {question.testModal.buttonLabel}
        </motion.button>
      )}

      {/* Slip and Slide Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-display">
              {question.testModal?.title}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Instrucțiuni pentru testul de porozitate
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex justify-center py-2">
              <SlipTestSVG className="w-full max-w-[240px] text-foreground" />
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {question.testModal?.instructions}
            </p>

            <div className="space-y-3">
              <h4 className="font-semibold text-foreground text-sm">Interpretare:</h4>
              {question.testModal?.results.map((r, i) => (
                <div key={i} className="bg-muted rounded-lg p-3">
                  <p className="text-sm text-muted-foreground">{r.condition}</p>
                  <p className="text-sm font-semibold text-primary mt-1">→ {r.result}</p>
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowModal(false)}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Am înțeles
            </motion.button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PorosityQuestion;
