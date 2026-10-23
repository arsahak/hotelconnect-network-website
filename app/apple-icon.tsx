import { ImageResponse } from "next/og";
import { lotusDataUri } from "@/lib/brand-mark";

// Home-screen icon for iPhone / iPad.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1b1611",
        }}
      >
        <img src={lotusDataUri("#c4a067", 2.4)} width={120} height={96} alt="" />
      </div>
    ),
    size,
  );
}
