import { ImageResponse } from "next/og";
import { lotusDataUri } from "@/lib/brand-mark";
import { site } from "@/lib/site";

// Preview image shown when a link to the site is shared (WhatsApp, LinkedIn, ...).
export const alt = `${site.name} – private network for boutique hotels`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 50% 35%, #3a2f22 0%, #1b1611 70%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <img src={lotusDataUri("#c4a067", 2.2)} width={70} height={56} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: 6 }}>HOTELCONNECT</div>
            <div style={{ fontSize: 14, letterSpacing: 10, color: "#c4a067", marginTop: 4 }}>NETWORK</div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 64, color: "#c4a067", fontSize: 18, letterSpacing: 6 }}>
          <div style={{ width: 48, height: 1, background: "#c4a067" }} />
          A PRIVATE B2B NETWORK FOR BOUTIQUE HOTELS
          <div style={{ width: 48, height: 1, background: "#c4a067" }} />
        </div>

        <div style={{ fontSize: 76, marginTop: 24, fontFamily: "serif" }}>Less Admin, More Hospitality</div>

        <div style={{ fontSize: 24, marginTop: 24, color: "rgba(255,255,255,0.7)" }}>
          Compliance · Tenders · Jobs · Group purchasing
        </div>

        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 8, background: "#9f7b3b" }} />
      </div>
    ),
    size,
  );
}
