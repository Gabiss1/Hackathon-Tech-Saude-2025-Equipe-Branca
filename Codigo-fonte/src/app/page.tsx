'use client';

import { useState } from 'react';
import { PacientesList } from '@/components/PacientesList';
import { AtendimentosList } from '@/components/AtendimentosList';
import { NovoAtendimentoModal } from '@/components/NovoAtendimentoModal';
import { NovoPacienteModal } from '@/components/NovoPacienteModal';

export default function Home() {
  const [isAtendimentoModalOpen, setIsAtendimentoModalOpen] = useState(false);
  const [isPacienteModalOpen, setIsPacienteModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setRefreshKey(prev => prev + 1); // Força o refresh das listas
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Sistema de Fila de Triagem
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => setIsPacienteModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium shadow-md transition-colors"
          >
            👤 + Novo Paciente
          </button>
          <button
            onClick={() => setIsAtendimentoModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-md transition-colors"
          >
            📋 + Novo Atendimento
          </button>
        </div>
      </div>

      {/* Navegação para funcionalidades do painel */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Painéis e Visualizações</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
          <a
            href="/carrossel"
            target="_blank"
            className="bg-gradient-to-r from-blue-500 via-green-500 to-orange-500 hover:from-blue-600 hover:via-green-600 hover:to-orange-600 text-white px-4 py-3 rounded-lg font-medium shadow-md transition-colors text-center"
          >
            🎠 Carrossel Cores
          </a>
          <a
            href="/painel-senhas"
            target="_blank"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium shadow-md transition-colors text-center"
          >
            Painel de Senhas
          </a>
          <a
            href="/prioridades"
            target="_blank"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium shadow-md transition-colors text-center"
          >
            Prioridades
          </a>
          <a
            href="/senha-popup"
            target="_blank"
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-medium shadow-md transition-colors text-center"
          >
            Senha Popup
          </a>
          <a
            href="/azul"
            target="_blank"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg font-medium shadow-md transition-colors text-center"
          >
            Fila Azul
          </a>
          <a
            href="/verde"
            target="_blank"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg font-medium shadow-md transition-colors text-center"
          >
            Fila Verde
          </a>
          <a
            href="/amarelo"
            target="_blank"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-3 rounded-lg font-medium shadow-md transition-colors text-center"
          >
            Fila Amarela
          </a>
          <a
            href="/laranja"
            target="_blank"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg font-medium shadow-md transition-colors text-center"
          >
            Fila Laranja
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Pacientes</h2>
          <PacientesList />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Atendimentos</h2>
          <AtendimentosList refreshKey={refreshKey} />
        </div>
      </div>

      <NovoPacienteModal
        isOpen={isPacienteModalOpen}
        onClose={() => setIsPacienteModalOpen(false)}
        onSuccess={handleSuccess}
      />

      <NovoAtendimentoModal
        isOpen={isAtendimentoModalOpen}
        onClose={() => setIsAtendimentoModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
