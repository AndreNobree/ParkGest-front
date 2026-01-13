"use client";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login inválido");
      }
      const data = await response.json();
      console.log("TOKEN:", data.token);

      localStorage.setItem("token", data.token);
      document.cookie = `token=${data.token}; path=/;`;

      window.location.href = "/home";

    } catch (err) {
      alert(err);
    }
  };
  
  return (
    <div className="w-full min-h-screen bg-emerald-600 flex items-center relative">
      
      <div className="pl-20 relative w-full">

        <div className="w-100 h-112.5 border-4 border-black bg-white text-left">
          <form>
            <h1 className="text-3xl font-bold text-center mt-8 text-emerald-500">
              Login
            </h1>

            <div className="mt-8">
              <label className="ml-5 text-lg block mb-1 text-emerald-500 font-bold">
                Email
              </label>
              <input
                className="ml-5 p-3 w-87.5 border-2 border-black outline-none focus:border-4 text-black"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mt-8">
              <label className="ml-5 text-lg block mb-1 text-emerald-500 font-bold">
                Senha
              </label>
              <input
                className="ml-5 p-3 w-87.5 border-2 border-black outline-none focus:border-4 text-black"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mt-8 flex justify-center">              
              <button
                className="w-37.5 p-3 bg-black text-white font-bold hover:bg-gray-950 cursor-pointer"
                type="button"
                onClick={handleLogin}
              >
                Entrar
              </button>
            </div>
            <div className="mt-4 text-center">
              <a href="/register" className="text-emerald-500 hover:underline">
                Criar conta
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
