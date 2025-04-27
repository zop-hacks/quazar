"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

interface FileUploadProps {
  value: any
  onChange: (file: File | null) => void
  accept?: string
  maxSize?: number // in MB
}

export function FileUpload({ value, onChange, accept = ".pdf,.doc,.docx,.txt", maxSize = 10 }: FileUploadProps) {
  const [fileName, setFileName] = useState<string>("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) {
      return
    }

    // Check file size (convert maxSize from MB to bytes)
    if (file.size > maxSize * 1024 * 1024) {
      toast.error("File too large", {
        description: `File size must be less than ${maxSize}MB`,
      })
      return
    }

    setFileName(file.name)
    onChange(file)
  }

  const handleRemoveFile = () => {
    setFileName("")
    onChange(null)
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <Button type="button" variant="outline" onClick={() => inputRef.current?.click()} className="w-full">
          <Upload className="mr-2 h-4 w-4" />
          {fileName ? "Change File" : "Upload File"}
        </Button>

        {fileName && (
          <Button type="button" variant="outline" size="icon" onClick={handleRemoveFile}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {fileName && <div className="text-sm text-muted-foreground truncate">{fileName}</div>}
    </div>
  )
}
