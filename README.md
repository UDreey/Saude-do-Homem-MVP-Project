# 🧔‍♂️ Saúde do Homem -- MVP

Solução tecnológica para promoção da saúde masculina.

## 📌 Funcionalidades

- Login
- Dashboard
- Controle de Exames
- Educação em Saúde
- Chat de Saúde
- Localizar Pontos de Coleta
- Informações Gerais

## ⚙️ Configuração Inicial

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar MongoDB

O projeto precisa de um banco de dados MongoDB. Você tem **duas opções**:

#### Opção 1: MongoDB Atlas (Recomendado - Cloud) ☁️

1. Acesse [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crie uma conta gratuita
3. Crie um cluster gratuito (Free Tier)
4. Crie um usuário de banco de dados (Database Access)
5. Adicione seu IP na Network Access (ou use `0.0.0.0/0` para desenvolvimento)
6. Clique em "Connect" → "Connect your application"
7. Copie a connection string (algo como: `mongodb+srv://usuario:senha@cluster0.xxxxx.mongodb.net/...`)

#### Opção 2: MongoDB Local 💻

1. Baixe e instale o [MongoDB Community Server](https://www.mongodb.com/try/download/community)
2. Inicie o serviço MongoDB no seu sistema
3. A string de conexão será: `mongodb://localhost:27017/health-on-time`

### 3. Criar Arquivo .env

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
# String de conexão do MongoDB
MONGODB_URI=mongodb+srv://usuario:senha@cluster0.xxxxx.mongodb.net/health-on-time?retryWrites=true&w=majority

# Secret para JWT (altere em produção)
JWT_SECRET=jwt-secret-key-change-in-production

# Porta do servidor (opcional)
PORT=3000
```

**⚠️ IMPORTANTE:**

- Substitua `usuario` e `senha` pelos seus dados do MongoDB Atlas
- Substitua `cluster0.xxxxx.mongodb.net` pela URL do seu cluster
- Se usar MongoDB local, use: `MONGODB_URI=mongodb://localhost:27017/health-on-time`
- **NUNCA** commite o arquivo `.env` no Git (ele já está no .gitignore)

## ▶️ Como Executar

```bash
npm run dev
```

Isso iniciará:

- Frontend (React + Vite) na porta 5173
- Backend (Express) na porta 3000

## 🔄 Usar o Mesmo Banco em Outro PC

Se você quer usar o mesmo banco de dados MongoDB em outro computador, consulte o guia completo:

📖 **[COMO-COPIAR-BANCO.md](./COMO-COPIAR-BANCO.md)** - Guia detalhado para copiar configuração do banco

**Resumo rápido:**

1. No PC atual, execute: `npm run verificar-mongodb` para ver sua string de conexão
2. Copie o arquivo `.env` para o outro PC (ou crie manualmente com a mesma string)
3. No outro PC, execute `npm install` e `npm run dev`

## 🐛 Resolução de Problemas

### Erro: `connect ECONNREFUSED ::1:27017`

**Causa:** O MongoDB não está configurado ou não está rodando.

**Solução:**

1. Verifique se criou o arquivo `.env` com a variável `MONGODB_URI`
2. Se usar MongoDB local, verifique se o serviço está rodando
3. Se usar MongoDB Atlas, verifique se:
   - A string de conexão está correta
   - Seu IP está na whitelist do Atlas
   - As credenciais estão corretas

## 📝 Licença

MIT
