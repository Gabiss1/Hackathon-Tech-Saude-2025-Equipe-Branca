'use client';

import { useState } from 'react';
import { db } from '@/lib/db';
import { paciente } from '@/lib/db/schema';

interface NovoAtendimentoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface Paciente {
  uuid: number;
  paciente_nome: string;
  paciente_sobrenome: string;
  paciente_cpf: number;
}

export function NovoAtendimentoModal({ isOpen, onClose, onSuccess }: NovoAtendimentoModalProps) {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    paciente_uuid: '',
    numero_guiche: '',
    prioridade: 'Nao urgente',
    telefone: ''
  });

  // Carregar pacientes quando o modal abrir
  const loadPacientes = async () => {
    try {
      const response = await fetch('/api/pacientes');
      const data = await response.json();
      setPacientes(data);
    } catch (error) {
      console.error('Erro ao carregar pacientes:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/atendimentos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paciente_uuid: parseInt(formData.paciente_uuid),
          numero_guiche: parseInt(formData.numero_guiche),
          prioridade: formData.prioridade,
          telefone: formData.telefone
        }),
      });

      if (response.ok) {
        onSuccess();
        onClose();
        setFormData({
          paciente_uuid: '',
          numero_guiche: '',
          prioridade: 'Nao urgente',
          telefone: ''
        });
      } else {
        console.error('Erro ao criar atendimento');
      }
    } catch (error) {
      console.error('Erro ao criar atendimento:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    loadPacientes();
  };

  if (isOpen) {
    handleOpen();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Novo Atendimento</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Paciente
            </label>
            <select
              value={formData.paciente_uuid}
              onChange={(e) => setFormData({...formData, paciente_uuid: e.target.value})}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione um paciente</option>
              {pacientes.map((pac) => (
                <option key={pac.uuid} value={pac.uuid}>
                  {pac.paciente_nome} {pac.paciente_sobrenome} - CPF: {pac.paciente_cpf}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Número do Guichê
            </label>
            <input
              type="number"
              value={formData.numero_guiche}
              onChange={(e) => setFormData({...formData, numero_guiche: e.target.value})}
              required
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: 1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prioridade
            </label>
            <select
              value={formData.prioridade}
              onChange={(e) => setFormData({...formData, prioridade: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Nao urgente">Não urgente</option>
              <option value="Pouco urgente">Pouco urgente</option>
              <option value="Urgente">Urgente</option>
              <option value="Muito urgente">Muito urgente</option>
              <option value="Emergencia">Emergência</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefone (WhatsApp)
            </label>
            <input
              type="tel"
              value={formData.telefone}
              onChange={(e) => setFormData({...formData, telefone: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="5511987654321"
            />
            <p className="text-xs text-gray-500 mt-1">
              Formato: código do país + DDD + número (ex: 5511987654321)
            </p>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Criando...' : 'Criar Atendimento'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
