import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Trophy, User, Hash, Star, Target, Award, UserCheck } from "lucide-react";
import { sounds } from "../lib/sounds";
import { getScores, ScoreEntry } from "../lib/storage";
import { Level } from "../types";

interface LeaderboardProps {
  lastResult?: { score: number; level: Level; entryId?: string } | null;
  onRestart?: () => void;
}

export default function Leaderboard({ lastResult, onRestart }: LeaderboardProps) {
  const [scores, setScores] = useState<ScoreEntry[]>([]);

  useEffect(() => {
    setScores(getScores());
  }, []);

  return (
    <section className="min-h-screen pt-32 px-6 pb-20 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl"
      >
        <div className="flex items-center gap-4 mb-12 justify-center">
          <Trophy className="w-12 h-12 text-cyber-purple/80 drop-shadow-[0_0_8px_rgba(188,19,254,0.4)]" />
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter neon-text text-white">
            TOP OPERATIVES
          </h2>
        </div>

        {lastResult && (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-12 glass-panel p-8 border-cyber-purple/20 bg-cyber-purple/[0.05] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-2">
              <Award className="w-12 h-12 text-cyber-purple/10" />
            </div>
            <h3 className="text-cyber-purple/80 font-bold mb-4 flex items-center gap-2 uppercase tracking-widest text-sm">
              <Target className="w-4 h-4" /> Last Mission Summary
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <p className="text-[10px] text-cyber-purple/40 uppercase mb-1">Status</p>
                <p className="text-xl font-bold font-mono text-red-500/80">TERMINATED</p>
              </div>
              <div>
                <p className="text-[10px] text-cyber-purple/40 uppercase mb-1">Final Score</p>
                <p className="text-xl font-bold font-mono text-white">{lastResult.score.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[10px] text-cyber-purple/40 uppercase mb-1">Security Level</p>
                <p className="text-xl font-bold font-mono text-white">LVL {lastResult.level}</p>
              </div>
              <div className="flex items-end">
                <button 
                  onClick={onRestart}
                  className="w-full py-2 bg-cyber-purple/80 text-white text-xs font-bold rounded hover:bg-cyber-purple transition-colors uppercase tracking-widest"
                >
                  Retry Heist
                </button>
              </div>
            </div>
          </motion.div>
        )}

        <div className="glass-panel overflow-hidden border-cyber-purple/10">
          <div className="grid grid-cols-4 p-6 border-b border-white/10 bg-white/5 text-xs font-bold text-cyber-purple/60 uppercase tracking-widest">
            <div className="flex items-center gap-2"><Hash className="w-4 h-4" /> Rank</div>
            <div className="flex items-center gap-2"><User className="w-4 h-4" /> Username</div>
            <div className="flex items-center gap-2"><Star className="w-4 h-4" /> Level</div>
            <div className="flex items-center gap-2"><Star className="w-4 h-4" /> Score</div>
          </div>

          <div className="divide-y divide-white/5">
            {scores.length > 0 ? (
              scores.map((player, index) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`grid grid-cols-4 p-6 transition-colors items-center font-mono ${
                    lastResult?.entryId === player.id 
                      ? 'bg-cyber-purple/10 border-y border-cyber-purple/20' 
                      : 'hover:bg-cyber-purple/5'
                  }`}
                >
                  <div className={`text-xl font-bold ${index === 0 ? 'text-yellow-400' : index === 1 ? 'text-gray-300' : index === 2 ? 'text-amber-600' : 'text-white/40'}`}>
                    #{index + 1}
                  </div>
                  <div className="text-white font-bold tracking-wider truncate mr-2 flex items-center gap-2">
                    {player.username}
                    {lastResult?.entryId === player.id && <UserCheck className="w-3 h-3 text-cyber-purple/80" />}
                  </div>
                  <div className="text-cyber-purple/60">LVL {player.level}</div>
                  <div className="text-cyber-purple/80 font-bold neon-text">{player.score.toLocaleString()}</div>
                </motion.div>
              ))
            ) : (
              <div className="p-12 text-center text-cyber-purple/20 font-mono italic">
                NO DATA PACKETS RETRIEVED YET...
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 p-8 glass-panel border-cyber-purple/10 text-center">
          <p className="text-cyber-purple/40 font-mono text-sm mb-4">WANT TO SEE YOUR NAME HERE?</p>
          <button 
            onClick={onRestart || (() => sounds.playClick())}
            onMouseEnter={() => sounds.playClick()}
            className="cyber-button rounded-lg font-bold"
          >
            START YOUR HEIST
          </button>
        </div>
      </motion.div>
    </section>
  );
}
