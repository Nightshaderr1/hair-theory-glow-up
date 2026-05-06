import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, CheckCircle2, Send } from "lucide-react";
import { QuestionnaireDecorations } from "./BotanicalDecorations";
import { questions } from "./questionnaire/questions-data";
import { QuestionnaireAnswer } from "./questionnaire/types";
import ExpandableScalpQuestion from "./questionnaire/ExpandableScalpQuestion";
import TwoStepHairType from "./questionnaire/TwoStepHairType";
import PorosityQuestion from "./questionnaire/PorosityQuestion";
import { getQuestionIcon } from "./questionnaire/QuestionIcons";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";

const Questionnaire = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuestionnaireAnswer[]>(
    questions.map(() => ({ optionIndex: null, subOptionIndex: null, expandableSubIndex: null }))
  );
  const [submitted, setSubmitted] = useState(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [twoStepInSub, setTwoStepInSub] = useState(false);
  const exitSubRef = useRef<(() => void) | null>(null);

  const currentQ = questions[step];

  const updateAnswer = (optIndex: number, subIndex?: number) => {
    const next = [...answers];
    const currentType = currentQ.type;

    if (currentType === "expandable" && optIndex === currentQ.options.length) {
      // Expandable option selected
      if (next[step].optionIndex === optIndex && subIndex === undefined) {
        // Deselect/collapse
        next[step] = { optionIndex: null, expandableSubIndex: null };
      } else {
        next[step] = { optionIndex: optIndex, expandableSubIndex: subIndex ?? null };
      }
    } else if (currentType === "two-step") {
      next[step] = { optionIndex: optIndex, subOptionIndex: subIndex ?? null };
    } else {
      next[step] = { optionIndex: optIndex };
    }
    setAnswers(next);
  };

  const isCurrentAnswered = () => {
    const a = answers[step];
    if (a.optionIndex === null) return false;
    if (currentQ.type === "expandable" && a.optionIndex === currentQ.options.length) {
      return a.expandableSubIndex !== null;
    }
    if (currentQ.type === "two-step") {
      return a.subOptionIndex !== null;
    }
    return true;
  };

  const scrollToTop = () => {
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const goNext = () => {
    if (step < questions.length - 1) setStep(step + 1);
    else setSubmitted(true);
    scrollToTop();
  };

  const goPrev = () => {
    if (step > 0) setStep(step - 1);
    scrollToTop();
  };

  const getAnswerLabel = (qIndex: number): string => {
    const a = answers[qIndex];
    const q = questions[qIndex];
    if (a.optionIndex === null) return "—";

    if (q.type === "expandable" && a.optionIndex === q.options.length && q.expandableOption) {
      const subLabel = a.expandableSubIndex !== null
        ? t(q.expandableOption.subOptions[a.expandableSubIndex].label)
        : "";
      return `${t(q.expandableOption.label)}${subLabel ? ` — ${subLabel}` : ""}`;
    }

    if (q.type === "two-step" && q.subCategories && a.subOptionIndex !== null) {
      const sub = q.subCategories[a.optionIndex]?.[a.subOptionIndex];
      return `${t(q.options[a.optionIndex].label)} — ${sub?.code} ${t(sub?.label ?? "")}`;
    }

    return t(q.options[a.optionIndex]?.label ?? "—");
  };



  if (submitted) {
    return (
      <section id="questionnaire" className="relative py-24 bg-sage/20 overflow-hidden">
        <QuestionnaireDecorations />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center bg-card rounded-2xl p-12 shadow-lg border border-border mb-16"
          >
            <CheckCircle2 className="mx-auto mb-6 text-primary" size={64} />
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              {t("Verifică răspunsurile tale")}
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              {t("Verifică răspunsurile de mai jos. Când ești gata, trimite-le experților noștri.")}
            </p>
            <div className="bg-muted rounded-xl p-6 text-left space-y-3">
              {questions.map((q, i) => (
                <div key={i}>
                  <span className="text-sm font-medium text-foreground">{t(q.title)}</span>
                  <span className="ml-2 text-sm text-primary font-semibold">
                    {getAnswerLabel(i)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setSubmitted(false);
                  setStep(0);
                  setAnswers(questions.map(() => ({ optionIndex: null, subOptionIndex: null, expandableSubIndex: null })));
                }}
                className="bg-muted text-foreground border border-border px-6 py-3 rounded-lg font-medium hover:bg-muted/70 transition-colors"
              >
                {t("Reia chestionarul")}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSubmitDialog(true)}
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                <Send size={18} />
                {t("Trimite răspunsurile")}
              </motion.button>
            </div>
          </motion.div>
        </div>

        <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
          <DialogContent className="max-w-md text-center">
            <DialogHeader>
              <DialogTitle className="text-2xl font-display flex items-center justify-center gap-2">
                <CheckCircle2 className="text-primary" size={28} />
                {t("Răspunsuri trimise!")}
              </DialogTitle>
              <DialogDescription className="text-base text-muted-foreground pt-3 leading-relaxed">
                {t("Răspunsurile tale au fost trimise și vor fi analizate de experții noștri în curând. Te vom contacta cu recomandări personalizate.")}
              </DialogDescription>
            </DialogHeader>
            <button
              onClick={() => setShowSubmitDialog(false)}
              className="mt-4 w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              {t("Am înțeles")}
            </button>
          </DialogContent>
        </Dialog>
      </section>
    );
  }

  const renderQuestion = () => {
    if (currentQ.type === "info-card") {
      return (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {currentQ.options.map((opt, i) => {
              const selected = answers[step].optionIndex === i;
              return (
                <motion.button
                  key={i}
                  onClick={() => updateAnswer(i)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={selected ? { scale: 1.03 } : { scale: 1 }}
                  className={`text-left p-6 rounded-xl border-2 transition-all ${
                    selected
                      ? "border-primary bg-primary/10 shadow-md"
                      : "border-border bg-card hover:border-primary/40 hover:shadow-sm"
                  }`}
                >
                  <span className="text-lg font-semibold text-foreground">{t(opt.label)}</span>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{t(opt.description)}</p>
                </motion.button>
              );
            })}
          </div>
          {currentQ.infoText && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-muted/60 rounded-xl p-5 border border-border"
            >
              <div className="flex items-start gap-3">
                <span className="text-primary mt-0.5 text-xl shrink-0">❤️</span>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(currentQ.infoText)}</p>
              </div>
            </motion.div>
          )}
        </div>
      );
    }

    if (currentQ.type === "expandable") {
      return (
        <ExpandableScalpQuestion
          question={currentQ}
          answer={answers[step]}
          onSelect={updateAnswer}
        />
      );
    }

    if (currentQ.type === "two-step") {
      return (
        <TwoStepHairType
          question={currentQ}
          answer={answers[step]}
          onSelect={updateAnswer}
        />
      );
    }

    if (currentQ.type === "with-test") {
      return (
        <PorosityQuestion
          question={currentQ}
          answer={answers[step]}
          onSelect={(idx) => updateAnswer(idx)}
        />
      );
    }

    // Default question renderer
    return (
      <div className="grid gap-4">
        {currentQ.options.map((opt, i) => {
          const selected = answers[step].optionIndex === i;
          return (
            <motion.button
              key={i}
              onClick={() => updateAnswer(i)}
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
      </div>
    );
  };

  return (
    <section id="questionnaire" ref={sectionRef} className="relative py-24 bg-sage/20 overflow-hidden">
      <QuestionnaireDecorations />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            {t("Chestionarul Hair Theory")}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t("Răspunde la")} {questions.length} {t("întrebări simple pentru a descoperi profilul unic al părului tău.")}
          </p>
        </div>

        {/* Progress */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center gap-2">
            {questions.map((_, i) => (
              <motion.div
                key={i}
                animate={{ scale: i === step ? 1.15 : 1 }}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  i <= step ? "bg-primary" : "bg-sand"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-2 text-right">
            {step + 1} / {questions.length}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
            >
              <h3 className="text-2xl font-display font-semibold text-foreground mb-6">
                {t(currentQ.title)}
              </h3>
              {renderQuestion()}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-8">
            <motion.button
              whileHover={{ x: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={goPrev}
              disabled={step === 0}
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
            >
              <ChevronLeft size={20} /> {t("Înapoi")}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={goNext}
              disabled={!isCurrentAnswered()}
              className="flex items-center gap-1 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-40 transition-opacity"
            >
              {step === questions.length - 1 ? t("Finalizează") : t("Următoarea")}
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Questionnaire;
