'use client';

import { useState } from 'react';

interface NovoPacienteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function NovoPacienteModal({ isOpen, onClose, onSuccess }: NovoPacienteModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    paciente_nome: '',
    paciente_sobrenome: '',
    paciente_cpf: '',
    prioridade: 'Nao urgente',
    numero_guiche: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/pacientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paciente_nome: formData.paciente_nome,
          paciente_sobrenome: formData.paciente_sobrenome,
          paciente_cpf: formData.paciente_cpf,
          prioridade: formData.prioridade,
          numero_guiche: formData.numero_guiche
        }),
      });

      if (response.ok) {
        onSuccess();
        onClose();
        setFormData({
          paciente_nome: '',
          paciente_sobrenome: '',
          prioridade: 'Nao urgente',
          numero_guiche: '',
          paciente_cpf: ''
        });
      } else {
        const errorData = await response.json();
        console.error('Erro ao criar paciente:', errorData);
        alert(`Erro: ${errorData.error || 'Erro ao criar paciente'}`);
      }
    } catch (error) {
      console.error('Erro ao criar paciente:', error);
      alert('Erro ao criar paciente. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Novo Paciente</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome *
              </label>
              <input
                type="text"
                value={formData.paciente_nome}
                onChange={(e) => setFormData({...formData, paciente_nome: e.target.value})}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="João"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sobrenome *
              </label>
              <input
                type="text"
                value={formData.paciente_sobrenome}
                onChange={(e) => setFormData({...formData, paciente_sobrenome: e.target.value})}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Silva"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CPF *
            </label>
            <input
              type="text"
              value={formData.paciente_cpf}
              onChange={(e) => setFormData({...formData, paciente_cpf: e.target.value})}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="12345678901"
              maxLength={11}
            />
          </div>


          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Número do Guichê *
              </label>
              <input
                type="number"
                value={formData.numero_guiche}
                onChange={(e) => setFormData({...formData, numero_guiche: e.target.value})}
                required
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prioridade *
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
          </div>

          <div className="bg-blue-50 p-4 rounded-md">
            <h4 className="text-sm font-semibold text-blue-800 mb-2">ℹ️ Sobre o Cadastro:</h4>
            <p className="text-sm text-blue-700">
              O paciente será cadastrado no sistema. Para iniciar o atendimento e enviar notificações
              via WhatsApp, use o botão &ldquo;Novo Atendimento&rdquo;.
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
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Cadastrando...' : 'Cadastrar Paciente'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
