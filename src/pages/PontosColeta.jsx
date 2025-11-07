import { useState } from "react";
import {
  Recycle,
  MapPin,
  Phone,
  Clock,
  Navigation,
  CheckCircle2,
  Search,
} from "lucide-react";
import "./PontosColeta.css";

const PontosColeta = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const pontos = [
    {
      id: 1,
      nome: "Ponto Verde Sustentável",
      endereco: "Rua Augusta, 567 - Consolação, São Paulo",
      telefone: "(11) 3555-7777",
      horario: "Segunda a Domingo: 6h às 20h",
      tipos: ["Medicamentos", "Pilhas", "Eletrônicos"],
      rating: 4.9,
      distancia: "2.3 km",
    },
    {
      id: 2,
      nome: "EcoFarmácia Central",
      endereco: "Av. Paulista, 1000 - Bela Vista, São Paulo",
      telefone: "(11) 3333-4444",
      horario: "Segunda a Sábado: 8h às 22h",
      tipos: ["Medicamentos"],
      rating: 4.8,
      distancia: "1.5 km",
    },
    {
      id: 3,
      nome: "UBS Vila Madalena",
      endereco: "Rua Harmonia, 890 - Vila Madalena, São Paulo",
      telefone: "(11) 3222-6666",
      horario: "Segunda a Sexta: 7h às 17h",
      tipos: ["Medicamentos", "Resíduos de Saúde"],
      rating: 4.5,
      distancia: "3.1 km",
    },
    {
      id: 4,
      nome: "Coleta Verde - Centro",
      endereco: "Rua das Flores, 123 - Centro",
      telefone: "(11) 3444-8888",
      horario: "Segunda a Sexta: 9h às 18h",
      tipos: ["Medicamentos", "Óleo", "Pilhas"],
      rating: 4.7,
      distancia: "4.2 km",
    },
  ];

  const pontosFiltrados = pontos.filter(
    (ponto) =>
      ponto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ponto.endereco.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pontos-coleta-page">
      <div className="pontos-header">
        <h1>Pontos de Coleta</h1>
        <p>Encontre locais para descarte correto de medicamentos e resíduos</p>
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

      <div className="pontos-grid">
        {pontosFiltrados.map((ponto) => (
          <div key={ponto.id} className="ponto-card">
            <div className="ponto-header">
              <div className="ponto-icon-wrapper">
                <Recycle size={28} />
              </div>
              <div className="ponto-info-header">
                <h3>{ponto.nome}</h3>
                <div className="ponto-meta">
                  <span className="ponto-rating">★ {ponto.rating}</span>
                  <span className="ponto-distancia">{ponto.distancia}</span>
                </div>
              </div>
            </div>

            <div className="ponto-details">
              <div className="ponto-detail-item">
                <MapPin size={16} />
                <span>{ponto.endereco}</span>
              </div>
              <div className="ponto-detail-item">
                <Phone size={16} />
                <span>{ponto.telefone}</span>
              </div>
              <div className="ponto-detail-item">
                <Clock size={16} />
                <span>{ponto.horario}</span>
              </div>
            </div>

            <div className="ponto-tipos">
              <span className="ponto-tipos-label">Aceita:</span>
              <div className="ponto-tipos-list">
                {ponto.tipos.map((tipo, index) => (
                  <span key={index} className="ponto-tipo-badge">
                    <CheckCircle2 size={14} />
                    {tipo}
                  </span>
                ))}
              </div>
            </div>

            <button className="ponto-navigate-btn">
              <Navigation size={18} />
              Navegar até o local
            </button>
          </div>
        ))}
      </div>

      {pontosFiltrados.length === 0 && (
        <div className="empty-state">
          <Recycle size={48} className="empty-icon" />
          <h3>Nenhum ponto encontrado</h3>
          <p>Tente ajustar o termo de busca</p>
        </div>
      )}

      <div className="info-box">
        <h4>Por que descartar corretamente?</h4>
        <p>
          O descarte incorreto de medicamentos pode contaminar o solo e a água,
          causando danos ao meio ambiente e à saúde pública. Use os pontos de
          coleta adequados para proteger o planeta.
        </p>
      </div>
    </div>
  );
};

export default PontosColeta;
