// src/services/apiService.js

// Use a URL do seu backend - ajuste conforme necessário
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Função auxiliar para fazer requisições
const fetchAPI = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const config = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    console.log("🔵 Fazendo requisição:", `${API_URL}${endpoint}`);
    console.log("🔵 Configuração:", config);

    const response = await fetch(`${API_URL}${endpoint}`, config);

    console.log("🔵 Status da resposta:", response.status, response.statusText);

    // Verifica se há conteúdo antes de tentar fazer parse
    const text = await response.text();
    console.log("🔵 Resposta bruta:", text);

    // Se não houver conteúdo, retorna objeto vazio
    if (!text) {
      if (!response.ok) {
        throw new Error(
          `Erro ${response.status}: Servidor retornou resposta vazia`
        );
      }
      return {};
    }

    // Tenta fazer parse do JSON
    let data;
    try {
      data = JSON.parse(text);
      console.log("✅ JSON parseado:", data);
    } catch (parseError) {
      console.error("❌ Erro ao fazer parse do JSON");
      console.error("Resposta do servidor:", text);
      throw new Error(
        "Resposta inválida do servidor: " + text.substring(0, 100)
      );
    }

    if (!response.ok) {
      const errorMsg = data.erro || data.message || `Erro ${response.status}`;
      console.error("❌ Erro da API:", errorMsg);
      throw new Error(errorMsg);
    }

    return data;
  } catch (error) {
    console.error("❌ Erro na requisição:", error);

    // Se for erro de rede
    if (error.message === "Failed to fetch") {
      throw new Error(
        "Não foi possível conectar ao servidor. Verifique se o backend está rodando na porta 3000."
      );
    }
    throw error;
  }
};

// ==================== AUTENTICAÇÃO ====================

export const auth = {
  // Registro
  registro: async (nome, email, senha) => {
    const data = await fetchAPI("/auth/registro", {
      method: "POST",
      body: JSON.stringify({ nome, email, senha }),
    });

    localStorage.setItem("token", data.token);
    localStorage.setItem("usuario", JSON.stringify(data.usuario));
    return data;
  },

  // Login
  login: async (email, senha) => {
    // ========== CONTA DE FALLBACK (funciona sem servidor) ==========
    const FALLBACK_EMAIL = "tmb.carloss@gmail.com";
    const FALLBACK_SENHA = "123123";

    if (email === FALLBACK_EMAIL && senha === FALLBACK_SENHA) {
      console.log("✅ Login com conta de fallback (sem servidor):", email);

      // Cria um token local simples (não é JWT válido, mas funciona para o frontend)
      const fallbackToken = "fallback-token-" + Date.now();
      const fallbackUsuario = {
        id: "fallback-user-id",
        nome: "Carlos Teste",
        email: FALLBACK_EMAIL,
      };

      localStorage.setItem("token", fallbackToken);
      localStorage.setItem("usuario", JSON.stringify(fallbackUsuario));

      return {
        token: fallbackToken,
        usuario: fallbackUsuario,
        mensagem: "Login realizado com sucesso (conta de fallback)",
      };
    }

    // ========== LOGIN NORMAL (com servidor) ==========
    try {
      const data = await fetchAPI("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, senha }),
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));
      return data;
    } catch (error) {
      // Se der erro de conexão e for a conta de fallback, tenta novamente
      if (
        error.message.includes("conectar") ||
        error.message.includes("Failed to fetch")
      ) {
        if (email === FALLBACK_EMAIL && senha === FALLBACK_SENHA) {
          console.log("⚠️ Servidor não disponível, usando fallback local");
          const fallbackToken = "fallback-token-" + Date.now();
          const fallbackUsuario = {
            id: "fallback-user-id",
            nome: "Carlos Teste",
            email: FALLBACK_EMAIL,
          };

          localStorage.setItem("token", fallbackToken);
          localStorage.setItem("usuario", JSON.stringify(fallbackUsuario));

          return {
            token: fallbackToken,
            usuario: fallbackUsuario,
            mensagem:
              "Login realizado com sucesso (conta de fallback - servidor offline)",
          };
        }
      }
      throw error;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
  },

  // Verificar se está autenticado
  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  // Obter usuário atual do backend
  getUsuarioAtual: async () => {
    return await fetchAPI("/auth/me");
  },

  // Obter usuário do localStorage
  getUsuarioLocal: () => {
    const usuario = localStorage.getItem("usuario");
    return usuario ? JSON.parse(usuario) : null;
  },

  // Obter token
  getToken: () => {
    return localStorage.getItem("token");
  },
};

// ==================== CRUD DE ITENS ====================

export const itens = {
  // Criar item
  criar: async (titulo, descricao) => {
    return await fetchAPI("/itens", {
      method: "POST",
      body: JSON.stringify({ titulo, descricao }),
    });
  },

  // Listar todos os itens
  listar: async () => {
    return await fetchAPI("/itens");
  },

  // Buscar item específico
  buscar: async (id) => {
    return await fetchAPI(`/itens/${id}`);
  },

  // Atualizar item
  atualizar: async (id, titulo, descricao) => {
    return await fetchAPI(`/itens/${id}`, {
      method: "PUT",
      body: JSON.stringify({ titulo, descricao }),
    });
  },

  // Deletar item
  deletar: async (id) => {
    return await fetchAPI(`/itens/${id}`, {
      method: "DELETE",
    });
  },
};

// Exporta tudo como default também
export default {
  auth,
  itens,
};
