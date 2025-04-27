"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FormInputProps {
  name: string
  label: string
  placeholder: string
  icon: React.ReactNode
  required?: boolean
  autoFocus?: boolean
}

export const FormInput = ({ name, label, placeholder, icon, required = false, autoFocus = false }: FormInputProps) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="w-full space-y-2">
      <Label htmlFor={name} className="text-sm font-medium text-zinc-700 flex items-center gap-2">
        {icon}
        {label}
      </Label>
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`relative rounded-md ${isFocused ? "ring-2 ring-indigo-300" : ""}`}
      >
        <Input
          id={name}
          name={name}
          placeholder={placeholder}
          required={required}
          autoFocus={autoFocus}
          className="h-12 px-4 border-zinc-300 focus:border-indigo-300 focus:ring-indigo-300"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </motion.div>
    </div>
  )
}
