"use server";
import { getJWTtoken } from "@/utils/gen-jwt";
import RoomConnector from "./game";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { H1 } from "@/components/ui/utypography";

const page = async ({
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
  const { data: quizzes, error: quizerror } = await supabase
    .from("quizzes")
    .select("title, url, id, description, created_at")
    .eq("user_id", data.user.id)
    .eq("url", quiz);
  if (!quizzes) {
    redirect(
      "/host/quiz-error?message=No quiz was found, please try to open the quis again, or try creating a new quiz instead."
    );
  }

  try {
    const token = await getJWTtoken();
    return (
      <RoomConnector quizTitle={quizzes[0].title} token={token} quizUrl={quiz} />
    )
  } catch (err) {
    console.error("JWT error:", err);
  }

  return (
    <H1>Error Unauthenticated</H1>
  );
};
export default page;
