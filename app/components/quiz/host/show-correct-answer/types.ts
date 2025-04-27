import { AnswerMap } from "@/app/types"


export interface ShowCorrectAnswerProps {
  answers: AnswerMap[]
  setLeaderboard: () => void
}