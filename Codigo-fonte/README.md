# 🏥 Sistema de Fila de Triagem

Um sistema completo de gerenciamento de filas de triagem médica com integração WhatsApp automática, desenvolvido para otimizar o atendimento hospitalar.

## 📋 Proposta do Projeto

O Sistema de Fila de Triagem foi desenvolvido para modernizar e otimizar o processo de triagem em ambientes hospitalares. O sistema permite:

- **Gerenciamento Inteligente de Filas**: Organização de pacientes por prioridade médica (Azul, Verde, Amarelo, Laranja)
- **Painéis Informativos**: Displays visuais para orientação dos pacientes
- **Integração WhatsApp**: Notificações automáticas sobre posição na fila e tempo estimado
- **Carrossel Automático**: Apresentação rotativa dos status das filas em telas públicas
- **Interface Responsiva**: Funciona em desktop e dispositivos móveis

## 🎯 Funcionalidades Principais

### 👥 Gerenciamento de Pacientes
- Cadastro completo de pacientes (nome, sobrenome, CPF)
- Histórico de atendimentos
- Vinculação automática entre pacientes e atendimentos

### 📋 Sistema de Atendimentos
- Criação de atendimentos por prioridade
- Designação automática de guichês
- Cálculo inteligente de posição na fila
- Estimativa de tempo de espera

### 📊 Painéis Informativos
- **Painel Azul**: Não urgente (240 min/pessoa)
- **Painel Verde**: Pouco urgente (120 min/pessoa)
- **Painel Amarelo**: Urgente (60 min/pessoa)
- **Painel Laranja**: Muito urgente (10 min/pessoa)

### 🎠 Carrossel Automático
- Alternância automática entre painéis a cada 5 segundos
- Dados atualizados em tempo real
- Perfeito para telas de exibição públicas

### 📱 Integração WhatsApp
- Mensagens automáticas ao iniciar atendimento
- Informações sobre posição na fila
- Estimativa de tempo de espera
- Comunicação bidirecional

