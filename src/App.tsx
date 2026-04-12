import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import Game from "./components/Game";
import GridHack from "./components/GridHack";
import Leaderboard from "./components/Leaderboard";
import Contact from "./components/Contact";
import HowToPlay from "./components/HowToPlay";
import GameOverModal from "./components/GameOverModal";
import { Level, GameMode, LEVELS_CONFIG } from "./types";
import { sounds } from "./lib/sounds";
import { saveScore } from "./lib/storage";
import { trackEvent, trackPageView, AnalyticsEvents } from "./lib/analytics";

type View = "home" | "game" | "leaderboard" | "contact" | "how-to-play";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("home");
  const [gameMode, setGameMode] = useState<GameMode>("quiz");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [lastGameResult, setLastGameResult] = useState<{ score: number; level: Level; entryId?: string } | null>(null);
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [pendingScore, setPendingScore] = useState<{ score: number; level: Level } | null>(null);
  
  useEffect(() => {
    // Track initial home view
    trackPageView("home");

    // Heartbeat to keep session alive and reduce bounce rate
    // Increased interval to 2 minutes to avoid "high-ratio" anomalies
    let lastActivity = Date.now();
    const updateActivity = () => { lastActivity = Date.now(); };
    
    window.addEventListener('mousemove', updateActivity);
    window.addEventListener('keydown', updateActivity);
    window.addEventListener('click', updateActivity);

    const heartbeatInterval = setInterval(() => {
      // Only track heartbeat if:
      // 1. The document is visible
      // 2. There was activity in the last 5 minutes
      const isVisible = document.visibilityState === 'visible';
      const wasActiveRecently = Date.now() - lastActivity < 300000; // 5 minutes

      if (isVisible && wasActiveRecently) {
        trackEvent(AnalyticsEvents.HEARTBEAT);
      }
    }, 120000); // Every 2 minutes

    return () => {
      clearInterval(heartbeatInterval);
      window.removeEventListener('mousemove', updateActivity);
      window.removeEventListener('keydown', updateActivity);
      window.removeEventListener('click', updateActivity);
    };
  }, []);

  const handleStartGame = (mode: GameMode = "quiz") => {
    sounds.playStart();
    setGameMode(mode);
    setCurrentView("game");
    trackPageView("game");
    trackEvent(AnalyticsEvents.GAME_START, { mode });
  };

  const handleGameOver = (score: number, level: Level) => {
    sounds.playFailure();
    setPendingScore({ score, level });
    setShowGameOverModal(true);
    trackEvent(AnalyticsEvents.GAME_OVER, { score, level: LEVELS_CONFIG[level].name });
  };

  const handleSaveScore = (username: string) => {
    if (!pendingScore) return;
    const entry = saveScore(pendingScore.score, pendingScore.level, username);
    setLastGameResult({ ...pendingScore, entryId: entry.id });
    setShowGameOverModal(false);
    setPendingScore(null);
    setCurrentView("leaderboard");
    trackPageView("leaderboard");
    trackEvent(AnalyticsEvents.SCORE_SAVED, { score: pendingScore.score, username });
  };

  const handleCancelSave = () => {
    if (!pendingScore) return;
    setLastGameResult({ ...pendingScore });
    setShowGameOverModal(false);
    setPendingScore(null);
    setCurrentView("leaderboard");
    trackPageView("leaderboard");
  };

  const handleNavigate = (view: View) => {
    sounds.playClick();
    setCurrentView(view);
    trackPageView(view);
    
    // Track navigation events
    switch(view) {
      case "leaderboard":
        trackEvent(AnalyticsEvents.VIEW_LEADERBOARD);
        break;
      case "how-to-play":
        trackEvent(AnalyticsEvents.VIEW_HOW_TO_PLAY);
        break;
      case "contact":
        trackEvent(AnalyticsEvents.VIEW_CONTACT);
        break;
    }
  };

  const renderView = () => {
    switch (currentView) {
      case "home":
        return <Hero onStart={handleStartGame} />;
      case "game":
        return gameMode === "quiz" ? (
          <Game onGameOver={handleGameOver} />
        ) : (
          <GridHack onGameOver={handleGameOver} />
        );
      case "leaderboard":
        return <Leaderboard lastResult={lastGameResult} onRestart={handleStartGame} />;
      case "contact":
        return <Contact />;
      case "how-to-play":
        return <HowToPlay />;
      default:
        return <Hero onStart={handleStartGame} />;
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Visual Effects Overlay */}
      <div className="scanline" />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-40" />
      
      <Navbar onMenuClick={() => {
        sounds.playClick();
        setIsSidebarOpen(true);
        trackEvent(AnalyticsEvents.MENU_OPEN);
      }} />
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => {
          sounds.playClick();
          setIsSidebarOpen(false);
        }} 
        onNavigate={(view) => handleNavigate(view as View)} 
      />

      <AnimatePresence>
        {showGameOverModal && pendingScore && (
          <GameOverModal
            score={pendingScore.score}
            level={pendingScore.level}
            onSave={handleSaveScore}
            onCancel={handleCancelSave}
          />
        )}
      </AnimatePresence>

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer-like status bar */}
      <footer className="fixed bottom-0 left-0 w-full p-4 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-cyber-white/60 tracking-widest z-50 bg-black/20 backdrop-blur-sm">
        <div className="flex gap-6 mb-2 md:mb-0">
          <button 
            onClick={() => handleNavigate("how-to-play")}
            onMouseEnter={() => sounds.playClick()}
            className="hover:text-cyber-white transition-colors cursor-pointer uppercase font-bold border-b border-transparent hover:border-cyber-white"
          >
            How to Play
          </button>
          <button 
            onClick={() => handleNavigate("contact")}
            onMouseEnter={() => sounds.playClick()}
            className="hover:text-cyber-white transition-colors cursor-pointer uppercase font-bold border-b border-transparent hover:border-cyber-white"
          >
            Contact Us
          </button>
        </div>
        <div className="uppercase font-bold text-cyber-white/40">
          Built by Paulina509
        </div>
      </footer>
    </div>
  );
}
