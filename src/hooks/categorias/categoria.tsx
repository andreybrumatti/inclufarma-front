import { useState } from "react"
import { api } from "@/server/api";

export const categoriaHook = () => {
    const [categorias, setCategorias] = useState([]);

    const listarCategorias = async () => {
        try {
            const response = await api.get("/api/categoria/listarCategoria");
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