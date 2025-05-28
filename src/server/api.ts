import axios from "axios";
import { getSession } from "next-auth/react";
import type { Session as NextAuthSession } from "next-auth";

export const api = axios.create({
  baseURL: "http://localhost:8081/api",
});

// Interceptor ao adicionar o token de autenticação
api.interceptors.request.use(
  async (config) => {
    const session = (await getSession()) as NextAuthSession | null; 
    console.log("Session data:", session);
    if (session?.user?.token) {
      config.headers.Authorization = `Bearer ${session.user.token}`;
    } else {
      console.warn("No token found in session");
    }
    return config;
  },
  (error) => {
    console.error("Error in request interceptor:", error);
    return Promise.reject(error);
  }
);
