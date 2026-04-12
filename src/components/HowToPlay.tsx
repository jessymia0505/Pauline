import { motion } from "motion/react";
import { HelpCircle, Terminal, Shield, Zap, Timer, Brain, Grid3X3, Target, MousePointer2 } from "lucide-react";
import { sounds } from "../lib/sounds";

export default function HowToPlay() {
  const mindHeistSteps = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "COGNITIVE DECRYPTION",
      description: "Solve logic puzzles, binary conversions, and trivia challenges. Your brain is the ultimate hacking tool."
    },
    {
      icon: <Terminal className="w-6 h-6" />,
      title: "INPUT PROTOCOLS",
      description: "Type your answers directly into the terminal or select from multiple-choice security bypass options."
    }
  ];

  const gridHackSteps = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "HASH SEQUENCING",
      description: "A target hex sequence (e.g., 'A4', 'F2', '09') is displayed. You must find and extract these in order."
    },
    {
      icon: <MousePointer2 className="w-6 h-6" />,
      title: "RAPID EXTRACTION",
      description: "Locate the target hex codes within the data grid and click them before the security buffer expires."
    }
  ];

  const generalRules = [
    {
      icon: <Timer className="w-6 h-6" />,
      title: "RACE THE CLOCK",
      description: "Security protocols are active! You have a limited time per level. Faster decryptions earn higher score multipliers."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "BYPASS FIREWALLS",
      description: "There are 4 levels of increasing difficulty. Complete all puzzles in a level to advance to the next security tier."
    }
  ];

  return (
    <section className="min-h-screen pt-32 px-6 pb-20 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl"
      >
        <div className="flex items-center gap-4 mb-12 justify-center">
          <HelpCircle className="w-12 h-12 text-cyber-purple/80 drop-shadow-[0_0_8px_rgba(188,19,254,0.4)]" />
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            MISSION PROTOCOLS
          </h2>
        </div>

        <div className="space-y-12">
          {/* Mind Heist Section */}
          <div>
            <div className="flex items-center gap-3 mb-6 border-b border-cyber-purple/20 pb-2">
              <Brain className="w-6 h-6 text-cyber-purple" />
              <h3 className="text-2xl font-black tracking-tighter text-white uppercase italic">01. MIND HEIST <span className="text-xs font-mono text-cyber-white/60 ml-2 italic">KNOWLEDGE QUIZ</span></h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mindHeistSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-panel p-6 border-cyber-purple/10 hover:border-cyber-purple/30 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-cyber-purple/5 flex items-center justify-center text-cyber-white/60 mb-4 group-hover:bg-cyber-purple/10 transition-colors">
                    {step.icon}
                  </div>
                  <h4 className="text-lg font-bold mb-2 font-mono text-white tracking-wider">{step.title}</h4>
                  <p className="text-cyber-white/50 font-mono text-xs leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Grid Hack Section */}
          <div>
            <div className="flex items-center gap-3 mb-6 border-b border-cyber-purple/20 pb-2">
              <Grid3X3 className="w-6 h-6 text-cyber-purple" />
              <h3 className="text-2xl font-black tracking-tighter text-white uppercase italic">02. GRID HACK <span className="text-xs font-mono text-cyber-white/60 ml-2 italic">PATTERN MATCH</span></h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {gridHackSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-panel p-6 border-cyber-purple/10 hover:border-cyber-purple/30 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-cyber-purple/5 flex items-center justify-center text-cyber-white/60 mb-4 group-hover:bg-cyber-purple/10 transition-colors">
                    {step.icon}
                  </div>
                  <h4 className="text-lg font-bold mb-2 font-mono text-white tracking-wider">{step.title}</h4>
                  <p className="text-cyber-white/50 font-mono text-xs leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* General Rules */}
          <div>
            <div className="flex items-center gap-3 mb-6 border-b border-cyber-purple/20 pb-2">
              <Zap className="w-6 h-6 text-cyber-purple" />
              <h3 className="text-2xl font-black tracking-tighter text-white uppercase italic">SYSTEM RULES <span className="text-xs font-mono text-cyber-white/60 ml-2 italic">CORE PROTOCOLS</span></h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {generalRules.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-panel p-6 border-cyber-purple/10 hover:border-cyber-purple/30 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-cyber-purple/5 flex items-center justify-center text-cyber-white/60 mb-4 group-hover:bg-cyber-purple/10 transition-colors">
                    {step.icon}
                  </div>
                  <h4 className="text-lg font-bold mb-2 font-mono text-white tracking-wider">{step.title}</h4>
                  <p className="text-cyber-white/50 font-mono text-xs leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 p-8 glass-panel border-cyber-purple/10 text-center">
          <p className="text-cyber-white/40 font-mono text-sm mb-6 uppercase tracking-widest">READY TO BEGIN THE HEIST?</p>
          <button 
            onClick={() => sounds.playStart()}
            onMouseEnter={() => sounds.playClick()}
            className="cyber-button rounded-lg font-bold px-12"
          >
            START GAME
          </button>
        </div>
      </motion.div>
    </section>
  );
}
