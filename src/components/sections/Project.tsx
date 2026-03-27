import { ReactNode, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ThumbnailItem } from "../../data/thumbnails";
import type { VideoItem } from "../../data/videos";
import type { CodeProjectItem } from "../../data/codeProjects";
import { STACK_COLORS } from "../../data/codeProjects";

type ModalBackdropProps = {
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
};

type ComingSoonModalProps = {
  type?: "thumbnail" | "video" | "graphic" | "code";
  icon?: ReactNode;
  onClose: () => void;
};

const TEMPLATES = {
  thumbnail: `// Paste into THUMBNAIL_ITEMS array:
{
  img: "https://your-image-host.com/thumbnail.jpg",
  title: "Your Video Title Here",
  platform: "YouTube",
  views: "120K views",
  channel: "Your Channel",
  videoUrl: "https://youtu.be/VIDEO_ID",
  context: "Brief note on the creative direction, colour choices, or brief.",
  tags: ["Gaming", "Tutorial"]
}`,
  video: `// Paste into VIDEO_ITEMS array:
{
  thumb: "https://your-image-host.com/cover.jpg",
  title: "Brand Film - Client Name",
  category: "Commercial",
  duration: "2:15",
  client: "Client or creator name",
  desc: "What the video was about and your creative approach.",
  tags: ["Brand", "Cinematic"],
  url: "https://youtu.be/VIDEO_ID",
  embedUrl: "https://www.youtube.com/embed/VIDEO_ID"
}`,
  graphic: `// Paste into GRAPHIC_ITEMS array:
{
  img: "https://your-image-host.com/design.jpg",
  title: "Project Name - Brand Identity",
  tags: ["Branding", "Identity"],
  year: "2025"
}`,
  code: `// Paste into CODE_ITEMS array:
{
  title: "Project Name",
  desc: "One-liner for the card.",
  year: "2025",
  stack: ["React", "TypeScript", "Tailwind"],
  url: "https://your-live-site.com",
  repo: "https://github.com/you/repo",
  type: "Personal project",
  duration: "3 weeks",
  cover: "https://your-image-host.com/cover.png",
  images: ["https://screen1.png", "https://screen2.png"],
  problem: "What problem this solved and why you built it.",
  role: "What you specifically designed and built.",
  process: "Your approach, decisions, trade-offs, interesting challenges.",
  outcome: "Results, metrics, what you learned, what you'd do differently."
}`,
};

export function ModalBackdrop({ onClose, children, wide = false }: ModalBackdropProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 8000,
        background: "rgba(15,18,8,0.92)",
        backdropFilter: "blur(16px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        overflowY: "auto",
      }}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        style={{ width: "100%", maxWidth: wide ? 1100 : 820, margin: "auto" }}
      >
        {children}
      </div>
    </motion.div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={copy}
      style={{
        position: "absolute",
        top: 12,
        right: 12,
        padding: "5px 14px",
        borderRadius: 100,
        background: copied ? "rgba(65,67,27,0.85)" : "rgba(174,183,132,0.2)",
        border: "1px solid rgba(174,183,132,0.3)",
        color: copied ? "#F8F3E1" : "#4A5C28",
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: "0.06em",
        cursor: "pointer",
        transition: "background .2s, color .2s",
      }}
    >
      {copied ? "Copied" : "Copy"}
    </motion.button>
  );
}

