import { z } from "zod"

export const joinGameSchema = z.object({
  room_id: z.string().nonempty({ message: "Room ID is required" }),
  username: z.string().nonempty({ message: "Username is required" }),
})

export type JoinGameFormData = z.infer<typeof joinGameSchema>
