import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import LandingNavbar from "@/components/landing/LandingNavbar";

const Landing = () => (
  <div className="min-h-screen bg-white">
    <LandingNavbar />
    <HeroSection />
    <FeaturesSection />
  </div>
);

export default Landing;
