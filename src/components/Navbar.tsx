import { useState } from "react";
import { Menu, X, User, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { t, lang, toggle } = useLanguage();

  const navLinks = [
    { label: t("Acasă"), href: "#hero" },
    { label: t("Blog"), href: "#blog" },
    { label: t("Recenzii"), href: "#reviews" },
    { label: t("Despre noi"), href: "#about" },
  ];

  const LangToggle = ({ className = "" }: { className?: string }) => (
    <button
      onClick={toggle}
      aria-label="Toggle language"
      className={`inline-flex items-center gap-1.5 text-xs font-semibold rounded-full border border-border px-3 py-1.5 hover:border-primary hover:text-primary transition-colors ${className}`}
    >
      <Languages size={14} />
      <span className={lang === "ro" ? "text-primary" : "text-muted-foreground"}>RO</span>
      <span className="text-muted-foreground/50">/</span>
      <span className={lang === "en" ? "text-primary" : "text-muted-foreground"}>EN</span>
    </button>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <a href="#hero" className="font-display text-2xl font-bold text-primary tracking-wide">
          Hair Theory
        </a>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <LangToggle />
          <Button variant="ghost" size="sm" className="text-foreground/70 hover:text-primary">
            <User size={16} />
            {t("Log in")}
          </Button>
          <Button size="sm" className="rounded-full">
            {t("Sign up")}
          </Button>
        </div>
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-4 flex flex-col gap-3">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-border">
            <LangToggle />
            <div className="flex gap-2 flex-1">
              <Button variant="ghost" size="sm" className="flex-1 text-foreground/70">
                <User size={16} />
                {t("Log in")}
              </Button>
              <Button size="sm" className="flex-1 rounded-full">
                {t("Sign up")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
