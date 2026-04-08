import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import { Clock, Flame, Award, Target, BookOpen } from "lucide-react";

const badges = [
  { icon: "🔥", label: "7-Day Streak", earned: true },
  { icon: "⏱", label: "10 Hours Studied", earned: true },
  { icon: "🎯", label: "First Session", earned: true },
  { icon: "⚡", label: "5 Rooms Joined", earned: false },
];

const sessions = [
  { date: "Apr 7", topic: "DSA - Binary Trees", duration: "1h 45m", score: 92 },
  { date: "Apr 6", topic: "MERN - React Hooks", duration: "2h 10m", score: 88 },
  { date: "Apr 5", topic: "AI - Neural Networks", duration: "1h 20m", score: 95 },
];

const Profile = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="container mx-auto px-6 pt-24 pb-12 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Profile header */}
        <div className="glass rounded-xl p-6 mb-6 flex items-center gap-6">
          <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-3xl">
            🧑‍💻
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Arjun Kumar</h1>
            <p className="text-muted-foreground text-sm">CSE Student • DSA, MERN, AI</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { icon: Clock, label: "Total Hours", value: "142h" },
            { icon: Flame, label: "Streak", value: "23 days" },
            { icon: Target, label: "Focus Score", value: "94" },
            { icon: BookOpen, label: "Sessions", value: "67" },
          ].map((s) => (
            <div key={s.label} className="glass rounded-xl p-4 text-center">
              <s.icon className="w-5 h-5 text-neon-cyan mx-auto mb-1" />
              <div className="text-xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Badges */}
        <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <Award className="w-5 h-5 text-neon-violet" /> Badges
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {badges.map((b) => (
            <div
              key={b.label}
              className={`glass rounded-xl p-4 text-center ${b.earned ? "" : "opacity-40"}`}
            >
              <span className="text-2xl">{b.icon}</span>
              <div className="text-xs mt-1 font-medium">{b.label}</div>
              {b.earned && <div className="text-xs text-neon-cyan mt-0.5">Earned</div>}
            </div>
          ))}
        </div>

        {/* Recent sessions */}
        <h2 className="font-semibold text-lg mb-3">Recent Sessions</h2>
        <div className="space-y-3">
          {sessions.map((s) => (
            <div key={s.date + s.topic} className="glass rounded-xl p-4 flex items-center justify-between">
              <div>
                <div className="font-medium text-sm">{s.topic}</div>
                <div className="text-xs text-muted-foreground">{s.date} • {s.duration}</div>
              </div>
              <div className="text-neon-cyan font-bold">{s.score}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </main>
  </div>
);

export default Profile;
