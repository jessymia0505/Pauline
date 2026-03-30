import { useState, useEffect, useCallback, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Timer, Shield, Activity, Zap, AlertTriangle, CheckCircle2 } from "lucide-react";
import { GameState, Level, LEVELS_CONFIG, PUZZLES, Puzzle } from "../types";
import { sounds } from "../lib/sounds";

interface GameProps {
  onGameOver: (score: number, level: Level) => void;
}

export default function Game({ onGameOver }: GameProps) {
  const [gameState, setGameState] = useState<GameState>({
    level: 1,
    score: 0,
    progress: 0,
    isGameOver: false,
    isGameStarted: true,
    currentPuzzleIndex: 0,
    timeLeft: LEVELS_CONFIG[1].timer,
  });

  const [userInput, setUserInput] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string; correctAnswer?: string } | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentLevelConfig = LEVELS_CONFIG[gameState.level];
  const currentPuzzle: Puzzle = PUZZLES[gameState.level][gameState.currentPuzzleIndex];

  const handleGameOver = useCallback(() => {
    setGameState(prev => ({ ...prev, isGameOver: true }));
    onGameOver(gameState.score, gameState.level);
  }, [gameState.score, gameState.level, onGameOver]);

  useEffect(() => {
    if (gameState.isGameOver || !gameState.isGameStarted) return;

    const timer = setInterval(() => {
      setGameState(prev => {
        if (prev.timeLeft <= 0) {
          clearInterval(timer);
          handleGameOver();
          return prev;
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState.isGameOver, gameState.isGameStarted, handleGameOver]);

  const nextPuzzle = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setGameState(prev => {
        const nextIndex = prev.currentPuzzleIndex + 1;
        const isLevelComplete = nextIndex >= currentLevelConfig.puzzlesCount;

        if (isLevelComplete) {
          if (prev.level === 4) {
            // Game Win
            handleGameOver();
            return prev;
          }
          const nextLevel = (prev.level + 1) as Level;
          sounds.playLevelUp();
          return {
            ...prev,
            level: nextLevel,
            currentPuzzleIndex: 0,
            timeLeft: LEVELS_CONFIG[nextLevel].timer,
            progress: (nextLevel - 1) * 25,
          };
        }

        return {
          ...prev,
          currentPuzzleIndex: nextIndex,
          timeLeft: currentLevelConfig.timer,
          progress: prev.progress + (25 / currentLevelConfig.puzzlesCount),
        };
      });
      setUserInput("");
      setSelectedAnswer(null);
      setFeedback(null);
      setIsTransitioning(false);
    }, 1500);
  };

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    if (isTransitioning) return;

    const isCorrect = userInput.trim().toLowerCase() === currentPuzzle.answer.toLowerCase();

    if (isCorrect) {
      sounds.playSuccess();
      setFeedback({ type: "success", message: "ACCESS GRANTED" });
      setGameState(prev => ({ ...prev, score: prev.score + (prev.timeLeft * prev.level * 10) }));
      nextPuzzle();
    } else {
      sounds.playFailure();
      setSelectedAnswer(userInput);
      setFeedback({ 
        type: "error", 
        message: "SYSTEM LOCKDOWN",
        correctAnswer: currentPuzzle.answer
      });
      setTimeout(() => {
        handleGameOver();
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-6 pb-12 flex flex-col items-center">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-panel p-4 flex items-center gap-4 border-cyber-purple/10">
          <Activity className="text-cyber-purple/80 w-6 h-6" />
          <div>
            <p className="text-xs text-cyber-purple/40 uppercase">System Level</p>
            <p className="text-xl font-bold font-mono">{gameState.level}: {currentLevelConfig.name}</p>
          </div>
        </div>
        <div className="glass-panel p-4 flex items-center gap-4 border-cyber-purple/10">
          <Zap className="text-cyber-purple/80 w-6 h-6" />
          <div>
            <p className="text-xs text-cyber-purple/40 uppercase">Current Score</p>
            <p className="text-xl font-bold font-mono">{gameState.score}</p>
          </div>
        </div>
        <div className="glass-panel p-4 flex items-center gap-4 border-cyber-purple/10">
          <Timer className={`${gameState.timeLeft < 5 ? 'text-red-500 animate-pulse' : 'text-cyber-purple/80'} w-6 h-6`} />
          <div>
            <p className="text-xs text-cyber-purple/40 uppercase">Time Remaining</p>
            <p className="text-xl font-bold font-mono">{gameState.timeLeft}s</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl mb-8">
        <div className="flex justify-between text-xs text-cyber-purple/40 mb-2 uppercase tracking-widest">
          <span>Hack Progress</span>
          <span>{Math.round(gameState.progress)}%</span>
        </div>
        <div className="h-1 bg-white/5 rounded-full overflow-hidden border border-white/5">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${gameState.progress}%` }}
            className="h-full bg-gradient-to-r from-cyber-purple/60 to-white/40 shadow-[0_0_4px_rgba(214,0,255,0.2)]"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!isTransitioning ? (
          <motion.div
            key={currentPuzzle.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-2xl glass-panel p-8 md:p-12 border-cyber-purple/10 bg-cyber-purple/[0.02] relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-cyber-purple/10" />
            
            <div className="flex items-center gap-2 mb-8 text-cyber-purple/80">
              <Shield className="w-5 h-5" />
              <span className="text-xs uppercase tracking-widest font-bold">Security Layer {gameState.currentPuzzleIndex + 1}</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-medium mb-8 font-mono leading-relaxed opacity-90">
              {currentPuzzle.question}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {currentPuzzle.options ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentPuzzle.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      disabled={!!feedback}
                      onClick={() => {
                        if (feedback) return;
                        setUserInput(option);
                        setSelectedAnswer(option);
                        // Auto submit for multiple choice
                        const isCorrect = option.trim().toLowerCase() === currentPuzzle.answer.toLowerCase();
                        if (isCorrect) {
                          sounds.playSuccess();
                          setFeedback({ type: "success", message: "ACCESS GRANTED" });
                          setGameState(prev => ({ ...prev, score: prev.score + (prev.timeLeft * prev.level * 10) }));
                          nextPuzzle();
                        } else {
                          sounds.playFailure();
                          setFeedback({ 
                            type: "error", 
                            message: "SYSTEM LOCKDOWN",
                            correctAnswer: currentPuzzle.answer
                          });
                          setTimeout(() => {
                            handleGameOver();
                          }, 3000);
                        }
                      }}
                      className={`p-4 rounded-xl border transition-all text-left font-mono ${
                        feedback?.type === 'error' && option.toLowerCase() === currentPuzzle.answer.toLowerCase()
                          ? 'border-green-500 bg-green-500/20 text-green-500'
                          : feedback?.type === 'error' && selectedAnswer === option
                            ? 'border-red-500 bg-red-500/20 text-red-500'
                            : userInput === option 
                              ? 'border-cyber-purple bg-cyber-purple/20' 
                              : 'border-white/10 hover:bg-cyber-purple/10'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="relative">
                  <input
                    autoFocus
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Enter decryption key..."
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-4 font-mono text-xl focus:outline-none focus:border-cyber-purple transition-colors"
                  />
                  <button 
                    type="submit"
                    className="absolute right-2 top-2 bottom-2 px-6 bg-cyber-purple text-white rounded-lg font-bold hover:bg-cyber-purple/80 transition-colors"
                  >
                    SUBMIT
                  </button>
                </div>
              )}
            </form>

            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`absolute inset-0 flex flex-col items-center justify-center backdrop-blur-md z-20 ${
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
                  {feedback.type === 'error' && feedback.correctAnswer && (
                    <div className="mt-4 text-center">
                      <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-1">Correct Decryption Key</p>
                      <p className="text-green-500 font-mono text-xl font-bold">{feedback.correctAnswer}</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-12 h-12 border-2 border-cyber-purple border-t-transparent rounded-full animate-spin mx-auto mb-6" />
            <p className="text-cyber-purple font-mono tracking-widest animate-pulse">PENETRATING NEXT LAYER...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
