import { NextResponse, type NextRequest } from "next/server";
import { getVoucherBookingUrlAction } from "@/app/actions/member";

/**
 * GET /suppliers/vouchers/:id/book — "Boek nu" (briefing §2.4). Sends a
 * signed-in supplier on to the hotel's booking page; the link itself is never
 * in the public page. Everyone else goes back to the vouchers section.
 */
export async function GET(request: NextRequest, { params }: RouteContext<"/suppliers/vouchers/[id]/book">) {
  const { id } = await params;
  const res = await getVoucherBookingUrlAction(id);

  if (res.ok && res.data?.bookingUrl) return NextResponse.redirect(res.data.bookingUrl);

  const back = new URL("/suppliers", request.url);
  back.searchParams.set("login", "required");
  back.hash = "vouchers";
  return NextResponse.redirect(back);
}
