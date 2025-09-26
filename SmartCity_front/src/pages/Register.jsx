import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import AuthHeader from "../components/AuthHeader";

export default function Register() {
  const [username, setUsername] = useState(""); // campo de usuário
  const [email, setEmail] = useState(""); // campo de email
  const [password, setPassword] = useState(""); // campo de senha
  const [errorMsg, setErrorMsg] = useState(""); // mensagem de erro
  const navigate = useNavigate();

  async function handleSubmit(e) { // função de envio do furmulario para o backend, faz a validação e trata os erros
    e.preventDefault(); // previnir o comportamento padrão do furmulario, caso contrario a pagina carrega.

    setErrorMsg(""); // Limpar erros anteriores

    try { // aqui e feita a requisição, e tratatmento de erros
      const res = await fetch("http://127.0.0.1:8000/api/register/", { // pagina de registro de usuario
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }), // envia no formato json os dados do usuario.
      });

      const data = await res.json(); // aqui e pego a resposta do back

      if (res.ok) { // quando o cadastro for realizado com sucesso, vai para a pagina de login.
        alert("Cadastro realizado com sucesso!");
        navigate("/");
      } else {
        // Construir mensagem de erro amigável
        let mensagens = [];

        if (data.username) {
          mensagens.push(`Usuário: ${data.username.join(", ")}`);
        }
        if (data.email) {
          mensagens.push(`Email: ${data.email.join(", ")}`);
        }
        if (data.password) {
          mensagens.push(
            `Senha: ${data.password.join(
              ", "
            )}. Use uma senha mais forte, com letras maiúsculas, números e símbolos.`
          );
        }
        if (data.non_field_errors) {
          mensagens.push(data.non_field_errors.join(", "));
        }
        if (mensagens.length === 0) mensagens.push("Erro ao cadastrar.");

        setErrorMsg(mensagens.join(" | "));
      }
    } catch (error) {
      setErrorMsg("Erro de conexão com o servidor. Tente novamente mais tarde.");
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
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          // campo de confirmação de senha
   
          <input
            className={styles.input}
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
          {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
          <button className={styles.button} type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
