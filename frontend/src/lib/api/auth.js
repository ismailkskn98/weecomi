import { adminApi } from "./http";

export async function loginAdmin(values) {
  const response = await adminApi.post("/auth/login", values);
  return response.data.user;
}

export async function logoutAdmin() {
  await adminApi.post("/auth/logout");
}

export async function getAdminMe() {
  const response = await adminApi.get("/auth/me");
  return response.data.user;
}

export async function requestPasswordReset(email) {
  const response = await adminApi.post("/auth/forgot-password", { email });
  return response.data;
}

export async function resetAdminPassword(values) {
  const response = await adminApi.post("/auth/reset-password", values);
  return response.data;
}
