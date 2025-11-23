// server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares - CORS deve vir ANTES das rotas
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Middleware de log para debug
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log('Body:', req.body);
  next();
});

// Configuração do MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://admindev:6LwpNFrlGm7cZdLk@healthontimedb.ykjsv59.mongodb.net/?appName=HealthOnTimedb/health-on-time';
const JWT_SECRET = process.env.JWT_SECRET || '52e4ead6-e7b4-460e-ba45-6d402f170742';

console.log('🔧 Tentando conectar ao MongoDB...');
console.log('🔧 URI:', MONGODB_URI.replace(/\/\/.*@/, '//***:***@')); // Esconde credenciais

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB conectado com sucesso!'))
  .catch(err => {
    console.error('❌ Erro ao conectar MongoDB:', err.message);
    console.error('❌ Verifique se o MongoDB está rodando');
    process.exit(1);
  });

// ==================== MODELS ====================

// Schema do Usuário
const userSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  criadoEm: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Schema de exemplo para CRUD (personalize conforme necessário)
const itemSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  data: { type: Date, required: true },       // <- adiciona a data do exame
  realizado: { type: Boolean, default: false }, // <- adiciona se já foi realizado
  criadoEm: { type: Date, default: Date.now }
});
const Item = mongoose.model('Item', itemSchema);

// ==================== MIDDLEWARE DE AUTENTICAÇÃO ====================

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ erro: 'Token não fornecido' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (erro) {
    res.status(401).json({ erro: 'Token inválido' });
  }
};

// ==================== ROTAS DE AUTENTICAÇÃO ====================

// Registro
app.post('/api/auth/registro', async (req, res) => {
  try {
    console.log('📝 Tentativa de registro:', req.body);
    
    const { nome, email, senha } = req.body;

    // Validação básica
    if (!nome || !email || !senha) {
      console.log('❌ Campos faltando');
      return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }

    // Verifica se o email já existe
    const usuarioExiste = await User.findOne({ email });
    if (usuarioExiste) {
      console.log('❌ Email já existe:', email);
      return res.status(400).json({ erro: 'Email já cadastrado' });
    }

    // Hash da senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // Cria o usuário
    const usuario = new User({
      nome,
      email,
      senha: senhaHash
    });

    await usuario.save();
    console.log('✅ Usuário criado:', usuario._id);

    // Gera token
    const token = jwt.sign({ userId: usuario._id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      mensagem: 'Usuário criado com sucesso',
      token,
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email
      }
    });
  } catch (erro) {
    console.error('❌ Erro no registro:', erro);
    res.status(500).json({ erro: 'Erro ao criar usuário', detalhes: erro.message });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Validação
    if (!email || !senha) {
      return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
    }

    // Busca o usuário
    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    // Verifica a senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    // Gera token
    const token = jwt.sign({ userId: usuario._id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      mensagem: 'Login realizado com sucesso',
      token,
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email
      }
    });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao fazer login', detalhes: erro.message });
  }
});

// Verificar usuário autenticado
app.get('/api/auth/me', auth, async (req, res) => {
  try {
    const usuario = await User.findById(req.userId).select('-senha');
    res.json({ usuario });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar usuário' });
  }
});

// ==================== ROTAS CRUD ====================

// CREATE - Criar item
app.post('/api/itens', auth, async (req, res) => {
  try {
    const { titulo, descricao } = req.body;

    const item = new Item({
      titulo,
      descricao,
      userId: req.userId
    });

    await item.save();
    res.status(201).json({ mensagem: 'Item criado', item });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao criar item', detalhes: erro.message });
  }
});

// READ - Listar todos os itens do usuário
app.get('/api/itens', auth, async (req, res) => {
  try {
    const itens = await Item.find({ userId: req.userId }).sort({ criadoEm: -1 });
    res.json({ itens });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar itens' });
  }
});

// READ - Buscar um item específico
app.get('/api/itens/:id', auth, async (req, res) => {
  try {
    const item = await Item.findOne({ _id: req.params.id, userId: req.userId });
    
    if (!item) {
      return res.status(404).json({ erro: 'Item não encontrado' });
    }

    res.json({ item });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar item' });
  }
});

// UPDATE - Atualizar item
app.put('/api/itens/:id', auth, async (req, res) => {
  try {
    const { titulo, descricao } = req.body;

    const item = await Item.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { titulo, descricao },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ erro: 'Item não encontrado' });
    }

    res.json({ mensagem: 'Item atualizado', item });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao atualizar item' });
  }
});

// DELETE - Deletar item
app.delete('/api/itens/:id', auth, async (req, res) => {
  try {
    const item = await Item.findOneAndDelete({ _id: req.params.id, userId: req.userId });

    if (!item) {
      return res.status(404).json({ erro: 'Item não encontrado' });
    }

    res.json({ mensagem: 'Item deletado' });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao deletar item' });
  }
});

// ==================== INICIAR SERVIDOR ====================

// Rota de teste para verificar se o servidor está funcionando
app.get('/', (req, res) => {
  res.json({ 
    mensagem: 'API Health On Time está rodando!',
    rotas: {
      registro: 'POST /api/auth/registro',
      login: 'POST /api/auth/login',
      me: 'GET /api/auth/me',
      itens: 'GET/POST /api/itens'
    }
  });
});

// Rota 404 - Captura rotas não encontradas
app.use((req, res) => {
  console.log('❌ Rota não encontrada:', req.method, req.path);
  res.status(404).json({ 
    erro: 'Rota não encontrada',
    mensagem: `A rota ${req.method} ${req.path} não existe`,
    rotasDisponiveis: [
      'POST /api/auth/registro',
      'POST /api/auth/login',
      'GET /api/auth/me',
      'GET /api/itens',
      'POST /api/itens',
      'GET /api/itens/:id',
      'PUT /api/itens/:id',
      'DELETE /api/itens/:id'
    ]
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📡 API disponível em: http://localhost:${PORT}`);
  console.log(`📚 Rotas disponíveis em: http://localhost:${PORT}/`);
  console.log(`${'='.repeat(50)}\n`);
});