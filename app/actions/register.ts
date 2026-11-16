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
  /** Country_Tag (ISO code), hotels and suppliers. */
  country: string;
  /** "I agree to the Terms & Conditions and Privacy Policy" — must be true. */
  acceptTerms: boolean;
  legalName?: string;
  vatNumber?: string;
  address?: string;
  postalCode?: string;
  city?: string;
  region?: string;
  rooms?: number;
  billingEmail?: string;
  bookingUrl?: string;
  categories?: string[];
  regions?: string[];
  plan?: "contract" | "commission";
  website?: string;
  /** Token from a hotel's 1-click invite link. */
  invite?: string;
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
