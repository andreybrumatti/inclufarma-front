"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";

import { categoriaHook } from "@/hooks/categorias/categoria";
import { medicamentoHook } from "@/hooks/medicamentos/medicamento";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useEffect } from "react";
import { animate } from "framer-motion";

export default function SectionsMedicamentos() {
  const { medicamentos, listarMedicamentos } = medicamentoHook();
  const { categorias, listarCategorias } = categoriaHook();

  useEffect(() => {
    listarCategorias();
    listarMedicamentos();
  }, []);

  const isLoadingCategorias = categorias.length === 0;
  const isLoadingMedicamentos = medicamentos.length === 0;

  const emojiPorCategoria: Record<string, string> = {
    Analgésicos: "🩹",
    Antibióticos: "🦠",
    "Anti-inflamatórios": "🔥",
    Antialérgicos: "🤧",
    Ansiolíticos: "😌",
    Antidepressivos: "😊",
  };

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;

    const currentScroll = window.scrollY;
    const elementTop = section.getBoundingClientRect().top + currentScroll;
    const targetScroll =
      elementTop - window.innerHeight / 2 + section.offsetHeight / 2;

    animate(currentScroll, targetScroll, {
      duration: 0.8,
      onUpdate(value) {
        window.scrollTo(0, value);
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      {/* ✅ Categorias */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-16">
        {isLoadingCategorias
          ? Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="w-44 h-40 rounded-xl bg-slate-200" />
            ))
          : categorias.map((categoria) => {
              const emoji = emojiPorCategoria[categoria.nome];
              return (
                <TooltipProvider key={categoria.id.toString()}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Card
                        onClick={() => handleScroll(categoria.id.toString())}
                        className="bg-white shadow-lg hover:scale-110 duration-200 flex flex-col items-center justify-center w-44 h-40"
                      >
                        <div className="text-4xl">{emoji}</div>
                        <div className="mt-3 text-center text-lg font-semibold">
                          {categoria.nome}
                        </div>
                      </Card>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{categoria.nome}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
      </div>

      {/* ✅ Medicamentos */}
      <div className="w-full">
        {categorias.map((categoria) => (
          <section
            key={categoria.id.toString()}
            id={categoria.id.toString()}
            className="mt-16"
          >
            <h2 className="text-3xl font-bold mb-6">{categoria.nome}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {isLoadingMedicamentos
                ? Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton
                      key={i}
                      className="h-44 w-full rounded-xl bg-slate-200"
                    />
                  ))
                : medicamentos
                    .filter((med) => med.categoria.id === categoria.id)
                    .map((medicamento) => (
                      <TooltipProvider key={medicamento.id?.toString()}>
                        <Tooltip>
                          <TooltipTrigger>
                            <Card className="p-4 bg-white shadow-md hover:scale-105 duration-200">
                              <CardHeader>
                                <CardTitle>{medicamento.nome}</CardTitle>
                                <CardDescription>
                                  {medicamento.descricao}
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                <p>
                                  💰 Preço: R$ {medicamento.preco.toFixed(2)}
                                </p>
                              </CardContent>
                            </Card>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{medicamento.nome}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
