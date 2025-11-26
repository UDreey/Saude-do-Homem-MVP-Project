import { useState } from "react";
import {
  Heart,
  MessageCircle,
  BookOpen,
  Users,
  Shield,
  Lightbulb,
  CheckCircle2,
  Clock,
  Target,
  Award,
  Activity,
  Brain,
  Smile,
} from "lucide-react";
import "./SaudeMental.css";

const SaudeMental = () => {
  const [activeTab, setActiveTab] = useState("recursos");
  const [completedExercises, setCompletedExercises] = useState(new Set());

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

  const toggleExercise = (id) => {
    const newCompleted = new Set(completedExercises);
    if (newCompleted.has(id)) {
      newCompleted.delete(id);
    } else {
      newCompleted.add(id);
    }
    setCompletedExercises(newCompleted);
  };

  const exercicios = [
    {
      id: "ex1",
      titulo: "Respiração 4-7-8",
      descricao:
        "Inspire por 4 segundos, segure por 7, expire por 8. Repita 4 vezes.",
      tempo: "5 min",
      pontos: 15,
      categoria: "relaxamento",
    },
    {
      id: "ex2",
      titulo: "Gratidão - 3 coisas",
      descricao: "Anote 3 coisas pelas quais você é grato hoje.",
      tempo: "3 min",
      pontos: 10,
      categoria: "mindfulness",
    },
    {
      id: "ex3",
      titulo: "Caminhada consciente",
      descricao:
        "Caminhe por 10 minutos prestando atenção em cada passo e na respiração.",
      tempo: "10 min",
      pontos: 20,
      categoria: "atividade",
    },
    {
      id: "ex4",
      titulo: "Meditação guiada",
      descricao: "Pratique 10 minutos de meditação focada na respiração.",
      tempo: "10 min",
      pontos: 20,
      categoria: "meditação",
    },
    {
      id: "ex5",
      titulo: "Conversa com alguém",
      descricao:
        "Ligue ou converse pessoalmente com alguém importante para você.",
      tempo: "15 min",
      pontos: 25,
      categoria: "social",
    },
  ];

  const totalPontos = exercicios
    .filter((ex) => completedExercises.has(ex.id))
    .reduce((sum, ex) => sum + ex.pontos, 0);

  const dicasBemEstar = [
    {
      texto:
        "Pratique exercícios físicos regularmente - eles liberam endorfinas que melhoram o humor",
      categoria: "atividade",
      icon: Activity,
    },
    {
      texto:
        "Mantenha uma rotina de sono regular - durma entre 7-9 horas por noite",
      categoria: "sono",
      icon: Clock,
    },
    {
      texto:
        "Conecte-se com pessoas que você confia - relacionamentos são fundamentais",
      categoria: "social",
      icon: Users,
    },
    {
      texto:
        "Pratique técnicas de respiração e meditação para gerenciar o estresse",
      categoria: "relaxamento",
      icon: Brain,
    },
    {
      texto: "Estabeleça limites saudáveis no trabalho e na vida pessoal",
      categoria: "bem-estar",
      icon: Shield,
    },
    {
      texto: "Busque hobbies e atividades que trazem prazer e realização",
      categoria: "bem-estar",
      icon: Smile,
    },
    {
      texto:
        "Considere terapia como uma ferramenta de autoconhecimento e crescimento",
      categoria: "profissional",
      icon: Heart,
    },
    {
      texto:
        "Evite o isolamento - mesmo quando não tiver vontade, mantenha contato social",
      categoria: "social",
      icon: Users,
    },
    {
      texto:
        "Alimente-se bem - nutrição adequada impacta diretamente na saúde mental",
      categoria: "nutrição",
      icon: Heart,
    },
    {
      texto: "Reconheça que pedir ajuda é um sinal de força, não de fraqueza",
      categoria: "bem-estar",
      icon: Shield,
    },
    {
      texto: "Pratique mindfulness - esteja presente no momento atual",
      categoria: "mindfulness",
      icon: Brain,
    },
    {
      texto: "Reserve tempo para atividades que você gosta - lazer é essencial",
      categoria: "bem-estar",
      icon: Smile,
    },
  ];

  return (
    <div className="saude-mental-page">
      <div className="page-header">
        <div className="header-content-mental">
          <div>
            <h1>
              <Heart size={32} className="header-icon-mental" />
              Saúde Mental
            </h1>
            <p>Um espaço seguro para diálogo, informação e apoio</p>
          </div>
          <div className="stats-header-mental">
            <div className="stat-badge-mental">
              <Award size={20} />
              <span>{totalPontos} pontos</span>
            </div>
            <div className="stat-badge-mental">
              <CheckCircle2 size={20} />
              <span>
                {completedExercises.size}/{exercicios.length} exercícios
              </span>
            </div>
          </div>
        </div>
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

      <div className="exercicios-section">
        <div className="section-header-mental">
          <Target size={24} />
          <h2>Exercícios Práticos de Bem-Estar</h2>
        </div>
        <div className="exercicios-grid">
          {exercicios.map((exercicio) => {
            const isCompleted = completedExercises.has(exercicio.id);
            return (
              <div
                key={exercicio.id}
                className={`exercicio-card ${isCompleted ? "completed" : ""}`}
                onClick={() => toggleExercise(exercicio.id)}
              >
                <div className="exercicio-check">
                  <CheckCircle2
                    size={24}
                    className={isCompleted ? "checked" : "unchecked"}
                  />
                </div>
                <div className="exercicio-content">
                  <h3>{exercicio.titulo}</h3>
                  <p className="exercicio-desc">{exercicio.descricao}</p>
                  <div className="exercicio-meta">
                    <span className="meta-item-mental">
                      <Clock size={14} />
                      {exercicio.tempo}
                    </span>
                    <span className="meta-item-mental points">
                      <Award size={14} />
                      {exercicio.pontos} pts
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === "recursos" ? "active" : ""}`}
          onClick={() => setActiveTab("recursos")}
        >
          <BookOpen size={18} />
          Recursos
        </button>
        <button
          className={`tab ${activeTab === "ajuda" ? "active" : ""}`}
          onClick={() => setActiveTab("ajuda")}
        >
          <MessageCircle size={18} />
          Linhas de Ajuda
        </button>
        <button
          className={`tab ${activeTab === "dicas" ? "active" : ""}`}
          onClick={() => setActiveTab("dicas")}
        >
          <Lightbulb size={18} />
          Dicas de Bem-Estar
        </button>
        <button
          className={`tab ${activeTab === "exercicios" ? "active" : ""}`}
          onClick={() => setActiveTab("exercicios")}
        >
          <Activity size={18} />
          Exercícios
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
            {dicasBemEstar.map((dica, index) => {
              const Icon = dica.icon;
              return (
                <div key={index} className="dica-item">
                  <div className="dica-icon-item">
                    <Icon size={20} />
                  </div>
                  <div className="dica-content-item">
                    <div className="dica-numero">{index + 1}</div>
                    <p>{dica.texto}</p>
                    <span className="dica-categoria-badge">
                      {dica.categoria}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === "exercicios" && (
        <div className="card">
          <h2 className="card-title">
            <Activity size={20} />
            Exercícios Práticos
          </h2>
          <div className="exercicios-list">
            {exercicios.map((exercicio) => {
              const isCompleted = completedExercises.has(exercicio.id);
              return (
                <div
                  key={exercicio.id}
                  className={`exercicio-item ${isCompleted ? "completed" : ""}`}
                  onClick={() => toggleExercise(exercicio.id)}
                >
                  <div className="exercicio-item-check">
                    <CheckCircle2
                      size={24}
                      className={isCompleted ? "checked" : "unchecked"}
                    />
                  </div>
                  <div className="exercicio-item-content">
                    <h3>{exercicio.titulo}</h3>
                    <p>{exercicio.descricao}</p>
                    <div className="exercicio-item-meta">
                      <span>
                        <Clock size={14} />
                        {exercicio.tempo}
                      </span>
                      <span className="points">
                        <Award size={14} />
                        {exercicio.pontos} pontos
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
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
