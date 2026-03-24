import { motion, AnimatePresence } from "motion/react";
import { X, BarChart3, Users, Globe, Zap, Activity } from "lucide-react";

interface AnalyticsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AnalyticsPanel({ isOpen, onClose }: AnalyticsPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed bottom-24 right-6 w-80 glass-panel p-6 border-cyber-purple/30 z-[100] shadow-[0_0_30px_rgba(188,19,254,0.1)]"
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2 text-cyber-purple">
              <BarChart3 className="w-5 h-5" />
              <span className="font-bold tracking-widest text-xs uppercase">System Analytics</span>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
              <X className="w-4 h-4 text-cyber-purple/60" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/5">
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-cyber-purple/60" />
                <span className="text-xs text-white/60">Active Operatives</span>
              </div>
              <span className="font-mono font-bold text-cyber-purple">1,284</span>
            </div>

            <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/5">
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-cyber-purple/60" />
                <span className="text-xs text-white/60">Global Nodes</span>
              </div>
              <span className="font-mono font-bold text-cyber-purple">42</span>
            </div>

            <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/5">
              <div className="flex items-center gap-3">
                <Zap className="w-4 h-4 text-cyber-purple/60" />
                <span className="text-xs text-white/60">Data Extraction Rate</span>
              </div>
              <span className="font-mono font-bold text-cyber-purple">8.4 GB/s</span>
            </div>

            <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/5">
              <div className="flex items-center gap-3">
                <Activity className="w-4 h-4 text-cyber-purple/60" />
                <span className="text-xs text-white/60">System Integrity</span>
              </div>
              <span className="font-mono font-bold text-green-500">99.9%</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 text-[10px] text-cyber-purple/40 font-mono text-center uppercase tracking-widest">
            Tracking via vgdh.io
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
