import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import RoomCard from "@/components/dashboard/RoomCard";
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

const TOPICS = ["All", "DSA", "MERN", "AI"] as const;

const seedRooms = [
  { id: "global", name: "🌍 Global Study Hall", topic: "General", userCount: 142, isPrivate: false, isGlobal: true },
  { id: "dsa-grind", name: "DSA Grind Session", topic: "DSA", userCount: 23, isPrivate: false },
  { id: "mern-builders", name: "MERN Builders", topic: "MERN", userCount: 8, isPrivate: false },
  { id: "ai-research", name: "AI Research Circle", topic: "AI", userCount: 15, isPrivate: false },
  { id: "private-1", name: "Team Alpha", topic: "DSA", userCount: 4, isPrivate: true },
  { id: "private-2", name: "ML Study Group", topic: "AI", userCount: 6, isPrivate: true },
];

const Dashboard = () => {
  const [filter, setFilter] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [joinCode, setJoinCode] = useState("");

  const filtered = seedRooms.filter((r) => {
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
                  <Button variant="neon-outline" size="sm">
                    <Hash className="w-4 h-4 mr-1" /> Join by Code
                  </Button>
                </DialogTrigger>
                <DialogContent className="glass border-glass-border">
                  <DialogHeader>
                    <DialogTitle>Join Private Room</DialogTitle>
                  </DialogHeader>
                  <div className="flex gap-2 mt-4">
                    <Input
                      placeholder="Enter room code..."
                      value={joinCode}
                      onChange={(e) => setJoinCode(e.target.value)}
                      className="bg-muted border-border"
                    />
                    <Button variant="neon" size="default">Join</Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Button variant="neon" size="sm">
                <Plus className="w-4 h-4 mr-1" /> Create Room
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search rooms..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-muted border-border"
              />
            </div>
            <div className="flex gap-2">
              {TOPICS.map((t) => (
                <Button
                  key={t}
                  variant={filter === t ? "neon" : "glass"}
                  size="sm"
                  onClick={() => setFilter(t)}
                >
                  {t}
                </Button>
              ))}
            </div>
          </div>

          {/* Room grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((room) => (
              <RoomCard key={room.id} {...room} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              No rooms found. Try adjusting your filters.
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
