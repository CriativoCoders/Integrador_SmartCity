// src/components/SensorTable.jsx
import React from "react";
import styles from "./SensorTable.module.css";

export default function SensorTable({ sensores }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.th}>ID</th>
          <th className={styles.th}>Tipo</th>
          <th className={styles.th}>Valor</th>
          <th className={styles.th}>Localização</th>
          <th className={styles.th}>Data</th>
          <th className={styles.th}>Ações</th>
        </tr>
      </thead>
      <tbody>
        {sensores.map(sensor => (
          <tr key={sensor.id}>
            <td className={styles.td}>{sensor.id}</td>
            <td className={styles.td}>{sensor.tipo}</td>
            <td className={styles.td}>{sensor.valor}</td>
            <td className={styles.td}>{sensor.localizacao}</td>
            <td className={styles.td}>{new Date(sensor.data_leitura).toLocaleString()}</td>
            <td className={styles.td}>
              {/* ...ações... */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}