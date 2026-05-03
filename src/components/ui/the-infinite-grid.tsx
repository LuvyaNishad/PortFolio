import React, { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";

type InfiniteGridProps = {
  className?: string;
  cellSize?: number;
  speedX?: number;
  speedY?: number;
  revealRadius?: number;
  baseOpacity?: number;
  activeOpacity?: number;
  lineColor?: string;
  accentA?: string;
  accentB?: string;
  accentC?: string;
};

export function Component({
  className,
  cellSize = 44,
  speedX = 0.22,
  speedY = 0.16,
  revealRadius = 190,
  baseOpacity = 0.16,
  activeOpacity = 0.88,
  lineColor = "rgba(45, 48, 16, 0.68)",
  accentA = "rgba(174, 183, 132, 0.18)",
  accentB = "rgba(126, 142, 82, 0.12)",
  accentC = "rgba(227, 219, 187, 0.22)",
}: InfiniteGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const hoverOpacity = useTransform(mouseX, (value) => (value <= 0 ? 0 : activeOpacity));

  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    mouseX.set(rect.width * 0.5);
    mouseY.set(rect.height * 0.38);
  }, [mouseX, mouseY]);

  useAnimationFrame(() => {
    gridOffsetX.set((gridOffsetX.get() + speedX) % cellSize);
    gridOffsetY.set((gridOffsetY.get() + speedY) % cellSize);
  });

  const maskImage = useMotionTemplate`radial-gradient(${revealRadius}px circle at ${mouseX}px ${mouseY}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.98) 26%, rgba(0,0,0,0.64) 48%, rgba(0,0,0,0.22) 68%, transparent 84%)`;

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn("relative w-full h-full overflow-hidden", className)}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `
              radial-gradient(circle at 14% 18%, ${accentA}, transparent 24%),
              radial-gradient(circle at 82% 14%, ${accentB}, transparent 28%),
              radial-gradient(circle at 22% 78%, ${accentC}, transparent 22%)
            `,
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: baseOpacity,
        }}
      >
        <GridPattern
          cellSize={cellSize}
          lineColor={lineColor}
          offsetX={gridOffsetX}
          offsetY={gridOffsetY}
        />
      </div>

      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          opacity: hoverOpacity,
          maskImage,
          WebkitMaskImage: maskImage,
          filter: "drop-shadow(0 0 22px rgba(72, 84, 28, 0.18))",
        }}
      >
        <GridPattern
          cellSize={cellSize}
          lineColor={lineColor}
          offsetX={gridOffsetX}
          offsetY={gridOffsetY}
        />
      </motion.div>
    </div>
  );
}

type GridPatternProps = {
  cellSize: number;
  lineColor: string;
  offsetX: ReturnType<typeof useMotionValue<number>>;
  offsetY: ReturnType<typeof useMotionValue<number>>;
};

function GridPattern({ cellSize, lineColor, offsetX, offsetY }: GridPatternProps) {
  return (
    <svg style={{ width: "100%", height: "100%", color: lineColor }}>
      <defs>
        <motion.pattern
          id="grid-pattern"
          width={cellSize}
          height={cellSize}
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <path
            d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.22"
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
    </svg>
  );
}

export default Component;
