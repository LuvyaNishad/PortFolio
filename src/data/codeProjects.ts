export type CodeProjectItem = {
  title: string;
  desc: string;
  year?: string;
  stack?: string[];
  url?: string;
  repo?: string;
  cover?: string;
  images?: string[];
  problem?: string;
  role?: string;
  process?: string;
  outcome?: string;
  duration?: string;
  type?: string;
};

export const STACK_COLORS: Record<string, string> = {
  React: "#61DAFB",
  "Next.js": "#888",
  TypeScript: "#3178C6",
  "Three.js": "#049EF4",
  GLSL: "#A040A0",
  Tailwind: "#38BDF8",
  "Node.js": "#339933",
  Python: "#3776AB",
  Figma: "#F24E1E",
  JavaScript: "#F7DF1E",
  CSS: "#264DE4",
  HTML: "#E34F26",
  Svelte: "#FF3E00",
  Vue: "#42B883",
};

export const CODE_ITEMS: CodeProjectItem[] = [];
