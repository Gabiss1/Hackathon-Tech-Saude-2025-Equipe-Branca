'use client'
import { useState, useEffect } from "react";

interface FormData {
  paciente_nome: string;
  paciente_sobrenome: string;
  paciente_cpf: string;
  telefone: string;
  prioridade: string;
  numero_guiche: string;
}

export default function NovaConsulta() {
  const [formData, setFormData] = useState<FormData>({
    paciente_nome: '',
    paciente_sobrenome: '',
    paciente_cpf: '',
    telefone: '',
    prioridade: 'Nao urgente',
    numero_guiche: '1'
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setDate(now.toLocaleDateString("pt-BR"));
      setTime(
        now.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/nova-consulta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          paciente_cpf: parseInt(formData.paciente_cpf)
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao criar consulta');
      }

      const data = await response.json();
      setSuccess(true);
      setFormData({
        paciente_nome: '',
        paciente_sobrenome: '',
        paciente_cpf: '',
        telefone: '',
        prioridade: 'Nao urgente',
        numero_guiche: '1'
      });

    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const prioridades = [
    'Nao urgente',
    'Pouco urgente',
    'Urgente',
    'Muito urgente',
    'Emergencia'
  ];

  const guiches = Array.from({ length: 10 }, (_, i) => (i + 1).toString());

  return (
    <div className="h-screen w-screen bg-[#0A0A0A] shadow-2xl overflow-hidden text-white flex flex-col">
      {/* Header */}
      <div className="flex border-b-4 border-white justify-between items-center bg-[#111] px-6 h-24 text-xl">
        <div className="flex items-center gap-3 h-full">
          <img
            className="h-full object-contain"
            src="/logocentenario.png"
            alt=""
            width={200}
          />
        </div>
        <div className="flex items-center gap-10">
          <div className="flex gap-2">
            <span>📅</span>
            <span>{date}</span>
          </div>
          <div className="flex gap-2">
            <span>🕒</span>
            <span>{time}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gradient-to-br from-blue-900 to-blue-700 flex flex-col items-center justify-center p-8">
        <div className="bg-black bg-opacity-50 rounded-lg p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-8 text-white">
            Nova Consulta
          </h1>

          {success && (
            <div className="bg-green-600 text-white p-4 rounded-lg mb-6 text-center">
              ✅ Consulta criada com sucesso! Mensagem enviada ao paciente.
            </div>
          )}

          {error && (
            <div className="bg-red-600 text-white p-4 rounded-lg mb-6 text-center">
              ❌ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nome</label>
              <input
                type="text"
                name="paciente_nome"
                value={formData.paciente_nome}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite o nome"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Sobrenome</label>
              <input
                type="text"
                name="paciente_sobrenome"
                value={formData.paciente_sobrenome}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite o sobrenome"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">CPF</label>
              <input
                type="text"
                name="paciente_cpf"
                value={formData.paciente_cpf}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite o CPF (apenas números)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Telefone (WhatsApp)</label>
              <input
                type="tel"
                name="telefone"
                value={formData.telefone}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: 5511999999999"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Prioridade</label>
              <select
                name="prioridade"
                value={formData.prioridade}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {prioridades.map(prioridade => (
                  <option key={prioridade} value={prioridade}>
                    {prioridade}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Guichê</label>
              <select
                name="numero_guiche"
                value={formData.numero_guiche}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {guiches.map(guiche => (
                  <option key={guiche} value={guiche}>
                    Guichê {guiche}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-bold py-3 px-4 rounded-md transition duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Criando...
                </>
              ) : (
                'Criar Consulta'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

