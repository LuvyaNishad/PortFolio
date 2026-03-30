import FloatingLines from "../ui/FloatingLines";

type SectionVinesProps = {
  opacity?: number;
  flip?: boolean;
  dense?: boolean;
  dark?: boolean;
  hero?: boolean;
};

export default function SectionVines({
  opacity = 0.34,
  flip = false,
  dense = false,
  dark = false,
  hero = false,
}: SectionVinesProps) {
  const basePalette = dark
    ? ["#F1EBCF", "#DCE4B5", "#BFC98E", "#8FA15C"]
    : hero
      ? ["#0F1607", "#1A240C", "#2B3A14", "#3E5320"]
      : ["#19210C", "#243113", "#31421A", "#415523"];
  const accentPalette = dark
    ? null
    : hero
      ? ["#5A7F2A", "#74A238", "#92C64A", "#B0E460"]
      : ["#42581E", "#557227", "#6A8B34", "#7EA243"];

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
          filter: dark
            ? "none"
            : hero
              ? "drop-shadow(0 0 12px rgba(106,156,58,0.35)) drop-shadow(0 0 26px rgba(106,156,58,0.2))"
              : "drop-shadow(0 0 10px rgba(65,85,35,0.24)) drop-shadow(0 0 24px rgba(65,85,35,0.14))",
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
          bendStrength={dark ? -0.12 : -0.24}
          mouseDamping={0.04}
          parallax
          parallaxStrength={0.06}
          mixBlendMode={dark ? "screen" : "multiply"}
          opacity={dark ? 0.95 : 1.42}
        />

        {!dark && accentPalette && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: dense ? 0.92 : 0.78,
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
              bendStrength={-0.2}
              mouseDamping={0.04}
              parallax
              parallaxStrength={0.045}
              mixBlendMode="screen"
              opacity={1.4}
            />
          </div>
        )}
      </div>
    </div>
  );
}
