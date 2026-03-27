import { motion } from "framer-motion";
import Reveal from "../ui/Reveal";
import SLabel from "../ui/SLabel";

const LIBRARY_ITEMS = [
  {
    id: "thumbnails",
    icon: "TH",
    label: "Thumbnails",
    sub: "YouTube & social covers",
    color: "rgba(168,197,140,.28)",
  },
  {
    id: "video-edits",
    icon: "VD",
    label: "Video Edits",
    sub: "Reels, shorts & long-form",
    color: "rgba(210,180,140,.28)",
  },
  {
    id: "graphic-design",
    icon: "GD",
    label: "Graphic Design",
    sub: "Posters, branding & print",
    color: "rgba(180,168,210,.28)",
  },
  {
    id: "code-projects",
    icon: "</>",
    label: "Code Projects",
    sub: "Web apps & experiments",
    color: "rgba(140,200,190,.28)",
  },
];

export default function Library() {
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="library"
      style={{ position: "relative", zIndex: 1, padding: "96px 6vw 112px", overflow: "hidden" }}
    >
      <div
        style={{
          position: "absolute",
          left: "-0.04em",
          top: "50%",
          transform: "translateY(-50%)",
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: "clamp(130px,19vw,260px)",
          fontWeight: 700,
          fontStyle: "italic",
          color: "rgba(65,67,27,0.04)",
          letterSpacing: "-0.04em",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          whiteSpace: "nowrap",
          zIndex: 0,
        }}
      >
        Work
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Reveal variant="fade" style={{ textAlign: "center", marginBottom: 64 }}>
          <SLabel>Index</SLabel>

          <h2
            className="serif"
            style={{
              fontSize: "clamp(38px,5vw,68px)",
              fontWeight: 700,
              color: "#41431B",
              letterSpacing: "-0.03em",
              lineHeight: 0.95,
            }}
          >
            Work{" "}
            <span
              style={{
                fontStyle: "italic",
                fontWeight: 200,
                letterSpacing: "-0.02em",
                color: "rgba(65,67,27,0.5)",
              }}
            >
              Library
            </span>
          </h2>

          <p
            style={{
              fontSize: 15,
              color: "#6B6B4A",
              margin: "16px auto 0",
              maxWidth: 400,
              lineHeight: 1.8,
              fontWeight: 300,
            }}
          >
            Browse by category and jump straight to the part that matters.
          </p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
          {LIBRARY_ITEMS.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.1} variant="zoom">
              <motion.div
                onClick={() => go(item.id)}
                whileHover={{
                  y: -10,
                  boxShadow: "0 28px 64px rgba(65,67,27,.15)",
                  borderBottomColor: "rgba(65,67,27,0.35)",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                style={{
                  cursor: "pointer",
                  borderRadius: 20,
                  padding: "36px 24px 32px",
                  background: item.color,
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,.62)",
                  borderBottom: "2px solid rgba(65,67,27,0.08)",
                  boxShadow: "0 8px 32px rgba(65,67,27,.08)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                  minHeight: 240,
                  transition: "border-bottom-color .25s",
                }}
              >
                <div style={{ fontSize: 32, lineHeight: 1, fontFamily: "monospace" }}>{item.icon}</div>

                <div>
                  <div
                    className="serif"
                    style={{
                      fontSize: 24,
                      fontWeight: 600,
                      color: "#41431B",
                      lineHeight: 1.1,
                      marginBottom: 6,
                    }}
                  >
                    {item.label}
                  </div>
                  <div style={{ fontSize: 13, color: "#6B6B4A", fontWeight: 300 }}>{item.sub}</div>
                </div>

                <div
                  style={{
                    marginTop: "auto",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 12,
                    color: "#41431B",
                    letterSpacing: "0.06em",
                    fontWeight: 600,
                    opacity: 0.55,
                  }}
                >
                  Jump to section <span>↓</span>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
