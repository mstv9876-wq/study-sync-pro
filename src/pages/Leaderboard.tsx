import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import { Trophy, Flame, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const medals = ["🥇", "🥈", "🥉"];

const Leaderboard = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    supabase
      .from("profiles")
      .select("user_id, display_name, total_study_time, streak, focus_score")
      .order("total_study_time", { ascending: false })
      .limit(20)
      .then(({ data }) => {
        if (data) setUsers(data);
      });
  }, []);

  // Fallback seed data if no profiles yet
  const displayUsers = users.length > 0 ? users : [
    { user_id: "1", display_name: "Arjun K.", total_study_time: 142, streak: 23, focus_score: 94 },
    { user_id: "2", display_name: "Priya S.", total_study_time: 128, streak: 18, focus_score: 91 },
    { user_id: "3", display_name: "Rahul M.", total_study_time: 115, streak: 15, focus_score: 88 },
    { user_id: "4", display_name: "Maya D.", total_study_time: 98, streak: 12, focus_score: 85 },
    { user_id: "5", display_name: "Kiran P.", total_study_time: 87, streak: 10, focus_score: 82 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-6 pt-24 pb-12 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Trophy className="w-7 h-7 text-neon-cyan" /> Leaderboard
          </h1>
          <p className="text-muted-foreground mb-8">Top students ranked by study hours.</p>
          <div className="space-y-3">
            {displayUsers.map((u, i) => (
              <motion.div
                key={u.user_id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`glass rounded-xl p-4 flex items-center gap-4 ${i < 3 ? "neon-glow-cyan" : ""}`}
              >
                <span className="text-2xl w-10 text-center">
                  {i < 3 ? medals[i] : <span className="text-muted-foreground text-lg">#{i + 1}</span>}
                </span>
                <div className="flex-1">
                  <span className="font-semibold">{u.display_name}</span>
                  <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{u.total_study_time || 0}h</span>
                    <span className="flex items-center gap-1"><Flame className="w-3 h-3" />{u.streak || 0} day streak</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-neon-cyan">{u.focus_score || 0}</div>
                  <div className="text-xs text-muted-foreground">Focus Score</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Leaderboard;
