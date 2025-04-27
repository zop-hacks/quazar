import { ShowCorrectAnswerComp } from "@/components/quiz/host/show-correct-answer/show-correct-answer";
import { ShowCorrectAnswerProps } from "@/components/quiz/host/show-correct-answer/types";

export const ShowCorrectAnswer = ({
  answers,
  setLeaderboard,
}: ShowCorrectAnswerProps) => {
  return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] bg-gradient-to-b from-zinc-50 to-white p-4">
        <ShowCorrectAnswerComp answers={answers} setLeaderboard={setLeaderboard} />
      </div>
  );
};
