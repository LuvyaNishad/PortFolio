import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: "var(--z-cursor)",
        background: "linear-gradient(to right, rgba(var(--sage-r), var(--sage-g), var(--sage-b), 0.4), var(--sage))",
        scaleX,
        transformOrigin: "left",
        pointerEvents: "none",
      }}
    />
  );
}
