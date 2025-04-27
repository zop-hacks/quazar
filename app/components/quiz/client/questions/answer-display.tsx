"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { ClientAnswerOption } from "@/components/quiz/client/questions/answer-option";
import type { AnswerDisplayProps } from "@/components/quiz/client/questions/types";

export const ClientAnswerDisplay = ({
  answers,
  selectedAnswer,
  onSelectAnswer,
  socket,
  roomId,
  isSubmitted,
}: AnswerDisplayProps) => {
  // Handle submitting the answer to the server
  useEffect(() => {
    if (selectedAnswer !== -1 && !isSubmitted && socket) {
      // Emit the answer to the server
      socket.emit("validate_question", {
        index: selectedAnswer,
        room_id: roomId,
      });
    }
  }, [selectedAnswer, isSubmitted, socket, roomId]);

  // If an answer has been submitted, show the confirmation screen
  if (isSubmitted) {
    return (
      <motion.div
        className="w-full max-w-md mx-auto text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white rounded-lg shadow-lg p-8 border border-zinc-200">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
            className="mx-auto mb-4 text-green-500"
          >
            <CheckCircle size={80} strokeWidth={1.5} />
          </motion.div>
          <h2 className="text-2xl font-bold mb-2">Answer Submitted!</h2>
          <p className="text-zinc-600">
            You selected answer {String.fromCharCode(65 + selectedAnswer)}:{" "}
            {answers[selectedAnswer]}
          </p>
          <p className="text-zinc-500 mt-4">
            Waiting for other students to answer...
          </p>
        </div>
      </motion.div>
    );
  }

  // Otherwise, show the answer options
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl mx-auto">
      {answers.map((answer, index) => (
        <ClientAnswerOption
          key={index}
          answer={answer}
          index={index}
          isSelected={selectedAnswer === index}
          onSelect={onSelectAnswer}
          disabled={selectedAnswer !== -1}
        />
      ))}
    </div>
  );
};
