import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "GSN Foundation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "linear-gradient(135deg,#080D1B 0%,#0E2E5A 60%,#083B5A 100%)", color: "#F8FAFC" }}>
        <div style={{ fontSize: 34, color: "#19A8E0" }}>GSN Foundation</div>
        <div style={{ fontSize: 76, fontWeight: 700, marginTop: 24, lineHeight: 1.05 }}>Exam coaching and AI programs</div>
      </div>
    ),
    size
  );
}
