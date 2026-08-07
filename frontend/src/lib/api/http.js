import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:8000/api/v1";

export const publicApi = axios.create({
  baseURL: `${baseURL}/public`,
});

export const adminApi = axios.create({
  baseURL: `${baseURL}/admin`,
  withCredentials: true,
});

publicApi.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const locale = document.documentElement.lang;
    if (locale) {
      config.headers["accept-language"] = locale;
    }
  }

  return config;
});
