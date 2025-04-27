"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { H1 } from "@/components/ui/utypography"

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-zinc-100 to-white py-20 dark:from-zinc-900 dark:to-zinc-950">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => {
          const size = Math.random() * 8 + 4
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

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mb-6 inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              <Sparkles className="mr-1 h-3.5 w-3.5 text-purple-500" />
              <span>AI-Powered Quiz Generation</span>
            </div>
          </motion.div>

          <motion.h1
            className="mb-6 text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Create Engaging Quizzes in{" "}
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Seconds
            </span>
          </motion.h1>

          <motion.p
            className="mx-auto mb-10 max-w-2xl text-xl text-zinc-600 dark:text-zinc-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Quazar uses advanced AI to generate customized quizzes based on any topic or learning objective. Perfect for
            educators, trainers, and anyone who wants to create engaging learning experiences.
          </motion.p>
          <div className="flex justify-center gap-3">
          <Link href="/teach/my-quizzes">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
          
            <Button
              className="h-12 bg-gradient-to-r from-purple-600 to-indigo-600 px-8 text-base font-medium text-white hover:from-purple-700 hover:to-indigo-700"
            >
              Generate
            </Button>
            
          </motion.div>
          </Link>
          <H1>Or</H1>

          <Link href="/play">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button
              className="h-12 bg-gradient-to-r from-purple-600 to-indigo-600 px-8 text-base font-medium text-white hover:from-purple-700 hover:to-indigo-700"
            >
              Join Game
            </Button>
          </motion.div>
          </Link>
          </div>
          <motion.div
            className="mt-6 flex items-center justify-center space-x-2 text-sm text-zinc-500 dark:text-zinc-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span>Available for Free</span>
            <span className="h-1 w-1 rounded-full bg-zinc-400 dark:bg-zinc-600" />
            <span>Made For Teachers</span>
            <span className="h-1 w-1 rounded-full bg-zinc-400 dark:bg-zinc-600" />
            <span>OpenSource</span>
          </motion.div>
        </div>

        {/* <motion.div
          className="mt-16 rounded-xl bg-white p-4 shadow-xl dark:bg-zinc-800 sm:p-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="aspect-[16/9] overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900">
            <img
              src="/placeholder.svg?height=720&width=1280"
              alt="Quazar Quiz App Interface"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div> */}
      </div>

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.1; }
          25% { transform: translateY(-15px) translateX(10px); opacity: 0.3; }
          50% { transform: translateY(0) translateX(20px); opacity: 0.2; }
          75% { transform: translateY(15px) translateX(10px); opacity: 0.3; }
        }
      `}</style>
    </div>
  )
}
