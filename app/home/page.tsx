"use client";

import { useEffect, useState } from "react";
import Header from "../../componets/header";
import { useAuth } from "@/hooks/useAuth";

type PatioDTO = {
    patioId: number;
    modeloCor: string;
    placa: string;
    tipo: string;
    horaEntrada: string;
    acao: string;
    nomeVaga: string;
    clienteId: number | null;
};

export default function Home() {
    const { loading } = useAuth();
    const [patios, setPatios] = useState<PatioDTO[]>([]);

    useEffect(() => {
        fetchPatios();
    }, []);

    const fetchPatios = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                window.location.href = "/";
                return;
            }

            const response = await fetch("http://localhost:8080/patio/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Erro ao buscar dados do pátio");
            }

            const data: PatioDTO[] = await response.json();
            setPatios(data);
        } catch (err: any) {
            alert(err.message);
        }
    };

    const handleFinalizar = async (patioId: number) => {
        const confirmacao = confirm("Deseja finalizar este registro?");
        if (!confirmacao) return;

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:8080/patio/${patioId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Erro ao finalizar registro");
            }

            // Remove da lista local (sem novo GET)
            setPatios((prev) =>
                prev.filter((patio) => patio.patioId !== patioId)
            );
        } catch (err: any) {
            alert(err.message);
        }
    };

    if (loading) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center">
                <p className="text-emerald-600">Carregando...</p>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-white">
            <Header />

            <div className="w-full max-h-130 mt-15 flex justify-center">
                <div className="w-7xl">
                    <table className="w-full shadow-lg border-2 border-black border-collapse">
                        <thead className="bg-emerald-600 text-white">
                            <tr>
                                <th className="p-4 text-left">Vaga</th>
                                <th className="p-4 text-left">Placa</th>
                                <th className="p-4 text-left">Modelo</th>
                                <th className="p-4 text-left">Tipo</th>
                                <th className="p-4 text-left">Entrada</th>
                                <th className="p-4 text-left">Cliente</th>
                                <th className="p-4 text-right">Ação</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white text-black">
                            {patios.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="p-4 text-center">
                                        Nenhum veículo estacionado
                                    </td>
                                </tr>
                            )}

                            {patios.map((patio) => (
                                <tr key={patio.patioId}>
                                    <td className="p-3 border-b-2">
                                        {patio.nomeVaga}
                                    </td>

                                    <td className="p-3 border-b-2">
                                        {patio.placa ?? "—"}
                                    </td>

                                    <td className="p-3 border-b-2">
                                        {patio.modeloCor ?? "—"}
                                    </td>

                                    <td className="p-3 border-b-2">
                                        {patio.tipo ?? "—"}
                                    </td>

                                    <td className="p-3 border-b-2">
                                        {new Date(
                                            patio.horaEntrada
                                        ).toLocaleTimeString("pt-BR", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </td>

                                    <td className="p-3 border-b-2">
                                        {patio.clienteId ?? "—"}
                                    </td>

                                    <td className="p-3 text-right border-b-2">
                                        <button
                                            onClick={() =>
                                                handleFinalizar(patio.patioId)
                                            }
                                            className="bg-red-500 p-2 rounded-lg text-white cursor-pointer hover:bg-red-600 transition"
                                        >
                                            Finalizar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
