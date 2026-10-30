"use server";

import { apiRequest, type ActionResponse } from "@/lib/api";
import type { Page, Supplier } from "@/lib/types";

export type SupplierFilters = {
  q?: string;
  category?: string;
  region?: string;
  /** Only the homepage slideshow. */
  featured?: boolean;
  /** Only the ad blocks on the Purchasing page. */
  purchasing?: boolean;
  page?: number;
  limit?: number;
};

/** Supplier directory (GET /suppliers). Never contains contact details. */
export async function listSuppliersAction(filters: SupplierFilters = {}): Promise<ActionResponse<Page<Supplier>>> {
  return apiRequest<Page<Supplier>>("/suppliers", { query: filters, fallbackError: "Failed to load the suppliers." });
}

export async function getSupplierAction(slug: string): Promise<ActionResponse<Supplier>> {
  return apiRequest<Supplier>(`/suppliers/${encodeURIComponent(slug)}`, { fallbackError: "Supplier not found." });
}
