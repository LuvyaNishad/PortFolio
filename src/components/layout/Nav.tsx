import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "../../data/navLinks";
import useScrollSpy from "../../hooks/useScrollSpy";

const SECTION_IDS = [
  "hero",
  "about",
  "tools",
  "library",
  "thumbnails",
  "video-edits",
  "graphic-design",
  "code-projects",
  "contact",
];

export default function Nav() {
  const { activeSection, setActiveSection } = useScrollSpy(SECTION_IDS);
  const [lampX, setLampX] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const pillRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const go = (id: string) => {
    setActiveSection(id);
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const displayActive = ["thumbnails", "video-edits", "graphic-design", "code-projects"].includes(
    activeSection
  )
    ? "library"
    : activeSection;

  useEffect(() => {
    const linkEl = linkRefs.current[displayActive];
    const pillEl = pillRef.current;
    if (!linkEl || !pillEl) return;

    const linkRect = linkEl.getBoundingClientRect();
    const pillRect = pillEl.getBoundingClientRect();
    setLampX(linkRect.left - pillRect.left + linkRect.width / 2);
  }, [displayActive]);

  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: "var(--z-nav)",
        display: "flex",
        justifyContent: "center",
        paddingTop: 18,
        pointerEvents: "none",
      }}
    >
      <div
        ref={pillRef}
        style={{
          pointerEvents: "all",
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: 2,
          padding: "5px 5px",
          borderRadius: 100,
          background:
            "linear-gradient(108deg,rgba(174,183,132,0.42) 0%,rgba(140,158,96,0.30) 55%,rgba(174,183,132,0.38) 100%)",
          backdropFilter: "blur(28px) saturate(200%) hue-rotate(3deg)",
          WebkitBackdropFilter: "blur(28px) saturate(200%) hue-rotate(3deg)",
          border: "1.5px solid rgba(80,100,45,0.35)",
          boxShadow: `
            0 1.5px 0 rgba(220,235,185,0.50) inset,
            0 -1px 0 rgba(60,80,20,0.15) inset,
            0 12px 48px rgba(65,67,27,0.18),
            0 4px 12px rgba(65,67,27,0.10),
            0 0 0 1px rgba(255,255,255,0.12) inset
          `,
        }}
      >
        <AnimatePresence>
          {lampX !== null && NAV_LINKS.some((link) => link.id === displayActive) && (
            <motion.div
              key="lamp"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, x: lampX }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                position: "absolute",
                top: -16,
                left: 0,
                translate: "-50% 0",
                pointerEvents: "none",
                zIndex: "var(--z-raised)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: 0,
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 3,
                  borderRadius: 100,
                  background: "rgba(50,65,12,0.95)",
                  boxShadow: "0 0 10px rgba(80,110,20,0.8), 0 0 4px rgba(50,65,12,1)",
                  flexShrink: 0,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 3,
                  width: 80,
                  height: 36,
                  background:
                    "radial-gradient(ellipse 80% 100% at 50% 0%,rgba(174,183,132,0.55) 0%,transparent 85%)",
                  filter: "blur(6px)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 3,
                  width: 44,
                  height: 24,
                  background:
                    "radial-gradient(ellipse 80% 100% at 50% 0%,rgba(174,183,132,0.80) 0%,transparent 85%)",
                  filter: "blur(2px)",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => go("hero")}
          style={{
            cursor: "pointer",
            userSelect: "none",
            padding: "6px 16px 6px 12px",
            borderRight: "1px solid rgba(80,100,45,0.18)",
            marginRight: 4,
          }}
        >
          <span
            className="serif"
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: "var(--olive)",
              letterSpacing: "0.02em",
              whiteSpace: "nowrap",
            }}
          >
            AURELIUS<span style={{ color: "var(--olive-soft)", fontWeight: 300 }}>.</span>
          </span>
        </motion.div>

        <motion.button
          type="button"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          whileTap={{ scale: 0.94 }}
          className="mobile-nav-toggle"
          style={{
            display: "none",
            alignItems: "center",
            justifyContent: "center",
            width: 34,
            height: 34,
            borderRadius: "50%",
            border: "1px solid rgba(65,67,27,0.16)",
            background: "rgba(248,243,225,0.82)",
            color: "var(--olive)",
            cursor: "pointer",
          }}
        >
          {mobileOpen ? <X size={16} strokeWidth={2} /> : <Menu size={16} strokeWidth={2} />}
        </motion.button>

        {NAV_LINKS.map(({ label, id, external }) => {
          const isActive = displayActive === id;

          if (external) {
            return (
              <div
                key={id}
                className="desktop-nav-item"
                style={{
                  marginLeft: 4,
                  paddingLeft: 4,
                  borderLeft: "1px solid rgba(80,100,45,0.18)",
                }}
              >
                <motion.a
                  href={external}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.04, background: "rgba(65,67,27,0.88)" }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "7px 18px",
                    borderRadius: 100,
                    background: "rgba(65,67,27,0.75)",
                    color: "var(--cream)",
                    fontSize: 12,
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    fontFamily: "'DM Sans',sans-serif",
                    textDecoration: "none",
                    boxShadow: "0 2px 8px rgba(65,67,27,0.25)",
                    transition: "background .2s",
                    backdropFilter: "blur(8px)",
                    whiteSpace: "nowrap",
                  }}
                >
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path
                      d="M1 10L10 1M10 1H3M10 1V8"
                      stroke="var(--cream)"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Resume
                </motion.a>
              </div>
            );
          }

          return (
            <div
              key={id}
              className="desktop-nav-item"
              ref={(el) => {
                linkRefs.current[id] = el;
              }}
              onClick={() => go(id)}
              style={{ position: "relative", cursor: "pointer" }}
            >
              <motion.span
                animate={{
                  opacity: isActive ? 1 : 0.38,
                  fontWeight: isActive ? 700 : 500,
                }}
                transition={{ duration: 0.25 }}
                whileHover={{ opacity: isActive ? 1 : 0.72 }}
                style={{
                  position: "relative",
                  display: "block",
                  fontSize: 12,
                  letterSpacing: "0.09em",
                  textTransform: "uppercase",
                  color: "var(--olive)",
                  padding: "7px 18px",
                  borderRadius: 100,
                  userSelect: "none",
                  zIndex: "var(--z-content)",
                }}
              >
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      layoutId="active-pill"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: 100,
                        zIndex: -1,
                        background: "rgba(248,243,225,0.95)",
                        border: "1.5px solid rgba(65,67,27,0.18)",
                        boxShadow:
                          "0 2px 12px rgba(65,67,27,0.18), 0 1px 0 rgba(255,255,255,0.8) inset",
                      }}
                    />
                  )}
                </AnimatePresence>
                {label}
              </motion.span>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-nav-menu"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: "none",
              position: "fixed",
              top: 68,
              left: 16,
              right: 16,
              pointerEvents: "all",
              borderRadius: 22,
              padding: 8,
              background: "rgba(248,243,225,0.94)",
              border: "1px solid rgba(65,67,27,0.16)",
              boxShadow: "0 18px 48px rgba(65,67,27,0.18), 0 1px 0 rgba(255,255,255,0.7) inset",
              backdropFilter: "blur(22px) saturate(160%)",
              WebkitBackdropFilter: "blur(22px) saturate(160%)",
            }}
          >
            {NAV_LINKS.map(({ label, id, external }) =>
              external ? (
                <a
                  key={id}
                  href={external}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: "block",
                    padding: "13px 16px",
                    borderRadius: 15,
                    color: "var(--olive)",
                    textDecoration: "none",
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {label}
                </a>
              ) : (
                <button
                  key={id}
                  type="button"
                  onClick={() => go(id)}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "13px 16px",
                    borderRadius: 15,
                    border: "none",
                    background: displayActive === id ? "rgba(174,183,132,0.22)" : "transparent",
                    color: "var(--olive)",
                    textAlign: "left",
                    fontSize: 13,
                    fontWeight: displayActive === id ? 700 : 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                  }}
                >
                  {label}
                </button>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
