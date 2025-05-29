import NextAuth, { DefaultUser } from "next-auth";

//Next identifica o arquivo como um módulo de declaração de tipos
// e não como um arquivo de código executável
declare module "next-auth" {

  // Adiciona o tipo dos dados da sessão personalizado
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;

      // Campos personalizados que preciso 
      token: string;
      userData: User;
    };
  }

  // Adiciona o tipo de usuário personalizado
  interface User extends DefaultUser { // Extende o tipo padrão de usuário do NextAuth
    id: string;
    nome: string;
    name: string; // Nome do usuário
    email: string;
    role: string;
    token: string; // JWT token
  }
}

export {}; // Necessário para evitar conflitos de escopo