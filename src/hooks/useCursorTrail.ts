import { RefObject, useEffect, useRef } from "react";

type CursorTrailOptions = {
  trailLength?: number;
  maxAge?: number;
  baseRadius?: number;
  lerp?: number;
};

type Particle = {
  x: number;
  y: number;
  age: number;
  size: number;
  r: number;
  g: number;
  b: number;
};

export default function useCursorTrail(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  options: CursorTrailOptions = {}
) {
  const target = useRef({ x: -999, y: -999 });
  const trail = useRef<Particle[]>([]);
  const rafRef = useRef<number | null>(null);
  const head = useRef({ x: -999, y: -999 });
  const trailColor = useRef({ r: 65, g: 67, b: 27 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colLight = { r: 65, g: 67, b: 27 };
    const colDark = { r: 174, g: 183, b: 132 };

    const trailLength = options.trailLength ?? 28;
    const maxAge = options.maxAge ?? 28;
    const baseRadius = options.baseRadius ?? 7;
    const lerp = options.lerp ?? 0.18;

    const onMove = (event: MouseEvent) => {
      target.current = { x: event.clientX, y: event.clientY };
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      if (head.current.x < 0) {
        head.current = { x: canvas.width / 2, y: canvas.height / 2 };
        target.current = { ...head.current };
      }
    };

    const draw = () => {
      const { width, height } = canvas;

      const element = document.elementFromPoint(target.current.x, target.current.y);
      const inDark =
        element?.closest?.("#contact, #contact *") !== null &&
        element?.closest?.("#contact") !== null;

      const targetColor = inDark ? colDark : colLight;
      trailColor.current.r += (targetColor.r - trailColor.current.r) * 0.06;
      trailColor.current.g += (targetColor.g - trailColor.current.g) * 0.06;
      trailColor.current.b += (targetColor.b - trailColor.current.b) * 0.06;

      const { r, g, b } = trailColor.current;

      head.current.x += (target.current.x - head.current.x) * lerp;
      head.current.y += (target.current.y - head.current.y) * lerp;

      trail.current.push({
        x: head.current.x,
        y: head.current.y,
        age: 0,
        size: baseRadius,
        r,
        g,
        b,
      });

      trail.current = trail.current
        .map((particle) => ({ ...particle, age: particle.age + 1 }))
        .filter((particle) => particle.age < maxAge)
        .slice(-trailLength);

      ctx.clearRect(0, 0, width, height);

      trail.current.forEach((particle) => {
        const life = 1 - particle.age / maxAge;
        const radius = particle.size * (0.3 + life * 0.7);
        const alpha = life * life * 0.55;
        const blur = (1 - life) * 12;

        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          radius * 3.5
        );

        gradient.addColorStop(
          0,
          `rgba(${particle.r},${particle.g},${particle.b},${(alpha * 1.8).toFixed(3)})`
        );
        gradient.addColorStop(
          0.4,
          `rgba(${particle.r},${particle.g},${particle.b},${(alpha * 0.9).toFixed(3)})`
        );
        gradient.addColorStop(1, `rgba(${particle.r},${particle.g},${particle.b},0)`);

        ctx.save();
        if (blur > 0.5) ctx.filter = `blur(${blur.toFixed(1)}px)`;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, radius * 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", resize, { passive: true });

    resize();
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [canvasRef, options.baseRadius, options.lerp, options.maxAge, options.trailLength]);
}
