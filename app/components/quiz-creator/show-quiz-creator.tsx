"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, FileText, Search, HelpCircle, CheckSquare, Database, ArrowRight, AlertTriangle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Step } from "./step"
import { determineStage } from "./utils"
import type { QuizStatusProps, QuizStage } from "./types"

export function ShowQuizStatus({ quizStatMessage }: QuizStatusProps) {
  const [progress, setProgress] = useState(0)
  const currentStage = determineStage(quizStatMessage)

  // Update progress based on current stage
  useEffect(() => {
    const stageIndex = getStageIndex(currentStage)
    const totalStages = 7 // Total number of non-error stages
    const targetProgress = Math.round((stageIndex / totalStages) * 100)

    // Animate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < targetProgress) {
          return prev + 1
        } else {
          clearInterval(interval)
          return prev
        }
      })
    }, 20)

    return () => clearInterval(interval)
  }, [currentStage])

  // Define all stages with their icons
  const stages: { stage: QuizStage; label: string; icon: React.ElementType }[] = [
    { stage: "connecting", label: "Connecting", icon: Loader2 },
    { stage: "summarizing", label: "Summarizing", icon: FileText },
    { stage: "researching", label: "Researching", icon: Search },
    { stage: "generating", label: "Generating", icon: HelpCircle },
    { stage: "iterating", label: "Verifying", icon: CheckSquare },
    { stage: "saving", label: "Saving", icon: Database },
    { stage: "redirecting", label: "Finishing", icon: ArrowRight },
  ]

  // Get a fun fact based on the current stage
  const getFunFact = (stage: QuizStage) => {
    const facts = {
      connecting: "Did you know? Quazar can generate quizzes in seconds that would take hours to create manually.",
      summarizing: "Quazar analyzes your topic to create the most relevant quiz content.",
      researching: "Our AI is searching through vast knowledge to find accurate information for your quiz.",
      generating: "Quazar creates questions that test different cognitive levels, from recall to critical thinking.",
      iterating: "Each question is carefully checked for accuracy and relevance to your topic.",
      saving: "Your quiz will be securely stored and ready to use anytime.",
      redirecting: "Get ready to engage your students with your new interactive quiz!",
      error: "Don't worry! Most issues can be resolved by refreshing the page or trying again.",
    }
    return facts[stage] || facts.connecting
  }

  // Get animation for the current stage icon
  const getIconAnimation = (stage: QuizStage) => {
    if (stage === "connecting" || stage === "researching") {
      return { rotate: 360, transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" } }
    }
    if (stage === "generating" || stage === "iterating") {
      return { scale: [1, 1.1, 1], transition: { duration: 2, repeat: Number.POSITIVE_INFINITY } }
    }
    return {}
  }

  // Find the current stage object
  const currentStageObj = stages.find((s) => s.stage === currentStage)

  // Get the icon component for the current stage
  const CurrentIcon = currentStageObj ? currentStageObj.icon : Loader2

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="border-zinc-200 shadow-lg overflow-hidden">
        <CardContent className="p-6">
          {/* Header */}
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-zinc-800 mb-2">Creating Your Quiz</h2>
            <p className="text-zinc-500">This may take a minute or two. We're crafting the perfect quiz for you.</p>
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-zinc-500 mb-2">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Current status with icon */}
          <div className="mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center text-center"
              >
                {currentStage === "error" ? (
                  <div className="text-rose-500 mb-4">
                    <AlertTriangle size={48} />
                  </div>
                ) : (
                  <motion.div className="text-blue-500 mb-4" animate={getIconAnimation(currentStage)}>
                    <CurrentIcon size={48} />
                  </motion.div>
                )}

                <h3
                  className={`text-xl font-semibold mb-2 ${currentStage === "error" ? "text-rose-600" : "text-zinc-800"}`}
                >
                  {quizStatMessage}
                </h3>

                <p className="text-zinc-500 max-w-md">{getFunFact(currentStage)}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Steps progress */}
          <div className="space-y-4">
            {stages.map((stage, index) => (
              <Step
                key={stage.stage}
                stage={stage.stage}
                currentStage={currentStage}
                label={stage.label}
                icon={stage.icon}
                isLast={index === stages.length - 1}
              />
            ))}
          </div>

          {/* Animated particles in the background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 15 }).map((_, i) => {
              const size = Math.random() * 6 + 2
              const left = Math.random() * 100
              const delay = Math.random() * 5
              const duration = Math.random() * 15 + 10

              return (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-blue-200 opacity-30"
                  style={{
                    width: size,
                    height: size,
                    left: `${left}%`,
                    top: "100%",
                  }}
                  animate={{
                    top: "-5%",
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration,
                    delay,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Helper function to get the index of a stage for progress calculation
function getStageIndex(stage: QuizStage): number {
  const stages: QuizStage[] = [
    "connecting",
    "summarizing",
    "researching",
    "generating",
    "iterating",
    "saving",
    "redirecting",
  ]

  const index = stages.indexOf(stage)
  return index === -1 ? 0 : index
}