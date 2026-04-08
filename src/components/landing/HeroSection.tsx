import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import avatar4 from "@/assets/avatar-4.jpg";
import avatar5 from "@/assets/avatar-5.jpg";
import avatar6 from "@/assets/avatar-6.jpg";
import appMockup from "@/assets/app-mockup.jpg";

const floatingUsers = [
  { name: "Reena", img: avatar1, style: "top-[8%] left-[5%] w-36 h-44 lg:w-44 lg:h-52 rotate-[-4deg]" },
  { name: "Naomi", img: avatar2, style: "top-[28%] left-[2%] w-32 h-36 lg:w-36 lg:h-40 rotate-[2deg]" },
  { name: "Dominika", img: avatar3, style: "top-[50%] left-[4%] w-32 h-36 lg:w-36 lg:h-40 rotate-[-3deg]" },
  { name: "Alexa", img: avatar4, style: "top-[18%] right-[3%] w-28 h-32 lg:w-32 lg:h-36 rotate-[3deg]" },
  { name: "Melissa", img: avatar5, style: "top-[38%] right-[1%] w-32 h-36 lg:w-36 lg:h-40 rotate-[-2deg]" },
  { name: "David", img: avatar6, style: "top-[58%] right-[4%] w-28 h-32 lg:w-32 lg:h-36 rotate-[4deg]" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start pt-32 pb-16 overflow-hidden">
      {/* Floating user thumbnails - hidden on mobile */}
      <div className="hidden lg:block">
        {floatingUsers.map((user, i) => (
          <motion.div
            key={user.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
            className={`absolute ${user.style} rounded-2xl overflow-hidden shadow-lg z-0`}
          >
            <img
              src={user.img}
              alt={user.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <span className="absolute bottom-2 left-2 bg-white/90 text-gray-800 text-xs font-medium px-2 py-0.5 rounded-full">
              {user.name}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Center content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Online badge */}
          <div className="inline-flex items-center gap-2 border border-gray-200 rounded-full px-4 py-1.5 text-sm mb-10 bg-white shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-gray-600 font-medium tracking-wide uppercase text-xs">
              17 200 online now
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1] mb-6">
            Working towards your dreams is hard. Not reaching them is harder.
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-gray-500 mb-10">
            Get work done with others from around the 🌎
          </p>

          {/* CTA */}
          <Link to="/dashboard">
            <Button className="bg-gray-900 hover:bg-gray-800 text-white font-semibold text-sm px-8 py-6 rounded-lg uppercase tracking-wider">
              See others live
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* App mockup */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="relative z-10 mt-16 w-full max-w-4xl mx-auto px-6"
      >
        <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-200">
          {/* Browser chrome dots */}
          <div className="bg-white px-4 py-2.5 flex items-center gap-1.5 border-b border-gray-100">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <img
            src={appMockup}
            alt="StudyFlare app interface showing collaborative study rooms"
            className="w-full"
            width={1200}
            height={800}
          />
        </div>
      </motion.div>

      {/* Bottom text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="relative z-10 mt-8 text-sm text-gray-400 text-center max-w-md mx-auto px-6"
      >
        This includes people who are currently live in our community and the StudyFlare app.
      </motion.p>
    </section>
  );
};

export default HeroSection;
