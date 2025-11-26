import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import ChatSaude from "./pages/ChatSaude";
import Localizar from "./pages/Localizar";
import Educacao from "./pages/Educacao";
import PontosColeta from "./pages/PontosColeta";
import Exames from "./pages/Exames";
import Atividades from "./pages/Atividades";
import SaudeMental from "./pages/SaudeMental";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import { auth } from "./services/apiService";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Verificar autenticação ao carregar
  useEffect(() => {
    const token = auth.getToken();
    const isAuth = auth.isAuthenticated();
    setLoggedIn(isAuth && !!token);
    setLoading(false);
  }, []);

  const handleLogin = (email, password) => {
    // Verifica se o token foi salvo
    const token = auth.getToken();
    if (token) {
      setLoggedIn(true);
    }
  };

  const handleRegister = (novoUsuario) => {
    console.log("Novo usuário cadastrado:", novoUsuario);
  };

  // Aguardar verificação inicial
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <Layout>
      {!loggedIn ? (
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/cadastro"
            element={<Cadastro onRegister={handleRegister} />}
          />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat" element={<ChatSaude />} />
          <Route path="/localizar" element={<Localizar />} />
          <Route path="/educacao" element={<Educacao />} />
          <Route path="/pontos-coleta" element={<PontosColeta />} />
          <Route path="/exames" element={<Exames />} />
          <Route path="/atividades" element={<Atividades />} />
          <Route path="/saude-mental" element={<SaudeMental />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      )}
    </Layout>
  );
}

export default App;
