import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Adicionado
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validação de exemplo
    if (email === "teste@gmail.com" && password === "111") {
      setError("");
      onLogin(email, password);
      navigate("/dashboard");
    } else {
      setError("Email ou senha inválidos!");
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