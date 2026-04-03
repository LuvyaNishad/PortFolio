import { motion } from "framer-motion";
import Reveal from "../ui/Reveal";
import { TOOL_CATEGORIES, type ToolItem } from "../../data/toolCategories";

function ToolChip({ name, Icon }: ToolItem) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 20px",
        borderRadius: 100,
        background: "rgba(248,243,225,0.72)",
        border: "1px solid rgba(210,205,175,0.5)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 2px 12px rgba(65,67,27,.06)",
        flexShrink: 0,
      }}
    >
      <Icon />
      <span style={{ fontSize: 13.5, color: "#41431B", fontWeight: 450, whiteSpace: "nowrap" }}>
        {name}
      </span>
    </div>
  );
}

function Dot() {
  return (
    <div
      style={{
        width: 5,
        height: 5,
        borderRadius: "50%",
        background: "rgba(174,183,132,.45)",
        flexShrink: 0,
      }}
    />
  );
}

function MarqueeRow({
  tools,
  speed = 28,
  reverse = false,
}: {
  tools: ToolItem[];
  speed?: number;
  reverse?: boolean;
}) {
  const items = [...tools, ...tools, ...tools, ...tools];

  return (
    <div style={{ overflow: "hidden", width: "100%", position: "relative" }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 120,
          zIndex: 2,
          background: "linear-gradient(to right,rgba(248,243,225,.95),transparent)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 120,
          zIndex: 2,
          background: "linear-gradient(to left,rgba(248,243,225,.95),transparent)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        style={{ display: "flex", alignItems: "center", gap: 12, width: "max-content" }}
        animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {items.map((tool, index) => (
          <div key={`${tool.name}-${index}`} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <ToolChip {...tool} />
            <Dot />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Tools() {
  return (
    <section id="tools" style={{ position: "relative", zIndex: 1, padding: "72px 0 88px", overflow: "hidden" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 6vw", position: "relative" }}>
        <div
          style={{
            position: "absolute",
            left: "-0.05em",
            top: "50%",
            transform: "translateY(-50%)",
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "clamp(110px,16vw,220px)",
            fontWeight: 700,
            fontStyle: "italic",
            color: "rgba(65,67,27,0.06)",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "none",
            whiteSpace: "nowrap",
            zIndex: 0,
          }}
        >
          Tools
        </div>

        <Reveal variant="zoom" style={{ textAlign: "center", marginBottom: 72, position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 14 }}>
            <div style={{ height: 1, width: 48, background: "rgba(174,183,132,.4)" }} />
            <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.22em", color: "#AEB784", fontWeight: 500 }}>
              Expertise
            </span>
            <div style={{ height: 1, width: 48, background: "rgba(174,183,132,.4)" }} />
          </div>

          <h2
            className="serif"
            style={{
              fontSize: "clamp(38px,5vw,68px)",
              fontWeight: 300,
              color: "#41431B",
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
            }}
          >
            Tools &amp; Capabilities
          </h2>
        </Reveal>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {TOOL_CATEGORIES.map((category, index) => (
          <Reveal
            key={category.id}
            delay={index * 0.12}
            variant={index % 2 === 0 ? "slideLeft" : "slideRight"}
          >
            <div
              style={{
                borderTop: index === 0 ? "1px solid rgba(210,205,175,.3)" : "none",
                borderBottom: "1px solid rgba(210,205,175,.3)",
                padding: "28px 0",
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: "clamp(160px,16vw,220px)",
                  padding: "0 clamp(20px,4vw,48px)",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  borderRight: "1px solid rgba(210,205,175,.3)",
                  marginRight: 32,
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    flexShrink: 0,
                    background: "rgba(174,183,132,.1)",
                    border: "1px solid rgba(174,183,132,.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {category.icon}
                </div>

                <h3
                  className="serif"
                  style={{
                    fontSize: "clamp(14px,1.4vw,18px)",
                    fontWeight: 600,
                    color: "#41431B",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.2,
                  }}
                >
                  {category.label}
                </h3>
              </div>

              <div style={{ flex: 1, overflow: "hidden" }}>
                <MarqueeRow tools={category.tools} speed={18 + index * 6} reverse={index === 1} />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
