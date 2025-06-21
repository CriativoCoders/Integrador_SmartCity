import React, { useEffect, useState } from "react";
import { getSensorById, deleteSensor } from "../api/sensors";
import { getToken } from "../utils/auth";
import { useNavigate, useParams } from "react-router-dom";

export default function DeleteSensor() {
  const { id } = useParams();
  const [sensor, setSensor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getSensorById(id, getToken()).then(setSensor);
  }, [id]);

  async function handleDelete() {
    await deleteSensor(id, getToken());
    navigate("/dashboard");
  }

  if (!sensor) return <div>Carregando...</div>;

  return (
    <div className="card">
      <h2>Excluir Sensor</h2>
      <p>Tipo: {sensor.tipo}</p>
      <p>Valor: {sensor.valor}</p>
      <p>Localização: {sensor.localizacao}</p>
      <button onClick={handleDelete}>Excluir</button>
      <button onClick={() => navigate("/dashboard")}>Cancelar</button>
    </div>
  );
}