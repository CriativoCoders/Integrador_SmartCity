import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import AuthHeader from "../components/AuthHeader";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    try {
      const res = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.access) {
        setErro(""); // Limpa o erro!
        localStorage.setItem("token", data.access);
        navigate("/sensors");
      } else {
        setErro("Usuário ou senha inválidos");
      }
    } catch {
      setErro("Erro ao conectar com o servidor.");
    }
  }

  return (
    <div className={styles.body}>
      <AuthHeader actionText="Cadastrar" onAction={() => navigate("/register")}>
        Não possui conta?
      </AuthHeader>
      <div className={styles.card}>
        <h2 className={styles.title}>Login</h2>
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
          <button className={styles.button} type="submit">Entrar</button>
        </form>
        {erro && <div style={{ color: "red", marginTop: 16 }}>{erro}</div>}
      </div>
    </div>
  );
}