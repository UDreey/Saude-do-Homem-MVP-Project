import { useState } from "react";
import {
  MapPin,
  Search,
  Navigation,
  Phone,
  Clock,
  CheckCircle2,
  Pill,
  Building2,
  Shield,
  Leaf,
} from "lucide-react";
import "./Localizar.css";

const Localizar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("todos");

  const servicos = [
    {
      id: 1,
      nome: "EcoFarmácia Central",
      tipo: "farmacia",
      tipoLabel: "Farmácia",
      icon: Pill,
      rating: 4.8,
      endereco: "Av. Paulista, 1000 - Bela Vista, São Paulo",
      telefone: "(11) 3333-4444",
      horario: "Segunda a Sábado: 8h às 22h, Domingo: 9h às 18h",
      aceitaMedicamentos: true,
    },
    {
      id: 2,
      nome: "Ponto Verde Sustentável",
      tipo: "coleta",
      tipoLabel: "Ponto de Coleta",
      icon: Leaf,
      rating: 4.9,
      endereco: "Rua Augusta, 567 - Consolação, São Paulo",
      telefone: "(11) 3555-7777",
      horario: "Segunda a Domingo: 6h às 20h",
      aceitaMedicamentos: true,
    },
    {
      id: 3,
      nome: "UBS Vila Madalena",
      tipo: "posto",
      tipoLabel: "Posto de Saúde",
      icon: Shield,
      rating: 4.5,
      endereco: "Rua Harmonia, 890 - Vila Madalena, São Paulo",
      telefone: "(11) 3222-6666",
      horario: "Segunda a Sexta: 7h às 17h",
      aceitaMedicamentos: true,
    },
    {
      id: 4,
      nome: "Farmácia Central",
      tipo: "farmacia",
      tipoLabel: "Farmácia",
      icon: Pill,
      rating: 4.5,
      endereco: "Rua das Flores, 123 - Centro",
      telefone: "(11) 3333-4444",
      horario: "Segunda a Sábado: 8h às 20h",
      aceitaMedicamentos: false,
    },
    {
      id: 5,
      nome: "Hospital São Lucas",
      tipo: "hospital",
      tipoLabel: "Hospital",
      icon: Building2,
      rating: 4.8,
      endereco: "Avenida Saúde, 456 - Jardim Esperança",
      telefone: "(11) 3555-7777",
      horario: "24 horas",
      aceitaMedicamentos: false,
    },
    {
      id: 6,
      nome: "UBS Vila Verde",
      tipo: "posto",
      tipoLabel: "Posto de Saúde",
      icon: Shield,
      rating: 4.2,
      endereco: "Rua da Saúde, 789 - Vila Verde",
      telefone: "(11) 3222-6666",
      horario: "Segunda a Sexta: 7h às 17h",
      aceitaMedicamentos: true,
    },
  ];

  const filtros = [
    { id: "todos", label: "Todos", icon: null },
    { id: "hospital", label: "Hospitais", icon: Building2 },
    { id: "farmacia", label: "Farmácias", icon: Pill },
    { id: "posto", label: "Postos", icon: Shield },
    { id: "coleta", label: "Coleta", icon: Leaf },
  ];

  const servicosFiltrados = servicos.filter((servico) => {
    const matchFilter =
      activeFilter === "todos" || servico.tipo === activeFilter;
    const matchSearch =
      servico.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      servico.endereco.toLowerCase().includes(searchTerm.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="localizar-page">
      <div className="localizar-header">
        <h1>Localizar Serviços</h1>
        <p>Encontre hospitais, farmácias e pontos de coleta próximos a você</p>
      </div>

      <div className="search-section">
        <div className="search-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            className="search-input"
            placeholder="Buscar por nome ou endereço..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="filters-section">
        {filtros.map((filtro) => {
          const Icon = filtro.icon;
          return (
            <button
              key={filtro.id}
              className={`filter-button ${
                activeFilter === filtro.id ? "active" : ""
              }`}
              onClick={() => setActiveFilter(filtro.id)}
            >
              {Icon && <Icon size={18} />}
              <span>{filtro.label}</span>
            </button>
          );
        })}
      </div>

      <div className="servicos-grid">
        {servicosFiltrados.map((servico) => {
          const Icon = servico.icon;
          return (
            <div key={servico.id} className="servico-card">
              <div className="servico-header">
                <div className="servico-icon-wrapper">
                  <Icon size={24} />
                </div>
                <div className="servico-info-header">
                  <h3>{servico.nome}</h3>
                  <span className="servico-tipo">{servico.tipoLabel}</span>
                </div>
                <div className="servico-rating">
                  <span>★ {servico.rating}</span>
                </div>
              </div>

              <div className="servico-details">
                <div className="servico-detail-item">
                  <MapPin size={16} />
                  <span>{servico.endereco}</span>
                </div>
                <div className="servico-detail-item">
                  <Phone size={16} />
                  <span>{servico.telefone}</span>
                </div>
                <div className="servico-detail-item">
                  <Clock size={16} />
                  <span>{servico.horario}</span>
                </div>
              </div>

              {servico.aceitaMedicamentos && (
                <div className="servico-feature">
                  <CheckCircle2 size={16} />
                  <span>Aceita medicamentos vencidos</span>
                </div>
              )}

              <button className="servico-navigate-btn">
                <Navigation size={18} />
                Navegar
              </button>
            </div>
          );
        })}
      </div>

      {servicosFiltrados.length === 0 && (
        <div className="empty-state">
          <MapPin size={48} className="empty-icon" />
          <h3>Nenhum serviço encontrado</h3>
          <p>Tente ajustar os filtros ou termo de busca</p>
        </div>
      )}
    </div>
  );
};

export default Localizar;
