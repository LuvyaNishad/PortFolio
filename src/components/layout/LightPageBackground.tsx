import SectionAmbient from "./SectionAmbient";
import InfiniteGrid from "../ui/the-infinite-grid";

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

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity: 0.95,
        }}
      >
        <InfiniteGrid
          cellSize={46}
          speedX={0.18}
          speedY={0.14}
          revealRadius={320}
          baseOpacity={0.085}
          activeOpacity={0.26}
          lineColor="rgba(65, 67, 27, 0.34)"
          accentA="rgba(174, 183, 132, 0.12)"
          accentB="rgba(126, 142, 82, 0.08)"
          accentC="rgba(227, 219, 187, 0.14)"
        />
      </div>

      <SectionAmbient leftWidth="42vw" leftHeight="42vw" rightWidth="36vw" rightHeight="36vw" />
    </div>
  );
}
