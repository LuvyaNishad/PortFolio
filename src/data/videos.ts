export type VideoItem = {
  thumb?: string;
  title: string;
  category?: string;
  duration?: string;
  client?: string;
  desc?: string;
  tags?: string[];
  url?: string;
  embedUrl?: string;
};

export const VIDEO_ITEMS: VideoItem[] = [];
