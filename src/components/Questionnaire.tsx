import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react";
import RoutineResults from "./RoutineResults";

interface Option {
  label: string;
  description: string;
}

interface Question {
  title: string;
  options: Option[];
}

const questions: Question[] = [
  {
    title: "Ce tip de scalp aveți?",
    options: [
      {
        label: "Scalp uscat",
        description:
          "Simți des senzație de strângere, mâncărime sau observi fulgi mici? Scalpul tău produce puțin sebum, ceea ce duce la uscăciune.",
      },
      {
        label: "Scalp cu tendință de îngrășare",
        description:
          "Părul tău devine gras la rădăcini la scurt timp după spălare? Scalpul produce sebum în exces, dând un aspect lucios și lipicios.",
      },
      {
        label: "Scalp mixt",
        description:
          "Ai zone grase la rădăcini dar vârfuri uscate? Scalpul mixt combină caracteristici ale celor două tipuri.",
      },
      {
        label: "Scalp vopsit/tratat chimic",
        description:
          "Ai folosit recent vopsea, decolorant sau tratamente chimice? Aceste proceduri pot sensibiliza scalpul și modifica structura părului.",
      },
    ],
  },
  {
    title: "Ce tip de păr ai?",
    options: [
      {
        label: "Drept",
        description:
          "Firul de păr crește fără curburi vizibile, de la rădăcină până la vârf. Tinde să fie mai lucios, dar poate părea lipsit de volum.",
      },
      {
        label: "Ondulat",
        description:
          "Părul formează valuri lejere în formă de S. Are volum natural, dar poate deveni creț sau drept în funcție de umiditate.",
      },
      {
        label: "Creț",
        description:
          "Buclele sunt bine definite, de la spirale largi la inele strânse. Are nevoie de mai multă hidratare și de produse anti-frizz.",
      },
      {
        label: "Foarte creț",
        description:
          "Buclele sunt foarte strânse, în formă de Z sau spirală compactă. Este cel mai fragil tip de păr și necesită îngrijire delicată.",
      },
    ],
  },
  {
    title: "Ce textură a părului aveți?",
    options: [
      {
        label: "Fin",
        description:
          "Firul de păr are un diametru mic. Se simte moale la atingere, dar se poate lipici ușor și îi lipsește volumul.",
      },
      {
        label: "Mediu",
        description:
          "Firul are un diametru standard. Este ușor de stilizat, rezistent și oferă un echilibru bun între volum și manevrabilitate.",
      },
      {
        label: "Gros",
        description:
          "Firul de păr are un diametru mare. Este puternic și rezistent, dar poate fi mai greu de gestionat și predispus la frizz.",
      },
    ],
  },
  {
    title: "Ce porozitate a părului aveți?",
    options: [
      {
        label: "Scăzută",
        description:
          "Cuticulele sunt strâns închise – apa și produsele stau pe suprafața firului fără a fi absorbite rapid. Părul se usucă greu.",
      },
      {
        label: "Medie",
        description:
          "Cuticulele sunt ușor deschise – părul absoarbe și reține umiditatea în mod echilibrat. Este cel mai ușor de îngrijit.",
      },
      {
        label: "Ridicată",
        description:
          "Cuticulele sunt foarte deschise – părul absoarbe rapid umiditatea dar o pierde la fel de repede. Are nevoie de tratamente sigilante.",
      },
    ],
  },
  {
    title: "Cât de des te speli pe cap?",
    options: [
      {
        label: "Zilnic",
        description:
          "Te speli pe cap în fiecare zi. Spălatul frecvent poate elimina uleiurile naturale ale scalpului, ducând la uscăciune sau la producție excesivă de sebum compensator.",
      },
      {
        label: "La 2-3 zile",
        description:
          "Te speli pe cap o dată la două-trei zile. Aceasta este frecvența recomandată pentru majoritatea tipurilor de păr, permițând scalpului să mențină un echilibru natural.",
      },
      {
        label: "O dată pe săptămână",
        description:
          "Te speli pe cap o dată pe săptămână. Recomandat pentru părul creț, foarte creț sau uscat, ajutând la păstrarea uleiurilor naturale și a hidratării.",
      },
      {
        label: "Mai rar de o dată pe săptămână",
        description:
          "Te speli pe cap mai rar de o dată pe săptămână. Poate fi benefic pentru părul foarte uscat, dar necesită atenție la igiena scalpului.",
      },
    ],
  },
  {
    title: "La ce fel de apă ai acces?",
    options: [
      {
        label: "Apă moale",
        description:
          "Concentrație scăzută de carbonat de calciu (sub 60 mg/l). Spumează ușor și nu lasă reziduuri pe păr. Ideală pentru îngrijirea părului.",
      },
      {
        label: "Apă moderat dură",
        description:
          "Concentrație medie de carbonat de calciu (60–120 mg/l). Poate lăsa ușoare depuneri minerale pe păr în timp, dar efectele sunt moderate.",
      },
      {
        label: "Apă dură",
        description:
          "Concentrație ridicată de carbonat de calciu (120–180 mg/l). Poate face părul aspru, uscat și dificil de gestionat din cauza depunerilor minerale.",
      },
      {
        label: "Apă foarte dură",
        description:
          "Concentrație foarte ridicată de carbonat de calciu (peste 180 mg/l). Afectează semnificativ textura și sănătatea părului, necesitând tratamente de chelare.",
      },
    ],
  },
];

