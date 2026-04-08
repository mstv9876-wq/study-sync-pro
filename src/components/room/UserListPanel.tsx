import { Mic, MicOff, Video, VideoOff } from "lucide-react";

interface User {
  id: string;
  name: string;
  avatar: string;
  isMuted: boolean;
  isCamOff: boolean;
}

const seedUsers: User[] = [
  { id: "1", name: "Arjun K.", avatar: "🧑‍💻", isMuted: false, isCamOff: false },
  { id: "2", name: "Priya S.", avatar: "👩‍💻", isMuted: true, isCamOff: false },
  { id: "3", name: "Rahul M.", avatar: "🧑‍🎓", isMuted: false, isCamOff: true },
  { id: "4", name: "Maya D.", avatar: "👩‍🎓", isMuted: false, isCamOff: false },
  { id: "5", name: "Kiran P.", avatar: "🧑‍🔬", isMuted: true, isCamOff: true },
];

const UserListPanel = () => (
  <div className="glass rounded-xl flex flex-col h-full">
    <div className="p-3 border-b border-border flex items-center justify-between">
      <h3 className="font-semibold text-sm">Participants</h3>
      <span className="text-xs text-muted-foreground">{seedUsers.length} online</span>
    </div>

    <div className="flex-1 overflow-y-auto p-3 space-y-2">
      {seedUsers.map((u) => (
        <div key={u.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors">
          <span className="text-xl">{u.avatar}</span>
          <span className="flex-1 text-sm font-medium truncate">{u.name}</span>
          <div className="flex gap-1 text-muted-foreground">
            {u.isMuted ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-neon-cyan" />}
            {u.isCamOff ? <VideoOff className="w-3.5 h-3.5" /> : <Video className="w-3.5 h-3.5 text-neon-cyan" />}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default UserListPanel;
