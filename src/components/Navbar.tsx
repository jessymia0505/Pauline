import { Menu } from "lucide-react";
import { motion } from "motion/react";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center glass-panel rounded-none border-t-0 border-x-0">
      <button 
        onClick={onMenuClick}
        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
      >
        <Menu className="w-6 h-6 text-cyber-purple" />
      </button>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-2xl font-bold tracking-widest neon-text text-cyber-purple"
      >
        VERSE
      </motion.div>
    </nav>
  );
}
