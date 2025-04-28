"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2, Clock, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface QuestionEditorProps {
  questionData: {
    question: string;
    answers: Array<{
      text: string;
      isCorrect: boolean;
    }>;
    duration: number;
  };
  onUpdate: (updatedQuestion: any) => void;
  className?: string;
}

export function QuestionEditor({
  questionData,
  onUpdate,
  className,
}: QuestionEditorProps) {
  const [question, setQuestion] = useState(questionData.question);
  const [answers, setAnswers] = useState(questionData.answers);
  const [duration, setDuration] = useState(questionData.duration);

  useEffect(() => {
    setQuestion(questionData.question);
    setAnswers(questionData.answers);
    setDuration(questionData.duration);
  }, [questionData]);

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value);
  };

  const handleAnswerTextChange = (index: number, text: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = { ...newAnswers[index], text };
    setAnswers(newAnswers);
  };

  const handleAnswerCorrectChange = (index: number, isCorrect: boolean) => {
    const newAnswers = [...answers];
    newAnswers[index] = { ...newAnswers[index], isCorrect };
    setAnswers(newAnswers);
  };

  const handleDurationChange = (value: number[]) => {
    setDuration(value[0]);
  };

  const handleSaveChanges = () => {
    onUpdate({
      question,
      answers,
      duration,
    });
  };

  const answerLetters = ["A", "B", "C", "D"];

  return (
    <Card className={cn("w-full h-[calc(100%-4rem)] pb-0.5", className)}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Edit Question</CardTitle>
        <CardDescription>
          Update the question, answers, and settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="question" className="text-base">
            Question
          </Label>
          <Textarea
            id="question"
            value={question}
            onChange={handleQuestionChange}
            className="min-h-[100px] resize-none"
            placeholder="Enter your question here..."
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base">Answer Options</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <Info size={16} className="mr-1" />
                    <span className="text-xs">Check the correct answer(s)</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-sm">
                    Select the checkbox next to the correct answer(s). You can
                    have multiple correct answers.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="space-y-3">
            {answers.map((answer, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-zinc-100 text-sm font-medium ">
                  {answerLetters[index]}
                </div>
                <div className="flex-1">
                  <Input
                    value={answer.text}
                    onChange={(e) =>
                      handleAnswerTextChange(index, e.target.value)
                    }
                    placeholder={`Answer option ${answerLetters[index]}`}
                    className="border-zinc-200 "
                  />
                </div>
                <div className="flex items-center pt-2">
                  <Checkbox
                    id={`correct-${index}`}
                    checked={answer.isCorrect}
                    onCheckedChange={(checked) =>
                      handleAnswerCorrectChange(index, checked === true)
                    }
                    className="h-5 w-5 data-[state=checked]:bg-green-600 data-[state=checked]:text-white"
                  />
                  <Label
                    htmlFor={`correct-${index}`}
                    className="ml-2 text-sm font-medium"
                  >
                    Correct
                  </Label>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 flex-shrink-0 text-zinc-500 hover:text-red-500"
                >
                  <Trash2 size={16} />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-4 rounded-lg border border-zinc-200 p-4 ">
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-zinc-500" />
            <Label className="text-base">Question Duration</Label>
          </div>
          <div className="px-2">
            <Slider
              value={[duration]}
              min={5}
              max={60}
              step={5}
              onValueChange={handleDurationChange}
              className="py-4"
            />
            <div className="flex items-center justify-between text-sm text-zinc-500">
              <span>5 seconds</span>
              <span className="font-medium text-zinc-900 ">
                {duration} seconds
              </span>
              <span>60 seconds</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-zinc-200 px-6 pb-7 ">
        <Link href="/teach/my-quizzes">
          <Button variant="outline">Cancel</Button>
        </Link>
        <Button onClick={handleSaveChanges}>Update Question</Button>
      </CardFooter>
    </Card>
  );
}
