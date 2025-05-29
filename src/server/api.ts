import axios from "axios";
import { getSession } from "next-auth/react";
import type { Session as NextAuthSession } from "next-auth";

export const api = axios.create({
  baseURL: "http://localhost:8081/api",
});

// Interceptor ao adicionar o token de autenticação
api.interceptors.request.use(
  async (config) => { //Parâmetro config contem todas as propriedades da requisição

    const session = (await getSession()) as NextAuthSession | null; 
    console.log("Session data:", session);

    if (session?.user?.token) {
      // Adiciona o token de autenticação ao cabeçalho Authorization automaticamente
      config.headers.Authorization = `Bearer ${session.user.token}`;
    } else {
      console.warn("No token found in session");
    }
    //retorna o config atualizado para continuar com a requisição
    return config;
  },
  (error) => {
    console.error("Error in request interceptor:", error);
    return Promise.reject(error);
  }
);
