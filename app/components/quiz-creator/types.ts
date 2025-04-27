import type React from "react"
export interface QuizStatusProps {
  quizStatMessage: string
}

export type QuizStage =
  | "connecting"
  | "summarizing"
  | "researching"
  | "generating"
  | "iterating"
  | "saving"
  | "redirecting"
  | "error"

export interface StepProps {
  stage: QuizStage
  currentStage: QuizStage
  label: string
  icon: React.ElementType
  isLast?: boolean
}
