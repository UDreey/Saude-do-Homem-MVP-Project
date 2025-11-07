import { useState } from "react";
import {
  Heart,
  MessageCircle,
  BookOpen,
  Users,
  Shield,
  Lightbulb,
} from "lucide-react";
import "./SaudeMental.css";

const SaudeMental = () => {
  const [activeTab, setActiveTab] = useState("recursos");

  const recursos = [
    {
      icon: BookOpen,
      titulo: "Informações sobre Saúde Mental",
      descricao:
        "Aprenda sobre depressão, ansiedade, estresse e outros aspectos da saúde mental masculina.",
      cor: "#2563eb",
    },
    {
      icon: Users,
      titulo: "Grupos de Apoio",
      descricao:
        "Conecte-se com outros homens que enfrentam desafios similares. Você não está sozinho.",
      cor: "#10b981",
    },
    {
      icon: MessageCircle,
      titulo: "Linhas de Ajuda",
      descricao:
        "Acesso a linhas de apoio emocional e prevenção ao suicídio disponíveis 24/7.",
      cor: "#ef4444",
    },
    {
      icon: Shield,
      titulo: "Espaço Seguro",
      descricao:
        "Este é um espaço livre de julgamentos. Suas emoções são válidas e importantes.",
      cor: "#0ea5e9",
    },
  ];

  const linhasAjuda = [
    {
      nome: "CVV - Centro de Valorização da Vida",
      telefone: "188",
      descricao: "Atendimento 24 horas, todos os dias. Gratuito e anônimo.",
    },
    {
      nome: "CAPS - Centro de Atenção Psicossocial",
      telefone: "Consulte a unidade mais próxima",
      descricao: "Atendimento especializado em saúde mental na sua região.",
    },
    {
      nome: "SAMU",
      telefone: "192",
      descricao: "Emergências de saúde mental e crises agudas.",
    },
  ];

  const dicasBemEstar = [
    "Pratique exercícios físicos regularmente - eles liberam endorfinas que melhoram o humor",
    "Mantenha uma rotina de sono regular - durma entre 7-9 horas por noite",
    "Conecte-se com pessoas que você confia - relacionamentos são fundamentais",
    "Pratique técnicas de respiração e meditação para gerenciar o estresse",
    "Estabeleça limites saudáveis no trabalho e na vida pessoal",
    "Busque hobbies e atividades que trazem prazer e realização",
    "Considere terapia como uma ferramenta de autoconhecimento e crescimento",
    "Evite o isolamento - mesmo quando não tiver vontade, mantenha contato social",
    "Alimente-se bem - nutrição adequada impacta diretamente na saúde mental",
    "Reconheça que pedir ajuda é um sinal de força, não de fraqueza",
  ];

  return (
    <div className="saude-mental-page">
      <div className="page-header">
        <h1>Saúde Mental</h1>
        <p>Um espaço seguro para diálogo, informação e apoio</p>
      </div>

      <div className="intro-card card">
        <Heart size={32} className="intro-icon" />
        <h2>Bem-vindo ao Espaço de Saúde Mental</h2>
        <p>
          Cuidar da saúde mental é tão importante quanto cuidar da saúde física.
          Este espaço foi criado para quebrar tabus e promover o diálogo aberto
          sobre saúde mental masculina.
        </p>
        <p className="mensagem-importante">
          <strong>Lembre-se:</strong> Você não está sozinho. Buscar ajuda é um
          ato de coragem e autocuidado.
        </p>
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === "recursos" ? "active" : ""}`}
          onClick={() => setActiveTab("recursos")}
        >
          Recursos
        </button>
        <button
          className={`tab ${activeTab === "ajuda" ? "active" : ""}`}
          onClick={() => setActiveTab("ajuda")}
        >
          Linhas de Ajuda
        </button>
        <button
          className={`tab ${activeTab === "dicas" ? "active" : ""}`}
          onClick={() => setActiveTab("dicas")}
        >
          Dicas de Bem-Estar
        </button>
      </div>

      {activeTab === "recursos" && (
        <div className="recursos-grid">
          {recursos.map((recurso, index) => {
            const Icon = recurso.icon;
            return (
              <div key={index} className="recurso-card">
                <div
                  className="recurso-icon"
                  style={{ background: `${recurso.cor}15`, color: recurso.cor }}
                >
                  <Icon size={32} />
                </div>
                <h3>{recurso.titulo}</h3>
                <p>{recurso.descricao}</p>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === "ajuda" && (
        <div className="card">
          <h2 className="card-title">
            <MessageCircle size={20} />
            Linhas de Ajuda e Suporte
          </h2>
          <div className="linhas-ajuda">
            {linhasAjuda.map((linha, index) => (
              <div key={index} className="linha-ajuda-item">
                <div className="linha-ajuda-header">
                  <h3>{linha.nome}</h3>
                  <div className="telefone-badge">{linha.telefone}</div>
                </div>
                <p>{linha.descricao}</p>
              </div>
            ))}
          </div>
          <div className="aviso-importante">
            <Lightbulb size={20} />
            <p>
              <strong>Em caso de emergência ou pensamentos suicidas:</strong>
              Procure ajuda imediatamente. Ligue para o CVV (188), SAMU (192) ou
              vá ao pronto-socorro mais próximo. Sua vida importa.
            </p>
          </div>
        </div>
      )}

      {activeTab === "dicas" && (
        <div className="card">
          <h2 className="card-title">
            <Lightbulb size={20} />
            Dicas para o Bem-Estar Mental
          </h2>
          <div className="dicas-grid">
            {dicasBemEstar.map((dica, index) => (
              <div key={index} className="dica-item">
                <div className="dica-numero">{index + 1}</div>
                <p>{dica}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card mensagem-final">
        <Shield size={32} className="mensagem-icon" />
        <h3>Este é um Espaço Seguro</h3>
        <p>
          Aqui, não há julgamentos. Suas emoções são válidas. Buscar ajuda é um
          sinal de força, não de fraqueza. Quebrar o silêncio sobre saúde mental
          é o primeiro passo para uma vida mais saudável e plena.
        </p>
        <p className="mensagem-encorajamento">
          Você merece se sentir bem. Você merece apoio. Você não está sozinho.
        </p>
      </div>
    </div>
  );
};

export default SaudeMental;
