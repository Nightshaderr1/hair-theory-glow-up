import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Blog from "@/components/Blog";
import Reviews from "@/components/Reviews";
import About from "@/components/About";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Blog />
      <Reviews />
      <About />
      <Footer />
    </div>
  );
};

export default Index;
