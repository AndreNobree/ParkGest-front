"use client";

import { useState, useEffect } from "react";
import Header from "../../componets/header";
import { useAuth } from "@/hooks/useAuth";

type ClientesDTO = {
    id: number;
    nome: string;
    telefone: string;
    acao: string;
};

export default function Vagas() {
    const { loading } = useAuth();

    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [clienteSelecionado, setClienteSelecionado] = useState<ClientesDTO | null>(null);
    const [isEditing, setIsEditing] = useState(false);


    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [clientes, setClientes] = useState<ClientesDTO[]>([]);

    const handleEditarCliente = (cliente: ClientesDTO) => {
        setClienteSelecionado(cliente);
        setNome(cliente.nome);
        setTelefone(cliente.telefone);
        setIsEditing(true);
        setOpen(true);
    };


    const maskTelefone = (value: string) => {
        return value
            .replace(/\D/g, "")               // remove tudo que não é número
            .replace(/^(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2")
            .replace(/(-\d{4})\d+?$/, "$1");  // limita em 11 dígitos
    };


    useEffect(() => {
        fetchClientes();
    }, []);

    const fetchClientes = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                window.location.href = "/";
                return;
            }

            const response = await fetch("http://localhost:8080/clientes/all", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) throw new Error("Erro ao buscar clientes");

            const data: ClientesDTO[] = await response.json();
            setClientes(data);
        } catch (err: any) {
            alert(err.message);
        }
    };

    const handleSalvarCliente = async () => {
        if (!nome || !telefone) {
            alert("Preencha todos os campos");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:8080/clientes/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        nome: nome,
                        telefone: telefone,
                    }),
                }
            );

            if (!response.ok) throw new Error("Erro ao cadastrar cliente");

            setNome("");
            setTelefone("");
            setOpen(false);
            fetchClientes();
        } catch (err: any) {
            alert(err.message);
        }
    };

    const handleEditarConfirmar = async () => {
        if (!clienteSelecionado) return;

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:8080/clientes/${clienteSelecionado.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        nome,
                        telefone: telefone.replace(/\D/g, ""),
                    }),
                }
            );

            if (!response.ok) throw new Error("Erro ao editar cliente");

            setOpen(false);
            setIsEditing(false);
            setClienteSelecionado(null);
            setNome("");
            setTelefone("");
            fetchClientes();
        } catch (err: any) {
            alert(err.message);
        }
    };


    const handleDeleteCliente = async () => {
        if (!clienteSelecionado) return;

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:8080/clientes/${clienteSelecionado.id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) throw new Error("Erro ao excluir cliente");

            setOpenDelete(false);
            setClienteSelecionado(null);
            fetchClientes();
        } catch (err: any) {
            alert(err.message);
        }
    };

    if (loading) return <p>Carregando...</p>;

    return (
        
        <div className="w-full min-h-screen bg-white relative">
            <Header />

            <div className="w-full mt-10 flex justify-between">
                <div className="w-7xl pl-10">
                    <h1 className="text-3xl font-bold text-black">
                        Controle de Clientes
                    </h1>
                    <p className="text-gray-500">
                        Lista de clientes cadastrados no sistema
                    </p>
                </div>

                <button
                    onClick={() => setOpen(true)}
                    className="w-40 p-1 mr-10 border-2 border-black rounded-md flex items-center justify-center bg-emerald-600 text-white font-bold hover:bg-emerald-700 cursor-pointer"
                >
                    <img src="/mais.png" className="w-6 h-6 mr-2" />
                    Novo Cliente
                </button>
            </div>

            {open && (
                <>
                    <div
                        className="fixed inset-0 bg-black/60 z-40"
                        onClick={() => setOpen(false)}
                    />

                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="bg-white w-100 rounded-lg border-3 border-emerald-600 p-6 shadow-xl">
                            <h2 className="text-2xl font-bold text-emerald-600 mb-6 text-center">
                                {isEditing ? "Deseja editar o Cliente?" : "Adicionar Cliente"}
                            </h2>


                            <div className="mb-4">
                                <label className="block text-sm font-medium text-black mb-1">
                                    Nome
                                </label>
                                <input
                                    className="text-black w-full p-2 border-2 border-black rounded-md"
                                    value={nome}
                                    placeholder="Digite o nome do cliente"
                                    onChange={(e) =>
                                        setNome(e.target.value)
                                    }
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-black mb-1">
                                    Telefone
                                </label>
                                <input
                                    className="text-black w-full p-2 border-2 border-black rounded-md"
                                    value={telefone}
                                    placeholder="(99) 99999-9999"
                                    maxLength={15}
                                    onChange={(e) =>
                                        setTelefone(maskTelefone(e.target.value))
                                    }
                                />

                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => {
                                        setOpen(false);
                                        setIsEditing(false);
                                        setClienteSelecionado(null);
                                        setNome("");
                                        setTelefone("");
                                    }}
                                    className="px-4 py-2 border-2 border-black rounded-md text-black cursor-pointer"
                                >
                                    Cancelar
                                </button>

                                <button
                                    onClick={isEditing ? handleEditarConfirmar : handleSalvarCliente}
                                    className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-md cursor-pointer"
                                >
                                    {isEditing ? "Confirmar Edição" : "Salvar"}
                                </button>

                            </div>
                        </div>
                    </div>
                </>
            )}
            
            <div className="w-full mt-5 px-10">
                <table className="w-full border-collapse border border-black">
                    <thead className="bg-emerald-600 text-white">
                        <tr>
                            <th className="border px-5 py-2 border-black">Nome</th>
                            <th className="border px-5 py-2 border-black">Telefone</th>
                            <th className="border px-5 py-2 border-black">Ação</th>
                        </tr>
                    </thead>

                    <tbody className="text-black">
                        {clientes.map((cliente) => (
                            <tr key={cliente.id}>
                                <td className="border px-4 py-2 text-center">
                                    {cliente.nome}
                                </td>
                                <td className="border px-4 py-2 text-center">
                                    {cliente.telefone}
                                </td>

                                <td className="border px-4 py-2 text-center">
                                    <button
                                        onClick={() => handleEditarCliente(cliente)}
                                        className="mr-5"
                                    >
                                        <img
                                            src="/lapis.png"
                                            alt="Editar"
                                            className="w-6 h-6 mx-auto cursor-pointer"
                                        />
                                    </button>

                                    <button
                                        onClick={() => {
                                            setClienteSelecionado(cliente);
                                            setOpenDelete(true);
                                        }}
                                    >
                                        <img
                                            src="/lixeira.png"
                                            alt="Excluir"
                                            className="w-6 h-6 mx-auto cursor-pointer"
                                        />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {openDelete && clienteSelecionado && (
                <>
                    <div
                        className="fixed inset-0 bg-black/60 z-40"
                        onClick={() => setOpenDelete(false)}
                    />

                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="bg-white w-96 p-6 rounded-lg border-2 border-red-600 shadow-xl">
                            <h2 className="text-xl font-bold text-red-600 mb-4 text-center">
                                Confirmar exclusão
                            </h2>

                            <p className="text-center text-black mb-6">
                                Deseja excluir o cliente{" "}
                                <strong>{clienteSelecionado.nome}</strong>?
                            </p>

                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setOpenDelete(false)}
                                    className="px-4 py-2 border-2 border-black rounded-md cursor-pointer text-black"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleDeleteCliente}
                                    className="px-4 py-2 bg-red-600 text-white font-bold rounded-md cursor-pointer"
                                >
                                    Apagar
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
