import SectionAmbient from "./SectionAmbient";
import SectionVines from "./SectionVines";

type LightSectionBackdropProps = {
  dense?: boolean;
  flip?: boolean;
  includeAmbient?: boolean;
  topBlend?: boolean;
};

export default function LightSectionBackdrop({
  dense = false,
  flip = false,
  includeAmbient = true,
  topBlend = false,
}: LightSectionBackdropProps) {
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

      {topBlend && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: -90,
            height: 180,
            background:
              "linear-gradient(180deg, rgba(174,183,132,0.2) 0%, rgba(174,183,132,0.08) 48%, transparent 100%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      )}

      {includeAmbient && <SectionAmbient />}

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
    </>
  );
}
