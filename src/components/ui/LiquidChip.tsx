import { ReactNode } from "react";
import { motion } from "framer-motion";

type LiquidChipProps = {
  children: ReactNode;
  onClick?: () => void;
};

export default function LiquidChip({ children, onClick }: LiquidChipProps) {
  return (
    <motion.span
      whileHover={{ scale: 1.06, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px 24px",
        borderRadius: 100,
        cursor: "pointer",
        fontSize: 12,
        letterSpacing: "0.09em",
        textTransform: "uppercase",
        fontWeight: 500,
        color: "var(--olive-soft)",
        background: "rgba(var(--cream-r), var(--cream-g), var(--cream-b), 0.38)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 100,
          backdropFilter: 'blur(12px) url("#liquid-glass") saturate(140%)',
          WebkitBackdropFilter: "blur(12px) saturate(140%)",
          zIndex: "var(--z-background)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 100,
          boxShadow: `
            0 0 0 1px rgba(174,183,132,0.3) inset,
            0 1px 1px -0.5px rgba(255,255,255,0.55) inset,
            0 4px 14px rgba(65,67,27,0.08),
            0 1px 3px rgba(65,67,27,0.06)
          `,
          zIndex: "var(--z-content)",
          pointerEvents: "none",
        }}
      />
      <span style={{ position: "relative", zIndex: "var(--z-raised)" }}>{children}</span>
    </motion.span>
  );
}
