import LiquidButtonPrimary from "../ui/LiquidButtonPrimary";
import LiquidButtonGhost from "../ui/LiquidButtonGhost";

export default function Hero() {
  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" style={{ height: "100vh", padding: 40 }}>
      <h1>I make creators look world-class.</h1>

      <div style={{ marginTop: 20 }}>
        <LiquidButtonPrimary onClick={() => go("library")}>
          See Work
        </LiquidButtonPrimary>

        <LiquidButtonGhost onClick={() => go("contact")}>
          Contact
        </LiquidButtonGhost>
      </div>
    </section>
  );
}