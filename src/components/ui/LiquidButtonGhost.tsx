import { CSSProperties, ReactNode } from "react";
import { motion } from "framer-motion";

type LiquidButtonGhostProps = {
  children: ReactNode;
  onClick?: () => void;
  style?: CSSProperties;
};

export default function LiquidButtonGhost({
  children,
  onClick,
  style = {},
}: LiquidButtonGhostProps) {
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
        color: "#41431B",
        background: "rgba(248,243,225,0.45)",
        zIndex: 0,
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 100,
          zIndex: 0,
          backdropFilter: 'blur(14px) url("#liquid-glass") saturate(160%)',
          WebkitBackdropFilter: "blur(14px) saturate(160%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 100,
          boxShadow: `
            0 0 0 1px rgba(174,183,132,0.35) inset,
            0 1.5px 1px -1px rgba(255,255,255,0.6) inset,
            -1px -1px 1px -1px rgba(0,0,0,0.2) inset,
            0 0 6px 3px rgba(174,183,132,0.04) inset,
            0 4px 16px rgba(65,67,27,0.1),
            0 1px 4px rgba(65,67,27,0.08)
          `,
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <span style={{ position: "relative", zIndex: 2 }}>{children}</span>
    </motion.button>
  );
}
