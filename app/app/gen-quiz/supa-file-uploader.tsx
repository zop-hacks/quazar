"use server";

import { createClient } from "@/utils/supabase/server";
import { v4 as uuidv4 } from "uuid";

export const FileUploader = async(name: string, file: any) => {
  const supabase = await createClient();
  
  const ext = name.substring(name.lastIndexOf(".") + 1);
  const fileName = `${uuidv4()}.${ext}`;

  const { data, error } = await supabase.storage
    .from("quiz-materials")
    .upload(fileName, file);
  if (error) {
    console.error("Supabase upload error:", error);
    throw error;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("quiz-materials").getPublicUrl(data.path);
  console.error(`src material url: ${publicUrl}`);
  return publicUrl;
};

