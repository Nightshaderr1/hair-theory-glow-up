import { Question } from "./types";

export const questions: Question[] = [
  {
    title: "Ce tip de scalp aveți?",
    type: "expandable",
    options: [
      { label: "Scalp uscat", description: "Simți des senzație de strângere, mâncărime sau observi fulgi mici? Scalpul tău produce puțin sebum, ceea ce duce la uscăciune." },
      { label: "Scalp cu tendință de îngrășare", description: "Părul tău devine gras la rădăcini la scurt timp după spălare? Scalpul produce sebum în exces, dând un aspect lucios și lipicios." },
      { label: "Scalp mixt", description: "Ai zone grase la rădăcini dar vârfuri uscate? Scalpul mixt combină caracteristici ale celor două tipuri." },
      { label: "Scalp vopsit/tratat chimic", description: "Ai folosit recent vopsea, decolorant sau tratamente chimice? Aceste proceduri pot sensibiliza scalpul și modifica structura părului." },
    ],
    expandableOption: {
      label: "Scalp cu probleme dermatologice",
      description: "Ai simptome persistente precum mâncărime intensă, inflamație, scuame sau zone fără păr? Selectează pentru a identifica problema specifică.",
      subOptions: [
        { label: "Dermatită seboreică", description: "Mătreață grasă, scuame gălbui și senzație de mâncărime." },
        { label: "Psoriazis", description: "Plăci groase, bine delimitate, acoperite de scuame argintii." },
        { label: "Dermatită de contact", description: "Reacție alergică sau iritație cauzată de produse externe." },
        { label: "Tinea capitis", description: "Infecție fungică a scalpului care poate cauza zone fără păr." },
        { label: "Foliculită", description: "Inflamația foliculilor de păr, manifestată prin mici coșuri roșii." },
        { label: "Dermatită", description: "Inflamație generală a pielii, însoțită de roșeață și sensibilitate." },
      ],
    },
  },
  {
    title: "Ce tip de păr ai?",
    type: "two-step",
    options: [
      { label: "Drept", description: "Firul de păr crește fără curburi vizibile, de la rădăcină până la vârf. Tinde să fie mai lucios, dar poate părea lipsit de volum." },
      { label: "Ondulat", description: "Părul formează valuri lejere în formă de S. Are volum natural, dar poate deveni creț sau drept în funcție de umiditate." },
      { label: "Creț", description: "Buclele sunt bine definite, de la spirale largi la inele strânse. Are nevoie de mai multă hidratare și de produse anti-frizz." },
      { label: "Foarte creț", description: "Buclele sunt foarte strânse, în formă de Z sau spirală compactă. Este cel mai fragil tip de păr și necesită îngrijire delicată." },
    ],
    subCategories: {
      0: [
        { code: "1A", label: "Fir subțire/fin", description: "Părul drept cu fir foarte subțire, tinde să fie moale și lipsit de volum." },
        { code: "1B", label: "Textură medie", description: "Părul drept cu textură medie, ușor de stilizat și cu un volum natural moderat." },
        { code: "1C", label: "Fir gros/rezistent", description: "Părul drept cu fir gros, rezistent la stilizare și cu tendință de frizz." },
      ],
      1: [
        { code: "2A", label: "Bucle lejere în S", description: "Valuri ușoare, abia vizibile, care dau un aspect natural și relaxat." },
        { code: "2B", label: "Bucle S definite", description: "Valuri bine definite în formă de S, cu volum mediu și textură plăcută." },
        { code: "2C", label: "Bucle largi/aproape crețe", description: "Valuri pronunțate care se apropie de bucle, cu volum semnificativ." },
      ],
      2: [
        { code: "3A", label: "Spirale largi", description: "Bucle largi și lejere, cu circumferință mare, care formează spirale aerisit." },
        { code: "3B", label: "Inele elastice", description: "Bucle medii, elastice, bine definite, cu tendință de a se contracta." },
        { code: "3C", label: "Bucle strânse tip tirbușon", description: "Bucle foarte strânse și dense, în formă de tirbușon, cu mult volum." },
      ],
      3: [
        { code: "4A", label: "Bobine strânse", description: "Bucle foarte mici și strânse, cu pattern uniform și fragil." },
        { code: "4B", label: "Model în Z", description: "Părul formează un pattern în Z mai degrabă decât bucle rotunde, foarte fragil." },
        { code: "4C", label: "Zig-zag foarte dens/fragil", description: "Cel mai fragil tip, cu pattern zig-zag foarte strâns, necesită îngrijire delicată." },
      ],
    },
  },
  {
    title: "Ce textură a părului aveți?",
    options: [
      { label: "Fin", description: "Firul de păr are un diametru mic. Se simte moale la atingere, dar se poate lipici ușor și îi lipsește volumul." },
      { label: "Mediu", description: "Firul are un diametru standard. Este ușor de stilizat, rezistent și oferă un echilibru bun între volum și manevrabilitate." },
      { label: "Gros", description: "Firul de păr are un diametru mare. Este puternic și rezistent, dar poate fi mai greu de gestionat și predispus la frizz." },
    ],
  },
  {
    title: "Ce porozitate a părului aveți?",
    type: "with-test",
    options: [
      { label: "Scăzută", description: "Părul se udă greu, apa tinde să rămână sub formă de bobițe la suprafață, iar uscarea naturală durează foarte mult (peste 4-6 ore). Produsele sunt absorbite greu." },
      { label: "Medie", description: "Părul absoarbe și reține umiditatea în mod echilibrat. Se udă ușor sub duș și se usucă într-un timp rezonabil." },
      { label: "Ridicată", description: "Părul absoarbe apa instantaneu ca un burete, dar se și usucă foarte repede (adesea sub o oră). Pare mereu însetat de hidratare." },
    ],
    testModal: {
      buttonLabel: "Nu sunt sigur(ă), cum verific?",
      title: "Verifică textura firului de păr",
      instructions: "Ia un singur fir de păr între degetul mare și arătător. Glisează degetele de-a lungul firului, începând de la vârf spre rădăcină (în sens invers creșterii).",
      results: [
        { condition: "Dacă degetele alunecă fin și firul se simte perfect neted", result: "Ai Porozitate Scăzută." },
        { condition: "Dacă simți mici denivelări, asperități sau firul se simte aspru ca nisipul", result: "Ai Porozitate Ridicată." },
      ],
    },
  },
  {
    title: "Cât de des te speli pe cap?",
    options: [
      { label: "Zilnic", description: "Te speli pe cap în fiecare zi. Spălatul frecvent poate elimina uleiurile naturale ale scalpului, ducând la uscăciune sau la producție excesivă de sebum compensator." },
      { label: "La 2-3 zile", description: "Te speli pe cap o dată la două-trei zile. Aceasta este frecvența recomandată pentru majoritatea tipurilor de păr, permițând scalpului să mențină un echilibru natural." },
      { label: "O dată pe săptămână", description: "Te speli pe cap o dată pe săptămână. Recomandat pentru părul creț, foarte creț sau uscat, ajutând la păstrarea uleiurilor naturale și a hidratării." },
      { label: "Mai rar de o dată pe săptămână", description: "Te speli pe cap mai rar de o dată pe săptămână. Poate fi benefic pentru părul foarte uscat, dar necesită atenție la igiena scalpului." },
    ],
  },
  {
    title: "La ce fel de apă ai acces?",
    options: [
      { label: "Apă moale", description: "Concentrație scăzută de carbonat de calciu (sub 60 mg/l). Spumează ușor și nu lasă reziduuri pe păr. Ideală pentru îngrijirea părului." },
      { label: "Apă moderat dură", description: "Concentrație medie de carbonat de calciu (60–120 mg/l). Poate lăsa ușoare depuneri minerale pe păr în timp, dar efectele sunt moderate." },
      { label: "Apă dură", description: "Concentrație ridicată de carbonat de calciu (120–180 mg/l). Poate face părul aspru, uscat și dificil de gestionat din cauza depunerilor minerale." },
      { label: "Apă foarte dură", description: "Concentrație foarte ridicată de carbonat de calciu (peste 180 mg/l). Afectează semnificativ textura și sănătatea părului, necesitând tratamente de chelare." },
    ],
  },
  {
    title: "Cât de des vă tundeți?",
    options: [
      { label: "Mai puțin de o dată pe an", description: "Tundeți părul foarte rar. Vârfurile pot deveni deteriorate și despicate, afectând aspectul general și sănătatea firului de păr." },
      { label: "O dată pe an", description: "Tundeți părul aproximativ o dată pe an. Această frecvență poate duce la acumularea de vârfuri despicate și la un aspect neîngrijit." },
      { label: "La fiecare 6 luni", description: "Tundeți părul de două ori pe an. O frecvență rezonabilă pentru menținerea sănătății părului, dar vârfurile pot avea nevoie de atenție între tunderi." },
      { label: "La fiecare 2 luni", description: "Tundeți părul la fiecare două luni. Frecvență ideală pentru majoritatea tipurilor de păr, menținând vârfurile sănătoase și forma coafurii." },
      { label: "Lunar", description: "Tundeți părul în fiecare lună. Excelent pentru menținerea unei forme precise și eliminarea vârfurilor despicate înainte de a se extinde." },
    ],
  },
  {
    title: "Suferiți de alopecie? Dacă da, ce tip de alopecie?",
    options: [
      { label: "Nu sufăr de alopecie", description: "Nu aveți probleme de cădere a părului sau de rărire vizibilă. Părul crește normal și nu prezintă semne de alopecie." },
      { label: "Alopecia Androgenetică (Calviția Ereditară)", description: "Cea mai comună formă, cauzată de factori genetici și hormonali. Se manifestă prin retragerea liniei părului (bărbați) sau rărirea creștetului (femei)." },
      { label: "Alopecia Areata (în Pete)", description: "Afecțiune autoimună care provoacă căderea părului în zone rotunde, delimitate. Include variante: Totalis (întregul scalp), Universalis (întregul corp), Ophiasis (fâșie pe conturul scalpului)." },
      { label: "Efluviul Telogen (Alopecie Difuză)", description: "Cădere masivă, temporară, cauzată de stres, naștere, boli sau deficiențe nutriționale. De regulă reversibilă odată cu eliminarea cauzei." },
      { label: "Alopecia de Tracțiune / Cicatricială", description: "De Tracțiune: provocată de coafuri foarte strânse (cozi, extensii) care tensionează foliculii. Cicatricială: distruge foliculul și îl înlocuiește cu țesut cicatricial (ex: lichen planopilar)." },
      { label: "Tinea Capitis (Infecție Fungică)", description: "Infecție fungică a scalpului, frecventă la copii. Se manifestă prin zone de cădere a părului, mâncărime și descuamare." },
      { label: "Alopecia indusă de tratamente", description: "Pierderea părului din cauza chimioterapiei sau radioterapiei. De regulă reversibilă după terminarea tratamentului." },
    ],
  },
];
