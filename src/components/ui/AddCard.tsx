import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ComingSoonModal } from "../sections/Project";

type AddCardProps = {
  label: string;
  icon: React.ReactNode;
  tall?: boolean;
  type?: "thumbnail" | "video" | "graphic" | "code";
};

export default function AddCard({
  label,
  icon,
  tall = false,
  type = "thumbnail",
}: AddCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        onClick={() => setOpen(true)}
        style={{
          borderRadius: 24,
          border: "1.5px dashed rgba(174,183,132,0.4)",
          background: "rgba(248,243,225,0.4)",
          backdropFilter: "blur(10px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          cursor: "pointer",
          minHeight: tall ? 300 : 220,
          padding: 28,
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "rgba(174,183,132,.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            color: "#4A5C28",
          }}
        >
          {icon}
        </div>

        <div style={{ textAlign: "center" }}>
          <span
            style={{
              display: "block",
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(174,183,132,.6)",
              fontWeight: 500,
            }}
          >
            {label}
          </span>

          <span
            style={{
              display: "block",
              marginTop: 4,
              fontSize: 10,
              color: "rgba(174,183,132,.4)",
              letterSpacing: "0.08em",
            }}
          >
            Click for template
          </span>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && <ComingSoonModal type={type} icon={icon} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
