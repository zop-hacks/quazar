"use client";

import { QuizData } from "@/app/types";
import { QuizEditor } from "@/components/edit-quiz/quiz-editor";
import { handleSave } from "./actions";
export default function QuizEditorDemo({
  quizData,
  userId,
  quizUrl,
}: {
  quizData: QuizData;
  userId: string;
  quizUrl: string;
}) {
  return (
    <div className="h-[calc(100vh-4rem)] bg-zinc-50 dark:bg-zinc-900">
      <main>
        <QuizEditor
          initialQuizData={quizData}
          onSave={handleSave}
          userId={userId}
          quizUrl={quizUrl}
        />
      </main>
    </div>
  );
}
