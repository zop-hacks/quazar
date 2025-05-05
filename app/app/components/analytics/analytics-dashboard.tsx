"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QuestionsTable } from "./questions-table"
import { PlayersTable } from "./players-table"
import { DifficultyAnalysis } from "./difficulty-analysis"
import { SummaryMetrics } from "./summary-metrics"
import type { GameResult } from "./types"
import {
  processQuestionAnalytics,
  processPlayerAnalytics,
  getHardQuestions,
  getEasyQuestions,
  formatDate,
} from "./utils"

interface AnalyticsDashboardProps {
  gameResult: GameResult
}

export function AnalyticsDashboard({ gameResult }: AnalyticsDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const questions = processQuestionAnalytics(gameResult)
  const players = processPlayerAnalytics(gameResult)
  const hardQuestions = getHardQuestions(questions)
  const easyQuestions = getEasyQuestions(questions)
  // console.log("questions:", questions)
  console.log(questions)
  // console.log(typeof questions, typeof players, typeof hardQuestions, typeof easyQuestions)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{gameResult.quiz_title}</h1>
        <p className="text-sm text-zinc-500">Quiz completed on {formatDate(gameResult.created_at)}</p>
      </div>

      <SummaryMetrics gameResult={gameResult} questions={questions} players={players} />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="players">Players</TabsTrigger>
          <TabsTrigger value="difficulty">Difficulty Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 pt-4">
          <QuestionsTable questions={questions} />
        </TabsContent>

        <TabsContent value="players" className="pt-4">
          <PlayersTable players={players} />
        </TabsContent>

        <TabsContent value="difficulty" className="pt-4">
          <DifficultyAnalysis hardQuestions={hardQuestions} easyQuestions={easyQuestions} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
