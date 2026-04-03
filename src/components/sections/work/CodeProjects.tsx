import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "../../ui/Reveal";
import AddCard from "../../ui/AddCard";
import WorkSection from "./WorkSection";
import { CodeCaseStudy } from "../Project";
import { CODE_ITEMS, STACK_COLORS, type CodeProjectItem } from "../../../data/codeProjects";

function CodeCard({
  item,
  onOpen,
}: {
  item: CodeProjectItem;
  onOpen: (item: CodeProjectItem) => void;
}) {
  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: "0 28px 60px rgba(65,67,27,.14)" }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      onClick={() => onOpen(item)}
      className="matte"
      style={{
        borderRadius: 16,
        padding: 28,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: 14,
            background: "linear-gradient(135deg,rgba(65,67,27,0.85),rgba(65,67,27,0.65))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "monospace",
            fontSize: 13,
            color: "rgba(248,243,225,0.90)",
            fontWeight: 700,
            boxShadow: "0 2px 8px rgba(65,67,27,0.25)",
          }}
        >
          {"</>"}
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              onClick={(event) => event.stopPropagation()}
              style={{
                fontSize: 11,
                padding: "5px 14px",
                borderRadius: 100,
                background: "rgba(74,92,40,.12)",
                color: "#4A5C28",
                textDecoration: "none",
                letterSpacing: "0.06em",
                fontWeight: 500,
              }}
            >
              Live
            </a>
          )}

          {item.repo && (
            <a
              href={item.repo}
              target="_blank"
              rel="noreferrer"
              onClick={(event) => event.stopPropagation()}
              style={{
                fontSize: 11,
                padding: "5px 14px",
                borderRadius: 100,
                background: "rgba(174,183,132,.08)",
                color: "#4A5C28",
                textDecoration: "none",
                border: "1px solid rgba(174,183,132,.2)",
                letterSpacing: "0.06em",
                fontWeight: 500,
              }}
            >
              GitHub
            </a>
          )}
        </div>
      </div>

      <div>
        <div
          className="serif"
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: "#41431B",
            lineHeight: 1.15,
            marginBottom: 10,
          }}
        >
          {item.title}
        </div>

        <p style={{ fontSize: 14, color: "#6B6B4A", lineHeight: 1.75, fontWeight: 300 }}>{item.desc}</p>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: "auto" }}>
        {(item.stack || []).map((stack) => (
          <span
            key={stack}
            style={{
              fontSize: 11,
              padding: "4px 12px",
              borderRadius: 100,
              fontWeight: 500,
              letterSpacing: "0.06em",
              background: `${STACK_COLORS[stack] || "#AEB784"}18`,
              color: STACK_COLORS[stack] || "#4A5C28",
              border: `1px solid ${STACK_COLORS[stack] || "#AEB784"}30`,
            }}
          >
            {stack}
          </span>
        ))}
      </div>

      {item.year && (
        <div style={{ fontSize: 12, color: "#9A9878", borderTop: "1px solid rgba(174,183,132,.12)", paddingTop: 14 }}>
          {item.year}
        </div>
      )}
    </motion.div>
  );
}

export default function CodeProjects() {
  const [selected, setSelected] = useState<CodeProjectItem | null>(null);

  return (
    <>
      <WorkSection
        id="code-projects"
        label="Code Projects"
        title="Built from"
        italic="Scratch"
        desc="Web apps, experiments, open-source tools and interactive experiences."
        headingVariant="slideRight"
        sectionNum="04"
        padding="76px 6vw 160px"
        titleWeight={700}
        italicWeight={300}
      >
        {CODE_ITEMS.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 24 }}>
            {CODE_ITEMS.map((item, index) => (
              <Reveal key={index} delay={index * 0.08} variant="slideRight">
                <CodeCard item={item} onOpen={setSelected} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 24 }}>
            {[0, 1, 2, 3].map((index) => (
              <Reveal key={index} delay={index * 0.07} variant="slideRight">
                <AddCard label="Add project" icon={"</>"} tall type="code" />
              </Reveal>
            ))}
          </div>
        )}
      </WorkSection>

      <AnimatePresence>
        {selected && <CodeCaseStudy item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
}
