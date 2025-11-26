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
      nome: "Ecoponto Siqueira Campos",
      endereco:
        "Av. Augusto Franco, próximo à Uninassau - Siqueira Campos, Aracaju/SE",
      telefone: "(79) 3212-3456",
      horario: "Segunda a Domingo: 6h às 20h",
      tipos: ["Medicamentos", "Pilhas", "Eletrônicos", "Óleo"],
      rating: 4.9,
      distancia: "0.2 km",
    },
    {
      id: 2,
      nome: "Farmácia Pague Menos - Siqueira Campos",
      endereco: "Av. Augusto Franco, 2345 - Siqueira Campos, Aracaju/SE",
      telefone: "(79) 3214-5678",
      horario: "Segunda a Sábado: 7h às 22h, Domingo: 8h às 20h",
      tipos: ["Medicamentos"],
      rating: 4.8,
      distancia: "0.5 km",
    },
    {
      id: 3,
      nome: "SuperFarma Siqueira Campos",
      endereco: "Rua Santa Catarina, 224 - Siqueira Campos, Aracaju/SE",
      telefone: "(79) 99926-0298",
      horario: "Segunda a Sábado: 7h às 22h, Domingo: 8h às 20h",
      tipos: ["Medicamentos", "Pilhas"],
      rating: 4.7,
      distancia: "0.8 km",
    },
    {
      id: 4,
      nome: "UBS Siqueira Campos",
      endereco: "Siqueira Campos, Aracaju/SE",
      telefone: "(79) 3211-2345",
      horario: "Segunda a Sexta: 7h às 17h",
      tipos: ["Medicamentos", "Resíduos de Saúde"],
      rating: 4.6,
      distancia: "1.0 km",
    },
    {
      id: 5,
      nome: "Farmácia Drogamais",
      endereco: "Rua Alagoas, 755 - Siqueira Campos, Aracaju/SE",
      telefone: "(79) 3214-5678",
      horario: "Segunda a Domingo: 7h às 22h",
      tipos: ["Medicamentos"],
      rating: 4.6,
      distancia: "1.2 km",
    },
    {
      id: 6,
      nome: "Farmácia Popular - Centro",
      endereco: "Rua João Pessoa, 567 - Centro, Aracaju/SE",
      telefone: "(79) 3214-7890",
      horario: "Segunda a Sexta: 8h às 18h, Sábado: 8h às 13h",
      tipos: ["Medicamentos"],
      rating: 4.7,
      distancia: "2.5 km",
    },
    {
      id: 7,
      nome: "Farmácia GBarbosa - Ponto de Coleta",
      endereco: "Av. Francisco José da Fonseca, 1337 - Aracaju/SE",
      telefone: "(79) 3214-2345",
      horario: "Segunda a Sábado: 8h às 20h, Domingo: 9h às 18h",
      tipos: ["Medicamentos", "Pilhas", "Óleo"],
      rating: 4.8,
      distancia: "3.0 km",
    },
    {
      id: 8,
      nome: "UBS Centro de Saúde Dr. José Machado",
      endereco: "Rua Laranjeiras, 890 - Centro, Aracaju/SE",
      telefone: "(79) 3211-3456",
      horario: "Segunda a Sexta: 7h às 17h",
      tipos: ["Medicamentos", "Resíduos de Saúde"],
      rating: 4.5,
      distancia: "2.8 km",
    },
    {
      id: 9,
      nome: "Farmácia Drogaria São Paulo - Centro",
      endereco: "Av. Ivo do Prado, 1234 - Centro, Aracaju/SE",
      telefone: "(79) 3211-5678",
      horario: "Segunda a Sábado: 8h às 20h, Domingo: 9h às 18h",
      tipos: ["Medicamentos"],
      rating: 4.6,
      distancia: "3.2 km",
    },
    {
      id: 10,
      nome: "Ecoponto Centro",
      endereco: "Praça Fausto Cardoso - Centro, Aracaju/SE",
      telefone: "(79) 3212-4567",
      horario: "Segunda a Domingo: 7h às 19h",
      tipos: ["Medicamentos", "Pilhas", "Eletrônicos", "Óleo", "Baterias"],
      rating: 4.9,
      distancia: "3.5 km",
    },
    {
      id: 11,
      nome: "Farmácia do Trabalhador - Siqueira Campos",
      endereco: "Rua Santa Catarina - Siqueira Campos, Aracaju/SE",
      telefone: "(79) 3214-7890",
      horario: "Segunda a Sábado: 8h às 20h, Domingo: 9h às 18h",
      tipos: ["Medicamentos"],
      rating: 4.5,
      distancia: "0.9 km",
    },
    {
      id: 12,
      nome: "Ecoponto Atalaia",
      endereco: "Av. Beira Mar, próximo ao Shopping - Atalaia, Aracaju/SE",
      telefone: "(79) 3213-5678",
      horario: "Segunda a Domingo: 6h às 20h",
      tipos: ["Medicamentos", "Pilhas", "Eletrônicos", "Óleo"],
      rating: 4.8,
      distancia: "4.0 km",
    },
  ];

  const pontosFiltrados = pontos.filter(
    (ponto) =>
      ponto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ponto.endereco.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNavigate = (endereco) => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      endereco
    )}`;
    window.open(mapsUrl, "_blank");
  };

  const handleCall = (telefone) => {
    window.location.href = `tel:${telefone.replace(/\D/g, "")}`;
  };

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
              <div
                className="ponto-detail-item ponto-phone"
                onClick={() => handleCall(ponto.telefone)}
                style={{ cursor: "pointer" }}
              >
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

            <button
              className="ponto-navigate-btn"
              onClick={() => handleNavigate(ponto.endereco)}
            >
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
