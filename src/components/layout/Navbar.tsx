import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, Menu, X, LogOut } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { useState } from "react";

const navLinks = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Leaderboard", path: "/leaderboard" },
  { label: "Profile", path: "/profile" },
];

const Navbar = () => {
  const location = useLocation();
  const { user, profile, signOut } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <Zap className="w-5 h-5 text-brand" />
          <span className="text-foreground">StudyFlare</span>
        </Link>

        <div className="hidden sm:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm transition-colors font-medium ${
                location.pathname === link.path ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden sm:flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-muted-foreground">{profile?.display_name || user.email}</span>
              <Button variant="ghost" size="icon" onClick={signOut}>
                <LogOut className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button variant="default" size="sm">Sign In</Button>
            </Link>
          )}
        </div>

        <button className="sm:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="sm:hidden bg-background border-t border-border p-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`block text-sm py-2 ${
                location.pathname === link.path ? "text-foreground font-medium" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <Button variant="ghost" size="sm" onClick={() => { signOut(); setMobileOpen(false); }} className="w-full justify-start">
              <LogOut className="w-4 h-4 mr-2" /> Sign Out
            </Button>
          ) : (
            <Link to="/auth" onClick={() => setMobileOpen(false)}>
              <Button variant="default" size="sm" className="w-full">Sign In</Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
