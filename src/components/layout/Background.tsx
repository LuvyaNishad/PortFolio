import { useRef } from "react";
import useCursorTrail from "../../hooks/useCursorTrail";

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useCursorTrail(canvasRef);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 50,
          pointerEvents: "none",
          mixBlendMode: "normal",
        }}
      />

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `
              radial-gradient(circle at 12% 18%, rgba(174,183,132,0.16), transparent 24%),
              radial-gradient(circle at 82% 14%, rgba(126,142,82,0.08), transparent 28%),
              radial-gradient(circle at 22% 78%, rgba(227,219,187,0.45), transparent 22%),
              linear-gradient(180deg, #f7f2df 0%, #f2ecd5 42%, #ece5cc 100%)
            `,
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.025) 30%, rgba(94,107,55,0.02) 55%, rgba(255,255,255,0.05) 100%)",
            opacity: 0.75,
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.07,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at top center, rgba(248,243,225,0.18) 0%, rgba(248,243,225,0.02) 40%, transparent 70%)",
          }}
        />

      </div>
    </>
  );
}
