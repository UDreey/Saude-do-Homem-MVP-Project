// Dashboard.jsx
import { useExamesAPI } from "../hooks/useExames";
import { useAtividades } from "../hooks/useAtividades";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  BookOpen,
  Activity,
  Heart,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Users,
  Recycle,
  Car,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import "./Dashboard.css";

const Dashboard = () => {
  const apiUrl = "http://localhost:3000/"; // Substitua pelo URL real
  const token = ""; // Substitua pelo token real se necessário

  const { exames = [], loading: examesLoading } = useExamesAPI(apiUrl, token);
  const { estatisticas } = useAtividades() || {};
  const atividadesEstaSemana = estatisticas?.atividadesEstaSemana || 0;
  const totalAtividades = estatisticas?.totalAtividades || 0;
  const totalMinutos = estatisticas?.totalMinutos || 0;

  const [stats, setStats] = useState({
    examesPendentes: 0,
    examesProximos: 0,
    examesRealizados: 0,
    atividadesEstaSemana: 0,
    totalMinutos: 0,
  });

  // Calcular estatísticas reais baseadas nos dados do usuário
  useEffect(() => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const proximos = exames.filter((exame) => {
      const dataExame = new Date(exame.data);
      dataExame.setHours(0, 0, 0, 0);
      const em7Dias = new Date(hoje.getTime() + 7 * 24 * 60 * 60 * 1000);
      return dataExame >= hoje && dataExame <= em7Dias;
    });

    const examesRealizados = exames.filter((e) => e.realizado).length;
    const examesPendentes = exames.filter((e) => !e.realizado).length;

    setStats({
      examesPendentes,
      examesProximos: proximos.length,
      examesRealizados,
      atividadesEstaSemana,
      totalMinutos,
    });
  }, [exames, atividadesEstaSemana, totalMinutos]);

  const quickActions = [
    {
      icon: Calendar,
      title: "Gerenciar Exames",
      description: "Adicione e acompanhe seus exames preventivos",
      path: "/exames",
      color: "#2563eb",
    },
    {
      icon: BookOpen,
      title: "Informações",
      description: "Acesse informações sobre saúde masculina",
      path: "/informacoes",
      color: "#10b981",
    },
    {
      icon: Activity,
      title: "Atividades",
      description: "Registre suas atividades físicas",
      path: "/atividades",
      color: "#f97316",
    },
    {
      icon: Heart,
      title: "Saúde Mental",
      description: "Espaço seguro para diálogo",
      path: "/saude-mental",
      color: "#0ea5e9",
    },
  ];

  // Calcular horas de atividades
  const horasAtividades = Math.floor(totalMinutos / 60);
  const minutosRestantes = totalMinutos % 60;
  const tempoFormatado =
    horasAtividades > 0
      ? `${horasAtividades}h ${minutosRestantes}min`
      : `${totalMinutos}min`;

  const kpis = [
    {
      id: "exames-realizados",
      label: "Exames Realizados",
      subtitle: "Total de exames concluídos",
      value: stats.examesRealizados,
      trend:
        stats.examesRealizados > 0 ? "Continue assim!" : "Comece a registrar",
      icon: CheckCircle,
      color: "#10b981",
    },
    {
      id: "exames-pendentes",
      label: "Exames Pendentes",
      subtitle: "Aguardando realização",
      value: stats.examesPendentes,
      trend:
        stats.examesPendentes > 0 ? "Não esqueça de fazer" : "Tudo em dia!",
      icon: AlertCircle,
      color: "#f97316",
    },
    {
      id: "exames-proximos",
      label: "Exames Próximos",
      subtitle: "Nos próximos 7 dias",
      value: stats.examesProximos,
      trend:
        stats.examesProximos > 0 ? "Agende sua consulta" : "Nenhum agendado",
      icon: Calendar,
      color: "#2563eb",
    },
    {
      id: "atividades",
      label: "Atividades Físicas",
      subtitle: `${stats.atividadesEstaSemana} esta semana • ${tempoFormatado} total`,
      value: totalAtividades,
      trend: stats.atividadesEstaSemana > 0 ? "Bom trabalho!" : "Comece hoje",
      icon: Activity,
      color: "#0ea5e9",
    },
    {
      id: "usuarios",
      label: "Usuários Ativos",
      subtitle: "Usuários únicos",
      value: 5,
      trend: "Comunidade ativa",
      icon: Users,
      color: "#10b981",
    },
    {
      id: "medicamentos",
      label: "Medicamentos Descartados",
      subtitle: "Descarte correto",
      value: "10kg",
      trend: "Impacto positivo",
      icon: Recycle,
      color: "#10b981",
    },
    {
      id: "deslocamentos",
      label: "Deslocamentos Evitados",
      subtitle: "Impacto ambiental",
      value: 10,
      trend: "Sustentabilidade",
      icon: Car,
      color: "#0ea5e9",
    },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Meu Dashboard de Saúde</h1>
        <p>Acompanhe seus exames, atividades e cuidados com a saúde</p>
      </div>

      <div className="kpis-grid">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.id} className="kpi-card">
              <div className="kpi-header">
                <div
                  className="kpi-icon"
                  style={{ background: `${kpi.color}15`, color: kpi.color }}
                >
                  <Icon size={24} />
                </div>
                <div
                  className={`kpi-trend ${
                    kpi.id === "exames-pendentes" && stats.examesPendentes > 0
                      ? "trend-warning"
                      : ""
                  }`}
                >
                  {kpi.id !== "exames-pendentes" && <TrendingUp size={14} />}
                  {kpi.id === "exames-pendentes" &&
                    stats.examesPendentes > 0 && <AlertCircle size={14} />}
                  <span>{kpi.trend}</span>
                </div>
              </div>
              <div className="kpi-content">
                <h3>{kpi.value}</h3>
                <p className="kpi-label">{kpi.label}</p>
                <p className="kpi-subtitle">{kpi.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Resumo de Saúde */}
      {exames.length === 0 && totalAtividades === 0 && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="empty-dashboard-state">
              <Heart size={48} className="empty-icon" />
              <h3>Bem-vindo ao seu Dashboard!</h3>
              <p>
                Comece registrando seus exames e atividades para acompanhar sua
                saúde
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {exames.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle size={20} />
              Próximos Exames
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="exames-list">
              {exames
                .filter((e) => !e.realizado)
                .slice(0, 3)
                .map((exame) => (
                  <div key={exame._id} className="exame-item">
                    <div className="exame-info">
                      <h4>{exame.nome}</h4>
                      {exame.tipo && (
                        <Badge variant="secondary" className="mt-1">
                          {exame.tipo}
                        </Badge>
                      )}
                    </div>
                    <div className="exame-date">
                      <Calendar size={16} />
                      <span>
                        {format(
                          new Date(exame.data),
                          "dd 'de' MMMM 'de' yyyy",
                          {
                            locale: ptBR,
                          }
                        )}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
            <Button asChild className="mt-4">
              <Link to="/exames">Ver Todos os Exames</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="quick-actions">
        <h2 className="section-title">Acesso Rápido</h2>
        <div className="actions-grid">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Card
                key={action.path}
                className="action-card hover:shadow-lg transition-shadow"
              >
                <Link to={action.path} className="block">
                  <CardContent className="pt-6">
                    <div
                      className="action-icon"
                      style={{
                        background: `${action.color}15`,
                        color: action.color,
                      }}
                    >
                      <Icon size={32} />
                    </div>
                    <h3 className="mt-4">{action.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {action.description}
                    </p>
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
