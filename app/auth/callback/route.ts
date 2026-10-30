import { NextResponse, type NextRequest } from "next/server";
import { signInWithCodeAction } from "@/app/actions/member";

/** Only paths on this site, never another site. */
function safePath(value: string | null) {
  return value && value.startsWith("/") && !value.startsWith("//") ? value : "/suppliers";
}

/**
 * GET /auth/callback?code=…&next=/suppliers
 * The dashboard sends a signed-in supplier here with a one-time code; we swap
 * it for a token (stored in a cookie) and go back to where they were.
 */
export async function GET(request: NextRequest) {
  const next = safePath(request.nextUrl.searchParams.get("next"));
  const target = new URL(next, request.url);
  const code = request.nextUrl.searchParams.get("code");

  const res = code ? await signInWithCodeAction(code) : { ok: false };
  if (!res.ok) target.searchParams.set("login", "failed");

  return NextResponse.redirect(target);
}
