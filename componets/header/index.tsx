import { Exo_2 } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

export default function Header() {
  const pathname = usePathname();

  const isEstacionamento = pathname === "/home";
  const isControle = pathname === "/controle";
  const isVagas = pathname === "/vagas";
  const isClientes = pathname === "/clientes";

  const active =
    "p-2 bg-emerald-600 border-2 border-black mr-5 text-white font-medium";

  const inactive =
    "p-2 text-black mr-5 cursor-pointer transition hover:bg-emerald-600 border-2 border-emerald-600 hover:border-black";

  return (
    <div className="bg-emerald-600 w-full p-3 border-b-2 border-black flex items-center justify-between">
      <div className="flex items-center">
        <div className="w-12 h-10 bg-emerald-600 flex items-center justify-center border-2 border-black">
          <img src="/carro.png" className="w-8 h-8" />
        </div>

        <h1 className={`${exo2.className} text-2xl font-bold text-white ml-5`}>
          ParkGest
        </h1>
      </div>

      <div className="flex">
        <Link href="/home">
          <input
            type="button"
            value="Pátio"
            className={isEstacionamento ? active : inactive}
          />
        </Link>

        <Link href="/controle">
          <input
            type="button"
            value="Controle"
            className={isControle ? active : inactive}
          />
        </Link>

        <Link href="/vagas">
          <input
            type="button"
            value="Vagas"
            className={isVagas ? active : inactive}
          />
        </Link>

        <Link href="/clientes">
          <input
            type="button"
            value="Clientes"
            className={isClientes ? active : inactive}
          />
        </Link>
        
        <input
          type="button"
          value="Configuração"
          className={inactive}
        />

        <Link href="/">
          <img src="/saida.png" className="w-6 h-6 mt-2.5 cursor-pointer" />
        </Link>
      </div>
    </div>
  );
}
