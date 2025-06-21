import React, { useEffect, useState } from "react";
import { getSensores } from "../api/sensors";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const [sensores, setSensores] = useState([]);
  const [statusFiltro, setStatusFiltro] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let url = "/api/sensores/";
    if (statusFiltro) url += `?status=${statusFiltro}`;
    getSensores(url)
      .then(data => {
        if (Array.isArray(data)) {
          setSensores(data);
          setErro("");
        } else if (data && data.detail) {
          setErro("Acesso não autorizado. Faça login novamente.");
          setSensores([]);
        } else {
          setErro("Erro ao carregar sensores.");
          setSensores([]);
        }
      })
      .catch(() => {
        setErro("Erro ao conectar com o servidor.");
        setSensores([]);
      });
  }, [statusFiltro]);

  return (
    <div className={styles.body}>
      <header className={styles.header}>
        <span className={styles.headerLeft}>Dashboard - Smart City</span>
        <nav className={styles.headerRight}>
          <Link className={styles.headerLink} to="/sensors">Sensores</Link>
          <Link className={styles.headerLink} to="/add">Adicionar Sensor</Link>
          <Link className={styles.headerLink} to="/">Sair</Link>
        </nav>
      </header>
      <main className={styles.main}>
        <div className={styles.card}>
          <h2>Dashboard de Sensores</h2>
          <label>
            Filtrar por status:{" "}
            <select
              value={statusFiltro}
              onChange={e => setStatusFiltro(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
            </select>
          </label>
          <Link to="/add" className={styles.button}>Adicionar Sensor</Link>
          {erro && (
            <div style={{ color: "red", margin: "16px 0" }}>{erro}</div>
          )}
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tipo</th>
                <th>Valor</th>
                <th>Localização</th>
                <th>Data</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(sensores) && sensores.length > 0 ? (
                sensores.map(sensor => (
                  <tr key={sensor.id}>
                    <td>{sensor.id}</td>
                    <td>{sensor.tipo}</td>
                    <td>{sensor.valor}</td>
                    <td>{sensor.localizacao}</td>
                    <td>{new Date(sensor.data_leitura).toLocaleString()}</td>
                    <td>{sensor.status === "ativo" ? "Ativo" : "Inativo"}</td>
                    <td>
                      <button onClick={() => navigate(`/edit/${sensor.id}`)}>Editar</button>
                      <button onClick={() => navigate(`/delete/${sensor.id}`)}>Excluir</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7}>Nenhum sensor encontrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
      <footer className={styles.footer}>
        Smart City &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}