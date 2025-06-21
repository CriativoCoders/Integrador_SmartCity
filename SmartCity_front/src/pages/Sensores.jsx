import React, { useEffect, useState } from "react";
import { getSensores, deleteSensor } from "../api/sensors";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Dashboard.module.css";

export default function Sensores() {
  const [sensores, setSensores] = useState([]);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    carregarSensores();
  }, []);

  function carregarSensores() {
    getSensores()
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
  }

  async function handleDelete(id) {
    const token = localStorage.getItem("token");
    if (window.confirm("Tem certeza que deseja excluir este sensor?")) {
      const ok = await deleteSensor(id, token);
      if (ok) {
        setSensores(sensores.filter(sensor => sensor.id !== id));
      } else {
        setErro("Erro ao excluir sensor.");
      }
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className={styles.body}>
      <header className={styles.header}>
        <span className={styles.headerLeft}>Sensores - Smart City</span>
        <nav className={styles.headerRight}>
          <Link className={styles.headerLink} to="/dashboard">Dashboard</Link>
          <Link className={styles.headerLink} to="/sensors">Sensores</Link>
          <Link className={styles.headerLink} to="/add">Adicionar Sensor</Link>
          <Link className={styles.headerLink} to="/import">Importar</Link>
          <Link className={styles.headerLink} to="/export">Exportar</Link>
          <button
            className={styles.headerLink}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#F6F6F6" }}
            onClick={handleLogout}
          >
            Sair
          </button>
        </nav>
      </header>
      <main className={styles.main}>
        <div className={styles.card}>
          <h2>Lista de Sensores</h2>
          <div style={{ marginBottom: "16px" }}>
            <Link to="/add" className={styles.button}>+ Adicionar Sensor</Link>
            <Link to="/importSensor" className={styles.button} style={{ marginLeft: 8 }}>Importar Sensores</Link>
            <Link to="/ExportSensor" className={styles.button} style={{ marginLeft: 8 }}>Exportar Sensores</Link>
          </div>
          {erro && (
            <div style={{ color: "red", margin: "16px 0" }}>{erro}</div>
          )}
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tipo</th>
                <th>Valor</th>
                <th>Status</th>
                <th>Localização</th>
                <th>Data</th>
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
                    <td>{sensor.status === "ativo" ? "Ativo" : "Inativo"}</td>
                    <td>{sensor.localizacao}</td>
                    <td>{new Date(sensor.data_leitura).toLocaleString()}</td>
                    <td>
                      <button onClick={() => navigate(`/edit/${sensor.id}`)}>Editar</button>
                      <button onClick={() => handleDelete(sensor.id)} style={{ marginLeft: 8, color: "red" }}>Excluir</button>
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