const Questionnaire = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );
  const [submitted, setSubmitted] = useState(false);

  const currentQ = questions[step];

  const select = (optIndex: number) => {
    const next = [...answers];
    next[step] = optIndex;
    setAnswers(next);
  };

  const goNext = () => {
    if (step < questions.length - 1) setStep(step + 1);
    else setSubmitted(true);
  };

  const goPrev = () => {
    if (step > 0) setStep(step - 1);
  };

  if (submitted) {
    return (
      <section id="questionnaire" className="py-24 bg-sage/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center bg-card rounded-2xl p-12 shadow-lg border border-border mb-16"
          >
            <CheckCircle2 className="mx-auto mb-6 text-primary" size={64} />
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              Mulțumim!
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Profilul tău a fost salvat. Pe baza răspunsurilor tale, îți vom oferi recomandări
              personalizate pentru îngrijirea părului.
            </p>
            <div className="bg-muted rounded-xl p-6 text-left space-y-3">
              {questions.map((q, i) => (
                <div key={i}>
                  <span className="text-sm font-medium text-foreground">{q.title}</span>
                  <span className="ml-2 text-sm text-primary font-semibold">
                    {answers[i] !== null ? q.options[answers[i]!].label : "—"}
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                setStep(0);
                setAnswers(Array(questions.length).fill(null));
              }}
              className="mt-8 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Reia chestionarul
            </button>
          </motion.div>

          <RoutineResults answers={answers} questions={questions} />
        </div>
      </section>
    );
  }

  return (
    <section id="questionnaire" className="py-24 bg-sage/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Chestionarul Hair Theory
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Răspunde la {questions.length} întrebări simple pentru a descoperi profilul unic al părului tău.
          </p>
        </div>

        {/* Progress */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center gap-2">
            {questions.map((_, i) => (
              <div
                key={i}
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
                {currentQ.title}
              </h3>
              <div className="grid gap-4">
                {currentQ.options.map((opt, i) => {
                  const selected = answers[step] === i;
                  return (
                    <button
                      key={i}
                      onClick={() => select(i)}
                      className={`text-left p-5 rounded-xl border-2 transition-all ${
                        selected
                          ? "border-primary bg-primary/10 shadow-md"
                          : "border-border bg-card hover:border-primary/40 hover:shadow-sm"
                      }`}
                    >
                      <span className="font-semibold text-foreground">{opt.label}</span>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        {opt.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-8">
            <button
              onClick={goPrev}
              disabled={step === 0}
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
            >
              <ChevronLeft size={20} /> Înapoi
            </button>
            <button
              onClick={goNext}
              disabled={answers[step] === null}
              className="flex items-center gap-1 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-40 transition-opacity"
            >
              {step === questions.length - 1 ? "Finalizează" : "Următoarea"}
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Questionnaire;
