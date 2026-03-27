import { ReactNode, CSSProperties, useRef } from "react";
import { motion, useInView } from "framer-motion";

type RevealVariant = "up" | "slideLeft" | "slideRight" | "zoom" | "fade";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  variant?: RevealVariant;
  style?: CSSProperties;
};

export const REVEAL_VARIANTS = {
  up: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  zoom: {
    hidden: { opacity: 0, scale: 0.88 },
    visible: { opacity: 1, scale: 1 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

export default function Reveal({
  children,
  delay = 0,
  variant = "up",
  style = {},
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const selected = REVEAL_VARIANTS[variant] ?? REVEAL_VARIANTS.up;

  return (
    <motion.div
      ref={ref}
      style={style}
      initial={selected.hidden}
      animate={inView ? selected.visible : selected.hidden}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
