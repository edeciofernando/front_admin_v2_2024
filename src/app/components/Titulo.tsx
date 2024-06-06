import Link from "next/link"

function Titulo() {

  return (
    <nav className="border-blue-400 bg-blue-300 dark:bg-blue-800 dark:border-blue-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/principal" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="./logo2.png" className="h-8" alt="Logo Cineclube" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Admin: Cineclube Avenida
          </span>
        </Link>
      </div>
    </nav>
  )
}

export default Titulo