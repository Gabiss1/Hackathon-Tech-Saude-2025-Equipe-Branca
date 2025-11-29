import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { atendimento, paciente } from '@/lib/db/schema';
import { eq, sql } from 'drizzle-orm';
import { enviarMensagemWhatsApp, gerarMensagemPaciente } from '@/lib/whatsapp-service';

export async function GET() {
  try {
    const atendimentosComPacientes = await db
      .select({
        uuid: atendimento.uuid,
        numero_guiche: atendimento.numero_guiche,
        prioridade: atendimento.prioridade,
        paciente_nome: paciente.paciente_nome,
        paciente_sobrenome: paciente.paciente_sobrenome,
      })
      .from(atendimento)
      .innerJoin(paciente, eq(atendimento.paciente_uuid, paciente.uuid))
      .orderBy(atendimento.uuid);

    return NextResponse.json(atendimentosComPacientes);
  } catch (error) {
    console.error('Erro ao buscar atendimentos:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { paciente_uuid, numero_guiche, prioridade, telefone } = body;

    // Validação básica
    if (!paciente_uuid || !numero_guiche || !prioridade) {
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

    // Criar o atendimento
    const novoAtendimento = await db.insert(atendimento).values({
      numero_guiche,
      prioridade,
      paciente_uuid,
    }).returning();

    // Buscar dados do paciente para enviar WhatsApp
    const pacienteData = await db
      .select({
        nome: paciente.paciente_nome,
        sobrenome: paciente.paciente_sobrenome
      })
      .from(paciente)
      .where(eq(paciente.uuid, paciente_uuid))
      .limit(1);

    if (pacienteData.length > 0 && telefone) {
      try {
        // Calcular posição na fila e tempo estimado
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
        const nomeCompleto = `${pacienteData[0].nome} ${pacienteData[0].sobrenome}`;
        const mensagem = gerarMensagemPaciente(
          nomeCompleto,
          corPrioridade.toUpperCase(),
          posicaoFila,
          tempoEstimado
        );

        const resultadoWhatsApp = await enviarMensagemWhatsApp({
          phone: telefone,
          message: mensagem
        });

        console.log('Mensagem WhatsApp enviada para atendimento:', novoAtendimento[0].uuid);
      } catch (whatsappError) {
        console.error('Erro ao enviar WhatsApp para atendimento, mas atendimento foi criado:', whatsappError);
        // Não retorna erro pois o atendimento foi criado com sucesso
      }
    }

    return NextResponse.json(novoAtendimento[0], { status: 201 });
  } catch (error) {
    console.error('Erro ao criar atendimento:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
