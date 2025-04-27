import { LeaderboardObject } from "@/app/types";
import { Leaderboard } from "@/components/quiz/host/leaderboard/leaderboard";
import { FinalLeaderboard } from "@/components/quiz/host/leaderboard/final-leaderboard";

export const PresentLeaderboard = ({
  leaderboard,
  nextQuestion,
}: {
  leaderboard: Array<LeaderboardObject>;
  nextQuestion: () => void;
}) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] bg-gradient-to-b from-zinc-50 to-white p-4">
        <Leaderboard
          leaderboard={leaderboard}
          nextQuestion={nextQuestion}
        />
      </div>
    </>
  );
};

export const PresentFinalLeaderboard = ({
  leaderboard,
}: {
  leaderboard: Array<LeaderboardObject>
}) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] bg-gradient-to-b from-zinc-50 to-white p-4">
        <FinalLeaderboard leaderboard={leaderboard}/>
      </div>
    </>
  )
}