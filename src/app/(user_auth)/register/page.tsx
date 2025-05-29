"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { FaGooglePlusG } from "react-icons/fa";
import { toast } from "sonner";
import { MdAppRegistration } from "react-icons/md";
import { CgPill } from "react-icons/cg";


import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const formRegisterSchema = z.object({
  nome: z.string().min(4, "Nome deve ter pelo menos 4 caracteres"),
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type FormRegister = z.infer<typeof formRegisterSchema>;

const registerUser: SubmitHandler<FormRegister> = async (
  data: FormRegister
) => {
  console.log(data);
};

export default function Register() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormRegister>({
    resolver: zodResolver(formRegisterSchema),
    mode: "onSubmit",
  });

  const registerUser: SubmitHandler<FormRegister> = async (
    data: FormRegister
  ) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const user = await response.json();
      toast.success("Usuário cadastrado com sucesso!");
      router.push("/login");

      reset();
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center">
      <Card className="flex items-center justify-center py-2 h-auto w-full max-w-[400px] sm:max-w-[500px] shadow-sm shadow-slate-400">
        <CardContent className="flex flex-col items-center w-full">
          <div className="flex flex-row items-center mt-2">
            <Link
              className="flex flex-row items-center focus:border-2 p-2 focus:border-[#1b998b]"
              href="#"
            >
              <h1 className="text-5xl font-bold text-[#1b998b] flex items-center">
                <CgPill className="-rotate-45 -mr-1" />
                ncluFarma
              </h1>
            </Link>
          </div>

          <div>
            <CardHeader className="text-center">
              <CardTitle className="text-4xl font-bold text-zinc-600">
                Entrar
              </CardTitle>
              <CardDescription className="text-zinc-500 text-lg">
                Faça login para acessar sua conta
              </CardDescription>
            </CardHeader>
          </div>

          <form
            onSubmit={handleSubmit(registerUser)}
            className="flex flex-col gap-4 w-[300px] sm:w-[400px]"
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="name" className="text-zinc-500">
                Nome
              </Label>

              <Input
                type="text"
                className="text-zinc-500 border-zinc-300 input-custom selection:bg-blue-400"
                {...register("nome")}
              />
              {errors.nome && (
                <span className="text-red-500 text-sm">
                  {errors.nome.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-zinc-500">
                Email
              </Label>
              <Input
                type="email"
                className="text-zinc-500 border-zinc-300 input-custom selection:bg-blue-400"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="senha" className="text-zinc-500">
                Senha
              </Label>
              <Input
                type="password"
                className="text-zinc-500 border-zinc-300 input-custom selection:bg-blue-400"
                {...register("senha")}
              />
              {errors.senha && (
                <span className="text-red-500 text-sm">
                  {errors.senha.message}
                </span>
              )}
            </div>

            <Button
              type="submit"
              className="bg-[#1b998b] hover:bg-[#1b998b]/70 transition-colors duration-300 text-white text-md cursor-pointer"
            >
              <MdAppRegistration className="w-5 h-5" />
              Cadastrar
            </Button>

            <div className="flex items-center justify-center gap-2 text-zinc-500 text-md">
              <span>Já possui uma conta? </span>
              <Link
                className="text-[#1b998b] hover:underline"
                href="/login"
              >
                Entrar
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
