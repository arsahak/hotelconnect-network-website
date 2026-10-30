"use server";

import { apiRequest, type ActionResponse } from "@/lib/api";

/** Test phase: puts an email address on the waitlist (POST /waitlist). */
export async function joinWaitlistAction(
  email: string,
  type: "hotel" | "supplier",
): Promise<ActionResponse<{ alreadyListed: boolean }>> {
  return apiRequest<{ alreadyListed: boolean }>("/waitlist", {
    method: "POST",
    body: { email, type },
    fallbackError: "You could not be added to the waitlist. Please try again.",
  });
}
