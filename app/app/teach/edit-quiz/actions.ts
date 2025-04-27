"use server"
import { QuizData } from "@/app/types";
import { createClient } from "@/utils/supabase/server";

export const handleSave = async ({
  quizData,
  userId,
  quizUrl,
}: {
  quizData: QuizData;
  userId: string;
  quizUrl: string;
}) => {
  console.log(quizData, userId, quizUrl)
  const supabase = await createClient();

  const { error } = await supabase
    .from("quizzes")
    .update({ questions: quizData })
    .eq("user_id", userId)
    .eq("url", quizUrl);
  if (error) throw new Error(error.message);
};