export function ComingSoonModal({
  type = "thumbnail",
  icon,
  onClose,
}: ComingSoonModalProps) {
  return (
    <ModalBackdrop onClose={onClose}>
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.93, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        style={{
          background: "#F8F3E1",
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: "0 48px 120px rgba(0,0,0,0.45)",
          maxHeight: "88vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "32px 36px 24px",
            borderBottom: "1px solid rgba(174,183,132,0.2)",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: "linear-gradient(135deg,rgba(65,67,27,0.85),rgba(65,67,27,0.65))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              flexShrink: 0,
              color: "#F8F3E1",
            }}
          >
            {icon ?? "+"}
          </div>

          <div style={{ flex: 1 }}>
            <h3
              className="serif"
              style={{ fontSize: 22, fontWeight: 600, color: "#41431B", lineHeight: 1.1 }}
            >
              Coming soon
            </h3>
            <p style={{ fontSize: 13, color: "#9A9878", marginTop: 3 }}>
              This piece is not published yet. Use the template below to add it.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              flexShrink: 0,
              background: "rgba(65,67,27,0.08)",
              border: "1px solid rgba(65,67,27,0.10)",
              cursor: "pointer",
              color: "#41431B",
              fontSize: 15,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            x
          </motion.button>
        </div>

        <div style={{ padding: "20px 36px 0", flexShrink: 0 }}>
          <p style={{ fontSize: 13, color: "#6B6B4A", lineHeight: 1.75 }}>
            Find the matching array in your data file and paste one object inside it.
            Once that array has items, the placeholder cards disappear automatically.
          </p>
        </div>

        <div style={{ padding: "16px 36px 32px", overflowY: "auto" }}>
          <div
            style={{
              background: "rgba(65,67,27,0.05)",
              border: "1px solid rgba(65,67,27,0.10)",
              borderRadius: 14,
              padding: "20px 22px",
              position: "relative",
            }}
          >
            <CopyButton text={TEMPLATES[type]} />
            <pre
              style={{
                fontFamily: "'DM Sans', monospace",
                fontSize: 12.5,
                color: "#41431B",
                lineHeight: 1.85,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                margin: 0,
                paddingRight: 48,
              }}
            >
              {TEMPLATES[type]}
            </pre>
          </div>
        </div>
      </motion.div>
    </ModalBackdrop>
  );
}

