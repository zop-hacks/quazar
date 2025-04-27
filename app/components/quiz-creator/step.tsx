"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import type { StepProps } from "./types"

export function Step({ stage, currentStage, label, icon: Icon, isLast = false }: StepProps) {
  // Determine the state of this step
  const isCompleted = getStepIndex(currentStage) > getStepIndex(stage)
  const isCurrent = currentStage === stage
  const isPending = getStepIndex(currentStage) < getStepIndex(stage)

  // Get colors based on state
  const getColors = () => {
    if (isCompleted) return "bg-emerald-100 text-emerald-700 border-emerald-200"
    if (isCurrent) return "bg-blue-100 text-blue-700 border-blue-200"
    return "bg-zinc-100 text-zinc-400 border-zinc-200"
  }

  // Get line colors based on state
  const getLineColors = () => {
    if (isCompleted) return "bg-emerald-500"
    return "bg-zinc-200"
  }

  return (
    <div className="flex items-center">
      {/* Step circle with icon */}
      <motion.div
        className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 ${getColors()}`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: getStepIndex(stage) * 0.1 }}
      >
        {isCompleted ? <CheckCircle className="h-6 w-6" /> : <Icon className="h-5 w-5" />}
      </motion.div>

      {/* Step label */}
      <div className="ml-3 min-w-[100px]">
        <motion.p
          className={`text-sm font-medium ${
            isCurrent ? "text-blue-700" : isCompleted ? "text-emerald-700" : "text-zinc-500"
          }`}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: getStepIndex(stage) * 0.1 + 0.1 }}
        >
          {label}
        </motion.p>
      </div>

      {/* Connecting line to next step */}
      {!isLast && (
        <motion.div
          className={`ml-3 h-0.5 flex-1 ${getLineColors()}`}
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: isCompleted ? 1 : 0 }}
          transition={{ delay: getStepIndex(stage) * 0.1 + 0.2 }}
        />
      )}
    </div>
  )
}

// Helper function to get the index of a step for ordering
function getStepIndex(stage: string): number {
  const stages = ["connecting", "summarizing", "researching", "generating", "iterating", "saving", "redirecting"]
  return stages.indexOf(stage)
}
