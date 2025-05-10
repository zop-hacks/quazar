"use server";
import { Analytics, AnalyticsSum } from "@/app/components/analytics";
import { API_ADDRESS } from "@/lib/utils";
import { getJWTtoken } from "@/utils/gen-jwt";
import { redirect } from "next/navigation";

export const summarizeAnalytics = async (
  analytics: Analytics
): Promise<AnalyticsSum>  => {
  console.log("activated!");
  const token = await getJWTtoken();
  const url = `${API_ADDRESS}/sum-info`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(analytics),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json: AnalyticsSum = await response.json();

    return json;
  } catch (error: any) {
    console.error(error.message);
    redirect(`/error?message=lol`)
  }
};
