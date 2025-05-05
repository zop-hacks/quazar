"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Users, User, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { H2 } from "@/components/ui/utypography"
import { FormInput } from "./form-input"
import { z } from "zod"
import { joinGameSchema } from "./types"

export const JoinGameForm = ({defaultRoomId}: {defaultRoomId: string}) => {
  const router = useRouter()
  const [errors, setErrors] = useState<{ room_id?: string; username?: string }>({})

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const rawData = {
      room_id: formData.get("room_id")?.toString() ?? "",
      username: formData.get("username")?.toString() ?? "",
    }

    try {
      // Validate the form data
      const validatedData = joinGameSchema.parse(rawData)

      // Redirect to the game page
      router.push(
        `/play/game?roomid=${encodeURIComponent(
          validatedData.room_id,
        )}&username=${encodeURIComponent(validatedData.username)}`,
      )
    } catch (error) {
      // Handle validation errors
      if (error instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string } = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message
          }
        })
        setErrors(fieldErrors)
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="overflow-hidden border-zinc-200 shadow-xl">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white text-center">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
          >
            <Users size={48} className="mx-auto mb-4 opacity-90" />
            <H2 className="text-white">Join a Quiz</H2>
          </motion.div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <FormInput
              name="room_id"
              label="Room ID"
              placeholder="Enter the room code"
              defaultValue={defaultRoomId}
              icon={<Users size={18} />}
              required
              autoFocus
            />
            {errors.room_id && <p className="mt-1 text-sm text-red-500">{errors.room_id}</p>}
          </div>

          <div>
            <FormInput
              name="username"
              label="Your Name"
              placeholder="Enter your name"
              icon={<User size={18} />}
              required
            />
            {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username}</p>}
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-2">
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-none"
            >
              <LogIn className="mr-2 h-5 w-5" /> Join Game
            </Button>
          </motion.div>
        </form>
      </Card>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-4 text-center text-zinc-500 text-sm"
      >
        <p>Enter the room code provided by your teacher</p>
      </motion.div>
    </motion.div>
  )
}
