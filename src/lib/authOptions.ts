// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        senha: { label: "Senha", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.senha) {
          throw new Error("Email e senha são obrigatórios.");
        }

        const response = await fetch("http://localhost:8081/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            senha: credentials.senha,
          }),
        });

        if (!response.ok) {
          throw new Error("Credenciais inválidas.");
        }

        const user = await response.json();

        // Retorne os dados do usuário que quiser manter na sessão
        return {
          id: user.id,
          email: user.email,
          name: user.nome,
        };
      }
    }),

  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/signin',
  },
}