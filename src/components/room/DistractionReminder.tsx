import { useFocusStore } from "@/stores/focusStore";
import { Button } from "@/components/ui/button";
import { AlertTriangle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DistractionReminder = () => {
  const { showReminder, dismissReminder, tabSwitchCount } = useFocusStore();

  return (
    <AnimatePresence>
      {showReminder && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 right-6 z-50 glass rounded-xl p-4 max-w-sm neon-glow-violet border border-neon-violet/30"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-neon-magenta shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-sm mb-1">Stay Focused! 🎯</h4>
              <p className="text-xs text-muted-foreground">
                You've switched tabs {tabSwitchCount} times. Try to stay focused on your study session.
              </p>
            </div>
            <Button variant="ghost" size="icon" className="shrink-0 w-6 h-6" onClick={dismissReminder}>
              <X className="w-3 h-3" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DistractionReminder;
