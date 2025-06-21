import React from "react";
import { exportSensors } from "../api/sensors";
import { getToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import styles from "./ExportSensors.module.css";

export default function ExportSensors() {
  const navigate = useNavigate();

  async function handleExport() {
    await exportSensors(getToken());
    // Aqui você pode implementar o download do arquivo
    alert("Sensores exportados!");
    navigate("/dashboard");
  }

  return (
    <div className="card">
      <h2>Exportar Sensores</h2>
      <button onClick={handleExport}>Exportar</button>
      <button onClick={() => navigate("/dashboard")}>Cancelar</button>
    </div>
  );
}