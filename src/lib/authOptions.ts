import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions,  Session  } from "next-auth";
import type { JWT } from "next-auth/jwt";
import { Usuario } from "next-auth";

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
        senha: { label: "Senha", type: "password" },
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

        return {
          id: user.id,
          email: user.email,
          name: user.nome,
          token: user.token, // <- Aqui é o token JWT
          role: user.role,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },

  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: Usuario }) {
      if (user) {
        token.accessToken =  token;
        token.role = user.role;
        token.id = user.id;
        token.nome = user.nome;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      session.user.token = token.accessToken as string;
      session.user.userData = {
        id: token.id as string,
        nome: token.nome as string,
        email: token.email as string,
        role: token.role as string,
      };
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
