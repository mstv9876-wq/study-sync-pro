import { Mic, MicOff } from "lucide-react";

const participants = [
  { id: "1", name: "Arjun K.", avatar: "🧑‍💻", isMuted: false },
  { id: "2", name: "Priya S.", avatar: "👩‍💻", isMuted: true },
  { id: "3", name: "Rahul M.", avatar: "🧑‍🎓", isMuted: false },
  { id: "4", name: "Maya D.", avatar: "👩‍🎓", isMuted: false },
];

const VideoGrid = () => (
  <div className="grid grid-cols-2 gap-3 flex-1">
    {participants.map((p) => (
      <div
        key={p.id}
        className="glass rounded-xl flex flex-col items-center justify-center aspect-video relative"
      >
        <span className="text-4xl mb-2">{p.avatar}</span>
        <span className="text-sm font-medium">{p.name}</span>
        <div className="absolute bottom-2 right-2">
          {p.isMuted ? (
            <MicOff className="w-3.5 h-3.5 text-muted-foreground" />
          ) : (
            <Mic className="w-3.5 h-3.5 text-neon-cyan" />
          )}
        </div>
      </div>
    ))}
  </div>
);

export default VideoGrid;
