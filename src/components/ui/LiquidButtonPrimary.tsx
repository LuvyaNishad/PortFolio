export default function LiquidButtonPrimary({
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
        background: "#41431B",
        color: "#fff",
        border: "none",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}