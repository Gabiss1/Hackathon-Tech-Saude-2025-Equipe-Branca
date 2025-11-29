import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const paciente = sqliteTable('paciente', {
  uuid: integer('uuid').primaryKey({ autoIncrement: true }),
  paciente_nome: text('paciente_nome').notNull(),
  paciente_sobrenome: text('paciente_sobrenome').notNull(),
  paciente_cpf: integer('paciente_cpf').notNull(),
  telefone: text('telefone'),
});

export const atendimento = sqliteTable('atendimento', {
  uuid: integer('uuid').primaryKey({ autoIncrement: true }),
  numero_guiche: integer('numero_guiche').notNull(),
  prioridade: text('prioridade', {
    enum: ['Nao urgente', 'Pouco urgente', 'Urgente', 'Muito urgente', 'Emergencia']
  }).notNull(),
  paciente_uuid: integer('paciente_uuid').references(() => paciente.uuid).notNull(),
});
