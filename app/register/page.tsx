"use client";

export default function Register() {
  return (
    <div className="w-full min-h-screen bg-emerald-600 flex items-center relative">
      
      <div className="pl-20 relative w-full">

        <div className="w-100 h-137.5 border-4 border-black bg-white text-left">
          <form>
            <h1 className="text-3xl font-bold text-center mt-8 text-emerald-500">
              Registro
            </h1>

            <div className="mt-8">
              <label className="ml-5 text-lg block mb-1 text-emerald-500 font-bold">
                Username
              </label>
              <input
                className="ml-5 p-3 w-87.5 border-2 border-black outline-none focus:border-4 text-black"
                type="email"
              />
            </div>

            <div className="mt-8">
              <label className="ml-5 text-lg block mb-1 text-emerald-500 font-bold">
                Email
              </label>
              <input
                className="ml-5 p-3 w-87.5 border-2 border-black outline-none focus:border-4 text-black"
                type="email"
              />
            </div>

            <div className="mt-8">
              <label className="ml-5 text-lg block mb-1 text-emerald-500 font-bold">
                Senha
              </label>
              <input
                className="ml-5 p-3 w-87.5 border-2 border-black outline-none focus:border-4 text-black"
                type="password"
              />
            </div>

            <div className="mt-8 flex justify-center">
              <button
                className="w-37.5 p-3 bg-black text-white font-bold hover:bg-gray-950 cursor-pointer"
                type="submit"
              >
                Entrar
              </button>
            </div>
            <div className="mt-4 text-center">
              <a href="/" className="text-emerald-500 hover:underline">
                Fazer Login
              </a>
            </div>
          </form>
        </div>

        <h1
          className="
            absolute
            right-20
            bottom-[calc(50%-225px)]
            text-[64px]
            font-extrabold
            text-white
            tracking-wide
          "
        >
          Parkgest
        </h1>

      </div>
    </div>
  );
}
