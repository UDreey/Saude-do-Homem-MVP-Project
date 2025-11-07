import { useState } from "react";
import { Activity, Plus, Trash2, Calendar, TrendingUp } from "lucide-react";
import { useAtividades } from "../hooks/useAtividades";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import "./Atividades.css";

const Atividades = () => {
  const { atividades, adicionarAtividade, removerAtividade, estatisticas } =
    useAtividades();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    tipo: "",
    duracao: "",
    intensidade: "moderada",
    data: new Date().toISOString().split("T")[0],
    observacoes: "",
  });

  const tiposAtividade = [
    "Caminhada",
    "Corrida",
    "Ciclismo",
    "Musculação",
    "Natação",
    "Futebol",
    "Basquete",
    "Tênis",
    "Yoga",
    "Pilates",
    "Outro",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.tipo && formData.duracao) {
      adicionarAtividade({
        ...formData,
        duracao: parseInt(formData.duracao),
      });
      setFormData({
        tipo: "",
        duracao: "",
        intensidade: "moderada",
        data: new Date().toISOString().split("T")[0],
        observacoes: "",
      });
      setShowForm(false);
    }
  };

  const atividadesRecentes = [...atividades]
    .sort((a, b) => new Date(b.data) - new Date(a.data))
    .slice(0, 10);

  return (
    <div className="atividades-page">
      <div className="page-header">
        <h1>Atividades Físicas</h1>
        <p>Registre suas atividades e mantenha um estilo de vida saudável</p>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{ background: "rgba(37, 99, 235, 0.15)", color: "#2563eb" }}
          >
            <Activity size={24} />
          </div>
          <div className="stat-content">
            <h3>{estatisticas.totalAtividades}</h3>
            <p>Total de Atividades</p>
          </div>
        </div>
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{ background: "rgba(249, 115, 22, 0.15)", color: "#f97316" }}
          >
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <h3>{estatisticas.totalMinutos} min</h3>
            <p>Minutos de Exercício</p>
          </div>
        </div>
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{ background: "rgba(16, 185, 129, 0.15)", color: "#10b981" }}
          >
            <Calendar size={24} />
          </div>
          <div className="stat-content">
            <h3>{estatisticas.atividadesEstaSemana}</h3>
            <p>Esta Semana</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>Registrar Nova Atividade</h2>
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            <Plus size={20} />
            {showForm ? "Cancelar" : "Nova Atividade"}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="atividade-form">
            <div className="form-row">
              <div className="form-group">
                <label className="label">Tipo de Atividade *</label>
                <select
                  className="input"
                  value={formData.tipo}
                  onChange={(e) =>
                    setFormData({ ...formData, tipo: e.target.value })
                  }
                  required
                >
                  <option value="">Selecione...</option>
                  {tiposAtividade.map((tipo) => (
                    <option key={tipo} value={tipo}>
                      {tipo}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="label">Duração (minutos) *</label>
                <input
                  type="number"
                  className="input"
                  value={formData.duracao}
                  onChange={(e) =>
                    setFormData({ ...formData, duracao: e.target.value })
                  }
                  min="1"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="label">Intensidade</label>
                <select
                  className="input"
                  value={formData.intensidade}
                  onChange={(e) =>
                    setFormData({ ...formData, intensidade: e.target.value })
                  }
                >
                  <option value="leve">Leve</option>
                  <option value="moderada">Moderada</option>
                  <option value="intensa">Intensa</option>
                </select>
              </div>

              <div className="form-group">
                <label className="label">Data</label>
                <input
                  type="date"
                  className="input"
                  value={formData.data}
                  onChange={(e) =>
                    setFormData({ ...formData, data: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="label">Observações</label>
              <textarea
                className="input"
                rows="3"
                value={formData.observacoes}
                onChange={(e) =>
                  setFormData({ ...formData, observacoes: e.target.value })
                }
                placeholder="Como você se sentiu? Alguma observação importante?"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Salvar Atividade
            </button>
          </form>
        )}
      </div>

      {atividadesRecentes.length > 0 && (
        <div className="card">
          <h2 className="card-title">Atividades Recentes</h2>
          <div className="atividades-list">
            {atividadesRecentes.map((atividade) => (
              <div key={atividade.id} className="atividade-item">
                <div className="atividade-main">
                  <div className="atividade-icon">
                    <Activity size={24} />
                  </div>
                  <div className="atividade-info">
                    <h3>{atividade.tipo}</h3>
                    <div className="atividade-detalhes">
                      <span className="badge badge-duracao">
                        {atividade.duracao} min
                      </span>
                      <span
                        className={`badge badge-intensidade badge-${atividade.intensidade}`}
                      >
                        {atividade.intensidade}
                      </span>
                      <span className="atividade-data">
                        <Calendar size={14} />
                        {format(
                          new Date(atividade.data),
                          "dd 'de' MMMM 'de' yyyy",
                          { locale: ptBR }
                        )}
                      </span>
                    </div>
                    {atividade.observacoes && (
                      <p className="atividade-obs">{atividade.observacoes}</p>
                    )}
                  </div>
                </div>
                <button
                  className="btn-icon btn-danger"
                  onClick={() => removerAtividade(atividade.id)}
                  title="Remover"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {atividades.length === 0 && (
        <div className="card empty-state">
          <Activity size={48} className="empty-icon" />
          <h3>Nenhuma atividade registrada</h3>
          <p>
            Comece registrando suas atividades físicas para acompanhar seu
            progresso
          </p>
        </div>
      )}
    </div>
  );
};

export default Atividades;
