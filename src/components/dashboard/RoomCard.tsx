import { Users, Clock, Lock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface RoomCardProps {
  id: string;
  name: string;
  topic: string;
  userCount: number;
  isPrivate: boolean;
  isGlobal?: boolean;
}

const topicColors: Record<string, string> = {
  DSA: "text-neon-cyan border-neon-cyan/30 bg-neon-cyan/10",
  MERN: "text-neon-violet border-neon-violet/30 bg-neon-violet/10",
  AI: "text-neon-magenta border-neon-magenta/30 bg-neon-magenta/10",
  General: "text-muted-foreground border-border bg-muted/30",
};

const RoomCard = ({ id, name, topic, userCount, isPrivate, isGlobal }: RoomCardProps) => (
  <div className={`glass rounded-xl p-5 flex flex-col gap-4 hover:border-neon-cyan/30 transition-colors ${isGlobal ? "neon-glow-cyan" : ""}`}>
    <div className="flex items-start justify-between">
      <div>
        <div className="flex items-center gap-2 mb-1">
          {isGlobal ? (
            <Globe className="w-4 h-4 text-neon-cyan" />
          ) : isPrivate ? (
            <Lock className="w-4 h-4 text-muted-foreground" />
          ) : null}
          <h3 className="font-semibold">{name}</h3>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-full border ${topicColors[topic] || topicColors.General}`}>
          {topic}
        </span>
      </div>
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <Users className="w-4 h-4" />
        <span>{userCount}</span>
      </div>
    </div>

    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <Clock className="w-3 h-3" />
      <span>Pomodoro active</span>
    </div>

    <Link to={`/room/${id}`}>
      <Button variant={isGlobal ? "neon" : "glass"} size="sm" className="w-full">
        {isGlobal ? "Join Global Room" : "Enter Room"}
      </Button>
    </Link>
  </div>
);

export default RoomCard;
