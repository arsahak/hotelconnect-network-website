import type { NextConfig } from "next";

// The dashboard runs on its own subdomain: dashboard.hotelconnectnetwork.com
// (client's agreements, 21 Nov 2026), set in NEXT_PUBLIC_DASHBOARD_URL.
// Old links to hotelconnectnetwork.com/dashboard are sent there.
// (Optional: DASHBOARD_ORIGIN serves the dashboard under /dashboard instead —
// then build the dashboard with NEXT_PUBLIC_BASE_PATH=/dashboard.)
const dashboardOrigin = (process.env.DASHBOARD_ORIGIN ?? "").replace(/\/+$/, "");
const dashboardUrl = (process.env.NEXT_PUBLIC_DASHBOARD_URL ?? "").replace(/\/+$/, "");

const nextConfig: NextConfig = {
  async rewrites() {
    if (!dashboardOrigin) return [];
    return [
      { source: "/dashboard", destination: `${dashboardOrigin}/dashboard` },
      { source: "/dashboard/:path*", destination: `${dashboardOrigin}/dashboard/:path*` },
    ];
  },
  async redirects() {
    if (dashboardOrigin || !dashboardUrl) return [];
    return [
      { source: "/dashboard", destination: `${dashboardUrl}/dashboard`, permanent: false },
      { source: "/dashboard/:path*", destination: `${dashboardUrl}/dashboard/:path*`, permanent: false },
    ];
  },
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [
      // Placeholder photos until the client delivers real hotel/supplier images.
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      // Photos and logos uploaded through the dashboard: Hetzner Object Storage
      // (bucket "hamid", folder hotelconnect/). DigitalOcean Spaces still allowed.
      {
        protocol: "https",
        hostname: "**.your-objectstorage.com",
        pathname: "/hotelconnect/**",
      },
      {
        protocol: "https",
        hostname: "**.digitaloceanspaces.com",
        pathname: "/**",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
