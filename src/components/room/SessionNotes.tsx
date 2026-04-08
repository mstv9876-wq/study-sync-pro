import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save, FileText } from "lucide-react";
import { toast } from "sonner";

interface SessionNotesProps {
  initialNotes?: string;
  onSave?: (notes: string) => void;
}

const SessionNotes = ({ initialNotes = "", onSave }: SessionNotesProps) => {
  const [notes, setNotes] = useState(initialNotes);
  const [saved, setSaved] = useState(true);

  const handleSave = () => {
    onSave?.(notes);
    setSaved(true);
    toast.success("Notes saved!");
  };

  return (
    <div className="glass rounded-xl p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm flex items-center gap-2">
          <FileText className="w-4 h-4 text-neon-violet" /> Session Notes
        </h3>
        <Button variant="neon" size="sm" onClick={handleSave} disabled={saved}>
          <Save className="w-3 h-3 mr-1" /> Save
        </Button>
      </div>
      <Textarea
        value={notes}
        onChange={(e) => { setNotes(e.target.value); setSaved(false); }}
        placeholder="Write your study notes here... (Markdown supported)"
        className="bg-muted border-border min-h-[120px] text-sm resize-none"
      />
    </div>
  );
};

export default SessionNotes;
