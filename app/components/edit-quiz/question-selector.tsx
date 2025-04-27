"use client"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, GripVertical, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface QuestionSelectorProps {
  questions: Record<string, any[]>
  selectedQuestionIndex: number
  onSelectQuestion: (index: number) => void
  onAddQuestion: () => void
  collapsed?: boolean
  onToggleCollapse?: () => void
  className?: string
}

export function QuestionSelector({
  questions,
  selectedQuestionIndex,
  onSelectQuestion,
  onAddQuestion,
  collapsed = false,
  onToggleCollapse,
  className,
}: QuestionSelectorProps) {
  const questionTitles = Object.keys(questions)

  return (
    <motion.div
      className={cn(
        "flex flex-col border-r border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 h-[calc(95vh-4rem)]",
        collapsed ? "w-12" : "w-72",
        className,
      )}
      initial={false}
      animate={{ width: collapsed ? "3rem" : "18rem" }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between border-b border-zinc-200 p-4 dark:border-zinc-800">
        {!collapsed && <h3 className="text-sm font-medium">Quiz Questions</h3>}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className={cn("ml-auto h-8 w-8", collapsed && "mx-auto")}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {questionTitles.map((title, index) => (
            <motion.button
              key={index}
              className={cn(
                "group mb-1 flex w-full items-center rounded-md px-2 py-2 text-left text-sm",
                selectedQuestionIndex === index
                  ? "bg-zinc-200 font-medium dark:bg-zinc-800"
                  : "hover:bg-zinc-100 dark:hover:bg-zinc-800/50",
              )}
              onClick={() => onSelectQuestion(index)}
              whileHover={{ x: collapsed ? 0 : 3 }}
              transition={{ duration: 0.1 }}
            >
              <div className="mr-2 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-zinc-200 text-xs font-medium dark:bg-zinc-800">
                {index + 1}
              </div>
              {!collapsed && (
                <span className="line-clamp-1 flex-1">
                  {title.length > 40 ? `${title.substring(0, 40)}...` : title}
                </span>
              )}
              {!collapsed && (
                <GripVertical size={16} className="ml-2 opacity-0 transition-opacity group-hover:opacity-100" />
              )}
            </motion.button>
          ))}
        </div>
      </ScrollArea>

      <div className="border-t border-zinc-200 p-2 dark:border-zinc-800">
        <Button variant="outline" size={collapsed ? "icon" : "default"} onClick={onAddQuestion} className="w-full">
          <Plus size={16} className={cn("mr-2", collapsed && "mr-0")} />
          {!collapsed && "Add Question"}
        </Button>
      </div>
    </motion.div>
  )
}
