import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "../ui/Reveal";

export default function Footer() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
      setDate(
        now.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      );
    };

    tick();
    const interval = window.setInterval(tick, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      style={{
        position: "relative",
        zIndex: 1,
        background: "#41431B",
        overflow: "hidden",
      }}
    >
      <div style={{ height: 1, background: "rgba(174,183,132,0.12)" }} />

      <Reveal variant="zoom">
        <div
          style={{
            padding: "72px 6vw 56px",
            textAlign: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%,-50%)",
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "clamp(80px,12vw,160px)",
              fontWeight: 700,
              fontStyle: "italic",
              color: "rgba(248,243,225,0.03)",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              userSelect: "none",
              pointerEvents: "none",
              whiteSpace: "nowrap",
            }}
          >
            always
          </div>

          <p
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "clamp(22px,3.5vw,44px)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "rgba(248,243,225,0.85)",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              marginBottom: 8,
              position: "relative",
              zIndex: 1,
            }}
          >
            "Let's make something worth remembering."
          </p>

          <p
            style={{
              fontSize: 12,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(174,183,132,0.5)",
              fontFamily: "'DM Sans',sans-serif",
            }}
          >
            - Always open to great work
          </p>
        </div>
      </Reveal>

      <div style={{ height: 1, background: "rgba(174,183,132,0.10)", margin: "0 6vw" }} />

      <div
        style={{
          padding: "28px 6vw 36px",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: 24,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div
            className="serif"
            style={{ fontSize: 20, fontWeight: 600, color: "rgba(248,243,225,0.9)" }}
          >
            AM<span style={{ color: "#AEB784", fontWeight: 300 }}>.</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                fontSize: 10,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(174,183,132,0.45)",
              }}
            >
              Local time
            </span>

            <span
              style={{
                fontFamily: "'DM Sans',monospace",
                fontSize: 11,
                color: "rgba(174,183,132,0.7)",
                letterSpacing: "0.06em",
              }}
            >
              {time}
            </span>

            <span style={{ fontSize: 10, color: "rgba(174,183,132,0.35)" }}>{date}</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { label: "About", id: "about" },
            { label: "Work", id: "library" },
            { label: "Tools", id: "tools" },
            { label: "Contact", id: "contact" },
          ].map(({ label, id }) => (
            <span
              key={id}
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
              style={{
                fontSize: 11,
                letterSpacing: "0.10em",
                textTransform: "uppercase",
                color: "rgba(174,183,132,0.45)",
                cursor: "pointer",
                transition: "color .2s",
              }}
            >
              {label}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollTop}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(174,183,132,0.6)",
              fontFamily: "'DM Sans',sans-serif",
              padding: 0,
            }}
          >
            Back to top
            <span
              style={{
                fontSize: 14,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 22,
                height: 22,
                borderRadius: "50%",
                border: "1px solid rgba(174,183,132,0.3)",
              }}
            >
              ↑
            </span>
          </motion.button>

          <div style={{ fontSize: 10, color: "rgba(174,183,132,0.3)", letterSpacing: "0.06em" }}>
            © 2025 · Crafted with care
          </div>
        </div>
      </div>
    </footer>
  );
}
