import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type LoaderProps = {
  onDone: () => void;
};

export default function Loader({ onDone }: LoaderProps) {
  const [phase, setPhase] = useState(0);
  const [count, setCount] = useState(0);

  const letters = "AURELIUS".split("");

  useEffect(() => {
    const t1 = window.setTimeout(() => setPhase(1), 700);
    const t2 = window.setTimeout(() => setPhase(2), 1900);
    const t3 = window.setTimeout(() => {
      setPhase(3);
      onDone();
    }, 2750);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [onDone]);

  useEffect(() => {
    if (phase !== 1) return;

    let value = 0;

    const interval = window.setInterval(() => {
      value += Math.ceil(Math.random() * 6);

      if (value >= 100) {
        setCount(100);
        window.clearInterval(interval);
      } else {
        setCount(value);
      }
    }, 14);

    return () => window.clearInterval(interval);
  }, [phase]);

  return (
    <AnimatePresence>
      {phase < 3 && (
        <>
          <motion.div
            key="top"
            initial={{ y: 0 }}
            animate={{ y: phase === 2 ? "-100%" : 0 }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              height: "50vh",
              zIndex: 9001,
              background: "#41431B",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0.06,
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              }}
            />

            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse 80% 120% at 50% 100%, rgba(174,183,132,0.12) 0%, transparent 70%)",
              }}
            />

            <div
              style={{
                display: "flex",
                gap: "0.06em",
                zIndex: 1,
                paddingBottom: 8,
                overflow: "hidden",
              }}
            >
              {letters.map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="serif"
                  style={{
                    fontSize: "clamp(40px,7.5vw,80px)",
                    fontWeight: 700,
                    color: "#F8F3E1",
                    letterSpacing: "0.08em",
                    lineHeight: 1,
                    display: "inline-block",
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            key="bottom"
            initial={{ y: 0 }}
            animate={{ y: phase === 2 ? "100%" : 0 }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              height: "50vh",
              zIndex: 9001,
              background: "#41431B",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0.06,
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              }}
            />

            <div
              style={{
                zIndex: 1,
                paddingTop: 8,
                display: "flex",
                alignItems: "center",
                gap: 32,
                overflow: "hidden",
                width: "clamp(280px,60vw,680px)",
                justifyContent: "space-between",
              }}
            >
              <div style={{ overflow: "hidden", flex: 1 }}>
                <motion.div
                  initial={{ x: "-101%" }}
                  animate={{ x: phase >= 1 ? "0%" : "-101%" }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.26em",
                    textTransform: "uppercase",
                    color: "rgba(174,183,132,0.7)",
                    fontFamily: "'DM Sans',sans-serif",
                    whiteSpace: "nowrap",
                  }}
                >
                  Visual Designer &amp; Developer
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: phase >= 1 ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="serif"
                style={{
                  fontSize: "clamp(28px,3.5vw,38px)",
                  fontWeight: 300,
                  color: "rgba(174,183,132,0.55)",
                  letterSpacing: "-0.02em",
                  flexShrink: 0,
                }}
              >
                {String(count).padStart(3, "0")}
              </motion.div>
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: phase >= 1 ? 1 : 0 }}
              transition={{ duration: 1.15, ease: "linear" }}
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                height: 1.5,
                width: "100%",
                background: "rgba(174,183,132,0.35)",
                transformOrigin: "left",
              }}
            />
          </motion.div>

          <motion.div
            key="seam"
            animate={{ opacity: phase === 2 ? 0 : 1 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              top: "50%",
              left: 0,
              right: 0,
              height: 1,
              zIndex: 9002,
              background: "rgba(174,183,132,0.2)",
              transform: "translateY(-0.5px)",
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
}
