import { useState, type ReactNode } from "react";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import LiquidButtonPrimary from "../ui/LiquidButtonPrimary";
import LiquidButtonGhost from "../ui/LiquidButtonGhost";
import { sr } from "../../lib/utils";

type AppIcon = {
  id: string;
  icon: ReactNode;
};

const APP_ICONS: AppIcon[] = [
  {
    id: "premiere",
    icon: (
      <svg viewBox="0 0 50 50" width="44" height="44">
        <rect width="50" height="50" rx="10" fill="#0d0030" />
        <text x="6" y="36" fontSize="26" fontWeight="900" fill="#9999FF" fontFamily="'Arial Black',sans-serif">
          Pr
        </text>
      </svg>
    ),
  },
  {
    id: "photoshop",
    icon: (
      <svg viewBox="0 0 50 50" width="44" height="44">
        <rect width="50" height="50" rx="10" fill="#001e36" />
        <text x="5" y="36" fontSize="26" fontWeight="900" fill="#31A8FF" fontFamily="'Arial Black',sans-serif">
          Ps
        </text>
      </svg>
    ),
  },
  {
    id: "figma",
    icon: (
      <svg viewBox="0 0 50 50" width="44" height="44">
        <rect width="50" height="50" rx="10" fill="#1e1e1e" />
        <rect x="17" y="8" width="9" height="9" rx="3" fill="#FF7262" />
        <rect x="26" y="8" width="9" height="9" rx="4.5" fill="#FF7262" />
        <rect x="17" y="17" width="9" height="9" rx="3" fill="#A259FF" />
        <rect x="17" y="26" width="9" height="9" rx="3" fill="#0ACF83" />
        <circle cx="30.5" cy="30.5" r="4.5" fill="#1ABCFE" />
        <rect x="26" y="17" width="9" height="9" rx="4.5" fill="#1ABCFE" />
      </svg>
    ),
  },
  {
    id: "vscode",
    icon: (
      <svg viewBox="0 0 50 50" width="44" height="44">
        <rect width="50" height="50" rx="10" fill="#1e1e2e" />
        <path d="M10 17l10 8-10 8V17zm0 0l20-9 5 3-15 6M10 33l20 9 5-3-15-6M35 8l5 3v18l-5 3V8z" fill="#007ACC" fillOpacity=".9" />
        <path d="M35 8l5 3-20 14L10 17l15-6 10-3zm0 26l5-3-20-14-10 8 15 6 10 3z" fill="#1BA1E2" fillOpacity=".7" />
      </svg>
    ),
  },
  {
    id: "github",
    icon: (
      <svg viewBox="0 0 50 50" width="44" height="44">
        <rect width="50" height="50" rx="10" fill="#24292e" />
        <path fillRule="evenodd" clipRule="evenodd" d="M25 10C17.27 10 11 16.27 11 24c0 6.19 4.01 11.44 9.57 13.29.7.13.96-.3.96-.68v-2.38c-3.89.85-4.71-1.87-4.71-1.87-.64-1.62-1.56-2.05-1.56-2.05-1.27-.87.1-.85.1-.85 1.4.1 2.14 1.44 2.14 1.44 1.25 2.14 3.27 1.52 4.07 1.16.13-.9.49-1.52.89-1.87-3.1-.35-6.36-1.55-6.36-6.9 0-1.52.54-2.77 1.44-3.75-.14-.35-.62-1.77.14-3.7 0 0 1.18-.38 3.85 1.44A13.38 13.38 0 0125 17.96c1.19.01 2.39.16 3.51.47 2.68-1.82 3.85-1.44 3.85-1.44.76 1.93.28 3.35.14 3.7.9.98 1.44 2.23 1.44 3.75 0 5.37-3.27 6.55-6.39 6.89.5.43.95 1.29.95 2.6v3.85c0 .38.25.82.96.68C33.99 35.44 38 30.18 38 24c0-7.73-6.27-14-13-14z" fill="white" />
      </svg>
    ),
  },
  {
    id: "aftereffects",
    icon: (
      <svg viewBox="0 0 50 50" width="44" height="44">
        <rect width="50" height="50" rx="10" fill="#0d0030" />
        <text x="5" y="36" fontSize="26" fontWeight="900" fill="#9999FF" fontFamily="'Arial Black',sans-serif">
          Ae
        </text>
      </svg>
    ),
  },
  {
    id: "davinci",
    icon: (
      <svg viewBox="0 0 50 50" width="44" height="44">
        <rect width="50" height="50" rx="10" fill="#1a1a1a" />
        <circle cx="25" cy="25" r="12" stroke="#E8A020" strokeWidth="2.5" fill="none" />
        <circle cx="25" cy="25" r="5" fill="#E8A020" />
        <circle cx="25" cy="13" r="2" fill="#E8A020" />
        <circle cx="25" cy="37" r="2" fill="#E8A020" />
        <circle cx="13" cy="25" r="2" fill="#E8A020" />
        <circle cx="37" cy="25" r="2" fill="#E8A020" />
      </svg>
    ),
  },
  {
    id: "illustrator",
    icon: (
      <svg viewBox="0 0 50 50" width="44" height="44">
        <rect width="50" height="50" rx="10" fill="#330000" />
        <text x="5" y="36" fontSize="26" fontWeight="900" fill="#FF9A00" fontFamily="'Arial Black',sans-serif">
          Ai
        </text>
      </svg>
    ),
  },
];

