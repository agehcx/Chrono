export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export interface ProblemSummary {
  id: string;
  slug: string;
  title: string;
  difficulty: Difficulty;
  tags: string[];
  averageSolveTimeMs: number;
}

export interface ProblemDetail extends ProblemSummary {
  description: string;
  inputFormat: string;
  outputFormat: string;
  sampleTests: Array<{input: string; output: string; explanation?: string}>;
}

export type MatchMode = 'SOLO' | 'PVP';

export interface MatchState {
  id: string;
  mode: MatchMode;
  problemId: string;
  participants: Array<{
    userId: string;
    displayName: string;
    avatarUrl?: string;
    score: number;
    rank?: number;
    submittedAt?: string;
  }>;
  startedAt: string;
  expiresAt: string;
  status: 'WAITING' | 'IN_PROGRESS' | 'COMPLETED';
}

export interface LeaderboardEntry {
  userId: string;
  displayName: string;
  rating: number;
  solvedCount: number;
  streak: number;
}

export interface UserProfile {
  id: string;
  displayName: string;
  worldId: string;
  bio?: string;
  avatarUrl?: string;
  rating: number;
  totalSolved: number;
  createdAt: string;
}
