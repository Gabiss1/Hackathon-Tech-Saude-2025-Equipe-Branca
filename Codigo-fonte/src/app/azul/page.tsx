'use client'
import FilaPanel from '@/components/FilaPanel';
import { useContagensPrioridade } from '@/hooks/useContagensPrioridade';

export default function Azul() {
  const { contagens, loading, error } = useContagensPrioridade();

  if (loading) {
    return (
      <div className="h-screen w-screen bg-gray-50 flex flex-col justify-between items-center py-6 overflow-hidden">
        <div className="flex flex-col justify-center items-center flex-1">
          <p className="text-4xl font-bold text-gray-600">Carregando dados do banco...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-screen bg-gray-50 flex flex-col justify-between items-center py-6 overflow-hidden">
        <div className="flex flex-col justify-center items-center flex-1">
          <p className="text-4xl font-bold text-red-600">Erro ao carregar dados</p>
          <p className="text-lg text-gray-600 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <FilaPanel
      cor="AZUL"
      bgColor="bg-[#00ACED]"
      tempoPorPessoa={240}
      dadosDinamicos={{
        totalPacientes: contagens?.azul || 0
      }}
    />
  );
}