const ICON_ZONES = [
  { xMin: 0.5, xMax: 0.9, yMin: 0.02, yMax: 0.1 },
  { xMin: 0.55, xMax: 0.88, yMin: 0.08, yMax: 0.14 },
  { xMin: 0.02, xMax: 0.2, yMin: 0.15, yMax: 0.22 },
  { xMin: 0.72, xMax: 0.92, yMin: 0.27, yMax: 0.34 },
  { xMin: 0.04, xMax: 0.18, yMin: 0.38, yMax: 0.45 },
  { xMin: 0.75, xMax: 0.94, yMin: 0.52, yMax: 0.6 },
  { xMin: 0.02, xMax: 0.16, yMin: 0.64, yMax: 0.72 },
  { xMin: 0.78, xMax: 0.94, yMin: 0.78, yMax: 0.86 },
];

function FloatingIcon({ icon, index }: { icon: AppIcon; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [ready, setReady] = useState(false);
  const [dragging, setDragging] = useState(false);

  const duration = 3.5 + sr(index * 1.7) * 3;
  const ampX = 6 + sr(index * 3.1) * 9;
  const ampY = 8 + sr(index * 2.3) * 12;
  const rotate = (sr(index * 4.7) - 0.5) * 10;
  const delay = sr(index * 5.9) * duration;

  useState(() => {
    if (typeof window !== "undefined") {
      const vw = window.innerWidth;
      const docH = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        window.innerHeight * 8
      );
      const zone = ICON_ZONES[index] ?? ICON_ZONES[0];
      const px = vw * (zone.xMin + sr(index * 7.3) * (zone.xMax - zone.xMin));
      const py = docH * (zone.yMin + sr(index * 3.7) * (zone.yMax - zone.yMin));
      x.set(px);
      y.set(py);
      setReady(true);
    }
  });

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      style={{
        x,
        y,
        position: "absolute",
        top: 0,
        left: 0,
        cursor: "grab",
        userSelect: "none",
        touchAction: "none",
        opacity: ready ? 1 : 0,
        zIndex: dragging ? 100 : 3,
      }}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      whileDrag={{ scale: 1.12, filter: "drop-shadow(0 14px 28px rgba(0,0,0,0.35))" }}
    >
      <motion.div
        animate={
          dragging
            ? { x: 0, y: 0, rotate: 0 }
            : {
                x: [0, ampX, ampX * 0.3, -ampX * 0.6, 0],
                y: [0, -ampY, ampY * 0.5, ampY * 0.3, 0],
                rotate: [0, rotate * 0.6, rotate * -0.4, rotate * 0.2, 0],
              }
        }
        transition={{
          duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
          times: [0, 0.3, 0.55, 0.8, 1],
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.12 + 0.4, type: "spring", stiffness: 180, damping: 14 }}
          style={{
            width: 54,
            height: 54,
            borderRadius: 14,
            boxShadow: "0 6px 24px rgba(0,0,0,0.22), 0 1px 0 rgba(255,255,255,0.12) inset",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon.icon}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function FloatingIcons() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "800vh",
        zIndex: 4,
        pointerEvents: "none",
      }}
    >
      <div style={{ position: "relative", width: "100%", height: "100%", pointerEvents: "all" }}>
        {APP_ICONS.map((icon, index) => (
          <FloatingIcon key={icon.id} icon={icon} index={index} />
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const { scrollY } = useScroll();
  const bleedY = useTransform(scrollY, [0, 600], [0, -60]);
  const contentY = useTransform(scrollY, [0, 500], [0, 60]);
  const opacity = useTransform(scrollY, [0, 380], [1, 0]);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        zIndex: 1,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "0 0 0 8vw",
        overflow: "hidden",
      }}
    >
      <FloatingIcons />

      <motion.div
        style={{
          y: bleedY,
          position: "absolute",
          right: "-0.08em",
          top: "50%",
          translate: "0 -50%",
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: "clamp(160px,22vw,320px)",
          fontWeight: 300,
          fontStyle: "italic",
          color: "rgba(65,67,27,0.06)",
          letterSpacing: "-0.04em",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          whiteSpace: "nowrap",
          zIndex: 1,
        }}
      >
        world-class.
      </motion.div>

      <motion.div
        style={{
          y: contentY,
          opacity,
          position: "relative",
          zIndex: 2,
          maxWidth: 680,
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "7px 20px",
            borderRadius: 100,
            marginBottom: 44,
            fontSize: 12,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#4A5C28",
            fontWeight: 500,
          }}
        >
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#AEB784",
              display: "inline-block",
            }}
          />
          Available for projects · 2025
        </motion.div>

        <div style={{ overflow: "hidden", marginBottom: 2 }}>
          <motion.h1
            initial={{ y: 90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="serif"
            style={{
              fontSize: "clamp(48px,6.5vw,90px)",
              fontWeight: 600,
              lineHeight: 0.92,
              color: "#41431B",
              letterSpacing: "-0.03em",
            }}
          >
            I make creators
          </motion.h1>
        </div>

        <div style={{ overflow: "hidden", marginBottom: 32 }}>
          <motion.h1
            initial={{ y: 90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
            className="serif"
            style={{
              fontSize: "clamp(56px,9vw,130px)",
              fontWeight: 300,
              fontStyle: "italic",
              lineHeight: 0.88,
              color: "#AEB784",
              letterSpacing: "-0.04em",
            }}
          >
            look
          </motion.h1>
        </div>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: 1.5,
            width: 280,
            background:
              "linear-gradient(to right, rgba(65,67,27,0.55), rgba(65,67,27,0.10), transparent)",
            transformOrigin: "left",
            marginBottom: 28,
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.72 }}
          style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 40 }}
        >
          {[
            "Thumbnails that get clicked",
            "Edits that get shared",
            "Sites that convert",
          ].map((text, index) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.72 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontSize: 14,
                color: "#6B6B4A",
                fontWeight: 400,
                letterSpacing: "0.01em",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  color: "#AEB784",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  width: 20,
                  flexShrink: 0,
                  textAlign: "center",
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                style={{
                  width: 1,
                  height: 12,
                  background: "rgba(174,183,132,0.4)",
                  flexShrink: 0,
                }}
              />
              {text}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          style={{ display: "flex", gap: 14, alignItems: "center" }}
        >
          <LiquidButtonPrimary onClick={() => go("library")}>See My Work</LiquidButtonPrimary>
          <LiquidButtonGhost onClick={() => go("contact")}>Start a Project</LiquidButtonGhost>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
        style={{
          position: "absolute",
          bottom: 36,
          left: "8vw",
          width: 72,
          height: 72,
          cursor: "pointer",
          zIndex: 2,
        }}
        onClick={() => go("about")}
        whileHover={{ scale: 1.08 }}
      >
        <motion.svg
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          viewBox="0 0 72 72"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        >
          <defs>
            <path id="circle-path" d="M36,36 m-28,0 a28,28 0 1,1 56,0 a28,28 0 1,1 -56,0" />
          </defs>
          <text
            style={{
              fontSize: 7.5,
              fill: "rgba(65,67,27,0.45)",
              fontFamily: "'DM Sans',sans-serif",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            <textPath href="#circle-path">SCROLL TO EXPLORE * SCROLL TO EXPLORE *</textPath>
          </text>
        </motion.svg>

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            style={{ fontSize: 14, color: "rgba(65,67,27,0.5)", lineHeight: 1 }}
          >
            ↓
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
