"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

// Array of background colors for the answer options
const answerColors = [
  "bg-blue-100 border-blue-300 text-blue-800",
  "bg-purple-100 border-purple-300 text-purple-800",
  "bg-amber-100 border-amber-300 text-amber-800",
  "bg-emerald-100 border-emerald-300 text-emerald-800",
]

// Array of labels for the answer options
const answerLabels = ["A", "B", "C", "D"]

export const AnswerDisplay = ({
  answers,
  revealAnswers = true,
}: {
  answers: string[]
  revealAnswers?: boolean
}) => {
  // Animation variants for staggered reveal
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto mt-8"
      variants={container}
      initial="hidden"
      animate={revealAnswers ? "show" : "hidden"}
    >
      {answers.map((answer, index) => (
        <motion.div key={index} variants={item}>
          <Card
            className={`p-5 border-2 ${answerColors[index % answerColors.length]} flex items-center shadow-md hover:shadow-lg transition-shadow`}
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center font-bold text-xl mr-4 border-2 border-current shadow-sm">
              {answerLabels[index]}
            </div>
            <div className="text-xl font-medium">{answer}</div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}