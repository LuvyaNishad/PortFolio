import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "../ui/Reveal";

const SERVICES = [
  "Thumbnail Design",
  "Video Editing",
  "Graphic Design / Branding",
  "Web Development",
  "Full Creative Package",
  "Not sure yet",
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const setField =
    (key: keyof typeof form) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((current) => ({ ...current, [key]: event.target.value }));
    };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("sending");

    const res = await fetch("https://formspree.io/f/mreoeyjr", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setStatus(res.ok ? "sent" : "idle");
  };


  const darkInputStyle: React.CSSProperties = {
    width: "100%",
    padding: "13px 18px",
    borderRadius: 14,
    background: "rgba(248,243,225,0.06)",
    border: "1px solid rgba(248,243,225,0.12)",
    fontSize: 14,
    color: "var(--cream)",
    outline: "none",
    transition: "border-color .2s, box-shadow .2s",
    backdropFilter: "blur(8px)",
  };

  return (
    <section
      id="contact"
      style={{
        position: "relative",
        zIndex: "var(--z-content)",
        padding: "120px 6vw 0",
        background: "var(--olive-panel)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(18,22,8,0.08) 0%, rgba(12,16,5,0.26) 18%, rgba(10,14,4,0.34) 52%, rgba(8,10,3,0.5) 100%)",
          pointerEvents: "none",
          zIndex: "var(--z-background)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.06,
          pointerEvents: "none",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "60vw",
          height: "60vw",
          background: "radial-gradient(ellipse,rgba(174,183,132,0.16) 0%,transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "-5%",
          width: "45vw",
          height: "45vw",
          background: "radial-gradient(ellipse,rgba(241,235,207,0.08) 0%,transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          right: "-0.04em",
          top: "12%",
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: "clamp(110px,15vw,200px)",
          fontWeight: 700,
          fontStyle: "italic",
          color: "rgba(248,243,225,0.06)",
          letterSpacing: "-0.04em",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          whiteSpace: "nowrap",
          zIndex: "var(--z-background)",
        }}
      >
        Let&apos;s
      </div>

      <div
        style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: "var(--z-content)", paddingBottom: 100 }}
      >
        <Reveal variant="zoom" style={{ marginBottom: 64 }}>
          <div
            style={{
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "rgba(174,183,132,0.7)",
              marginBottom: 14,
              fontWeight: 500,
            }}
          >
            * Contact
          </div>

          <h2
            className="serif"
            style={{
              fontSize: "clamp(38px,5vw,68px)",
              fontWeight: 600,
              color: "var(--cream)",
              lineHeight: 0.96,
              letterSpacing: "-0.035em",
              marginBottom: 20,
            }}
          >
            Let&apos;s build something
            <br />
            <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--sage)", letterSpacing: "-0.01em" }}>
              worth sharing.
            </span>
          </h2>

          <p
            style={{
              fontSize: 16,
              color: "rgba(248,243,225,0.6)",
              maxWidth: 460,
              lineHeight: 1.75,
              fontWeight: 400,
              letterSpacing: "0.005em",
            }}
          >
            Tell me what you&apos;re working on and what you need. I&apos;ll get back to you within 24 hours.
          </p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 40, alignItems: "start" }}>
          <Reveal delay={0.1} variant="slideLeft">
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <div
                style={{
                  borderRadius: 24,
                  padding: "24px 26px",
                  background: "rgba(248,243,225,0.06)",
                  border: "1px solid rgba(248,243,225,0.10)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: "rgba(174,183,132,0.7)",
                    marginBottom: 10,
                  }}
                >
                  Email directly
                </div>

                <a
                  href="mailto:luvyanishad@gmail.com"
                  style={{
                    display: "block",
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 20,
                    fontWeight: 600,
                    color: "var(--cream)",
                    textDecoration: "none",
                    borderBottom: "1.5px solid rgba(174,183,132,0.3)",
                    paddingBottom: 4,
                    width: "fit-content",
                  }}
                >
                  luvyanishad@gmail.com
                </a>
              </div>

              <div
                style={{
                  borderRadius: 24,
                  padding: "24px 26px",
                  background: "rgba(248,243,225,0.06)",
                  border: "1px solid rgba(248,243,225,0.10)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: "rgba(174,183,132,0.7)",
                    marginBottom: 16,
                  }}
                >
                  What I can help with
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    "Thumbnails & Social Graphics",
                    "Video Editing & Reels",
                    "Brand Identity & Print",
                    "Websites & Web Apps",
                  ].map((label) => (
                    <div
                      key={label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        fontSize: 13,
                        color: "rgba(248,243,225,0.65)",
                        fontWeight: 400,
                      }}
                    >
                      <span
                        style={{
                          width: 24,
                          textAlign: "center",
                          flexShrink: 0,
                          color: "var(--sage)",
                          fontWeight: 700,
                        }}
                      >
                        +
                      </span>
                      {label}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {["Twitter", "LinkedIn", "Dribbble", "GitHub", "YouTube"].map((name) => (
                  <motion.a
                    key={name}
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.06, background: "rgba(174,183,132,0.18)" }}
                    whileTap={{ scale: 0.96 }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 7,
                      padding: "9px 16px",
                      borderRadius: 100,
                      cursor: "pointer",
                      fontSize: 11,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      fontWeight: 500,
                      color: "rgba(174,183,132,0.85)",
                      border: "1px solid rgba(174,183,132,0.25)",
                      background: "rgba(174,183,132,0.06)",
                      textDecoration: "none",
                    }}
                  >
                    {name}
                  </motion.a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2} variant="slideRight">
            <div
              style={{
                borderRadius: 24,
                padding: "36px 34px",
                background: "rgba(248,243,225,0.06)",
                border: "1px solid rgba(248,243,225,0.10)",
                backdropFilter: "blur(16px)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-40%",
                  right: "-20%",
                  width: "60%",
                  height: "60%",
                  background: "radial-gradient(ellipse,rgba(174,183,132,.08) 0%,transparent 70%)",
                  pointerEvents: "none",
                }}
              />

              {status === "sent" ? (
                <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "40px 0" }}>
                  <div className="serif" style={{ fontSize: 44, color: "var(--sage)", marginBottom: 20 }}>
                    *
                  </div>
                  <h3 className="serif" style={{ fontSize: 28, fontWeight: 600, color: "var(--cream)", marginBottom: 12 }}>
                    Message received.
                  </h3>
                  <p style={{ fontSize: 14, color: "rgba(248,243,225,0.6)", lineHeight: 1.7 }}>
                    I&apos;ll be in touch within 24 hours. Looking forward to working together.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {[
                      { key: "name", placeholder: "Your name", type: "text" },
                      { key: "email", placeholder: "Your email", type: "email" },
                    ].map(({ key, placeholder, type }) => (
                      <input
                        key={key}
                        type={type}
                        placeholder={placeholder}
                        value={form[key as keyof typeof form]}
                        onChange={setField(key as keyof typeof form)}
                        required
                        style={darkInputStyle}
                      />
                    ))}
                  </div>

                  <div style={{ position: "relative" }}>
                    <select
                      value={form.service}
                      onChange={setField("service")}
                      style={{ ...darkInputStyle, appearance: "none", WebkitAppearance: "none" }}
                    >
                      <option value="" disabled>
                        What do you need help with?
                      </option>
                      {SERVICES.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>

                    <span
                      style={{
                        position: "absolute",
                        right: 18,
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                        color: "rgba(174,183,132,0.6)",
                        fontSize: 12,
                      }}
                    >
                      v
                    </span>
                  </div>

                  <textarea
                    placeholder="Tell me about your project - goals, timeline, any details that help..."
                    value={form.message}
                    onChange={setField("message")}
                    required
                    rows={5}
                    style={{ ...darkInputStyle, resize: "vertical", minHeight: 120 }}
                  />

                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    whileHover={{ scale: 1.02, background: "rgba(174,183,132,0.28)" }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      width: "100%",
                      padding: "14px 32px",
                      borderRadius: 14,
                      border: "1px solid rgba(174,183,132,0.4)",
                      cursor: "pointer",
                      background: "rgba(174,183,132,0.16)",
                      color: "var(--cream)",
                      fontSize: 14,
                      fontWeight: 500,
                      letterSpacing: "0.06em",
                      backdropFilter: "blur(8px)",
                      opacity: status === "sending" ? 0.7 : 1,
                    }}
                  >
                    {status === "sending" ? "Sending..." : "Send Message"}
                  </motion.button>

                  <p
                    style={{
                      fontSize: 11,
                      color: "rgba(248,243,225,0.3)",
                      textAlign: "center",
                      letterSpacing: "0.04em",
                    }}
                  >
                    No spam. I reply within 24 hours.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
