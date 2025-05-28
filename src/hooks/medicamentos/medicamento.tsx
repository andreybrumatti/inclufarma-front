import { useState } from "react"
import { api } from "@/server/api";


type Medicamento = {
    id: String;
    nome: String;
    principio_ativo: String;
    categoria: {
        id: String;
        nome: String;
    }
    descricao: String;
    preco: Number;
    estoque: Number;
    imagem: String;
}

export const medicamentoHook = () => {
    const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);

    const listarMedicamentos = async () => {
        try {
            const response = await api.get("/medicamento/listar");
            if(response.data){
                setMedicamentos(response.data);
            }

        } catch (error) {
            console.error("Erro ao listar categorias:", error);
        }
    }

    return {
        medicamentos,
        setMedicamentos,
        listarMedicamentos,
    }
}