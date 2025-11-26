import { useState } from "react";
import {
  BookOpen,
  Search,
  Calendar,
  Utensils,
  Activity,
  Moon,
  Brain,
  Heart,
  Leaf,
  PlayCircle,
  CheckCircle2,
  Target,
  Award,
  TrendingUp,
  Clock,
  Users,
} from "lucide-react";
import "./Educacao.css";

const Educacao = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("todas");
  const [completedActivities, setCompletedActivities] = useState(new Set());

  const categorias = [
    { id: "todas", label: "Todas", icon: null },
    { id: "nutricao", label: "Nutrição", icon: Utensils },
    { id: "exercicio", label: "Exercício", icon: Activity },
    { id: "sono", label: "Sono", icon: Moon },
    { id: "mental", label: "Mental", icon: Brain },
    { id: "prevencao", label: "Prevenção", icon: Heart },
    { id: "sustentavel", label: "Sustentável", icon: Leaf },
  ];

  const toggleActivity = (id) => {
    const newCompleted = new Set(completedActivities);
    if (newCompleted.has(id)) {
      newCompleted.delete(id);
    } else {
      newCompleted.add(id);
    }
    setCompletedActivities(newCompleted);
  };

  const atividades = [
    {
      id: "atv1",
      titulo: "Beba 8 copos de água hoje",
      categoria: "nutricao",
      pontos: 10,
      tempo: "5 min",
    },
    {
      id: "atv2",
      titulo: "Faça 30 minutos de exercício",
      categoria: "exercicio",
      pontos: 20,
      tempo: "30 min",
    },
    {
      id: "atv3",
      titulo: "Durma 8 horas esta noite",
      categoria: "sono",
      pontos: 15,
      tempo: "8h",
    },
    {
      id: "atv4",
      titulo: "Pratique 10 minutos de meditação",
      categoria: "mental",
      pontos: 15,
      tempo: "10 min",
    },
    {
      id: "atv5",
      titulo: "Consuma 5 porções de frutas/vegetais",
      categoria: "nutricao",
      pontos: 20,
      tempo: "Todo o dia",
    },
    {
      id: "atv6",
      titulo: "Faça uma caminhada de 20 minutos",
      categoria: "exercicio",
      pontos: 15,
      tempo: "20 min",
    },
    {
      id: "atv7",
      titulo: "Anote 3 coisas pelas quais é grato",
      categoria: "mental",
      pontos: 10,
      tempo: "5 min",
    },
    {
      id: "atv8",
      titulo: "Use transporte sustentável ou caminhe",
      categoria: "sustentavel",
      pontos: 25,
      tempo: "Todo o dia",
    },
  ];

  const totalPontos = atividades
    .filter((atv) => completedActivities.has(atv.id))
    .reduce((sum, atv) => sum + atv.pontos, 0);

  const dicas = [
    {
      id: 1,
      titulo: "Beba água regularmente",
      categoria: "nutricao",
      icon: Utensils,
      tags: ["nutricao", "geral", "Sustentável"],
      texto:
        "Mantenha-se hidratado bebendo pelo menos 8 copos de água por dia. A água ajuda na digestão, regula a temperatura corporal e mantém a pele saudável. Use garrafas reutilizáveis para reduzir o impacto ambiental.",
      data: "20/09/2025",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      leitura: "5 min",
    },
    {
      id: 2,
      titulo: "30 minutos de exercício diário",
      categoria: "exercicio",
      icon: Activity,
      tags: ["exercicio", "adultos", "Sustentável"],
      texto:
        "Pratique pelo menos 30 minutos de atividade física moderada por dia. Pode ser uma caminhada, ciclismo ou exercícios em casa. Opte por modalidades ao ar livre quando possível para conectar-se com a natureza.",
      data: "20/09/2025",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      leitura: "7 min",
    },
    {
      id: 3,
      titulo: "Durma de 7-9 horas por noite",
      categoria: "sono",
      icon: Moon,
      tags: ["sono", "geral", "Sustentável"],
      texto:
        "O sono adequado é fundamental para a recuperação do corpo e mente. Mantenha horários regulares, evite telas antes de dormir e crie um ambiente tranquilo e escuro no quarto.",
      data: "20/09/2025",
      leitura: "6 min",
    },
    {
      id: 4,
      titulo: "Consuma alimentos locais e sazonais",
      categoria: "nutricao",
      icon: Utensils,
      tags: ["nutricao", "geral", "Sustentável"],
      texto:
        "Prefira frutas e vegetais da estação e produzidos localmente. Além de serem mais nutritivos e saborosos, reduzem a pegada de carbono e apoiam a economia local.",
      leitura: "4 min",
    },
    {
      id: 5,
      titulo: "Pratique meditação e mindfulness",
      categoria: "mental",
      icon: Brain,
      tags: ["mental", "geral"],
      texto:
        "Reserve 10-15 minutos diários para meditar ou praticar mindfulness. Isso reduz o estresse, melhora a concentração e promove bem-estar mental geral.",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      leitura: "8 min",
    },
    {
      id: 6,
      titulo: "Descarte medicamentos corretamente",
      categoria: "sustentavel",
      icon: Leaf,
      tags: ["sustentabilidade", "geral", "Sustentável"],
      texto:
        "Nunca jogue medicamentos no lixo comum ou no vaso sanitário. Use os pontos de coleta adequados para proteger o meio ambiente e a saúde pública.",
      leitura: "3 min",
    },
    {
      id: 7,
      titulo: "Faça check-ups regulares",
      categoria: "prevencao",
      icon: Heart,
      tags: ["prevenção", "saúde", "geral"],
      texto:
        "Realize exames médicos preventivos anualmente. Detectar problemas de saúde precocemente aumenta significativamente as chances de tratamento bem-sucedido.",
      leitura: "5 min",
    },
    {
      id: 8,
      titulo: "Reduza o consumo de açúcar",
      categoria: "nutricao",
      icon: Utensils,
      tags: ["nutricao", "prevenção", "geral"],
      texto:
        "O excesso de açúcar está ligado a diabetes, obesidade e doenças cardíacas. Prefira frutas naturais e reduza alimentos processados e bebidas açucaradas.",
      leitura: "6 min",
    },
    {
      id: 9,
      titulo: "Pratique exercícios de força",
      categoria: "exercicio",
      icon: Activity,
      tags: ["exercicio", "musculação", "geral"],
      texto:
        "Além do cardio, inclua treinos de força 2-3 vezes por semana. Isso fortalece ossos, aumenta massa muscular e acelera o metabolismo.",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      leitura: "7 min",
    },
    {
      id: 10,
      titulo: "Gerencie o estresse",
      categoria: "mental",
      icon: Brain,
      tags: ["mental", "bem-estar", "geral"],
      texto:
        "Identifique fontes de estresse e desenvolva estratégias de enfrentamento. Técnicas de respiração, hobbies e tempo com pessoas queridas são essenciais.",
      leitura: "8 min",
    },
    {
      id: 11,
      titulo: "Use protetor solar diariamente",
      categoria: "prevencao",
      icon: Heart,
      tags: ["prevenção", "pele", "geral"],
      texto:
        "Proteja sua pele dos raios UV mesmo em dias nublados. O protetor solar previne câncer de pele e envelhecimento precoce.",
      leitura: "4 min",
    },
    {
      id: 12,
      titulo: "Reduza o consumo de álcool",
      categoria: "prevencao",
      icon: Heart,
      tags: ["prevenção", "nutricao", "geral"],
      texto:
        "O consumo excessivo de álcool prejudica o fígado, coração e aumenta o risco de câncer. Se beber, faça com moderação.",
      leitura: "5 min",
    },
  ];

  const dicasFiltradas = dicas.filter((dica) => {
    const matchCategory =
      activeCategory === "todas" || dica.categoria === activeCategory;
    const matchSearch =
      dica.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dica.texto.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="educacao-page">
      <div className="educacao-header">
        <div className="header-content">
          <div>
            <h1>
              <BookOpen size={32} className="header-icon" />
              Educação em Saúde
            </h1>
            <p>
              Dicas, atividades e orientações para uma vida mais saudável e
              sustentável
            </p>
          </div>
          <div className="stats-header">
            <div className="stat-badge">
              <Award size={20} />
              <span>{totalPontos} pontos</span>
            </div>
            <div className="stat-badge">
              <CheckCircle2 size={20} />
              <span>
                {completedActivities.size}/{atividades.length} concluídas
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="atividades-section">
        <div className="section-header">
          <Target size={24} />
          <h2>Atividades do Dia</h2>
        </div>
        <div className="atividades-grid">
          {atividades.map((atividade) => {
            const Icon =
              categorias.find((c) => c.id === atividade.categoria)?.icon ||
              Activity;
            const isCompleted = completedActivities.has(atividade.id);
            return (
              <div
                key={atividade.id}
                className={`atividade-card ${isCompleted ? "completed" : ""}`}
                onClick={() => toggleActivity(atividade.id)}
              >
                <div className="atividade-check">
                  <CheckCircle2
                    size={24}
                    className={isCompleted ? "checked" : "unchecked"}
                  />
                </div>
                <div className="atividade-content">
                  <div className="atividade-icon-small">
                    <Icon size={20} />
                  </div>
                  <h3>{atividade.titulo}</h3>
                  <div className="atividade-meta">
                    <span className="meta-item">
                      <Clock size={14} />
                      {atividade.tempo}
                    </span>
                    <span className="meta-item points">
                      <Award size={14} />
                      {atividade.pontos} pts
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="search-section">
        <div className="search-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            className="search-input"
            placeholder="Buscar dicas de saúde..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="categories-section">
        {categorias.map((categoria) => {
          const Icon = categoria.icon;
          return (
            <button
              key={categoria.id}
              className={`category-button ${
                activeCategory === categoria.id ? "active" : ""
              }`}
              onClick={() => setActiveCategory(categoria.id)}
            >
              {Icon && <Icon size={18} />}
              <span>{categoria.label}</span>
            </button>
          );
        })}
      </div>

      <div className="dicas-grid">
        {dicasFiltradas.map((dica) => {
          const Icon = dica.icon;
          return (
            <div key={dica.id} className="dica-card">
              <div className="dica-header">
                <div className="dica-icon-wrapper">
                  <Icon size={24} />
                </div>
                <h3>{dica.titulo}</h3>
              </div>

              <div className="dica-tags">
                {dica.tags.map((tag, index) => (
                  <span key={index} className="dica-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="dica-texto">{dica.texto}</p>

              <div className="dica-footer">
                <div className="dica-actions">
                  {dica.video && (
                    <button className="action-btn video-btn">
                      <PlayCircle size={16} />
                      <span>Vídeo</span>
                    </button>
                  )}
                  {dica.leitura && (
                    <span className="reading-time">
                      <BookOpen size={14} />
                      {dica.leitura}
                    </span>
                  )}
                </div>
                {dica.data && (
                  <div className="dica-data">
                    <Calendar size={14} />
                    <span>{dica.data}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {dicasFiltradas.length === 0 && (
        <div className="empty-state">
          <BookOpen size={48} className="empty-icon" />
          <h3>Nenhuma dica encontrada</h3>
          <p>Tente ajustar a categoria ou termo de busca</p>
        </div>
      )}
    </div>
  );
};

export default Educacao;
