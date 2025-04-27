import { PlayerState } from "@/components/quiz/client/playerstate/playerstate";
import { getOrdinal } from "@/app/utils/get-ordinal";
import { ShowFinalPlayerState } from "@/components/quiz/client/playerstate/final-player-state";
import { CurrentPlayerState } from "@/app/types";

// shows the player's place (in the leaderboard), score, and state ("correct" | "wrong" | "time_up")
export const ShowPlayerState = ({
  state,
  score,
  place,
}: {
  state: CurrentPlayerState;
  score: number;
  place: number;
}) => {
  return (
    <>
      <PlayerState place={getOrdinal(place)} score={score} state={state} />
    </>
  );
};

export const PresentFinalPlayerState = ({
  state,
  score,
  place,
  username
}: {
  state: CurrentPlayerState;
  score: number;
  place: number;
  username: string
}) => {
  return (
    <>
      <ShowFinalPlayerState state={state} score={score} place={place} username={username} />
    </>
  );
};