import { api, BASE_URL } from './api';

export function loginWithGoogle(rememberMe = false) {
  window.location.href = `${BASE_URL}/api/auth/google?remember=${rememberMe}`;
}
export function loginWithFacebook(rememberMe = false) {
  window.location.href = `${BASE_URL}/api/auth/facebook?remember=${rememberMe}`;
}
export async function register({ name, email, password, remember = false }) {
  return api("/api/auth/register", {
    method: "POST",
    body: { name, email, password, remember },
  });
}

export async function login({ email, password, remember = false }) {
  return api("/api/auth/login", {
    method: "POST",
    body: { email, password, remember },
  });
}

export async function forgotPassword(email) {
  return api("/api/auth/forgot-password", {
    method: "POST",
    body: { email },
  });
}

export async function verifyCode(email, code) {
  return api("/api/auth/verify-code", {
    method: "POST",
    body: { email, code },
  });
}

export async function resetPassword(email, token, newPassword) {
  return api("/api/auth/reset-password", {
    method: "POST",
    body: { email, token, newPassword },
  });
}

export async function checkStatus() {
  return api("/api/auth/status");
}

export async function getMe() {
  return api("/api/auth/me");
}

export async function logout() {
  return api("/api/auth/logout", { method: "POST" });
}