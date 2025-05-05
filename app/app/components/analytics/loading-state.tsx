import { Loader2 } from "lucide-react"

export function AnalyticsLoading() {
  return (
    <div className="flex h-[60vh] w-full items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-zinc-400" />
        <p className="text-lg font-medium text-zinc-500">Loading analytics data...</p>
      </div>
    </div>
  )
}
