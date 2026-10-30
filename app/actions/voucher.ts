"use server";

import { apiRequest, type ActionResponse } from "@/lib/api";
import type { Voucher, VoucherTeaser } from "@/lib/types";

/** Slideshow on the suppliers page: up to 10, paid promotions first. No booking links. */
export async function listFeaturedVouchersAction(): Promise<ActionResponse<VoucherTeaser[]>> {
  return apiRequest<VoucherTeaser[]>("/vouchers/featured", { fallbackError: "Failed to load the vouchers." });
}

export type MemberVouchers = {
  member: { memberNumber: string; name: string };
  vouchers: Voucher[];
};

/**
 * All vouchers with booking links, for suppliers only (briefing §2.5). The
 * API checks that the member number exists and is active.
 */
export async function unlockVouchersAction(memberNumber: string): Promise<ActionResponse<MemberVouchers>> {
  return apiRequest<MemberVouchers>("/vouchers/member-access", {
    method: "POST",
    body: { memberNumber: memberNumber.trim().toUpperCase() },
    fallbackError: "This member number could not be checked. Please try again.",
  });
}
