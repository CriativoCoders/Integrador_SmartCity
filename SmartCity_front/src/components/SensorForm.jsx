// src/components/SensorForm.jsx
import React from "react";
import styles from "./SensorForm.module.css";

export default function SensorForm({ tipo, setTipo, valor, setValor, localizacao, setLocalizacao, onSubmit, onCancel }) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <select className={styles.select} value={tipo} onChange={e => setTipo(e.target.value)}>
        <option value="temperatura">Temperatura</option>
        <option value="umidade">Umidade</option>
        <option value="luminosidade">Luminosidade</option>
        <option value="contador">Contador de Pessoas</option>
      </select>
      <input className={styles.input} placeholder="Valor" value={valor} onChange={e => setValor(e.target.value)} />
      <input className={styles.input} placeholder="Localização" value={localizacao} onChange={e => setLocalizacao(e.target.value)} />
      <button className={styles.button} type="submit">Salvar</button>
      <button className={styles.button} type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
}