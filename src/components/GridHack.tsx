import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Timer, Activity, Zap, Shield, Target, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Level, LEVELS_CONFIG } from "../types";
import { sounds } from "../lib/sounds";
import { trackEvent, AnalyticsEvents } from "../lib/analytics";

interface GridHackProps {
  onGameOver: (score: number, level: Level) => void;
}

const HEX_CHARS = "0123456789ABCDEF";
const generateHex = () => HEX_CHARS[Math.floor(Math.random() * 16)] + HEX_CHARS[Math.floor(Math.random() * 16)];

export default function GridHack({ onGameOver }: GridHackProps) {
  const [level, setLevel] = useState<Level>(1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(LEVELS_CONFIG[1].timer);
  const [grid, setGrid] = useState<string[]>([]);
  const [targetSequence, setTargetSequence] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string; correctHash?: string } | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const getGridSize = (lvl: Level) => {
    if (lvl === 1) return 4;
    if (lvl === 2) return 5;
    if (lvl === 3) return 6;
    return 8;
  };

  const getSequenceLength = (lvl: Level) => lvl + 2;

  const initLevel = useCallback((lvl: Level) => {
    const size = getGridSize(lvl);
    const totalCells = size * size;
    const newGrid = Array.from({ length: totalCells }, () => generateHex());
    
    // Ensure target sequence exists in grid
    const seqLen = getSequenceLength(lvl);
    const newTarget: string[] = [];
    for (let i = 0; i < seqLen; i++) {
      newTarget.push(newGrid[Math.floor(Math.random() * totalCells)]);
    }

    setGrid(newGrid);
    setTargetSequence(newTarget);
    setCurrentIndex(0);
    setSelectedCell(null);
    setTimeLeft(LEVELS_CONFIG[lvl].timer);
    setIsTransitioning(false);
  }, []);

  useEffect(() => {
    initLevel(level);
  }, [level, initLevel]);

  const handleGameOver = useCallback(() => {
    setIsGameOver(true);
    onGameOver(score, level);
  }, [score, level, onGameOver]);

  useEffect(() => {
    if (isGameOver || isTransitioning) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          handleGameOver();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isGameOver, isTransitioning, handleGameOver]);

  const handleCellClick = (value: string, index: number) => {
    if (isGameOver || isTransitioning || feedback) return;

    if (value === targetSequence[currentIndex]) {
      sounds.playClick();
      const nextIdx = currentIndex + 1;
      if (nextIdx === targetSequence.length) {
        // Level Complete
        sounds.playSuccess();
        setFeedback({ type: "success", message: "SEQUENCE MATCHED" });
        setScore(prev => prev + (timeLeft * level * 20));
        
        if (level === 4) {
          trackEvent(AnalyticsEvents.LEVEL_COMPLETE, { 
            level, 
            levelName: LEVELS_CONFIG[level].name,
            mode: 'grid-hack', 
            status: 'completed' 
          });
          setTimeout(() => handleGameOver(), 1500);
        } else {
          setIsTransitioning(true);
          const nextLevel = (level + 1) as Level;
          trackEvent(AnalyticsEvents.LEVEL_COMPLETE, { 
            level, 
            levelName: LEVELS_CONFIG[level].name,
            mode: 'grid-hack', 
            nextLevel,
            nextLevelName: LEVELS_CONFIG[nextLevel].name
          });
          setTimeout(() => {
            setFeedback(null);
            setLevel(prev => (prev + 1) as Level);
          }, 1500);
        }
      } else {
        setCurrentIndex(nextIdx);
      }
    } else {
      // Wrong choice
      sounds.playFailure();
      setSelectedCell(index);
      setFeedback({ 
        type: "error", 
        message: "HASH MISMATCH",
        correctHash: targetSequence[currentIndex]
      });
      setTimeout(() => handleGameOver(), 3000);
    }
  };

  const gridSize = getGridSize(level);

  return (
    <div className="min-h-screen pt-24 px-6 pb-12 flex flex-col items-center">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-panel p-4 flex items-center gap-4 border-cyber-purple/10">
          <Activity className="text-cyber-purple/80 w-6 h-6" />
          <div>
            <p className="text-xs text-cyber-purple/40 uppercase">Encryption Level</p>
            <p className="text-xl font-bold font-mono">{level}: {LEVELS_CONFIG[level].name}</p>
          </div>
        </div>
        <div className="glass-panel p-4 flex items-center gap-4 border-cyber-purple/10">
          <Zap className="text-cyber-purple/80 w-6 h-6" />
          <div>
            <p className="text-xs text-cyber-purple/40 uppercase">Data Extracted</p>
            <p className="text-xl font-bold font-mono">{score}</p>
          </div>
        </div>
        <div className="glass-panel p-4 flex items-center gap-4 border-cyber-purple/10">
          <Timer className={`${timeLeft < 5 ? 'text-red-500 animate-pulse' : 'text-cyber-purple/80'} w-6 h-6`} />
          <div>
            <p className="text-xs text-cyber-purple/40 uppercase">Buffer Time</p>
            <p className="text-xl font-bold font-mono">{timeLeft}s</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-2xl mb-8 glass-panel p-6 border-cyber-purple/10 bg-cyber-purple/[0.01]">
        <div className="flex items-center gap-2 mb-4 text-cyber-purple/60">
          <Target className="w-4 h-4" />
          <span className="text-xs uppercase tracking-widest font-bold">Target Hash Sequence</span>
        </div>
        <div className="flex gap-4 justify-center">
          {targetSequence.map((hex, i) => (
            <div 
              key={i}
              className={`w-12 h-12 flex items-center justify-center rounded border font-mono font-bold text-lg transition-all ${
                i < currentIndex 
                  ? 'bg-green-500/10 border-green-500/40 text-green-500/80' 
                  : i === currentIndex 
                    ? 'bg-cyber-purple/10 border-cyber-purple/60 text-white animate-pulse' 
                    : 'bg-white/5 border-white/10 text-white/20'
              }`}
            >
              {hex}
            </div>
          ))}
        </div>
      </div>

      <div 
        className="grid gap-2 mb-8"
        style={{ 
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          width: '100%',
          maxWidth: gridSize * 60 + 'px'
        }}
      >
        {grid.map((hex, i) => (
          <motion.button
            key={i}
            whileHover={!feedback ? { scale: 1.05 } : {}}
            whileTap={!feedback ? { scale: 0.95 } : {}}
            onClick={() => handleCellClick(hex, i)}
            disabled={!!feedback}
            className={`aspect-square flex items-center justify-center rounded border font-mono text-sm md:text-base transition-all ${
              feedback?.type === 'error' && hex === targetSequence[currentIndex]
                ? 'border-green-500 bg-green-500/20 text-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]'
                : feedback?.type === 'error' && selectedCell === i
                  ? 'border-red-500 bg-red-500/20 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]'
                  : 'border-white/10 bg-black/40 hover:border-cyber-purple hover:bg-cyber-purple/10'
            }`}
          >
            {hex}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`fixed inset-0 flex flex-col items-center justify-center backdrop-blur-md z-50 ${
              feedback.type === 'success' ? 'bg-green-500/20' : 'bg-red-500/20'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
            ) : (
              <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
            )}
            <h3 className={`text-3xl font-black tracking-tighter ${
              feedback.type === 'success' ? 'text-green-500' : 'text-red-500'
            }`}>
              {feedback.message}
            </h3>
            {feedback.type === 'error' && feedback.correctHash && (
              <div className="mt-4 text-center">
                <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-1">Correct Hash Required</p>
                <p className="text-green-500 font-mono text-xl font-bold">{feedback.correctHash}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {isTransitioning && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-xl z-40">
          <div className="w-12 h-12 border-2 border-cyber-purple border-t-transparent rounded-full animate-spin mb-6" />
          <p className="text-cyber-purple font-mono tracking-widest animate-pulse">RECALIBRATING HASH GRID...</p>
        </div>
      )}
    </div>
  );
}
