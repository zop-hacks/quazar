"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { z } from "zod";
import { Provider } from "@supabase/supabase-js";
import { getURL } from "@/utils/helpers";

export async function emailLogin(formData: FormData) {
  const supabase = await createClient();

  const FormSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const data = FormSchema.parse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/login?message=Could not authenticate user");
  }

  revalidatePath("/", "layout");
  redirect("/teach/my-quizzes");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const FormSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const data = FormSchema.parse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/login?message=Error signing up");
  }

  revalidatePath("/", "layout");
  redirect("/signup/please-check-email");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
export async function oAuthSignIn(provider: Provider) {
  if (!provider) {
    return redirect("/login?message=No provider selected");
  }
  const supabase = await createClient();
  const redirectUrl = getURL("/auth/callback");
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectUrl,
    },
  });
  if (error) {
    redirect("/login?message=Could not authenticate user");
  }
  return redirect(data.url)
}
