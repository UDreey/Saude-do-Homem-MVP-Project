import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../services/apiService";
import "./Cadastro.css";

export default function Cadastro({ onRegister }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    console.log('📝 Iniciando cadastro...');
    console.log('📝 Dados:', { nome, email, senha: '***' });

    try {
      // Registra no MongoDB
      console.log('📝 Chamando auth.registro...');
      const resultado = await auth.registro(nome, email, senha);
      console.log('✅ Resultado do registro:', resultado);
      
      // Chama a função onRegister se existir
      if (onRegister) {
        onRegister({ nome, email, senha });
      }
      
      alert("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (err) {
      console.error('❌ Erro capturado no componente:', err);
      console.error('❌ Mensagem do erro:', err.message);
      console.error('❌ Stack do erro:', err.stack);
      setError(err.message || "Erro ao cadastrar usuário!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cadastro-backdrop">
      <form className="cadastro-form" onSubmit={handleSubmit}>
        <h2>Cadastro</h2>
        {error && (
          <div style={{ 
            color: "red", 
            background: "#ffe6e6", 
            padding: "10px", 
            borderRadius: "5px",
            marginBottom: "10px"
          }}>
            <strong>Erro:</strong> {error}
          </div>
        )}
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
        <div style={{ textAlign: "center", marginTop: "1em" }}>
          Já tem conta? <Link to="/login">Faça login</Link>
        </div>
      </form>
    </div>
  );
}