export type Level = 1 | 2 | 3 | 4;
export type GameMode = "quiz" | "grid";

export interface Puzzle {
  id: string;
  question: string;
  options?: string[];
  answer: string;
  hint?: string;
}

export interface GameState {
  mode: GameMode;
  level: Level;
  score: number;
  progress: number;
  isGameOver: boolean;
  isGameStarted: boolean;
  currentPuzzleIndex: number;
  timeLeft: number;
}

export const LEVELS_CONFIG = {
  1: { name: "Basic Access", timer: 30, puzzlesCount: 7 },
  2: { name: "Firewall Bypass", timer: 25, puzzlesCount: 7 },
  3: { name: "Core System", timer: 20, puzzlesCount: 8 },
  4: { name: "Secure Vault", timer: 15, puzzlesCount: 8 },
};

export const PUZZLES: Record<Level, Puzzle[]> = {
  1: [
    { id: "1-1", question: "What is the ticker symbol for Bitcoin?", options: ["BTC", "ETH", "XRP", "LTC"], answer: "BTC" },
    { id: "1-2", question: "What is the smallest unit of a Bitcoin called?", options: ["Bit", "Satoshi", "Wei", "Gwei"], answer: "Satoshi" },
    { id: "1-3", question: "What does 'HODL' stand for in crypto slang?", options: ["Hold On for Dear Life", "Hold On Daily Low", "High On Digital Life", "Help Others Do Less"], answer: "Hold On for Dear Life" },
    { id: "1-4", question: "What is the primary ticker for the Verse token?", options: ["VRS", "VERSE", "VER", "VRSX"], answer: "VERSE" },
    { id: "1-5", question: "What is a 'Seed Phrase' used for?", options: ["Planting crypto", "Backing up a wallet", "Trading faster", "Mining blocks"], answer: "Backing up a wallet" },
    { id: "1-6", question: "What is a 'Bull Market'?", options: ["Prices falling", "Prices rising", "Market closed", "No trading"], answer: "Prices rising" },
    { id: "1-7", question: "What is the term for a digital wallet that is NOT connected to the internet?", options: ["Hot Wallet", "Cold Wallet", "Fast Wallet", "Cloud Wallet"], answer: "Cold Wallet" },
  ],
  2: [
    { id: "2-1", question: "Who is the pseudonymous creator of Bitcoin?", options: ["Vitalik Buterin", "Satoshi Nakamoto", "Elon Musk", "Charlie Lee"], answer: "Satoshi Nakamoto" },
    { id: "2-2", question: "What is the maximum supply of Bitcoin that will ever exist?", options: ["18 Million", "21 Million", "100 Million", "Unlimited"], answer: "21 Million" },
    { id: "2-3", question: "What consensus mechanism does Bitcoin use?", options: ["Proof of Stake", "Proof of Work", "Proof of History", "Proof of Authority"], answer: "Proof of Work" },
    { id: "2-4", question: "What is the 'Genesis Block'?", options: ["The last block", "The first block", "A block with no transactions", "A block with errors"], answer: "The first block" },
    { id: "2-5", question: "What is 'Mining' in the context of Bitcoin?", options: ["Digging for gold", "Validating transactions", "Printing money", "Buying tokens"], answer: "Validating transactions" },
    { id: "2-6", question: "What is a 'Blockchain'?", options: ["A physical chain", "A distributed ledger", "A central database", "A social network"], answer: "A distributed ledger" },
    { id: "2-7", question: "What happens to the Bitcoin block reward roughly every 4 years?", options: ["It doubles", "It stays same", "It is halved", "It is removed"], answer: "It is halved" },
  ],
  3: [
    { id: "3-1", question: "What is the primary DEX for the Verse ecosystem?", options: ["Uniswap", "Verse DEX", "PancakeSwap", "Sushiswap"], answer: "Verse DEX" },
    { id: "3-2", question: "What network does the VERSE token primarily reside on?", options: ["Bitcoin", "Ethereum", "Solana", "Cardano"], answer: "Ethereum" },
    { id: "3-3", question: "What does 'DeFi' stand for?", options: ["Defined Finance", "Decentralized Finance", "Digital Finance", "Delayed Finance"], answer: "Decentralized Finance" },
    { id: "3-4", question: "What is 'Staking' in crypto?", options: ["Betting on prices", "Locking tokens for rewards", "Selling tokens", "Mining with GPUs"], answer: "Locking tokens for rewards" },
    { id: "3-5", question: "What is an 'AMM' in decentralized finance?", options: ["Automated Market Maker", "Advanced Money Manager", "Asset Management Mode", "Annual Market Margin"], answer: "Automated Market Maker" },
    { id: "3-6", question: "What is a 'Liquidity Pool'?", options: ["A pool of cash", "Tokens used for trading", "A group of miners", "A backup server"], answer: "Tokens used for trading" },
    { id: "3-7", question: "What is 'Yield Farming'?", options: ["Growing digital crops", "Earning rewards on crypto", "Buying cheap tokens", "Selling NFTs"], answer: "Earning rewards on crypto" },
    { id: "3-8", question: "Which wallet is the official home for the Verse ecosystem?", options: ["MetaMask", "Bitcoin.com Wallet", "Trust Wallet", "Ledger"], answer: "Bitcoin.com Wallet" },
  ],
  4: [
    { id: "4-1", question: "What is 'Double Spending'?", options: ["Spending twice as much", "Spending the same coin twice", "Buying two coins", "Paying double fees"], answer: "Spending the same coin twice" },
    { id: "4-2", question: "What is a '51% Attack'?", options: ["Hacking 51 servers", "Controlling majority of hash rate", "Stealing 51% of coins", "Crashing the price by 51%"], answer: "Controlling majority of hash rate" },
    { id: "4-3", question: "What is a 'Smart Contract'?", options: ["A legal document", "Self-executing code", "A fast transaction", "A secure wallet"], answer: "Self-executing code" },
    { id: "4-4", question: "What is 'Gas' in the Ethereum/Verse ecosystem?", options: ["Fuel for cars", "Transaction fee", "Mining power", "Token name"], answer: "Transaction fee" },
    { id: "4-5", question: "What does 'FOMO' stand for?", options: ["Fear Of Missing Out", "Fear Of Making Orders", "Fast Orders Many Options", "Future Of Money Online"], answer: "Fear Of Missing Out" },
    { id: "4-6", question: "What does 'DYOR' stand for?", options: ["Do Your Own Research", "Do Your Own Risk", "Digital Yield On Returns", "Daily Yield On Research"], answer: "Do Your Own Research" },
    { id: "4-7", question: "What is a 'Whitepaper' in crypto?", options: ["A blank page", "Technical document", "A marketing flyer", "A list of users"], answer: "Technical document" },
    { id: "4-8", question: "What is the term for the process of converting sensitive data into a fixed-size string of characters?", options: ["Hashing", "Mining", "Staking", "Trading"], answer: "Hashing" },
  ],
};
