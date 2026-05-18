import { useState, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Upload, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";

const TOTAL_STEPS = 15;

type FormState = {
  nume: string;
  prenume: string;
  varsta: string;
  telefon: string;
  email: string;
  consentContact: boolean;
  curlPattern: string;
  density: string;
  thickness: string;
  scalpType: string;
  scalpIssues: string;
  finish: string;
  colorHistory: string;
  heat: string;
  chemical: string;
  routine: string;
  products: string[];
  productsOther: string;
  productsOpinion: string;
  sleep: string[];
  sleepOther: string;
  goals: string[];
  goalsOther: string;
  otherDetails: string;
  cardNumber: string;
  cardExpiry: string;
  cardHolder: string;
  cardEmail: string;
  promoConsent: boolean;
  termsConsent: boolean;
};

const initialState: FormState = {
  nume: "", prenume: "", varsta: "", telefon: "", email: "",
  consentContact: false,
  curlPattern: "", density: "", thickness: "",
  scalpType: "", scalpIssues: "",
  finish: "", colorHistory: "",
  heat: "", chemical: "",
  routine: "",
  products: [], productsOther: "", productsOpinion: "",
  sleep: [], sleepOther: "",
  goals: [], goalsOther: "",
  otherDetails: "",
  cardNumber: "", cardExpiry: "", cardHolder: "", cardEmail: "",
  promoConsent: false, termsConsent: false,
};

const curlPatterns = [
  { group: "Ondulat", items: ["2A", "2B", "2C"] },
  { group: "Creț", items: ["3A", "3B", "3C"] },
  { group: "Foarte creț", items: ["4A", "4B", "4C"] },
];

const stepVariants = {
  enter: { opacity: 0, x: 30 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

const CurlyQuestionnaire = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormState>(initialState);
  const [editingFrom, setEditingFrom] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const toggleArr = (key: "products" | "sleep" | "goals", value: string) => {
    setData((d) => {
      const arr = d[key];
      return { ...d, [key]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value] };
    });
  };

  const goNext = () => {
    if (editingFrom !== null) {
      setStep(editingFrom);
      setEditingFrom(null);
    } else {
      setStep((s) => Math.min(TOTAL_STEPS, s + 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const goBack = () => {
    if (step === 1) {
      navigate("/teams/curly");
      return;
    }
    setStep((s) => Math.max(1, s - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const editStep = (s: number) => {
    setEditingFrom(step);
    setStep(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const BackBtn = () => (
    <button
      onClick={goBack}
      className="inline-flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-primary transition-colors mb-6"
    >
      <ArrowLeft size={16} /> Înapoi
    </button>
  );

  const NextBtn = ({ label = "Pasul următor →" }: { label?: string }) => (
    <Button onClick={goNext} size="lg" className="mt-8 px-8">
      {editingFrom !== null ? "Salvează modificările" : label}
    </Button>
  );

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose/30 via-cream to-sand/40 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl text-center bg-card/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-border"
        >
          <div className="w-16 h-16 mx-auto rounded-full bg-primary/15 text-primary flex items-center justify-center mb-6">
            <Check size={32} />
          </div>
          <h1 className="font-display text-4xl mb-4">Mulțumesc!</h1>
          <p className="text-muted-foreground mb-8">
            Chestionarul a fost trimis. În câteva zile vei primi pe email rutina ta personalizată, adaptată exact buclelor tale.
          </p>
          <Link to="/">
            <Button size="lg">Înapoi acasă</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose/20 via-cream to-sand/30">
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/teams/curly" className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">
            Team Curly · Andreea
          </Link>
          <span className="text-xs text-muted-foreground">Pasul {step} din {TOTAL_STEPS}</span>
        </div>
        <Progress value={(step / TOTAL_STEPS) * 100} className="mb-10 h-2" />

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35 }}
            className="bg-card/70 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-12 shadow-sm"
          >
            {step > 1 && <BackBtn />}
            {step === 1 && (
              <Link to="/teams/curly" className="inline-flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-primary mb-6">
                <ArrowLeft size={16} /> Înapoi
              </Link>
            )}

            {/* STEP 1 — Bio */}
            {step === 1 && (
              <div>
                <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Descoperă rutina perfectă pentru buclele tale
                </h1>
                <div className="space-y-4 text-foreground/80 leading-relaxed">
                  <p>Hei, bine ai venit! Mă bucur că ești aici. Acest chestionar mă va ajuta să-ți înțeleg mai bine buclele și să-ți creez o rutină personalizată, potrivită pentru nevoile părului tău.</p>
                  <p>Acordă-ți 20 minute de grijă și răbdare. E un gest mic, care poate schimba totul pentru părul tău.</p>
                  <p>În câteva zile îți voi trimite un e-mail cu rutina recomandată, pas cu pas. Analizele sunt realizate manual, pe baza informațiilor și imaginilor oferite.</p>
                  <p className="font-medium text-foreground">Pentru acuratețe maximă, e important să completezi chestionarul cât mai detaliat. Ești gata? Hai să începem!</p>
                </div>
                <NextBtn label="Despre tine →" />
              </div>
            )}

            {/* STEP 2 — Personal */}
            {step === 2 && (
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">Despre tine</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Nume *"><Input value={data.nume} onChange={e => update("nume", e.target.value)} /></Field>
                  <Field label="Prenume *"><Input value={data.prenume} onChange={e => update("prenume", e.target.value)} /></Field>
                  <Field label="Vârstă *"><Input type="number" value={data.varsta} onChange={e => update("varsta", e.target.value)} /></Field>
                  <Field label="Telefon *"><Input type="tel" value={data.telefon} onChange={e => update("telefon", e.target.value)} /></Field>
                  <div className="md:col-span-2">
                    <Field label="Adresa de email *"><Input type="email" value={data.email} onChange={e => update("email", e.target.value)} /></Field>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground italic mt-4">
                  Aici îți voi trimite rutina ta personalizată, așa că asigură-te că adresa e corectă.
                </p>
                <label className="flex items-start gap-3 mt-6 cursor-pointer">
                  <Checkbox checked={data.consentContact} onCheckedChange={v => update("consentContact", !!v)} className="mt-1" />
                  <span className="text-sm text-foreground/80">Sunt de acord să fiu contactat(ă) prin email/SMS în caz că sunt necesare detalii suplimentare despre părul meu, înainte de a primi analiza.</span>
                </label>
                <NextBtn label="Cunoaște-ți buclele →" />
              </div>
            )}

            {/* STEP 3 — Curl pattern */}
            {step === 3 && (
              <div>
                <h2 className="font-display text-3xl font-bold mb-3">Care este tiparul buclelor tale (curl pattern)?</h2>
                <p className="text-sm text-muted-foreground mb-8">
                  Dacă nu ești sigur(ă), sau crezi că părul tău este o combinație între tipare diferite, selectează-l pe cel care ți se pare predominant.
                </p>
                <div className="space-y-8">
                  {curlPatterns.map(group => (
                    <div key={group.group}>
                      <h3 className="font-display text-xl mb-3 text-primary">{group.group}</h3>
                      <div className="grid grid-cols-3 gap-3">
                        {group.items.map(item => (
                          <button
                            key={item}
                            onClick={() => update("curlPattern", item)}
                            className={`aspect-square rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${
                              data.curlPattern === item
                                ? "border-primary bg-primary/10 shadow-md scale-105"
                                : "border-dashed border-border bg-background/50 hover:border-primary/50"
                            }`}
                          >
                            <CurlIcon type={item} />
                            <span className="font-medium">{item}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <NextBtn />
              </div>
            )}

            {/* STEP 4 — Density */}
            {step === 4 && (
              <div>
                <h2 className="font-display text-3xl font-bold mb-4">Cât de des este părul tău?</h2>
                <div className="text-sm text-muted-foreground space-y-1 mb-6">
                  <p>Privește-ți scalpul atunci când ai părul uscat:</p>
                  <p>• dacă se vede mult scalp → rar</p>
                  <p>• dacă se vede puțin → mediu</p>
                  <p>• dacă aproape nu se vede → des</p>
                </div>
                <CardGrid options={[["A", "Rar"], ["B", "Mediu"], ["C", "Des"]]} value={data.density} onChange={v => update("density", v)} />
                <NextBtn />
              </div>
            )}

            {/* STEP 5 — Thickness */}
            {step === 5 && (
              <div>
                <h2 className="font-display text-3xl font-bold mb-4">Care este grosimea firului tău de păr?</h2>
                <div className="text-sm text-muted-foreground space-y-1 mb-6">
                  <p>Ține un fir de păr între degete:</p>
                  <p>• dacă abia îl simți → subțire</p>
                  <p>• dacă îl simți bine → mediu</p>
                  <p>• dacă e vizibil și aspru la atingere → gros</p>
                </div>
                <CardGrid
                  options={[["A", "Subțire"], ["B", "Mediu"], ["C", "Gros"]]}
                  value={data.thickness}
                  onChange={v => update("thickness", v)}
                  withImagePlaceholder
                />
                <NextBtn />
              </div>
            )}

            {/* STEP 6 — Scalp */}
            {step === 6 && (
              <div className="space-y-10">
                <div>
                  <h2 className="font-display text-3xl font-bold mb-4">Care este tipul scalpului tău?</h2>
                  <div className="text-sm text-muted-foreground space-y-1 mb-6">
                    <p>Observă-l la 2 zile după spălare:</p>
                    <p>• dacă scalpul se simte uscat / strânge → uscat</p>
                    <p>• dacă e confortabil, fără sebum vizibil → normal</p>
                    <p>• dacă lucește sau se simte gras → gras</p>
                  </div>
                  <CardGrid options={[["A", "Uscat"], ["B", "Normal"], ["C", "Gras"]]} value={data.scalpType} onChange={v => update("scalpType", v)} />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold mb-2">Ai probleme la nivelul scalpului? Dacă da, menționează-le aici.</h3>
                  <p className="text-sm text-muted-foreground mb-4 italic">Exemple: mâncărime, coji, roșeață, sensibilitate, cădere excesivă, dermatită etc.</p>
                  <Textarea rows={4} value={data.scalpIssues} onChange={e => update("scalpIssues", e.target.value)} />
                </div>
                <NextBtn />
              </div>
            )}

            {/* STEP 7 — Finish & Color */}
            {step === 7 && (
              <div className="space-y-10">
                <div>
                  <h2 className="font-display text-3xl font-bold mb-4">Cum ai descrie "finisajul" natural al părului tău?</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Adică luciul părului complet uscat, fără produse în el. Uită-te doar la cât de lucios este părul, nu la cât de definită sau strânsă este bucla.
                  </p>
                  <CardGrid options={[["A", "Mat"], ["B", "Semi-lucios"], ["C", "Lucios"]]} value={data.finish} onChange={v => update("finish", v)} />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold mb-2">Părul tău a fost vopsit sau decolorat?</h3>
                  <p className="text-sm text-muted-foreground mb-1">Menționează aici orice modificare asupra culorii ce a avut loc în ultimii 2 ani.</p>
                  <p className="text-sm text-muted-foreground mb-4 italic">Include și vopsitul cu henna, șuvițe sau tonere temporare.</p>
                  <Textarea rows={4} value={data.colorHistory} onChange={e => update("colorHistory", e.target.value)} />
                </div>
                <NextBtn />
              </div>
            )}

            {/* STEP 8 — Heat & Chemical */}
            {step === 8 && (
              <div className="space-y-10">
                <div>
                  <h2 className="font-display text-3xl font-bold mb-6">Folosești placa, ondulatorul, peria cu aer cald sau alte surse de căldură intensă?</h2>
                  <RadioCards
                    options={[
                      "Da, frecvent (de mai multe ori pe lună)",
                      "Da, ocazional (o dată pe lună/la două luni)",
                      "Foarte rar (de câteva ori pe an)",
                      "Deloc",
                    ]}
                    value={data.heat}
                    onChange={v => update("heat", v)}
                  />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold mb-2">Părul tău a fost supus la tratamente chimice?</h3>
                  <p className="text-sm text-muted-foreground mb-1">Menționează aici orice astfel de modificare din ultimii 2 ani. Efectele pot persista mult timp.</p>
                  <p className="text-sm text-muted-foreground mb-4 italic">Exemplu: permanent, tratamente profesionale de îndreptare, etc.</p>
                  <Textarea rows={4} value={data.chemical} onChange={e => update("chemical", e.target.value)} />
                </div>
                <NextBtn label="Rutina ta actuală →" />
              </div>
            )}

            {/* STEP 9 — Current routine */}
            {step === 9 && (
              <div>
                <h2 className="font-display text-3xl font-bold mb-2">Rutina ta actuală</h2>
                <h3 className="text-xl font-medium mb-3 mt-6">Descrie pas cu pas rutina ta.</h3>
                <p className="text-sm text-muted-foreground mb-1">Include cât mai multe detalii despre spălare, stilizare și uscare. Cu cât mai multe detalii, cu atât mai bine!</p>
                <p className="text-sm text-muted-foreground italic mb-4">Exemplu: șamponez de două ori, clătesc, aplic balsam, descurc cu degetele, clătesc, după duș aplic cremă, apoi gel, usuc cu difuzorul/la aer etc.</p>
                <Textarea rows={8} value={data.routine} onChange={e => update("routine", e.target.value)} />
                <NextBtn />
              </div>
            )}

            {/* STEP 10 — Products */}
            {step === 10 && (
              <div>
                <h2 className="font-display text-3xl font-bold mb-6">Ce produse folosești acum (bifează unde este cazul)?</h2>
                <div className="grid grid-cols-2 gap-3">
                  {["Șampon", "Balsam", "Mască", "Leave-in", "Crema/activator pentru bucle", "Gel", "Mousse/spumă", "Ulei/ser", "Altceva (specifică)"].map(p => (
                    <CheckCard key={p} label={p} checked={data.products.includes(p)} onChange={() => toggleArr("products", p)} />
                  ))}
                </div>
                {data.products.includes("Altceva (specifică)") && (
                  <Input className="mt-3" placeholder="Specifică..." value={data.productsOther} onChange={e => update("productsOther", e.target.value)} />
                )}

                <p className="text-sm text-muted-foreground mt-8 mb-3">
                  Dacă vrei, enumeră în spațiul de mai jos și/sau atașează una sau mai multe imagini cu produsele pe care le folosești/le-ai încercat până acum.
                </p>
                <UploadArea hint="Clic pentru a alege un fișier sau trage fișierul aici. Acceptă fișiere imagine. Dimensiune maxima: 10 Megaoctet" />

                <h3 className="text-xl font-medium mt-8 mb-2">Ce părere ai despre produsele folosite?</h3>
                <p className="text-sm text-muted-foreground mb-3 italic">
                  Dacă dorești, aici poți menționa dacă e ceva ce te-a nemulțumit sau ți-a plăcut în mod special la produsele testate până acum. Acest lucru mă va ajuta să înțeleg mai bine cum reacționează părul tău la diferite produse.
                </p>
                <Textarea rows={5} value={data.productsOpinion} onChange={e => update("productsOpinion", e.target.value)} />
                <NextBtn />
              </div>
            )}

            {/* STEP 11 — Sleep */}
            {step === 11 && (
              <div>
                <h2 className="font-display text-3xl font-bold mb-6">Cum îți protejezi buclele în timpul somnului? (poți alege mai multe opțiuni)</h2>
                <div className="space-y-3">
                  {["Nu fac nimic special", "Le prind cu un elastic în vârful capului (\"pineapple\")", "Dorm pe față de pernă din satin/mătase", "Port bonetă/eșarfă din satin", "Altă metodă (specifică)"].map(p => (
                    <CheckCard key={p} label={p} checked={data.sleep.includes(p)} onChange={() => toggleArr("sleep", p)} />
                  ))}
                </div>
                {data.sleep.includes("Altă metodă (specifică)") && (
                  <Input className="mt-3" placeholder="Specifică..." value={data.sleepOther} onChange={e => update("sleepOther", e.target.value)} />
                )}
                <NextBtn />
              </div>
            )}

            {/* STEP 12 — Goals */}
            {step === 12 && (
              <div>
                <h2 className="font-display text-3xl font-bold mb-2">Obiective și așteptări</h2>
                <h3 className="text-xl font-medium mb-6 mt-4">Ce ți-ai dori cel mai mult de la o rutină potrivită? (poți alege mai multe opțiuni)</h3>
                <div className="space-y-3">
                  {["Definire mai bună", "Mai puțin frizz", "Mai mult volum", "Să-mi reziste buclele mai mult", "Rutina să fie mai simplă și rapidă", "Altceva (specifică)"].map(p => (
                    <CheckCard key={p} label={p} checked={data.goals.includes(p)} onChange={() => toggleArr("goals", p)} />
                  ))}
                </div>
                {data.goals.includes("Altceva (specifică)") && (
                  <Input className="mt-3" placeholder="Specifică..." value={data.goalsOther} onChange={e => update("goalsOther", e.target.value)} />
                )}
                <NextBtn />
              </div>
            )}

            {/* STEP 13 — Other details + image */}
            {step === 13 && (
              <div className="space-y-10">
                <div>
                  <h2 className="font-display text-3xl font-bold mb-2">Există alte detalii importante despre părul tău?</h2>
                  <p className="text-sm text-muted-foreground mb-4">Orice crezi că ar putea ajuta: rutina ta de viață, mediul, tratamente medicale, stres, produse anterioare, etc.</p>
                  <Textarea rows={5} value={data.otherDetails} onChange={e => update("otherDetails", e.target.value)} />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold mb-2">Imaginea buclelor tale</h3>
                  <p className="text-sm text-muted-foreground mb-1">Încarcă o poză clară cu părul tău proaspăt spălat și aranjat creț, așa cum îl porți de obicei.</p>
                  <p className="text-sm text-muted-foreground italic mb-4">
                    Ideal: poză în lumină naturală, de la spate, părul complet uscat, așa cum îl aranjezi în mod normal atunci când îl porți creț, fără filtre. Ar fi bine să adaugi poze din mai multe unghiuri pentru claritate.
                  </p>
                  <UploadArea hint="Clic pentru a alege un fișier sau trage fișierul aici. Acceptă fișiere imagine. Dimensiune maximă: 10 Megaoctet" />
                </div>
                <NextBtn label="Next →" />
              </div>
            )}

            {/* STEP 14 — Summary */}
            {step === 14 && (
              <div>
                <h2 className="font-display text-3xl font-bold mb-3">Verificare</h2>
                <p className="text-muted-foreground mb-8">
                  Mulțumesc pentru răbdare și sinceritate. Verifică datele introduse pentru a te asigura că totul este corect.
                </p>
                <div className="space-y-3">
                  <SummaryRow label="Nume" value={data.nume} onEdit={() => editStep(2)} />
                  <SummaryRow label="Prenume" value={data.prenume} onEdit={() => editStep(2)} />
                  <SummaryRow label="Vârstă" value={data.varsta} onEdit={() => editStep(2)} />
                  <SummaryRow label="Telefon" value={data.telefon} onEdit={() => editStep(2)} />
                  <SummaryRow label="Email" value={data.email} onEdit={() => editStep(2)} />
                  <SummaryRow label="Tiparul buclelor" value={data.curlPattern} onEdit={() => editStep(3)} />
                  <SummaryRow label="Densitatea părului" value={data.density} onEdit={() => editStep(4)} />
                  <SummaryRow label="Grosimea firului" value={data.thickness} onEdit={() => editStep(5)} />
                  <SummaryRow label="Tipul scalpului" value={data.scalpType} onEdit={() => editStep(6)} />
                  <SummaryRow label="Probleme scalp" value={data.scalpIssues} onEdit={() => editStep(6)} />
                  <SummaryRow label="Finisaj natural" value={data.finish} onEdit={() => editStep(7)} />
                  <SummaryRow label="Istoric culoare" value={data.colorHistory} onEdit={() => editStep(7)} />
                  <SummaryRow label="Surse de căldură" value={data.heat} onEdit={() => editStep(8)} />
                  <SummaryRow label="Tratamente chimice" value={data.chemical} onEdit={() => editStep(8)} />
                  <SummaryRow label="Rutina actuală" value={data.routine} onEdit={() => editStep(9)} />
                  <SummaryRow label="Produse folosite" value={[...data.products, data.productsOther].filter(Boolean).join(", ")} onEdit={() => editStep(10)} />
                  <SummaryRow label="Părere produse" value={data.productsOpinion} onEdit={() => editStep(10)} />
                  <SummaryRow label="Protecție somn" value={[...data.sleep, data.sleepOther].filter(Boolean).join(", ")} onEdit={() => editStep(11)} />
                  <SummaryRow label="Obiective" value={[...data.goals, data.goalsOther].filter(Boolean).join(", ")} onEdit={() => editStep(12)} />
                  <SummaryRow label="Alte detalii" value={data.otherDetails} onEdit={() => editStep(13)} />
                </div>
                <label className="flex items-start gap-3 mt-8 cursor-pointer">
                  <Checkbox checked={data.termsConsent} onCheckedChange={v => update("termsConsent", !!v)} className="mt-1" />
                  <span className="text-sm">Confirm că am verificat datele și acestea sunt corecte.</span>
                </label>
                <NextBtn />
              </div>
            )}

            {/* STEP 15 — Payment */}
            {step === 15 && (
              <div>
                <h2 className="font-display text-3xl font-bold mb-3">Plata analizei</h2>
                <p className="text-muted-foreground mb-6">
                  Prețul analizei este de 49RON. Plata securizată este procesată prin Stripe. Datele cardului tău nu sunt vizibile pentru mine.
                </p>
                <div className="flex items-baseline gap-2 mb-8 p-6 bg-primary/5 rounded-xl border border-primary/20">
                  <span className="text-4xl font-display font-bold text-primary">49</span>
                  <span className="text-xl text-primary/70 font-medium">RON</span>
                </div>

                <div className="space-y-4">
                  <Field label="Număr card"><Input placeholder="1234 1234 1234 1234" value={data.cardNumber} onChange={e => update("cardNumber", e.target.value)} /></Field>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="LL/AA"><Input placeholder="MM/YY" value={data.cardExpiry} onChange={e => update("cardExpiry", e.target.value)} /></Field>
                    <Field label="Deținător card"><Input placeholder="Nume Prenume" value={data.cardHolder} onChange={e => update("cardHolder", e.target.value)} /></Field>
                  </div>
                  <Field label="Email-ul tău"><Input type="email" value={data.cardEmail} onChange={e => update("cardEmail", e.target.value)} /></Field>
                </div>

                <div className="space-y-4 mt-8">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <Checkbox checked={data.promoConsent} onCheckedChange={v => update("promoConsent", !!v)} className="mt-1" />
                    <span className="text-sm">Sunt de acord să fiu contactat(ă) pe email/SMS cu oferte viitoare.</span>
                  </label>
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <Checkbox checked={data.termsConsent} onCheckedChange={v => update("termsConsent", !!v)} className="mt-1" />
                      <span className="text-sm font-medium">Am luat la cunoștință și sunt de acord cu următoarele:</span>
                    </label>
                    <ul className="mt-3 ml-8 space-y-2 text-sm text-muted-foreground list-disc">
                      <li>Acesta este un serviciu digital de analiză a părului. Nu se expediază niciun produs fizic.</li>
                      <li>Rezultatele sunt livrate în termen de 7 zile.</li>
                      <li>Având în vedere natura serviciului, rambursarea nu este garantată după livrarea rezultatelor.</li>
                      <li>Prin achiziționarea acestui serviciu, confirm că am vârsta de 18 ani împliniți sau că am acordul părinților.</li>
                      <li>Recomandările se bazează pe experiența personală în îngrijirea părului creț și pe principii cosmetice generale. Acestea au rol de ghid în construirea unei rutine și nu înlocuiesc sfatul unui medic specialist sau al dermatologului.</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 space-y-2 text-sm text-foreground/80">
                  <p>Apasă pe "Trimite", pentru a finaliza chestionarul. De aici îți poți lăsa buclele pe mâna mea.</p>
                  <p>În câteva zile îți voi trimite un e-mail cu rutina ta personalizată, adaptată exact buclelor tale.</p>
                </div>

                <Button onClick={() => setSubmitted(true)} size="lg" className="mt-8 px-10">
                  Trimite →
                </Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ---------- Sub-components ---------- */

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <Label className="mb-2 block text-sm">{label}</Label>
    {children}
  </div>
);

const CardGrid = ({
  options, value, onChange, withImagePlaceholder = false,
}: {
  options: [string, string][];
  value: string;
  onChange: (v: string) => void;
  withImagePlaceholder?: boolean;
}) => (
  <div className="grid grid-cols-3 gap-4">
    {options.map(([letter, label]) => (
      <button
        key={letter}
        onClick={() => onChange(label)}
        className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${
          value === label
            ? "border-primary bg-primary/10 shadow-md scale-105"
            : "border-dashed border-border bg-background/50 hover:border-primary/50"
        }`}
      >
        {withImagePlaceholder && (
          <div className="w-full aspect-square rounded-lg bg-muted/50 border border-dashed border-border flex items-center justify-center text-xs text-muted-foreground">
            imagine
          </div>
        )}
        <span className="text-2xl font-display text-primary">{letter}</span>
        <span className="font-medium">{label}</span>
      </button>
    ))}
  </div>
);

const RadioCards = ({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) => (
  <div className="space-y-3">
    {options.map(opt => (
      <button
        key={opt}
        onClick={() => onChange(opt)}
        className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
          value === opt
            ? "border-primary bg-primary/10 shadow-sm"
            : "border-border bg-background/50 hover:border-primary/50"
        }`}
      >
        {opt}
      </button>
    ))}
  </div>
);

const CheckCard = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) => (
  <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
    checked ? "border-primary bg-primary/10" : "border-border bg-background/50 hover:border-primary/50"
  }`}>
    <Checkbox checked={checked} onCheckedChange={onChange} />
    <span className="text-sm">{label}</span>
  </label>
);

const UploadArea = ({ hint }: { hint: string }) => {
  const [files, setFiles] = useState<string[]>([]);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(Array.from(e.target.files).map(f => f.name));
  };
  return (
    <label className="block border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/60 hover:bg-primary/5 transition-colors">
      <Upload className="mx-auto mb-3 text-muted-foreground" size={28} />
      <p className="text-sm text-muted-foreground">{hint}</p>
      {files.length > 0 && (
        <p className="mt-3 text-xs text-primary">{files.join(", ")}</p>
      )}
      <input type="file" accept="image/*" multiple className="hidden" onChange={onChange} />
    </label>
  );
};

const SummaryRow = ({ label, value, onEdit }: { label: string; value: string; onEdit: () => void }) => (
  <div className="flex items-start justify-between gap-4 p-3 border-b border-border/60">
    <div className="flex-1 min-w-0">
      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{label}</p>
      <p className="text-sm text-foreground break-words">{value || <span className="italic text-muted-foreground">—</span>}</p>
    </div>
    <button onClick={onEdit} className="text-xs text-primary hover:underline shrink-0 mt-4">
      Modifică
    </button>
  </div>
);

const CurlIcon = ({ type }: { type: string }) => {
  // SVG curl path that gets tighter as we progress
  const tightness: Record<string, number> = {
    "2A": 18, "2B": 14, "2C": 10,
    "3A": 8, "3B": 6, "3C": 5,
    "4A": 4, "4B": 3.2, "4C": 2.6,
  };
  const r = tightness[type] ?? 8;
  const path = Array.from({ length: 8 }, (_, i) => {
    const y = 6 + i * 5;
    const dir = i % 2 === 0 ? 1 : 0;
    return `${i === 0 ? "M" : "A"} ${r} ${r} 0 0 ${dir} 24 ${y}`;
  }).join(" ").replace("M ", "M 24 6 ");
  return (
    <svg viewBox="0 0 48 50" className="w-10 h-10 text-primary/80">
      <path d={path} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
};

export default CurlyQuestionnaire;
