"use server";

import { cookies } from "next/headers";
import { apiRequest, type ActionResponse } from "@/lib/api";
import type { Member } from "@/lib/types";
import type { MemberVouchers } from "./voucher";

// A supplier signed in on the website (briefing §2.4: "Boek nu" only for
// signed-in suppliers). The backend token lives in an httpOnly cookie.
const COOKIE = "hc_member";
const MAX_AGE = 7 * 24 * 60 * 60; // same lifetime as the backend token

async function memberToken() {
  return (await cookies()).get(COOKIE)?.value;
}

/**
 * Exchanges the one-time code from the dashboard for a token and stores it.
 * Called by the /auth/callback route.
 */
export async function signInWithCodeAction(code: string): Promise<ActionResponse<{ member: Member }>> {
  const res = await apiRequest<{ token: string; member: Member }>("/auth/handoff/exchange", {
    method: "POST",
    body: { code },
    fallbackError: "We could not sign you in. Please try again.",
  });
  if (!res.ok || !res.data?.token) return { ok: false, error: res.error };

  (await cookies()).set(COOKIE, res.data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
  return { ok: true, data: { member: res.data.member } };
}

/** The signed-in supplier, or null (no cookie, expired, or no longer active). */
export async function getSignedInMemberAction(): Promise<Member | null> {
  const token = await memberToken();
  if (!token) return null;
  const res = await apiRequest<{ member: Member }>("/auth/member", { token, fallbackError: "Not signed in." });
  return res.ok ? (res.data?.member ?? null) : null;
}

export async function signOutMemberAction(): Promise<void> {
  (await cookies()).delete(COOKIE);
}

/** All vouchers with booking links, for the signed-in supplier (briefing §2.5). */
export async function listSignedInVouchersAction(): Promise<ActionResponse<MemberVouchers>> {
  const token = await memberToken();
  if (!token) return { ok: false, error: "Please sign in." };
  return apiRequest<MemberVouchers>("/vouchers/member", { token, fallbackError: "Failed to load the vouchers." });
}

/** The hotel's booking page for one voucher ("Boek nu"), for the signed-in supplier. */
export async function getVoucherBookingUrlAction(voucherId: string): Promise<ActionResponse<{ bookingUrl: string }>> {
  const token = await memberToken();
  if (!token) return { ok: false, error: "Please sign in." };
  return apiRequest<{ bookingUrl: string }>(`/vouchers/${encodeURIComponent(voucherId)}/booking`, {
    token,
    fallbackError: "Failed to open the booking page.",
  });
}
