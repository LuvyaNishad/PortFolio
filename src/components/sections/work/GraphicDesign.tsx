import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "../../ui/Reveal";
import AddCard from "../../ui/AddCard";
import WorkSection from "./WorkSection";
import { GraphicLightbox } from "../Project";
import { GRAPHIC_ITEMS, type GraphicItem } from "../../../data/graphics";

function GraphicCard({
  item,
  span = 1,
  onOpen,
}: {
  item: GraphicItem;
  span?: number;
  onOpen: (item: GraphicItem) => void;
}) {
  const ratio = item.ratio ?? 4 / 3;
  const isFeatured = span > 1;

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      onClick={() => onOpen(item)}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="glass"
      style={{
        borderRadius: 24,
        overflow: "hidden",
        gridColumn: `span ${span}`,
        cursor: "pointer",
      }}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: `${ratio}`,
          background: "linear-gradient(135deg,#F3EFDA 0%,#E6DFC4 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          padding: 0,
        }}
      >
        {item.img ? (
          <img
            src={item.img}
            alt={item.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <span style={{ fontSize: isFeatured ? 52 : 32, opacity: 0.3 }}>GD</span>
        )}
      </div>

      <div
        style={{
          padding: "14px 18px 18px",
          borderTop: "1px solid rgba(255,255,255,0.38)",
          background: "linear-gradient(180deg, rgba(248,243,225,0.74) 0%, rgba(242,236,214,0.58) 100%)",
          backdropFilter: "blur(18px) saturate(1.08)",
          WebkitBackdropFilter: "blur(18px) saturate(1.08)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.42)",
        }}
      >
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
          {(item.tags || []).map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 10,
                padding: "3px 9px",
                borderRadius: 100,
                background: "rgba(174,183,132,.12)",
                color: "var(--olive-soft)",
                letterSpacing: "0.08em",
                fontWeight: 500,
                textTransform: "uppercase",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div className="serif" style={{ fontSize: isFeatured ? 20 : 16, fontWeight: 600, color: "var(--olive)" }}>
            {item.title || "Untitled"}
          </div>
          <span style={{ fontSize: 12, color: "var(--olive-muted)" }}>{item.year}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function GraphicDesign() {
  const [selected, setSelected] = useState<GraphicItem | null>(null);

  return (
    <>
      <WorkSection
        id="graphic-design"
        label="Graphic Design"
        title="Visual"
        italic="Craft"
        desc="Posters, brand identities, editorial layouts, and print design."
        headingVariant="zoom"
        sectionNum="03"
        padding="152px 6vw 96px"
        titleWeight={400}
        italicWeight={400}
      >
        {GRAPHIC_ITEMS.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 22 }}>
            {GRAPHIC_ITEMS.map((item, index) => {
              const ratio = item.ratio ?? 4 / 3;
              const span = ratio >= 1.6 ? 2 : 1;

              return (
                <Reveal key={index} delay={index * 0.07} variant={index === 0 ? "slideLeft" : "zoom"}>
                  <GraphicCard item={item} span={span} onOpen={setSelected} />
              </Reveal>
              );
            })}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }}>
            <Reveal delay={0} variant="slideLeft" style={{ gridColumn: "span 2" }}>
              <motion.div
                whileHover={{ y: -4 }}
                style={{
                  borderRadius: 24,
                  border: "1px solid rgba(255,255,255,0.58)",
                  background: "linear-gradient(180deg, rgba(248,243,225,0.68) 0%, rgba(244,238,217,0.5) 100%)",
                  backdropFilter: "blur(18px) saturate(1.15)",
                  WebkitBackdropFilter: "blur(18px) saturate(1.15)",
                  boxShadow: "0 24px 52px rgba(65,67,27,0.12), inset 0 1px 0 rgba(255,255,255,0.68)",
                  aspectRatio: "2/1",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                  cursor: "pointer",
                }}
                >
                <span
                  style={{
                    fontSize: 44,
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(255,255,255,0.24)",
                    border: "1px solid rgba(255,255,255,0.42)",
                    boxShadow: "0 8px 24px rgba(65,67,27,0.08), inset 0 1px 0 rgba(255,255,255,0.55)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                  }}
                >
                  GD
                </span>
                <span
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--olive-soft)",
                    fontWeight: 600,
                  }}
                >
                  Featured piece
                </span>
              </motion.div>
            </Reveal>

            {[1, 2, 3, 4].map((index) => (
              <Reveal key={index} delay={index * 0.07} variant="zoom">
                <AddCard label="Add design" icon="GD" type="graphic" />
              </Reveal>
            ))}
          </div>
        )}
      </WorkSection>

      <AnimatePresence>
        {selected && <GraphicLightbox item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
}
