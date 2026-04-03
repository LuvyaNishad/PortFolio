import SectionAmbient from "./SectionAmbient";
import SectionVines from "./SectionVines";

export default function LightPageBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
        isolation: "isolate",
      }}
    >
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

      <SectionAmbient leftWidth="42vw" leftHeight="42vw" rightWidth="36vw" rightHeight="36vw" />

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <SectionVines
          opacity={0.72}
          hero
          interactive={false}
          parallax={false}
          showAccent={true}
          pixelRatioCap={1}
        />
      </div>
    </div>
  );
}
