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
          border: "1px solid rgba(255,255,255,0.58)",
          background: "linear-gradient(180deg, rgba(248,243,225,0.68) 0%, rgba(244,238,217,0.5) 100%)",
          backdropFilter: "blur(18px) saturate(1.15)",
          WebkitBackdropFilter: "blur(18px) saturate(1.15)",
          boxShadow: "0 22px 46px rgba(65,67,27,0.12), inset 0 1px 0 rgba(255,255,255,0.7)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          cursor: "pointer",
          minHeight: tall ? 300 : 220,
        }}
      >
        <div
          style={{
            flex: 1,
            minHeight: tall ? 220 : 156,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            padding: "28px 24px 22px",
            background:
              "linear-gradient(180deg, rgba(248,243,225,0.18) 0%, rgba(248,243,225,0.08) 100%)",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.24)",
              border: "1px solid rgba(255,255,255,0.42)",
              boxShadow: "0 8px 24px rgba(65,67,27,0.08), inset 0 1px 0 rgba(255,255,255,0.55)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              color: "#4A5C28",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            {icon}
          </div>
        </div>

        <div
          style={{
            padding: "16px 18px 18px",
            borderTop: "1px solid rgba(255,255,255,0.38)",
            background: "rgba(248,243,225,0.56)",
            backdropFilter: "blur(16px) saturate(1.08)",
            WebkitBackdropFilter: "blur(16px) saturate(1.08)",
            textAlign: "center",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.45)",
          }}
        >
          <span
            style={{
              display: "block",
              fontSize: 11.5,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#87944E",
              fontWeight: 600,
            }}
          >
            {label}
          </span>

          <span
            style={{
              display: "block",
              marginTop: 4,
              fontSize: 10.5,
              color: "rgba(116,128,69,0.72)",
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
