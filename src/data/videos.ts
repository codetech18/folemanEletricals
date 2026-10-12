export interface WorkVideo {
  id: number;
  title: string;
  description: string;
  duration: string;
  asset: string;
  poster: string;
}

export const videos: WorkVideo[] = [
  {
    id: 1,
    title: "A closer look at our work",
    description: "Electrical and lighting work from Foleman.",
    duration: "2:34",
    asset: "work-detail-01.mp4",
    poster: "IMG_1525.JPG",
  },
  {
    id: 2,
    title: "Behind the details",
    description: "See more of our electrical work.",
    duration: "4:12",
    asset: "work-detail-02.mp4",
    poster: "IMG_1527.JPG",
  },
];
