import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, Mic, AlertTriangle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import "./ChatSaude.css";

const ChatSaude = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Olá! Como posso ajudar você hoje?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simular resposta inteligente do bot
    setTimeout(() => {
      const userText = inputValue.toLowerCase();
      let botText = "";

      // Respostas baseadas em palavras-chave
      if (userText.includes("dor") || userText.includes("sintoma")) {
        botText =
          "Entendo que você está sentindo algum desconforto. É importante observar a intensidade, duração e localização dos sintomas. Para uma avaliação adequada, recomendo consultar um médico. Enquanto isso, mantenha-se hidratado e evite atividades que possam agravar o desconforto.";
      } else if (
        userText.includes("exame") ||
        userText.includes("preventivo")
      ) {
        botText =
          "Os exames preventivos são fundamentais para a saúde masculina. Recomendo exames regulares como PSA (a partir dos 50 anos), hemograma completo, glicemia, colesterol e pressão arterial. Você pode gerenciar seus exames na seção 'Exames' do sistema.";
      } else if (
        userText.includes("alimentação") ||
        userText.includes("dieta") ||
        userText.includes("nutrição")
      ) {
        botText =
          "Uma alimentação balanceada é essencial para a saúde. Priorize frutas, vegetais, proteínas magras e grãos integrais. Evite alimentos ultraprocessados e mantenha-se hidratado. Consulte a seção 'Educação em Saúde' para mais dicas nutricionais.";
      } else if (
        userText.includes("exercício") ||
        userText.includes("atividade física") ||
        userText.includes("treino")
      ) {
        botText =
          "A prática regular de exercícios físicos traz diversos benefícios: melhora cardiovascular, fortalecimento muscular, controle de peso e bem-estar mental. Recomendo pelo menos 150 minutos de atividade moderada por semana. Registre suas atividades na seção 'Atividades'.";
      } else if (
        userText.includes("estresse") ||
        userText.includes("ansiedade") ||
        userText.includes("mental")
      ) {
        botText =
          "A saúde mental é tão importante quanto a física. Técnicas como meditação, respiração profunda e atividades relaxantes podem ajudar. Se os sintomas persistirem, considere buscar apoio profissional. A seção 'Saúde Mental' oferece recursos e informações úteis.";
      } else if (
        userText.includes("medicamento") ||
        userText.includes("remédio")
      ) {
        botText =
          "É importante seguir as orientações médicas quanto ao uso de medicamentos. Nunca se automedique e sempre descarte medicamentos vencidos nos pontos de coleta adequados. Você pode encontrar pontos de coleta na seção 'Pontos de Coleta'.";
      } else {
        botText =
          "Obrigado pela sua mensagem. Posso ajudar com informações sobre exames preventivos, atividades físicas, nutrição, saúde mental e descarte correto de medicamentos. Para uma avaliação médica específica, recomendo consultar um profissional de saúde. Como posso ajudar você hoje?";
      }

      const botResponse = {
        id: messages.length + 2,
        text: botText,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="chat-saude-page">
      <div className="chat-header">
        <h1>Chat de Saúde</h1>
        <p>Converse comigo sobre seus sintomas e receba orientações iniciais</p>
      </div>

      <Card className="chat-container">
        <CardContent className="p-0">
          <div className="chat-messages">
            {messages.map((message) => (
              <div
                key={message.id}
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
              >
                <Send size={20} />
              </Button>
            </div>
            <div className="chat-warning">
              <AlertTriangle size={16} />
              <span>
                Este chat não substitui consulta médica. Em emergências, procure
                ajuda imediatamente.
              </span>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatSaude;
