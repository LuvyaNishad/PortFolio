export type NavLink = {
  label: string;
  id: string;
  external?: string;
};

export const GITHUB_USERNAME = "LuvyaNishad";

export const NAV_LINKS: NavLink[] = [
  { label: "About", id: "about" },
  { label: "Tools", id: "tools" },
  { label: "Library", id: "library" },
  { label: "Contact", id: "contact" },
  { label: "Resume", id: "resume", external: "/resume.pdf" },
];
