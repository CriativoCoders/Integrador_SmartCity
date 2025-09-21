import React, { useState } from "react";
import { importSensors } from "../api/sensors";
import { getToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function ImportSensors() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!file) {
      setError("Por favor, selecione um arquivo XLSX.");
      return;
    }

    setLoading(true);

    try {
      const token = await getToken();

      if (!token) {
        setError("Sessão expirada. Faça login novamente.");
        navigate("/");
        return;
      }

      await importSensors(file, token);
      alert("Sensores importados com sucesso!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Falha ao importar sensores. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h2>📥 Importar Sensores</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={(e) => setFile(e.target.files[0])}
          disabled={loading}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Importando..." : "Importar"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          disabled={loading}
          style={{ marginLeft: "8px" }}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}
