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
  DSA: "text-blue-600 border-blue-200 bg-blue-50",
  MERN: "text-purple-600 border-purple-200 bg-purple-50",
  AI: "text-pink-600 border-pink-200 bg-pink-50",
  General: "text-muted-foreground border-border bg-muted",
};

const RoomCard = ({ id, name, topic, userCount, isPrivate, isGlobal }: RoomCardProps) => (
  <div className={`bg-card rounded-xl p-5 flex flex-col gap-4 border border-border shadow-sm hover:shadow-md transition-shadow`}>
    <div className="flex items-start justify-between">
      <div>
        <div className="flex items-center gap-2 mb-1">
          {isGlobal ? (
            <Globe className="w-4 h-4 text-brand" />
          ) : isPrivate ? (
            <Lock className="w-4 h-4 text-muted-foreground" />
          ) : null}
          <h3 className="font-semibold text-foreground">{name}</h3>
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
      <Button variant={isGlobal ? "default" : "outline"} size="sm" className="w-full">
        {isGlobal ? "Join Global Room" : "Enter Room"}
      </Button>
    </Link>
  </div>
);

export default RoomCard;
