import { adminApi, publicApi } from "./http";

export async function listPublicNews(params = {}) {
  const { locale, ...query } = params;
  const response = await publicApi.get("/news", {
    params: locale ? { ...query, locale } : query,
    headers: locale ? { "accept-language": locale } : undefined,
  });
  return response.data;
}

export async function getPublicNewsBySlug(slug, locale) {
  const response = await publicApi.get(`/news/slug/${slug}`, { params: { locale } });
  return response.data.item;
}

export async function listAdminNews(params = {}) {
  const response = await adminApi.get("/news", { params });
  return response.data;
}

export async function getAdminNews(id) {
  const response = await adminApi.get(`/news/${id}`);
  return response.data.item;
}

export async function createAdminNews(formData) {
  const response = await adminApi.post("/news", formData);
  return response.data.item;
}

export async function updateAdminNews(id, formData) {
  const response = await adminApi.patch(`/news/${id}`, formData);
  return response.data.item;
}

export async function deleteAdminNews(id) {
  const response = await adminApi.delete(`/news/${id}`);
  return response.data;
}
