import { motion } from "framer-motion";
import { Timer, MessageSquare, Trophy, Brain, Users, Shield } from "lucide-react";

const features = [
  { icon: Timer, title: "Pomodoro Timer", desc: "Server-synced timers so everyone stays in flow together." },
  { icon: MessageSquare, title: "Real-Time Chat", desc: "Chat with your study group without leaving the room." },
  { icon: Trophy, title: "Leaderboards", desc: "Compete on study time, streaks, and focus scores." },
  { icon: Brain, title: "Focus Score", desc: "AI-powered distraction detection keeps you accountable." },
  { icon: Users, title: "Buddy Matching", desc: "Get paired with students studying the same topics." },
  { icon: Shield, title: "Private Rooms", desc: "Create invite-only rooms for your study group." },
];

const FeaturesSection = () => (
  <section className="py-24 bg-gray-50">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Everything you need to <span className="text-gray-900">stay focused</span>
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto">
          Built for serious students who want accountability, community, and results.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center mb-4">
              <f.icon className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">{f.title}</h3>
            <p className="text-sm text-gray-500">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
