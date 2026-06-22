import { ImageResponse } from "next/og";

// Brand "J" monogram favicon, generated to match the site's accent + glass look.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #3257cc 0%, #1f3a99 100%)",
          color: "#ffffff",
          fontSize: 23,
          fontWeight: 700,
          letterSpacing: "-0.04em",
          borderRadius: 7,
        }}
      >
        J
      </div>
    ),
    { ...size }
  );
}
