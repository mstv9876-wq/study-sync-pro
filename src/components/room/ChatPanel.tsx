import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface Message {
  id: string;
  user: string;
  text: string;
  time: string;
}

const seedMessages: Message[] = [
  { id: "1", user: "Arjun", text: "Let's grind Leetcode today!", time: "10:02" },
  { id: "2", user: "Priya", text: "Starting with Binary Trees 🌳", time: "10:03" },
  { id: "3", user: "Rahul", text: "I'm on dynamic programming, anyone wanna pair?", time: "10:05" },
  { id: "4", user: "Maya", text: "Focus mode ON 🔥", time: "10:06" },
];

const ChatPanel = () => {
  const [messages, setMessages] = useState<Message[]>(seedMessages);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), user: "You", text: input.trim(), time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
    ]);
    setInput("");
  };

  return (
    <div className="glass rounded-xl flex flex-col h-full">
      <div className="p-3 border-b border-border">
        <h3 className="font-semibold text-sm">Chat</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3 min-h-0">
        {messages.map((msg) => (
          <div key={msg.id}>
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-semibold text-neon-cyan">{msg.user}</span>
              <span className="text-xs text-muted-foreground">{msg.time}</span>
            </div>
            <p className="text-sm text-foreground/90">{msg.text}</p>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-border flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="bg-muted border-border text-sm"
        />
        <Button variant="neon" size="icon" onClick={sendMessage}>
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatPanel;
