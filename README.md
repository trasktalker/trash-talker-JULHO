# Trash Talker

**Trash Talker** é uma aplicação focada em "jogar conversa fora" com personalidades únicas e divertidas de IA. Diferente de chats focados em produtividade, nosso objetivo é oferecer interações leves e cheias de personalidade (como o adorável *Pizzaiolo Engraçado* 🍕).

## 🚀 Tecnologias Utilizadas

- **Framework:** Next.js 15 (App Router)
- **Estilização:** Tailwind CSS v4 + Shadcn UI + Cores e Temas customizados
- **Banco de Dados:** PostgreSQL hospedado no [Neon](https://neon.tech)
- **ORM:** Drizzle ORM
- **Autenticação:** Better Auth
- **Gerenciador de Pacotes:** pnpm

---

## ⚙️ Pré-requisitos

Para rodar este projeto localmente, certifique-se de ter instalado em sua máquina:

1. **Node.js** (versão 20+ recomendada)
2. **pnpm** (para gerenciamento de pacotes: `npm install -g pnpm`)
3. Uma conta e um banco de dados no **Neon** (ou outro banco PostgreSQL).

---

## 🛠️ Como Instalar e Rodar

Siga os passos abaixo para iniciar o projeto em modo de desenvolvimento:

### 1. Clonar e Instalar as Dependências

Abra o terminal na pasta onde clonou o projeto e rode:

```bash
pnpm install
```

> **Aviso:** Se algum erro ocorrer indicando pacotes faltando (como ícones ou conversores de markdown), rode: `pnpm add react-markdown react-textarea-autosize lucide-react`

### 2. Configurar Variáveis de Ambiente

Na raiz do projeto, renomeie o arquivo `.env.example` para `.env.local` (ou simplesmente crie um arquivo chamado `.env.local`). 

Preencha com as seguintes chaves de acesso:

```env
# Banco de dados (Substitua pela connection string fornecida pelo Neon)
DATABASE_URL="postgres://usuario:senha@seu-host.neon.tech/nome-do-db?sslmode=require"

# Autenticação (Better Auth)
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"
BETTER_AUTH_SECRET="uma-string-secreta-bem-longa-e-aleatoria-para-seguranca"

# Futuras Chaves de API (Estágio 3 em diante)
# GROQ_API_KEY="sua-chave-do-groqcloud"
# RESEND_API_KEY="sua-chave-do-resend"
```

### 3. Sincronizar o Banco de Dados

Com a `DATABASE_URL` configurada e o banco criado no Neon, suba as tabelas rodando:

```bash
pnpm db:push
```
*Isso fará o Drizzle ler o `schema.ts` e construir as tabelas de sessão, usuários, chats e mensagens lá no Neon.*

### 4. Rodar o Servidor

Agora basta iniciar a aplicação:

```bash
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador para ver a Landing Page do Trash Talker. Crie uma conta e divirta-se!

---

## 📝 Scripts Disponíveis

- `pnpm dev`: Inicia o servidor em modo de desenvolvimento (com Turbopack).
- `pnpm build`: Gera a versão otimizada de produção.
- `pnpm start`: Roda a aplicação na versão gerada pelo build.
- `pnpm db:push`: Aplica mudanças do `schema.ts` diretamente no banco de dados.
- `pnpm db:studio`: Abre o Drizzle Studio no navegador para você inspecionar as tabelas visualmente.
