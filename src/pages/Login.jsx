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
import { Mail, Lock, Loader2, AlertCircle } from "lucide-react";
import "./Login.css";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-backdrop">
      <Card className="login-card">
        <CardHeader className="login-header">
          <div className="login-logo">
            <div className="login-logo-icon">
              <Lock className="w-8 h-8" />
            </div>
          </div>
          <CardTitle className="login-title">Bem-vindo de volta</CardTitle>
          <CardDescription className="login-description">
            Entre com suas credenciais para acessar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="login-form-content">
            {error && (
              <div className="login-error">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            <div className="login-input-group">
              <Label htmlFor="email">E-mail</Label>
              <div className="login-input-wrapper">
                <Mail className="login-input-icon" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="login-input"
                />
              </div>
            </div>

            <div className="login-input-group">
              <Label htmlFor="password">Senha</Label>
              <div className="login-input-wrapper">
                <Lock className="login-input-icon" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="login-input"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="login-button"
              disabled={loading}
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="login-footer">
          <p className="login-footer-text">
            Ainda não tem conta?{" "}
            <Link to="/Cadastro" className="login-link">
              Cadastre-se
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
