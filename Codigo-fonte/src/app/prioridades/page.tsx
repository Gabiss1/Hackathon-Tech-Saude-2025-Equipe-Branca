export default function Prioridades() {
    return (
      <div className="bg-gray-50 flex flex-col justify-between items-center h-screen px-4 py-6 overflow-hidden">

        <header className="text-center">
          <h1 className="text-4xl font-extrabold tracking-wide text-gray-800 leading-tight">
            Prioridades
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Classificação de risco – Status das filas
          </p>
        </header>

        <div className="flex flex-col w-full max-w-xl gap-4 flex-grow justify-center">

          <div className="flex justify-between items-center h-[70px] bg-[#F68221] rounded-2xl text-white px-6 shadow-md">
            <p className="text-xl font-bold">Laranja</p>
            <div className="flex gap-2 items-center">
              <p className="text-3xl font-semibold">6</p>
              <img width={24} src="/user 1.png" alt="Usuários" />
            </div>
          </div>

          <div className="flex justify-between items-center h-[70px] bg-[#F2C800] rounded-2xl text-white px-6 shadow-md">
            <p className="text-xl font-bold">Amarelo</p>
            <div className="flex gap-2 items-center">
              <p className="text-3xl font-semibold">12</p>
              <img width={24} src="/user 1.png" alt="Usuários" />
            </div>
          </div>

          <div className="flex justify-between items-center h-[70px] bg-[#027E3F] rounded-2xl text-white px-6 shadow-md">
            <p className="text-xl font-bold">Verde</p>
            <div className="flex gap-2 items-center">
              <p className="text-3xl font-semibold">8</p>
              <img width={24} src="/user 1.png" alt="Usuários" />
            </div>
          </div>

          <div className="flex justify-between items-center h-[70px] bg-[#00ACED] rounded-2xl text-white px-6 shadow-md">
            <p className="text-xl font-bold">Azul</p>
            <div className="flex gap-2 items-center">
              <p className="text-3xl font-semibold">10</p>
              <img width={24} src="/user 1.png" alt="Usuários" />
            </div>
          </div>

        </div>

        <footer className="opacity-80">
          <img src="/logocentenario.png" alt="Logo" className="w-48" />
        </footer>
      </div>
    );
  }
