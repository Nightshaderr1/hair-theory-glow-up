const Footer = () => (
  <footer className="py-12 border-t border-border bg-muted/50">
    <div className="container mx-auto px-4 text-center">
      <p className="font-display text-xl font-bold text-primary mb-2">Hair Theory</p>
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Hair Theory. Toate drepturile rezervate.
      </p>
    </div>
  </footer>
);

export default Footer;
