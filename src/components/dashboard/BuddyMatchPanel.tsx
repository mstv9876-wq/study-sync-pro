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
    <div className="bg-card rounded-xl p-4 border border-border shadow-sm">
      <h3 className="font-semibold text-sm flex items-center gap-2 mb-3 text-foreground">
        <Users className="w-4 h-4 text-brand" /> Suggested Buddies
      </h3>
      <div className="space-y-2">
        {buddies.slice(0, 5).map((b) => (
          <div key={b.user_id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
            <div className="w-8 h-8 rounded-full gradient-accent flex items-center justify-center text-sm text-white">
              {b.display_name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate text-foreground">{b.display_name}</div>
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
