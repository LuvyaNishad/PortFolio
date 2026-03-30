import { ReactNode } from "react";
import Reveal from "../../ui/Reveal";
import SectionVines from "../../layout/SectionVines";

type WorkSectionProps = {
  id: string;
  label: string;
  title: string;
  italic: string;
  desc: string;
  accent: string;
  children: ReactNode;
  headingVariant?: "up" | "slideLeft" | "slideRight" | "zoom" | "fade";
  sectionNum?: string;
  padding?: string;
  titleWeight?: number;
  italicWeight?: number;
};

export default function WorkSection({
  id,
  label,
  title,
  italic,
  desc,
  accent,
  children,
  headingVariant = "slideLeft",
  sectionNum = "",
  padding = "120px 6vw",
  titleWeight = 600,
  italicWeight = 300,
}: WorkSectionProps) {
  return (
    <section id={id} style={{ position: "relative", zIndex: 1, padding, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(227,219,187,0.16) 0%, rgba(227,219,187,0.12) 42%, rgba(227,219,187,0.16) 100%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <SectionVines
          opacity={0.72}
          flip={sectionNum === "02" || sectionNum === "04"}
          dense={sectionNum === "03"}
          hero
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.45,
          }}
        >
          <SectionVines
            opacity={0.42}
            flip={sectionNum !== "02" && sectionNum !== "04"}
            dense={sectionNum === "03"}
            hero
          />
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "40vw",
          height: "40vw",
          background: `radial-gradient(ellipse,${accent} 0%,transparent 70%)`,
          filter: "blur(70px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {sectionNum && (
        <div
          style={{
            position: "absolute",
            left: "-0.02em",
            top: "50%",
            transform: "translateY(-50%)",
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "clamp(160px,22vw,300px)",
            fontWeight: 700,
            color: "rgba(65,67,27,0.035)",
            letterSpacing: "-0.06em",
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          {sectionNum}
        </div>
      )}

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Reveal variant={headingVariant} style={{ marginBottom: 56 }}>
          <div
            style={{
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              marginBottom: 14,
              fontWeight: 500,
              color: "#AEB784",
            }}
          >
            * {label}
          </div>

          <h2
            className="serif"
            style={{
              fontSize: "clamp(36px,4.2vw,68px)",
              fontWeight: titleWeight,
              color: "#41431B",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              marginBottom: 12,
            }}
          >
            {title}{" "}
            <span style={{ fontStyle: "italic", fontWeight: italicWeight, letterSpacing: "-0.01em" }}>
              {italic}
            </span>
          </h2>

          <p
            style={{
              fontSize: 14,
              color: "#6B6B4A",
              maxWidth: 440,
              lineHeight: 1.8,
              fontWeight: 400,
              letterSpacing: "0.005em",
            }}
          >
            {desc}
          </p>
        </Reveal>

        {children}
      </div>
    </section>
  );
}
