"use client";

import { useEffect, useState } from "react";
import Header from '../../componets/header';

export default function Controle() {
    const [placa, setPlaca] = useState("");
    const [tipoVeiculo, setTipoVeiculo] = useState("");
    const [vaga, setVaga] = useState("");
    const [cliente, setCliente] = useState("");
  
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/";
            return;
        }
    }, []);

    const handleAddControle = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const response = await fetch("http://localhost:8080/patio/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                placa,
                tipo: tipoVeiculo,
                vaga,
                cliente,
            }),
            });

            if (!response.ok) {
            throw new Error("Erro ao registrar entrada");
            }

            alert("Entrada registrada com sucesso!");
            
            setPlaca("");
            setTipoVeiculo("");
            setVaga("");
            setCliente("");

        } catch (err: any) {
            alert(err.message);
        }
        };


    return (
        <div className='w-full min-h-screen bg-white'>
            <Header />
            <div className='w-full max-h-130 mt-10'>
                <div className="w-7xl pl-10">
                    <h1 className="text-3xl font-bold text-left text-black">Controle de Entrada</h1>
                    <p className='text-gray-500'>Registe a entrada de veículos</p>
                </div>
                <div className='mt-5 pl-10 pr-10 w-full flex justify-between items-center'>
                    <div className='w-130 border-2 border-black'>
                        <form className='p-5' onSubmit={handleAddControle}>
                            <div className='mb-5'>
                                <label className='block text-black font-bold mb-2'>Placa do Veículo</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border-2 border-gray-300 text-black"
                                    placeholder="Digite a placa do veículo"
                                    value={placa}
                                    onChange={(e) => setPlaca(e.target.value)}
                                />

                            </div>
                            <div className='mb-5'>
                                <label className='block text-black font-bold mb-2'>Tipo de Veículo</label>
                                <select
                                    className="w-full p-2 border-2 border-gray-300 text-black"
                                    value={tipoVeiculo}
                                    onChange={(e) => setTipoVeiculo(e.target.value)}
                                    >
                                    <option value="">Selecione</option>
                                    <option value="moto">Moto</option>
                                    <option value="carro_pequeno">Carro Pequeno</option>
                                    <option value="suv">Carro Médio</option>
                                    <option value="caminhonete">Carro Grande</option>
                                    <option value="caminhao">Caminhão</option>
                                </select>

                            </div>
                            <div className='mb-5'>
                                <label className='block text-black font-bold mb-2'>Vaga (opcional)</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border-2 border-gray-300 text-black"
                                    value={vaga}
                                    onChange={(e) => setVaga(e.target.value)}
                                />

                            </div>
                            <div className='mb-5'>
                                <label className='block text-black font-bold mb-2'>Cliente (opcional)</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border-2 border-gray-300 text-black"
                                    value={cliente}
                                    onChange={(e) => setCliente(e.target.value)}
                                />

                            </div>
                            <div>
                                <input type='button' value='Registrar Entrada' className='w-full p-2 bg-emerald-600 text-white font-bold cursor-pointer hover:bg-emerald-700' />
                            </div>
                        </form>
                    </div>
                    <div className='w-150'>
                        <h2 className='text-gray-500 font-bold mb-5'>Vagas Disponíveis</h2>
                        <div className='p-4 border-2 border-gray-300 flex cursor-pointer hover:border-black hover:bg-emerald-600'>
                            <img src='/moto.png' alt='moto Icon' className='w-6 h-6 mr-5' />
                            <h2 className='text-black'>Moto</h2>
                        </div>
                        <div className='p-4 border-2 border-gray-300 mt-5 flex cursor-pointer hover:border-black hover:bg-emerald-600'>
                            <img src='/carrop.png' alt='Car Icon' className='w-6 h-6 mr-5' />
                            <h2 className='text-black'>Carro Pequeno</h2>
                        </div>
                        <div className='p-4 border-2 border-gray-300 mt-5 flex cursor-pointer hover:border-black hover:bg-emerald-600'>
                            <img src='/suv.png' alt='Car Icon' className='w-6 h-6 mr-5' />
                            <h2 className='text-black'>Carro Médio</h2>
                        </div>
                        <div className='p-4 border-2 border-gray-300 mt-5 flex cursor-pointer hover:border-black hover:bg-emerald-600'>
                            <img src='/caminhonet.png' alt='Car Icon' className='w-6 h-6 mr-5' />
                            <h2 className='text-black'>Carro Grande</h2>
                        </div>
                        <div className='p-4 border-2 border-gray-300 mt-5 flex cursor-pointer hover:border-black hover:bg-emerald-600'>
                            <img src='/caminhao.png' alt='Car Icon' className='w-6 h-6 mr-5' />
                            <h2 className='text-black'>Caminhão</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}