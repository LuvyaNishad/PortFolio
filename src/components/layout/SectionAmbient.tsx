type SectionAmbientProps = {
  leftWidth?: string;
  leftHeight?: string;
  rightWidth?: string;
  rightHeight?: string;
};

export default function SectionAmbient({
  leftWidth = "38vw",
  leftHeight = "38vw",
  rightWidth = "30vw",
  rightHeight = "30vw",
}: SectionAmbientProps) {
  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse at 18% 24%, rgba(174,183,132,.14) 0%, transparent 34%),
            radial-gradient(ellipse at 82% 18%, rgba(210,195,160,.12) 0%, transparent 32%),
            radial-gradient(ellipse at 50% 86%, rgba(174,183,132,.10) 0%, transparent 36%)
          `,
          opacity: 0.95,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "5%",
          left: "-5%",
          width: leftWidth,
          height: leftHeight,
          background: "radial-gradient(ellipse,rgba(174,183,132,.2) 0%,transparent 70%)",
          filter: "blur(70px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "-5%",
          width: rightWidth,
          height: rightHeight,
          background: "radial-gradient(ellipse,rgba(210,195,160,.18) 0%,transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(248,243,225,0.02) 0%, rgba(174,183,132,0.035) 48%, rgba(248,243,225,0.02) 100%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
    </>
  );
}
