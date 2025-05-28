import { useState } from "react"
import { api } from "@/server/api";

type Categoria = {
    id: String;
    nome: string;
}

export const categoriaHook = () => {
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    const listarCategorias = async () => {
        try {
            const response = await api.get("/categoria/listarCategoria");
            if(response.data){
                setCategorias(response.data);
            }

        } catch (error) {
            console.error("Erro ao listar categorias:", error);
        }
    }

    return {
        categorias,
        setCategorias,
        listarCategorias,
    }
}