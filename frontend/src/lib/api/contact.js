import { adminApi, publicApi } from "./http";

export async function submitPublicContact(payload) {
  const response = await publicApi.post("/contact", payload);
  return response.data.item;
}

export async function listAdminContactSubmissions(params = {}) {
  const response = await adminApi.get("/contact", { params });
  return response.data;
}

export async function getAdminContactSubmission(id) {
  const response = await adminApi.get(`/contact/${id}`);
  return response.data.item;
}

export async function updateAdminContactSubmission(id, payload) {
  const response = await adminApi.patch(`/contact/${id}`, payload);
  return response.data.item;
}

export async function deleteAdminContactSubmission(id) {
  const response = await adminApi.delete(`/contact/${id}`);
  return response.data;
}
