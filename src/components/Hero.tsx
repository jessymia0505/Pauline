import { motion } from "motion/react";
import { Terminal, ShieldAlert, Cpu, Brain, Grid3X3 } from "lucide-react";
import { sounds } from "../lib/sounds";
import { GameMode } from "../types";

interface HeroProps {
  onStart: (mode: GameMode) => void;
}

export default function Hero({ onStart }: HeroProps) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden pt-20">
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyber-purple/5 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-purple/[0.02] rounded-full blur-[120px] animate-pulse delay-1000" />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="z-10 max-w-4xl"
      >
        <div className="flex justify-center gap-4 mb-6">
          <Terminal className="w-8 h-8 text-cyber-purple/40" />
          <ShieldAlert className="w-8 h-8 text-cyber-purple/40" />
          <Cpu className="w-8 h-8 text-cyber-purple/40" />
        </div>

        <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tighter neon-text text-white/90">
          VERSE MIND HEIST
        </h1>
        
        <p className="text-xl md:text-2xl text-cyber-purple/60 mb-12 font-mono tracking-widest">
          Hack the System • Solve the Code • Break the Security
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 0 10px rgba(214, 0, 255, 0.1)" }}
            onHoverStart={() => sounds.playClick()}
            whileTap={{ scale: 0.98 }}
            onClick={() => onStart("quiz")}
            className="cyber-button text-xl font-medium px-8 py-6 rounded-xl bg-cyber-purple/[0.01] border flex flex-col items-center gap-2 min-w-[240px]"
          >
            <Brain className="w-8 h-8 mb-2 opacity-60" />
            <span>MIND HEIST</span>
            <span className="text-[10px] font-mono opacity-30 tracking-widest">KNOWLEDGE QUIZ</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 0 10px rgba(214, 0, 255, 0.1)" }}
            onHoverStart={() => sounds.playClick()}
            whileTap={{ scale: 0.98 }}
            onClick={() => onStart("grid")}
            className="cyber-button text-xl font-medium px-8 py-6 rounded-xl bg-cyber-purple/[0.01] border flex flex-col items-center gap-2 min-w-[240px]"
          >
            <Grid3X3 className="w-8 h-8 mb-2 opacity-60" />
            <span>GRID HACK</span>
            <span className="text-[10px] font-mono opacity-30 tracking-widest">PATTERN MATCH</span>
          </motion.button>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="glass-panel p-6 border-cyber-purple/10">
            <h3 className="text-cyber-purple/80 font-bold mb-2">01. PENETRATE</h3>
            <p className="text-sm text-white/40">Bypass the initial security layers using logic and pattern recognition.</p>
          </div>
          <div className="glass-panel p-6 border-cyber-purple/10">
            <h3 className="text-cyber-purple/80 font-bold mb-2">02. DECRYPT</h3>
            <p className="text-sm text-white/40">Solve complex puzzles to unlock the core system firewalls.</p>
          </div>
          <div className="glass-panel p-6 border-cyber-purple/10">
            <h3 className="text-cyber-purple/80 font-bold mb-2">03. EXTRACT</h3>
            <p className="text-sm text-white/40">Reach the secure vault and extract the classified data packets.</p>
          </div>
        </div>

        <div className="mt-12 text-cyber-purple/40 font-mono text-[10px] tracking-[0.3em] uppercase">
          Built by Paulina509
        </div>
      </motion.div>
    </section>
  );
}
