import { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  Send,
  Mic,
  AlertTriangle,
  Sparkles,
  Heart,
  Activity,
  BookOpen,
  Pill,
  User,
  Users,
  Zap,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import "./ChatSaude.css";

const ChatSaude = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Lista de personagens disponíveis
  const characters = [
    {
      id: "default",
      name: "Assistente de Saúde",
      avatar: "👨‍⚕️",
      description: "Assistente médico padrão",
      personality: "profissional e informativo",
      greeting:
        "Olá! 👋 Sou seu assistente de saúde. Como posso ajudar você hoje?",
    },
    {
      id: "naruto",
      name: "Naruto Uzumaki",
      avatar: "🍜",
      description: "Ninja da Vila da Folha",
      personality: "entusiasmado, motivador e nunca desiste",
      greeting:
        "Dattebayo! 🍜 Eu sou Naruto Uzumaki! Vou te ajudar a ficar forte e saudável! Acredite em si mesmo!",
    },
    {
      id: "goku",
      name: "Goku",
      avatar: "🐉",
      description: "Guerreiro Sayajin",
      personality: "amigável, otimista e focado em treino",
      greeting:
        "Oi! Eu sou o Goku! 💪 Treinar e se alimentar bem são essenciais para ficar forte! Vamos conversar sobre saúde!",
    },
    {
      id: "luffy",
      name: "Monkey D. Luffy",
      avatar: "🏴‍☠️",
      description: "Capitão dos Piratas do Chapéu de Palha",
      personality: "aventureiro, descontraído e sempre positivo",
      greeting:
        "Shishishi! 🏴‍☠️ Eu sou Luffy! Vamos falar sobre saúde? Comer bem e se exercitar são importantes para uma aventura!",
    },
    {
      id: "ichigo",
      name: "Ichigo Kurosaki",
      avatar: "⚔️",
      description: "Substituído Shinigami",
      personality: "direto, protetor e determinado",
      greeting:
        "Oi. Ichigo aqui. ⚔️ Vou te ajudar com o que precisar sobre saúde. Vamos direto ao ponto.",
    },
    {
      id: "tanjiro",
      name: "Tanjiro Kamado",
      avatar: "🔥",
      description: "Caçador de Demônios",
      personality: "gentil, empático e resiliente",
      greeting:
        "Olá! 🔥 Sou Tanjiro. Cuidar da saúde é como cuidar da família - com dedicação e amor. Como posso ajudar?",
    },
    {
      id: "einstein",
      name: "Albert Einstein",
      avatar: "🧠",
      description: "Físico Teórico",
      personality: "curioso, inteligente e didático",
      greeting:
        "Olá! 🧠 A imaginação é mais importante que o conhecimento. Vamos explorar juntos o universo da saúde!",
    },
    {
      id: "jobs",
      name: "Steve Jobs",
      avatar: "💻",
      description: "Fundador da Apple",
      personality: "inovador, visionário e focado em simplicidade",
      greeting:
        "Olá! 💻 Inovação distingue um líder. Vamos pensar diferente sobre sua saúde e bem-estar!",
    },
    {
      id: "musk",
      name: "Elon Musk",
      avatar: "🚀",
      description: "Empreendedor e Visionário",
      personality: "futurista, direto e focado em soluções",
      greeting:
        "Oi! 🚀 Vamos tornar a saúde mais acessível e eficiente. O que você precisa saber?",
    },
    {
      id: "obama",
      name: "Barack Obama",
      avatar: "🇺🇸",
      description: "Ex-Presidente dos EUA",
      personality: "eloquente, inspirador e equilibrado",
      greeting:
        "Olá! 🇺🇸 Sim, podemos melhorar nossa saúde! Vamos trabalhar juntos para um futuro mais saudável.",
    },
    {
      id: "padre",
      name: "Padre",
      avatar: "⛪",
      description: "Guia Espiritual",
      personality: "compassivo, sábio e acolhedor",
      greeting:
        "Que a paz esteja com você! ⛪ Vamos cuidar da sua saúde física e espiritual. Estou aqui para te ajudar com sabedoria e compaixão. Como posso ajudar?",
    },
    {
      id: "batman",
      name: "Batman",
      avatar: "🦇",
      description: "O Cavaleiro das Trevas",
      personality: "estratégico, disciplinado e protetor",
      greeting:
        "🦇 A saúde é uma responsabilidade. Vou te ajudar a criar um plano para manter seu bem-estar. Vamos começar.",
    },
  ];

  // Inicializar mensagem quando personagem é selecionado
  useEffect(() => {
    if (selectedCharacter && messages.length === 0) {
      const character = characters.find((c) => c.id === selectedCharacter);
      if (character) {
        setMessages([
          {
            id: 1,
            text: character.greeting,
            sender: "bot",
            timestamp: new Date(),
            character: character.name,
          },
        ]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCharacter]);

  // Sugestões rápidas
  const quickSuggestions = [
    { text: "Exames preventivos", icon: Heart },
    { text: "Atividades físicas", icon: Activity },
    { text: "Alimentação saudável", icon: BookOpen },
    { text: "Saúde mental", icon: Sparkles },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Obter personalidade do personagem selecionado
  const getCharacterPersonality = () => {
    if (!selectedCharacter) return null;
    const character = characters.find((c) => c.id === selectedCharacter);
    return character;
  };

  // Função para personalizar respostas baseadas no personagem
  const personalizeResponse = (baseResponse, context) => {
    const character = getCharacterPersonality();
    if (!character) return baseResponse;

    // Personalizações por personagem e contexto
    const personalized = {
      naruto: {
        dor: "Dattebayo! 🍜 Dores são chatas, mas não podemos desistir! Mantenha-se hidratado e descanse. Se persistir, procure um médico! Nunca desista de cuidar da sua saúde!",
        exame:
          "Exames são importantes para ficar forte! Dattebayo! 🍜 Não tenha medo de fazer exames preventivos - é assim que protegemos nossa saúde! Vamos fazer isso juntos!",
        alimentacao:
          "Comer bem é essencial para ficar forte! 🍜 Priorize alimentos nutritivos e evite junk food. Uma boa alimentação te dá energia para enfrentar qualquer desafio!",
        exercicio:
          "Treinar é fundamental! 💪 Comece devagar e vá aumentando! O importante é nunca desistir! Acredite em si mesmo e continue treinando!",
        mental:
          "A saúde mental é tão importante quanto a física! Se estiver se sentindo mal, não tenha vergonha de pedir ajuda! Você não está sozinho! Dattebayo!",
        sono: "Dormir bem é essencial para ficar forte! Dattebayo! 🍜 Mantenha uma rotina de sono regular e descanse bem. Um bom sono te dá energia para enfrentar qualquer desafio!",
        medicamento:
          "Medicamentos são importantes, mas sempre com orientação médica! 🍜 Nunca se automedique! E descarte corretamente os vencidos. Cuidar da saúde é responsabilidade!",
      },
      goku: {
        dor: "Dores são sinal de que algo precisa de atenção! 💪 Descanse, hidrate-se e se persistir, procure um médico. Até os mais fortes precisam cuidar da saúde!",
        exame:
          "Exames são como treinos - essenciais para ficar mais forte! 💪 Não pule os exames preventivos! Eles te ajudam a manter a saúde em dia!",
        alimentacao:
          "Comer bem é fundamental para ter energia! 💪 Priorize proteínas, vegetais e carboidratos bons. Uma boa alimentação te deixa mais forte!",
        exercicio:
          "Vamos treinar! 💪 Comece com exercícios básicos e vá aumentando a intensidade! O importante é ser consistente e nunca parar de treinar!",
        mental:
          "A mente também precisa de treino! 💪 Pratique meditação, respire fundo e mantenha pensamentos positivos. Saúde mental é tão importante quanto física!",
        sono: "Dormir bem é essencial para treinar! 💪 Mantenha horário regular de sono. Um corpo descansado treina melhor e fica mais forte!",
        medicamento:
          "Medicamentos só com orientação médica! 💪 Nunca se automedique! E descarte corretamente os vencidos. Saúde é coisa séria!",
      },
      luffy: {
        dor: "Shishishi! 🏴‍☠️ Dores são chatas, mas vamos superar! Descanse e se cuide. Se não melhorar, procure um médico! Nada pode nos parar!",
        exame:
          "Exames são importantes para a aventura! 🏴‍☠️ Não tenha medo! Fazer exames preventivos é como se preparar para uma grande jornada!",
        alimentacao:
          "Comer bem é essencial! 🏴‍☠️ Priorize alimentos nutritivos e saborosos! Uma boa refeição te dá energia para qualquer aventura!",
        exercicio:
          "Vamos nos exercitar! 🏴‍☠️ Atividades físicas são divertidas! Encontre algo que você goste e se divirta enquanto se exercita!",
        mental:
          "A saúde mental é importante para qualquer aventureiro! 🏴‍☠️ Se estiver se sentindo mal, converse com alguém! Não precisa enfrentar sozinho!",
        sono: "Dormir bem é importante para a aventura! 🏴‍☠️ Mantenha uma boa rotina de sono. Um aventureiro descansado está sempre pronto!",
        medicamento:
          "Medicamentos são sérios! 🏴‍☠️ Só use com orientação médica! E descarte corretamente os vencidos. Cuidar da saúde é parte da aventura!",
      },
      ichigo: {
        dor: "Dores precisam de atenção. Descanse e se cuide. Se persistir, procure um médico. Vamos resolver isso direto.",
        exame:
          "Exames são necessários. Não adie os preventivos. Eles são essenciais para manter a saúde. Vamos fazer isso.",
        alimentacao:
          "Alimentação balanceada é fundamental. Priorize nutrientes e evite excessos. Simples e direto.",
        exercicio:
          "Exercícios são importantes. Seja consistente e mantenha a disciplina. Isso te mantém forte.",
        mental:
          "Saúde mental é séria. Se precisar de ajuda, procure. Não ignore os sinais.",
        sono: "Sono é essencial. Mantenha horário regular. Um corpo descansado funciona melhor.",
        medicamento:
          "Medicamentos só com prescrição médica. Nunca se automedique. Descarte corretamente os vencidos.",
      },
      tanjiro: {
        dor: "Dores são sinal de que precisamos cuidar de nós mesmos. 🔥 Descanse, hidrate-se e procure ajuda se necessário. Cuidar da saúde é um ato de amor.",
        exame:
          "Exames preventivos são uma forma de cuidar de quem amamos. 🔥 Não tenha medo - é um gesto de responsabilidade e amor próprio.",
        alimentacao:
          "Alimentação saudável é cuidar do templo do nosso corpo. 🔥 Priorize alimentos naturais e nutritivos. É um ato de respeito consigo mesmo.",
        exercicio:
          "Exercícios fortalecem corpo e mente. 🔥 Seja dedicado e consistente. Cada treino é um passo para ser melhor.",
        mental:
          "A saúde mental merece tanto cuidado quanto a física. 🔥 Se estiver difícil, busque ajuda. Você não está sozinho.",
        sono: "O sono é um ato de cuidado. 🔥 Mantenha horário regular e ambiente adequado. Descansar bem é cuidar de si mesmo.",
        medicamento:
          "Medicamentos requerem responsabilidade. 🔥 Siga orientações médicas. Descarte corretamente os vencidos. É um gesto de cuidado.",
      },
      einstein: {
        dor: "A dor é um sinal físico que nosso corpo nos envia. 🧠 Observe os sintomas, mantenha-se hidratado e, se persistir, consulte um médico. A ciência nos ensina a ouvir nosso corpo.",
        exame:
          "Os exames preventivos são baseados em evidências científicas. 🧠 Eles nos permitem detectar problemas antes que se tornem sérios. É pura ciência aplicada à saúde.",
        alimentacao:
          "A nutrição é uma ciência fascinante! 🧠 Alimentos balanceados fornecem os nutrientes que nosso corpo precisa para funcionar otimamente.",
        exercicio:
          "A física nos ensina que movimento gera energia. 🧠 Exercícios regulares melhoram a função cardiovascular e mental. É matemática aplicada ao bem-estar.",
        mental:
          "A mente é um universo complexo. 🧠 Cuidar da saúde mental é tão importante quanto cuidar da física. Meditação e exercícios ajudam a manter o equilíbrio.",
        sono: "O sono é fundamental para a função cerebral. 🧠 Mantenha horário regular. Um cérebro descansado funciona melhor e processa informações com mais eficiência.",
        medicamento:
          "Medicamentos são baseados em ciência. 🧠 Siga orientações médicas rigorosamente. Descarte corretamente os vencidos. É responsabilidade científica.",
      },
      jobs: {
        dor: "Vamos pensar diferente sobre essa dor. 💻 Observe os sintomas, descanse e, se necessário, procure ajuda. Simplicidade e foco são fundamentais.",
        exame:
          "Exames preventivos são investimentos em saúde. 💻 Fazer check-ups regulares é como fazer manutenção preventiva - evita problemas maiores depois.",
        alimentacao:
          "Simplicidade na alimentação. 💻 Priorize alimentos naturais, evite processados. Menos é mais quando se trata de nutrição.",
        exercicio:
          "Exercícios são essenciais para manter a mente afiada. 💻 Seja consistente e focado. A disciplina gera resultados.",
        mental:
          "A saúde mental é fundamental para a inovação. 💻 Pratique meditação, respire fundo. Uma mente saudável é uma mente produtiva.",
        sono: "O sono é essencial para a criatividade. 💻 Mantenha horário regular. Uma mente descansada inova melhor. Simplicidade e foco.",
        medicamento:
          "Medicamentos requerem disciplina. 💻 Siga orientações médicas. Descarte corretamente os vencidos. É parte do sistema.",
      },
      musk: {
        dor: "Vamos otimizar seu bem-estar. 🚀 Descanse, hidrate-se e, se persistir, procure um médico. Eficiência também se aplica à saúde.",
        exame:
          "Exames preventivos são tecnologia aplicada à saúde. 🚀 Fazer check-ups regulares é como fazer manutenção preventiva - evita problemas futuros.",
        alimentacao:
          "Nutrição otimizada. 🚀 Priorize alimentos nutritivos e evite processados. Eficiência nutricional é chave.",
        exercicio:
          "Exercícios são essenciais para performance. 🚀 Seja consistente e progressivo. O corpo é uma máquina que precisa de manutenção.",
        mental:
          "Saúde mental é performance mental. 🚀 Pratique meditação, durma bem. Uma mente otimizada é mais produtiva.",
        sono: "O sono otimiza a performance. 🚀 Mantenha horário regular. Um corpo descansado é mais eficiente. Eficiência também se aplica ao descanso.",
        medicamento:
          "Medicamentos são tecnologia de saúde. 🚀 Siga orientações médicas. Descarte corretamente os vencidos. Otimização também se aplica à saúde.",
      },
      obama: {
        dor: "Vamos cuidar dessa dor juntos. 🇺🇸 Descanse, mantenha-se hidratado e, se necessário, procure ajuda médica. Sim, podemos melhorar sua saúde!",
        exame:
          "Exames preventivos são investimentos em seu futuro. 🇺🇸 Fazer check-ups regulares é responsabilidade consigo mesmo. Vamos trabalhar juntos nisso.",
        alimentacao:
          "Alimentação saudável é um direito. 🇺🇸 Priorize alimentos nutritivos e balanceados. Cuidar de si é cuidar da comunidade.",
        exercicio:
          "Exercícios são fundamentais para o bem-estar. 🇺🇸 Seja consistente e progressivo. Juntos podemos melhorar sua saúde!",
        mental:
          "A saúde mental é prioridade. 🇺🇸 Se estiver difícil, busque ajuda. Você não está sozinho. Vamos trabalhar juntos nisso.",
        sono: "O sono é fundamental para o bem-estar. 🇺🇸 Mantenha horário regular. Juntos podemos melhorar sua qualidade de sono!",
        medicamento:
          "Medicamentos são importantes. 🇺🇸 Siga orientações médicas. Descarte corretamente os vencidos. Vamos trabalhar juntos nisso.",
      },
      padre: {
        dor: "Que Deus te abençoe! ⛪ A dor é um sinal de que precisamos cuidar do templo que Ele nos deu. Descanse, hidrate-se e, se necessário, procure um médico. Reze e cuide-se.",
        exame:
          "Exames preventivos são uma forma de cuidar do dom da vida. ⛪ Fazer check-ups regulares é responsabilidade com o corpo que Deus nos confiou.",
        alimentacao:
          "Alimentação saudável é cuidar do templo do Espírito Santo. ⛪ Priorize alimentos naturais e nutritivos. É um ato de gratidão e respeito.",
        exercicio:
          "Exercícios fortalecem o corpo que Deus nos deu. ⛪ Seja dedicado e consistente. Cuidar do corpo é também cuidar da alma.",
        mental:
          "A saúde mental é tão importante quanto a espiritual. ⛪ Se estiver difícil, busque ajuda e também reze. Deus cuida de nós, mas também precisamos cuidar de nós mesmos.",
        sono: "O sono é um dom de Deus. ⛪ Mantenha horário regular e reze antes de dormir. Descansar bem é cuidar do templo que Ele nos deu.",
        medicamento:
          "Medicamentos são ferramentas de cuidado. ⛪ Siga orientações médicas e reze pela saúde. Descarte corretamente os vencidos. É responsabilidade com o dom da vida.",
      },
      batman: {
        dor: "A dor é um sinal que não pode ser ignorado. 🦇 Analise os sintomas, descanse e, se persistir, procure um médico. Disciplina e atenção são essenciais.",
        exame:
          "Exames preventivos são parte do plano. 🦇 Fazer check-ups regulares é estratégia preventiva. Não deixe para depois.",
        alimentacao:
          "Nutrição é parte da estratégia. 🦇 Alimentos balanceados mantêm o corpo preparado. Disciplina alimentar é fundamental.",
        exercicio:
          "Treino é essencial. 🦇 Seja consistente e progressivo. Cada sessão te torna mais forte e preparado.",
        mental:
          "A mente precisa de treino tanto quanto o corpo. 🦇 Pratique meditação, mantenha foco. Uma mente disciplinada é uma mente forte.",
        sono: "O sono é parte do treino. 🦇 Mantenha horário regular, ambiente adequado. Um corpo descansado é um corpo preparado.",
        medicamento:
          "Medicamentos requerem disciplina. 🦇 Siga orientações médicas rigorosamente. Descarte corretamente os vencidos. É parte do plano.",
      },
    };

    const charResponses = personalized[character.id];
    if (charResponses && charResponses[context]) {
      return charResponses[context];
    }
    return baseResponse;
  };

  // Base de conhecimento expandida com personalidade do personagem
  const getBotResponse = (userText) => {
    const text = userText.toLowerCase();
    const character = getCharacterPersonality();
    const isAnime =
      character &&
      ["naruto", "goku", "luffy", "ichigo", "tanjiro"].includes(character.id);
    const isFamous =
      character &&
      ["einstein", "jobs", "musk", "obama", "padre"].includes(character.id);

    // Dores e sintomas
    if (
      text.includes("dor") ||
      text.includes("sintoma") ||
      text.includes("desconforto")
    ) {
      if (text.includes("cabeça") || text.includes("cabeca")) {
        return {
          text: "Dores de cabeça podem ter várias causas. Mantenha-se hidratado, descanse em ambiente silencioso e escuro. Se a dor persistir por mais de 48 horas ou for muito intensa, procure um médico. Evite automedicação sem orientação profissional.",
          suggestions: [
            "Quando devo procurar um médico?",
            "Como prevenir dores de cabeça?",
          ],
        };
      }
      if (text.includes("peito") || text.includes("torax")) {
        return {
          text: "⚠️ Dores no peito requerem atenção imediata. Se a dor for intensa, acompanhada de falta de ar, suor ou náusea, procure atendimento de emergência imediatamente. Para dores leves, pode ser relacionada a ansiedade ou tensão muscular.",
          suggestions: ["Sintomas de infarto", "Quando é emergência?"],
        };
      }
      if (
        text.includes("barriga") ||
        text.includes("abdomen") ||
        text.includes("estomago")
      ) {
        return {
          text: "Dores abdominais podem ter diversas causas. Observe se há febre, vômitos ou mudanças nos hábitos intestinais. Mantenha-se hidratado e evite alimentos pesados. Se persistir por mais de 24 horas, consulte um médico.",
          suggestions: [
            "Alimentação para dores abdominais",
            "Quando procurar ajuda?",
          ],
        };
      }
      const baseText =
        "Entendo que você está sentindo algum desconforto. É importante observar a intensidade, duração e localização dos sintomas. Para uma avaliação adequada, recomendo consultar um médico. Enquanto isso, mantenha-se hidratado e evite atividades que possam agravar o desconforto.";
      return {
        text: personalizeResponse(baseText, "dor"),
        suggestions: [
          "Como descrever sintomas ao médico?",
          "Quando procurar ajuda médica?",
        ],
      };
    }

    // Exames preventivos
    if (
      text.includes("exame") ||
      text.includes("preventivo") ||
      text.includes("check-up")
    ) {
      if (text.includes("psa") || text.includes("prostata")) {
        return {
          text: "O exame de PSA (Antígeno Prostático Específico) é recomendado para homens a partir dos 50 anos, ou 45 anos se houver histórico familiar. É importante fazer o exame anualmente junto com o toque retal. Você pode agendar e gerenciar seus exames na seção 'Exames' do sistema.",
          suggestions: [
            "Quais outros exames são importantes?",
            "Como preparar para exames?",
          ],
        };
      }
      if (text.includes("sangue") || text.includes("hemograma")) {
        return {
          text: "O hemograma completo avalia células do sangue e pode detectar anemia, infecções e outras condições. Recomenda-se fazer anualmente. Outros exames importantes: glicemia, colesterol, triglicerídeos, função hepática e renal.",
          suggestions: [
            "Preparação para exames de sangue",
            "Entender resultados de exames",
          ],
        };
      }
      const baseText =
        "Os exames preventivos são fundamentais para a saúde masculina. Recomendo exames regulares como PSA (a partir dos 50 anos), hemograma completo, glicemia, colesterol, pressão arterial, função hepática e renal. Você pode gerenciar seus exames na seção 'Exames' do sistema.";
      return {
        text: personalizeResponse(baseText, "exame"),
        suggestions: [
          "Quais exames fazer por idade?",
          "Como organizar meus exames?",
        ],
      };
    }

    // Alimentação
    if (
      text.includes("alimentação") ||
      text.includes("alimentacao") ||
      text.includes("dieta") ||
      text.includes("nutrição") ||
      text.includes("nutricao") ||
      text.includes("comida")
    ) {
      if (text.includes("perder peso") || text.includes("emagrecer")) {
        return {
          text: "Para perder peso de forma saudável: 1) Crie um déficit calórico moderado (500-750 kcal/dia), 2) Priorize proteínas magras, vegetais e grãos integrais, 3) Evite alimentos ultraprocessados, 4) Mantenha-se hidratado, 5) Combine com exercícios regulares. Consulte um nutricionista para um plano personalizado.",
          suggestions: ["Receitas saudáveis", "Como calcular calorias?"],
        };
      }
      if (
        text.includes("ganhar massa") ||
        text.includes("musculo") ||
        text.includes("músculo")
      ) {
        return {
          text: "Para ganhar massa muscular: 1) Consuma proteínas adequadas (1,6-2,2g por kg de peso), 2) Faça treino de força regularmente, 3) Mantenha superávit calórico moderado, 4) Durma bem (7-9h), 5) Hidrate-se adequadamente. Combine com exercícios na seção 'Atividades'.",
          suggestions: [
            "Alimentos ricos em proteína",
            "Treino para hipertrofia",
          ],
        };
      }
      const baseText =
        "Uma alimentação balanceada é essencial para a saúde. Priorize: frutas e vegetais (5 porções/dia), proteínas magras (peixe, frango, ovos), grãos integrais, gorduras saudáveis (azeite, abacate, castanhas). Evite alimentos ultraprocessados, açúcares refinados e excesso de sal. Consulte a seção 'Educação em Saúde' para mais dicas.";
      return {
        text: personalizeResponse(baseText, "alimentacao"),
        suggestions: ["Receitas saudáveis", "Plano alimentar semanal"],
      };
    }

    // Exercícios
    if (
      text.includes("exercício") ||
      text.includes("exercicio") ||
      text.includes("atividade física") ||
      text.includes("atividade fisica") ||
      text.includes("treino") ||
      text.includes("academia")
    ) {
      if (
        text.includes("iniciante") ||
        text.includes("começar") ||
        text.includes("comecar")
      ) {
        return {
          text: "Para iniciantes: 1) Comece com 20-30 minutos, 3x por semana, 2) Escolha atividades que goste (caminhada, natação, ciclismo), 3) Aqueça antes e alongue depois, 4) Aumente gradualmente a intensidade, 5) Descanse entre os treinos. O ideal é 150 minutos de atividade moderada por semana.",
          suggestions: [
            "Rotina de exercícios para iniciantes",
            "Como evitar lesões?",
          ],
        };
      }
      if (text.includes("cardio") || text.includes("cardiovascular")) {
        return {
          text: "Exercícios cardiovasculares melhoram a saúde do coração, queimam calorias e aumentam a resistência. Exemplos: caminhada rápida, corrida, ciclismo, natação, dança. Recomendação: 150 minutos de moderada ou 75 minutos de intensa por semana.",
          suggestions: ["Como melhorar resistência?", "Treino HIIT"],
        };
      }
      const baseText =
        "A prática regular de exercícios físicos traz diversos benefícios: melhora cardiovascular, fortalecimento muscular, controle de peso, saúde óssea, melhora do humor e bem-estar mental. Recomendo pelo menos 150 minutos de atividade moderada por semana. Registre suas atividades na seção 'Atividades'.";
      return {
        text: personalizeResponse(baseText, "exercicio"),
        suggestions: ["Tipos de exercícios", "Como criar uma rotina?"],
      };
    }

    // Saúde mental
    if (
      text.includes("estresse") ||
      text.includes("stress") ||
      text.includes("ansiedade") ||
      text.includes("depressão") ||
      text.includes("depressao") ||
      text.includes("mental")
    ) {
      if (text.includes("ansiedade") || text.includes("nervoso")) {
        return {
          text: "Para gerenciar ansiedade: 1) Pratique respiração profunda (4-7-8), 2) Faça exercícios regulares, 3) Mantenha rotina de sono, 4) Evite cafeína em excesso, 5) Pratique meditação ou mindfulness. Se os sintomas forem intensos ou persistentes, busque ajuda profissional. A seção 'Saúde Mental' tem mais recursos.",
          suggestions: ["Técnicas de respiração", "Exercícios de mindfulness"],
        };
      }
      if (
        text.includes("depressão") ||
        text.includes("depressao") ||
        text.includes("triste")
      ) {
        return {
          text: "Se você está se sentindo triste ou desanimado, é importante buscar ajuda. Converse com pessoas de confiança, mantenha rotina, faça exercícios leves, exponha-se à luz solar. Se os sentimentos persistirem por mais de 2 semanas, procure um psicólogo ou psiquiatra. Você não está sozinho.",
          suggestions: ["Onde buscar ajuda?", "Sinais de alerta"],
        };
      }
      const baseText =
        "A saúde mental é tão importante quanto a física. Técnicas como meditação, respiração profunda, exercícios físicos, sono adequado e conexões sociais podem ajudar. Se os sintomas persistirem, considere buscar apoio profissional. A seção 'Saúde Mental' oferece recursos e informações úteis.";
      return {
        text: personalizeResponse(baseText, "mental"),
        suggestions: ["Técnicas de relaxamento", "Como melhorar o sono?"],
      };
    }

    // Medicamentos
    if (
      text.includes("medicamento") ||
      text.includes("remédio") ||
      text.includes("remedio") ||
      text.includes("pílula") ||
      text.includes("pilula")
    ) {
      const baseText =
        "É importante seguir as orientações médicas quanto ao uso de medicamentos. Nunca se automedique, especialmente com antibióticos. Sempre descarte medicamentos vencidos nos pontos de coleta adequados para evitar contaminação. Você pode encontrar pontos de coleta na seção 'Pontos de Coleta'.";
      return {
        text: personalizeResponse(baseText, "medicamento"),
        suggestions: [
          "Como descartar medicamentos?",
          "Interações medicamentosas",
        ],
      };
    }

    // Sono
    if (
      text.includes("sono") ||
      text.includes("dormir") ||
      text.includes("insônia") ||
      text.includes("insonia")
    ) {
      const baseText =
        "Para melhorar o sono: 1) Mantenha horário regular, 2) Crie rotina antes de dormir, 3) Evite telas 1h antes, 4) Mantenha quarto escuro e fresco, 5) Evite cafeína após 14h, 6) Faça exercícios, mas não muito tarde. Adultos precisam de 7-9 horas de sono por noite.";
      return {
        text: personalizeResponse(baseText, "sono"),
        suggestions: ["Higiene do sono", "Como tratar insônia?"],
      };
    }

    // Pressão arterial
    if (
      text.includes("pressão") ||
      text.includes("pressao") ||
      text.includes("hipertensão") ||
      text.includes("hipertensao")
    ) {
      return {
        text: "A pressão arterial normal é abaixo de 120/80 mmHg. Para controlar: 1) Reduza sal na alimentação, 2) Faça exercícios regulares, 3) Mantenha peso saudável, 4) Evite álcool e tabaco, 5) Gerencie estresse, 6) Meça regularmente. Se estiver alta, consulte um médico.",
        suggestions: ["Alimentos que ajudam", "Como medir pressão?"],
      };
    }

    // Diabetes
    if (
      text.includes("diabetes") ||
      text.includes("glicemia") ||
      text.includes("açúcar") ||
      text.includes("acucar")
    ) {
      return {
        text: "Para prevenir diabetes tipo 2: 1) Mantenha peso saudável, 2) Faça exercícios regulares, 3) Alimentação balanceada (evite açúcares refinados), 4) Durma bem, 5) Gerencie estresse. Se tiver histórico familiar, faça exames regulares de glicemia.",
        suggestions: ["Sintomas de diabetes", "Alimentação para diabéticos"],
      };
    }

    // Saúde sexual
    if (
      text.includes("sexual") ||
      text.includes("impotência") ||
      text.includes("disfunção") ||
      text.includes("disfuncao") ||
      text.includes("ereção") ||
      text.includes("erecao")
    ) {
      return {
        text: "Problemas sexuais podem ter causas físicas ou psicológicas. Fatores comuns: estresse, ansiedade, problemas de saúde (diabetes, pressão alta), medicamentos, álcool. É importante consultar um urologista para avaliação adequada. Manter estilo de vida saudável ajuda na prevenção.",
        suggestions: ["Quando procurar ajuda?", "Fatores de risco"],
      };
    }

    // Saudação
    if (
      text.includes("olá") ||
      text.includes("ola") ||
      text.includes("oi") ||
      text.includes("bom dia") ||
      text.includes("boa tarde") ||
      text.includes("boa noite")
    ) {
      let greeting =
        "Olá! 👋 Fico feliz em ajudar! Posso orientar sobre exames preventivos, atividades físicas, alimentação, saúde mental, medicamentos e muito mais. Sobre o que você gostaria de saber?";

      if (character) {
        if (character.id === "naruto") {
          greeting =
            "Oi! Dattebayo! 🍜 Vamos falar sobre saúde! Eu sempre acredito que podemos melhorar! Sobre o que você quer saber?";
        } else if (character.id === "goku") {
          greeting =
            "Oi! 💪 Treinar e comer bem são fundamentais! Vamos conversar sobre como ficar mais forte e saudável!";
        } else if (character.id === "luffy") {
          greeting =
            "Shishishi! 🏴‍☠️ Vamos falar sobre saúde! Comer bem e se exercitar são importantes para uma grande aventura!";
        } else if (character.id === "ichigo") {
          greeting =
            "Oi. Vamos direto ao ponto. Sobre o que você precisa saber sobre saúde?";
        } else if (character.id === "tanjiro") {
          greeting =
            "Olá! 🔥 Cuidar da saúde é essencial. Como posso te ajudar hoje?";
        } else if (character.id === "einstein") {
          greeting =
            "Olá! 🧠 A saúde é uma questão de equilíbrio e conhecimento. Sobre o que gostaria de aprender?";
        } else if (character.id === "jobs") {
          greeting =
            "Olá! 💻 Vamos pensar diferente sobre sua saúde. Simplicidade e foco são fundamentais. Como posso ajudar?";
        } else if (character.id === "musk") {
          greeting =
            "Oi! 🚀 Vamos tornar sua saúde mais eficiente. O que você precisa saber?";
        } else if (character.id === "obama") {
          greeting =
            "Olá! 🇺🇸 Sim, podemos melhorar nossa saúde juntos! Sobre o que você gostaria de conversar?";
        } else if (character.id === "padre") {
          greeting =
            "Que a paz esteja com você! ⛪ A saúde é um dom precioso. Vamos cuidar do corpo e da alma com sabedoria. Como posso ajudar?";
        } else if (character.id === "batman") {
          greeting =
            "🦇 A saúde requer disciplina e planejamento. Vou te ajudar a criar estratégias para seu bem-estar. O que você precisa?";
        }
      }

      return {
        text: greeting,
        suggestions: [
          "Exames preventivos",
          "Atividades físicas",
          "Alimentação saudável",
        ],
      };
    }

    // Despedida
    if (
      text.includes("tchau") ||
      text.includes("até logo") ||
      text.includes("ate logo") ||
      text.includes("obrigado") ||
      text.includes("obrigada")
    ) {
      return {
        text: "Foi um prazer ajudar! 😊 Lembre-se: este chat não substitui consulta médica. Para questões específicas, sempre consulte um profissional de saúde. Cuide-se!",
        suggestions: [],
      };
    }

    // Resposta padrão com personalidade
    let defaultResponse =
      "Obrigado pela sua mensagem! Posso ajudar com informações sobre: exames preventivos, atividades físicas, nutrição, saúde mental, descarte de medicamentos, sono, pressão arterial e muito mais. Para uma avaliação médica específica, recomendo consultar um profissional de saúde. Sobre o que você gostaria de saber?";

    if (character) {
      if (character.id === "naruto") {
        defaultResponse =
          "Dattebayo! Não desista! Posso ajudar com exames, exercícios, alimentação e muito mais! Nunca é tarde para cuidar da saúde! Sobre o que você quer saber?";
      } else if (character.id === "goku") {
        defaultResponse =
          "Vamos treinar e ficar mais fortes! Posso ajudar com exercícios, alimentação saudável, exames e tudo relacionado à saúde! O que você quer saber?";
      } else if (character.id === "luffy") {
        defaultResponse =
          "Shishishi! Vamos embarcar nessa aventura pela saúde! Posso ajudar com exercícios, comida saudável, exames e muito mais! O que você quer saber?";
      } else if (character.id === "ichigo") {
        defaultResponse =
          "Vamos direto ao ponto. Posso ajudar com exames, exercícios, alimentação e saúde mental. O que você precisa?";
      } else if (character.id === "tanjiro") {
        defaultResponse =
          "Vamos cuidar da sua saúde com dedicação! Posso ajudar com exames, exercícios, alimentação e bem-estar. Como posso ajudar?";
      } else if (character.id === "einstein") {
        defaultResponse =
          "A curiosidade sobre a saúde é fundamental! Posso compartilhar conhecimento sobre exames, exercícios, nutrição e bem-estar. Sobre o que gostaria de aprender?";
      } else if (character.id === "jobs") {
        defaultResponse =
          "Vamos pensar diferente sobre sua saúde. Posso ajudar com informações sobre exames, exercícios, nutrição e bem-estar. Foco e simplicidade. Como posso ajudar?";
      } else if (character.id === "musk") {
        defaultResponse =
          "Vamos tornar sua saúde mais eficiente. Posso ajudar com exames, exercícios, nutrição e otimização do bem-estar. O que você precisa?";
      } else if (character.id === "obama") {
        defaultResponse =
          "Sim, podemos melhorar nossa saúde juntos! Posso ajudar com exames, exercícios, nutrição e bem-estar. Sobre o que você gostaria de conversar?";
      } else if (character.id === "padre") {
        defaultResponse =
          "Que Deus te abençoe! ⛪ A saúde é um dom precioso que devemos cuidar. Posso ajudar com informações sobre exames, exercícios, nutrição e bem-estar físico e espiritual. Cuidar do corpo é também cuidar do templo que Deus nos deu. Sobre o que você gostaria de saber?";
      } else if (character.id === "batman") {
        defaultResponse =
          "🦇 A saúde requer disciplina e estratégia. Posso ajudar com exames, treinos, nutrição e planejamento de bem-estar. Vamos criar um plano. O que você precisa?";
      }
    }

    return {
      text: defaultResponse,
      suggestions: [
        "Exames preventivos",
        "Atividades físicas",
        "Alimentação",
        "Saúde mental",
      ],
    };
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");
    setIsTyping(true);

    // Simular resposta inteligente do bot
    setTimeout(() => {
      const response = getBotResponse(currentInput);

      const character = getCharacterPersonality();
      const botResponse = {
        id: messages.length + 2,
        text: response.text,
        sender: "bot",
        timestamp: new Date(),
        suggestions: response.suggestions || [],
        character: character?.name || "Assistente",
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickSuggestion = (suggestion) => {
    setInputValue(suggestion);
  };

  // Mostrar sugestões rápidas apenas na primeira mensagem
  const showQuickSuggestions = messages.length === 1;

  return (
    <div className="chat-saude-page">
      <div className="chat-header">
        <h1>Chat de Saúde</h1>
        <p>Escolha com quem conversar e receba orientações sobre saúde</p>
      </div>

      {/* Seletor de Personagens */}
      {!selectedCharacter && (
        <Card className="character-selector-card mb-4">
          <CardContent className="pt-6">
            <div className="character-selector">
              <h3 className="character-selector-title">
                <Users size={20} />
                Escolha com quem conversar
              </h3>
              <div className="characters-grid">
                {characters.map((character) => (
                  <button
                    key={character.id}
                    className="character-card"
                    onClick={() => {
                      setSelectedCharacter(character.id);
                      setMessages([]);
                    }}
                  >
                    <div className="character-avatar">{character.avatar}</div>
                    <div className="character-info">
                      <h4>{character.name}</h4>
                      <p>{character.description}</p>
                    </div>
                    <Zap size={16} className="character-select-icon" />
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mostrar personagem selecionado */}
      {selectedCharacter && (
        <div className="selected-character-banner">
          <div className="selected-character-info">
            {(() => {
              const char = characters.find((c) => c.id === selectedCharacter);
              return (
                <>
                  <span className="selected-character-avatar">
                    {char?.avatar}
                  </span>
                  <span className="selected-character-name">
                    Conversando com {char?.name}
                  </span>
                </>
              );
            })()}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedCharacter(null);
              setMessages([]);
            }}
            className="change-character-btn"
          >
            Trocar
          </Button>
        </div>
      )}

      {selectedCharacter && (
        <Card className="chat-container">
          <CardContent className="p-0">
            <div className="chat-messages">
              {messages.map((message) => (
                <div key={message.id}>
                  <div
                    className={`message ${
                      message.sender === "user" ? "user-message" : "bot-message"
                    }`}
                  >
                    <div className="message-content">
                      <p>{message.text}</p>
                      <span className="message-time">
                        {message.timestamp.toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                  {/* Sugestões rápidas após resposta do bot */}
                  {message.sender === "bot" &&
                    message.suggestions &&
                    message.suggestions.length > 0 && (
                      <div className="message-suggestions">
                        {message.suggestions.map((suggestion, idx) => (
                          <Button
                            key={idx}
                            variant="outline"
                            size="sm"
                            className="suggestion-button"
                            onClick={() => {
                              setInputValue(suggestion);
                              setTimeout(() => {
                                const form = document.querySelector(
                                  ".chat-input-container form"
                                );
                                if (form) {
                                  const event = new Event("submit", {
                                    bubbles: true,
                                    cancelable: true,
                                  });
                                  form.dispatchEvent(event);
                                }
                              }, 100);
                            }}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                </div>
              ))}
              {isTyping && (
                <div className="message bot-message">
                  <div className="message-content typing">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Sugestões rápidas iniciais */}
            {showQuickSuggestions && (
              <div className="quick-suggestions-container">
                <p className="quick-suggestions-label">Tópicos populares:</p>
                <div className="quick-suggestions">
                  {quickSuggestions.map((suggestion, idx) => {
                    const Icon = suggestion.icon;
                    return (
                      <Button
                        key={idx}
                        variant="outline"
                        className="quick-suggestion-button"
                        onClick={() => handleQuickSuggestion(suggestion.text)}
                      >
                        <Icon size={16} />
                        {suggestion.text}
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}

            <form onSubmit={handleSend} className="chat-input-container">
              <div className="chat-input-wrapper">
                <Input
                  type="text"
                  className="chat-input flex-1"
                  placeholder="Descreva seus sintomas ou faça uma pergunta sobre saúde..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="chat-button-icon"
                  title="Gravar áudio"
                >
                  <Mic size={20} />
                </Button>
                <Button
                  type="submit"
                  size="icon"
                  className="chat-button-send"
                  title="Enviar"
                  disabled={!inputValue.trim()}
                >
                  <Send size={20} />
                </Button>
              </div>
              <div className="chat-warning">
                <AlertTriangle size={16} />
                <span>
                  Este chat não substitui consulta médica. Em emergências,
                  procure ajuda imediatamente.
                </span>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ChatSaude;
