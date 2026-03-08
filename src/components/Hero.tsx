import { motion } from "framer-motion";
import heroImg from "@/assets/hero-botanical.png";

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-sage/30 via-background to-rose/20" />
      <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center md:text-left">
          
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-display font-bold text-primary leading-none mb-4">
            Hair Theory
          </h1>
          <p className="text-2xl md:text-3xl lg:text-4xl font-display font-semibold text-foreground leading-tight mb-6">
            Descoperă secretele <br />
            <span className="text-primary">părului tău</span>
          </p>
          <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
            Hair Theory te ajută să înțelegi nevoile unice ale scalpului și părului tău.
            Completează chestionarul nostru și primește recomandări personalizate.
          </p>
          <a
            href="#questionnaire"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-medium text-lg hover:opacity-90 transition-opacity shadow-lg">
            
            Începe chestionarul
          </a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex-1 flex justify-center">
          
          <img

            alt="Ilustrație botanică Hair Theory"
            className="w-80 md:w-[28rem] lg:w-[32rem] drop-shadow-xl" src="/lovable-uploads/55657a40-5ecd-4b3f-9be3-8172e9d9208a.png" />
          
        </motion.div>
      </div>
    </section>);

};

export default Hero;