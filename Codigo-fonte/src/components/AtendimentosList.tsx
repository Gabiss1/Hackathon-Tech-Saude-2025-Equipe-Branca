'use client';

import { useState, useEffect } from 'react';

interface Atendimento {
  uuid: number;
  numero_guiche: number;
  prioridade: string;
  paciente_nome: string;
  paciente_sobrenome: string;
}

interface AtendimentosListProps {
  refreshKey?: number;
}

export function AtendimentosList({ refreshKey }: AtendimentosListProps) {
  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAtendimentos = async () => {
      try {
        const response = await fetch('/api/atendimentos');
        const data = await response.json();
        setAtendimentos(data);
      } catch (error) {
        console.error('Erro ao carregar atendimentos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAtendimentos();
  }, [refreshKey]);

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'Emergencia':
        return 'bg-red-100 text-red-800';
      case 'Muito urgente':
        return 'bg-orange-100 text-orange-800';
      case 'Urgente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Pouco urgente':
        return 'bg-green-100 text-green-800';
      case 'Nao urgente':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="text-center">Carregando atendimentos...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Guichê
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prioridade
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Paciente
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {atendimentos.map((atend) => (
              <tr key={atend.uuid} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {atend.uuid}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {atend.numero_guiche}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPrioridadeColor(atend.prioridade)}`}>
                    {atend.prioridade}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {atend.paciente_nome} {atend.paciente_sobrenome}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
