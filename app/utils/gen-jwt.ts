"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const getJWTtoken = async (): Promise<string> => {
  const supabase = await createClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (!session?.access_token || error) {
    redirect('/login?message="Error: Unauthorized"');
  }

  if (session.expires_in < 120) {
    const { data: refreshedSession, error: refreshError } =
      await supabase.auth.refreshSession();

    if (refreshError || !refreshedSession.session?.access_token) {
      console.log("Error refreshing token:", refreshError);
      redirect('/login?message="Error: Unauthorized"');
    }
    return refreshedSession.session.access_token;
  }

  return session.access_token;
};