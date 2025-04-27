"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Users, Copy } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { PlayerMap } from "@/app/types"


interface QuizLobbyProps {
  quizTitle: string
  roomId: string | null
  playerList: PlayerMap | null
  handleStart: () => void
}

export default function QuizLobby({ quizTitle, roomId, playerList, handleStart }: QuizLobbyProps) {
  const [copied, setCopied] = useState(false)
  const [starCount] = useState(80)

  const copyRoomId = () => {
    if (roomId) {
      navigator.clipboard.writeText(roomId)
      setCopied(true)
      toast.success("Room ID copied!", {
        description: "Share this with your friends to join the quiz.",
      })
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const getAvatarColor = (seed: string) => {
    // Generate a consistent color based on username
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

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <div className="relative h-[calc(100vh-4rem)] w-screen overflow-hidden bg-gradient-to-b from-sky-50 to-white flex justify-center flex-col items-center">
      {/* Animated stars/particles background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: starCount }).map((_, i) => {
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

      {/* Quazar logo/title */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 mb-8">
        <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          QUAZAR
        </h1>
        <div className="text-xl text-zinc-600 text-center mt-2">{quizTitle}</div>
      </motion.div>

      {/* Room ID or Start button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 mb-12"
      >
        {roomId ? (
          <Card className="bg-white/90 border-zinc-200 shadow-lg p-6 flex flex-col items-center">
            <div className="text-zinc-500 mb-2">Room Code</div>
            <motion.div
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-zinc-800 tracking-wider mb-4 flex items-center gap-4"
              whileHover={{ scale: 1.05 }}
            >
              {roomId}
              <Button variant="ghost" size="icon" onClick={copyRoomId} className="rounded-full">
                <Copy className={cn("h-6 w-6", copied ? "text-green-500" : "text-zinc-400")} />
              </Button>
            </motion.div>
            <Badge variant="outline" className="text-zinc-600 border-zinc-300">
              <Users className="h-3 w-3 mr-1" />
              {playerList ? Object.keys(playerList).length : 0} Players
            </Badge>
          </Card>
        ) : (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="button"
              size="lg"
              onClick={handleStart}
              className="text-2xl py-8 px-12 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Play className="mr-2 h-6 w-6" /> Start Quiz
            </Button>
          </motion.div>
        )}
      </motion.div>

      {/* Player list */}
      {playerList && Object.keys(playerList).length > 0 && (
        <div className="relative z-10 w-full max-w-3xl px-4">
          <div className="text-zinc-600 mb-4 flex items-center font-medium">
            <Users className="h-4 w-4 mr-2" /> Players
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            <AnimatePresence>
              {Object.entries(playerList).map(([clientId, [username, score]], index) => (
                <motion.div
                  key={clientId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex flex-col items-center"
                >
                  <Card
                    className={cn(
                      "w-full p-3 flex flex-col items-center bg-white border-zinc-200 shadow-md",
                      "hover:shadow-lg hover:border-zinc-300 transition-all duration-300",
                    )}
                  >
                    <Avatar className={cn("h-14 w-14 mb-2", getAvatarColor(username))}>
                      <AvatarFallback>{getInitials(username)}</AvatarFallback>
                      <AvatarImage src={`https://api.dicebear.com/7.x/bottts/svg?seed=${username}`} />
                    </Avatar>
                    <div className="text-zinc-800 font-medium text-center truncate w-full">{username}</div>
                    {score > 0 && (
                      <Badge variant="secondary" className="mt-1 bg-indigo-100 text-indigo-700 hover:bg-indigo-200">
                        {score} pts
                      </Badge>
                    )}
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

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
