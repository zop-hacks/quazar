"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trophy, ChevronRight, Medal, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { LeaderboardProps } from "./types"

export function Leaderboard({ leaderboard, nextQuestion }: LeaderboardProps) {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const [showButton, setShowButton] = useState(false)

  // Sort leaderboard by score (descending)
  const sortedLeaderboard = [...leaderboard].sort((a, b) => Number.parseInt(b.score) - Number.parseInt(a.score))

  // Reveal leaderboard items one by one
  useEffect(() => {
    const revealInterval = setInterval(() => {
      setVisibleItems((prev) => {
        if (prev.length < sortedLeaderboard.length) {
          return [...prev, prev.length]
        }
        clearInterval(revealInterval)
        // Show the button after all items are revealed
        setTimeout(() => setShowButton(true), 1000)
        return prev
      })
    }, 300)

    return () => clearInterval(revealInterval)
  }, [sortedLeaderboard.length])

  // Generate initials from username
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  // Get avatar color based on position
  const getAvatarColor = (position: number) => {
    if (position === 0) return "bg-amber-100 text-amber-700 border-amber-300" // Gold
    if (position === 1) return "bg-zinc-100 text-zinc-700 border-zinc-300" // Silver
    if (position === 2) return "bg-orange-100 text-orange-700 border-orange-300" // Bronze
    return "bg-blue-100 text-blue-700 border-blue-300" // Others
  }

  // Get rank icon based on position
  const getRankIcon = (position: number) => {
    if (position === 0) return <Trophy className="h-5 w-5 text-amber-500" />
    if (position === 1) return <Medal className="h-5 w-5 text-zinc-500" />
    if (position === 2) return <Medal className="h-5 w-5 text-orange-500" />
    return null
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto p-4">
      <motion.div
        className="flex items-center justify-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Trophy className="h-8 w-8 text-amber-500 mr-3" />
        <h2 className="text-3xl font-bold text-zinc-800">Leaderboard</h2>
      </motion.div>

      <div className="w-full mb-10">
        <Card className="border-zinc-200 shadow-md overflow-hidden">
          {/* Header row */}
          <div className="bg-zinc-100 p-4 border-b border-zinc-200 grid grid-cols-12 gap-2 items-center">
            <div className="col-span-1 font-medium text-zinc-500 text-center">#</div>
            <div className="col-span-7 font-medium text-zinc-500">Player</div>
            <div className="col-span-4 font-medium text-zinc-500 text-right">Score</div>
          </div>

          {/* Leaderboard items */}
          <CardContent className="p-0">
            {sortedLeaderboard.map((item, index) => {
              const isVisible = visibleItems.includes(index)
              const isTopThree = index < 3

              return (
                <AnimatePresence key={index}>
                  {isVisible && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ type: "spring", damping: 15 }}
                      className={`grid grid-cols-12 gap-2 items-center p-4 border-b border-zinc-100 ${
                        isTopThree ? "bg-zinc-50" : ""
                      }`}
                    >
                      {/* Rank */}
                      <div className="col-span-1 font-bold text-center flex justify-center">
                        {getRankIcon(index) || <span className="text-zinc-500">{index + 1}</span>}
                      </div>

                      {/* Player */}
                      <div className="col-span-7 flex items-center">
                        <Avatar className={`h-10 w-10 mr-3 border ${getAvatarColor(index)}`}>
                          <AvatarFallback>{getInitials(item.username)}</AvatarFallback>
                          <AvatarImage src={`https://api.dicebear.com/7.x/bottts/svg?seed=${item.username}`} />
                        </Avatar>
                        <div className="font-medium text-zinc-800 truncate">{item.username}</div>
                      </div>

                      {/* Score */}
                      <motion.div
                        className="col-span-4 text-right font-bold text-lg"
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", damping: 12 }}
                      >
                        <span className="text-zinc-800">{item.score}</span>
                        <span className="text-zinc-400 text-sm ml-1">pts</span>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )
            })}

            {/* Empty state */}
            {sortedLeaderboard.length === 0 && (
              <div className="p-8 text-center text-zinc-500">No players in the leaderboard yet.</div>
            )}
          </CardContent>
        </Card>
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
              onClick={nextQuestion}
              className="w-full py-6 text-lg bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center gap-2 shadow-lg"
            >
              <Star className="h-5 w-5" />
              Next Question
              <ChevronRight className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
