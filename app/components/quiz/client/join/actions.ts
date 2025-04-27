"use server"

import { z } from "zod"
import { redirect } from "next/navigation"
import { joinGameSchema } from "./types"

export const joinGameAction = async (formData: FormData) => {
  const rawData = {
    room_id: formData.get("room_id")?.toString() ?? "",
    username: formData.get("username")?.toString() ?? "",
  }

  try {
    const validatedData = joinGameSchema.parse(rawData)

    redirect(
      `/play/game?roomid=${encodeURIComponent(
        validatedData.room_id,
      )}&username=${encodeURIComponent(validatedData.username)}`,
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(error.errors)
    }
    throw error
  }
}
