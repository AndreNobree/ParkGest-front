"use client";

import Header from '../../componets/header';

export default function Register() {
    return (
        <div className='w-full min-h-screen bg-white'>
            <Header />
            <div className='w-full max-h-130 mt-15 flex justify-center items-center'>
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
                            <tr>
                                <td className="p-3 text-left border-b-2">01</td>
                                <td className="p-3 text-left border-b-2"><a className='underline cursor-pointer'>ABC-1234</a></td>
                                <td className="p-3 text-left border-b-2">Ford Ka</td>
                                <td className="p-3 text-left border-b-2">Carro</td>
                                <td className="p-3 text-left border-b-2">12:56</td>
                                <td className="p-3 text-left border-b-2">João Silva</td>
                                <td className="p-3 text-right border-b-2">
                                    <button className="bg-red-500 p-2 rounded-lg text-white cursor-pointer">
                                        Finalizar
                                    </button>
                                </td>
                            </tr>

                            <tr>
                                <td className="p-3 text-left border-b-2">02</td>
                                <td className="p-3 text-left border-b-2"><a className='underline cursor-pointer'>XYZ-5678</a></td>
                                <td className="p-3 text-left border-b-2">Honda CG</td>
                                <td className="p-3 text-left border-b-2">Moto</td>
                                <td className="p-3 text-left border-b-2">15:10</td>
                                <td className="p-3 text-left border-b-2">Maria Souza</td>
                                <td className="p-3 text-right border-b-2">
                                <button className="bg-red-500 p-2 rounded-lg text-white cursor-pointer">
                                    Finalizar
                                </button>
                                </td>
                            </tr>
                        </tbody>

                    </table>
                    </div>

            </div>
        </div>
    );
}
