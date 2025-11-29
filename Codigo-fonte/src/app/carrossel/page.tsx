'use client'
import React, { useState, useEffect } from 'react';
import FilaPanel from '@/components/FilaPanel';
import { useContagensPrioridade } from '@/hooks/useContagensPrioridade';

export default function Carrossel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { contagens, loading, error } = useContagensPrioridade();

  // Configurações das filas por cor
  const filas = [
    {
      cor: 'AZUL',
      bgColor: 'bg-[#00ACED]',
      tempoPorPessoa: 240, // 4 horas por pessoa (240 minutos)
      prioridade: 'azul'
    },
    {
      cor: 'VERDE',
      bgColor: 'bg-[#027E3F]',
      tempoPorPessoa: 120, // 2 horas por pessoa (120 minutos)
      prioridade: 'verde'
    },
    {
      cor: 'AMARELO',
      bgColor: 'bg-[#F2C800]',
      tempoPorPessoa: 60, // 1 hora por pessoa (60 minutos)
      prioridade: 'amarelo'
    },
    {
      cor: 'LARANJA',
      bgColor: 'bg-[#F68221]',
      tempoPorPessoa: 10, // 10 minutos por pessoa
      prioridade: 'laranja'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % filas.length);
    }, 5000); // 5 segundos

    return () => clearInterval(interval);
  }, [filas.length]);

  const filaAtual = filas[currentIndex];

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
      cor={filaAtual.cor}
      bgColor={filaAtual.bgColor}
      tempoPorPessoa={filaAtual.tempoPorPessoa}
      dadosDinamicos={{
        totalPacientes: contagens?.[filaAtual.prioridade as keyof typeof contagens] || 0
      }}
    />
  );
}

