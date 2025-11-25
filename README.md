🧔‍♂️ Saúde do Homem – MVP

Solução tecnológica para promoção da saúde masculina

Este projeto é um MVP (Minimum Viable Product) desenvolvido para facilitar o acesso à informação, exames, educação em saúde e suporte rápido para homens que desejam acompanhar sua saúde de forma simples e intuitiva.

O sistema foi construído utilizando React + Vite, estilização com TailwindCSS, gerenciamento local de exames via LocalStorage e integração com API externa (quando configurada).

📌 Funcionalidades Principais
🔐 Autenticação

Tela de login simples

Armazenamento de sessão

Redirecionamento automático pós-login

🏠 Dashboard

Visão geral do aplicativo

Menu de navegação

Acesso rápido às funcionalidades

🧪 Controle de Exames

Adicionar exames

Listar exames salvos

Armazenamento persistente via LocalStorage

Hooks especializados: useExames, useExamesAPI

📚 Educação em Saúde

Página com conteúdos educativos

Informações organizadas e de fácil leitura

🤖 Chat de Saúde (ChatSaude)

Interface de chat para orientação com IA

Estilização própria (ChatSaude.css)

📍 Localizar Pontos de Coleta

Página exclusiva para mapear unidades de coleta

Design responsivo

🧾 Informações Gerais

Conteúdos sobre saúde do homem organizados em tópicos

🏗️ Estrutura do Projeto
Saude-do-Homem-MVP-Project/
│
├── public/                # Arquivos estáticos
│   ├── Logo healh.png
│   └── vite.svg
│
├── src/
│   ├── components/        # Componentes reutilizáveis
│   ├── hooks/             # Lógica de estado (useExames, useExamesAPI)
│   ├── pages/             # Telas da aplicação
│   ├── services/          # Conexão com API
│   ├── styles/            # Arquivos CSS globais
│   ├── App.jsx            # Componente principal
│   ├── main.jsx           # Entrada do React
│   └── router.jsx         # Gerenciamento de rotas
│
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md (este arquivo)

🔧 Tecnologias Utilizadas

React 18

Vite

TailwindCSS

Eslint + Prettier

React Router

LocalStorage

Node.js (para servidor opcional)

▶️ Como Executar o Projeto
1️⃣ Instalar dependências
npm install

2️⃣ Rodar o servidor de desenvolvimento
npm run dev

3️⃣ Acessar no navegador
http://localhost:5173

🧪 Scripts Disponíveis
npm run dev       # Ambiente de desenvolvimento
npm run build     # Build para produção
npm run preview   # Visualizar build
npm run lint      # Verificar erros de lint

📁 Servidor (opcional)

O arquivo server.cjs implementa um backend simples em Node.js para testes de APIs.

Execute com:

node server.cjs

📝 Licença

Este projeto está sob a licença MIT.
