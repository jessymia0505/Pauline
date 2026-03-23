export interface ScoreEntry {
  id: string;
  username: string;
  score: number;
  level: number;
  date: string;
}

const STORAGE_KEY = "verse_heist_leaderboard";

export const saveScore = (score: number, level: number, username: string = "OPERATIVE"): ScoreEntry => {
  const scores = getScores();
  const newEntry: ScoreEntry = {
    id: Math.random().toString(36).substr(2, 9),
    username,
    score,
    level,
    date: new Date().toISOString(),
  };
  
  const updatedScores = [...scores, newEntry]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10); // Keep top 10
    
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedScores));
  return newEntry;
};

export const getScores = (): ScoreEntry[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};
