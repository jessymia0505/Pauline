import { motion } from "motion/react";
import { Send, Twitter, Mail, Globe, ShieldCheck } from "lucide-react";

export default function Contact() {
  return (
    <section className="min-h-screen pt-32 px-6 pb-20 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl text-center"
      >
        <div className="flex items-center gap-4 mb-12 justify-center">
          <ShieldCheck className="w-12 h-12 text-cyber-purple/60 drop-shadow-[0_0_4px_rgba(214,0,255,0.2)]" />
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white/90 uppercase">
            Contact Us
          </h2>
        </div>

        <p className="text-xl text-cyber-purple/80 mb-16 font-mono tracking-widest max-w-2xl mx-auto">
          HAVE QUESTIONS OR FEEDBACK? CONNECT WITH THE VERSE ECOSYSTEM OPERATIVES.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <motion.a
            whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(188, 19, 254, 0.2)" }}
            href="https://t.me/Getverse"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel p-10 flex flex-col items-center gap-6 border-cyber-purple/20 group hover:border-cyber-purple/50 transition-all"
          >
            <div className="w-20 h-20 rounded-2xl bg-cyber-purple/10 flex items-center justify-center group-hover:bg-cyber-purple/20 transition-colors">
              <Send className="w-10 h-10 text-cyber-purple group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2 text-cyber-purple">TELEGRAM</h3>
              <p className="text-white/60 font-mono">@Getverse</p>
            </div>
          </motion.a>

          <motion.a
            whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(188, 19, 254, 0.2)" }}
            href="https://x.com/VerseEcosystem"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel p-10 flex flex-col items-center gap-6 border-cyber-purple/20 group hover:border-cyber-purple/50 transition-all"
          >
            <div className="w-20 h-20 rounded-2xl bg-cyber-purple/10 flex items-center justify-center group-hover:bg-cyber-purple/20 transition-colors">
              <Twitter className="w-10 h-10 text-cyber-purple group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2 text-cyber-purple">X (TWITTER)</h3>
              <p className="text-white/60 font-mono">@VerseEcosystem</p>
            </div>
          </motion.a>
        </div>

        <div className="flex flex-wrap justify-center gap-8 text-cyber-white/40 font-mono text-sm">
          <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> support@verse.com</div>
          <div className="flex items-center gap-2"><Globe className="w-4 h-4" /> verse.io</div>
        </div>
      </motion.div>
    </section>
  );
}
