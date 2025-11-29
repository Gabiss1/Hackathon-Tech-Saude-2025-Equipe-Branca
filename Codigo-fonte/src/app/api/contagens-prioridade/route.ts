import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { atendimento } from '@/lib/db/schema';
import { eq, sql } from 'drizzle-orm';

export async function GET() {
  try {
    // Buscar contagens por prioridade
    const contagens = await db
      .select({
        prioridade: atendimento.prioridade,
        count: sql<number>`count(*)`.as('count')
      })
      .from(atendimento)
      .groupBy(atendimento.prioridade);

    // Mapear as prioridades do banco para as cores dos cards
    const mapeamentoCores = {
      'Nao urgente': 'azul',
      'Pouco urgente': 'verde',
      'Urgente': 'amarelo',
      'Muito urgente': 'laranja',
      'Emergencia': 'emergencia' // caso precise no futuro
    };

    // Transformar os dados no formato esperado pelos cards
    const dadosCards = {
      azul: contagens.find(c => c.prioridade === 'Nao urgente')?.count || 0,
      verde: contagens.find(c => c.prioridade === 'Pouco urgente')?.count || 0,
      amarelo: contagens.find(c => c.prioridade === 'Urgente')?.count || 0,
      laranja: contagens.find(c => c.prioridade === 'Muito urgente')?.count || 0,
      emergencia: contagens.find(c => c.prioridade === 'Emergencia')?.count || 0
    };

    return NextResponse.json(dadosCards);
  } catch (error) {
    console.error('Erro ao buscar contagens por prioridade:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
