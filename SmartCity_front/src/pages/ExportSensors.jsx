import React, { useState } from "react";
import { exportSensors } from "../api/sensors";
import { getToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import styles from "./ExportSensors.module.css";

export default function ExportSensors() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleExport() {
    setLoading(true);
    setError("");
    try {
      const token = getToken();
      const response = await exportSensors(token);

      if (!response.ok) {
        throw new Error("Erro ao exportar sensores");
      }

      // Supondo que a resposta seja um arquivo blob
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Criar link temporário para download
      const a = document.createElement("a");
      a.href = url;
      a.download = "sensores_exportados.csv"; // ou outro nome/formato
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      alert("Sensores exportados com sucesso!");
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Erro desconhecido ao exportar sensores");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.card}>
      <h2>Exportar Sensores</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleExport} disabled={loading}>
        {loading ? "Exportando..." : "Exportar"}
      </button>
      <button onClick={() => navigate("/dashboard")} disabled={loading} style={{ marginLeft: "8px" }}>
        Cancelar
      </button>
    </div>
  );
}
