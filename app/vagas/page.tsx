"use client";

import Header from '../../componets/header';

export default function Vagas() {
    return (
        <div className='w-full min-h-screen bg-white'>
            <Header />
            <div className='w-full mt-10 flex justify-between'>
                <div className="w-7xl pl-10">
                    <h1 className="text-3xl font-bold text-left text-black">Controle de Vagas</h1>
                    <p className='text-gray-500'>Visualize a ocupação do estacionamento</p>
                </div>
                <div>
                    <button className='w-40 p-1 mr-10 border-2 border-black rounded-md flex items-center justify-center bg-emerald-600 text-white font-bold cursor-pointer hover:bg-emerald-700'>
                        <img src="/mais.png" className='w-6 h-6 mr-2'></img>
                        Nova Vaga
                    </button>
                </div>
            </div>

            <div className='w-full mt-5 flex justify-between align-center px-10 gap-5'>
                <div className='w-70 h-30 border-2 border-black  bg-emerald-600 flex flex-col justify-center items-center'>
                    <p className='font-bold text-3xl'>87</p>
                    <p className='text-white text-sm'>Vagas Livres</p>
                </div>
                <div className='w-70 h-30 border-2 border-black  bg-emerald-600 flex flex-col justify-center items-center'>
                    <p className='font-bold text-3xl'>31</p>
                    <p className='text-white text-sm'>Vagas Ocupadas</p>
                </div>
                <div className='w-70 h-30 border-2 border-black  bg-emerald-600 flex flex-col justify-center items-center'>
                    <p className='font-bold text-3xl'>118</p>
                    <p className='text-white text-sm'>Total de Vagas</p>
                </div>
                <div className='w-70 h-30 border-2 border-black bg-emerald-600 flex flex-col justify-center items-center'>
                    <p className='font-bold text-3xl'>26,3%</p>
                    <p className='text-white text-sm'>Taxa Ocupação</p>
                </div>
            </div>
            <div className='w-full mt-5 px-10 gap-5'>
                <div className='w-7xl h-30 max-h-100 border-2 border-black overflow-auto'>
                    <div className='pt-5 pl-5 flex flex-col'>
                        <p className='text-md text-black'>
                            <img src='/moto.png' alt='moto Icon' className='w-6 h-6 mr-2 inline-block' />
                            Vagas para Motos
                        </p>
                        <p className='text-gray-500 text-xs'>12 de 29 Disponíveis</p>
                    </div>
                </div>
                <div className='w-7xl h-30 max-h-100 border-2 border-black mt-5 overflow-auto'>
                    <div className='flex pt-5 pl-5 flex-col'>
                        <p className='text-md text-black'>
                            <img src='/suv.png' alt='moto Icon' className='w-6 h-6 mr-2 inline-block' />
                            Vagas Regulares
                        </p>
                        <p className='text-gray-500 text-xs'>12 de 29 Disponíveis</p>
                    </div>
                </div>
                <div className='w-7xl h-30 max-h-100 border-2 border-black mt-5 overflow-auto'>
                    <div className='flex pt-5 pl-5 flex-col'>
                        <p className='text-md text-black'>
                            <img src='/caminhao.png' alt='moto Icon' className='w-6 h-6 mr-2 inline-block' />
                            Vagas Grandes
                        </p>
                        <p className='text-gray-500 text-xs'>12 de 29 Disponíveis</p>
                    </div>
                </div>
            </div>

        </div>
    );
}