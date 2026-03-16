import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Questionnaire from "@/components/Questionnaire";
import Blog from "@/components/Blog";
import About from "@/components/About";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Questionnaire />
      <Blog />
      <About />
      <Footer />
    </div>
  );
};

export default Index;
