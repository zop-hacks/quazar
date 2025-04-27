"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Home } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export const RoomInput = () => {
  const [isFocused, setIsFocused] = useState(false)
  const [value, setValue] = useState("")
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const newValue = e.target.value.replace(/[^0-9]/g, "")
    setValue(newValue)

    // Validate for exactly 6 numbers
    if (newValue.length > 0 && newValue.length !== 6) {
      setError("Room ID must be exactly 6 numbers")
    } else {
      setError("")
    }
  }

  return (
    <div className="w-full space-y-2">
      <Label htmlFor="room_id" className="text-zinc-700 flex items-center gap-2">
        <Home size={16} />
        Room ID
      </Label>
      <div className="relative">
        <Input
          id="room_id"
          name="room_id"
          placeholder="Enter 6-digit room code"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "pl-4 pr-4 py-6 text-lg transition-all border-2",
            isFocused ? "border-blue-400 ring-2 ring-blue-100" : "border-zinc-200",
            error ? "border-red-400 ring-2 ring-red-100" : "",
          )}
          required
          autoComplete="off"
          maxLength={6}
          pattern="[0-9]{6}"
          inputMode="numeric"
        />

        {/* Character counter */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400">
          {value.length > 0 && `${value.length}/6`}
        </div>
      </div>

      {/* Error message with animation */}
      <AnimatedError error={error} />
    </div>
  )
}

// Animated error message component
const AnimatedError = ({ error }: { error: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{
        opacity: error ? 1 : 0,
        height: error ? "auto" : 0,
      }}
      className="text-red-500 text-sm overflow-hidden"
    >
      {error}
    </motion.div>
  )
}
