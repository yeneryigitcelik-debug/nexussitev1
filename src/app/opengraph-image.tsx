import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE, SITE_URL, BRAND_COLOR } from "@/lib/seo";

export const runtime = "edge";
export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
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
          background: "linear-gradient(135deg, #FFFFFF 0%, #FFFBF0 50%, #FFF8E1 100%)",
          position: "relative",
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(212,160,18,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(212,160,18,0.08) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Gold accent line top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: `linear-gradient(90deg, transparent, ${BRAND_COLOR}, transparent)`,
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          {/* Shield icon */}
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              background: `linear-gradient(135deg, ${BRAND_COLOR}, #B8860B)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 32px rgba(212,160,18,0.3)",
            }}
          >
            <svg
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: "#1a1a1a",
              letterSpacing: "-0.02em",
            }}
          >
            {SITE_NAME}
          </div>

          {/* Divider */}
          <div
            style={{
              width: 80,
              height: 3,
              background: BRAND_COLOR,
              borderRadius: 2,
            }}
          />

          {/* Subtitle */}
          <div
            style={{
              fontSize: 24,
              color: "#666",
              fontWeight: 500,
            }}
          >
            {SITE_TAGLINE}
          </div>

          {/* Stats */}
          <div
            style={{
              display: "flex",
              gap: 48,
              marginTop: 16,
            }}
          >
            {[
              { value: "10+", label: "Yıl Deneyim" },
              { value: "36+", label: "Çözüm Ortağı" },
              { value: "%98", label: "Memnuniyet" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <div
                  style={{
                    fontSize: 32,
                    fontWeight: 800,
                    color: BRAND_COLOR,
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: 14, color: "#888" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 24,
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "#999",
            fontSize: 16,
          }}
        >
          {SITE_URL.replace("https://", "")}
        </div>
      </div>
    ),
    { ...size }
  );
}
