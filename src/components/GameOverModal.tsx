import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { User, ShieldAlert, Terminal, Zap } from "lucide-react";
import { sounds } from "../lib/sounds";
import { Level } from "../types";

interface GameOverModalProps {
  score: number;
  level: Level;
  onSave: (username: string) => void;
  onCancel: () => void;
}

export default function GameOverModal({ score, level, onSave, onCancel }: GameOverModalProps) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const finalUsername = username.trim() || "OPERATIVE";
    sounds.playSuccess();
    onSave(finalUsername);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-md glass-panel p-8 border-cyber-purple/30 bg-cyber-dark relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-purple to-transparent" />
        
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-red-500/10 border border-red-500/20">
            <ShieldAlert className="w-12 h-12 text-red-500 animate-pulse" />
          </div>
        </div>

        <h2 className="text-3xl font-black text-center mb-2 tracking-tighter text-white uppercase">
          System Breached
        </h2>
        <p className="text-center text-cyber-purple/60 font-mono text-xs mb-8 uppercase tracking-widest">
          Connection Terminated • Data Intercepted
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white/5 p-4 rounded-lg border border-white/5 text-center">
            <p className="text-[10px] text-cyber-purple/40 uppercase mb-1">Final Score</p>
            <div className="flex items-center justify-center gap-2">
              <Zap className="w-3 h-3 text-cyber-purple" />
              <p className="text-xl font-bold font-mono text-white">{score.toLocaleString()}</p>
            </div>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/5 text-center">
            <p className="text-[10px] text-cyber-purple/40 uppercase mb-1">Security Level</p>
            <p className="text-xl font-bold font-mono text-white">LVL {level}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] text-cyber-purple/60 uppercase tracking-[0.2em] font-bold flex items-center gap-2">
              <User className="w-3 h-3" /> Operative Handle
            </label>
            <div className="relative">
              <Terminal className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-purple/40" />
              <input
                autoFocus
                type="text"
                maxLength={15}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="ENTER YOUR HANDLE..."
                className="w-full bg-black/60 border border-cyber-purple/20 rounded-xl py-4 pl-12 pr-4 font-mono text-white focus:outline-none focus:border-cyber-purple transition-all placeholder:text-white/10"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="submit"
              onMouseEnter={() => sounds.playClick()}
              className="w-full py-4 bg-cyber-purple text-white font-bold rounded-xl hover:bg-cyber-purple/80 transition-all uppercase tracking-widest shadow-[0_0_15px_rgba(188,19,254,0.3)]"
            >
              Upload Score
            </button>
            <button
              type="button"
              onClick={onCancel}
              onMouseEnter={() => sounds.playClick()}
              className="w-full py-3 text-white/40 font-mono text-[10px] hover:text-white transition-colors uppercase tracking-widest"
            >
              Discard Data
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