export function ThumbnailLightbox({
  item,
  onClose,
}: {
  item: ThumbnailItem;
  onClose: () => void;
}) {
  return (
    <ModalBackdrop onClose={onClose} wide>
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 24 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        style={{
          background: "#F8F3E1",
          borderRadius: 28,
          overflow: "hidden",
          boxShadow: "0 56px 140px rgba(0,0,0,0.6)",
        }}
      >
        <div
          style={{
            position: "relative",
            background: "linear-gradient(135deg,#2a3018,#1a2010)",
            lineHeight: 0,
          }}
        >
          {item.img ? (
            <img
              src={item.img}
              alt={item.title}
              style={{ width: "100%", display: "block", maxHeight: "60vh", objectFit: "contain" }}
            />
          ) : (
            <div
              style={{
                height: 320,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 64,
                opacity: 0.2,
              }}
            >
              TH
            </div>
          )}

          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 80,
              background: "linear-gradient(to top, rgba(15,18,8,0.7), transparent)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "absolute",
              bottom: 16,
              left: 20,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(248,243,225,0.85)",
                fontWeight: 500,
                background: "rgba(0,0,0,0.45)",
                backdropFilter: "blur(8px)",
                padding: "4px 12px",
                borderRadius: 100,
              }}
            >
              {item.platform || "Platform"}
              {item.channel ? ` · ${item.channel}` : ""}
            </span>

            {item.views && (
              <span
                style={{
                  fontSize: 11,
                  color: "rgba(248,243,225,0.6)",
                  background: "rgba(0,0,0,0.35)",
                  backdropFilter: "blur(8px)",
                  padding: "4px 12px",
                  borderRadius: 100,
                  letterSpacing: "0.06em",
                }}
              >
                {item.views}
              </span>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "rgba(0,0,0,0.55)",
              border: "1px solid rgba(255,255,255,0.15)",
              cursor: "pointer",
              color: "#F8F3E1",
              fontSize: 14,
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            x
          </motion.button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div
            style={{
              padding: "28px 32px 32px",
              borderRight: "1px solid rgba(174,183,132,0.15)",
              overflowY: "auto",
              maxHeight: 280,
            }}
          >
            <h3
              className="serif"
              style={{
                fontSize: 28,
                fontWeight: 600,
                color: "#41431B",
                lineHeight: 1.1,
                marginBottom: 14,
                letterSpacing: "-0.02em",
              }}
            >
              {item.title || "Untitled"}
            </h3>

            {item.context ? (
              <p style={{ fontSize: 14, color: "#6B6B4A", lineHeight: 1.85 }}>{item.context}</p>
            ) : (
              <p style={{ fontSize: 13, color: "rgba(174,183,132,0.55)", fontStyle: "italic", lineHeight: 1.7 }}>
                Add a `context` field to describe the creative brief.
              </p>
            )}
          </div>

          <div style={{ padding: "28px 32px 32px", display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "For video", value: item.title },
                { label: "Platform", value: item.platform },
                { label: "Channel", value: item.channel },
                { label: "Views", value: item.views },
              ]
                .filter((row) => row.value)
                .map(({ label, value }) => (
                  <div key={label} style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
                    <span
                      style={{
                        fontSize: 10,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "#AEB784",
                        fontWeight: 500,
                        minWidth: 70,
                        flexShrink: 0,
                      }}
                    >
                      {label}
                    </span>
                    <span style={{ fontSize: 13, color: "#41431B", fontWeight: 400 }}>{value}</span>
                  </div>
                ))}
            </div>

            {item.tags && item.tags.length > 0 && (
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: 11,
                      padding: "4px 14px",
                      borderRadius: 100,
                      background: "rgba(174,183,132,0.15)",
                      border: "1px solid rgba(174,183,132,0.3)",
                      color: "#4A5C28",
                      letterSpacing: "0.06em",
                      fontWeight: 500,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {item.videoUrl && (
              <motion.a
                href={item.videoUrl}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 24px",
                  borderRadius: 100,
                  background: "rgba(65,67,27,0.88)",
                  color: "#F8F3E1",
                  textDecoration: "none",
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  alignSelf: "flex-start",
                  marginTop: "auto",
                }}
              >
                Watch the video
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </ModalBackdrop>
  );
}

export function VideoPlayerModal({
  item,
  onClose,
}: {
  item: VideoItem;
  onClose: () => void;
}) {
  return (
    <ModalBackdrop onClose={onClose}>
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 24 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        style={{
          background: "rgba(20,24,12,0.95)",
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 48px 120px rgba(0,0,0,0.7)",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ position: "relative", aspectRatio: "16/9", background: "#0a0c06", flexShrink: 0 }}>
          {item.embedUrl ? (
            <iframe
              src={`${item.embedUrl}?autoplay=1`}
              title={item.title}
              style={{ width: "100%", height: "100%", border: "none" }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
              }}
            >
              {item.thumb && (
                <img
                  src={item.thumb}
                  alt={item.title}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: 0.35,
                  }}
                />
              )}

              <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: 24 }}>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(174,183,132,0.7)",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  No embed URL set
                </div>

                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "12px 24px",
                      borderRadius: 100,
                      background: "rgba(248,243,225,0.12)",
                      border: "1px solid rgba(248,243,225,0.2)",
                      color: "#F8F3E1",
                      textDecoration: "none",
                      fontSize: 13,
                    }}
                  >
                    Open video externally
                  </a>
                ) : (
                  <p style={{ color: "rgba(174,183,132,0.5)", fontSize: 13, fontStyle: "italic" }}>
                    Add an `embedUrl` or `url` field to this item.
                  </p>
                )}
              </div>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              zIndex: 10,
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "rgba(0,0,0,0.6)",
              border: "none",
              cursor: "pointer",
              color: "#F8F3E1",
              fontSize: 15,
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            x
          </motion.button>
        </div>

        <div style={{ padding: "20px 24px 24px", color: "#F8F3E1" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
            <div>
              <div
                style={{
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "rgba(174,183,132,0.65)",
                  marginBottom: 5,
                }}
              >
                {item.category || "Video"}
                {item.client ? ` · ${item.client}` : ""}
                {item.duration ? ` · ${item.duration}` : ""}
              </div>

              <h3 className="serif" style={{ fontSize: 22, fontWeight: 600, color: "#F8F3E1", lineHeight: 1.1 }}>
                {item.title || "Untitled"}
              </h3>
            </div>

            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontSize: 11,
                  padding: "6px 14px",
                  borderRadius: 100,
                  flexShrink: 0,
                  background: "rgba(174,183,132,0.12)",
                  border: "1px solid rgba(174,183,132,0.25)",
                  color: "rgba(174,183,132,0.8)",
                  textDecoration: "none",
                  letterSpacing: "0.06em",
                  marginLeft: 12,
                }}
              >
                Open
              </a>
            )}
          </div>

          {item.desc ? (
            <p style={{ fontSize: 13, color: "rgba(248,243,225,0.55)", lineHeight: 1.75, marginBottom: 12 }}>
              {item.desc}
            </p>
          ) : (
            <p style={{ fontSize: 12, color: "rgba(174,183,132,0.4)", fontStyle: "italic" }}>
              Add a `desc` field to show description here.
            </p>
          )}

          {item.tags && item.tags.length > 0 && (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 10,
                    padding: "3px 12px",
                    borderRadius: 100,
                    background: "rgba(174,183,132,0.1)",
                    border: "1px solid rgba(174,183,132,0.2)",
                    color: "rgba(174,183,132,0.7)",
                    letterSpacing: "0.06em",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </ModalBackdrop>
  );
}

