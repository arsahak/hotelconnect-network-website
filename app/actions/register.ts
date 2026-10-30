"use server";

import { apiRequest, type ActionResponse } from "@/lib/api";

export type RegistrationInput = {
  type: "hotel" | "supplier";
  companyName: string;
  kvkNumber: string;
  contactFirstName: string;
  contactLastName: string;
  email: string;
  phone: string;
  password: string;
  address?: string;
  city?: string;
  region?: string;
  categories?: string[];
  regions?: string[];
  plan?: "contract" | "commission";
  website?: string;
};

/**
 * Sign-up after the test phase (briefing §3.1, §4.1). HotelConnect checks it;
 * once approved, the member signs in on the dashboard with this password.
 */
export async function registerAction(data: RegistrationInput): Promise<ActionResponse<{ _id: string }>> {
  return apiRequest<{ _id: string }>("/registrations", {
    method: "POST",
    body: data,
    fallbackError: "Your registration could not be sent. Please try again.",
  });
}
