import axios from "axios";
import { GetTokenInSsr } from "./getTokenInssr";
import RedirectInCsc from "./redirectIncCsc";

const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
});
axiosInstance.interceptors.request.use(async (config) => {
  // const token = await GetTokenInSsr().then((res) => res?.value);

  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  }
  // config.headers.Authorization = `Bearer ${token}`;

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: any) => {
    console.log(error);

    if (
      error?.response?.data?.message == "Unauthorized" ||
      error?.response?.data?.message == "Unauthenticated."
    ) {
      console.log(error?.response?.data, "Unauthorized");
      await RedirectInCsc();
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
