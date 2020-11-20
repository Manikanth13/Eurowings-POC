import axios, { AxiosError, AxiosResponse } from "axios";
import { ImgurBaseService } from "@/services";

export interface UploadSnapshot {
  lengthComputable: boolean;
  loaded: number;
  total: number;
}

const MESSAGES = {
  OFFLINE: "You are offline, Please connect internet",
  NOT_REACHABLE: "We are not able to connect to server at the moment",
  UNKNOWN: "Something went wrong, Please contact to administrator",
  REQUEST_CANCELLED: "request cancelled by user",
  SESSION_EXPIRED: "Session expired"
};

interface Options {
  external?: boolean;
  headers?: { [key: string]: string };
  onUploadProgress?: (snapshot: UploadSnapshot) => void;
}

const imgurBase = new ImgurBaseService();

// tslint:disable-next-line:max-classes-per-file
class NetworkError extends Error {}

class NetworkService {
  private handleError<T>(error: AxiosError<T> | NetworkError) {
    if (error instanceof NetworkError) {
      throw error;
    }

    if (error.message === "Network Error") {
      throw new NetworkError(MESSAGES.NOT_REACHABLE);
    }
    throw new NetworkError(MESSAGES.UNKNOWN);
  }

  private handleResponse<T>(response: AxiosResponse<T>) {
    if (response.status !== 200 && response.status !== 201) {
      throw new NetworkError(MESSAGES.UNKNOWN);
    }

    return response.data;
  }

  private getHeader(options?: Options) {
    const header: { [key: string]: string } = {};

    if (options && options.headers) {
      Object.assign(header, options.headers);
    }

    if (options && options.external) {
      return header;
    }

    // Imgur client id including
    const clientId = imgurBase.getClientId();
    if (clientId) {
      header["Authorization"] = `Client-ID ${clientId}`;
    }

    return header;
  }

  async get<T>(url: string, options?: Options) {
    try {
      const response = await axios.get<T>(url, {
        headers: this.getHeader(options)
      });

      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error);
    }
  }

  async post<D, T>(url: string, data: D, options?: Options) {
    try {
      const response = await axios.post<T>(url, data, {
        headers: this.getHeader(options),
        onUploadProgress: progressEvent => {
          if (options && options.onUploadProgress) {
            options.onUploadProgress({
              lengthComputable: progressEvent.lengthComputable,
              loaded: progressEvent.loaded,
              total: progressEvent.total
            });
          }
        }
      });

      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error);
    }
  }

  async patch<D, T>(url: string, data: D, options?: Options) {
    try {
      const response = await axios.patch<T>(url, data, {
        headers: this.getHeader(options),
        onUploadProgress: progressEvent => {
          if (options && options.onUploadProgress) {
            options.onUploadProgress({
              lengthComputable: progressEvent.lengthComputable,
              loaded: progressEvent.loaded,
              total: progressEvent.total
            });
          }
        }
      });

      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error);
    }
  }

  async put<D, T>(url: string, data: D, options?: Options) {
    try {
      const response = await axios.put<T>(url, data, {
        headers: this.getHeader(options)
      });

      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error);
    }
  }

  async delete<D, T>(url: string, data?: D, options?: Options) {
    try {
      const response = await axios.delete<T>(url, {
        headers: this.getHeader(options),
        data
      });

      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error);
    }
  }
}

export default new NetworkService();
