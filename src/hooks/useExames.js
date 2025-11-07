import { useState, useEffect } from "react";

const STORAGE_KEY = "health-on-time-exames";

export const useExames = () => {
  const [exames, setExames] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(exames));
  }, [exames]);

  const adicionarExame = (exame) => {
    const novoExame = {
      ...exame,
      id: Date.now().toString(),
      data: exame.data,
    };
    setExames([...exames, novoExame]);
  };

  const removerExame = (id) => {
    setExames(exames.filter((exame) => exame.id !== id));
  };

  const marcarRealizado = (id) => {
    setExames(
      exames.map((exame) =>
        exame.id === id ? { ...exame, realizado: true } : exame
      )
    );
  };

  const proximosExames = exames
    .filter((exame) => !exame.realizado)
    .sort((a, b) => new Date(a.data) - new Date(b.data));

  return {
    exames,
    proximosExames,
    adicionarExame,
    removerExame,
    marcarRealizado,
  };
};
