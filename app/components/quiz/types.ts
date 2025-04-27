import type React from "react";

export interface Answer {
  [key: string]: boolean;
}

export interface ShowCorrectAnswerProps {
  answers: Answer[];
  setGameState: React.Dispatch<React.SetStateAction<string>>;
}
export interface QuestionProps {
  question: string;
  answers: string[];
  duration: number;
  finishQuestion: () => void;
}