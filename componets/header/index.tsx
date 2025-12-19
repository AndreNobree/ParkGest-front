import { Exo_2 } from "next/font/google";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

export default function Header() {
  return (
    <div className="bg-white w-full p-3 border-b border-black flex items-center justify-between">
      <div className="flex items-center">
        <div className="w-12 h-10 bg-emerald-600 flex items-center justify-center border-2 border-black">
          <img src="/carro.png" className="w-8 h-8" />
        </div>

        <h1
          className={`${exo2.className} text-2xl font-bold text-black ml-5`}
        >
          ParkGest
        </h1>
      </div>
      <div>
        <input type="button" value="Estacionamento" className="p-2 bg-emerald-600 border-2 border-black mr-5 text-white cursor-pointer font-medium"></input>
        <input type="button" value="Controle"  className="p-2 text-black mr-5 cursor-pointer border-2 transition hover:bg-emerald-500"></input>
        <input type="button" value="Vagas"  className="p-2 text-black mr-5 cursor-pointer border-2 transition hover:bg-emerald-500"></input>
        <input type="button" value="Clientes"  className="p-2 text-black mr-5 cursor-pointer border-2 transition hover:bg-emerald-500"></input>
      </div>
    </div>
  );
}
