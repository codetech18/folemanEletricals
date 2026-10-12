import image0 from "../assets/works/IMG_1508.JPG";
import image1 from "../assets/works/IMG_1509.JPG";
import image2 from "../assets/works/IMG_1510.JPG";
import image3 from "../assets/works/IMG_1513.JPG";
import image4 from "../assets/works/IMG_1515.JPG";
import image5 from "../assets/works/IMG_1517.JPG";
import image6 from "../assets/works/IMG_1518.JPG";
import image7 from "../assets/works/IMG_1520.JPG";
import image8 from "../assets/works/IMG_1521.JPG";
import image9 from "../assets/works/IMG_1522.JPG";
import image10 from "../assets/works/IMG_1523.JPG";
import image11 from "../assets/works/IMG_1524.JPG";
import image12 from "../assets/works/IMG_1525.JPG";
import image13 from "../assets/works/IMG_1527.JPG";
import video0 from "../assets/works/videos/work-detail-01.mp4";
import video1 from "../assets/works/videos/work-detail-02.mp4";

export const workImages: Record<string, string> = {
  "IMG_1508.JPG": image0,
  "IMG_1509.JPG": image1,
  "IMG_1510.JPG": image2,
  "IMG_1513.JPG": image3,
  "IMG_1515.JPG": image4,
  "IMG_1517.JPG": image5,
  "IMG_1518.JPG": image6,
  "IMG_1520.JPG": image7,
  "IMG_1521.JPG": image8,
  "IMG_1522.JPG": image9,
  "IMG_1523.JPG": image10,
  "IMG_1524.JPG": image11,
  "IMG_1525.JPG": image12,
  "IMG_1527.JPG": image13,
};
export const workVideos: Record<string, string> = {
  "work-detail-01.mp4": video0,
  "work-detail-02.mp4": video1,
};
export function resolveWorkImage(filename: string) {
  return workImages[filename];
}
export function resolveWorkVideo(filename: string) {
  return workVideos[filename];
}
