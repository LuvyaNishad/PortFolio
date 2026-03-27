import { NAV_LINKS } from "../../data/navLinks";

export default function Nav() {
  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
        display: "flex",
        gap: 20,
        background: "rgba(255,255,255,0.6)",
        padding: "10px 20px",
        borderRadius: 100,
      }}
    >
      {NAV_LINKS.map(link => (
        <button
          key={link.id}
          onClick={() => go(link.id)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          {link.label}
        </button>
      ))}
    </div>
  );
}