import { Menu, BarChart3 } from "lucide-react";
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
        className="text-2xl font-medium tracking-widest neon-text text-cyber-purple/70"
      >
        VERSE
      </motion.div>

      <a 
        href="https://analytics.vgdh.io/paulina1-theta.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyber-purple/10 border border-cyber-purple/30 hover:bg-cyber-purple/20 transition-all group"
      >
        <BarChart3 className="w-4 h-4 text-cyber-purple group-hover:scale-110 transition-transform" />
        <span className="text-[10px] font-mono font-bold text-cyber-purple uppercase tracking-widest hidden sm:inline">
          Live Stats
        </span>
      </a>
    </nav>
  );
}
