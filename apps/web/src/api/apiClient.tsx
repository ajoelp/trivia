import axios from "axios";
import { Config } from "../config";
import Cookies from "js-cookie";

export const apiClient = axios.create({
  baseURL: Config.apiUrl ?? "/",
});

apiClient.interceptors.request.use((config) => {
  const tokenCookie = Cookies.get("AUTH_TOKEN");

  if (tokenCookie) {
    config.headers = {
      ...(config.headers ?? {}),
      Authorization: `Bearer ${tokenCookie}`,
    };
  }

  return config;
});
