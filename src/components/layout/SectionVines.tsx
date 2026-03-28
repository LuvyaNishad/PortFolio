import FloatingLines from "../ui/FloatingLines";

type SectionVinesProps = {
  opacity?: number;
  flip?: boolean;
  dense?: boolean;
  dark?: boolean;
};

export default function SectionVines({
  opacity = 0.34,
  flip = false,
  dense = false,
  dark = false,
}: SectionVinesProps) {
  const basePalette = dark
    ? ["#F1EBCF", "#DCE4B5", "#BFC98E", "#8FA15C"]
    : ["#1F260E", "#2B3514", "#3A481B", "#5B6F2E"];
  const accentPalette = dark
    ? null
    : ["#141A09", "#1E260D", "#293614", "#3A4A1E"];

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
        opacity,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "-7% -4%",
          transform: flip ? "scaleX(-1)" : "none",
          transformOrigin: "center",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.88) 10%, rgba(0,0,0,0.88) 90%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.88) 10%, rgba(0,0,0,0.88) 90%, transparent 100%)",
        }}
      >
        <FloatingLines
          linesGradient={basePalette}
          enabledWaves={["top", "middle", "bottom"]}
          lineCount={dense ? [10, 16, 12] : [7, 11, 8]}
          lineDistance={dense ? [7, 5, 5] : [8, 6, 6]}
          topWavePosition={{ x: 8.4, y: 1.18, rotate: -0.22 }}
          middleWavePosition={{ x: 4.7, y: 0.02, rotate: 0.12 }}
          bottomWavePosition={{ x: 1.6, y: -0.88, rotate: -0.14 }}
          animationSpeed={0.82}
          interactive
          bendRadius={3.8}
          bendStrength={dark ? -0.12 : -0.2}
          mouseDamping={0.04}
          parallax
          parallaxStrength={0.06}
          mixBlendMode={dark ? "screen" : "multiply"}
          opacity={dark ? 0.95 : 1.15}
        />

        {!dark && accentPalette && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: dense ? 0.62 : 0.5,
            }}
          >
            <FloatingLines
              linesGradient={accentPalette}
              enabledWaves={["middle", "bottom"]}
              lineCount={dense ? [0, 8, 6] : [0, 6, 4]}
              lineDistance={dense ? [0, 4, 4] : [0, 5, 5]}
              topWavePosition={{ x: 8.4, y: 1.18, rotate: -0.22 }}
              middleWavePosition={{ x: 5.15, y: 0.08, rotate: 0.17 }}
              bottomWavePosition={{ x: 1.95, y: -0.8, rotate: -0.1 }}
              animationSpeed={0.74}
              interactive
              bendRadius={3.2}
              bendStrength={-0.16}
              mouseDamping={0.04}
              parallax
              parallaxStrength={0.045}
              mixBlendMode="multiply"
              opacity={1.1}
            />
          </div>
        )}
      </div>
    </div>
  );
}
