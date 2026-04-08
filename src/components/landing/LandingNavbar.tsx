import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, Menu, X } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { useState } from "react";

const navLinks = [
  { label: "Focus Room", path: "/dashboard" },
  { label: "How it works", path: "#features" },
  { label: "Leaderboard", path: "/leaderboard" },
  { label: "Contact Us", path: "#" },
];

const LandingNavbar = () => {
  const { user } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <Zap className="w-5 h-5 text-indigo-600" />
          <span className="text-gray-900">StudyFlare</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to={user ? "/dashboard" : "/auth"}>
            <Button className="bg-gray-900 hover:bg-gray-800 text-white font-semibold text-xs px-5 py-2 rounded-lg uppercase tracking-wider">
              See others live
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-gray-900" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className="block text-sm py-2 text-gray-600 hover:text-gray-900"
            >
              {link.label}
            </Link>
          ))}
          <Link to={user ? "/dashboard" : "/auth"} onClick={() => setMobileOpen(false)}>
            <Button className="bg-gray-900 hover:bg-gray-800 text-white font-semibold text-xs w-full uppercase tracking-wider">
              See others live
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default LandingNavbar;
