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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const { data: session } = useSession();
  console.log("Session:", session);

  const router = useRouter();

  const handleClickEndereco = () => {
    router.push("/endereco");
  };

  return (
    <header className="flex items-center justify-between shadow-lg w-full h-28 px-4 md:px-8 lg:px-16 bg-white">
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
        {session?.user.token ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex flex-col items-center text-center cursor-pointer">
                <span className="text-3xl">👤</span>
                <span className="text-sm">{session.user.userData?.nome}</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>

              <DropdownMenuSeparator />

              {session?.user.userData.role === "USER" && (
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={handleClickEndereco}
                >
                  Endereços
                </DropdownMenuItem>
              )}

              {session?.user.userData.role === "ADMIN" && (
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => router.push("/produtos")}
                >
                  Produtos
                </DropdownMenuItem>
              )}

              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
