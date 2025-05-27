declare module "next-auth" {
  interface Session {
    user: {
        
      name?: string | null;
      email?: string | null;
      image?: string | null;

      token: string;
      userData: Usuario;
    };
  }

  interface Usuario {
    id: string;
    nome: string;
    email: string;
    role: string;
  }
}
