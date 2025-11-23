import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../services/apiService";
import "./Login.css";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Faz login no MongoDB
      const resultado = await auth.login(email, password);
      
      // Chama a função onLogin se existir
      if (onLogin) {
        onLogin(email, password);
      }
      
      // Redireciona para dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Email ou senha inválidos!");
    }
  };

  return (
    <div className="login-backdrop">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input 
          type="email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          placeholder="E-mail" 
          required 
        />
        <input 
          type="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          placeholder="Senha" 
          required 
        />
        <button type="submit">Entrar</button>
        <div style={{ textAlign: "center", marginTop: "1em" }}>
          Ainda não tem conta? <Link to="/cadastro">Cadastre-se</Link>
        </div>
      </form>
    </div>
  );
}