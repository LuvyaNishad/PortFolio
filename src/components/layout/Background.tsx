import { useEffect, useRef } from "react";

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const target = useRef({ x: -999, y: -999 });
  const trail = useRef<any[]>([]);
  const rafRef = useRef<number | null>(null);
  const head = useRef({ x: -999, y: -999 });

  const TRAIL_LENGTH = 25;
  const MAX_AGE = 25;
  const LERP = 0.18;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    const draw = () => {
      const { width, height } = canvas;

      head.current.x += (target.current.x - head.current.x) * LERP;
      head.current.y += (target.current.y - head.current.y) * LERP;

      trail.current.push({
        x: head.current.x,
        y: head.current.y,
        age: 0,
      });

      trail.current = trail.current
        .map(p => ({ ...p, age: p.age + 1 }))
        .filter(p => p.age < MAX_AGE)
        .slice(-TRAIL_LENGTH);

      ctx.clearRect(0, 0, width, height);

      trail.current.forEach(p => {
        const life = 1 - p.age / MAX_AGE;
        const radius = 6 * life;

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(65,67,27,${life})`;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 50,
          pointerEvents: "none",
        }}
      />

      {/* simple background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "#F8F3E1",
          zIndex: 0,
        }}
      />
    </>
  );
}