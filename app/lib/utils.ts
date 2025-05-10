import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const API_ADDRESS = "https://quazar-5t8x.onrender.com" // https://quazar-5t8x.onrender.com or your own api address.