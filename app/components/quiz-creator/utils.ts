import type { QuizStage } from "./types"

export function determineStage(message: string): QuizStage {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("connecting")) return "connecting"
  if (lowerMessage.includes("summarizing")) return "summarizing"
  if (lowerMessage.includes("research")) return "researching"
  if (lowerMessage.includes("generating"))  return "generating"
  if (lowerMessage.includes("iterating") || lowerMessage.includes("verifying")) return "iterating"
  if (lowerMessage.includes("database") || lowerMessage.includes("adding quiz")) return "saving"
  if (lowerMessage.includes("redirecting")) return "redirecting"
  if (lowerMessage.includes("error") || lowerMessage.includes("please login")) return "error"

  // Default to connecting if we can't determine the stage
  return "connecting"
}
