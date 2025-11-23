import { useState } from "react";
import { Calendar, Plus, Trash2, CheckCircle, Clock } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useExamesAPI } from "../hooks/useExames";
import { auth } from "../services/apiService";
import "./Exames.css";

const Exames = () => {
  const token = auth.getToken();
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
  
  const { exames, adicionarExame, removerExame, marcarRealizado, loading, error } =
    useExamesAPI(apiUrl, token);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    tipo: "",
    data: "",
    observacoes: "",
  });;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nome) return;

    await adicionarExame({
      ...formData,
      data: formData.data ? new Date(formData.data).toISOString() : new Date().toISOString(),
      realizado: false,
    });

    setFormData({ nome: "", tipo: "", data: "", observacoes: "" });
    setShowForm(false);
  };

  const examesPendentes = exames.filter(e => !e.realizado);
  const examesRealizados = exames.filter(e => e.realizado);

  return (
    <div className="exames-page">
      <div className="page-header">
        <h1>Gerenciamento de Exames</h1>
        <p>Mantenha seus exames preventivos organizados e receba lembretes</p>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Carregando exames...</p>}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Adicionar Novo Exame</CardTitle>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus size={20} className="mr-2" />
            {showForm ? "Cancelar" : "Novo Exame"}
          </Button>
        </CardHeader>

        {showForm && (
          <CardContent>
            <form onSubmit={handleSubmit} className="exame-form space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome do Exame *</Label>
                <Input
                  id="nome"
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Ex: Exame de sangue, PSA, etc."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Exame</Label>
                <Input
                  id="tipo"
                  type="text"
                  value={formData.tipo}
                  onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                  placeholder="Ex: Preventivo, Rotina, Especializado"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="data">Data do Exame *</Label>
                <Input
                  id="data"
                  type="date"
                  value={formData.data}
                  onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <textarea
                  id="observacoes"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  rows={3}
                  value={formData.observacoes}
                  onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                  placeholder="Informações adicionais sobre o exame..."
                />
              </div>

              <Button type="submit">Salvar Exame</Button>
            </form>
          </CardContent>
        )}
      </Card>

      {/* Exames Pendentes */}
      {examesPendentes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock size={20} />
              Exames Pendentes ({examesPendentes.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="exames-grid">
              {examesPendentes.map((exame) => (
                <Card key={exame._id} className="exame-card">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{exame.nome}</CardTitle>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => marcarRealizado(exame._id)}
                          title="Marcar como realizado"
                          className="text-green-600 hover:text-green-700"
                        >
                          <CheckCircle size={18} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removerExame(exame._id)}
                          title="Remover"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </div>
                    {exame.tipo && <Badge variant="secondary" className="mt-2">{exame.tipo}</Badge>}
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar size={16} />
                      <span>
                        {exame.data ? format(new Date(exame.data), "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : "-"}
                      </span>
                    </div>
                    {exame.observacoes && <p className="mt-3 text-sm text-muted-foreground">{exame.observacoes}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Exames Realizados */}
      {examesRealizados.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle size={20} />
              Exames Realizados ({examesRealizados.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="exames-grid">
              {examesRealizados.map((exame) => (
                <Card key={exame._id} className="exame-card exame-realizado border-green-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{exame.nome}</CardTitle>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removerExame(exame._id)}
                        title="Remover"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                    {exame.tipo && <Badge variant="secondary" className="mt-2">{exame.tipo}</Badge>}
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle size={16} />
                      <span>
                        Realizado em {exame.data ? format(new Date(exame.data), "dd/MM/yyyy", { locale: ptBR }) : "-"}
                      </span>
                    </div>
                    {exame.observacoes && <p className="mt-3 text-sm text-muted-foreground">{exame.observacoes}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {exames.length === 0 && !loading && (
        <Card className="empty-state text-center py-12">
          <CardContent>
            <Calendar size={48} className="empty-icon mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Nenhum exame cadastrado</h3>
            <p className="text-muted-foreground">
              Comece adicionando seus exames preventivos para manter sua saúde em dia
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Exames;
