"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { H2 } from "@/components/ui/utypography"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users } from "lucide-react"

export const ClientLobby = ({
  username,
  roomId,
  playerCount = 1,
}: {
  username: string
  roomId?: string
  playerCount?: number
}) => {
  const [waitTime, setWaitTime] = useState(0)

  // Increment wait time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setWaitTime((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Format wait time as minutes:seconds
  const formatWaitTime = () => {
    const minutes = Math.floor(waitTime / 60)
    const seconds = waitTime % 60
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

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
    <div className="h-[calc(100vh-4rem)] w-screen overflow-hidden bg-gradient-to-b from-sky-50 to-white flex justify-center flex-col items-center p-4">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => {
          const size = Math.random() * 3 + 1
          const opacity = Math.random() * 0.5 + 0.1
          const animationDuration = Math.random() * 100 + 50
          const top = Math.random() * 100
          const left = Math.random() * 100
          const color =
            i % 5 === 0
              ? "#8b5cf6"
              : i % 4 === 0
                ? "#3b82f6"
                : i % 3 === 0
                  ? "#10b981"
                  : i % 2 === 0
                    ? "#f59e0b"
                    : "#f43f5e"

          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${top}%`,
                left: `${left}%`,
                opacity: opacity,
                backgroundColor: color,
                animation: `float ${animationDuration}s ease-in-out infinite`,
              }}
            />
          )
        })}
      </div>

      {/* Main content */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="z-10">
        <Card className="bg-white/90 border-zinc-200 shadow-lg p-6 flex flex-col items-center max-w-md w-full">
          {/* User avatar */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="mb-4"
          >
            <Avatar className={`h-24 w-24 ${getAvatarColor(username)}`}>
              <AvatarFallback>{getInitials(username)}</AvatarFallback>
              <AvatarImage src={`https://api.dicebear.com/7.x/bottts/svg?seed=${username}`} />
            </Avatar>
          </motion.div>

          {/* Username */}
          <H2 className="mb-2 text-center">{username}</H2>

          {/* Room info */}
          {roomId && (
            <div className="mb-6 text-center">
              <div className="text-zinc-500 text-sm mb-1">Room Code</div>
              <div className="text-2xl font-bold tracking-wider">{roomId}</div>
            </div>
          )}

          {/* Status badges */}
          <div className="flex gap-3 mb-4">
            <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
              <Users size={14} />
              <span>
                {playerCount} {playerCount === 1 ? "Player" : "Players"}
              </span>
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
              <Clock size={14} />
              <span>Waiting {formatWaitTime()}</span>
            </Badge>
          </div>

          {/* Status message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-zinc-600 p-3 bg-zinc-100 rounded-md w-full"
          >
            <p>Quiz will begin when the teacher starts the game</p>
          </motion.div>
        </Card>
      </motion.div>

      {/* Quiz tips that rotate */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-zinc-600 text-center z-10 max-w-md bg-white/80 p-3 rounded-lg shadow-sm"
      >
        <h3 className="font-medium mb-1">Quiz Tip:</h3>
        <p className="text-sm">Read each question carefully before selecting your answer!</p>
      </motion.div>

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.1; }
          25% { transform: translateY(-10px) translateX(5px); opacity: 0.3; }
          50% { transform: translateY(0) translateX(10px); opacity: 0.2; }
          75% { transform: translateY(10px) translateX(5px); opacity: 0.3; }
        }
      `}</style>
    </div>
  )
}