import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "../../ui/Reveal";
import AddCard from "../../ui/AddCard";
import WorkSection from "./WorkSection";
import { ThumbnailLightbox } from "../Project";
import { THUMBNAIL_ITEMS, type ThumbnailItem } from "../../../data/thumbnails";

function ThumbnailCard({
  item,
  onOpen,
}: {
  item: ThumbnailItem;
  onOpen: (item: ThumbnailItem) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.015 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => onOpen(item)}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="matte"
      style={{ borderRadius: 20, overflow: "hidden", cursor: "pointer" }}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: "16/9",
          background: "linear-gradient(135deg,#C8D8B0 0%,#A8C090 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {item.img ? (
          <img
            src={item.img}
            alt={item.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform .5s ease",
              transform: hovered ? "scale(1.06)" : "scale(1)",
            }}
          />
        ) : (
          <span style={{ fontSize: 28, opacity: 0.4 }}>TH</span>
        )}

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(65,67,27,0.80) 0%, transparent 60%)",
                display: "flex",
                alignItems: "flex-end",
                padding: "16px 18px",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#F8F3E1",
                  fontWeight: 500,
                }}
              >
                View Thumbnail
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div style={{ padding: "16px 18px 20px" }}>
        <div
          className="serif"
          style={{
            fontSize: 17,
            fontWeight: 600,
            color: "#41431B",
            marginBottom: 6,
            lineHeight: 1.2,
          }}
        >
          {item.title || "Untitled"}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#9A9878" }}>
          <span>{item.platform || "Platform"}</span>
          <span>{item.views || ""}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Thumbnails() {
  const [selected, setSelected] = useState<ThumbnailItem | null>(null);

  return (
    <>
      <WorkSection
        id="thumbnails"
        label="Thumbnails"
        title="Click-worthy"
        italic="Covers"
        desc="YouTube, Instagram and social covers designed to stop the scroll."
        headingVariant="slideLeft"
        sectionNum="01"
        padding="148px 6vw 100px"
        titleWeight={700}
        italicWeight={200}
      >
        {THUMBNAIL_ITEMS.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 22 }}>
            {THUMBNAIL_ITEMS.map((item, index) => (
              <Reveal key={index} delay={index * 0.07} variant="zoom">
                <ThumbnailCard item={item} onOpen={setSelected} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 22 }}>
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <Reveal key={index} delay={index * 0.06} variant="zoom">
                <AddCard label="Add thumbnail" icon="TH" type="thumbnail" />
              </Reveal>
            ))}
          </div>
        )}
      </WorkSection>

      <AnimatePresence>
        {selected && <ThumbnailLightbox item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
}
