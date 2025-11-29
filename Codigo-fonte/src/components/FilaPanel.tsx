interface FilaPanelProps {
  cor: string;
  bgColor: string;
  adultos?: number; // opcional, será calculado dinamicamente se não fornecido
  pediatricos?: number; // opcional, será calculado dinamicamente se não fornecido
  tempoPorPessoa: number; // minutos por pessoa (mesmo para adultos e pediátricos)
  dadosDinamicos?: { // dados do banco de dados
    totalPacientes: number;
  };
}

export default function FilaPanel({ cor, bgColor, adultos = 0, pediatricos = 0, tempoPorPessoa, dadosDinamicos }: FilaPanelProps) {

  // Usar dados dinâmicos se disponíveis, senão usar os valores padrão
  const totalPacientes = dadosDinamicos?.totalPacientes ?? (adultos + pediatricos);

  // Função para formatar tempo em minutos ou horas
  const formatarTempo = (minutos: number): string => {
    if (minutos <= 59) {
      return `${minutos} mins.`;
    } else {
      const horas = Math.floor(minutos / 60);
      return `${horas} hora${horas > 1 ? 's' : ''}`;
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-50 flex flex-col justify-between items-center py-6 overflow-hidden">
      <div className={`flex flex-col ${bgColor} rounded-md shadow-xl w-[90vw] flex-1 py-10 px-8`}>

        {/* Título da cor no topo */}
        <div className="text-center mb-8">
          <h1 className="text-white text-9xl font-extrabold tracking-wide">
            {cor}
          </h1>
          <div className="w-40 bg-white/70 h-[3px] rounded-full mt-4 mx-auto"></div>
        </div>

        {/* Container principal centralizado */}
        <div className="flex flex-1 flex-col justify-center items-center text-center px-8">
          <div className="space-y-8">
            <p className="text-white text-8xl font-bold">FILA ADULTO</p>
            <p className="text-white text-6xl font-normal">Em aguardo</p>
            <p className="text-white text-9xl font-bold">{totalPacientes}</p>
          </div>
        </div>

        {/* Seção de Tempo Estimado - Centralizada na parte inferior */}
        <div className="mt-auto mb-8 text-center">
          <p className="text-white text-5xl font-normal mb-4">Tempo estimado de até</p>
          <p className="text-white text-7xl font-bold">{formatarTempo(totalPacientes * tempoPorPessoa)}</p>
        </div>

      </div>

      <footer className="opacity-80">
        <img src="/logocentenario.png" alt="Logo" className="w-40" />
      </footer>
    </div>
  );
}

