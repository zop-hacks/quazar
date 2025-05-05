"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, HelpCircle, CheckCircle, XCircle, Clock, BarChart3 } from "lucide-react"
import type { GameResult, QuestionAnalytics, PlayerAnalytics } from "./types"

interface SummaryMetricsProps {
  gameResult: GameResult
  questions: QuestionAnalytics[]
  players: PlayerAnalytics[]
}

export function SummaryMetrics({ gameResult, questions, players }: SummaryMetricsProps) {
  // Calculate overall metrics
  const totalQuestions = questions.length
  const totalPlayers = players.length

  const totalAnswers = questions.reduce((sum, q) => sum + q.total, 0)
  const totalCorrect = questions.reduce((sum, q) => sum + q.correct, 0)
  const totalWrong = questions.reduce((sum, q) => sum + q.wrong, 0)
  const totalNotAnswered = questions.reduce((sum, q) => sum + q.not_answered, 0)

  const overallCorrectPercentage = totalAnswers > 0 ? (totalCorrect / totalAnswers) * 100 : 0

  // Find top performer
  const topPerformer = [...players].sort((a, b) => b.correctPercentage - a.correctPercentage)[0]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardContent className="flex flex-row items-center gap-4 pt-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100">
            <Users className="h-6 w-6 text-zinc-700" />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-500">Total Players</p>
            <h3 className="text-2xl font-bold">{totalPlayers}</h3>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-row items-center gap-4 pt-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100">
            <HelpCircle className="h-6 w-6 text-zinc-700" />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-500">Total Questions</p>
            <h3 className="text-2xl font-bold">{totalQuestions}</h3>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-row items-center gap-4 pt-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle className="h-6 w-6 text-emerald-700" />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-500">Correct Answers</p>
            <h3 className="text-2xl font-bold text-emerald-700">{overallCorrectPercentage.toFixed(1)}%</h3>
            <p className="text-xs text-zinc-500">
              {totalCorrect} of {totalAnswers} answers
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-row items-center gap-4 pt-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
            <XCircle className="h-6 w-6 text-rose-700" />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-500">Wrong Answers</p>
            <h3 className="text-2xl font-bold text-rose-700">
              {totalAnswers > 0 ? ((totalWrong / totalAnswers) * 100).toFixed(1) : 0}%
            </h3>
            <p className="text-xs text-zinc-500">
              {totalWrong} of {totalAnswers} answers
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-row items-center gap-4 pt-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100">
            <Clock className="h-6 w-6 text-zinc-700" />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-500">Not Answered</p>
            <h3 className="text-2xl font-bold">
              {totalAnswers > 0 ? ((totalNotAnswered / totalAnswers) * 100).toFixed(1) : 0}%
            </h3>
            <p className="text-xs text-zinc-500">
              {totalNotAnswered} of {totalAnswers} answers
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-row items-center gap-4 pt-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <BarChart3 className="h-6 w-6 text-blue-700" />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-500">Top Performer</p>
            {topPerformer ? (
              <>
                <h3 className="text-xl font-bold">{topPerformer.username}</h3>
                <p className="text-xs text-zinc-500">{topPerformer.correctPercentage.toFixed(1)}% correct</p>
              </>
            ) : (
              <h3 className="text-xl font-bold">N/A</h3>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
