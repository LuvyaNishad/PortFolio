import { useEffect, useRef, useState } from "react";

export default function useScrollSpy(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState("hero");
  const navLocked = useRef(false);
  const lockTimer = useRef<number | null>(null);

  const lockToSection = (id: string) => {
    navLocked.current = true;

    if (lockTimer.current !== null) {
      window.clearTimeout(lockTimer.current);
    }

    setActiveSection(id);

    lockTimer.current = window.setTimeout(() => {
      navLocked.current = false;
    }, 900);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (navLocked.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.35 }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();

      if (lockTimer.current !== null) {
        window.clearTimeout(lockTimer.current);
      }
    };
  }, [sectionIds]);

  return {
    activeSection,
    setActiveSection: lockToSection,
  };
}
