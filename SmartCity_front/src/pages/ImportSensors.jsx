import React, { useState } from "react";
import { importSensors } from "../api/sensors";
import { getToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function ImportSensors() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!file) return;
    await importSensors(file, getToken());
    navigate("/dashboard");
  }

  return (
    <div className="card">
      <h2>Importar Sensores</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".csv" onChange={e => setFile(e.target.files[0])} />
        <button type="submit">Importar</button>
        <button type="button" onClick={() => navigate("/dashboard")}>Cancelar</button>
      </form>
    </div>
  );
}