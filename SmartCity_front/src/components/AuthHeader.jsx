import React from "react";
import styles from "./AuthHeader.module.css";

export default function AuthHeader({ children, actionText, onAction }) {
  return (
    <header className={styles.header}>
      <span className={styles.logo}>Smart City</span>
      <span className={styles.action}>
        {children}
        <button className={styles.actionLink} onClick={onAction}>
          {actionText}
        </button>
      </span>
    </header>
  );
}