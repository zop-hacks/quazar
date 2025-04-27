"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { z } from "zod";
import { Provider } from "@supabase/supabase-js";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;
const REDIRECT_TO = `${SITE_URL}/teach/your-quizzes`;

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
    redirect(`${SITE_URL}/login?message=Could not authenticate user`);
  }

  revalidatePath("/");
  redirect(REDIRECT_TO);
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
    redirect(`${SITE_URL}/login?message=Error signing up`);
  }

  revalidatePath("/");
  redirect(`${SITE_URL}/signup/please-check-email`);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect(`${SITE_URL}/login`);
}

export async function oAuthSignIn(provider: Provider) {
  if (!provider) {
    redirect(`${SITE_URL}/login?message=No provider selected`);
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: REDIRECT_TO,
    },
  });

  if (error) {
    redirect(`${SITE_URL}/login?message=Could not authenticate user`);
  }

  // data.url is the Supabase-generated OAuth handshake URL
  redirect(data.url);
}