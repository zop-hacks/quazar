"use server";
import { GameResult } from "@/app/components/analytics";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import LoadAnalytics from "./load-analytics";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  const { id } = await params;
  console.log(id, typeof id);
  const {
    data: results,
    error: resultError,
  }: { data: GameResult | null; error: any } = await supabase
    .from("game_results")
    .select(
      "created_at, id, quiz_title, player_count, player_data, question_results"
    )
    .eq("user_id", data.user.id)
    .eq("id", Number(id))
    .single();
  return <>{results && <LoadAnalytics results={results} />}</>;
};

export default page;
