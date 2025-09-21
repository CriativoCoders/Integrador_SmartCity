import React, { useState, useEffect } from "react";
import { getSensorById, updateSensor } from "../api/sensors";
import { useNavigate, useParams } from "react-router-dom";

export default function EditSensor() {
  const { id } = useParams();
  const [tipo, setTipo] = useState("");
  const [valor, setValor] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSensor() {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("token");
      try {
        const sensor = await getSensorById(id, token);
        setTipo(sensor.tipo);
        setValor(sensor.valor);
        setLocalizacao(sensor.localizacao);
      } catch (err) {
        setError("Erro ao carregar sensor.");
      }
      setLoading(false);
    }
    fetchSensor();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const token = localStorage.getItem("token");
    try {
      await updateSensor(id, { tipo, valor, localizacao }, token);
      navigate("/dashboard");
    } catch (err) {
      setError("Erro ao salvar sensor. Tente novamente.");
      setSaving(false);
    }
  }

  if (loading) return <p>Carregando sensor...</p>;

  return (
    <div className="card">
      <h2>Editar Sensor</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Tipo:
          <select value={tipo} onChange={e => setTipo(e.target.value)} disabled={saving}>
            <option value="temperatura">Temperatura</option>
            <option value="umidade">Umidade</option>
            <option value="luminosidade">Luminosidade</option>
            <option value="contador">Contador de Pessoas</option>
          </select>
        </label>
        <br />
        <label>
          Valor:
          <input
            placeholder="Valor"
            value={valor}
            onChange={e => setValor(e.target.value)}
            disabled={saving}
          />
        </label>
        <br />
        <label>
          Localização:
          <input
            placeholder="Localização"
            value={localizacao}
            onChange={e => setLocalizacao(e.target.value)}
            disabled={saving}
          />
        </label>
        <br />
        <button type="submit" disabled={saving}>
          {saving ? "Salvando..." : "Salvar"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          disabled={saving}
          style={{ marginLeft: "8px" }}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}
