import { ClientQuestion } from "@/components/quiz/client/questions";
import { Ref, useState } from "react";
import { Socket } from "socket.io-client";

// presents a question on a client
export const ClientPresentQuestion = ({
  question,
  answers,
  socket,
  roomId,
}: {
  question: string;
  answers: string[];
  socket: Socket | null;
  roomId: string;
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(-1);

  return (
    <>
      <ClientQuestion
        answers={answers}
        socket={socket}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
        roomId={roomId}
        question={question}
      />
    </>
  );
};
