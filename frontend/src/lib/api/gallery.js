import { adminApi, publicApi } from "./http";

export async function listPublicGallery(params = {}) {
  const response = await publicApi.get("/gallery", { params });
  return response.data;
}

export async function listAdminGallery(params = {}) {
  const response = await adminApi.get("/gallery", { params });
  return response.data;
}

export async function getAdminGallery(id) {
  const response = await adminApi.get(`/gallery/${id}`);
  return response.data.item;
}

export async function createAdminGallery(formData) {
  const response = await adminApi.post("/gallery", formData);
  return response.data.item;
}

export async function updateAdminGallery(id, formData) {
  const response = await adminApi.patch(`/gallery/${id}`, formData);
  return response.data.item;
}

export async function deleteAdminGallery(id) {
  const response = await adminApi.delete(`/gallery/${id}`);
  return response.data;
}
