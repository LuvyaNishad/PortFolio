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

      <div style={{ padding: "14px 18px 18px", borderTop: "1px solid rgba(174,183,132,.18)" }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
          {(item.tags || []).map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 10,
                padding: "3px 9px",
                borderRadius: 100,
                background: "rgba(174,183,132,.12)",
                color: "#4A5C28",
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
          <div className="serif" style={{ fontSize: isFeatured ? 20 : 16, fontWeight: 600, color: "#41431B" }}>
            {item.title || "Untitled"}
          </div>
          <span style={{ fontSize: 12, color: "#9A9878" }}>{item.year}</span>
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
        accent="rgba(180,168,210,.18)"
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
                  border: "1.5px dashed rgba(174,183,132,.4)",
                  background: "rgba(248,243,225,.4)",
                  backdropFilter: "blur(10px)",
                  aspectRatio: "2/1",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                  cursor: "pointer",
                }}
              >
                <span style={{ fontSize: 44 }}>GD</span>
                <span
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "rgba(174,183,132,.6)",
                    fontWeight: 500,
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
