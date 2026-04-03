import WorkSection from "./work/WorkSection";
import Reveal from "../ui/Reveal";
import { GITHUB_USERNAME } from "../../data/navLinks";

export default function GitHubContributions() {
  const username = GITHUB_USERNAME;
  const hasUsername = Boolean(username.trim()) && username.trim().toLowerCase() !== "your-username";
  const chartUrl = `https://ghchart.rshah.org/8a9b66/${username}`;

  return (
    <WorkSection
      id="github"
      label="GitHub"
      title="Contribution"
      italic="Map"
      desc="A quick snapshot of my recent coding activity."
      headingVariant="fade"
      sectionNum="05"
      padding="120px 6vw 96px"
      titleWeight={600}
      italicWeight={300}
    >
      <Reveal variant="up">
        <div
          className="matte"
          style={{
            borderRadius: 24,
            padding: "16px 18px",
            background:
              "linear-gradient(135deg, rgba(248,243,225,0.75) 0%, rgba(240,236,220,0.55) 100%)",
            border: "1px solid rgba(174,183,132,0.28)",
            boxShadow: "0 20px 60px rgba(35,42,18,0.18), inset 0 1px 0 rgba(255,255,255,0.6)",
            backdropFilter: "blur(14px) saturate(1.1)",
            WebkitBackdropFilter: "blur(14px) saturate(1.1)",
            overflow: "hidden",
          }}
        >
          {hasUsername ? (
            <img
              src={chartUrl}
              alt={`${username} GitHub contributions`}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          ) : (
            <div style={{ padding: "22px 10px", textAlign: "center", color: "#6B6B4A", fontSize: 14 }}>
              Set <code>GITHUB_USERNAME</code> in <code>src/data/navLinks.ts</code> to show your chart.
            </div>
          )}
        </div>
      </Reveal>
    </WorkSection>
  );
}
