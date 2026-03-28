export type GraphicItem = {
  img?: string;
  title: string;
  tags?: string[];
  year?: string;
  ratio?: number;
};

export const GRAPHIC_ITEMS: GraphicItem[] = [
  {
    img: "/graphics/GOT%20POSTER.jpg",
    title: "GOT Poster",
    tags: ["Poster"],
    year: "2024",
    ratio: 0.75,
  },
  {
    img: "/graphics/Homelander%20poster.jpg",
    title: "Homelander Poster",
    tags: ["Poster"],
    year: "2024",
    ratio: 0.75,
  },
  {
    img: "/graphics/House%20Poster.jpg",
    title: "House Poster",
    tags: ["Poster"],
    year: "2024",
    ratio: 0.75,
  },
  {
    img: "/graphics/Leon%20Poster.jpg",
    title: "Leon Poster",
    tags: ["Poster"],
    year: "2024",
    ratio: 0.75,
  },
];
