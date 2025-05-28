"use client";

import { CarProducts } from "../CarProducts";
import { CgPill } from "react-icons/cg";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();
  console.log("Session:", session);

  const signoutWithGoogle = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between shadow-lg w-full h-28 px-4 md:px-8 lg:px-36 bg-[#ffff]"
    >
      <div className="flex flex-row items-center">
        <Link
          className="flex flex-row items-center focus:border-2 p-2 focus:border-[#1b998b]"
          href="/"
        >
          <h1 className="text-4xl font-bold text-[#1b998b] flex items-center">
            <CgPill className="-rotate-45 -mr-1" />
            ncluFarma
          </h1>
        </Link>
      </div>

      <div className="flex gap-2 md:gap-14 items-center justify-center">
        {session?.user ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="text-3xl focus:border-2 focus:border-[#1b998b] flex flex-col items-center text-center">
                <span className="text-3xl">👤</span>
                {/* Se tiver token, pega nome em userData; senão pega nome direto em user,
                                 que vem do NextAuth, Google*/}
                <span className="text-sm">
                  {session.user.token
                    ? session.user.userData?.nome
                    : session.user.name}
                </span>
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Sair da Conta</AlertDialogTitle>
                <AlertDialogDescription>
                  Deseja realmente sair?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={signoutWithGoogle}>
                  Sair
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <div>
            <Link
              href="/login"
              className="flex flex-col items-center text-center focus:border-2 focus:border-[#1b998b]"
            >
              <button className="text-3xl">👤</button>
              <span className="text-sm">Boas-vindas!</span>
              <span className="text-sm">Entrar ou Cadastrar</span>
            </Link>
          </div>
        )}

        <div>
          <Link
            href="/pedidos"
            className="flex flex-col items-center w-20 text-center"
          >
            <button className="text-3xl">📦</button>
            <span className="text-sm break-words">Histórico de Pedidos</span>
          </Link>
        </div>

        <CarProducts />
      </div>
    </header>
  );
}
