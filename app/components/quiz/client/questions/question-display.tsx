"use client"

import { motion } from "framer-motion"
import { H1 } from "@/components/ui/utypography"
import type { QuestionDisplayProps } from "./types"

export const ClientQuestionDisplay = ({ question }: QuestionDisplayProps) => {
  return (
    <motion.div
      className="w-full max-w-4xl mx-auto mb-8 text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <H1 className="text-zinc-800">{question}</H1>
    </motion.div>
  )
}
