import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../services/apiService";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import {
  User,
  Mail,
  Lock,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import "./Cadastro.css";

export default function Cadastro({ onRegister }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    console.log("📝 Iniciando cadastro...");
    console.log("📝 Dados:", { nome, email, senha: "***" });

    try {
      // Registra no MongoDB
      console.log("📝 Chamando auth.registro...");
      const resultado = await auth.registro(nome, email, senha);
      console.log("✅ Resultado do registro:", resultado);

      // Chama a função onRegister se existir
      if (onRegister) {
        onRegister({ nome, email, senha });
      }

      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.error("❌ Erro capturado no componente:", err);
      console.error("❌ Mensagem do erro:", err.message);
      console.error("❌ Stack do erro:", err.stack);
      setError(err.message || "Erro ao cadastrar usuário!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cadastro-backdrop">
      <Card className="cadastro-card">
        <CardHeader className="cadastro-header">
          <div className="cadastro-logo">
            <div className="cadastro-logo-icon">
              <User className="w-8 h-8" />
            </div>
          </div>
          <CardTitle className="cadastro-title">Crie sua conta</CardTitle>
          <CardDescription className="cadastro-description">
            Preencha os dados abaixo para começar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="cadastro-form-content">
            {error && (
              <div className="cadastro-error">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="cadastro-success">
                <CheckCircle2 className="w-4 h-4" />
                <span>Cadastro realizado com sucesso! Redirecionando...</span>
              </div>
            )}

            <div className="cadastro-input-group">
              <Label htmlFor="nome">Nome completo</Label>
              <div className="cadastro-input-wrapper">
                <User className="cadastro-input-icon" />
                <Input
                  id="nome"
                  type="text"
                  placeholder="Seu nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  disabled={loading || success}
                  className="cadastro-input"
                />
              </div>
            </div>

            <div className="cadastro-input-group">
              <Label htmlFor="email">E-mail</Label>
              <div className="cadastro-input-wrapper">
                <Mail className="cadastro-input-icon" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading || success}
                  className="cadastro-input"
                />
              </div>
            </div>

            <div className="cadastro-input-group">
              <Label htmlFor="senha">Senha</Label>
              <div className="cadastro-input-wrapper">
                <Lock className="cadastro-input-icon" />
                <Input
                  id="senha"
                  type="password"
                  placeholder="••••••••"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  disabled={loading || success}
                  className="cadastro-input"
                  minLength={6}
                />
              </div>
              <p className="cadastro-hint">Mínimo de 6 caracteres</p>
            </div>

            <Button
              type="submit"
              className="cadastro-button"
              disabled={loading || success}
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Cadastrando...
                </>
              ) : success ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Cadastrado!
                </>
              ) : (
                "Cadastrar"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="cadastro-footer">
          <p className="cadastro-footer-text">
            Já tem conta?{" "}
            <Link to="/Login" className="cadastro-link">
              Faça login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
