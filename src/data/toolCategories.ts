type ToolIconComponent = () => JSX.Element;

export type ToolItem = {
  name: string;
  Icon: ToolIconComponent;
};

export type ToolCategory = {
  id: string;
  label: string;
  icon: JSX.Element;
  tools: ToolItem[];
};

export const Icons = {
  PremierePro: () => (
    <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
      <rect width="24" height="24" rx="4" fill="#9999FF" opacity=".15" />
      <path d="M6 16V8h3.5c1.93 0 3 1.05 3 2.8 0 1.78-1.1 2.9-3.06 2.9H7.6V16H6zm1.6-4.6h1.8c1 0 1.5-.5 1.5-1.6 0-1.08-.5-1.6-1.5-1.6H7.6v3.2zm6.5 4.6v-5.8h1.5v.9c.4-.65 1-.95 1.8-.95.2 0 .38.02.55.06v1.4a2 2 0 00-.65-.1c-.9 0-1.6.6-1.6 1.8V16H14.1z" fill="#9999FF" />
    </svg>
  ),
  AfterEffects: () => (
    <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
      <rect width="24" height="24" rx="4" fill="#9999FF" opacity=".15" />
      <path d="M4 16l3.5-8h1.2L12 16h-1.5l-.8-2H7.3L6.5 16H4zm3.7-3.2h1.6l-.8-2.3-.8 2.3zm6.3-.3c0 2.1 1.1 3.7 3 3.7.85 0 1.5-.28 2-.8v.6H20.5V8H19v3.5c-.5-.55-1.15-.85-2-.85-1.9 0-3 1.6-3 3.8zm1.5 0c0-1.4.6-2.35 1.7-2.35 1.1 0 1.7.92 1.7 2.35 0 1.42-.6 2.35-1.7 2.35-1.1 0-1.7-.94-1.7-2.35z" fill="#9999FF" />
    </svg>
  ),
  DaVinci: () => (
    <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
      <rect width="24" height="24" rx="4" fill="#E8A020" opacity=".15" />
      <circle cx="12" cy="12" r="5" stroke="#E8A020" strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="12" r="2" fill="#E8A020" />
    </svg>
  ),
  CapCut: () => (
    <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
      <rect width="24" height="24" rx="4" fill="#000" opacity=".1" />
      <path d="M8 7l8 5-8 5V7z" fill="#41431B" />
    </svg>
  ),
  Photoshop: () => (
    <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
      <rect width="24" height="24" rx="4" fill="#31A8FF" opacity=".15" />
      <path d="M5 16V8h3.2c2.1 0 3.3 1.1 3.3 3 0 1.95-1.25 3.05-3.35 3.05H6.6V16H5zm1.6-4.25h1.5c1.1 0 1.7-.55 1.7-1.72 0-1.15-.6-1.72-1.7-1.72H6.6v3.44zM13.5 13.7c.05.8.62 1.3 1.6 1.3.78 0 1.28-.35 1.28-.9 0-.5-.32-.76-1.2-1l-.7-.2c-1.3-.38-1.9-1-1.9-2.05 0-1.2.96-2 2.5-2 1.6 0 2.5.85 2.55 2.2h-1.45c-.05-.72-.5-1.12-1.15-1.12-.65 0-1.05.32-1.05.82 0 .44.28.68 1.1.92l.7.2c1.38.4 2 1.02 2 2.1 0 1.3-1 2.12-2.72 2.12-1.7 0-2.72-.88-2.78-2.4H13.5z" fill="#31A8FF" />
    </svg>
  ),
  Illustrator: () => (
    <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
      <rect width="24" height="24" rx="4" fill="#FF9A00" opacity=".15" />
      <path d="M6 16l3.2-8h1.6L14 16h-1.7l-.75-2.1H8.45L7.7 16H6zm2.9-3.4h2l-1-2.9-1 2.9zm6.2 3.4V8.5h1.5V16H15.1z" fill="#FF9A00" />
    </svg>
  ),
  Figma: () => (
    <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
      <rect width="24" height="24" rx="4" fill="#F24E1E" opacity=".1" />
      <path d="M9 3h3v4.5H9A2.25 2.25 0 019 3z" fill="#F24E1E" />
      <path d="M9 7.5h3V12H9a2.25 2.25 0 010-4.5z" fill="#A259FF" />
      <path d="M9 12h3v4.5A2.25 2.25 0 019 12z" fill="#0ACF83" />
      <path d="M12 7.5h3a2.25 2.25 0 010 4.5h-3V7.5z" fill="#1ABCFE" />
      <circle cx="14.25" cy="12" r="2.25" fill="#0ACF83" />
    </svg>
  ),
  Canva: () => (
    <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
      <rect width="24" height="24" rx="12" fill="#7D2AE8" opacity=".15" />
      <path d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 9.5c-1.93 0-3.5-1.57-3.5-3.5S10.07 8.5 12 8.5c.9 0 1.72.34 2.34.9l-1.08 1.08A1.97 1.97 0 0012 10a2 2 0 000 4c.76 0 1.42-.43 1.76-1.06l1.22.7A3.5 3.5 0 0112 15.5z" fill="#7D2AE8" />
    </svg>
  ),
  React: () => (
    <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
      <rect width="24" height="24" rx="4" fill="#61DAFB" opacity=".12" />
      <circle cx="12" cy="12" r="2" fill="#61DAFB" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.2" fill="none" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)" />
    </svg>
  ),
  TypeScript: () => (
    <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
      <rect width="24" height="24" rx="4" fill="#3178C6" opacity=".15" />
      <path d="M5 13.5h4.5V15H7.3v4.5H5.8V15H5v-1.5zm5.5 0h4.5v1.3h-1.5V19.5h-1.5V14.8H10.5v-1.3z" fill="#3178C6" />
      <path d="M4 5h16v8H4V5z" fill="#3178C6" opacity=".15" />
      <path d="M6 8.5h2.5c.8 0 1.5.6 1.5 1.5s-.7 1.5-1.5 1.5H7.5V13H6V8.5zm1.5 2h.8c.3 0 .5-.2.5-.5s-.2-.5-.5-.5h-.8V10.5z" fill="#3178C6" />
    </svg>
  ),
  NextJS: () => (
    <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
      <rect width="24" height="24" rx="4" fill="#000" opacity=".08" />
      <path d="M12 4a8 8 0 100 16A8 8 0 0012 4zm-1.5 4.5h1.5v4.2l3-4.2H16.5l-3.3 4.5L16.8 17H15l-3-4.5V17H10.5V8.5z" fill="#41431B" />
    </svg>
  ),
  Tailwind: () => (
    <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
      <rect width="24" height="24" rx="4" fill="#38BDF8" opacity=".12" />
      <path d="M8 10c.5-2 2-3 3.5-2.5-1 1-1 2 .5 2.5 1.5.5 3-.5 3.5-2C16.5 10 16 12 14 12.5c-2 .5-3.5-.5-3.5-2C10 12 9 13.5 7 13.5c2 .5 3 2.5 2 4C7.5 15.5 7.5 12 8 10zm3 4c.5-2 2-3 3.5-2.5-1 1-1 2 .5 2.5 1.5.5 3-.5 3.5-2-.5 2-1 4-3 4.5-2 .5-3.5-.5-3.5-2C12 16 11 17.5 9 17.5c2 .5 3 2.5 2 4C9.5 19.5 10.5 16 11 14z" fill="#38BDF8" />
    </svg>
  ),
  ThreeJS: () => (
    <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
      <rect width="24" height="24" rx="4" fill="#000" opacity=".08" />
      <path d="M12 4L4 18h16L12 4zm0 3.5l5.5 9.5h-11L12 7.5z" fill="#41431B" opacity=".7" />
      <path d="M12 10l2.75 4.75H9.25L12 10z" fill="#41431B" />
    </svg>
  ),
  MotionGraphics: () => (
    <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
      <rect width="24" height="24" rx="4" fill="#9999FF" opacity=".12" />
      <path d="M5 12c0-3.87 3.13-7 7-7s7 3.13 7 7" stroke="#9999FF" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M5 12c0 3.87 3.13 7 7 7s7-3.13 7-7" stroke="#9999FF" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="2 2" />
      <circle cx="12" cy="12" r="2" fill="#9999FF" />
    </svg>
  ),
  BrandIdentity: () => (
    <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
      <rect width="24" height="24" rx="4" fill="#FF9A00" opacity=".12" />
      <circle cx="12" cy="10" r="3.5" stroke="#FF9A00" strokeWidth="1.5" fill="none" />
      <path d="M6 19c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#FF9A00" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  ),
};

