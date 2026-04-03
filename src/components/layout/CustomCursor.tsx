import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement | null>(null);
  const ring = useRef<HTMLDivElement | null>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);
  const col = useRef({ r: 74, g: 92, b: 40 });

  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const supportsFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!supportsFinePointer) return undefined;

    const inDarkRef = { current: false };

    const onMove = (event: MouseEvent) => {
      mouse.current = { x: event.clientX, y: event.clientY };
      const target = event.target as HTMLElement | null;
      inDarkRef.current = Boolean(target?.closest?.("#contact, footer"));
      setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const onPointerOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      setHovered(Boolean(target?.closest?.("a,button,[data-cursor]")));
    };

    const dark = { r: 174, g: 183, b: 132 };
    const light = { r: 74, g: 92, b: 40 };

    const loop = () => {
      const inDark = inDarkRef.current;

      const target = inDark ? dark : light;
      col.current.r += (target.r - col.current.r) * 0.08;
      col.current.g += (target.g - col.current.g) * 0.08;
      col.current.b += (target.b - col.current.b) * 0.08;

      const rgb = `${Math.round(col.current.r)},${Math.round(col.current.g)},${Math.round(
        col.current.b
      )}`;

      pos.current.x += (mouse.current.x - pos.current.x) * 0.12;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.12;

      if (dot.current) {
        dot.current.style.transform = `translate(${mouse.current.x}px,${mouse.current.y}px) translate(-50%,-50%)`;
        dot.current.style.background = `rgb(${rgb})`;
      }

      if (ring.current) {
        ring.current.style.transform = `translate(${pos.current.x}px,${pos.current.y}px) translate(-50%,-50%)`;
        ring.current.style.borderColor = inDark ? `rgba(${rgb},0.65)` : `rgba(${rgb},0.45)`;
        ring.current.style.background = inDark ? `rgba(${rgb},0.08)` : "transparent";
      }

      raf.current = requestAnimationFrame(loop);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseover", onPointerOver);

    raf.current = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseover", onPointerOver);

      if (raf.current !== null) {
        cancelAnimationFrame(raf.current);
      }
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "rgb(74,92,40)",
          pointerEvents: "none",
          willChange: "transform",
          opacity: visible ? 1 : 0,
          transition: "opacity .3s",
        }}
      />

      <div
        ref={ring}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9998,
          width: hovered ? 52 : 36,
          height: hovered ? 52 : 36,
          borderRadius: "50%",
          border: "1.5px solid rgba(74,92,40,0.45)",
          background: "transparent",
          pointerEvents: "none",
          willChange: "transform",
          opacity: visible ? 1 : 0,
          transition:
            "opacity .3s, width .35s cubic-bezier(.22,1,.36,1), height .35s cubic-bezier(.22,1,.36,1)",
        }}
      />
    </>
  );
}
