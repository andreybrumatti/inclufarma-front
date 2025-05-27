"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { categoriaHook } from "@/hooks/categorias/categoria";


export default function CardCategorias() {
    const { categorias, listarCategorias } = categoriaHook();

    //const fetchCategorias = await listarCategorias();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categorias.map((categoria, index) => (
                <Card key={index} className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col w-40 h-40">
                    <CardHeader>
                        <CardTitle>{categoria}</CardTitle>
                    </CardHeader>
                </Card>
            ))}
        </div>
    );
}