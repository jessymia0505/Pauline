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
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyber-purple/[0.02] rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-purple/[0.01] rounded-full blur-[120px]" />

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

        <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tighter text-cyber-white">
          VERSE MIND HEIST
        </h1>
        
        <p className="text-xl md:text-2xl text-cyber-purple mb-12 font-mono tracking-widest uppercase">
          Hack the System • Solve the Code • Break the Security
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(214, 0, 255, 0.2)" }}
            onHoverStart={() => sounds.playClick()}
            whileTap={{ scale: 0.98 }}
            onClick={() => onStart("quiz")}
            className="cyber-button text-xl font-bold px-8 py-6 rounded-xl bg-cyber-purple/5 border border-cyber-purple/20 flex flex-col items-center gap-2 min-w-[240px] text-cyber-white hover:border-cyber-purple/50"
          >
            <Brain className="w-8 h-8 mb-2 text-cyber-purple" />
            <span>START GAME</span>
            <span className="text-[10px] font-mono text-cyber-white/60 tracking-widest">MIND HEIST</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(214, 0, 255, 0.2)" }}
            onHoverStart={() => sounds.playClick()}
            whileTap={{ scale: 0.98 }}
            onClick={() => onStart("grid")}
            className="cyber-button text-xl font-bold px-8 py-6 rounded-xl bg-cyber-purple/5 border border-cyber-purple/20 flex flex-col items-center gap-2 min-w-[240px] text-cyber-white hover:border-cyber-purple/50"
          >
            <Grid3X3 className="w-8 h-8 mb-2 text-cyber-purple" />
            <span>START GAME</span>
            <span className="text-[10px] font-mono text-cyber-white/60 tracking-widest">GRID HACK</span>
          </motion.button>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="glass-panel p-6 border-cyber-purple/20">
            <h3 className="text-cyber-white font-bold mb-2 flex items-center gap-2">
              <span className="text-cyber-purple">01.</span> PENETRATE
            </h3>
            <p className="text-sm text-cyber-white/60">Bypass the initial security layers using logic and pattern recognition.</p>
          </div>
          <div className="glass-panel p-6 border-cyber-purple/20">
            <h3 className="text-cyber-white font-bold mb-2 flex items-center gap-2">
              <span className="text-cyber-purple">02.</span> DECRYPT
            </h3>
            <p className="text-sm text-cyber-white/60">Solve complex puzzles to unlock the core system firewalls.</p>
          </div>
          <div className="glass-panel p-6 border-cyber-purple/20">
            <h3 className="text-cyber-white font-bold mb-2 flex items-center gap-2">
              <span className="text-cyber-purple">03.</span> EXTRACT
            </h3>
            <p className="text-sm text-cyber-white/60">Reach the secure vault and extract the classified data packets.</p>
          </div>
        </div>

        <div className="mt-12 text-cyber-white/40 font-mono text-[10px] tracking-[0.3em] uppercase">
          Built by Paulina509
        </div>
      </motion.div>
    </section>
  );
}
