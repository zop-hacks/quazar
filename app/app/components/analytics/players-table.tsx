"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { PlayerAnalytics } from "./types"
import { cn } from "@/lib/utils"

interface PlayersTableProps {
  players: PlayerAnalytics[]
}

export function PlayersTable({ players }: PlayersTableProps) {
  const [sortColumn, setSortColumn] = useState<keyof PlayerAnalytics>("correctPercentage")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const handleSort = (column: keyof PlayerAnalytics) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortedPlayers = [...players].sort((a, b) => {
    if (sortColumn === "username") {
      return sortDirection === "asc" ? a.username.localeCompare(b.username) : b.username.localeCompare(a.username)
    }

    const aValue = a[sortColumn] as number
    const bValue = b[sortColumn] as number

    return sortDirection === "asc" ? aValue - bValue : bValue - aValue
  })

  // Generate initials from username
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  // Generate a consistent color based on username
  const getAvatarColor = (seed: string) => {
    const colors = [
      "bg-blue-100 text-blue-700",
      "bg-purple-100 text-purple-700",
      "bg-green-100 text-green-700",
      "bg-amber-100 text-amber-700",
      "bg-rose-100 text-rose-700",
    ]
    const hash = seed.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return colors[hash % colors.length]
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Player Performance</CardTitle>
        <CardDescription>Breakdown of each player's performance in the quiz</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30%] cursor-pointer" onClick={() => handleSort("username")}>
                Player
                {sortColumn === "username" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
              </TableHead>
              <TableHead className="text-center">Response Distribution</TableHead>
              <TableHead className="text-right cursor-pointer" onClick={() => handleSort("correctPercentage")}>
                Score
                {sortColumn === "correctPercentage" && (
                  <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                )}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPlayers.map((player) => (
              <TableRow key={player.username}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className={cn("h-8 w-8", getAvatarColor(player.username))}>
                      <AvatarFallback>{getInitials(player.username)}</AvatarFallback>
                      <AvatarImage src={`https://api.dicebear.com/7.x/bottts/svg?seed=${player.username}`} />
                    </Avatar>
                    <div className="font-medium">{player.username}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="flex h-2 w-full overflow-hidden rounded-full bg-zinc-100">
                      {/* Correct answers */}
                      <div className="bg-emerald-500" style={{ width: `${(player.correct / player.total) * 100}%` }} />
                      {/* Wrong answers */}
                      <div className="bg-rose-500" style={{ width: `${(player.wrong / player.total) * 100}%` }} />
                      {/* Not answered */}
                      <div
                        className="bg-zinc-300"
                        style={{ width: `${(player.not_answered / player.total) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="mt-1 flex justify-between text-xs text-zinc-500">
                    <span>
                      <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 mr-1"></span>
                      {player.correct}
                    </span>
                    <span>
                      <span className="inline-block h-2 w-2 rounded-full bg-rose-500 mr-1"></span>
                      {player.wrong}
                    </span>
                    <span>
                      <span className="inline-block h-2 w-2 rounded-full bg-zinc-300 mr-1"></span>
                      {player.not_answered}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant="outline"
                    className={cn(
                      "font-medium",
                      player.correctPercentage > 75
                        ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                        : player.correctPercentage < 25
                          ? "bg-rose-100 text-rose-700 hover:bg-rose-200"
                          : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200",
                    )}
                  >
                    {player.correctPercentage.toFixed(1)}%
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
