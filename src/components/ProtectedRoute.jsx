// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  // Enquanto verifica autenticação
  if (loading) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh" 
      }}>
        <p>Carregando...</p>
      </div>
    );
  }

  // Se não estiver autenticado, redireciona para login
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver autenticado, mostra o conteúdo
  return children;
}