import { X, Home, Gamepad2, Trophy, Mail, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string) => void;
}

const menuItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "game", label: "Game", icon: Gamepad2 },
  { id: "how-to-play", label: "How to Play", icon: HelpCircle },
  { id: "leaderboard", label: "Leaderboard", icon: Trophy },
  { id: "contact", label: "Contact", icon: Mail },
];

export default function Sidebar({ isOpen, onClose, onNavigate }: SidebarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-72 bg-cyber-dark border-r border-cyber-purple/30 z-[70] p-6"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-xl font-black tracking-widest text-cyber-white">MENU</span>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg">
                <X className="w-6 h-6 text-cyber-purple" />
              </button>
            </div>

            <nav className="space-y-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    onClose();
                  }}
                  className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-cyber-purple/10 transition-all border border-transparent hover:border-cyber-purple/30 group text-cyber-white"
                >
                  <item.icon className="w-5 h-5 text-cyber-purple group-hover:scale-110 transition-transform" />
                  <span className="text-lg font-bold group-hover:text-cyber-purple transition-colors">
                    {item.label}
                  </span>
                </button>
              ))}
            </nav>

            <div className="absolute bottom-8 left-6 right-6 p-4 glass-panel text-xs text-cyber-white/60 text-center">
              SYSTEM STATUS: ONLINE
              <br />
              ENCRYPTION: ACTIVE
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
