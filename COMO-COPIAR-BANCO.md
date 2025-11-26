# 📋 Como Copiar o Banco de Dados para Outro PC

Este guia explica como usar o mesmo banco de dados MongoDB em dois PCs diferentes.

## 🔍 Passo 1: Descobrir sua String de Conexão Atual

### Opção A: Se você tem um arquivo `.env` no PC atual

1. Abra o arquivo `.env` na raiz do projeto
2. Procure pela linha que começa com `MONGODB_URI=`
3. Copie toda a string que vem depois do `=`

**Exemplo:**

```env
MONGODB_URI=mongodb+srv://usuario:senha123@cluster0.xxxxx.mongodb.net/health-on-time?retryWrites=true&w=majority
```

### Opção B: Se você NÃO tem arquivo `.env` (usando MongoDB local)

Se você está usando MongoDB local (`mongodb://localhost:27017`), você **NÃO pode** usar o mesmo banco em outro PC diretamente. Você precisa:

1. **Migrar para MongoDB Atlas (Recomendado)** - Veja instruções abaixo
2. **OU** configurar acesso remoto ao MongoDB local (mais complexo)

### Opção C: Executar o script de verificação

Execute no terminal:

```bash
npm run verificar-mongodb
```

Isso mostrará qual string de conexão está sendo usada.

## 📝 Passo 2: Criar/Atualizar o arquivo `.env` no PC Atual

Se você ainda não tem um arquivo `.env`, crie um na raiz do projeto com:

```env
MONGODB_URI=sua-string-de-conexao-aqui
JWT_SECRET=jwt-secret-key-change-in-production
PORT=3000
```

**⚠️ IMPORTANTE:** Substitua `sua-string-de-conexao-aqui` pela string real do seu MongoDB.

## 📦 Passo 3: Copiar para o Outro PC

### Método 1: Copiar o arquivo `.env` (Mais Fácil)

1. No PC atual, copie o arquivo `.env` (pode estar oculto, então mostre arquivos ocultos)
2. Cole o arquivo `.env` na raiz do projeto no outro PC
3. Pronto! O mesmo banco será usado

### Método 2: Criar manualmente no outro PC

1. No outro PC, crie um arquivo chamado `.env` na raiz do projeto
2. Cole o conteúdo do arquivo `.env` do PC atual
3. Salve o arquivo

## 🆕 Se você está usando MongoDB Local e quer migrar para Atlas

### Por que migrar?

- ✅ Funciona em qualquer PC sem instalar MongoDB
- ✅ Dados na nuvem (backup automático)
- ✅ Gratuito até 512MB
- ✅ Acesso de qualquer lugar

### Como migrar:

1. **Criar conta no MongoDB Atlas:**

   - Acesse: https://www.mongodb.com/cloud/atlas
   - Crie uma conta gratuita

2. **Criar um cluster:**

   - Clique em "Build a Database"
   - Escolha o plano FREE (M0)
   - Escolha uma região próxima
   - Clique em "Create"

3. **Criar usuário do banco:**

   - Vá em "Database Access"
   - Clique em "Add New Database User"
   - Escolha "Password" como método de autenticação
   - Crie um usuário e senha (ANOTE ESSAS INFORMAÇÕES!)
   - Clique em "Add User"

4. **Configurar acesso de rede:**

   - Vá em "Network Access"
   - Clique em "Add IP Address"
   - Clique em "Allow Access from Anywhere" (ou adicione o IP do seu PC)
   - Clique em "Confirm"

5. **Obter string de conexão:**

   - Vá em "Database" → "Connect"
   - Escolha "Connect your application"
   - Copie a connection string
   - Substitua `<password>` pela senha do usuário criado
   - Substitua `<dbname>` por `health-on-time` (ou o nome do seu banco)

6. **Atualizar `.env`:**

   ```env
   MONGODB_URI=mongodb+srv://seu-usuario:sua-senha@cluster0.xxxxx.mongodb.net/health-on-time?retryWrites=true&w=majority
   ```

7. **Migrar dados (se necessário):**
   - Se você já tem dados no MongoDB local, use o `mongodump` e `mongorestore` para migrar
   - Ou simplesmente comece do zero no Atlas

## ✅ Passo 4: Verificar no Outro PC

1. No outro PC, execute:

   ```bash
   npm install
   npm run dev
   ```

2. Se aparecer `✅ MongoDB conectado com sucesso!`, está funcionando!

3. Se der erro, verifique:
   - Se o arquivo `.env` está na raiz do projeto
   - Se a string de conexão está correta
   - Se você está usando MongoDB Atlas, verifique se o IP do outro PC está na whitelist

## 🔒 Segurança

**⚠️ IMPORTANTE:**

- O arquivo `.env` contém informações sensíveis (senhas)
- **NUNCA** commite o arquivo `.env` no Git (ele já está no .gitignore)
- Não compartilhe o arquivo `.env` publicamente
- Se usar MongoDB Atlas, use senhas fortes

## 🆘 Problemas Comuns

### Erro: `connect ECONNREFUSED`

- Verifique se o arquivo `.env` existe
- Verifique se a string de conexão está correta
- Se usar Atlas, verifique se o IP está na whitelist

### Erro: `authentication failed`

- Verifique se o usuário e senha estão corretos
- Se mudou a senha no Atlas, atualize no `.env`

### Erro: `network is unreachable`

- Verifique sua conexão com a internet
- Verifique se o IP está na whitelist do Atlas
