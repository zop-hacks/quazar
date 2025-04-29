"use server"
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const page = async({ params }: {params: { id: string }}) => {
    const supabase = await createClient();
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        redirect("/login");
      }
      console.log(data.user.id);
      const { data: results, error: resulterror } = await supabase
        .from("game_results")
        .select("created_at, id, quiz_title, player_count, player_data, question_results")
        .eq("user_id", data.user.id)
        .eq("id", params.id);
  return (
    <div>
    </div>
  );
};

export default page