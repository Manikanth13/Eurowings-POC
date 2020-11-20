export type GallerySection = "hot" | "top" | "user";
export type GallerySort = "viral" | "top" | "time" | "rising";
export type GalleryWindow = "day" | "week" | "month" | "year" | "all";

export interface GetGalleryRequest {
  section: GallerySection;
  sort: GallerySort;
  page: number;
  window: GalleryWindow;
  showViral: boolean;
}

export interface GalleryItem {
  account_id: number;
  account_url: string;
  score: number;
  ups: number;
  downs: number;
  title: string;
  images: GalleryMedia[];
}

export type GalleryMedia = GalleryImages | GalleryVideo;

export interface GalleryImages {
  link: string;
  type: "image/jpeg";
}

export interface GalleryVideo {
  mp4: string;
  type: "video/mp4";
}

export interface GetGalleryResponse {
  data: GalleryItem[];
  status: number;
  success: boolean;
}

export interface GetGalleryByIdResponse {
  data: GalleryItem;
  status: number;
  success: boolean;
}
