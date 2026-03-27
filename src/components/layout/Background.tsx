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
        <div style={{ position: "absolute", inset: 0, background: "#F0EDD8" }} />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(
              135deg,
              #F8F3E1 0%,
              rgba(174,183,132,0.80) 18%,
              rgba(248,243,225,0.90) 32%,
              rgba(227,219,187,0.85) 48%,
              rgba(174,183,132,0.70) 62%,
              rgba(248,243,225,0.95) 76%,
              rgba(227,219,187,0.80) 88%,
              #F0EDD8 100%
            )`,
            backgroundSize: "300% 300%",
            animation: "meshShift 22s ease-in-out infinite",
            mixBlendMode: "normal",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: "90vw",
            height: "80vw",
            top: "-20%",
            left: "-20%",
            background:
              "radial-gradient(ellipse 60% 55% at 45% 50%, rgba(174,183,132,0.72) 0%, transparent 70%)",
            filter: "blur(55px)",
            animation: "fold1 19s ease-in-out infinite",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: "85vw",
            height: "90vw",
            top: "35%",
            left: "30%",
            background:
              "radial-gradient(ellipse 55% 60% at 50% 45%, rgba(227,219,187,0.78) 0%, transparent 70%)",
            filter: "blur(60px)",
            animation: "fold2 24s ease-in-out infinite",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: "70vw",
            height: "65vw",
            top: "15%",
            left: "25%",
            background:
              "radial-gradient(ellipse 58% 52% at 48% 52%, rgba(174,183,132,0.60) 0%, transparent 68%)",
            filter: "blur(48px)",
            animation: "fold3 15s ease-in-out infinite",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: "75vw",
            height: "70vw",
            top: "-10%",
            left: "45%",
            background:
              "radial-gradient(ellipse 52% 58% at 52% 48%, rgba(227,219,187,0.68) 0%, transparent 70%)",
            filter: "blur(52px)",
            animation: "fold4 20s ease-in-out infinite",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: "80vw",
            height: "75vw",
            top: "55%",
            left: "-15%",
            background:
              "radial-gradient(ellipse 56% 54% at 46% 54%, rgba(174,183,132,0.65) 0%, transparent 72%)",
            filter: "blur(58px)",
            animation: "fold5 28s ease-in-out infinite",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: "65vw",
            height: "60vw",
            top: "30%",
            left: "55%",
            background:
              "radial-gradient(ellipse 54% 56% at 50% 50%, rgba(227,219,187,0.70) 0%, transparent 68%)",
            filter: "blur(45px)",
            animation: "fold6 17s ease-in-out infinite",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(
              ellipse 75% 65% at 50% 45%,
              rgba(248,243,225,0.50) 0%,
              transparent 75%
            )`,
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.03,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>
    </>
  );
}
