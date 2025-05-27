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
import { BiLogInCircle } from "react-icons/bi";

import { signIn } from "next-auth/react";
import { toast } from "sonner";

import { useRouter } from "next/navigation";


const formRegisterSchema = z.object({
    email: z.string().email("Email inválido"),
    senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
})

type FormRegister = z.infer<typeof formRegisterSchema>


export default function Login() {

    const router = useRouter();

    const registerUser: SubmitHandler<FormRegister> = async (data: FormRegister) => {
        try {
            const res = await signIn("credentials", {
                redirect: false,
                email: data.email,
                senha: data.senha,
            });

            if (res?.error) {
                toast.error(res.error);
                return;
            }

            if (res?.ok) {
                toast.success("Usuário logado com sucesso!");
                router.push("/");
            }

        } catch (error) {
            console.error("Erro no login:", error);
            toast.error("Erro ao conectar com o servidor.");
        }
    };


    const { register, handleSubmit, formState: { errors } } = useForm<FormRegister>({
        resolver: zodResolver(formRegisterSchema),
        mode: "onSubmit"
    })

    const loginWithGoogle = async () => {
        await signIn("google", { callbackUrl: "/" });
    };

    return (
        <div className="flex flex-col w-full h-screen items-center justify-center">
            <Card className="w-80 sm:w-96 shadow-sm shadow-slate-400">

                <CardHeader className="flex flex-col justify-center items-center space-y-1">

                    <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-700">Faça Login</CardTitle>

                    <button
                        type="button"
                        onClick={loginWithGoogle}
                        className="flex items-center justify-center border-2 border-zinc-300 rounded-full w-10 h-10 cursor-pointer"
                    >
                        <FaGooglePlusG color="#84878b" className="w-6 h-6" />
                    </button>

                    <CardDescription className="text-zinc-500">ou faça login com seu email</CardDescription>

                </CardHeader>

                <CardContent className="grid gap-4">

                    <form onSubmit={handleSubmit(registerUser)} className="flex flex-col gap-4 max-w-md md:max-w-lg">

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

                        <Button type="submit" className="bg-blue-700 hover:bg-blue-600 cursor-pointer"><BiLogInCircle width={25} height={25} />Entrar</Button>

                        <div className="flex items-center justify-center gap-2 text-zinc-500 text-sm">
                            <span>Ainda não possui uma conta?</span>
                            <Link className="text-blue-500 hover:text-blue-600 hover:underline" href="/register">Cadastre-se</Link>
                        </div>

                    </form>

                </CardContent>
            </Card>
        </div>
    );
}