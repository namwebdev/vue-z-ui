export const MAX_SIZE_DEFAULT = 1000000;

export interface ImageObj {
  id: string;
  file: File;
  url: string;
}

export const ImageFormat = {
  JPG: "jpg",
  PNG: "png",
  JPEG: "jpeg",
} as const;
export type ImageFormat = (typeof ImageFormat)[keyof typeof ImageFormat];

export type Formats = ImageFormat | "*";
