import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import o hook!
import "./Cadastro.css";

export default function Cadastro({ onRegister }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate(); // Crie a função navigate

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ nome, email, senha }); // se quiser enviar para API, faça aqui!
    navigate("/Login.jsx"); // Redireciona para tela de login ("/" ou outra rota de Login)
  };

  return (
    <div className="cadastro-backdrop">
      <form className="cadastro-form" onSubmit={handleSubmit}>
        <h2>Cadastro</h2>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}