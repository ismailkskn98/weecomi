import { adminApi } from "./http";

export async function listAdminMedia(params = {}) {
  const response = await adminApi.get("/media", { params });
  return response.data;
}
