"use client";

import { useState, useEffect } from "react";
import { ClientQuestionDisplay } from "@/components/quiz/client/questions/question-display";
import { ClientAnswerDisplay } from "./answer-display";
import type { ClientQuestionProps } from "@/components/quiz/client/questions/types";

export const ClientQuestion = ({
  question,
  answers,
  selectedAnswer,
  setSelectedAnswer,
  socket,
  roomId,
}: ClientQuestionProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // When an answer is selected, mark it as submitted after a short delay
  useEffect(() => {
    if (selectedAnswer !== -1 && !isSubmitted) {
      const timer = setTimeout(() => {
        setIsSubmitted(true);
      }, 500); // Short delay to show the selection before showing the confirmation

      return () => clearTimeout(timer);
    }
  }, [selectedAnswer, isSubmitted]);

  // Handle selecting an answer
  const handleSelectAnswer = (index: number) => {
    if (selectedAnswer === -1) {
      setSelectedAnswer(index);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white p-6 flex flex-col items-center justify-center">
      <ClientQuestionDisplay question={question} />
      <ClientAnswerDisplay
        answers={answers}
        selectedAnswer={selectedAnswer}
        onSelectAnswer={handleSelectAnswer}
        socket={socket}
        roomId={roomId}
        isSubmitted={isSubmitted}
      />
    </div>
  );
};
