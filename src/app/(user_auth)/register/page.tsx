"use client"

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
import { toast } from "sonner"
import { MdAppRegistration } from 'react-icons/md';

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const formRegisterSchema = z.object({
    nome: z.string().min(4, "Nome deve ter pelo menos 4 caracteres"),
    email: z.string().email("Email inválido"),
    senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
})

type FormRegister = z.infer<typeof formRegisterSchema>

const registerUser: SubmitHandler<FormRegister> = async (data: FormRegister) => {
    console.log(data);
}

export default function Register() {

    const router = useRouter();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormRegister>({
        resolver: zodResolver(formRegisterSchema),
        mode: "onSubmit"
    })

    const loginWithGoogle = async () => {
            await signIn("google", { callbackUrl: "/" });
        };

    const registerUser: SubmitHandler<FormRegister> = async (data: FormRegister) => {
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
    }

    return (
        <div className="flex flex-col w-full h-screen items-center justify-center">
            <Card className="w-80 sm:w-96 shadow-sm shadow-slate-400">

                <CardHeader className="flex flex-col justify-center items-center space-y-1">

                    <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-700">Criar conta</CardTitle>
                    
                    <button onClick={loginWithGoogle} className="flex items-center justify-center border-2 border-zinc-300 rounded-full w-10 h-10 cursor-pointer">
                        <FaGooglePlusG color="#84878b" className="w-6 h-6" />
                    </button>

                    <CardDescription className="text-zinc-500">ou cadastra-se com e-mail</CardDescription>

                </CardHeader>

                <CardContent className="grid gap-4">

                    <form onSubmit={handleSubmit(registerUser)} className="flex flex-col gap-4 max-w-md md:max-w-lg">

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="name" className="text-zinc-500">Nome</Label>

                            <Input type="text" className="text-zinc-500 border-zinc-300 input-custom selection:bg-blue-400" {...register("nome")} />
                            {errors.nome && <span className="text-red-500 text-sm">{errors.nome.message}</span>}

                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email" className="text-zinc-500">Email</Label>
                            <Input type="email" className="text-zinc-500 border-zinc-300 input-custom selection:bg-blue-400" {...register("email")} />
                            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="senha" className="text-zinc-500">Senha</Label>
                            <Input type="password" className="text-zinc-500 border-zinc-300 input-custom selection:bg-blue-400" {...register("senha")} />
                            {errors.senha && <span className="text-red-500 text-sm">{errors.senha.message}</span>}
                        </div>

                        <Button type="submit" className="bg-blue-700 hover:bg-blue-600 cursor-pointer"><MdAppRegistration className="w-5 h-5" />Cadastrar</Button>

                        <div className="flex items-center justify-center gap-2 text-zinc-500 text-sm">
                            <span>Já possui uma conta? </span>
                            <Link className="text-blue-500 hover:text-blue-600 hover:underline" href="/login">Entrar</Link>
                        </div>
                    </form>

                </CardContent>
            </Card>
        </div>
    );
}