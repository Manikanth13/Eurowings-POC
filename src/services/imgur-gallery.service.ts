import { ImgurBaseService, NetworkService } from "@/services";
import {
  GalleryItem,
  GetGalleryByIdResponse,
  GetGalleryRequest,
  GetGalleryResponse
} from "@/types";

export const defaultGalleryGetRequest: GetGalleryRequest = {
  page: 1,
  section: "hot",
  showViral: true,
  window: "day",
  sort: "viral"
};

class ImgurGalleryService extends ImgurBaseService {
  public async getGallery(
    request: GetGalleryRequest = defaultGalleryGetRequest
  ) {
    const response = await NetworkService.get<GetGalleryResponse>(
      `${this.base_url}/gallery/${request.section}/${request.sort}/${request.window}/${request.page}?showViral=${request.showViral}`
    );
    if (response) {
      return response.data
        .map(x => ({
          ...x,
          images: (x.images || []).filter(x => x.type === "image/jpeg")
        }))
        .filter(x => x.images.length);
    }
    return [];
  }

  public async getGalleryDetail(id: string) {
    const response = await NetworkService.get<GetGalleryByIdResponse>(
      `${this.base_url}/gallery/${id}`
    );
    if (!response) {
      return {} as GalleryItem;
    }
    return response.data;
  }
}

export default new ImgurGalleryService();
