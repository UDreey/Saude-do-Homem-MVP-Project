import { useState, useEffect } from "react";

const STORAGE_KEY = "health-on-time-atividades";

export const useAtividades = () => {
  const [atividades, setAtividades] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(atividades));
  }, [atividades]);

  const adicionarAtividade = (atividade) => {
    const novaAtividade = {
      ...atividade,
      id: Date.now().toString(),
    };
    setAtividades([...atividades, novaAtividade]);
  };

  const removerAtividade = (id) => {
    setAtividades(atividades.filter((atividade) => atividade.id !== id));
  };

  const calcularEstatisticas = () => {
    const totalAtividades = atividades.length;
    const totalMinutos = atividades.reduce(
      (sum, a) => sum + (a.duracao || 0),
      0
    );

    const hoje = new Date();
    const inicioSemana = new Date(hoje);
    inicioSemana.setDate(hoje.getDate() - hoje.getDay());
    inicioSemana.setHours(0, 0, 0, 0);

    const atividadesEstaSemana = atividades.filter((a) => {
      const dataAtividade = new Date(a.data);
      return dataAtividade >= inicioSemana;
    }).length;

    return {
      totalAtividades,
      totalMinutos,
      atividadesEstaSemana,
    };
  };

  const estatisticas = calcularEstatisticas();

  return {
    atividades,
    adicionarAtividade,
    removerAtividade,
    estatisticas,
  };
};
