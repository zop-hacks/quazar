export interface QuestionResult {
  wrong: number;
  correct: number;
  not_answered: number;
}

export interface PlayerAnswer {
  correct: number;
  wrong: number;
  not_answered: number;
}

export interface PlayerData {
  [username: string]: {
    [question: string]: "correct" | "wrong" | "time_up";
  };
}

export interface QuestionResults {
  [question: string]: QuestionResult[];
}

export interface GameResult {
  created_at: string;
  id: number;
  quiz_title: string;
  player_count: number;
  player_data: PlayerData;
  question_results: QuestionResults;
}

export interface AnalyticsProps {
  gameResult: GameResult;
}

export interface QuestionAnalytics {
  question: string;
  correct: number;
  wrong: number;
  not_answered: number;
  total: number;
  correctPercentage: number;
}
export interface AvgQuestions {
  correct: number;
  wrong: number;
  not_answered: number;
}

export interface PlayerAnalytics {
  username: string;
  correct: number;
  wrong: number;
  not_answered: number;
  total: number;
  correctPercentage: number;
}

export interface Analytics {
  question_analytics: QuestionAnalytics[];
  player_analytics: PlayerAnalytics[];
  hard_questions: QuestionAnalytics[];
  easy_questions: QuestionAnalytics[];
  avg_questions: AvgQuestions;
  id: number;
}

export interface AnalyticsSum {
  summary: string;
  struggling_players: Array<string>;
  afk_players: Array<string>;
  understood_well: Array<string>;
  fairly_understood: Array<string>;
}
