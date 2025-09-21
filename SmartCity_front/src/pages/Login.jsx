import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import AuthHeader from "../components/AuthHeader";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/token/", { // Ajuste a URL conforme sua API JWT
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Salvar token no localStorage
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);

        // Redirecionar para a página protegida (ex: dashboard)
        navigate("/dashboard");
      } else {
        setErrorMsg(data.detail || "Usuário ou senha incorretos.");
      }
    } catch (error) {
      setErrorMsg("Erro de conexão com o servidor.");
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
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
          <button className={styles.button} type="submit">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
