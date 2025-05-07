"use server";

import QuizEditorDemo from "@/app/teach/edit-quiz/quiz-editor-demo";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  const { quiz } = await searchParams;
  if (!quiz || typeof quiz !== "string") {
    redirect(
      "/host/quiz-error?message=No quiz id was provided, or was not valid, try creating a new quiz instead."
    );
  }
  const { data: quizzes, error: quizerror }: any = await supabase
    .from("quizzes")
    .select("title, url, id, description, created_at, questions")
    .eq("user_id", data.user.id)
    .eq("url", quiz)
    .single();

  if (!quizzes) {
    redirect(
      "/host/quiz-error?message=No quiz was found, please try to open the quis again, or try creating a new quiz instead."
    );
  }

  return (
    <div className="h-full overflow-hidden">
      <QuizEditorDemo quizData={quizzes.questions} quizUrl={quiz} userId={data.user.id} />
    </div>
  );
};

export default Page;
