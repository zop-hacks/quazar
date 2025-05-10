"use client"

import { useSearchParams } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle, CirclePlus, LogIn } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

const LoadError = () => {
  const searchParams = useSearchParams()
  const message = searchParams.get("message") || "An unexpected error occurred"

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary">Oops!</h1>
          <p className="mt-2 text-xl text-muted-foreground">Something went wrong</p>
        </div>

        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>

        <div className="text-center flex justify-center gap-5">
          <Button>
            <Link href="/gen-quiz" className="inline-flex items-center">
              <CirclePlus className="mr-2 h-4 w-4" />
              Create a Quiz
            </Link>
          </Button>
          <Button>
            <Link href="/gen-quiz" className="inline-flex items-center">
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

const Page = () => {
  return <Suspense><LoadError/></Suspense>
}

export default Page