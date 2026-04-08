import { useEffect, useState } from "react";
import { findStudyBuddies, type BuddySuggestion } from "@/lib/buddyMatching";
import { useAuthStore } from "@/stores/authStore";
import { Users } from "lucide-react";

const BuddyMatchPanel = () => {
  const { user, profile } = useAuthStore();
  const [buddies, setBuddies] = useState<BuddySuggestion[]>([]);

  useEffect(() => {
    if (user && profile?.interests?.length) {
      findStudyBuddies(user.id, profile.interests).then(setBuddies);
    }
  }, [user, profile]);

  if (!buddies.length) return null;

  return (
    <div className="glass rounded-xl p-4">
      <h3 className="font-semibold text-sm flex items-center gap-2 mb-3">
        <Users className="w-4 h-4 text-neon-magenta" /> Suggested Buddies
      </h3>
      <div className="space-y-2">
        {buddies.slice(0, 5).map((b) => (
          <div key={b.user_id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors">
            <div className="w-8 h-8 rounded-full gradient-accent flex items-center justify-center text-sm">
              {b.display_name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{b.display_name}</div>
              <div className="text-xs text-muted-foreground">
                {b.interests?.join(", ")} • Score: {b.focus_score}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuddyMatchPanel;
