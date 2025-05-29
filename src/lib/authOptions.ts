import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [

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

        //Precisa ter todos os campos do User
        return {
          id: user.email,
          email: user.email,
          nome: user.nome,
          name: user.nome, // <- Nome do usuário
          token: user.token, // <- Aqui é o token JWT
          role: user.role,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt", // Use JWT ao invés de database
    maxAge: 24 * 60 * 60, // 1 dia
  },
  
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: false,
      }
    }
  }
  ,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.role = user.role;
        token.id = user.id;
        token.nome = user.nome;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) { // Retorna os dados do usuário na sessão
      if (token) { 
        session.user = {
          ...session.user,
          token: token.accessToken as string,
          userData: {
            id: token.id as string,
            nome: token.nome as string,
            name: token.nome as string, // Nome do usuário
            email: token.email as string,
            role: token.role as string,
            token: token.accessToken as string,
          }
        };
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
