"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, XCircle, ChevronRight, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { ShowCorrectAnswerProps } from "./types"

export function ShowCorrectAnswerComp({ answers, setLeaderboard }: ShowCorrectAnswerProps) {
  const [revealedAnswers, setRevealedAnswers] = useState<number[]>([])
  const [showButton, setShowButton] = useState(false)

  // Reveal answers one by one with a delay
  useEffect(() => {
    const revealInterval = setInterval(() => {
      setRevealedAnswers((prev) => {
        if (prev.length < answers.length) {
          return [...prev, prev.length]
        }
        clearInterval(revealInterval)
        // Show the button after all answers are revealed
        setTimeout(() => setShowButton(true), 1000)
        return prev
      })
    }, 800)

    return () => clearInterval(revealInterval)
  }, [answers.length])

  // Labels for the answers
  const answerLabels = ["A", "B", "C", "D"]

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto p-4">
      <motion.h2
        className="text-3xl font-bold mb-8 text-zinc-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Correct Answer
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-10">
        {answers.map((answer, index) => {
          const isRevealed = revealedAnswers.includes(index)

          // Extract the text and correctness from the answer object
          const answerText = Object.keys(answer)[0]
          const isCorrect = answer[answerText]

          return (
            <AnimatePresence key={index}>
              {isRevealed && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", damping: 15 }}
                >
                  <Card
                    className={`border-2 shadow-md ${
                      isCorrect ? "bg-emerald-50 border-emerald-200" : "bg-zinc-50 border-zinc-200"
                    }`}
                  >
                    <CardContent className="p-4 flex items-center">
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mr-4 ${
                          isCorrect
                            ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                            : "bg-zinc-100 text-zinc-700 border border-zinc-300"
                        }`}
                      >
                        {answerLabels[index]}
                      </div>

                      <div className="flex-grow text-lg font-medium text-zinc-800">{answerText}</div>

                      <div className="ml-3">
                        {isCorrect ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring", damping: 10 }}
                          >
                            <CheckCircle className="h-8 w-8 text-emerald-500" />
                          </motion.div>
                        ) : (
                          <XCircle className="h-8 w-8 text-zinc-400" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          )
        })}
      </div>

      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 15 }}
            className="w-full max-w-md"
          >
            <Button
              onClick={setLeaderboard}
              className="w-full py-6 text-lg bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center gap-2 shadow-lg"
            >
              <Award className="h-5 w-5" />
              Show Leaderboard
              <ChevronRight className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
