"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { QuestionAnalytics } from "./types"
import { cn } from "@/lib/utils"

interface QuestionsTableProps {
  questions: QuestionAnalytics[]
  title?: string
  description?: string
}

export function QuestionsTable({
  questions,
  title = "Questions Analysis",
  description = "Breakdown of responses for each question",
}: QuestionsTableProps) {
  const [sortColumn, setSortColumn] = useState<keyof QuestionAnalytics>("question")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (column: keyof QuestionAnalytics) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortedQuestions = [...questions].sort((a, b) => {
    if (sortColumn === "question") {
      return sortDirection === "asc" ? a.question.localeCompare(b.question) : b.question.localeCompare(a.question)
    }

    const aValue = a[sortColumn] as number
    const bValue = b[sortColumn] as number

    return sortDirection === "asc" ? aValue - bValue : bValue - aValue
  })

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%] cursor-pointer" onClick={() => handleSort("question")}>
                Question
                {sortColumn === "question" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
              </TableHead>
              <TableHead className="text-center">Response Distribution</TableHead>
              <TableHead className="text-right cursor-pointer" onClick={() => handleSort("correctPercentage")}>
                Correct %
                {sortColumn === "correctPercentage" && (
                  <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                )}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedQuestions.map((q) => (
              <TableRow key={q.question}>
                <TableCell className="font-medium">{q.question}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="flex h-2 w-full overflow-hidden rounded-full bg-zinc-100">
                      {/* Correct answers */}
                      <div className="bg-emerald-500" style={{ width: `${(q.correct / q.total) * 100}%` }} />
                      {/* Wrong answers */}
                      <div className="bg-rose-500" style={{ width: `${(q.wrong / q.total) * 100}%` }} />
                      {/* Not answered */}
                      <div className="bg-zinc-300" style={{ width: `${(q.not_answered / q.total) * 100}%` }} />
                    </div>
                  </div>
                  <div className="mt-1 flex justify-between text-xs text-zinc-500">
                    <span>
                      <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 mr-1"></span>
                      Correct: {q.correct}
                    </span>
                    <span>
                      <span className="inline-block h-2 w-2 rounded-full bg-rose-500 mr-1"></span>
                      Wrong: {q.wrong}
                    </span>
                    <span>
                      <span className="inline-block h-2 w-2 rounded-full bg-zinc-300 mr-1"></span>
                      Not Answered: {q.not_answered}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <span
                    className={cn(
                      "font-medium",
                      q.correctPercentage > 75
                        ? "text-emerald-600"
                        : q.correctPercentage < 25
                          ? "text-rose-600"
                          : "text-zinc-600",
                    )}
                  >
                    {q.correctPercentage.toFixed(1)}%
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
