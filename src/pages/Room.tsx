import { useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import ChatPanel from "@/components/room/ChatPanel";
import PomodoroTimer from "@/components/room/PomodoroTimer";
import UserListPanel from "@/components/room/UserListPanel";
import VideoGrid from "@/components/room/VideoGrid";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Video, VideoOff, PhoneOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Room = () => {
  const { roomId } = useParams();
  const [mic, setMic] = useState(true);
  const [cam, setCam] = useState(true);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 pt-20 pb-4 flex flex-col gap-4 overflow-hidden">
        {/* Room header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Room: {roomId}</h1>
            <p className="text-sm text-muted-foreground">5 participants • Pomodoro active</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={mic ? "glass" : "destructive"}
              size="icon"
              onClick={() => setMic(!mic)}
            >
              {mic ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            </Button>
            <Button
              variant={cam ? "glass" : "destructive"}
              size="icon"
              onClick={() => setCam(!cam)}
            >
              {cam ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
            </Button>
            <Link to="/dashboard">
              <Button variant="destructive" size="icon">
                <PhoneOff className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Main layout: Chat | Video+Timer | Users */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[280px_1fr_240px] gap-4 min-h-0">
          <div className="hidden lg:flex flex-col min-h-0">
            <ChatPanel />
          </div>

          <div className="flex flex-col gap-4 min-h-0">
            <VideoGrid />
            <PomodoroTimer />
          </div>

          <div className="hidden lg:flex flex-col min-h-0">
            <UserListPanel />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Room;
