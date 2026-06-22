import { ImageResponse } from "next/og";

// Branded OG card, generated to match the site's radial-gradient + glass panel.
export const alt = "Jawad Jalal — Designer & Founder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(125% 125% at 14% 8%, #eef1f5 0%, #e9e6df 46%, #e6e9ee 76%, #ecebe5 100%)",
          padding: 64,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRadius: 36,
            padding: "64px 72px",
            background: "rgba(255,255,255,0.55)",
            border: "1px solid rgba(255,255,255,0.7)",
            boxShadow: "0 40px 90px -40px rgba(26,30,44,0.45)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 96,
              height: 96,
              borderRadius: 24,
              background: "linear-gradient(135deg, #3257cc 0%, #1f3a99 100%)",
              color: "#ffffff",
              fontSize: 60,
              fontWeight: 700,
              letterSpacing: "-0.04em",
            }}
          >
            J
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 92,
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "#0d0c08",
                lineHeight: 1,
              }}
            >
              Jawad Jalal
            </div>
            <div
              style={{
                marginTop: 20,
                fontSize: 36,
                color: "#16150f",
                display: "flex",
              }}
            >
              <span style={{ fontWeight: 600 }}>Designer &amp; Founder.</span>
              <span style={{ color: "#3257cc", fontWeight: 600, marginLeft: 12 }}>
                Building the good-looking.
              </span>
            </div>
          </div>

          <div
            style={{
              fontSize: 24,
              color: "#6a6961",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            3D Artist · Marketer · Founder
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
