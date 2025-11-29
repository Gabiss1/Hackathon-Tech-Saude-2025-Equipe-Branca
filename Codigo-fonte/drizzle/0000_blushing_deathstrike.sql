CREATE TABLE `atendimento` (
	`uuid` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`numero_guiche` integer NOT NULL,
	`prioridade` text NOT NULL,
	`paciente_uuid` integer NOT NULL,
	FOREIGN KEY (`paciente_uuid`) REFERENCES `paciente`(`uuid`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `paciente` (
	`uuid` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`paciente_nome` text NOT NULL,
	`paciente_sobrenome` text NOT NULL,
	`paciente_cpf` integer NOT NULL,
	`telefone` text
);
