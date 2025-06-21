import React, { useState, useEffect } from "react";
import { getSensorById, updateSensor } from "../api/sensors";
import { useNavigate, useParams } from "react-router-dom";

export default function EditSensor() {
  const { id } = useParams();
  const [tipo, setTipo] = useState("");
  const [valor, setValor] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    getSensorById(id, token).then(sensor => {
      setTipo(sensor.tipo);
      setValor(sensor.valor);
      setLocalizacao(sensor.localizacao);
    });
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await updateSensor(id, { tipo, valor, localizacao }, token);
    navigate("/dashboard");
  }

  return (
    <div className="card">
      <h2>Editar Sensor</h2>
      <form onSubmit={handleSubmit}>
        <select value={tipo} onChange={e => setTipo(e.target.value)}>
          <option value="temperatura">Temperatura</option>
          <option value="umidade">Umidade</option>
          <option value="luminosidade">Luminosidade</option>
          <option value="contador">Contador de Pessoas</option>
        </select>
        <input placeholder="Valor" value={valor} onChange={e => setValor(e.target.value)} />
        <input placeholder="Localização" value={localizacao} onChange={e => setLocalizacao(e.target.value)} />
        <button type="submit">Salvar</button>
        <button type="button" onClick={() => navigate("/dashboard")}>Cancelar</button>
      </form>
    </div>
  );
}