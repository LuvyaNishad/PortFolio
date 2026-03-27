export default function SLabel({ children }: { children: any }) {
  return (
    <div
      style={{
        fontSize: 12,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        marginBottom: 16,
        color: "#AEB784",
      }}
    >
      {children}
    </div>
  );
}