import { Mic, MicOff, Video, VideoOff } from "lucide-react";

interface Member {
  user_id: string;
  profiles?: { display_name: string } | { display_name: string }[] | null;
}

const VideoGrid = ({ members }: { members: Member[] }) => {
  const displayMembers = members.length > 0 ? members : [
    { user_id: "empty", profiles: { display_name: "Waiting..." } },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {displayMembers.map((m) => {
        const name = Array.isArray(m.profiles)
          ? m.profiles[0]?.display_name || "User"
          : m.profiles?.display_name || "User";
        return (
          <div key={m.user_id} className="glass rounded-xl flex flex-col items-center justify-center aspect-video relative">
            <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-xl mb-2">
              {name.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-medium">{name}</span>
            <div className="absolute bottom-2 right-2">
              <Mic className="w-3.5 h-3.5 text-neon-cyan" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VideoGrid;
