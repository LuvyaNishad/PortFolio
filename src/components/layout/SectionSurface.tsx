import SectionAmbient from "./SectionAmbient";
import SectionVines from "./SectionVines";

type SectionSurfaceProps = {
  dense?: boolean;
  flip?: boolean;
  accent?: string;
};

export default function SectionSurface({
  dense = false,
  flip = false,
  accent = "rgba(174,183,132,.18)",
}: SectionSurfaceProps) {
  return (
    <>
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

      <SectionAmbient />

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <SectionVines opacity={0.72} dense={dense} flip={flip} hero />
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.45,
          }}
        >
          <SectionVines opacity={0.42} dense={dense} flip={!flip} hero />
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
    </>
  );
}
