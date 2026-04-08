import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import { Trophy, Flame, Clock } from "lucide-react";

const leaderboardData = [
  { rank: 1, name: "Arjun K.", hours: 142, streak: 23, score: 94 },
  { rank: 2, name: "Priya S.", hours: 128, streak: 18, score: 91 },
  { rank: 3, name: "Rahul M.", hours: 115, streak: 15, score: 88 },
  { rank: 4, name: "Maya D.", hours: 98, streak: 12, score: 85 },
  { rank: 5, name: "Kiran P.", hours: 87, streak: 10, score: 82 },
  { rank: 6, name: "Ananya R.", hours: 76, streak: 8, score: 79 },
  { rank: 7, name: "Vikram T.", hours: 65, streak: 7, score: 75 },
  { rank: 8, name: "Sneha L.", hours: 54, streak: 5, score: 70 },
];

const medals = ["🥇", "🥈", "🥉"];

const Leaderboard = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="container mx-auto px-6 pt-24 pb-12 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Trophy className="w-7 h-7 text-neon-cyan" /> Leaderboard
        </h1>
        <p className="text-muted-foreground mb-8">Top students ranked by study hours and consistency.</p>

        <div className="space-y-3">
          {leaderboardData.map((u, i) => (
            <motion.div
              key={u.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`glass rounded-xl p-4 flex items-center gap-4 ${i < 3 ? "neon-glow-cyan" : ""}`}
            >
              <span className="text-2xl w-10 text-center">
                {i < 3 ? medals[i] : <span className="text-muted-foreground text-lg">#{u.rank}</span>}
              </span>
              <div className="flex-1">
                <span className="font-semibold">{u.name}</span>
                <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{u.hours}h</span>
                  <span className="flex items-center gap-1"><Flame className="w-3 h-3" />{u.streak} day streak</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-neon-cyan">{u.score}</div>
                <div className="text-xs text-muted-foreground">Focus Score</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  </div>
);

export default Leaderboard;