## 🛠️ Tecnologias Utilizadas

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Banco de Dados**: SQLite com Drizzle ORM
- **WhatsApp API**: Z-API (https://z-api.io)
- **UI/UX**: Componentes responsivos e acessíveis

## 📦 Dependências

```json
{
  "dependencies": {
    "@libsql/client": "^0.5.6",
    "axios": "^1.6.0",
    "drizzle-orm": "^0.29.4",
    "drizzle-kit": "^0.20.14",
    "next": "^14.1.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "typescript": "^5.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "autoprefixer": "^10.0.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "14.1.0",
    "postcss": "^8.0.0",
    "tailwindcss": "^3.3.0"
  }
}
```

## ⚙️ Configuração do Ambiente (.env.local)

O arquivo `.env.local` contém as configurações essenciais para o funcionamento do sistema:

```env
# Configurações da Z-API para WhatsApp
INSTANCE_ID=3EAEFB600F99420B9A57DE6AEFB713A8
INSTANCE_TOKEN=0F3165C639E249D528CBE829
CLIENT_TOKEN=F529273a875ac48afb8d0d16611c6c7f6S
```

### 📝 Detalhes das Variáveis:

#### INSTANCE_ID
- **O que é**: Identificador único da sua instância Z-API
- **Onde obter**: Dashboard da Z-API (https://z-api.io)
- **Formato**: String alfanumérica (32 caracteres)

#### INSTANCE_TOKEN
- **O que é**: Token de autenticação da instância
- **Onde obter**: Dashboard da Z-API, seção de tokens
- **Formato**: String alfanumérica (24 caracteres)

#### CLIENT_TOKEN
- **O que é**: Token de cliente para autenticação adicional
- **Onde obter**: Dashboard da Z-API, configurações da conta
- **Formato**: String alfanumérica (32 caracteres)

### 🔐 Segurança
- **Nunca** commite o arquivo `.env.local` no Git
- **Nunca** compartilhe suas credenciais Z-API
- Use sempre HTTPS em produção
- Configure as variáveis corretamente antes de iniciar

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Conta Z-API (para WhatsApp)

### Instalação

1. **Clone o repositório**:
```bash
git clone <url-do-repositorio>
cd fila-triagem
```

2. **Instale as dependências**:
```bash
npm install
```

3. **Configure as variáveis de ambiente**:
```bash
cp .env.example .env.local
# Edite o .env.local com suas credenciais Z-API
```

4. **Configure o banco de dados**:
```bash
npm run db:push
```

5. **Execute o projeto**:
```bash
npm run dev
```

6. **Acesse**: http://localhost:3000

## 📊 Estrutura do Banco de Dados

### Tabela `paciente`
```sql
CREATE TABLE paciente (
    uuid INTEGER PRIMARY KEY AUTOINCREMENT,
    paciente_nome TEXT NOT NULL,
    paciente_sobrenome TEXT NOT NULL,
    paciente_cpf INTEGER NOT NULL
);
```

### Tabela `atendimento`
```sql
CREATE TABLE atendimento (
    uuid INTEGER PRIMARY KEY AUTOINCREMENT,
    numero_guiche INTEGER NOT NULL,
    prioridade TEXT NOT NULL CHECK (prioridade IN (
        'Nao urgente', 'Pouco urgente', 'Urgente', 'Muito urgente', 'Emergencia'
    )),
    paciente_uuid INTEGER NOT NULL,
    FOREIGN KEY (paciente_uuid) REFERENCES paciente (uuid)
);
```

### Mapeamento de Prioridades
- `'Nao urgente'` → Azul
- `'Pouco urgente'` → Verde
- `'Urgente'` → Amarelo
- `'Muito urgente'` → Laranja
- `'Emergencia'` → Emergência

## 🎨 Interface e Navegação

### Páginas Disponíveis
- **`/`**: Página principal com listas e botões de ação
- **`/carrossel`**: Carrossel automático dos painéis
- **`/azul`**, **`/verde`**, **`/amarelo`**, **`/laranja`**: Painéis individuais
- **`/prioridades`**: Visão geral das filas por prioridade
- **`/painel-senhas`**: Painel de senhas atual

### Modal de Ações
- **👤 Novo Paciente**: Cadastro completo (sem WhatsApp)
- **📋 Novo Atendimento**: Inicia atendimento (com WhatsApp)

## 📱 API Endpoints

### GET /api/pacientes
Retorna lista de todos os pacientes cadastrados.

### POST /api/pacientes
Cadastra um novo paciente e cria um atendimento básico.
```json
{
  "paciente_nome": "João",
  "paciente_sobrenome": "Silva",
  "paciente_cpf": "12345678901",
  "prioridade": "Pouco urgente",
  "numero_guiche": 1
}
```

### GET /api/atendimentos
Retorna lista de todos os atendimentos com dados dos pacientes.

### POST /api/atendimentos
Cria um novo atendimento e envia WhatsApp automaticamente.
```json
{
  "paciente_uuid": 1,
  "numero_guiche": 2,
  "prioridade": "Urgente",
  "telefone": "5511987654321"
}
```

### GET /api/contagens-prioridade
Retorna contagem de pacientes por prioridade para os painéis.

## 💬 Sistema WhatsApp

### Quando é enviado:
- **Apenas** quando um atendimento é criado/registrado
- **Não** quando um paciente é cadastrado

### Conteúdo da mensagem:
```
Olá [Nome Completo], tudo certo?

Aqui estão as informações sobre a fila:

🏥 Cor do Protocolo: [COR]
📋 Posição na Fila: [POSIÇÃO]
⏰ Tempo de espera total estimado: [TEMPO] minutos

Aguarde seu atendimento. Entraremos em contato em breve!
```

### Formato do telefone:
- Código do país + DDD + número
- Exemplo: `5511987654321` (Brasil + SP + número)

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Build para produção
npm run start        # Inicia servidor de produção

# Banco de dados
npm run db:push      # Aplica mudanças no schema
npm run db:studio    # Interface gráfica do banco

# Qualidade
npm run lint         # Executa ESLint
```

## 📈 Monitoramento e Logs

### Console Logs
- ✅ Criação de pacientes e atendimentos
- ✅ Envios de WhatsApp bem-sucedidos
- ❌ Erros de API e WhatsApp (não críticos)
- 🔄 Atualizações automáticas dos dados

### Tratamento de Erros
- **WhatsApp**: Falhas não impedem o funcionamento do sistema
- **Banco**: Rollback automático em caso de erro
- **API**: Respostas HTTP apropriadas com mensagens claras

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para dúvidas ou problemas:
- Verifique os logs do console
- Confirme as configurações do `.env.local`
- Teste a conectividade com a Z-API

---

**Desenvolvido com ❤️ para otimizar o atendimento médico brasileiro** 🏥🇧🇷
