import axios from "axios";
import { getSession } from "next-auth/react";
import { auth } from "./auth";

const BASE_URL = 'https://api.kunjungfamily.site/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    let accessToken;

    if (typeof window === "undefined") {
      // Server-side
      const session = await auth();
      accessToken = session?.accessToken;
    } else {
      // Client-side
      const session = await getSession();
      accessToken = session?.accessToken;
    }

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;