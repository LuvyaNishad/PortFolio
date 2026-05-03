export default function BottomViewportBlur() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        height: "clamp(44px, 7vh, 78px)",
        zIndex: "var(--z-nav)",
        pointerEvents: "none",
        backdropFilter: "blur(6px) saturate(102%)",
        WebkitBackdropFilter: "blur(6px) saturate(102%)",
        background:
          "linear-gradient(180deg, rgba(248,243,225,0) 0%, rgba(248,243,225,0.012) 42%, rgba(242,236,213,0.045) 78%, rgba(236,229,204,0.08) 100%)",
        maskImage:
          "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.04) 16%, rgba(0,0,0,0.18) 38%, rgba(0,0,0,0.45) 68%, rgba(0,0,0,0.9) 100%)",
        WebkitMaskImage:
          "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.04) 16%, rgba(0,0,0,0.18) 38%, rgba(0,0,0,0.45) 68%, rgba(0,0,0,0.9) 100%)",
      }}
    />
  );
}
