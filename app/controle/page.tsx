"use client";

import { useEffect, useState } from "react";
import Header from "../../componets/header";

interface Vaga {
    id: number;
    vaga: string;
}

export default function Controle() {
    const [placa, setPlaca] = useState("");
    const [modeloCor, setModeloCor] = useState("");
    const [cliente, setCliente] = useState("");
    const [tipoVaga, setTipoVaga] = useState<string>("");
    const [searchVaga, setSearchVaga] = useState("");
    const [openVagaDropdown, setOpenVagaDropdown] = useState(false);

    const [vagas, setVagas] = useState<Vaga[]>([]);
    const [vagaSelecionada, setVagaSelecionada] = useState<string>("");

    const vagasFiltradas = vagas.filter((vaga) =>
        vaga.vaga.toLowerCase().includes(searchVaga.toLowerCase())
    );

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/";
            return
        }
        fetchVagas(token);
    }, []);

    const fetchVagas = async (token: string) => {
        try {
            const response = await fetch("http://localhost:8080/vagas/livres", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Erro ao carregar vagas");
            }

            const data = await response.json();
            setVagas(data);
        } catch (err: any) {
            alert(err.message);
        }
    };

    const handleAddControle = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!tipoVaga) {
            alert("Selecione o tipo do veículo");
            return;
        }
        if(placa.trim() === "" || modeloCor.trim() === ""){
            alert("Preencha todos os campos obrigatórios");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const response = await fetch("http://localhost:8080/patio/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    placa,
                    modeloCor,
                    cliente,
                    tipo: tipoVaga,
                    vagaId: vagaSelecionada || null,
                }),
            });

            if (!response.ok) {
                throw new Error("Erro ao registrar entrada");
            }

            alert("Entrada registrada com sucesso!");

            setPlaca("");
            setModeloCor("");
            setCliente("");
            setTipoVaga("");
            setVagaSelecionada("");

        } catch (err: any) {
            alert(err.message);
        }
    };
    

    const cardClass = (tipo: string) =>
        `p-4 border-2 flex items-center cursor-pointer transition
        ${tipoVaga === tipo
            ? "border-black bg-emerald-600 text-white"
            : "border-gray-300 hover:border-black hover:bg-emerald-100"}`;

    return (
        <div className="w-full min-h-screen bg-white">
            <Header />

            <div className="w-full mt-5">
                <div className="w-7xl pl-10">
                    <h1 className="text-3xl font-bold text-black">
                        Controle de Entrada
                    </h1>
                    <p className="text-gray-500">
                        Registre a entrada de veículos
                    </p>
                </div>

                <div className="mt-5 pl-10 pr-10 w-full flex justify-between items-start gap-10">
                    <div className="w-130 border-2 border-black">
                        <form className="p-5" onSubmit={handleAddControle}>
                            <div className="mb-5">
                                <label className="block text-black font-bold mb-2">
                                    Placa do Veículo *
                                </label>
                                <input
                                    className="w-full p-2 border-2 border-gray-300 text-black"
                                    value={placa}
                                    onChange={(e) => setPlaca(e.target.value)}
                                    placeholder="Digite a placa do veículo"
                                />
                            </div>

                            <div className="mb-5">
                                <label className="block text-black font-bold mb-2">
                                    Modelo e Cor *
                                </label>
                                <input
                                    className="w-full p-2 border-2 border-gray-300 text-black"
                                    value={modeloCor}
                                    onChange={(e) => setModeloCor(e.target.value)}
                                    placeholder="Digite o modelo e a cor do veículo"
                                />
                            </div>

                            <div className="mb-5">
                                <label className="block font-bold mb-2 text-black">
                                    Vaga (opcional)
                                </label>

                                <div className="relative">
                                    <input
                                        type="text"
                                        className="w-full p-2 border-2 border-gray-300 text-black"
                                        placeholder="Pesquisar vaga..."
                                        value={searchVaga}
                                        onFocus={() => setOpenVagaDropdown(true)}
                                        onBlur={() => {
                                            setTimeout(() => setOpenVagaDropdown(false), 150);
                                        }}
                                        onChange={(e) => {
                                            setSearchVaga(e.target.value);
                                            setOpenVagaDropdown(true);
                                        }}
                                    />


                                    {openVagaDropdown && (
                                        <div className="absolute z-20 w-full bg-white border-2 border-gray-300 max-h-40 overflow-y-auto">
                                            {vagasFiltradas.length === 0 && (
                                                <div className="p-2 text-gray-500">
                                                    Nenhuma vaga encontrada
                                                </div>
                                            )}

                                            {vagasFiltradas.map((vaga) => (
                                                <div
                                                    key={vaga.id}
                                                    className="p-2 cursor-pointer hover:bg-emerald-100 text-black"
                                                    onMouseDown={() => {
                                                        setVagaSelecionada(String(vaga.id));
                                                        setSearchVaga(vaga.vaga);
                                                        setOpenVagaDropdown(false);
                                                    }}
                                                >
                                                    {vaga.vaga}
                                                </div>
                                            ))}

                                        </div>
                                    )}
                                </div>
                            </div>


                            <div className="mb-5">
                                <label className="block font-bold mb-2 text-black ">
                                    Cliente (opcional)
                                </label>
                                <input
                                    className="w-full p-2 border-2 border-gray-300 text-black"
                                    value={cliente}
                                    onChange={(e) => setCliente(e.target.value)}
                                    placeholder="Digite o nome do cliente"
                                />
                            </div>

                            <p className="mb-3 text-sm text-gray-600">
                                Tipo selecionado:{" "}
                                <strong>{tipoVaga || "Nenhum"}</strong>
                            </p>

                            <button
                                type="submit"
                                className="w-full p-2 bg-emerald-600 text-white font-bold hover:bg-emerald-700 cursor-pointer transition"
                            >
                                Registrar Entrada
                            </button>
                        </form>
                    </div>

                    <div className="w-150">
                        <h2 className="text-gray-500 font-bold mb-5">
                            Tipo de Veículo
                        </h2>

                        <div
                            className={cardClass("MOTO")}
                            onClick={() => setTipoVaga("MOTO")}
                        >
                            <img src="/moto.png" className="w-6 h-6 mr-5" />
                            <h2 className=" text-black ">Moto</h2>
                        </div><br></br>

                        <div
                            className={cardClass("CARRO_PEQUENO")}
                            onClick={() => setTipoVaga("CARRO_PEQUENO")}
                        >
                            <img src="/carrop.png" className="w-6 h-6 mr-5" />
                            <h2 className=" text-black ">Carro Pequeno</h2>
                        </div><br></br>

                        <div
                            className={cardClass("CARRO_MEDIO")}
                            onClick={() => setTipoVaga("CARRO_MEDIO")}
                        >
                            <img src="/suv.png" className="w-6 h-6 mr-5" />
                            <h2 className=" text-black ">Carro Médio</h2>
                        </div><br></br>

                        <div
                            className={cardClass("CARRO_GRANDE")}
                            onClick={() => setTipoVaga("CARRO_GRANDE")}
                        >
                            <img src="/caminhonet.png" className="w-6 h-6 mr-5" />
                            <h2 className=" text-black ">Carro Grande</h2>
                        </div><br></br>

                        <div
                            className={cardClass("CAMINHAO_ONIBUS")}
                            onClick={() => setTipoVaga("CAMINHAO_ONIBUS")}
                        >
                            <img src="/caminhao.png" className="w-6 h-6 mr-5" />
                            <h2 className=" text-black ">Caminhão/ÔNIBUS</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
