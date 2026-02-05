"use client";

import { useState, useEffect } from "react";
import Header from "../../componets/header";
import { useAuth } from "@/hooks/useAuth";

type VagaDTO = {
    id: number;
    vaga: string;
    tipo: string;
    acao: string;
};

export default function Vagas() {
    const { loading } = useAuth();

    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [vagaSelecionada, setVagaSelecionada] = useState<VagaDTO | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const [nomeVaga, setNomeVaga] = useState("");
    const [tipoVaga, setTipoVaga] = useState("");
    const [vagas, setVagas] = useState<VagaDTO[]>([]);

    const handleEditarVaga = (vaga: VagaDTO) => {
        setVagaSelecionada(vaga);
        setNomeVaga(vaga.vaga);
        setTipoVaga(vaga.tipo);
        setIsEditing(true);
        setOpen(true);
    };

    useEffect(() => {
        fetchVagas();
    }, []);

    const fetchVagas = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                window.location.href = "/";
                return;
            }

            const response = await fetch("http://localhost:8080/vagas/all", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) throw new Error("Erro ao buscar vagas");

            const data: VagaDTO[] = await response.json();
            setVagas(data);
        } catch (err: any) {
            alert(err.message);
        }
    };

    const handleSalvarVaga = async () => {
        if (!nomeVaga || !tipoVaga) {
            alert("Preencha todos os campos");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:8080/vagas/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        vaga: nomeVaga,
                        tipo: tipoVaga,
                    }),
                }
            );

            if (!response.ok) throw new Error("Erro ao cadastrar vaga");

            setNomeVaga("");
            setTipoVaga("");
            setOpen(false);
            fetchVagas();
        } catch (err: any) {
            alert(err.message);
        }
    };

    const handleEditarConfirmar = async () => {
        if (!vagaSelecionada) return;

        if (!nomeVaga || !tipoVaga) {
            alert("Preencha todos os campos");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:8080/vagas/${vagaSelecionada.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        vaga: nomeVaga,
                        tipo: tipoVaga,
                    }),
                }
            );

            if (!response.ok) throw new Error("Erro ao editar vaga");

            setOpen(false);
            setIsEditing(false);
            setVagaSelecionada(null);
            setNomeVaga("");
            setTipoVaga("");
            fetchVagas();
        } catch (err: any) {
            alert(err.message);
        }
    };

    const handleDeleteVaga = async () => {
        if (!vagaSelecionada) return;

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:8080/vagas/${vagaSelecionada.id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) throw new Error("Erro ao excluir vaga");

            setOpenDelete(false);
            setVagaSelecionada(null);
            fetchVagas();
        } catch (err: any) {
            alert(err.message);
        }
    };

    if (loading) return <p>Carregando...</p>;

    
    const totalVagas = vagas.length;

    const vagasLivres = vagas.filter(
        (vaga) => vaga.acao.toUpperCase() === "LIVRE"
    ).length;

    const vagasOcupadas = vagas.filter(
        (vaga) => vaga.acao.toUpperCase() === "OCUPADA"
    ).length;

    const taxaOcupacao =
        totalVagas === 0
            ? 0
            : ((vagasOcupadas / totalVagas) * 100).toFixed(1);

    return (
        
        <div className="w-full min-h-screen bg-white relative">
            <Header />

            <div className="w-full mt-10 flex justify-between">
                <div className="w-7xl pl-10">
                    <h1 className="text-3xl font-bold text-black">
                        Controle de Vagas
                    </h1>
                    <p className="text-gray-500">
                        Visualize a ocupação do estacionamento
                    </p>
                </div>

                <button
                    onClick={() => setOpen(true)}
                    className="w-40 p-1 mr-10 border-2 border-black rounded-md flex items-center justify-center bg-emerald-600 text-white font-bold hover:bg-emerald-700 cursor-pointer"
                >
                    <img src="/mais.png" className="w-6 h-6 mr-2" />
                    Nova Vaga
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
                                {isEditing ? "Deseja editar a vaga?" : "Adicionar Vaga"}
                            </h2>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-black mb-1">
                                    Nome da vaga
                                </label>
                                <input
                                    className="text-black w-full p-2 border-2 border-black rounded-md"
                                    value={nomeVaga}
                                    placeholder="Digite o nome da vaga"
                                    onChange={(e) =>
                                        setNomeVaga(e.target.value)
                                    }
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-black mb-1">
                                    Tipo da vaga
                                </label>
                                <select
                                    className="text-black w-full p-2 border-2 border-black rounded-md"
                                    value={tipoVaga}
                                    onChange={(e) =>
                                        setTipoVaga(e.target.value)
                                    }
                                >
                                    <option value="">Selecione</option>
                                    <option value="MOTO">Moto</option>
                                    <option value="CARRO">Carro</option>
                                    <option value="CAMINHAO">Caminhão</option>
                                </select>
                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => {
                                        setOpen(false);
                                        setIsEditing(false);
                                        setVagaSelecionada(null);
                                        setNomeVaga("");
                                        setTipoVaga("");
                                    }}
                                    className="px-4 py-2 border-2 border-black rounded-md text-black cursor-pointer"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={isEditing ? handleEditarConfirmar : handleSalvarVaga}
                                    className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-md cursor-pointer"
                                >
                                    {isEditing ? "Confirmar Edição" : "Salvar"}
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
            
            <div className='w-full mt-5 flex justify-between align-center px-10 gap-5'>
                <div className='w-70 h-30 border-2 border-black bg-emerald-600 flex flex-col justify-center items-center'>
                    <p className='font-bold text-3xl'>{vagasLivres}</p>
                    <p className='text-white text-sm'>Vagas Livres</p>
                </div>

                <div className='w-70 h-30 border-2 border-black bg-emerald-600 flex flex-col justify-center items-center'>
                    <p className='font-bold text-3xl'>{vagasOcupadas}</p>
                    <p className='text-white text-sm'>Vagas Ocupadas</p>
                </div>

                <div className='w-70 h-30 border-2 border-black bg-emerald-600 flex flex-col justify-center items-center'>
                    <p className='font-bold text-3xl'>{totalVagas}</p>
                    <p className='text-white text-sm'>Total de Vagas</p>
                </div>

                <div className='w-70 h-30 border-2 border-black bg-emerald-600 flex flex-col justify-center items-center'>
                    <p className='font-bold text-3xl'>{taxaOcupacao}%</p>
                    <p className='text-white text-sm'>Taxa Ocupação</p>
                </div>
            </div>
            <div className="w-full mt-5 px-10">
                <table className="w-full border-collapse border border-black">
                    <thead className="bg-emerald-600 text-white">
                        <tr>
                            <th className="border px-5 py-2 border-black">Vaga</th>
                            <th className="border px-5 py-2 border-black">Tipo</th>
                            <th className="border px-5 py-2 border-black">Status</th>
                            <th className="border px-5 py-2 border-black">Ação</th>
                        </tr>
                    </thead>

                    <tbody className="text-black">
                        {vagas.map((vaga) => (
                            <tr key={vaga.id}>
                                <td className="border px-4 py-2 text-center">
                                    {vaga.vaga.toUpperCase()}
                                </td>
                                <td className="border px-4 py-2 text-center">
                                    {vaga.tipo.toUpperCase()}
                                </td>
                                <td
                                    className={`border px-4 py-2 text-center font-bold ${
                                        vaga.acao === "LIVRE"
                                            ? "text-green-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    {vaga.acao.toUpperCase()}
                                </td>
                                
                                <td className="border px-4 py-2 text-center">
                                    <button
                                        onClick={() => handleEditarVaga(vaga)}
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
                                            setVagaSelecionada(vaga);
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

            {openDelete && vagaSelecionada && (
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
                                Deseja apagar a vaga{" "}
                                <strong>{vagaSelecionada.vaga}</strong>?
                            </p>

                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setOpenDelete(false)}
                                    className="px-4 py-2 border-2 border-black rounded-md cursor-pointer text-black"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleDeleteVaga}
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
