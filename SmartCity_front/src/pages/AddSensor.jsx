import React, { useState } from "react";
import { addSensor } from "../api/sensors";
import { useNavigate, Link } from "react-router-dom";
import styles from "./AddSensor.module.css";
import Footer from "../components/Footer";

export default function AddSensor() {
  const [tipo, setTipo] = useState("temperatura");
  const [valor, setValor] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await addSensor({ tipo, valor, localizacao }, token);
    navigate("/dashboard");
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className={styles.body}>
      <header className={styles.header} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#333", color: "#fff", padding: "20px 40px" }}>
        <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>Adicionar Sensor</span>
        <nav>
          <Link to="/dashboard" style={{ color: "#fff", marginRight: "24px", textDecoration: "underline" }}>Voltar para Dashboard</Link>
          <button onClick={handleLogout} style={{ color: "#0897B8", background: "none", border: "none", fontWeight: "bold", cursor: "pointer", textDecoration: "underline" }}>Sair</button>
        </nav>
      </header>
      <div className={styles.card}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontWeight: "bold" }}>Tipo</label>
              <select
                className={styles.input}
                value={tipo}
                onChange={e => setTipo(e.target.value)}
                style={{ width: "100%" }}
              >
                <option value="temperatura">Temperatura</option>
                <option value="umidade">Umidade</option>
                <option value="luminosidade">Luminosidade</option>
                <option value="contador">Contador de Pessoas</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontWeight: "bold" }}>Valor</label>
              <input
                className={styles.input}
                placeholder="Valor"
                value={valor}
                onChange={e => setValor(e.target.value)}
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <label style={{ fontWeight: "bold" }}>Localização</label>
          <input
            className={styles.input}
            placeholder="Localização"
            value={localizacao}
            onChange={e => setLocalizacao(e.target.value)}
            style={{ width: "100%", marginBottom: "16px" }}
          />
          <div>
            <button className={styles.button} type="submit">Salvar</button>
            <button
              className={styles.button}
              type="button"
              onClick={() => navigate("/dashboard")}
              style={{ marginLeft: "8px" }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}