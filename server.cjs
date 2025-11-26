// server.js
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares - CORS deve vir ANTES das rotas
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);
app.use(express.json());

// Middleware de log para debug
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log("Body:", req.body);
  next();
});

// Configuração do MongoDB
let MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET =
  process.env.JWT_SECRET || "jwt-secret-key-change-in-production";

// Verifica se MONGODB_URI está configurado corretamente
if (
  !MONGODB_URI ||
  MONGODB_URI === "SUA_STRING_DE_CONEXAO_AQUI" ||
  MONGODB_URI.trim() === ""
) {
  console.log("⚠️  MONGODB_URI não configurado, usando padrão local");
  MONGODB_URI = "mongodb://localhost:27017/health-on-time";
}

console.log("🔧 Tentando conectar ao MongoDB...");
if (
  MONGODB_URI &&
  MONGODB_URI !== "SUA_STRING_DE_CONEXAO_AQUI" &&
  MONGODB_URI.trim() !== ""
) {
  try {
    const maskedUri = MONGODB_URI.replace(/\/\/.*@/, "//***:***@");
    console.log("🔧 URI:", maskedUri); // Esconde credenciais
  } catch (e) {
    console.log(
      "🔧 URI configurada (formato não reconhecido para mascaramento)"
    );
  }
} else {
  console.log("⚠️  MONGODB_URI não definido ou ainda com placeholder");
  console.log(
    "⚠️  Configure MONGODB_URI no arquivo .env com sua string de conexão"
  );
  console.log(
    "⚠️  Exemplo: MONGODB_URI=mongodb://localhost:27017/health-on-time"
  );
  console.log(
    "⚠️  Ou use MongoDB Atlas: MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/health-on-time"
  );
}

// ==================== MODELS ====================

// Schema do Usuário
const userSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  criadoEm: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

// Schema de exemplo para CRUD (personalize conforme necessário)
const itemSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  data: { type: Date, required: true }, // <- adiciona a data do exame
  realizado: { type: Boolean, default: false }, // <- adiciona se já foi realizado
  criadoEm: { type: Date, default: Date.now },
});
const Item = mongoose.model("Item", itemSchema);

// ==================== INICIALIZAÇÃO DO USUÁRIO DE TESTE ====================

// Função para garantir que o usuário de teste sempre exista
const criarUsuarioTeste = async () => {
  try {
    const emailTeste = "tmb.carloss@gmail.com";
    const senhaTeste = "123123";
    const nomeTeste = "Carlos Teste";

    // Verifica se o usuário já existe
    const usuarioExistente = await User.findOne({ email: emailTeste });

    if (!usuarioExistente) {
      // Cria o hash da senha
      const senhaHash = await bcrypt.hash(senhaTeste, 10);

      // Cria o usuário de teste
      const usuarioTeste = new User({
        nome: nomeTeste,
        email: emailTeste,
        senha: senhaHash,
      });

      await usuarioTeste.save();
      console.log("✅ Usuário de teste criado:", emailTeste);
      console.log("   Email: " + emailTeste);
      console.log("   Senha: " + senhaTeste);
    } else {
      // Atualiza a senha caso o usuário exista mas a senha tenha mudado
      const senhaValida = await bcrypt.compare(
        senhaTeste,
        usuarioExistente.senha
      );
      if (!senhaValida) {
        const senhaHash = await bcrypt.hash(senhaTeste, 10);
        usuarioExistente.senha = senhaHash;
        await usuarioExistente.save();
        console.log("✅ Senha do usuário de teste atualizada:", emailTeste);
      } else {
        console.log("ℹ️  Usuário de teste já existe:", emailTeste);
      }
    }
  } catch (erro) {
    console.error(
      "⚠️  Erro ao criar/verificar usuário de teste:",
      erro.message
    );
  }
};

// Variável global para verificar se MongoDB está conectado
let mongoConnected = false;

mongoose
  .connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000, // Timeout de 5 segundos
  })
  .then(async () => {
    console.log("✅ MongoDB conectado com sucesso!");
    mongoConnected = true;
    // Cria o usuário de teste após conectar ao MongoDB
    await criarUsuarioTeste();
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar MongoDB:", err.message);
    if (MONGODB_URI === "mongodb://localhost:27017/health-on-time") {
      console.error("⚠️  Tentando conectar ao MongoDB local...");
      console.error(
        "💡 Para usar MongoDB Atlas, configure MONGODB_URI no arquivo .env"
      );
      console.error(
        "💡 Exemplo: MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/health-on-time"
      );
    } else {
      console.error(
        "⚠️  Verifique se a string de conexão está correta no arquivo .env"
      );
    }
    console.error(
      "⚠️  Continuando sem MongoDB - login/cadastro não funcionarão até conectar"
    );
    mongoConnected = false;
    // Não encerra o processo, permite que o servidor continue rodando
  });

// ==================== MIDDLEWARE DE AUTENTICAÇÃO ====================

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ erro: "Token não fornecido" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (erro) {
    res.status(401).json({ erro: "Token inválido" });
  }
};

// ==================== ROTAS DE AUTENTICAÇÃO ====================

// Registro
app.post("/api/auth/registro", async (req, res) => {
  try {
    console.log("📝 Tentativa de registro:", req.body);

    const { nome, email, senha } = req.body;

    // Validação básica
    if (!nome || !email || !senha) {
      console.log("❌ Campos faltando");
      return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
    }

    // Verifica se o email já existe
    const usuarioExiste = await User.findOne({ email });
    if (usuarioExiste) {
      console.log("❌ Email já existe:", email);
      return res.status(400).json({ erro: "Email já cadastrado" });
    }

    // Hash da senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // Cria o usuário
    const usuario = new User({
      nome,
      email,
      senha: senhaHash,
    });

    await usuario.save();
    console.log("✅ Usuário criado:", usuario._id);

    // Gera token
    const token = jwt.sign({ userId: usuario._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      mensagem: "Usuário criado com sucesso",
      token,
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });
  } catch (erro) {
    console.error("❌ Erro no registro:", erro);
    res
      .status(500)
      .json({ erro: "Erro ao criar usuário", detalhes: erro.message });
  }
});

// Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Validação
    if (!email || !senha) {
      return res.status(400).json({ erro: "Email e senha são obrigatórios" });
    }

    // ========== CONTA DE FALLBACK (funciona sem banco) ==========
    const FALLBACK_EMAIL = "tmb.carloss@gmail.com";
    const FALLBACK_SENHA = "123123";

    if (email === FALLBACK_EMAIL && senha === FALLBACK_SENHA) {
      console.log("✅ Login com conta de fallback (sem banco):", email);

      // Gera token com um ID fixo para a conta de fallback
      const fallbackUserId = "fallback-user-id";
      const token = jwt.sign({ userId: fallbackUserId }, JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.json({
        mensagem: "Login realizado com sucesso (conta de fallback)",
        token,
        usuario: {
          id: fallbackUserId,
          nome: "Carlos Teste",
          email: FALLBACK_EMAIL,
        },
      });
    }

    // ========== LOGIN NORMAL (com banco) ==========
    // Verifica se MongoDB está conectado
    if (!mongoConnected) {
      return res.status(503).json({
        erro:
          "Banco de dados não disponível. Use a conta de fallback: " +
          FALLBACK_EMAIL,
      });
    }

    // Busca o usuário
    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ erro: "Credenciais inválidas" });
    }

    // Verifica a senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ erro: "Credenciais inválidas" });
    }

    // Gera token
    const token = jwt.sign({ userId: usuario._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      mensagem: "Login realizado com sucesso",
      token,
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });
  } catch (erro) {
    res
      .status(500)
      .json({ erro: "Erro ao fazer login", detalhes: erro.message });
  }
});

// Verificar usuário autenticado
app.get("/api/auth/me", auth, async (req, res) => {
  try {
    // Se for a conta de fallback
    if (req.userId === "fallback-user-id") {
      return res.json({
        usuario: {
          id: "fallback-user-id",
          nome: "Carlos Teste",
          email: "tmb.carloss@gmail.com",
        },
      });
    }

    // Busca usuário normal no banco
    if (!mongoConnected) {
      return res.status(503).json({ erro: "Banco de dados não disponível" });
    }

    const usuario = await User.findById(req.userId).select("-senha");
    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    res.json({ usuario });
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar usuário" });
  }
});

// ==================== ROTAS CRUD ====================

// CREATE - Criar item
app.post("/api/itens", auth, async (req, res) => {
  try {
    const { titulo, descricao } = req.body;

    const item = new Item({
      titulo,
      descricao,
      userId: req.userId,
    });

    await item.save();
    res.status(201).json({ mensagem: "Item criado", item });
  } catch (erro) {
    res
      .status(500)
      .json({ erro: "Erro ao criar item", detalhes: erro.message });
  }
});

// READ - Listar todos os itens do usuário
app.get("/api/itens", auth, async (req, res) => {
  try {
    const itens = await Item.find({ userId: req.userId }).sort({
      criadoEm: -1,
    });
    res.json({ itens });
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar itens" });
  }
});

// READ - Buscar um item específico
app.get("/api/itens/:id", auth, async (req, res) => {
  try {
    const item = await Item.findOne({ _id: req.params.id, userId: req.userId });

    if (!item) {
      return res.status(404).json({ erro: "Item não encontrado" });
    }

    res.json({ item });
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar item" });
  }
});

// UPDATE - Atualizar item
app.put("/api/itens/:id", auth, async (req, res) => {
  try {
    const { titulo, descricao } = req.body;

    const item = await Item.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { titulo, descricao },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ erro: "Item não encontrado" });
    }

    res.json({ mensagem: "Item atualizado", item });
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao atualizar item" });
  }
});

// DELETE - Deletar item
app.delete("/api/itens/:id", auth, async (req, res) => {
  try {
    const item = await Item.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!item) {
      return res.status(404).json({ erro: "Item não encontrado" });
    }

    res.json({ mensagem: "Item deletado" });
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao deletar item" });
  }
});

// ==================== INICIAR SERVIDOR ====================

// Rota de teste para verificar se o servidor está funcionando
app.get("/", (req, res) => {
  res.json({
    mensagem: "API Health On Time está rodando!",
    rotas: {
      registro: "POST /api/auth/registro",
      login: "POST /api/auth/login",
      me: "GET /api/auth/me",
      itens: "GET/POST /api/itens",
    },
  });
});

// Rota 404 - Captura rotas não encontradas
app.use((req, res) => {
  console.log("❌ Rota não encontrada:", req.method, req.path);
  res.status(404).json({
    erro: "Rota não encontrada",
    mensagem: `A rota ${req.method} ${req.path} não existe`,
    rotasDisponiveis: [
      "POST /api/auth/registro",
      "POST /api/auth/login",
      "GET /api/auth/me",
      "GET /api/itens",
      "POST /api/itens",
      "GET /api/itens/:id",
      "PUT /api/itens/:id",
      "DELETE /api/itens/:id",
    ],
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n${"=".repeat(50)}`);
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📡 API disponível em: http://localhost:${PORT}`);
  console.log(`📚 Rotas disponíveis em: http://localhost:${PORT}/`);
  console.log(`${"=".repeat(50)}\n`);
});
