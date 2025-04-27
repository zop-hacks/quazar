export interface RoomConnectorProps {
  quizTitle: string;
  quizUrl: string;
}
export interface PlayerMap {
  [clientId: string]: [string, number];
}
export interface AnswerMap {
  [answerText: string]: boolean;
}

export type Info = {
  duration: number
  [key: string]: string | number
}

export interface Question {
  question: string;
  answers: AnswerMap[];
  info: Info;
}
export interface LeaderboardObject {
  username: string;
  score: string;
}
export interface Leaderboard {
  leaderboard: Array<LeaderboardObject>;
}

export interface EditorAnswer {
  text: string;
  isCorrect: boolean;
}

export interface ParsedQuestion {
  question: string;
  answers: EditorAnswer[];
  duration: number;
}

export interface ParsedQuizData {
  quizTitle: string;
  quizDescription: string;
  questions: ParsedQuestion[];
}

export type CurrentPlayerState = "correct" | "wrong" | "time_up";

export type QuizData = Record<string, Array<{ info: Info } | AnswerMap>>;