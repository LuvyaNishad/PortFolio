import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "../../ui/Reveal";
import AddCard from "../../ui/AddCard";
import WorkSection from "./WorkSection";
import { VideoPlayerModal } from "../Project";
import { VIDEO_ITEMS, type VideoItem } from "../../../data/videos";

function VideoCard({ item, onOpen }: { item: VideoItem; onOpen: (item: VideoItem) => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="matte"
      style={{ borderRadius: 24, overflow: "hidden", cursor: "pointer" }}
      onClick={() => onOpen(item)}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: "16/9",
          background: "linear-gradient(135deg,#D8C890,#A89060)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {item.thumb ? (
          <img
            src={item.thumb}
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
          <span style={{ fontSize: 32, opacity: 0.4 }}>VD</span>
        )}

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(25,38,28,.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: "50%",
                  background: "rgba(248,243,225,.94)",
                  boxShadow: "0 8px 32px rgba(0,0,0,.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                }}
              >
                Play
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {item.duration && (
          <div
            style={{
              position: "absolute",
              bottom: 10,
              right: 12,
              background: "rgba(0,0,0,.62)",
              borderRadius: 6,
              padding: "3px 8px",
              fontSize: 11,
              color: "#fff",
              fontWeight: 500,
            }}
          >
            {item.duration}
          </div>
        )}
      </div>

      <div style={{ padding: "18px 22px 24px" }}>
        <div
          style={{
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#AEB784",
            marginBottom: 6,
          }}
        >
          {item.category || "Video"}
        </div>

        <div className="serif" style={{ fontSize: 21, fontWeight: 600, color: "#41431B", lineHeight: 1.1 }}>
          {item.title || "Untitled Edit"}
        </div>
      </div>
    </motion.div>
  );
}

export default function VideoEdits() {
  const [selected, setSelected] = useState<VideoItem | null>(null);

  return (
    <>
      <WorkSection
        id="video-edits"
        label="Video Edits"
        title="Motion &"
        italic="Storytelling"
        desc="Reels, short-form content, long-form narratives, and cinematic brand films."
        headingVariant="slideRight"
        sectionNum="02"
        padding="80px 6vw 130px"
        titleWeight={300}
        italicWeight={600}
      >
        {VIDEO_ITEMS.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 24 }}>
            {VIDEO_ITEMS.map((item, index) => (
              <Reveal key={index} delay={index * 0.08} variant="slideLeft">
                <VideoCard item={item} onOpen={setSelected} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 24 }}>
            {[0, 1, 2, 3].map((index) => (
              <Reveal key={index} delay={index * 0.07} variant="slideLeft">
                <AddCard label="Add video" icon="VD" tall type="video" />
              </Reveal>
            ))}
          </div>
        )}
      </WorkSection>

      <AnimatePresence>
        {selected && <VideoPlayerModal item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
}
