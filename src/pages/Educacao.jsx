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
} from "lucide-react";
import "./Educacao.css";

const Educacao = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("todas");

  const categorias = [
    { id: "todas", label: "Todas", icon: null },
    { id: "nutricao", label: "Nutrição", icon: Utensils },
    { id: "exercicio", label: "Exercício", icon: Activity },
    { id: "sono", label: "Sono", icon: Moon },
    { id: "mental", label: "Mental", icon: Brain },
    { id: "prevencao", label: "Prevenção", icon: Heart },
    { id: "sustentavel", label: "Sustentável", icon: Leaf },
  ];

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
    },
    {
      id: 4,
      titulo: "Consuma alimentos locais e sazonais",
      categoria: "nutricao",
      icon: Utensils,
      tags: ["nutricao", "geral", "Sustentável"],
      texto:
        "Prefira frutas e vegetais da estação e produzidos localmente. Além de serem mais nutritivos e saborosos, reduzem a pegada de carbono e apoiam a economia local.",
    },
    {
      id: 5,
      titulo: "Pratique meditação e mindfulness",
      categoria: "mental",
      icon: Brain,
      tags: ["mental", "geral"],
      texto:
        "Reserve 10-15 minutos diários para meditar ou praticar mindfulness. Isso reduz o estresse, melhora a concentração e promove bem-estar mental geral.",
    },
    {
      id: 6,
      titulo: "Descarte medicamentos corretamente",
      categoria: "sustentavel",
      icon: Leaf,
      tags: ["sustentabilidade", "geral", "Sustentável"],
      texto:
        "Nunca jogue medicamentos no lixo comum ou no vaso sanitário. Use os pontos de coleta adequados para proteger o meio ambiente e a saúde pública.",
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
        <h1>Educação em Saúde</h1>
        <p>Dicas e orientações para uma vida mais saudável e sustentável</p>
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

              {dica.data && (
                <div className="dica-data">
                  <Calendar size={14} />
                  <span>{dica.data}</span>
                </div>
              )}
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
