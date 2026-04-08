import { Mic } from "lucide-react";

interface Member {
  user_id: string;
  profiles?: { display_name: string } | { display_name: string }[] | null;
}

const UserListPanel = ({ members }: { members: Member[] }) => (
  <div className="bg-card rounded-xl flex flex-col h-full border border-border shadow-sm">
    <div className="p-3 border-b border-border flex items-center justify-between">
      <h3 className="font-semibold text-sm text-foreground">Participants</h3>
      <span className="text-xs text-muted-foreground">{members.length} online</span>
    </div>
    <div className="flex-1 overflow-y-auto p-3 space-y-2">
      {members.map((m) => {
        const name = Array.isArray(m.profiles)
          ? m.profiles[0]?.display_name || "User"
          : m.profiles?.display_name || "User";
        return (
          <div key={m.user_id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-sm text-white">
              {name.charAt(0).toUpperCase()}
            </div>
            <span className="flex-1 text-sm font-medium truncate text-foreground">{name}</span>
            <Mic className="w-3.5 h-3.5 text-brand" />
          </div>
        );
      })}
      {members.length === 0 && (
        <p className="text-xs text-muted-foreground text-center py-4">No one here yet</p>
      )}
    </div>
  </div>
);

export default UserListPanel;
