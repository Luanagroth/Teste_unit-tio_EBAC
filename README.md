# Lista de Tarefas com Next.js 15

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript)
![Jest](https://img.shields.io/badge/Jest-Testes-C21325?style=for-the-badge&logo=jest)
![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-2ea44f?style=for-the-badge)

Aplicação full stack para gerenciamento de tarefas, desenvolvida com foco em organização de código, separação de responsabilidades, testes automatizados e apresentação de portfólio.

O projeto permite cadastrar, listar, editar, concluir e excluir tarefas, usando uma interface moderna no frontend e uma API local no backend, com persistência em arquivo JSON.

## Sobre o Projeto

Este projeto foi construído para demonstrar domínio de desenvolvimento full stack com `Next.js`, organização arquitetural, tipagem forte com `TypeScript` e preocupação com qualidade de código.

Mais do que uma lista de tarefas funcional, a proposta aqui foi criar uma base sólida, legível e escalável, que pudesse servir tanto como peça de portfólio quanto como ponto de partida para evoluções mais robustas.

## Preview

![Preview da aplicação](docs/preview.png)

> Se quiser, este preview pode ser substituído futuramente por um GIF ou vídeo curto demonstrando o fluxo da aplicação em tempo real.

## 🏛️ Arquitetura e Princípios de Design

Este projeto não foi pensado apenas para entregar funcionalidades, mas para organizá-las de forma limpa, modular e escalável.

A arquitetura foi estruturada para separar claramente o que pertence ao frontend, ao backend e à camada de entrada do framework. Mesmo sendo um projeto enxuto, ele já segue uma divisão que facilita manutenção, testes e evolução futura.

### Estrutura de Pastas

O projeto foi organizado dentro de `src/`, com responsabilidades bem definidas para cada camada:

```text
src/
  app/
    api/
      tasks/
        route.ts
        [id]/route.ts
    globals.css
    layout.tsx
    page.tsx
  frontend/
    components/
      NovaTarefa.tsx
      TaskBoard.tsx
    hooks/
      useContadorDeTarefas.ts
  backend/
    data/
      tasks.json
    lib/
      mockTasks.ts
      taskStore.ts
    types/
      task.ts

tests/
  app/
  components/
  hooks/

docs/
  preview.png

postman/
  ListaDeTarefas.postman_collection.json
```

### Responsabilidade de cada área

- `src/app/`: camada de entrada do Next.js. Centraliza página principal, layout global, estilos globais e rotas da API.
- `src/frontend/components/`: componentes React responsáveis pela interface e interação com o usuário.
- `src/frontend/hooks/`: hooks customizados reutilizáveis da camada visual.
- `src/backend/lib/`: lógica de acesso, leitura, escrita e atualização das tarefas.
- `src/backend/types/`: contratos e tipos compartilhados entre as camadas.
- `src/backend/data/`: persistência local em JSON, usada como fonte de dados da aplicação.
- `tests/`: testes automatizados organizados por contexto.
- `postman/`: coleção pronta para testes manuais da API.
- `docs/`: recursos visuais usados na documentação.

## Princípios Aplicados

### SOLID

A organização foi guiada principalmente pelo princípio da responsabilidade única.

- `SRP (Single Responsibility Principle)`: cada arquivo possui uma responsabilidade clara.
- `TaskBoard.tsx` cuida da experiência principal da tela.
- `NovaTarefa.tsx` cuida exclusivamente do formulário de criação.
- `useContadorDeTarefas.ts` encapsula a lógica de contagem.
- `taskStore.ts` centraliza a persistência e manipulação dos dados.

### Clean Code

Busquei manter o código legível, com nomes claros, funções pequenas e responsabilidades previsíveis. Isso torna o projeto mais fácil de entender, manter e evoluir.

### Separação de Responsabilidades

O projeto separa interface, regras de dados, persistência, tipos e testes em áreas distintas. Essa divisão reduz acoplamento e facilita refatorações futuras.

### Contratos Tipados com TypeScript

Os tipos definidos em `src/backend/types/task.ts` funcionam como contratos explícitos entre as partes do sistema, aumentando segurança e consistência no código.

### Testabilidade

A estrutura favorece testes unitários e de comportamento, permitindo validar partes isoladas da aplicação com facilidade.

## 🛠️ Tecnologias e Justificativas

| Tecnologia | Área | Por que foi escolhida? |
| --- | --- | --- |
| Next.js 15 | Full Stack | Permite unir interface, rotas da API e renderização moderna em um único projeto, com boa organização e excelente experiência de desenvolvimento. |
| React 19 | Frontend | Biblioteca consolidada para construção de interfaces reativas, componentizadas e reutilizáveis. |
| TypeScript | Full Stack | Adiciona tipagem estática, melhora a manutenção e reduz erros durante evolução e refatoração do sistema. |
| App Router | Arquitetura | Facilita a organização por rotas, layouts e API handlers dentro do ecossistema do Next.js. |
| Jest | Testes | Framework maduro e confiável para automação de testes. |
| Testing Library | Testes | Incentiva testes mais próximos do comportamento real do usuário. |
| ESLint | Qualidade | Ajuda a manter consistência, boas práticas e prevenção de erros comuns. |
| Prettier | Padronização | Garante formatação uniforme em todo o projeto. |
| JSON local | Persistência | Solução simples e eficiente para simular uma base de dados sem depender de infraestrutura externa. |
| Postman | API | Facilita testes manuais e demonstração dos endpoints da aplicação. |

## ✨ Funcionalidades

- Cadastro de novas tarefas.
- Listagem de tarefas salvas localmente.
- Edição de título e descrição.
- Marcação de tarefa como concluída ou pendente.
- Exclusão de tarefas.
- Atualização da interface sem recarregar a página.
- API local para consumo externo e testes via Postman.
- Testes automatizados cobrindo fluxos importantes.

## 💼 Habilidades Demonstradas Neste Projeto

- Estruturação de projeto full stack com separação clara entre frontend e backend.
- Criação de interface reativa com componentes reutilizáveis em React.
- Organização de rotas e API local com Next.js App Router.
- Modelagem de dados com TypeScript e contratos tipados.
- Persistência local com leitura e escrita em arquivo JSON.
- Aplicação de princípios de responsabilidade única e separação de camadas.
- Escrita de testes automatizados para componentes, hooks e página.
- Preocupação com legibilidade, manutenibilidade e escalabilidade.

## 🏁 Começando

Siga os passos abaixo para rodar o projeto localmente.

### Pré-requisitos

- Node.js 18+
- npm 9+

### Instalação

```bash
npm install
```

### Ambiente de desenvolvimento

```bash
npm run dev
```

Depois, abra no navegador:

```text
http://localhost:3000
```

Se a porta `3000` estiver ocupada, o Next.js pode subir em outra porta, como `3001`.

### Build de produção local

```bash
npm run build
npm run start
```

## ✅ Testes e Validações

### Rodar testes

```bash
npm run test
```

### Rodar testes em modo watch

```bash
npm run test:watch
```

### Gerar cobertura

```bash
npm run test:coverage
```

### Validar tipagem

```bash
npx tsc --noEmit
```

### Validar build

```bash
npm run build
```

## 🔌 API Local

Base URL:

```text
http://localhost:3000/api/tasks
```

### Endpoints disponíveis

- `GET /api/tasks`: lista todas as tarefas.
- `POST /api/tasks`: cria uma nova tarefa.
- `GET /api/tasks/:id`: busca uma tarefa específica.
- `PUT /api/tasks/:id`: atualiza uma tarefa.
- `DELETE /api/tasks/:id`: remove uma tarefa.

### Exemplo de body JSON

```json
{
  "title": "Subir projeto no GitHub",
  "description": "Criar repositório, versionar e publicar no portfólio"
}
```

## 🧪 Testes Automatizados Implementados

- `tests/app/page.test.tsx`: valida a renderização da página com dados locais.
- `tests/components/NovaTarefa.test.tsx`: valida formulário, submissão e regras básicas de entrada.
- `tests/hooks/useContadorDeTarefas.test.tsx`: valida a lógica isolada do hook customizado.

## 🚀 Evoluções Futuras

- adicionar uma camada de `services` no backend
- substituir o arquivo JSON por banco de dados real
- implementar filtros por status
- adicionar busca e ordenação
- criar testes de integração da API
- adicionar testes end-to-end
- evoluir a aplicação para autenticação por usuário

## 👤 Contato

Desenvolvido para compor portfólio e demonstrar organização arquitetural, tipagem forte, testes automatizados e boas práticas com Next.js.

- LinkedIn: [www.linkedin.com/in/luanagroth](https://www.linkedin.com/in/luanagroth)
- GitHub: [github.com/Luanagroth](https://github.com/Luanagroth)
- E-mail: [luanaeulalia56@gmail.com](mailto:luanaeulalia56@gmail.com)
