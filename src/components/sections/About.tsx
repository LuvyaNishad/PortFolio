import Reveal from "../ui/Reveal";
import SLabel from "../ui/SLabel";

export default function About() {
  return (
    <section id="about" style={{ height: "100vh", padding: 40 }}>
      <SLabel>About</SLabel>

      <Reveal>
        <h2>Most creators have great work.</h2>
      </Reveal>

      <Reveal delay={0.2}>
        <p>Not enough people see it.</p>
      </Reveal>
    </section>
  );
}