export const TOOL_CATEGORIES: ToolCategory[] = [
  {
    id: "video",
    label: "Video Editing",
    icon: (
      <svg viewBox="0 0 22 22" fill="none" width="20" height="20">
        <rect width="22" height="22" rx="6" fill="rgba(174,183,132,.15)" />
        <path d="M4 7h9v8H4V7zm10 1.5l4-2v7l-4-2V8.5z" fill="#4A5C28" />
      </svg>
    ),
    tools: [
      { name: "Adobe Premiere Pro", Icon: Icons.PremierePro },
      { name: "After Effects", Icon: Icons.AfterEffects },
      { name: "DaVinci Resolve", Icon: Icons.DaVinci },
      { name: "CapCut", Icon: Icons.CapCut },
      { name: "Motion Graphics", Icon: Icons.MotionGraphics },
    ],
  },
  {
    id: "design",
    label: "Graphic Design",
    icon: (
      <svg viewBox="0 0 22 22" fill="none" width="20" height="20">
        <rect width="22" height="22" rx="6" fill="rgba(174,183,132,.15)" />
        <circle cx="11" cy="11" r="5" stroke="#4A5C28" strokeWidth="1.5" fill="none" />
        <circle cx="11" cy="11" r="2" fill="#4A5C28" />
        <path d="M11 4v2M11 16v2M4 11h2M16 11h2" stroke="#4A5C28" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
    tools: [
      { name: "Adobe Photoshop", Icon: Icons.Photoshop },
      { name: "Adobe Illustrator", Icon: Icons.Illustrator },
      { name: "Figma", Icon: Icons.Figma },
      { name: "Canva", Icon: Icons.Canva },
      { name: "Brand Identity", Icon: Icons.BrandIdentity },
    ],
  },
  {
    id: "dev",
    label: "Development",
    icon: (
      <svg viewBox="0 0 22 22" fill="none" width="20" height="20">
        <rect width="22" height="22" rx="6" fill="rgba(174,183,132,.15)" />
        <path d="M7 8l-4 3 4 3M15 8l4 3-4 3M13 6l-4 10" stroke="#4A5C28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    tools: [
      { name: "React / Next.js", Icon: Icons.React },
      { name: "TypeScript", Icon: Icons.TypeScript },
      { name: "Next.js", Icon: Icons.NextJS },
      { name: "Tailwind CSS", Icon: Icons.Tailwind },
      { name: "Three.js / WebGL", Icon: Icons.ThreeJS },
    ],
  },
];
