"use client";

import { useEffect, useState } from "react";
import Header from "../../componets/header";
import { useAuth } from "@/hooks/useAuth";

type ClientesDTO = {
    id: number;
    nome: string;
    telefone: string;
    acao: string;
};

type TipoVeiculo =
    | "MOTO"
    | "CARRO_PEQUENO"
    | "CARRO_MEDIO"
    | "CARRO_GRANDE"
    | "CAMINHAO_ONIBUS";

type ValoresHoraDTO = {
    id: number;
    valorHora: number;
    tipoVeiculo: TipoVeiculo;
};

export default function Configuracao() {
    const { loading } = useAuth();

    const [clientes, setClientes] = useState<ClientesDTO[]>([]);
    const [clienteIdSelecionado, setClienteIdSelecionado] = useState<number | null>(null);
    const [search, setSearch] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [valorPlano, setValorPlano] = useState("");
    const [metodoPlano, setMetodoPlano] = useState("dias");
    
    const [valoresHora, setValoresHora] = useState<
        Record<TipoVeiculo, { id?: number; valor: string }>
    >({
        MOTO: { valor: "" },
        CARRO_PEQUENO: { valor: "" },
        CARRO_MEDIO: { valor: "" },
        CARRO_GRANDE: { valor: "" },
        CAMINHAO_ONIBUS: { valor: "" },
    });

    const normalizarValor = (valor: string): number => {
        if (!valor) return NaN;

        let valorLimpo = valor.trim();

        valorLimpo = valorLimpo.replace(/\./g, "");

        valorLimpo = valorLimpo.replace(",", ".");

        const numero = Number(valorLimpo);

        return isNaN(numero) ? NaN : numero;
    };

    const handleRegistrarPlano = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            if (!clienteIdSelecionado) {
                throw new Error("Selecione um cliente");
            }

            const valorConvertido = normalizarValor(valorPlano);

            if (isNaN(valorConvertido)) {
                throw new Error("Valor do plano inválido");
            }

            const response = await fetch(
                "http://localhost:8080/plano/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        valor: valorConvertido,
                        metodo: metodoPlano,
                        clienteId: clienteIdSelecionado
                    }),
                }
            );

            if (!response.ok) {
                const erro = await response.text();
                console.log("Erro backend:", erro);
                throw new Error("Erro ao registrar plano");
            }

            alert("Plano fidelidade registrado com sucesso!");
            setValorPlano("");
            setClienteIdSelecionado(null);
        } catch (err: any) {
            alert(err.message);
        }
    };



    const fetchValoresHora = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const response = await fetch("http://localhost:8080/valoreshora/", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                throw new Error("Erro ao buscar valores hora");
            }

            const data: ValoresHoraDTO[] = await response.json();

            const valoresFormatados: Record<
                TipoVeiculo,
                { id?: number; valor: string }
            > = {
                MOTO: { valor: "" },
                CARRO_PEQUENO: { valor: "" },
                CARRO_MEDIO: { valor: "" },
                CARRO_GRANDE: { valor: "" },
                CAMINHAO_ONIBUS: { valor: "" },
            };

            data.forEach((item) => {
                valoresFormatados[item.tipoVeiculo] = {
                    id: item.id,
                    valor: item.valorHora.toString(),
                };
            });

            setValoresHora(valoresFormatados);
        } catch (err: any) {
            alert(err.message);
        }
    }; 
    const handleValorChange = (tipo: TipoVeiculo, valor: string) => {
        setValoresHora((prev) => ({
            ...prev,
            [tipo]: {
                ...prev[tipo],
                valor,
            },
        }));
    };
    
    const handleSalvarValores = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            for (const tipo in valoresHora) {
                const item = valoresHora[tipo as TipoVeiculo];

                if (!item.valor) continue;

                const valorConvertido = normalizarValor(item.valor);


                if (isNaN(valorConvertido)) {
                    throw new Error(`Valor inválido para ${tipo}`);
                }

                let response;

                
                if (item.id) {
                    response = await fetch(
                        `http://localhost:8080/valoreshora/${item.id}`,
                        {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                            },
                            body: JSON.stringify({
                                valorHora: valorConvertido,
                                tipoVeiculo: tipo, 
                            }),
                        }
                    );
                }

                
                else {
                    response = await fetch(
                        "http://localhost:8080/valoreshora/add",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                            },
                            body: JSON.stringify({
                                valorHora: valorConvertido,
                                tipoVeiculo: tipo,
                            }),
                        }
                    );
                }

                if (!response.ok) {
                    const erroBackend = await response.text();
                    console.log("Erro backend:", erroBackend);
                    throw new Error(`Erro ao salvar ${tipo}`);
                }
            }

            alert("Valores salvos com sucesso!");
            fetchValoresHora();
        } catch (err: any) {
            alert(err.message);
        }
    };


    const fetchClientes = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const response = await fetch("http://localhost:8080/clientes/all", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                throw new Error("Erro ao buscar clientes");
            }

            const data: ClientesDTO[] = await response.json();
            setClientes(data);
        } catch (err: any) {
            alert(err.message);
        }
    };

    useEffect(() => {
        fetchClientes();
        fetchValoresHora();
    }, []);

    const clienteSelecionado = clientes.find(
        (c) => c.id === clienteIdSelecionado
    );

    const clientesFiltrados = clientes.filter((cliente) =>
        cliente.nome.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <p>Carregando...</p>;

    return (
        <div className="w-full min-h-screen bg-white">
            <Header />

            <div className="w-full mt-5">
                <div className="w-7xl pl-10">
                    <h1 className="text-3xl font-bold text-black">
                        Configurações
                    </h1>
                </div>

                <div className="w-full h-auto flex mt-10">
                    <div className="w-100 h-125 ml-10 border-2 border-black">
                        <div className="w-full h-10 text-center bg-emerald-600 border-b-2 border-black">
                            <h1 className="pt-2 font-bold">Cadastrar Valores Hora</h1>
                        </div>

                        <div className="w-full h-auto ml-5 mt-5">
                            <h1 className="text-lg font-bold text-black mt-5">
                                Valor hora de moto:
                            </h1>
                            <input
                                type="text"
                                className="w-80 border-2 border-emerald-700 rounded-md text-black"
                                inputMode="decimal"
                                pattern="[0-9.,]*"
                                value={valoresHora.MOTO.valor}
                                onChange={(e) =>
                                    handleValorChange(
                                        "MOTO",
                                        e.target.value.replace(/[^0-9.,]/g, "")
                                    )
                                }
                            />



                            <h1 className="text-lg font-bold text-black mt-5">
                                Valor hora de veículo pequeno:
                            </h1>
                            <input
                                type="text"
                                className="w-80 border-2 border-emerald-700 rounded-md text-black"
                                inputMode="decimal"
                                pattern="[0-9.,]*"
                                value={valoresHora.CARRO_PEQUENO.valor}
                                onChange={(e) =>
                                    handleValorChange(
                                        "CARRO_PEQUENO",
                                        e.target.value.replace(/[^0-9.,]/g, "")
                                    )
                                }
                            />



                            <h1 className="text-lg font-bold text-black mt-5">
                                Valor hora de veículo médio:
                            </h1>
                            <input
                                type="text"
                                className="w-80 border-2 border-emerald-700 rounded-md text-black"
                                inputMode="decimal"
                                pattern="[0-9.,]*"
                                value={valoresHora.CARRO_MEDIO.valor}
                                onChange={(e) =>
                                    handleValorChange(
                                        "CARRO_MEDIO",
                                        e.target.value.replace(/[^0-9.,]/g, "")
                                    )
                                }
                            />
                            


                            <h1 className="text-lg font-bold text-black mt-5">
                                Valor hora de veículo grande:
                            </h1>
                            <input
                                type="text"
                                className="w-80 border-2 border-emerald-700 rounded-md text-black"
                                inputMode="decimal"
                                pattern="[0-9.,]*"
                                value={valoresHora.CARRO_GRANDE.valor}
                                onChange={(e) =>
                                    handleValorChange(
                                        "CARRO_GRANDE",
                                        e.target.value.replace(/[^0-9.,]/g, "")
                                    )
                                }
                            />


                            <h1 className="text-lg font-bold text-black mt-5">
                                Valor hora de caminhão/ônibus:
                            </h1>
                            <input
                                type="text"
                                className="w-80 border-2 border-emerald-700 rounded-md text-black"
                                inputMode="decimal"
                                pattern="[0-9.,]*"
                                value={valoresHora.CAMINHAO_ONIBUS.valor}
                                onChange={(e) =>
                                    handleValorChange(
                                        "CAMINHAO_ONIBUS",
                                        e.target.value.replace(/[^0-9.,]/g, "")
                                    )
                                }
                            />


                            <button
                                onClick={handleSalvarValores}
                                className="w-80 h-10 mt-5 cursor-pointer bg-emerald-600 text-white font-bold rounded-md hover:bg-emerald-700"
                            >
                                Salvar
                            </button>

                        </div>
                    </div>
                    <div className="w-100 h-125 ml-10 border-2 border-black">
                        <div className="w-full h-10 text-center bg-emerald-600 border-b-2 border-black">
                            <h1 className="pt-2 font-bold">Cadastrar Cliente no Plano Fidelidade</h1>
                        </div>

                        <div className="w-full h-auto ml-5 mt-5">
                            <h1 className="text-lg font-bold text-black mt-5">
                                Cliente:
                            </h1>

                            {/* DROPDOWN SEARCH */}
                            <div className="relative w-80">
                                <input
                                    type="text"
                                    className="w-full p-1 border-2 border-emerald-700 rounded-md text-black"
                                    placeholder="Buscar cliente..."
                                    value={
                                        dropdownOpen
                                            ? search
                                            : clienteSelecionado?.nome || ""
                                    }
                                    onFocus={() => {
                                        setDropdownOpen(true);
                                        setSearch("");
                                    }}
                                    onChange={(e) => setSearch(e.target.value)}
                                />

                                {dropdownOpen && (
                                    <div className="absolute z-10 w-full max-h-40 overflow-y-auto bg-white border-2 border-emerald-700 rounded-md mt-1">
                                        {clientesFiltrados.length > 0 ? (
                                            clientesFiltrados.map((cliente) => (
                                                <div
                                                    key={cliente.id}
                                                    className="px-2 py-1 cursor-pointer hover:bg-emerald-100 text-black"
                                                    onClick={() => {
                                                        setClienteIdSelecionado(cliente.id);
                                                        setDropdownOpen(false);
                                                        setSearch("");
                                                    }}
                                                >
                                                    {cliente.nome}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="px-2 py-1 text-gray-500">
                                                Nenhum cliente encontrado
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <h1 className="text-lg font-bold text-black mt-5">
                                Valor do plano:
                            </h1>
                            <input
                                type="text"
                                className="w-80 border-2 border-emerald-700 rounded-md text-black"
                                placeholder="R$ 0,00"
                                value={valorPlano}
                                onChange={(e) =>
                                    setValorPlano(e.target.value.replace(/[^0-9.,]/g, ""))
                                }
                            />


                            <h1 className="text-lg font-bold text-black mt-5">
                                Método de plano:
                            </h1>
                            <select
                                className="w-80 p-1 border-2 border-emerald-700 rounded-md text-black"
                                value={metodoPlano}
                                onChange={(e) => setMetodoPlano(e.target.value)}
                            >
                                <option value="dias">Por Dias</option>
                                <option value="mes">Por Mês</option>
                                <option value="ano">Por Ano</option>
                            </select>
                            
                            <button
                                onClick={handleRegistrarPlano}
                                className="w-80 h-10 mt-5 cursor-pointer bg-emerald-600 text-white font-bold rounded-md hover:bg-emerald-700"
                            >
                                Salvar
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
