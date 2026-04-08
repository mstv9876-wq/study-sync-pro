import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import { Clock, Flame, Award, Target, BookOpen } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const AVAILABLE_INTERESTS = ["DSA", "MERN", "AI"];

const allBadges = [
  { icon: "🔥", label: "7-Day Streak", key: "streak_7" },
  { icon: "⏱", label: "10 Hours Studied", key: "hours_10" },
  { icon: "🎯", label: "First Session", key: "first_session" },
  { icon: "⚡", label: "5 Rooms Joined", key: "rooms_5" },
];

const Profile = () => {
  const { user, profile, fetchProfile } = useAuthStore();
  const [sessions, setSessions] = useState<any[]>([]);
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  useEffect(() => {
    if (profile) {
      setNewName(profile.display_name);
      setSelectedInterests(profile.interests || []);
    }
  }, [profile]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("sessions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10)
      .then(({ data }) => { if (data) setSessions(data); });
  }, [user]);

  const updateProfile = async (updates: { display_name?: string; interests?: string[]; avatar_url?: string }) => {
    if (!user) return;
    const { error } = await supabase.from("profiles").update(updates).eq("user_id", user.id);
    if (error) { toast.error("Failed to update"); return; }
    toast.success("Profile updated!");
    fetchProfile(user.id);
  };

  const toggleInterest = (interest: string) => {
    const updated = selectedInterests.includes(interest)
      ? selectedInterests.filter((i) => i !== interest)
      : [...selectedInterests, interest];
    setSelectedInterests(updated);
    updateProfile({ interests: updated });
  };

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-6 pt-24 pb-12 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Profile header */}
          <div className="bg-card rounded-xl p-6 mb-6 flex items-center gap-6 border border-border shadow-sm">
            <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-3xl text-white">
              {profile.display_name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              {editingName ? (
                <div className="flex gap-2 items-center">
                  <Input value={newName} onChange={(e) => setNewName(e.target.value)} className="max-w-xs" />
                  <Button variant="default" size="sm" onClick={() => { updateProfile({ display_name: newName }); setEditingName(false); }}>Save</Button>
                </div>
              ) : (
                <h1 className="text-2xl font-bold cursor-pointer hover:text-brand transition-colors text-foreground" onClick={() => setEditingName(true)}>
                  {profile.display_name}
                </h1>
              )}
              <p className="text-muted-foreground text-sm">{user.email}</p>
            </div>
          </div>

          {/* Interests */}
          <div className="bg-card rounded-xl p-4 mb-6 border border-border shadow-sm">
            <h3 className="font-semibold text-sm mb-3 text-foreground">Your Interests</h3>
            <div className="flex gap-2">
              {AVAILABLE_INTERESTS.map((interest) => (
                <Button
                  key={interest}
                  variant={selectedInterests.includes(interest) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleInterest(interest)}
                >
                  {interest}
                </Button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { icon: Clock, label: "Total Hours", value: `${profile.total_study_time}h` },
              { icon: Flame, label: "Streak", value: `${profile.streak} days` },
              { icon: Target, label: "Focus Score", value: `${profile.focus_score}` },
              { icon: BookOpen, label: "Sessions", value: `${sessions.length}` },
            ].map((s) => (
              <div key={s.label} className="bg-card rounded-xl p-4 text-center border border-border shadow-sm">
                <s.icon className="w-5 h-5 text-brand mx-auto mb-1" />
                <div className="text-xl font-bold text-foreground">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Badges */}
          <h2 className="font-semibold text-lg mb-3 flex items-center gap-2 text-foreground">
            <Award className="w-5 h-5 text-yellow-500" /> Badges
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {allBadges.map((b) => {
              const earned = profile.badges?.includes(b.key);
              return (
                <div key={b.key} className={`bg-card rounded-xl p-4 text-center border border-border shadow-sm ${earned ? "" : "opacity-40"}`}>
                  <span className="text-2xl">{b.icon}</span>
                  <div className="text-xs mt-1 font-medium text-foreground">{b.label}</div>
                  {earned && <div className="text-xs text-brand mt-0.5">Earned</div>}
                </div>
              );
            })}
          </div>

          {/* Recent sessions */}
          <h2 className="font-semibold text-lg mb-3 text-foreground">Recent Sessions</h2>
          {sessions.length > 0 ? (
            <div className="space-y-3">
              {sessions.map((s) => (
                <div key={s.id} className="bg-card rounded-xl p-4 flex items-center justify-between border border-border shadow-sm">
                  <div>
                    <div className="font-medium text-sm text-foreground">{s.notes?.slice(0, 50) || "Study session"}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(s.start_time).toLocaleDateString()} • {Math.round((s.duration || 0) / 60)}m
                    </div>
                  </div>
                  <div className="text-brand font-bold">{s.focus_score || 0}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card rounded-xl p-8 text-center text-muted-foreground border border-border">
              No sessions yet. Join a room to start studying!
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Profile;
