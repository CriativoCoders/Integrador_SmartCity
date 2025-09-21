import React, { useEffect, useState } from "react";
import { getSensorById, deleteSensor } from "../api/sensors";
import { getToken } from "../utils/auth";
import { useNavigate, useParams } from "react-router-dom";

export default function DeleteSensor() {
  const { id } = useParams();
  const [sensor, setSensor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSensor() {
      setLoading(true);
      setError("");
      try {
        const data = await getSensorById(id, getToken());
        setSensor(data);
      } catch (err) {
        setError("Erro ao carregar sensor.");
      }
      setLoading(false);
    }
    fetchSensor();
  }, [id]);

  async function handleDelete() {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir este sensor?");
    if (!confirmDelete) return;

    setDeleting(true);
    setError("");
    try {
      await deleteSensor(id, getToken());
      navigate("/dashboard");
    } catch (err) {
      setError("Erro ao excluir sensor. Tente novamente.");
      setDeleting(false);
    }
  }

  if (loading) return <div>Carregando...</div>;

  if (error) return <div style={{ color: "red" }}>{error}</div>;

  if (!sensor) return <div>Sensor não encontrado.</div>;

  return (
    <div className="card">
      <h2>Excluir Sensor</h2>
      <p><strong>Tipo:</strong> {sensor.tipo}</p>
      <p><strong>Valor:</strong> {sensor.valor}</p>
      <p><strong>Localização:</strong> {sensor.localizacao}</p>

      <button onClick={handleDelete} disabled={deleting}>
        {deleting ? "Excluindo..." : "Excluir"}
      </button>

      <button onClick={() => navigate("/dashboard")} disabled={deleting} style={{ marginLeft: "10px" }}>
        Cancelar
      </button>
    </div>
  );
}
