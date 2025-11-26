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
      nome: "SuperFarma Siqueira Campos",
      tipo: "farmacia",
      tipoLabel: "Farmácia",
      icon: Pill,
      rating: 4.7,
      endereco: "Rua Santa Catarina, 224 - Siqueira Campos, Aracaju/SE",
      telefone: "(79) 99926-0298",
      horario: "Segunda a Sábado: 7h às 22h, Domingo: 8h às 20h",
      aceitaMedicamentos: true,
    },
    {
      id: 2,
      nome: "Farmácia Drogamais",
      tipo: "farmacia",
      tipoLabel: "Farmácia",
      icon: Pill,
      rating: 4.6,
      endereco: "Rua Alagoas, 755 - Siqueira Campos, Aracaju/SE",
      telefone: "(79) 3214-5678",
      horario: "Segunda a Domingo: 7h às 22h",
      aceitaMedicamentos: true,
    },
    {
      id: 3,
      nome: "Hospital de Urgência de Sergipe (HUSE)",
      tipo: "hospital",
      tipoLabel: "Hospital",
      icon: Building2,
      rating: 4.6,
      endereco: "Av. Tancredo Neves, 5700 - Capucho, Aracaju/SE",
      telefone: "(79) 3216-2600",
      horario: "24 horas",
      aceitaMedicamentos: false,
    },
    {
      id: 4,
      nome: "Hospital e Maternidade Santa Isabel",
      tipo: "hospital",
      tipoLabel: "Hospital",
      icon: Building2,
      rating: 4.5,
      endereco: "Rua Dom Bosco, 72 - Suíssa, Aracaju/SE",
      telefone: "(79) 3216-2700",
      horario: "24 horas",
      aceitaMedicamentos: false,
    },
    {
      id: 5,
      nome: "Hospital São Lucas",
      tipo: "hospital",
      tipoLabel: "Hospital",
      icon: Building2,
      rating: 4.7,
      endereco: "Rua Guilhermino Rezende, 187 - São José, Aracaju/SE",
      telefone: "(79) 3216-2700",
      horario: "24 horas",
      aceitaMedicamentos: false,
    },
    {
      id: 6,
      nome: "Ecoponto Siqueira Campos",
      tipo: "coleta",
      tipoLabel: "Ponto de Coleta",
      icon: Leaf,
      rating: 4.8,
      endereco:
        "Av. Augusto Franco, próximo à Uninassau - Siqueira Campos, Aracaju/SE",
      telefone: "(79) 3212-3456",
      horario: "Segunda a Domingo: 6h às 20h",
      aceitaMedicamentos: true,
    },
    {
      id: 7,
      nome: "Farmácia do Trabalhador do Bairro",
      tipo: "farmacia",
      tipoLabel: "Farmácia",
      icon: Pill,
      rating: 4.5,
      endereco: "Rua Santa Catarina - Siqueira Campos, Aracaju/SE",
      telefone: "(79) 3214-7890",
      horario: "Segunda a Sábado: 8h às 20h, Domingo: 9h às 18h",
      aceitaMedicamentos: true,
    },
    {
      id: 8,
      nome: "UBS Siqueira Campos",
      tipo: "posto",
      tipoLabel: "Posto de Saúde",
      icon: Shield,
      rating: 4.4,
      endereco: "Siqueira Campos, Aracaju/SE",
      telefone: "(79) 3211-2345",
      horario: "Segunda a Sexta: 7h às 17h",
      aceitaMedicamentos: true,
    },
    {
      id: 9,
      nome: "Hospital de Cirurgia",
      tipo: "hospital",
      tipoLabel: "Hospital",
      icon: Building2,
      rating: 4.5,
      endereco: "Rua Dom Bosco, 722 - Centro, Aracaju/SE",
      telefone: "(79) 3212-2000",
      horario: "24 horas",
      aceitaMedicamentos: false,
    },
    {
      id: 10,
      nome: "Farmácia GBarbosa - Ponto de Coleta",
      tipo: "coleta",
      tipoLabel: "Ponto de Coleta",
      icon: Leaf,
      rating: 4.7,
      endereco: "Av. Francisco José da Fonseca, 1337 - Aracaju/SE",
      telefone: "(79) 3214-2345",
      horario: "Segunda a Sábado: 8h às 20h",
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

  const handleNavigate = (endereco) => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      endereco
    )}`;
    window.open(mapsUrl, "_blank");
  };

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

              <button
                className="servico-navigate-btn"
                onClick={() => handleNavigate(servico.endereco)}
              >
                <Navigation size={18} />
                Navegar no Maps
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
