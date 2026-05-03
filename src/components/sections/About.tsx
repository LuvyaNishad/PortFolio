import Reveal from "../ui/Reveal";
import SLabel from "../ui/SLabel";

export default function About() {
  return (
    <section
      id="about"
      style={{ position: "relative", zIndex: "var(--z-content)", padding: "160px 6vw 140px", overflow: "hidden" }}
    >
      <div
        style={{
          position: "absolute",
          right: "-0.04em",
          top: "50%",
          transform: "translateY(-50%)",
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: "clamp(130px,20vw,280px)",
          fontWeight: 700,
          fontStyle: "italic",
          color: "rgba(65,67,27,0.06)",
          letterSpacing: "-0.04em",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          whiteSpace: "nowrap",
          zIndex: "var(--z-background)",
        }}
      >
        About
      </div>

      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "center",
          position: "relative",
          zIndex: "var(--z-content)",
        }}
      >
        <Reveal variant="slideLeft">
          <div
            className="matte"
            style={{
              borderRadius: 32,
              aspectRatio: "4/5",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              background: "linear-gradient(160deg,rgba(174,183,132,.22) 0%,rgba(227,219,187,.18) 100%)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background: "rgba(174,183,132,.15)",
                  border: "1.5px dashed rgba(174,183,132,.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 44,
                }}
              >
                You
              </div>
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(174,183,132,.5)",
                }}
              >
                Your photo here
              </span>
            </div>

            {[
              { label: "Video & Thumbnails", top: "14%" },
              { label: "Graphic Design", top: "44%" },
              { label: "Web Development", top: "74%" },
            ].map(({ label, top }) => (
              <div
                key={label}
                className="glass"
                style={{
                  position: "absolute",
                  top,
                  right: -12,
                  borderRadius: 100,
                  padding: "7px 16px",
                  fontSize: 11,
                  fontWeight: 500,
                  color: "var(--olive-soft)",
                  letterSpacing: "0.06em",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15} variant="slideRight">
          <SLabel>About</SLabel>

          <h2
            className="serif"
            style={{
              fontSize: "clamp(36px,3.8vw,50px)",
              fontWeight: 300,
              color: "var(--olive)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: 28,
            }}
          >
            Most creators have great work.
            <br />
            <em style={{ fontStyle: "italic", color: "var(--sage)", letterSpacing: "-0.01em" }}>
              Not enough people see it.
            </em>
          </h2>

          <Reveal delay={0.3} variant="fade">
            <div
              style={{
                borderLeft: "2px solid rgba(174,183,132,0.6)",
                paddingLeft: 20,
                marginBottom: 24,
                marginLeft: 2,
              }}
            >
              <p
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "clamp(18px,1.8vw,21px)",
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: "var(--olive-soft)",
                  lineHeight: 1.55,
                  letterSpacing: "0.01em",
                }}
              >
                "One person who takes your idea all the way - thumbnail to edit to site."
              </p>
            </div>
          </Reveal>

          <p
            style={{
              fontSize: 15,
              color: "var(--olive-muted)",
              lineHeight: 1.9,
              fontWeight: 400,
              marginBottom: 14,
              letterSpacing: "0.005em",
            }}
          >
            I'm a designer, editor, and developer who specialises in making creators impossible to
            scroll past. Whether you need a thumbnail that doubles your CTR, an edit that holds
            attention to the end, or a site that turns visitors into clients, I handle the whole
            creative pipeline.
          </p>

          <p
            style={{
              fontSize: 15,
              color: "#9A9878",
              lineHeight: 1.9,
              fontWeight: 400,
              marginBottom: 36,
              letterSpacing: "0.005em",
            }}
          >
            Based in your city. Working with creators, studios, and brands worldwide.
          </p>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {["YouTube & Social", "Brand Identity", "Motion & Editing", "React / Next.js", "Figma to Code"].map(
              (tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 11.5,
                    padding: "6px 16px",
                    borderRadius: 100,
                    fontWeight: 500,
                    background: "rgba(174,183,132,0.18)",
                    border: "1px solid rgba(174,183,132,0.35)",
                    color: "var(--olive-soft)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
