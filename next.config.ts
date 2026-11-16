import type { NextConfig } from "next";

// Client (31 Oct): one domain. hotelconnect-network.nl/dashboard is the
// dashboard app (its own deployment, built with NEXT_PUBLIC_BASE_PATH=/dashboard);
// the website passes those requests through when DASHBOARD_ORIGIN is set.
const dashboardOrigin = (process.env.DASHBOARD_ORIGIN ?? "").replace(/\/+$/, "");

const nextConfig: NextConfig = {
  async rewrites() {
    if (!dashboardOrigin) return [];
    return [
      { source: "/dashboard", destination: `${dashboardOrigin}/dashboard` },
      { source: "/dashboard/:path*", destination: `${dashboardOrigin}/dashboard/:path*` },
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
