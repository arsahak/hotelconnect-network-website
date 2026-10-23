import type { Metadata } from "next";
import { Gilda_Display, Poppins } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const gilda = Gilda_Display({
  variable: "--font-gilda",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  // Base for absolute URLs in share previews. NEXT_PUBLIC_SITE_URL can override it (e.g. a custom domain later).
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? site.url),
  title: {
    default: `${site.name} – private network for boutique hotels`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    locale: "en",
    title: `${site.name} – private network for boutique hotels`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} ${gilda.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
