import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import AuthHeader from "../components/AuthHeader";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirm) {
      alert("Senhas não conferem!");
      return;
    }
    const res = await fetch("http://127.0.0.1:8000/api/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.message) {
      alert("Cadastro realizado com sucesso!");
      navigate("/");
    } else if (data.error) {
      alert(data.error);
    }
  }

  return (
    <div className={styles.body}>
      <AuthHeader actionText="Entrar" onAction={() => navigate("/")}>
        Já possui conta?
      </AuthHeader>
      <div className={styles.card}>
        <h2 className={styles.title}>Cadastro</h2>
        <form onSubmit={handleSubmit}>
          <input
            className={styles.input}
            placeholder="Usuário"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Confirmar Senha"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
          />
          <button className={styles.button} type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}