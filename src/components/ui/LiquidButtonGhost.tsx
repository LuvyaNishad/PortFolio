export default function LiquidButtonGhost({
  children,
  onClick,
}: {
  children: any;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "12px 24px",
        borderRadius: 100,
        background: "transparent",
        color: "#41431B",
        border: "1px solid #41431B",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}