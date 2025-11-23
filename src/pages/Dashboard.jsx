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
  Users,
  Recycle,
  Car,
  TrendingUp,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import "./Dashboard.css";

const Dashboard = () => {
  const apiUrl = "http://localhost:3000/"; // Substitua pelo URL real
  const token = ""; // Substitua pelo token real se necessário

  const { exames = [], loading: examesLoading } = useExamesAPI(apiUrl, token);
  const { estatisticas } = useAtividades() || {};
  const atividadesEstaSemana = estatisticas?.atividadesEstaSemana || 0;

  const [activeTab, setActiveTab] = useState("saude");
  const [stats, setStats] = useState({
    examesPendentes: 0,
    examesProximos: 0,
    atividadesHoje: 0,
  });

  // 🔹 UseEffect corrigido: dependências estáveis
  useEffect(() => {
    const hoje = new Date();

    const proximos = exames.filter((exame) => {
      const dataExame = new Date(exame.data);
      return (
        dataExame >= hoje &&
        dataExame <= new Date(hoje.getTime() + 7 * 24 * 60 * 60 * 1000)
      );
    });

    setStats({
      examesPendentes: exames.filter((e) => !e.realizado).length,
      examesProximos: proximos.length,
      atividadesHoje: atividadesEstaSemana,
    });
  }, [exames, atividadesEstaSemana]); // <-- Dependências corrigidas

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

  const kpis = [
    {
      id: "consultas",
      label: "Consultas Realizadas",
      subtitle: "Total de atendimentos",
      value: exames.filter((e) => e.realizado).length,
      trend: "+12% esta semana",
      icon: Heart,
      color: "#2563eb",
    },
    {
      id: "usuarios",
      label: "Usuários Ativos",
      subtitle: "Usuários únicos",
      value: 89,
      trend: "+8% este mês",
      icon: Users,
      color: "#10b981",
    },
    {
      id: "medicamentos",
      label: "Medicamentos Descartados",
      subtitle: "Descarte correto",
      value: "15.7kg",
      trend: "+23% este mês",
      icon: Recycle,
      color: "#10b981",
    },
    {
      id: "deslocamentos",
      label: "Deslocamentos Evitados",
      subtitle: "Impacto ambiental",
      value: 34,
      trend: "+15% esta semana",
      icon: Car,
      color: "#0ea5e9",
    },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard de Saúde</h1>
        <p>Acompanhe o impacto do Health On Time na saúde e sustentabilidade</p>
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
                <div className="kpi-trend">
                  <TrendingUp size={14} />
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

      {/* 🔹 Tabs com onValueChange ajustado */}
      <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val)} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="saude">Saúde</TabsTrigger>
          <TabsTrigger value="sustentabilidade">Sustentabilidade</TabsTrigger>
          <TabsTrigger value="prevencao">Prevenção</TabsTrigger>
        </TabsList>
      </Tabs>

      <TabsContent value={activeTab} className="mt-6">
        <div className="charts-section">
          {/* Gráficos de exemplo */}
        </div>
      </TabsContent>

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
                        {format(new Date(exame.data), "dd 'de' MMMM 'de' yyyy", {
                          locale: ptBR,
                        })}
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