export function CodeCaseStudy({
  item,
  onClose,
}: {
  item: CodeProjectItem;
  onClose: () => void;
}) {
  return (
    <ModalBackdrop onClose={onClose} wide>
      <motion.div
        initial={{ y: 32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 32, opacity: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 30 }}
        style={{
          background: "#F8F3E1",
          borderRadius: 28,
          overflow: "hidden",
          boxShadow: "0 56px 140px rgba(0,0,0,0.6)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            position: "relative",
            background: "linear-gradient(135deg,#1a2410,#2a3a18)",
            minHeight: 280,
          }}
        >
          {item.cover ? (
            <img
              src={item.cover}
              alt={item.title}
              style={{ width: "100%", display: "block", maxHeight: "45vh", objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                height: 280,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 20,
                  background: "rgba(174,183,132,0.12)",
                  border: "1px solid rgba(174,183,132,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "monospace",
                  fontSize: 26,
                  color: "rgba(174,183,132,0.6)",
                  fontWeight: 700,
                }}
              >
                {"</>"}
              </div>
              <span
                style={{
                  fontSize: 11,
                  color: "rgba(174,183,132,0.4)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Add a cover image
              </span>
            </div>
          )}

          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 100,
              background: "linear-gradient(to top, #F8F3E1, transparent)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "absolute", top: 16, left: 20, display: "flex", gap: 8 }}>
            {item.type && (
              <span
                style={{
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(248,243,225,0.85)",
                  fontWeight: 500,
                  background: "rgba(0,0,0,0.45)",
                  backdropFilter: "blur(8px)",
                  padding: "4px 12px",
                  borderRadius: 100,
                }}
              >
                {item.type}
              </span>
            )}

            {item.year && (
              <span
                style={{
                  fontSize: 10,
                  color: "rgba(248,243,225,0.6)",
                  background: "rgba(0,0,0,0.35)",
                  backdropFilter: "blur(8px)",
                  padding: "4px 12px",
                  borderRadius: 100,
                  letterSpacing: "0.06em",
                }}
              >
                {item.year}
                {item.duration ? ` · ${item.duration}` : ""}
              </span>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "rgba(0,0,0,0.5)",
              border: "1px solid rgba(255,255,255,0.15)",
              cursor: "pointer",
              color: "#F8F3E1",
              fontSize: 14,
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            x
          </motion.button>
        </div>

        <div style={{ padding: "0 40px 28px", borderBottom: "1px solid rgba(174,183,132,0.15)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
            <div style={{ flex: 1 }}>
              <h2
                className="serif"
                style={{
                  fontSize: 34,
                  fontWeight: 700,
                  color: "#41431B",
                  letterSpacing: "-0.025em",
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                {item.title}
              </h2>
              <p style={{ fontSize: 14, color: "#6B6B4A", lineHeight: 1.7 }}>{item.desc}</p>
            </div>

            <div style={{ display: "flex", gap: 8, flexShrink: 0, marginLeft: 28, paddingTop: 4 }}>
              {item.url && (
                <motion.a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    fontSize: 12,
                    padding: "9px 20px",
                    borderRadius: 100,
                    background: "rgba(65,67,27,0.88)",
                    color: "#F8F3E1",
                    textDecoration: "none",
                    letterSpacing: "0.07em",
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  Live
                </motion.a>
              )}

              {item.repo && (
                <motion.a
                  href={item.repo}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    fontSize: 12,
                    padding: "9px 20px",
                    borderRadius: 100,
                    background: "rgba(174,183,132,0.15)",
                    color: "#41431B",
                    textDecoration: "none",
                    letterSpacing: "0.07em",
                    fontWeight: 500,
                    border: "1px solid rgba(174,183,132,0.35)",
                  }}
                >
                  GitHub
                </motion.a>
              )}
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {(item.stack || []).map((stack) => (
              <span
                key={stack}
                style={{
                  fontSize: 12,
                  padding: "5px 14px",
                  borderRadius: 100,
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  background: `${STACK_COLORS[stack] || "#AEB784"}18`,
                  color: STACK_COLORS[stack] || "#4A5C28",
                  border: `1px solid ${STACK_COLORS[stack] || "#AEB784"}35`,
                }}
              >
                {stack}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div style={{ padding: "32px 36px 36px", borderRight: "1px solid rgba(174,183,132,0.12)" }}>
            {[
              { key: "problem", label: "The Problem" },
              { key: "role", label: "My Role" },
            ].map(({ key, label }) => (
              <div key={key} style={{ marginBottom: 28 }}>
                <div style={{ marginBottom: 10 }}>
                  <span
                    style={{
                      fontSize: 10,
                      color: "#AEB784",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      fontWeight: 500,
                    }}
                  >
                    {label}
                  </span>
                </div>

                <p style={{ fontSize: 14, color: "#41431B", lineHeight: 1.85 }}>
                  {item[key as keyof CodeProjectItem] || `Add a ${key} field to CODE_ITEMS.`}
                </p>
              </div>
            ))}
          </div>

          <div style={{ padding: "32px 36px 36px" }}>
            {[
              { key: "process", label: "The Process" },
              { key: "outcome", label: "Outcome" },
            ].map(({ key, label }) => (
              <div key={key} style={{ marginBottom: 28 }}>
                <div style={{ marginBottom: 10 }}>
                  <span
                    style={{
                      fontSize: 10,
                      color: "#AEB784",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      fontWeight: 500,
                    }}
                  >
                    {label}
                  </span>
                </div>

                <p style={{ fontSize: 14, color: "#41431B", lineHeight: 1.85 }}>
                  {item[key as keyof CodeProjectItem] || `Add a ${key} field to CODE_ITEMS.`}
                </p>
              </div>
            ))}
          </div>
        </div>

        {item.images && item.images.length > 0 && (
          <div
            style={{
              padding: "28px 40px 40px",
              borderTop: "1px solid rgba(174,183,132,0.12)",
            }}
          >
            <div
              style={{
                fontSize: 10,
                color: "#AEB784",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: 14,
              }}
            >
              Screenshots
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
                gap: 12,
              }}
            >
              {item.images.map((src, index) => (
                <div
                  key={index}
                  style={{
                    borderRadius: 14,
                    overflow: "hidden",
                    aspectRatio: "16/10",
                    background: "rgba(174,183,132,0.08)",
                  }}
                >
                  <img src={src} alt={`Screenshot ${index + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </ModalBackdrop>
  );
}

export function SectionModalHost({
  type,
  selectedThumbnail,
  selectedVideo,
  selectedCode,
  clearThumbnail,
  clearVideo,
  clearCode,
}: {
  type: "thumbnail" | "video" | "code";
  selectedThumbnail?: ThumbnailItem | null;
  selectedVideo?: VideoItem | null;
  selectedCode?: CodeProjectItem | null;
  clearThumbnail?: () => void;
  clearVideo?: () => void;
  clearCode?: () => void;
}) {
  return (
    <AnimatePresence>
      {type === "thumbnail" && selectedThumbnail && clearThumbnail && (
        <ThumbnailLightbox item={selectedThumbnail} onClose={clearThumbnail} />
      )}
      {type === "video" && selectedVideo && clearVideo && (
        <VideoPlayerModal item={selectedVideo} onClose={clearVideo} />
      )}
      {type === "code" && selectedCode && clearCode && (
        <CodeCaseStudy item={selectedCode} onClose={clearCode} />
      )}
    </AnimatePresence>
  );
}
