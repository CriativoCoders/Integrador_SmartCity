import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth"; // Função que verifica o token, explico abaixo

export default function PrivateRoute({ children }) {
  // Se não estiver autenticado, redireciona para /
  if (!isAuthenticated()) {
    return <Navigate to="/" />;
  }
  // Senão, renderiza o componente filho
  return children;
}
