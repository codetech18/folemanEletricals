type AssetModule = {
  default: string;
};

const imageModules = import.meta.glob<AssetModule>('@/assets/works/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
});

const videoModules = import.meta.glob<AssetModule>(
  ['@/assets/works/*.{mp4,webm,ogg,mov,MOV}', '@/assets/works/videos/*.{mp4,webm,ogg,mov,MOV}'],
  {
    eager: true,
  },
);

function filenameFromPath(path: string) {
  return path.split('/').at(-1) ?? path;
}

export const workImages = Object.fromEntries(
  Object.entries(imageModules).map(([path, module]) => [filenameFromPath(path), module.default]),
);

export const workVideos = Object.fromEntries(
  Object.entries(videoModules).map(([path, module]) => [filenameFromPath(path), module.default]),
);

export function resolveWorkImage(filename: string) {
  return workImages[filename];
}

export function resolveWorkVideo(filename: string) {
  return workVideos[filename];
}
