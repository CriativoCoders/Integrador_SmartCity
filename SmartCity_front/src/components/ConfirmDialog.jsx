import React from "react";
import styles from "./ConfirmDialog.module.css";

export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className={styles.dialog} role="dialog" aria-modal="true">
      <p>{message}</p>
      <div>
        <button className={styles.button} onClick={onConfirm} autoFocus>
          Confirmar
        </button>
        <button className={styles.button} onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </div>
  );
}