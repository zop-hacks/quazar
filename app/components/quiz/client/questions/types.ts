import type React from "react"
import type { Socket } from "socket.io-client"

export interface AnswerOptionProps {
  answer: string
  index: number
  isSelected: boolean
  onSelect: (index: number) => void
  disabled: boolean
}

export interface AnswerDisplayProps {
  answers: string[]
  selectedAnswer: number
  onSelectAnswer: (index: number) => void
  socket: Socket | null
  roomId: string
  isSubmitted: boolean
}

export interface QuestionDisplayProps {
  question: string
}

export interface ClientQuestionProps {
  question: string
  answers: string[]
  selectedAnswer: number
  setSelectedAnswer: React.Dispatch<React.SetStateAction<number>>
  socket: Socket | null
  roomId: string
}
