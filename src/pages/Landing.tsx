import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import Navbar from "@/components/layout/Navbar";

const Landing = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <FeaturesSection />
  </div>
);

export default Landing;
