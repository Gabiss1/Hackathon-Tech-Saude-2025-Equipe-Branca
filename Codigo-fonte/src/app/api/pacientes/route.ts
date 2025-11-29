import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { paciente, atendimento } from '@/lib/db/schema';

export async function GET() {
  try {
    const pacientes = await db.select().from(paciente).orderBy(paciente.uuid);
    return NextResponse.json(pacientes);
  } catch (error) {
    console.error('Erro ao buscar pacientes:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { paciente_nome, paciente_sobrenome, paciente_cpf, prioridade, numero_guiche } = body;

    // Validações básicas
    if (!paciente_nome || !paciente_sobrenome || !paciente_cpf || !prioridade || !numero_guiche) {
      return NextResponse.json({ error: 'Campos obrigatórios faltando' }, { status: 400 });
    }

    // Validar prioridade
    const prioridadesValidas = ['Nao urgente', 'Pouco urgente', 'Urgente', 'Muito urgente', 'Emergencia'];
    if (!prioridadesValidas.includes(prioridade)) {
      return NextResponse.json({ error: 'Prioridade inválida' }, { status: 400 });
    }

    // 1. Criar o paciente
    const [novoPaciente] = await db.insert(paciente).values({
      paciente_nome,
      paciente_sobrenome,
      paciente_cpf: parseInt(paciente_cpf)
    }).returning();

    // 2. Criar o atendimento
    const [novoAtendimento] = await db.insert(atendimento).values({
      numero_guiche: parseInt(numero_guiche),
      prioridade,
      paciente_uuid: novoPaciente.uuid
    }).returning();

    return NextResponse.json({
      paciente: novoPaciente,
      atendimento: novoAtendimento,
      mensagem: 'Paciente cadastrado com sucesso!'
    }, { status: 201 });

  } catch (error) {
    console.error('Erro ao criar paciente:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
