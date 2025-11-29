import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { paciente, atendimento } from '@/lib/db/schema';
import { eq, sql } from 'drizzle-orm';
import { enviarMensagemWhatsApp, gerarMensagemPaciente } from '@/lib/whatsapp-service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { paciente_nome, paciente_sobrenome, paciente_cpf, telefone, prioridade, numero_guiche } = body;

    // Validações básicas
    if (!paciente_nome || !paciente_sobrenome || !paciente_cpf || !telefone || !prioridade || !numero_guiche) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }

    // Verificar se a prioridade é válida
    const prioridadesValidas = ['Nao urgente', 'Pouco urgente', 'Urgente', 'Muito urgente', 'Emergencia'];
    if (!prioridadesValidas.includes(prioridade)) {
      return NextResponse.json(
        { error: 'Prioridade inválida' },
        { status: 400 }
      );
    }

    // Verificar se o CPF já existe
    const pacienteExistente = await db
      .select()
      .from(paciente)
      .where(eq(paciente.paciente_cpf, paciente_cpf))
      .limit(1);

    let pacienteId: number;

    if (pacienteExistente.length > 0) {
      // Atualizar telefone do paciente existente
      await db.update(paciente)
        .set({ telefone })
        .where(eq(paciente.uuid, pacienteExistente[0].uuid));
      pacienteId = pacienteExistente[0].uuid;
    } else {
      // Criar novo paciente
      const novoPaciente = await db.insert(paciente).values({
        paciente_nome,
        paciente_sobrenome,
        paciente_cpf,
        telefone
      }).returning();
      pacienteId = novoPaciente[0].uuid;
    }

    // Criar o atendimento
    const novoAtendimento = await db.insert(atendimento).values({
      numero_guiche: parseInt(numero_guiche),
      prioridade,
      paciente_uuid: pacienteId,
    }).returning();

    // Calcular posição na fila e tempo estimado para WhatsApp
    const mapeamentoPrioridades = {
      'Nao urgente': 'azul',
      'Pouco urgente': 'verde',
      'Urgente': 'amarelo',
      'Muito urgente': 'laranja',
      'Emergencia': 'emergencia'
    };

    const corPrioridade = mapeamentoPrioridades[prioridade as keyof typeof mapeamentoPrioridades];

    // Contar pacientes na mesma prioridade à frente deste
    const pacientesFrente = await db
      .select({ count: sql<number>`count(*)` })
      .from(atendimento)
      .where(eq(atendimento.prioridade, prioridade));

    const posicaoFila = (pacientesFrente[0]?.count || 0);

    // Calcular tempo estimado baseado na prioridade
    const temposPorPessoa = {
      'azul': 240,      // 4 horas por pessoa
      'verde': 120,     // 2 horas por pessoa
      'amarelo': 60,    // 1 hora por pessoa
      'laranja': 10,    // 10 minutos por pessoa
      'emergencia': 5   // 5 minutos por pessoa
    };

    const tempoPorPessoa = temposPorPessoa[corPrioridade as keyof typeof temposPorPessoa];
    const tempoEstimado = `${posicaoFila * tempoPorPessoa} minutos`;

    // Enviar mensagem WhatsApp
    const nomeCompleto = `${paciente_nome} ${paciente_sobrenome}`;
    const mensagem = gerarMensagemPaciente(
      nomeCompleto,
      corPrioridade.toUpperCase(),
      posicaoFila,
      tempoEstimado
    );

    try {
      const resultadoWhatsApp = await enviarMensagemWhatsApp({
        phone: telefone,
        message: mensagem
      });

      console.log('Mensagem WhatsApp enviada para nova consulta:', novoAtendimento[0].uuid);
    } catch (whatsappError) {
      console.error('Erro ao enviar WhatsApp, mas consulta foi criada:', whatsappError);
      // Não retorna erro pois a consulta foi criada com sucesso
    }

    return NextResponse.json({
      paciente: {
        uuid: pacienteId,
        paciente_nome,
        paciente_sobrenome,
        paciente_cpf,
        telefone
      },
      atendimento: novoAtendimento[0],
      mensagem: 'Consulta criada com sucesso!'
    }, { status: 201 });

  } catch (error) {
    console.error('Erro ao criar consulta:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

