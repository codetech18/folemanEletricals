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
    title: 'Installation Timelapse',
    description: 'Full residential rewire from bare walls to complete fit-out.',
    duration: '2:34',
    asset: '8E036215-BDCE-4D48-9FB4-AD96E5A9A750.MOV',
    poster: 'IMG_1525.JPG',
  },
  {
    id: 2,
    title: 'Panel Upgrade Walkthrough',
    description: 'Israel walks through a full panel board upgrade on a commercial property.',
    duration: '4:12',
    asset: '684FDABD-4985-4E02-AA9D-4F952DC92E51.MOV',
    poster: 'IMG_1527.JPG',
  },
];
