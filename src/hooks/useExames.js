// src/hooks/useExames.js
import { useState, useEffect } from "react";
import { itens } from "../services/apiService";

export const useExamesAPI = (apiUrl, token) => {
  const [exames, setExames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Buscar exames
  const fetchExames = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await itens.listar();
      const mapped = (data.itens || []).map((item) => {
        // Divide o tipo e observações a partir da descrição
        const [tipo, ...obs] = (item.descricao || "").split(" ");
        return {
          _id: item._id,
          nome: item.titulo,
          tipo: tipo || "",
          observacoes: obs.join(" ") || "",
          data:
            item.data && item.data !== ""
              ? new Date(item.data).toISOString()
              : new Date().toISOString(),
          realizado: item.realizado || false,
        };
      });
      setExames(mapped);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Adicionar exame
  const adicionarExame = async (exame) => {
    setError(null);
    try {
      const res = await fetch(`${apiUrl}/itens`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          titulo: exame.nome,
          descricao: `${exame.tipo || ""} ${exame.observacoes || ""}`.trim(),
          data:
            exame.data && exame.data !== ""
              ? new Date(exame.data).toISOString()
              : new Date().toISOString(),
          realizado: exame.realizado || false,
        }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      console.log("POST /itens status:", res.status, res.statusText);
      console.log("Resposta do backend:", data);

      if (!res.ok) throw new Error(data?.erro || "Erro ao criar exame");

      const novoExame = {
        _id: data?.item?._id || Date.now().toString(),
        nome: exame.nome,
        tipo: exame.tipo,
        observacoes: exame.observacoes,
        data:
          exame.data && exame.data !== ""
            ? new Date(exame.data).toISOString()
            : new Date().toISOString(),
        realizado: exame.realizado || false,
      };

      setExames((prev) => [...prev, novoExame]);
    } catch (err) {
      console.error("❌ Adicionar exame:", err.message);
      setError(err.message);
    }
  };

  // Remover exame
  const removerExame = async (id) => {
    setError(null);
    try {
      await itens.deletar(id);
      setExames((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // Marcar como realizado
  const marcarRealizado = async (id) => {
    setError(null);
    try {
      const exame = exames.find((e) => e._id === id);
      if (!exame) throw new Error("Exame não encontrado");

      const descricao = `${exame.tipo || ""} ${exame.observacoes || ""}`.trim();
      await itens.atualizar(id, exame.nome, descricao);

      setExames((prev) =>
        prev.map((e) => (e._id === id ? { ...e, realizado: true } : e))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (token) fetchExames();
  }, [token]);

  return {
    exames,
    loading,
    error,
    fetchExames,
    adicionarExame,
    removerExame,
    marcarRealizado,
  };
};
