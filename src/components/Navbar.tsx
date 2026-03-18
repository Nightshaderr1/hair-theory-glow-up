import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Acasă", href: "#hero" },
  { label: "Chestionar", href: "#questionnaire" },
  { label: "Blog", href: "#blog" },
  { label: "Recenzii", href: "#reviews" },
  { label: "Despre noi", href: "#about" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

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
          <Button variant="ghost" size="sm" className="text-foreground/70 hover:text-primary">
            <User size={16} />
            Log in
          </Button>
          <Button size="sm" className="rounded-full">
            Sign up
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
          <div className="flex gap-2 pt-2 border-t border-border">
            <Button variant="ghost" size="sm" className="flex-1 text-foreground/70">
              <User size={16} />
              Log in
            </Button>
            <Button size="sm" className="flex-1 rounded-full">
              Sign up
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
