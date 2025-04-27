"use client";

import { useState } from "react";
import { QuestionSelector } from "./question-selector";
import { QuestionEditor } from "./question-editor";
import { SaveButton } from "./save-button";
import { toast, Toaster } from "sonner";
import type {
  QuizData,
  ParsedQuizData,
  EditorAnswer,
  Info,
  AnswerMap,
} from "@/app/types";

// Helper function to parse the quiz data from the provided format
function parseQuizData(quizJson: QuizData): ParsedQuizData {
  const quizTitle = "My Quiz"; // Default title
  const quizDescription = "A quiz created with Quazar"; // Default description

  const questions = Object.entries(quizJson).map(([questionText, data]) => {
    const infoItem = data.find(
      (item): item is { info: Info } => "info" in item
    );
    const info = infoItem?.info ?? { duration: 20 };
    const answers = data
      .filter((item) => !("info" in item))
      .map((item) => {
        const [text, isCorrect] = Object.entries(item)[0] as [string, boolean];
        return { text, isCorrect } as EditorAnswer;
      });

    return {
      question: questionText,
      answers,
      duration: info.duration,
    };
  });

  return { quizTitle, quizDescription, questions };
}

// Function to convert back to the original format
function formatQuizData(quizData: ParsedQuizData): QuizData {
  const result: Record<string, any[]> = {};

  quizData.questions.forEach((q: any) => {
    const formattedAnswers: Array<{ info: Info } | AnswerMap> = [
      { info: { duration: q.duration } },
    ];

    q.answers.forEach((a: any) => {
      const answerObj: Record<string, boolean> = {};
      answerObj[a.text] = a.isCorrect;
      formattedAnswers.push(answerObj);
    });

    result[q.question] = formattedAnswers;
  });

  return result;
}

interface QuizEditorProps {
  initialQuizData: QuizData;
  onSave: ({
    quizData,
    userId,
    quizUrl,
  }: {
    quizData: QuizData;
    userId: string;
    quizUrl: string;
  }) => Promise<void>;
  quizUrl: string;
  userId: string;
}

export function QuizEditor({
  initialQuizData,
  onSave,
  userId,
  quizUrl,
}: QuizEditorProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [quizData, setQuizData] = useState<ParsedQuizData>(() =>
    parseQuizData(initialQuizData)
  );

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleSelectQuestion = (index: number) => {
    setSelectedQuestionIndex(index);
  };
  const handleAddQuestion = () => {
    const newQuestions = [...quizData.questions];
    newQuestions.push({
      question: "New Question",
      answers: [
        { text: "Answer 1", isCorrect: false },
        { text: "Answer 2", isCorrect: false },
        { text: "Answer 3", isCorrect: false },
        { text: "Answer 4", isCorrect: false },
      ],
      duration: 20,
    });

    setQuizData({
      ...quizData,
      questions: newQuestions,
    });

    // Select the newly added question
    setSelectedQuestionIndex(newQuestions.length - 1);
    toast.success("New question added");
  };

  const handleUpdateQuestion = (updatedQuestion: any) => {
    const newQuestions = [...quizData.questions];
    newQuestions[selectedQuestionIndex] = updatedQuestion;
    console.log(updatedQuestion)

    setQuizData({
      ...quizData,
      questions: newQuestions,
    });

    toast.message("Question updated!");
    console.log("question updated")
  };

  const handleSaveQuiz = async () => {
    const formattedData: QuizData = formatQuizData(quizData);
    console.log(formattedData, userId, quizUrl);
    onSave({ quizData: formattedData, userId: userId, quizUrl: quizUrl });

    toast.success("Quiz saved successfully");
  };

  // Create a questions object for the selector component
  const questionsForSelector = quizData.questions.reduce((acc, q, index) => {
    acc[q.question] = [];
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className="flex h-[100%] overflow-hidden">
      <QuestionSelector
        questions={questionsForSelector}
        selectedQuestionIndex={selectedQuestionIndex}
        onSelectQuestion={handleSelectQuestion}
        onAddQuestion={handleAddQuestion}
        collapsed={sidebarCollapsed}
        onToggleCollapse={handleToggleSidebar}
      />

      <div className="flex flex-1 flex-col overflow-auto p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold">
              {quizData.quizTitle || "Untitled Quiz"}
            </h1>
          </div>
          <SaveButton onSave={handleSaveQuiz} />
        </div>

        {quizData.questions.length > 0 && (
          <QuestionEditor
            questionData={quizData.questions[selectedQuestionIndex]}
            onUpdate={handleUpdateQuestion}
          />
        )}
      </div>
      <Toaster 
          position="top-right" 
          richColors 
          closeButton 
        />
    </div>
  );
}
