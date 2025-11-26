// src/context/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from "react";
import { auth } from "../services/apiService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar se já está logado ao carregar
  useEffect(() => {
    const usuarioSalvo = auth.getUsuarioLocal();
    if (usuarioSalvo) {
      setUsuario(usuarioSalvo);
    }
    setLoading(false);
  }, []);

  const login = async (email, senha) => {
    try {
      const resultado = await auth.login(email, senha);
      setUsuario(resultado.usuario);
      return { sucesso: true };
    } catch (error) {
      return { sucesso: false, erro: error.message };
    }
  };

  const registro = async (nome, email, senha) => {
    try {
      await auth.registro(nome, email, senha);
      return { sucesso: true };
    } catch (error) {
      return { sucesso: false, erro: error.message };
    }
  };

  const logout = () => {
    auth.logout();
    setUsuario(null);
  };

  const isAuthenticated = () => {
    return !!usuario;
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        login,
        registro,
        logout,
        isAuthenticated,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
