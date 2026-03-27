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
        zIndex: 9999,
        background: "linear-gradient(to right, rgba(174,183,132,0.4), #AEB784)",
        scaleX,
        transformOrigin: "left",
        pointerEvents: "none",
      }}
    />
  );
}
