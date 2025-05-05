"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import type { AnswerOptionProps } from "@/components/quiz/client/questions/types"

// Array of colors for the answer options
const answerColors = [
  "from-blue-500 to-blue-600 border-blue-400 hover:from-blue-600 hover:to-blue-700",
  "from-purple-500 to-purple-600 border-purple-400 hover:from-purple-600 hover:to-purple-700",
  "from-amber-500 to-amber-600 border-amber-400 hover:from-amber-600 hover:to-amber-700",
  "from-emerald-500 to-emerald-600 border-emerald-400 hover:from-emerald-600 hover:to-emerald-700",
]

// Array of labels for the answer options
const answerLabels = ["A", "B", "C", "D"]

export const ClientAnswerOption = ({ answer, index, isSelected, onSelect, disabled }: AnswerOptionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 + 0.2 }}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      <Button
        className={`w-full h-auto py-4 px-5 text-white bg-gradient-to-r ${answerColors[index % answerColors.length]} ${
          isSelected ? "ring-4 ring-offset-2 ring-offset-white ring-blue-300" : ""
        } transition-all duration-200 block`}
        onClick={() => !disabled && onSelect(index)}
        disabled={disabled}
      >
        <div className="flex w-full">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-lg text-current border border-current shadow-sm text-zinc-800 self-start mt-0.5">
            {answerLabels[index]}
          </div>
          <div
            className="ml-4 text-lg font-medium text-left whitespace-normal break-words overflow-wrap-anywhere max-w-[calc(100%-3.5rem)]"
            style={{ wordBreak: "break-word" }}
          >
            {answer}
          </div>
        </div>
      </Button>
    </motion.div>
  )
}
