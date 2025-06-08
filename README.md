# 🏡 Imóveis Admin

Sistema web para gestão de imóveis e inquilinos, com foco em simplicidade, responsividade e performance. Construído com tecnologias modernas como Next.js 15, Prisma, PostgreSQL e Tailwind CSS.

## ✨ Tecnologias Utilizadas

- [Next.js 15 (App Router)](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) – para componentes acessíveis e modernos
- [TanStack Query](https://tanstack.com/query/latest) – gerenciamento de cache e dados assíncronos

## 🧱 Funcionalidades

- Cadastro de inquilinos (tenants) com:
  - Nome
  - CPF/CNPJ (validação automática)
  - Telefone (com máscara)
  - E-mail
  - Endereço (opcional)
- Listagem de inquilinos em layout de cards
- Modal responsivo para criar/editar (dialog ou drawer)
- Validações com Zod
- Máscaras dinâmicas sem libs pesadas
- Requisições otimizadas com React Query

## 🚀 Como rodar localmente

1. Clone o projeto:

   ```bash
   git clone https://github.com/andriwfonseca/rent-admin.git
   cd rent-admin
   ```

2. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   ```

3. Configure o banco de dados:

   Crie um arquivo `.env` com base no `.env.example` e configure a variável `DATABASE_URL`:

   ```env
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/imoveis"
   ```

4. Execute as migrations:

   ```bash
   npx prisma migrate dev --name init
   ```

5. Rode o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

6. Acesse no navegador:

   ```
   http://localhost:3000
   ```

## 🗃️ Estrutura de Pastas

```
src/
├── app/                  # Rotas e páginas
├── components/           # Componentes reutilizáveis
├── features/tenant/      # Domínio: inquilinos
├── lib/                  # Utilitários e validadores
├── prisma/               # Esquema do banco
└── styles/               # Estilos globais
```

## 🛠️ Scripts Úteis

```bash
npm run dev        # Inicia a aplicação localmente
npm run build      # Gera build de produção
npm run lint       # Verifica problemas de lint
npx prisma studio  # Interface web para explorar o banco
```

## 📝 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

Feito com 💚 por Andriw (https://github.com/andriwfonseca)
