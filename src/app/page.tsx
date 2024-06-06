'use client'
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Toaster, toast } from 'sonner'
import { useRouter } from "next/navigation"

import Cookies from 'js-cookie'

type Inputs = {
  email: string
  senha: string
}

export default function Home() {
  const { register, handleSubmit, reset, setFocus } = useForm<Inputs>()
  const router = useRouter()

  async function verificaLogin(data: Inputs) {
    // console.log(data)
    const response = await fetch("http://localhost:3004/loginAdmin", {
      method: "POST",
      headers: {"Content-type": "Application/json"},
      body: JSON.stringify({email: data.email, senha: data.senha})
    })

    // console.log(response.status)

    if (response.status == 200) {
//      toast.success("Ok! Bem-vindo ao sistema de administração do Cineclube")
      const admin = await response.json()

      Cookies.set("admin_logado_id", admin.id)
      Cookies.set("admin_logado_nome", admin.nome)
      Cookies.set("admin_logado_token", admin.token)

      router.push("/principal")      
    } else if (response.status == 400) {
//      alert("Erro... Login ou senha incorretos")
      toast.error("Erro... Login ou senha incorretos")
    } 

  }

  // ocorre quando o componente é renderizado
  useEffect(() => {
    setFocus("email")
  }, [])

  return (
    <main className="max-w-screen-xl flex flex-col items-center mx-auto p-4">
      <img src="./cineclube.webp" alt="Cineclube" style={{ width: 300 }}
        className="d-block" />
      <div className="max-w-sm">
        <h1 className="text-4xl font-bold">Área Administrativa</h1>
        <form className="max-w-sm mx-auto mt-5" onSubmit={handleSubmit(verificaLogin)}>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              E-mail de Acesso
            </label>
            <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              required {...register("email")} />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Senha
            </label>
            <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              required {...register("senha")} />
          </div>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Entrar
          </button>
        </form>
      </div>
      <Toaster richColors position="top-right" />
    </main>
  );
}
