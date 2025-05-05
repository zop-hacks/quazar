"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QuestionsTable } from "./questions-table"
import type { QuestionAnalytics } from "./types"

interface DifficultyAnalysisProps {
  hardQuestions: QuestionAnalytics[]
  easyQuestions: QuestionAnalytics[]
}

export function DifficultyAnalysis({ hardQuestions, easyQuestions }: DifficultyAnalysisProps) {
  return (
    <Tabs defaultValue="hard" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="hard" className="data-[state=active]:bg-rose-100 data-[state=active]:text-rose-700">
          Hard Questions ({hardQuestions.length})
        </TabsTrigger>
        <TabsTrigger value="easy" className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700">
          Easy Questions ({easyQuestions.length})
        </TabsTrigger>
      </TabsList>
      <TabsContent value="hard">
        {hardQuestions.length > 0 ? (
          <QuestionsTable
            questions={hardQuestions}
            title="Hard Questions Analysis"
            description="Questions with less than 25% correct answers"
          />
        ) : (
          <div className="flex h-40 items-center justify-center rounded-md border border-dashed border-zinc-300 p-8 text-center">
            <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
              <h3 className="mt-4 text-lg font-semibold text-zinc-900">No Hard Questions</h3>
              <p className="mt-2 text-sm text-zinc-500">
                There are no questions with less than 25% correct answers in this quiz.
              </p>
            </div>
          </div>
        )}
      </TabsContent>
      <TabsContent value="easy">
        {easyQuestions.length > 0 ? (
          <QuestionsTable
            questions={easyQuestions}
            title="Easy Questions Analysis"
            description="Questions with more than 75% correct answers"
          />
        ) : (
          <div className="flex h-40 items-center justify-center rounded-md border border-dashed border-zinc-300 p-8 text-center">
            <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
              <h3 className="mt-4 text-lg font-semibold text-zinc-900">No Easy Questions</h3>
              <p className="mt-2 text-sm text-zinc-500">
                There are no questions with more than 75% correct answers in this quiz.
              </p>
            </div>
          </div>
        )}
      </TabsContent>
    </Tabs>
  )
}
