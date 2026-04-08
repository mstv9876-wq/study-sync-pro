import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

const navLinks = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Leaderboard", path: "/leaderboard" },
  { label: "Profile", path: "/profile" },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-glass-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <Zap className="w-5 h-5 text-neon-cyan" />
          <span className="gradient-text">StudyFlare</span>
        </Link>

        <div className="hidden sm:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm transition-colors ${
                location.pathname === link.path
                  ? "text-neon-cyan"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link to="/dashboard">
          <Button variant="neon" size="sm">
            Start Studying
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
