import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import Navbar from "@/components/layout/Navbar";
import ChatPanel from "@/components/room/ChatPanel";
import PomodoroTimer from "@/components/room/PomodoroTimer";
import UserListPanel from "@/components/room/UserListPanel";
import VideoGrid from "@/components/room/VideoGrid";
import SessionNotes from "@/components/room/SessionNotes";
import DistractionReminder from "@/components/room/DistractionReminder";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Video, VideoOff, PhoneOff } from "lucide-react";
import { Link } from "react-router-dom";
import { useRoomStore } from "@/stores/roomStore";
import { useAuthStore } from "@/stores/authStore";
import { useDistractionDetection } from "@/hooks/useDistractionDetection";
import { supabase } from "@/integrations/supabase/client";

const Room = () => {
  const { roomId } = useParams();
  const { user, profile } = useAuthStore();
  const { mic, cam, toggleMic, toggleCam, setCurrentRoom } = useRoomStore();
  const [room, setRoom] = useState<any>(null);
  const [members, setMembers] = useState<any[]>([]);

  useDistractionDetection(true);

  useEffect(() => {
    if (!roomId) return;
    setCurrentRoom(roomId);
    supabase.from("rooms").select("*").eq("id", roomId).single().then(({ data }) => {
      if (data) setRoom(data);
    });
    return () => setCurrentRoom(null);
  }, [roomId, setCurrentRoom]);

  useEffect(() => {
    if (!roomId || !user) return;
    supabase.from("room_members").upsert({ room_id: roomId, user_id: user.id }, { onConflict: "room_id,user_id" }).then(() => {});

    const fetchMembers = async () => {
      const { data } = await supabase
        .from("room_members")
        .select("user_id, joined_at, profiles(display_name)")
        .eq("room_id", roomId);
      if (data) setMembers(data);
    };
    fetchMembers();

    const channel = supabase
      .channel(`room-members-${roomId}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "room_members", filter: `room_id=eq.${roomId}` }, () => {
        fetchMembers();
      })
      .subscribe();

    return () => {
      supabase.from("room_members").delete().eq("room_id", roomId).eq("user_id", user.id).then(() => {});
      supabase.removeChannel(channel);
    };
  }, [roomId, user]);

  const handleSaveNotes = useCallback(async (notes: string) => {}, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <DistractionReminder />
      <main className="flex-1 container mx-auto px-4 pt-20 pb-4 flex flex-col gap-4 overflow-hidden">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">{room?.name || `Room: ${roomId}`}</h1>
            <p className="text-sm text-muted-foreground">{members.length} participants • {room?.topic || "General"}</p>
          </div>
          <div className="flex gap-2">
            <Button variant={mic ? "outline" : "destructive"} size="icon" onClick={toggleMic}>
              {mic ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            </Button>
            <Button variant={cam ? "outline" : "destructive"} size="icon" onClick={toggleCam}>
              {cam ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
            </Button>
            <Link to="/dashboard">
              <Button variant="destructive" size="icon"><PhoneOff className="w-4 h-4" /></Button>
            </Link>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[280px_1fr_240px] gap-4 min-h-0">
          <div className="hidden lg:flex flex-col min-h-0">
            <ChatPanel roomId={roomId!} />
          </div>
          <div className="flex flex-col gap-4 min-h-0 overflow-y-auto">
            <VideoGrid members={members} />
            <PomodoroTimer />
            <SessionNotes onSave={handleSaveNotes} />
          </div>
          <div className="hidden lg:flex flex-col min-h-0">
            <UserListPanel members={members} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Room;
