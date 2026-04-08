import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Zap, Users, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { icon: Users, label: "Active Learners", value: "2,847" },
  { icon: Clock, label: "Hours Studied", value: "14,320" },
  { icon: Zap, label: "Sessions Today", value: "438" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-neon-cyan/10 blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-neon-violet/10 blur-[120px]" />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse-neon" />
            <span className="text-muted-foreground">Live now — 438 students studying</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Study Smarter,{" "}
            <span className="gradient-text">Together</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Real-time collaborative study rooms for CSE students.
            Focus on DSA, MERN, or AI — with Pomodoro timers, leaderboards, and instant buddy matching.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/dashboard">
              <Button variant="neon" size="lg" className="text-base px-8">
                <Zap className="w-5 h-5 mr-2" />
                Start Studying
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="neon-outline" size="lg" className="text-base px-8">
                Browse Rooms
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="glass rounded-xl p-4 text-center">
              <stat.icon className="w-5 h-5 text-neon-cyan mx-auto mb-2" />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
