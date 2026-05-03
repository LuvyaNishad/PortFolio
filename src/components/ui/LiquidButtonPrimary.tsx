import { CSSProperties, ReactNode } from "react";
import { motion } from "framer-motion";

type LiquidButtonPrimaryProps = {
  children: ReactNode;
  onClick?: () => void;
  style?: CSSProperties;
};

export default function LiquidButtonPrimary({
  children,
  onClick,
  style = {},
}: LiquidButtonPrimaryProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "13px 36px",
        borderRadius: 100,
        border: "none",
        cursor: "pointer",
        fontSize: 14,
        letterSpacing: "0.06em",
        fontWeight: 500,
        color: "var(--cream)",
        background: "linear-gradient(145deg,var(--olive-soft),#384A1E)",
        zIndex: "var(--z-background)",
        overflow: "visible",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 100,
          zIndex: "var(--z-background)",
          backdropFilter: 'url("#liquid-glass")',
          WebkitBackdropFilter: 'url("#liquid-glass")',
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 100,
          boxShadow: `
            0 0 0 1px rgba(255,255,255,0.22) inset,
            0 2px 1px -1px rgba(255,255,255,0.35) inset,
            -2px -2px 1px -2px rgba(0,0,0,0.55) inset,
            2px 2px 1px -2px rgba(0,0,0,0.45) inset,
            0 0 8px 4px rgba(0,0,0,0.08) inset,
            0 6px 24px rgba(65,67,27,0.32),
            0 2px 6px rgba(65,67,27,0.2)
          `,
          zIndex: "var(--z-content)",
          pointerEvents: "none",
        }}
      />
      <span style={{ position: "relative", zIndex: "var(--z-raised)" }}>{children}</span>
    </motion.button>
  );
}
