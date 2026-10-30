import { redirect } from "next/navigation";
import { site } from "@/lib/site";

/** Members sign in on the dashboard; /login is the website's shortcut to it. */
export default function LoginPage() {
  redirect(`${site.dashboardUrl}/sign-in`);
}
