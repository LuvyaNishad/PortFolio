import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789*";

type SLabelProps = {
  children: string;
};

export default function SLabel({ children }: SLabelProps) {
  const [display, setDisplay] = useState(children.toUpperCase());
  const rafRef = useRef<number | null>(null);

  const scramble = () => {
    const target = children.toUpperCase();
    let iteration = 0;

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    const tick = () => {
      setDisplay(
        target
          .split("")
          .map((char, index) => {
            if (index < iteration) return char;
            if (char === " ") return " ";
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration < target.length) {
        iteration += 0.4;
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(target);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      onMouseEnter={scramble}
      style={{
        fontSize: 11,
        textTransform: "uppercase",
        letterSpacing: "0.18em",
        marginBottom: 14,
        fontWeight: 500,
        cursor: "default",
        userSelect: "none",
        fontFamily: "'DM Sans', monospace",
        display: "flex",
        alignItems: "center",
        gap: 6,
      }}
    >
      <span style={{ color: "var(--olive)", fontSize: 9 }}>*</span>
      <span style={{ color: "var(--sage)" }}>{display}</span>
    </div>
  );
}
