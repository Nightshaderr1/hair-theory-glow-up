import { createContext, useContext, useState, ReactNode } from "react";
import { translations } from "@/i18n/translations";

type Lang = "ro" | "en";

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("ro");

  const t = (key: string): string => {
    if (lang === "ro") return key;
    return translations[key] ?? key;
  };

  const toggle = () => setLang((l) => (l === "ro" ? "en" : "ro"));

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
