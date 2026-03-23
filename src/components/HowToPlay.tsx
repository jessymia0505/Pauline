import { motion } from "motion/react";
import { HelpCircle, Terminal, Shield, Zap, Timer } from "lucide-react";
import { sounds } from "../lib/sounds";

export default function HowToPlay() {
  const steps = [
    {
      icon: <Terminal className="w-6 h-6" />,
      title: "DECRYPT THE CODE",
      description: "Each security layer presents a logic puzzle, binary conversion, or pattern challenge. Type your answer or select the correct option to penetrate the layer."
    },
    {
      icon: <Timer className="w-6 h-6" />,
      title: "RACE THE CLOCK",
      description: "Security protocols are active! You have a limited time per level. Faster decryptions earn higher score multipliers."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "BYPASS FIREWALLS",
      description: "There are 4 levels of increasing difficulty. Complete all puzzles in a level to advance to the next security tier."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "AVOID LOCKDOWN",
      description: "Wrong answers trigger system alerts and penalize your score. Too many failures or running out of time results in a complete system lockdown."
    }
  ];

  return (
    <section className="min-h-screen pt-32 px-6 pb-20 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl"
      >
        <div className="flex items-center gap-4 mb-12 justify-center">
          <HelpCircle className="w-12 h-12 text-cyber-purple drop-shadow-[0_0_10px_#bc13fe]" />
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter neon-text text-white">
            MISSION PROTOCOLS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel p-8 border-cyber-purple/20 hover:border-cyber-purple/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg bg-cyber-purple/10 flex items-center justify-center text-cyber-purple mb-6 group-hover:bg-cyber-purple/20 transition-colors">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 font-mono text-white tracking-wider">{step.title}</h3>
              <p className="text-cyber-purple/70 font-mono text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 p-8 glass-panel border-cyber-purple/30 text-center">
          <p className="text-cyber-purple/60 font-mono text-sm mb-6 uppercase tracking-widest">READY TO BEGIN THE HEIST?</p>
          <button 
            onClick={() => sounds.playStart()}
            onMouseEnter={() => sounds.playClick()}
            className="cyber-button rounded-lg font-bold px-12"
          >
            START MISSION
          </button>
        </div>
      </motion.div>
    </section>
  );
}
