"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trophy, Medal, Crown, Award, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { LeaderboardObject } from "./types"

export function FinalLeaderboard({ leaderboard }: { leaderboard: Array<LeaderboardObject> }) {
  const [showPodium, setShowPodium] = useState(false)
  const [showRest, setShowRest] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  // Sort leaderboard by score (descending)
  const sortedLeaderboard = [...leaderboard].sort((a, b) => Number.parseInt(b.score) - Number.parseInt(a.score))

  // Get top 3 and the rest
  const topThree = sortedLeaderboard.slice(0, 3)
  const rest = sortedLeaderboard.slice(3)

  // Staggered animations
  useEffect(() => {
    // Show confetti
    setShowConfetti(true)

    // Show podium after a delay
    const podiumTimer = setTimeout(() => {
      setShowPodium(true)
    }, 1000)

    // Show the rest of the leaderboard after another delay
    const restTimer = setTimeout(() => {
      setShowRest(true)
    }, 3000)

    return () => {
      clearTimeout(podiumTimer)
      clearTimeout(restTimer)
    }
  }, [])

  // Generate initials from username
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  // Get trophy/medal component based on position
  const getTrophy = (position: number) => {
    if (position === 0) return <Trophy className="h-10 w-10 text-amber-500" />
    if (position === 1) return <Medal className="h-10 w-10 text-zinc-400" />
    if (position === 2) return <Medal className="h-10 w-10 text-amber-700" />
    return null
  }

  // Get trophy/medal label based on position
  const getTrophyLabel = (position: number) => {
    if (position === 0) return "1st Place"
    if (position === 1) return "2nd Place"
    if (position === 2) return "3rd Place"
    return `${position + 1}th Place`
  }

  // Get avatar color based on position
  const getAvatarColor = (position: number) => {
    if (position === 0) return "bg-amber-100 text-amber-700 border-amber-300" // Gold
    if (position === 1) return "bg-zinc-100 text-zinc-700 border-zinc-300" // Silver
    if (position === 2) return "bg-orange-100 text-orange-700 border-orange-300" // Bronze
    return "bg-blue-100 text-blue-700 border-blue-300" // Others
  }

  // Get podium height based on position
  const getPodiumHeight = (position: number) => {
    if (position === 0) return "h-32"
    if (position === 1) return "h-24"
    if (position === 2) return "h-16"
    return "h-8"
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
      {/* Confetti effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none">
          {Array.from({ length: 100 }).map((_, i) => {
            const size = Math.random() * 10 + 5
            const left = Math.random() * 100
            const animationDuration = Math.random() * 3 + 2
            const delay = Math.random() * 2

            return (
              <motion.div
                key={i}
                className="absolute rounded-sm"
                style={{
                  width: size,
                  height: size,
                  left: `${left}%`,
                  top: "-20px",
                  backgroundColor:
                    i % 5 === 0
                      ? "#fbbf24"
                      : // amber
                        i % 4 === 0
                        ? "#a1a1aa"
                        : // zinc
                          i % 3 === 0
                          ? "#f97316"
                          : // orange
                            i % 2 === 0
                            ? "#3b82f6"
                            : // blue
                              "#ef4444", // red
                }}
                initial={{ y: -20, opacity: 0, rotate: 0 }}
                animate={{
                  y: "100vh",
                  opacity: [0, 1, 1, 0],
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: animationDuration,
                  delay: delay,
                  ease: "linear",
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: Math.random() * 5,
                }}
              />
            )
          })}
        </div>
      )}

      {/* Title */}
      <motion.div
        className="flex items-center justify-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Crown className="h-10 w-10 text-amber-500 mr-3" />
        <h1 className="text-4xl font-bold text-zinc-800">Final Results</h1>
      </motion.div>

      {/* Podium for top 3 */}
      <AnimatePresence>
        {showPodium && (
          <motion.div
            className="w-full mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative flex items-end justify-center h-64 mb-8">
              {topThree.map((player, index) => {
                // Calculate positions for the podium
                let positionClass = ""
                if (index === 0) positionClass = "absolute bottom-0 z-30" // 1st place (center)
                if (index === 1) positionClass = "absolute bottom-0 right-1/2 mr-32 z-20" // 2nd place (left)
                if (index === 2) positionClass = "absolute bottom-0 left-1/2 ml-32 z-10" // 3rd place (right)

                return (
                  <motion.div
                    key={index}
                    className={`flex flex-col items-center ${positionClass}`}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: index * 0.5,
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                    }}
                  >
                    {/* Trophy/Medal */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: index * 0.5 + 0.3,
                        type: "spring",
                        stiffness: 300,
                        damping: 10,
                      }}
                      className="mb-2"
                    >
                      {getTrophy(index)}
                    </motion.div>

                    {/* Player Avatar */}
                    <Avatar className={`h-16 w-16 border-2 ${getAvatarColor(index)}`}>
                      <AvatarFallback>{getInitials(player.username)}</AvatarFallback>
                      <AvatarImage src={`https://api.dicebear.com/7.x/bottts/svg?seed=${player.username}`} />
                    </Avatar>

                    {/* Player Name */}
                    <div className="mt-2 font-bold text-center">
                      <div className="text-zinc-800">{player.username}</div>
                      <div className="text-zinc-500 text-sm">{getTrophyLabel(index)}</div>
                    </div>

                    {/* Score */}
                    <Badge className="mt-1 px-3 py-1 bg-zinc-800 text-white">{player.score} pts</Badge>

                    {/* Podium */}
                    <motion.div
                      className={`w-28 ${getPodiumHeight(index)} bg-gradient-to-t rounded-t-lg mt-4 shadow-lg`}
                      style={{
                        backgroundImage:
                          index === 0
                            ? "linear-gradient(to top, #fbbf24, #f59e0b)" // Gold
                            : index === 1
                              ? "linear-gradient(to top, #d1d5db, #9ca3af)" // Silver
                              : "linear-gradient(to top, #d97706, #b45309)", // Bronze
                      }}
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      transition={{
                        delay: index * 0.5 + 0.6,
                        duration: 0.5,
                      }}
                    />
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rest of the leaderboard */}
      <AnimatePresence>
        {showRest && rest.length > 0 && (
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-bold text-zinc-700 mb-4 flex items-center">
              <Award className="h-5 w-5 mr-2 text-zinc-500" />
              Other Participants
            </h2>

            <Card className="border-zinc-200 shadow-md overflow-hidden">
              <CardContent className="p-0">
                {rest.map((player, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, type: "spring", damping: 15 }}
                    className="grid grid-cols-12 gap-2 items-center p-4 border-b border-zinc-100"
                  >
                    {/* Rank */}
                    <div className="col-span-1 font-bold text-center text-zinc-500">{index + 4}</div>

                    {/* Player */}
                    <div className="col-span-7 flex items-center">
                      <Avatar className="h-10 w-10 mr-3 border bg-blue-100 text-blue-700 border-blue-300">
                        <AvatarFallback>{getInitials(player.username)}</AvatarFallback>
                        <AvatarImage src={`https://api.dicebear.com/7.x/bottts/svg?seed=${player.username}`} />
                      </Avatar>
                      <div className="font-medium text-zinc-800 truncate">{player.username}</div>
                    </div>

                    {/* Score */}
                    <div className="col-span-4 text-right font-bold">
                      <span className="text-zinc-800">{player.score}</span>
                      <span className="text-zinc-400 text-sm ml-1">pts</span>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Congratulatory message */}
      <motion.div
        className="mt-8 text-center text-zinc-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4 }}
      >
        <p className="mb-2">Thanks for playing!</p>
      </motion.div>
    </div>
  )
}
