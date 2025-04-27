"use client"

import { AnswerDisplay, Countdown } from "@/components/quiz"
import { Button } from "@/components/ui/button"
import { H1 } from "@/components/ui/utypography"
import { motion } from "framer-motion"

export const PresentQuestion = ({
  question,
  answers,
  duration,
  finishQuestion,
}: {
  question: string
  answers: string[]
  duration: number
  finishQuestion: () => void
}) => {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center h-[calc(100vh-4rem)]">
      <div className="text-center mb-10 w-full">
        <H1 className="mb-6">{question}</H1>
      </div>

      <div className="w-full mb-10">
        <AnswerDisplay answers={answers} revealAnswers={true} />
      </div>

      <div className="my-4">
        <Countdown finishQuestion={finishQuestion} initialSeconds={duration} />
      </div>
      <motion.h2
        className="text-3xl font-bold mb-8 text-zinc-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        
      >
        <Button onClick={finishQuestion}>
        Finish Question
        </Button>
      </motion.h2>
    </div>
  )
}
