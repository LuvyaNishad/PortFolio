import { useEffect, useState } from "react";

export default function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const handler = () => {
      let current = "";
      ids.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 150) current = id;
      });
      setActive(current);
    };

    window.addEventListener("scroll", handler);
    handler();

    return () => window.removeEventListener("scroll", handler);
  }, []);

  return active;
}