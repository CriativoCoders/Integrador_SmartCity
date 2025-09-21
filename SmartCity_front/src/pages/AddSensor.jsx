import React, { useState } from "react";
import { addSensor } from "../api/sensors";
import { useNavigate, Link } from "react-router-dom";
import styles from "./AddSensor.module.css";
import Footer from "../components/Footer";

export default function AddSensor() {
  const [tipo, setTipo] = useState("temperatura");
  const [valor, setValor] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Função para enviar os dados do formulário
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Validação básica
    if (!valor.trim() || !localizacao.trim()) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Usuário não autenticado. Faça login novamente.");
      return;
    }

    setLoading(true);
    try {
      await addSensor({ tipo, valor, localizacao }, token);
      navigate("/dashboard");
    } catch {
      setError("Erro ao salvar sensor. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  // Logout simples, remove token e redireciona
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className={styles.body}>
      <header className={styles.header}>
        <span className={styles.title}>Adicionar Sensor</span>
        <nav>
          <Link to="/dashboard" className={styles.link}>
            Voltar para Dashboard
          </Link>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Sair
          </button>
        </nav>
      </header>

      <main className={styles.card}>
        <form onSubmit={handleSubmit}>
          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="tipo" className={styles.label}>
                Tipo
              </label>
              <select
                id="tipo"
                className={styles.input}
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                disabled={loading}
              >
                <option value="temperatura">Temperatura</option>
                <option value="umidade">Umidade</option>
                <option value="luminosidade">Luminosidade</option>
                <option value="contador">Contador de Pessoas</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="valor" className={styles.label}>
                Valor
              </label>
              <input
                id="valor"
                type="number"
                step="any"
                placeholder="Valor"
                className={styles.input}
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                disabled={loading}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="localizacao" className={styles.label}>
              Localização
            </label>
            <input
              id="localizacao"
              type="text"
              placeholder="Localização"
              className={styles.input}
              value={localizacao}
              onChange={(e) => setLocalizacao(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className={styles.buttons}>
            <button className={styles.button} type="submit" disabled={loading}>
              {loading ? "Salvando..." : "Salvar"}
            </button>
            <button
              className={styles.button}
              type="button"
              onClick={() => navigate("/dashboard")}
              disabled={loading}
              style={{ marginLeft: "8px" }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
