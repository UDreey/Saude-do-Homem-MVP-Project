import { useState } from "react";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Heart,
  Brain,
  Dumbbell,
  Users,
  Sparkles,
} from "lucide-react";
import "./Informacoes.css";

const Informacoes = () => {
  const [openSection, setOpenSection] = useState(null);

  const categorias = [
    {
      id: "fisica",
      titulo: "Saúde Física",
      icon: Heart,
      cor: "#ef4444",
      conteudo: [
        {
          titulo: "Exames Preventivos Essenciais",
          texto:
            "Homens devem realizar exames regulares como: PSA (a partir dos 50 anos), exame de próstata, hemograma completo, glicemia, colesterol, pressão arterial e exames de imagem quando indicados.",
        },
        {
          titulo: "Cuidados com o Coração",
          texto:
            "Doenças cardiovasculares são a principal causa de morte entre homens. Mantenha uma dieta equilibrada, pratique exercícios regularmente, evite o tabagismo e controle o estresse.",
        },
        {
          titulo: "Saúde da Próstata",
          texto:
            "A partir dos 40 anos, é importante realizar exames preventivos. Sintomas como dificuldade para urinar, dor ou sangue na urina devem ser investigados imediatamente.",
        },
      ],
    },
    {
      id: "mental",
      titulo: "Saúde Mental",
      icon: Brain,
      cor: "#2563eb",
      conteudo: [
        {
          titulo: "Reconhecendo Sinais",
          texto:
            "Depressão, ansiedade e estresse não são sinais de fraqueza. Sintomas como tristeza persistente, perda de interesse, irritabilidade excessiva ou mudanças no sono merecem atenção.",
        },
        {
          titulo: "Buscando Ajuda",
          texto:
            "Procurar ajuda psicológica ou psiquiátrica é um ato de coragem e autocuidado. Terapia e, quando necessário, medicação podem transformar vidas.",
        },
        {
          titulo: "Estratégias de Bem-Estar",
          texto:
            "Meditação, exercícios físicos, hobbies, conexões sociais e uma rotina equilibrada são fundamentais para a saúde mental.",
        },
      ],
    },
    {
      id: "atividade",
      titulo: "Atividade Física",
      icon: Dumbbell,
      cor: "#f97316",
      conteudo: [
        {
          titulo: "Benefícios da Atividade Física",
          texto:
            "Exercícios regulares reduzem o risco de doenças cardíacas, diabetes, obesidade e melhoram a saúde mental. A OMS recomenda pelo menos 150 minutos de atividade moderada por semana.",
        },
        {
          titulo: "Tipos de Exercícios",
          texto:
            "Combine exercícios aeróbicos (caminhada, corrida, ciclismo) com treinamento de força (musculação, exercícios com peso corporal) para resultados completos.",
        },
        {
          titulo: "Começando",
          texto:
            "Comece devagar, estabeleça metas realistas e encontre atividades que você goste. Consulte um médico antes de iniciar um programa intenso se você tem condições pré-existentes.",
        },
      ],
    },
    {
      id: "social",
      titulo: "Bem-Estar Social",
      icon: Users,
      cor: "#10b981",
      conteudo: [
        {
          titulo: "Conexões Sociais",
          texto:
            "Manter relacionamentos saudáveis com família, amigos e comunidade é essencial para o bem-estar. Isolamento social pode impactar negativamente a saúde física e mental.",
        },
        {
          titulo: "Comunicação",
          texto:
            "Aprender a expressar emoções e buscar apoio quando necessário fortalece relacionamentos e reduz o estresse.",
        },
        {
          titulo: "Equilíbrio",
          texto:
            "Encontrar equilíbrio entre trabalho, lazer, relacionamentos e autocuidado é fundamental para uma vida saudável e satisfatória.",
        },
      ],
    },
    {
      id: "espiritual",
      titulo: "Bem-Estar Espiritual",
      icon: Sparkles,
      cor: "#0ea5e9",
      conteudo: [
        {
          titulo: "Propósito e Significado",
          texto:
            "Ter um senso de propósito e significado na vida está associado a melhor saúde mental e física. Isso pode vir de valores pessoais, crenças, ou conexão com algo maior.",
        },
        {
          titulo: "Práticas Espirituais",
          texto:
            "Meditação, oração, tempo na natureza, reflexão pessoal ou práticas religiosas podem contribuir para o bem-estar espiritual.",
        },
        {
          titulo: "Autoconhecimento",
          texto:
            "Desenvolver autoconhecimento e viver alinhado com seus valores promove uma sensação de paz e realização.",
        },
      ],
    },
  ];

  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <div className="informacoes-page">
      <div className="page-header">
        <h1>Informações sobre Saúde Masculina</h1>
        <p>
          Conhecimento é poder: acesse informações confiáveis sobre bem-estar e
          saúde
        </p>
      </div>

      <div className="info-intro card">
        <BookOpen size={32} className="intro-icon" />
        <h2>Bem-vindo à Biblioteca de Saúde</h2>
        <p>
          Esta seção oferece informações baseadas em evidências sobre saúde
          masculina, cobrindo aspectos físicos, mentais, sociais, emocionais e
          espirituais do bem-estar.
        </p>
        <p className="disclaimer">
          <strong>Importante:</strong> Estas informações são educacionais e não
          substituem consultas médicas. Sempre consulte profissionais de saúde
          para orientações personalizadas.
        </p>
      </div>

      <div className="categorias-grid">
        {categorias.map((categoria) => {
          const Icon = categoria.icon;
          const isOpen = openSection === categoria.id;

          return (
            <div key={categoria.id} className="categoria-card">
              <button
                className="categoria-header"
                onClick={() => toggleSection(categoria.id)}
                style={{ borderLeftColor: categoria.cor }}
              >
                <div className="categoria-title">
                  <div
                    className="categoria-icon"
                    style={{
                      background: `${categoria.cor}15`,
                      color: categoria.cor,
                    }}
                  >
                    <Icon size={24} />
                  </div>
                  <h3>{categoria.titulo}</h3>
                </div>
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>

              {isOpen && (
                <div className="categoria-conteudo">
                  {categoria.conteudo.map((item, index) => (
                    <div key={index} className="info-item">
                      <h4>{item.titulo}</h4>
                      <p>{item.texto}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="card recursos-adicionais">
        <h2>Recursos Adicionais</h2>
        <ul>
          <li>Consulte regularmente seu médico de confiança</li>
          <li>Mantenha um calendário de exames preventivos</li>
          <li>Participe de grupos de apoio e comunidades de saúde</li>
          <li>Mantenha-se informado sobre atualizações em saúde masculina</li>
          <li>Compartilhe informações com familiares e amigos</li>
        </ul>
      </div>
    </div>
  );
};

export default Informacoes;
