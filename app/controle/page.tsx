"use client";

import Header from '../../componets/header';

export default function Controle() {
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
                        <form className='p-5'>
                            <div className='mb-5'>
                                <label className='block text-black font-bold mb-2'>Placa do Veículo</label>
                                <input type='text' className='w-full p-2 border-2 border-gray-300 text-black' placeholder='Digite a placa do veículo' />
                            </div>
                            <div className='mb-5'>
                                <label className='block text-black font-bold mb-2'>Tipo de Veículo</label>
                                <select className='w-full p-2 border-2 border-gray-300 text-black'>
                                    <option value='moto'>Moto</option>
                                    <option value='carrop'>Carro Pequeno</option>
                                    <option value='suv'>Carro Médio</option>
                                    <option value='caminhonet'>Carro Grande</option>
                                    <option value='caminhao'>Caminhão</option>
                                </select>
                            </div>
                            <div className='mb-5'>
                                <label className='block text-black font-bold mb-2'>Vaga (opcional)</label>
                                <input type='text' className='w-full p-2 border-2 border-gray-300 text-black' />
                            </div>
                            <div className='mb-5'>
                                <label className='block text-black font-bold mb-2'>Cliente (opcional)</label>
                                <input type='text' className='w-full p-2 border-2 border-gray-300 text-black' />
                            </div>
                            <div>
                                <input type='submit' value='Registrar Entrada' className='w-full p-2 bg-emerald-600 text-white font-bold cursor-pointer hover:bg-emerald-700' />
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