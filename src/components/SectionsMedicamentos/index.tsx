"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { categoriaHook } from "@/hooks/categorias/categoria";
import { medicamentoHook } from "@/hooks/medicamentos/medicamento";

import { useEffect } from "react";
import { animate } from "framer-motion";

export default function SectionsMedicamentos() {
  const { medicamentos, listarMedicamentos } = medicamentoHook();
  const { categorias, listarCategorias } = categoriaHook();

  useEffect(() => {
    listarCategorias();
    listarMedicamentos();
  }, []);

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

    // Posição atual do scroll na página
    const currentScroll = window.scrollY;

    // Posição do topo do elemento em relação à viewport + posição atual do scroll
    const elementTop = section.getBoundingClientRect().top + currentScroll;

    // Calcula onde parar para centralizar o elemento na tela
    const targetScroll =
      elementTop - window.innerHeight / 2 + section.offsetHeight / 2;

    // Anima o scroll de forma suave até a posição desejada
    animate(currentScroll, targetScroll, {
      duration: 0.8, // duração em segundos
      onUpdate(value) {
        window.scrollTo(0, value);
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-16">
        {categorias.map((categoria) => {
          const emoji = emojiPorCategoria[categoria.nome];
          return (
            <Card
              key={categoria.id.toString()}
              onClick={() => handleScroll(categoria.id.toString())}
              className="bg-white shadow-lg hover:scale-110 duration-200 flex flex-col items-center justify-center w-44 h-40"
            >
              <div className="text-4xl">{emoji}</div>
              <div className="mt-3 text-center text-lg font-semibold">
                {categoria.nome}
              </div>
            </Card>
          );
        })}
      </div>

      <div className="w-full">
        {categorias.map((categoria) => (
          <section
            key={categoria.id.toString()}
            id={categoria.id.toString()}
            className="mt-16"
          >
            <h2 className="text-3xl font-bold mb-6">{categoria.nome}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {medicamentos
                .filter((med) => med.categoria.id === categoria.id)
                .map((medicamento) => (
                  <Card
                    key={medicamento.id?.toString()}
                    className="p-4 bg-white shadow-md hover:scale-105 duration-200"
                  >
                    <CardHeader>
                      <CardTitle>{medicamento.nome}</CardTitle>
                      <CardDescription>{medicamento.descricao}</CardDescription>

                      {/* <img src={String(medicamento.imagem)} alt={String(medicamento.nome)} /> */}
                    </CardHeader>
                    <CardContent>
                      <p>💰 Preço: R$ {medicamento.preco.toFixed(2)}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
