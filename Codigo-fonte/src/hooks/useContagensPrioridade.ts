import { useState, useEffect } from 'react';

interface ContagensPrioridade {
  azul: number;
  verde: number;
  amarelo: number;
  laranja: number;
  emergencia: number;
}

export function useContagensPrioridade() {
  const [contagens, setContagens] = useState<ContagensPrioridade | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContagens = async () => {
      try {
        const response = await fetch('/api/contagens-prioridade');
        if (!response.ok) {
          throw new Error('Erro ao buscar contagens');
        }
        const data = await response.json();
        setContagens(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchContagens();

    // Atualizar a cada 30 segundos
    const interval = setInterval(fetchContagens, 30000);

    return () => clearInterval(interval);
  }, []);

  return { contagens, loading, error };
}