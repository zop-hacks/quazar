"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Countdown } from "@/components/quiz/countdown"
import { AnswerDisplay } from "@/components/quiz/answer-display"
import type { QuestionProps } from "./types"

export const PresentQuestion = ({ question, answers, duration, finishQuestion }: QuestionProps) => {
  // State to control when to reveal the answers
  const [revealAnswers, setRevealAnswers] = useState(false)

  // Reveal answers after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setRevealAnswers(true)
    }, 2000) // 2 seconds delay

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white p-6 flex flex-col items-center justify-center">
      {/* Question display with animation */}
      <motion.div
        className="w-full max-w-4xl mx-auto mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-zinc-500 mb-2 text-lg">Question</div>
        <motion.h1
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-800 mb-8"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {question}
        </motion.h1>

        {/* Countdown timer */}
        <Countdown initialSeconds={duration} finishQuestion={finishQuestion} />
      </motion.div>

      {/* Answer options with staggered reveal */}
      <AnswerDisplay answers={answers} revealAnswers={revealAnswers} />
    </div>
  )
}
