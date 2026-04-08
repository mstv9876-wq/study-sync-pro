import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import RoomCard from "@/components/dashboard/RoomCard";
import BuddyMatchPanel from "@/components/dashboard/BuddyMatchPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Hash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "sonner";

const TOPICS = ["All", "DSA", "MERN", "AI"] as const;

const Dashboard = () => {
  const { user } = useAuthStore();
  const [filter, setFilter] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [rooms, setRooms] = useState<any[]>([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [newRoom, setNewRoom] = useState({ name: "", topic: "DSA", isPrivate: false });

  const fetchRooms = async () => {
    const { data } = await supabase.from("rooms").select("*").order("created_at", { ascending: false });
    if (data) setRooms(data);
  };

  useEffect(() => { fetchRooms(); }, []);

  const createRoom = async () => {
    if (!newRoom.name.trim() || !user) return;
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const { error } = await supabase.from("rooms").insert({
      name: newRoom.name.trim(),
      topic: newRoom.topic,
      is_private: newRoom.isPrivate,
      room_code: code,
      host_id: user.id,
    });
    if (error) { toast.error("Failed to create room"); return; }
    toast.success(`Room created! Code: ${code}`);
    setCreateOpen(false);
    setNewRoom({ name: "", topic: "DSA", isPrivate: false });
    fetchRooms();
  };

  const joinByCode = async () => {
    if (!joinCode.trim()) return;
    const { data } = await supabase.from("rooms").select("id").eq("room_code", joinCode.trim().toUpperCase()).single();
    if (data) {
      window.location.href = `/room/${data.id}`;
    } else {
      toast.error("Invalid room code");
    }
  };

  const filtered = rooms.filter((r) => {
    const matchesTopic = filter === "All" || r.topic === filter;
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase());
    return matchesTopic && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-6 pt-24 pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-1">Study Rooms</h1>
              <p className="text-muted-foreground">Find a room or create your own</p>
            </div>
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="neon-outline" size="sm"><Hash className="w-4 h-4 mr-1" /> Join by Code</Button>
                </DialogTrigger>
                <DialogContent className="glass border-glass-border">
                  <DialogHeader><DialogTitle>Join Private Room</DialogTitle></DialogHeader>
                  <div className="flex gap-2 mt-4">
                    <Input placeholder="Enter room code..." value={joinCode} onChange={(e) => setJoinCode(e.target.value)} className="bg-muted border-border" />
                    <Button variant="neon" onClick={joinByCode}>Join</Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogTrigger asChild>
                  <Button variant="neon" size="sm"><Plus className="w-4 h-4 mr-1" /> Create Room</Button>
                </DialogTrigger>
                <DialogContent className="glass border-glass-border">
                  <DialogHeader><DialogTitle>Create Study Room</DialogTitle></DialogHeader>
                  <div className="space-y-4 mt-4">
                    <Input placeholder="Room name..." value={newRoom.name} onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })} className="bg-muted border-border" />
                    <div className="flex gap-2">
                      {["DSA", "MERN", "AI"].map((t) => (
                        <Button key={t} variant={newRoom.topic === t ? "neon" : "glass"} size="sm" onClick={() => setNewRoom({ ...newRoom, topic: t })}>{t}</Button>
                      ))}
                    </div>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={newRoom.isPrivate} onChange={(e) => setNewRoom({ ...newRoom, isPrivate: e.target.checked })} className="rounded" />
                      Private room
                    </label>
                    <Button variant="neon" className="w-full" onClick={createRoom}>Create Room</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search rooms..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-muted border-border" />
            </div>
            <div className="flex gap-2">
              {TOPICS.map((t) => (
                <Button key={t} variant={filter === t ? "neon" : "glass"} size="sm" onClick={() => setFilter(t)}>{t}</Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filtered.map((room) => (
                  <RoomCard
                    key={room.id}
                    id={room.id}
                    name={room.name}
                    topic={room.topic}
                    userCount={room.user_count || 0}
                    isPrivate={room.is_private}
                    isGlobal={room.is_global}
                  />
                ))}
              </div>
              {filtered.length === 0 && (
                <div className="text-center py-16 text-muted-foreground">No rooms found.</div>
              )}
            </div>
            <div className="hidden lg:block">
              <BuddyMatchPanel />
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
